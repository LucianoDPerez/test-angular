import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableModule } from '@angular/material/table';

import { AuthService } from '../../services/auth.service'; 

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model'; 

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatTableModule,
    FormsModule 
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('content', { static: true }) content!: TemplateRef<any>;

  isLoggedIn = false; 
  limit = 10;
  displayedColumns: string[] = ['id', 'title', 'category', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);
  selectedProduct: Product | null = null;

  protected authSubscription!: Subscription;
  public allProducts: Product[] = [];

  categories: string[] = [];
  selectedCategory: string | null = null;

  constructor(
    private modalService: NgbModal,
    private productService: ProductService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let hasLoggedOut = false; 
    
    this.authService.isLoggedIn().subscribe((status: boolean) => {
      this.isLoggedIn = status;
      if (!this.isLoggedIn && !hasLoggedOut) {
        hasLoggedOut = true; 
        this.logout(); 
      }
    });    
    
    this.fetchCategories();
  }

  ngAfterViewInit(): void {
    this.fetchProducts();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe(); 
    }
  }
  

  fetchCategories() {
    this.productService.getCategories().subscribe(
      categories => {
        this.categories = ['All', ...categories];
        this.selectedCategory = this.categories[0];
      },
      error => {
        console.error('Error fetching categories', error);
        // Manejo de errores
      }
    );
  }
  
  fetchProducts() {
    this.productService.getProducts().subscribe(
      products => {
        this.allProducts = products;
        this.updateDisplayedProducts();
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }
  

  public getAllProducts(): Product[] {
    return this.allProducts;
  }

  updateDisplayedProducts() {
    const filteredProducts = this.selectedCategory === 'All' 
      ? this.allProducts 
      : this.allProducts.filter(product => product.category === this.selectedCategory);

    this.dataSource.data = filteredProducts.slice(0, this.limit);

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.paginator.pageSize = this.limit;
      this.paginator.pageIndex = 0;
    }
  }

  applyCategoryFilter(event: any) {
    this.updateDisplayedProducts();
  }

  openModal(product: Product) {
    this.selectedProduct = product;
    this.modalService.open(this.content);
  }

  addToCart(product: Product | null) {}

  checkLoginStatus() {
    this.isLoggedIn = true; 
  }

  logout() {
    this.authService.logout();
  }
}
