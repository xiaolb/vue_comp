<template>
    <el-input
        v-model="formData[item.name]"
        :type="inputType"
        :disabled="item.disabled"
        :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
        :style="item.inputStyle || {}"
        :clearable="item.clearable"
        :maxlength="item.maxLength"
        :minlength="item.minLength"
        @change="a => (item.change && item.change(a)) || function() {}"
    >
        <el-button
            v-if="item.append"
            slot="append"
            :icon="item.appendIcon || 'el-icon-search'"
            @click="() => (item.appendFun && item.appendFun()) || function(){}"
        ></el-button>
        <i
            v-if="item.suffix"
            slot="suffix"
            :style="item.suffixStyle || {}"
            :class="item.suffixIcon"
            @click="() => (item.suffixFun && item.suffixFun()) || function(){}"
        ></i>
        <span
            v-if="item.appendHtml"
            slot="suffix"
            :style="item.appendHtmlStyle || {color: '#303133',paddingRight: '5px'}"
            v-html="item.appendHtmlText || ''"
            @click="() => (item.appendHtmlFun && item.appendHtmlFun()) || function(){}"
        ></span>
    </el-input>
</template>
<script>
export default {
    name: 'InputItem',
    props: {
        inputType: {
            type: String,
            required: true,
        },
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
