import { registerSchema } from 'class-validator';

registerSchema(require('./Product.json'));
registerSchema(require('./ShoppingCartLineItem.json'));
registerSchema(require('./ProductRuleBogoComparisonSpecialStrategy.json'));