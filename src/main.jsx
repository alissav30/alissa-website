import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene(); // container
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const canvas = document.querySelector('#bg');
const webglWarning = document.getElementById('webgl-warning');

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

//const renderer = new THREE.WebGLRenderer({
//    canvas: document.querySelector('#bg'),
//})

//renderer.setPixelRatio(window.devicePixelRatio);
//renderer.setSize(window.innerWidth, window.innerHeight);
//camera.position.setZ(30);
//camera.position.setX(-10);



//renderer.render(scene, camera);

//const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//const torusTexture = new THREE.TextureLoader().load('abstract-bg.jpg');

//const material = new THREE.MeshStandardMaterial({ map: torusTexture });
//const torus = new THREE.Mesh(geometry, material);
//torus.position.z = -2;
//scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

//const capsules = [];

//function addCapsule1() {
//    //const geometry = new THREE.SphereGeometry(0.25);
//    //const geometry = new THREE.OctahedronGeometry(1.5);


//    const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 ); 

//    const textures = [
//        'ethiopian-flag.jpg',
//        'capsule-texture-3.jpeg',
//        'capsule-pride.jpeg'
//    ];
    
//    const randomTexturePath = textures[Math.floor(Math.random() * textures.length)];
//    const capsuleTexture = new THREE.TextureLoader().load(randomTexturePath);

//    //const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
//    const material = new THREE.MeshBasicMaterial( { map: capsuleTexture })
//    const capsule = new THREE.Mesh(geometry, material);

//    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(120))

//    const pointLight = new THREE.PointLight(0xffffff);
//    pointLight.position.set(x, y, z);
//    scene.add(pointLight);

//    capsule.position.set(x, y, z);
//    scene.add(capsule);

//    capsules.push(capsule); // Add the capsule to the array
//}

//Array(100).fill().forEach(addCapsule1);

const paperTexture = new THREE.TextureLoader().load('/assets/skyline-13.jpg');
scene.background = paperTexture;

// Load skyscraper texture
//const skyscraperTexture = new THREE.TextureLoader().load('skyscraper-texture-new-5.jpg');

const skyscraperTextures = [
    new THREE.TextureLoader().load('/assets/skyscraper-texture-new-8.jpg'),
    new THREE.TextureLoader().load('/assets/skyscraper-texture-new-5.jpg'),
    new THREE.TextureLoader().load('/assets/skyscraper-texture-3.jpeg'),
    new THREE.TextureLoader().load('/assets/skyscraper-texture-4.jpg'),
]

//const billboardTextures = [
//    new THREE.TextureLoader().load('billboard-gif-1.gif'),
//    new THREE.TextureLoader().load('billboard-gif-2.gif'),
//    new THREE.TextureLoader().load('billboard-gif-3.gif'),
//    new THREE.TextureLoader().load('billboard-gif-4.gif'),
//    new THREE.TextureLoader().load('billboard-gif-5.gif'),
//];

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
    const skyscraperGeometry = new THREE.BoxGeometry(7, skyscraperHeight, 5);
    const randomSkyscraperTexture = skyscraperTextures[Math.floor(Math.random() * skyscraperTextures.length)];
    const skyscraperMaterial = new THREE.MeshStandardMaterial({ map: randomSkyscraperTexture });
    const skyscraper = new THREE.Mesh(skyscraperGeometry, skyscraperMaterial);
    skyscraper.position.set(x, skyscraperHeight / 2 - 45, z); // Adjust position based on height
    scene.add(skyscraper);

    // Billboard
    const billboardGeometry = new THREE.PlaneGeometry(9, 6.5);
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
for (let i = 0; i < 60; i++) {
    const x = Math.random() * 240 - 115;
    const z = Math.random() * 140 - 85;
    const billboard = addSkyscraper(x, z);
    billboards.push(billboard);
}

//const alissaTexture = new THREE.TextureLoader().load('alissa-pic.jpg');
//const alissa = new THREE.Mesh(
//    new THREE.BoxGeometry(4, 4, 4),
//    new THREE.MeshBasicMaterial( { map: alissaTexture })
//)
//scene.add(alissa);

// Load and position Alissa's picture

const alissaTexture = new THREE.TextureLoader().load('/assets/alissa-pic-10.png');
const alissaBillboardGeometry = new THREE.BoxGeometry(21, 21, 21);
const alissaBillboardMaterial = new THREE.MeshStandardMaterial({ map: alissaTexture});
const alissaBillboard = new THREE.Mesh(alissaBillboardGeometry, alissaBillboardMaterial);
alissaBillboard.position.set(10.5, 2.5, 8);
alissaBillboard.rotation.set(0.45, -0.5, -0.05);
scene.add(alissaBillboard);

// Create neon edge
const edges = new THREE.EdgesGeometry(alissaBillboardGeometry);
const neonMaterial = new THREE.LineBasicMaterial({ color: 0xe8a0be, linewidth: 5 });
const neonEdges = new THREE.LineSegments(edges, neonMaterial);
alissaBillboard.add(neonEdges);

//// Add a spotlight to illuminate the Alissa billboard
//const spotlight = new THREE.SpotLight(0xffffff, 50); // Color and intensity (brighter light)
//spotlight.position.set(30, 15, 10); // Adjusted position
//spotlight.angle = Math.PI / 3; // Spread angle
//spotlight.penumbra = 0.3; // Softer edges
//spotlight.decay = 2; // Light decay
//spotlight.distance = 200; // Distance the light covers
//spotlight.castShadow = true;

