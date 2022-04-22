import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BookappointmentService } from '../../bookappointment.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogSubmitComponent } from '../dialog-submit/dialog-submit.component';
import * as moment from 'moment';

interface department {
  value: string;
  viewValue: string;
}
interface Time {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-cancel-appointment',
  templateUrl: './cancel-appointment.component.html',
  styleUrls: ['./cancel-appointment.component.css'],
})

export class CancelAppointmentComponent implements OnInit {

  todayDate=new Date

  departments: department[] = [
    { value: 'Labaratory analysis', viewValue: 'Labaratory analysis' },
    { value: 'Cardiology', viewValue: 'Cardiology' },
    { value: 'Neurology', viewValue: 'Neurology' },
    { value: 'Dental service', viewValue: 'Dental service' },
  ];

  time: Time[] = [
    { value: '10:00', viewValue: '10:00AM' },
    { value: '12:00', viewValue: '12:00AM' },
    { value: '2:00', viewValue: '2:00PM' },
    { value: '4:00', viewValue: '4:00PM' },
  ];
  id:any;
  constructor(
    private fb: FormBuilder,
    private appointment: BookappointmentService,
    public dialog: MatDialog,
    public route:ActivatedRoute
  ) {}
  bookappoinmentForm = this.fb.group({
    // userid:[''],
    id:['',Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    phone_number: ['',[Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
    appointment_date: ['', Validators.required],
    appointment_mesaage: [''],
    service: ['', Validators.required],
    appoinment_time: ['', Validators.required],
  });

  get fname() {
    return this.bookappoinmentForm.get('first_name');
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
  
    this.getappointments()
    // this.getappointment()

  }


data:any
  getappointment(id:any){
    // console.log(ha)
    //  debugger
    // const app=this.bookappoinmentForm.value.id
    //  const app= parseInt(this.bookappoinmentForm.value.id)
    // console.log(app)
    this.appointment.getsingleapointmentdata(this.bookappoinmentForm.value.id).subscribe((result)=>{
      console.log(this.bookappoinmentForm.value.id)
      this.data=result;
    let ha = moment(this.data.appointment_date).format('YYYY-MM-DD');
    let dt= new Date(parseInt(this.data.appoinment_time));
    var hours = dt.getHours();
    let minutes= dt.getMinutes();
    let  finalTime = hours + ":" + minutes; 
    // const sa=parseInt(finalTime)
    // console.log(typeof(finalTime))
      console.log(finalTime)
      // this.bookappoinmentForm.controls['id'].setValue(this.data.id)
      this.bookappoinmentForm.controls['first_name'].setValue(this.data.first_name)
      this.bookappoinmentForm.controls['last_name'].setValue(this.data.last_name)
      this.bookappoinmentForm.controls['phone_number'].setValue(this.data.phone_number) 
      this.bookappoinmentForm.controls['appointment_date'].setValue(ha)
      this.bookappoinmentForm.controls['appointment_mesaage'].setValue(this.data.appointment_mesaage)
      this.bookappoinmentForm.controls['service'].setValue(this.data.service)
      this.bookappoinmentForm.controls['appoinment_time'].setValue(this.data.appoinment_time)
      // this.getappointments()
      alert("Are You Sure You want to Cancel the Booking")
    })

  }

  cancelappointment(id:any){
   
   this.appointment.cancelBooking(this.bookappoinmentForm.value.id).subscribe((result)=>{
    alert("Cancel Booking Successfully");
   this.bookappoinmentForm.reset({})
    
   })
  }

  getappointments(){
    this.appointment.getappointment().subscribe((data)=>{
     console.log(data)
    })
  }



  
}
