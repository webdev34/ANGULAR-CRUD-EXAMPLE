import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public members = this.appService.getMembers().subscribe(members => (this.members = members));
  public teams = this.appService.getTeams().subscribe(teams => (this.teams = teams));

  constructor(private fb: FormBuilder, private router: Router, private appService: AppService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.appService.setUsername(this.loginForm.value.username);
    localStorage.setItem('username', this.loginForm.value.username);
    localStorage.setItem('members', JSON.stringify(this.members));
    localStorage.setItem('teams', JSON.stringify(this.teams));

    this.router.navigate(['/members']);
    this.toastrService.success("Successfully Login", `Welcome ${this.loginForm.value.username}!`);
  }
}
