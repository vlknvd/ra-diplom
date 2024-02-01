import { configureStore } from '@reduxjs/toolkit'

import categoriesSlice from './categories/categoriesSlice'
import itemsSlice from './items/itemsSlice'
import topSaleSlice from './topSale/topSale'
import cartSlice from './cart/cartSlice'
import cardSlice from './card/cardSlice'
import orderSlice from './order/orderSlice'
import searchSlice from './search/searchSlice'

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    items: itemsSlice,
    topSales: topSaleSlice,
    cart: cartSlice,
    card: cardSlice,
    order: orderSlice,
    search: searchSlice,
  }
})