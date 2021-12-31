import { createApp, Vue } from "vue";
import Main from "./Main.vue";
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

var cesium = require('cesium/Source/Cesium');
var widgets = require('cesium/Source/Widgets/widgets.css');


const app = createApp(Main);
app.config.globalProperties.$Cesium = cesium;
app.config.globalProperties.$Widgets = widgets;
app.use(store).use(router).use(ElementPlus).mount("#main");
