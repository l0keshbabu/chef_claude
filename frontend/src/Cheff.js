import "./Cheff.css"
import chefimg from "./assets/images/cheff/chef1.png" 
import React from "react"
import ClaudeRecipe from "./ClaudeRecipe"
import IngredientsList from "./IngredientsList"
import { getRecipeFromBackend } from "./api"
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
    const [duplicateMessage, setDuplicateMessage] = React.useState("")
    const [showDuplicate, setShowDuplicate] = React.useState(false)
    const [recipe,setrecipe] = React.useState("")
    const [cuisine, setCuisine] = React.useState("")
    const recipeSection = React.useRef(null)

  React.useEffect(() => {
    if (recipe && recipeSection.current) {
        recipeSection.current.scrollIntoView({behavior: "smooth"})
}}, [recipe])
    
    React.useEffect(() => {
    if (!duplicateMessage) return

    setShowDuplicate(true)

    const hideTimer = setTimeout(() => {
        setShowDuplicate(false)
    }, 3000)

    const removeTimer = setTimeout(() => {
        setDuplicateMessage("")
    }, 3500)

    return () => {
        clearTimeout(hideTimer)
        clearTimeout(removeTimer)
    }
}, [duplicateMessage])
    

    function SubmitHandler(formData){
        const rawIngredient = formData.get("Ingredient")
        const newIngredient = rawIngredient.trim().toLowerCase()
        
        if (newIngredient === "") return
        const alreadyExists = ingredients.some(
        ingredient => ingredient.toLowerCase() === newIngredient
    )
        if (alreadyExists) {
    setDuplicateMessage(
        `"${newIngredient}" is already in your ingredient list.`
    )
    setShowDuplicate(true)
    return
}
        setingredients(prevIngredients => [...prevIngredients,newIngredient])
    }
    function removeIngredient(index) {
    setingredients(prevIngredients =>
        prevIngredients.filter((_, i) => i !== index)
    )
}
    async function getRecipe(){
    try {
        const recipeMarkdown = await getRecipeFromBackend(ingredients, cuisine)
        setrecipe(recipeMarkdown)
    } catch (error) {
        console.error("Recipe generation failed:", error)
    }
} 
    
    return(
        <main>
                <form action={SubmitHandler}>
                    <input type="text" placeholder="e.g. Eggs" name="Ingredient"></input>
                    <select
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                    >
                        <option value="">Select cuisine</option>
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
               {duplicateMessage && (
    <div
        className={`duplicate-message ${showDuplicate ? "show" : "hide"}`}
        role="alert"
    >
        <span className="duplicate-icon" aria-hidden="true">!</span>
        <span>{duplicateMessage}</span>
    </div>
)}
               
                <IngredientsList ingredients={ingredients} removeIngredient={removeIngredient} getRecipe={getRecipe} recipeRef={recipeSection}/>
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

