import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_service/auth.service';
import { UserService } from 'src/app/_service/user.service';
import { AlertifyService } from 'src/app/_service/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter();
  file;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  handleUpload() {
    const formData = new FormData();
    formData.append('File', this.file);

    this.userService
      .uploadPhoto(this.authService.decodedToken?.nameid, formData)
      .subscribe((res: Photo) => {
        this.photos.push(res);
      });
  }
  handleFileChange(event: any) {
    this.file = event.target.files[0];
  }

  setMainPhoto(photo: Photo) {
    this.userService
      .setMainPhoto(this.authService.decodedToken?.nameid, photo.id)
      .subscribe(
        () => {
          const currentMainPhoto = this.photos.find((_) => _.isMain);
          currentMainPhoto.isMain = false;
          photo.isMain = true;
          this.authService.changePhotoUrl(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem(
            'user',
            JSON.stringify(this.authService.currentUser)
          );
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
