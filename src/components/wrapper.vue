
<style lang="scss">
.el-row--flex {
    background-color: #fff;
}
</style>

<template>
    <div class="content">
        <el-row type="flex" class="content-bar">
            <el-col :span="24" class="menu-bar" ref="menu_bar">
                <el-menu mode="vertical"  background-color="#545c64" text-color="#fff"
                        active-text-color="#ffd04b" class="el-menu-vertical-demo" :router="true">
                    <template v-for="item in faMenus">
                        <template v-if="item.sonMenus && item.sonMenus.length">
                            <el-submenu :index="item.menuId"  :key="item.menuId">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    {{ item.menuName }}
                                </template>

                                <template v-for="(firstVal, firstindex) of item.sonMenus">
                                    <el-submenu v-if="firstVal.sonMenus && firstVal.sonMenus.length > 0"  :index="firstVal.menuId"  :key="firstVal.menuId">
                                        <template slot="title">
                                            <i class="el-icon-menu"></i>
                                            {{ firstVal.menuName }}
                                        </template>
                                        <el-menu-item-group>
                                            <el-menu-item v-for="(twoitem, twoindex) in firstVal.sonMenus"
                                                :key="twoindex"
                                                :index="twoitem.href">{{ twoitem.menuName }}
                                            </el-menu-item>
                                        </el-menu-item-group>
                                    </el-submenu>
                                    <el-menu-item 
                                        v-else
                                        :key="firstindex"
                                        :index="firstVal.href">{{ firstVal.menuName }}
                                    </el-menu-item>
                                </template>
                            </el-submenu>
                        </template>
                        <el-menu-item v-else :index="item.href" :key="item.menuId">
                            <i class="el-icon-menu"></i>
                            {{ item.menuName }}
                         </el-menu-item>
                    </template>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'Wrapper',
    props: {
        menuData: {
            type: [Array],
            default: () => [],
        },
    },
    data() {
        return {
            faMenus: this.menuData,
        };
    },
};
</script>
