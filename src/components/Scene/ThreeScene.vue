<script lang="ts">
    import { useWindowSize } from '@vueuse/core';
    import * as THREE from 'three'
    import { ref, type Ref, onMounted, computed, watch } from 'vue';
    import { useTweakPane } from '../../composables/useTweakpane'
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
    export default {
        name: 'ThreeScene',
        setup() {
            //Inicializacion de render, el cual sirve para la generar el modelo
            let renderer: Ref<THREE.WebGLRenderer | null> = ref(null);
            //Inicializacion de camera
            let camera: THREE.PerspectiveCamera
            let controls: OrbitControls
            const experience = ref<HTMLCanvasElement | null>(null)

            const scene = new THREE.Scene()

            const { width, height } = useWindowSize()
            const aspectRatio = computed(() => width.value / height.value)

            function updateRenderer() {
                renderer.value?.setSize(width.value, height.value)
                renderer.value?.setPixelRatio(window.devicePixelRatio)
            }
            function updateCamera(){
                camera.aspect = aspectRatio.value;
                camera.updateProjectionMatrix();
            }

            watch(aspectRatio, updateRenderer)
            watch(aspectRatio, updateCamera)
            camera = new THREE.PerspectiveCamera(
                75,
                aspectRatio.value,
                0.1,
                1000
            )

            camera.position.z = 5

            scene.add(camera)

            const cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1, 32, 32),
                new THREE.MeshBasicMaterial({ color: 0x008080 })
            )
            scene.add(cube)

            const { pane, fpsGraph } = useTweakPane()
            const loop = () => {
                fpsGraph.begin();
                renderer.value?.render(scene, camera)
                fpsGraph.end();
                requestAnimationFrame(loop);
            }

            onMounted(() => {

                renderer.value = new THREE.WebGLRenderer({
                    canvas: experience.value as unknown as HTMLCanvasElement,
                    antialias: true
                });
                controls = new OrbitControls(camera, renderer.value.domElement);
                controls.enableDamping = true;
                updateRenderer();
                updateCamera();
                
                loop();
            });

            return {
                experience
            }
        }
    }
</script>

<template>
    <canvas ref="experience"/>
</template>

<style lang="scss" scoped>

</style>