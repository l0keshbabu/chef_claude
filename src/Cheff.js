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
        const recipeMarkdown = await getRecipeFromGroq(ingredients)
        setrecipe(recipeMarkdown)
    } 
    return(
        <main>
                <form action={SubmitHandler}>
                    <input type="text" placeholder="e.g. Eggs" name="Ingredient"></input>
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
// so this chefClaude function is expoting to app.js in the src forder from there its going to index.js 
// and from there its imported to index.html.this is waht it compi;ed in the web 
