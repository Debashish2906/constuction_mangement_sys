import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  baseUrl:string='http://localhost:8081/user/';
  constructor(private http:HttpClient,private _snackBar: MatSnackBar,public dialog: MatDialog) { }

  isLoggedIn=new BehaviorSubject(false);
  role=new BehaviorSubject('contractor');
  openDialog(form: string) {
    if (form === 'login') this.dialog.open(LoginComponent,{
      disableClose:true
    });
    else this.dialog.open(RegisterComponent,{disableClose:true});
  }
  postRequest(body:any){
    console.log(body,"ds")
   return this.http.post(this.baseUrl,body);
  }
  getRequest(body:any){
    return this.http.get(`${this.baseUrl}check-username/${body}`);
  }
  openSnackBar(msg:string) {
    this._snackBar.open(msg, 'Splash', {
      horizontalPosition:'right',
      verticalPosition:'top',
    });
  }
}
