import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const container = document.getElementById('canvas-container');

if (container) {
    // 1. Cena e Câmera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 1;

    // 2. Renderizador
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 3. Luzes
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffdcb4, 2); // Luz quente
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // 4. Carregar Modelo
    const loader = new GLTFLoader();
    let model;

    // Tenta carregar modelo online, se falhar cria um cilindro
    loader.load(
        'https://raw.githubusercontent.com/aaron-ks/gltf-models/main/pie.glb', // URL pública segura
        (gltf) => {
            model = gltf.scene;
            model.scale.set(2, 2, 2);
            model.rotation.x = 0.3; // Inclina pra ver o recheio
            scene.add(model);
        },
        undefined,
        (error) => {
            console.warn('Modelo 3D não carregou, usando fallback.', error);
            // Fallback: Cria uma "torta" geométrica simples
            const geometry = new THREE.CylinderGeometry(1.5, 1.2, 0.5, 32);
            const material = new THREE.MeshStandardMaterial({ color: 0xDCA54A, roughness: 0.8 });
            model = new THREE.Mesh(geometry, material);
            model.rotation.x = 0.3;
            model.rotation.z = 0.2;
            scene.add(model);
        }
    );

    // 5. Animação
    const animate = () => {
        requestAnimationFrame(animate);
        
        if (model) {
            model.rotation.y += 0.005; // Gira devagar
        }
        
        renderer.render(scene, camera);
    };
    animate();

    // 6. Responsividade
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}