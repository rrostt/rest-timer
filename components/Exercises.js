import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ScrollView
} from 'react-native'
import {
  Chip,
  Badge
} from 'react-native-paper'

const containerStyle = {
  flex: 0,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  height: 64
}

const exerciseStyle = {
  height: 64,
  justifyContent: 'center',
}

const Exercise = ({ text, count, onPress }) =>
    <View style={exerciseStyle}>
      <Chip avatar={<Badge>{count}</Badge>}  onPress={onPress}>{text}</Chip>
    </View>

Exercise.propTypes = {
  text: PropTypes.string,
  count: PropTypes.number,
  onPress: PropTypes.func
}

const Exercises = ({ onInc, exercises, counts }) => (
  <ScrollView horizontal={true}>
    <View style={containerStyle}>
      {exercises.map((exercise, i) => <Exercise key={i} text={exercise.text} count={counts[exercise.text] || 0} onPress={() => onInc(exercise.text)} />)}
    </View>
  </ScrollView>
)

Exercises.propTypes = {
  onInc: PropTypes.func,
  exercises: PropTypes.array,
  counts: PropTypes.object
}

export default Exercises
