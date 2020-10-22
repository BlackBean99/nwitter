import { authService } from "fBase";
import React,{useState} from "react";
const Auth = () =>{
	const [email, setEmail] = useState("");

	const [password, setPassword] = useState("");

	const [newAccount, setNewAccount] = useState(true);
	console.log(setNewAccount);
	const [error, setError] = useState("");

	const onChange = (event) =>{
		const {target:{name,value}} = event;
		if(name ==="email"){
			setEmail(value);  
		}else if(name==="password"){
			setPassword(value);
		}
		
	}

	const onSubmit = async(event) =>{
		event.preventDefault();
		let data;
		
		try {
			if(newAccount){
				// create NewAccount
				data =await authService.createUserWithEmailAndPassword(email, password);
					console.log(data);
					
			} else {
				data = await authService.signInWithEmailAndPassword(email,password);
				console.log(data);
			}
			console.log(data);
		} catch (error) {
			setError(error.message);

		}
	}
	const toggleAccount = () =>{
		setNewAccount((prev)=> !prev)
	}

	return(
		<div>
		<span onClick={toggleAccount}>{newAccount ? "Log in." : "Create Account"}</span>
			<form onSubmit={onSubmit}>
				<input name="email" type="text" placeholder="Email" required value={email} onChange={onChange}/>
				<input name="password" type="password" placeholder="password" required value={password} onChange={onChange}/>
				<input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
			</form>
			<p>{error}</p>
			<div>
				<button>Continue with Google</button>
				<button>Continue with GitHub</button>
			</div>
		</div>);
}
export default Auth;