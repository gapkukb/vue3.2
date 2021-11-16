import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import components from '@/components';
import plugins from '@/plugins';
import directives from '@/directives';

import '@icon-park/vue-next/styles/index.css';
import responsive from '@/plugins/responsive';

const app = createApp(App).use(store).use(router).use(components).use(plugins).use(directives);
app.use(responsive)
// provide 提供app作用域变量，所有子组件可以inject访问
// app.provide("a","b");
app.mount('#app');
