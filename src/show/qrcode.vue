<template>
    <div id="qrcode">
        <q-r-code
            :url="url"
            :id="id"
            :qrState="qrState"
        ></q-r-code>
        <q-r-code
            :url="url2"
            :id="id2"
            :qrState="qrState2"
        ></q-r-code>
        <q-r-code
            :url="url2"
        ></q-r-code>
    </div>
</template>
<script>
export default {
    name: 'qrcode',
    data() {
        return {
            url: 'https://www.baidu.com/',
            id: 'tops_qrcode1',
            qrState: '百度',
            id2: 'tops_qrcode2',
            qrState2: 'Google',
            url2: 'http://www.google.cn/',
        };
    },
};
</script>
<style lang="scss" scoped>
#qrcode {
    padding: 32px;
}
</style>