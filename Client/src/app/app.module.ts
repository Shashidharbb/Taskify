import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { SpinnerComponent } from './spinner/spinner.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


import { provideAnimations } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDateFormats,MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { EditorModule } from '@tinymce/tinymce-angular';
// import {  MatDatepickerToggle } from '@angular/material/datepicker';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainComponent } from './components/main/main.component';
import { UserComponent } from './components/user/user.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { DashboardComponent } from'./components/dashboard/dashboard.component';;

import { TableModule} from 'primeng/table'
import { StyleClassModule } from 'primeng/styleclass';
import { AddTaskComponent } from './components/tasks/add-task/add-task.component';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

// Define custom date formats
const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SpinnerComponent,
    MainComponent,
    UserComponent,
    TasksComponent,
    DashboardComponent,
    AddTaskComponent
   
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, FormsModule,
    AppRoutingModule, HttpClientModule,
    BrowserAnimationsModule,

    // Angular Material Modules
    MatFormFieldModule,
    MatInputModule, 
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,MatSelectModule,MatDatepickerModule,
    MatSidenavModule,MatListModule, MatTooltipModule,MatNativeDateModule,
    

    TableModule,StyleClassModule,
    EditorModule,IconFieldModule, InputIconModule
  ],
  providers: [provideAnimations(),  { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },],
  bootstrap: [AppComponent] //
})
export class AppModule { }
