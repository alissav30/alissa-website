import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function webglAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  }
  
  if (webglAvailable()) {
    const scene = new THREE.Scene(); // container
  
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
    let renderer;
  
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
      });
  
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.position.setZ(30);
      camera.position.setX(-10);
    } catch (e) {
      console.error('WebGL context creation failed:', e);
      document.getElementById('webgl-warning').style.display = 'block';
    }

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

const paperTexture = new THREE.TextureLoader().load('/assets/skyline-13.jpg');
scene.background = paperTexture;

const skyscraperTextures = [
    new THREE.TextureLoader().load('/assets/skyscraper-texture-new-8.jpg'),
    new THREE.TextureLoader().load('/assets/skyscraper-texture-new-5.jpg'),
    new THREE.TextureLoader().load('/assets/skyscraper-texture-3.jpeg'),
    new THREE.TextureLoader().load('/assets/skyscraper-texture-4.jpg'),
]


const videoFiles = [
    '/assets/billboard-gif-1.mp4',
    '/assets/billboard-gif-2.mp4',
    '/assets/billboard-gif-3.mp4',
    '/assets/billboard-gif-4.mp4',
    '/assets/billboard-gif-5.mp4',
    '/assets/billboard-gif-6.mp4',
    '/assets/billboard-gif-7.mp4',
    '/assets/billboard-gif-8.mp4',
    '/assets/billboard-gif-9.mp4',
    '/assets/billboard-gif-10.mp4',
    '/assets/billboard-gif-11.mp4'
];

const billboardTextures = videoFiles.map(videoFile => {
    const video = document.createElement('video');
    video.src = videoFile;
    video.loop = true;
    video.muted = true;
    video.play();
    return new THREE.VideoTexture(video);
});

const skyscrapers = [];

function addSkyscraper(x, z) {
    const skyscraperHeight = Math.random() * 23 + 20;
    const skyscraperGeometry = new THREE.BoxGeometry(9, skyscraperHeight, 5);
    const randomSkyscraperTexture = skyscraperTextures[Math.floor(Math.random() * skyscraperTextures.length)];
    const skyscraperMaterial = new THREE.MeshStandardMaterial({ map: randomSkyscraperTexture });
    const skyscraper = new THREE.Mesh(skyscraperGeometry, skyscraperMaterial);
    skyscraper.position.set(x, skyscraperHeight / 2 - 54, z); // Adjust position based on height
    scene.add(skyscraper);

    // Billboard
    const billboardGeometry = new THREE.PlaneGeometry(12, 8);
    const randomTexture = billboardTextures[Math.floor(Math.random() * billboardTextures.length)];
    const billboardMaterial = new THREE.MeshStandardMaterial({ map: randomTexture, transparent: true });
    const billboard = new THREE.Mesh(billboardGeometry, billboardMaterial);
    billboard.position.set(0, skyscraperHeight / 2 - 1, 3); // Position slightly in front of the skyscraper
    skyscraper.add(billboard);

    // Neon Edges
    const edges = new THREE.EdgesGeometry(skyscraperGeometry);
    const neonMaterial = new THREE.LineBasicMaterial({ color: 0xe8a0be, linewidth: 10 });
    const neonEdges = new THREE.LineSegments(edges, neonMaterial);
    skyscraper.add(neonEdges);

    skyscrapers.push(skyscraper); // Add the skyscraper to the array

    return billboard;
}

// Add multiple skyscrapers
const billboards = [];
for (let i = 0; i < 25; i++) {
    const x = Math.random() * 260 - 125;
    const z = Math.random() * 140 - 85;
    const billboard = addSkyscraper(x, z);
    billboards.push(billboard);
}

// Load and position Alissa's picture
const alissaTexture = new THREE.TextureLoader().load('/assets/alissa-pic-10.jpg');
const alissaBillboardGeometry = new THREE.BoxGeometry(21.2, 21.2, 21.2);
const alissaBillboardMaterial = new THREE.MeshStandardMaterial({ map: alissaTexture});
const alissaBillboard = new THREE.Mesh(alissaBillboardGeometry, alissaBillboardMaterial);
//alissaBillboard.position.set(10.5, 2.1, 8);
//alissaBillboard.rotation.set(0.38, -0.5, -0.12);

// updating position & rotation so the billboard is centered and facing the viewer
alissaBillboard.position.set(9.5, -0.2, 8);
alissaBillboard.rotation.set(0.22, -0.36, 0.06);
scene.add(alissaBillboard);

// Create neon edge
const edges = new THREE.EdgesGeometry(alissaBillboardGeometry);
const neonMaterial = new THREE.LineBasicMaterial({ color: 0xe8a0be, linewidth: 5 });
const neonEdges = new THREE.LineSegments(edges, neonMaterial);
alissaBillboard.add(neonEdges);

// Save the initial position and rotation of the Alissa billboard
const initialPosition = alissaBillboard.position.clone();
const initialRotation = alissaBillboard.rotation.clone();

