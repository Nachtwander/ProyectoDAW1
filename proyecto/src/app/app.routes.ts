import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./pages/usuarios/usuarios.component').then(
        (m) => m.UsuariosComponent
      ),
  },
  {
    path: 'productos',
    loadComponent: () =>
      import('./pages/productos/productos.component').then(
        (m) => m.ProductosComponent
      ),
  },
];

