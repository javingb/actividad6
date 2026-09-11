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

  async ngOnInit() {
    if (this._id()) {
        let respuesta = await this.usuariosService.getById((this._id() as string));
        if (respuesta && (respuesta._id || respuesta.id)) {
          this.miUsuario.set(respuesta);
      } else {
          this.router.navigate(['/not-found']);
        }
    }
  }

  borrarUsuario(): void {
    const user = this.miUsuario();
    if (user && user._id !== undefined) {
      this.usuariosService.deleteConfirmacion(user, () => {
        this.router.navigate(['/home']);
      });
    }
  }
}

