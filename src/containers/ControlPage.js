import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import ProductsPage from "./ProductsPage";
import OneProductPage from "./OneProductPage";
import LogInPage from "./LogInPage";
import AccountPage from "./AccountPage";

const ControlPage = () => {

    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} key={1}/>
                    <Route path="/products" element={<ProductsPage />} key={2}/>
                    <Route path="/oneProduct" element={<OneProductPage />} key={3}/>
                    <Route path="/logIn" element={<LogInPage />} key={4}/>
                    <Route path="/account" element={<AccountPage />} key={5}/>
                </Routes>
            </BrowserRouter>
        </div>
    )

}

export default ControlPage;