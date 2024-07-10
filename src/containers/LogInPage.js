import { useEffect, useState } from "react"
import "./css/LogInPage.css"
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const LogInPage = ({user, setUser, allProducts, setAllProducts, orders, setOrders}) => {
    const navigate = useNavigate();

    // variables to allow user to login
    const [logInEmail, setLogInEmail] = useState("");
    const [logInPassword, setLogInPassword] = useState("");
    const [hideWrongLogInMessage,setHideWrongLogInMessage] = useState(true);

    // variables to allow user to register an account
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [wallet, setWallet] = useState(null);
    const [emailInUse, setEmailInUse] = useState(true);
    const [fillInputs, setFillInputs] = useState(true);

    // variable to hold boolean whether to show login or register form
    const [showLogIn, setShowLogIn] = useState(false);
    


// Function to authenticate the user details with the backend
    const postLogInUser = async (logInEmail, logInPassword) => {
        let temp = {
            email: logInEmail,
            password: logInPassword
        }
        const newResponse = await fetch(`http://13.41.197.49:3000/users/authenticate`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(temp)
        })
        // console.log(newResponse.status);
        if(newResponse.status === 202){
            const newC = await newResponse.json();
            setUser(newC);
            navigate("/account");
            setLogInEmail("");
            setLogInPassword("");
            setHideWrongLogInMessage(true);
        } else {
            setHideWrongLogInMessage(false);
        }
    }

    const handleLogInForm = (event) => {
        // To stop page from refreshing when you login
        event.preventDefault();
        postLogInUser(logInEmail,logInPassword);
    }

//  Fucntion to allow user to Register an account   
    const postRegisterUser = async (firstName, lastName, registerEmail, registerPassword, wallet) => {
        let temp = {
            first_name: firstName,
            last_name: lastName,
            email: registerEmail,
            password: registerPassword,
            wallet: wallet
        }
        const newResponse = await fetch(`http://13.41.197.49:3000/users`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(temp)
        })

        if(newResponse.status === 201){
            const newC = await newResponse.json();
            setUser(newC);
            navigate("/account");
            setFirstName("");
            setLastName("");
            setRegisterEmail("");
            setRegisterPassword("");
            setWallet(null);
            setEmailInUse(true);
        } else {
            setEmailInUse(false);
        }
        
        
    }

    const handleRegisterUserForm = (event) => {
        event.preventDefault();
        if(firstName!=="" && lastName!=="" && registerEmail!=="" && registerPassword!=="" && wallet !== null){
            setFillInputs(true);
            postRegisterUser(firstName,lastName,registerEmail,registerPassword,wallet);
        } else {
            setFillInputs(false);
        }
    }

    const displayLogInOrRegister = () => {
        if(showLogIn){
            return(
                <div className="log-in-top">
                    <form onSubmit={handleLogInForm}>
                        <input type="text"
                        placeholder="Email"
                        value={logInEmail}
                        onChange={(e) => setLogInEmail(e.target.value)}/>
                        <input type="password"
                        placeholder="Password"
                        value={logInPassword}
                        onChange={(e) => setLogInPassword(e.target.value)}/>
                        
                        <button type="submit">Log In</button>
                        <p hidden={hideWrongLogInMessage} style={{color:"red"}}>Wrong Credentials</p>
                    </form>
                    <button onClick={() => setShowLogIn(false)}>No account, register here</button>
                </div>
            )
        } else {
            return(
                <div className="log-in-top">
                    <form onSubmit={handleRegisterUserForm}>
                        <input type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}/>

                        <input type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}/>

                        <input type="text"
                        placeholder="Email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}/>

                        <input type="text"
                        placeholder="Password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}/>

                        <input type="number"
                        placeholder="Enter the amount to deposit"
                        value={wallet}
                        onChange={(e) => setWallet(e.target.value)}/>

                        <button type="submit">Create account</button>
                        <p hidden={emailInUse} style={{color: "red"}}>Email already in use</p>
                        <p hidden={fillInputs} style={{color: "red"}}>Please fill in all fields</p>
                    </form>
                    <button onClick={() => setShowLogIn(true)}>Already have an account, Log in here</button>
                </div>
            )
        }
    }


    return(
        <div className="log-in-main">
            <NavBar 
            user={user} 
            setUser={setUser} 
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            orders={orders}
            setOrders={setOrders}
            />
            {displayLogInOrRegister()}
        </div>
    )

}

export default LogInPage;