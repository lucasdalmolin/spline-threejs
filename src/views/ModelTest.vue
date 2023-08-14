<script lang="ts">
    import SplineModel from '../components/Scene/SplineModel.vue';
    import ThreeScene from '../components/Scene/ThreeScene.vue'
    import TestModel from '../components/Scene/TestModel.vue'
    export default {
        name: "ModelTest",
        components: {
            ThreeScene,
            SplineModel,
            TestModel
        }
    };
</script>

<template>
    <router-link to="/">Inicio</router-link>
    <!-- <SplineModel /> -->
    <TestModel/>
    <!-- <ThreeScene /> -->
</template>
