import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipes } from "../recipe-book/recipe.model";
import { RecipeService } from "../recipe-book/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put("https://recipe-book-1647187499766-default-rtdb.firebaseio.com/recipes.json", recipes)
    .subscribe(response => {
      console.log(response);
    })
  }

  fetchRecipes(){
       return this.http.get<Recipes[]>("https://recipe-book-1647187499766-default-rtdb.firebaseio.com/recipes.json"
      ).pipe( map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
      })
    }),
    tap(recipes => {
      this.recipeService.setRecipes(recipes)
    }))
  }
}
