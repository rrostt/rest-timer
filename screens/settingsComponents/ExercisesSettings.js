import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity } from 'react-native'
import { List, Card, Divider } from 'react-native-paper'
import Swipeout from 'react-native-swipeout'
import DraggableFlatList from 'react-native-draggable-flatlist'
import AddExercise from "./AddExercise"

const ExercisesSettings = ({ exercises, onChange, onAdd, onRemove }) => (
  <Card style={{ margin: 4 }}>
    <View>
      <DraggableFlatList
        data={exercises}
        renderItem={({ item, index, move, moveEnd }) => (
          <Swipeout
            autoClose={true}
            right={[
              {
                text: 'Remove',
                backgroundColor: 'red',
                onPress: () => onRemove(index)
              }
            ]}
            backgroundColor="transparent"
          >
            <TouchableOpacity onLongPress={move} onPressOut={moveEnd}>
              <List.Item
                title={item.text}
                left={props => (
                  <List.Icon {...props} color={'#000'} icon="event-note" />
                )}
              />
            </TouchableOpacity>
          </Swipeout>
        )}
        keyExtractor={item => `item-${item.text}`}
        ItemSeparatorComponent={Divider}
        scrollPercent={5}
        onMoveEnd={({ data }) => onChange(data)}
      />
      <Divider />
      <AddExercise onAdd={onAdd} />
    </View>
  </Card>
)
ExercisesSettings.propTypes = {
  exercises: PropTypes.array,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  onAdd: PropTypes.func
}

export default ExercisesSettings
