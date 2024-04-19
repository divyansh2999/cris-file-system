import { RouterModule, Routes } from '@angular/router';
import { UploadFolderComponent } from './upload-folder/upload-folder.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignedtabComponent } from './assignedtab/assignedtab.component';
import { LoginComponent } from './login/login.component';
import { EfsuComponent } from './efsu/efsu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './auth.guard';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';
import { DashComponent } from './dash/dash.component';
import { ClientGuard } from './client.guard';
import { AdminGuard } from './admin.guard';
import { CombinedGuard } from './combined.guard';


export const routes: Routes = [
    {
        path: '', component: LoginComponent
    },
    {
        path: 'uploadfolderfile', component: UploadFolderComponent ,  canActivate: [AdminGuard] 
    },
    {
        path: 'dashboard', component: DashboardComponent ,
    },
    {
        path: 'assignedtab', component: AssignedtabComponent 
    },
    {
        path: 'login', component: LoginComponent
    },
    {
         path: 'efsu', component: EfsuComponent, canActivate: [AuthGuard]
    },
    {
        path:'client' , component:ClientComponent, canActivate: [ClientGuard] 
    },
    {
        path:'admin' , component:AdminComponent, canActivate: [AdminGuard]
    },
    {
        path:'navbar' , component:NavbarComponent
    },
    {
        path: '', redirectTo: '/dashboard', pathMatch: 'full'
    },
    {
        path:'dash' , component:DashComponent , 
    }
    
];


