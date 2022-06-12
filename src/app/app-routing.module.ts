//Imports necessários
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './Registers/register/register.component';
import { RegisterAdminComponent } from './Registers/register-admin/register-admin.component';
import { RegisterUserComponent } from './Registers/register-user/register-user.component';
import { RegisterEmployeeComponent } from './Registers/register-employee/register-employee.component';
import { BookListComponent } from './Book/book-list/book-list.component';
import { BookAddComponent } from './Book/book-add/book-add.component';
import { BookDetailsComponent } from './Book/book-details/book-details.component';
import { BookEditComponent } from './Book/book-edit/book-edit.component';
import { UserListComponent } from './User/user-list/user-list.component';
import { UserDetailsComponent } from './User/user-details/user-details.component';
import { UserEditComponent } from './User/user-edit/user-edit.component';
import { PointsListComponent } from './Points/points-list/points-list.component'
import { CartComponent } from './Book/cart/cart.component';
import { EmployeeListComponent } from './Employee/employee-list/employee-list.component';
import { EmployeeEditComponent } from './Employee/employee-edit/employee-edit.component';
import { EmployeeDetailsComponent } from './Employee/employee-details/employee-details.component';

//Rotas
const routes: Routes = [
  {
    path: 'book-add',
    component: BookAddComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'book-list',
    component: BookListComponent
  },
  {
    path: 'book-edit/:id',
    component: BookEditComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'book-details/:id',
    component: BookDetailsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'user-details/:id',
    component: UserDetailsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'user-edit/:id',
    component: UserEditComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'register-admin',
    component: RegisterAdminComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'register-user',
    component: RegisterUserComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'register-employee',
    component: RegisterEmployeeComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'points',
    component: PointsListComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'cart/:id',
    component: CartComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent
  },
  {
    path: 'employee-edit/:id',
    component: EmployeeEditComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'employee-details/:id',
    component: EmployeeDetailsComponent,
    canActivate: [AuthGuardGuard],
  },
  /*{
    path: 'user-/:id',
    component: UserDetailsComponent,
    canActivate: [AuthGuardGuard],
  },*/
  {
    path: '**',
    redirectTo: '/book-list',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

//Torna a classe UserEditComponent acessível em todo o programa
export class AppRoutingModule {}
