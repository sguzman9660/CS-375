/////////////////////////////////////////////////////////////////////////////
//
//  BasicCube.js
//
//  A cube defined of 12 triangles
//

class BasicCube {
    constructor(gl, vertexShader, fragmentShader) {
        vertexShader = `
            in vec4 aPosition;
            in vec4 aColor;
            uniform mat4 P;
            uniform mat4 MV;
            out vec4 vColor;

            void main() {
                gl_Position = P * MV * aPosition;
                vColor = aColor;
            }
        `;

        fragmentShader = `
            precision mediump float;
            in vec4 vColor;
            out vec4 fColor;

            void main() {
                if (gl_FrontFacing) {
                    fColor = vColor; 
                } 
                else {
                    fColor = vec4(0.5, 0.5, 0.5, 1.0); 
                }
            }
        `;

        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);

        let vertices = new Float32Array([
           // face 1
           -0.5, -0.5,  0.5,   0.5, -0.5,  0.5,   0.5,  0.5,  0.5,
           -0.5, -0.5,  0.5,   0.5,  0.5,  0.5,  -0.5,  0.5,  0.5,
           // face 2
           -0.5, -0.5, -0.5,  -0.5,  0.5, -0.5,   0.5,  0.5, -0.5,
           -0.5, -0.5, -0.5,   0.5,  0.5, -0.5,   0.5, -0.5, -0.5,
           // face 3
           -0.5,  0.5, -0.5,  -0.5,  0.5,  0.5,   0.5,  0.5,  0.5,
           -0.5,  0.5, -0.5,   0.5,  0.5,  0.5,   0.5,  0.5, -0.5,
           // face 4
           -0.5, -0.5, -0.5,   0.5, -0.5, -0.5,   0.5, -0.5,  0.5,
           -0.5, -0.5, -0.5,   0.5, -0.5,  0.5,  -0.5, -0.5,  0.5,
           // face 5
            0.5, -0.5, -0.5,   0.5,  0.5, -0.5,   0.5,  0.5,  0.5,
            0.5, -0.5, -0.5,   0.5,  0.5,  0.5,   0.5, -0.5,  0.5,
           // face 6
           -0.5, -0.5, -0.5,  -0.5, -0.5,  0.5,  -0.5,  0.5,  0.5,
           -0.5, -0.5, -0.5,  -0.5,  0.5,  0.5,  -0.5,  0.5, -0.5,
        ]);

        let colors = new Float32Array([
            // face 1
            1, 0, 0, 1,   0, 1, 0, 1,   0, 0, 1, 1,
            1, 0, 0, 1,   0, 0, 1, 1,   1, 1, 0, 1,

            // face 2
            1, 0, 1, 1,   0, 0, 0, 1,   1, 0.5, 0, 1,
            1, 0, 1, 1,   1, 0.5, 0, 1,   0, 1, 1, 1,

            // face 3
            0, 0, 0, 1,   1, 1, 0, 1,   0, 0, 1, 1,
            0, 0, 0, 1,   0, 0, 1, 1,   1, 0.5, 0, 1,

            // face 4
            1, 0, 1, 1,   0, 1, 1, 1,   0, 1, 0, 1,
            1, 0, 1, 1,   0, 1, 0, 1,   1, 0, 0, 1,

            // face 5
            0, 1, 1, 1,   1, 0.5, 0, 1,   0, 0, 1, 1,
            0, 1, 1, 1,   0, 0, 1, 1,   0, 1, 0, 1,

            // face 6
            1, 0, 1, 1,   1, 0, 0, 1,   1, 1, 0, 1,
            1, 0, 1, 1,   1, 1, 0, 1,   0, 0, 0, 1
        ]);

        let positionBuffer = new Attribute(gl, program, "aPosition",vertices ,3, gl.FLOAT);
        let colorBuffer = new Attribute(gl, program, "aColor",colors, 4, gl.FLOAT);

        this.draw = () => {
            program.use();

            positionBuffer.enable();
            colorBuffer.enable();

            gl.drawArrays(gl.TRIANGLES, 0, positionBuffer.count);

            positionBuffer.disable();
            colorBuffer.disable();
        };
    }
}