 interface TaskModel {
    ID?: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    createdByEmail: string;
    updatedByEmail?: string;
    createdBy: string;
    createdAt?: string;
    updatedAt?: string;
    dueDate: string; // Optional field for due date
  }
  export class Task implements TaskModel {
    ID: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    createdByEmail: string;
    updatedByEmail?: string;
    createdBy: string;
    createdAt?: string;
    updatedAt?: string;
    dueDate: string; 
    constructor( title: string, description: string, status: string,priority: string, dueDate:string,  createdByEmail: string, createdBy: string,  ID: string, updatedByEmail?: string, createdAt?: string, updatedAt?: string) {
      
      this.title = title;
        this.description = description;
        this.status = status;
        this.createdByEmail = createdByEmail;
        this.createdBy = createdBy;
        this.priority = priority; // Default value, can be changed as needed
        this.ID = ID;
        this.updatedByEmail = updatedByEmail;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.dueDate = dueDate; 
    }
}
