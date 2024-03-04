import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import sendRequest from "../function/sendRequest"

import ProductItem from "./ProductItem"
import Loader from "./Loader"
import Error from "./Error"

const ProductList = () => {
    const [items, setItems] = useState([]);
    const [loadMore, setLoadMore] = useState([])
    const [count, setCount] = useState(false);
    const [offsetCount, setOffsetCount] = useState(6)
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false)
    
    const searchValue = useSelector((state) => state.search.value);
    const current = useSelector(({ categories }) => categories.current)

    let URL = 'http://localhost:7070/api/items';
    
    if (current !== 0 && searchValue === '') {
      URL = `http://localhost:7070/api/items?categoryId=${current.id}`;
    }
    if (current === 0 && searchValue !== '') {
      URL = `http://localhost:7070/api/items?q=${searchValue.toLowerCase()}`;
    }
    if (current !== 0 && searchValue !== '') {
      URL = `http://localhost:7070/api/items?categoryId=${current.id}&q=${searchValue.toLowerCase()}`;
    }
  
    let loadMoreURL = `http://localhost:7070/api/items?offset=${offsetCount}`;
    
    if (current !== 0) {
      loadMoreURL = `http://localhost:7070/api/items?categoryId=${current.id}&offset=${offsetCount}`;
    }

    useEffect(() => {
        sendRequest(URL, setItems, setCount, setError, setIsLoading)
    }, [current.id, searchValue])


    const onClick = () => {
        sendRequest(loadMoreURL, setLoadMore, setCount, setError, setIsLoading)
    }

    if (error) {
        return <Error error={error} func={() => sendRequest(URL, setItems, setCount, setError, setIsLoading)} />
    }

    return isLoading ? <Loader/> : (
        <div className="row">
            {items.length ? items.map((el) => (
                <ProductItem key={el.id} item={el}/>
            )) : <h2 className="error-text">Ничего не найдено</h2>}
            {loadMore.map((el) => (
                <ProductItem key={el.id} item={el} />
            ))}
            <div className="text-center">
            {count === true && (
                <button className="btn btn-outline-primary" onClick={onClick}>
                    Загрузить ещё
                </button>
            )}
            </div>
        </div>
    )
}

export default ProductList