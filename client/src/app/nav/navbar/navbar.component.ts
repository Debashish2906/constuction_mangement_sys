import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit{
  constructor(private service:GlobalService,private router:Router){}
  isLogIn=false;
  role='';
  ngOnInit(): void {
    this.service.isLoggedIn.subscribe((res:any)=>{
      this.isLogIn=res;
    })
    this.service.role.subscribe((res:any)=>{
      this.role=res;
    })
    if(!sessionStorage.getItem('token')){
      this.openDialog('login');
    }
  }
  Logout(){
    this.service.isLoggedIn.next(false);
    this.router.navigateByUrl('/')
  }
  openDialog(name:string){
    this.service.openDialog(name);
  }
}
