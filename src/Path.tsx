import { Line } from "@react-three/drei";
import type { Vector3 as CustomVector3 } from "./classes/Vector3";
import { Vector3 } from "three";

export const Path = ({ vectors }: { vectors: CustomVector3[] }) => {
	// Convert [[x,y,z], [x,y,z]] into a flat array or THREE.Vector3 array
	// The <Line> component from drei is smart enough to handle both.

	return (
		<Line
			points={vectors.map((v) => new Vector3(v.x, v.y, v.z))} // Array of Vector3
			color="hotpink" // Color of the line
			lineWidth={3} // Thickness (works on all browsers!)
			dashed={false} // Optional: make it dashed
		/>
	);
};
