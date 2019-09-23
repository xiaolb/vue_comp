<template>
    <div class="beginAndEnd">
        <el-col :span="11">
            <el-form-item :prop="`begin${item.name}`">
                <el-time-picker
                    v-model="formData[`begin${item.name}`]"
                    :type="item.dateType || 'time'"
                    :format="item.format || 'HH:mm:ss'"
                    :value-format="item.format || 'HH:mm:ss'"
                    :placeholder="item.disabled || allDisabled ? '' : item.firstPlacehold || item.placehold || formType[item.type] + '开始' + item.label"
                    :disabled="item.disabled"
                ></el-time-picker>
                <connect-or-extra :item="item" />
            </el-form-item>
        </el-col>
        <el-col class="center" :span="2" style="textAlign: center">-</el-col>
        <el-col :span="11">
            <el-form-item :prop="`end${item.name}`">
                <el-time-picker
                    v-model="formData[`end${item.name}`]"
                    :type="item.dateType || 'time'"
                    :format="item.format || 'HH:mm:ss'"
                    :value-format="item.format || 'HH:mm:ss'"
                    :placeholder="item.disabled || allDisabled ? '' : item.secondPlacehold || item.placehold || formType[item.type] + '结束' + item.label"
                    :disabled="item.disabled"
                ></el-time-picker>
            </el-form-item>
        </el-col>
    </div>
</template>
<script>
import connectOrExtra from './connectOrExtra.vue';
export default {
    name: 'TwoTime',
    components: {
        connectOrExtra,
    },
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
<style lang="scss">
.beginAndEnd {
    .el-form-item__error {
        display: block !important;
    }
    .el-form-item.is-error .el-input__inner {
        border-color: #f56c6c;
    }
}
</style>
