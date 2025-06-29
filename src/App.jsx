import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./ui/Home"
import Menu, { loader } from "./features/menu/Menu"
import { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart"
import CreateOrder , {action as createOrderAction} from "./features/order/CreateOrder"
import Order, {loader as orderLoader} from "./features/order/Order"
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error"



// modern way for routing in react-router-dom version 6.4 and abow
const router = createBrowserRouter([
  {
  element: <AppLayout /> ,
  errorElement : <Error />,
  children:[
  {
    path: "/" ,
    element: <Home />
  } ,
    {
    path: "/menu" ,
    element: <Menu />,
    loader: menuLoader ,
    errorElement : <Error />,
  } ,
  {path: "/cart" , element: <Cart />} ,
  {path: "/order/new" , element: <CreateOrder /> ,
    action: createOrderAction 
  } ,
  {path: "/order/:orderId" , element: <Order />,
    loader: orderLoader,
errorElement : <Error />,
  } ,

]
  }
])

function App() {
 return <RouterProvider router={router}/>
}

export default App;

