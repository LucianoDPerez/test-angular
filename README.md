INSTALACION
npm install

EJECUTAR
ng serve


Test
EJECUCION ng test
Casos de Prueba en LoginComponent

1. Creación del Componente
    typescript
    it('should create the component', () => {  expect(component).toBeTruthy();});
    
    Objetivo: Verificar que el componente LoginComponent se crea correctamente.
    Descripción: Este test asegura que la instancia del componente no sea nula o indefinida, lo que indica que se ha inicializado correctamente.
2. Inicialización del Formulario
    typescript
    it('should initialize the form with two controls', () => {  expect(component.loginForm.contains('email')).toBeTrue();  expect(component.loginForm.contains('password')).toBeTrue();});
    
    Objetivo: Comprobar que el formulario de inicio de sesión se inicializa con los controles esperados.
    Descripción: Este test verifica que el formulario contiene los controles email y password, lo que es esencial para la funcionalidad de inicio de sesión.

3. Validación del Control de Email
    typescript
    it('should make the email control required', () => {  const emailControl = component.loginForm.get('email');  emailControl?.setValue('');  expect(emailControl?.valid).toBeFalse();});
    
    Objetivo: Asegurar que el control de email es un campo requerido.
    Descripción: Este test establece el valor del control de email como vacío y verifica que su estado de validez es false, indicando que se requiere un valor.

4. Validación del Control de Contraseña
    typescript
    
    it('should make the password control required', () => {  const passwordControl = component.loginForm.get('password');  passwordControl?.setValue('');  expect(passwordControl?.valid).toBeFalse();});

    Objetivo: Verificar que el control de contraseña también es un campo requerido.
    Descripción: Similar al caso del email, este test establece el valor del control de contraseña como vacío y comprueba que su estado de validez es false.

5. Navegación en Caso de Inicio de Sesión Exitoso
    typescript
    
    it('should navigate to product-list on successful login', () => {  component.loginForm.setValue({ email: 'test@example.com', password: 'password' });  component.onSubmit();  expect(router.navigate).toHaveBeenCalledWith(['/product-list']);});

    Objetivo: Comprobar que el componente navega a la lista de productos cuando el inicio de sesión es exitoso.
    Descripción: Este test simula un inicio de sesión exitoso estableciendo valores en el formulario y llamando al método onSubmit(), luego verifica que se llama a la función de navegación con la ruta esperada.

6. Manejo de Errores en el Inicio de Sesión
    typescript

    it('should set loginError to true on failed login', () => {  const mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;  mockAuthService.login = jasmine.createSpy('login').and.returnValue(throwError({ success: false }));  component.loginForm.setValue({ email: 'test@example.com', password: 'wrongpassword' });  component.onSubmit();  expect(component.loginError).toBeTrue();});

    Objetivo: Verificar que el componente maneja correctamente un error de inicio de sesión.
    Descripción: Este test simula un fallo en el inicio de sesión al hacer que el método login del servicio de autenticación devuelva un error. Luego, se comprueba que la propiedad loginError del componente se establece en true, indicando que hubo un error.
    Análisis del Test de ProductListComponent
    El código que has proporcionado es un conjunto de pruebas unitarias para el componente ProductListComponent de una aplicación Angular. Estas pruebas están diseñadas para verificar que el componente se comporte de la manera esperada en diferentes situaciones. A continuación, se describen los casos de prueba que realiza y cómo puedes probarlos. 

Casos de Prueba Realizados
1.Creación del Componente 
2.Descripción: Verifica que el componente se crea correctamente.
3.Prueba: Se utiliza expect(component).toBeTruthy(); para comprobar que el componente no es nulo.
4.Obtención de Categorías y Productos 
5.Descripción: Comprueba que el componente obtiene las categorías y productos correctamente al inicializarse.
6.Prueba: Se llama a ngOnInit(), y se espera que categories contenga ['All', 'category1', 'category2'] y que getAllProducts() retorne un array con 2 productos.
7.Filtrado de Productos por Categoría Seleccionada 
8.Descripción: Verifica que al aplicar un filtro de categoría, se muestren solo los productos correspondientes.
9.Prueba: Se establece selectedCategory a 'category1', se llama a applyCategoryFilter(null), y se espera que dataSource.data contenga solo 1 producto, que debe ser 'Product 1'.
10.Apertura de Modal con Producto Seleccionado 
11.Descripción: Comprueba que al abrir el modal con un producto, el producto seleccionado se establece correctamente.
12.Prueba: Se llama a openModal(product) con un producto específico y se verifica que selectedProduct es igual al producto pasado.
13.Cierre de Sesión Cuando No Está Logueado 
14.Descripción: Verifica que se llama al método logout si el usuario no está logueado.
15.Prueba: Se simula que el usuario no está logueado, se llama a ngOnInit(), y se verifica que logout ha sido llamado.

Cómo Probar los Casos
Para probar estos casos, sigue estos pasos: 

1.Configuración del Entorno 
2.Asegúrate de tener configurado un entorno de pruebas para Angular. Esto generalmente implica tener Karma y Jasmine instalados y configurados.
3.Ejecutar las Pruebas 
4.Usa el comando ng test en la terminal para ejecutar las pruebas. Esto abrirá un navegador y mostrará los resultados de las pruebas.
5.Verificar Resultados 
6.Observa la salida en la consola para asegurarte de que todas las pruebas pasen. Si alguna prueba falla, revisa el mensaje de error para identificar el problema.

Modificar y Repetir 
Si necesitas realizar cambios en el componente o en las pruebas, hazlo y vuelve a ejecutar ng test para verificar que las modificaciones no introduzcan errores.
