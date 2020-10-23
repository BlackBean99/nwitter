import React,{useState, useEffect} from 'react';
import AppRouter from "component/Router";
import {authService} from "fBase";

function App() {
  const [init,setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(()=>{
      authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
        }else{
          setIsLoggedIn(false);
        } setInit(true);
      });
  },[]);

  return (
    <>
    {init ? <AppRouter userObj={userObj} isLoggedIn={isLoggedIn}/> : "initializing"}
    <footer> &copy; Nwitter {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
