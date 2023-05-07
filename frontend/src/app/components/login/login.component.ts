import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRes: any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submitLogin(form: any) {
    //console.log(form);
    //console.log(form.value);
    const formValue = form.value;
    this.authService.login(formValue).subscribe((res) => {
      this.loginRes = res;
      console.log(this.loginRes);
      this.router.navigate(['/home']);
    }),
      (error: any) => console.log(error);
  }
}
