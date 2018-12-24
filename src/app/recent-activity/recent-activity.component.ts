import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { RecentActivityDataSource } from './recent-activity-datasource';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services';


@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss'],
})
export class RecentActivityComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: RecentActivityDataSource;

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router) {
      // if (!this.authenticationService.currentUserValue) { 
      //   this.router.navigateByUrl('/login');
  //}
}
  

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'destination', 'mode'];

  ngOnInit() {
    let result = null;
    this.fetchReportAudits().subscribe(data=>{
         console.log(data);
         result = data;
         if(data){
           console.log(Object.keys(result[0]));
          this.displayedColumns = Object.keys(result[0]);
         }
         console.log(result);
         this.dataSource = new RecentActivityDataSource(this.paginator, this.sort,result);
       })
    //this.dataSource = new RecentActivityDataSource(this.paginator, this.sort,result);
  }

  fetchReportAudits() {
    console.log('getting results');
    return this.http.get<any>(`http://localhost:3000/route/reports/fetchAudit`).pipe(map(response=>{
      console.log('response ' +response);
      return response;
    }));
  }
}
