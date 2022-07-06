import {
	createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
//import "../theme/index.css"
import 'element-plus/dist/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'


const app = createApp(App)
app.use(router).use(ElementPlus).use(VueAxios, axios).mount('#app')