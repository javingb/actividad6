import { Component, input, inject} from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser';
import { UsersService } from '../../services/users';

@Component({
  imports: [RouterLink],
  selector: 'app-ficha-usuario',
  styleUrl: './ficha-usuario.component.css',
  templateUrl: './ficha-usuario.component.html',
})
export class FichaUsuarioComponent {
  usuario = input.required<IUser>();
  private usersService = inject(UsersService);
  private router = inject(Router);

  onDelete() {
    this.usersService.deleteConfirmacion(this.usuario(), () => {
        this.router.navigate(['/home']);
    });
}

}
