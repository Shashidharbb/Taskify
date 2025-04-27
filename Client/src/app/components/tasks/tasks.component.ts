import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Table, TableRowReorderEvent } from 'primeng/table';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent  implements OnInit{
  @ViewChild('taskTable') ref_taskTable: Table|undefined;



selectedTask: any = null;
 // TaskTableColumns:any[]=[]
  taskTableData:any[]=[];
  /**
   *
   */
  serchText:any|undefined;
  TaskTableColumns:any[]=[
    
    { field: 'ID', header: 'Task ID' },
    { field: 'title', header: 'Title' },
    { field: 'description', header: 'Description' },
    { field: 'dueDate', header: 'Due Date' },
    { field: 'priority', header: 'Priority' },
    { field: 'status', header: 'Status' },
    { field: 'createdBy', header: 'user ref ID/createdBy' },
    { field: 'createdByEmail', header: 'Creator Email' },
    { field: 'updatedByEmail', header: 'last updated By' },
    { field: 'createdAt', header: 'Created date' },
    { field: 'updatedAt', header: 'Updated  date' },

  ] // Define the columns for the user table
  
  constructor(private mainService:MainService, private router:Router, private taskService:TaskService) {

   
    
  }

  ngOnInit(): void {

    this.mainService.showLoading();
    let options = this.mainService.getHttpHeaders();
    this.taskService.sendGetRequest('api/taskcontrol/tasks/getall', options).subscribe({
      next: (response:any) => {
        console.log('tasks Response:', response);
        this.mainService.hideLoading();
        let responseBody = response.body;
        if(response.status == 200) {
          let data = responseBody.data;
          if(data && data.length > 0) {
         // this.TaskTableColumns=Object.keys(data[0]);
         this.taskTableData= data;

          }
         
          console.log('task Data:', responseBody);
        }else {
          alert("Error in fetching user data");
        }
      },
      error: (error:any) => {
        console.error('Error:', error);
        this.mainService.hideLoading();
      }
    });
   
  }


  onDelete() {
    if(this.selectedTask) {
      this.mainService.showLoading();
      let options = this.mainService.getHttpHeaders();
      this.taskService.sendDeleteRequest('api/taskcontrol/tasks/' + this.selectedTask._id, options, {}).subscribe({
        next: (response:any) => {
          console.log('Delete Response:', response);
          this.mainService.hideLoading();
          if(response.status == 204) {
            alert("Task deleted successfully");
            this.ngOnInit(); // Refresh the task list after deletion
          }else {
            alert("Error in deleting task");
          }
        },
        error: (error:any) => {
          console.error('Error:', error);
          this.mainService.hideLoading();
        }
      });
    } else {
      alert("Please select a task to delete.");
    }

  }


  onEdit() {
    if(this.selectedTask) {
      // this.router.navigate(['/main/addtask', this.selectedTask._id ], 
      //    {
      //   queryParams: { taskData: JSON.stringify(this.selectedTask) }
      //  });
      this.router.navigate(['/main/addtask', this.selectedTask._id ]);
    } else {
      alert("Please select a task to edit.");

    }
  }
  onAdd() {
    this.router.navigate(['/main/addtask']);
  }

  onUserRowSelect($event: TableRowReorderEvent) {
   if($event) {
     // this.selectedTask = $event.data;
     console.log(this.selectedTask);
    }
  }

  onSearch($event: Event,bindedValue: any) {
    this.ref_taskTable?.filterGlobal(bindedValue, 'contains');
  }

}
