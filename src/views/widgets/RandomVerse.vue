<script setup>
import axios from 'axios';
import { ref, inject } from 'vue';

const verse = ref(null);
const chapter = ref(null);
const config = inject('config');
const url = config.apiUrl;

function getRandomVerse() {
    reset();

    axios
        .get(url + '/api?reference=Random%20Verse&data_format=simple')
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
        .get(url + '/api?reference=Random%20Chapter&data_format=simple')
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
    </div>
</template>
