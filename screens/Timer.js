import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Platform,
  AsyncStorage
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { KeepAwake } from 'expo'
import { TouchableRipple, Appbar } from 'react-native-paper'

import Exercises from '../components/Exercises'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  content: {
    flex: 1,
    alignItems: 'center'
  }
})

const pad = n => (n < 10 ? `0${n}` : n)

const minutes = time => Math.floor(time / 60000)
const seconds = time => pad(Math.floor(time / 1000) % 60)
const tens = time => (Math.floor((time % 1000) / 100))

const format = time => `${minutes(time)}:${seconds(time)}.${tens(time)}`

class Timer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      time: 0,
      running: false,
      times: [],
      restPeriod: 10000,
      exercises: [],
      counts: {}
    }
  }

  componentDidMount() {
    this.loadSettings()
  }

  loadSettings() {
    AsyncStorage.getItem('settings')
      .then(settings => {
        if (settings) {
          const { restPeriod, exercises } = JSON.parse(settings)
          this.setState({
            restPeriod: restPeriod * 1000,
            exercises
          })
        }
      })
  }

  start() {
    this.lastTime = this.state.time
    this.startedAt = Date.now()
    this.setState({ running: true })
    KeepAwake.activate()

    const nextFrame = () => {
      if (this.state.running) {
        this.setState({ time: this.lastTime + (Date.now() - this.startedAt) })
        requestAnimationFrame(nextFrame)
      }
    }
    requestAnimationFrame(nextFrame)
  }

  stop() {
    this.setState({ running: false })
    KeepAwake.deactivate()
  }

  split() {
    if (!this.state.running) return this.start()

    const time = this.lastTime + (Date.now() - this.startedAt)
    this.setState({ times: [...this.state.times, time] })
    this.lastTime = 0
    this.startedAt = Date.now()
  }

  resetTimer() {
    this.stop()
    this.setState({
      time: 0,
      times: [],
      counts: {}
    })
  }

  incCount(name) {
    this.setState({
      counts: {
        ...this.state.counts,
        [name]: (this.state.counts[name] || 0) + 1
      }
    })
  }

  render() {
    const totalTime =
      this.state.time + this.state.times.reduce((sum, x) => sum + x, 0)

    const fontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace'
    const timeStyle = {
      fontSize: 72,
      fontFamily,
      alignSelf: 'stretch',
      textAlign: 'center',
      color: this.state.time > this.state.restPeriod ? '#f00' : '#000'
    }
    const totalTimeStyle = {
      fontSize: 24,
      color: '#888',
      fontFamily
    }
    const hintTextStyle = {
      fontSize: 24,
      color: this.startedAt ? 'rgba(0,0,0,0)' : '#888',
      margin: 32,
      fontFamily
    }

    const refreshControl = <RefreshControl refreshing={false} onRefresh={this.resetTimer.bind(this)} />

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={() => this.loadSettings()} />
        <Appbar.Header>
          <Appbar.Content title='Timer' />
        </Appbar.Header>

        <ScrollView refreshControl={refreshControl}>
          <View style={styles.content}>
            <Exercises exercises={this.state.exercises} counts={this.state.counts} onInc={this.incCount.bind(this)} />
            <Text style={hintTextStyle}>Press time to start, pull down to reset</Text>
            {/* <TouchableHighlight underlayColor={'#88f'} style={{ alignSelf: 'stretch' }} onPress={this.split.bind(this)}> */}
            <TouchableRipple style={{ alignSelf: 'stretch' }} onPress={this.split.bind(this)} rippleColor="rgba(128, 128, 255, .32)">
              <Text style={timeStyle}>{format(this.state.time)}</Text>
            </TouchableRipple>
            {/* </TouchableHighlight> */}
            {this.state.times.length > 0 && <Text style={totalTimeStyle}>{format(totalTime)}</Text>}
            {[...this.state.times].reverse().map((time, i) => (
              <Text style={{ fontFamily }} key={i}>{format(time)}</Text>
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Timer
