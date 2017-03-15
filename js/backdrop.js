window.addEventListener('load', init, false);

var Colors = {
	red:0xf25346,
	white:0xd8d0d1,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
  	blue:0xaaaaff,
};

var scene,
		camera, controls, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
		renderer, container;

var Person;
var step =0;

function init() {

	createScene();
	createAsteroid();
  createParticles()
  createRose()
	createLights();

	loop();

}

function createScene() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0x061333, 100, 950);

	camera = new THREE.PerspectiveCamera(60,WIDTH / HEIGHT,1,10000);

  camera.position.x = 0;
  camera.position.z = 300;
  camera.position.y = 100;


  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });


  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  controls = new THREE.OrbitControls( camera, renderer.domElement);

  container = document.getElementById('world');

	container.appendChild(renderer.domElement);
  window.addEventListener('resize', handleWindowResize, false);

}

function handleWindowResize() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

var hemisphereLight, shadowLight;

function createLights() {

	hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)

	shadowLight = new THREE.DirectionalLight(0xffffff, .9);
	shadowLight.position.set(150, 350, 350);
	shadowLight.castShadow = true;
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;

	scene.add(hemisphereLight);
	scene.add(shadowLight);
}

Asteroid = function(){
	var geom = new THREE.SphereGeometry(300,20,20);

	geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

  geom.mergeVertices();

  var l = geom.vertices.length;

	this.waves = [];

	for (var i=0; i<l; i++){

		var v = geom.vertices[i];

    ang = Math.random()*Math.PI*2;
    amp =  2 + Math.random()*15;

    v.x = v.x + Math.cos(ang)*amp;
    v.y = v.y + Math.sin(ang)*amp;


	};

	// create the material
	var mat = new THREE.MeshPhongMaterial({
		color:Colors.blue,
		transparent:true,
		opacity:0.5,
		shading:THREE.FlatShading,
	});

	this.mesh = new THREE.Mesh(geom, mat);
	this.mesh.receiveShadow = true;
}

Rose = function(){

  var geom = new THREE.PlaneGeometry(16,30);

  // create the material
  var mat = new THREE.MeshBasicMaterial({
    // color:Colors.blue,
    transparent:true,
    shading:THREE.FlatShading,
    map: THREE.ImageUtils.loadTexture("../images/rose.png"),
    side: THREE.DoubleSide
  });

  this.mesh = new THREE.Mesh(geom, mat);
  // this.mesh.receiveShadow = true;

  // var roseMaterial = new THREE.PointsMaterial(
  //         {color: 0xdef3a8,
  //          size: 5,
  //          map: THREE.ImageUtils.loadTexture("../images/rose.png"),
  //          blending: THREE.AdditiveBlending,
  //          transparent: true,
  //         });

}



var rose;
var asteroid;

function createAsteroid(){
	asteroid = new Asteroid();
	asteroid.mesh.position.y = -350;
  asteroid.mesh.position.z = 100;
	scene.add(asteroid.mesh);
}

function createRose(){
  rose = new Rose();
  rose.mesh.position.y = -35;
  rose.mesh.position.z = 40;
  scene.add(rose.mesh);
}


function loop(){
  step += 0.01;
  asteroid.mesh.position.y = -350 + (2 * Math.sin(step));
  rose.mesh.position.y = -35 + (2 * Math.sin(step));
  animateParticles();
	renderer.render(scene, camera);
	requestAnimationFrame(loop);
}


function createParticleSystem() {

    var particleCount = 2000;

    var particles = new THREE.Geometry();

    for (var p = 0; p < particleCount; p++) {
        var x = Math.random() * 400 - 200;
        var y = Math.random() * 400 - 200;
        var z = Math.random() * 400 - 200;

        var particle = new THREE.Vector3(x, y, z);
        particles.vertices.push(particle);
    }


    var particleMaterial = new THREE.PointsMaterial(
            {color: 0xdef3a8,
             size: 1,
            //  map: THREE.ImageUtils.loadTexture("../images/star.png"),
             blending: THREE.AdditiveBlending,
             transparent: true,
            });

    particleSystem = new THREE.Points(particles, particleMaterial);
    return particleSystem;
}


function createParticles(){
	particles = new createParticleSystem();
	scene.add(particles);
}

function animateParticles() {
    var verts = particleSystem.geometry.vertices;
    for(var i = 0; i < verts.length; i++) {
        var vert = verts[i];
        if (vert.z > 190) {
            vert.z = Math.random() * 400 - 200;
        }
        vert.z = vert.z + (10 * 0.01);
    }
    particleSystem.geometry.verticesNeedUpdate = true;

}
