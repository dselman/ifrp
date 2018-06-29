import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.accordproject.value{
   export class QuantitativeValue {
      unitCode: string;
      unitText: string;
      value: number;
   }
   export enum UnitOfMass {
      GRAM,
      KG,
      TONNE,
   }
// }
