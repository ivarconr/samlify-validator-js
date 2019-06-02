import * as mod from 'node-xmllint';
import * as path from 'path';
import * as fs from 'fs';

const xsd = 'saml-schema-protocol-2.0.xsd';

const schemaPath = (schema: string) => path.resolve(__dirname, `./schemas/${schema}`);

let schemaProto = fs.readFileSync(schemaPath(xsd), 'utf-8');
let schemaAssert = fs.readFileSync(schemaPath('saml-schema-assertion-2.0.xsd'), 'utf-8');
const schemaXmldsig = fs.readFileSync(schemaPath('xmldsig-core-schema.xsd'), 'utf-8');
let schemaXenc = fs.readFileSync(schemaPath('xenc-schema.xsd'), 'utf-8');

// file fix for virtual filesystem of emscripten
schemaProto = schemaProto.replace('saml-schema-assertion-2.0.xsd', 'file_0.xsd');
schemaProto = schemaProto.replace('xmldsig-core-schema.xsd', 'file_1.xsd');
schemaAssert = schemaAssert.replace('xmldsig-core-schema.xsd', 'file_1.xsd');
schemaAssert = schemaAssert.replace('xenc-schema.xsd', 'file_2.xsd');
schemaXenc = schemaXenc.replace('xmldsig-core-schema.xsd', 'file_1.xsd');

export default {

  validate: (xml: string) => {

    return new Promise((resolve, reject) => {

      const validationResult = mod.validateXML({
        xml: xml,
        schema: [schemaAssert, schemaXmldsig, schemaXenc, schemaProto]
      });

      if (!validationResult.errors) {
        return resolve('SUCCESS_VALIDATE_XML');
      }

      console.error(`this is not a valid saml response with errors: ${validationResult.errors}`);
      return reject('ERR_EXCEPTION_VALIDATE_XML');

    });
  }
};