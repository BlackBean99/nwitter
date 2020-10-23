import { dbService } from "fBase";
import React, {useEffect, useState} from "react";
import Nweet from "../component/Nweet";
const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);


    useEffect(()=>{
        dbService.collection("nweets").onSnapshot((snapshot)=>{
            const nweetArray = snapshot.docs.map((doc)=>({
                id : doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        })
    },[]);

    const onChange = (event) =>{
        const {
            target: {value},
        }= event;
        setNweet(value);
    };

    const onSubmit = async(event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text:nweet,
            createdAt: Date.now(),
            userId : userObj.uid,
        });
        setNweet("");
    };


    return (
        <>
        <div>
            <form>
                    <input value={nweet} onChange={onChange} type ="text" placeholder="What's on your mind" maxLength={120}/>
                    <input onClick={onSubmit} type="submit" value="Nweet"/>
            </form>
            <div>
                {nweets.map((nweet) => (
                        <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.userId === userObj.uid}  />
                    ))}
            </div>
        </div>
        </>
    )
}

export default Home;