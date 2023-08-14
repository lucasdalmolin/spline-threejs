<script lang="ts">
    import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import SplineLoader from '@splinetool/loader';

    export default {
        name: "TestModel",
        setup() {            
            // camera
            const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 5, 100000);
            camera.position.set(-2019.8, 152.57, 1821.41);
            camera.quaternion.setFromEuler(new THREE.Euler(-0.22, -0.31, -0.07));
            
            // scene
            const scene = new THREE.Scene();
            //Vespa
            scene.traverse((object) => {
                console.log(`Nombre: ${object.name}, ID: ${object.id}`);
                const myObject = scene.getObjectById(object.id);  
                console.log("id:  ",myObject)
            });
            const raycaster = new THREE.Raycaster();
                const mouse = new THREE.Vector2();

                window.addEventListener('click', (event) => {
                // Transformar las coordenadas del ratón a coordenadas normalizadas (-1 a +1) para el raycaster
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                raycaster.setFromCamera(mouse, camera);

                const intersects = raycaster.intersectObjects(scene.children, true); // El segundo argumento, "true", permite verificar intersecciones con hijos de objetos en la escena

                if (intersects.length > 0) {
                    const firstObjectIntersected = intersects[0].object;
                    console.log('Has clickeado en:', firstObjectIntersected);
                }
                });


            // spline scene
            const loader = new SplineLoader();
                loader.load(
                'https://prod.spline.design/lyBWkgN7z9yi6YEA/scene.splinecode',
                (splineScene) => {
                    scene.add(splineScene);
                }
            );

            // renderer
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setAnimationLoop(animate);
            document.body.appendChild(renderer.domElement);

            // scene settings
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFShadowMap;

            scene.background = new THREE.Color('#bbf4f3');
            renderer.setClearAlpha(1);

            // orbit controls
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.125;

            window.addEventListener('resize', onWindowResize);
            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }

            function animate(time) {
                controls.update();
                renderer.render(scene, camera);
            }
        }
    }

</script>

<template>
    <canvas />
</template>