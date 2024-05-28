// We run a real-time brokerage that sells stocks. Build a UI that can accept a real-time feed of orders and displays the status of orders visually.
// A Market is composed of buy orders and sell orders that are submitted to the broker.
// price: number
// quantity: Integer
// symbol: string
// type: SELL / BUY
// status: OPEN, CANCELLED, FULFILLED
// When a buy order has a price below a sell order, the quantity of each diminishes until one of the quantities goes to 0, and thus the order is fulfilled.
// The UI should allow generating orders of any kind and process the input
// The UI can be very simple but must show the best big and best offer (the price to buy and the price to sell) correctly at any point

import { useState } from "react";
import styles from "./market.module.css";

export default function Market() {
  const [orders, setOrders] = useState([]);
  const [price, setPrice] = useState(2.43);
  const [quantity, setQuantity] = useState(10);
  const [symbol, setSymbol] = useState("SLV");

  const handleSubmit = (type) => {
    let newQuantity = quantity;
    let newPairQuantity = undefined;
    let pairOrder = undefined;

    if (type === "BUY") {
      const [sell] = orders
        .filter(
          ({ type, price: sellPrice, status, symbol: sellSymbol }) =>
            type === "SELL" &&
            sellPrice <= price &&
            status === "OPEN" &&
            sellSymbol === symbol
        )
        .sort((a, b) => a.price - b.price);

      if (sell) {
        newQuantity = Math.max(quantity - sell.quantity, 0);
        newPairQuantity = Math.max(sell.quantity - quantity, 0);
        pairOrder = sell;
      }
    } else if (type === "SELL") {
      const [buy] = orders
        .filter(
          ({ type, price: buyPrice, status, symbol: buySymbol }) =>
            type === "BUY" &&
            buyPrice >= price &&
            status === "OPEN" &&
            buySymbol === symbol
        )
        .sort((a, b) => b.price - a.price);

      if (buy) {
        newQuantity = Math.max(quantity - buy.quantity, 0);
        newPairQuantity = Math.max(buy.quantity - quantity, 0);
        pairOrder = buy;
      }
    }

    setOrders((prev) => [
      ...prev.filter((o) => {
        if (!pairOrder) return true;
        return o.createdAt !== pairOrder.createdAt;
      }),
      ...(pairOrder
        ? [
            {
              ...pairOrder,
              quantity: newPairQuantity,
              status: newPairQuantity === 0 ? "FULFILLED" : "OPEN",
            },
          ]
        : []),
      {
        type,
        price,
        quantity: newQuantity,
        symbol,
        status: newQuantity === 0 ? "FULFILLED" : "OPEN",
        createdAt: Date.now(),
      },
    ]);
  };

  return (
    <div className={styles.Market}>
      <div className={styles.form}>
        <h4>Submit Order</h4>
        <div className={styles.field}>
          <label>Price</label>
          <input
            value={price}
            onChange={({ target }) => setPrice(target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Quantity</label>
          <input
            value={quantity}
            onChange={({ target }) => setQuantity(target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Symbol</label>
          <input
            value={symbol}
            onChange={({ target }) => setSymbol(target.value)}
          />
        </div>
        <div className={styles.submit}>
          <button className={styles.buy} onClick={() => handleSubmit("BUY")}>
            Buy
          </button>
          <button className={styles.sell} onClick={() => handleSubmit("SELL")}>
            Sell
          </button>
        </div>
      </div>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>Type</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Symbol</th>
            <th>Status</th>
          </tr>
          {orders.map((order) => (
            <tr key={order.createdAt} className={styles[order.type]}>
              <td>{order.type}</td>
              <td>{order.price}</td>
              <td>{order.quantity}</td>
              <td>{order.symbol}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
