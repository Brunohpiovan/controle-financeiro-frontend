import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

   loginForm!: FormGroup;
   hidePassword = true;
   hidePassword2 = true;

   constructor(private fb: FormBuilder) {}

   ngOnInit(): void {
     this.loginForm = this.fb.group({
       username: ['', [Validators.required, Validators.minLength(3)]],
       password: ['', [Validators.required, Validators.minLength(6)]],
       confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
     });
   }

   onSubmit(): void {
     if (this.loginForm.valid) {
       const { username, password } = this.loginForm.value;
       console.log('Login attempt:', username, password);
     } else {
       this.loginForm.markAllAsTouched();
     }
   }

   get username() {
     return this.loginForm.get('username');
   }
   get password() {
     return this.loginForm.get('password');
   }

   get confirmPassword() {
     return this.loginForm.get('confirmPassword');
   }
}
