// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import productList from "store/product-list";
import productSingle from "store/product-single";
import productFilter from "store/product-filter";
import cart from "store/cart";

export const store = configureStore({
  reducer: {
    productList,
    productSingle,
    productFilter,
    cart,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
