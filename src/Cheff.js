import "./Cheff.css"
import chefimg from "./assets/images/cheff/chef1.png" 
import React from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import {getRecipeFromGroq} from "./ai"
//==========================Cheff components start==========================
const Header = () => {
    return(
        <header>
            <img src={chefimg} alt="chef logo" className="chef_logo"></img>
            <h1>Chef Claude</h1>
        </header>
    )
} 
const MainForm = () => {

    const [ingredients,setingredients] = React.useState([])
    const [recipe,setrecipe] = React.useState("")
    const [cuisine, setCuisine] = React.useState("")
    const recipeSection = React.useRef(null)

  React.useEffect(() => {
    if (recipe && recipeSection.current) {
        recipeSection.current.scrollIntoView({behavior: "smooth"})
}}, [recipe])
    
    

    function SubmitHandler(formData){
        const newIngredient = formData.get("Ingredient")
        setingredients(prevIngredients => [...prevIngredients,newIngredient])
    }
    async function getRecipe(){
        const recipeMarkdown = await getRecipeFromGroq(ingredients, cuisine)
        setrecipe(recipeMarkdown)
    } 
    return(
        <main>
                <form action={SubmitHandler}>
                    <input type="text" placeholder="e.g. Eggs" name="Ingredient"></input>
                    <select
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                    >
                        <option value="" disabled hidden>Select cuisine</option>
                        <option value="Indian">Indian</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Italian">Italian</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Mediterranean">Mediterranean</option>
                        <option value="American">American</option>
                        <option value="Thai">Thai</option>
                    </select>
                    <button>Add Ingredient</button>
                     
                </form>
               
                {ingredients.length > 0 && <IngredientsList ingredients={ingredients} getRecipe={getRecipe} recipeRef={recipeSection}/>}
            {recipe && <ClaudeRecipe recipe={recipe}/>}
        </main>
    )
}
//==========================Cheff components End============================ 
export default function ChefClaude(){
    return (
        <div>
            <Header/>
            <MainForm/>
        </div>
    )
}

