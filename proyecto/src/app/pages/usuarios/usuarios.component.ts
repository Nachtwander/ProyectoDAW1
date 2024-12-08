import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  // Filtros
  searchName: string = ''; // Filtro por nombre
  searchRole: string = ''; // Filtro por rol

  // Datos de usuarios (simula datos de la base de datos)
  usuarios = [
    { id: 1, nombre: 'Juan Pérez', correo: 'juan@example.com', rol: 'Administrador', activo: true },
    { id: 2, nombre: 'Ana López', correo: 'ana@example.com', rol: 'Usuario', activo: false },
    { id: 3, nombre: 'Carlos Méndez', correo: 'carlos@example.com', rol: 'Administrador', activo: true },
    // Agrega más usuarios
  ];

  // Roles disponibles
  roles = ['Administrador', 'Usuario'];

  // Datos del formulario (para agregar/editar usuario)
  formUsuario = {
    id: 0,
    nombre: '',
    correo: '',
    rol: '',
    activo: true
  };

  // Estado del formulario (mostrar u ocultar)
  showForm: boolean = false; // Controla la visibilidad del formulario
  isEditing: boolean = false;

  // Filtrar usuarios dinámicamente
  get filteredUsuarios() {
    return this.usuarios.filter(usuario => {
      return (
        (!this.searchName || usuario.nombre.toLowerCase().includes(this.searchName.toLowerCase())) &&
        (!this.searchRole || usuario.rol === this.searchRole)
      );
    });
  }

  // Método para abrir el formulario de agregar/editar
  openForm(usuario: any = null) {
    if (usuario) {
      // Modo edición
      this.isEditing = true;
      this.formUsuario = { ...usuario };
    } else {
      // Modo creación
      this.isEditing = false;
      this.formUsuario = {
        id: 0,  // Asegurarse de que esté en modo creación
        nombre: '',
        correo: '',
        rol: '',
        activo: true
      };
    }
    this.showForm = true;  // Mostrar el formulario
  }

  // Guardar un usuario (crear o editar)
  saveUsuario() {
    if (this.isEditing) {
      // Editar usuario existente
      const index = this.usuarios.findIndex(u => u.id === this.formUsuario.id);
      if (index !== -1) {
        this.usuarios[index] = { ...this.formUsuario };
      }
    } else {
      // Crear un nuevo usuario
      const newId = this.usuarios.length > 0 ? Math.max(...this.usuarios.map(u => u.id)) + 1 : 1;
      this.usuarios.push({ ...this.formUsuario, id: newId });
    }
    // Reiniciar formulario
    this.resetForm();
  }

  // Eliminar usuario
  eliminarUsuario(id: number) {
    this.usuarios = this.usuarios.filter(u => u.id !== id);
  }

  // Método para cancelar y resetear el formulario
  cancelar() {
    this.resetForm();  // Reiniciar formulario
  }

  // Resetear el formulario
  private resetForm() {
    this.formUsuario = {
      id: 0,
      nombre: '',
      correo: '',
      rol: '',
      activo: true
    };
    this.showForm = false;  // Ocultar el formulario
    this.isEditing = false; // Restablecer el estado de edición
  }
}