// Add a RectAreaLight to illuminate the Alissa billboard
const rectLight = new THREE.RectAreaLight(0xffffff, 0.6, 70, 70); // Color, intensity, width, height
rectLight.position.set(9.5, 20, 28); // Position the light
//rectLight.position.set(9.5, 5, 34);
rectLight.lookAt(alissaBillboard.position); // Point the light at the Alissa billboard

// Add the RectAreaLight to the scene
scene.add(rectLight);

const gridTexture = new THREE.TextureLoader().load('/assets/neon-grid-texture-1.jpg');
const gridMaterial = new THREE.MeshBasicMaterial({ map: gridTexture, side: THREE.DoubleSide, transparent: true, opacity: 0.2 });
const gridGeometry = new THREE.PlaneGeometry(650, 280);
const gridPlane = new THREE.Mesh(gridGeometry, gridMaterial);
gridPlane.rotation.x = - Math.PI / 2;
gridPlane.rotation.y = -0.08;
gridPlane.position.y = -50;
scene.add(gridPlane);

// Particle system
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 70000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 500;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    transparent: true,
    opacity: 0.7,
    color: 0xffffff
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);


// Car geometry and material for moving traffic
const loader = new GLTFLoader();
const rocket = [];

function loadCarModel() {
    return new Promise((resolve, reject) => {
        loader.load(
            '/assets/new_car_attempt_1.glb', // Replace with the path to your car model
            (gltf) => {
                resolve(gltf.scene);
            },
            undefined,
            (error) => {
                reject(error);
            }
        );
    });
}

async function addCar(x, y, z) {
    try {
        const car = await loadCarModel();
        car.position.set(x, y, z);
        car.scale.set(0.005, 0.005, 0.005); // Scale the car model appropriately
        car.rotation.set(-1, 0.5, 3); // Scale the car model appropriately
        scene.add(car);
        rocket.push(car);
    } catch (error) {
        console.error('Error loading car model:', error);
    }
}

addCar(-40, -10, -30);

const carPointLight = new THREE.PointLight(0xffffff);
carPointLight.position.set(30, -20, -20);

// Function to animate the rocket
let isRocketFlying = true; // State variable to track if the rocket is flying
let rocketPauseEndTime = null; // Variable to track when the pause should end
let rocketAngle = 0;
let hasPaused = false; // Flag to check if the rocket has already paused in the current rotation

function animateRocket() {
    if (rocketPauseEndTime && Date.now() < rocketPauseEndTime) {
        return; // Skip animation if the rocket is paused
    }

    if (Date.now() >= rocketPauseEndTime) {
        isRocketFlying = true; // Resume flying after the pause
    }

    if (isRocketFlying) {
        const radius = 90;
        const speed = 0.0295;
        rocketAngle += speed;

        rocket.forEach(car => {
            car.position.x = radius * Math.cos(rocketAngle);
            car.position.z = -2 * radius * Math.sin(rocketAngle);
            car.position.y = 30 + 12 * 4.4 * Math.sin(rocketAngle);

            // Check if the rocket has crossed the threshold and hasn't paused yet
            if (car.position.z > 100 && !hasPaused) {
                isRocketFlying = false; // Stop flying if off screen
                rocketPauseEndTime = Date.now() + 3000; // Set pause end time to 3 seconds from now
                hasPaused = true; // Set the flag to true to prevent multiple pauses
            }

            // Reset the flag after completing a full cycle
            if (rocketAngle >= 2 * Math.PI) {
                rocketAngle -= 2 * Math.PI;
                hasPaused = false;
            }
        });
    }
}

const cars = []
function loadCar2Model() {
    return new Promise((resolve, reject) => {
        loader.load(
            '/assets/car_example_2.gltf', // Replace with the path to your car model
            (gltf) => {
                resolve(gltf.scene);
            },
            undefined,
            (error) => {
                reject(error);
            }
        );
    });
}

async function addCar2(x, y, z) {
    try {
        const car = await loadCar2Model();
        car.position.set(x, y, z);
        car.scale.set(0.32, 0.32, 0.32); // Scale the car model appropriately
        //car.rotation.set(0, 1.5, 0); // Scale the car model appropriately
        car.rotation.set(0.2, 1.5, 0.3); // Scale the car model appropriately
        scene.add(car);
        cars.push(car)
    } catch (error) {
        console.error('Error loading car model:', error);
    }
}

//addCar2(-40, -24, 50);
addCar2(-180, 59, -200);

function moveCarOnScroll() {
    const t = document.body.getBoundingClientRect().top;
    const car = cars[0];
    if (car) {
        car.position.y = camera.position.y + 64; // Adjust speed and direction as needed
        car.position.x = camera.position.x - 170 + t * -0.081; // Adjust as needed to keep the car in frame on the right side
        car.position.z = camera.position.z - 230 + t * 0.0095; // Adjust as needed to keep the car in frame
    }
}

