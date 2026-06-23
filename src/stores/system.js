import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useStaticsStore } from '@/stores/statics.js';

export const useSystemStore = defineStore('system', () => {
    const config = ref({});

    const version = ref('0.9');

    const rootDir = ref(
        typeof window.biblesupersearch_root_directory === 'string'
            ? window.biblesupersearch_root_directory
            : '/biblesupersearch',
    );

    function init(newConfig) {
        config.value = newConfig;
    }

    const get = (configKey) => {
        return config.value[configKey];
    };

    const getAll = () => {
        // or useSystemStore().config.value to access the config object directly
        return config.value;
    };

    const debug = computed(() => {
        return config.value.debug || false;
    });

    const getRootDir = () => {
        return rootDir.value;
    };

    const getVersion = () => {
        return version.value;
    };

    function displayBasicInfo() {
        const statics = useStaticsStore().getAll();

        if (window.console) {
            console.log('----------------------------------------------------------------------');
            console.log('Bible SuperSearch UI Version:', version.value);
            console.log('Bible SuperSearch API Edition:', statics.api_version);
            console.log('Bible SuperSearch API Version:', statics.version);
            console.log('----------------------------------------------------------------------');
            console.log();
        }
    }

    return {
        config,
        rootDir,
        version,
        init,
        get,
        getAll,
        debug,
        getRootDir,
        getVersion,
        displayBasicInfo,
    };
});
