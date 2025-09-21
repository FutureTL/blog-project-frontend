import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import{ AuthProvider} from './contexts/AuthContext/AuthContext.jsx'

import Home from './pages/Home.jsx';
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx';
import AddPost from './components/AddPost.jsx'
import AllWriters from './components/AllWritersBtn.jsx';
import Writer from './pages/Writer.jsx'
import DisplayBlog from './components/DisplayBlog.jsx'



const router = createBrowserRouter([
  {
    path : '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element : <Home/>
      },
      {
        path: '/register',
        element: <Signup/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/:username/new-blog', //doubt in the link
        element: <AddPost/>,
      },
      {
        path: '/our-writers',
        element: <AllWriters/>,
      },
    
      { 
        path: '/our-writers/:username',
        element: <Writer/>
      },
      { 
         path: '/:author/:title/:id',
        element: <DisplayBlog/>
      }

    ],
  },
])

createRoot(document.getElementById('root')).render(
  
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  
)
