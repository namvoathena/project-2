import Cart, { CartItem } from "@models/cart.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState extends Cart {}

interface UpdateCartState {
  userId?: string;
  name?: string;
  phone?: string;
  email?: string;
  totalPrice?: number;
  discount?: number;
  unitPrice?: string;
  paymentMethod?: string;
  shippingAddress?: string;
  createdAt?: string;
  status?: "Pending" | "Processing" | "Delivered" | "Cancelled";
}

const initialState: CartState = {
  userId: "",
  name: "",
  phone: "",
  email: "",
  totalPrice: 0,
  discount: 0,
  unitPrice: "VND",
  paymentMethod: "cod",
  shippingAddress: "",
  createdAt: "",
  status: "Pending",
  items: {},
};

export const CartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    resetCart: () => {
      return initialState;
    },
    updateCart: (state, action: PayloadAction<UpdateCartState>) => {
      state = { ...state, ...action.payload };
    },
    updateCartItem: (state, action: PayloadAction<CartItem>) => {
      const cartItem = action.payload;
      const exist = state.items[cartItem.productId];
      if (exist) {
        state.totalPrice -=
          state.items[cartItem.productId].productPrice *
          state.items[cartItem.productId].productQuantity;
        if (cartItem.productQuantity != 0) {
          state.items[cartItem.productId].productQuantity =
            cartItem.productQuantity;
          state.totalPrice +=
            state.items[cartItem.productId].productPrice *
            state.items[cartItem.productId].productQuantity;
        } else {
          delete state.items[cartItem.productId];
        }
      } else if (cartItem.productQuantity != 0) {
        state.items[cartItem.productId] = action.payload;
        state.totalPrice +=
          state.items[cartItem.productId].productPrice *
          state.items[cartItem.productId].productQuantity;
      }
    },
  },
});

export const { updateCartItem, updateCart } = CartSlice.actions;

export default CartSlice.reducer;
