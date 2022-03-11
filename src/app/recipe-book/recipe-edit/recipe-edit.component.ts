import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  result;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private httpClient: HttpClient) { }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    })
    // this.httpClient.get(this.baseurl,).subscribe(data =>{
    //   console.log(data)
    // });
  }

  fetchImage(form: NgForm){
    this.recipeService.fetchImages();
  }

  reload(){
    location.reload()
  }
}
