import { useDispatch, useSelector } from "react-redux";
import { createRef, useEffect, useState } from "react";
import { searchActions } from "../store/search/searchSlice";
import { getItems } from "../store/catalog/catalogSlice";

const Search = () => {
    const searchValue = useSelector((state) => state.search.value);
    const current = useSelector(({ categories }) => categories.current);
    const [searchInputValue, setSearchInputValue] = useState(searchValue);
    const dispatch = useDispatch();
    const inputEl = createRef()

    useEffect(() => {
      inputEl.current.focus()
    }, [inputEl])
  
    const changeInputHandler = (event) => {
      dispatch(searchActions.change(event.target.value))
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(getItems({
          categoryId: current.id,
          q: searchValue
      }));
    }

    return (
      <>
        <form className="catalog-search-form form-inline" onSubmit={onSubmit}>
          <input className="form-control" placeholder="Поиск" ref={inputEl} value={searchValue} onChange={changeInputHandler}/>
        </form>
      </>
    );
}

export default Search