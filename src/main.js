import { createApp } from 'vue';
import App from './App.vue';

// Firebase
import firebaseApp from '@/firebase';

import router from '@/router/';
import store from '@/store';
import fontAwesome from './plugins/fontAwesome';

console.log(firebaseApp.name);

// css
import '@/assets/scss/_index.scss';

const app = createApp(App);
app.use(store).use(router).use(fontAwesome).mount('#app');
