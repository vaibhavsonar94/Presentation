import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BookappointmentService } from 'src/app/bookappointment.service';


interface department {
  value: string;
  viewValue: string;
}
interface Time {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-book-appointments',
  templateUrl: './book-appointments.component.html',
  styleUrls: ['./book-appointments.component.css']
})
export class BookAppointmentsComponent implements OnInit {

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
userid:any
  constructor( private fb: FormBuilder,private appointmentbook:BookappointmentService) { }

  get appiontmentdate() {
    return this.bookappoinmentForm.get('appointment_date');
  }

  get service() {
    return this.bookappoinmentForm.get('service');
  }
  ngOnInit(): void {
    this.userid=this.appointmentbook.getuserid();
    console.log(this.userid)
    
  }
  bookappoinmentForm = this.fb.group({
  
    appointment_date: ['', Validators.required],
    appointment_mesaage: [''],
    service: ['', Validators.required],
    appoinment_time: ['', Validators.required],
  });


  bookappointment(){
    var appointmet={
      appintment_id :this.userid,
      service  :this.bookappoinmentForm.value.service,
      appointment_date :this.bookappoinmentForm.value.appointment_date,
      appointment_mesaage :this.bookappoinmentForm.value.appointment_mesaage,
      appoinment_time :this.bookappoinmentForm.value.appoinment_time
    }
    this.appointmentbook.bookappointment(appointmet).subscribe((result:any)=>{

    })

  }
}
