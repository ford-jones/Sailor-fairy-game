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

     
        
        //  AMBIENT FX
        const light = new BABYLON.PointLight('light1', new BABYLON.Vector3(5, 20, 0), scene)
        light.intensity = 3;
        
        scene.clearColor = new BABYLON.Color4(0, 0, 10);
        
        //  MUSIC
        setTimeout(() => {
          let music = document.getElementById('myAudio') as HTMLAudioElement
          music.loop = true
          music.autoplay = true
          music.load()
          
        }, 5000);
      
        
        //  MESHES
        function environment(name: string, scene: BABYLON.Scene) {
          const maze = BABYLON.SceneLoader.ImportMesh('', './src/assets/models/', "uploads_files_197569_Maze.obj", scene, (meshes) => {console.log(meshes)})
      
          const ground = BABYLON.Mesh.CreateGround("ground1", 300, 300, 2, scene);
          ground.position.y = 1.5
  
          //  TEXTURES
          setTimeout(() => {
            const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
            groundMaterial.diffuseTexture = new BABYLON.Texture("./src/assets/textures/bricks.jpg", scene);
   
            const mazeMaterial = new BABYLON.StandardMaterial('mazeMaterial', scene);
            mazeMaterial.diffuseTexture = new BABYLON.Texture("./src/assets/textures/tiles.jpg", scene);
            
            
            ground.material = groundMaterial
            
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