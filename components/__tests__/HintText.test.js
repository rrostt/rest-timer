import { Text } from 'react-native'
import React from 'react'
import 'jest-dom/extend-expect'
import Renderer from 'react-test-renderer'

import HintText from '../HintText'

test('test hinttext', () => {
  const renderer = Renderer.create(<HintText />)
  expect(renderer.root.findByType(Text)).not.toBeNull
})
