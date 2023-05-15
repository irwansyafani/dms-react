import axios from 'axios';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SelectDropdown from 'react-native-select-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {ADD, UPDATE} from './store/types';
import {Card} from './components/card/card';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const todos =
    useSelector(
      (state: {
        todos: {
          completed: boolean;
          id: number;
          userId: number;
          title: string;
        }[];
      }) => state?.todos,
    ) || [];
  const [filteredTodos, setFilteredTodos] = useState<object[]>([]);

  const [textInput, setTextInput] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    padding: 10,
    paddingBottom: 20,
  };

  const onFilteringData = (status: 'COMPLETED' | 'TODO' | 'ALL') => {
    switch (status) {
      case 'COMPLETED':
        const completedOnly = todos.filter(todo => todo.completed) || todos;
        setFilteredTodos(completedOnly);
        break;
      case 'TODO':
        const todoOnly = todos.filter(todo => !todo.completed) || todos;
        setFilteredTodos(todoOnly);
        break;
      default:
        setFilteredTodos(todos);
    }
  };

  const onSubmit = () => {
    dispatch({
      type: ADD,
      data: {
        userId: 1,
        id: todos[todos.length - 1].id + 1 || 1,
        title: textInput,
        completed: false,
      },
    });
    setTextInput('');
  };

  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(({data}) => dispatch({type: UPDATE, data: data}))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Message"
            value={textInput}
            onChangeText={setTextInput}
            onSubmitEditing={e => {
              e.preventDefault();
              setTextInput(e.nativeEvent.text);
            }}
            onKeyPress={e => {
              e.nativeEvent.key === 'Enter' ? Keyboard.dismiss() : null;
            }}
          />
          <TouchableOpacity onPress={onSubmit} style={styles.addButton}>
            <Image
              source={require('./assets/ic-paperplane.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <SelectDropdown
          buttonStyle={styles.dropdown}
          data={['ALL', 'COMPLETED', 'TODO']}
          defaultValue={'ALL'}
          onSelect={onFilteringData}
          buttonTextAfterSelection={selectedItem => selectedItem}
          rowTextForSelection={item => item}
        />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.darker : Colors.white,
          }}>
          {filteredTodos.map((todo: any, i) => (
            <Card
              key={i}
              title={todo.title}
              index={i}
              status={todo.completed}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    width: 30,
    height: 30,
    padding: 5,
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  icon: {width: 20, height: 20},
  dropdown: {width: '100%', marginBottom: 20},
});

export default App;
