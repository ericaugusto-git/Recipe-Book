import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { error } from "console";
import { Observable } from "rxjs";
import { AuthService, AuthResponse } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService, private router: Router){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    this.isLoading = true;
    const email = form.value.email
    const password = form.value.password
    let authObs: Observable<AuthResponse>;
    if(this.isLoginMode){
      authObs = this.authService.login(email,password)
    }else{
      authObs = this.authService.signUp(email,password)
    }
  authObs.subscribe(data =>{
      this.isLoading = false;
      this.router.navigate(['/recipes'])
  }, error =>{
    this.isLoading = false;
    this.error = error;
  })
    form.reset()
  }
}
