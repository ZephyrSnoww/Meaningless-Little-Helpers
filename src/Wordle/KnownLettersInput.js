import HelpBox from '../HelpBox';
import letters from './letters.json';
import './KnownLettersInput.css';

function KnownLettersInput(props) {
    let letterElements = [];
    
    for (let letter of letters) {
        letterElements.push(
            <div key={letter} className="known-letters-letter-checkbox-container">
                <input type="checkbox" className="known-letters-letter-checkbox" onClick={(e) => props.toggleLetter(e, letter)} />
                <div className="known-letters-letter-checkbox-label">{letter}</div>
            </div>
        );
    }
    
    return (
        <div className="known-letters-input-container">
            <div className="known-letters-input-title">
                Known Letters
                <HelpBox text="Select the letters that you know are in the word! (Click a letter twice to disable it)" />
            </div>
            <div className="known-letters-selection-container">
                {letterElements}
            </div>
        </div>
    );
}

export default KnownLettersInput;