import DisplaySingleProduct from "../components/DisplaySingleProduct";
import NavBar from "../components/NavBar";
import "./css/ProductsPage.css"

const ProductsPage = ({user, setUser, allProducts, setAllProducts, oneProductToView, setOneProductToView}) => {

    const displayProduct = allProducts.map((temp) =>{
        return(
            <div>
                <DisplaySingleProduct />
            </div>
        )
    })

    return(
        <div>
            <NavBar 
            user={user} 
            setUser={setUser} 
            allProducts={allProducts}
            setAllProducts={setAllProducts}/>
            <p>products</p>
            {/* <p>{allProducts.length}</p> */}
        </div>
    )

}

export default ProductsPage;