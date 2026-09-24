'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Optimized WebGLRenderer: capped DPR to 1.5 for ultra-fast GPU fillrate and zero stutter
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      precision: 'mediump', // significantly lighter on mobile and integrated GPUs
    });
    
    // Balanced pixel ratio: crisp visuals without 4x Retina GPU penalty
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    
    // Proper color space & filmic tone mapping for radiant, luminous sky colors
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    const scene = new THREE.Scene();
    const fov = 40;
    const cz = 9;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100);
    camera.position.set(0, 0, cz);

    // Enhanced radiant lighting: eliminates muddy dark plastic look
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xbae6fd, 1.4);
    scene.add(hemiLight);

    // Main key light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.3);
    dirLight.position.set(5, 7, 7);
    scene.add(dirLight);

    // Front-fill soft light
    const frontLight = new THREE.DirectionalLight(0xbae6fd, 0.8);
    frontLight.position.set(-3, 2, 6);
    scene.add(frontLight);

    // Vibrant sky accent point light
    const pointLight = new THREE.PointLight(0x38bdf8, 2.0, 30);
    pointLight.position.set(1, -2, 4);
    scene.add(pointLight);

    // Main sculpture group
    const group = new THREE.Group();
    scene.add(group);

    const updateGroupPosition = () => {
      const vh = Math.tan((fov * Math.PI) / 360) * cz;
      const vw = vh * (width / height);
      if (window.innerWidth <= 900) {
        group.position.set(0, 0, -2);
        group.scale.set(0.65, 0.65, 0.65);
      } else {
        group.position.set(vw * 0.44, 0.35, -0.2);
        group.scale.set(1, 1, 1);
      }
    };
    updateGroupPosition();

    // CatmullRomCurve3 coordinates exactly from brief
    const points = [
      new THREE.Vector3(-2.4, -1.6, 0.2),
      new THREE.Vector3(-1.4, 0.5, 1.1),
      new THREE.Vector3(-0.2, -0.8, -0.6),
      new THREE.Vector3(0.8, 1.3, 0.6),
      new THREE.Vector3(1.8, -0.3, 1.2),
      new THREE.Vector3(2.4, 1.4, -0.4),
      new THREE.Vector3(1.5, 2.2, -1.2),
    ];
    const curve = new THREE.CatmullRomCurve3(points);

    // OPTIMIZATION: 160 segments x 20 radial (62% fewer polygons than 280x30, identical smooth silhouette)
    const tubeGeo = new THREE.TubeGeometry(curve, 160, 0.17, 20, false);
    
    // High-performance Standard material with subtle emissive boost so it stays vibrant and never turns dark
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      roughness: 0.12,
      metalness: 0.15,
      emissive: 0x0369a1,
      emissiveIntensity: 0.22,
    });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    group.add(tubeMesh);

    // Draw-on setup
    const totalIndices = tubeGeo.index ? tubeGeo.index.count : tubeGeo.attributes.position.count;
    let drawnCount = prefersReducedMotion ? totalIndices : 0;
    let isDrawComplete = prefersReducedMotion;
    tubeGeo.setDrawRange(0, drawnCount);

    // White gleaming pearl (sphere 24x24 for high speed)
    const pearlGeo = new THREE.SphereGeometry(0.28, 24, 24);
    const pearlMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.08,
      metalness: 0.05,
      emissive: 0xffffff,
      emissiveIntensity: 0.25,
    });
    const pearlMesh = new THREE.Mesh(pearlGeo, pearlMat);
    group.add(pearlMesh);

    // Navy torus ring (-2.1, 1.6, -0.8) with glossy navy depth
    const ringGeo = new THREE.TorusGeometry(0.62, 0.06, 12, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x0c4a6e,
      roughness: 0.14,
      metalness: 0.4,
      emissive: 0x082f49,
      emissiveIntensity: 0.15,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(-2.1, 1.6, -0.8);
    group.add(ringMesh);

    // 4 Floating Glass Orbs: luminous, frosted, shimmering sky colors
    const sphereDefs = [
      { pos: [-2.8, -0.3, -1.4], r: 0.36, color: 0xbae6fd, emissive: 0x7dd3fc, opacity: 0.85 },
      { pos: [2.7, -1.5, -0.6], r: 0.46, color: 0xe0f2fe, emissive: 0xbae6fd, opacity: 0.88 },
      { pos: [0.3, 2.1, -1.8], r: 0.22, color: 0x7dd3fc, emissive: 0x38bdf8, opacity: 0.95 },
      { pos: [1.0, -1.9, 0.6], r: 0.17, color: 0x0369a1, emissive: 0x0284c7, opacity: 0.95 },
    ];

    const floatingSpheres: THREE.Mesh[] = [];
    sphereDefs.forEach((def) => {
      const sGeo = new THREE.SphereGeometry(def.r, 20, 20);
      const sMat = new THREE.MeshStandardMaterial({
        color: def.color,
        roughness: 0.1,
        metalness: 0.1,
        transparent: true,
        opacity: def.opacity,
        emissive: def.emissive,
        emissiveIntensity: 0.2,
      });
      const sMesh = new THREE.Mesh(sGeo, sMat);
      sMesh.position.set(def.pos[0], def.pos[1], def.pos[2]);
      sMesh.userData = { initialY: def.pos[1], phase: Math.random() * Math.PI * 2 };
      group.add(sMesh);
      floatingSpheres.push(sMesh);
    });

    // Zero-allocation vector for tip tracking
    const tipVector = new THREE.Vector3();

    // Mouse movement damping
    let targetRotY = 0;
    let targetRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth <= 900 || prefersReducedMotion) return;
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      targetRotY = mouseX * 0.6;
      targetRotX = mouseY * 0.38;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateGroupPosition();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Viewport intersection observer: immediately freezes rendering when scrolled away
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop with delta time clamping
    let clock = 0;
    let animId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;
      clock += delta * 1.2;

      // Draw-on: smoothly increments and freezes once complete (no memory/GPU bandwidth waste)
      if (!isDrawComplete) {
        drawnCount += Math.ceil(totalIndices * delta * 0.7);
        if (drawnCount >= totalIndices) {
          drawnCount = totalIndices;
          isDrawComplete = true;
          tubeGeo.setDrawRange(0, totalIndices);
        } else {
          const cleanStep = drawnCount - (drawnCount % 3);
          tubeGeo.setDrawRange(0, cleanStep);
        }
      }

      // Pearl smoothly follows tip
      const progress = Math.min(1, Math.max(0.001, drawnCount / totalIndices));
      curve.getPointAt(progress, tipVector);
      pearlMesh.position.copy(tipVector);

      if (!prefersReducedMotion) {
        // Torus rotation
        ringMesh.rotation.x = clock * 0.6;
        ringMesh.rotation.y = clock * 0.35;

        // Floating spheres bobbing
        const sphereCount = floatingSpheres.length;
        for (let i = 0; i < sphereCount; i++) {
          const sph = floatingSpheres[i];
          sph.position.y = sph.userData.initialY + Math.sin(clock * 1.3 + sph.userData.phase) * 0.14;
        }

        // Smooth mouse damping (0.05 per frame) + gentle idle sway
        const idleY = Math.sin(clock * 0.45) * 0.1;
        const idleX = Math.cos(clock * 0.35) * 0.06;
        group.rotation.y += (targetRotY + idleY - group.rotation.y) * 0.05;
        group.rotation.x += (targetRotX + idleX - group.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      renderer.dispose();
      tubeGeo.dispose();
      tubeMat.dispose();
      pearlGeo.dispose();
      pearlMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      floatingSpheres.forEach((sph) => {
        sph.geometry.dispose();
        if (Array.isArray(sph.material)) {
          sph.material.forEach((m) => m.dispose());
        } else {
          sph.material.dispose();
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
