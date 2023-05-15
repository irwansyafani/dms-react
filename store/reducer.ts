const {ADD, DELETE, READ, UPDATE} = require('./types');

const initialState = {
  todos: [],
};
export const todoReducer = (
  state = initialState,
  action: {type: string; data: any},
) => {
  switch (action.type) {
    case ADD:
      return {
        ...initialState,
        todos: [...state.todos, action.data],
      };
    case READ:
      return state;
    case UPDATE:
      return {
        ...initialState,
        todos: action.data,
      };
    case DELETE:
      return {
        ...initialState,
        todos: action.data,
      };
    default:
      return state;
  }
};
