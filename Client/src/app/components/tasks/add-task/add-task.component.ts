import { Component, Input } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  @Input() task: any;
  //@Output() formSubmit = new EventEmitter<any>();
  TaskType :string |undefined;
  taskForm: FormGroup;
  taskId: any | undefined; // To store the task ID from the route
taskObject:Task | undefined;
editTaskObject: any | undefined;

/**
 *
 */
constructor(private mainService:MainService, private router:Router, private fb: FormBuilder, private taskService:TaskService,
  private Activeroute: ActivatedRoute, // Inject ActivatedRoute
) {

  this.taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['',Validators.required,],
    dueDate: ['', Validators.required, ],
    priority: ['', Validators.required],
    status: ['', Validators.required],
  });
 
  this.TaskType = 'Create task';
}





  ngOnInit(): void {
     // Get the task ID from the route parameters
     this.Activeroute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.mainService.showLoading();
       this.taskService.sendGetRequest('api/taskcontrol/tasks/' + id, this.mainService.getHttpHeaders()).subscribe({
        next: (response:any) => {
          console.log('Task Response:', response);
          
          let responseBody = response.body;
          if(response.status == 200) {
            this.task = responseBody.data;
            console.log('task:', this.task);
            this.initializeForm(this.task);
          } else {
            alert("Error in fetching task data");
          }
          this.mainService.hideLoading();
        },
        error: (error:any) => {
          console.error('Error:', error);
          alert("Error in fetching task data"+ error.message);
          this.mainService.hideLoading();
        }
      });
     }
    });

    // this.Activeroute.queryParams.subscribe(params => {  
    //   if (params['taskData']) {
    //     this.task = JSON.parse(params['taskData']);
    //     console.log('taskData:', this.task);
    //     this.initializeForm(this.task);
    // }
    //});

  }
  initializeForm(task: any) {
    if(task) {
      this.editTaskObject = new Task(task.title, task.description, task.status, task.priority, task.dueDate, task.createdByEmail, task.createdBy, task.ID, task.createdByEmail, task.createdAt, task.updatedAt);
      this.taskForm.patchValue({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status,
      });
      this.TaskType = 'Update task';
    } 
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      if(this.TaskType == 'Update task') {

        this.mainService.showLoading();
        let options = this.mainService.getHttpHeaders();
        this.editTaskObject.title = this.taskForm.value.title;
        this.editTaskObject.description = this.taskForm.value.description;

        this.editTaskObject.status = this.taskForm.value.status;
        this.editTaskObject.priority = this.taskForm.value.priority;
        this.editTaskObject.dueDate = this.taskForm.value.dueDate;
        this.editTaskObject.updatedByEmail = this.mainService.loggedInUser.user.email; // Set the updatedByEmail field to the current user's email
        this.editTaskObject.updatedAt = new Date().toISOString(); // Set the updatedAt field to the current date and time
      
        let requestBody = this.editTaskObject;

        this.taskService.sendPutRequest('api/taskcontrol/tasks/'+this.task._id, requestBody, options).subscribe({
          next: (response:any) => {
            console.log('create task Response:', response);
            this.mainService.hideLoading();
            if(response.status == 200) {
              // this.formSubmit.emit(response.body);
              alert("Task updated successfully");
              this.router.navigate(['main/tasks']); // Go back to the list after updating
            } else {
              alert("Error in updating task data");
            }
          },
          error: (error:any) => {
            console.error('Error:', error);
            alert("Error in updating task data"+ error.message);
            this.mainService.hideLoading();
          }
        });
      }else{
      this.taskId = this.mainService.generateUniqueId(); // Generate a unique ID for the new task
      if (this.taskId) {
        this.mainService.showLoading();
        let options = this.mainService.getHttpHeaders();
        this.taskObject = new Task(this.taskForm.value.title, 
          this.taskForm.value.description, 
        this.taskForm.value.status,
        this.taskForm.value.priority, 
        this.taskForm.value.dueDate,//due date
        this.mainService.loggedInUser.user.email,
        this.mainService.loggedInUser.user._id,
         this.taskId.toString(),
         '',//updatedByEmail
         this.taskForm.value.dueDate,
          '');
 

        let requestBody = this.taskObject
        console.log('requestBody:', requestBody);

        this.taskService.sendPostRequest('api/taskcontrol/tasks/create', requestBody, options).subscribe({
          next: (response:any) => {
            console.log('create task Response:', response);
            this.mainService.hideLoading();
            if(response.status == 201) {
              alert("Task created successfully");
              this.router.navigate(['main/tasks']); // Go back to the list after updating
            } else {
              alert("Error in updating task data");
            }
          },
          error: (error:any) => {
            console.error('Error:', error);
            this.mainService.hideLoading();
          }
        });
        
      } 
    }
    }
  }
}


