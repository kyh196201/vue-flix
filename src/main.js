import { createApp } from 'vue';
import App from './App.vue';

// Firebase
import '@/firebase';

import store from '@/store';
import router from '@/router/';
import fontAwesome from './plugins/fontAwesome';

// css
import '@/assets/scss/_index.scss';

const app = createApp(App);
app.use(store).use(router).use(fontAwesome).mount('#app');
