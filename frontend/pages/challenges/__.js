// list of items
// list of selected Items
// stock

import { useEffect, useState } from "react"



class Stock {
  constructor() {
    this.map = new Map()
  }

  addItemQuantity(id, quantity = 1) {
    if(this.map.has(id)) {
      this.map.set(id,this.getItemQuantity(id) + 1)
    } else {
      this.map.set(id, quantity)
    }
  }

  substractItemQuantity(id, quantity = 1) {
    if (this.map.has(id)) {
      const q = this.getItemQuantity(id)
      if(q === 1) {
        this.deleteItem(id)
      } else {
        this.map.set(id, this.getItemQuantity(id) - quantity)
      }
    }
  }

  getItemQuantity(id) {
    return this.map.get(id)
  }

  deleteItem (id) {
    return this.map.delete(id)
  }

  list () {
    const arr =[]
    for ( const [id, quantity] of this.map.entries()) {
      arr.push({ id, quantity })
    }
    return arr;
  }
}

const listItemsStock = new Stock()
const cartStock = new Stock()

const useListItems = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Apple',
      quantity: 5,
      price: 3.5,
    },
    {
      id: 2,
      name: 'Banana',
      quantity: 10,
      price: 2.5,
    },
    {
      id: 11,
      name: 'Apple',
      quantity: 5,
      price: 3.5,
    },
    {
      id: 211,
      name: 'Lemon',
      quantity: 20,
      price: 1.5,
    },
    {
      id: 121,
      name: 'Orange',
      quantity: 50,
      price: 2.5,
    },
    {
      id: 231,
      name: 'Onion',
      quantity: 3,
      price: 3.5,
    },
  ])

  return [items, setItems]
}

const useStock = (stock) => {
  const [_, setState] = useState()
  const rerender = () => setState({})

  const add = (id, q) => {
    console.log({ id })
    stock.addItemQuantity(id, q)
    rerender()
  }
  const substract = (id) => {
    stock.substractItemQuantity(id)
    rerender()
  }
  const getQuantity = (id) => {
    return  stock.getItemQuantity(id)
  }

  const list = () => {
    return stock.list()
  }

  return { add, substract, getQuantity, list}
}

const Modal = ({children, isOpen}) => isOpen ? <div className="overlay">
  <div className="modal">
    <div className="modal-body">{children}</div>
  </div>
</div> : <></>

export default function shoppingCart() {
  const [listItems] = useListItems()
  const { add: addListItem, substract: substractListItem, getQuantity: getQuantityListItem } = useStock(listItemsStock)
  const { add: addCartItem, substract: substractCartItem, getQuantity: getQuantityCartItem, list: cartList } = useStock(cartStock)
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    listItems.forEach(item => addListItem(item.id, item.quantity))
  }, [listItems])

  const addToCart = (id) => {
    addCartItem(id)
    substractListItem(id)
  }

  const substractFromCart = (id) => {
    substractCartItem(id)
    addListItem(id)
  }


  return (
    <>
      <div className="header">
        <h1>
          Shopping Cart
        </h1>
        <button onClick={() => { setIsOpen(true) }}>🛒 Cart</button>
      </div>
      <div className="list">{
        listItems.map(item => <div key={item.id} className="card">
          <h2>${item.price}</h2>
          <h3>{item.name}</h3>
          <p>Quantity: {getQuantityListItem(item.id)}</p>
          <button disabled={!getQuantityListItem(item.id)} onClick={() => addToCart(item.id)}>+ Add to cart</button>
        </div>)
      }</div>
      <Modal isOpen={isOpen}>
        <div className="header">
          <h3>Cart</h3>
          <button onClick={()=>{setIsOpen(false)}}>X</button>
      </div>
      <div>
          {
            cartList().map(item => {
              const foundItem = listItems.find(e => e.id === item.id)
            return(
              <div key={foundItem.id} className="card">
                <h2>${foundItem.price}</h2>
                <h3>{foundItem.name}</h3>
                <p>Quantity: {getQuantityCartItem(foundItem.id)}</p>
                <button disabled={getQuantityCartItem(foundItem.id) === 0} onClick={() => substractFromCart(foundItem.id)}>- Substract from cart</button>
              </div>)
          })
          }
      </div>
        <h4>Total: ${cartList().reduce((acum,item) => {
          const foundItem = listItems.find(e => e.id === item.id)
          return acum += foundItem.quantity * item.quantity
        },0)}</h4>
      </Modal>
    </>
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


//       .list {
//   display: grid;
//   grid - template - columns: 1fr 1fr 1fr;
//   gap: 8px;
// }

// .card {
//   border: 1px solid gray;
//   border - radius: 5px;
//   padding: 16px;
// }

// .card:hover {
//   border: 1px solid blue;
// }

// .overlay {
//   position: fixed;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background - color: #33333366;
// }

// .modal {
//   position: fixed;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   margin: auto;
//   height: 600px;
//   width: 600px;
//   background - color: #fafafa;
//   padding: 32px;
//   border - radius: 25px;
//   overflow: auto;
// }

// .header {
//   display: flex;
//   justify - content: space - between;
//   align - items: center;
// }