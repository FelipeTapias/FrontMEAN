import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  titulo = 'Create product';

  productForm: FormGroup;
  id: string | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private productService: ProductService,
              private aRouter: ActivatedRoute) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.isEdit();
  }

  createProduct() {

    const PRODUCT: Product = {
      nombre: this.productForm.get('nombre')?.value,
      categoria: this.productForm.get('categoria')?.value,
      ubicacion: this.productForm.get('ubicacion')?.value,
      precio: this.productForm.get('precio')?.value,
    }

    if(this.id !== null) {
      //Edit product
      this.productService.editProduct(this.id, PRODUCT).subscribe(
        res => {
          this.toastr.info('Product edited succesfully', 'Product edited!');
        this.router.navigate(['/']);
        }, error => {
            console.log(error);
            this.productForm.reset();
            this.toastr.error('','');
        })
    }else {
      //Add product
      console.info(PRODUCT);
      this.productService.createProduct(PRODUCT).subscribe(
      res => {
        this.toastr.success('Product registrated succesfully', 'Product registrated!');
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.productForm.reset();
      });
    }
  }

  isEdit() {
    if(this.id !== null){
      this.titulo = "Edit product";
      this.productService.getProduct(this.id).subscribe(
        res => {
          this.productForm.setValue({
            nombre: res.nombre,
            categoria: res.categoria,
            ubicacion: res.ubicacion,
            precio: res.precio,
          });

        }
      )
    }
  }

}
