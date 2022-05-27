import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../services/categoryService";
import ProductList from "./ProductList";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  const getCategoriesData = async () => {
    try {
      const arrCategories = await getCategories(page, limit);
      setCategories([...categories, ...arrCategories]);
    } catch (error) {
      console.log(error);
    }
  };

  const viewMore = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    getCategoriesData();
  }, [page]);

  return (
    <div>
      <div className="row">
        {categories.map(({ cat_name, cat_img, cat_id }, i) => (
          <div className="col-6 col-md-6 col-lg-3" key={i}>
            <Link
              className="card mb-3 card-category"
              style={{backgroundImage: `url(${cat_img})`}}
              to={`/category/${cat_id}`}
            >
              <div className="filter-category" />
              <div className="card-body">
                <h4 className="card-title">{cat_name}</h4>
              </div>
            </Link>

          </div>
        ))}
      </div>
      <button className="btn btn-outline-success btn-sm" onClick={viewMore}>
        View more
      </button>
      <ProductList />
    </div>
  );
}
