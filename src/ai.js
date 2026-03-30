import Groq from "groq-sdk"

// =========================================================================================
const groq = new Groq({
    apiKey: process.env.REACT_APP_GROQ_API_KEY,
    dangerouslyAllowBrowser: true
})
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe 
they could make with some or all of those ingredients. You don't need to use every ingredient they
mention in your recipe. The recipe can include additional ingredients they didn't mention, but try
  not to include too many extra ingredients. Format your response in markdown to make it easier to
   render to a web page
`

export async function getRecipeFromGroq(ingredientsArr, cuisine = "") {
    const ingredientsString = ingredientsArr.join(", ")

    const cuisinePrompt = cuisine
        ? `Create a strictly ${cuisine} cuisine recipe.`
        : "Create a recipe of any cuisine."

    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                {
                    role: "user",
                    content: `
I have the following ingredients: ${ingredientsString}.

${cuisinePrompt}

Rules:
- The recipe MUST follow ${cuisine || "a suitable"} cuisine style
- Use typical ingredients, spices, and cooking methods of that cuisine
- Clearly mention the cuisine name at the top (e.g., "## Cuisine: Indian")
- If it's not possible with given ingredients, say that clearly

Provide a clean, step-by-step recipe in markdown format.
`
                },
            ],
        })

        return response?.choices?.[0]?.message?.content
            || "Sorry, couldn't generate a recipe. Please try again."

    } catch (err) {
        console.error("Groq error:", err)
        return "⚠️ Failed to generate recipe. Please try again."
    }
}