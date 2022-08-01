const {app, BrowserWindow} = require('electron')
const url = require("url");
const path = require("path");
const { protocol } = require('electron')
let mainWindow

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 807200,
        webPreferences: {
            nodeIntegration: true
        },
        autoHideMenuBar: true
    })
    
    mainWindow.setIcon("./Icon.png")
    const htmlRootDir = 'src/'
    const indexFile = 'index.html'

    // Append the correct file prefix to the request for files (./src/FILENAME)
    protocol.interceptFileProtocol(
        'file',
        (request, callback) => {
            var url = request.url.substr(7) // strip "file://" out of all urls
            if (request.url.endsWith(indexFile)) {
                callback({ path: url })
            } else {
                if(url.substring(0, 3) == "/C:"){
                    url = url.slice(3)
                }
                callback({ path: path.normalize(`${__dirname}/${htmlRootDir}/${url}`) })
            }
        }, 
        error => console.error(error) 
    ) 

    mainWindow.loadFile("./src/index.html")

    mainWindow.on('closed', function () {
    mainWindow = null
    })
}




app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})