//// Set the spotlight target to the Alissa billboard
//spotlight.target = alissaBillboard;

//// Add the spotlight and its target to the scene
//scene.add(spotlight);
//scene.add(spotlight.target);

// Add a RectAreaLight to illuminate the Alissa billboard
const rectLight = new THREE.RectAreaLight(0xffffff, 0.6, 70, 70); // Color, intensity, width, height
rectLight.position.set(30, 13, 40); // Position the light
rectLight.lookAt(alissaBillboard.position); // Point the light at the Alissa billboard

// Add the RectAreaLight to the scene
scene.add(rectLight);

const gridTexture = new THREE.TextureLoader().load('/assets/neon-grid-texture-1.jpg');
const gridMaterial = new THREE.MeshBasicMaterial({ map: gridTexture, side: THREE.DoubleSide, transparent: true, opacity: 0.2 });
const gridGeometry = new THREE.PlaneGeometry(650, 280);
const gridPlane = new THREE.Mesh(gridGeometry, gridMaterial);
gridPlane.rotation.x = - Math.PI / 2;
gridPlane.rotation.y = -0.07;
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
let rocketAngle = 0;
function animateRocket() {
    const radius = 85;
    const speed = 0.025;
    rocketAngle += speed;
    rocket.forEach(car => {
        car.position.x = radius * Math.cos(rocketAngle);
        car.position.z = -2 * radius * Math.sin(rocketAngle);
        car.position.y = 30 + 12 * Math.sin(rocketAngle * 2); 
        //car.rotation.y = -rocketAngle * 0.01; 
        //car.rotation.z = -rocketAngle * 0.01; 
        //car.rotation.x = -rocketAngle * 0.01; 
    });
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
addCar2(-174, 59, -200);

function moveCarOnScroll() {
    const t = document.body.getBoundingClientRect().top;
    const car = cars[0];
    if (car) {
        car.position.y = camera.position.y + 64; // Adjust speed and direction as needed
        car.position.x = camera.position.x - 164 + t * -0.085; // Adjust as needed to keep the car in frame on the right side
        car.position.z = camera.position.z - 230 + t * 0.0095; // Adjust as needed to keep the car in frame
    }
}

//camera.position.z = 30 + t * -0.0095;
//camera.position.x = -10 + t * -0.0005;
//camera.position.y = -5 + t * -0.00025;


//document.body.onscroll = moveCarOnScroll;


// Add multiple cars
//for (let i = 0; i < 1; i++) {
//    addCar(Math.random() * 50 - 25, -49.5, Math.random() * 50 - 25);
//}

// Function to animate cars
//function animateCars() {
//    cars.forEach(car => {
//        car.position.x += 0.1; // Move car along x-axis
//        if (car.position.x > 50) car.position.x = -50; // Reset position if out of bounds
//    });
//}

//const moonTexture = new THREE.TextureLoader().load('moon.jpg');
//const normalTexture = new THREE.TextureLoader().load('normal.jpg');

//const moon = new THREE.Mesh(
//    new THREE.SphereGeometry(3, 32, 32),
//    new THREE.MeshStandardMaterial({ 
//        map: moonTexture,
//        normalMap: normalTexture
//    })
//)
//moon.position.z = 30;
//moon.position.x = -10;
//scene.add(moon);

//alissa.position.z = -6;
//alissa.position.x = 1;

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
setInterval(changeBillboardTexture, 3000);

let prevScrollY = window.scrollY;

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    const scrollDelta = window.scrollY - prevScrollY;

    //moon.rotation.x += 0.05;
    //moon.rotation.y += 0.075;
    //moon.rotation.z += 0.05;

    alissaBillboard.rotation.x -= 0.017;
    alissaBillboard.rotation.y += 0.037;
    alissaBillboard.rotation.z += 0.017;
    alissaBillboard.position.z -= scrollDelta * 0.004;
    alissaBillboard.position.y += scrollDelta * 0.0018;
    alissaBillboard.position.x += scrollDelta * 0.0082;


    camera.position.z = 30 + t * -0.0095;
    camera.position.x = -10 + t * -0.0005;
    camera.position.y = -5 + t * -0.00025;
    
    //skyscrapers.forEach(skyscraper => {
    //    skyscraper.position.y = skyscraper.position.y + t * 0.00002; // Adjust the multiplier as needed
    //    skyscraper.position.z = skyscraper.position.z + t * 0.00002; // Adjust the multiplier as needed
    //});
    skyscrapers.forEach(skyscraper => {
        skyscraper.position.y += scrollDelta * -0.0025; // Adjust the multiplier as needed
        skyscraper.position.z += scrollDelta * -0.0025; // Adjust the multiplier as needed
    });

    prevScrollY = window.scrollY;
    
    
    moveCarOnScroll();
}
document.body.onscroll = moveCamera
moveCamera()

function animate() {
    requestAnimationFrame(animate);

    //torus.rotation.x += 0.02;
    //torus.rotation.y += 0.005;
    //torus.rotation.z += 0.02;

    //capsules.forEach(capsule => {
    //    capsule.rotation.x += 0.01;
    //    capsule.rotation.y += 0.01;
    //    capsule.rotation.z += 0.01;
    //});

    animateRocket(); // Animate the rocket
    //animateCar()

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

