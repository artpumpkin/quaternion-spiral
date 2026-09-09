> Terminology note: this is a quaternion-driven spherical spiral study, not a constant-bearing navigational loxodrome. The historical filename is retained.

🌀 The Loxodrome: A 4D Architectural Guide

This guide explains how to construct a spherical spiral (Loxodrome) using Quaternions. Instead of static 3D coordinates, we use Nested Rotations to describe movement through space.

🛰️ Deep Dive: What are Quaternions?

Quaternions are 4-dimensional numbers that represent 3D rotations. While we live in 3D ($x, y, z$), math libraries use 4D to avoid common rotation glitches like "Gimbal Lock."

The Four Parts ($w, x, y, z$)

A quaternion is written as $q = w + xi + yj + zk$.

$w$ (The Scalar/Real part): This represents the amount of rotation.

If $w=1$, there is no rotation (the Identity).

If $w=0$, it represents a $180^\circ$ flip.

$x, y, z$ (The Imaginary/Vector parts): These define the axis (the invisible hinge) we are spinning around.

$i$ corresponds to the X-axis (Horizontal).

$j$ corresponds to the Y-axis (Vertical).

$k$ corresponds to the Z-axis (Depth).

Pure vs. Full Quaternions

Pure Quaternion ($w=0$): Used to represent a point or a position in space. Because it isn't "rotating" itself, it has no real part.

Full Quaternion ($w \neq 0$): Used as a rotation instruction. It tells an object how much to turn and in which direction.

1. The Core Strategy: The Three-Step Framework

To build any complex 3D path, follow this mental workflow:

The Seed Point ($P$): Pick a simple starting location (usually the North Pole).

The Hinges (Axes): Identify the "invisible rods" you need to spin around.

The Engine (Interpolation): Move a single variable $t$ from $0 \to 1$ and scale your angles accordingly.

2. The Mathematical Construction

The Seed Point

We start at the top of a sphere with radius $R$. In Quaternion math, this must be Pure Imaginary ($w=0$).


$$P = 0w + 0i + Rj + 0k$$

The Rotations (The "Full" Quaternions)

To rotate by an angle $\theta$, we use the Half-Angle Rule.

Instruction A: The Tilt (Latitude)

Axis: $i$ (Horizontal axis / Left-to-Right).

Angle: $\phi = t \cdot \pi$ (Moves $180^\circ$ from North to South).

Formula: $Q_{tilt} = \cos(\frac{\phi}{2}) + \sin(\frac{\phi}{2})i$

Instruction B: The Spin (Longitude)

Axis: $j$ (Vertical axis / Floor-to-Ceiling).

Angle: $\theta = t \cdot 2\pi \cdot \text{Loops}$ (Spins around the sphere).

Formula: $Q_{spin} = \cos(\frac{\theta}{2}) + \sin(\frac{\theta}{2})j$

The Multiplication (The Hierarchy)

In code, we combine these instructions. Order matters: Right-to-Left.


$$Q_{final} = Q_{spin} \times Q_{tilt}$$


Logic: We tilt the point off the pole first, then spin that tilted point around the center.

3. The Pseudo-Code Implementation

// Configuration
const RADIUS = 5;
const LOOPS = 20;
const STEPS = 1000;

for (let i = 0; i <= STEPS; i++) {
    // 1. Progress (0.0 to 1.0)
    let t = i / STEPS;

    // 2. Define Angles (Half-Angle applied here)
    let phi = (t * Math.PI) / 2; 
    let theta = (t * 2 * Math.PI * LOOPS) / 2;

    // 3. Construct Instructions (x, y, z, w)
    let qTilt = new Quaternion(Math.sin(phi), 0, 0, Math.cos(phi));
    let qSpin = new Quaternion(0, Math.sin(theta), 0, Math.cos(theta));

    // 4. Combine (Spin * Tilt)
    let qFinal = qSpin.multiply(qTilt);

    // 5. The Sandwich (Rotate the Seed)
    // Formula: P' = Q * P * Q_inverse
    let seedPoint = new Vector3(0, RADIUS, 0);
    let newPoint = seedPoint.applyQuaternion(qFinal);

    // 6. Store Result
    pathArray.push(newPoint);
}


4. Common Brain-Traps (The "Gotchas")

The Hinge Rule

To move between Top and Bottom, your "Hinge" must be Horizontal ($i$).

To move between Left and Right, your "Hinge" must be Vertical ($j$).

To move in a Clockwise Circle, your "Hinge" must point at your eye ($k$).

The Half-Angle Rule

Because the "Sandwich" formula touches the point twice ($Q$ and $Q^{-1}$), the rotation is effectively doubled. You must divide your target angle by 2 before calculating Sine and Cosine.

The Constructor Order

Different libraries use different orders.

Three.js: (x, y, z, w)

Math Papers: (w, x, y, z)

If your $w$ is in the wrong slot, your rotation becomes a point, and your point becomes a rotation!

The Identity ($w=1$)

A Quaternion with $w=1$ and all other parts $0$ is the "No-Turn" instruction. It is the mathematical equivalent of multiplying by 1.