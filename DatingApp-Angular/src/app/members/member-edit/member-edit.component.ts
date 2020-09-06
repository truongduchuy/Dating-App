import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { UserService } from 'src/app/_service/user.service';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent implements OnInit {
  user: User;
  oldUser: User;
  photoUrl: string;

  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.isFormDirty()) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = this.trimData(data.user);
      this.oldUser = { ...this.user };
    });

    this.authService.currentPhotoUrl.subscribe(
      (photoUrl) => (this.photoUrl = photoUrl)
    );
  }

  updateUser() {
    this.userService.updateUser(this.user.id, this.user).subscribe((res) => {
      this.alertify.success('saved successfully!');
      this.oldUser = { ...this.user };
    });
  }

  isFormDirty(): boolean {
    return (
      JSON.stringify(this.oldUser) !== JSON.stringify(this.trimData(this.user))
    );
  }

  trimData(user: User): User {
    return {
      ...user,
      introduction: user.introduction?.trim(),
      lookingFor: user.lookingFor?.trim(),
      interests: user.interests?.trim(),
    };
  }

  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
    this.oldUser = { ...this.user };
  }
}
