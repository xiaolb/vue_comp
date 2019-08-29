<template>
    <div class="listPage">
        <search-item
            v-if="noSearch"
            class="listPage_search"
            :form-search-items="formSearchItems"
            :search-params="searchParams"
            :rest-buttons="restButtons"
            :filter-btn="filterBtn"
            :table-state="tableState"
            :title="title"
            :form-search-width="formWidth"
        ></search-item>
        <table-item
            ref="tableSelect"
            class="listPage_table"
            :from-type="'listPage'"
            :stripe="stripe"
            :border-table="borderTable"
            :table-data="tableData"
            :table-title="tableTitle"
            :search-params="searchParams"
            :show-header="showHeader"
            :merge-span="mergeSpan"
            :unique-select="!!uniqueSelect"
            @searchList="searchList"
        ></table-item>
    </div>
</template>

<script>
import SearchItem from '@/components/search/';
import TableItem from '@/components/table/';

export default {
    name: 'ListPage',
    components: {
        SearchItem,
        TableItem,
    },
    props: {
        // 是否有搜索
        noSearch: {
            type: Boolean,
            default: true,
        },
        // 搜索选项
        formSearchItems: {
            type: Array,
            default: () => [],
        },
        // 搜索请求字段数据及表格分页数据
        searchParams: {
            type: Object,
            required: true,
            default: () => {},
        },
        // 其他的操作按钮。新增之类的
        restButtons: {
            type: Array,
            default: () => [],
        },
        // 筛选按钮
        filterBtn: {
            type: Array,
            default: () => [],
        },
        // 斑马线
        stripe: {
            type: Boolean,
            default: true,
        },
        // 列表数据
        tableData: {
            type: Array,
            required: true,
        },
        // 列表表头
        tableTitle: {
            type: Array,
            required: true,
        },
        // 搜索函数
        searchList: {
            type: Function,
            required: true,
        },
        // 表格的数据提示
        tableState: {
            type: String,
            default: '',
        },
        // 当前页的title提示
        title: {
            type: String,
            default: '',
        },
        // 搜索时表单的宽度
        formWidth: {
            type: String,
            default: '',
        },
        //table是否需要表格
        borderTable: {
            type: Boolean,
            default: true,
        },
        // 显示头部
        showHeader: {
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
};
</script>

<style lang="scss">
.listPage {
    padding: 0px 16px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 20px);
    max-height: 100vh;
    .listPage_search {
        height: auto;
    }
    .listPage_table {
        flex-grow: 1;
        overflow: hidden;
    }
}
</style>
