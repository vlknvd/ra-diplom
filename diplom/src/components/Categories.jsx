import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeCategories, getCategories } from "../store/categories/categoriesSlice"

import Loader from "./Loader";

const Categories = () => {
    const { list, isLoading } = useSelector(({ categories }) => categories)
    const current = useSelector(({ categories }) => categories.current)
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getCategories())
    }, [])

    const onClick = (e, id) => {
        e.preventDefault()
        dispatch(changeCategories(id))
    }

    return isLoading ? <Loader /> : ( 
        <ul className="catalog-categories nav justify-content-center">
            <li className="nav-item">
                <a className={current === 0 ? "nav-link active" : "nav-link"} href="#" onClick={(e) => onClick(e, 0)}>
                Все
                </a>
            </li>
            {list && list.map((cat) => (
                <li className="nav-item" key={cat.id}>
                    <a className={current.id === cat.id ? "nav-link active" : "nav-link"} href="#" onClick={(e) => onClick(e, cat.id)}>
                    {cat.title}
                    </a>
                </li>
            ))}
        </ul> 
    )
}

export default Categories