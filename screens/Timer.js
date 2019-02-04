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
import { Appbar } from 'react-native-paper'

import Exercises from '../components/Exercises'
import Time from '../components/Time'
import TotalTime from '../components/TotalTime'
import HintText from '../components/HintText'

import { format } from '../utils/time'

const fontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace'
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
    AsyncStorage.getItem('settings').then(settings => {
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
    const refreshControl = (
      <RefreshControl
        refreshing={false}
        onRefresh={this.resetTimer.bind(this)}
      />
    )

    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={() => this.loadSettings()} />
        <Appbar.Header>
          <Appbar.Content title="Timer" />
        </Appbar.Header>

        <ScrollView refreshControl={refreshControl}>
          <View style={styles.content}>
            <Exercises
              exercises={this.state.exercises}
              counts={this.state.counts}
              onInc={this.incCount.bind(this)}
            />
            <HintText hide={!!this.startedAt} />
            <Time
              time={this.state.time}
              doneResting={this.state.time > this.state.restPeriod}
              onPress={this.split.bind(this)}
            />
            <TotalTime time={this.state.time} times={this.state.times} />
            {[...this.state.times].reverse().map((time, i) => (
              <Text style={{ fontFamily }} key={i}>
                {format(time)}
              </Text>
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Timer
