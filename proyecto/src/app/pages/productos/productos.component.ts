import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {
  productItems: any[] = [];
  categories: any[] = [];
  filteredProducts: any[] = [];
  searchName: string = '';
  searchCategory: string = '';

  isModalOpen: boolean = false;
  editingProduct: boolean = false;
  formProduct: any = {};

  constructor() {
    // Datos de ejemplo para categorías y productos
    this.categories = [
      { id: '1', nombre: 'Electrónica' },
      { id: '2', nombre: 'Ropa' },
      { id: '3', nombre: 'Alimentos' },
    ];
    this.productItems = [
      { id: 1, nombre: 'Laptop', categoria: '1', precio: 1000, cantidad: 10, marca: 'Dell' },
      { id: 2, nombre: 'Camiseta', categoria: '2', precio: 20, cantidad: 50, marca: 'Nike' },
      { id: 3, nombre: 'Jugo', categoria: '3', precio: 3, cantidad: 100, marca: 'Tropicana' },
    ];
    // Inicializamos los productos filtrados con todos los productos
    this.filteredProducts = [...this.productItems];
  }

  // Método para aplicar los filtros de búsqueda
  onFilterChange() {
    this.filteredProducts = this.productItems.filter((product) => {
      const matchesName = product.nombre.toLowerCase().includes(this.searchName.toLowerCase());
      const matchesCategory = !this.searchCategory || product.categoria === this.searchCategory;
      return matchesName && matchesCategory;
    });
  }

  // Método para abrir el modal de agregar producto
  onAddProduct() {
    this.formProduct = {};
    this.editingProduct = false;
    this.isModalOpen = true;
  }

  // Método para abrir el modal de editar producto
  onEditProduct(product: any) {
    this.formProduct = { ...product };  // Copia el producto a editar
    this.editingProduct = true;
    this.isModalOpen = true;
  }

  // Método para eliminar un producto
  onDeleteProduct(productId: number) {
    this.productItems = this.productItems.filter((p) => p.id !== productId);
    this.onFilterChange(); // Reaplicar el filtro para actualizar la lista de productos
  }

  // Método para cerrar el modal
  onCloseModal() {
    this.isModalOpen = false;
  }

  // Método para agregar o actualizar un producto
  onSubmitProduct() {
    if (this.editingProduct) {
      // Actualiza el producto existente
      const index = this.productItems.findIndex((p) => p.id === this.formProduct.id);
      if (index !== -1) {
        this.productItems[index] = { ...this.formProduct };
      }
    } else {
      // Agrega un nuevo producto
      this.formProduct.id = this.productItems.length + 1;  // Asigna un ID único
      this.productItems.push({ ...this.formProduct });
    }
    this.onCloseModal(); // Cierra el modal
    this.onFilterChange(); // Reaplica el filtro para actualizar la lista de productos
  }

  // Método para obtener el nombre de la categoría
  getCategoryName(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.nombre : 'Categoría no encontrada';
  }
}

