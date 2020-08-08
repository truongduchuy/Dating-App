import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: any = {};
  constructor() { }

  ngOnInit() {
  }

  login(){
    console.log('user: ', this.user);
  }
}
