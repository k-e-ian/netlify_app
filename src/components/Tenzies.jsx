import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die";

const Tenzies = () => {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [highScore, setHighScore] = useState(getHighScoreFromLocalStorage());
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;

    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue && !tenzies) {
      setTenzies(true);
      setIsRunning(false);

      let currentScore = {
        rolls: rollCount,
        time: {
          minutes: elapsedMinutes,
          seconds: elapsedSeconds,
        },
        value: firstValue,
      };
      let savedHighScore = getHighScoreFromLocalStorage();

      if (!savedHighScore || isBetterScore(currentScore, savedHighScore)) {
        setHighScore(currentScore);
        saveHighScoreToLocalStorage(currentScore);

        // Check if the current score beats the previous high score
        if (!showConfetti && isBetterScore(currentScore, savedHighScore)) {
          setShowConfetti(true);

          // Reset confetti after 20 seconds
          setTimeout(() => {
            setShowConfetti(false);
          }, 20000);
        }
      }
    }
  }, [dice, tenzies, rollCount, elapsedTime]);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, tenzies]);

  function generateNewDie() {
    return {
      value: Math.trunc(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function holdDice(id) {
    if (!isRunning) {
      setIsRunning(true);
    }
    setDice((oldDice) =>
      oldDice.map((die) => {
        console.log(die.isHeld);
        return id === die.id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die;
      })
    );
  }

  function rollDice() {
    if (tenzies) {
      setIsRunning(false);
      setElapsedTime(0);
      setRollCount(0);
      setTenzies(false);
      setDice(allNewDice());
      setShowConfetti(false)
    } else {
      if (!isRunning) {
        setIsRunning(true);
      }
      setRollCount((prevCount) => prevCount + 1);
      setDice((oldDice) =>
        oldDice.map((die) => (die.isHeld === true ? die : generateNewDie()))
      );
    }
  }

  let diceElements = dice.map((die) => (
    <Die
      holdDice={() => holdDice(die.id)}
      isHeld={die.isHeld}
      key={die.id}
      value={die.value}
    />
  ));

  const elapsedMinutes = Math.floor(elapsedTime / 60000);
  const elapsedSeconds = Math.floor((elapsedTime % 60000) / 1000);

  function getHighScoreFromLocalStorage() {
    const highScoreString = localStorage.getItem("highScore");
    return highScoreString ? JSON.parse(highScoreString) : null;
  }

  function saveHighScoreToLocalStorage(highScore) {
    localStorage.setItem("highScore", JSON.stringify(highScore));
  }

  function isBetterScore(currentScore, savedScore) {
    // Compare based on rolls or time
    if (!savedScore) {
      return true; // Current score is better by default if no saved score
    }
    if (currentScore.rolls < savedScore.rolls) {
      return true;
    } else if (currentScore.rolls === savedScore.rolls) {
      if (currentScore.time.minutes < savedScore.time.minutes) {
        return true;
      } else if (currentScore.time.minutes === savedScore.time.minutes) {
        return currentScore.time.seconds < savedScore.time.seconds;
      }
    }
    return false;
  }

  return (
    <>
      {showConfetti && <Confetti />}
      <div className='tenzies' id='tenzies'>
        <h1 className='title'>Tenzies</h1>
        <p className='instructions'>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <small className='instructions-italic'>
          Game Starts at dice-roll or die-freeze instance.
        </small>
        <br />
        <code
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", // Subtle text shadow
            textAlign: "center",
          }}
        >
          🏆 Best Score: {highScore?.rolls} Rolls | {highScore?.time?.minutes}m{" "}
          {highScore?.time?.seconds}s | Value: {highScore?.value}
        </code>
        <br />
        <div className='dice-container'>{diceElements}</div>
        <button className='dice-roll' onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
        <div className='time-display'>
          {isRunning && !tenzies ? (
            <small>
              Time: {elapsedMinutes}m {elapsedSeconds}s
            </small>
          ) : null}
        </div>
        <br />
        <small style={{ fontFamily: "Inter" }}>
          {tenzies
            ? `You won in ${rollCount} rolls. Time taken: ${elapsedMinutes}m ${elapsedSeconds}s`
            : `Your Roll Count is ${rollCount}`}
        </small>
      </div>
    </>
  );
};

export default Tenzies;
