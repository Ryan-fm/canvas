import * as dat from 'dat.gui'

export const initCanvas = () => {
    const gui = new dat.GUI()
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')
    var innerWidth = window.innerWidth
    var innerHeight = window.innerHeight
    
    canvas.width = innerWidth
    canvas.height = innerHeight
    
    const wave = {
        y: canvas.height / 2,
        length: 0.01,
        amplitude: 100,
        frequency: 0.01
    }
    const strokeColor = {
        h: 255,
        s: 50,
        l: 50
    }
    
    const backgroundColor = {
        r: 0,
        g: 0,
        b: 0,
        a: 0.5
    }
    
    const strokeColorFolder = gui.addFolder('Stroke Color')
    strokeColorFolder.add(strokeColor, 'h', 0, 255)
    strokeColorFolder.add(strokeColor, 's', 0, 100)
    strokeColorFolder.add(strokeColor, 'l', 0, 100)
    strokeColorFolder.open()
    
    const waveFolder = gui.addFolder('Wave')
    waveFolder.add(wave, 'y', 0, canvas.height)
    waveFolder.add(wave, 'length', -0.01, 0.01)
    waveFolder.add(wave, 'amplitude', -300, 300)
    waveFolder.add(wave, 'frequency', -0.01, 1)
    waveFolder.open()
    
    const backgroundColorFolder = gui.addFolder('Background Color')
    backgroundColorFolder.add(backgroundColor, 'r', 0, 255)
    backgroundColorFolder.add(backgroundColor, 'g', 0, 255)
    backgroundColorFolder.add(backgroundColor, 'b', 0, 255)
    backgroundColorFolder.add(backgroundColor, 'a', 0, 1)
    backgroundColorFolder.open()
    
    let increment = wave.frequency
    function animate(){
        requestAnimationFrame(animate)
        c.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`
        c.fillRect(0,0,innerWidth,innerHeight)
        c.beginPath()
        c.moveTo(0, canvas.height / 2)
        
        for(let i = 0; i < canvas.width; i++){
            c.lineTo(i,wave.y + Math.sin(i * wave.length + increment) * wave.amplitude)
        }
        c.strokeStyle = `hsl(${Math.abs(Math.sin(increment) * 255)},${strokeColor.s}%,${strokeColor.l}%)`
        c.stroke()
        increment += wave.frequency
    }
    animate()
}