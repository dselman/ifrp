import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
import {Place} from './org.accordproject.geo';
// export namespace org.accordproject.organization{
   export class Organization extends Participant {
      identifier: string;
      name: string;
      description: string;
      duns: string;
      place: Place;
   }
// }
