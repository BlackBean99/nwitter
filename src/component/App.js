import React,{useState, useEffect} from 'react';
import AppRouter from "component/Router";
import {authService} from "fBase";

function App() {
  const [init,setInit] = useState(false);
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
  console.log({isLoggedIn});

  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "initializing"}
    <footer> &copy; Nwitter {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
