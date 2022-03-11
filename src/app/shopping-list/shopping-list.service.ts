import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  newIgredient = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Chicken Breasts', 4),
    new Ingredient('Bottle of Ketchup', 1),
    new Ingredient('Rice', 1)
  ]

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index]
  }

  updateIngredient(index: number, newIgredient: Ingredient){
    this.ingredients[index] = newIgredient;
    this.newIgredient.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.newIgredient.next(this.ingredients);
  }

  addNewIngredient(ingredient){
    this.ingredients.push(ingredient);
    this.newIgredient.next(this.ingredients.slice());
  }
}
