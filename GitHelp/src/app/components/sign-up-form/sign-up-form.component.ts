import { LoginService } from '../services/services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './sign-up-form.component.html',
  styles: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  constructor(
    private router: Router,
    public service: LoginService
    ) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          console.log('New user created!', 'Registration successful.');
          this.router.navigate(['/login']);
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                console.log('Username is already taken','Registration failed.');
                break;

              default:
              console.log(element.description,'Registration failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}