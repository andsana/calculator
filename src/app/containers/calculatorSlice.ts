import {createSlice} from '@reduxjs/toolkit';

interface CalculatorState {
  expression: string;
  result: number;
}

const initialState: CalculatorState = {
  expression: '',
  result: 0,
};

const isOperator = (char: string) => {
  return ['+', '-', '*', '/'].includes(char);
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    update: (state, action) => {
      const newChar = action.payload;
      const lastChar = state.expression[state.expression.length - 1];
      const beforeLastChar = state.expression[state.expression.length - 2];

      if (isOperator(newChar) && isOperator(lastChar)) {
        if (newChar === '-' && lastChar !== '-' && lastChar !== '+') {
          state.expression += newChar;
        } else {
          state.expression = state.expression.slice(0, -1) + newChar;
        }
      } else if (
        ((isOperator(beforeLastChar) && (lastChar === '0') && (newChar !== '.')))
        || (lastChar === '0' && newChar !== '.') || (lastChar === '.' && newChar === '.')
        || (beforeLastChar === '.' && lastChar === '.' && newChar === '.')
      ) {
        state.expression = state.expression.slice(0, -1) + newChar;
      } else if (isOperator(lastChar) && (newChar === '.')) {
        state.expression += '0' + newChar;
      } else {
        state.expression += action.payload;
      }
    },
  }
});

export const calculatorReducer = calculatorSlice.reducer;

export const {
  update,
} = calculatorSlice.actions;
