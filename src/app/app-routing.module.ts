import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ItemsComponent } from './items/items.component';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: '/items', pathMatch: 'full'},
    { path: 'items', component: ItemsComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }

