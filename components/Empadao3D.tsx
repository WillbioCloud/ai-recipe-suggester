import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Empadao3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 2.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffeadd, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Empadão Geometry
    const empadaoShape = new THREE.Shape();
    const radius = 1;
    empadaoShape.moveTo(0, 0);
    empadaoShape.absarc(0, 0, radius, 0, Math.PI * 2, false);

    const extrudeSettings = {
        steps: 2,
        depth: 0.4,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelOffset: 0,
        bevelSegments: 8
    };

    const geometry = new THREE.ExtrudeGeometry(empadaoShape, extrudeSettings);
    geometry.center(); // Center the geometry

    // Material
    const material = new THREE.MeshStandardMaterial({ 
        color: 0xE6BF83, // Baked dough color
        roughness: 0.8,
        metalness: 0.1 
    });
    
    const empadao = new THREE.Mesh(geometry, material);
    empadao.rotation.x = Math.PI / 2.5; // Tilt it
    scene.add(empadao);

    // Scroll Animation
    const handleScroll = () => {
        const top = currentMount.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Check if the element is in view
        if (top < windowHeight && top > -currentMount.clientHeight) {
            // Calculate progress of element through viewport
            const progress = (windowHeight - top) / (windowHeight + currentMount.clientHeight);
            // Apply a subtle zoom effect
            camera.position.z = 2.8 - progress * 0.5;
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });


    // Render loop
    const clock = new THREE.Clock();
    const animate = () => {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        empadao.rotation.z = elapsedTime * 0.15; // Slow rotation on its own axis
        renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        // Check if the renderer's DOM element is still a child before removing
        if (currentMount && renderer.domElement.parentNode === currentMount) {
            currentMount.removeChild(renderer.domElement);
        }
        // Dispose of Three.js objects to free up memory
        geometry.dispose();
        material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default Empadao3D;
