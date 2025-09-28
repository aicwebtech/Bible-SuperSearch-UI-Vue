import './assets/main.css';
import defaultConfig from './config-default.js';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import App from './App.vue';
// /import vue from 'eslint-plugin-vue';

var app_config = typeof window !== 'undefined' && window.app_config ? window.app_config : null;

if (typeof app_config !== 'object' || !app_config) {
    app_config = {};
}

var merged_config = { ...defaultConfig, ...app_config };

console.log('Merged config:', merged_config);

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'light',
    },
});

// const app = createApp(App);
// app.use(vuetify);
// app.use(createPinia());
// app.provide('config', merged_config);
// app.mount('#app');

// const extra = createApp(App);
// extra.use(vuetify);
// extra.use(createPinia());
// extra.provide('config', merged_config);
// extra.mount('#extra');

createBibleSuperSearchApp('#app', merged_config);
createBibleSuperSearchApp('#extra', merged_config);

function createBibleSuperSearchApp(mount, config) {
    mount = mount || '#app';
    var app2 = createApp(App);

    app2.use(vuetify);
    app2.use(createPinia());
    app2.provide('config', config);

    app2.mount(mount);
}

export { createBibleSuperSearchApp };
