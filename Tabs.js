import React from 'react'
import PropTypes from 'prop-types'
import { createAppContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import Timer from './screens/Timer'
import Settings from './screens/Settings'

const HomeIcon = ({ tintColor }) =>
  <Ionicons name="md-home" size={24} color={tintColor} />
HomeIcon.propTypes = {
  tintColor: PropTypes.any
}
const SettingsIcon = ({ tintColor }) =>
  <Ionicons name="ios-settings" size={24} color={tintColor} />
SettingsIcon.propTypes = {
  tintColor: PropTypes.any
}

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Timer: {
      screen: Timer,
      navigationOptions: {
        tabBarIcon: HomeIcon
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: SettingsIcon
      }
    }
  },
  {
    initialRouteName: 'Timer'
  }
)

export default createAppContainer(TabNavigator)
