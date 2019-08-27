<template>
    <div id="MapItemTest">
        <Map
            ref="map"
            :disabled="item.disabled"
            :placeholder="item.placehold"
            :bind-data="item.name"
            :bind-name="item.bindName"
            :form-data="formData"
            :input-style="item.inputStyle"
        ></Map>
    </div>
</template>
<script>
export default {
    name: 'MapItemTest',
    data() {
        return {
            item: {
                disabled: false,
                placehold: '请输入详细地址',
                bindName: ['lng', 'lat'],
                name: 'address',
                inputStyle: {
                    width: '300px',
                },
            },
            formData: {},
        };
    },
    created() {
        this.formData = {
            address: '杭州市上城区赞成中心',
            lng: 120.185388,
            lat: 30.219907,
        };
    },
};
</script>