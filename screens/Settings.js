import React from 'react'
import {
  View,
  StyleSheet,
  AsyncStorage,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import {
  Appbar,
  Subheading} from 'react-native-paper'

import RestPeriodSetting from './settingsComponents/RestPeriodSetting'
import ExercisesSettings from './settingsComponents/ExercisesSettings'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  }
})

class Settings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      restPeriod: 90,
      exercises: [
        {
          text: 'bench'
        },
        {
          text: 'squats'
        },
        {
          text: 'pullups'
        }
      ]
    }
  }

  loadSettings() {
    AsyncStorage.getItem('settings').then(settings => {
      if (settings) {
        const obj = JSON.parse(settings)
        this.setState(obj)
      }
    })
  }

  saveSettings() {
    const mapState = ({ exercises, restPeriod }) => ({
      exercises,
      restPeriod
    })
    AsyncStorage.setItem('settings', JSON.stringify(mapState(this.state)))
  }

  restPeriodChanged(restPeriod) {
    this.setState({ restPeriod })
  }

  setRestPeriod(restPeriod) {
    this.setState({ restPeriod }, () => this.saveSettings())
  }

  removeExercise(index) {
    this.setState(
      { exercises: this.state.exercises.filter((_, i) => i !== index) },
      () => this.saveSettings()
    )
  }

  addExercise(name) {
    Keyboard.dismiss()
    this.setState(
      {
        exercises: [
          ...this.state.exercises,
          { text: name }
        ]
      },
      () => this.saveSettings()
    )
  }

  moveExerciseDown(index) {
    this.setState({
      exercises:
        this.state.exercises.map((e, i) => {
          if (i === index) return this.state.exercises[i + 1]
          if (i === index + 1) return this.state.exercises[index]
          return e
        })
    })
  }

  moveExerciseUp(index) {
    this.setState({
      exercises:
        this.state.exercises.map((e, i) => {
          if (i === index - 1) return this.state.exercises[index]
          if (i === index) return this.state.exercises[i - 1]
          return e
        })
    })
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={200}
      >
        <ScrollView>
          <View style={styles.container}>
            <NavigationEvents onWillFocus={() => this.loadSettings()} />
            <Appbar.Header>
              <Appbar.Content title="Settings" />
            </Appbar.Header>

            <RestPeriodSetting restPeriod={this.state.restPeriod} onChange={this.restPeriodChanged.bind(this)} onComplete={this.saveSettings.bind(this)} setRestPeriod={time => this.setRestPeriod(time)} />

            <Subheading style={{ padding: 16 }}>Exercises</Subheading>
            <ExercisesSettings
              exercises={this.state.exercises}
              onChange={(exercises) => this.setState({ exercises }, () => this.saveSettings())}
              onAdd={name => this.addExercise(name)}
              onRemove={index => this.removeExercise(index)}
              />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default Settings
