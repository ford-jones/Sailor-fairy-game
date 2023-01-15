# Sailor Fairy: WORLD

# -----DEVELOPMENT------

# Install Dependencies:
```
npm install
```
# Run the typescript build:
```
npm run build
```
# Launch the app locally from your command line:
```
npm start
```

# -----PACKAGING & DISTRIBUTION------
# RUN BUILD BEFORE FOLLOWING THESE STEPS!!!


# Package the app, this will create a new folder in your root directory:
Mac:
```
electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=false --out=sailor-fairy-world
```

Windows:
```
```

# Make sure to enter this into your command line from the root. One of the async assets don't transfer in the packaging process so you will need to enter it manually:
```
cd assets/models && cp uploads_files_197569_Maze.obj ../../sailor-fairy-world/Sailor\ Fairy-\ WORLD-darwin-x64/Sailor\ Fairy-\ WORLD.app/Contents/Resources/app/assets/models

```