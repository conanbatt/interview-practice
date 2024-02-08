// list of items to shop  - availability
// cart list has selected items
// calculate prices

import { useEffect, useState } from "react"

const useShoppingList = () => {
  const [list, setList] = useState([
    {
      id: 1,
      name: 'Apple',
      quantity: 5,
      price: 2
    },
    {
      id: 2,
      name: 'Banana',
      quantity: 3,
      price: 4
    },
    {
      id: 3,
      name: 'Pear',
      quantity: 6,
      price: 2
    },
    {
      id: 4,
      name: 'Orange',
      quantity: 12,
      price: 1
    },
    {
      id: 5,
      name: 'Lemon',
      quantity: 10,
      price: 1.5
    },
    {
      id: 6,
      name: 'Pomegranate',
      quantity: 0,
      price: 2.5
    },
    {
      id: 11,
      name: 'Big Apple',
      quantity: 5,
      price: 2
    },
    {
      id: 12,
      name: 'Big Banana',
      quantity: 3,
      price: 4
    },
    {
      id: 13,
      name: 'Big Pear',
      quantity: 6,
      price: 2
    },
    {
      id: 14,
      name: 'Big Orange',
      quantity: 12,
      price: 1
    },
    {
      id: 15,
      name: 'Big Lemon',
      quantity: 10,
      price: 1.5
    },
    {
      id: 16,
      name: 'Big Pomegranate',
      quantity: 0,
      price: 2.5
    },
  ])
  return [list, setList]
}

const addBodyClass = className => document.body.classList.add(className);
const removeBodyClass = className => document.body.classList.remove(className);

function useBodyClass(className) {
  useEffect(
    () => {
      // Set up
      className instanceof Array ? className.map(addBodyClass) : addBodyClass(className);

      // Clean up
      return () => {
        className instanceof Array
          ? className.map(removeBodyClass)
          : removeBodyClass(className);
      };
    },
    [className]
  );
}


const useShoppingCart = () => {
  const [list, setList] = useState([])
  return [list, setList]
}

const Modal = ({isOpen, setIsOpen, title, children}) => {
    const handleOpen = () => {
      setIsOpen(false)
    }
   
  return (<>
    {isOpen  && <div className="modal">
      <button onClick={handleOpen}>x</button>
      <h1>{title}</h1>
      <div>{children}</div>
  </div>}
  </>)
}

export default function shoppingCart() {
  const [items, setItems] = useShoppingList()
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useShoppingCart()
  useBodyClass(isOpen ? 'overlay': [])

  const selectItem = (id) => () => {
    const item = {...items.find(item => item.id == id), quantity: 1}
    setItems(items => items.map(shopItem => shopItem.id !== id ? shopItem : {...shopItem, quantity: shopItem.quantity - 1}))
    const cartItem = cartItems.find((item => item.id == id))
    setCartItems(
      !cartItem ? [...cartItems, item] : cartItems.map(cartItem => cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + 1} : item)
    )
  }

  return (
    <div className={isOpen ? 'modal-overlay': ''}>
      <header className="header">
        <h1>
          Shopping Cart
        </h1>
        <button onClick={()=> setIsOpen(true)}>🛒 Cart</button>
      </header>
      <section className="list">
        {items.map((item)=> <article key={item.id} className="card">
          <h2>${item.price}</h2>
          <h3>{item.name}</h3>
          <p>{item.quantity} items left</p>
          <button onClick={selectItem(item.id)} disabled={item.quantity === 0}>Add</button>
        </article>)}
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Shooping cart">
          <div className="body">
            {cartItems.map((item) => <article key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <h4>${item.price}</h4>
              <p>{item.quantity}</p>
            </article>)}
          </div>
        </Modal>
      </section>
      
    </div>
  )
}


      // <p>
      //   We want to build a supermarket shopping experience. You should be able to browse a list of goods, select how many to purchase, and add them to a shopping cart component.
      //   The shopping cart should sum the pricing of all selected goods.
      // </p>
      // <p>
      //   The UX should include being able to select multiple quantities of an item, and the store also has availability items. That is, you cannot add to your shopping cart more items that are available.<br />
      //   Tip: Consider the data structure correctly for computational and memory performance as well as a usuable API.
      // </p>