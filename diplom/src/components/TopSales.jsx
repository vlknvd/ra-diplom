import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { getTopSale } from "../store/topSale/topSale";

import ProductItem from "./ProductItem";
import Loader from "./Loader";


const TopSales = () => {
    const dispatch = useDispatch();
    const { list, isLoading } = useSelector(({ topSales })=> topSales)
    const [error, setError] = useState(false)

    useEffect(() => {
        dispatch(getTopSale(setError))
    }, [])

    const onClick = () => {
        dispatch(getTopSale(setError))
    }

    if(error) return <button className="btn-return" onClick={onClick}>Попробовать снова</button>

    return isLoading ? <Loader/> : list && list.length > 0 ? (
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            <div className="row">
                {list.map((el) => (
                    <ProductItem key={el.id} item={el}/>
                ))}
            </div>
        </section>    
    ) : null
}

export default TopSales