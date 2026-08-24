from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.services.recipe_service import generate_recipe
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecipeRequest(BaseModel):
    ingredients: list[str]
    cuisine: str = ""

class RecipeResponse(BaseModel):
    recipe:str 

@app.get("/")    
def root():
    return {"message":"Chef Claude API is running!"}

@app.post("/api/recipe", response_model=RecipeResponse)
def recipe(request: RecipeRequest):
    return generate_recipe(request.ingredients,request.cuisine)