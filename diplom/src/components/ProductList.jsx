import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import sendRequest from "../function/sendRequest"

import ProductItem from "./ProductItem"
import Loader from "./Loader"

const ProductList = () => {
    const [items, setItems] = useState([]);
    const [loadMore, setLoadMore] = useState([])
    const [count, setCount] = useState(false);
    const [error, setError] = useState(null);
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
  
    let loadMoreURL = 'http://localhost:7070/api/items?offset=6';
    if (current !== 0) {
      loadMoreURL = `http://localhost:7070/api/items?categoryId=${current.id}&offset=6`;
    }

    useEffect(() => {
        sendRequest(URL, setItems, setCount, setError, setIsLoading)
    }, [current.id, searchValue])


    const onClick = () => {
        sendRequest(loadMoreURL, setLoadMore, setCount, setError, setIsLoading)
    }

    return isLoading ? <Loader/> : (
        <div className="row">
            {items.map((el) => (
                <ProductItem key={el.id} item={el}/>
            ))}
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