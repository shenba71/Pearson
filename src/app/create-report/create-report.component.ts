import { Component, OnInit } from '@angular/core';

declare var visualize: any;
declare var $ :any;
@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss']
})
export class CreateReportComponent implements OnInit {

  constructor() { }

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
