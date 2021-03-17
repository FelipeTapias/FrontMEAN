import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  data: any;

  constructor(private productService: ProductService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getProducts().subscribe(
      res => {
        this.data = res;
        console.log(this.data);
      }, error => {
        console.log(error);
      })
  }

  deleteProduct(id: any){
      this.productService.deleteProduct(id).subscribe(
        res => {
          this.toastr.error('Product removed succesfully','Product removed');
          this.getAllProducts();
        }, error => {
          console.log(error);
        })
  }
}
