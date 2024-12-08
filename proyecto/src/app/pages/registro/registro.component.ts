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
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule, // Importa el módulo que incluye NgIf
    ReactiveFormsModule, // Para los formularios reactivos
    FormsModule,
    RouterModule, // Para la navegación entre rutas
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);

  spinner: boolean = false;
  disabled: boolean = false;

  registerForm: FormGroup = this._formBuilder.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    contraseña: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() {}

  //get para verificar si el formulario es invalido y si es true desativa el boton con [disabled]
  get isFormInvalid(): boolean {
    return this.registerForm.invalid;
  }

  //get ppara verificar que el campo nombre no este null
  get isNombreNull(): boolean {
    const control: AbstractControl | null = this.registerForm.get('nombre');
    return control ? control.invalid && control.touched : false;
  }

  //get ppara verificar que el campo apellido no este null
  get isApellidoNull(): boolean {
    const control: AbstractControl | null = this.registerForm.get('apellido');
    return control ? control.invalid && control.touched : false;
  }

  //get que verifica que el campo correo no sea nulo, si el usuario no ingresa un correo valido
  get isEmailRequired(): boolean {
    const control: AbstractControl | null = this.registerForm.get('correo');
    return control ? control.hasError('required') && control.touched : false;
  }

   //get para verificar que el email sea valido
   get isEmailInvalid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('correo');
    return control ? control.hasError('email') && control.touched : false;
  }

  //get que verifica que el campo contraseña no sea nulo
  // y toca sin ingresar datos se mostrara nota*
  //get para que password no sea menor de 6 caracteres
  get isPasswordMinLengthInvalid(): boolean {
    const control: AbstractControl | null = this.registerForm.get('contraseña');
    if (control && control.touched) {
      return control.hasError('minlength') || control.value.length < 6;
    }
    return false;
  }


  onRegistro() {
    if (this.registerForm.valid) {
      this.disabled = true;
      this.spinner = true;
      //que parsee informacion de la variable que implementa loginDto a la de loginform como loginDTO
      const login: loginDto = this.registerForm.value as loginDto;

      // IMPLEMENTAR AUTHSERVICE AQUI Y VER SI SE REGISTRA EN LA BASE DE DATOS

      // Simula un proceso de autenticación (EJEMPLO DE COMO USAR EL SPINNER Y EL _router))
      setTimeout(() => {
        this.spinner = false;
        this.disabled = false;
        alert('Registro exitoso');
        this._router.navigate(['/login']);
      }, 2000);
    } else {
      alert('Por favor completa todos los campos correctamente.');
    }
  }

  toLogin() {
    this._router.navigate(['/login']);
  }
}
