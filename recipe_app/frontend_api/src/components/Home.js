import React, {useEffect, useState} from "react";
import {Link, Route, Routes} from "react-router-dom";

import RecipeCategoryList from "./RecipeCategoryList";
import RecipesList from "./RecipesList";
import RecipeDataService from "../services/RecipeService";

const recipeDataService = new RecipeDataService();

export default function Home() {
    const [allCategories, setAllCategories] = useState([]);

    const retrieveAllRecipeCategories = () => {
        recipeDataService.getAllRecipeCategories()
            .then(res => {
                setAllCategories(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        retrieveAllRecipeCategories();
    },[]);

    return (
        <>
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
                {allCategories.map((category) => {
                    return (
                        <Link key={category.id} to={"categories/" + category.id}>{category.name}</Link>
                    );
                })}
            </nav>
            <div className="container mt-3">
                <Routes>
                  <Route path="*" element={<RecipeCategoryList/>} />
                  <Route path="/categories/:id/*" element={<RecipeCategoryList/>} />
                  <Route path="categories/:id/recipes/:id" element={<RecipesList />} />
                </Routes>
             </div>
        </>
    );
}