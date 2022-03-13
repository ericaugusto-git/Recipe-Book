
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipes } from "./recipe.model";
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipes[]>();

  constructor (private shoppingListService: ShoppingListService, private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json;charset=UTF-8",
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    })
  };
  headers = new HttpHeaders()
  result: any;
  recipes: Recipes[] = [
    new Recipes("Chicken Katsu",
    "It's hard not to love a fried chicken cutlet, but this katsu sauce takes this to the next level.",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/200518-delish-seo-chicken-katsu-hand-2-14652-eb-1590516686.jpg?crop=1xw:1xh;center,top&resize=980:*",
    [
      new Ingredient('eggs', 3),
      new Ingredient('sake', 2),
      new Ingredient('Chiken Breasts', 2),
      new Ingredient('Vegetal Oil', 1)
    ]),
    new Recipes("Classic Homemade Ramen",
    "Can't go wrong with a classic!",
    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190208-delish-ramen-horizontal-093-1550096715.jpg?crop=0.536xw:1.00xh;0.252xw,0&resize=980:*",
    [
      new Ingredient('Noodles', 2),
      new Ingredient('Pork', 3),
      new Ingredient('Shoyu', 1)
    ])
  ];


  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  addNewIngredient(ingredients: Ingredient[]){
    for(let ingredient of ingredients){
      this.shoppingListService.addNewIngredient(ingredient);
    }
  }

  addRecipe(recipe: Recipes){
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipes){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice())
  }

  fetchImages(name){
    return this.httpClient.get("https://customsearch.googleapis.com/customsearch/v1?imgSize=HUGE&key=AIzaSyBYKaDIBztMzKq9JuL0uRapCKC3p5RmN3w&cx=389ddf6134f07f332&searchType=image&q=" + name);
  }

}
