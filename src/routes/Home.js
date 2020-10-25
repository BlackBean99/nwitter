import { dbService, storageService } from "fBase";
import React, {useEffect, useState} from "react";
import Nweet from "../component/Nweet";
import { v4 as uuidv4 } from "uuid";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

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

    const onClearAttachmentClick = () => setAttachment(null);

    const onFileChange =(event) =>{
            const {target:{files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) =>{
            console.log(finishedEvent);
            const {currentTarget:{result},
        } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };

    const onSubmit = async(event) => {
        event.preventDefault();
        let attachmentUrl ="";
        // if there have a photo
        if(attachment !==""){
        
        const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const response = await attachmentRef.putString(attachment, "data_url");
        attachmentUrl = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text:nweet,
                createdAt: Date.now(),
                userId : userObj.uid,
                attachmentUrl,
        }
                await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
    }


    return (
        <>
        <div>
            <form>
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input value={nweet} onChange={onChange} type ="text" placeholder="What's on your mind" maxLength={120}/>
                <input onClick={onSubmit} type="submit" value="Nweet"/>
                {attachment && <div>
                        <img alt="" src={attachment} width="50px"  height="50px"/>
                        <button onClick={onClearAttachmentClick}>Clear</button>
                    </div>}
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