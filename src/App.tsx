import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import "./App.css";
import { useRef, useState } from "react";
import { Path } from "./Path";
import { Vector3 } from "./classes/Vector3";
import { Quaternion } from "./classes/Quaternion";

const LOOP = 20;

const computeNextLoxodromeVector = (t: number, point: Vector3): Vector3 => {
	const theta = t * Math.PI;
	const qTilt = Quaternion.quaternionFromAxisAngle(new Vector3(1, 0, 0), theta);

	const beta = t * 2 * Math.PI * LOOP;
	const qSpin = Quaternion.quaternionFromAxisAngle(new Vector3(0, 1, 0), beta);

	const qFinal = Quaternion.multiplyQuaternions(qSpin, qTilt);

	return point.applyQuaternion(qFinal);
};

const RADIUS = 3;

const startingVector: Vector3 = new Vector3(0, RADIUS, 0);
const MAX_STEPS = 1000;

function Loxodrome() {
	const [vectors, setVectors] = useState<Vector3[]>([startingVector]);

	// Example function to push a new point
	const lastUpdate = useRef(0);
	const tRef = useRef(0);

	useFrame((state) => {
		const time = state.clock.getElapsedTime();

		// Add a new point every 0.5 seconds
		if (time - lastUpdate.current > 0.005 && tRef.current < 1) {
			setVectors((prev) => {
				const newVector: Vector3 = computeNextLoxodromeVector(
					tRef.current,
					startingVector,
				);

				return [...prev, newVector];
			});
			lastUpdate.current = time;
			tRef.current = tRef.current + 1 / MAX_STEPS;
		}
	});

	return <Path vectors={vectors} />;
}

function App() {
	return (
		<div id="app">
			<div id="canvas-container">
				{/* <button onClick={addPoint} style={{ position: "absolute", zIndex: 1 }}>
					Add Point
				</button> */}
				<Canvas camera={{ position: [12, 12, 12], fov: 50 }}>
					{/* Ambient light so we can see the box */}
					<ambientLight intensity={0.5} />
					<pointLight position={[10, 10, 10]} />

					{/* 1. Orbit Controls: Allows you to rotate/zoom with the mouse */}
					<OrbitControls />

					{/* 2. Axes Helper: Red (X), Green (Y), Blue (Z) */}
					<axesHelper args={[5]} />

					{/* 3. Grid: Visualizes the XZ plane */}
					<Grid
						infiniteGrid
						fadeDistance={50}
						fadeStrength={5}
						cellSize={1}
						sectionSize={3}
						sectionColor="#333"
						cellColor="#666"
					/>

					<Loxodrome />
				</Canvas>
			</div>
		</div>
	);
}

export default App;
