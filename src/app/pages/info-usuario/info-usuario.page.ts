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

  id = input<string>();
  usuariosService = inject(UsersService);
  miUsuario = signal<IUser>({id: 0, first_name: '', last_name: '', username: '', email: '', image: ''});
  private router = inject(Router);

  ngOnInit() {
    if (this.id()) {
      let respuesta = this.usuariosService.getById(Number(this.id()));
      if (respuesta) {
        this.miUsuario.set(respuesta);
      }
      else {
        // Si no se encuentra el usuario, redirigir a la página 404
        this.router.navigate(['/not-found']);
      }
    }   
  }

  borrarUsuario(): void {
      const user = this.miUsuario();
      if (user && confirm(`¿Estás seguro de eliminar a ${user.first_name} ${user.last_name}?`)) {
        this.usuariosService.delete(user.id!);
        this.router.navigate(['/home']);
      }
  }

}
