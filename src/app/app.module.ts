import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './reports/reports.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { RegisterComponent } from './register';
import { NavigationComponent } from './navigation/navigation.component';
import { CreateReportComponent } from './create-report/create-report.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { ReportStatusComponent } from './report-status/report-status.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatTableModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { ReportSchedulerComponent } from './report-scheduler/report-scheduler.component';
import { DrilldownReportComponent } from './drilldown-report/drilldown-report.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ReportsComponent,
    NavbarComponent,
    NavigationComponent,
    CreateReportComponent,
    ViewReportComponent,
    ReportStatusComponent,
    MainNavComponent,
    RecentActivityComponent,
    ReportSchedulerComponent,
    DrilldownReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule, 
    MatNativeDateModule, 
    MatIconModule, 
    MatSidenavModule, 
    MatListModule, LayoutModule, MatTableModule, MatPaginatorModule, MatSortModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS}

    // provider used to create fake backend
    fakeBackendProvider,
    RecentActivityComponent
    
    
],
bootstrap: [AppComponent]
})
export class AppModule { }
