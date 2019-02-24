import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Slider } from 'react-native-elements'
import { Card, Text, Button } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

const RestPeriodSetting = ({
  restPeriod,
  onChange,
  onComplete,
  setRestPeriod
}) => (
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
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
        <Card.Actions style={{ marginTop: -16, justifyContent: 'flex-end' }}>
          <Button onPress={() => setRestPeriod(60)}>60s</Button>
          <Button onPress={() => setRestPeriod(90)}>90s</Button>
          <Button onPress={() => setRestPeriod(120)}>2 mins</Button>
        </Card.Actions>
      </View>
    </View>
  </Card>
)
RestPeriodSetting.propTypes = {
  restPeriod: PropTypes.number,
  onComplete: PropTypes.func,
  onChange: PropTypes.func,
  setRestPeriod: PropTypes.func
}

export default RestPeriodSetting
