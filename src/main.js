import { createApp } from 'vue'
import App from './App.vue'
import router from './routes' //'./routes/index.js' 인데 index 파일은 생략가능
import store from './store' // './store/index.js'
import loadImage from './plugins/loadImage'


createApp(App)
    .use(router) //$route $router
    .use(store) // $store
    .use(loadImage) //$loadImage
    .mount('#app')