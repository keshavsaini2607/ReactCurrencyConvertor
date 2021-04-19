import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';

function App() {

  const [sourceCurrency, setSourceCurrency] = useState('')
  const [targetCurrency, setTargetCurrency] = useState('')
  const [sourceVal, setSourceVal] = useState(Number);
  const [targetVal, setTargetVal] = useState(Number);

  console.log("Source", sourceCurrency);

  const getResult = async () => {
    
    if(targetCurrency) {
      const {data} = await axios.get(`https://open.exchangerate-api.com/v6/latest/${targetCurrency}`);
      const val = data.rates
      Object.keys(val)
      .forEach(function eachKey(key) { 
        if(key === sourceCurrency) {
          setTargetVal((sourceVal * (1 / val[key])).toFixed(2))
        }
      });

    }
  }

  useEffect(() => {
    getResult()
  },[targetCurrency, sourceVal, sourceCurrency])


  return (
    <div className="App">
      <div className="appHeader">
        <span>{sourceVal} {sourceCurrency} equals</span>
        <h1>{targetVal} {targetCurrency}</h1>
      </div>
      <div className="convertor">
        <div className="source__currency">
          <input type="text" placeholder="Source" onChange={(e) => setSourceVal(e.target.value)} />
          <select name="currency" onChange={(e) => setSourceCurrency(e.target.value)}>  
            <option value="null">Select</option>
            <option value="USD">USD</option>
            <option value="AED">AED</option>
            <option value="GBP">GBP</option>
            <option value="CAD">CAD</option>
            <option value="SGD">SGD</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
            <option value="PKR">PKR</option>
            <option value="ZAR">ZAR</option>
            <option value="ALL">ALL</option>
          </select>
        </div>
        <div className="target__currency">
          <input type="text" placeholder="target" value={targetVal} readOnly />
          <select name="currency" onChange={(e) => setTargetCurrency(e.target.value)}>
            <option value="null">Select</option>
            <option value="USD">USD</option>
            <option value="AED">AED</option>
            <option value="GBP">GBP</option>
            <option value="CAD">CAD</option>
            <option value="SGD">SGD</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
            <option value="PKR">PKR</option>
            <option value="ZAR">ZAR</option>
            <option value="ALL">ALL</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
