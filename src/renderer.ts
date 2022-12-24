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
      
        
        
        //  CAMERA
        const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);

        //  LIGHTS
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        //  AMBIENT FX
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        scene.fogDensity = 0.01;
        scene.fogColor = new BABYLON.Color3(1, 1, 1);
        scene.clearColor = new BABYLON.Color4(0, 0, 5);
        
        //  MUSIC
        setTimeout(() => {
          let music = document.getElementById('myAudio') as HTMLAudioElement
          music.loop = true
          music.autoplay = true
          music.load()
          
        }, 5000);
      
        
        //  MESHES
        async function environment(name: string, scene: BABYLON.Scene): Promise<void> {
          const maze = await BABYLON.SceneLoader.ImportMeshAsync('', './src/assets/models/', "MazeV1.obj", scene, (meshes) => {console.log(meshes)})
          // maze.scaling.y = 5
          const ground = BABYLON.Mesh.CreateGround("ground1", 100, 100, 2, scene);
  
          //  TEXTURES
          setTimeout(() => {
            const brickMaterial = new BABYLON.StandardMaterial('brickMaterial', scene);
            brickMaterial.diffuseTexture = new BABYLON.Texture("./src/assets/textures/bricks.jpg", scene);
   
            const tileMaterial = new BABYLON.StandardMaterial('tileMaterial', scene);
            tileMaterial.diffuseTexture = new BABYLON.Texture("./src/assets/textures/tiles.jpg", scene);
            
            // maze.material = brickMaterial
            ground.material = tileMaterial
            
       }, 5000);

      } ;
      environment('MazeV1', scene);


        // //  TEXTURES
        //   setTimeout(() => {
        //     const brickMaterial = new BABYLON.StandardMaterial('brickMaterial', scene);
        //     brickMaterial.diffuseTexture = new BABYLON.Texture("./src/assets/textures/bricks.jpg", scene);
            
        //     ground.material = tileMaterial;
        //     cubeOne.material = brickMaterial;
        //     cubeTwo.material = brickMaterial;
        //     cubeThree.material = brickMaterial;
        //     cubeFour.material = brickMaterial;
            
        //   }, 5000);
    
    
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