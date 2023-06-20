
// eslint-disable-next-line react/prop-types
const Product = ({ handleClick, id, title, description, price, image }) => {
    const addToCart = handleClick
    return (
        <>
            <div className="card">
                <div className="card">
                    <div className="card-image">

                        <figure className="image is-4by3">
                            <img src={`http://localhost:5000/images/` + image} alt="Product Image" />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <p className="title is-5">{title}</p>
                                <p className="subtitle is-6">อาหาร</p>
                            </div>
                        </div>
                        <div className="content">
                            <p>{description}</p>
                            <p>ราคา: <span className="has-text-primary-dark	">{price ? price : 0}</span></p>
                            <button onClick={(e) => addToCart(id)} className="button is-primary">หยิบใส่ตะกร้า</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product