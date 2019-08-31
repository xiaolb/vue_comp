<template>
    <el-radio-group
        v-if="item.radioBtn"
        v-model="formData[item.name]"
        size="small"
        :disabled="item.disabled"
        @change="a => (item.selectFun && item.selectFun(a)) || function() {}"
    >
        <el-radio-button
            v-for="(checkItem, radioIndex) of item.data"
            :key="radioIndex"
            :border="item.border"
            :label="checkItem.value || checkItem.itemValue || checkItem.paramValue || checkItem.id"
            >{{ checkItem.label || checkItem.itemLabel || checkItem.paramName || checkItem.name }}</el-radio-button
        >
    </el-radio-group>
    <el-radio-group
        v-else
        v-model="formData[item.name]"
        :disabled="item.disabled"
        :class="{ columnRadio: item.column, rowsRadio: item.rows }"
        @change="a => (item.selectFun && item.selectFun(a)) || function() {}"
    >
        <el-radio
            v-for="(checkItem, radioIndex) of item.data"
            :key="radioIndex"
            :border="item.border"
            :label="checkItem.value || checkItem.itemValue || checkItem.paramValue || checkItem.id"
            >{{ checkItem.label || checkItem.itemLabel || checkItem.paramName || checkItem.name }}</el-radio
        >
    </el-radio-group>
</template>
<script>
export default {
    name: 'RadioItem',
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