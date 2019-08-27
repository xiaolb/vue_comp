<style lang="scss">
#router {
    position: relative;
    height: 100vh;
    .nav {
        width: 200px;
        position: absolute;
        left: 0;
        height: 100%;
        background: rgb(84, 92, 100);
    }
    .nav_content {
        margin-left: 200px;
        height: 100%;
    }
}
</style>

<template>
    <div id="router">
        <div class="nav">
            <wrapper :menuData="faMenus"></wrapper>
        </div>
        <div class="nav_content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import faMenus from './show/menuData.js';
export default {
    data() {
        return {
            faMenus,
        };
    },
};
</script>

