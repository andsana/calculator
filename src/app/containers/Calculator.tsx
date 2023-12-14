import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {clear, update, getResult, showResult, hideResult} from './calculatorSlice';
import './Calculator.css';

const Calculator = () => {
  const calculatorExpression = useSelector((state: RootState) => state.calculator.expression);
  const calculatorResult = useSelector((state: RootState) => state.calculator.result);
  const calculatorIsActive = useSelector((state: RootState) => state.calculator.isActive);
  const dispatch = useDispatch();

  const show = calculatorIsActive ? calculatorResult : calculatorExpression;

  const onButtonClick = (char: string) => {
    if (char === '=') {
      dispatch(getResult());
      dispatch(showResult());
    } else {
      dispatch(update(char));
      dispatch(hideResult());
    }
  };

  return (
    <>
      <h4 className="m-3">Calculator</h4>
      <div className="calculator">
        <div className="display">
          <p>{show}</p>
        </div>
        <div className="buttons d-flex flex-column">
          <div>
            <button onClick={() => onButtonClick('7')}>7</button>
            <button onClick={() => onButtonClick('8')}>8</button>
            <button onClick={() => onButtonClick('9')}>9</button>
            <button onClick={() => onButtonClick('+')}>+</button>
          </div>
          <div>
            <button onClick={() => onButtonClick('4')}>4</button>
            <button onClick={() => onButtonClick('5')}>5</button>
            <button onClick={() => onButtonClick('6')}>6</button>
            <button onClick={() => onButtonClick('-')}>-</button>
          </div>
          <div>
            <button onClick={() => onButtonClick('1')}>1</button>
            <button onClick={() => onButtonClick('2')}>2</button>
            <button onClick={() => onButtonClick('3')}>3</button>
            <button onClick={() => onButtonClick('*')}>*</button>
          </div>
          <div className="d-flex">
            <button onClick={() => dispatch(clear())}>C</button>
            <button onClick={() => onButtonClick('0')}>0</button>
            <button onClick={() => onButtonClick('=')}>=</button>
            <div className="">
              <button className="divide" onClick={() => onButtonClick('/')}>/</button>
              <button className="point" onClick={() => onButtonClick('.')}>.</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;