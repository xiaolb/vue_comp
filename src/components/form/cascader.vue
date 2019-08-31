<template>
    <el-cascader
        v-model="formData[item.name]"
        :disabled="item.disabled"
        :clearable="item.clearable"
        :options="item.data || []"
        :props="item.props"
        :debounce="item.debounce || 300"
        :change-on-select="item.change_on_select"
        :filterable="item.filterable"
        size="medium"
        :separator="item.separator || '/'"
        :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
        :style="item.inputStyle || {}"
        @change="a => (item.selectFun && item.selectFun(a)) || function() {}"
    />
</template>
<script>
export default {
    name: 'cascader',
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