import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/_services';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {
  currentUser: User;
  userRole:string;
  adminRoles: Array<string>;
  userRoles: Array<String>;
  private static ADMIN_ROLES = ["admin"];
  private static USER_ROLES = ["user"];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
      this.adminRoles = MainNavComponent.ADMIN_ROLES;
      this.userRoles = MainNavComponent.USER_ROLES;
      this.authenticationService.currentUser.subscribe(x => {
        this.currentUser = x;
        console.log(x);
        if(x){
          console.log(x.userName);
          this.userRole = x.role;
        }
        
      })
      console.log('this  '+this.currentUser);
    }

    logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

}
