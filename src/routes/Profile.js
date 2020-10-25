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
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
            <input onChange={onChange} autoFocus  type="text" placeholder="Display name" value={newDisplayName} className="formInput"/>
            <input type="submit" value="Update Profile" className="formBtn"
                style={{
                    marginTop: 10,
                }}
            />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
        </span>
    </div>
        )
}