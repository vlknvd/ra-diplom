import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { addOrder, createOrder, resetForm } from "../store/order/orderSlice"
import { clearCart, removeFromCart } from "../store/cart/cartSlice"
import Loader from "../components/Loader"
import Error from "../components/Error"

const CartPage = () => {
    const { cart } = useSelector((state) => state.cart)
    const { isLoading, error } = useSelector((state) => state.order)
    console.log(!error)

    const [phone, setPhone] = useState('')
    const [address, setAdress] = useState('')

    const dispatch = useDispatch()

    const onSubmit = (e) => {
      e.preventDefault()
      const order = {
        owner: {
          phone: phone,
          address: address
        },
        order: cart.map(el => ({ id: el.id, price: el.price, count: el.quantity }))
      }
      dispatch(addOrder(order))
      dispatch(createOrder(order))
      dispatch(resetForm())
    }

    const onChange = (e) => {
      e.preventDefault()
      if(e.target.id === 'phone') {
        setPhone(e.target.value)
      } else if (e.target.id === 'address') {
        setAdress(e.target.value)
      }
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
                  <td>{`${cart ? cart.reduce((sum, item) => sum + item.price * item.count, 0) : 0} руб.`}</td>
                </tr>
              </tbody>
            </table>
          </section>
          {isLoading && <Loader />}
          {error && <div style={{padding: '20px' }}>Что-то пошло не так...</div>}
          {cart.length > 0 && !error &&
          <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card">
            <form className="card-body" onSubmit={onSubmit} > 
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  className="form-control"
                  id="phone"
                  placeholder="Ваш телефон"
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input
                  className="form-control"
                  id="address"
                  placeholder="Адрес доставки"
                  onChange={onChange}
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
              <button type="submit" className="btn btn-outline-secondary">
                Оформить
              </button>
            </form>
          </div>
          </section>}
        </>
    )
}

export default CartPage
