import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeDataService from "../services/RecipeService";

const recipeDataService = new RecipeDataService();

function RecipesList() {
    const { id }= useParams();
    const [currentRecipe, setCurrentRecipe] = useState();

    const getRecipe = (id) => {
        recipeDataService.getRecipe(id)
            .then(res => {
                setCurrentRecipe(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };
    useEffect(() => {
        if (id)
            getRecipe(id);
    }, [id]);

    return (
        <div>
            {currentRecipe ? (
                <div className="edit-form">
                  <h4>Tutorial</h4>
                  <form>
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={currentRecipe.title}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={currentRecipe.description}
                      />
                    </div>
                  </form>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Recipe...</p>
                </div>
            )}
        </div>
    );
}

export default RecipesList;