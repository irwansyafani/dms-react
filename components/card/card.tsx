import {UPDATE, DELETE} from '../../store/types';
import React, {PropsWithChildren, useState} from 'react';
import {
  Button,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './card-style';

type SectionProps = PropsWithChildren<{
  title: string;
  index: number;
  status: boolean;
}>;

export const Card = ({title, index, status}: SectionProps): JSX.Element => {
  const dispatch = useDispatch();
  const todos = useSelector((state: {todos: object[]}) => state.todos);
  const [textInputUpdate, setTextInputUpdate] = useState('');

  const onUpdateTodo = () => {
    const updated = todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          title: textInputUpdate,
        };
      } else {
        return todo;
      }
    });
    dispatch({type: UPDATE, data: updated});
    setTextInputUpdate('');
  };

  const onUpdateStatusTodo = (value: boolean) => {
    const updated = todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          completed: value,
        };
      } else {
        return todo;
      }
    });
    dispatch({type: UPDATE, data: updated});
    setTextInputUpdate('');
  };

  const onDeleteTodo = (idx: number) => {
    const filtered = todos.filter((_, i) => i !== idx);
    dispatch({type: DELETE, data: filtered});
  };

  return (
    <View
      style={{
        ...styles.wrapper,
        backgroundColor: status ? 'lightgreen' : 'white',
      }}>
      {textInputUpdate ? (
        <View>
          {/* ON EDITING */}
          <TextInput
            placeholder="Message"
            autoFocus={true}
            value={textInputUpdate}
            onChangeText={setTextInputUpdate}
            onSubmitEditing={e => {
              e.preventDefault();
              setTextInputUpdate(e.nativeEvent.text);
            }}
            onKeyPress={e => {
              e.nativeEvent.key === 'Enter' ? Keyboard.dismiss() : null;
            }}
          />
          <Button
            onPress={() => onUpdateStatusTodo(!status)}
            title={status ? 'Change to Todo' : 'Change to Done'}
          />
        </View>
      ) : (
        <Text style={styles.textColor}>{title}</Text>
      )}
      {textInputUpdate ? (
        <View style={styles.iconsWrapper}>
          {/* ON EDITING */}
          <TouchableOpacity
            onPress={onUpdateTodo}
            style={{...styles.buttonsOpts, marginRight: 2}}>
            <Image
              source={require('../../assets/ic-checkmark.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTextInputUpdate('')}
            style={styles.buttonsOpts}>
            <Image
              source={require('../../assets/ic-crossmark.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.iconsWrapper}>
          {/* ON SHOW ONLY */}
          <TouchableOpacity
            onPress={() => setTextInputUpdate(title)}
            style={{...styles.buttonsOpts, marginRight: 2}}>
            <Image
              source={require('../../assets/ic-pencil.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDeleteTodo(index)}
            style={styles.buttonsOpts}>
            <Image
              source={require('../../assets/ic-trash.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
