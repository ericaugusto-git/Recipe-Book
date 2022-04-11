import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-shared.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() conditionEvent = new EventEmitter<boolean>();
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user
    })
  }
  ngOnDestroy(): void {

  }
  onLogout(){
    this.authService.logout();
  }

  onSaveData(){
      this.dataStorageService.storeRecipes()
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe()
  }
}
