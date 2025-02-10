import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user,setUser]=useState("");
  const [isLoading,setIsLodding]=useState(true);
  const [services,setServices]=useState("");

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };
  
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };


   const authorizationToken = `Bearer ${token}`;
   let isLoggedIn = !!token;

  console.log("token", token);
  console.log("isLoggedin ", isLoggedIn);

 
  const userAuthentication = async()=>{
    
    try {
      setIsLodding(true);
      const response = await fetch("http://localhost:5001/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      
      });
   if (response.ok) {
     const data = await response.json();
     console.log("user data",data.userData);
     setUser(data.userData);
     setIsLodding(false);
   } else {
     console.error("Error fetching user data");
     setIsLodding(false);
   }

    }catch(error){
      console.log(error);
    }
  }

  const getServices=async()=>{
    try{
      const response = await fetch("http://localhost:5001/api/data/service",{
            method:"GET",
      });
      if(response.ok){
        const data = await response.json();
        console.log(data.msg);
        setServices(data.msg);
      }
    }catch(error){
      console.log(`services ${error}`);
    }
  }

  useEffect(() => {
      getServices();
      userAuthentication();
  }, []);


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        services,
        authorizationToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};




//   When you add values to the provider, you're essentially passing additional props to the provider component. These props can be accessed by any component that is a child of the provider.

//like  a doremon pocket
// export const useAuth = () => {
//   const authContextValue = useContext(AuthContext);
//   if (!authContextValue) {
//     throw new Error("useAuth used outside of the Provider");
//   }
//   return authContextValue;
// };
// Also dont forget to add the provider component in our main app.jsx file
