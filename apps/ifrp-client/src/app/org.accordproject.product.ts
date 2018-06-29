import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {QuantitativeValue} from './org.accordproject.value';
import {Organization} from './org.accordproject.organization';
// export namespace org.accordproject.product{
   export class Product extends Asset {
      identifier: string;
      Organization: Organization;
      category: string;
      color: string;
      depth: QuantitativeValue;
      gtin12: string;
      gtin13: string;
      gtin14: string;
      gtin8: string;
      height: QuantitativeValue;
   }
// }
