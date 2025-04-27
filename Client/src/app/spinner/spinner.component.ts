import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent  implements OnInit {
  isLoading: boolean = false; // Initialize the spinner visibility to false
  constructor(private mainService:MainService, private cdref: ChangeDetectorRef) { 


  }

  ngOnInit(): void {
    this.mainService.SpinnerLoading$.subscribe((data) => {
      this.isLoading = data; // Update the spinner visibility based on the service value
      this.cdref.detectChanges(); // Trigger change detection to update the view
    });
  }
  

}
