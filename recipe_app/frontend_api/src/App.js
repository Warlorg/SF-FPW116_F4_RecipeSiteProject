import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link, Route, Routes} from "react-router-dom";
import RecipeCategoryList from "./components/RecipeCategoryList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/categories" className="navbar-brand">
          Dmitri P
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/categories"} className="nav-link">
              Recipe Categories
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<RecipeCategoryList/>} />
          <Route path="/categories" element={<RecipeCategoryList/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;