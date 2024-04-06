import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { getTopSale } from "../store/topSale/topSale";

import ProductItem from "./ProductItem";
import Loader from "./Loader";
import Error from "./Error";

const TopSales = () => {
    const dispatch = useDispatch();
    const { list, isLoading, error } = useSelector(({ topSales })=> topSales)

    useEffect(() => {
        dispatch(getTopSale())
    }, [])

    const onClick = () => {
        dispatch(getTopSale())
    }

    return (
        <>
            {isLoading && <Loader />}
            {error && <Error error={error.message} func={onClick}/>}
            {list.length ?
            <section className="top-sales">
                <h2 className="text-center">Хиты продаж!</h2>
                {isLoading && <Loader />}
                <div className="row">
                    {list.map((el) => (
                        <ProductItem key={el.id} item={el}/>
                    ))}
                </div>
            </section>: null}
        </>   
    )
}

export default TopSales