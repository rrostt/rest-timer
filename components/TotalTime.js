import React from 'react'
import { Text, StyleSheet, Platform } from 'react-native'
import { format } from '../utils/time'

const fontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace'
const styles = StyleSheet.create({
  totalTimeStyle: {
    fontSize: 24,
    color: '#888',
    fontFamily
  }
})

const TotalTime = ({ time, times }) => {
  const totalTime =
    time + times.reduce((sum, x) => sum + x, 0)

  return times.length > 0 && (
    <Text style={styles.totalTimeStyle}>{format(totalTime)}</Text>
  )
}

export default TotalTime
