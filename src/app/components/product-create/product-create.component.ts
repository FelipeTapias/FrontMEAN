import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  createProduct() {

    const PRODUCT: Product = {
      nombre: this.productForm.get('nombre')?.value,
      categoria: this.productForm.get('categoria')?.value,
      ubicacion: this.productForm.get('ubicacion')?.value,
      precio: this.productForm.get('precio')?.value,
    }

    console.info(PRODUCT);
    this.toastr.success('Producto registrado correctamente', 'Producto registrado!');
    this.router.navigate(['/']);
  }

}
