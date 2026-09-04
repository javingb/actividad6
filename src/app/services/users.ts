import { Service } from '@angular/core';
import { Injectable,computed, signal} from '@angular/core';
import { IUser } from '../interfaces/iuser';

@Service()
export class Users {}

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private arrayUsers = signal<IUser[]>([{
        id: 1,
        first_name: 'Pepe',
        last_name: 'Domingo Rodriguez',
        username: 'pepe',
        email: 'pepe@gmail.com',
        image: 'https://i.pravatar.cc/500?u=pepe@gmail.com'
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
}