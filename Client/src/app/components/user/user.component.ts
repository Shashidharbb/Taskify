import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { HttpHeaders } from '@angular/common/http';
import { count } from 'rxjs';
import { TableRowReorderEvent } from 'primeng/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  isActive = true;
  usersTableData: any[] = []; // Initialize the usersTableData array to hold user data
  usersTableColumns:any[]=[
    { field: 'userId', header: 'User ID' },
    { field: 'userName', header: 'User Name' },
    { field: 'email', header: 'Email' },
    { field: 'admin', header: 'Admin' },
    { field: 'role', header: 'Role' },
    { field: 'allow2delete', header: 'Allow to delete' },
    { field: 'status', header: 'Status' },
    { field: 'country', header: 'Country' },
    { field: 'createdAt', header: 'Created At' },
    { field: 'updatedAt', header: 'Updated At' },

  ] // Define the columns for the user table
  
  selectedUser: any;
  
  constructor(private mainService:MainService) { 
    // This is the constructor of the UserComponent class.
    // You can initialize any properties or services here if needed.
  }
 
 
  ngOnInit(): void {
    
    this.mainService.showLoading();
    let options = this.mainService.getHttpHeaders();
    this.mainService.sendGetRequest('api/user/getallusers', options).subscribe({
      next: (response:any) => {
        console.log('User Response:', response);
        this.mainService.hideLoading();
        let responseBody = response.body;
        if(response.status == 200) {
          this.usersTableData = responseBody.users.map((user: any) => ({
            userId: user.ID,
            userName: user.name,
            email: user.email,
            admin: user.isAdmin ? 'Admin' : 'User',
            status: user.active ? 'Active' : 'Inactive',
            allow2delete: user.allowDelete ? 'Yes' : 'No',
            country: user.country,
            createdAt: user.createdDate,
            updatedAt: user.updatedDate,
            mongoID: user._id,
          }));
          console.log('User Data:', this.usersTableData);
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




  onAdd() {
    console.log('Add clicked');
    // Implement your add logic here
    this.showGenricMessage();
  }
  showGenricMessage() {
  alert("in User component , add, edit delete, active/inactive not impelmeneted yet. \n " +"on sinup you can create the user ");
  }

  onEdit() {
    console.log('Edit clicked');
    this.showGenricMessage();
    // Implement your edit logic here
  }

  onDelete() {
    console.log('Delete clicked');
    this.showGenricMessage();
    // Implement your delete logic here
  }

  onToggleActive() {
    this.isActive = !this.isActive;
    console.log(this.isActive ? 'Activated' : 'Deactivated');
    // Implement your activate/deactivate logic here
    this.showGenricMessage();
  }

  onUserRowSelect($event: TableRowReorderEvent) {
   if(this.selectedUser) {
      console.log('Selected User:', this.selectedUser);
    }
  }

}
