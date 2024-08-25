import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { AuthService } from '../../services/auth.service'; 
import { ProductService } from '../../services/product.service'; 
import { Product } from '../../models/product.model'; 

class MockAuthService {
  isLoggedIn() {
    return of(false); 
  }

  logout() {}
}

class MockProductService {
  getCategories() {
    return of(['category1', 'category2']); // Asegúrate de que esto sea correcto
  }

  getProducts() {
    return of([
      { id: 1, title: 'Product 1', category: 'category1', price: 10, description: 'Test product 1', imagets: 'http://example.com/image1.jpg' },
      { id: 2, title: 'Product 2', category: 'category2', price: 20, description: 'Test product 2', imagets: 'http://example.com/image2.jpg' }
    ]);
  }
}


describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        CommonModule,
        MatTableModule,
        FormsModule,
        NgbModule,
        ProductListComponent
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: ProductService, useClass: MockProductService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch categories and products', () => {
    component.ngOnInit(); // Llama a ngOnInit para inicializar el componente
    fixture.detectChanges(); // Actualiza la vista
    expect(component.categories).toEqual(['All', 'category1', 'category2']);
    expect(component.getAllProducts().length).toBe(2); // Asegúrate de que getAllProducts esté definido
  });
  
  

  it('should display products based on selected category', () => {
    component.selectedCategory = 'category1';
    component.applyCategoryFilter(null);
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].title).toBe('Product 1');
  });

  it('should open modal with selected product', () => {
    const product: Product = {
      id: 1,
      title: 'Product 1',
      category: 'category1',
      price: 10,
      description: 'This is a test product',
      image: 'http://example.com/image.jpg'
    };
    component.openModal(product);
    expect(component.selectedProduct).toEqual(product);
  });

  it('should logout when not logged in', () => {
    spyOn(component, 'logout'); // Espía el método logout
    component.isLoggedIn = false; // Simula que no está logueado
    component.ngOnInit(); // Llama a ngOnInit para ejecutar la lógica de inicio de sesión
    expect(component.logout).toHaveBeenCalled(); // Verifica que se haya llamado a logout
  });
    
});
