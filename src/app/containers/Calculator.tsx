import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../store";
import {update} from './calculatorSlice'; // Импортируем showResult и hideResult

const Calculator = () => {
  const calculatorExpression = useSelector((state: RootState) => state.calculator.expression);
  const dispatch = useDispatch();


  const onButtonClick = (char: string) => {
      dispatch(update(char));
  };

  return (
    <>
      <h4 className="m-3">Calculator</h4>
      <div className="calculator p-3 m-3">
        <div className="display">
            <p>{calculatorExpression}</p>
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