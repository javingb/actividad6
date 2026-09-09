import { Component, input, inject } from '@angular/core';
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
  usuario = input.required<IUser>();
  private usersService = inject(UsersService);

  borrar(): void {
    this.usersService.deleteConfirmacion(this.usuario());
  }
}
