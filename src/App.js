import React, { Component } from 'react';
import './App.css';
import artists from './artists.json';
import Wrapper from './components/Wrapper/Wrapper';
import Navtab from './components/Nav/Nav';
import Title from './components/Title/Title';
import ArtistCard from './components/ArtistCard/AristCard';


class App extends Component {

  state = {
    artists,
    score: 0,
    topScore: 0

  };

  componentDidMount() {
    this.setState({ artists: this.shuffleArtists(this.state.artists) });

  };

  shuffleArtists = artists => {
    let i = artists.length - 1;
    while (i > 0) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = artists[i];
      artists[i] = artists[j];
      artists[j] = temp;
      i--;
    }
    return artists;
  };


  handleCorrectGuess = newArtist => {
    const { topScore, score } = this.state;
    const newScore = score + 1;
    const newTopScore = Math.max(newScore, topScore);

    this.setState({
      artist: this.shuffleArtists(newArtist),
      score: newScore,
      topScore: newTopScore
    });
  };

  handleIncorrectguess = artists => {
    this.setState({
      artists: this.resetArtist(artists),
      score: 0
    });
  };

  resetArtist = artists => {
    const resetArtist = artists.map(item => ({ ...item, clicked: false }));
    return this.shuffleArtists(resetArtist);
  };


  handleItemClick = id => {
    let guessedCorrectly = false;
    const newArtist = this.state.artists.map(item => {
      const newItem = { ...item };
      if (newItem.id === id) {
        if (!newItem.clicked) {
          newItem.clicked = true;
          guessedCorrectly = true;
        }
      }
      return newItem;
    })
    guessedCorrectly
      ? this.handleCorrectGuess(newArtist)
      : this.handleIncorrectguess(newArtist);
  };


  render() {
    return (
      <Wrapper>

        <Navtab
          score={this.state.score}
          topScore={this.state.topScore}
        />

        <Title />

        {this.state.artists.map(artists => (
          <ArtistCard
            artist={artists.artist}
            image={artists.image}
            key={artists.id}
            id={artists.id}
            shake={!this.state.score && this.state.topScore}
            handleClick={this.handleItemClick}
          />
        ))
        }

      </Wrapper>

    );
  }
  

}

export default App;

