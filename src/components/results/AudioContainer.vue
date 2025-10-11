<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { VBtn } from 'vuetify/components';

const url = ref('');
const Music = '/test_music.mp3';
const Speech = null;

function init() {
    // url.value = 'http://192.168.111.8/test_music.mp3';
}

function music() {
    // axios.get(Music, { responseType: 'blob' });

    axios({
        method: 'get',
        url: Music,
        responseType: 'blob', // important!!
        // headers: {
        //     'Content-Type': 'audio/mpeg',
        //     'xi-api-key': null',
        // },
    }).then((response) => {
        const blob = new Blob([response.data], { type: 'audio/mpeg' });
        url.value = URL.createObjectURL(blob);
    });
}

function speech() {
    axios({
        method: 'post',
        url: 'https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb',
        responseType: 'blob', // important!!
        headers: {
            // 'Content-Type': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': null,
        },
        data: {
            text: 'In the beginning God created the heaven and the earth.',
            model_id: 'eleven_multilingual_v2', // Example voice
            output_format: 'mp3_44100_128',
        },
    }).then((response) => {
        const blob = new Blob([response.data], { type: 'audio/mpeg' });
        url.value = URL.createObjectURL(blob);
    });
}
</script>

<template>
    <div class="audio-container" v-if="url">
        <span>{{ url }}</span>
        <audio :src="url" controls></audio>
    </div>
    <v-btn @click="music">Music</v-btn>
    <v-btn @click="speech">Speech</v-btn>
</template>
