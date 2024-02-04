import React , { useEffect, useState } from "react";
import {Link, Route, Routes, useParams} from "react-router-dom";
import axios from "axios";
import "../styles/RecipeCategoryList.css";

import RecipeDataService from "../services/RecipeService";
import RecipesList from "./RecipesList";

const recipeDataService = new RecipeDataService();

export default function RecipeCategoryList() {
    const params = useParams();
    const [allRecipes, setAllRecipes] = useState([]);
    const [currentCategory, setCurrentCategory] = useState();
    const [searchTitle, setSearchTitle] = useState("");
    const baseUrl = 'http://localhost:8000/api';

    useEffect(() => {
        axios.get(`${baseUrl}/recipes/`)
        .then((res) => {
                setAllRecipes(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [params]);

    useEffect(() => {
        axios.get(`${baseUrl}/categories/${params.id}`)
        .then((res) => {
                setCurrentCategory(res.data.name);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [params]);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }

    const findByTitle = () => {
        recipeDataService.findRecipeByTitle(searchTitle)
            .then(response => {
                setAllRecipes(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <React.Fragment>
          <h2 className="category-name">{currentCategory}</h2>
          <nav className="recipes">
            <ul>
              {allRecipes.map((recipe) => {
                if (recipe.category === params.id) {
                  return (
                    <li key={recipe.id}>
                      <Link to={"recipes/" + recipe.id}>{recipe.title}</Link>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
              {allRecipes.some((recipe) => recipe.category === params.id) ? (
                  <Routes>
                    <Route path="recipes/:id/" element={<RecipesList />} />
                  </Routes>
              ) : (
                  <div>
                      <br/>
                      <p>No recipe in {currentCategory}</p>
                  </div>
              )}
          </nav>
        </React.Fragment>
      );
}