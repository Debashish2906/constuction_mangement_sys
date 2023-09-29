import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalService } from '../services/global.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  taskId='';
  taskForm: FormGroup;
  isUploading: boolean = false;
  showSpinner: boolean = false;
  usernameMessage: string = '';
  base64Output: string = '';
  imgUrl = '';
  constructor(private router:ActivatedRoute,private http:HttpClient,public loader:NgxUiLoaderService, private _service: GlobalService,   private router1:Router) {
    
    this.taskForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(''),
      place: new FormControl(''),
      desc: new FormControl(''),
      startD:new FormControl(null),
      endD:new FormControl(null)
    });
  }
  minEndDate:any='';
  ngOnInit(): void {
    this.loader.start();
    this.router.params.subscribe((param:any)=>{
      this.taskId=param?.id;
      this.http.get(`http://localhost:5000/user/taskbyid/${this.taskId}`).subscribe((res:any)=>{
        console.log(res);
        this.taskForm = new FormGroup({
          name: new FormControl(res?.data.name),
          price: new FormControl(res.data.price),
          place: new FormControl(res.data.place),
          desc: new FormControl(res.data.desc),
          startD:new FormControl(res.data.startD),
          endD:new FormControl(res.data.endD)
        });
        this.minEndDate=new Date(this.taskForm.get('startD')?.value)
        this.loader.stop();
      })
    })

  }
  
 

  
  
  createTask(event: any) {
    this.loader.start();
    
     this.http.put(`http://localhost:5000/user/update-task/${this.taskId}`,this.taskForm.value).subscribe((res:any)=>{
      this._service.openSnackBar('Task updated successfully')
    
      console.log(res)
      this.router1.navigateByUrl('/tasks');
      this.loader.stop();
     })
  }
  
}
