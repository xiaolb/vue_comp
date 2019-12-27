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
            :class="{ noData: !tableData.length,showEmptyPic: this.showEmptyPic }"
            :max-height="height"
            @sort-change="sortMethod"
            @selection-change="handleSelectionChange"
            @filter-change="filteredChange"
            @header-click="headerClick"
            :show-summary="showSummary"
            :sum-text="sumText"
            :summary-method="summaryMethod"
        >
            <template v-for="colItem of tableTitle">
                <el-table-column
                    v-if="!colItem.hidden"
                    :key="colItem.prop"
                    :type="colItem.type"
                    :width="colItem.width"
                    :min-width="colItem.minWidth"
                    :align="colItem.align || 'left'"
                    :prop="colItem.prop"
                    :class-name="colItem.className"
                    :label-class-name="colItem.labelClassName"
                    :fixed="colItem.fixed"
                    :label="colItem.label"
                    :sortable="colItem.sortable"
                    :sort-method="a => colItem.filterSort(a) || function() {}"
                    :formatter="colItem.render || (rows => hintValue(rows[colItem.prop]))"
                    :render-header="colItem.renderHeader"
                    :filters="colItem.filters"
                    :filter-method="colItem.filterHandler"
                    :filter-placement="colItem.filterPlacement || 'bottom-end'"
                    :filter-multiple="colItem.filterMultiple"
                    :filtered-value="colItem.filteredValue"
                    :column-key="colItem.prop"
                >
                    <template v-if="colItem.mergeColHeader">
                        <el-table-column
                            v-for="colTwoItem of colItem.mergeColHeader || []"
                            :key="colTwoItem.prop"
                            :width="colTwoItem.width"
                            :min-width="colTwoItem.minWidth"
                            :align="colTwoItem.align || 'left'"
                            :prop="colTwoItem.prop"
                            :label="colTwoItem.label"
                            :sortable="colTwoItem.sortable"
                            :sort-method="a => colTwoItem.filterSort(a) || function() {}"
                            :formatter="colTwoItem.render || (rows => hintValue(rows[colTwoItem.prop]))"
                            :render-header="colTwoItem.renderHeader"
                            :filters="colTwoItem.filters"
                            :filter-method="colTwoItem.filterHandler"
                            :filter-placement="colTwoItem.filterPlacement || 'bottom-end'"
                            :filter-multiple="colTwoItem.filterMultiple"
                            :filtered-value="colTwoItem.filteredValue"
                            :class-name="colTwoItem.className"
                            :label-class-name="colTwoItem.labelClassName"
                            :column-key="colTwoItem.prop"
                        >
                            <template v-if="colTwoItem.mergeColHeader">
                                <el-table-column
                                    v-for="colThreeItem of colTwoItem.mergeColHeader || []"
                                    :key="colThreeItem.prop"
                                    :width="colThreeItem.width"
                                    :min-width="colThreeItem.minWidth"
                                    :align="colThreeItem.align || 'left'"
                                    :prop="colThreeItem.prop"
                                    :label="colThreeItem.label"
                                    :sortable="colThreeItem.sortable"
                                    :sort-method="a => colThreeItem.filterSort(a) || function() {}"
                                    :formatter="colThreeItem.render || (rows => hintValue(rows[colThreeItem.prop]))"
                                    :render-header="colThreeItem.renderHeader"
                                    :filters="colThreeItem.filters"
                                    :filter-method="colThreeItem.filterHandler"
                                    :filter-placement="colThreeItem.filterPlacement || 'bottom-end'"
                                    :filter-multiple="colThreeItem.filterMultiple"
                                    :filtered-value="colThreeItem.filteredValue"
                                    :class-name="colThreeItem.className"
                                    :label-class-name="colThreeItem.labelClassName"
                                    :column-key="colThreeItem.prop"
                                >
                                </el-table-column>
                            </template>
                        </el-table-column>
                    </template>
                </el-table-column>
            </template>
            
        </el-table>
        <!-- 简版分页控件 -->
         <div v-if="simplePagination && searchParams.count" class="pagination small-pagination">
            <el-pagination
                background
                :current-page.sync="searchParams.pageIndex"
                layout="prev, pager, next"
                :total="searchParams.count"
                :page-size.sync="searchParams.pageSize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
        <div v-else-if="searchParams.count || tableButtons.length > 0" class="pagination">
            <span v-if="searchParams.count" class="currentPageCount">共 {{ searchParams.count }} 条&nbsp;&nbsp;当前显示 {{ currentPageCount }} 条&nbsp;</span>
            <el-pagination
                v-if="searchParams.count"
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
            <div v-if="tableButtons.length > 0" :class="{ tableButtons: true }">
                <div v-for="(btn) of tableButtons" :key="btn.name" :class="{ tableButton: true }">
                    <el-button
                        :class="{hasCircle: btn.hasCircle}"
                        v-if="!btn.hidden"
                        :disabled="!!btn.disabled"
                        :type="btn.type || 'primary'"
                        size='small'
                        @click="btn.onclick"
                    >{{ btn.name }}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { debounceWork, getNum } from '@/components/utils';
