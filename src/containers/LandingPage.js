import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./css/LandingPage.css"
import { useState } from "react";

const LandingPage = ({user, setUser, allProducts, setAllProducts, orders, setOrders}) => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const getProductsFromSearch = async (search) => {
        const newResponse = await fetch(`http://localhost:3000/products/search/${search}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
        })
        if(newResponse.status === 200){
            const newC = await newResponse.json();
            setAllProducts(newC);
            setSearch("");
            navigate("/products")
        } else {
            setAllProducts([]);
            navigate("/products")
            setSearch("")
        }
    }

    const handleSearchBar = (event) => {
        event.preventDefault();
        if(search !== ""){
            getProductsFromSearch(search);
        }
    }

    return(
        <div className="landing-page">
            <NavBar 
            user={user} 
            setUser={setUser}
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            orders={orders}
            setOrders={setOrders}/>

            <h2>Welcome to the only store you need</h2>
            
            <form onSubmit={handleSearchBar} className="search-bar-landing">
                <input type="text"
                placeholder="Enter a word..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}/>
                <button type="submit">Search</button>
            </form>

            <div className="btm">
                <p>Best Prices</p>
                <p>Quality Product</p>
                <p>Satisfied Customer</p>
            </div>
        </div>
    )

}

export default LandingPage;