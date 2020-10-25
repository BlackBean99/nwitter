import React,{useState} from "react";
import { authService } from "fBase";

const AuthForm =()=>{

    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
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

    return(<>
            <form onSubmit={onSubmit} className="container">
                    <input className="authInput" name="email" type="text" placeholder="Email" required value={email} onChange={onChange}/>
                    <input className="authInput" name="password" type="password" placeholder="password" required value={password} onChange={onChange}/>
                    <input className="authInput authSubmit" type="submit" value={newAccount ? "Create Account" : "Sign In"}/>
                </form>
                <span onClick={toggleAccount} className="authSwitch">
                    {newAccount ? "Sign in." : "Create Account"}
                </span>
                {error && <span className="authError">{error}</span>}
        </>
    )
}

export default AuthForm;