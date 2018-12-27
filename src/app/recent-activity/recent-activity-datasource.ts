import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Injectable } from '@angular/core';

// TODO: Replace this with your own data model type
export interface RecentActivityItem {
  name: string;
  destination: string;
  mode: string;
}

// TODO: replace this with real data from your application
//const TABLE_DATA: RecentActivityItem[] = 

/**
 * Data source for the RecentActivity view. This class should
 * encapsulate all logic for fetching and manipulating the displayed da
 * ta
 * (including sorting, pagination, and filtering).
 */

export class RecentActivityDataSource extends DataSource<any> {
  data: [];

  constructor(private paginator: MatPaginator, private sort: MatSort,private result:[]) {
    super();
    console.log('fetching audits');
    this.data = result;
    // this.fetchReportAudits().subscribe(result=>{
    //   console.log(result);
    //   this.data = result.json() as RecentActivityItem[];
    // })
  }

  // fetchReportAudits() {
  //   console.log('getting results');
  //   return this.http.get<any>(`http://172.24.150.67:3000/route/reports/fetchAudit`).pipe(map(response=>{
  //     console.log(response);
  //     return response.toJson();
  //   }));
  // }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Element[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    //return observableOf(this.data);

     return merge(...dataMutations).pipe(map(() => {
       return this.getPagedData(this.getSortedData([...this.data]));
     }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: any[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: any[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        
        // case 'name': return compare(a.name, b.name, isAsc);
        // case 'destination': return compare(a.destination, b.destination, isAsc);
        // case 'mode' : return compare(a.mode,b.mode,isAsc);
         default: return compare(a[this.sort.active],b[this.sort.active],isAsc);
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
