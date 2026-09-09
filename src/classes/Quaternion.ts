import { Vector3 } from "./Vector3";

export type QuaternionType = { x: number; y: number; z: number; w: number };

// biome-ignore lint/complexity/noStaticOnlyClass: Grouping quaternion math utilities in a static class for organizational clarity
export class Quaternion {
	static multiplyQuaternions(
		A: QuaternionType,
		B: QuaternionType,
	): QuaternionType {
		return {
			x: A.w * B.x + A.x * B.w + A.y * B.z - A.z * B.y,
			y: A.w * B.y - A.x * B.z + A.y * B.w + A.z * B.x,
			z: A.w * B.z + A.x * B.y - A.y * B.x + A.z * B.w,
			w: A.w * B.w - A.x * B.x - A.y * B.y - A.z * B.z,
		};
	}

	static invertQuaternions(Q: QuaternionType): QuaternionType {
		return { x: -Q.x, y: -Q.y, z: -Q.z, w: Q.w };
	}

	static toVector3(q: QuaternionType): Vector3 {
		return new Vector3(q.x, q.y, q.z);
	}

	static quaternionFromAxisAngle(axis: Vector3, angle: number): QuaternionType {
		const q = {
			x: axis.x * Math.sin(angle / 2),
			y: axis.y * Math.sin(angle / 2),
			z: axis.z * Math.sin(angle / 2),
			w: Math.cos(angle / 2),
		};

		return q;
	}
}
