const ProductItem = ({ item }) => {
    return (
        <div className="col-4">
                <div className="card catalog-item-card">
                  <img src={item.images[0]} className="card-img-top img-fluid" alt={item.title} />
                  <div className="card-body">
                    <p className="card-text">{item.title}</p>
                    <p className="card-text">{item.price}</p>
                    <a href={`/catalog/${item.id}`} className="btn btn-outline-primary">Заказать</a>
                  </div>
                </div>
        </div>        
    )
}

export default ProductItem