import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Inject, Injectable } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppService } from "./app.service";

import { AppComponent } from "./app.component";
import { BannerComponent } from "./banner/banner.component";
import { MembersComponent } from "./members/members.component";
import { MemberDetailsComponent } from "./member-details/member-details.component";
import { LoginComponent } from './login/login.component';

import { setTheme } from "ngx-bootstrap/utils";

import { ButtonsModule } from "ngx-bootstrap/buttons";
import { ModalModule } from "ngx-bootstrap/modal";
import { ToastrModule } from "ngx-toastr";

const ROUTES = [
  {
    path: "",
    redirectTo: "members",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "members",
    component: MembersComponent
  },
  {
    path: "member-details/:id",
    component: MemberDetailsComponent
  }
];

@NgModule({
  declarations: [AppComponent, BannerComponent, MembersComponent, MemberDetailsComponent, LoginComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AppService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    setTheme("bs3"); // or 'bs4'
  }

  ngOnInit(): void {
   
  }
}

