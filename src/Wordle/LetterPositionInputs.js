import './LetterPositionInputs.css';

function LetterPositionInputs (props) {
  const inputElements = [];

  for (let i = 0; i < 5; i++) {
    inputElements.push(
      <input name={props.name} type='text' className={`letter-position-input ${props.name === 'invalid' ? 'invalid-inputs' : ''}`} value={props.letters[i]} onChange={(e) => props.handleInputChange(e, i)} />
    );
  }

  return (
    <div className='letter-position-inputs-container'>
      {inputElements}
    </div>
  );
}

export default LetterPositionInputs;
