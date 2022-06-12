//Imports necessários
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { EmployeeService } from '../../services/user.service';

//Ficheiros pertencentes ao componente employee-edit
@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})

//Tornar a classe EmployeeEditComponent acessível em todo o programa
export class EmployeeEditComponent implements OnInit {
  @Input() employee: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rest: EmployeeService,
    private _location: Location
  ) {
    this.employee = new User();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getUser(idTemp).subscribe((data: User) => {
      //console.log(data);
      this.employee = data;
    });
  }

  edit(): void {
    this.rest.editUser(this.employee).subscribe(
      (_: any) => {
        this.navigateToEmployees();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  //Redirecionar para employee-list
  navigateToEmployees(): void {
    this.router.navigate(['/employee-list/']);
  }

  //Voltar ao URL anterior
  back() {
    this._location.back();
  }
}