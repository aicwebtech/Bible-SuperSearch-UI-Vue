<script setup>
import ErrorInterface from './views/errors/ErrorInterface.vue';
import ErrorStatics from './views/errors/ErrorStatics.vue';
import DefaultConfig from './config-default.js';

import { computed, inject, ref } from 'vue';
import * as views from './views/index.js';

const config = inject('config');
const statics = inject('statics');
const currentInterface = ref(config.interface || 'AppView');
const version = '0.9.0';

if (window.console) {
    console.log('BibleSuperSearch UI app version:', version);

    if (statics) {
        console.log('BibleSuperSearch API version:', statics.api_version);
        console.log('BibleSuperSearch API software version:', statics.version);

        if (DefaultConfig.apiUrl !== config.apiUrl) {
            DefaultConfig._urlLocalNotice();

            if (!statics.download_enabled) {
                DefaultConfig._downloadDisabledNotice();
            }
        } else {
            DefaultConfig._urlDefaultNotice();
        }
    }
}

const InterfaceComponent = computed(() => {
    // :todo - backward compatibility for FormSelect forms

    if (statics === false) {
        return ErrorStatics;
    } else if (!currentInterface.value) {
        return views['AppView'];
    } else if (views[currentInterface.value]) {
        return views[currentInterface.value];
    } else {
        return ErrorInterface;
    }
});
</script>

<template>
    <component :is="InterfaceComponent" />
</template>

<style scoped></style>
