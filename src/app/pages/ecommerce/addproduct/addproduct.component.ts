import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})

/**
 * Ecommerce add-product component
 */
export class AddproductComponent implements OnInit {

  constructor(public formBuilder: UntypedFormBuilder, private http: HttpClient) { }
  /**
   * Returns form
   */
  get form() {
    return this.productForm.controls;
  }

  productForm: UntypedFormGroup;

  // bread crumb items
  breadCrumbItems: Array<{}>;
  // Form submition
  submit: boolean;
  files: File[] = [];

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Add Product', active: true }];

    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      manufacture_name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      manufacture_brand: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      price: ['', [Validators.required]],
      category: ['Category', [Validators.required]],
      features: ['Features', [Validators.required]],
    });
    this.submit = false;
  }

// File Upload
imageURL: any;
onSelect(event: any) {
  this.files.push(...event.addedFiles);
  let file: File = event.addedFiles[0];
  const reader = new FileReader();
  reader.onload = () => {
    this.imageURL = reader.result as string;
    setTimeout(() => {
      // this.profile.push(this.imageURL)
    }, 100);
  }
  reader.readAsDataURL(file)
}
  /**
   * Bootsrap validation form submit method
   */
  validSubmit() {
    this.submit = true;
    const formData = new FormData();
    formData.append('name', this.productForm.get('name').value);
    formData.append('manufacture_name', this.productForm.get('manufacture_name').value);
    formData.append('manufacture_brand', this.productForm.get('manufacture_brand').value);
    formData.append('price', this.productForm.get('price').value);
    // formData.append('image', this.file, this.image);

    this.http.post<any>(`http://localhost:8000/api/products`, formData)
      .subscribe((data) => {
        return data;
      });
  }
}
