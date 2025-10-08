<script setup>
import { inject } from 'vue';

const config = inject('config');
</script>

<template>
    <div>Error Invalid Skin Selection: {{ config.interface }}</div>
</template>
