import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry( 1, 10, 10 );
const material = new THREE.MeshStandardMaterial( {color: 0x00aed4 } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

const pivot = new THREE.Object3D();
scene.add(pivot);
const pivot2 = new THREE.Object3D();
scene.add(pivot2);
const pivot3 = new THREE.Object3D();
scene.add(pivot3);
const pivot4 = new THREE.Object3D();
scene.add(pivot4);

const loader = new OBJLoader();
loader.load(
  '/Rocket.obj',
  function (object) {

    object.position.set(3, 0, 0);
    object.scale.set(0.3, 0.3, 0.3);
    scene.add(object);
    pivot.add(object);

  }, undefined, function ( error ) {

	console.error( error );
  });

const loader2 = new OBJLoader();
loader2.load(
  '/TORUS.obj',
  function (object) {
  
    object.position.set(0, 0, 0);
    object.scale.set(2, 0.1, 2);
    object.rotation.set(0, 5.8, 3.4);
    scene.add(object);
    pivot3.add(object);
  
  }, undefined, function ( error ) {
  
  console.error( error );
  });

const orbitSphereGeometry = new THREE.SphereGeometry(0.2, 8, 8);
const orbitSphereMaterial = new THREE.MeshStandardMaterial({ color: 0xC0C0C0 });
const orbitSphere = new THREE.Mesh(orbitSphereGeometry, orbitSphereMaterial);
orbitSphere.position.set(-1, -2.5, 0); 
pivot2.add(orbitSphere);

const orbit2SphereGeometry = new THREE.SphereGeometry(0.25, 8, 8);
const orbit2SphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffC000 });
const orbit2Sphere = new THREE.Mesh(orbit2SphereGeometry, orbit2SphereMaterial);
orbit2Sphere.position.set(2, 2.5, 0); 
pivot4.add(orbit2Sphere);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
scene.add(directionalLight);

camera.position.z = 5;

function animate() {
   
    pivot.rotation.z += 0.02;
    pivot2.rotation.z += 0.01;
    pivot3.rotation.z += 0.005;
    pivot4.rotation.z += 0.015;


	sphere.rotation.z += 0.01;


	renderer.render( scene, camera );

}