import React,{useState, useEffect} from 'react';
import AppRouter from "component/router";
import {authService} from "fBase";

function App() {
  const [init,setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const refreshUser =() =>{
    const user = authService.currentUser;
    setUserObj(Object.assign({},user));
  }

  useEffect(()=>{
      authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
        setUserObj({
          displayName : user.displayName,
          uid:user.uid,
          updateProfile : (args)=> user.updateProfile(args),
        });
        }else{
          setIsLoggedIn(false);
        } 
        setInit(true);
      });
  },[]);

  return (
    <>
    {init ? <AppRouter refreshUser ={refreshUser} userObj={userObj} isLoggedIn={isLoggedIn}/> : "initializing"}
    <footer> &copy; Nwitter {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
