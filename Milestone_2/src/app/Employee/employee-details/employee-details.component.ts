//Imports necessários
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { EmployeeService } from '../../services/user.service';

//Ficheiros pertencentes ao componente employee-details
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})

//Tornar a classe EmployeeDetailsComponent acessível em todo o programa
export class EmployeeDetailsComponent implements OnInit {
  @Input() employee!: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rest: EmployeeService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    
    this.rest.getUser(idTemp).subscribe((data: User) => {
      this.employee = data;
    });
  }

  //Redirecionar para employee-list
  navigateToEmployees(): void {
    this.router.navigate(['/employee-list']);
  }

  //Voltar ao URL anterior
  back() {
    this._location.back();
  }
}
