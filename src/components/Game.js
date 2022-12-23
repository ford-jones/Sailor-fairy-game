/* eslint-disable space-before-function-paren */
/* eslint-disable quotes */
/* eslint-disable semi */
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import wallWrap from "./../assets/textures/bricks.jpg";
import floorWrap from "./../assets/textures/tiles.jpg";
import vertShader from "./../shaders/shader.vert";
import fragShader from "./../shaders/shader.frag";

export default class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.engine = new BABYLON.Engine(this.canvas, true);
  }

  createScene() {
    this.scene = new BABYLON.Scene(this.engine);

    this.camera = new BABYLON.UniversalCamera(
      "camera1",
      new BABYLON.Vector3(0, 5, -10),
      this.scene
    );
    this.camera.setTarget(BABYLON.Vector3.Zero());
    this.camera.attachControl(this.canvas, false);
    /* --------LIGHT TESTING-------- */

    // Spot light (torch light)
    // this.light = new BABYLON.SpotLight(
    //   'light1',
    //   new BABYLON.Vector3(0, 1, 0),
    //   new BABYLON.Vector3(2, -1, 1),
    //   Math.PI / 1,
    //   20,
    //   this.scene
    // )

    // Point light (lightbulb)
    // this.light = new BABYLON.PointLight(
    //   'light1',
    //   new BABYLON.Vector3(0, 2, 0),
    //   this.scene
    // )

    //  Hemispheric light (natural / ambient)
    this.light = new BABYLON.HemisphericLight(
      "Light1",
      new BABYLON.Vector3(0, 1, 0),
      this.scene
    );

    /* --------SCENE FX--------- */

    this.scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    this.scene.fogDensity = 0.05;
    this.scene.fogColor = new BABYLON.Color3(0, 0, 0);
    this.scene.clearColor = new BABYLON.Color3(0, 0, 0);

    let cubeOne = BABYLON.MeshBuilder.CreateBox(
      "cubeOne",
      { width: 10, height: 1.5, depth: 0.2 },
      this.scene
    );
    cubeOne.position.x = 0;
    cubeOne.position.y = 0.7;
    cubeOne.position.z = 6;

    let cubeTwo = BABYLON.MeshBuilder.CreateBox(
      "cubeTwo",
      { width: 10, height: 1.5, depth: 0.2 },
      this.scene
    );
    cubeTwo.position.x = 0;
    cubeTwo.position.y = 0.7;
    cubeTwo.position.z = -6;

    let cubeThree = BABYLON.MeshBuilder.CreateBox(
      "cubeThree",
      { width: 12, height: 1.5, depth: 0.2 },
      this.scene
    );
    cubeThree.position.x = 4.9;
    cubeThree.position.y = 0.7;
    cubeThree.position.z = 0;
    cubeThree.rotation.y = Math.PI / 2;

    let cubeFour = BABYLON.MeshBuilder.CreateBox(
      "cubeFour",
      { width: 12, height: 1.5, depth: 0.2 },
      this.scene
    );
    cubeFour.position.x = -4.9;
    cubeFour.position.y = 0.7;
    cubeFour.position.z = 0;
    cubeFour.rotation.y = Math.PI / 2;

    let ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 12, subdivisions: 2 },
      this.scene
    );

    BABYLON.Effect.ShadersStore["customVertexShader"] = vertShader;
    BABYLON.Effect.ShadersStore["customFragmentShader"] = fragShader;
    const brickMaterial = new BABYLON.StandardMaterial();
    brickMaterial.diffuseTexture = new BABYLON.Texture(wallWrap, this.scene);
    const tileMaterial = new BABYLON.StandardMaterial();
    tileMaterial.diffuseTexture = new BABYLON.Texture(floorWrap, this.scene);

    ground.material = tileMaterial;
    cubeOne.material = brickMaterial;
    cubeTwo.material = brickMaterial;
    cubeThree.material = brickMaterial;
    cubeFour.material = brickMaterial;
  }

  doRender() {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }
}
