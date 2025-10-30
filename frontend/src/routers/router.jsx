import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import BookDetails from "../pages/BookDetails.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Home/>
      }
      ,
     
      {
        path: '/books/:id',
        element: <BookDetails/>
      },
    ]
  }
])

export default router;