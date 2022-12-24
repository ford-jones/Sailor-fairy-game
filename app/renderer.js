"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BABYLON = require("babylonjs");
require("babylonjs-loaders");
/* GAME */
class Renderer {
    createScene(canvas, engine) {
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
            let music = document.getElementById('myAudio');
            music.loop = true;
            music.autoplay = true;
            music.load();
        }, 5000);
        //  MESHES
        function environment(name, scene) {
            return __awaiter(this, void 0, void 0, function* () {
                const maze = yield BABYLON.SceneLoader.ImportMeshAsync('', './src/assets/models/', "MazeV1.obj", scene, (meshes) => { console.log(meshes); });
                // maze.scaling.y = 5
                const ground = BABYLON.Mesh.CreateGround("ground1", 100, 0, 2, scene);
                //  TEXTURES
                setTimeout(() => {
                    const brickMaterial = new BABYLON.StandardMaterial('brickMaterial', scene);
                    brickMaterial.diffuseTexture = new BABYLON.Texture("./src/assets/textures/bricks.jpg", scene);
                    const tileMaterial = new BABYLON.StandardMaterial('tileMaterial', scene);
                    tileMaterial.diffuseTexture = new BABYLON.Texture("./src/assets/textures/tiles.jpg", scene);
                    // maze.material = brickMaterial
                    ground.material = tileMaterial;
                }, 5000);
            });
        }
        ;
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
    initialize(canvas) {
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
exports.default = Renderer;
const renderer = new Renderer();
renderer.initialize(document.getElementById('render-canvas'));
//# sourceMappingURL=renderer.js.map