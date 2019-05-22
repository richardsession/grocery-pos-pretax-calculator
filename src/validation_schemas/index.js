import { registerSchema } from 'class-validator';

registerSchema(require('./Product.json'));
registerSchema(require('./ShoppingCartLineItem.json'));
registerSchema(require('./ProductRuleBogoComparisonSpecialStrategy.json'));
registerSchema(require('./ProductRuleBogoSpecialStrategy.json'));
registerSchema(require('./ProductRuleQuantitySpecialStrategy.json'));
registerSchema(require('./ProductRuleMarkdownPercentageStrategy.json'));
registerSchema(require('./ProductRuleMarkdownStrategy.json'));