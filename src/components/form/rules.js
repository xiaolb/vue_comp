// 身份证
export function checkIdCard(rule, value, callback) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!value) {
        return callback(new Error('证件号码不能为空'));
    } else if (!reg.test(value)) {
        return callback(new Error('证件号码不正确'));
    } else {
        callback();
    }
}

export const formRules = {
    idCard: { validator: checkIdCard, trigger: ['blur', 'change'] },
    phone: { pattern: /^1\d{10}$/, message: '目前只支持中国大陆的手机号码', trigger: ['blur', 'change'] },
    intNumber: { pattern: /^-?[1-9]\d*$/, message: '只支持整数', trigger: ['blur', 'change'] },
    floatNumber: { pattern: /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/, message: '只支持浮点数', trigger: ['blur', 'change'] },
    number: { pattern: /^(\-|\+)?\d+(\.\d+)?$/, message: '只支持数字', trigger: ['blur', 'change'] },
    email: { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
};
