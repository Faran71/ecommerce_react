import { useState } from "react";
import "./css/NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = ({user, setUser, allProducts, setAllProducts}) => {
    const navigate = useNavigate();

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const [dropdownVisibleCategories, setDropdownVisibleCategories] = useState(false);

    const handleDropdownToggleCategories = () => {
        setDropdownVisibleCategories(!dropdownVisibleCategories);
    };

    // Function to check whether user is logged in or not
    const logInOrHiUser = () => {
        if(user){
            return(
                <li className="navbar-item">
                    <button onClick={() => navigate("/account")} className="navbar-link">Hi {user.first_name}</button>
                    <button onClick={() => {setUser(null); navigate("/")}} className="navbar-link">Log out</button>
                </li>
            )
        } else {
            return(
                <li className="navbar-item">
                    <button onClick={() => navigate("/logIn")} className="navbar-link">Log In/ Register</button>
                </li>
            )
        }
    }

    // Function to get all the products
    const getAllProducts = async () => {
        const newResponse = await fetch(`http://localhost:3000/products`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            // body:JSON.stringify(temp)
        })
        if(newResponse.status === 200){
            const newC = await newResponse.json();
            setAllProducts(newC); 
        }
    }

    const handleAllProductsButton = (event) => {
        event.preventDefault();
        getAllProducts();
        navigate("/products")
    }

    // Handle getting products filtered by categories
    const getProductsByCategory = async (category) => {
        const newResponse = await fetch(`http://localhost:3000/products/filter_by_category/${category}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            // body:JSON.stringify(temp)
        })
        if(newResponse.status === 200){
            const newC = await newResponse.json();
            setAllProducts(newC); 
        } else {
            setAllProducts(null);
        }
    }

    const handleCategoryButton = (event) => {
        event.preventDefault();
        var category = event.target.getAttribute('value');
        getProductsByCategory(category);
        setDropdownVisibleCategories(false)
        navigate("/products");
    }

    // Handle getting products filtered by price
    const getProductsByPrice = async (minValue,maxValue) => {
        const newResponse = await fetch(`http://localhost:3000/products/filter_by_price/${minValue}/${maxValue}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            // body:JSON.stringify(temp)
        })
        if(newResponse.status === 200){
            const newC = await newResponse.json();
            setAllProducts(newC); 
        } else {
            setAllProducts(null);
        }
    }

    const handlePriceButton = (event) => {
        event.preventDefault();
        var values = event.target.getAttribute('value').split(',');
        var minValue = parseInt(values[0],10);
        var maxValue = parseInt(values[1],10);
        getProductsByPrice(minValue,maxValue);
        setDropdownVisible(false);
        navigate("/products");
    }

    return(
        <div>
            <nav className="navbar">
                <button className="navbar-link" onClick={() => navigate("/")}>
                    Logo
                </button>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <button className="navbar-link" 
                        onClick={handleAllProductsButton}>
                            All Products
                        </button>
                    </li>   

                    <li className="navbar-item">
                        <button onClick={handleDropdownToggleCategories} className="navbar-link">
                            Categories
                        </button>
                        {dropdownVisibleCategories && (
                            <div className="dropdown-menu">
                                <button className="dropdown-item" value="Clothes" onClick={handleCategoryButton}>Clothes</button>
                                <button className="dropdown-item" value="Electronics" onClick={handleCategoryButton}>Electronics</button>
                                <button className="dropdown-item" value="Home" onClick={handleCategoryButton}>Home</button>
                                <button className="dropdown-item" value="Books" onClick={handleCategoryButton}>Books</button>
                                <button className="dropdown-item" value="Cosmetics" onClick={handleCategoryButton}>Cosmetics</button>
                                <button className="dropdown-item" value="Jewellery" onClick={handleCategoryButton}>Jewellery</button>
                            </div>
                        )}
                    </li>

                    <li className="navbar-item">    
                        <button onClick={handleDropdownToggle} className="navbar-link">
                            Prices
                        </button>
                        {dropdownVisible && (
                            <div className="dropdown-menu">
                                <button className="dropdown-item" value="0,25" onClick={handlePriceButton}>£0 - £25</button>
                                <button className="dropdown-item" value="25,100" onClick={handlePriceButton}>£25 - £100</button>
                                <button className="dropdown-item" value="100,500" onClick={handlePriceButton}>£100 - £500</button>
                                <button className="dropdown-item" value="500,1000" onClick={handlePriceButton}>£500 - £1000</button>
                                <button className="dropdown-item" value="1000,1000000" onClick={handlePriceButton}>£1000+</button>
                            </div>
                        )}
                    </li>

                    {logInOrHiUser()}

                </ul>
            </nav>
        </div>
    )

}

export default NavBar;