
let gl = undefined;
let matrixStack;
let sphere, cube, cone;
let angle = 0; // For animation

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }

    // Add initialization code here
    
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.9, 0.9, 0.9, 1.0); 
    gl.enable(gl.DEPTH_TEST);

 
    matrixStack = new MatrixStack();

 
    sphere = new Sphere();
    cube = new Cube();
    cone = new Cone();
    render();
}

function render() {
    // Add rendering code here
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Animate the sphere (rotate)
    angle += 2.0;
    angle %= 360.0;

        // Draw Sphere
    ms.push();
    ms.translate(...positions[0].pos);
    ms.scale(...positions[0].scale);
    ms.rotate(angle, [0, 1, 0]); // Rotate around y-axis
    sphere.MV = ms.current();
    sphere.draw();
    ms.pop();

        // Draw Cone
    ms.push();
    ms.translate(...positions[1].pos);
    ms.scale(...positions[1].scale);
    cone.MV = ms.current();
    cone.draw();
    ms.pop();

        // Draw Cylinder
    ms.push();
    ms.translate(...positions[2].pos);
    ms.scale(...positions[2].scale);
    cylinder.MV = ms.current();
    cylinder.draw();
    ms.pop();
}

window.onload = init;

