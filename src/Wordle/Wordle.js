import React from 'react';
import RICIBs from 'react-individual-character-input-boxes';
import validWords from './validWords.json';
import './Wordle.css';

class Wordle extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            word: ""
        };
        
        this.validWords = validWords;
    }
    
    handleInputchange(event, value=undefined) {
        let name;
        let outputValue;
        
        if (event.target) {
            name = event.target.name;
            outputValue = value ? value : event.target.value;
        }
        else {
            name = event;
            outputValue = value;
        }
        
        let callback = null;
        
        if (name === "word") {
            if (value.length > 5) {
                return;
            }
            
            if (value.length === 5) {
                callback = this.parseWords
            }
        }
        
        this.setState({
            [name]: outputValue
        }, callback);
    }
    
    parseWords() {
        
    }
    
    render() {
        return (
            <div className="wordle main-container">
                <div className="wordle container">
                    <div className="wordle input-title">Input Word 
                        <span className="wordle help word material-icons">
                            help
                            <div className="wordle help-box word">Letters that you know the location of, in the correct location</div>
                        </span>
                    </div>
                    <RICIBs
                        amount={5}
                        handleOutputString={(string) => this.handleInputchange("word", string)}
                        inputProps={[
                            { className: "wordle word-input-box" },
                            { className: "wordle word-input-box" },
                            { className: "wordle word-input-box" },
                            { className: "wordle word-input-box" },
                            { className: "wordle word-input-box" }
                        ]}
                        inputRegExp={/[A-z]/}
                    />
                    <div className="wordle known-letters-title">Known Letters 
                        <span className="wordle help known material-icons">
                            help
                            <div className="wordle help-box word">Letters that you don't know the location of, in any order</div>
                        </span>
                    </div>
                    <RICIBs
                        amount={5}
                        handleOutputString={(string) => this.handleInputchange("knownLetters", string)}
                        inputProps={[
                            { className: "wordle known-letter-input-box" },
                            { className: "wordle known-letter-input-box" },
                            { className: "wordle known-letter-input-box" },
                            { className: "wordle known-letter-input-box" },
                            { className: "wordle known-letter-input-box" }
                        ]}
                        inputRegExp={/[A-z]/}
                    />
                </div>
            </div>
        );
    }
}

export default Wordle;