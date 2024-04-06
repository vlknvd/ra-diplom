import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import ProductItem from "./ProductItem"
import Loader from "./Loader"
import Error from "./Error"
import { getItems, getLoadMore } from "../store/catalog/catalogSlice"

const ProductList = () => {
    const dispatch = useDispatch()
    const searchValue = useSelector((state) => state.search.value);
    const current = useSelector(({ categories }) => categories.current);
    const { items, isLoading, error, moreLoading, moreVisible, moreError} = useSelector((state)=> state.catalog)

    useEffect(() => {
        dispatch(getItems({categoryId: current.id, q: searchValue}))
    },[current.id, searchValue])

    const onClick = () => {
        dispatch(getLoadMore({categoryId: current.id, offset: items.length, q: searchValue}))
    }

    return (
        <>
        {isLoading && <Loader />}
        {error && <Error error={error} func={''} />}
        <div className="row">
            {items.length ? items.map((el) => (
                <ProductItem key={el.id} item={el}/>
            )) : <h2 className="error-text">Ничего не найдено</h2>}
            {moreLoading && <Loader/>}
            {moreVisible && items.length >= 6 &&
                <button className="btn btn-outline-primary more" onClick={onClick}>
                Загрузить ещё
                </button>
            }
        </div>
        </>
    )
}

export default ProductList