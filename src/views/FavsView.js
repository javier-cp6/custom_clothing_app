import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FavsContext } from "../context/favsContext";
import { getCategories } from "../services/categoryService";
import ProductList from "../components/ProductList";

export default function FavsView() {
  const { favs, updateFavs, removeFromFavs } = useContext(FavsContext)
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);

  const removeItem = (e, i) => {
    e.preventDefault()
    let favsTmp = [...favs]
    favsTmp.splice(i,1)
    removeFromFavs(favsTmp)
  }

  const getCategoriesData = async () => {
    try {
      const categoriesArr = await getCategories(page, limit);
      const category = []
      category.push(categoriesArr[0])
      setCategories([...categories, ...category]);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getCategoriesData();
  }, [page]);

  if(favs.length === 0) {
    return (
      <div className="row mt-4 mx-auto">
        <h1 className="mb-4 text-center">Your Wishlist</h1>
        <p className="text-center">You don't have yet items in your wishlist yet!</p>
        <h1 className="text-center">We also recommend</h1>
        <ProductList categories={categories}/>
      </div>
    )
  }
      

  return (
    <div className="row mt-4 mx-auto">
      <h1 className="mb-4 text-center">Your Wishlist</h1>
      {favs.map(({ prod_name, prod_designer, prod_img, prod_price, categoryId, prod_id }, i) => (
        <div className="col-6 col-md-4" key={i}>
          <div className="card card-product mb-4">
            <Link className="card-link" to={`/productdetails/${categoryId}/${prod_id}`}></Link>
            <img
              src={prod_img}
              className="card-img-top img-fluid"
              alt={prod_name}
            />
            <div className="card-body">
              <h5 className="card-title">{prod_name}</h5>
              <p className="card-text">by {prod_designer}</p>
              <p className="card-text card-price">$ {prod_price}</p>
            </div>
            <Link className="btn btn-warning btn-card-buyfav" to={`/productdetails/${categoryId}/${prod_id}`}><i className="fa-solid fa-cart-shopping"></i></Link>
            <button className="btn btn-link btn-card-remfav" onClick={(e) => {removeItem(e, i)}}>
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      ))}
        <h1 className="text-center">We also recommend</h1>
        <ProductList categories={categories}/>
    </div>
  )
}

