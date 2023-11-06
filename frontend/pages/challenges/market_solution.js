import { useState } from "react";

const OrderType = {
  SELL: 'SELL',
  BUY: 'BUY',
}

const OrderStatus = {
  OPEN: 'OPEN',
  CANCELLED: 'CANCELLED',
  FULFILLED: 'FULFILLED',
}

const initialBuyOrders = [
  {
    price: 48,
    quantity: 7,
    symbol: 'TSLA',
    type: 'BUY',
    status: 'OPEN'
  },
  {
    price: 47,
    quantity: 6,
    symbol: 'TSLA',
    type: 'BUY',
    status: 'OPEN'
  }
  ,
  {
    price: 46,
    quantity: 12,
    symbol: 'TSLA',
    type: 'BUY',
    status: 'OPEN'
  }
];

const initialSellOrders = [
  {
    price: 52,
    quantity: 150,
    symbol: 'AAPL',
    type: 'SELL',
    status: 'OPEN'
  },
  {
    price: 49,
    quantity: 80,
    symbol: 'GOOGL',
    type: 'SELL',
    status: 'OPEN'
  },
];

export default function Market() {
  const [buyOrders, setBuyOrders] = useState(initialBuyOrders)
  const [sellOrders, setSellOrders] = useState(initialSellOrders)

  const handleSubmit = (order) => {
    let {
      price,
      quantity,
      symbol,
      type,
      ...rest
    } = order

    if (type === OrderType.SELL) {
      const newBuyOrders = [...buyOrders]
      for(let i = 0; i < newBuyOrders.length; i++) {
        if (quantity <=0){
          break;
        }
        const buyOrder = newBuyOrders[i]
        if (buyOrder.status === OrderStatus.OPEN && buyOrder.symbol === symbol && price <= buyOrder.price) {
          const remaining = quantity - buyOrder.quantity
          if(remaining > 0) {
            newBuyOrders[i].quantity = 0
            newBuyOrders[i].status = OrderStatus.FULFILLED
            quantity = remaining
          } else {
            newBuyOrders[i].quantity = buyOrder.quantity - quantity
            quantity = 0
          }
        }

      }
      setBuyOrders(newBuyOrders)
      setSellOrders(orders => [...orders, {
        price,
        quantity,
        symbol,
        type,
        status: quantity > 0 ? OrderStatus.OPEN :OrderStatus.FULFILLED,
       }])
    } else {
      const newSellOrders = [...sellOrders]

      for(let i = 0; i < newSellOrders.length; i++) {
        if (quantity <=0){
          break;
        }
        const buyOrder = newSellOrders[i]
        if (buyOrder.status === OrderStatus.OPEN && buyOrder.symbol === symbol && price >= buyOrder.price) {
          const remaining = quantity - buyOrder.quantity
          if(remaining > 0) {
            newSellOrders[i].quantity = 0
            newSellOrders[i].status = OrderStatus.FULFILLED
            quantity = remaining
          } else {
            newSellOrders[i].quantity = buyOrder.quantity - quantity
            quantity = 0
          }
        }

      }

      setSellOrders(newSellOrders)
      setBuyOrders(orders => [...orders, {
        price,
        quantity,
        symbol,
        type,
        status: quantity > 0 ? OrderStatus.OPEN : OrderStatus.FULFILLED,
      }])
    }
  }

  return (
    <>
      <h1>
        Market
      </h1>
      <OrderForm onSubmit={handleSubmit} />
      <HighestAndLowestOrders buyOrders={buyOrders} sellOrders={sellOrders} />
      <Orders buyOrders={buyOrders} sellOrders={sellOrders} />
    </>
  )
}

function OrderForm(props) {
  const { onSubmit } = props

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = event.target;
    const formData = new FormData(form);

    const formDataObject = {};

    for (const entry of formData.entries()) {
      const [name, value] = entry;
      formDataObject[name] = (name === 'price' || name === 'quantity') ? +value: value;
    }
    onSubmit?.(formDataObject)
  }

  return <form onSubmit={handleSubmit}>
    <h2>Create an order</h2>
    <label htmlFor="price">Price:</label>
    <input type="number" name="price" />
    <label htmlFor="quantity">Quantity:</label>
    <input type="number" name="quantity" />
    <label htmlFor="symbol">Select Order Type:</label>
    <select id="symbol" name="symbol">
      <option value="AAPL">APPLE</option>
      <option value="TSLA">TESLA</option>
      <option value="GOOGL">GOOGLE</option>
    </select>
    <label htmlFor="orderType">Select Order Type:</label>
    <select id="orderType" name="type">
      <option value="BUY">Buy</option>
      <option value="SELL">Sell</option>
    </select>
    <input type="submit"/>
  </form>;
}


function Orders(props) {
  const { buyOrders, sellOrders } = props
  return <section className="orders">
    <section>
      <h2>Buy</h2>
      <table width={300}>
        <tr>
          <th>Symbols</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
        {buyOrders.map((buyOrder, index) => <tr key={index}>
          <td>
            {buyOrder.symbol}
          </td>
          <td>
            {buyOrder.quantity}
          </td>
          <td>
            ${buyOrder.price}
          </td>
          <td>
            {buyOrder.status}
          </td>
        </tr>)}
      </table>
    </section>
    <section>
      <h2>Sell</h2>
      <table width={300}>
        <tr>
          <th>Symbols</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
        {sellOrders.map((sellOrder, index) => <tr key={index}>
          <td>
            {sellOrder.symbol}
          </td>
          <td>
            {sellOrder.quantity}
          </td>
          <td>
            ${sellOrder.price}
          </td>
          <td>
            {sellOrder.status}
          </td>
        </tr>)}
      </table>
    </section>
  </section>;
}

function HighestAndLowestOrders(props) {
  const { buyOrders, sellOrders } = props;

  const symbolData = {};

  buyOrders.forEach((buyOrder) => {
    if (buyOrder.quantity !== 0 && (!symbolData[buyOrder.symbol] || buyOrder.price > symbolData[buyOrder.symbol].highestBuyPrice)) {
      symbolData[buyOrder.symbol] = {
        highestBuyPrice: buyOrder.price,
      };
    }
  });

  sellOrders.forEach((sellOrder) => {
    if (sellOrder.quantity !== 0 && (!symbolData[sellOrder.symbol] || sellOrder.price < symbolData[sellOrder.symbol].lowestSellPrice)) {
      symbolData[sellOrder.symbol] = {
        ...symbolData[sellOrder.symbol],
        lowestSellPrice: sellOrder.price,
      };
    }
  });

  return (
    <section className="orders">
      <section>
        <h2>Buy</h2>
        <table width={300}>
          <tr>
            <th>Symbols</th>
            <th>Highest Buy Price</th>
          </tr>
          {Object.keys(symbolData).map((symbol, index) => (
            <tr key={index}>
              <td>{symbol}</td>
              <td>${symbolData[symbol].highestBuyPrice ?? ' - '}</td>
            </tr>
          ))}
        </table>
      </section>
      <section>
        <h2>Sell</h2>
        <table width={300}>
          <tr>
            <th>Symbols</th>
            <th>Lowest Sell Price</th>
          </tr>
          {Object.keys(symbolData).map((symbol, index) => (
            <tr key={index}>
              <td>{symbol}</td>
              <td>${symbolData[symbol].lowestSellPrice ?? ' - '}</td>
            </tr>
          ))}
        </table>
      </section>
    </section>
  );
}
