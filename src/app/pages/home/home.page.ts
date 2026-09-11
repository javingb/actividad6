import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users';
import { TarjetaUsuarioComponent } from '../../components/tarjeta-usuario/tarjeta-usuario.component';
@Component({
  imports: [TarjetaUsuarioComponent],
  selector: 'app-home',
  styleUrl: './home.page.css',
  templateUrl: './home.page.html',
})
export class HomePage {
  private usersService = inject(UsersService);
  misUsuarios = this.usersService.usuariosResource;
}
