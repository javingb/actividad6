# Actividad 6 — Gestión de Usuarios (Angular + API REST)

Aplicación Angular que consume una API externa para listar, ver el detalle, crear, actualizar y eliminar usuarios.


## API

Este proyecto consume la API pública y educativa de [peticiones.online](https://peticiones.online):

```
https://peticiones.online/api/users
```

| Método | Endpoint | Acción |
|---|---|---|
| GET ALL| `/api/users?page=X&per_page=Y` | Listado paginado de usuarios |
| GET BY ID | `/api/users/:_id` | Detalle de un usuario |
| CREATE | `/api/users` | Crear un usuario |
| UPDATE | `/api/users/:_id` | Actualizar un usuario |
| DELETE | `/api/users/:_id` | Eliminar un usuario |

> ⚠️ **Importante — API mockeada:** esta API  **no persiste los cambios** en su base de datos: aunque el `POST`, `PUT` y `DELETE` responden correctamente (código 200 con el objeto correspondiente), un `GET` posterior sigue devolviendo siempre el mismo conjunto de datos original. Para que la aplicación sea usable a pesar de esto, tras cada creación/actualización/borrado se actualiza también la copia local en memoria (`usuariosResource`), de forma que los cambios se reflejan al instante en la interfaz durante la sesión.
>
> Como la paginación del listado (`/home`) pide una página distinta al servidor cada vez que el usuario navega entre páginas, si cambias de página después de crear, editar o borrar un usuario, es posible que ese cambio "desaparezca" visualmente (porque el servidor vuelve a devolver los datos originales). Es un efecto secundario inevitable de trabajar con esta API sin persistencia real, no un fallo de la aplicación.
>

## Rutas

| Ruta | Página | Descripción |
|---|---|---|
| `/home` | `HomePage` | Listado de usuarios paginado |
| `/user/:_id` | `InfoUsuarioPage` | Detalle de un usuario |
| `/newuser` | `FormUsuarioPage` | Formulario de creación |
| `/updateuser/:_id` | `FormUsuarioPage` | Formulario de actualización (reutiliza el mismo componente) |
| `/not-found` | `NotFoundPage` | Página 404 (usuario o ruta no encontrada) |

## Estructura del proyecto

```
src/app/
├── components/
│   ├── navbar/             → Barra de navegación superior
│   ├── tarjeta-usuario/    → Tarjeta de usuario del listado (home)
│   └── ficha-usuario/      → Tarjeta de detalle de usuario
├── pages/
│   ├── home/               → Listado + paginación
│   ├── info-usuario/       → Detalle de usuario
│   ├── form-usuario/       → Formulario crear/actualizar
│   └── not-found/          → Página 404
├── services/
│   └── users.ts             → Lógica de conexión al API
└── interfaces/
    └── iuser.ts              → Modelos IUser/IUsersResponse
```

## Funcionalidades

- Listado de usuarios con paginación
- Ver detalle completo de un usuario
- Crear un nuevo usuario (formulario con validaciones)
- Actualizar un usuario existente (mismo formulario, en modo edición)
- Eliminar un usuario, con confirmación mediante SweetAlert2
- Página 404 si se intenta acceder a un usuario o ruta inexistente
- Validaciones de formulario mediante Signal Forms: campos obligatorios, formato de email, con mensajes de error visibles bajo cada campo

## Cómo ejecutar el proyecto

```bash
# Instalar dependencias
pnpm install

# Levantar servidor de desarrollo
ng serve
```

Abre `http://localhost:4200` en el navegador. La aplicación recarga automáticamente al modificar cualquier archivo fuente.

### Ejecutar los tests

```bash
ng test
```

## Autor

Javier Núñez García-Bueno