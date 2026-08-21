export default function IngredientsList(props){
    const IngredientListItems = props.ingredients.map((ingredient,index) => (
    <li key={index}>
        {ingredient}
        <button onClick={() => props.removeIngredient(index)}>×</button>
    </li>))
    return(
    <section>
                <h2>Ingredients on hand:</h2>
                <ul className="ingredients-list" aria-live="polite">{IngredientListItems}</ul>
                {props.ingredients.length>=4 && <div className="get-recipe-container">
                    <div ref={props.recipeRef}>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.getRecipe}>Get a recipe</button>
                </div>}
            </section>
            )
} 