import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./css/OneProductPage.css"
import { useEffect, useState } from "react";
import DisplayReview from "../components/DisplayReview";

const OneProductPage = ({user, setUser, allProducts, setAllProducts, oneProductToView, orders, setOrders}) => {
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(0);
    // variables to hold boolean whether to show error message or not
    const [hideFundsMessage, setHandleFundsMessage] = useState(true);
    const [hideStockMessage, setHideStockMessage] = useState(true);
    const [hideLogInMessage, setHideLogInMessage] = useState(true);


    const addPurchaseToOrder = () => {
        setOrders(orders => [...orders,{
            user: user,
            product: oneProductToView,
            quantity_sold: quantity
        }])
    }

    const handleBuyProduct = () => {
        // event.preventDefault();
        if(orders && orders.length > 0){
            var accumulatedCharge = 0
            orders.forEach((order) => {
                accumulatedCharge += (order.quantity_sold * order.product.price)
            })
            var itemCost = quantity * oneProductToView.price;
            // check that there is enough stock and the user has enough money
            if((oneProductToView.quantity - quantity) >= 0){
                setHideStockMessage(true);
                if((user.wallet - accumulatedCharge - itemCost) >= 0){
                    setHandleFundsMessage(true);
                    addPurchaseToOrder();
                } else {
                    setHandleFundsMessage(false)
                }
            } else {
                setHideStockMessage(false);
            }
        } else {
            var itemCost = quantity * oneProductToView.price;
            // check that there is enough stock and the user has enough money
            if((oneProductToView.quantity - quantity) >= 0){
                setHideStockMessage(true);
                if((user.wallet - itemCost) >= 0){
                    setHandleFundsMessage(true);
                    addPurchaseToOrder();
                } else {
                    setHandleFundsMessage(false)
                }
            } else {
                setHideStockMessage(false);
            }
        }
    }

    // The user must be logged in to submit an order
    const checkWhetherUserIsLoggedIn = (event) => {
        event.preventDefault();
        if(user){
            setHideLogInMessage(true);
            handleBuyProduct();
        } else {
            setHideLogInMessage(false);
            console.log("login")
        }
    }

    // Getting and displaying reviews
    const [reviews, setReviews] = useState([]);

    const getReviews = async () => {
        const newResponse = await fetch(`http://13.41.197.49:3000/reviews/filter_by_product/${oneProductToView.id}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            // body:JSON.stringify(temp)
        })
        if(newResponse.status === 200){
            const newC = await newResponse.json();
            setReviews(newC); 
        }
    }

    const displayReviews = () => {
        if(reviews.length > 0){
            return(
                reviews.map((review) => {
                    return(
                        <div>
                            <DisplayReview review={review}/>
                        </div>
                    )
                })
            )
        } else {
            return(
                <div>
                    <p>no reviews</p>
                </div>
            )
        }
    }

    // variable to hold the review by user
    const [comment, setComment] = useState("");

// handle review section on page
    const postReview = async (user,oneProductToView,comment) => {
        let temp = {
            user_id: user.id,
            product_id: oneProductToView.id,
            comment: comment
        }
        const newResponse = await fetch(`http://13.41.197.49:3000/reviews`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(temp)
        })
        if(newResponse.status === 201){
            const newC = await newResponse.json();
            // setReviews(newC);
            setComment("")
            getReviews();
        }  
    }

    // variable to alert user when review box is empty
    const [hideMessage, setHideMessage] = useState(true);

    const handleLeaveReview = (event) => {
        event.preventDefault();
        if(comment !== ""){
            setHideMessage(true);
            postReview(user, oneProductToView,comment);
        } else {
            setHideMessage(false);
        }
    }

    const displayLeaveReview = () => {
        if(user) {
            return(
                <div className="leave-review">
                    <form onSubmit={handleLeaveReview}>
                        <input type="text"
                        placeholder="Leave a review..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}/>
                        <button type="submit">Submit</button>
                        <p hidden={hideMessage} style={{color:"red"}}>Please fill in all fields</p>
                    </form>                    
                </div>
            )
        }
    }




    // This will rerun everytime this page opens
    useEffect(() => {
        setQuantity(null);
        getReviews();
    },[])
    
    const displayProduct = () => {
        if(oneProductToView){
            return(
                <div className="one-product-page-display">
                    <div className="image">
                        <img src={oneProductToView.image_url} />
                        <form onSubmit={checkWhetherUserIsLoggedIn} className="left-form">
                            <input type="number"
                            placeholder="Enter the amount to deposit"
                            min={0}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}/>
                            <button type="submit">Add to Cart</button>
                        </form>
                        <p hidden={hideFundsMessage} style={{color:"red"}}>Insuffienct Funds</p>
                        <p hidden={hideStockMessage} style={{color:"red"}}>Not enough stock, only {oneProductToView.quantity} left</p>
                        <p hidden={hideLogInMessage} style={{color:"red"}}>Please Log In to make a purchase</p>
                    </div>
                    <div className="info">
                        <h3>{oneProductToView.name}</h3>
                        <p>Price: £{oneProductToView.price}</p>
                        <p>{oneProductToView.description}</p>
                        <p>Reviews</p>
                        <div className="display-reviews">
                            {displayReviews()}
                        </div>
                        {displayLeaveReview()}
                    </div>
                </div>
            )
        } else (
            navigate("/products")
        )
    }

    return(
        <div>
            <NavBar 
            user={user} 
            setUser={setUser} 
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            orders={orders}
            setOrders={setOrders}/>

            {displayProduct()}
        </div>
    )

}

export default OneProductPage;