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
import { IfrpPersonService } from './IfrpPerson.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-ifrpperson',
  templateUrl: './IfrpPerson.component.html',
  styleUrls: ['./IfrpPerson.component.css'],
  providers: [IfrpPersonService]
})
export class IfrpPersonComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  identifier = new FormControl('', Validators.required);
  additionalName = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  affiliation = new FormControl('', Validators.required);
  alumniOf = new FormControl('', Validators.required);
  award = new FormControl('', Validators.required);
  birthDate = new FormControl('', Validators.required);
  deathDate = new FormControl('', Validators.required);
  birthPlace = new FormControl('', Validators.required);
  children = new FormControl('', Validators.required);
  colleagues = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  familyName = new FormControl('', Validators.required);
  faxNumber = new FormControl('', Validators.required);
  follows = new FormControl('', Validators.required);
  funder = new FormControl('', Validators.required);
  gender = new FormControl('', Validators.required);
  givenName = new FormControl('', Validators.required);
  globalLocationNumber = new FormControl('', Validators.required);
  height = new FormControl('', Validators.required);
  homeLocation = new FormControl('', Validators.required);
  honorificPrefix = new FormControl('', Validators.required);
  honorificSuffix = new FormControl('', Validators.required);
  isicsV4 = new FormControl('', Validators.required);
  jobTitle = new FormControl('', Validators.required);
  knows = new FormControl('', Validators.required);
  memberOf = new FormControl('', Validators.required);
  naics = new FormControl('', Validators.required);
  nationality = new FormControl('', Validators.required);
  netWorth = new FormControl('', Validators.required);
  owns = new FormControl('', Validators.required);
  parent = new FormControl('', Validators.required);
  relatedTo = new FormControl('', Validators.required);
  sibling = new FormControl('', Validators.required);
  sponsor = new FormControl('', Validators.required);
  spouse = new FormControl('', Validators.required);
  taxId = new FormControl('', Validators.required);
  telephone = new FormControl('', Validators.required);
  vatId = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);
  worksFor = new FormControl('', Validators.required);


  constructor(private serviceIfrpPerson: IfrpPersonService, fb: FormBuilder) {
    this.myForm = fb.group({
      identifier: this.identifier,
      additionalName: this.additionalName,
      address: this.address,
      affiliation: this.affiliation,
      alumniOf: this.alumniOf,
      award: this.award,
      birthDate: this.birthDate,
      deathDate: this.deathDate,
      birthPlace: this.birthPlace,
      children: this.children,
      colleagues: this.colleagues,
      email: this.email,
      familyName: this.familyName,
      faxNumber: this.faxNumber,
      follows: this.follows,
      funder: this.funder,
      gender: this.gender,
      givenName: this.givenName,
      globalLocationNumber: this.globalLocationNumber,
      height: this.height,
      homeLocation: this.homeLocation,
      honorificPrefix: this.honorificPrefix,
      honorificSuffix: this.honorificSuffix,
      isicsV4: this.isicsV4,
      jobTitle: this.jobTitle,
      knows: this.knows,
      memberOf: this.memberOf,
      naics: this.naics,
      nationality: this.nationality,
      netWorth: this.netWorth,
      owns: this.owns,
      parent: this.parent,
      relatedTo: this.relatedTo,
      sibling: this.sibling,
      sponsor: this.sponsor,
      spouse: this.spouse,
      taxId: this.taxId,
      telephone: this.telephone,
      vatId: this.vatId,
      weight: this.weight,
      worksFor: this.worksFor
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceIfrpPerson.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.accordproject.ifrp.IfrpPerson',
      'identifier': this.identifier.value,
      'additionalName': this.additionalName.value,
      'address': this.address.value,
      'affiliation': this.affiliation.value,
      'alumniOf': this.alumniOf.value,
      'award': this.award.value,
      'birthDate': this.birthDate.value,
      'deathDate': this.deathDate.value,
      'birthPlace': this.birthPlace.value,
      'children': this.children.value,
      'colleagues': this.colleagues.value,
      'email': this.email.value,
      'familyName': this.familyName.value,
      'faxNumber': this.faxNumber.value,
      'follows': this.follows.value,
      'funder': this.funder.value,
      'gender': this.gender.value,
      'givenName': this.givenName.value,
      'globalLocationNumber': this.globalLocationNumber.value,
      'height': this.height.value,
      'homeLocation': this.homeLocation.value,
      'honorificPrefix': this.honorificPrefix.value,
      'honorificSuffix': this.honorificSuffix.value,
      'isicsV4': this.isicsV4.value,
      'jobTitle': this.jobTitle.value,
      'knows': this.knows.value,
      'memberOf': this.memberOf.value,
      'naics': this.naics.value,
      'nationality': this.nationality.value,
      'netWorth': this.netWorth.value,
      'owns': this.owns.value,
      'parent': this.parent.value,
      'relatedTo': this.relatedTo.value,
      'sibling': this.sibling.value,
      'sponsor': this.sponsor.value,
      'spouse': this.spouse.value,
      'taxId': this.taxId.value,
      'telephone': this.telephone.value,
      'vatId': this.vatId.value,
      'weight': this.weight.value,
      'worksFor': this.worksFor.value
    };

    this.myForm.setValue({
      'identifier': null,
      'additionalName': null,
      'address': null,
      'affiliation': null,
      'alumniOf': null,
      'award': null,
      'birthDate': null,
      'deathDate': null,
      'birthPlace': null,
      'children': null,
      'colleagues': null,
      'email': null,
      'familyName': null,
      'faxNumber': null,
      'follows': null,
      'funder': null,
      'gender': null,
      'givenName': null,
      'globalLocationNumber': null,
      'height': null,
      'homeLocation': null,
      'honorificPrefix': null,
      'honorificSuffix': null,
      'isicsV4': null,
      'jobTitle': null,
      'knows': null,
      'memberOf': null,
      'naics': null,
      'nationality': null,
      'netWorth': null,
      'owns': null,
      'parent': null,
      'relatedTo': null,
      'sibling': null,
      'sponsor': null,
      'spouse': null,
      'taxId': null,
      'telephone': null,
      'vatId': null,
      'weight': null,
      'worksFor': null
    });

    return this.serviceIfrpPerson.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'identifier': null,
        'additionalName': null,
        'address': null,
        'affiliation': null,
        'alumniOf': null,
        'award': null,
        'birthDate': null,
        'deathDate': null,
        'birthPlace': null,
        'children': null,
        'colleagues': null,
        'email': null,
        'familyName': null,
        'faxNumber': null,
        'follows': null,
        'funder': null,
        'gender': null,
        'givenName': null,
        'globalLocationNumber': null,
        'height': null,
        'homeLocation': null,
        'honorificPrefix': null,
        'honorificSuffix': null,
        'isicsV4': null,
        'jobTitle': null,
        'knows': null,
        'memberOf': null,
        'naics': null,
        'nationality': null,
        'netWorth': null,
        'owns': null,
        'parent': null,
        'relatedTo': null,
        'sibling': null,
        'sponsor': null,
        'spouse': null,
        'taxId': null,
        'telephone': null,
        'vatId': null,
        'weight': null,
        'worksFor': null
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.accordproject.ifrp.IfrpPerson',
      'additionalName': this.additionalName.value,
      'address': this.address.value,
      'affiliation': this.affiliation.value,
      'alumniOf': this.alumniOf.value,
      'award': this.award.value,
      'birthDate': this.birthDate.value,
      'deathDate': this.deathDate.value,
      'birthPlace': this.birthPlace.value,
      'children': this.children.value,
      'colleagues': this.colleagues.value,
      'email': this.email.value,
      'familyName': this.familyName.value,
      'faxNumber': this.faxNumber.value,
      'follows': this.follows.value,
      'funder': this.funder.value,
      'gender': this.gender.value,
      'givenName': this.givenName.value,
      'globalLocationNumber': this.globalLocationNumber.value,
      'height': this.height.value,
      'homeLocation': this.homeLocation.value,
      'honorificPrefix': this.honorificPrefix.value,
      'honorificSuffix': this.honorificSuffix.value,
      'isicsV4': this.isicsV4.value,
      'jobTitle': this.jobTitle.value,
      'knows': this.knows.value,
      'memberOf': this.memberOf.value,
      'naics': this.naics.value,
      'nationality': this.nationality.value,
      'netWorth': this.netWorth.value,
      'owns': this.owns.value,
      'parent': this.parent.value,
      'relatedTo': this.relatedTo.value,
      'sibling': this.sibling.value,
      'sponsor': this.sponsor.value,
      'spouse': this.spouse.value,
      'taxId': this.taxId.value,
      'telephone': this.telephone.value,
      'vatId': this.vatId.value,
      'weight': this.weight.value,
      'worksFor': this.worksFor.value
    };

    return this.serviceIfrpPerson.updateParticipant(form.get('identifier').value, this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceIfrpPerson.deleteParticipant(this.currentId)
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

    return this.serviceIfrpPerson.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'identifier': null,
        'additionalName': null,
        'address': null,
        'affiliation': null,
        'alumniOf': null,
        'award': null,
        'birthDate': null,
        'deathDate': null,
        'birthPlace': null,
        'children': null,
        'colleagues': null,
        'email': null,
        'familyName': null,
        'faxNumber': null,
        'follows': null,
        'funder': null,
        'gender': null,
        'givenName': null,
        'globalLocationNumber': null,
        'height': null,
        'homeLocation': null,
        'honorificPrefix': null,
        'honorificSuffix': null,
        'isicsV4': null,
        'jobTitle': null,
        'knows': null,
        'memberOf': null,
        'naics': null,
        'nationality': null,
        'netWorth': null,
        'owns': null,
        'parent': null,
        'relatedTo': null,
        'sibling': null,
        'sponsor': null,
        'spouse': null,
        'taxId': null,
        'telephone': null,
        'vatId': null,
        'weight': null,
        'worksFor': null
      };

      if (result.identifier) {
        formObject.identifier = result.identifier;
      } else {
        formObject.identifier = null;
      }

      if (result.additionalName) {
        formObject.additionalName = result.additionalName;
      } else {
        formObject.additionalName = null;
      }

      if (result.address) {
        formObject.address = result.address;
      } else {
        formObject.address = null;
      }

      if (result.affiliation) {
        formObject.affiliation = result.affiliation;
      } else {
        formObject.affiliation = null;
      }

      if (result.alumniOf) {
        formObject.alumniOf = result.alumniOf;
      } else {
        formObject.alumniOf = null;
      }

      if (result.award) {
        formObject.award = result.award;
      } else {
        formObject.award = null;
      }

      if (result.birthDate) {
        formObject.birthDate = result.birthDate;
      } else {
        formObject.birthDate = null;
      }

      if (result.deathDate) {
        formObject.deathDate = result.deathDate;
      } else {
        formObject.deathDate = null;
      }

      if (result.birthPlace) {
        formObject.birthPlace = result.birthPlace;
      } else {
        formObject.birthPlace = null;
      }

      if (result.children) {
        formObject.children = result.children;
      } else {
        formObject.children = null;
      }

      if (result.colleagues) {
        formObject.colleagues = result.colleagues;
      } else {
        formObject.colleagues = null;
      }

      if (result.email) {
        formObject.email = result.email;
      } else {
        formObject.email = null;
      }

      if (result.familyName) {
        formObject.familyName = result.familyName;
      } else {
        formObject.familyName = null;
      }

      if (result.faxNumber) {
        formObject.faxNumber = result.faxNumber;
      } else {
        formObject.faxNumber = null;
      }

      if (result.follows) {
        formObject.follows = result.follows;
      } else {
        formObject.follows = null;
      }

      if (result.funder) {
        formObject.funder = result.funder;
      } else {
        formObject.funder = null;
      }

      if (result.gender) {
        formObject.gender = result.gender;
      } else {
        formObject.gender = null;
      }

      if (result.givenName) {
        formObject.givenName = result.givenName;
      } else {
        formObject.givenName = null;
      }

      if (result.globalLocationNumber) {
        formObject.globalLocationNumber = result.globalLocationNumber;
      } else {
        formObject.globalLocationNumber = null;
      }

      if (result.height) {
        formObject.height = result.height;
      } else {
        formObject.height = null;
      }

      if (result.homeLocation) {
        formObject.homeLocation = result.homeLocation;
      } else {
        formObject.homeLocation = null;
      }

      if (result.honorificPrefix) {
        formObject.honorificPrefix = result.honorificPrefix;
      } else {
        formObject.honorificPrefix = null;
      }

      if (result.honorificSuffix) {
        formObject.honorificSuffix = result.honorificSuffix;
      } else {
        formObject.honorificSuffix = null;
      }

      if (result.isicsV4) {
        formObject.isicsV4 = result.isicsV4;
      } else {
        formObject.isicsV4 = null;
      }

      if (result.jobTitle) {
        formObject.jobTitle = result.jobTitle;
      } else {
        formObject.jobTitle = null;
      }

      if (result.knows) {
        formObject.knows = result.knows;
      } else {
        formObject.knows = null;
      }

      if (result.memberOf) {
        formObject.memberOf = result.memberOf;
      } else {
        formObject.memberOf = null;
      }

      if (result.naics) {
        formObject.naics = result.naics;
      } else {
        formObject.naics = null;
      }

      if (result.nationality) {
        formObject.nationality = result.nationality;
      } else {
        formObject.nationality = null;
      }

      if (result.netWorth) {
        formObject.netWorth = result.netWorth;
      } else {
        formObject.netWorth = null;
      }

      if (result.owns) {
        formObject.owns = result.owns;
      } else {
        formObject.owns = null;
      }

      if (result.parent) {
        formObject.parent = result.parent;
      } else {
        formObject.parent = null;
      }

      if (result.relatedTo) {
        formObject.relatedTo = result.relatedTo;
      } else {
        formObject.relatedTo = null;
      }

      if (result.sibling) {
        formObject.sibling = result.sibling;
      } else {
        formObject.sibling = null;
      }

      if (result.sponsor) {
        formObject.sponsor = result.sponsor;
      } else {
        formObject.sponsor = null;
      }

      if (result.spouse) {
        formObject.spouse = result.spouse;
      } else {
        formObject.spouse = null;
      }

      if (result.taxId) {
        formObject.taxId = result.taxId;
      } else {
        formObject.taxId = null;
      }

      if (result.telephone) {
        formObject.telephone = result.telephone;
      } else {
        formObject.telephone = null;
      }

      if (result.vatId) {
        formObject.vatId = result.vatId;
      } else {
        formObject.vatId = null;
      }

      if (result.weight) {
        formObject.weight = result.weight;
      } else {
        formObject.weight = null;
      }

      if (result.worksFor) {
        formObject.worksFor = result.worksFor;
      } else {
        formObject.worksFor = null;
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
      'additionalName': null,
      'address': null,
      'affiliation': null,
      'alumniOf': null,
      'award': null,
      'birthDate': null,
      'deathDate': null,
      'birthPlace': null,
      'children': null,
      'colleagues': null,
      'email': null,
      'familyName': null,
      'faxNumber': null,
      'follows': null,
      'funder': null,
      'gender': null,
      'givenName': null,
      'globalLocationNumber': null,
      'height': null,
      'homeLocation': null,
      'honorificPrefix': null,
      'honorificSuffix': null,
      'isicsV4': null,
      'jobTitle': null,
      'knows': null,
      'memberOf': null,
      'naics': null,
      'nationality': null,
      'netWorth': null,
      'owns': null,
      'parent': null,
      'relatedTo': null,
      'sibling': null,
      'sponsor': null,
      'spouse': null,
      'taxId': null,
      'telephone': null,
      'vatId': null,
      'weight': null,
      'worksFor': null
    });
  }
}
