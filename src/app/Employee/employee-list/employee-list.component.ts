//Imports necessários
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import jwt_decode from 'jwt-decode';
import {Location} from '@angular/common';
import { EmployeeService, UserService } from '../../services/user.service';

//Ficheiros pertencentes ao componente employee-list
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})

//Tornar a classe EmployeeListComponent acessível em todo o programa
export class EmployeeListComponent implements OnInit {
  employees!: User[];
  adminOrEmployee!: boolean;
  user!: boolean;
  employeei!:boolean;
  userId!: String;
  admin!: boolean;

  empId!:string;

  constructor(
    private rest: EmployeeService,
    private rest2: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.adminOrEmployee = false;
    this.user = false;
    this.employeei = false;
    this.rest.getUsers().subscribe((data: User[]) => {
      //console.log(data);
      this.employees = data;
    });
  }

  //Redirecionar para register-employee
  createEmployee() {
    this.router.navigate(['/register-employee']);
  }

  //Redirecionar para employee-edit
  editEmployee(id: string) {
    this.router.navigate(['/employee-edit/' + id]);
  }

  //Redirecionar para employee-details
  view(id: string) {
    this.router.navigate(['/employee-details/' + id]);
  }

  delete(id: string) {
    //console.log(id);
    this.rest.deleteUser(id).subscribe(
      (_: any) => {
        this.getEmployees();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.adminOrEmployee = false;
    this.user = false;
    this.employeei = false;
    this.router.navigate(['logout']);
  }

  setRoleTemp(empId: string): void {
    let token;
    if (localStorage.getItem('currentUser') != null) {
      token = localStorage.getItem('currentUser')!.substring(0);
      let decoded = this.getDecodedAccessToken(token);

      //console.log("VALOR: " + empId);
      this.empId = empId;
      this.userId = decoded.id;
      this.getUser(decoded.id);
    } 
  }

  getUser(id: string) {
    this.rest2.getUser(id).subscribe((data: User) => {
      //console.log(data);      
      if(data.role == "ADMIN" || data.role == "EMPLOYEE"){
        this.adminOrEmployee = true;
      }
      if(data.role == "USER"){
        this.user = true;
      }
      if(data._id == this.empId || data.role == "ADMIN"){
        this.employeei = true;
      }
    });
  }
  
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  //Voltar ao URL anterior
  back() {
    this._location.back();
  }
}
