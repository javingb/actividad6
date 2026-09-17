import { Component, input, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users';
import { IUser } from '../../interfaces/iuser';
import { FichaUsuarioComponent } from '../../components/ficha-usuario/ficha-usuario.component';
@Component({
  imports: [FichaUsuarioComponent],
  selector: 'app-info-usuario',
  styleUrl: './info-usuario.page.css',
  templateUrl: './info-usuario.page.html',
})
export class InfoUsuarioPage {

  _id = input<string>();
  usuariosService = inject(UsersService);
  miUsuario = signal<IUser>({_id: '', first_name: '', last_name: '', username: '', email: '', image: ''});
  private router = inject(Router);

  ngOnInit() {
      this.cargarInfo();
  }

  async cargarInfo() {
    if (this._id()) {

      const listaActual = this.usuariosService.usuariosResource.value();
      const usuarioLocal = listaActual?.results.find(u => u._id === this._id());

      if (usuarioLocal) {
          this.miUsuario.set(usuarioLocal);
          return;
      }
      try {
        const respuesta = await this.usuariosService.getById((this._id()));
        if (respuesta && (respuesta._id || respuesta.id)) {
          this.miUsuario.set(respuesta);
        } else {
          this.router.navigate(['/not-found']);
        }
      } catch (error) {
        console.error('Error al cargar la información del usuario:', error);
        this.router.navigate(['/not-found']);
      }
    }
  }
}

