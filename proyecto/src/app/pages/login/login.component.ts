import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  AbstractControl,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { loginDto } from '../../models/loginDTO';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, // Importa el módulo que incluye NgIf
    ReactiveFormsModule, // Para los formularios reactivos
    FormsModule,
    RouterModule, // Para la navegación entre rutas
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);

  spinner: boolean = false;
  disabled: boolean = false;

  loginForm: FormGroup = this._formBuilder.group({
    correo: ['', [Validators.required, Validators.email]],
    contraseña: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {}

  //get para verificar si el formulario es invalido y si es true desativa el boton con [disabled]
  get isFormInvalid(): boolean {
    return this.loginForm.invalid;
  }

  //get que verifica que el campo correo no sea nulo, si el usuario no ingresa un correo valido
  get isEmailRequired(): boolean {
    const control: AbstractControl | null = this.loginForm.get('correo');
    return control ? control.hasError('required') && control.touched : false;
  }

  //get para verificar que el email sea valido
  get isEmailInvalid(): boolean {
    const control: AbstractControl | null = this.loginForm.get('correo');
    return control ? control.hasError('email') && control.touched : false;
  }

  //get que verifica que el campo contraseña no sea nulo
  // y toca sin ingresar datos se mostrara nota*
  //get para que password no sea menor de 6 caracteres
  get isPasswordMinLengthInvalid(): boolean {
    const control: AbstractControl | null = this.loginForm.get('contraseña');
    if (control && control.touched) {
      return control.hasError('minlength') || control.value.length < 6;
    }
    return false;
  }

  //get ppara verificar que el campo usuario no este null
  get isEmailNull(): boolean {
    const control: AbstractControl | null = this.loginForm.get('correo');
    return control ? control.invalid && control.touched : false;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.disabled = true;
      this.spinner = true;
      //que parsee informacion de la variable que implementa loginDto a la de loginform como loginDTO
      const login: loginDto = this.loginForm.value as loginDto;

      // IMPLEMENTAR AUTHSERVICE AQUI Y VER SI SE LOGEA EN LA BASE DE DATOS

      // Simula un proceso de autenticación (EJEMPLO DE COMO USAR EL SPINNER Y EL _router))
      setTimeout(() => {
        this.spinner = false;
        this.disabled = false;
        alert('Inicio de sesión exitoso');
        this._router.navigate(['/home']);
      }, 2000);
    } else {
      alert('Por favor completa todos los campos correctamente.');
    }
  }

  toRegistro() {
    this._router.navigate(['/registro']);
  }
}
