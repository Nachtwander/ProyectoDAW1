import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private _router: Router = inject(Router);

  toUsuarios() {
    this._router.navigate(['/usuarios']);
  }

  toProductos() {
    this._router.navigate(['/productos']);
  }

}
