export async function getRecipeFromBackend(ingredients, cuisine) {
    const response = await fetch("http://127.0.0.1:8000/api/recipe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ingredients: ingredients,
            cuisine: cuisine,
        }),
    })

    if (!response.ok) {
        throw new Error("Failed to generate recipe")
    }

    const data = await response.json()

    return data.recipe
}