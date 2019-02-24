import React from 'react'
import PropTypes from 'prop-types'
import { View, TextInput } from 'react-native'
import { IconButton } from 'react-native-paper'

class AddExercise extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    this.onChange = text => {
      this.setState({
        name: text
      })
    }
    this.onPress = () => {
      this.props.onAdd(this.state.name)
      this.setState({ name: '' })
    }
  }
  render() {
    return (
      <View
        style={{
          paddingLeft: 24,
          paddingRight: 12,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            style={{ flex: 1 }}
            label="New Exercise"
            placeholder="New Exercise"
            value={this.state.name}
            onChangeText={this.onChange}
          />
        </View>
        <IconButton
          icon="add"
          onPress={this.onPress}
          disabled={this.state.name === ''}
        />
      </View>
    )
  }
}
AddExercise.propTypes = {
  onAdd: PropTypes.func
}

export default AddExercise
