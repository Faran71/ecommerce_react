import NavBar from "../components/NavBar";
import "./css/LandingPage.css"

const LandingPage = ({user, setUser, allProducts, setAllProducts, orders, setOrders}) => {

    return(
        <div>
            <NavBar 
            user={user} 
            setUser={setUser}
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            orders={orders}
            setOrders={setOrders}/>
            
            <p>h</p>
        </div>
    )

}

export default LandingPage;