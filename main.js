import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene(); // container

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(-25);
camera.position.setX(-3);

//renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const torusTexture = new THREE.TextureLoader().load('abstract-bg.jpg');

const material = new THREE.MeshStandardMaterial({ map: torusTexture });
const torus = new THREE.Mesh(geometry, material);
torus.position.z = -2;
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const capsules = [];

function addCapsule1() {
    //const geometry = new THREE.SphereGeometry(0.25);
    //const geometry = new THREE.OctahedronGeometry(1.5);


    const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8 ); 

    const textures = [
        'ethiopian-flag.jpg',
        'capsule-texture-3.jpeg',
        'capsule-pride.jpeg'
    ];
    
    const randomTexturePath = textures[Math.floor(Math.random() * textures.length)];
    const capsuleTexture = new THREE.TextureLoader().load(randomTexturePath);

    //const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const material = new THREE.MeshBasicMaterial( { map: capsuleTexture })
    const capsule = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(120))

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(x, y, z);
    scene.add(pointLight);

    capsule.position.set(x, y, z);
    scene.add(capsule);

    capsules.push(capsule); // Add the capsule to the array
}

Array(100).fill().forEach(addCapsule1);

const paperTexture = new THREE.TextureLoader().load('paper-texture.jpg');
scene.background = paperTexture;

const alissaTexture = new THREE.TextureLoader().load('alissa-pic.jpg');
const alissa = new THREE.Mesh(
    new THREE.BoxGeometry(4, 4, 4),
    new THREE.MeshBasicMaterial( { map: alissaTexture })
)
scene.add(alissa);

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

alissa.position.z = -6;
alissa.position.x = 1;

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    //moon.rotation.x += 0.05;
    //moon.rotation.y += 0.075;
    //moon.rotation.z += 0.05;

    alissa.rotation.x -= 0.009;
    alissa.rotation.y -= 0.05;
    alissa.rotation.z += 0.009;

    camera.position.z = t * -0.001;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;


}
document.body.onscroll = moveCamera
moveCamera()

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.02;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.02;

    capsules.forEach(capsule => {
        capsule.rotation.x += 0.01;
        capsule.rotation.y += 0.01;
        capsule.rotation.z += 0.01;
    });

    controls.update();

    renderer.render(scene, camera);
}

animate()