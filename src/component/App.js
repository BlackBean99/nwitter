import React,{useState, useEffect} from 'react';
import AppRouter from "component/Router";
import {authService} from "fBase";

function App() {
  console.log(authService.currentUser);
  const [init,setInit] = useState(false);
  console.log(init,setInit);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(()=>{
      authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
        }else{
          setIsLoggedIn(false);
        } setInit(true);
      });
  },[]);
  
  console.log(setIsLoggedIn);
  return (
    <>
    {init ?
    <AppRouter isLoggedIn={isLoggedIn}/> : "initializing"}
    <footer> &copy; Nwitter {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
