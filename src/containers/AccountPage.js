import NavBar from "../components/NavBar";
import "./css/AccountPage.css"
const AccountPage = ({user, setUser, allProducts, setAllProducts}) => {

    return(
        <div>
            <NavBar 
            user={user} 
            setUser={setUser} 
            allProducts={allProducts}
            setAllProducts={setAllProducts}/>
        </div>
    )

}

export default AccountPage;