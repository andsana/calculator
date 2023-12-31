import {createSlice} from '@reduxjs/toolkit';

interface CalculatorState {
  expression: string;
  result: number;
  isActive: boolean;
}

const initialState: CalculatorState = {
  expression: '',
  result: 0,
  isActive: true,
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
    clear: (state) => {
      state.expression = state.expression.slice(0, -1);
      const resultAsString = state.result.toString();
      state.result = parseFloat(resultAsString.slice(0, -1));

      if (state.expression.length === 0) {
        state.expression = '0';
        state.result = 0;
      }
    },
    getResult: (state) => {
      try {
        state.isActive = !state.isActive;
        state.result = eval(state.expression);
        state.expression = state.result.toString();
      } catch (e) {
        state.result = NaN;
      }
    },
    showResult: (state) => {
      state.isActive = true;
    },
    hideResult: (state) => {
      state.isActive = false;
    },
  }
});

export const calculatorReducer = calculatorSlice.reducer;

export const {
  update,
  clear,
  getResult,
  showResult,
  hideResult
} = calculatorSlice.actions;

