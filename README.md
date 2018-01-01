## Building
A mostly complete (I say mostly because sometimes it doesn't seem to work super well) set of build steps necessary to compile this project:

npm install node-gyp
npm install --global --production windows-build-tools
npm install -g electron

Make sure python is on your path

npm install

As an aministrator in the command prompt run: node_modules\.bin\electron-rebuild.cmd
I had mixed success running this from inside of another shell, like git bash.

*edit file* (There is an issue with the xinput library that prevents it from working with Electron. A fork of this project will be available later)

in node_modules/xinput.js directory:
npm install
node-gyp configure
node-gyp build
HOME=~/.electron-gyp node-gyp rebuild --target=1 --arch=x64 --dist-url=https://atom.io/download/electron

**leave the library out of package.json**

If any modules fail to load, try running the "HOME..." command in that library's folder. This happened once with mmmagic (but not other times? Confusing)


## ScpDriver
The SCP ToolKit used to make PS3 controllers act like Xbox 360 controllers is included in this repository. This is not my work and is merely included out of convenience.
The GitHub page for this project is located at https://github.com/nefarius/ScpToolkit and it is available under the GNU General Public License (this license is included in the ScpServer directory of this project)

Inside of ScpServer/bin, run ScpDriver and have it install. Plug your PS3 controller in (if you have a compatible bluetooth dongle you should be able to then unplug your controller after it is detected) and away you go. 

The controllers can be powered down by holding L1 and R1, and then holding in the PS button.
