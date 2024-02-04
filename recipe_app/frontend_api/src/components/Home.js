import React, {useEffect, useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import axios from "axios";
import "../styles/Home.css"

import RecipeCategoryList from "./RecipeCategoryList";
import RecipesList from "./RecipesList";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const baseUrl = 'http://localhost:8000/api';

  useEffect(() => {
    axios.get(`${baseUrl}/categories/`)
    .then((res) => {
        setCategories(res.data);
    })
        .catch((err) => {
            console.log(err);
        })
  }, []);

  return (
    <React.Fragment>
      <nav className="categories">
        <div className="documents">
          <Link to={""}>Home</Link>
        </div>
        {categories.map((cat) => {
          return (
            <Link key={cat.id} to={"categories/" + cat.id}>
              {cat.name}
            </Link>
          );
        })}
      </nav>

      <Routes>
        <Route path="*" element={null} />
        <Route path="categories/:id/*" element={<RecipeCategoryList />} />
        <Route path="categories/:id/recipes/:id" element={<RecipesList />} />
      </Routes>
    </React.Fragment>
  );
}