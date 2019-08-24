import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Member } from "./app.member-class";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // If false, the application will run on 4200 and call json-server directly
  // If true, the application will utilize node API
  DEBUG: Boolean = true;
  api: string;
  username: string;
  members: Array<Member> = [];

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    if (this.DEBUG) {
      this.api = 'http://localhost:3000';
    } else {
      this.api = 'http://localhost:8000/api';
    }

    //NEEDED SINCE LOCAL STORAGE DATA NEEDS ARRAY OF MEMBERS
    let nonModeledArray = JSON.parse(localStorage.getItem('members'));
    if(nonModeledArray){
      nonModeledArray.forEach((thisMember: any, key: number) => {
        this.members.push(new Member(thisMember.id, thisMember.firstName, thisMember.lastName, thisMember.jobTitle, thisMember.teamName, thisMember.status))
      });
    }
  }

  // Returns all members
  getMembers() {
    return this.http.get(`${this.api}/members`).pipe(catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }

  addMember(member: Member) {
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(member)
    }
    this.toastrService.success("New member saved!");
    return this.http.post(`${this.api}/members`, options).pipe(catchError(this.handleError));
  }

  deleteMember(member: Member){
    this.toastrService.success(`${member.firstName}  ${member.lastName} deleted successfully!`);
    return this.http.delete(`${this.api}/members/${member.id}`).pipe(catchError(this.handleError));
  }

  getTeams() {
    return this.http.get(`${this.api}/teams`).pipe(catchError(this.handleError));
  }

  getMemberById(id: number) {
    return this.http.get(`${this.api}/members?id=${id}`).pipe(catchError(this.handleError));
  }

  updateMemberLocalStore(member:Member):void {
    this.members.forEach((thisMember: Member, key: any) => {
      if (thisMember.id === member.id) {
        this.members[key] = member;
        localStorage.setItem('members', JSON.stringify(this.members));
      }
    });
    this.toastrService.success(member.firstName+ " "+ member.lastName+ " info has been updated!");
  }

  updateMembersLocalStore(members:Array<Member>) {
    localStorage.setItem('members', JSON.stringify(members));
  }

  updateMember(member: Member): Observable<HttpResponse<Member>> {
    let httpHeaders = new HttpHeaders({
       'Content-Type' : 'application/json'
    });    
    return this.http.post<Member>(`${this.api}/members`, member,
      {
        headers: httpHeaders,
        observe: 'response'
      }
    );
  } 

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //console.error('An error occurred:', error.error.message);
      this.toastrService.error("An error occurred:",  error.error.message);
    } else {
      //console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      this.toastrService.error("An error occurred:", `Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return [];
  }
}
