<template>
    <Spline  class="spline-component" :scene="scene"  />
</template>
  
  <script lang="ts">
  import { ref, defineComponent } from 'vue';
  import Spline from "spline-vue";

  export default defineComponent({
    name: 'SplineModel',
    components: { Spline },
    data: () => ({
        scene: "https://prod.spline.design/lyBWkgN7z9yi6YEA/scene.splinecode"
    }),
  });
  </script>
  
  <style scoped>
  </style>
  