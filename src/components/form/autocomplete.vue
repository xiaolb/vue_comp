<template>
    <el-autocomplete
        v-model="formData[formItem.name]"
        :disabled="formItem.disabled"
        :fetch-suggestions="formItem.querySearchAsync"
        :placeholder="formItem.disabled || allDisabled ? '' : formItem.placehold || formType[formItem.type] + formItem.label"
        :style="formItem.inputStyle || {}"
        :debounce="100"
        :clearable="formItem.clearable"
        @select="a => (formItem.selectFun && formItem.selectFun(a)) || function() {}"
    >
        <el-button
            v-if="formItem.append"
            slot="append"
            :icon="formItem.appendIcon || 'el-icon-search'"
            @click="() => (formItem.appendFun && formItem.appendFun()) || function(){}"
        ></el-button>
        <i
            v-if="formItem.suffix"
            slot="suffix"
            :style="formItem.suffixStyle || {}"
            :class="formItem.suffixIcon"
            @click="() => (formItem.suffixFun && formItem.suffixFun()) || function(){}"
        ></i>
        <span
            v-if="formItem.appendHtml"
            slot="suffix"
            :style="formItem.appendHtmlStyle || {}"
            v-html="formItem.appendHtmlText || ''"
            @click="() => (formItem.appendHtmlFun && formItem.appendHtmlFun()) || function(){}"
        ></span>
        <!-- 选择项增加说明 -->
        <template v-if="formItem.itemAppendName" slot-scope="{ item }">
            <div  :style="{...formItem.itemStyle}" :class="{...formItem.itemClassList}" style="float: left;">{{ item['value'] }}</div>
            <span style="float: right;" :style="{...formItem.itemAppendStyle}" :class="{...formItem.itemAppendClassList}">{{ item[formItem.itemAppendName] }}</span>
        </template>
    </el-autocomplete>
</template>
<script>
export default {
    name: 'Autocomplete',
    props: {
        formItem: {
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
