import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedProducts:localStorage.getItem("selectedProducts")?JSON.parse(localStorage.getItem("selectedProducts")):[],
  selectedProductsID:localStorage.getItem("selectedProductsID")?JSON.parse(localStorage.getItem("selectedProductsID")):[],
}

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    
    addToCart: (state, action) => {
    const productQuan = {...action.payload,"quantity":1}
    state.selectedProducts.push(productQuan)
    state.selectedProductsID.push(action.payload.id)
    localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
    localStorage.setItem("selectedProductsID",JSON.stringify(state.selectedProductsID))
    },
    increaseQuantity: (state, action) => {
      // state.value += action.payload
    const increasedProduct = state.selectedProducts.find((item) => {
      return item.id === action.payload.id
    })
    increasedProduct.quantity += 1;
    localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
    },
    decreaseQuantity: (state, action) => {
      // state.value += action.payload
      const increasedProduct = state.selectedProducts.find((item) => {
        return item.id === action.payload.id
      })
      increasedProduct.quantity -= 1;
      if(increasedProduct.quantity === 0){
        const delProduct = state.selectedProducts.filter((item) => {
          return item.id !== action.payload.id 
        
        })
        const delProduct2 = state.selectedProductsID.filter((item) => {
          return item !== action.payload.id 
        })
        state.selectedProducts = delProduct
        state.selectedProductsID = delProduct2
        localStorage.setItem("selectedProductsID",JSON.stringify(state.selectedProductsID))
      }
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
    },
    deleteProduct: (state, action) => {
      // state.value += action.payload
      const delProduct = state.selectedProducts.filter((item) => {
        return item.id !== action.payload.id 
      })
      const delProduct2 = state.selectedProductsID.filter((item) => {
        return item !== action.payload.id
      })
      state.selectedProducts = delProduct
      state.selectedProductsID = delProduct2
      localStorage.setItem("selectedProducts",JSON.stringify(state.selectedProducts))
      localStorage.setItem("selectedProductsID",JSON.stringify(state.selectedProductsID))
    },
  },
})

// Action creators are generated for each case reducer function
export const {  addToCart,increaseQuantity,  decreaseQuantity,deleteProduct } = counterSlice.actions

export default counterSlice.reducer