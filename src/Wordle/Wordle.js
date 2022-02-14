import React from 'react';
import RICIBs from 'react-individual-character-input-boxes';
import validWords from './validWords.json';
import './Wordle.css';

class Wordle extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            word: "",
            knownLetters: "",
            validWords: []
        };

        this.words = [];
        this.validWords = [];
        
        for (let word of validWords) {
            this.words.push({
                word,
                probability: 1
            });
        }
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
        
        if (name === "word" || name === "knownLetters") {
            callback = this.parseWords
        }
        
        this.setState({
            [name]: outputValue
        }, callback);
    }
    
    parseWords() {
        this.validWords = [];
        for (let word of this.words) {
            let valid = true;
            for (let letter of this.state.knownLetters) {
                if (!word.word.includes(letter)) {
                    valid = false;
                }
            }
            if (valid) {
                this.validWords.push(word.word);
            }
        }
        this.setState({
            validWords: this.validWords
        });
    }
    
    render() {
        let wordElements = [];

        for (let word of this.state.validWords) {
            wordElements.push(
                // <div key={word.word} className="wordle words-list-item">{word.word} {word.probability * 100}</div>
                <div key={word} className="wordle words-list-item">{word}</div>
            );
        }

        return (
            <div className="wordle main-container">
                <div className="wordle container">
                    <div className="wordle input-container">
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
                        {/* <RICIBs
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
                        /> */}
                        <input name="knownLetters" className="wordle known-letter-input" onChange={(e) => this.handleInputchange(e)} value={this.state.knownLetters} />
                    </div>
                    <div className="wordle words-list-container">
                        <div className="wordle words-list-title">Best Guesses</div>
                        <div className="wordle words-list">
                            {wordElements}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Wordle;
