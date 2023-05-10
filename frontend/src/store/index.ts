// ** Toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// ** Reducers
import productList from "store/product-list";
import productSingle from "store/product-single";
import productFilter from "store/product-filter";

export const store = configureStore({
  reducer: {
    productList,
    productSingle,
    productFilter,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
