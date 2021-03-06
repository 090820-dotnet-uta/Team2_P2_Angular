import { ProjectService } from '../services/project.service';
import { Project } from '../models/Project';
import { Location } from '@angular/common';
import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-project-form',
  templateUrl: './add-project-form.component.html',
  styleUrls: ['./add-project-form.component.css']
})
export class AddProjectFormComponent implements OnInit {

  //New project (with info) is input and the output is a new project that emits the add event 
  projectAddForm: FormGroup;
  newProj : Project;
  latestProject: any;
  latestProjId: string;
  CliProjects: Project[];
  allProjects: Project[];

  //SET TO LOCAL STORAGE!
  userId: string;

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
    console.log("inside ngOnInit")
    this.userId = localStorage.getItem("currentUserId");
    // this.userId = "1";
    console.log("userID in ngOnInit= " + this.userId)

    localStorage.removeItem("latestProjId");
    //this.ProjectService.getLatestCliProject();
    // this.getLatestProject(this.userId);
    // console.log("latest project is: ", this.latestProject);

    this.projectAddForm = this.formBuilder.group({
      //Date validators are done in html (type=date)
      //TODO Add validation that the Start date CANT be before the EndDate (StartDate < EndDate)
      userId : [this.userId],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      projectName: ['', [Validators.required, Validators.min(10), Validators.maxLength(150)]],
      Description: ['', [Validators.required, Validators.min(5), Validators.maxLength(2000)]],
      paymentOffered: ['', [Validators.required, Validators.min(0)]]
    })

    
    
  }

    get f() { return this.projectAddForm.controls; }

  onSubmit() {
      //Form was successfully submitted
      this.submitted = true;
      console.log("form submitted");
      console.log(this.projectAddForm.value);
      //Passes the value of the form (stored in newProj) to the addProject method and logs outcome
      this.ProjectService.addProject(this.projectAddForm.value).subscribe(

        
        (res: any) => {
          if(res.success){
            console.log('Success! Added');
            
          }else
          {
            console.log('Failure, just like you');
          }
        
        }
      )

      if (this.projectAddForm.invalid) {
          console.log("invalid form");
          return;
      }
      else{
        //If form is valid and is returned, it will be loaded
        this.loading = true;
        console.log("form loading");
      }
      console.log("userId=" + this.userId)
      //this.getCliProjects(this.userId);
      
      
        this.getLatestProject(this.userId);
        // WARNING: This has troulbe if the last project was deleted
        setTimeout(() => {
          this.latestProjId = localStorage.getItem("latestProjId");
          console.log("LatestProjId =", this.latestProjId)
          let shitake: number = +this.latestProjId;
          console.log("Shitake is", shitake)
          return this.router.navigateByUrl(`/Positions/${shitake}`)
        }, 200)
        
        // this.latestProjId = localStorage.getItem("latestProjId");
        // console.log("Latest project ID=", this.latestProjId)
        // //localStorage.setItem("latestProjId", this.latestProject.projectId);

        // // console.log("(Before)latestProjId =" + this.latestProjId);
        // // this.latestProjId =localStorage.getItem("latestProjId");
        // // console.log("(After)latestProjId =" + this.latestProjId);

        // return this.router.navigateByUrl(`/Positions/${this.latestProjId}`)
        
        
      
      

     
      
     
  }

  goBack(){
    this.location.back();
  }

  getAllProjects(){
    this.ProjectService.getAllProjects().subscribe(projects => {this.allProjects = projects
    console.log("Logging projects after leaving getAllProjects (addProject component):")
    console.log(this.allProjects)}
    );
  }

  

  // //Get all the client projects so we can get the most recent one 
  // getCliProjects(id: string){
  //   console.log("Entering getCliProjects (add project component) with userId: #" + id);

  //   this.ProjectService.getCliProjects(id).subscribe(projects => {this.CliProjects = projects
  //     console.log("Logging projects after leaving getCliProjects (add project component):")
  //     console.log(this.CliProjects)}
  //   );
  // }

  //Get the latest project for the current client 
  // getLatestProject(){
    
  //     console.log("Inside getLatestProject")
  //     //this.ProjectService.getLatestCliProject(userId).subscribe(project => {this.latestProject = project});
  //     return this.ProjectService.getLatestCliProject().subscribe(project => {this.latestProject = project
  //       this.latestProjId = this.latestProject.projectId + 1;
  //       console.log(this.latestProjId);
  //       localStorage.setItem("latestProjId", this.latestProjId.toString());
  //       this.latestProjId = localStorage.getItem("latestProjId");
  //       return this.router.navigateByUrl(`/Positions/${this.latestProjId}`)
  //     });
  //     //console.log("Latest project=" + this.latestProject)
  //     //localStorage.setItem("latestProjId", this.latestProject.projectId.toString())
    
    


  //   // this.getAllProjects();
  //   // console.log("Project list after getAllProjects (inside getLatestProject)")
  //   // console.log(this.allProjects);
  //   // this.getCliProjects(this.userId);
  //   // console.log("Project list after getCliProjects (inside getLatestProject)")
  //   // console.log(this.CliProjects);
    
  //   // setTimeout(() => {
  //   //   console.log("Inside timeout of getLatest project")

  //   //   console.log("latestProject BEFORE setting to CliProjects.length index =" + this.latestProject)
  //   //   console.log("CliProjects.Length BEFORE setting to latestProject =" + this.CliProjects.length)
  //   //   this.latestProject = this.CliProjects[this.CliProjects.length];
  //   //   console.log("latestProject AFTER setting to CliProjects.length index =" + this.latestProject)
  //   //   console.log("CliProjects.Length AFTER setting to latestProject =" + this.CliProjects.length)

  //   //   console.log("this.latestProject.projectId=" + this.latestProject.projectId)
  //   //   localStorage.setItem("latestProjId", this.latestProject.projectId.toString())
  //   // }, 500 )
    
  // }

  getLatestProject(id :string){
    console.log("Inside getLatestProject")
    this.ProjectService.getLatestCliProject(id).subscribe(project => {this.latestProject = project
      this.latestProjId = this.latestProject.projectId + 1;
      console.log(this.latestProjId);
      localStorage.setItem("latestProjId", this.latestProjId.toString());
      // localStorage.setItem("cost", this.latestProject.paymentOffered);
      // console.log("Cost is ", this.latestProject.paymentOffered);
    });
  }
}
