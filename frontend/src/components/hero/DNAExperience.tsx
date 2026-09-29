import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface NodeData {
  id: string;
  name: string;
  generation: string;
  genotype: string;
  status: 'OBSERVED' | 'INFERRED' | 'STRICT_UNKNOWN';
  x: number;
  y: number;
  z: number;
  color: number;
}

interface DNAExperienceProps {
  onSelectNode: (node: NodeData | null) => void;
  selectedNode: NodeData | null;
}

export const DNAExperience: React.FC<DNAExperienceProps> = ({ onSelectNode, selectedNode }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07111F, 0.035);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 18);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0x112239, 1.8);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x52D9F5, 3.5, 30);
    cyanLight.position.set(-6, 8, 6);
    scene.add(cyanLight);

    const lavenderLight = new THREE.PointLight(0xA7A5FF, 3.0, 30);
    lavenderLight.position.set(6, -8, 6);
    scene.add(lavenderLight);

    // --- 1. Monumental Double-Helix DNA Strand ---
    const helixGroup = new THREE.Group();
    const strandCount = 70;
    const helixRadius = 2.4;
    const helixHeight = 16;
    const turns = 3.5;

    const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const cyanMat = new THREE.MeshStandardMaterial({
      color: 0x52D9F5,
      emissive: 0x52D9F5,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
    });
    const lavenderMat = new THREE.MeshStandardMaterial({
      color: 0xA7A5FF,
      emissive: 0xA7A5FF,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
    });
    const rungMat = new THREE.MeshBasicMaterial({
      color: 0xA8EAF5,
      transparent: true,
      opacity: 0.35,
    });

    for (let i = 0; i < strandCount; i++) {
      const t = i / strandCount;
      const angle = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * helixHeight;

      // Strand A (Cyan)
      const x1 = Math.cos(angle) * helixRadius;
      const z1 = Math.sin(angle) * helixRadius;
      const sphereA = new THREE.Mesh(sphereGeo, cyanMat);
      sphereA.position.set(x1, y, z1);
      helixGroup.add(sphereA);

      // Strand B (Lavender)
      const x2 = Math.cos(angle + Math.PI) * helixRadius;
      const z2 = Math.sin(angle + Math.PI) * helixRadius;
      const sphereB = new THREE.Mesh(sphereGeo, lavenderMat);
      sphereB.position.set(x2, y, z2);
      helixGroup.add(sphereB);

      // Connecting Base Pair Rung
      if (i % 2 === 0) {
        const points = [new THREE.Vector3(x1, y, z1), new THREE.Vector3(x2, y, z2)];
        const rungGeo = new THREE.BufferGeometry().setFromPoints(points);
        const rungLine = new THREE.Line(rungGeo, rungMat);
        helixGroup.add(rungLine);
      }
    }
    helixGroup.position.set(-2.5, 0, -2);
    helixGroup.rotation.z = 0.15;
    scene.add(helixGroup);

    // --- 2. Three Generational Levels & Family Nodes ---
    const nodesGroup = new THREE.Group();
    const familyNodes: NodeData[] = [
      // Gen I (Top Level)
      { id: 'I-1', name: 'Grandfather [I-1]', generation: 'Gen I', genotype: 'MYBPC3 c.1504C>T (Het)', status: 'OBSERVED', x: 2.2, y: 4.2, z: 1.5, color: 0x54D6A0 },
      { id: 'I-2', name: 'Grandmother [I-2]', generation: 'Gen I', genotype: 'WT/WT (Tested)', status: 'OBSERVED', x: 5.4, y: 4.2, z: 0.5, color: 0x54D6A0 },
      
      // Gen II (Middle Level)
      { id: 'II-1', name: 'Father [II-1]', generation: 'Gen II', genotype: 'MYBPC3 c.1504C>T (Carrier)', status: 'OBSERVED', x: 2.6, y: 0.2, z: 2.0, color: 0x54D6A0 },
      { id: 'II-2', name: 'Mother [II-2]', generation: 'Gen II', genotype: 'UNTESTED Record', status: 'STRICT_UNKNOWN', x: 5.8, y: 0.2, z: 1.0, color: 0xF5BE69 },
      
      // Gen III (Bottom Level - Proband)
      { id: 'III-1', name: 'Proband [III-1]', generation: 'Gen III', genotype: 'MYBPC3 c.1504C>T (Proband)', status: 'OBSERVED', x: 3.0, y: -4.0, z: 2.5, color: 0x52D9F5 },
      { id: 'III-2', name: 'Sibling [III-2]', generation: 'Gen III', genotype: '50% Transmission Prior', status: 'INFERRED', x: 5.6, y: -4.0, z: 1.8, color: 0xA7A5FF },
    ];

    const nodeMeshMap = new Map<THREE.Mesh, NodeData>();

    // Add Generational Rings
    const ringGeo = new THREE.TorusGeometry(3.6, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x52D9F5, transparent: true, opacity: 0.15 });

    const ringGenI = new THREE.Mesh(ringGeo, ringMat);
    ringGenI.position.set(3.8, 4.2, 1.0);
    ringGenI.rotation.x = Math.PI / 2;
    nodesGroup.add(ringGenI);

    const ringGenII = new THREE.Mesh(ringGeo, ringMat);
    ringGenII.position.set(4.2, 0.2, 1.5);
    ringGenII.rotation.x = Math.PI / 2;
    nodesGroup.add(ringGenII);

    const ringGenIII = new THREE.Mesh(ringGeo, ringMat);
    ringGenIII.position.set(4.3, -4.0, 2.1);
    ringGenIII.rotation.x = Math.PI / 2;
    nodesGroup.add(ringGenIII);

    // Create Interactive Node Meshes
    familyNodes.forEach((node) => {
      const nodeGeo = new THREE.SphereGeometry(0.38, 32, 32);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.5,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(node.x, node.y, node.z);

      // Add Outer Pulsing Ring
      const outerRingGeo = new THREE.RingGeometry(0.5, 0.58, 32);
      const outerRingMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });
      const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
      outerRing.lookAt(camera.position);
      nodeMesh.add(outerRing);

      nodesGroup.add(nodeMesh);
      nodeMeshMap.set(nodeMesh, node);
    });

    // --- 3. Transmission Pathways (Glow Lines) ---
    // Line 1: I-1 -> II-1
    const p1 = [new THREE.Vector3(2.2, 4.2, 1.5), new THREE.Vector3(2.6, 0.2, 2.0)];
    const lineGeo1 = new THREE.BufferGeometry().setFromPoints(p1);
    const lineMatActive = new THREE.LineBasicMaterial({ color: 0x52D9F5, transparent: true, opacity: 0.85, linewidth: 2 });
    nodesGroup.add(new THREE.Line(lineGeo1, lineMatActive));

    // Line 2: II-1 -> III-1 (Proband Path)
    const p2 = [new THREE.Vector3(2.6, 0.2, 2.0), new THREE.Vector3(3.0, -4.0, 2.5)];
    const lineGeo2 = new THREE.BufferGeometry().setFromPoints(p2);
    nodesGroup.add(new THREE.Line(lineGeo2, lineMatActive));

    // Secondary Kinship Lines
    const p3 = [new THREE.Vector3(2.2, 4.2, 1.5), new THREE.Vector3(5.4, 4.2, 0.5)];
    const lineMatFaint = new THREE.LineBasicMaterial({ color: 0x5F758E, transparent: true, opacity: 0.35 });
    nodesGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(p3), lineMatFaint));

    const p4 = [new THREE.Vector3(2.6, 0.2, 2.0), new THREE.Vector3(5.8, 0.2, 1.0)];
    nodesGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(p4), lineMatFaint));

    const p5 = [new THREE.Vector3(2.6, 0.2, 2.0), new THREE.Vector3(5.6, -4.0, 1.8)];
    nodesGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(p5), lineMatFaint));

    scene.add(nodesGroup);

    // --- 4. Floating Traveling Particle (Active Variant Transmission) ---
    const particleGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const movingParticle = new THREE.Mesh(particleGeo, particleMat);
    scene.add(movingParticle);

    // --- 5. Ambient Background Particle Cloud ---
    const bgParticleCount = 180;
    const bgGeo = new THREE.BufferGeometry();
    const bgPos = new Float32Array(bgParticleCount * 3);

    for (let i = 0; i < bgParticleCount * 3; i += 3) {
      bgPos[i] = (Math.random() - 0.5) * 35;
      bgPos[i + 1] = (Math.random() - 0.5) * 35;
      bgPos[i + 2] = (Math.random() - 0.5) * 20 - 5;
    }
    bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
    const bgMat = new THREE.PointsMaterial({
      color: 0x52D9F5,
      size: 0.08,
      transparent: true,
      opacity: 0.35,
    });
    const bgPoints = new THREE.Points(bgGeo, bgMat);
    scene.add(bgPoints);

    // Raycaster for Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      targetMouseX = mouse.x * 0.8;
      targetMouseY = mouse.y * 0.8;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(Array.from(nodeMeshMap.keys()));

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const hitData = nodeMeshMap.get(hitMesh) || null;
        setHoveredNode(hitData);
        document.body.style.cursor = 'pointer';
      } else {
        setHoveredNode(null);
        document.body.style.cursor = 'default';
      }
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(Array.from(nodeMeshMap.keys()));
      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const hitData = nodeMeshMap.get(hitMesh) || null;
        onSelectNode(hitData);
      } else {
        onSelectNode(null);
      }
    };

    currentMount.addEventListener('mousemove', handleMouseMove);
    currentMount.addEventListener('click', handleClick);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate DNA Helix
      helixGroup.rotation.y = elapsedTime * 0.25;

      // Parallax Camera Movement
      camera.position.x += (targetMouseX * 1.5 - camera.position.x) * 0.05;
      camera.position.y += (targetMouseY * 1.2 - camera.position.y) * 0.05;
      camera.lookAt(0.5, 0, 0);

      // Animate Traveling Variant Particle (I-1 -> II-1 -> III-1)
      const loopTime = (elapsedTime * 0.55) % 2; // 0 to 2
      if (loopTime < 1) {
        // I-1 to II-1
        movingParticle.position.lerpVectors(
          new THREE.Vector3(2.2, 4.2, 1.5),
          new THREE.Vector3(2.6, 0.2, 2.0),
          loopTime
        );
      } else {
        // II-1 to III-1
        movingParticle.position.lerpVectors(
          new THREE.Vector3(2.6, 0.2, 2.0),
          new THREE.Vector3(3.0, -4.0, 2.5),
          loopTime - 1
        );
      }

      // Gentle Floating Effect for Nodes
      nodesGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      currentMount.removeEventListener('mousemove', handleMouseMove);
      currentMount.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      document.body.style.cursor = 'default';
    };
  }, [onSelectNode]);

  return (
    <div className="relative w-full h-[550px] lg:h-[650px] rounded-2xl overflow-hidden glass-panel border border-cyan-electric/20 bg-midnight/80">
      {/* Three.js Canvas Mount */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating Generational Labels */}
      <div className="absolute top-6 left-6 flex flex-col gap-3 pointer-events-none">
        <div className="flex items-center gap-2 bg-surface-card/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-cyan-electric/20">
          <span className="w-2 h-2 rounded-full bg-evidence-green animate-pulse" />
          <span className="font-mono text-xs text-text-primary uppercase tracking-wider">GENERATION I (Founders)</span>
        </div>
        <div className="flex items-center gap-2 bg-surface-card/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-cyan-electric/20">
          <span className="w-2 h-2 rounded-full bg-evidence-green" />
          <span className="font-mono text-xs text-text-primary uppercase tracking-wider">GENERATION II (Carriers)</span>
        </div>
        <div className="flex items-center gap-2 bg-surface-card/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-cyan-electric/20">
          <span className="w-2 h-2 rounded-full bg-cyan-electric animate-pulse" />
          <span className="font-mono text-xs text-text-primary uppercase tracking-wider">GENERATION III (Proband)</span>
        </div>
      </div>

      {/* Epistemic Indicator Legend */}
      <div className="absolute bottom-6 left-6 flex flex-wrap items-center gap-2 pointer-events-none">
        <span className="px-2.5 py-1 text-[11px] font-mono rounded bg-evidence-green/20 text-evidence-green border border-evidence-green/30">
          ● OBSERVED (Verified)
        </span>
        <span className="px-2.5 py-1 text-[11px] font-mono rounded bg-cyan-electric/20 text-cyan-electric border border-cyan-electric/30">
          ● INFERRED (Deduction)
        </span>
        <span className="px-2.5 py-1 text-[11px] font-mono rounded bg-evidence-amber/20 text-evidence-amber border border-evidence-amber/30">
          ● STRICT UNKNOWN
        </span>
      </div>

      {/* Interactive Node Info Overlay Card */}
      {(hoveredNode || selectedNode) && (
        <div className="absolute top-6 right-6 max-w-xs w-full bg-surface-card/95 backdrop-blur-xl p-4 rounded-xl border border-cyan-electric/40 shadow-glow-cyan animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-semibold text-cyan-electric">
              {(hoveredNode || selectedNode)?.generation} Node
            </span>
            <span
              className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded ${
                (hoveredNode || selectedNode)?.status === 'OBSERVED'
                  ? 'bg-evidence-green/20 text-evidence-green border border-evidence-green/30'
                  : (hoveredNode || selectedNode)?.status === 'INFERRED'
                  ? 'bg-cyan-electric/20 text-cyan-electric border border-cyan-electric/30'
                  : 'bg-evidence-amber/20 text-evidence-amber border border-evidence-amber/30'
              }`}
            >
              {(hoveredNode || selectedNode)?.status}
            </span>
          </div>

          <h4 className="text-sm font-heading font-bold text-text-primary mb-1">
            {(hoveredNode || selectedNode)?.name}
          </h4>
          <p className="text-xs font-mono text-cyan-ice mb-2">
            {(hoveredNode || selectedNode)?.genotype}
          </p>

          <p className="text-[11px] text-text-secondary leading-relaxed">
            Interactive node. Click node on canvas to lock selection and inspect multigenerational lineage evidence.
          </p>
          <div className="mt-2 pt-2 border-t border-white/10 text-[10px] font-mono text-text-muted">
            Fictional Sample Node — Illustrative Only
          </div>
        </div>
      )}
    </div>
  );
};
