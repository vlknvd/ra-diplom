import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { addOrder, createOrder } from "../store/order/orderSlice"
import { changeOwner } from "../store/order/orderSlice"
import { removeFromCart } from "../store/cart/cartSlice"


const CartPage = () => {
    const { cart } = useSelector((state) => state.cart)

    const [phone, setPhone] = useState()
    const [address, setAdd] = useState()

    const dispatch = useDispatch()

    const onClick = (e) => {
      e.preventDefault()
      const obj = {'phone': phone, 'address': address}
      const order = {
        owner: obj,
        order: cart
      }
      console.log(order)
      dispatch(changeOwner(obj))
      dispatch(addOrder(cart))
      dispatch(createOrder(order))
    }

    const onRemove = (id) => {
      dispatch(removeFromCart(id))
    }

    return (
        <>
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
                {cart && cart.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/catalog/${item.id}`}>{item.title}</Link>
                    </td>
                    <td>{item.size}</td>
                    <td>{item.count}</td>
                    <td>{`${item.price} руб.`}</td>
                    <td>{`${item.price * item.count} руб.`}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => onRemove(item.id)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="5" className="text-right">
                    Общая стоимость
                  </td>
                  <td>{`${cart.reduce((sum, item) => sum + item.price * item.count, 0)} руб.`}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card">
              <form className="card-body" > 
                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input
                    className="form-control"
                    id="phone"
                    placeholder="Ваш телефон"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <input
                    className="form-control"
                    id="address"
                    placeholder="Адрес доставки"
                    onChange={(e) => setAdd(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreement"
                    required
                  />
                  <label
                    className="form-check-label"
                    htmlFor="agreement"
                  >
                    Согласен с правилами доставки
                  </label>
                </div>
                <button type="submit" className="btn btn-outline-secondary" onClick={(e) => onClick(e)}>
                  Оформить
                </button>
              </form>
            </div>
          </section>
        </>
    )
}

export default CartPage
