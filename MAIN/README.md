# Voice Assistant NFT

The two main scripts in this code are:


**main.js**
This is a JavaScript code that uses the Moralis library to authenticate users using MetaMask, a browser extension for accessing Ethereum enabled distributed applications. The code initializes the Moralis server with a server URL and an application ID. The `login` function checks if MetaMask is installed, and if not, it alerts the user to install it and opens the MetaMask download page. If MetaMask is installed, the function enables Web3 and checks if the user is already logged in. If not, it authenticates the user using Moralis and sets the login button text to display the user's Ethereum address. If the user is already logged in, the function logs them out and sets the login button text to "Login". The `cutWalletAddress` function takes a wallet address as an argument and returns a shortened version of it for display purposes.

**animar.js**

This is a JavaScript code that animates a sprite on an HTML canvas element. The code sets the dimensions of the canvas and the sprite, as well as the number of rows and columns in the sprite. It also sets the current frame to 0 and the total number of frames to 7. The `updateFrame` function increments the current frame and calculates the source x and y coordinates for drawing the sprite on the canvas. The `draw` function takes a boolean argument `S` and, if it is true, calls the `updateFrame` function, clears the canvas, and draws the current frame of the sprite on the canvas. If `S` is false, it draws the first frame of the sprite on the canvas.


### Request to test animation sheet: consulting@brightnft.info 
