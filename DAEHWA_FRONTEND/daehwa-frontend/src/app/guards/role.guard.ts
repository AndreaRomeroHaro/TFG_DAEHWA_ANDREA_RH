import { inject } from "@angular/core";
import { CanActivateFn,Router } from "@angular/router";
import { AuthUserService } from "../services/authuser.service";

export const roleGuard = (rolPermitido: string): CanActivateFn => {
  return () => {
    const auth = inject(AuthUserService);
    const router = inject(Router);

    
    let usuario = auth.obtenerUsuarioActual();

    
    if (!usuario) {
      auth.cargarUsuarioDesdeStorage();
      usuario = auth.obtenerUsuarioActual();
    }

    
    if (!usuario) {
      router.navigate(['/login']);
      return false;
    }

    
    if (usuario.rol === rolPermitido) {
      return true;
    }

    
    if (usuario.rol === 'L') {
      router.navigate(['/logopeda']);
    } else if (usuario.rol === 'F') {
      router.navigate(['/familiar']);
    }

    return false;
  };
};
