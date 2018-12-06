import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { CreateReportComponent } from './create-report/create-report.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { ReportStatusComponent } from './report-status/report-status.component'; 

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'createReport', component: CreateReportComponent},
    { path: 'viewReport', component: ViewReportComponent},
    { path: 'reportStatus', component: ReportStatusComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);