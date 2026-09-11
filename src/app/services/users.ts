import { Service } from '@angular/core';
import { signal, inject} from '@angular/core';
import { IUser, IUsersResponse } from '../interfaces/iuser';
import Swal from 'sweetalert2';
import { HttpClient, httpResource } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Service()
export class UsersService {
    private url: string = 'https://peticiones.online/api/users';    
    private httpClient = inject(HttpClient);

    response = signal<IUsersResponse | null>(null)
    misUsuarios = signal<IUser[]>([])
    usuarioSeleccionado = signal<IUser | null>(null);

    usuariosResource = httpResource<IUsersResponse>(() => this.url);

    getById(_id: string) {    
        return firstValueFrom(this.httpClient.get<IUser>(`${this.url}/${_id}`));
    }

    create(usuarioSeleccionado: IUser): string {
        return 'Usuario creado correctamente';
    }

    update(_id: number, updatedUser: IUser): string {
        return 'Usuario actualizado correctamente';
    }

    delete(id: number): string {
        this.misUsuarios.update(users => users.filter(u => u.id != id));
        return 'Usuario eliminado correctamente';
    }

    deleteConfirmacion(user: IUser, onDeleted?: () => void): void {
        Swal.fire({
        title: '¿Estás seguro?',
        text: `Vas a eliminar a ${user.first_name} ${user.last_name}. Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
        }).then((result) => {
        if (result.isConfirmed) {
            this.delete(Number(user.id));

            Swal.fire({
            title: '¡Eliminado!',
            text: 'El usuario ha sido eliminado correctamente.',
            icon: 'success',
            confirmButtonColor: '#090909'
            }).then(() => {
            if (onDeleted) onDeleted();
            });
        }
        });
    }

}