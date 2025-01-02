import { createContext } from "react";

export const Themecontext = createContext()


const ThemeProvider = ({children}) => {
    return (
        <Themecontext.Provider value={{theme :'light'}} >
            {children}
        </Themecontext.Provider>
    );
};

export default ThemeProvider;