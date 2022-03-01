import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StudentDashModel } from './studentdash.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-studentdash',
  templateUrl: './studentdash.component.html',
  styleUrls: ['./studentdash.component.css']
})
export class StudentdashComponent implements OnInit {

  formvalue:FormGroup;
  studentModal: StudentDashModel = new StudentDashModel();
  studentAll:any;
  showAdd:boolean;
  showUpdate:boolean;
  constructor(private formBuilder: FormBuilder, private http:HttpClient, private api:ApiService) { }

  ngOnInit(): void {
    this.formvalue = this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      mNumber:[''],
      fees:['']
    })
    this.getAllStudentdata()
  }
getClear(){
  this.formvalue.reset();
  this.showAdd =true
  this.showUpdate =false;
}
  postStudentDetails(){
    this.studentModal.firstName = this.formvalue.value.firstName;
    this.studentModal.lastName = this.formvalue.value.lastName;
    this.studentModal.email = this.formvalue.value.email;
    this.studentModal.mNumber = this.formvalue.value.mNumber;
    this.studentModal.fees = this.formvalue.value.fees;

    this.api.postStudent(this.studentModal).subscribe(
      (res) => {
        console.log(res);
        this.formvalue.reset()
        this.getAllStudentdata()
        alert('Student Records Added Successfully');
      },
      (err) => {
        alert('somethin gwent wrong');
      }
    );
  }
  getAllStudentdata(){
    this.api.getStudent().subscribe((res)=>{
      this.studentAll= res
    },(err)=>{
      return err
    })
  }

  deleteStudentDetail(data:any){
    this.api.deleteStudent(data.id).subscribe((res)=>{
      this.getAllStudentdata();
      
    })
  }

  onEdit(data:any){
    this.showAdd = false
    this.showUpdate = true;
    this.studentModal.id = data.id
    this.formvalue.controls['firstName'].setValue(data.firstName);
    this.formvalue.controls['lastName'].setValue(data.lastName);
    this.formvalue.controls['email'].setValue(data.email);
    this.formvalue.controls['mNumber'].setValue(data.mNumber);
    this.formvalue.controls['fees'].setValue(data.fees);
    this.getAllStudentdata()
  }
  updateStudentDetails(){
    this.studentModal.firstName =this.formvalue.value.firstName;
    this.studentModal.lastName = this.formvalue.value.lastName;
    this.studentModal.email =this.formvalue.value.email;
    this.studentModal.mNumber = this.formvalue.value.mNumber;
    this.studentModal.fees =this.formvalue.value.fees;
    this.api.updateStudent(this.studentModal,this.studentModal.id).subscribe((res)=>{
      this.formvalue.reset();
      this.getAllStudentdata()
    })
  }
}
