from fastapi import FastAPI
from pydantic import BaseModel
from app.services.recipe_service import generate_recipe
app=FastAPI()

class RecipeRequest(BaseModel):
    ingredients: list[str]
    cuisine: str = ""
@app.get("/")    
def root():
    return {"message":"Chef Claude API is running!"}

@app.post("/api/recipe")
def recipe(request: RecipeRequest):
    return generate_recipe(request.ingredients,request.cuisine)