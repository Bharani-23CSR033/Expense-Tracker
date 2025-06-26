import React from 'react'

function CurrencyItem(props) {
  return (
  <>
  <div>
    <div className="currency-item">
      <div className="currency-name">{props.name}</div>
      <div className="currency-symbol">{props.symbol}</div>
      <div className="currency-rate">${props.rate}</div>
    </div>
  </div>
  
  </>
  )
}

export default CurrencyItem