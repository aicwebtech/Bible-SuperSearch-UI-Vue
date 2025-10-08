<script setup>
import { inject } from 'vue';

const config = inject('config');

console.log('config', config);
</script>

<template>
    <div>Error loading BibleSuperSearch application data</div>
</template>
