<template>
    <div id="recordEvent">
        <div
            v-for="(addItem, addIndex) of formData[name]"
            :key="addIndex"
            class="flex"
            :style="{marginBottom: '10px'}"
        >
            <el-select
                :clearable="true"
                placeholder="选择类型"
                v-model="addItem[rowsName[0]]"
                class="self_select"
            >
                <el-option
                    v-for="(selectItem) of dataList"
                    :key='selectItem.value'
                    :label="selectItem.label"
                    :value="selectItem.value"
                ></el-option>
            </el-select>
            <el-date-picker
                type="date"
                :format="'yyyy-MM-dd'"
                :valueFormat="'yyyy-MM-dd'"
                placeholder="选择纪事时间"
                :style="{marginLeft: '10px'}"
                v-model="addItem[rowsName[1]]"
                class="self_date"
            ></el-date-picker>
            <el-input
                type="input"
                v-model="(addItem)[rowsName[2]]"
                placeholder='请输入相关楼栋'
                :style="{marginLeft: '10px'}"
                :clearable="true"
                class="self_input"
            >
            </el-input>
            <el-button type="danger" @click="() => del(addIndex)">删 除</el-button>
        </div>
        <el-button :style="{marginLeft: 0}" type="primary" @click="() => add()">添 加</el-button>
    </div>
</template>
<script>
export default {
    name: 'RecordEvent',
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
        // form表单数据
        formData: {
            type: Object,
            required: true,
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
    },
    data() {
        return {
            arrAdd: [1],
            obj: {},
            dataList: [{ value: '开盘', label: '开盘' }, { value: '交房', label: '交房' }],
        };
    },
    mounted() {},
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
#recordEvent {
    .flex {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    .self_select {
        width: 160px;
    }
    .self_input {
        width: 400px;
    }
    .self_date {
        width: 160px;
    }
    .el-button {
        width: 100px;
    }
}
</style>

