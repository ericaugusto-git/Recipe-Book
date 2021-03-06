import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-book/recipe-detail-component/recipe-detail-component.component";
import { RecipeEditComponent } from "./recipe-book/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-book/recipe-start/recipe-start.component";
import { RecipeComponent } from "./recipe-book/recipe.component";
import { RecipesResolverService } from "./recipe-book/recipes-resolver.service";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const routes: Routes = [
  {path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipeComponent, canActivate: [AuthGuard],children: [
    {path: '', component: RecipeStartComponent, pathMatch:'full'},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
  ]},
  {path:'shopping-list', component: ShoppingListComponent},
  {path:'auth', component: AuthComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
