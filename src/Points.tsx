import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

const MAX_POINTS = 1000; // Maximum number of points to support

export const Points = ({ data }: { data: [number, number, number][] }) => {
	const meshRef = useRef<THREE.InstancedMesh>(null);
	const tempObject = useMemo(() => new THREE.Object3D(), []);

	// This runs every time the 'data' array changes
	useEffect(() => {
		if (!meshRef.current) return;

		data.slice(0, MAX_POINTS).forEach((pos, i) => {
			// Set the position for each instance
			tempObject.position.set(pos[0], pos[1], pos[2]);
			tempObject.updateMatrix();
			meshRef.current!.setMatrixAt(i, tempObject.matrix);
		});

		// Notify Three.js that the instance matrix needs an update
		meshRef.current.instanceMatrix.needsUpdate = true;

		// Set how many instances to actually draw
		meshRef.current.count = Math.min(data.length, MAX_POINTS);
	}, [data, tempObject]);

	return (
		<instancedMesh ref={meshRef} args={[undefined, undefined, MAX_POINTS]}>
			<sphereGeometry args={[0.05, 16, 16]} />
			<meshStandardMaterial color="cyan" />
		</instancedMesh>
	);
};
