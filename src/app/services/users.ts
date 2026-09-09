import { Service } from '@angular/core';
import { Injectable,computed, signal} from '@angular/core';
import { IUser } from '../interfaces/iuser';
import Swal from 'sweetalert2';

@Service()
export class Users {}

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private arrayUsers = signal<IUser[]>([
    {
        id: 1,
        first_name: 'Pepe',
        last_name: 'Domingo Rodriguez',
        username: 'pepe',
        email: 'pepe@gmail.com',
        image: 'https://i.pravatar.cc/500?u=pepe123'
    },
    {
        id: 2,
        first_name: 'María',
        last_name: 'García López',
        username: 'mariag',
        email: 'maria.garcia@gmail.com',
        image: 'https://i.pravatar.cc/500?u=maria.garcia@gmail.com'
    },
    {
        id: 3,
        first_name: 'Carlos',
        last_name: 'Fernández Ruiz',
        username: 'carlosf',
        email: 'carlos.fernandez@gmail.com',
        image: 'https://i.pravatar.cc/500?u=carlos.fernandez@gmail.com'
    },
    {
        id: 4,
        first_name: 'Lucía',
        last_name: 'Martínez Sánchez',
        username: 'luciam',
        email: 'lucia.martinez@gmail.com',
        image: 'https://i.pravatar.cc/500?u=lucia.martinez@gmail.com'
    },
    {
        id: 5,
        first_name: 'Javier',
        last_name: 'Torres Gómez',
        username: 'javit',
        email: 'javier.torres@gmail.com',
        image: 'https://i.pravatar.cc/500?u=javier.torres@gmail.com'
    },
    {
        id: 6,
        first_name: 'Ana',
        last_name: 'Pérez Molina',
        username: 'anap',
        email: 'ana.perez@gmail.com',
        image: 'https://i.pravatar.cc/500?u=ana.perez@gmail.com'
    }
]);

    private currentId: number = 2;
    misUsuarios = computed(() => this.arrayUsers());

    getAll() {
        return this.misUsuarios;
    }

    getById(id: number): IUser | undefined {    
        return this.arrayUsers().find(u => u.id == id);
    }

    create(user: IUser): string {
        user.id = this.currentId++;
        this.arrayUsers.update(users => [...users, user]);
        return 'Usuario creado correctamente';
    }

    update(id: number, updatedUser: IUser): string {
        this.arrayUsers.update(users =>
        users.map(u => (u.id == id ? { ...updatedUser, id: u.id } : u))
        );
        return 'Usuario actualizado correctamente';
    }

    delete(id: number): string {
        this.arrayUsers.update(users => users.filter(u => u.id != id));
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