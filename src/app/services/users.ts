import { Service, inject, signal } from '@angular/core';
import { IUser, IUsersResponse } from '../interfaces/iuser';
import Swal from 'sweetalert2';
import { HttpClient, httpResource } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Service()
export class UsersService {
    private url: string = 'https://peticiones.online/api/users';    
    private httpClient = inject(HttpClient);

    // --- Paginación ---
    currentPage = signal<number>(1);
    perPage = signal<number>(12);

    usuariosResource = httpResource<IUsersResponse>(() =>`${this.url}?page=${this.currentPage()}&per_page=${this.perPage()}`);

    totalPaginas(): number {
        const total = this.usuariosResource.value()?.total_pages;
        return total ?? 0;
    }

    irAPagina(pagina: number): void {
        this.currentPage.set(pagina);
    }

    getById(_id: string | undefined) {    
        return firstValueFrom(this.httpClient.get<IUser>(`${this.url}/${_id}`));
    }

    create(user: IUser) {
        return firstValueFrom(this.httpClient.post<IUser>(this.url, user));
    }

    update(_id: string | undefined, updatedUser: IUser) {
        return firstValueFrom(this.httpClient.put<IUser>(`${this.url}/${_id}`, updatedUser));
    }

    delete(_id: string | undefined) {
        return firstValueFrom(this.httpClient.delete<IUser>(`${this.url}/${_id}`));
    }

    deleteConfirmacion(user: IUser, onDeleted?: () => void) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `Vas a eliminar a ${user.first_name} ${user.last_name}. Esta acción no se puede deshacer.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {

            if (result.isConfirmed) {
                try {
                    const respuestaBorrado = await this.delete(user._id);
                    console.log('Respuesta del DELETE:', respuestaBorrado);
                    this.usuariosResource.update(actual => {
                        if (actual) {
                            return { ...actual, results: actual.results.filter(u => u._id !== user._id) };
                        }
                        return actual;
                    });
                    Swal.fire({
                        title: '¡Eliminado!',
                        text: 'El usuario ha sido eliminado correctamente.',
                        icon: 'success',
                        confirmButtonColor: '#090909'
                    }).then(() => {
                        if (onDeleted) onDeleted();
                    });
                } catch (error) {
                console.error('Error al eliminar el usuario:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Hubo un problema al eliminar el usuario. Por favor, inténtalo de nuevo.',
                    icon: 'error',
                    confirmButtonColor: '#090909'
                });
                }
            }
        });
    }
}