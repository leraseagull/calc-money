import React, { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow';
import Header from './Header';

const BASE_URL = 'https://www.cbr-xml-daily.ru/latest.js'; //API курса валют с сайта cbr-xml-daily.ru

function App() {

  const [currencyOptions, setCurrencyOptions] = useState([]); // выбор валюты
  const [fromCurrency, setFromCurrency] = useState(); // валюта первая
  const [toCurrency, setToCurrency] = useState(); // валюта вторая
  const [exchangeRate, setExchangeRate] = useState(); //обменный курс
  const [amount, setAmount] = useState(1); //суммы по умолчанию
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true); // суммы из которых происходит конвертация

  let toAmount, fromAmount
  if (amountInFromCurrency) {   // конвертер
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

    useEffect(() => {  //эффект который позволяет получать этот API каждый раз когда обновляем страницу
      fetch(BASE_URL)
        .then(res => res.json())
        .then(data => {
          const firstCurrency = Object.keys(data.rates)[0]; // установка валюты по умолчанию
          setCurrencyOptions([data.base, ...Object.keys(data.rates)])
          setFromCurrency(data.base)
          setToCurrency(firstCurrency)
          setExchangeRate(data.rates[firstCurrency])
        })
    }, [])

    useEffect(() => {
      if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
        }
    }, [fromCurrency, toCurrency])


    function handleToAmountChange(e) { // изменение значения суммы 
      setAmount(e.target.value);
      setAmountInFromCurrency(false)

    }

    function handleFromAmountChange(e) { // результат конвертации
      setAmount(e.target.value); 
      setAmountInFromCurrency(true)

    }

    return (
      <div className="page">
      <Header />
      <div className="container">
      <h1 className="page__title">Конвертер валют</h1>
      <div className="currency__container">
      <CurrencyRow 
      currencyOptions={currencyOptions}
      selectCurrency={fromCurrency}
      onChangeCurrency={e => setToCurrency(e.target.value)}
      onChangeAmount={handleFromAmountChange}
      amount={fromAmount}
      />
      <div className="currency__equals">&#8646;</div>
      <CurrencyRow 
      currencyOptions={currencyOptions}
      selectedCurrency={toCurrency}
      onChangeCurrency={e => setToCurrency(e.target.value)}
      onChangeAmount={handleToAmountChange}
      amount={toAmount}
      />
      </div>
      </div>
      </div>
    );
}

export default App;