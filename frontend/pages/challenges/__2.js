// list of goods
// cart selected item list
// calculate totals
// stock

import { useEffect, useState } from "react"

const useListItems = () => {
  const [listItem, set] = useState([
    {
      id: 11,
      name: 'Apple',
      price: 3,
      quantity: 5
    },
    {
      id: 12,
      name: 'Banana',
      price: 3.5,
      quantity: 7
    },
    {
      id: 13,
      name: 'Orange',
      price: 2,
      quantity: 10
    },
    {
      id: 14,
      name: 'Lemon',
      price: 1,
      quantity: 15
    },
    {
      id: 15,
      name: 'Watermelon',
      price: 7,
      quantity: 5
    },
    {
      id: 16,
      name: 'Pomegranate',
      price: 4,
      quantity: 3
    }
  ])
  return [listItem, set]
}

class Stock {
  constructor() {
    this.map = new Map()
  }

  getItemQuantity (id) {
    return this.map.get(id)
  }

  addItemQuantity (id, quantity = 1) {
    if(this.map.has(id)) {
      this.map.set(id, this.getItemQuantity(id) + quantity)
    } else {
      this.map.set(id, quantity)
    }
  }

  substractItemQuantity(id, quantity = 1) {
    if (this.map.has(id)) {
      if(this.getItemQuantity(id) === 1) {
         this.deleteItem(id)
      } else {
        this.map.set(id, this.getItemQuantity(id) - quantity)
      }
    }
  }

  deleteItem (id) {
    return this.map.delete(id)
  }

  getList () {
    const arr =[]
    for(let [id, quantity] of this.map.entries()) {
      arr.push({id, quantity})
    }
    return arr
  }

}

const listItemsStock = new Stock()
const cartStock = new Stock()

const useStock = (stockInstance) => {
  const [s, setState]= useState()
  const rerender = ()=>setState({})

  const add = (id, quantity) => {
    stockInstance.addItemQuantity(id, quantity)
    rerender()
  }

  const substract = (id, quantity) => {
    stockInstance.substractItemQuantity(id, quantity)
    rerender()
  }

  const get = (id) => {
    return stockInstance.getItemQuantity(id)
  }

  const getList = (id) => {
    return stockInstance.getList()
  }

  return {
    add,
    substract,
    get,
    getList,
  }
}

const Modal = ({isOpen, children}) => {
  return isOpen? <div className="overlay">
    <div className="modal">
      {children}
    </div>
  </div>:<></>

}

export default function shoppingCart() {
  const [listItems] = useListItems()
  const { add: addListItem, substract: substractListItem, get: getListItemQuantity } = useStock(listItemsStock)
  const { add: addCartItem, substract: substractCartItem, get: getCartItemQuantity, getList: getCartList } = useStock(cartStock)
  const [isOpen, setIsOpen] = useState(false)

  const getItem = (id) => {
    return listItems.find(element => element.id === id)
  }
  useEffect(()=>{
    listItems.forEach(item => {
      addListItem(item.id, item.quantity)
    })
  },[])

  const addItemToCart = (id) => {
    addCartItem(id)
    substractListItem(id)
  }

  const removeItemFromCart = (id) => {
    substractCartItem(id)
    addListItem(id)
  }
  const cartList = getCartList()
  return (
    <>
      <div className="header">
        <h1>
          Shopping Cart
        </h1>
        <button onClick={() => setIsOpen(true)}>🛒 Cart</button>

      </div>
      <div className="list">
        {
          listItems.map(item => <div key={item.id} className="card">
            <h3>${item.price}</h3>
            <h4>{item.name}</h4>
            <p>Quantity: {getListItemQuantity(item.id)}</p>
            <button disabled={!getListItemQuantity(item.id)}  onClick={() => addItemToCart(item.id)}>+ Add 1 to cart</button>
          </div>)
        }
      </div>
      <Modal isOpen={isOpen}>
        <div className="header">
          <h3>Cart</h3>
          <button onClick={() => setIsOpen(false)}>X</button>
        </div>
        {
          cartList.map(item =>  {
            const foundItem = getItem(item.id)
            return <div key={item.id} className="card">
              <h4>{foundItem.name}</h4>
              <h5>${foundItem.price}</h5>
              <p>Quantity: {getCartItemQuantity(item.id)}</p>
              <button onClick={() => removeItemFromCart(item.id)}>- substract 1 from cart</button>
            </div>
          })
        }
        <h4>Total : ${cartList.reduce((acum, item) => {
          const foundItem = listItems.find(e => e.id === item.id)
          return acum += foundItem.price * item.quantity
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
//   gap: 16px;
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
//   background - color: #33333377;
// }

// .modal {
//   background - color: #fafafa;
//   width: 600px;
//   height: 600px;
//   border - radius: 25px;
//   margin: auto;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   position: fixed;
//   padding: 32px;
//   overflow: auto;
// }

// .header {
//   display: flex;
//   justify - content: space - between;
//   align - items: center;
// }