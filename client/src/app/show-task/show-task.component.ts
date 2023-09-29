import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss'],
})
export class ShowTaskComponent implements OnInit {
  task: Array<any> = [];
  TotalDays:any='';
  remainingDays:any=''
  role=''
  constructor(private http: HttpClient, public loader: NgxUiLoaderService,private router:Router,public _service:GlobalService) {}
  ngOnInit(): void {
    this.loader.start();
    this.http.get('http://localhost:5000/user/tasks').subscribe((res: any) => {
      this.task = res?.data;
     
      
      this.loader.stop();
      this._service.role.subscribe((res:any)=>{
        this.role=res;
      })
      console.log(this.task);
    });
  }
  getTotalDays(startD:any,endD:any){
    return Math.ceil((new Date(endD).getTime() - new Date(startD).getTime()) / (1000 * 60 * 60 * 24))
  }
  getRemainingDays(endD:any){
    
   return  Math.ceil((new Date(endD).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  }
  isOver(endD:any){
     return (new Date(endD).getTime())<(new Date().getTime())
  }

  delete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',

      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`http://localhost:5000/user/delete-task/${id}`)
          .subscribe((res) => {
            this.http.get('http://localhost:5000/user/tasks').subscribe((res: any) => {
              this.task = res?.data;
              Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
            });
          });
      }
    });
  }
  edit(id:any){
    this.router.navigateByUrl(`/edit-task/${id}`);
  }
}
