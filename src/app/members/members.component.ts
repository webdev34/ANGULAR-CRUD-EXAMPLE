import { Component, OnInit, TemplateRef } from "@angular/core";
import { AppService } from "../app.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { Member } from "../app.member-class";
import { Team } from '../app.team-class';

@Component({
  selector: "app-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.css"]
})
export class MembersComponent implements OnInit {
  members: Array<Member>;
  teams: Array<Team>;
  newMember = null;
  currentMember = null;
  modalRef: BsModalRef;
  
  constructor(
    private appService: AppService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    if(!localStorage.getItem('username') || localStorage.getItem('username') == null){
      this.router.navigate(['/login']);
    }
    else{
      this.members = JSON.parse(localStorage.getItem('members'));
      this.teams = JSON.parse(localStorage.getItem('teams'));
    }
  }

  goToAddMemberForm() {
    let thisId = this.members[this.members.length - 1].id + 1;
    this.newMember = new Member(thisId, "", "", "", "", "Active");
  }

  editMember(member: Member) {
    this.members.forEach((thisMember: Member, key: any) => {
      if (member.id == member.id) {
        this.currentMember = member;
      }
    });
  }

  updateMember() {
    this.members.forEach((member: any, key: any) => {
      if (member.id === this.currentMember.id) {
        this.members[key] = this.currentMember;
        //this.currentMember = null;
        this.appService.updateMemberLocalStore(this.currentMember);
        //Just an example of the real service as oppose to using local storage above
        this.appService.updateMember(this.currentMember);
      }
    });
  }

  saveMember(form: FormGroup) {
    //HERE AN HTTP POST WITH THE OBJECT WOULD BE CALLED BUT SINCE THIS IS A LOCAL APP
    //IM ADDING THE NEW MEMBER TO THE MEMBERS DATA SET
      let pushObj = {
        id: this.newMember.id,
        firstName: this.newMember.firstName,
        lastName: this.newMember.lastName,
        jobTitle: this.newMember.jobTitle,
        teamName: this.newMember.teamName,
        status: this.newMember.status
      }
      this.members.push(pushObj);
      //Just an example of the real service as oppose to using local storage above
      this.appService.addMember(this.newMember);
      this.appService.updateMembersLocalStore(this.members);
    }

  deleteMember(member: Member) {
    //HERE AN HTTP DELETE WITH MEMBER ID PASSED ALONG WOULD BE CALLED BUT SINCE THIS IS A LOCAL APP
    //IM REMOVING THE MEMBER FROM THE MEMBERS DATA SET
    this.members.forEach((thisMember: any, key: any) => {
      if (member.id == thisMember.id) {
        if (
          confirm("Are you sure to delete " + member.firstName + " " + member.lastName)
        ) {
          this.members.splice(key, 1);
          this.appService.updateMembersLocalStore(this.members);
          this.appService.deleteMember(member);
        }
      }
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
