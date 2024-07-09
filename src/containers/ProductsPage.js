import { useNavigate } from "react-router-dom";
import DisplaySingleProduct from "../components/DisplaySingleProduct";
import NavBar from "../components/NavBar";
import "./css/ProductsPage.css"
import { useState } from "react";

const ProductsPage = ({user, setUser, allProducts, setAllProducts, oneProductToView, setOneProductToView, orders, setOrders}) => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const checkWhetherThereIsProducts = () => {
        if(allProducts && allProducts.length > 0){
            return allProducts.map((temp) => {
                return(
                    <div >
                        <DisplaySingleProduct 
                        product={temp}
                        setOneProductToView={setOneProductToView}
                        className="product-div"/>
                    </div>
                )
            })
        } else {
            return(
                <div>
                    <p>No Products...</p>
                </div>
            )
        }
    }

    const getProductsFromSearch = async (search) => {
        const newResponse = await fetch(`http://localhost:3000/products/search/${search}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
        })
        if(newResponse.status === 200){
            const newC = await newResponse.json();
            setAllProducts(newC);
            setSearch("");
        } else {
            setAllProducts([]);
        }
    }

    const handleSearchBar = (event) => {
        event.preventDefault();
        if(search !== ""){
            getProductsFromSearch(search);
        }
    }

    return(
        <div className="product-page">
            <NavBar 
            user={user} 
            setUser={setUser} 
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            orders={orders}
            setOrders={setOrders}/>

            <form onSubmit={handleSearchBar} className="search-bar">
                <input type="text"
                placeholder="Enter a word..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}/>
                <button type="submit">Search</button>
            </form>
            
            <div className="products-page-display">
                {checkWhetherThereIsProducts()}
            </div>
        </div>
    )

}

export default ProductsPage;