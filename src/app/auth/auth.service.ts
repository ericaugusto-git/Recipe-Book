import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponse{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: "root"})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer = null;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBYKaDIBztMzKq9JuL0uRapCKC3p5RmN3w",{
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(response => {
      this.hadleAuthentication(response)
    }))
  }
  login(email: string,password: string){
     return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYKaDIBztMzKq9JuL0uRapCKC3p5RmN3w', {
     email: email,
     password: password,
     returnSecureToken: true
   }).pipe(catchError(this.handleError), tap(response =>{
    this.hadleAuthentication(response)
   }))
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('userData')
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null
    this.router.navigate(['/auth'])
  }

  autoLogout(experiationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, experiationDuration)
  }

  autoLogin(){
    const userData: {
    email: string,
    id: string,
    _token: string,
    _tokenExpirationDate: Date } = JSON.parse(localStorage.getItem('userData'))
    if(!userData){
      return;
    }

    const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate))
    if(loadedUser.token){
      this.user.next(loadedUser)
      const expirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDate)
    }
  }

  private hadleAuthentication(response: AuthResponse){
    const expirationDate = new Date(new Date().getTime() + +response.expiresIn *1000)
    const user = new User(response.email, response.localId,response.idToken, expirationDate)
    this.user.next(user)
    localStorage.setItem('userData', JSON.stringify(user))
    this.autoLogout(+ response.expiresIn * 1000)
  }

  private handleError(error: HttpErrorResponse){
    let errorMessage = 'An unknown error ocurred!';
      if(!error.error || !error.error.error){
        return throwError(errorMessage)
      }
      switch(error.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already'
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Wrong credentials!'
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Wrong credentials!'
      }
      return throwError(errorMessage)
  }
}
