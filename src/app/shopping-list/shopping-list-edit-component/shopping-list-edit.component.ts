import { Component, ElementRef, Output, ViewChild, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ingredient } from "src/app/shared/ingredients.model";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-list-edit",
  templateUrl:"./shopping-list-edit.component.html",
  styleUrls: ["./shopping-list-edit.component.css"]
})
export class ShoppingListEditComponent implements OnInit, OnDestroy{
  @ViewChild('f',{static: false})
  slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor (private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) =>{
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.slForm.form.setValue({
        'name': this.editedItem.name,
        'amount': this.editedItem.amount
      })
    })
  }
  onSubmit(form: NgForm){
    const newIngredient = new Ingredient(form.value.name,form.value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }else{
      this.shoppingListService.addNewIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset()
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.onClear()
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.editMode = false;
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
