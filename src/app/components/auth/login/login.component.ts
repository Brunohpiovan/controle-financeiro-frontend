import { LoginService } from './../../../services/auth/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciais } from 'src/app/models/credenciaisLogin';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;


   creds : Credenciais = {
      login :'',
      senha :''
  }

  constructor(
    private fb: FormBuilder,
    private service:LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.creds.login = this.username?.value;
      this.creds.senha = this.password?.value;
      this.logar()
    } else {
      this.loginForm.markAllAsTouched();
    }
  }


  logar() {
    this.service.authenticate(this.creds).subscribe({
      next: (response) => {
        const token = response.token;

        if (token) {
          this.service.sucessfullLogin(token);
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.id;
          this.service.setUserId(userId);
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        //this.isLoading = false;
        const msgErro = err.error?.message || '';
        if (msgErro.includes('permissão para acessar o sistema')) {
          //this.mensagemErro = msgErro;
        } else {
         // this.usersenha = true;
        }
      },
      complete: () => {
        //this.isLoading = false;
      }
    });
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

}


