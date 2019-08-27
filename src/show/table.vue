<template>
    <div id="tableItemTest">
        <table-item
            :searchParams="searchParams"

            :tableData="tableData"
            :tableTitle="tableTitle"
            :searchList="searchList"
            :stripe="false"
            :borderTable="true"
            :showHeader="true"
            :uniqueSelect="true"
            :mergeSpan="mergeSpan"
        ></table-item>
    </div>
</template>
<script>
import * as restureObj from './listpage';
export default {
    name: 'tableItemTest',
    data() {
        return {
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
        };
    },
    methods: {
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
    },
};
</script>
<style lang="scss" scoped>
#tableItemTest {
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
}
</style>