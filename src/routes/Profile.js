import { authService, dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export default ({userObj, refreshUser}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }

    const onSubmit = async(event) =>{
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            console.log(userObj.updateProfile);
            await userObj.updateProfile({
                displayName : newDisplayName,
            });
            refreshUser();
        }
    }

    const onChange = (event) =>{
        const {
            target:{value},
        } = event;
        setNewDisplayName(value);
    }

    const getMyNweets = async() =>{
        const nweets = await dbService
        .collection("nweets")
        .where("userId","==",userObj.uid)
        .orderBy("createdAt")
        .get();
    console.log(nweets.docs.map((doc) =>doc.data()));
    console.log({userObj});
    }

    useEffect(()=>{
        getMyNweets();
    })
    return(
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName}/>
            <input type="submit" placeholder="Update Profile" value="Update Profile" />
        </form>
        <button onClick={onLogOutClick}>Log out</button>
        </>
        )
}