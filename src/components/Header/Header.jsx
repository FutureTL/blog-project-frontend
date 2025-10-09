import React from "react";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import LogoutBtn from "../LogoutBtn";
import { Link } from "react-router-dom";
import Logo from "../Logo";

//we need authentication in header also. WHY?
//if user is not logged in - then we have to display the signup and login buttons.
//Else if user is logged in then logout button has to be shown and not the signup and login.
//this is the idea of conditional rendering based on the state of the user. 
//for that we can use the context, we have created.
const Header= () => {

    const {user} = useAuth();
    console.log(`header :: user context :: ${user}`)
    //if user is null, this means user is not logged in - show the signup and login button
    //else logout btn.

    //we will create an array of objects that we can loop through -
    //all the items we want to display

    const navItems = [

        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Signup',
            slug: '/register',
            active: !user
        },
        {
            name: 'Login',
            slug: '/login',
            active: !user
        },
        {
            name: 'AddPost',
            slug: '/:username/new-blog',
            active: true
        },
        {
            name: 'Our-Writers',
            slug: '/our-writers',
            active: true
        },
      

    ]

    return(
        <header className="bg-white shadow-md">
             <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        
                <div className="flex-shrink-0">
                        <Link to='/'>
                            <Logo/>
                        </Link>
                </div>
                 
                        <ul className="flex space-x-6 items-center font-medium"> 
                            {/* we have to check here if the <Link> works because in other
                            react project it is not used rather we have used a button. */}

                            {/* -----------------IMPT ISSUE--------------------- */}
                            {/* When the user clicks on addpost we have to check if he is logged in then we have to 
                            extract the username from the user, and pass along here in the link otherwise it would appear in the url. */}
                            {navItems.map((item)=> {

        
                            if(item.active && item.name == 'AddPost'){
                                return <Link to= {`${user?.username}/new-blog`}> 
                                            <li className="text-[#6a3c4a] hover:text-[#52192a] transition" key= {item.name}>
                                                {item.name}
                                            </li>
                                        </Link> 
                            }else if(item.active){
                                return     <Link to={item.slug}> 
                                                <li className="text-[#6a3c4a] hover:text-[#52192a] transition" key= {item.name}>
                                                    {item.name}
                                                </li>
                                            </Link> 
                            }
                                
                    })}

                    {user && 
                        <li className="text-[#6a3c4a] hover:text-[#52192a] transition">
                            <LogoutBtn/>
                        </li>}
                        

                    </ul>
               
            

            </nav>
        </header>
       
        
    )

    


}

export default Header;