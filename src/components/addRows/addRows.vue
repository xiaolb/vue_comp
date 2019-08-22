<template>
    <div id="tops_addRows">
        <div v-for="(addItem, addIndex) of formData[name]" :key="addIndex" class="flex" :style="{ marginBottom: '10px' }">
            <div :class="{ addRowsInputDetail: true, flex: true, uniqueStyle: true, onlyOne: rowsName.length === 1 }">
                <el-input
                    v-for="(item, index) of rowsName"
                    :key="index"
                    v-model="addItem[item]"
                    :type="type"
                    :disabled="disabled"
                    :placeholder="disabled ? '-' : placeholder[index]"
                    :style="index && { marginLeft: '10px' }"
                    :clearable="true"
                    :maxlength="maxlength"
                    :minlength="minlength"
                    :autosize="autosize || (disabled ? { minRows: 1, maxRows: 10 } : { minRows: 2, maxRows: 2 })"
                >
                </el-input>
            </div>
            <el-button v-if="!disabled" type="danger" @click="() => del(addIndex)">删 除</el-button>
        </div>
        <el-button v-if="!disabled" :style="{ marginLeft: 0 }" type="primary" @click="() => add()">添 加</el-button>
    </div>
</template>
<script>
export default {
    name: 'AddRows',
    props: {
        // 数据匹配名字
        name: {
            type: String,
            required: true,
        },
        // 字段名字
        rowsName: {
            type: Array,
            required: true,
        },
        // 提示文案
        placeholder: {
            type: Array,
            required: true,
        },
        // form表单数据
        formData: {
            type: Object,
            required: true,
        },
        // 是否编辑
        disabled: {
            type: Boolean,
            default: false,
        },
        // 最多多少个
        maxRows: {
            type: Number,
            default: -1,
        },
        // 最少多少个
        minRows: {
            type: Number,
            default: -1,
        },
        // 需要使用的input的type类型
        type: {
            type: String,
            default: 'input',
        },
        // type: textarea的时候的属性
        autosize: {
            type: Object,
        },
        maxlength: {
            type: Number,
            default: 10000,
        },
        minlength: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            arrAdd: [1],
            obj: {},
        };
    },
    computed: {},
    methods: {
        add() {
            const { formData, $message, maxRows, obj, name } = this;
            if (formData[name].length >= maxRows && maxRows !== -1) {
                return $message.error(`最多${maxRows}个`);
            }
            this.formData[name].push(Object.assign({}, obj));
        },
        del(index) {
            const { formData, $message, minRows, name } = this;
            if (formData[name].length <= minRows && minRows !== -1) {
                return $message.error(`最少${minRows}个`);
            }
            this.formData[name].splice(index, 1);
        },
    },
};
</script>

<style lang="scss">
#tops_addRows {
    width: 100%;
    .el-button {
        margin-left: 10px;
        width: 100px;
    }
    .flex {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        // align-items: center;
    }
    .uniqueStyle {
        .el-textarea {
            width: 400px;
        }
        .el-textarea:nth-child(1) {
            width: 200px;
        }
        .el-input {
            width: 400px;
        }
        .el-input:nth-child(1) {
            width: 200px;
        }
    }
    .onlyOne.uniqueStyle {
        .el-textarea {
            width: 600px;
        }
        .el-input {
            width: 600px;
        }
    }
}
</style>
