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

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const fov = 45;
    const cameraZ = 7;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100);
    camera.position.set(0, 0, cameraZ);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xbae6fd, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.5);
    rimLight.position.set(-4, -2, 3);
    scene.add(rimLight);

    // --- Globe Group ---
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const updateGroupPosition = () => {
      if (window.innerWidth <= 900) {
        globeGroup.position.set(0, 0.2, 0);
        globeGroup.scale.setScalar(0.7);
      } else {
        const vh = Math.tan((fov * Math.PI) / 360) * cameraZ;
        const vw = vh * (width / height);
        globeGroup.position.set(vw * 0.38, 0.1, 0);
        globeGroup.scale.setScalar(1);
      }
    };
    updateGroupPosition();

    const GLOBE_RADIUS = 2.0;

    // --- Wireframe Sphere (Primary Globe) ---
    const wireGeo = new THREE.IcosahedronGeometry(GLOBE_RADIUS, 3);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wireGlobe = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireGlobe);

    // --- Secondary inner wireframe for depth ---
    const innerWireGeo = new THREE.IcosahedronGeometry(GLOBE_RADIUS * 0.92, 2);
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const innerWireGlobe = new THREE.Mesh(innerWireGeo, innerWireMat);
    globeGroup.add(innerWireGlobe);

    // --- Connection Nodes (glowing dots on globe surface) ---
    const nodeCount = 60;
    const nodePositions: THREE.Vector3[] = [];
    const nodeMeshes: THREE.Mesh[] = [];

    const nodeGeo = new THREE.SphereGeometry(0.035, 8, 8);

    // Golden spiral distribution for even placement
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = ((Math.PI * (1 + Math.sqrt(5))) * i);

      const pos = new THREE.Vector3(
        Math.cos(theta) * radiusAtY * GLOBE_RADIUS,
        y * GLOBE_RADIUS,
        Math.sin(theta) * radiusAtY * GLOBE_RADIUS,
      );
      nodePositions.push(pos);

      // Vary node brightness
      const brightness = 0.5 + Math.random() * 0.5;
      const nodeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.55, 0.85, 0.5 + brightness * 0.35),
        transparent: true,
        opacity: 0.7 + Math.random() * 0.3,
      });

      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      nodeMesh.userData = {
        baseScale: 0.6 + Math.random() * 0.8,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.8 + Math.random() * 1.5,
      };
      nodeMesh.scale.setScalar(nodeMesh.userData.baseScale);
      globeGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);
    }

    // --- Connection Lines (arcs between nearby nodes) ---
    const connectionLines: THREE.Line[] = [];
    const maxConnections = 80;
    let connectionCount = 0;

    // Connect nodes that are within a certain distance
    const connectionThreshold = GLOBE_RADIUS * 1.2;
    for (let i = 0; i < nodeCount && connectionCount < maxConnections; i++) {
      for (let j = i + 1; j < nodeCount && connectionCount < maxConnections; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < connectionThreshold && Math.random() > 0.4) {
          // Create curved arc between points
          const mid = new THREE.Vector3()
            .addVectors(nodePositions[i], nodePositions[j])
            .multiplyScalar(0.5);
          // Push midpoint outward for arc effect
          mid.normalize().multiplyScalar(GLOBE_RADIUS * 1.08);

          const curve = new THREE.QuadraticBezierCurve3(
            nodePositions[i],
            mid,
            nodePositions[j],
          );

          const curvePoints = curve.getPoints(16);
          const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
          const lineMat = new THREE.LineBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.08 + Math.random() * 0.08,
          });
          const line = new THREE.Line(lineGeo, lineMat);
          globeGroup.add(line);
          connectionLines.push(line);
          connectionCount++;
        }
      }
    }

    // --- Orbiting Data Arcs (3 orbital rings) ---
    const orbitRings: THREE.Line[] = [];
    const orbitConfigs = [
      { radius: GLOBE_RADIUS * 1.18, tiltX: 1.2, tiltZ: 0.3, color: 0x0ea5e9, opacity: 0.18, speed: 0.15 },
      { radius: GLOBE_RADIUS * 1.30, tiltX: 0.5, tiltZ: 1.0, color: 0x7dd3fc, opacity: 0.12, speed: -0.10 },
      { radius: GLOBE_RADIUS * 1.45, tiltX: 0.8, tiltZ: -0.6, color: 0x38bdf8, opacity: 0.09, speed: 0.08 },
    ];

    orbitConfigs.forEach((cfg) => {
      // Create a partial arc (not a full circle) for a data-stream look
      const arcCurve = new THREE.EllipseCurve(
        0, 0,
        cfg.radius, cfg.radius,
        0, Math.PI * 1.5, // 270-degree arc
        false, 0
      );
      const arcPoints2D = arcCurve.getPoints(80);
      const arcPoints3D = arcPoints2D.map(p => new THREE.Vector3(p.x, p.y, 0));

      const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints3D);
      const arcMat = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcLine.rotation.x = cfg.tiltX;
      arcLine.rotation.z = cfg.tiltZ;
      arcLine.userData = { speed: cfg.speed };
      globeGroup.add(arcLine);
      orbitRings.push(arcLine);

      // Add a small bright dot at the arc's leading edge
      const dotGeo = new THREE.SphereGeometry(0.04, 6, 6);
      const dotMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.9,
      });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      // Position at the end of the arc
      const lastPt = arcPoints3D[arcPoints3D.length - 1];
      dotMesh.position.copy(lastPt);
      arcLine.add(dotMesh);
    });

    // --- Particle Atmosphere (subtle floating dust) ---
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOpacities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Distribute in a spherical shell around the globe
      const phi = Math.random() * Math.PI * 2;
      const cosTheta = Math.random() * 2 - 1;
      const sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
      const r = GLOBE_RADIUS * (1.3 + Math.random() * 1.2);

      particlePositions[i * 3] = r * sinTheta * Math.cos(phi);
      particlePositions[i * 3 + 1] = r * cosTheta;
      particlePositions[i * 3 + 2] = r * sinTheta * Math.sin(phi);
      particleOpacities[i] = 0.15 + Math.random() * 0.35;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x7dd3fc,
      size: 0.02,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    globeGroup.add(particles);

    // --- Glow Halo (large transparent sphere) ---
    const glowGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.08, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.03,
      side: THREE.BackSide,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    globeGroup.add(glowMesh);

    // --- Mouse Interaction ---
    let targetRotY = 0;
    let targetRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth <= 900 || prefersReducedMotion) return;
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      targetRotY = mouseX * 0.5;
      targetRotX = mouseY * 0.3;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // --- Resize ---
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

    // --- Visibility Observer ---
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // --- Animation ---
    let clock = 0;
    let animId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;
      clock += delta;

      if (!prefersReducedMotion) {
        // Slow globe rotation
        wireGlobe.rotation.y = clock * 0.12;
        wireGlobe.rotation.x = Math.sin(clock * 0.05) * 0.08;
        innerWireGlobe.rotation.y = clock * 0.08;
        innerWireGlobe.rotation.x = Math.sin(clock * 0.04) * 0.06;

        // Pulse connection nodes
        for (let i = 0; i < nodeMeshes.length; i++) {
          const node = nodeMeshes[i];
          const { baseScale, pulsePhase, pulseSpeed } = node.userData;
          const pulse = 1 + Math.sin(clock * pulseSpeed + pulsePhase) * 0.3;
          node.scale.setScalar(baseScale * pulse);
        }

        // Rotate orbit arcs
        for (let i = 0; i < orbitRings.length; i++) {
          orbitRings[i].rotation.y += orbitRings[i].userData.speed * delta;
        }

        // Rotate particles slowly
        particles.rotation.y = clock * 0.03;
        particles.rotation.x = Math.sin(clock * 0.02) * 0.05;

        // Mouse-following with smooth damping + gentle idle sway
        const idleY = Math.sin(clock * 0.25) * 0.06;
        const idleX = Math.cos(clock * 0.2) * 0.04;
        globeGroup.rotation.y += (targetRotY + idleY - globeGroup.rotation.y) * 0.03;
        globeGroup.rotation.x += (targetRotX + idleX - globeGroup.rotation.x) * 0.03;
      }

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      // Dispose all geometries and materials
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.Points) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
