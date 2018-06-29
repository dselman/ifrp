/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from './Product.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-product',
  templateUrl: './Product.component.html',
  styleUrls: ['./Product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  identifier = new FormControl('', Validators.required);
  Organization = new FormControl('', Validators.required);
  category = new FormControl('', Validators.required);
  color = new FormControl('', Validators.required);
  depth = new FormControl('', Validators.required);
  gtin12 = new FormControl('', Validators.required);
  gtin13 = new FormControl('', Validators.required);
  gtin14 = new FormControl('', Validators.required);
  gtin8 = new FormControl('', Validators.required);
  height = new FormControl('', Validators.required);

  constructor(private serviceProduct: ProductService, fb: FormBuilder) {
    this.myForm = fb.group({
      identifier: this.identifier,
      Organization: this.Organization,
      category: this.category,
      color: this.color,
      depth: this.depth,
      gtin12: this.gtin12,
      gtin13: this.gtin13,
      gtin14: this.gtin14,
      gtin8: this.gtin8,
      height: this.height
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceProduct.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.accordproject.product.Product',
      'identifier': this.identifier.value,
      'Organization': this.Organization.value,
      'category': this.category.value,
      'color': this.color.value,
      'depth': this.depth.value,
      'gtin12': this.gtin12.value,
      'gtin13': this.gtin13.value,
      'gtin14': this.gtin14.value,
      'gtin8': this.gtin8.value,
      'height': this.height.value
    };

    this.myForm.setValue({
      'identifier': null,
      'Organization': null,
      'category': null,
      'color': null,
      'depth': null,
      'gtin12': null,
      'gtin13': null,
      'gtin14': null,
      'gtin8': null,
      'height': null
    });

    return this.serviceProduct.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'identifier': null,
        'Organization': null,
        'category': null,
        'color': null,
        'depth': null,
        'gtin12': null,
        'gtin13': null,
        'gtin14': null,
        'gtin8': null,
        'height': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.accordproject.product.Product',
      'Organization': this.Organization.value,
      'category': this.category.value,
      'color': this.color.value,
      'depth': this.depth.value,
      'gtin12': this.gtin12.value,
      'gtin13': this.gtin13.value,
      'gtin14': this.gtin14.value,
      'gtin8': this.gtin8.value,
      'height': this.height.value
    };

    return this.serviceProduct.updateAsset(form.get('identifier').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceProduct.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceProduct.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'identifier': null,
        'Organization': null,
        'category': null,
        'color': null,
        'depth': null,
        'gtin12': null,
        'gtin13': null,
        'gtin14': null,
        'gtin8': null,
        'height': null
      };

      if (result.identifier) {
        formObject.identifier = result.identifier;
      } else {
        formObject.identifier = null;
      }

      if (result.Organization) {
        formObject.Organization = result.Organization;
      } else {
        formObject.Organization = null;
      }

      if (result.category) {
        formObject.category = result.category;
      } else {
        formObject.category = null;
      }

      if (result.color) {
        formObject.color = result.color;
      } else {
        formObject.color = null;
      }

      if (result.depth) {
        formObject.depth = result.depth;
      } else {
        formObject.depth = null;
      }

      if (result.gtin12) {
        formObject.gtin12 = result.gtin12;
      } else {
        formObject.gtin12 = null;
      }

      if (result.gtin13) {
        formObject.gtin13 = result.gtin13;
      } else {
        formObject.gtin13 = null;
      }

      if (result.gtin14) {
        formObject.gtin14 = result.gtin14;
      } else {
        formObject.gtin14 = null;
      }

      if (result.gtin8) {
        formObject.gtin8 = result.gtin8;
      } else {
        formObject.gtin8 = null;
      }

      if (result.height) {
        formObject.height = result.height;
      } else {
        formObject.height = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'identifier': null,
      'Organization': null,
      'category': null,
      'color': null,
      'depth': null,
      'gtin12': null,
      'gtin13': null,
      'gtin14': null,
      'gtin8': null,
      'height': null
      });
  }

}
