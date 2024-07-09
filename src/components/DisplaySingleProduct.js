import { useNavigate } from "react-router-dom";
import "./css/DisplaySingleProduct.css";

const DisplaySingleProduct = ({product, setOneProductToView}) => {
    const navigate = useNavigate();

    const handleProductClick = () => {
        setOneProductToView(product);
        navigate("/oneProduct")
    }

    return(
        <div className="single-product-display" onClick={handleProductClick}>
            <img src={product.image_url}></img>
            <div>
                <p>{product.name}</p>
                <p>£{product.price}</p>
            </div>
        </div>
    )

}

export default DisplaySingleProduct;