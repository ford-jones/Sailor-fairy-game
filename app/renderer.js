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
        scene.onPointerDown = (evt) => {
            if (evt.button === 0)
                canvas.requestPointerLock();
        };
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
        const light = new BABYLON.PointLight('light1', new BABYLON.Vector3(5, 20, 0), scene);
        light.intensity = 3;
        scene.clearColor = new BABYLON.Color4(0, 0, 10);
        scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
        //  MUSIC
        setTimeout(() => {
            let music = document.getElementById('myAudio');
            music.loop = true;
            music.autoplay = true;
            music.load();
        }, 3000);
        //  MESHES
        function environment(name, scene) {
            return __awaiter(this, void 0, void 0, function* () {
                const maze = yield BABYLON.SceneLoader.ImportMeshAsync('', './src/assets/models/', "uploads_files_197569_Maze.obj", scene).then((world) => {
                    console.log('world: ', world);
                    const ground = BABYLON.Mesh.CreateGround("ground1", 300, 300, 2, scene);
                    //  TEXTURES & MESH PROPS
                    const mazeMaterial = new BABYLON.StandardMaterial('mazeMaterial', scene);
                    mazeMaterial.diffuseTexture = new BABYLON.Texture("./src/assets/textures/tiles.jpg", scene);
                    // This is hardcoded, check the console log and update the array figures for runtime
                    world.meshes[1].material = mazeMaterial;
                    world.meshes[1].checkCollisions = true;
                    const groundMaterial = new BABYLON.StandardMaterial('groundMaterial', scene);
                    groundMaterial.diffuseTexture = new BABYLON.Texture("./src/assets/textures/bricks.jpg", scene);
                    ground.position.y = 1.5;
                    ground.checkCollisions = true;
                    ground.material = groundMaterial;
                });
                //  SPRITES
                let flashBook = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '10');
                let flashIndex = flashBook[Math.floor(Math.random() * flashBook.length)];
                let flashTransfer = new Array;
                const spriteManagerFlash = new BABYLON.SpriteManager('flash', `./src/assets/sprites/sprite${flashIndex}.png`, 300, 450, scene);
                for (let z = 0; z < 100; z++) {
                    let flash = new BABYLON.Sprite('flash', spriteManagerFlash);
                    flash.position.x = Math.floor(Math.random() * 300 - 10);
                    flash.position.z = Math.floor(Math.random() * 300 - 10);
                    flash.position.y = 8;
                    flash.height = 5;
                    flash.width = 5;
                    flashTransfer.push(flash);
                }
            });
        }
        ;
        environment('MazeV1', scene);
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