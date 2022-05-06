import React from 'react';
import KnownLettersInput from './KnownLettersInput';
import validWords from './validWords.json';
import letterProbabilities from './letterProbabilities.json';
import './Wordle.css';
import LetterPositionInput from './LetterPositionInput';

class Wordle extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      word: [
        '',
        '',
        '',
        '',
        ''
      ],
      wordExclusions: [
        [
          '',
          '',
          '',
          '',
          ''
        ],
        [
          '',
          '',
          '',
          '',
          ''
        ],
        [
          '',
          '',
          '',
          '',
          ''
        ]
      ],
      knownLetters: [],
      invalidLetters: [],
      validWords: []
    };

    this.words = [];
    this.validWords = [];

    for (const word of validWords) {
      this.words.push({
        word,
        probability: 1
      });
    }
  }

  handleInputchange (event, index, exclusionNumber = null) {
    if (event.target.value.length > 1) {
      return;
    }

    if (exclusionNumber == null) {
      const word = this.state.word;

      word[index] = event.target.value;

      this.setState({
        word
      }, this.parseWords);
    } else {
      const wordExclusions = this.state.wordExclusions;

      wordExclusions[exclusionNumber][index] = event.target.value;

      this.setState({
        wordExclusions
      }, this.parseWords);
    }
  }

  toggleKnownLetter (event, letter) {
    const knownLetters = this.state.knownLetters;
    const invalidLetters = this.state.invalidLetters;

    if (knownLetters.includes(letter)) {
      const index = knownLetters.indexOf(letter);

      knownLetters.splice(index, 1);
      invalidLetters.push(letter);
      event.target.indeterminate = true;
    } else if (invalidLetters.includes(letter)) {
      const index = invalidLetters.indexOf(letter);

      invalidLetters.splice(index, 1);
      event.target.checked = false;
    } else {
      knownLetters.push(letter);
      event.target.checked = true;
    }

    this.setState({
      knownLetters,
      invalidLetters
    }, this.parseWords);
  }

  parseWords () {
    this.validWords = [];

    for (const word of this.words) {
      let valid = true;

      for (const letter of this.state.knownLetters) {
        if (!word.word.includes(letter.toLowerCase())) {
          valid = false;
        }
      }
      for (const letter of this.state.invalidLetters) {
        if (word.word.includes(letter.toLowerCase())) {
          valid = false;
        }
      }

      const wordLetters = word.word.split('');
      for (let i = 0; i < 5; i++) {
        if (wordLetters[i] !== this.state.word[i].toLowerCase() && this.state.word[i] !== '') {
          valid = false;
        }

        for (const exclusions of this.state.wordExclusions) {
          if (wordLetters[i] === exclusions[i].toLowerCase() && exclusions[i] !== '') {
            valid = false;
          }
        }
      }

      if (valid) {
        let probability = 1;
        const lettersInWord = [];
        let include = true;

        for (const letter of word.word) {
          if (((this.state.knownLetters.length === 0 && this.state.invalidLetters.length === 0) || this.state.knownLetters.length < 3) && lettersInWord.includes(letter)) {
            include = false;
          }

          probability *= (letterProbabilities[letter]) / 10;
          lettersInWord.push(letter);
        }

        probability = Math.round(probability * 10000) / 10000;

        if (include) {
          if (this.validWords.length !== 0) {
            let inserted = false;
            for (let i = 0; i < this.validWords.length; i++) {
              if (probability > this.validWords[i].probability) {
                this.validWords.splice((i - 1 < 0 ? 0 : i - 1), 0, {
                  word: word.word,
                  probability
                });
                inserted = true;
                break;
              }
            }

            if (!inserted) {
              this.validWords.push({
                word: word.word,
                probability
              });
            }
          } else {
            this.validWords.push({
              word: word.word,
              probability
            });
          }
        }
      }
    }

    this.setState({
      validWords: this.validWords
    });
  }

  componentDidMount () {
    this.parseWords();
  }

  render () {
    const wordElements = [];

    for (const word of this.state.validWords) {
      if (wordElements.length === 100) {
        break;
      }

      wordElements.push(
        <div key={word.word} className='wordle words-list-item'>
          <div className='wordle words-list-item-word'>{word.word}</div>
          <div className='wordle words-list-item-probability'>{word.probability.toLocaleString()}</div>
        </div>
      );
    }

    return (
      <div className='wordle main-container'>
        <div className='wordle container'>
          <div className='wordle input-container'>
            <LetterPositionInput letters={this.state.word} exclusions={this.state.wordExclusions} handleInputChange={(e, i, n) => this.handleInputchange(e, i, n)} />
            <KnownLettersInput toggleLetter={(e, l) => this.toggleKnownLetter(e, l)} />
          </div>
          <div className='wordle words-list-container'>
            <div className='wordle words-list-title'>Best Guesses</div>
            <div className='wordle words-list'>
              {wordElements}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Wordle;
