import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/RecipesList.css";

export default function RecipesList() {
    const params = useParams();
    const [currentRecipe, setCurrentRecipe] = useState({});
    const baseUrl = 'http://localhost:8000/api/recipes';

    useEffect(() => {
        axios.get(`${baseUrl}/${params.id}`)
            .then((res) => {
                setCurrentRecipe(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    },[params]);

    return (
    <React.Fragment>
      <div className="recipe-container">
        <div className="title">Recipe:</div>
        <div className="recipe-title">{currentRecipe.title}</div>
        <div className="title">Description:</div>
        <div className="recipe-description">{currentRecipe.description}</div>
        <img src={currentRecipe.photo} alt="Not available" />
      </div>
    </React.Fragment>
  );
}