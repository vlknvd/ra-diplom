import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../store/search/searchSlice";
import logo from '../img/header-logo.png'

const Header = () => {
    const initialState = { value: "", active: false }
    const { cart } = useSelector((state) => state.cart)
    const [search, setSearch] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClick = () => {
        if (search.active) {
            console.log(search)
            dispatch(searchActions.change(search.value));
            setSearch(initialState);
            navigate("/catalog.html")
        } else 
        setSearch((prev) => ({ ...prev, active: !search.active }));
    }

    const keyDownHandler = (event) => {
        if (event.keyCode === 13) {
          event.preventDefault()
          if (search.active) {
            dispatch(searchActions.change(search.value));
            setSearch(initialState);
            navigate("/catalog.html")
        } else 
        setSearch((prev) => ({ ...prev, active: !search.active }));
        }
      }

    const onChange = (e) => {
        const { value } = e.target;
        setSearch((prev) => ({ ...prev, value: value }));
    }


    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <NavLink className="navbar-brand" to='/'>
                            <img src={logo} alt="Bosa Noga" />
                        </NavLink>
                        <div className="collapse navbar-collapse" id="navbarMain">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <NavLink className="nav-link" to="/">Главная</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/catalog">Каталог</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about">О магазине</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contacts">Контакты</NavLink>
                                </li>
                            </ul>
                            <div>
                                <div className="header-controls-pics">
                                    <div data-id="search-expander"
                                    className="header-controls-pic header-controls-search" 
                                    onClick={onClick}>
                                    </div>
                                    <NavLink
                                        className="header-controls-pic header-controls-cart"
                                        to="/cart"
                                    >
                                        {cart && cart.length !== 0 && (
                                        <div className="header-controls-cart-full">
                                            {cart.length}
                                        </div>
                                        )}
                                        <div className="header-controls-cart-menu"></div>
                                    </NavLink>
                                    <form data-id="search-form" className= {
                                        search.active ? "header-controls-search-form form-inline"
                                        : "header-controls-search-form form-inline invisible"
                                    }>
                                        <input className="form-control" placeholder="Поиск" value={search.text} onChange={onChange} onKeyDown={keyDownHandler}/>
                                    </form>
                                    </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header