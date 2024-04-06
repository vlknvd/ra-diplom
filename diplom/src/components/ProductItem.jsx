import { Link } from "react-router-dom"

const ProductItem = ({ item }) => {
    return (
        <div className="col-4">
                <div className="card catalog-item-card">
                  <img src={item.images[0]} className="card-img-top img-fluid" alt={item.title} />
                  <div className="card-body">
                    <p className="card-text">{item.title}</p>
                    <p className="card-text">{item.price} ₽</p>
                    <Link className="btn btn-outline-primary" to = {`/catalog/${item.id}`}>Заказать</Link>
                  </div>
                </div>
        </div>        
    )
}

export default ProductItem