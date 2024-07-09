import NavBar from "../components/NavBar";
import "./css/AccountPage.css"
const AccountPage = ({user, setUser, allProducts, setAllProducts, orders, setOrders}) => {

    return(
        <div>
            <NavBar 
            user={user} 
            setUser={setUser} 
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            orders={orders}
            setOrders={setOrders}/>
        </div>
    )

}

export default AccountPage;