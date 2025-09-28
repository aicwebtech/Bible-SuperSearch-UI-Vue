<script>
import axios from 'axios'
import { VBtn } from 'vuetify/components'

export default {
  name: 'RandomVerseOpt',
  components: {
    VBtn,
  },
  inject: ['config'],
  data() {
    return {
      verse: null,
      chapter: null,
    }
  },
  computed: {
    url() {
      return this.config.bssApi
    },
  },
  methods: {
    getRandomVerse() {
      this.reset()
      axios
        .get(this.url + '/api?reference=Random%20Verse&data_format=simple')
        .then((response) => {
          this.verse = response.data.results.kjv[0]
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getRandomChapter() {
      this.reset()
      axios
        .get(this.url + '/api?reference=Random%20Chapter&data_format=simple')
        .then((response) => {
          this.chapter = response.data.results.kjv
        })
        .catch((error) => {
          console.log(error)
        })
    },
    reset() {
      this.verse = null
      this.chapter = null
    },
  },
}
</script>

<template>
  <div>
    <h1>Random (Options API)</h1>
    <v-btn @click="getRandomChapter">Random Chapter</v-btn>
    <v-btn @click="getRandomVerse">Random Verse</v-btn>
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
