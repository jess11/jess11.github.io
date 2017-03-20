window.addEventListener('load', init, false);

var scene,
		camera, controls, fieldOfView, aspectRatio, nearPlane, farPlane, HEIGHT, WIDTH,
		renderer, container;

var step = 0;
var speed = 20;
function init() {

	//on mouse scroll down speed up particles
	$(window).bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta < 0) {
				speed = 300;
				setTimeout(function(){ speed=20 }, 1200);
    }
	});

	createScene();
	createAsteroid();
	// createChar();
  createParticles();
	createLights();

	loop();

}

function createScene() {
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0x061333, 100, 950); //color,near,far

	camera = new THREE.PerspectiveCamera(60,WIDTH / HEIGHT,1,10000);//field of view,ratio,near,far

  camera.position.x = 0;
  camera.position.z = 300;
  camera.position.y = 100;


  renderer = new THREE.WebGLRenderer({
    alpha: true, //transparent background
    antialias: true //makes lines smooth
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

	for (var i=0; i<l; i++){

		var v = geom.vertices[i];

    ang = Math.random()*Math.PI*2;
    amp =  2 + Math.random()*15;

    v.x = v.x + Math.sin(ang)*amp;
    v.y = v.y + Math.cos(ang)*amp;


	};

	// create the material
	var mat = new THREE.MeshPhongMaterial({
		color:0xaaaaff,
		transparent:true,
		opacity:0.5,
		shading:THREE.FlatShading,
	});

	this.mesh = new THREE.Mesh(geom, mat);
	this.mesh.receiveShadow = true;
}

var asteroid;

function createAsteroid(){
	asteroid = new Asteroid();
	asteroid.mesh.position.x = 0;
	asteroid.mesh.position.y = -350;
  asteroid.mesh.position.z = 80;
	scene.add(asteroid.mesh);
}

Char = function(){

  var geom = new THREE.PlaneGeometry(95,110);

  // create the material
  var mat = new THREE.MeshBasicMaterial({
    // color:Colors.blue,
    transparent:true,
    shading:THREE.FlatShading,
    map: THREE.ImageUtils.loadTexture("../images/girl.png"),
    side: THREE.DoubleSide
  });

  this.mesh = new THREE.Mesh(geom, mat);
}

var char;

function createChar(){
  char = new Char();
  char.mesh.position.y = 30;
  char.mesh.position.z = 200;
	char.mesh.position.x = 0;

  scene.add(char.mesh);
}

function loop(){
  step += 0.01;
	// asteroid.mesh.position.z = 100 + (100 * Math.sin(step));
	// asteroid.mesh.rotation.y +=  Math.PI/180;
	// char.mesh.position.y = 100 + (40 * Math.sin(step));
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
            {color: 0xffc0cb,
             size: 2.4,
             map: THREE.ImageUtils.loadTexture("../images/petal.png"),
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
            vert.z = Math.random() * 400 -400;
        }
        vert.z = vert.z + (speed * 0.02);

    }
    particleSystem.geometry.verticesNeedUpdate = true;

}
