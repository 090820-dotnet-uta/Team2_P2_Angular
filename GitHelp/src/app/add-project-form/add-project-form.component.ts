import { ProjectService } from '../models/project.service';
import { Project } from '../models/Project';
import { Position} from '../models/Position';
import { Location } from '@angular/common';
import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinct } from 'rxjs/operators';


@Component({
  selector: 'app-add-project-form',
  templateUrl: './add-project-form.component.html',
  styleUrls: ['./add-project-form.component.css']
})
export class AddProjectFormComponent implements OnInit {

  //New project (with info) is input and the output is a new project that emits the add event 
  projectAddForm: FormGroup;

  //Signifiers for submitting and loading form
  loading = false;
  submitted = false;

  constructor(
    private ProjectService: ProjectService,
    private formBuilder: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.projectAddForm = this.formBuilder.group({
      //Date validators are done in html (type=date)
      //TODO Add validation that the Start date CANT be before the EndDate (StartDate < EndDate)
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      ProjectName: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
      Description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(2000)]]
    })
  }

    get f() { return this.projectAddForm.controls; }

  onSubmit() {
      //Form was successfully submitted
      this.submitted = true;
      console.log("form submitted")

      //Passes the value of the form to the addProject method and logs outcome
      this.ProjectService.addProject(this.projectAddForm.value).subscribe(
        (res: any) => {
          if(res.success){
            console.log('success');
          }else
          console.log('shit');
        }
     )

      if (this.projectAddForm.invalid) {
          console.log("invalid form");
          return;
      }

      //If form is valid and is returned, it will be loaded
      this.loading = true;
      console.log("form loading");
     
  }

  goBack(){
    this.location.back();
  }
}
