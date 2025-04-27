import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AddTaskComponent } from './components/tasks/add-task/add-task.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  
  { path: 'main', component:MainComponent , 
    children: [
      {
        path: 'dashboard',component: DashboardComponent,
      },
      {
        path: 'users',component: UserComponent,
      },{
        path: 'tasks',component: TasksComponent,
      },{
        path: 'addtask',component: AddTaskComponent,
      },
      {
        path: 'addtask/:id',component: AddTaskComponent,
      }
    ]
  },


  { path:'**', redirectTo: 'login'}, // Redirect to login for any unknown routes this should be last
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
