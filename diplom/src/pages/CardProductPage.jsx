import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { addItemToCart } from '../store/cart/cartSlice'
import { getCard } from '../store/card/cardSlice'

import Loader from '../components/Loader'
import Error from '../components/Error'

const CardProductPage = () => {
    const [sizes, setSizes] = useState([]);
    const [selectedSize, setSelectedSizes] = useState(""); 
    const [quantity, setQuantity] = useState(1);
    // const [error, setError] = useState()

    const { card, isLoading, error } = useSelector((state) => state.card)
    // const { error } = useSelector((state) => state.card)
    // console.log(error)
    
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
      dispatch(getCard(id))
    }, [])

    useEffect(() => {
      if (card && card.sizes) setSizes(card.sizes.filter((i) => i.available));
    }, [card]);

    const addToCart = () => { 
      const selectedCard = {
        id: card.id,
        title: card.title,
        size: selectedSize,
        count: quantity,
        price: card.price,
      }
      dispatch(addItemToCart(selectedCard)) 
      navigate('/cart')
    }
   
    const handleSelectSize = (size) => {
      if (selectedSize === size) setSelectedSizes("");
      else setSelectedSizes(size);
    };
  
    const handleDecr = () => {
      if (quantity > 0) setQuantity(quantity - 1);
    };
  
    const handleIncr = () => {
      if (quantity < 10) setQuantity(quantity + 1);
    };
    
    if (error) {
      return <Error error={error.message} func={() => dispatch(getCard(id))} />
    }

    return isLoading ? <Loader /> : card && card.id ? (
          <section className="catalog-data">
            <h2 className="text-center">{card.title}</h2>
            <div className="row">
              <div className="col-5">
                <img
                  src={card.images[0]}
                  className="img-fluid"
                  alt={card.title}
                />
              </div>
              <div className="col-7">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>Артикул</td>
                      <td>{card.sku}</td>
                    </tr>
                    <tr>
                      <td>Производитель</td>
                      <td>{card.manufacturer}</td>
                    </tr>
                    <tr>
                      <td>Цвет</td>
                      <td>{card.color}</td>
                    </tr>
                    <tr>
                      <td>Материалы</td>
                      <td>{card.material}</td>
                    </tr>
                    <tr>
                      <td>Сезон</td>
                      <td>{card.season}</td>
                    </tr>
                    <tr>
                      <td>Повод</td>
                      <td>{card.reason}</td>
                    </tr>
                  </tbody>
                </table>
                {sizes.length > 0 ? (
                  <React.Fragment>
                    <div className="text-center">
                      <p>
                        Размеры в наличии:
                        {sizes.map((o) => (
                          <span
                            key={o.size}
                            className={
                              selectedSize === o.size ? "catalog-item-size selected": "catalog-item-size"
                            }
                            onClick={() => handleSelectSize(o.size)}
                          >
                            {o.size}
                          </span>
                        ))}
                      </p>
                      <p>
                        Количество:
                        <span className="btn-group btn-group-sm pl-2">
                          <button
                            className="btn btn-secondary"
                            onClick={handleDecr}
                          >
                            -
                          </button>
                          <span className="btn btn-outline-primary">
                            {quantity}
                          </span>
                          <button
                            className="btn btn-secondary"
                            onClick={handleIncr}
                          >
                            +
                          </button>
                        </span>
                      </p>
                    </div>
                    <button
                      className="btn btn-danger btn-block btn-lg"
                      disabled={selectedSize === "" || quantity === 0}
                      onClick={addToCart}
                    >
                      В корзину
                    </button>
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          </section>
    ) : null
}

export default CardProductPage