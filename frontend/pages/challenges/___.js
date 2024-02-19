// list products
// cart
// stock management

import { useEffect, useState } from "react"

const useProductList = () => {
  const [list, setList] = useState([
    {
      id: 1,
      name: 'Apple',
      quantity: 5,
      price: 3
    },
    {
      id: 2,
      name: 'Orange',
      quantity: 15,
      price: 2
    },
    {
      id: 3,
      name: 'Banana',
      quantity: 7,
      price: 6
    },
    {
      id: 4,
      name: 'Kiwi',
      quantity: 6,
      price: 8
    },
    {
      id: 5,
      name: 'Lemon',
      quantity: 5,
      price: 1.5
    }
    ,
    {
      id: 6,
      name: 'Onion',
      quantity: 5,
      price: 1.5
    }
  ])
  const { substract: substractProductQuantity, add: addProductQuantity } = useStock(productStock)

  useEffect(() => {
    list.forEach(item => {
      addProductQuantity(item.id, item.quantity)
    })
    return () => {
      list.forEach(item => {
        substractProductQuantity(item.id, item.quantity)
      })
    }
  }, [])

  return [list, setList]
}

class Stock {
  constructor() {
    this.map = new Map()
  }

  get(id) {
    return this.map.get(id)
  }

  add(id, quantity = 1) {
    if (this.map.has(id)) {
      this.map.set(id, this.map.get(id) + quantity)
    } else {
      this.map.set(id, quantity)
    }
  }

  substract(id, quantity = 1) {
    if (this.map.has(id)) {
      this.map.set(id, this.map.get(id) - quantity)
      if (this.map.get(id) <= 0) {
        this.map.delete(id)
      }
    }
  }

  list() {
    const arr = []
    for (let [id, quantity] of this.map.entries()) {
      arr.push({ id, quantity })
    }
    return arr
  }
}

const productStock = new Stock()
const cartStock = new Stock()

const useStock = (stock) => {
  const [s, setState] = useState()
  const rerender = () => setState({})

  const add = (id, quantity) => {
    stock.add(id, quantity)
    rerender()
  }

  const substract = (id, quantity) => {
    stock.substract(id, quantity)
    rerender()
  }

  const get = (id, quantity) => {
    return stock.get(id, quantity)
  }

  const list = () => {
    return stock.list()
  }

  return { get, substract, add, list }
}

export default function shoppingCart() {
  const [listItems] = useProductList()
  const { get: getProductQuantity, substract: substractProductQuantity, add: addProductQuantity } = useStock(productStock)
  const { get: getCartQuantity, substract: substractCartQuantity, add: addCartQuantity, list: getCartList } = useStock(cartStock)
  const [isOpen, setIsOpen] = useState(false)

  const handleAddToCart = (id) => {
    addCartQuantity(id)
    substractProductQuantity(id)
  }

  const handleSubstractFromCart = (id) => {
    substractCartQuantity(id)
    addProductQuantity(id)
  }

  const Modal = ({ isOpen, children }) => isOpen ? <div className="overlay">
    <div className="modal">
      {children}
    </div>
  </div> : <></>

  return (
    <>
      <div className="header">

        <h1>
          Shopping Cart
        </h1>
        <button onClick={() => setIsOpen(true)}>Open Cart</button>
      </div>
      <div className="list">
        {
          listItems.map(item => <div className="card" key={item.id}>
            <h3>${item.price}</h3>
            <h4>{item.name}</h4>
            <p>Stock: {getProductQuantity(item.id)}</p>
            <button disabled={!getProductQuantity(item.id)} onClick={() => handleAddToCart(item.id)}>+1 Add to cart</button>
          </div>)
        }
      </div>
      <Modal isOpen={isOpen}>
        <div className="header">
          <h3>Cart</h3>
          <button onClick={() => setIsOpen(false)}>X</button>
        </div>
        <div>
          {
            getCartList().map(item => {
              const foundItem = listItems.find(element => element.id === item.id)
              return (
                <div div className="card" key={item.id} >
                  <h2>{foundItem.name}</h2>
                  <h4>${foundItem.price}</h4>
                  <p>Stock: {getCartQuantity(item.id)}</p>
                  <button onClick={() => handleSubstractFromCart(item.id)}>-1 Substract form cart</button>
                </div>
              )
            })
          }
          <h5>Total: ${
            getCartList().reduce((acum,item) => {
              const foundItem = listItems.find(element => element.id === item.id)
              return acum += foundItem.price * item.quantity
            }, 0)}</h5>
        </div>
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


// body{
//   background - color: #ddd;
// }

// .list {
//   display: grid;
//   grid - template - columns: 1fr 1fr 1fr;
//   gap: 8px;
// }

// .card {
//   background - color: #fafafa;
//   border - radius: 5px;
//   padding: 16px;;
// }

// .overlay {
//   position: fixed;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background - color: #dddddd99;
// }

// .modal {
//   position: fixed;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background - color: #fafafa;
//   width: 600px;
//   height: 600px;
//   border - radius: 25px;
//   margin: auto;
//   padding: 32px;
//   overflow: auto;
// }

// .header {
//   display: flex;
//   justify - content: space - between;
//   align - items: center;
// }