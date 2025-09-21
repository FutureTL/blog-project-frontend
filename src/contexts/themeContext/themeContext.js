import { createContext } from "react";
import { useContext } from "react";

export const themeContext = createContext({
    themeMode : "light",
    lightMode : () => {},
    darkMode :  () => {}
})

export const themeProvider = themeContext.Provider;

export default useTheme= ()=>{

return useContext(themeContext)

}