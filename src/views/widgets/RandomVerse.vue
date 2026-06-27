<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useConfigStore } from '@/stores/config';
import { useStaticsStore } from '@/stores/statics';

import AudioContainer from '@/components/results/AudioContainer.vue';

const verse = ref(null);
const chapter = ref(null);
const configStore = useConfigStore();
const staticsStore = useStaticsStore();
const url = configStore.get('apiUrl');

function getRandomVerse() {
    reset();

    axios
        .get(
            staticsStore.fullApiUrl +
                '?reference=Random%20Verse&data_format=simple&_t=' +
                new Date().getTime(),
        )
        .then(function (response) {
            verse.value = response.data.results.kjv[0];
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getRandomChapter() {
    reset();

    axios
        .get(
            staticsStore.fullApiUrl +
                '?reference=Random%20Chapter&data_format=simple&_t=' +
                new Date().getTime(),
        )
        .then(function (response) {
            chapter.value = response.data.results.kjv;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function reset() {
    verse.value = null;
    chapter.value = null;
}
</script>

<template>
    <div>
        <h1>Random (Composition API)</h1>
        <v-btn color="secondary" @click="getRandomChapter" prepend-icon="mdi-home"
            >Random Chapter</v-btn
        >
        <v-btn color="primary" @click="getRandomVerse">Random Verse</v-btn>
        <br /><br />

        <div v-if="verse">
            <h3>{{ verse.book_name }} {{ verse.chapter }}:{{ verse.verse }}</h3>
            <p>{{ verse.text }}</p>
        </div>

        <div v-if="chapter">
            <h3>{{ chapter[0].book_name }} {{ chapter[0].verse }}</h3>

            <div v-for="item in chapter" :key="item.verse">
                <p>
                    <strong>{{ item.verse }}</strong> {{ item.text }}
                </p>
            </div>
        </div>

        <h2>Info</h2>
        <p>API URL: {{ url }}</p>
        <p>API Version: {{ staticsStore.get('api_version') }}</p>
        <p>API Software Version: {{ staticsStore.get('version') }}</p>
        <p>Full API URL: {{ staticsStore.fullApiUrl }}</p>
    </div>
</template>
