import * as mod from 'node-xmllint';
import * as fs from 'fs';

import xsd from './schemas/saml-schema-protocol-2.0.xsd';
import assertion from './schemas/saml-schema-assertion-2.0.xsd';
import sig from './schemas/xmldsig-core-schema.xsd';
import xenc from './schemas/xenc-schema.xsd';

// file fix for virtual filesystem of emscripten
let schemaProto = xsd.replace('saml-schema-assertion-2.0.xsd', 'file_0.xsd').replace('xmldsig-core-schema.xsd', 'file_1.xsd');
let schemaAssert = assertion.replace('xmldsig-core-schema.xsd', 'file_1.xsd').replace('xenc-schema.xsd', 'file_2.xsd');
let schemaXenc = xenc.replace('xmldsig-core-schema.xsd', 'file_1.xsd');

export const validate = (xml: string) => {
  return new Promise((resolve, reject) => {
    const validationResult = mod.validateXML({
      xml: xml,
      schema: [schemaAssert, sig, schemaXenc, schemaProto]
    });

    if (!validationResult.errors) {
      return resolve('SUCCESS_VALIDATE_XML');
    }

    console.error(`this is not a valid saml response with errors: ${validationResult.errors}`);
    return reject('ERR_EXCEPTION_VALIDATE_XML');
  });
};
