<template>
    <div id="topsQRCode">
        <div :id="id" class="qrcode"></div>
        <p v-if="qrState" class="qrState">{{ qrState }}</p>
    </div>
</template>
<script>
import { creatQRCode } from '@/components/utils';

export default {
    name: 'QRCode',
    props: {
        // 需要生成的二维码的url
        url: {
            type: String,
            required: true,
        },
        // 二维码Id，适用于多个
        id: {
            type: String,
            default: 'tops_qrcode',
        },
        // 二维码说明
        qrState: {
            type: String,
            default: '',
        },
    },
    data() {
        return {};
    },
    mounted() {
        document.getElementById(this.id).innerHTML = creatQRCode(this.url);
    },
};
</script>
<style lang="scss" scoped>
#topsQRCode {
    width: 140px;
    overflow: hidden;
    background: #fff;
    border: 1px solid #e4e7ed;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    .qrcode {
        height: 140px;
        margin: 0;
    }
    .qrState {
        text-align: center;
        margin: 0;
        padding: 0 0 4px 0;
        color: #444;
        font-size: 12px;
    }
}
</style>
