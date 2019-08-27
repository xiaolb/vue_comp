<template>
    <div class="data_table">
        <el-table
            ref="multipleTable"
            :stripe="stripe"
            :border="borderTable"
            :data="tableData"
            tooltip-effect="dark"
            :style="{ width: '100%' }"
            :span-method="mergeSpan"
            :show-header="showHeader"
            :class="{ noData: !tableData.length }"
            :max-height="height"
            @selection-change="handleSelectionChange"
        >
            <!-- :default-expand-all="true" -->
            <el-table-column v-if="expand" type="expand">
                <template v-if="props.row.childItems.length" slot-scope="props">
                    <table-item
                        ref="tableExpandSelect"
                        :stripe="stripe"
                        :table-data="props.row.childItems"
                        :table-title="props.row.childItems.length > 0 ? tableTitle : tableTitle.slice(1)"
                        :search-params="searchParams"
                        :show-header="false"
                        @searchList="() => {}"
                    ></table-item>
                </template>
            </el-table-column>
            <el-table-column
                v-for="colItem of expand ? tableTitle.slice(1) : tableTitle"
                :key="colItem.prop"
                :type="colItem.type"
                :width="colItem.width"
                :align="colItem.align || 'left'"
                :prop="colItem.prop"
                :fixed="colItem.fixed"
                :label="colItem.label"
                :sortable="colItem.sortable"
                :sort-method="a => colItem.filterSort(a) || function() {}"
                :formatter="colItem.render || (rows => hintValue(rows[colItem.prop]))"
            >
                <template v-if="colItem.mergeColHeader">
                    <el-table-column
                        v-for="colTwoItem of colItem.mergeColHeader || []"
                        :key="colTwoItem.prop"
                        :width="colTwoItem.width"
                        :align="colTwoItem.align || 'left'"
                        :prop="colTwoItem.prop"
                        :label="colTwoItem.label"
                        :sortable="colTwoItem.sortable"
                        :sort-method="a => colTwoItem.filterSort(a) || function() {}"
                        :formatter="colTwoItem.render || (rows => hintValue(rows[colTwoItem.prop]))"
                    >
                        <template v-if="colTwoItem.mergeColHeader">
                            <el-table-column
                                v-for="colThreeItem of colTwoItem.mergeColHeader || []"
                                :key="colThreeItem.prop"
                                :width="colThreeItem.width"
                                :align="colThreeItem.align || 'left'"
                                :prop="colThreeItem.prop"
                                :label="colThreeItem.label"
                                :sortable="colThreeItem.sortable"
                                :sort-method="a => colThreeItem.filterSort(a) || function() {}"
                                :formatter="colThreeItem.render || (rows => hintValue(rows[colThreeItem.prop]))"
                            >
                            </el-table-column>
                        </template>
                    </el-table-column>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="searchParams.count" class="pagination">
            <span class="currentPageCount">共 {{ searchParams.count }} 条&nbsp;&nbsp;当前显示 {{ currentPageCount }} 条&nbsp;</span>
            <el-pagination
                background
                :current-page="searchParams.pageIndex"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="searchParams.pageSize"
                layout=" sizes, prev, pager, next, jumper"
                :total="searchParams.count"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { debounceWork } from '@/components/utils';
