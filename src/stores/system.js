import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useStaticsStore } from '@/stores/statics.js';
import { useConfigStore } from '@/stores/config.js';
import DefaultConfig from '@/config-default.js';

export const useSystemStore = defineStore('system', () => {
    const config = ref({});
    const elemId = ref(null);
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

    const setElemId = (id) => {
        elemId.value = id;
    };

    const getElemId = () => {
        return elemId.value;
    };

    function displayBasicInfo() {
        const statics = useStaticsStore().getAll();

        if (window.console) {
            console.log('----------------------------------------------------------------------');
            console.log('Bible SuperSearch Element ID:', elemId.value);
            console.log('Bible SuperSearch UI Version:', version.value);
            console.log('Bible SuperSearch API Version:', statics.api_version);
            console.log('Bible SuperSearch API Software Version:', statics.version);
            console.log('----------------------------------------------------------------------');
            console.log();

            const configStore = useConfigStore();

            // strip http or https from the urls before comparing, to avoid false positives
            const defaultApiUrl = DefaultConfig.apiUrl.replace(/^https?:\/\//, '');
            const currentApiUrl = configStore.get('apiUrl').replace(/^https?:\/\//, '');

            if (defaultApiUrl !== currentApiUrl) {
                _urlLocalNotice();

                if (!statics.download_enabled) {
                    _downloadDisabledNotice();
                }
            } else {
                _urlDefaultNotice();
            }
        }
    }

    // Internal functions
    function _urlDefaultNotice() {
        console.log('----------------------------------------------------------------------');
        console.log('NOTE TO WEBMASTER: You are using the primary Bible SuperSearch API.');
        console.log('This requires a connection between your website and ours,');
        console.log('and LIMITS you to 1000 hits per day.');
        console.log('We recommend installing the Bible SuperSearch API on your website.');
        console.log('For details, please visit: https://www.biblesupersearch.com/api');
        console.log('Download for FREE: https://www.biblesupersearch.com/downloads/');
        console.log('----------------------------------------------------------------------');
        console.log();
    }
    function _urlLocalNotice() {
        console.log(
            'Congratulations, you are successfully using your own instance of the Bible SuperSearch API!',
        );
    }

    function _downloadDisabledNotice() {
        console.log('----------------------------------------------------------------------');
        console.log(
            'NOTE TO WEBMASTER: Your Bible SuperSearch API instance has Bible downloads disabled.',
        );
        console.log(
            "Please enable this, otherwise important features such as the downloads dialog won't work.",
        );
        console.log('----------------------------------------------------------------------');
        console.log();
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
        setElemId,
        getElemId,
    };
});
