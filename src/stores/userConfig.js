import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserConfigStore = defineStore('userConfig', () => {
    const config = ref({});
    const lsKey = 'BibleSuperSearchUserConfig';

    function init(newConfig) {
        config.value = newConfig;
    }

    const get = (configKey) => {
        return config.value[configKey];
    };

    const set = (configKey, value) => {
        config.value[configKey] = value;
    };

    const load = () => {
        // load config from localStorage
        const storedConfig = localStorage.getItem(lsKey);

        if (storedConfig) {
            config.value = JSON.parse(storedConfig);
        }
    };

    const save = () => {
        // save config to localStorage
        localStorage.setItem(lsKey, JSON.stringify(config.value));
    };

    const getAll = () => {
        // or useUserConfigStore().config.value to access the config object directly
        return config.value;
    };

    return { config, init, get, set, load, save, getAll };
});
