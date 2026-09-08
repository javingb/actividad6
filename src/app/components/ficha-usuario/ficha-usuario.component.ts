import { Component, input, output} from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser';

@Component({
  imports: [RouterLink],
  selector: 'app-ficha-usuario',
  styleUrl: './ficha-usuario.component.css',
  templateUrl: './ficha-usuario.component.html',
})
export class FichaUsuarioComponent {
  usuario = input.required<IUser>();
  alBorrar = output<void>();

  borrarUsuario(): void {
    this.alBorrar.emit();
  }

}
