import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../_service/auth.service';

@Pipe({
  name: 'showUserName',
})
export class ShowUserNamePipe implements PipeTransform {
  constructor(private authService: AuthService) {}
  transform(username, args?: any): any {
    return  this.authService.decodedToken?.[username]; 
  }
}
