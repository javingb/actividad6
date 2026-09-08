import { Component, inject, input, OnInit, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser';
import { UsersService } from '../../services/users';

@Component({
  imports: [FormField],
  selector: 'app-form-usuario',
  styleUrl: './form-usuario.page.css',
  templateUrl: './form-usuario.page.html',
})
export class FormUsuarioPage {
  id = input<string>();
  usuariosService = inject(UsersService);
  router = inject(Router);
  esActualizacion = signal<boolean>(false);

  userModel = signal<IUser>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: '',
  });

  readonly formulario = form(this.userModel, (form) => {
    // Aquí irían las validaciones personalizadas
  });

  getDataForm(event: Event) {
    event.preventDefault();
    

  }
  
  
}
