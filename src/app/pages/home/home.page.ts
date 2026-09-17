import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users';
import { TarjetaUsuarioComponent } from '../../components/tarjeta-usuario/tarjeta-usuario.component';
@Component({
  imports: [TarjetaUsuarioComponent],
  selector: 'app-home',
  styleUrl: './home.page.css',
  templateUrl: './home.page.html',
})
export class HomePage {
  usersService = inject(UsersService);
  misUsuarios = this.usersService.usuariosResource;

  paginas(): number[] {
    const totalPages = this.usersService.totalPaginas();
    const resultado: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
        resultado.push(i);
    }
    return resultado;
  }

  irAPagina(pagina: number): void {
    this.usersService.irAPagina(pagina);
  }

}
