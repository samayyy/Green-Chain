import React, { useState } from "react";

// creating context
const AuthContext = React.createContext({
  isLoggedIn: false,
  email: "",
  getUserData: {},
  setUserData: (userDataInput) => {},
  signIn: (email, password) => {},
  signOut: () => {},
});

// defining the provider component
// AuthContextProvider imported in index.tsx so that AuthContext can be used in any component
export const AuthContextProvider = (props) => {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const loginHandler = (emailInput) => {
    setIsLoggedIn(true);
    setEmail(email);
    setUserData(email);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("userToken");
  };

  const setUserDataHandler = (userDataInput) => {
    setUserData(userDataInput);
  };

  //  AuthContext is returned as Default
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        email: email,
        setUserData: setUserDataHandler,
        getUserData: userData,
        signIn: loginHandler,
        signOut: logoutHandler,
      }}
    >
      {/* Children will have access to AuthContext */}

      {props.children}
    </AuthContext.Provider>
  );
};

// use useContext hook on AuthContext to get above functions
export default AuthContext;
