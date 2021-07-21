import React from 'react'

export default function CurrencyRow(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props
    return (
        <div className="currency">
            <input type="number" className="currency__input" value={amount} onChange={onChangeAmount}/>
            <select value={selectedCurrency} onChange={onChangeCurrency} className="currency__select">
                {currencyOptions.map(option => (
                <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

