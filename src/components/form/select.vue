<template>
    <el-select
        v-if="item.filterSearch"
        v-model="formData[item.name]"
        :disabled="item.disabled"
        :filterable="item.filterable"
        :clearable="item.clearable"
        :multiple="item.multiple"
        :multiple-limit="item.multipleLimit"
        :allow-create="item.allowCreate"
        :default-first-option="item.allowCreate"
        :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
        :style="item.inputStyle || {}"
        :filter-method="item.filterSearch || function() {}"

        @change="a => (item.selectFun && item.selectFun(a)) || function() {}"
    >
        <el-option
            v-for="(selectItem, selectIndex) of item.data"
            :key="`${selectItem.value}${selectIndex}`"
            :label="selectItem.label || selectItem.itemLabel || selectItem.paramName || selectItem.name"
            :value="selectItem.value || selectItem.itemValue || selectItem.paramValue || selectItem.id"
            :disabled="selectItem.disabled"
        >
           <div v-if="item.optionAppendName">
                <span :style="{float: 'left',...item.optionLeftStyle}">{{selectItem.label || selectItem.itemLabel || selectItem.paramName || selectItem.name}}</span>
                <span v-if="item.optionAppendName" :style="{float: 'right',...item.optionRightStyle}">{{selectItem[item.optionAppendName]}}</span>
            </div>
        </el-option>
    </el-select>
    <el-select
        v-else
        v-model="formData[item.name]"
        :disabled="item.disabled"
        :clearable="item.clearable"
        :filterable="item.filterable"
        :multiple-limit="item.multipleLimit"
        :multiple="item.multiple"
        :allow-create="item.allowCreate"
        :default-first-option="item.allowCreate"
        :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
        :style="item.inputStyle || {}"
        @change="a => (item.selectFun && item.selectFun(a)) || function() {}"
    >
        <el-option
            v-for="(selectItem, selectIndex) of item.data"
            :key="`${selectItem.value}${selectIndex}`"
            :label="selectItem.label || selectItem.itemLabel || selectItem.paramName || selectItem.name"
            :value="selectItem.value || selectItem.itemValue || selectItem.paramValue || selectItem.id"
            :disabled="selectItem.disabled"
        >
            <div v-if="item.optionAppendName">
                <span :style="{float: 'left',...item.optionLeftStyle}">{{selectItem.label || selectItem.itemLabel || selectItem.paramName || selectItem.name}}</span>
                <span v-if="item.optionAppendName" :style="{float: 'right',...item.optionRightStyle}">{{selectItem[item.optionAppendName]}}</span>
            </div>
        </el-option>
    </el-select>
</template>
<script>
export default {
    name: 'SelectItem',
    props: {
        item: {
            type: Object,
            required: true,
        },
        formData: {
            type: Object,
            required: true,
        },
        formType: {
            type: Object,
            required: true,
        },
        allDisabled: {
            type: Boolean,
            required: true,
        },
    },
};
</script>
