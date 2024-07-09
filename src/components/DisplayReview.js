import "./css/DisplayReview.css"

const DisplayReview = ({review}) => {

    return(
        <div className="review">
            <div className="review-top">
                <p>{review.user.first_name}</p>
                <p>{review.created_at.slice(0,10)}</p>
            </div>
            <div className="review-bottom">
                {review.comment}
            </div>
        </div>
    )

}

export default DisplayReview;