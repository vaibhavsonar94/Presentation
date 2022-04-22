import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class BookappointmentService {
  url = 'http://localhost:3000/api/appointment';
  url2="https://localhost:44341/doctor/login";
  url3="https://localhost:44341/patient/register";
url4="https://localhost:44341/patient/patientlogin"
url5=""


userid:any;
  constructor(private http: HttpClient,private router:Router) {}

  doctorlogin(data:any){
    return this.http.post(this.url2,data)
  }

  patientregistration(data:any){

    return this.http.post(this.url3,data)

  }

  patientlogin(data:any){
    return this.http.post(this.url4,data).subscribe((result:any)=>{
      this.userid=result.id
      console.log(this.userid)
      alert("login successfully")
      this.router.navigate(['/bookappointment'])
    
    }, error=>{
      alert("please enter correct deatils");
    })
    
  }
 
  getuserid(){
    return this.userid
  }

bookappointment(data:any){

  return this.http.post(this.url5,data)

}


  //get id
  getapointmentid() {
    return this.http.get(this.url);
  }

  //save appointment
  saveappointmentData(data: any) {
    console.log(data);
    return this.http.post(this.url, data);
  }

  //get all appointment
  getappointment() {
    return this.http.get(this.url + '/all');
  }

  //get single appointment
  getsingleapointmentdata(id:any) {
    console.log(id)
    return this.http.get(this.url+'/singledata/'+id);
  }
  cancelBooking(id: any) {
    console.log(this.cancelBooking);
    return this.http.delete(`${this.url}/${id}`);
  }

  savecontactdata(data:any){
    console.log(data)
    return this.http.post(this.url+'/contact/',data)
  }
  
}
