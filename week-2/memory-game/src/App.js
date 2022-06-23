import "./App.css";
import React, { useEffect, useState } from "react";
import GameBoard from "./components/GameBoard";
function App() {
  const [won, setWon] = useState(false);
  const [cards, setCards] = useState([]);
  const [clicks, setClick] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  // useEffect(() => {
  //   generateBoard();
  // }, []);
  const increaseClick = () => {
    setClick(clicks + 1);
  }
  const getImageUrl = (randomNumber) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomNumber}.png`;
  }
  const uid = function(){
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  const shuffleCards = (cards) => {
    var len = cards.length;
    let currentIndex = cards.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [cards[currentIndex], cards[randomIndex]] = [
        cards[randomIndex], cards[currentIndex]];
    }
    return cards;
  }
  const generateBoard = () => {
    let noOfDifferentImages = 12;
    var cards = []
    for(let i = 0;i<noOfDifferentImages;i++)
    {
      var id1 = uid();
      var id2 = uid();
      var imageId = Math.floor(Math.random() * 300) + 1;
      const card1 = {
        id: id1,
        matchesId: id2, 
        url: getImageUrl(imageId),
        flipped: false,
        found: false
      }
      const card2 = {
        id: id2,
        matchesId: id1, 
        url: getImageUrl(imageId),
        flipped: false,
        found: false
      }
      cards.push(card1);
      cards.push(card2);
    }
    cards = shuffleCards(cards);
    setCards(cards); 
    console.log(cards);
  }
  const hasWon = () => {
    setWon(true);
  }
  const startGame = () => {
    generateBoard();
    document.getElementsByClassName("startButton")[0].setAttribute('style', "visibility: hidden");
    setWon(false);
    setDataLoaded(true);
  }
  return (
  <div className="App" style={{
    textAlign: 'center',
    width: '100vw',
    height: '100vh'
  }}>
    <div className="board-container" style={{
      width: '100%',
      height: '75%',
    }}>
      {dataLoaded && 
      <GameBoard cards={cards} won={hasWon} click={increaseClick} /> }
      {dataLoaded && 
        <p className="noOfClicks">Total Flips: {clicks}</p> 
      }
    </div>
    <div>
      {won && <h2>Congrats!! You win!</h2>}
      <button onClick={startGame} className="startButton">
        Start Game
      </button>
      {won && <button className="restartButon" onClick={startGame}>Restart</button>}
    </div>    
  </div>
  );
}

export default App;
