import { useNavigate } from "react-router-dom";
import DisplaySingleProduct from "../components/DisplaySingleProduct";
import NavBar from "../components/NavBar";
import "./css/ProductsPage.css"

const ProductsPage = ({user, setUser, allProducts, setAllProducts, oneProductToView, setOneProductToView, orders, setOrders}) => {
    const navigate = useNavigate();

    

    const checkWhetherThereIsProducts = () => {
        if(allProducts && allProducts.length > 0){
            return allProducts.map((temp) => {
                return(
                    <div>
                        <DisplaySingleProduct 
                        product={temp}
                        setOneProductToView={setOneProductToView}/>
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

    return(
        <div className="product-page">
            <NavBar 
            user={user} 
            setUser={setUser} 
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            orders={orders}
            setOrders={setOrders}/>
            
            <div className="products-page-display">
                {checkWhetherThereIsProducts()}
            </div>
        </div>
    )

}

export default ProductsPage;