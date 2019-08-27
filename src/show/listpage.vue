<template>
    <div id="listpage">
        <list-page
            ref="listpage"
            :formSearchItems="formSearchItems"
            :formSearchWidth="formSearchWidth"
            :tableState="tableState"
            :restButtons="restButtons"
            :filterBtn="filterBtn"
            :title="title"

            :searchParams="searchParams"

            :tableData="tableData"
            :tableTitle="tableTitle"
            :searchList="searchList"
            :stripe="false"
            :borderTable="true"
            :showHeader="true"
            :uniqueSelect="true"
            :mergeSpan="mergeSpan"
        ></list-page>
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
        <modal-form
            v-if="preVisible"    
            :width="'500px'"
            :search="true"
            :visible="preVisible"
            :nobtn="true"
            @onCancel="onCancel"
        >
            <div slot="header" class="modalHeader">
                <h2>文章预览</h2>
                <section>
                    <a @click="() => {}">编辑</a>
                    <a @click="() => {}">推送</a>
                    <a @click="() => {}">关联房源</a>
                </section>
            </div>
            <Form
                :form-items="formImmediateItems"
                :form-data="searchParams"
                :labelWidth="'120px'"
                :cancel-btn="false"
                :save-btn="false"
                :bottom-fixed="true"
            >
            </Form>
            <div slot="footer" class="modalFooter">
                <el-button type="primary" @click="()=>{}">确定</el-button>
                <el-button @click="()=>{}">取 消</el-button>
            </div>
        </modal-form>
    </div>
</template>
<script>
import { debounce } from '@/components/utils';
import * as restureObj from './listpage';
console.log(restureObj);

export default {
    name: 'listpageTest',
    data() {
        return {
            // listPage 字段
            tableState: '关于表格的说明',
            formSearchWidth: '481px',
            title: '某某列表',
            searchParams: {
                pageIndex: 1,
                pageSize: 20,
                count: restureObj.tableData.count,
            },
            searchList: params => {
                console.log('params');
                this.searchInit(params);
            },
            tableData: restureObj.tableData.items.slice(0, 20),
            tableTitle: [
                { prop: 'num', fixed: 'left', type: 'selection', width: '35' },
                { prop: 'id', label: 'ID', width: 80 },
                {
                    prop: 'name',
                    label: '楼盘名称',
                    width: 120,
                    render: row => {
                        return <a onClick={() => {}}>{row.name}</a>;
                    },
                },
                { prop: 'developer', label: '开发商品牌', width: 120 },
                {
                    prop: 'villageName',
                    label: '所属小区',
                    width: 120,
                    render: row => {
                        return <a onClick={() => {}}>{row.villageName}</a>;
                    },
                },
                {
                    prop: 'areaName',
                    label: '所在地区',
                    render: row => {
                        return (
                            <p>
                                {row.city} {row.district}
                            </p>
                        );
                    },
                },
                {
                    prop: 'propertyTypeNameList',
                    label: '物业类型',
                    render: row => {
                        return <p>{row.propertyTypeNameList && row.propertyTypeNameList.join()}</p>;
                    },
                },
                { prop: 'newhouseType', label: '类型', width: 66 },
                { prop: 'source', label: '来源' },
                {
                    prop: 'mergebig',
                    width: 220,
                    label: '时间和人',
                    align: 'center',
                    mergeColHeader: [
                        {
                            prop: 'creatorName',
                            label: '发布人',
                            align: 'center',
                            width: 148,
                            render: row => {
                                return (
                                    <p>
                                        {row.creatorName}
                                        {row.creatorName && row.phone && <br />}
                                        {row.phone}
                                    </p>
                                );
                            },
                        },
                        {
                            prop: 'merge',
                            width: 220,
                            label: '时间',
                            align: 'center',
                            mergeColHeader: [
                                {
                                    prop: 'firstLiveTime',
                                    label: '入市时间',
                                    width: 110,
                                    align: 'center',
                                    sortable: true,
                                    filterSort: () => this.filterSort(),
                                },
                                {
                                    prop: 'updateTime',
                                    label: '更新时间',
                                    width: 110,
                                    align: 'center',
                                    sortable: true,
                                    filterSort: () => this.filterSort(),
                                },
                            ],
                        },
                    ],
                },
                { prop: 'sellStatus', label: '销售状态', width: 78 },
                {
                    prop: 'onlineStatus',
                    label: '状态',
                    width: 60,
                    render: row => {
                        return (
                            <p>
                                {row.onlineStatus === 0 && <span class="red">×</span>}
                                {row.onlineStatus === 1 && <span class="green">√</span>}
                            </p>
                        );
                    },
                },
                {
                    label: '操作',
                    width: 100,
                    fixed: 'right',
                    render: row => {
                        return (
                            <div class="flex specialStyle">
                                <a onClick={() => {}}>详情</a>
                                <a onClick={() => {}}>编辑</a>
                            </div>
                        );
                    },
                },
            ],
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
                        // this.searchVisible = true;
                        this.preVisible = true;
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
            ];
        },
    },
    methods: {
        searchInit(params) {
            console.log(params);

            this.searchParams = params;
            this.tableData = restureObj.tableData.items.slice(0, params.pageSize);
        },
        filterSort() {
            console.log('排序操作');
        },
        mergeSpan({ row, column, rowIndex, columnIndex }) {
            if (rowIndex % 2 === 0) {
                if (columnIndex === 6) {
                    return [1, 2];
                } else if (columnIndex === 7) {
                    return [0, 0];
                }
            }

            if (columnIndex === 1 || columnIndex === 14) {
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1,
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0,
                    };
                }
            }
        },

        // 取消弹窗
        onCancel() {
            this.searchVisible = false;
            this.preVisible = false;
        },
    },
};
</script>

<style lang="scss" scoped>
#listpage {
    .red {
        color: #ff0000;
    }
    .green {
        color: #008000;
    }
    .flex {
        display: flex;
        justify-content: flex-start;
    }
    .specialStyle {
        a {
            width: auto;
            margin-left: 4px;
            margin-right: 4px;
            cursor: pointer;
        }
        a:nth-child(0) {
            margin-left: 0;
        }
    }
    .modalHeader {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0px 16px;
        height: 54px;
        border-bottom: 1px solid #cccccc;
        h2 {
            margin: 0;
        }
        a {
            padding-left: 4px;
        }
    }
    .modalFooter {
        box-shadow: 2px 0px 5px #ccc;
        background: white;
        padding: 8px 0 12px 136px;
    }
}
</style>