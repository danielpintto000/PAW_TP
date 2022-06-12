//Imports necessários
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './Registers/register/register.component';
import { RegisterAdminComponent } from './Registers/register-admin/register-admin.component';
import { RegisterUserComponent } from './Registers/register-user/register-user.component';
import { BookListComponent } from './Book/book-list/book-list.component';
import { BookAddComponent } from './Book/book-add/book-add.component';
import { BookDetailsComponent } from './Book/book-details/book-details.component';
import { BookEditComponent } from './Book/book-edit/book-edit.component';
import { UserListComponent } from './User/user-list/user-list.component';
import { UserDetailsComponent } from './User/user-details/user-details.component';
import { UserEditComponent } from './User/user-edit/user-edit.component';
import { PointsListComponent } from './Points/points-list/points-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeDetailsComponent } from './Employee/employee-details/employee-details.component';
import { EmployeeEditComponent } from './Employee/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './Employee/employee-list/employee-list.component';
import { RegisterEmployeeComponent } from './Registers/register-employee/register-employee.component';
import { CartComponent } from './Book/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    RegisterAdminComponent,
    RegisterUserComponent,
    BookListComponent,
    BookAddComponent,
    BookDetailsComponent,
    BookEditComponent,
    UserListComponent,
    UserDetailsComponent,
    UserEditComponent,
    PointsListComponent,
    EmployeeDetailsComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    RegisterEmployeeComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})

//Torna a classe BookEditComponent acessível em todo o programa
export class AppModule { }
