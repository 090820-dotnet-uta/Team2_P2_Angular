import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Service } from '../services';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})

export class SignUpFormComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    //private service: Service
  ) {
   
   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // this.service.register(this.form.value).subscribe(
      //   (res: any) => {
      //     if(res.success){
      //       console.log('success');
      //     }else
      //     console.log('shit');
      //   }
    //  )
      

    
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
     
  }
  

}
