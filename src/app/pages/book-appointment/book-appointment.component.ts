import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BookappointmentService } from '../../bookappointment.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogSubmitComponent } from '../dialog-submit/dialog-submit.component';

interface department {
  value: string;
  viewValue: string;
}
interface Time {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
})
export class BookAppointmentComponent implements OnInit {
  departments: department[] = [
    { value: 'Labaratory analysis', viewValue: 'Labaratory analysis' },
    { value: 'Cardiology', viewValue: 'Cardiology' },
    { value: 'Neurology', viewValue: 'Neurology' },
    { value: 'Dental service', viewValue: 'Dental service' },
  ];

  time: Time[] = [
    { value: '10:00AM', viewValue: '10:00AM' },
    { value: '1:00PM', viewValue: '1:00PM' },
    { value: '2:00PM', viewValue: '2:00PM' },
    { value: '4:00PM', viewValue: '4:00PM' },
    { value: '6:00PM', viewValue: '6:00PM' },

  ];

  constructor(
    private fb: FormBuilder,
    private appointment: BookappointmentService,
    public dialog: MatDialog,
    public route:ActivatedRoute
  ) {}
  bookappoinmentForm = this.fb.group({
    first_name: ['', Validators.required,],
    last_name: ['', Validators.required],
    phone_number: ['',[Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
    appointment_date: ['', Validators.required],
    appointment_mesaage: [''],
    service: ['', Validators.required],
    appoinment_time: ['', Validators.required],
  });

get appointmetcontrol(){
  return this.bookappoinmentForm.controls
}
  
  get fname() {
    return this.bookappoinmentForm.get('first_name')
  }
  get lname() {
    return this.bookappoinmentForm.get('last_name');
  }
  get phonenumber() {
    return this.bookappoinmentForm.get('phone_number');
  }
  get appiontmentdate() {
    return this.bookappoinmentForm.get('appointment_date');
  }

  get service() {
    return this.bookappoinmentForm.get('service');
  }
  ngOnInit(): void {
  }
  name: any;
  bookappointment() {
    // var appointment = {
    //   appintment_id :userid
    //   service : this.bookappoinmentForm.value.service,
    // appiontmentdate : 
    // }
    this.appointment
      .saveappointmentData(this.bookappoinmentForm.value)
      .subscribe((result) => {
        alert('Book Appointment successfully');
        this.dialog.open(DialogSubmitComponent);
        this.bookappoinmentForm.reset({});
      });
  }


}
