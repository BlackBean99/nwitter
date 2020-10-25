import { dbService, storageService } from "fBase";
import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({nweetObj, isOwner}) =>{

	const [editing, setEditing] = useState(false);
	const [newNweet,setNewNweet] = useState(nweetObj.text);
	const toggleEditing = () =>{
		setEditing((prev)=>!prev);
	}


	const onDeleteClick =async() =>{
		const ok = window.confirm("Are you sure you want to delete this nweet?");
		console.log(ok);
		console.log("what");
		if(ok){
			await dbService.doc(`nweets/${nweetObj.id}`).delete();
			await storageService.refFromURL(nweetObj.attachmentUrl).delete();
		}
	}

	const onSubmit = async(event) =>{
		event.preventDefault();
		await dbService.doc(`nweets/${nweetObj.id}`).update({
			text:newNweet,
		});
		setEditing(false);
	}
	const onChange = (event) =>{
		const{target: {value},
	}=event;
	setNewNweet(value);
	}

	return(
	<div className="nweet">
		{editing ? 
		<div>
			<form onSubmit={onSubmit} className="container nweetEdit">
				<input className="formInput" onChange={onChange} value={newNweet} placeholder="Edit your nweet" required autoFocus/>
				<input type="submit" value="Update Nweet" className="formBtn" />
			</form>
			<span onClick={toggleEditing} className="formBtn cancelBtn">
            	Cancel
        	</span>
		</div> : (
		<>
			<h4>{nweetObj.text}</h4>
			{nweetObj.attachmentUrl && <img alt="" src={nweetObj.attachmentUrl} />}
			{isOwner &&(
				<div class="nweet__actions">
				<span onClick={onDeleteClick}>
					<FontAwesomeIcon icon={faTrash} />
				</span>
				<span onClick={toggleEditing}>
					<FontAwesomeIcon icon={faPencilAlt} />
				</span>
			</div>
			)}
		</>
		)
		}
	</div>);
}

export default Nweet;