export default {
    name: 'TableItem',
    components: {},
    props: {
        stripe: {
            type: Boolean,
            default: true,
        },
        showHeader: {
            type: Boolean,
            default: true,
        },
        tableData: {
            type: Array,
            required: true,
            default: () => [],
        },
        tableTitle: {
            type: Array,
            required: true,
            default: () => [],
        },
        searchParams: {
            type: Object,
            required: true,
            default: () => {},
        },
        // 是否是从哪过来
        fromType: {
            type: String,
            default: 'other',
        },
        //table是否需要表格
        borderTable: {
            type: Boolean,
            default: true,
        },
        // 合并行和列
        mergeSpan: {
            type: Function,
            default: () => {},
        },
        // 是否单选
        uniqueSelect: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            multipleSelection: [],
            height: 10000,
        };
    },
    computed: {
        currentPageCount() {
            const tempcount = this.searchParams.pageSize * this.searchParams.pageIndex;
            const pre = this.searchParams.pageSize * (this.searchParams.pageIndex - 1) + 1;
            const last = tempcount > this.searchParams.count ? this.searchParams.count : tempcount;
            return `${pre}-${last}`;
        },
        expand() {
            return this.tableTitle && this.tableTitle[0] && this.tableTitle[0].type === 'expand';
        },
        hasData() {
            return this.tableData && this.tableData[0] && this.tableData[0].childItems.length;
        },
    },
    mounted() {
        window.onresize = () => {
            this.changeHeight();
        };
    },
    updated() {
        this.changeHeight();
    },
    methods: {
        changeHeight() {
            if (!debounceWork('table', 500)) {
                return;
            }
            setTimeout(() => {
                if (!this.searchParams.count) {
                    this.height = 10000;
                    return;
                }
                const tableHeight = document.querySelector('.data_table').offsetHeight;
                if (this.fromType === 'other') {
                    this.height = window.innerHeight - document.querySelector('.data_table').offsetTop - 90;
                } else if (this.fromType === 'listPage') {
                    this.height = tableHeight - 56;
                } else if (this.fromType === 'form') {
                    this.height = 10000;
                }
            }, 500);
        },
        search(val, type) {
            console.log(type, val);
            switch (type) {
                case 'current':
                    this.$emit('searchList', {
                        ...this.searchParams,
                        pageIndex: val,
                    });
                    break;
                case 'size':
                    this.$emit('searchList', {
                        ...this.searchParams,
                        pageSize: val,
                    });
                    break;
            }
        },
        handleSizeChange(val) {
            this.search(val, 'size');
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.search(val, 'current');
            console.log(`当前页: ${val}`);
        },
        handleSelectionChange(val) {
            if (this.uniqueSelect) {
                this.uniqueSelectFun(val);
                this.multipleSelection = [val[val.length - 1]];
            } else {
                this.multipleSelection = val;
            }
            console.log(this.multipleSelection);
        },
        uniqueSelectFun(val) {
            const arr = val.slice(0, -1);
            arr.map(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
        },
        hintValue(value) {
            return value === '' || value === undefined || value === null ? '-' : value;
        },
    },
};
</script>

<style lang="scss">
.data_table {
    width: 100%;
    .pagination {
        display: flex;
        justify-content: flex-end;
        padding: 12px 0 16px;
        .el-pagination {
            padding: 0;
            width: auto;
            display: flex;
            justify-content: flex-end;
        }
        .currentPageCount {
            font-weight: 400;
            font-size: 13px;
            color: #606266;
            line-height: 28px;
        }
    }

    .el-table {
        border-bottom: 1px solid #ebeef5;
        color: rgba(0, 0, 0, 0.65);
        a {
            color: #409eff;
        }
    }
    .el-table td {
        padding: 0;
        .cell {
            max-height: 54px;
            padding-top: 4px;
            // padding-left: 40px;
            padding-bottom: 4px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            line-height: 21px;
        }
        .cell p {
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }
        .cell a {
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            display: -webkit-box;
        }
        .cell p a {
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            display: -webkit-box;
        }
    }
    .noData {
        height: auto;
    }
    .el-table th {
        padding: 6px 0;
        background-color: #f5f7fa;
        color: #303133;
    }
    .el-table__expanded-cell[class*='cell'] {
        padding: 0 0 0 47px;
    }
    .el-table__expanded-cell {
        border: none;
        .el-table {
            height: auto;
            border: none;
            border-left: 1px solid #ebeef5;
        }
    }
    .el-table::before {
        height: 0;
    }
    .el-table__row p {
        margin: 0px 0;
    }
    .el-table {
        thead {
            tr {
                height: 52px;
            }
        }
        tbody {
            tr {
                td .cell {
                    padding-top: 7px;
                    padding-bottom: 7px;
                }
            }
        }
    }
}
</style>
