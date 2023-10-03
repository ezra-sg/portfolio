<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

    let scene;
    let renderer;
    let camera;
    let light;
    let controls;
    let stars;
    const numberOfStars = 10000;

    let fps = 0;
    let frameCount = 0;
    let lastTime = Date.now();

    onMount(() => {
        // Create a scene, camera, and renderer
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.position = 'fixed';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.right = '0';
        renderer.domElement.style.bottom = '0';
        renderer.domElement.style.left = '0';
        document.body.appendChild(renderer.domElement);


        const starGeometry = new THREE.BufferGeometry();
        const starVertices = [];
        const starSizes = [];
        const starsColors = [];

        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starVertices.push(x, y, z);

            const color = new THREE.Color(0xffffff);
            color.setHSL(Math.random(), 1.0, 0.95); // Random color
            starsColors.push(color.r, color.g, color.b);

            starSizes.push(Math.random() * 0.5 + 0.3);
        }

        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starsColors, 3));
        starGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1));
        const vertexShader = `
            attribute float size;
            varying vec3 vColor;
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `;

        const fragmentShader = `
            varying vec3 vColor;
            void main() {
                vec2 m = gl_PointCoord.xy - vec2(0.5, 0.5);
                float dist = m.x * m.x + m.y * m.y;
                if (dist > 0.25) {
                discard;
                }
                gl_FragColor = vec4(vColor, 1.0);
            }
        `;

        // Shader material and vertex shader as before
        const starMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                color: { value: new THREE.Color(0xFFFFFF) },
            },
            vertexColors: true,
        });

        stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Animation/render loop
        animate();
    });

    function animate() {
        frameCount++;
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTime;

        if (deltaTime >= 1000) {
            fps = frameCount;
            frameCount = 0;
            lastTime = currentTime;
        }

        stars.rotation.x += 0.0002;
        stars.rotation.y += 0.0002;

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
</script>

<div class="fps-counter">
    {fps} FPS
</div>

<style>
.fps-counter {
    position: fixed;
    top: 16px;
    left: 16px;
    color: rgb(10, 244, 10);
    z-index: 9999;
}
</style>
