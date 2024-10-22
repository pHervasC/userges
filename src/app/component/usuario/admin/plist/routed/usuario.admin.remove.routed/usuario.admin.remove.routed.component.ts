import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../../../service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from '../../../../../../model/usuario.interface';


@Component({
  selector: 'app-usuario.admin.remove.routed',
  templateUrl: './usuario.admin.remove.routed.component.html',
  styleUrls: ['./usuario.admin.remove.routed.component.css'],
  standalone: true,
  imports: [],
})
export class UsuarioAdminRemoveRoutedComponent implements OnInit {
  userId: number = 0;
  usuario: IUsuario = {
    id: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: '',
  };
  

  constructor(
    private route: ActivatedRoute, // Inyectamos ActivatedRoute
    private oUsuarioService: UsuarioService, // Inyectamos el servicio de usuarios
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtenemos el ID del usuario desde la URL
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.getUser();
  }

  removeUser() {
    this.oUsuarioService.removeUser(this.userId).subscribe({

      next: (data) => {
        console.log(`Usuario con ID ${this.userId} eliminado.`);
        this.router.navigate(['/admin/usuario/plist']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getUser() {
    this.oUsuarioService.get(this.userId).subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
