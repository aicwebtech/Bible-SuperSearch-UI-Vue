import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useConfigStore } from '@/stores/config.js';
import { useSystemStore } from '@/stores/system.js';

export const useStaticsStore = defineStore('statics', () => {
    const statics = ref({});
    const configStore = useConfigStore();
    const systemStore = useSystemStore();

    function init(newStatics) {
        statics.value = newStatics || {};

        // If statics is empty, try to load from server
        if (Object.keys(statics.value).length === 0) {
            const url = (configStore.get('apiUrl') || '') + '/api/statics';
            axios
                .get(url)
                .then((response) => {
                    statics.value = response.data.results;
                    systemStore.displayBasicInfo();
                })
                .catch((error) => {
                    console.error('Error loading statics:', error);
                });
        } else {
            systemStore.displayBasicInfo();
        }
    }

    const get = (staticsKey) => {
        return statics.value[staticsKey];
    };

    const getAll = () => {
        // or useStaticsStore().statics.value to access the statics object directly
        return statics.value;
    };

    const has = computed(() => {
        return Object.keys(statics.value).length > 0;
    });

    return { statics, init, get, getAll, has };
});
