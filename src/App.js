import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import QuoteDisplay from './components/QuoteDisplay';
import ResultTable from './components/ResultTable';

const App = () => {

  const [quoteDisplayed, setQuoteDisplayed] = useState(undefined);
  const [statuses, setStatuses] = useState(undefined);
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [results, setResults] = useState([]);

  const textAreaRef = useRef(null);

  useEffect(() => {
    getNewQuote();
  }, []);


  useEffect(() => {
    if (quoteDisplayed !== undefined){
      clearInterval(intervalId);
      setTimer(0);
      setStartTime(new Date());
    }
  }, [quoteDisplayed]);

  useEffect(()=> {
    if (startTime !== null){
      const intervalId = setInterval(() => {
        setTimer(getTimerTime());
      }, 1000);
      setIntervalId(intervalId);
    }
  }, [startTime]);

  useEffect(() => {
    if (statuses !== undefined){
      const result = statuses.find(status => status === 0 || status === -1);
      if (result === undefined) {
        saveResult();
        getNewQuote();
        textAreaRef.current.value = null;
      }
    }
  }, [statuses]);

  function onChangeInput(event) {
    const inputValue = event.target.value.split('');
    let stats = [...statuses];
    inputValue.forEach((character, index) => {
      if (character === quoteDisplayed[index]){
        stats[index] = 1;
      } else {
        stats[index] = -1;
      }
    })
    for (let i = inputValue.length; i < quoteDisplayed.length; i++){
      stats[i] = 0;
    }
    setStatuses([...stats]);
  }

  const getNewQuote = () => {
    fetch('http://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
      setQuoteDisplayed(data.content.split(''));
      const len = data.content.split('').length;
      let stat = [];
      for(let i = 0; i < len; i++){
        stat.push(0);
      }
      setStatuses(stat);
    })
  }
  
  const getTimerTime = () => {
    return Math.floor((new Date() - startTime) / 1000);
  }

  const saveResult = () => {
    let resultsArray = [...results];
    resultsArray.push({
      countOfLetters: quoteDisplayed.length,
      timeSpent: timer,
    });
    setResults([...resultsArray]);
  }

  return (
    <div className = "appBody">
      <div className = "timer">
        <h1>{timer === undefined ? ' ' : <span>{timer}</span>}</h1>
      </div>
      <div className = "container">
        <div className = "quote-display">
          <QuoteDisplay 
            quote = {quoteDisplayed}
            statuses = {statuses}
          />
        </div>
          <textarea 
            className = "quote-input"
            onChange = {onChangeInput}
            ref = {textAreaRef}
          />
      </div>
      <div className = 'table-container'>
        <ResultTable results = {results}></ResultTable>
      </div>
    </div>
  );
}

export default App;
