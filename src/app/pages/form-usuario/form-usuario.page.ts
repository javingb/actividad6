import { Component, inject, input, signal } from '@angular/core';
import { form, FormField, required, email } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser';
import { UsersService } from '../../services/users';
import Swal from 'sweetalert2';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-form-usuario',
  styleUrl: './form-usuario.page.css',
  templateUrl: './form-usuario.page.html',
})
export class FormUsuarioPage {
  id = input<string>();
  usuariosService = inject(UsersService);
  router = inject(Router);
  esActualizacion = signal<boolean>(false);

  usuarioAct = signal<IUser>({first_name: '',last_name: '',username: '',email: '',image: ''});

  readonly formulario = form(this.usuarioAct, (form) => {
    required(form.first_name, { message: 'El nombre es obligatorio' });
    required(form.last_name, { message: 'El apellido es obligatorio' });
    required(form.email, { message: 'El email es obligatorio' });
    email(form.email, { message: 'Introduce un email válido' });
    required(form.image, { message: 'La imagen es obligatoria' });
  });

  ngOnInit() {
    if (this.id()) {
      const usuarioEncontrado = this.usuariosService.getById(Number(this.id()));
      if (usuarioEncontrado) {
        this.esActualizacion.set(true);
        this.usuarioAct.set({ ...usuarioEncontrado });
      } else {
        this.router.navigate(['/not-found']);
      }
    }
  }

  getDataForm(event: Event) {
    event.preventDefault();
    const userData = this.usuarioAct();
    
    if (this.esActualizacion() && this.id()) {
      this.usuariosService.update(Number(this.id()), userData);

      Swal.fire({
        title: '¡Usuario actualizado!',
        text: `Se han guardado los cambios de ${userData.first_name}`,
        icon: 'success',
        confirmButtonColor: '#090909',
      }).then(() => {
        this.router.navigate(['/home']);
      });

    } else {
      this.usuariosService.create(userData);
      
      Swal.fire({
        title: '¡Usuario registrado!',
        text: `Se ha creado a ${userData.first_name} correctamente`,
        icon: 'success',
        confirmButtonColor: '#090909',
      }).then(() => {
        this.router.navigate(['/home']);
      });
    }
  }  
}
