import { useState } from "react";

// orders with status

// price: number
// quantity: Integer
// symbol: string
// type: SELL / BUY
// status: OPEN, CANCELLED, FULFILLED,

const TYPE = {
  BUY: 'BUY',
  SELL: 'SELL',
}

const STOCK = {
  AMZ: 'AMZ',
  TSL: 'TSL',
  MSF: 'MSF',
  MELI: 'MELI',
}

const stockOptions = Object.keys(STOCK).map(k => STOCK[k])
const typeOptions = Object.keys(TYPE).map(k => TYPE[k])

const STATUS = {
  OPEN: 'OPEN',
  CANCELLED: 'CANCELLED',
  FULFILLED: 'FULFILLED',
}

const INITIAL_ORDERS = [
  {
    price: 80,
    quantity: 10,
    symbol: STOCK.AMZ,
    type: TYPE.BUY,
    status: STATUS.OPEN,
  },
  {
    price: 111,
    quantity: 7,
    symbol: STOCK.TSL,
    type: TYPE.SELL,
    status: STATUS.OPEN,
  },
]

export default function Market() {
  const [orders, setOrders] = useState(INITIAL_ORDERS)
  const [orderForm, setOrderForm] = useState({
      price: 0,
      quantity: 0,
      symbol: STOCK.TSL,
      type: TYPE.SELL,
      status: STATUS.OPEN,
  })

  const clearOrderForm = () => setOrderForm({
    price: 0,
    quantity: 0,
    symbol: STOCK.TSL,
    type: TYPE.SELL,
    status: STATUS.OPEN,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const {
      price,
      quantity,
      symbol,
      type,
    } = orderForm

    let quantityLeft = quantity

    const altertype = type === TYPE.SELL ? TYPE.BUY : TYPE.SELL

    const finalOrders = orders.map(order => {
      if (order.symbol === symbol && order.type === altertype && order.status === STATUS.OPEN && (type === TYPE.SELL ? order.price > price : order.price < price && quantityLeft > 0)) {
        if(order.quantity > quantityLeft) {
          const quantity = order.quantity - quantityLeft
          quantityLeft = 0
          return {...order, quantity}
        } else {
          quantityLeft-=order.quantity
          return { ...order, quantity:0, status: STATUS.FULFILLED }
        }
      } else {
        return order
      }
    })

    setOrders(finalOrders.concat({
      price,
      quantity: quantityLeft,
      symbol,
      type,
      status: quantityLeft > 0 ? STATUS.OPEN : STATUS.FULFILLED,
    }))
    clearOrderForm();
  } 

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setOrderForm({
      ...orderForm,
      [name]: value,
    })
  } 
  const minSell = orders.filter(order => order.type === TYPE.SELL && order.status !== STATUS.FULFILLED).reduce((prev, current) => {
    return (prev && prev.price < current.price) ? prev : current
  }, 0)

  const maxBuy = orders.filter(order => order.type === TYPE.BUY && order.status !== STATUS.FULFILLED).reduce((prev, current) => {
    return (prev && prev.price > current.price) ? prev : current
  }, 0)
  
  return <div className="market">
    <h1>Stock market</h1>
    <h3>Create order</h3>
    <div className="layout">
    <form onSubmit={handleSubmit} className="order-form">
      <label htmlFor="price">Price</label>
      <input type='number' onChange={handleInputChange} id="price" name="price" value={orderForm.price}/>
      <label htmlFor="quantity">quantity</label>
      <input type='number' onChange={handleInputChange} id="quantity" name="quantity" value={orderForm.quantity} />
      <label htmlFor="symbol">symbol</label>
      <select name="symbol" id="symbol" onChange={handleInputChange} value={orderForm.symbol}>
        {stockOptions.map(opt =>
        <option value={opt}>{opt}</option>
        )}
      </select>
      <label htmlFor="symbol">type</label>
      <select name="type" id="type" onChange={handleInputChange} value={orderForm.type}>
        {typeOptions.map(opt =>
          <option value={opt}>{opt}</option>
        )}
      </select>
      <input type="submit" />
    </form>
    <div>
      <h3>Offers</h3>
      <h4>Min Sell</h4>
      {minSell ? <p>{minSell.symbol} - ${minSell.price}</p> :"-"}
      <h4>Max Buy</h4>
      {maxBuy ?<p>{maxBuy.symbol} - ${maxBuy.price}</p> : ''}
    </div>
    </div>
    <h3>Order book</h3>
    <div className="orders">
      <div className="order">
        <div>Symbol</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Type</div>
        <div>Status</div>
      </div>
      {orders.map((order => <div className="order">
        <div>{order.symbol}</div>
        <div style={{ color: order.type === TYPE.BUY ? 'green': 'red'}}>$ {order.price}</div>
        <div>{order.quantity}</div>
        <div>{order.type}</div>
        <div style={{ color: order.status === STATUS.OPEN ? 'green' : order.status === STATUS.CANCELLED ? 'red' : 'black' }}>{order.status}</div>
      </div>))}
    </div>
  </div>
}
