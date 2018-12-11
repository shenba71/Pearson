import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services';

declare var visualize: any;
declare var $ :any;
@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { 
    if (!this.authenticationService.currentUserValue) { 
      this.router.navigateByUrl('/login');
  }
  }

  ngOnInit() {
  this.initializeDashBoard();
  }
  
  initializeDashBoard() {
    visualize({
    auth: {
        name: "jasperadmin",
        password: "jasperadmin",
        organization: "organization_1"
    }
    }, function (v) {

    //render report from provided resource
    v("#container").dashboard({
        resource: "/dashboards/Login_Details_DashBoard",
        error: handleError
    });

    //show error
    function handleError(err) {
        alert(err.message);
    }
    });
  }

}
