import { Component,OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {

  modalForm!: FormGroup;
  constructor(private fb: FormBuilder,private toastr:ToastrService) {}


  ngOnInit(): void {
    this.modalForm = this.fb.group({
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }


  onAddPost() { 
    if(this.modalForm.valid){
      const formData = this.modalForm.value;
      console.log(formData);
      this.modalForm.reset();
      this.toastr.success('Post added successfully');
    }else{
      alert('fill all fields...');
    }
  }
}
