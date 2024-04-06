import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { searchActions } from "../store/search/searchSlice"

import Catalog from "../components/Catalog"
import TopSales from "../components/TopSales"

const HomePage = () => {

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(searchActions.resetSearch())
    }, []);
    
    return(
        <div>
            <TopSales />
            <Catalog />
        </div>
    )
}

export default HomePage