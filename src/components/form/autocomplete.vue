<template>
    <el-autocomplete
        v-model="formData[item.name]"
        :disabled="item.disabled"
        :fetch-suggestions="item.querySearchAsync"
        :placeholder="item.disabled || allDisabled ? '' : item.placehold || formType[item.type] + item.label"
        :style="item.inputStyle || {}"
        :debounce="100"
        :clearable="item.clearable"
        @select="a => (item.selectFun && item.selectFun(a)) || function() {}"
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
            :style="item.appendHtmlStyle || {}"
            v-html="item.appendHtmlText || ''"
            @click="() => (item.appendHtmlFun && item.appendHtmlFun()) || function(){}"
        ></span>
    </el-autocomplete>
</template>
<script>
export default {
    name: 'Autocomplete',
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