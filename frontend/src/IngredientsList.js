export default function IngredientsList(props) {
    const IngredientListItems = props.ingredients.map((ingredient, index) => (
        <li key={index}>
            {ingredient}
            <button
                type="button"
                className="remove-ingredient"
                onClick={() => props.removeIngredient(index)}
                aria-label={`Remove ${ingredient}`}
            >
                ×
            </button>
        </li>
    ))

    return (
        <section>
            {props.ingredients.length === 0 ? (
                <p className="empty-ingredients">
                    No ingredients added yet. Add some ingredients above to get started.
                </p>
            ) : (
                <>
                    <h2>Ingredients on hand:</h2>

                    <ul className="ingredients-list" aria-live="polite">
                        {IngredientListItems}
                    </ul>

                    {props.ingredients.length >= 4 && (
    <>
        <div className="get-recipe-container">
            <div className="recipe-intro">
                <span className="recipe-icon" aria-hidden="true">🍳</span>

                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
            </div>

            <button
                type="button"
                onClick={() => props.getRecipe()}
                disabled={props.isLoading}
            >
                {props.isLoading ? "Cooking..." : "Get a recipe"}
            </button>
        </div>

        {props.isLoading && (
            <div className="recipe-loading" aria-live="polite">
                <div className="recipe-spinner" aria-hidden="true"></div>
                <p>🍳 Let us cook something special...</p>
            </div>
        )}
    </>
)}
                </>
            )}
        </section>
    )}