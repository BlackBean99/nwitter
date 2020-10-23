import { dbService } from "fBase";
import React,{useState} from "react";

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
	<div>
		{editing ? 
		<div>
			<form onSubmit={onSubmit}>
				<input onChange={onChange} value={newNweet} placeholder="Edit your nweet" required/>
				<input type="submit" value="Update Nweet"/>
			</form>
			<button onClick={toggleEditing}>Cancel</button>
		</div> : (
		<>
			<h4>{nweetObj.text}</h4>
			{isOwner &&(
				<> 
					<button onClick={onDeleteClick}>Delete Nweet</button>
					<button onClick={toggleEditing}>Edit Nweet</button>
				</>
			)}
		</>
		)
		}
	</div>);
}

export default Nweet;