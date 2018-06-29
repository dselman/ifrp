import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {QuantitativeValue} from './org.accordproject.value';
import {PostalAddress} from './org.accordproject.address';
import {Organization} from './org.accordproject.organization';
import {Place,Country} from './org.accordproject.geo';
import {MonetaryAmount} from './org.accordproject.money';
import {Product} from './org.accordproject.product';
// export namespace org.accordproject.person{
   export enum Gender {
      MALE,
      FEMALE,
      OTHER,
      UNKNOWN,
   }
   export class Person extends Participant {
      identifier: string;
      additionalName: string;
      address: PostalAddress;
      affiliation: Organization;
      alumniOf: Organization;
      award: string;
      birthDate: Date;
      deathDate: Date;
      birthPlace: Place;
      children: Person[];
      colleagues: Person[];
      email: string;
      familyName: string;
      faxNumber: string;
      follows: Person[];
      funder: Organization;
      gender: Gender;
      givenName: string;
      globalLocationNumber: string;
      height: QuantitativeValue;
      homeLocation: PostalAddress;
      honorificPrefix: string;
      honorificSuffix: string;
      isicsV4: string;
      jobTitle: string;
      knows: Person[];
      memberOf: Organization;
      naics: string;
      nationality: Country;
      netWorth: MonetaryAmount;
      owns: Product;
      parent: Person;
      relatedTo: Person;
      sibling: Person[];
      sponsor: Organization;
      spouse: Person;
      taxId: string;
      telephone: string;
      vatId: string;
      weight: QuantitativeValue;
      worksFor: Organization;
   }
// }
