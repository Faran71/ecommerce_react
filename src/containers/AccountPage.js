import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "./css/AccountPage.css"
import { useNavigate } from "react-router-dom";
const AccountPage = ({user, setUser, allProducts, setAllProducts, orders, setOrders}) => {
    const navigate = useNavigate();

    const [allOrders, setAllOrders] = useState([]);

    const getAllOrders = async () => {
        const newResponse = await fetch(`http://localhost:3000/orders/filter_by_user/${user.id}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            // body:JSON.stringify(temp)
        })
        if(newResponse.status === 200){
            const newC = await newResponse.json();
            setAllOrders(newC); 
        }
    }

    const handleDelete = (id) => {
        setOrders(orders.filter(temp => temp.id !== id))
    }

    const postOrder = async (user_id, product_id, quantity_sold) => {
        let temp = {
            user_id: user_id,
            product_id: product_id,
            quantity_sold: quantity_sold
        }
        const newResponse = await fetch(`http://localhost:3000/orders`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(temp)
        })

        if(newResponse.status === 201){
            const newC = await newResponse.json();
            // setUser(newC);
            setOrders([]);
        }  
    }

    // this is to get user information again so wallet is correct
    const getUser = async () => {
        const newResponse = await fetch(`http://localhost:3000/users/${user.id}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            // body:JSON.stringify(temp)
        })

        const newC = await newResponse.json();
        // setUser(newC);
        setUser(newC); 
    }
    const handleBuy = () => {
        // event.preventDefault();
        orders.map((order) => {
            postOrder(order.user.id, order.product.id, order.quantity_sold);
        })
        getUser();
    }

    const [totalCost,setTotalCost] = useState(0);

    const displayOrder = () => {
        if(orders.length > 0){
            return (
            <div className="order-item">
                {orders.map((order) => {
                return(
                    <div className="individual-order-item">
                        <img src={order.product.image_url} />
                        <p>{order.product.name}</p>
                        <p>Quantity: {order.quantity_sold}</p>
                        <p>Price : £{order.product.price * order.quantity_sold}</p>
                        <button onClick={() => handleDelete(order.id)}>Delete Item</button>
                    </div>
                )
                })}
                <div className="items-top">
                    <p>Total Cost: £{totalCost}</p>
                    <button onClick={() => handleBuy()} >Buy</button>
                </div>
            </div>
                )

        } else {
            return(
                <p>No orders....</p>
            )
        }
    }

    const displayOldOrders = () => {
        if(allOrders.length > 0){
            return allOrders.map((order) => {
                return(
                    <div className="individual-order-item">
                        <img src={order.product.image_url} />
                        <p>{order.product.name}</p>
                        <p>Quantity: {order.quantity_sold}</p>
                        <p>Price : £{order.product.price * order.quantity_sold}</p>
                    </div>
                )
            })
        } else {
            return(
                <p>No orders....</p>
            )
        }
    }

    useEffect(() => {
        if(!user){
            navigate("/")
        }
        getAllOrders();
        if(orders.length>0){
            setTotalCost(0);
            orders.map((order) => {
                setTotalCost(totalCost+(order.quantity_sold * order.product.price))
            })
        }
    },[])
    return(
        <div className="account-page">
            <NavBar 
            user={user} 
            setUser={setUser} 
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            orders={orders}
            setOrders={setOrders}/>

            <div>
                <h3>Current Orders</h3>
                {displayOrder()}
            </div>

            <div>
                <h3>Previous orders</h3>
                <div className="order-item">
                    {displayOldOrders()}
                </div> 
            </div>
        </div>
    )

}

export default AccountPage;