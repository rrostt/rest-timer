import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  AsyncStorage,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ViewPropTypes,
  KeyboardAvoidingView
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Slider } from 'react-native-elements'
import {
  Appbar,
  List,
  Card,
  Text,
  Button,
  Subheading,
  Divider,
  IconButton
} from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import Swipeout from 'react-native-swipeout'

import DraggableFlatList from 'react-native-draggable-flatlist'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  }
})

const SettingsRow = ({ style = {}, icon, left, children }) => (
  <View style={{ ...style, flexDirection: 'row', paddingHorizontal: 16 }}>
    <View
      style={{
        width: 64,
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {left ? left : <Ionicons name={icon} size={24} />}
    </View>
    <View style={{ flex: 1 }}>{children}</View>
  </View>
)
SettingsRow.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.any,
  icon: PropTypes.string,
  left: PropTypes.node
}

const RestPeriodSetting = ({ restPeriod, onChange, onComplete, setRestPeriod }) =>
  <Card style={{ margin: 4 }}>
    <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 12 }}>
      <View
        style={{
          // width: 64,
          padding: 16,
          flex: 0,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Ionicons name="md-stopwatch" size={24} />
          <Text style={{ fontSize: 10 }}>{restPeriod}s</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16 }}>Rest period</Text>
        <Slider
          style={{ flex: 1 }}
          value={restPeriod}
          thumbTintColor="#88f"
          step={1}
          maximumValue={180}
          minimumValue={10}
          onValueChange={onChange}
          onSlidingComplete={onComplete}
        />
        <Card.Actions
          style={{ marginTop: -16, justifyContent: 'flex-end' }}
        >
          <Button onPress={() => setRestPeriod(60)}>60s</Button>
          <Button onPress={() => setRestPeriod(90)}>90s</Button>
          <Button onPress={() => setRestPeriod(120)}>
            2 mins
          </Button>
        </Card.Actions>
      </View>
    </View>
  </Card>
RestPeriodSetting.propTypes = {
  restPeriod: PropTypes.number,
  onComplete: PropTypes.func,
  onChange: PropTypes.func,
  setRestPeriod: PropTypes.func
}

const AddExercise = ({ newExerciseName, onChange, onAdd }) =>
  <View style={{ paddingLeft: 24, paddingRight: 12, flexDirection: 'row', alignItems: 'center' }}>
    <View style={{  flex: 1 }}>
      <TextInput
        style={{ flex: 1 }}
        label="New Exercise"
        placeholder="New Exercise"
        value={newExerciseName}
        onChangeText={onChange}
      />
    </View>
    <IconButton icon='add' onPress={onAdd} disabled={newExerciseName === ''} />
  </View>
AddExercise.propTypes = {
  newExerciseName: PropTypes.string,
  onChange: PropTypes.func,
  onAdd: PropTypes.func
}

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
      ],
      newExerciseName: ''
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

  addExercise() {
    Keyboard.dismiss()
    this.setState(
      {
        exercises: [
          ...this.state.exercises,
          { text: this.state.newExerciseName }
        ],
        newExerciseName: ''
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
            <Card style={{ margin: 4 }}>
              <View>
                <DraggableFlatList
                  data={this.state.exercises}
                  renderItem={({ item, index, move, moveEnd }) => (
                    <Swipeout
                      autoClose={true}
                      right={[{
                        text: 'Remove',
                        backgroundColor: 'red',
                        onPress: () => this.removeExercise(index),
                      }]}
                      backgroundColor='transparent'
                    >
                      <TouchableOpacity
                        onLongPress={move}
                        onPressOut={moveEnd}>
                          <List.Item
                          title={item.text}
                          left={props => (
                            <List.Icon
                              {...props}
                              color={'#000'}
                              icon="event-note"
                            />
                          )}
                        />
                      </TouchableOpacity>
                    </Swipeout>
                  )}
                  keyExtractor={(item) => `item-${item.text}`}
                  ItemSeparatorComponent={Divider}
                  scrollPercent={5}
                  onMoveEnd={({ data }) => this.setState({ exercises: data }, () => this.saveSettings())}
                />
                <Divider />
                <AddExercise
                  newExerciseName={this.state.newExerciseName}
                  onChange={text =>
                    this.setState({ newExerciseName: text })
                  }
                  onAdd={() => this.addExercise()}
                  />
              </View>
            </Card>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default Settings
