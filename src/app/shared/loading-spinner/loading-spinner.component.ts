import { Component, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
@Component({
  selector: 'loading-spinner',
  template: '<div class="lds-facebook"><div></div><div></div><div></div></div>',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent{

}
