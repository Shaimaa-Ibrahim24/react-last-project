import Root from "./pages/Root";
import Home from "./Home/Home";
import Cart from "./Cart/Cart";
import NotFound from "./NotFound";
import ProductDetails from "./pages/details/product-details";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home/>} />
      <Route path="cart" element={<Cart/>} />
      <Route path="product-details/:id" element={<ProductDetails/>} />
      <Route path="*" element={<NotFound/>} />
      {/* ... etc. */}
    </Route>
  )
);


function App() {
  
  return (
    
    <RouterProvider router={router} />
  
  );
}

export default App;
