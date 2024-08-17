import React, { useEffect } from "react";
import ProductStore from "../../store/ProductStore";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/Logo.png";
import UserStore from "../../store/UserStore";
import SubmitButton from "./SubmitButton";
import CartStore from "../../store/CartStore";
import WishStore from "../../store/WishStore";

const AppNavBar = () => {
  const navigate = useNavigate();
  const {setSearchKeyword,SearchKeyword} = ProductStore();
  const {isLogin,UserLogoutRequest} = UserStore();
  const {CartCount,CartListRequest} = CartStore();
  const{WishCount,WishListRequest} = WishStore();
  console.log(WishCount);
  

  const onLogout = async()=>{
   await UserLogoutRequest();
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  }

  useEffect(() => {
    (async()=>{
      if(isLogin()){
        await CartListRequest();
        await WishListRequest();
      }
    } )();
  },[]);
  return (
    <>
      <div className="container-fluid text-white p-2 bg-success">
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-md-6  gap-10">
              <span>
                <span className="f-12">
                  <i className="bi bi-envelope"></i>
                  Support@planB.com
                </span>
                <span className="f-12">
                  <i className="bi bi-telephone"></i>
                  123-456-7890
                </span>
              </span>
            </div>
            <div className="col-md-6 d-flex justify-content-end align-items-center gap-3">
              <span className="icon-spacing mx-2">
                <i className="bi bi-facebook"></i>
              </span>
              <span className="icon-spacing">
                <i className="bi bi-twitter"></i>
              </span>
              <span className="icon-spacing">
                <i className="bi bi-instagram"></i>
              </span>
              <span className="icon-spacing">
                <i className="bi bi-youtube"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar sticky-top bg-white navbar-extend-lg navbar-light py-3">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
    <li className="nav-item">
      <Link to={"/"} className="nav-link active" aria-current="page">
        <i className="bi bi-house"></i> Home
      </Link>
    </li>
    <li className="nav-item">
      <Link to={"/profile"} className="nav-link active" aria-current="page">
        <i className="bi bi-person-fill"></i> Profile
      </Link>
    </li>
    <li className="nav-item">
      <Link to={"/wish"} className="nav-link active" aria-current="page">
        <i className="bi bi-bag-heart"></i> WishList
      </Link>
    </li>
    <li className="nav-item">
      <Link to={"/cart"} className="nav-link active" aria-current="page">
        <i className="bi bi-bag-fill"></i> CartList
      </Link>
    </li>
    <li className="nav-item">
      <Link to={"/order"} className="nav-link active" aria-current="page">
        <i className="bi bi-box2-fill"></i> OrderList
      </Link>
    </li>
  </ul>
</div>
          </div>
          <Link className="navbar-brand" to="/">
            <img className="img-fluid" src={logo} alt="" width="120px" />
          </Link>
          <div className="d-lg-flex">
            <div className="input-group">
              <input onChange={(e)=>setSearchKeyword(e.target.value)} 
                className="form-control"
                type="search"
                placeholder="search"
                aria-label="Search"
              />
              <Link to={SearchKeyword.length>0?`/by-keyword/${SearchKeyword}`:`/`} className="btn btn-outline-dark" type="submit">
                <i className="bi bi-search"></i>
              </Link>
            </div>
            <Link
              to="/cart"
              type="button"
              className="btn ms-2 btn-light position-relative"
            >
              <i className="bi text-dark bi-bag"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {CartCount}
                <span className="visually-hidden">unread messages</span>
              </span>
            </Link>
            <Link
              to="/wish"
              type="button"
              className="btn ms-2 btn-light  position-relative"
            >
              <i className="bi text-dark bi-heart"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {WishCount}
                <span className="visually-hidden">unread messages</span>
              </span>
            </Link>
            {
              isLogin()?(
                <>
                <Link
                type="button"
                className="btn ms-3 btn-success d-flex"
                to="/profile"
              >
                Profile
              </Link>
              <SubmitButton onClick={onLogout} className="btn ms-3 btn-success d-flex" text="Logout" />
                </>
              ):(
                <Link type="button"
                className="btn ms-3 btn-success d-flex"
                to="/login" >Login</Link>
              )
            }
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppNavBar;
