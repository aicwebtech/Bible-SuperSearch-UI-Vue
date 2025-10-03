import './assets/main.css';
import defaultConfig from './config-default.js';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import App from './App.vue';
// /import vue from 'eslint-plugin-vue';

// POSSIBLE variables needed for backwards compatibility
// biblesupersearch_root_directory // string
// biblesupersearch_config_path // string
// biblesupersearch_config_options // object
// biblesupersearch_statics // object
// biblesupersearch_form_data // object

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'light',
    },
});

var statics = null;
var target = null;

if (
    typeof window.biblesupersearch_config_options === 'object' &&
    window.biblesupersearch_config_options
) {
    var merged_config = { ...defaultConfig, ...window.biblesupersearch_config_options };
    target = merged_config.target || target;
    console.log('Merged with biblesupersearch_config_options:', merged_config);
    createBibleSuperSearchApp(target, merged_config);
}

console.log('Instances', window.biblesupersearch_instances);

// createBibleSuperSearchApp('#app', merged_config);
// createBibleSuperSearchApp('#extra', merged_config);

function createBibleSuperSearchApp(mount, config) {
    mount = mount ? '#' + mount : '#biblesupersearch_container';
    var app = createApp(App);

    app.use(vuetify);
    app.use(createPinia());
    app.provide('config', config);
    app.provide('statics', statics);

    app.mount(mount);
} // from 'BibleSuperSearch';

export const name = 'BibleSuperSearch';

export { createBibleSuperSearchApp };
