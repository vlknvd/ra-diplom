import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { searchActions } from "../store/search/searchSlice";

const Search = () => {
    const searchValue = useSelector((state) => state.search.value);
    const [searchInputValue, setSearchInputValue] = useState(searchValue);
    const dispatch = useDispatch();

    useEffect(() => {
      setSearchInputValue(searchValue);
    }, [searchValue]);
  
    const keyDownHandler = (event) => {
      if (event.keyCode === 13) {
        event.preventDefault()
        dispatch(searchActions.change(searchInputValue));
      }
    }
  
    const changeInputHandler = (event) => {
      setSearchInputValue(event.target.value);
    };

    return (
      <>
        <form className="catalog-search-form form-inline">
          <input className="form-control" placeholder="Поиск" value={searchInputValue} onKeyDown={keyDownHandler} onChange={changeInputHandler}/>
        </form>
      </>
    );
}

export default Search