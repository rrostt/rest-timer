import React from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet, Platform } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { format } from '../utils/time'

const fontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace'
const styles = StyleSheet.create({
  timeStyle: {
    fontSize: 72,
    fontFamily,
    alignSelf: 'stretch',
    textAlign: 'center',
    color: '#000'
  },
  timeStyleDoneResting: {
    color: '#f00'
  }
})

const Time = ({ time, doneResting, onPress }) => (
  <TouchableRipple
    style={{ alignSelf: 'stretch' }}
    onPress={onPress}
    rippleColor="rgba(128, 128, 255, .32)"
  >
    <Text
      style={[styles.timeStyle, doneResting && styles.timeStyleDoneResting]}
    >
      {format(time)}
    </Text>
  </TouchableRipple>
)
Time.propTypes = {
  time: PropTypes.number,
  doneResting: PropTypes.bool,
  onPress: PropTypes.func
}

export default Time
