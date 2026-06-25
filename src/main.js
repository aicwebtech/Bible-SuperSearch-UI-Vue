//import { createBibleSuperSearchApp } from './BibleSuperSearch.js';

import './assets/main.css';
import defaultConfig from './config-default.js';
import axios from 'axios';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { useConfigStore } from '@/stores/config.js';
import { useStaticsStore } from '@/stores/statics.js';
import { useSystemStore } from '@/stores/system.js';

// Vuetify
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
// import * as vuetifyComponents from 'vuetify/components';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

const vuetify = createVuetify({
    //components: vuetifyComponents,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                colors: {
                    secondary: '#ffff00',
                },
            },
        },
    },
});

function mountInstance(el) {
    if (el.dataset.bssMounted) return; // guard against double-mount

    const attrConfig = parseDataAttributes(el.dataset);
    const jsonConfig = JSON.parse(el.dataset.config || '{}');

    // Global var becomes a *default* shared across instances, still overridable per-element
    const globalConfig = window.biblesupersearch_config_options || {};
    const config = Object.assign({}, defaultConfig, globalConfig, jsonConfig, attrConfig);

    const app = createApp(App);
    app.use(vuetify);
    const pinia = createPinia(); // fresh store per instance — no cross-talk
    app.use(pinia);

    useConfigStore(pinia).init(config);
    useStaticsStore(pinia).init(window.biblesupersearch_statics || {});
    useSystemStore(pinia).setElemId(el.id);

    app.mount(el);
    el.dataset.bssMounted = 'true';

    return app;
}

function parseDataAttributes(dataset) {
    const out = {};

    for (const key in dataset) {
        let val = dataset[key];
        if (val === 'true') val = true;
        else if (val === 'false') val = false;
        else if (!isNaN(val) && val.trim() !== '') val = Number(val);
        out[key] = val;
    }

    return out;
}

function bootstrap() {
    const mounts = document.querySelectorAll('.biblesupersearch-app-vue:not([data-bss-mounted])');
    mounts.forEach(mountInstance);
}

document.addEventListener('DOMContentLoaded', bootstrap);
