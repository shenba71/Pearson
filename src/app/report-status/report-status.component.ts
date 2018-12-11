import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-report-status',
  templateUrl: './report-status.component.html',
  styleUrls: ['./report-status.component.scss']
})
export class ReportStatusComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { 
    console.log('current user in report status 0 '+ this.authenticationService.currentUserValue);
    if (!this.authenticationService.currentUserValue) { 
      console.log('current user in report status '+ this.authenticationService.currentUserValue);
      this.router.navigateByUrl('/login');
  }
  }

  ngOnInit() {

  }

}
