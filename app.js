// Variables for setup

let container;
let camera;
let renderer;
let scene;
let house;

function init() {
    container = document.querySelector('.scene');

    //Create scene
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1000;

    //Camera setup
    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(0, 45, 500);

    const ambient = new THREE.AmbientLight(0xcccccc, 0.5);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(100, 100, 100);
    scene.add(light);
    //Renderer
    renderer = new THREE.WebGLRenderer({antialias:true, alpha: true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    container.appendChild(renderer.domElement); // add to html

    //Load Model
    let loader = new THREE.GLTFLoader();

    loader.load(
        // resource URL
        './3d/scene.gltf', 
        // Called when resources is loaded
        function(gltf) {
            scene.add(gltf.scene);
            house = gltf.scene.children[0];
            renderer.render(scene, camera);
        }
        
    )
}

function animate() {
    requestAnimationFrame(animate);
    house.rotation.z += 0.009;
    renderer.render(scene, camera);
}

init()
animate()