import * as THREE from "three";

const CLEAR_COLOR: THREE.ColorRepresentation = 0x191917;

const CAMERA_MOUSE_DELTA: number = 0.05;
const CAMERA_POSITION: THREE.Vector3 = new THREE.Vector3(0.0, 0.0, 5.0);

const PARTICLE_COUNT: number = 500;
const PARTICLE_SIZE: number = 3.0;
const PARTICLE_TIME: number = 20.0;
const PARTICLE_COLOR: THREE.ColorRepresentation = 0xb28039;

const FOG_DEPTH: number = 3.0;

const START_X_MIN: number = -20.0;
const START_X_MAX: number =  20.0;
const START_Y_MIN: number = -30.0;
const START_Y_MAX: number = -10.0;
const START_Z_MIN: number = -5.0;
const START_Z_MAX: number =  0.0;

const END_X_MIN: number = -20.0;
const END_X_MAX: number =  20.0;
const END_Y_MIN: number =  10.0;
const END_Y_MAX: number =  30.0;
const END_Z_MIN: number = -5.0;
const END_Z_MAX: number =  0.0;

class HomePageCanvas extends HTMLElement {
    private scene: THREE.Scene = new THREE.Scene();
    private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
        70.0, // FOV
        1.0, // Aspect (Set Dynamically)
        0.1, // Near Plane
        100.0, // Far Plane
    );

    private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });

    private last_frame_time: number = 0.0;
    private particle_uniforms: { [uniform: string]: THREE.IUniform<any>; } = {
        u_time: { value: 0.0 }
    };

    constructor() {
        super();

        const start_positions: Float32Array = new Float32Array(PARTICLE_COUNT * 3);
        const end_positions: Float32Array = new Float32Array(PARTICLE_COUNT * 3);
        const life_offset: Float32Array = new Float32Array(PARTICLE_COUNT);
        const point_size: Float32Array = new Float32Array(PARTICLE_COUNT);

        for (let idx = 0; idx < PARTICLE_COUNT; ++idx) {
            const vector_index: number = idx * 3;

            start_positions[vector_index    ] = Math.random() * (START_X_MAX - START_X_MIN) + START_X_MIN;
            start_positions[vector_index + 1] = Math.random() * (START_Y_MAX - START_Y_MIN) + START_Y_MIN;
            start_positions[vector_index + 2] = Math.random() * (START_Z_MAX - START_Z_MIN) + START_Z_MIN;

            end_positions[vector_index    ] = Math.random() * (END_X_MAX - END_X_MIN) + END_X_MIN;
            end_positions[vector_index + 1] = Math.random() * (END_Y_MAX - END_Y_MIN) + END_Y_MIN;
            end_positions[vector_index + 2] = Math.random() * (END_Z_MAX - END_Z_MIN) + END_Z_MIN;

            life_offset[idx] = Math.random() * PARTICLE_TIME;
            point_size[idx] = Math.random() * PARTICLE_SIZE + 0.1;
        }

        const particle_geometry: THREE.BufferGeometry = new THREE.BufferGeometry();
        particle_geometry.setAttribute("position", new THREE.BufferAttribute(start_positions, 3));
        particle_geometry.setAttribute("start_pos", new THREE.BufferAttribute(start_positions, 3));
        particle_geometry.setAttribute("life_offset", new THREE.BufferAttribute(life_offset, 1));
        particle_geometry.setAttribute("point_size", new THREE.BufferAttribute(point_size, 1));
        particle_geometry.setAttribute("end_pos", new THREE.BufferAttribute(end_positions, 3));
        particle_geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1.0);

        const particle_color: THREE.Color = new THREE.Color(PARTICLE_COLOR);
        const fog_color: THREE.Color = new THREE.Color(CLEAR_COLOR);

        const particle_material: THREE.ShaderMaterial = new THREE.ShaderMaterial({
            transparent: true,
            uniforms: {
                u_time: { value: 0.0 }
            },
            vertexShader: `
                #define PERIOD ${PARTICLE_TIME.toFixed(4)}
                #define FOG_DEPTH ${FOG_DEPTH.toFixed(4)}

                uniform float u_time;

                attribute vec3 start_pos;
                attribute vec3 end_pos;
                attribute float life_offset;
                attribute float point_size;

                varying float v_fog_depth;

                void main() {
                    float t = mod(u_time + life_offset, PERIOD) / PERIOD;

                    vec3 pos = mix(start_pos, end_pos, t);
                    vec4 model_pos = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * model_pos;
                    gl_PointSize = point_size;

                    v_fog_depth = 1.0 - abs(model_pos.z / FOG_DEPTH);
                }
            `,
            fragmentShader: `
                #define COLOR_R ${particle_color.r.toFixed(4)}
                #define COLOR_G ${particle_color.g.toFixed(4)}
                #define COLOR_B ${particle_color.b.toFixed(4)}

                #define FOG_R ${fog_color.r.toFixed(4)}
                #define FOG_G ${fog_color.g.toFixed(4)}
                #define FOG_B ${fog_color.b.toFixed(4)}

                varying float v_fog_depth;

                void main() {
                    vec4 point_color = vec4(COLOR_R, COLOR_G, COLOR_B, 1.0);
                    vec3 fog_color = vec3(FOG_R, FOG_G, FOG_B);

                    point_color.rgb = mix(point_color.rgb, fog_color, v_fog_depth);

                    gl_FragColor = point_color;
                }
            `
        });

        this.particle_uniforms = particle_material.uniforms;

        const particles: THREE.Points = new THREE.Points(particle_geometry, particle_material);

        this.scene.add(particles);
        
        this.camera.position.copy(CAMERA_POSITION);

        this.renderer.setClearColor(CLEAR_COLOR);

        this.last_frame_time = Date.now() / 1000.0;
        this.renderer.setAnimationLoop(this.onRender.bind(this));
        this.appendChild(this.renderer.domElement);

        this.onResize();
        window.addEventListener("resize", this.onResize.bind(this));
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
    }

    private onMouseMove(mouse_event: MouseEvent): void {
        const x_percent: number = 0.5 - (mouse_event.clientX / window.innerWidth);
        const y_percent: number = (mouse_event.clientY / window.innerHeight) - 0.5;

        const damped_x: number = Math.sin(Math.PI * x_percent);
        const damped_y: number = Math.sin(Math.PI * y_percent);

        this.camera.position.x = CAMERA_POSITION.x + CAMERA_MOUSE_DELTA * damped_x;
        this.camera.position.y = CAMERA_POSITION.y + CAMERA_MOUSE_DELTA * damped_y;
    }

    private onResize(): void {
        const width: number = this.clientWidth;
        const height: number = this.clientHeight;

        if (width === 0 || height === 0) {
            return;
        }

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    private onRender(): void {
        const cur_frame_time: number = Date.now() / 1000.0;
        const delta_time: number = cur_frame_time - this.last_frame_time;
        this.last_frame_time = cur_frame_time;

        this.particle_uniforms.u_time.value += delta_time;

        this.renderer.render(this.scene, this.camera);
    }
};

customElements.define("home-page-canvas", HomePageCanvas);