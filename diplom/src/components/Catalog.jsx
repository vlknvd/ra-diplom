import Categories from "./Categories";
import ProductList from "./ProductList";
import Search from "./Search";

const Catalog = ({ withSearch }) => {
    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            {withSearch && <Search />}
                <Categories />
                <ProductList/>
        </section>
    )
}

export default Catalog