export default {
    name: 'TableItem',
    components: {},
    props: {
        //table表格是否有斑马线
        stripe: {
            type: Boolean,
            default: true,
        },
        //是否显示表头
        showHeader: {
            type: Boolean,
            default: true,
        },
        //table表格数据
        tableData: {
            type: Array,
            required: true,
            default: () => [],
        },
        //table表格表头
        tableTitle: {
            type: Array,
            required: true,
            default: () => [],
        },
        // 搜索请求字段数据及表格分页数据
        searchParams: {
            type: Object,
            required: true,
            default: () => {},
        },
        // 是从哪过来
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
        // table其他的操作
        tableButtons: {
            type: Array,
            default: () => [],
        },
        // table监听排序变化
        sortMethod: {
            type: Function,
            default: () => {},
        },
        // 是否显示简单版分页控件
        simplePagination: {
            type: Boolean,
            default: false,
        },
        // 是否显示列表缺省图片
        showEmptyPic: {
            type: Boolean,
            default: true,
        },
        // 是否在表尾显示合计行
        showSummary: {
            type: Boolean,
            default: false,
        },
        // 是否在表尾显示合计行
        sumText: {
            type: String,
            default: '合计',
        },
        // 自定义的合计计算方法
        summaryMethod: {
            type: Function,
            default: () => {},
        },
    },
    data() {
        return {
            multipleSelection: [],
            height: 10000,
            elTableClass: `table_${getNum()}`,
        };
    },
    computed: {
        currentPageCount() {
            const tempcount = this.searchParams.pageSize * this.searchParams.pageIndex;
            const pre = this.searchParams.pageSize * (this.searchParams.pageIndex - 1) + 1;
            const last = tempcount > this.searchParams.count ? this.searchParams.count : tempcount;
            return `${pre}-${last}`;
        },
        hasData() {
            return this.tableData && this.tableData[0] && this.tableData[0].childItems.length;
        },
    },
    mounted() {
        // 给modal添加类
        this.addClass();
        // 注册全局事件;

        window.topsTableChangeHeight.push({
            id: this.elTableClass,
            func: this.changeHeight,
        });
    },
    watch: {
        showSummary(newValue) {
            if (newValue) {
                this.$nextTick(() => {
                    const el = document.querySelector(`.${this.elTableClass} .el-table__footer-wrapper`);
                    this.$refs.multipleTable.layout.footerHeight = el.offsetHeight || el.clientHeight;
                    setTimeout(() => {
                        this.$refs.multipleTable.syncPostion();
                    }, 0);
                });
            } else {
                this.$refs.multipleTable.layout.footerHeight = 0;
            }
        },
    },
    updated() {
        this.changeHeight();
        this.isNoBorder();
    },
    methods: {
        isNoBorder() {
            const tableRows = document.querySelectorAll(`.${this.elTableClass} .el-table__row`);
            if (!this.borderTable) {
                tableRows.forEach(element => {
                    element.classList.add('noTableBorder');
                });
            } else {
                tableRows.forEach(element => {
                    element.classList.add('hasTableBorder');
                });
            }
        },
        addClass() {
            // 当前模态框唯一标识
            this.$vnode.elm.classList.add(this.elTableClass);
        },
        changeHeight() {
            if (!debounceWork('table', 500)) {
                return;
            }
            setTimeout(() => {
                const data_table = document.querySelector(`.${this.elTableClass}`);

                const pageHeight = this.searchParams.count || this.tableButtons.length > 0 ? 0 : 44;
                if (!data_table) {
                    return;
                }
                const tableHeight = data_table.offsetHeight;
                if (this.fromType === 'other') {
                    this.height = window.innerHeight - data_table.offsetTop - 72 + pageHeight;
                } else if (this.fromType === 'listPage') {
                    this.height = tableHeight - 44 + pageHeight;
                } else if (this.fromType === 'form') {
                    this.height = 10000;
                }
                if (tableHeight === 0) {
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
                case 'filtervalue':
                    this.$emit('searchList', {
                        ...this.searchParams,
                        ...val,
                    });
                    break;
            }
        },
        filteredChange(a) {
            this.search(a, 'filtervalue');
        },
        handleSizeChange(val) {
            this.search(val, 'size');
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.search(val, 'current');
            console.log(`当前页: ${val}`);
        },
        headerClick(column, event) {
            this.$emit('headerClick', column, event);
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
    destroyed() {
        window.topsTableChangeHeight = window.topsTableChangeHeight.filter(item => item.id !== this.elTableClass);
    },
};
</script>

<style lang="scss">
@import './index.scss';
.data_table {
    width: 100%;
    .hasTableBorder {
        td {
            border-right: 1px solid #ebeef5;
        }
    }
    .noTableBorder {
        td {
            border-right: none;
        }
    }
    .el-table__fixed-right-patch {
        background: #f5f7fa;
    }
    .pagination {
        display: flex;
        justify-content: flex-end;
        padding: 12px 0 0;
        .el-pagination {
            padding: 0;
            width: auto;
            display: flex;
            justify-content: flex-end;
        }
        &.small-pagination {
            .el-pagination {
                margin: 0 auto;
            }
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
    .tableButtons {
        display: flex;
    }
    .tableButton {
        margin-left: 10px;
        .hasCircle {
            position: relative;
        }
        .hasCircle::after {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #fb5455;
            border-radius: 50%;
            position: absolute;
            top: -4px;
            right: -4px;
        }
    }
    .tableButton:nth-child(1) {
        margin-left: 38px;
    }
    .showEmptyPic {
        .el-table__empty-block {
            flex-direction: column;
            height: 300px !important;
            .el-table__empty-text {
                font-size: 18px;
            }
        }
        .el-table__empty-block:before {
            content: '';
            display: block;
            width: 120px;
            height: 120px;
            background: url('http://top-static.oss-cn-hangzhou.aliyuncs.com/h5/common/images/ico_infonull@3x.png') no-repeat center center;
            background-size: contain;
        }
    }
    th.el-table-column--selection .cell {
        display: none;
    }
}
</style>
