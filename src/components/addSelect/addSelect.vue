<template>
    <div id="tops_addSelects">
        <div v-for="(item, index) of formData[name]" :key="index" class="flex">
            <div>
                <el-select
                    v-model="((formData[name] || {})[index] || {})['country']"
                    clearable
                    filterable
                    :placeholder="placeholder[0]"
                    @change="a => select(a, index)"
                >
                    <el-option
                        v-for="(selectItem, selectIndex) of countryData"
                        :key="selectIndex"
                        :label="selectItem.label || selectItem.name || selectItem.itemLabel"
                        :value="selectItem.value || selectItem.id || selectItem.itemValue"
                    ></el-option>
                </el-select>
                <el-select v-model="((formData[name] || {})[index] || {})['city']" clearable filterable multiple :placeholder="placeholder[1]">
                    <el-option
                        v-for="(selectItem, valueIndex) of cityData[index]"
                        :key="valueIndex"
                        :label="selectItem.label || selectItem.name || selectItem.itemLabel"
                        :value="selectItem.value || selectItem.id || selectItem.itemValue"
                    ></el-option>
                </el-select>
            </div>
            <el-button type="danger" @click="() => del(index)">删 除</el-button>
        </div>
        <el-button class="add" :style="{ marginLeft: 0 }" type="primary" @click="add">添 加</el-button>
    </div>
</template>
<script>
export default {
    name: 'AddRows',
    props: {
        // 多个字段的name
        rowsName: {
            required: true,
            type: Array,
        },
        selectFun: {
            type: Function,
            required: true,
        },
        cityData: {
            required: true,
        },
        placeholder: {
            required: true,
            default: () => ['', ''],
        },
        formData: {
            required: true,
            default: () => {},
        },
        name: {
            required: true,
        },
        countryData: {},
    },
    data() {
        const obj = {};
        obj[this.rowsName[0]] = '';
        obj[this.rowsName[1]] = [];
        return {
            obj,
        };
    },
    methods: {
        add() {
            this.formData[this.name].push(Object.assign({}, this.obj));
        },
        del(index) {
            this.formData[this.name].splice(index, 1);
        },
        select(id, totalIndex) {
            this.selectFun(totalIndex, id);
        },
    },
};
</script>

<style lang="scss">
#tops_addSelects {
    width: 100%;
    .el-button {
        margin-left: 10px;
        width: 100px;
    }
}
.flex {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 8px;
}
</style>
