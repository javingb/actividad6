import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser';
import { UsersService } from '../../services/users';

@Component({
  imports: [RouterLink],
  standalone: true,
  selector: 'app-tarjeta-usuario',
  styleUrl: './tarjeta-usuario.component.css',
  templateUrl: './tarjeta-usuario.component.html',
})
export class TarjetaUsuarioComponent {
  @Input({ required: true }) usuario!: IUser;
  private usersService = inject(UsersService);

  borrarUsuario(): void {
    if (confirm(`¿Deseas borrar al usuario ${this.usuario.first_name}?`)) {
      this.usersService.delete(this.usuario.id!);
    }
  }
}
