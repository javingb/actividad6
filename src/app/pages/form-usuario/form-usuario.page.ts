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
  _id = input<string>();
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
    this.cargarInfo();
  }

  async cargarInfo() {
    if (this._id()) {
      const listaActual = this.usuariosService.usuariosResource.value();
      const usuarioLocal = listaActual?.results.find(u => u._id === this._id());

      if (usuarioLocal) {
          this.esActualizacion.set(true);
          this.usuarioAct.set({ ...usuarioLocal });
          return;
      }
      try {
        const respuesta = await this.usuariosService.getById((this._id()));
        if (respuesta && (respuesta._id || respuesta.id)) {
          this.esActualizacion.set(true);
          this.usuarioAct.set({ ...respuesta });
        } else {
          this.router.navigate(['/not-found']);
        }
      } catch (error) {
        console.error('Error al cargar la información del usuario:', error);
        this.router.navigate(['/not-found']);
      }
    }
  }

  async getDataForm(event: Event) {
    event.preventDefault();
    const userData = this.usuarioAct();

    try {
      if (this.esActualizacion() && this._id()) {
          await this.usuariosService.update(this._id(), userData);

          this.usuariosService.usuariosResource.update(actual => {
            if (actual) {  
              return {...actual, results: actual.results.map(u => u._id === this._id() ? { ...userData, _id: this._id() } : u)};
            }
            return actual;
          });

          await Swal.fire({
            title: '¡Usuario actualizado!',
            text: `Se han guardado los cambios de ${userData.first_name}`,
            icon: 'success',
            confirmButtonColor: '#090909',
          });
          this.router.navigate(['/home']);

      } else {
        const usuarioCreado = await this.usuariosService.create(userData);
        const nuevoUsuario = {...usuarioCreado, _id: usuarioCreado._id ?? crypto.randomUUID(), image: userData.image};

        this.usuariosService.usuariosResource.update(actual => {
          if (actual) {
            return { ...actual, results: [...actual.results, nuevoUsuario]  };
          }
          return actual;
        });

        await Swal.fire({
          title: '¡Usuario registrado!',
          text: `Se ha creado a ${userData.first_name} correctamente`,
          icon: 'success',
          confirmButtonColor: '#090909',
        });
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se ha podido guardar el usuario. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonColor: '#090909',
      });
    }
}
}
