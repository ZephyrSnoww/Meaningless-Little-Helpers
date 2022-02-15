import HelpBox from '../HelpBox';
import './LetterPositionInput.css';
import LetterPositionInputs from './LetterPositionInputs';

function LetterPositionInput(props) {
    let inputElements = [];
    
    for (let i = 0; i < 5; i++) {
        inputElements.push(
            <input type="text" className="letter-position-input" value={props.letters[i]} onChange={(e) => props.handleInputChange(e, i)} />
        );
    }
    
    return (
        <div className="letter-position-input-container">
            <div className="letter-position-input-title">
                Letter Positions
                <HelpBox text="Type the letters you know the location of, in the correct slot! (Lower inputs are for specifying which letters *dont* go in a specific slot)" />
            </div>
            <LetterPositionInputs name="" letters={props.letters} handleInputChange={(e, i) => props.handleInputChange(e, i)} />
            <LetterPositionInputs name="invalid" letters={props.exclusions[0]} handleInputChange={(e, i) => props.handleInputChange(e, i, 0)} />
            <LetterPositionInputs name="invalid" letters={props.exclusions[1]} handleInputChange={(e, i) => props.handleInputChange(e, i, 1)} />
            <LetterPositionInputs name="invalid" letters={props.exclusions[2]} handleInputChange={(e, i) => props.handleInputChange(e, i, 2)} />
        </div>
    );
}

export default LetterPositionInput;