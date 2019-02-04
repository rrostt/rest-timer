import React from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet, Platform } from 'react-native'

const fontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace'
const styles = StyleSheet.create({
  hintTextStyle: {
    fontSize: 24,
    color: '#888',
    margin: 32,
    fontFamily
  },
  hintTextStyleHidden: {
    color: 'rgba(0,0,0,0)'
  }
})

const HintText = ({ hide }) =>
  <Text
    style={[
      styles.hintTextStyle,
      hide && styles.hintTextStyleHidden
    ]}
  >
    Press time to start, pull down to reset
  </Text>
HintText.propTypes = {
  hide: PropTypes.bool
}

export default HintText
