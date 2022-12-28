import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders'

/* GAME */
export default class Renderer {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    

    createScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
        this._canvas = canvas;

        this._engine = engine;

        
        const scene = new BABYLON.Scene(engine);
        this._scene = scene;
        scene.onPointerDown = (evt) => {
          if (evt.button === 0) canvas.requestPointerLock()
        }
      
        
        
        //  CAMERA
        const camera = new BABYLON.UniversalCamera("camera1", new BABYLON.Vector3(0, 10, 0), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, false);
        camera.keysUp.push(87);
        camera.keysDown.push(83);
        camera.keysLeft.push(65);
        camera.keysRight.push(68);
        camera.angularSensibility = 8000;
        camera.speed = 1;
        camera.applyGravity = true;
        camera.checkCollisions = true;
        camera.ellipsoid = new BABYLON.Vector3(1, 4, 1);
        camera.minZ = 0.3;

     
        
        //  AMBIENT FX
        const light = new BABYLON.PointLight('light1', new BABYLON.Vector3(5, 20, 0), scene)
        light.intensity = 3;
        
        scene.clearColor = new BABYLON.Color4(0, 0, 10);
        scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
        
        //  MUSIC
        setTimeout(() => {
          let music = document.getElementById('myAudio') as HTMLAudioElement
          music.loop = true
          music.autoplay = true
          music.load()
          
        }, 3000);
      
        
        //  MESHES
        async function environment(name: string, scene: BABYLON.Scene): Promise<void> {
          const maze = await BABYLON.SceneLoader.ImportMeshAsync('', './assets/models/', "uploads_files_197569_Maze.obj", scene).then((world) => {
            console.log('world: ', world)
            
            const ground = BABYLON.Mesh.CreateGround("ground1", 300, 300, 2, scene);

            
            //  TEXTURES & MESH PROPS
            const mazeMaterial = new BABYLON.StandardMaterial('mazeMaterial', scene);
            mazeMaterial.diffuseTexture = new BABYLON.Texture("./assets/textures/tiles.jpg", scene);
            // This is hardcoded, check the console log and update the array figures for runtime
             world.meshes[1].material = mazeMaterial
             world.meshes[1].checkCollisions = true 

             const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
             groundMaterial.diffuseTexture = new BABYLON.Texture("./assets/textures/bricks.jpg", scene);
             
             ground.position.y = 1.5
             ground.checkCollisions = true
             ground.material = groundMaterial

          })
          
      } ;
      environment('MazeV1', scene);

      //  TEXT
      setTimeout(() => {
        const header = document.getElementById('header') as HTMLParagraphElement;
        header.innerHTML = "Merry christmas mum!"
        
      }, 3000);
      
    }

    /* RENDER LOOP */
    initialize(canvas: HTMLCanvasElement) {
        const engine = new BABYLON.Engine(canvas, true);
  
        this.createScene(canvas, engine);
    

        engine.runRenderLoop(() => {
            this._scene.render();
        });

        window.addEventListener('resize', function () {
            engine.resize();
        });
    }
}

const renderer = new Renderer();
renderer.initialize(document.getElementById('render-canvas') as HTMLCanvasElement);