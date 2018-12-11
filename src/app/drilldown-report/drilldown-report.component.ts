import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services';

@Component({
  selector: 'app-drilldown-report',
  templateUrl: './drilldown-report.component.html',
  styleUrls: ['./drilldown-report.component.scss']
})
export class DrilldownReportComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { 
    if (!this.authenticationService.currentUserValue) { 
      this.router.navigateByUrl('/login');
  }
  }

  ngOnInit() {
  }

}
