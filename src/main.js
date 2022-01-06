/*
 * @Author: LiuHN
 * @Date: 2021-12-31 17:21:58
 * @LastEditTime: 2022-01-04 16:53:33
 * @Description: 
 * @版权声明
 */
import { createApp, Vue } from "vue";
import Main from "./Main.vue";
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'

var cesium = require('cesium/Source/Cesium');
var widgets = require('cesium/Source/Widgets/widgets.css');


const app = createApp(Main);
app.config.globalProperties.$Cesium = cesium;
app.config.globalProperties.$Widgets = widgets;
app.use(store).use(router).use(ElementPlus).mount("#main");

//组册图标element-plus/icons
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key])
  })
