import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/authRequest';
import { UserService } from 'src/app/services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private MessageService: MessageService,
    private router: Router
  ) {}

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);

            this.MessageService.add({
              severity: 'sucess',
              summary: 'sucesso',
              detail: `Bem vindo de volta ${response?.name}!`,
              life: 2000,
            })
          }
        },
        error: (err) => {
          this.MessageService.add({
            severity: 'error',
            summary: 'erro',
            detail: `Erro ao fazer login!`,
            life: 2000,
          });
          console.log(err);
      },
    });
  }
}

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService
      .signupUser(this.signupForm.value as SignupUserRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            this.signupForm.reset();
            this.loginCard = true;
            this.MessageService.add({
              severity: 'sucess',
              summary: 'sucesso',
              detail: 'Usuário criado com sucesso!',
              life: 2000,
          });
        }
      },
        error: (err) => {
          this.MessageService.add({
            severity: 'error',
            summary: 'erro',
            detail: `Erro ao criar usuário!`,
            life: 2000,
      });
      console.log(err);
    },
  });
}
}
}
