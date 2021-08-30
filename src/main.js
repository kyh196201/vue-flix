import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/';
import store from '@/store';
import fontAwesome from './plugins/fontAwesome';

// css
import '@/assets/scss/_index.scss';

const app = createApp(App);
app.use(store).use(router).use(fontAwesome).mount('#app');
