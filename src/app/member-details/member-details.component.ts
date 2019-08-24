import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Member } from '../app.member-class';
import { Team } from '../app.team-class';

/* I CREATED A CLASS IN A SEPARATE TS FILE*/
// This interface may be useful in the times ahead...
// interface Member {
//   firstName: string;
//   lastName: string;
//   jobTitle: string;
//   team: string;
//   status: string;
// }

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  //FORM DISABLED UNTIL INVALID NO NEED FOR ALERT VALIDATORS UNLESS YOU WANTED IT TO OCCUR ONBLUR
  //memberModel: Member;
  // memberForm: FormGroup;
  //submitted = false;
  // alertType: String;
  // alertMessage: String;
  members: Array<Member>;
  teams: Array<Team>;
  currentMember = null;
  memberId = null;
  currentMode = 'view';

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private route: ActivatedRoute) {
    }

  ngOnInit() {
    if(!localStorage.getItem('username') || localStorage.getItem('username') == null){
      this.router.navigate(['/login']);
    }
    else{
      this.members = JSON.parse(localStorage.getItem('members'));
      this.teams = JSON.parse(localStorage.getItem('teams'));
      this.route.paramMap.subscribe(params => {
        this.memberId = this.route.snapshot.paramMap.get("id");
      });
      
      // CANT US THIS SERVICE BELOW BECAUSE OF STALE DATA BUT IF WE HAD THE SERVICES WORKING ON THE BACKEND THIS IS HOW I WOULD MAKE THE CALL
      //this.appService.getMemberById(this.memberId).subscribe(currentMember => (this.currentMember = currentMember[0]));

      this.members.forEach((thisMember: any, key: any) => {
        if (thisMember.id == this.memberId) {
          this.currentMember = thisMember;
        }
      });
    }
  }

  ngOnChanges() {}

  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    form.value.id = this.currentMember.id;
    this.appService.updateMemberLocalStore(form.value);
    //Just an example of the real service as oppose to using local storage above
    this.appService.updateMember(form.value);
    this.router.navigate(['/members']);
  }

  toggleView(currentView) {
    this.currentMode = currentView;
  }
}
