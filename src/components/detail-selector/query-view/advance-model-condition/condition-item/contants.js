export const EnumOperators = ['等于'];

export const DictOperators = ['等于'];

export const BooleanOperators = ['等于'];

export const NumberOperators = ['大于', '大于等于', '小于', '小于等于', '等于', '不等于', '介于'];

export const TextOperators = ['包含', '不包含', '等于', '不等于', '以字母开头', '以字母结尾'];

export const DateOperators = ['介于'];


export const Operators = {
    text: TextOperators,
    number: NumberOperators,
    boolean: BooleanOperators,
    enum: EnumOperators,
    dict: DictOperators,
    date: DateOperators
};
