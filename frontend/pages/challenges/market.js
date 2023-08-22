export default function Market() {
  return(
    <>
      <h1>
        Market
      </h1>
      <p>
        We run a real-time brokerage that sells stocks. Build a UI that can accept a real-time feed of orders and displays the status of orders visually.
        <br />
        A Market is composed of buy orders and sell orders that are submitted to the broker.
        <div style={{ border: '1px solid white', margin: '40px', padding: '20px'}}>
          price: number
          <br />
          quantity: Integer
          <br />
          symbol: string
          <br />
          type: SELL / BUY
          <br />
          status: OPEN, CANCELLED, FULFILLED
        </div>

        When a buy order has a price below a sell order, the quantity of each diminishes until one of the quantities goes to 0, and thus the order is fulfilled.
        <br />
        <ol>
          <li>1. The UI should allow generating orders of any kind and process the input</li>
          <li>2. The UI can be very simple but must show the best big and best offer (the price to buy and the price to sell) correctly at any point</li>
        </ol>
      </p>
    </>
  )
}
