import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() conditionEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
}
