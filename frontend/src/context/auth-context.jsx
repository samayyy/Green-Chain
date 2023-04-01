import React, { useState, useEffect } from "react";

// creating context
const AuthContext = React.createContext({
  isLoggedIn: false,
  email: "",
  userType: "",
  setUserType: "",
  getUserData: {},
  setUserData: (userDataInput) => {},
  signIn: (email, password) => {},
  signOut: () => {},
});

// defining the provider component
// AuthContextProvider imported in index.tsx so that AuthContext can be used in any component
export const AuthContextProvider = (props) => {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userType") && localStorage.getItem("userType") === "authority"){
      setUserDataHandler("authority");
    }
    else {
      setUserDataHandler("user");
    }
  }, [])
  

  const loginHandler = (emailInput) => {
    setIsLoggedIn(true);
    setEmail(email);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setUserData("");
    localStorage.removeItem("userToken");
  };

  const setUserDataHandler = (userDataInput) => {
    setUserType(userDataInput);
    localStorage.setItem("userType", userDataInput);
  };

  //  AuthContext is returned as Default
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        email: email,
        userType: userType,
        setUserType: setUserType,
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
