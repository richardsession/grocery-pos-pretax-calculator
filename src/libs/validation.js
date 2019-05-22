'use strict';

import { validateSync } from 'class-validator';

export function validate (validationSchemaName, attributes) {
    const validation = validateSync(validationSchemaName, attributes);

    if(validation.length > 0) {
        throw validation;
    }
};