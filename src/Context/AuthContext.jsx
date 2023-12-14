import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";


export let AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const baseUrl = "https://upskilling-egypt.com:443";
  const [userData, setuserData] = useState({});
  

  let saveuserData = () => {
    let encodedToken = localStorage.getItem("userToken");
    try {
      let decodedToken = jwtDecode(encodedToken);
      setuserData(decodedToken);
    } catch (error) {
      setuserData(null);
    }
  };
let headers={
    Authorization: `Bearer ${localStorage.getItem("userToken")}`
  }
let HeadersWithContent={
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    "Content-Type": "multipart/form-data",
  }

  
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveuserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, saveuserData,headers,baseUrl,HeadersWithContent}}>
      {props.children}
    </AuthContext.Provider>
  );
}
