// index.js
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
/**
 * 可能报错 Cannot read properties of undefined (reading ‘install‘)
 * 原因主要就是我们在下载vue-router的时候下载的是最新版的（以4开头）,但是这个版本它是给vue3准备的，
 * 所以我们要卸载router，然后限制他的版本。
 * npm uninstall vue-router
 * npm install --save vue-router@3
 */


import HomeMap from '@/home/index.vue' // 地图
import guidang from '@/view/guidang/APIdetail.vue' // 归档
// 公共路由
export const constantRoutes = [
    {
        path: '/HomeMap',	// 组件路径
        name: 'HomeMap',	// 组件名
        component: HomeMap	// 组件实例
    },
    {
        path: '/guidang',	// 组件路径
        name: 'guidang',	// 组件名
        component: guidang	// 组件实例
    },
];


export default new Router({
    mode: "history", // 去掉url中的#
    routes: constantRoutes,
});


