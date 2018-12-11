import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { RecentActivityDataSource } from './recent-activity-datasource';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss'],
})
export class RecentActivityComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: RecentActivityDataSource;

  constructor(private http: HttpClient) {
    
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'destination', 'mode'];

  ngOnInit() {
    let result = null;
    this.fetchReportAudits().subscribe(data=>{
         console.log(data);
         result = data;
         console.log(result);
         this.dataSource = new RecentActivityDataSource(this.paginator, this.sort,result);
       })
    //this.dataSource = new RecentActivityDataSource(this.paginator, this.sort,result);
  }

  fetchReportAudits() {
    console.log('getting results');
    return this.http.get<any>(`http://172.24.150.67:3000/route/reports/fetchAudit`).pipe(map(response=>{
      console.log('response ' +response);
      return response;
    }));
  }
}
