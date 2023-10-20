import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";

export default function Content() {
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [joke, setJoke] = useState("");
  const [category, setCategory] = useState("Any");
  const [isSalut, setIsSalut] = useState(false);
  const [isInitialRequest, setIsInitialRequest] = useState(true)

  useEffect(() => {
    // Generate the greeting based on the time of day
    const date = new Date();
    const hours = date.getHours();

    if (hours < 6) {
        setGreeting("Good night");
      } else if (hours < 12) {
        setGreeting("Top of the morning");
      } else if (hours < 17) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
      
  }, []);

  // Function to fetch a random joke from JokeAPI
  async function fetchJoke() {
    const response = await fetch(
      `https://v2.jokeapi.dev/joke/${category}`
    );
    if (response.ok) {
      const data = await response.json();
      
      return data;
    } else {
      return {
        error: true,
        message: "Sorry, couldn't fetch a joke at the moment.",
      };
    }
  }

  const handleNameChange = (event) => {
    const inputName = event.target.value
    let formattedName = inputName.charAt(0).toUpperCase() + inputName.slice(1).toLowerCase()
    setUserName(formattedName)
    setIsSalut(true)
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleGetJoke = () => {
    setIsInitialRequest(false);
    fetchJoke().then((joke) => setJoke(joke));
  };

  return (
    <div className="content">
      <p>Input your alias for a formal greeting from the developer:</p>
      <input
        type="text"
        className="form--input"
        placeholder="Your Alias"
        value={userName}
        onChange={handleNameChange}
        
      />
      <hr />
      <h1>
        {isSalut && greeting}
        {userName && <strong>, {userName}!</strong>}
      </h1>
      <hr />
      <Typewriter
        options={{
          strings: [
            "I am Ian Kitembe",
            "I am a full-stack software engineer",
            "I am a React developer",
            "This is a React project",
            "Make sure to beat your high score on the Tenzies game",
            "Feel free to contact me for my services",
          ],
          autoStart: true,
          loop: true,
        }}
      />
      <hr />
      <div className="radio-button-container">
        <p>Interested in a joke? Select a category:</p>
            <div className="radio">
                <input
                    type="radio"
                    id="anyRadio"
                    value="Any"
                    checked={category === "Any"}
                    onChange={handleCategoryChange}
                />
                <label className="radio-label" htmlFor="anyRadio">Any</label>
            </div>
            <div className="radio">
                <input
                    type="radio"
                    id="programmingRadio"
                    value="Programming"
                    checked={category === "Programming"}
                    onChange={handleCategoryChange}
                />
                <label className="radio-label" htmlFor="programmingRadio">Programming</label>
            </div>
            <div className="radio">
                <input
                    type="radio"
                    id="spookyRadio"
                    value="Spooky"
                    checked={category === "Spooky"}
                    onChange={handleCategoryChange}
                />
                <label className="radio-label" htmlFor="spookyRadio">Spooky</label>
            </div>
            <div className="radio">
                <input
                    type="radio"
                    id="darkRadio"
                    value="Dark"
                    checked={category === "Dark"}
                    onChange={handleCategoryChange}
                />
                <label className="radio-label" htmlFor="darkRadio">Dark</label>
            </div>
            <div className="radio">
                <input
                    type="radio"
                    id="punRadio"
                    value="Pun"
                    checked={category === "Pun"}
                    onChange={handleCategoryChange}
                />
                <label className="radio-label" htmlFor="punRadio">Pun</label>
            </div>
            <div className="radio">
                <input
                    type="radio"
                    id="christmasRadio"
                    value="Christmas"
                    checked={category === "Christmas"}
                    onChange={handleCategoryChange}
                />
                <label className="radio-label" htmlFor="christmasRadio">Christmas</label>
            </div>
            <div className="radio">
                <input
                    type="radio"
                    id="miscRadio"
                    value="Misc"
                    checked={category === "Misc"}
                    onChange={handleCategoryChange}
                />
                <label className="radio-label" htmlFor="miscRadio">Misc</label>
            </div>
      </div>
      <button className="joke-button" onClick={handleGetJoke}>
        Get Joke
      </button>
      <br/>
      <br/>
        {isInitialRequest
          ? ""
          : joke.error
          ? joke.message
          : joke.type === "single"
          ? joke.joke
          : (
            <div
                dangerouslySetInnerHTML={{
                __html: `Setup: ${joke.setup}<br/><br/>${
                `Punchline:  <span style="font-weight: 600">${joke.delivery}</span>` 
             }`,
            }}
            />
          )}
      
      <p>Not funny? Click <strong>Get Joke</strong> again, or maybe not.</p>
      <hr/>
      <small>Joke served with &#x2764; by JokeAPI</small>
    </div>
  );
}
