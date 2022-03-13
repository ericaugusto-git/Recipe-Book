import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    })
  }
  recipeName = ''
  recipeImagePath = ''
  recipeDescription = ''
  recipeIngredients = new FormArray([]);
  private initForm(){
    if (this.editMode){
      let recipe = this.recipeService.getRecipe(this.id)
      console.log(recipe)
      this.recipeName = recipe.name;
      this.recipeImagePath = recipe.imagePath;
      this.recipeDescription = recipe.description;
      if(recipe.ingredients){
        for(let ingredient of recipe.ingredients){
          this.recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(this.recipeName, Validators.required),
      'imagePath': new FormControl(this.recipeImagePath, Validators.required),
      'description': new FormControl(this.recipeDescription, Validators.required),
      'ingredients': this.recipeIngredients
    })
  }

  getControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  addNewIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onSubmit(){
    console.log(this.recipeForm.value)
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel()
  }
  links = [];
  fetchImages(name){
    this.recipeService.fetchImages(name).subscribe((data) =>{
      this.links = [];
      for (let item of data['items']){
        this.links.push(item['link']);
      }
    })
  }
  setLink(link){
    this.recipeImagePath = link;
    this.recipeForm.patchValue({
      'imagePath': this.recipeImagePath
    })
  }

  deleteIngredient(index){
    this.recipeIngredients.removeAt(index)
  }

  onCancel(){
    console.log(this.route)
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
