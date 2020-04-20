<template>
    <div id="formitemtest">
        <Form
            :form-items="formItems"
            :saveBtnText="saveBtnText"
            :saveBtn="saveBtn"
            :cancelBtnText="cancelBtnText"
            :cancelBtn="cancelBtn"
            :label-width="labelWidth"
            :buttons="buttons"
            :form-data="formData"
            :all-disabled="allDisabled"
            :formWidth="formWidth"
            :flexleftOrCenter="flexleftOrCenter"
            :bottom-fixed="bottomFixed"
            :formItemsBtn="formItemsBtn"
            :showText="true"
        >
            <div slot="appendinput">appendinput</div>
            <div slot="appendcut">appendcut</div>
            <div slot="appendcheckboxs">checkboxs</div>
            <div slot="appendnumber">number</div>
            <div slot="appenddate">date</div>
            <div slot="appendtextarea">textarea</div>
            <div slot="appendswitch">switch</div>
            <div slot="appendradio">radio</div>
            <div slot="appendtable">table</div>
            <div slot="appendtag">tag </div>
            <div slot="appendue">ue </div>
            <div slot="appendmap">map</div>
            <div slot="appendautocomplete">autocomplete</div>
            <div slot="appendcascader">cascader</div>
            <div slot="appendselect">select</div>
            <div slot="appendtwoDate">twoDate</div>
            <div slot="appendvideoOrPicture">videoOrPicture</div>
            <div slot="appendhandleClick">handleClick</div>
            <div slot="appendqrcode">qrcode</div>
        </Form>
    </div>
