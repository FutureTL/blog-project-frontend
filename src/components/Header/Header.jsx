import {useState} from "react";
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
    const [menuOpen, setMenuOpen] = useState(false);

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
       
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* Hamburger icon for mobile */}
        <button
          className="md:hidden text-[#6a3c4a] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        {/* Nav links */}
        <ul
          className={`md:flex md:space-x-6 items-center font-medium text-center md:static absolute left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-300 ease-in-out ${
            menuOpen ? "top-16 opacity-100" : "top-[-400px] opacity-0 md:opacity-100"
          }`}
        >
          {navItems.map((item) => {
            if (item.active && item.name === "AddPost") {
              return (
                <Link
                  to={`${user?.username}/new-blog`}
                  key={item.name}
                  onClick={() => setMenuOpen(false)}
                >
                  <li className="text-[#6a3c4a] hover:text-[#52192a] transition py-2 md:py-0">
                    {item.name}
                  </li>
                </Link>
              );
            } else if (item.active) {
              return (
                <Link
                  to={item.slug}
                  key={item.name}
                  onClick={() => setMenuOpen(false)}
                >
                  <li className="text-[#6a3c4a] hover:text-[#52192a] transition py-2 md:py-0">
                    {item.name}
                  </li>
                </Link>
              );
            }
          })}

          {user && (
            <li
              className="text-[#6a3c4a] hover:text-[#52192a] transition py-2 md:py-0"
              onClick={() => setMenuOpen(false)}
            >
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
