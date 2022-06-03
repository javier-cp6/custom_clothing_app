import "bootstrap/dist/js/bootstrap.min.js";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { getCategories } from "../services/categoryService";

import main_logo from "../img/main_logo.jpg"

export default function NavigationBar() {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const getCategoriesData = async () => {
      try {
        const arrCategories = await getCategories(page, limit);
        setCategories([...categories, ...arrCategories]);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoriesData();
  }, [page]);

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
          
        <div className="container-fluid d-flex col-12">
          <Link className="div-img-logo d-flex col-auto" to="/">
            <img className="img-logo navbar-brand" src={main_logo} alt="la consigne logo"></img>
          </Link>
          {/* <div> */}

          <div className="d-flex flex-wrap">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto d-flex flex-wrap justify-content-center">
                {categories.map(({ cat_name, cat_id }, i) => (
                  <li className="nav-cat nav-item me-4" key={i}>
                    <a className="nav-link" aria-current="page" href={`/category/${cat_id}`}>{cat_name}</a>
                  </li>
                ))}
                { categories.length === 0 ? null : (
                  <li className="nav-cat nav-item">
                    <a className="nav-link" aria-current="page" href="/">Creators</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="d-flex justify-content-end col-auto mb-0">
              <Link className="btn ms-2" to={`/favs`}>
                <i className="fa-regular fa-heart"></i>
              </Link>
              <Link className="btn ms-2" to={`/cart`}>
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
              <Link className="btn ms-2" to={`/login`}>
                <i className="fa-regular fa-circle-user"></i>
              </Link>
            </div>

          {/* <div className="container d-flex flex-wrap col-md-3">
           

            <form className="d-flex justify-content-end col-12">
              <input
                type="search"
                placeholder="Find our products"
                className="form-control"
                aria-label="Search"
              />
              <button className="btn ms-2">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>

          </div> */}
            
          
        </div>
      </nav>
      
      

    </>
  );
}
