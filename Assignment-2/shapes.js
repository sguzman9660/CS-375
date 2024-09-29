
let gl = undefined;
let matrixStack;
let sphere, cylinder, cone;
let angle = 0; // For animation

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }

    // Add initialization code here
    
   // gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.2, 0.2, 0.2, 1.0); 
 
    gl.enable(gl.DEPTH_TEST);

 
    matrixStack = new MatrixStack();

 
    sphere = new Sphere(gl, 36, 18);
    cylinder = new Cylinder(gl, 36);
    cone = new Cone(gl, 36);
    render();
}

function render() {
    // Add rendering code here
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    let ms = matrixStack;

    angle += 2.0;
    angle %= 360.0;

    // Draw Sphere
    ms.push();
    ms.translate(0,.7,-1);
    ms.rotate(angle, [0, 1, 0]); 
    ms.scale(0.2);
    sphere.MV = ms.current();
    sphere.draw();
    ms.pop();

    // Draw Cone
    ms.push();
    ms.translate(-.4,0,0);
    ms.rotate(angle, [1, 1, 0]);
    ms.scale(0.2)
    cone.MV = ms.current();
    cone.draw();
    ms.pop();

    // Draw Cylinder
    ms.push();
    ms.translate(.6,.4,-1);
    ms.rotate(angle, [0, 1, 1]);
    ms.scale(0.2)
    cylinder.MV = ms.current();
    cylinder.draw();
    ms.pop();

    requestAnimationFrame(render);
}

window.onload = init;

