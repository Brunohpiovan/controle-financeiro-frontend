import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Credenciais } from 'src/app/models/credenciaisLogin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userId: string | null = null;

  jwtService : JwtHelperService = new JwtHelperService;

  constructor(private http:HttpClient,private router:Router) { }

  authenticate(creds:Credenciais){
    return this.http.post<{
      token: string
    }>(`${environment.baseUrl}/auth/login`, creds);
  }

  sucessfullLogin(authToken:string){
    localStorage.setItem('token',authToken);
    const decodedToken = this.jwtService.decodeToken(authToken);
    const userId = decodedToken?.id;
    this.userId = userId;
  }

  isAuthenticate(){
    let token = localStorage.getItem('token');
    if(token!=null){
      return !this.jwtService.isTokenExpired(token)
    }
    return false;
  }

  async logout() {
    try {
      localStorage.clear();
      this.userId = null;
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao finalizar log:', error);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setUserId(id: string): void {
    this.userId = id;
    localStorage.setItem('userId', id);
  }

  getUserId(): string | null {
    if (this.userId) {
      return this.userId;
    }
    return localStorage.getItem('userId');
  }
}
