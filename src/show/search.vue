<template>
    <div id="search">
        <search-item
            ref="search"
            :formSearchItems="formSearchItems"
            :formSearchWidth="formSearchWidth"
            :tableState="tableState"
            :restButtons="restButtons"
            :filterBtn="filterBtn"
            :title="title"
            :searchParams="searchParams"
        ></search-item>
        <modal-form
            v-if="searchVisible" 
            :title="'高级筛选'"
            :width="'500px'"
            ref="highSearch"
            :visible="searchVisible"
            :formDialogItems="formImmediateItems"
            @onCancel="onCancel"
            :modalBtns="modalBtns"
            :formData="searchParams"
            :search="true"
            :bottomFixed="false"
        ></modal-form>
    </div>
</template>
<script>
import * as restureObj from './listpage';
export default {
    name: 'searchItemTest',
    data() {
        return {
            // search 字段
            title: '某某搜索',
            formSearchWidth: '481px',
            tableState: '关于表格的说明',
            searchParams: {
                pageIndex: 1,
                pageSize: 20,
                count: restureObj.tableData.count,
            },
            restButtons: [
                { name: '上线', type: 'primary', btnType: 'btn', onclick: () => {} },
                { name: '下线', type: 'danger', btnType: 'btn', onclick: () => {} },
                { name: '批量上线', type: 'info', btnType: 'groupbtn', onclick: () => {} },
                { name: '批量下线', type: 'warning', btnType: 'groupbtn', onclick: () => {} },
                { name: '批量导入', type: 'success', btnType: 'groupbtn', onclick: () => {} },
                { name: '批量导出', type: 'default', btnType: 'groupbtn', onclick: () => {} },
                {
                    name: '代理商楼盘添加',
                    type: 'primary',
                    btnType: 'dropbtn',
                    dropData: [{ value: 'grab', label: '即时抓取' }, { value: 'add', label: '楼盘添加' }],
                    onclick: () => {},
                    dropClick: value => {
                        console.log(value);
                    },
                },
            ],
            // restButtons: [],

            // 刷选按钮
            filterBtn: [
                {
                    name: '筛选',
                    type: 'default',
                    onclick: () => {
                        this.searchVisible = true;
                    },
                },
            ],
            // filterBtn: [],

            // modalForm 字段
            searchVisible: false,
            preVisible: false,
            // 高级搜索的点击事件及按钮
            modalBtns: [
                {
                    name: '搜 索',
                    typy: 'primary',
                    onclick: () => {},
                },
                {
                    name: '重 置',
                    onclick: params => {},
                },
            ],
        };
    },
    computed: {
        formSearchItems() {
            return [
                {
                    name: 'provinceId',
                    label: '',
                    type: 'select',
                    placehold: '请选择省份',
                    span: 8,
                    labelWidth: '0px',
                    data: [],
                    selectFun: id => {},
                },
                {
                    name: 'keyword',
                    type: 'input',
                    placehold: '通过楼盘名称、小区、开发商名称等搜索',
                    span: this.filterBtn.length > 0 ? 13 : 16,
                    labelWidth: '6px',
                    append: true,
                    appendFun: () => {},
                },
            ];
        },
        // 高级搜索formItems
        formImmediateItems() {
            return [
                { name: 'countryId', label: '区域', type: 'input', span: 24 },
                { name: 'provinceId', label: '省份', type: 'input', span: 24 },
                { name: 'cityId', label: '城市', type: 'input', span: 24 },
                { name: 'districtId', label: '区域', type: 'input', span: 24 },
                { name: 'districtId1', label: '区域', type: 'input', span: 24 },
                { name: 'districtId2', label: '区域', type: 'input', span: 24 },
                { name: 'districtId3', label: '区域', type: 'input', span: 24 },
                { name: 'districtId4', label: '区域', type: 'input', span: 24 },
                { name: 'districtId5', label: '区域', type: 'input', span: 24 },
                { name: 'blockId', label: '板块', type: 'input', span: 24 },
                { name: 'source', label: '来源', type: 'input', span: 24 },
                { name: 'sellStatus', label: '销售状态', type: 'input', span: 24 },
                { name: 'isTest', label: '是否测试', type: 'input', span: 24 },
                { name: 'propertyType', label: '物业类型', type: 'input', span: 24 },
                { name: 'onlineStatus', label: '状态', type: 'input', span: 24 },
                { name: 'developer', label: '开发商', type: 'input', span: 24 },
                { name: 'projectName', label: '项目公司', type: 'input', span: 24 },
                { name: 'developerBrand', label: '开发商品牌', type: 'input', span: 24 },
                // { name: 'developerBrand1', label: '', type: 'input', disabled: true, span: 24 },
            ];
        },
    },
    methods: {
        // 取消弹窗
        onCancel() {
            this.searchVisible = false;
            this.preVisible = false;
        },
    },
};
</script>