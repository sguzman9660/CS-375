/////////////////////////////////////////////////////////////////////////////
//
//  IndexedCube.js
//
//  A cube defined of 12 triangles using vertex indices.
//

class IndexedCube {
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

        let program = new ShaderProgram(gl,this, vertexShader, fragmentShader);

        let vertices = new Float32Array([           
            -0.5, -0.5,  0.5, // Vertex 0
             0.5, -0.5,  0.5, // Vertex 1
             0.5,  0.5,  0.5, // Vertex 2
            -0.5,  0.5,  0.5, // Vertex 3
            -0.5, -0.5, -0.5, // Vertex 4
            -0.5,  0.5, -0.5, // Vertex 5
             0.5,  0.5, -0.5, // Vertex 6
             0.5, -0.5, -0.5, // Vertex 7
        ]);

        let colors = new Float32Array([
            1, 0, 0, 1,   // Vertex 0: Red
            0, 1, 0, 1,   // Vertex 1: Green
            0, 0, 1, 1,   // Vertex 2: Blue
            1, 1, 0, 1,   // Vertex 3: Yellow
            1, 0, 1, 1,   // Vertex 4: Magenta
            0, 1, 1, 1,   // Vertex 5: Cyan
            1, 1, 1, 1,   // Vertex 6: White
            0, 0, 0, 1,   // Vertex 7: Black
        ]);

        let indices = new Uint16Array([
            0, 1, 2,  0, 2, 3,  // face 1
            4, 5, 6,  4, 6, 7,  // face 2
            5, 3, 2,  5, 2, 6,  // face 3
            0, 4, 7,  0, 7, 1,  // face 4
            3, 5, 4,  3, 4, 0,  // face 5
            2, 1, 6,  7, 6, 1   // face 6
        ]);

    
        let positionBuffer = new Attribute(gl, program, "aPosition", vertices, 3, gl.FLOAT);
        let colorBuffer = new Attribute(gl, program, "aColor", colors, 4, gl.FLOAT);
        let indexBuffer = new Indices(gl, indices);

        this.draw = () => {
            program.use();

            positionBuffer.enable();
            colorBuffer.enable();
            indexBuffer.enable(); 
          
            gl.drawElements(gl.TRIANGLES, indexBuffer.count, indexBuffer.type, 0);
          
            positionBuffer.disable();
            colorBuffer.disable();
            indexBuffer.disable(); 
        };
    }
}