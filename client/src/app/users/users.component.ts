import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { map } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent  implements OnInit {
  user:any=[]
  constructor(private http:HttpClient,private router:Router,public loader:NgxUiLoaderService){}
  ngOnInit(){
    this.http.get('http://localhost:5000/user/all-user').subscribe((res:any)=>{
      console.log(res)
       res.users.filter((res:any)=>{
        if(res.role!=='pmanager'){
          return res;
        }
      }).map((res:any)=>{
        this.user.push(res);
      })
      console.log(this.user);
    })
  }
}
