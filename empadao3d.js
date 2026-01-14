/* MÓDULO 3D - EMPADÃO DA TÂNIA
   Carrega o modelo GLB do Spline/Blender
*/

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const container = document.getElementById('canvas-container');

if (container) {
    // --- 1. CONFIGURAÇÃO DA CENA ---
    const scene = new THREE.Scene();
    
    // Câmera (Campo de visão, Proporção, Corte próximo, Corte longe)
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 6; // Afasta ou aproxima a câmera
    camera.position.y = 1; // Altura da câmera

    // Renderizador (Alpha true = Fundo transparente)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Melhora nitidez em celulares
    container.appendChild(renderer.domElement);

    // --- 2. ILUMINAÇÃO (Para comida parecer apetitosa) ---
    // Luz Ambiente (Clareia tudo suavemente)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    // Luz Direcional (Simula o sol/lâmpada - cria sombras e brilho)
    const dirLight = new THREE.DirectionalLight(0xffdcb4, 2.5); // Cor quente
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Luz de Preenchimento (Para não deixar o lado oposto muito escuro)
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.0);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    // --- 3. CARREGAMENTO DO MODELO ---
    const loader = new GLTFLoader();
    let model;

    loader.load(
        '/3d/empadao.glb', // CAMINHO DO ARQUIVO
        (gltf) => {
            model = gltf.scene;

            /* --- PAINEL DE CONTROLE DO MODELO --- */
            // Ajuste esses números se o modelo ficar estranho na tela
            
            // 1. TAMANHO (Escala)
            // Se estiver gigante, tente 0.1. Se sumir, tente 10.
            model.scale.set(1.6, 1.6, 1.6); 

            // 2. POSIÇÃO (X, Y, Z)
            // Y negativo desce o objeto.
            model.position.y = 1.0; 

            // 3. ROTAÇÃO INICIAL
            // Inclina um pouco para o cliente ver o recheio de cima
            model.rotation.x = 0.6; 

            scene.add(model);
            console.log("Empadão 3D carregado com sucesso!");
        },
        undefined, // Progresso (não precisamos agora)
        (error) => {
            console.error('Erro ao carregar o modelo 3D:', error);
            // Fallback: Cria um cilindro dourado se o arquivo falhar
            createFallbackModel();
        }
    );

    // --- 4. ANIMAÇÃO (LOOP) ---
    const animate = () => {
        requestAnimationFrame(animate);
        
        if (model) {
            // Rotação automática suave
            model.rotation.y += 0.003; 
        } else if (fallbackMesh) {
            fallbackMesh.rotation.y += 0.005;
            fallbackMesh.rotation.x = 0.5;
        }
        
        renderer.render(scene, camera);
    };

    // --- 5. RESPONSIVIDADE ---
    // Ajusta o tamanho se a janela mudar
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // --- FUNÇÕES EXTRAS ---
    let fallbackMesh;
    function createFallbackModel() {
        const geometry = new THREE.CylinderGeometry(1.5, 1.2, 0.5, 33);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0xDCA54A, 
            roughness: 0.4,
            metalness: 0.1
        });
        fallbackMesh = new THREE.Mesh(geometry, material);
        scene.add(fallbackMesh);
    }

    animate();
}