import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, ReplaySubject } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2';
// import 'animate.css';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  taskForm: FormGroup;
  isUploading: boolean = false;
  showSpinner: boolean = false;
  usernameMessage: string = '';
  base64Output: string = '';
  imgUrl = '';
  constructor(
    private _service: GlobalService,
    public ngxloader: NgxUiLoaderService,
    public dialog: MatDialog,
    private http: HttpClient,
    private router:Router
  ) {
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      place: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      startD:new FormControl(null),
      endD:new FormControl(null)
    });
  }

  onFileSelected(event: any) {
    this.isUploading = true;

    const file = event.target.files[0];
    console.log(file);
    if (!(file.name.includes('jpg') || file.name.includes('png'))) {
      this.isUploading =false
      Swal.fire({
        title: 'Only JPG and PNG file accepted.',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    console.log(formData.get('file'), 'formData');

    this.http.post('http://localhost:5000/user/upload', formData).subscribe(
      (res: any) => {
        this.isUploading = false;
        this.imgUrl = res.url;
        this._service.openSnackBar('Image uploaded successfully!');
        console.log(this.imgUrl);
        console.log(res);
      },
      (err) => {
        this.isUploading = false;
        console.log(err);
      }
    );
    // this.isUploading=false;
  }

  openDialog(name: string) {
    this._service.openDialog(name);
  }
  closeDialog() {
    this.dialog.closeAll();
  }
  createTask(event: any) {
    this.ngxloader.start();
    const reqBody = {
      name: this.taskForm.get('name')?.value,
      price: this.taskForm.get('price')?.value,
      images: this.imgUrl,
      place: this.taskForm.get('place')?.value,
      desc: this.taskForm.get('desc')?.value,
      startD:this.taskForm.get('startD')?.value,
      endD:this.taskForm.get('endD')?.value
    };
    console.log(reqBody,"reqBody")
     this.http.post('http://localhost:5000/user/addTask',reqBody).subscribe((res:any)=>{
      this._service.openSnackBar('Task added successfully')
    
      console.log(res)
      this.ngxloader.stop();
      this.router.navigateByUrl('/tasks');
     })
  }
}
