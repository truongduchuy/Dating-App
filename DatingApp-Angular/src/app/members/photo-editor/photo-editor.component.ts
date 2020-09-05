import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_service/auth.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  file;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  handleUpload() {
    const formData = new FormData();
    formData.append('File', this.file);

    this.userService
      .uploadPhoto(this.authService.decodedToken.nameid, formData)
      .subscribe((res: Photo) => {
        this.photos.push(res);
      });
  }
  handleFileChange(event: any) {
    this.file = event.target.files[0];
  }
}
