import NavBar from "../components/NavBar";
import "./css/OneProductPage.css"

const OneProductPage = ({user, setUser, allProducts, setAllProducts}) => {

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

export default OneProductPage;