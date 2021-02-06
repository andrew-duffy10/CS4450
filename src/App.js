import {useState} from 'react';
import './App.css';

// Bulls and Cows Game
// Author: Andrew Duffy
// Credit/References: Nat Tuck's 01-29-21 Lecture notes https://github.com/NatTuck/scratch-2021-01/tree/master/4550/0129

function App() {
    const [secret,_setSecret] = useState(generateSecretCode()); // the randomly generated secret code
    const [guesses,setGuesses]=useState([]); // The list of previous guesses
    const [results,setResults]=useState([]); // The list of previous guess results
    const [text,setText]=useState(""); // What is currently in the user's textbox
    const [status,setStatus]=useState(""); // Any "messages" we need to display to the user- "You Win/Lose" or input errors.
    const [playing,setPlaying]=useState(true); // A bool representing whether the game is still going- used by the DOM to enable/disable buttons
    
    // Generates a random 4 digit string with each character between 0 and 9.
    function generateSecretCode() {
        let code = "";
        while (code.length < 4) {
            let x = Math.floor(Math.random()*10).toString();
            if (!code.includes(x)) {
                code+=x;
            }
        }

        return code;
        
    }
    
    // If the user presses enter while selecting the input text box, make a guess.
    // Credit to Nat Tuck's 01-29-21 'hangman' lecture notes
    function keyPress(ev) {
        if (ev.key == "Enter") {
            makeGuess();
        }
    }

    // Update's our internal text representation when the user updates the input text field.
    // Credit to Nat Tuck's 01-29-21 'hangman' lecture notes
    function updateText(ev) {
        let vv = ev.target.value;
        setText(vv);
    }
    
    // Verifies if a guess is valid. Returns true if the guess is valid, displays a message and returns false if not.
    function isValidGuess() {
        let len = text.length;
        if (len != secret.length) { // If the guess isn't the right length, not valid.
            setStatus("Guesses must be "+secret.length+" characters long.")
            return false;
        } else if (new Set(text).size != text.length) { // Checks if the digits in the guess are unique
            setStatus("Guesses must contain unique digits (no duplicates).")
            return false;
        } else if (isNaN(text) || text.includes(" ") || text.includes(".")) { // Checks if the guess only contains digits.
            setStatus("Guesses must only contain numbers.")
            return false;
        } else {
            return true;
        }
    }
    
    // Counts the number of bulls and cows are present in the current guess (if valid).
    // Clears the textbox and updates our state arrays.
    function makeGuess() {
        setText("");

        if (!isValidGuess()) {
            return
        } else {
            setStatus("")
        }
        
        let bulls = 0;
        let cows = 0;
        for (let i = 0; i < secret.length; i++) {
            if (text[i] == secret[i]) {
                bulls++;
            } else if (secret.includes(text[i])) {
                cows++;
            }
        }

        let out = bulls+'A'+cows+'B';
        let newguesses = guesses.concat(text);
        setGuesses(newguesses);
        let newresults = results.concat(out);
        setResults(newresults);
        
        if (bulls == secret.length) {
            endGame(true);
        } else if ((guesses.length+1) >= 8){
            endGame(false);
        }
        
    }
    
    // Ends the game by setting 'playing' to false. Also displays a win or lose message depending on the bool "win"
    function endGame(win) {
        if (win) {
            setStatus("You won!");
        } else {
            setStatus("Game Over. Answer: "+secret);
        }
        setPlaying(false);
    }
    
    // Used by the DOM to pull values from our saved states, namely "guesses" and "results"
    function getVal(from_array,idx) {
        if (from_array.length >= idx) {
            return from_array[idx-1];
        } else {
            return;
        }
    }
    
    // Resets the game to default values
    function resetGame() {
        setGuesses([]);
        setResults([]);
        _setSecret(generateSecretCode());
        setText("");
        setStatus("");
        setPlaying(true);
    }



    return (
        <div className="App">
            <h1>4digits</h1> 
            <p>
            <input type="text"
                value={text}
                onChange={updateText}
                onKeyPress={keyPress} 
                disabled={!playing}/>
            <button onClick={makeGuess} disabled={!playing}>Guess</button>
            </p>
      
            <p>
            <button onClick={resetGame}>Reset</button>
            </p>
            <h2>{status}</h2>
            <p>
            <table>
            <tr><th></th><th>Guess</th><th>Result</th></tr>
            <tr><td>1</td><td>{getVal(guesses,1)}</td><td>{getVal(results,1)}</td></tr>
            <tr><td>2</td><td>{getVal(guesses,2)}</td><td>{getVal(results,2)}</td></tr>
            <tr><td>3</td><td>{getVal(guesses,3)}</td><td>{getVal(results,3)}</td></tr>
            <tr><td>4</td><td>{getVal(guesses,4)}</td><td>{getVal(results,4)}</td></tr>
            <tr><td>5</td><td>{getVal(guesses,5)}</td><td>{getVal(results,5)}</td></tr>
            <tr><td>6</td><td>{getVal(guesses,6)}</td><td>{getVal(results,6)}</td></tr>
            <tr><td>7</td><td>{getVal(guesses,7)}</td><td>{getVal(results,7)}</td></tr>
            <tr><td>8</td><td>{getVal(guesses,8)}</td><td>{getVal(results,8)}</td></tr>
      
            </table>
            </p>

        </div>
    );
}

export default App;
