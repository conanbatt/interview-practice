import { createContext, useContext, useState } from "react";

const items = {
  123: { name: "T-Shirt", quantity: 5, id: 123, price: 20 },
  111: { name: "Pants", quantity: 2, id: 111, price: 20 },
};

const defaultStore = {
  items,
  cart: {
    items: {},
    total: 0,
  },
};

const StoreContext = createContext();

function StoreProvider({ children }) {
  const [storeState, setStoreState] = useState(defaultStore);

  return (
    <StoreContext.Provider value={[storeState, setStoreState]}>
      {children}
    </StoreContext.Provider>
  );
}

export default function ShoppingCart() {
  return (
    <>
      <h1>Shopping Cart</h1>
      <p>
        We want to build a supermarket shopping experience. You should be able
        to browse a list of goods, select how many to purchase, and add them to
        a shopping cart component. The shopping cart should sum the pricing of
        all selected goods.
      </p>
      <p>
        The UX should include being able to select multiple quantities of an
        item, and the store also has availability items. That is, you cannot add
        to your shopping cart more items that are available.
        <br />
        Tip: Consider the data structure correctly for computational and memory
        performance as well as a usuable API.
      </p>

      <StoreProvider>
        <Store />
        <Cart />
      </StoreProvider>
    </>
  );
}

function Store() {
  const [store, setStoreState] = useContext(StoreContext);

  function addItemToCart(item) {
    const storeCopy = { ...store };

    storeCopy.items[item.id].quantity -= 1;

    if (storeCopy.cart.items[item.id]) {
      storeCopy.cart.items[item.id].quantity += 1;
    } else {
      storeCopy.cart.items[item.id] = {
        ...item,
        quantity: 1,
      };
    }

    //remove item from items and add to cart
    setStoreState({
      items: storeCopy.items,
      cart: storeCopy.cart,
    });
  }

  return (
    <div>
      <h2>Store:</h2>
      <ul>
        {Object.keys(store.items).map((itemKey) => {
          const item = store.items[itemKey];
          return (
            <li key={item.id}>
              {item.name} ${item.price}
              <button
                onClick={() => addItemToCart(item)}
                disabled={item.quantity < 1}
              >
                {item.quantity < 1 ? "Not in stock" : "Add to cart"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Cart() {
  const [store, setStoreState] = useContext(StoreContext);

  function removeItemFromCart(item) {
    //remove item from items and add to cart
    const storeCopy = { ...store };

    if (
      storeCopy.cart.items[item.id] &&
      storeCopy.cart.items[item.id].quantity > 1
    ) {
      storeCopy.cart.items[item.id].quantity -= 1;
    } else if (storeCopy.cart.items[item.id]) {
      delete storeCopy.cart.items[item.id];
    }

    storeCopy.items[item.id].quantity += 1;

    setStoreState({
      items: storeCopy.items,
      cart: storeCopy.cart,
    });
  }

  const total = Object.keys(store.cart.items).reduce(
    (acc, current) =>
      acc +
      store.cart.items[current].price * store.cart.items[current].quantity,
    0
  );

  return (
    <div>
      <h2>Cart:</h2>
      <ul>
        {Object.keys(store.cart.items).map((itemKey) => {
          const item = store.cart.items[itemKey];
          return (
            <li key={item.id}>
              {item.name} ${item.price}
              <button onClick={() => removeItemFromCart(item)}>
                Remove from cart
              </button>
              {item.quantity}
            </li>
          );
        })}

        <li>Total: {total}</li>
      </ul>
    </div>
  );
}
