import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useStaticsStore } from '@/stores/statics.js';

export const useConfigStore = defineStore('config', () => {
    const config = ref({});

    function init(newConfig) {
        config.value = newConfig;
    }

    const get = (configKey) => {
        return config.value[configKey];
    };

    const getAll = () => {
        // or useConfigStore().config.value to access the config object directly
        return config.value;
    };

    const debug = computed(() => {
        return config.value.debug || false;
    });

    const fullApiUrl = computed(() => {
        return useStaticsStore().fullApiUrl;
    });

    return { config, init, get, getAll, debug };
});
