import React , { useEffect, useState } from "react";
import {Link, Route, Routes, useParams} from "react-router-dom";

import RecipeDataService from "../services/RecipeService";
import RecipesList from "./RecipesList";

const recipeDataService = new RecipeDataService();

const RecipeCategoryList = () => {
    const { id } = useParams();
    const [currentCategory, setCurrentCategory] = useState();
    const [searchTitle, setSearchTitle] = useState("");
    const [allRecipes, setAllRecipes] = useState([]);

    useEffect(() => {
        retrieveAllRecipes();
    }, []);

    useEffect(() => {
        retrieveCurrentCategory(id);
    }, [id]);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }

    const retrieveAllRecipes = () => {
        recipeDataService.getAllRecipes()
            .then(res => {
                setAllRecipes(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const retrieveCurrentCategory = (id) => {
        recipeDataService.getRecipeCategory(id)
            .then(res => {
                setCurrentCategory(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
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

    if (allRecipes) {
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
                <nav className="recipes">
                    <ul>
                        {allRecipes.map((recipe, index) => {
                            return (
                                <li key={ index }>
                                    <Link to={"recipes/" + index}>{ recipe.title }</Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <Routes>
                    <Route path="recipes/:id/" element={<RecipesList />} />
                </Routes>
            </div>
        );
    } else {
        return (
            { currentCategory}
        );
    }
}

export default RecipeCategoryList;