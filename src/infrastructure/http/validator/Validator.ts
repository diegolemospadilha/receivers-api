import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  allErrors: true,
  addUsedSchema: false,
  discriminator: true,
  strict: 'log',
})

export default addFormats(ajv)