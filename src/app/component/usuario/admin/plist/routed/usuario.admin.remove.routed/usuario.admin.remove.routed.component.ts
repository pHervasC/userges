import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../../../service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-usuario.admin.remove.routed',
  templateUrl: './usuario.admin.remove.routed.component.html',
  styleUrls: ['./usuario.admin.remove.routed.component.css']
})
export class UsuarioAdminRemoveRoutedComponent implements OnInit {
  userId: number = 0;


  constructor(
    private route: ActivatedRoute, // Inyectamos ActivatedRoute
    private oUsuarioService: UsuarioService, // Inyectamos el servicio de usuarios
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtenemos el ID del usuario desde la URL
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
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
}
