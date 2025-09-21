import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import { useAuth } from './contexts/AuthContext/AuthContext';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


//as soon as the user opens the apps we will check if her session is not expired, 
//then she is logged in else logged out.
//as always loading is true when the app opens.
//in backend we have the user access and refresh tokens- the challenge is how to use them now.
//should I create a context for cookies, what adv does it provide?
// what should be my thought process- think about loggin session or cookies first?

//------------------SOLUTION---------------
//we have set up auth middleware in the backend. and a controller for 
//getting the current user, so when app loads we will hit this route, 
//route asks for auth middleware, if user is authenticated we get the current 
//user details and they get logged in else logout.

function App() {

  const [loading, setLoading] = useState(true);
  const {login, logout} = useAuth();

  useEffect(() => {

    console.log(`request made to get current user`);
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/currentUser`,  {
      withCredentials: true
    })
      .then((res)=>{

        if(res){
          console.log(`response for current user : ${res.data}`)
          const user = res.data.data.user
          // axios.post(`http://localhost:3000/api/v1/user/login`,{
          //     email: user.email,
          //     password: user.password,
          //     username : user.username
          login(user);

          }else {
            logout();
          }
         
        }

    ).catch((err)=>{
      console.log(`error in setting the current user using session cookies :: ${err}`)
    })
      .finally(()=>{
        setLoading(false)
        
      })
   
  }, [])
  
    
  return loading ?
    <div>
      <h2>App is loading!</h2>
    </div> 
  :  <div className='min-h-screen flex flex-wrap content-between bg-white'>
      <div className='w-full block'>
        <Header />
         <Outlet />
        <Footer />
      </div>
    </div>
}

export default App;
