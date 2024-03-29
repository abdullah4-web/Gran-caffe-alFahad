import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
  cart: {
    paymentId: null,
    paymentSuccess: false,
  },
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        cartItems: action.payload,
      };
    case 'ADD_TO_CART':
      const existingItemIndex = state.cartItems.findIndex((item) => item._id === action.payload._id);
      if (existingItemIndex !== -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    case 'REMOVE_FROM_CART':
      const updatedCartItems = state.cartItems.filter((item) => item._id !== action.payload);
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      };
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
        ),
      };
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case 'SAVE_PAYMENT_SUCCESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentId: action.payload.paymentId,
          paymentSuccess: true,
        },
      };
    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartState.cartItems));
  }, [cartState.cartItems]);

  useEffect(() => {
    localStorage.setItem('shippingAddress', JSON.stringify(cartState.shippingAddress));
  }, [cartState.shippingAddress]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const increaseQuantity = (productId) => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: productId });
  };

  const decreaseQuantity = (productId) => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: productId });
  };

  const saveShippingAddress = (address) => {
    dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: address });
  };

  const savePaymentMethod = (method) => {
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: method });
  };

  const savePaymentSuccess = (paymentId) => {
    dispatch({ type: 'SAVE_PAYMENT_SUCCESS', payload: { paymentId } });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cartState.cartItems,
        shippingAddress: cartState.shippingAddress,
        paymentId: cartState.cart.paymentId,
        paymentSuccess: cartState.cart.paymentSuccess,
        dispatch,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        saveShippingAddress,
        savePaymentMethod,
        savePaymentSuccess,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
