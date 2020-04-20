<template>
    <div class="tops_search">
        <div :class="{ spider_form_search: true, noRestBtnStyle: restButtons.length === 0 }">
            <div v-if="title" :class="{ padding12Bottom: true, title: true }">
                {{ title }}
            </div>
            <div
                :style="{
                    paddingBottom: tableState ? '0' : '12px',
                    height: '32px',
                }"
            >
                <div>
                    <el-col
                        v-if="btnButtons.length"
                        :class="{ alignRight: true, btnButton: true }"
                        :style="{
                            width: btnButtons.length * 56 + 12 * btnCount + 'px',
                        }"
                    >
                        <el-button
                            v-for="btn of btnButtons"
                            :key="btn.name"
                            size="small"
                            :type="btn.type || 'primary'"
                            :disabled="btn.disabled"
                            :style="{ color: btn.color, width: 32 + btn.name.length * 12 + 'px' }"
                            @click="btn.onclick"
                        >
                            {{ btn.name }}
                        </el-button>
                    </el-col>
                    <el-col
                        v-if="groupbtnButtons.length"
                        :style="{
                            width: groupbtnButtons.length * (56 - 1) + 12 * groupbtnCount + 1 + 'px',
                            marginLeft: btnButtons.length ? '10px' : '0px',
                        }"
                    >
                        <el-button-group>
                            <el-button
                                v-for="btn of groupbtnButtons"
                                :key="btn.name"
                                size="small"
                                :type="btn.type || 'primary'"
                                :disabled="btn.disabled"
                                :style="{ color: btn.color, width: 32 + btn.name.length * 12 + 'px' }"
                                @click="btn.onclick"
                            >
                                {{ btn.name }}
                            </el-button>
                        </el-button-group>
                    </el-col>
                    <el-col
                        v-if="dropbtnButtons.length"
                        :style="{
                            width: dropbtnButtons.length * 75 + 12 * dropbtnCount + 8 + 1 + 'px',
                            marginLeft: btnButtons.length || groupbtnButtons.length ? '10px' : '0px',
                        }"
                    >
                        <el-dropdown
                            v-for="btn of dropbtnButtons"
                            :key="btn.name"
                            split-button
                            :type="btn.type || 'primary'"
                            :trigger="btn.triggerType || 'hover'"
                            @command="btn.dropClick"
                            @click="btn.onclick"
                        >
                            {{ btn.name }}
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="item of btn.dropData" :key="item.value" :command="item.value">{{
                                    item.label
                                }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </div>
                <div :class="{ flexEnd: true }">
                    <form-item
                        :form-data="searchParams"
                        :form-items="formSearchItems"
                        :save-btn="false"
                        :cancel-btn="false"
                        :search-footer-mar="true"
                        :form-width="formWidth"
                        :buttons="filterBtn"
                        :search-span="searchSpan"
                        :showText="showText"
                        :gridLayout="gridLayout"
                    ></form-item>
                </div>
            </div>
        </div>
        <p v-if="!!tableState" class="label">{{ tableState }}</p>
    </div>
</template>

<script>
import FormItem from '@/components/form/';

export default {
    name: 'SearchItem',
    components: {
        FormItem,
    },
    props: {
        // form搜索表单字段
        formSearchItems: {
            type: Array,
            required: true,
        },
        // form表单的数据
        searchParams: {
            type: Object,
            required: true,
        },
        // 其余的一些操作
        restButtons: {
            type: Array,
            default: () => [],
        },
        // 刷选按钮
        filterBtn: {
            type: Array,
            default: () => [],
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
        // disabled显示文本
        showText: {
            type: Boolean,
            default: false,
        },
        // 是否栅格布局
        gridLayout: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
    computed: {
        searchSpan() {
            let span = 2;
            if (parseFloat(this.formWidth) >= 700) {
                span = 2;
            } else if (parseFloat(this.formWidth) > 480) {
                span = 3;
            } else if (parseFloat(this.formWidth) <= 480) {
                span = 4;
            }
            return span;
        },
        dropbtnButtons() {
            return this.restButtons.filter(a => a.btnType === 'dropbtn' && !a.hidden);
        },
        dropbtnCount() {
            let len = 0;
            this.dropbtnButtons.map(item => (len += item.name.length));
            let diffLen = len - this.dropbtnButtons.length * 2;
            return diffLen > 0 ? diffLen : 0;
        },
        groupbtnButtons() {
            return this.restButtons.filter(a => a.btnType === 'groupbtn' && !a.hidden);
        },
        groupbtnCount() {
            let len = 0;
            this.groupbtnButtons.map(item => (len += item.name.length));
            let diffLen = len - this.groupbtnButtons.length * 2;
            return diffLen > 0 ? diffLen : 0;
        },
        btnButtons() {
            return this.restButtons.filter(a => a.btnType === 'btn' && !a.hidden);
        },
        btnCount() {
            let len = 0;
            this.btnButtons.map(item => (len += item.name.length));
            let diffLen = len - this.btnButtons.length * 2;
            return diffLen > 0 ? diffLen : 0;
        },
    },
    methods: {},
};
</script>

<style lang="scss">
@import './index.scss';
</style>
