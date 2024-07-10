import { useState } from "react";
import DisplaySingleProduct from "./DisplaySingleProduct";
import "./css/Pagination.css";

const Pagination = ({allProducts, setOneProductToView}) => {

    // const [data, setData] = useState(allProducts); // Array of items to paginate
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allProducts.slice(indexOfFirstItem, indexOfLastItem);

    return(
        <div>
      {/* Display current page items */}
            <div className="each-page-pagination">
                {currentItems.map((item, index) => (
                    <div key={index}>
                        <DisplaySingleProduct 
                        product={item}
                        setOneProductToView={setOneProductToView}
                        className="product-div"/>
                    </div>
                ))}
            </div>

      {/* Pagination buttons */}
      <div className="next-btn">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <p>{currentPage} / {Math.ceil((allProducts.length) / 6)}</p>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastItem >= allProducts.length}>
          Next
        </button>
      </div>
    </div>
    )

}

export default Pagination;