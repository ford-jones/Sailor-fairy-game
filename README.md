# Sailor Fairy: WORLD

# -----DEVELOPMENT------

# Install Dependencies:
```
npm install
```

# Install electron-packager globally:
This is so that the app can be packaged globally using the command line. Alternatively you could write a local script in the package.json
```
npm install electron-packager -g
```

Uninstall the package from your machine any time using the command line with the uninstall -g flag.
```
npm uninstall -g electron-packager
```
# Run the typescript build:
This will output a new directory in the root of the project called './app/'. It contains .js files that have been compiled from the './src/' .ts files
```
npm run build
```
# Launch the app from your command line:
This will run the app in a new electron window locally.
```
npm start
```

# -----PACKAGING & DISTRIBUTION------
DONT FORGET TO RUN THE BUILD BEFORE FOLLOWING THESE STEPS!!!


# Package the app:
Package the macOS .app, (older machines should use the --arch=x32 flag to package as a 32bit application).
```
electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=false --out=sailor-fairy-world
```

# Move .obj files into package manually:
The config that I have used for this electron build doesn't package files that use the .obj suffix. They must be moved manually.

```
cd assets/models && cp uploads_files_197569_Maze.obj ../../sailor-fairy-world/Sailor\ Fairy-\ WORLD-darwin-x64/Sailor\ Fairy-\ WORLD.app/Contents/Resources/app/assets/models

```