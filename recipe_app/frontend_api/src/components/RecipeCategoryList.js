import React , { useEffect, useState } from "react";
import RecipeDataService from "../services/RecipeService";
import {Link, Route, Routes} from "react-router-dom";

import Recipes from "./RecipesList";

const recipeDataService = new RecipeDataService();

const RecipeCategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [currentCategory, setCurrentCategory] = useState();
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
    const [allRecipes, setAllRecipes] = useState([]);

    useEffect(() => {
        retrieveCategories();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }

    const retrieveCategories = () => {
        recipeDataService.getAllRecipeCategories()
            .then(res => {
                setCategories(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const setActiveCategory = (category, index) => {
        setCurrentCategory(category);
        setCurrentIndex(index);
    };

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
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByTitle}
                >
                  Search
                </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Recipe Categories</h4>
        <ul className="list-group">
          {categories &&
            categories.map((category, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCategory(category, index)}
                key={index}
              >
                {category.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
          {currentCategory ? (
              <div>
                <h4>Category</h4>
                <div>
                  <label>
                    <strong>Category title:</strong>
                  </label>{" "}
                  {currentCategory.name}
                </div>
                  <nav className="recipes">
                      <ul>
                          {allRecipes &&
                          allRecipes.map((recipe) => {
                              return (
                                  <li key={recipe.id}>
                                      <Link to={"recipes/" + recipe.id}>{recipe.title}</Link>
                                  </li>
                              );
                          })}
                      </ul>
                  </nav>
                  <Routes>
                      <Route path="recipes/:id" element={<Recipes />} />
                  </Routes>
              </div>
          ) : (
              <div>
                <br />
                <p>Please click on a Category...</p>
              </div>
          )}
        </div>
      </div>
    );
};

export default RecipeCategoryList;