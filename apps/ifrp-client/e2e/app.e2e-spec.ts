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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for ifrp-client', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be ifrp-client', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('ifrp-client');
    })
  });

  it('network-name should be ifrp-network@0.2.0',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('ifrp-network@0.2.0.bna');
    });
  });

  it('navbar-brand should be ifrp-client',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('ifrp-client');
    });
  });

  
    it('Product component should be loadable',() => {
      page.navigateTo('/Product');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Product');
      });
    });

    it('Product table should have 11 columns',() => {
      page.navigateTo('/Product');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(11); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('IfrpPerson component should be loadable',() => {
      page.navigateTo('/IfrpPerson');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('IfrpPerson');
      });
    });

    it('IfrpPerson table should have 42 columns',() => {
      page.navigateTo('/IfrpPerson');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(42); // Addition of 1 for 'Action' column
      });
    });
  
    it('Person component should be loadable',() => {
      page.navigateTo('/Person');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Person');
      });
    });

    it('Person table should have 42 columns',() => {
      page.navigateTo('/Person');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(42); // Addition of 1 for 'Action' column
      });
    });
  
    it('Organization component should be loadable',() => {
      page.navigateTo('/Organization');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Organization');
      });
    });

    it('Organization table should have 6 columns',() => {
      page.navigateTo('/Organization');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });
  

  

});