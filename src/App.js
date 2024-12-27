import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import { ModalHeader } from "react-bootstrap";

const initialCategories = {
  Казу: 3,
  "Окей Гугл": 3,
  Реверс: 3,
  "Без зайвих слів": 3,
  "Без зайвих слів 2": 3,
  ДоРеМікси: 3,
  Гітара: 3,
};

const tracks = {
  Казу: [
    "Somewhere in my memory",
    "Carol of the Bells",
    "All I Want for Christmas is You",
  ],
  "Окей Гугл": [
    "Let it snow",
    "Last Christmas",
    "It's the most wonderful time of the year",
  ],
  Реверс: ["Чи знала ти, Маріє", "Тиха ніч", "Нова радість"],
  "Без зайвих слів": [
    "Радуйся світ",
    "Небо і земля нині торжествують",
    "Бог ся рождає",
  ],
  "Без зайвих слів 2": [
    "Jingle bell rock",
    "Jinglle bells",
    "Rockin' around the Christmas tree",
  ],
  ДоРеМікси: ["You're a mean one Mr. Grinch", "Feliz Navidad", "Лускунчик"],
  Гітара: [
    "Добрий вечір тобі",
    "We wish you a merry Christmas",
    "Різдвяна (слав Царя усе творіння)",
  ],
};

function App() {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [backgroundAudio] = useState(
    new Audio("songs/Backgroung Relaxing Jazz.mp3")
  );
  const [gameStarted, setGameStarted] = useState(false);

  const handleCategoryClick = (category) => {
    if (categories[category] > 0) {
      setSelectedCategory(category);
      setCurrentTrackIndex(3 - categories[category]); // Calculate the index of the next track
      setShowAnswer(false);
      stopBackgroundMusic();
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleBack = () => {
    setCategories((prev) => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory] - 1,
    }));
    setSelectedCategory(null);
    startBackgroundMusic();
  };

  const incrementScore = (team) => {
    if (team === 1) {
      setTeam1Score((prev) => prev + 1);
    } else {
      setTeam2Score((prev) => prev + 1);
    }
  };

  const decrementScore = (team) => {
    if (team === 1 && team1Score > 0) {
      setTeam1Score((prev) => prev - 1);
    } else if (team === 2 && team2Score > 0) {
      setTeam2Score((prev) => prev - 1);
    }
  };

  const startBackgroundMusic = () => {
    backgroundAudio.play();
  };

  const stopBackgroundMusic = () => {
    backgroundAudio.pause();
    backgroundAudio.currentTime = 0;
  };

  const startGame = () => {
    setGameStarted(true);
    startBackgroundMusic();
  };

  return (
    <div id="app">
      <h1 id="title">Відгадай мелодію</h1>

      {gameStarted ? (
        <>
          {selectedCategory ? (
            <div id="song-wrapper">
              <h2>Категорія: {selectedCategory}</h2>

              <audio controls>
                <source
                  src={`songs/${tracks[selectedCategory][currentTrackIndex]}.mp3`}
                  type="audio/mpeg"
                />
                Ваш браузер не підтримує аудіо.
              </audio>
              <button className="generic-btn" onClick={handleShowAnswer}>
                Показати відповідь
              </button>
              <Modal
                show={showAnswer}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header>
                  <Modal.Title>
                    {tracks[selectedCategory][currentTrackIndex].replace(
                      /\.mp3$/,
                      ""
                    )}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                  <audio controls>
                    <source
                      src={`songs/${tracks[selectedCategory][currentTrackIndex]}-original.mp3`}
                      type="audio/mpeg"
                    />
                    Ваш браузер не підтримує аудіо.
                  </audio>
                  <button className="generic-btn" onClick={handleBack}>
                    До категорій
                  </button>
                </Modal.Body>
              </Modal>
              {/* {!showAnswer ? (
              <button onClick={handleShowAnswer}>Показати відповідь</button>
            ) : (
                 <div id="answer">
                    <audio controls>
                        <source
                        src={`songs/${tracks[selectedCategory][currentTrackIndex]}-original.mp3`}
                        type="audio/mpeg"
                        />
                        Ваш браузер не підтримує аудіо.
                    </audio>
                  <p>
                    Відповідь:{" "}
                    </p>
                    <p className="song-name">
                    {tracks[selectedCategory][currentTrackIndex].replace(
                      /\.mp3$/,
                      ""
                    )}
                  </p>
                  <button onClick={handleBack}>Повернутися</button>
                </div> 
            )} */}
              <img
                src="musical-notes-joypixels.gif"
                alt="notes"
                className="notes"
              />
            </div>
          ) : (
            <div id="categories-container">
              {Object.entries(categories).map(([category, count]) => (
                <div className="category-wrapper" key={category}>
                  <button
                    className="category-btn"
                    onClick={() => handleCategoryClick(category)}
                    disabled={count === 0}
                  >
                    {category}
                    <div className="count">{count}/3</div>
                  </button>
                </div>
              ))}
            </div>
          )}
          <div id="teams-container">
            <div class="team">
              <h3 className="team-name" contentEditable>
                Команда 1
              </h3>
              <p>{team1Score}</p>
              <div className="score-management">
                <button onClick={() => decrementScore(1)}>-</button>
                <button onClick={() => incrementScore(1)}>+</button>
              </div>
            </div>
            <div class="team">
              <h3 className="team-name" contentEditable>
                Команда 2
              </h3>
              <p>{team2Score}</p>
              <div className="score-management">
                <button onClick={() => decrementScore(2)}>-</button>
                <button onClick={() => incrementScore(2)}>+</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <button id="start-game-btn" onClick={startGame}>
          Почати гру
        </button>
      )}
    </div>
  );
}

export default App;
