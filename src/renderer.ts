import * as BABYLON from 'babylonjs';

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
        scene.fogDensity = 0.05;
        scene.fogColor = new BABYLON.Color3(1, 1, 1);
        scene.clearColor = new BABYLON.Color4(0, 0, 1);

        //  MUSIC
        setTimeout(() => {
          let music = document.getElementById('myAudio') as HTMLAudioElement
          music.loop = true
          music.autoplay = true
          music.load()
          
        }, 5000);
      

        //  MESHES
        let cubeOne = BABYLON.MeshBuilder.CreateBox(
          "cubeOne",
          { width: 10, height: 1.5, depth: 0.2 },
          scene
        );
        cubeOne.position.x = 0;
        cubeOne.position.y = 0.7;
        cubeOne.position.z = 6;
    
        let cubeTwo = BABYLON.MeshBuilder.CreateBox(
          "cubeTwo",
          { width: 10, height: 1.5, depth: 0.2 },
          scene
        );
        cubeTwo.position.x = 0;
        cubeTwo.position.y = 0.7;
        cubeTwo.position.z = -6;
    
        let cubeThree = BABYLON.MeshBuilder.CreateBox(
          "cubeThree",
          { width: 12, height: 1.5, depth: 0.2 },
          scene
        );
        cubeThree.position.x = 4.9;
        cubeThree.position.y = 0.7;
        cubeThree.position.z = 0;
        cubeThree.rotation.y = Math.PI / 2;
    
        let cubeFour = BABYLON.MeshBuilder.CreateBox(
          "cubeFour",
          { width: 12, height: 1.5, depth: 0.2 },
          scene
        );
        cubeFour.position.x = -4.9;
        cubeFour.position.y = 0.7;
        cubeFour.position.z = 0;
        cubeFour.rotation.y = Math.PI / 2;


        const ground = BABYLON.Mesh.CreateGround("ground1", 10, 12, 2, scene);

        //  TEXTURES
          setTimeout(() => {
            const brickMaterial = new BABYLON.StandardMaterial('brickMaterial', scene);
            brickMaterial.diffuseTexture = new BABYLON.Texture("./src/assets/textures/bricks.jpg", scene);
            const tileMaterial = new BABYLON.StandardMaterial('tileMaterial', scene);
            tileMaterial.diffuseTexture = new BABYLON.Texture("./src/assets/textures/tiles.jpg", scene);
            
            ground.material = tileMaterial;
            cubeOne.material = brickMaterial;
            cubeTwo.material = brickMaterial;
            cubeThree.material = brickMaterial;
            cubeFour.material = brickMaterial;
            
          }, 5000);
    
    
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