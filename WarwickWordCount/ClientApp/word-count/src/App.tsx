import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  let [word, setWord] = useState("");
  let [sentence, setSentence] = useState("");
  let [count, setCount] = useState(0); 
  const onWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    RequestCount(word, sentence); 
  }
  const onSentenceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSentence(e.target.value); 
  }
  return (
    <div className="App">
      <header className="App-header">
        
        <input type="text" value={word} onChange={onWordChange}></input>
        <textarea value={sentence} onChange={onSentenceChange}></textarea>
        <p>{count}</p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}
async function RequestCount(occurence: string, text: string) {
  var result = await fetch("https://localhost:5001/api/WordOccurenceController", {
    method: "POST",
    mode: 'no-cors',
    body: JSON.stringify({
    word: occurence,
    sentence: text
  })})
  if(result.ok)
  var body = await result.json(); 
  return body.Count; 
}
export default App;
