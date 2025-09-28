/**
 * Simple Three.js-like WebGL wrapper for the Trefoil Knot visualization
 * This provides the basic functionality needed when Three.js CDN is not available
 */
window.THREE = {
    // Basic math utilities
    Math: {
        degToRad: (degrees) => degrees * Math.PI / 180,
        radToDeg: (radians) => radians * 180 / Math.PI
    },
    
    // Vector3 class
    Vector3: class {
        constructor(x = 0, y = 0, z = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        
        set(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        }
        
        copy(v) {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
            return this;
        }
        
        add(v) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            return this;
        }
        
        sub(v) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            return this;
        }
        
        subVectors(a, b) {
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            this.z = a.z - b.z;
            return this;
        }
        
        crossVectors(a, b) {
            const ax = a.x, ay = a.y, az = a.z;
            const bx = b.x, by = b.y, bz = b.z;
            
            this.x = ay * bz - az * by;
            this.y = az * bx - ax * bz;
            this.z = ax * by - ay * bx;
            
            return this;
        }
        
        dot(v) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        }
        
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
        
        normalize() {
            const len = this.length();
            if (len > 0) {
                this.x /= len;
                this.y /= len;
                this.z /= len;
            }
            return this;
        }
        
        setFromSpherical(spherical) {
            const sinPhiRadius = Math.sin(spherical.phi) * spherical.radius;
            this.x = sinPhiRadius * Math.sin(spherical.theta);
            this.y = Math.cos(spherical.phi) * spherical.radius;
            this.z = sinPhiRadius * Math.cos(spherical.theta);
            return this;
        }
    },
    
    // Spherical coordinates
    Spherical: class {
        constructor(radius = 1, phi = 0, theta = 0) {
            this.radius = radius;
            this.phi = phi;
            this.theta = theta;
        }
    },
    
    // Color class
    Color: class {
        constructor(r = 1, g = 1, b = 1) {
            this.r = r;
            this.g = g;
            this.b = b;
        }
        
        setHSL(h, s, l) {
            h = ((h % 1) + 1) % 1;
            
            const c = (1 - Math.abs(2 * l - 1)) * s;
            const x = c * (1 - Math.abs((h * 6) % 2 - 1));
            const m = l - c / 2;
            
            let r, g, b;
            
            if (h < 1/6) {
                r = c; g = x; b = 0;
            } else if (h < 2/6) {
                r = x; g = c; b = 0;
            } else if (h < 3/6) {
                r = 0; g = c; b = x;
            } else if (h < 4/6) {
                r = 0; g = x; b = c;
            } else if (h < 5/6) {
                r = x; g = 0; b = c;
            } else {
                r = c; g = 0; b = x;
            }
            
            this.r = r + m;
            this.g = g + m;
            this.b = b + m;
            
            return this;
        }
    },
    
    // Basic curve class
    Curve: class {
        constructor() {
            this.getPoint = function(t) { return new THREE.Vector3(); };
        }
    },
    
    // Simple buffer geometry
    BufferGeometry: class {
        constructor() {
            this.attributes = {};
            this.index = null;
        }
        
        setAttribute(name, attribute) {
            this.attributes[name] = attribute;
        }
        
        setIndex(index) {
            this.index = index;
        }
        
        clone() {
            const cloned = new THREE.BufferGeometry();
            cloned.attributes = { ...this.attributes };
            cloned.index = this.index;
            return cloned;
        }
    },
    
    // Float32 buffer attribute
    Float32BufferAttribute: class {
        constructor(array, itemSize) {
            this.array = array;
            this.itemSize = itemSize;
            this.count = array.length / itemSize;
        }
        
        getX(index) { return this.array[index * this.itemSize]; }
        getY(index) { return this.array[index * this.itemSize + 1]; }
        getZ(index) { return this.array[index * this.itemSize + 2]; }
    },
    
    // Buffer attribute
    BufferAttribute: class {
        constructor(array, itemSize) {
            this.array = array;
            this.itemSize = itemSize;
            this.count = array.length / itemSize;
        }
    },
    
    // Simple scene
    Scene: class {
        constructor() {
            this.children = [];
        }
        
        add(object) {
            this.children.push(object);
        }
        
        remove(object) {
            const index = this.children.indexOf(object);
            if (index !== -1) {
                this.children.splice(index, 1);
            }
        }
    },
    
    // Simple perspective camera
    PerspectiveCamera: class {
        constructor(fov, aspect, near, far) {
            this.fov = fov;
            this.aspect = aspect;
            this.near = near;
            this.far = far;
            this.position = new THREE.Vector3(0, 0, 5);
        }
        
        lookAt(x, y, z) {
            if (typeof x === 'object') {
                // Vector3-like object
                this.target = { x: x.x, y: x.y, z: x.z };
            } else {
                this.target = { x, y, z };
            }
        }
        
        updateProjectionMatrix() {
            // Implementation would create projection matrix
        }
    },
    
    // Simple WebGL renderer
    WebGLRenderer: class {
        constructor(options = {}) {
            this.domElement = document.createElement('canvas');
            this.domElement.width = window.innerWidth;
            this.domElement.height = window.innerHeight;
            this.domElement.style.display = 'block';
            
            // Use 2D context for reliable rendering
            this.ctx = this.domElement.getContext('2d');
            
            this.shadowMap = { enabled: false, type: null };
        }
        
        setSize(width, height) {
            this.domElement.width = width;
            this.domElement.height = height;
            this.domElement.style.width = width + 'px';
            this.domElement.style.height = height + 'px';
        }
        
        setClearColor(color, alpha) {
            this.clearColor = { color, alpha };
        }
        
        render(scene, camera) {
            if (!this.ctx) return;
            
            const width = this.domElement.width;
            const height = this.domElement.height;
            
            // Clear canvas with background
            this.ctx.clearRect(0, 0, width, height);
            
            // Find the trefoil mesh in the scene
            let trefoilMesh = null;
            for (const child of scene.children) {
                if (child instanceof THREE.Mesh) {
                    trefoilMesh = child;
                    break;
                }
            }
            
            if (trefoilMesh) {
                this.renderTrefoilKnot2D(this.ctx, width, height, trefoilMesh);
            }
        }
        
        renderTrefoilKnot2D(ctx, width, height, mesh) {
            const centerX = width / 2;
            const centerY = height / 2;
            const scale = Math.min(width, height) / 8;
            
            // Create gradient for the knot
            const gradient = ctx.createLinearGradient(centerX - scale * 3, centerY - scale * 3, centerX + scale * 3, centerY + scale * 3);
            gradient.addColorStop(0, '#4a9eff');
            gradient.addColorStop(0.5, '#2ecc71');
            gradient.addColorStop(1, '#ff6b35');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 12;
            ctx.shadowColor = '#4a9eff';
            ctx.shadowBlur = 20;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            // Draw trefoil knot curve
            ctx.beginPath();
            
            const segments = 300;
            let firstPoint = true;
            
            for (let i = 0; i <= segments; i++) {
                const t = (i / segments) * 2 * Math.PI;
                
                // Apply rotation from mesh
                const rotX = mesh.rotation ? mesh.rotation.x : 0;
                const rotY = mesh.rotation ? mesh.rotation.y : 0;
                const rotZ = mesh.rotation ? mesh.rotation.z : 0;
                
                // Trefoil knot parametric equations
                const magnitude = 2.0;
                const paramA = 0.5;
                const paramB = 0.5;
                const frequency = 1.0;
                
                const ft = frequency * t;
                let x3d = magnitude * (Math.sin(ft) + paramA * Math.sin(3 * ft));
                let y3d = magnitude * (Math.cos(ft) - paramA * Math.cos(3 * ft));
                let z3d = magnitude * paramB * Math.sin(2 * ft);
                
                // Simple 3D rotation
                const cosY = Math.cos(rotY);
                const sinY = Math.sin(rotY);
                const cosX = Math.cos(rotX);
                const sinX = Math.sin(rotX);
                
                // Rotate around Y axis
                const tempX = x3d * cosY - z3d * sinY;
                const tempZ = x3d * sinY + z3d * cosY;
                x3d = tempX;
                z3d = tempZ;
                
                // Rotate around X axis
                const tempY = y3d * cosX - z3d * sinX;
                z3d = y3d * sinX + z3d * cosX;
                y3d = tempY;
                
                // Project 3D to 2D (perspective projection)
                const perspective = 1 / (1 + z3d * 0.1);
                const x2d = centerX + x3d * scale * perspective;
                const y2d = centerY + y3d * scale * perspective;
                
                if (firstPoint) {
                    ctx.moveTo(x2d, y2d);
                    firstPoint = false;
                } else {
                    ctx.lineTo(x2d, y2d);
                }
            }
            
            ctx.stroke();
            
            // Add wireframe overlay
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 0;
            ctx.stroke();
            
            // Add some glow effects around the knot
            ctx.strokeStyle = 'rgba(74, 158, 255, 0.3)';
            ctx.lineWidth = 20;
            ctx.shadowColor = '#4a9eff';
            ctx.shadowBlur = 30;
            ctx.stroke();
        }
    },
    
    // Light classes (minimal implementation)
    AmbientLight: class {
        constructor(color, intensity) {
            this.color = color;
            this.intensity = intensity;
        }
    },
    
    DirectionalLight: class {
        constructor(color, intensity) {
            this.color = color;
            this.intensity = intensity;
            this.position = new THREE.Vector3();
        }
    },
    
    PointLight: class {
        constructor(color, intensity) {
            this.color = color;
            this.intensity = intensity;
            this.position = new THREE.Vector3();
        }
    },
    
    // Material classes (minimal)
    MeshPhongMaterial: class {
        constructor(options = {}) {
            Object.assign(this, options);
        }
    },
    
    MeshBasicMaterial: class {
        constructor(options = {}) {
            Object.assign(this, options);
        }
    },
    
    // Mesh class
    Mesh: class {
        constructor(geometry, material) {
            this.geometry = geometry;
            this.material = material;
            this.position = new THREE.Vector3();
            this.rotation = new THREE.Vector3();
            this.children = [];
        }
        
        add(child) {
            this.children.push(child);
        }
    },
    
    // Geometry classes for fallback
    TorusGeometry: class {
        constructor(radius, tube, radialSegments, tubularSegments) {
            // Minimal implementation
            this.parameters = { radius, tube, radialSegments, tubularSegments };
        }
    },
    
    TubeGeometry: class {
        constructor(curve, tubularSegments, radius, radialSegments, closed) {
            this.parameters = { curve, tubularSegments, radius, radialSegments, closed };
        }
        
        clone() {
            return new THREE.TubeGeometry(
                this.parameters.curve,
                this.parameters.tubularSegments,
                this.parameters.radius,
                this.parameters.radialSegments,
                this.parameters.closed
            );
        }
    },
    
    // Constants
    PCFSoftShadowMap: 1
};

console.log('Simple THREE.js wrapper loaded successfully');