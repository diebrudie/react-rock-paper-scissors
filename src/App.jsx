import { useState } from 'react'
import './App.css'
import {FaHandRock, FaHandPaper, FaHandScissors} from "react-icons/fa"
import PropTypes from 'prop-types';

const actions = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function getRandomAction(){
  const actionKeys = Object.keys(actions);
  const randomIndex = Math.floor(Math.random() * actionKeys.length);
  const randomAction = actionKeys[randomIndex];
  return randomAction;  
}

function calculateWinner(playerChoice, computerChoice) {  
  if (playerChoice === computerChoice) {
    return 0;
  }
  if (actions[playerChoice] === computerChoice) {
    return -1; // Player wins
  }
  return 1; // Computer wins
}

function ActionIcon({ action, ...props }) {
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,
  };

  const Icon = icons[action];
  return <Icon {...props}/>;
}

ActionIcon.propTypes = {
  action: PropTypes.oneOf(['rock', 'paper', 'scissors'])
};

function PlayerChoice({ action }) {
  return (
    <div className="main-game__emoji-wrp">
      {action && <ActionIcon action={action} size={100} />}
    </div>
  );
}

PlayerChoice.propTypes = {
  action: PropTypes.string,
};

function PlayerScore({ name, score }) {
  return (
    <div className="main-game__player">
      <div className="main-game__player-score">{score}</div>
      <div className="main-game__player-name">{name}</div>
    </div>
  );
}

PlayerScore.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
};

PlayerScore.defaultProps = {
  name: 'Player',
  score: 0,
};

function ActionButton({ action, onActionClick, ...props}) {
  return (
    <button className="btn main-game__btn-option" onClick={() => onActionClick(action)}>
      <ActionIcon action={action} {...props} />
    </button>
  );
}

ActionButton.propTypes = {
  action: PropTypes.oneOf(['rock', 'paper', 'scissors']),
};


function App() {  
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setcomputerScore] = useState(0);

  const [winnerMessage, setWinnerMessage] = useState('');

  const onActionClick = (selectedAction) => {
    const newComputerChoice = getRandomAction();
    setPlayerChoice(selectedAction);
    setComputerChoice(newComputerChoice);

    const winner = calculateWinner(selectedAction, newComputerChoice);
    if (winner === -1) {
      setPlayerScore(playerScore + 1);
      setWinnerMessage('You win!');
    } else if (winner === 1) {
      setcomputerScore(computerScore + 1);
      setWinnerMessage('Computer wins!');
    } else {
      setWinnerMessage('Draw!');
    }
  };

  return (
    <>
    <div className="page-wrapper">
      <div className="section">
        <div className="l-container is--flex-vcc is--min-100vh">
          <h1>Rock Paper Scissors</h1>
          <div className="main-game">
                <div className="main-game__visuals">
                  <div className="main-game__emojis-wrp">
                    <PlayerChoice action={playerChoice}/>  
                    <PlayerChoice action={computerChoice}/>  
                  </div>
                  <div className="main-game__message">{winnerMessage}</div>
                </div>
                <div className="main-game__players-info">
                  <PlayerScore name = "Player 1" score = {playerScore} />
                  <PlayerScore name = "Computer" score = {computerScore} />
                </div>
                <div className="main-game__options">
                   <ActionButton action="rock" size={40} onActionClick={onActionClick} />                  
                   <ActionButton action="paper" size={40} onActionClick={onActionClick} />                  
                   <ActionButton action="scissors" size={40} onActionClick={onActionClick} />                  
                </div>                
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
