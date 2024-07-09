import NavBar from "../components/NavBar";
import "./css/LandingPage.css"

const LandingPage = ({user, setUser, allProducts, setAllProducts}) => {

    return(
        <div>
            <NavBar 
            user={user} 
            setUser={setUser}
            allProducts={allProducts}
            setAllProducts={setAllProducts}/>
            
            <p>h</p>
        </div>
    )

}

export default LandingPage;