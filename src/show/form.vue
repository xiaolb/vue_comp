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
            :formSearchWidth="formSearchWidth"
            :flexleftOrCenter="flexleftOrCenter"
            :bottom-fixed="bottomFixed"
        ></Form>
    </div>
</template>
<script>
import cascaderData from './cascader';
export default {
    name: 'formitemtest',
    data() {
        return {
            saveBtnText: '确定',
            cancelBtnText: '返回',
            labelWidth: '250px',
            buttons: [],
            saveBtn: true,
            cancelBtn: true,
            formData: { checkboxs: [], handleClick: 'handleClick' },
            allDisabled: false,
            formSearchWidth: '1200px',
            flexleftOrCenter: 'left',
            bottomFixed: true,
        };
    },
    computed: {
        formItems() {
            let common = {
                name: 'common', // 绑定数据的名字
                label: '公用', // 展示label
                type: 'common', // 对应的type组件
                span: 12, // 当前宽度的多少份，24为100%
                hidden: false, // 是否隐藏当前item
                labelWidth: '140px', // 当前item的宽度，没有的话用form的labelWidth
                disabled: false, // 是否不可编辑
                placehold: '', // 提示语
                required: true, // 是否必填
                inputStyle: {
                    // item的样式编写
                    width: '360px',
                },
            };
            return [
                {
                    ...common,
                    name: 'cut',
                    labelWidth: '0px',
                    label: '分隔符',
                    type: 'cut',
                    span: 24,
                    cutName: '分隔符', // 分割标题
                    btnTitle: '编辑', // 操作字段
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

                    span: 24,
                    rowOrColumn: false, // flex的方向，有connect或extra时用
                    column: false, // 复选框竖着
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

                    connect: '补充', // 符号什么 一到两字
                    extra: '补充说明', // 补充说明
                    extraStyle: {
                        color: '#00ff00',
                    }, //extra样式补充
                    extraFun: () => {
                        console.log('点击事件');
                    },
                },
                {
                    ...common,
                    name: 'input',
                    label: '输入框',
                    type: 'input',

                    rowOrColumn: false, // flex的方向，有connect或extra时用
                    maxLength: 20, // 最大数量
                    minLength: 10, // 最小数量
                    clearable: true, // 是否可清除
                    change: value => {
                        // 字段变换的函数
                        console.log(value, '失去焦点之后');
                    },
                    append: true, // 是否有slot,输入框的操作
                    appendFun: () => {
                        // 和append配套操作
                        console.log('other thing');
                    },
                    connect: '补充', // 符号什么 一到两字
                    extra: '补充说明', // 补充说明
                    extraStyle: {
                        color: '#00ff00',
                    }, //extra样式补充
                    extraFun: () => {
                        console.log('点击事件');
                    },
                },
                {
                    ...common,
                    name: 'number',
                    label: '数字框',
                    type: 'number',

                    rowOrColumn: false, // flex的方向，有connect或extra时用
                    maxi: 20, // 最大数
                    mini: 10, // 最小数
                    precision: 2, // 几位小数

                    connect: '补充', // 符号什么 一到两字
                    extra: '补充说明', // 补充说明
                    extraStyle: {
                        color: '#00ffff',
                    }, //extra样式补充
                    extraFun: () => {
                        console.log('点击事件');
                    },
                },
                {
                    ...common,
                    name: 'autocomplete',
                    label: '自动匹配',
                    type: 'autocomplete',

                    rowOrColumn: false, // flex的方向，有connect或extra时用
                    clearable: true, // 是否可清除
                    querySearchAsync: (filterVaule, cb) => {
                        // 搜索操作
                        console.log('模糊搜索操作', filterVaule, cb);
                    },
                    selectFun: value => {
                        // 当前选中的值
                        console.log(value);
                    },

                    connect: '补充', // 符号什么 一到两字
                    extra: '补充说明', // 补充说明
                    extraStyle: {
                        color: '#f0f',
                    }, //extra样式补充
                    extraFun: () => {
                        console.log('点击事件');
                    },
                },
                {
                    ...common,
                    name: 'cascader',
                    label: '级联',
                    type: 'cascader',

                    rowOrColumn: false, // flex的方向，有connect或extra时用
                    data: cascaderData, // 可选项数据源，键名可通过 Props 属性配置
                    props: {
                        // 配置选项，具体见element级联Props
                        children: 'allDistrictDTOList',
                        value: 'districtId',
                        label: 'districtName',
                    },
                    debounce: 300, // 搜索关键词输入的去抖延迟，毫秒
                    filterable: true, // 是否可搜索选项
                    size: 'small', // 尺寸，默认medium
                    separator: '', // 分隔符 默认/
                    clearable: true, // 是否可清除
                    change_on_select: true, // 是否允许选择任意一级的选项
                    selectFun: value => {
                        //当绑定值变化时触发的事件
                        console.log(value);
                    },

                    connect: '补充', // 符号什么 一到两字
                    extra: '补充说明', // 补充说明
                    extraStyle: {
                        color: '#f0f',
                    }, //extra样式补充
                    extraFun: () => {
                        console.log('点击事件');
                    },
                },
                {
                    ...common,
                    name: 'select',
                    label: '选择',
                    type: 'select',

                    rowOrColumn: false, // flex的方向，有connect或extra时用
                    multiple: true, // 是否可多选
                    multipleLimit: 2, // 多选限制
                    allowCreate: true, // 是否允许创建
                    filterable: true, // 是否可搜索
                    clearable: true, // 是否可清除
                    data: [
                        { value: 'value', label: 'label' },
                        { itemValue: 'itemValue', itemLabel: 'itemLabel' },
                        { paramValue: 'paramValue', paramName: 'paramName' },
                        { id: 'id', name: 'name' },
                    ], // 可选项数据源，键名可通过 Props 属性配置
                    // filterSearch: () => {}, // 远程搜索
                    selectFun: value => {
                        console.log(value);
                    }, // 选择函数

                    connect: '补充', // 符号什么 一到两字
                    extra: '补充说明', // 补充说明
                    extraStyle: {
                        color: '#f0f',
                    }, //extra样式补充
                    extraFun: () => {
                        console.log('点击事件');
                    },
                },
                {
                    ...common,
                    name: 'twoDate', // 开始时间 begintwoDate， 结束时间 endtwoDate
                    label: '两个时间',
                    type: 'twoDate',

                    dateType: 'month', // 类型 默认datetime
                    format: 'yyyy-MM-dd HH', // 格式 默认'yyyy-MM-dd HH:mm:ss'
                },
                {
                    ...common,
                    name: 'date', // 开始时间 begintwoDate， 结束时间 endtwoDate
                    label: '一个时间',
                    type: 'date',

                    dateType: 'date', // 类型 默认datetime
                    format: 'yyyy-MM-dd HH', // 格式 默认'yyyy-MM-dd HH:mm:ss'
                },
                {
                    ...common,
                    name: 'textarea',
                    label: '多行文本',
                    type: 'textarea',

                    rowOrColumn: false, // flex的方向，有connect或extra时用
                    maxLength: 20, // 最大数量
                    minLength: 10, // 最小数量
                    autosize: {
                        //  最小最大行 默认最小：编辑2行，查看一行，最大10行
                        minRows: 2,
                        maxRows: 10,
                    },

                    connect: '补充', // 符号什么 一到两字
                    extra: '补充说明', // 补充说明
                    extraStyle: {
                        color: '#00ff00',
                    }, //extra样式补充
                    extraFun: () => {
                        console.log('点击事件');
                    },
                },
                {
                    ...common,
                    name: 'switch',
                    label: '开关',
                    type: 'switch',

                    rowOrColumn: false, // flex的方向，有connect或extra时用
                    activeColor: '#ff0000', // 打开颜色
                    inactiveColor: '#00ff00', // 关闭颜色

                    connect: '补充', // 符号什么 一到两字
                    extra: '补充说明', // 补充说明
                    extraStyle: {
                        color: '#00ff00',
                    }, //extra样式补充
                    extraFun: () => {
                        console.log('点击事件');
                    },
                },
                {
                    ...common,
                    name: 'radio',
                    label: '单选框',
                    type: 'radio',
                    // disabled: true,
                    radioBtn: true, // 是否变成按钮形状
                    rowOrColumn: false, // flex的方向，有connect或extra时用
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

                    connect: '补充', // 符号什么 一到两字
                    extra: '补充说明', // 补充说明
                    extraStyle: {
                        color: '#00ff00',
                    }, //extra样式补充
                    extraFun: () => {
                        console.log('点击事件');
                    },
                },
                {
                    ...common,
                    name: 'table',
                    label: '表格',
                    type: 'table',
                    tableData: [{}, {}, {}], // 表格数据
                    // table表格表头
                    tableTitle: [{ prop: 'num', fixed: 'left', type: 'selection' }, { prop: 'id', label: 'ID' }],
                    showHeader: true, // 是否显示表头
                    stripe: true, // table表格是否有斑马线
                    uniqueSelect: true, // 表格是否单选
                },
                {
                    ...common,
                    name: 'videoOrPicture',
                    label: '视频图片上传',
                    type: 'videoOrPicture',

                    maxi: 3, // 最大上传数
                    hint: '默认图片', // 图片提示 (数组的时候多个，单个字符串)
                    // hint: ['默认图片1', '默认图片2'],
                    flagType: 'picture', // 图片还是视频 video/picture
                    size: 10, // 大小限制
                    isFacePic: true, // 是否展示封面图标
                    uploadUrl: 'http://bigdata-api.apitops.com/api/v1/common/upload/files', // 上传url
                    uploadAK: '31c5df4c-054c-40a9-98fc-99e0fea40ef3', // ak，上传的话是必须的
                    isWrite: true, // 是否展示可写图标
                    isWriteFun: () => {
                        // 是否可写操作
                        console.log('写入图片');
                    },
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