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
          
        <div className="container col-12 d-flex justify-content-between">
          <div className="col-6 col-sm-6 col-md-auto col-lg-2">
            <Link className="div-img-logo d-flex" to="/">
              <img className="img-logo navbar-brand mx-0" src={main_logo} alt="la consigne logo"></img>
            </Link>
          </div>

          <div className="collapse navbar-collapse d-none d-sm-none col-lg-8 flex-grow-1">
            <ul className="navbar-nav mx-auto flex-wrap d-md-flex justify-content-center">
              {categories.map(({ cat_name, cat_id }, i) => (
                <li className="nav-cat nav-item mx-md-1 mx-lg-2 " key={i}>
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
          <div className="d-flex justify-content-end col-4 col-sm-5 col-md-auto col-lg-2">
            <Link className="btn-icon btn mx-1" to={`/favs`}>
              <i className="fa-regular fa-heart"></i>
            </Link>
            <Link className="btn-icon btn mx-1" to={`/cart`}>
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
            <Link className="btn-icon btn mx-1" to={`/login`}>
              <i className="fa-regular fa-circle-user"></i>
            </Link>
          </div>

          <button className="navbar-toggler d-md-none col-auto col-sm-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fa-solid fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto d-md-flex flex-wrap justify-content-center d-md-none d-lg-none d-xl-none">
              {categories.map(({ cat_name, cat_id }, i) => (
                <li className="nav-cat nav-item mx-md-1 mx-lg-2 " key={i}>
                  <a className="nav-link" aria-current="page" href={`/category/${cat_id}`}>xx{cat_name}</a>
                </li>
              ))}
              { categories.length === 0 ? null : (
                <li className="nav-cat nav-item">
                  <a className="nav-link" aria-current="page" href="/">Creators</a>
                </li>
              )}
            </ul>
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
