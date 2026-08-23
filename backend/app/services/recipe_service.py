import os

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")

groq = Groq(api_key=groq_api_key)


SYSTEM_PROMPT = """
You are an assistant that receives a list of ingredients that a user has
and suggests a recipe they could make with some or all of those ingredients.

You don't need to use every ingredient they mention in your recipe.
The recipe can include additional ingredients they didn't mention,
but try not to include too many extra ingredients.

Format your response in markdown to make it easier to render to a web page.
"""


def generate_recipe(ingredients, cuisine):
    ingredients_string = ", ".join(ingredients)

    cuisine_prompt = (
        f"Create a strictly {cuisine} cuisine recipe."
        if cuisine
        else "Create a recipe of any cuisine."
    )

    user_prompt = f"""
I have the following ingredients: {ingredients_string}.

{cuisine_prompt}

Rules:
- The recipe MUST follow {cuisine or "a suitable"} cuisine style.
- Use typical ingredients, spices, and cooking methods of that cuisine.
- Clearly mention the cuisine name at the top.
- If it's not possible with the given ingredients, say that clearly.

Provide a clean, step-by-step recipe in markdown format.
"""

    try:
        response = groq.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
        )

        return {
            "recipe": response.choices[0].message.content
        }

    except Exception as error:
        print(f"Groq error: {error}")

        return {
            "error": "Failed to generate recipe."
        }