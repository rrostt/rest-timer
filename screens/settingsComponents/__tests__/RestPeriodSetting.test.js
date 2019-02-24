import React from 'react'
import 'jest-dom/extend-expect'
import Renderer from 'react-test-renderer'

import RestPeriodSetting from '../RestPeriodSetting'
import { Slider } from 'react-native-elements'

describe('RestPeriodSetting', () => {
  let value = 10
  const setValue = v => value = v
  const noop = () => {}

  beforeEach(() => {
    value = 10
  })

  test('sliding sets value', () => {
    const renderer = Renderer.create(<RestPeriodSetting restPeriod={value} onChange={setValue} onComplete={noop} setRestPeriod={setValue} />)

    const slider = renderer.root.findByType(Slider)

    slider.props.onValueChange(70)

    expect(value).toBe(70)
  })

  test('60s button sets time to 60', () => {
    const renderer = Renderer.create(<RestPeriodSetting restPeriod={value} onChange={setValue} onComplete={noop} setRestPeriod={setValue} />)
    const button = renderer.root.findByProps({children: '60s'})
    button.props.onPress()

    expect(value).toBe(60)
  })

  test('90s button sets time to 90', () => {
    const renderer = Renderer.create(<RestPeriodSetting restPeriod={value} onChange={setValue} onComplete={noop} setRestPeriod={setValue} />)
    const button = renderer.root.findByProps({children: '90s'})
    button.props.onPress()

    expect(value).toBe(90)
  })

  test('2 mins button sets time to 120', () => {
    const renderer = Renderer.create(<RestPeriodSetting restPeriod={value} onChange={setValue} onComplete={noop} setRestPeriod={setValue} />)
    const button = renderer.root.findByProps({children: '2 mins'})
    button.props.onPress()

    expect(value).toBe(120)
  })
})
