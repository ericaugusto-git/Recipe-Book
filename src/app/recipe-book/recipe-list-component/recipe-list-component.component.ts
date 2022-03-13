import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipes } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list-component.component.html',
  styleUrls: ['./recipe-list-component.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipes[];
  subscription: Subscription;
  constructor(private recipeService: RecipeService, route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipesChanged.subscribe((recipes) =>{
      this.recipes = recipes;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
