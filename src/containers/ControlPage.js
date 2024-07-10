import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import ProductsPage from "./ProductsPage";
import OneProductPage from "./OneProductPage";
import LogInPage from "./LogInPage";
import AccountPage from "./AccountPage";
import { useEffect, useState } from "react";

const ControlPage = () => {

    const [user, setUser] = useState(null);
    const [allProducts, setAllProducts] = useState(null);
    const [oneProductToView , setOneProductToView] = useState(null);
    const [orders, setOrders] = useState([]);

    // Function to get all the products
    const getAllProducts = async () => {
        const newResponse = await fetch(`http://13.41.197.49:3000/products`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            // body:JSON.stringify(temp)
        })
        if(newResponse.status === 200){
            const newC = await newResponse.json();
            setAllProducts(newC);
        }
    }

    useEffect(() => {
        getAllProducts();
    },[])
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" 
                    element={<LandingPage 
                    user={user}
                    setUser={setUser}
                    allProducts={allProducts}
                    setAllProducts={setAllProducts}
                    orders={orders}
                    setOrders={setOrders}/>} 
                    key={1}/>

                    <Route path="/products" 
                    element={<ProductsPage 
                    user={user}
                    setUser={setUser}
                    allProducts={allProducts}
                    setAllProducts={setAllProducts}
                    oneProductToView={oneProductToView}
                    setOneProductToView={setOneProductToView}
                    orders={orders}
                    setOrders={setOrders}/>} 
                    key={2}/>

                    <Route path="/oneProduct" 
                    element={<OneProductPage
                    user={user}
                    setUser={setUser} 
                    allProducts={allProducts}
                    setAllProducts={setAllProducts}
                    oneProductToView={oneProductToView}
                    orders={orders}
                    setOrders={setOrders}/>} 
                    key={3}/>

                    <Route path="/logIn" 
                    element={<LogInPage 
                    user={user}
                    setUser={setUser}
                    allProducts={allProducts}
                    setAllProducts={setAllProducts}
                    orders={orders}
                    setOrders={setOrders}/>} 
                    key={4}/>

                    <Route path="/account" 
                    element={<AccountPage 
                    user={user}
                    setUser={setUser}
                    allProducts={allProducts}
                    setAllProducts={setAllProducts}
                    orders={orders}
                    setOrders={setOrders}/>} 
                    key={5}/>
                </Routes>
            </BrowserRouter>
        </div>
    )

}

export default ControlPage;