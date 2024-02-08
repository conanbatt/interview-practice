
  // list of items
  // -  stock
  // list of selected items / cart
  // -  stock
  // calculations on cart

import { useEffect, useState } from "react"

class Stock {
  constructor(){
    this.map = new Map()
  }

  getItemQuantity(name) {
    return this.map.get(name)
  }

  addItemQuantity(name, quantity = 1) {
    if(this.map.has(name)) {
      this.map.set(name, this.getItemQuantity(name) + 1)
    } else {
      this.map.set(name, quantity)
    }
  }

  substractItemQuantity(name) {
    if (this.map.has(name)) {
      const q = this.getItemQuantity(name)
      if(q>1) {
        this.map.set(name, this.getItemQuantity(name) - 1)
        return
      }
      if(q===1){
        this.deleteItem(name)
      }
    }
  }

  deleteItem(name){
    return this.map.delete(name)
  }

  getList(){
    const arr = []
    for ( let [id, value] of this.map.entries()){
      arr.push({id, value})
    }
    return arr
  }
}

function Modal({ children, title, isOpen, setIsOpen }) {
  return isOpen ? <div className="overlay">
    <div className="modal">
      <header className="header">
        <h2>
          {title}
        </h2>
        <button onClick={() => setIsOpen(false)}>X</button>
      </header>      <div className="modal-content">{children}</div>
    </div>
  </div> : <></>
}
const itemStock = new Stock()
const cartStock = new Stock()

const useShoppingList = () => {
  const [list, setList] = useState([
    {
      id: 1,
      name: 'Apple',
      price: 2.5,
      quantity: 3
    },
    {
      id: 2,
      name: 'Banana',
      price: 3.5,
      quantity: 4
    },
    {
      id: 3,
      name: 'Orange',
      price: 1,
      quantity: 20
    },
    {
      id: 4,
      name: 'Lemon',
      price: 1,
      quantity: 30
    },
    {
      id: 5,
      name: 'Pomelo',
      price: 2.5,
      quantity: 4
    },
    {
      id: 6,
      name: 'Strawberry',
      price: 4.5,
      quantity: 40
    },
  ])

  useEffect(()=>{
    list.forEach((item)=> {
      itemStock.addItemQuantity(item.id, item.quantity)
    })
  },[])

  return [list, setList]
}

const useShoppingListStock = (stock) => {
  const [_, setState] = useState()
  const rerender = () => setState({})
  const add = (id) => {
    stock.addItemQuantity(id)
    rerender()
  }

  const substract = (id) => {
    stock.substractItemQuantity(id)
    rerender()
  }

  const get = (id) => {
    return stock.getItemQuantity(id)
  }

  const getList = (id) => {
    return stock.getList()
  }

  useEffect(()=>{
    rerender()
  },[])

  return { add, substract, get, getList }

}

export default function shoppingCart() {
  const [listItems] = useShoppingList()
  const { get: getItemStock, add: addItemStock, substract: substractItemStock} = useShoppingListStock(itemStock)
  const { get: getItemCart, add: addItemCart, substract: substractItemCart, getList: getCartList } =  useShoppingListStock(cartStock)
  const [isOpen, setIsOpen] = useState(false)

  const addItem= (id)=> {
    substractItemStock(id)
    addItemCart(id)
  }

  const substractFromCart = (id) => {
    substractItemCart(id)
    addItemStock(id)
  }

  return (
    <div>
      <header className="header">
        <h1>
          Shopping Cart
        </h1>
        <button onClick={() => setIsOpen(true)}>🛒 Open cart</button>
      </header>
      <div className="list">
        {listItems.map((item)=><div key={item.id} className="card">
          <h2>${item.price}</h2>
          <h4>{item.name}</h4>
          <p>{getItemStock(item.id)}</p>
          <button onClick={()=>addItem(item.id)}>+ Add to cart</button>
        </div>)}
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {getCartList().map((item) => {
          const foundItem = listItems.find(e => e.id === item.id)
          return(<div key={item.id} className="card">
          <h2>${foundItem.price}</h2>
          <h4>{foundItem.name}</h4>
          <p>Quantity: {getItemCart(item.id)}</p>
          <button onClick={() => substractFromCart(item.id)}>- from cart</button>
        </div>)}
        )}
        <h4>Total
          $ {getCartList().reduce((acum, item) => {
            const {price} = listItems.find(e => e.id === item.id)
            const quantity = getItemCart(item.id)
            return acum + price * quantity
          }, 0)
          }
        </h4>
      </Modal>
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
