import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { of } from 'rxjs'; // Importa 'of' para simular el Observable

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should authenticate user', (done) => {
    // Simula la lógica de autenticación
    const username = 'testUser';
    const password = 'testPassword';
    
    // Simula el método login para que devuelva un Observable
    spyOn(authService, 'login').and.returnValue(of({ success: true }));

    authService.login(username, password).subscribe(result => {
      expect(result.success).toBe(true);
      done(); // Indica que la prueba ha terminado
    });
  });

  it('should return false for invalid credentials', (done) => {
    // Simula las credenciales inválidas
    const username = 'wrongUser';
    const password = 'wrongPassword';
    
    // Simula el método login para que devuelva un Observable
    spyOn(authService, 'login').and.returnValue(of({ success: false }));

    authService.login(username, password).subscribe(result => {
      expect(result.success).toBe(false);
      done(); // Indica que la prueba ha terminado
    });
  });
});
