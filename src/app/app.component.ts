import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'softrams-racing';

  constructor(private appService: AppService, private router: Router) {
    
  }

  ngOnInit(): void {
    if (!this.appService.username || this.appService.username.length < 1) {
      this.appService.setUsername(localStorage.getItem('username'));
    }
    
  }
}
