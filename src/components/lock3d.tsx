"use client";
import { Canvas, CanvasProps, useFrame, useLoader } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import dynamic from "next/dynamic";
import { RefObject, useEffect, useMemo, useRef } from "react";
import { MeshStandardMaterial, Object3D, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

function Controller({ ref }: {ref: RefObject<Object3D | null>}) {
    const mouse = useRef({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    });
    useFrame(({ camera }) => {
        const mouseVec = new Vector3(mouse.current.x, mouse.current.y, 0.9);
        mouseVec.unproject(camera);
        ref.current?.lookAt(mouseVec);
    });
    return <></>;
}

function genParticleCoords(min: number, max: number) {
    return (Math.random() * (max - min) + min) * (Math.random() < 0.5 ? -1 : 1);
}

function Particles(props: { color: string, count: number }) {
    const particlesRef = useRef<(Object3D|null)[]>([]);
    useFrame(() => {
        particlesRef.current.forEach(p => {
            p?.rotateX(Math.random()*0.1);
            p?.rotateY(Math.random()*0.1);
            p?.rotateZ(Math.random()*0.1);
        });
    });
    return Array.from({ length: props.count }, 
        () => [genParticleCoords(1, 2), genParticleCoords(1, 2), 1]
    ).map((pos, i) => 
        <mesh scale={0.1} position={[pos[0], pos[1], pos[2]]} key={i} ref={r => particlesRef.current[i] = r}>
            <meshStandardMaterial color={props.color} emissive={props.color} emissiveIntensity={0} />
            <icosahedronGeometry />
        </mesh>
    );
}

function Lock3D(props: CanvasProps) {
    const lock = useLoader(GLTFLoader, "/3d/padlock.gltf");
    const lockRef = useRef<Object3D>(null);
    const color = getComputedStyle(document.documentElement).getPropertyValue("--secondary");
    useMemo(() => {
        (lock.materials["Padlock"] as MeshStandardMaterial).color.set(color);
        (lock.materials["Padlock"] as MeshStandardMaterial).emissive.set(color);
        (lock.materials["Padlock"] as MeshStandardMaterial).emissiveIntensity = .1; 
    }, [lock.materials, color]);
    return <Canvas {...props}>
        <Controller ref={lockRef} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <primitive object={lock.scene} ref={lockRef} />
        <Particles color={color} count={10} />
        <EffectComposer>
            <Bloom intensity={50} luminanceThreshold={0} luminanceSmoothing={0.9} radius={0.4} />
        </EffectComposer>
    </Canvas>;
}

export default dynamic(() => Promise.resolve(Lock3D), { ssr: false });