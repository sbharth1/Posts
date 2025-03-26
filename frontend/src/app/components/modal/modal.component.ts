import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})

export class ModalComponent implements OnInit {
  modalForm!: FormGroup;
  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.modalForm = this.fb.group({
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
     console.log(file,'---- image file')
      this.modalForm.patchValue({
        image: file
      });
    }                                                                                                    
  }
  

  onAddPost() {
    if (this.modalForm.valid) {
      const formData = this.modalForm.value;
      console.log(formData);
      this.modalForm.reset();
      this.toastr.success('Post added successfully');
    } else {
      this.toastr.error('Both fields are required..');  
      alert("Both fields are required..");
    }
  }
}

