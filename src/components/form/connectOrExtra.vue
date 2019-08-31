<template>
    <div>
        <span v-if="item.connect" class="spider_form_data_connect">{{ item.connect }}</span>
        <span
            v-if="item.extra"
            class="spider_form_data_extra"
            :style="item.extraStyle || {}"
            @click="a => (item.extraFun && item.extraFun()) || function() {}"
            >{{ item.extra }}</span
        >
    </div>
</template>
<script>
export default {
    name: 'connectOrExtra',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
};
</script>
<style lang="scss">
.spider_form_data_extra {
    display: inline-block;
    color: #666;
}
.spider_form_data_connect {
    width: 36px;
    text-align: center;
    color: #666;
}
</style>