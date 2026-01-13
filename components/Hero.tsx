import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const Hero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 2.5;

    if (!rendererRef.current) {
        rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    }
    const renderer = rendererRef.current;
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffdcb4, 3);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Model Loading
    const loader = new GLTFLoader();
    let model: THREE.Group | null = null;
    loader.load(
        // FIX: Replaced model URL with a CORS-friendly one from GitHub.
        'https://raw.githubusercontent.com/aaron-ks/gltf-models/main/pie.glb',
        (gltf) => {
            model = gltf.scene;
            // Adjust scale, position, and rotation for the new empadão model
            model.scale.set(1.5, 1.5, 1.5);
            model.position.y = -0.2;
            model.rotation.x = 0.2; // Tilt it slightly towards the camera
            scene.add(model);
        },
        undefined,
        (error) => {
            console.error('An error happened while loading the model:', error);
        }
    );

    // Scroll Animation
    const handleScroll = () => {
        const scrollY = window.scrollY;
        const heroHeight = mountRef.current?.clientHeight || window.innerHeight;
        if (scrollY < heroHeight) {
            const scrollPercent = scrollY / heroHeight;
            camera.position.z = 2.5 - scrollPercent * 1.5; // Zoom in
            if(mountRef.current) mountRef.current.style.opacity = `${1 - scrollPercent * 1.5}`;
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Render loop
    const clock = new THREE.Clock();
    const animate = () => {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        if (model) {
            model.rotation.y = elapsedTime * 0.2; // Slow rotation
        }
        renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        if (mountRef.current) {
            mountRef.current.removeChild(renderer.domElement);
        }
    };
  }, []);
  
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
        <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-0" />
        <div className="relative z-10 p-4 bg-black/20 backdrop-blur-sm rounded-xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight" style={{ fontFamily: "'Georgia', 'serif'" }}>
                A Tradição de Goiás
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mt-4 max-w-2xl mx-auto">
                Assada com perfeição para trazer o melhor sabor de Caldas Novas até você.
            </p>
            <button
                onClick={scrollToMenu}
                className="mt-8 px-8 py-3 bg-amber-600 text-white font-bold text-lg rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
            >
                Ver Cardápio
            </button>
        </div>
    </section>
  );
};

export default Hero;