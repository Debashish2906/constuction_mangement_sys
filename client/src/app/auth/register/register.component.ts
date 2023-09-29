import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalService } from 'src/app/services/global.service';
import  Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  showSpinner: boolean = false;
  usernameMessage:string='';
  type: string='password';
  constructor(
    private _service: GlobalService,
    public ngxloader: NgxUiLoaderService,
    private router:Router,
    public dialog:MatDialog,
    private http:HttpClient
  ) {
    this.registerForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/),
      ]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
    
    });
  }
  openDialog(name:string){
    this._service.openDialog(name);
 }
 
 closeDialog(){
  this.dialog.closeAll();
}
changeType(){
  if(this.type==='password'){
    this.type='text'
  }
  else{
    this.type='password'
  }
}

  register(event: any) {
    event.preventDefault();
    this.ngxloader.start();
    console.log(this.registerForm.value);
    const reqBody = {
      role: this.registerForm.get('role')?.value,
      name: this.registerForm.get('fname')?.value+this.registerForm.get('lname')?.value,
      phone:this.registerForm.get('phone')?.value,
      password: this.registerForm.get('password')?.value,
      email: this.registerForm.get('email')?.value,
     
    };
    console.log(reqBody, 'kh');
   this.http.post('http://localhost:5000/user/create-user',reqBody).subscribe(
      (res: any) => {
        console.log(res);
        this.ngxloader.stop();
        this.closeDialog();
        Swal.fire('You have Registered Successfully !!',
        'success')
        this.registerForm.reset();
        
      },
      (err) => {
        console.log(err);
        this.showSpinner = false;
        this.ngxloader.stop();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:'Something went wrong!!',
          footer:'Try again...'
          
        })
      }
    );
  }
  reset(event: any) {
    event.preventDefault();
    this.registerForm.reset();
  }
}
