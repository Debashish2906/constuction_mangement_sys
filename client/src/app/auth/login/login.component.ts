import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  showSpinner: boolean = false;
  usernameMessage:string='';
  type='password';
  constructor(
    private _service: GlobalService,
    public ngxloader: NgxUiLoaderService,
    public dialog:MatDialog,
    private http:HttpClient,
    private router:Router
  ) {
    this.loginForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.minLength(6)]),
    
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
  login(event: any) {
    event.preventDefault();
    this.ngxloader.start();
    console.log(this.loginForm.value);
    
    const reqBody = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    console.log(reqBody, 'kh');
    this.http.post('http://localhost:5000/user/login',reqBody).subscribe(
      (res: any) => {
        if(res.status===1)
        {
          this._service.openSnackBar(res.message);
          this.closeDialog();
          return;
        }
        this.showSpinner = false;
        this._service.openSnackBar('Login successful !!!');
        this._service.isLoggedIn.next(true);
        this._service.role.next(res.user.role);
        this.closeDialog();
       this.router.navigateByUrl('/')
        this.loginForm.reset();
        this.ngxloader.stop();
      },
      (err) => {
        console.log(err);
        this.showSpinner = false;
        this.ngxloader.stop();
        this._service.openSnackBar('Something went wrong!');
      }
    );
  }
  
}
