import { Quaternion, type QuaternionType } from "./Quaternion";

export class Vector3 {
	x: number;
	y: number;
	z: number;

	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	clone(): Vector3 {
		return new Vector3(this.x, this.y, this.z);
	}

	applyQuaternion(q: QuaternionType): Vector3 {
		const qInverted = Quaternion.invertQuaternions(q);
		const qFinal = Quaternion.multiplyQuaternions(q, {
			...this.clone(),
			w: 0,
		});
		return Quaternion.toVector3(
			Quaternion.multiplyQuaternions(qFinal, qInverted),
		);
	}
}