// Function to change the billboard texture
function changeBillboardTexture() {
    billboards.forEach(billboard => {
        billboard.traverse(child => {
            if (child.isMesh && child.material.map) {
                child.material.map = billboardTextures[Math.floor(Math.random() * billboardTextures.length)];
                child.material.needsUpdate = true;
            }
        });
    });
}

// Change billboard texture every 5 seconds
setInterval(changeBillboardTexture, 5000);

let prevScrollY = window.scrollY;

let isAtBottom = false;
let isAtTop = true;
let isInitialPosition = true;
let initialPositionTimeout;
let rotationDelayTimeout;
let hasScrolled = false; // Flag to track if scroll event was initiated


    function isPageAtBottom() {
        const atBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 1); // Using a small offset to avoid floating point issues
        console.log('Window innerHeight:', window.innerHeight);
        console.log('Window scrollY:', window.scrollY);
        console.log('Document documentElement scrollHeight:', document.documentElement.scrollHeight);
        console.log('Is at bottom:', atBottom);
        return atBottom;
    }

    function isPageAtTop() {
        const atTop = window.scrollY === 0;
        console.log('Is at top:', atTop);
        return atTop;
    }

function rotateBillboardOnScroll(deltaY) {
    if (!isInitialPosition) {  
        console.log("billboard rotate on scroll");
        alissaBillboard.rotation.x -= 0.042;
        alissaBillboard.rotation.y += 0.035;
        alissaBillboard.rotation.z += 0.035;
    }
}

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    const scrollDelta = window.scrollY - prevScrollY;

    isAtBottom = isPageAtBottom();
    isAtTop = isPageAtTop();

    if (!isAtTop && !hasScrolled) {
        console.log('called rotation delay');
        hasScrolled = true; // Set the scroll flag
        clearTimeout(rotationDelayTimeout); // Clear any existing timeout
        rotationDelayTimeout = setTimeout(() => {
            isInitialPosition = false; // Allow rotation to start after delay
        }, 3000); // Set delay to 2 seconds (2000 milliseconds)
    }

    // Scroll-triggered rotation
    if (!isInitialPosition) {  
        alissaBillboard.rotation.x += 0.01;
        alissaBillboard.rotation.y += 0.007;
        alissaBillboard.rotation.z += 0.008;
    }

    
    alissaBillboard.position.z -= scrollDelta * 0.004;
    //alissaBillboard.position.y += scrollDelta * 0.0016;
    alissaBillboard.position.y += scrollDelta * 0.0012;

    alissaBillboard.position.x += scrollDelta * 0.0088;


    camera.position.z = 30 + t * -0.0095;
    camera.position.x = -10 + t * -0.0005;
    camera.position.y = -5 + t * -0.00025;
    
    //skyscrapers.forEach(skyscraper => {
    //    skyscraper.position.y = skyscraper.position.y + t * 0.00002; // Adjust the multiplier as needed
    //    skyscraper.position.z = skyscraper.position.z + t * 0.00002; // Adjust the multiplier as needed
    //});
    skyscrapers.forEach(skyscraper => {
        skyscraper.position.y += scrollDelta * -0.001; // Adjust the multiplier as needed
        skyscraper.position.z += scrollDelta * -0.0018; // Adjust the multiplier as needed
    });

    prevScrollY = window.scrollY;

    // Reset the position and rotation of alissa billboard when at the top
    if (isAtTop) {
        clearTimeout(initialPositionTimeout);
        clearTimeout(rotationDelayTimeout); // Clear rotation delay timeout when at the top
        isInitialPosition = true;
        hasScrolled = false; // Reset the scroll flag
        alissaBillboard.position.copy(initialPosition);
        alissaBillboard.rotation.copy(initialRotation);

        initialPositionTimeout = setTimeout(() => {
            isInitialPosition = false; // Allow rotation to start after delay
        }, 3000); // Delay rotation for 3 seconds
    }
    
    moveCarOnScroll();
}
document.body.onscroll = moveCamera

moveCamera(); // Initial call to moveCamera after the document is fully loaded

function handleWheel(event) {
    rotateBillboardOnScroll(event.deltaY);
}

document.body.onwheel = handleWheel;

function animate() {
    requestAnimationFrame(animate);

    animateRocket(); 

    if (isAtBottom) {
        // Continuous rotation at the bottom
        alissaBillboard.rotation.x -= 0.027;
        alissaBillboard.rotation.y += 0.027;
        alissaBillboard.rotation.z += 0.027;
    }

    controls.update();

    renderer.render(scene, camera);
}

animate()


window.openModal = function(id) {
    document.getElementById(id).style.display = 'block';
}

window.closeModal = function(id) {
    document.getElementById(id).style.display = 'none';
}
} else {
    document.getElementById('webgl-warning').style.display = 'block';
  }

