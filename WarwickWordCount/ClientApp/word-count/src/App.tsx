import React, { useState, useEffect } from 'react'
import './App.css'

function App () {
  const [word, setWord] = useState('')
  const [sentence, setSentence] = useState('')
  const [count, setCount] = useState(0)
  const [warningVisible, setWarningVisible] = useState(false)
  const [isChecked, setChecked] = useState(false); 
  const onWordChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (newValue.slice(-1) === ' ') {
      showWarning()
    } else {
      setWord(newValue)
    }
  }
  useEffect(() => {
    async function getCount () {
      const result = await requestCount(word, sentence, isChecked);
      setCount(result);
    }
    getCount();
  })
  const showWarning = () => {
    setWarningVisible(true)
    setTimeout(() => setWarningVisible(false), 1500)
  }
  const onSentenceChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSentence(e.target.value)
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <p style={{fontSize: '12px'}}>Welcome to Warwick Analytics newest product feature: The Word Counter. </p>
          <p style={{fontSize: '11px'}}>The Word Counter will take a single word and an array of words, or a 'sentence' and give you the number of times that word appears in the sentence! <br></br>
          No more late nights trying to figure out how many times the word 'trilobite' was said in the last speech by the Prime Minister! Simply copy and paste the transcript and tell you almost *instantly! <br></br>
           </p>
        </div>
      <input type='text' value={word} onChange={onWordChange}></input>
        <p style={{fontSize:'12px', color: 'red', height: '13px'}}>{warningVisible ? 'Only one word can be searched for!'  : null}</p>
        <textarea value={sentence} onChange={onSentenceChange}></textarea>
        <label>Case Sensitive?
        <input type='checkbox' checked={isChecked} onChange={onWordChange}></input>
        </label>
        <p>{count}</p>
        <br></br>
        <br></br>
        <p><i style={{fontSize: '10px'}}>*instantly is considered to be between 50ms and 25,0000ms depending on Network latency and how good our ability to use an abacus is on any given day. </i></p>
      </header>
    </div>
  )
}

async function requestCount (occurence: string, text: string, isCaseSensitive: boolean) {
  let data = JSON.stringify({
    Word: occurence,
    Sentence: text,
    careAboutCase: isCaseSensitive
  })

  let result = await fetch('https://localhost:5001/api/WordOccurence/', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br'
    },
    // credentials: 'include',
    body: data
  })
  if (result.ok) {
    let body = await result.json()
    return body.count
  }
}
export default App