</template>
<script>
import cascaderData from './cascader';
export default {
    name: 'formitemtest',
    data() {
        return {
            needRequired: false,
            saveBtnText: '确定', // 操作保存按钮文本样式
            cancelBtnText: '返回', // 操作取消按钮文本样式
            labelWidth: '140px', // 表单域标签的宽度
            buttons: [
                {
                    name: '红色按钮', // 按钮名字
                    hidden: false, // 是否隐藏
                    onclick: () => {
                        // 按钮点击事件
                        console.log('红色按钮事件');
                        console.log(this.formData);
                    },
                    disabled: false, // 是否禁止
                    type: 'danger', // 按钮类型
                    validate: true, // 是否表单校验
                    loading: true, // 是否要loading
                },
            ], // 其他的自定义操作
            saveBtn: true, // 是否显示保存按钮
            cancelBtn: true, // 是否展示取消按钮
            formData: { checkboxs: [], handleClick: 'handleClick', autocomplete: '123', date: '' }, // 表单数据
            allDisabled: false, // 表单是否禁止编辑
            formWidth: '1200px', // 表单的宽度
            flexleftOrCenter: 'left', // 表单位置 left/cente
            bottomFixed: true, //按钮悬浮
            required: false,
        };
    },
    mounted() {
        setTimeout(() => {
            let videoOrPicture = [
                {
                    url: 'https://imgapi.apitops.com/TEST/bigdata-mgr/20190826/f137a9562d774b09938ec3360b551d04.jpg',
                },
                {
                    url: 'https://imgapi.apitops.com/TEST/bigdata-mgr/20190826/c1355b4172784268bf8c925e3de2a052.jpg',
                },
            ];
            this.formData = {
                ...this.formData,
                videoOrPicture: videoOrPicture,
            };
        }, 5000);
    },
    computed: {
        formItems() {
            let common = {
                name: 'common', // 绑定数据的名字
                label: '公用', // 展示label
                type: 'common', // 对应的type组件
                span: 24, // 当前宽度的多少份，24为100%
                hidden: false, // 是否隐藏当前item
                labelWidth: '140px', // 当前item的宽度，没有的话用form的labelWidth
                disabled: false, // 是否不可编辑
                placehold: '', // 提示语
                required: this.required, // 是否必填
                inputStyle: {
                    // item的样式编写
                    // width: '460px',
                },
                classList: {
                    // 对表单进行样式调整
                    // 类名: '是否这个类',
                    autocomplete: true,
                },

                appendSlot: false, // 是否添加自定义slot

                // rowOrColumn: true, // flex的方向，有connect或extra时用
                // connect: '补充', // 符号什么 一到两字
                // extra: '补充说明', // 补充说明
                extraStyle: {
                    color: '#00ff00',
                }, //extra样式补充
                extraFun: () => {
                    console.log('点击事件');
                },
            };
            return [
                {
                    ...common,
                    name: 'cut',
                    labelWidth: '0px',
                    label: '分隔符',
                    type: 'cut',
                    cutName: '分隔符', // 分割标题
                    cutNameDescribe: '楼盘各个批次', // cutName的说明
                    span: 24,
                    btnTitle: '新增一个', // 操作字段
                    btnDescribe: '找不到我要的小区 ? , ', //操作字段前缀
                    btnFuntion: () => {
                        // 操作函数
                        console.log('操作按钮');
                    },
                },
                {
                    ...common,
                    name: 'checkboxs',
                    label: '复选框',
                    type: 'checkboxs',
                    // required: true,

                    span: 24,

                    column: false, // 复选框竖着
                    data: [
                        // 可选项数据源，键名可通过 Props 属性配置
                        { value: 'value', label: 'label', disabled: true },
                        { itemValue: 'itemValue', itemLabel: 'itemLabel' },
                        { paramValue: 'paramValue', paramName: 'paramName' },
                        { id: 'id', name: 'name' },
                    ],
                    selectFun: value => {
                        // 选择事件
                        console.log(value);
                    },
                },
                {
                    ...common,
                    name: 'test',
                    label: '22222',
                    type: 'input',
                    max: 12,
                    pattern: /^-?[1-9]\d*$/,
                    message: 'nihao',
                    // min: 6,
                    span: 6,
                    classList: {
                        ...common.classList,
                        noRightBorder: true,
                    },
                    connect: '',
                    extra: '',
                    disabled: true,
                    slotlabeltip: 'slotlabeltip',
                },
                {
                    // ...common,
                    labelWidth: '0px',
                    name: 'test1',
                    label: '',
                    span: 6,
                    type: 'input',
                    classList: {
                        noLeftBorder: true,
                        noRightBorder: true,
                    },
                    suffix: true,
                    suffixIcon: 'el-icon-delete',
                    suffixStyle: {
                        color: 'purple',
                        fontSize: '16px',
                    },
                    suffixFun: () => {
                        console.log('suffixFun');
                    },
                },
                {
                    // ...common,
                    labelWidth: '0px',
                    name: 'test1',
                    label: '',
                    span: 6,
                    type: 'input',
                    classList: {
                        noLeftBorder: true,
                        noRightBorder: true,
                    },
                    appendHtml: true,
                    appendHtmlText: '测试',
                    appendHtmlFun: () => {
                        console.log('appendHtmlFun');
                    },
                },
                {
                    // ...common,
                    labelWidth: '0px',
                    name: 'test1',
                    label: '',
                    span: 6,
                    type: 'input',
                    classList: {
                        noLeftBorder: true,
                        noRightBorder: true,
                    },
                    append: true, // 是否有slot,输入框的操作
                    appendIcon: 'el-icon-delete',
                    appendFun: () => {
                        // 和append配套操作
                        console.log('appendFun');
                    },
                },
                {
                    ...common,
                    name: 'input',
                    label: '输入框',
                    type: 'input',
                    span: 24,

                    // append: true, // 是否有slot, 按钮
                    appendIcon: 'el-icon-delete', // slot 的 icon
                    appendFun: () => {
                        // 和append配套操作
                        console.log('appendFun');
                    },

                    // suffix: true, // 是否有slot, 图标
                    suffixIcon: 'el-icon-delete', // slot 的 icon
                    suffixStyle: {
                        // 是否有slot, 图标样式
                        color: 'purple',
                        fontSize: '16px',
                    },
                    suffixFun: () => {
                        // 和suffix配套操作
                        console.log('suffixFun');
                    },

                    appendHtml: true, // 是否有slot, html
                    appendHtmlText: '<i>测试</i>', // slot的html
                    appendHtmlStyle: {
                        // 文本样式
                        color: 'pink',
                    },
                    appendHtmlFun: () => {
                        // 和appendHtml配套操作
                        console.log('appendHtmlFun');
                    },

                    maxLength: 20, // 最大数量
                    minLength: 10, // 最小数量
                    clearable: true, // 是否可清除
                    change: value => {
                        // 字段变换的函数
                        console.log(value, '失去焦点之后');
                    },
                },
                {
                    ...common,
                    name: 'number',
                    label: '数字框',
                    type: 'number',

                    maxi: 20, // 最大数
                    mini: 10, // 最小数
                    precision: 2, // 几位小数
                },
                {
                    ...common,
                    name: 'autocomplete',
                    label: '自动匹配',
                    type: 'autocomplete',
                    classList: {
                        autocomplete: true,
                    },

                    // append: true, // 是否有slot, 按钮
                    appendIcon: 'el-icon-delete', // slot 的 icon
                    appendFun: () => {
                        // 和append配套操作
                        console.log('appendFun');
                    },

                    suffix: true, // 是否有slot, 图标
                    suffixIcon: 'el-icon-delete', // slot 的 icon
                    suffixStyle: {
                        // 是否有slot, 图标样式
                        color: 'purple',
                        fontSize: '16px',
                    },
                    suffixFun: () => {
                        // 和suffix配套操作
                        console.log('suffixFun');
                    },

                    // appendHtml: true, // 是否有slot, html
                    appendHtmlText: '<i>测试</i>', // slot的html
                    appendHtmlStyle: {
                        // 文本样式
                        color: 'pink',
                    },
                    appendHtmlFun: () => {
                        // 和appendHtml配套操作
                        console.log('appendHtmlFun');
                    },

                    clearable: true, // 是否可清除
                    querySearchAsync: (filterVaule, cb) => {
                        // 搜索操作
                        console.log('模糊搜索操作', filterVaule, cb);
                        cb([
                            { id: 1, value: '23', unit: 3 },
                            { id: 2, value: '24', unit: 3 },
                            { id: 3, value: '266', unit: 3 },
                            { id: 4, value: '72', unit: 3 },
                            { id: 5, value: '28', unit: 3 },
                        ]);
                    },
                    itemAppendName: 'unit',
                    itemAppendStyle: {
                        color: 'red',
                    },
                    itemAppendClassList: {
                        'autocomplete-itemAppend': true,
                    },
                    itemStyle: {
                        color: 'green',
                    },
                    itemClassList: {
                        'autocomplete-item-class': true,
                    },
                    selectFun: value => {
                        // 当前选中的值
                        console.log(value);
                    },
                },
                {
                    ...common,
                    name: 'cascader',
                    label: '级联',
                    type: 'cascader',

                    data: cascaderData, // 可选项数据源，键名可通过 Props 属性配置
                    props: {
                        // 配置选项，具体见element级联Props
                        children: 'allDistrictDTOList',
                        value: 'districtId',
                        label: 'districtName',
                    },
                    debounce: 300, // 搜索关键词输入的去抖延迟，毫秒
                    filterable: true, // 是否可搜索选项
                    separator: '', // 分隔符 默认/
                    clearable: true, // 是否可清除
                    change_on_select: true, // 是否允许选择任意一级的选项
                    selectFun: value => {
                        //当绑定值变化时触发的事件
                        console.log(value);
                    },
                },
                {
                    ...common,
                    name: 'select',
                    label: '选择AAAAA',
                    type: 'select',
                    multiple: true, // 是否可多选
                    // multipleLimit: 2, // 多选限制
                    // allowCreate: true, // 是否允许创建
                    // filterable: true, // 是否可搜索
                    // clearable: true, // 是否可清除
                    data: [
                        { value: 'value', label: 'label', unit: 'aaa' },
                        { itemValue: 'itemValue', itemLabel: 'itemLabel', unit: 'yyy' },
                        { paramValue: 'paramValue', paramName: 'paramName', unit: 'eee' },
                        { id: 'id', name: 'name', unit: 'bbb' },
                    ], // 可选项数据源，键名可通过 Props 属性配置
                    // filterSearch: () => {}, // 远程搜索
                    selectFun: value => {
                        if (value === 'value') {
                            this.$set(this, 'needRequired', true);
                        } else {
                            this.$set(this, 'needRequired', false);
                        }
                    }, // 选择函数
                    optionAppendName: 'unit',
                },
                {
                    ...common,
                    name: 'twoDate', // 开始时间 begintwoDate， 结束时间 endtwoDate
                    label: '两个日期',
                    type: 'twoDate',
                    required: this.needRequired,
                    dateType: 'month', // 类型 默认datetime
                    format: 'yyyy-MM-dd HH', // 格式 默认'yyyy-MM-dd HH:mm:ss'
                },
                {
                    ...common,
                    name: 'date', // 开始时间 begintwoDate， 结束时间 endtwoDate
                    label: '一个日期',
                    required: this.needRequired,
                    type: 'date',
                    dateType: 'date', // 类型 默认datetime
                    format: 'yyyy-MM-dd HH', // 格式 默认'yyyy-MM-dd HH:mm:ss'
                },
                {
                    ...common,
                    name: 'twoTime', // 开始时间 begintwoDate， 结束时间 endtwoDate
                    label: '两个时间',
                    required: this.needRequired,
                    type: 'twoTime',
                    dateType: 'time', // 类型 默认datetime
                    format: 'HH:mm', // 格式 默认'yyyy-MM-dd HH:mm:ss'
                },
                {
                    ...common,
                    name: 'time', // 开始时间 begintwoDate， 结束时间 endtwoDate
                    label: '一个时间',
                    type: 'time',
                    dateType: 'time', // 类型 默认time
                    format: 'HH:mm', // 格式 默认'yyyy-MM-dd HH:mm:ss'
                },
                {
                    ...common,
                    name: 'time', // 开始时间 begintwoDate， 结束时间 endtwoDate
                    label: '时间区间',
                    type: 'daterange',
                    // dateType: 'time', // 类型 默认time
                    format: 'yyyy-MM-dd', // 格式 默认'yyyy-MM-dd HH:mm:ss'
                    selectFun: value => {
                        //当绑定值变化时触发的事件
                        console.log(value);
                    },
                },
                {
                    ...common,
                    name: 'textarea',
                    label: '多行文本',
                    type: 'textarea',

                    maxLength: 20, // 最大数量
                    minLength: 10, // 最小数量
                    autosize: {
                        //  最小最大行 默认最小：编辑2行，查看一行，最大10行
                        minRows: 2,
                        maxRows: 10,
                    },
                },
                {
                    // ...common,
                    name: 'switch',
                    label: '开关',
                    type: 'switch',

                    activeColor: '#ff0000', // 打开颜色
                    inactive: '#00ff00', // 关闭颜色
                },
                {
                    ...common,
                    name: 'radio',
                    label: '单选框',
                    type: 'radio',
                    // disabled: true,
                    radioBtn: true, // 是否变成按钮形状

                    data: [
                        // 可选项数据源，键名可通过 Props 属性配置
                        { value: 'value', label: 'label' },
                        { itemValue: 'itemValue', itemLabel: 'itemLabel' },
                        { paramValue: 'paramValue', paramName: 'paramName' },
                        { id: 'id', name: 'name' },
                    ],
                    selectFun: value => {
                        // 选择事件
                        console.log(value);
                    },
                },
                {
                    ...common,
                    name: 'table',
                    label: '表格',
                    type: 'table',
                    tableData: [{}, {}, {}], // 表格数据
                    // table表格表头
                    tableTitle: [
                        { prop: 'num', fixed: 'left', type: 'selection' },
                        { prop: 'id', label: 'ID' },
                    ],
                    showHeader: true, // 是否显示表头
                    stripe: true, // table表格是否有斑马线
                    uniqueSelect: true, // 表格是否单选
                },
                {
                    ...common,
                    name: 'videoOrPicture',
                    label: '视频图片上传',
                    type: 'videoOrPicture',
                    uploadLocal: 'after',
                    multiple: false,
                    maxi: 2, // 最大上传数
                    // hint: '默认图片', // 图片提示 (数组的时候多个，单个字符串)
                    // hint: ['默认图片1', '默认图片2'],
                    flagType: 'picture', // 图片还是视频 video/picture
                    size: 10, // 大小限制
                    isFacePic: false, // 是否展示封面图标
                    uploadUrl: 'http://bigdata-api.apitops.com/api/v1/common/upload/files', // 上传url
                    uploadAK: '31c5df4c-054c-40a9-98fc-99e0fea40ef3', // ak，上传的话是必须的
                    isWrite: false, // 是否展示可写图标
                    isWriteFun: () => {
                        // 是否可写操作
                        console.log('写入图片');
                    },
                    picStyle: {
                        width: '74px',
                        height: '74px',
                    },
                    uploadClass: {
                        'current-upload': true,
                    },
                    // uploadFun: a => {
                    //     console.log('正在上传');
                    //     const p1 = new Promise(function(resolve, reject) {
                    //         resolve({ a: 1 });
                    //     });
                    //     return p1;
                    // },
                },
                {
                    ...common,
                    name: 'handleClick',
                    label: '文本点击事件',
                    type: 'handleClick',
                    handleClickData: 'handleClick', // 当前字段，btnTitle存在的时候不生效
                    btnTitle: '编辑', // 分割标题
                    inputStyle: {
                        color: 'orange',
                    },
                    btnFuntion: () => {
                        // 没有的时候纯展示
                        console.log('操作按钮');
                    },
                },
                {
                    ...common,
                    name: 'tag',
                    label: '标签',
                    type: 'tag',
                    closable: true, // 是否可关闭
                    hit: true, // 是否有描边
                    typeColor: 'success', // 标签样式
                    data: [
                        // 可选项数据源，键名可通过 Props 属性配置
                        { value: 'value', label: 'label' },
                        { itemValue: 'itemValue', itemLabel: 'itemLabel' },
                        { paramValue: 'paramValue', paramName: 'paramName' },
                        { id: 'id', name: 'name' },
                    ],
                    closeFun: value => {
                        // 关闭事件
                        console.log(value);
                    },
                },
                {
                    ...common,
                    name: 'qrcode',
                    label: '二维码',
                    type: 'qrcode',
                    url: 'https://www.baidu.com/',
                    id: 'tops_qrcode1',
                    // qrState: '百度',
                },
                {
                    ...common,
                    name: 'ue',
                    label: '富文本',
                    type: 'ue',
                    span: 24,
                    uploadUrl: 'http://bigdata-api.apitops.com/api/v1/common/upload/files', // 上传url
                    uploadAK: '31c5df4c-054c-40a9-98fc-99e0fea40ef3', // ak，上传的话是必须的
                },
                {
                    ...common,
                    name: 'map',
                    label: '地图',
                    type: 'map',
                    span: 24,
                    inputStyle: {
                        // input框设置样式
                        width: '800px',
                    },
                    bindName: ['lng', 'lat'], // 绑定经纬度的name[经度，纬度]
                },
            ];
        },
        formItemsBtn() {
            let common = {
                name: 'common', // 绑定数据的名字
                label: '公用', // 展示label
                type: 'common', // 对应的type组件
                span: 12, // 当前宽度的多少份，24为100%
                hidden: false, // 是否隐藏当前item
                labelWidth: '140px', // 当前item的宽度，没有的话用form的labelWidth
                disabled: false, // 是否不可编辑
                placehold: '', // 提示语
                // required: true, // 是否必填
                inputStyle: {
                    // item的样式编写
                    width: '460px',
                },
                classList: {
                    // 对表单进行样式调整
                    // 类名: '是否这个类',
                    autocomplete: true,
                },

                rowOrColumn: true, // flex的方向，有connect或extra时用
                connect: '补充', // 符号什么 一到两字
                extra: '补充说明', // 补充说明
                extraStyle: {
                    color: '#00ff00',
                }, //extra样式补充
                extraFun: () => {
                    console.log('点击事件');
                },
            };
            return [
                {
                    // ...common,
                    name: 'switchbtn',
                    label: '',
                    type: 'switch',
                    labelWidth: '0px',

                    activeColor: '#ff0000', // 打开颜色
                    inactive: '#00ff00', // 关闭颜色
                },
                {
                    // ...common,
                    name: 'switchbtn2',
                    label: '',
                    type: 'switch',
                    labelWidth: '10px',

                    activeColor: '#ff0000', // 打开颜色
                    inactive: '#00ff00', // 关闭颜色
                },
                {
                    // ...common,
                    name: 'radio1',
                    label: '',
                    type: 'radio',
                    labelWidth: '10px',
                    // disabled: true,
                    radioBtn: true, // 是否变成按钮形状

                    data: [
                        // 可选项数据源，键名可通过 Props 属性配置
                        { value: 'value', label: 'label' },
                        { itemValue: 'itemValue', itemLabel: 'itemLabel' },
                        { paramValue: 'paramValue', paramName: 'paramName' },
                        { id: 'id', name: 'name' },
                    ],
                    selectFun: value => {
                        // 选择事件
                        console.log(value);
                    },
                },
            ];
        },
    },
};
</script>
<style lang="scss" scoped>
#formitemtest {
    box-sizing: border-box;
    padding: 32px;
    height: 100vh;
    overflow-y: scroll;
}
</style>
<style lang="scss">
#formitemtest {
    .noLeftBorder {
        // .el-input__inner {P
        //     border-color: pink;
        // }
    }
    .autocomplete {
        .el-form-item__label {
            color: pink;
        }
        // .el-input__inner,
        // .el-textarea__inner {
        //     border-color: pink;
        // }
    }
}
</style>
