import React, {Component} from "react";

export class GLSLPreview extends Component{
    constructor(props) {
        super(props);
        this.vert = "" +
            "      attribute vec3 position;\n" +
            "      void main(void){\n" +
            "        gl_Position = vec4(position, 1.0);\n" +
            "      }";
        this.preFrag =
            "precision highp float;\n" +
            "\n" +
            "uniform float time;\n" +
            "uniform vec2 mouse;\n" +
            "uniform vec2 resolution;\n" +
            "\n" +
            "void mainImage(vec2 p,float t,vec2 F,vec2 R, out vec4 o){\n";
        this.fragMain =
            "#define PI 3.1415\n" +
            "\to=vec4(uv.x,uv.y,sin(t*PI)*0.5+0.5,1.0);\n";

        this.postFrag =
            "}\n"+
            "void main( void ) {\n" +
            "\n" +
            "\tvec2 uv = ( gl_FragCoord.xy / resolution.xy );\n" +
            "\tvec2 F = gl_FragCoord.xy; \n" +
            "\tvec2 R = resolution.xy;\n" +
            "\tvec4 col;\n" +
            "\tmainImage(uv,time,F,R,col);\n" +
            "\n" +
            "\tgl_FragColor = col;\n" +
            "\n" +
            "}";

        this.state = {
            currentFrag:this.props.frag,
            uniforms:{},
            beginTime:new Date().getTime(),
            hasShaderLinked:false,
        }
        this.canvasRender = this.canvasRender.bind(this);
        this.k = this.k.bind(this);
        this.generateShader = this.generateShader.bind(this);
        this.updateShader = this.updateShader.bind(this);
    }
    componentDidMount() {        // 変数宣言
        let attributions, canvas, hasShaderLinked, glContext, GenerateShader, program, uniforms;
        // ESCキーで描画を止めるためのイベントハンドラ

        // HTMLドキュメント内のcanvasへの参照
        canvas = document.getElementById('PreviewCanvas');

        // WebGLコンテキストの取得
        glContext = canvas.getContext('webgl');

        // プログラムオブジェクトの生成
        program = glContext.createProgram();

        // シェーダ生成関数
        GenerateShader = function(i, j){
            // シェーダオブジェクト生成
            let k = glContext.createShader(glContext.VERTEX_SHADER - i);

            // ソースの割り当て
            glContext.shaderSource(k, j);

            // シェーダのコンパイル
            glContext.compileShader(k);

            // シェーダのアタッチ
            glContext.attachShader(program, k);
            // ログをリターン
            return glContext.getShaderInfoLog(k);
        };
        // シェーダのコンパイルとリンク
        if(!GenerateShader(0, this.vert) && !GenerateShader(1,this.preFrag + this.state.currentFrag + this.postFrag)){
            glContext.linkProgram(program);
        }

        // シェーダのリンクステータスをチェック
        hasShaderLinked = glContext.getProgramParameter(program, glContext.LINK_STATUS);
        this.setState({hasShaderLinked});

        // プログラムオブジェクトの有効化
        glContext.useProgram(program);

        // uniformLocation格納用にオブジェクトを定義
        uniforms = {};

        // uniform変数timeのロケーション取得
        uniforms.time = glContext.getUniformLocation(program, 'time');

        // uniform変数resolutionのロケーション取得
        uniforms.resolution = glContext.getUniformLocation(program, 'resolution');

        this.setState({uniforms});

        // VBO用のバッファオブジェクトを生成
        glContext.bindBuffer(glContext.ARRAY_BUFFER, glContext.createBuffer());

        // VBOに頂点データを登録
        glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array([-1,1,0,-1,-1,0,1,1,0,1,-1,0]), glContext.STATIC_DRAW);

        // attributeロケーション取得
        attributions = glContext.getAttribLocation(program, 'position');

        // attribute有効化
        glContext.enableVertexAttribArray(attributions);
        glContext.vertexAttribPointer(attributions, 3, glContext.FLOAT, false, 0, 0);

        // 初期化時の色を黒に指定
        glContext.clearColor(0, 0, 0, 1);

        // 動作開始時間を取得（時間の経過を調べるため）

        this.canvasRender();

        // keydownに登録する関数

    }


    k(h){
        this.setState({hasShaderLinked:h.keyCode !== 27});
    }

    generateShader(i,j,glContext,program){

            // シェーダオブジェクト生成
            let k = glContext.createShader(glContext.VERTEX_SHADER - i);

            // ソースの割り当て
            glContext.shaderSource(k, j);

            // シェーダのコンパイル
            glContext.compileShader(k);

            // シェーダのアタッチ
            glContext.attachShader(program, k);

            // ログをリターン
            return glContext.getShaderInfoLog(k);
    }

    updateShader(glContext){
        let program = glContext.createProgram();
        // シェーダのコンパイルとリンク
        let prevFrag;
        let vs = glContext.createShader(glContext.VERTEX_SHADER);

        // ソースの割り当て
        glContext.shaderSource(vs, this.vert);

        // シェーダのコンパイル
        glContext.compileShader(vs);

        // シェーダのアタッチ
        glContext.attachShader(program, vs);
        let fs = glContext.createShader(glContext.FRAGMENT_SHADER);

        // ソースの割り当て
        //console.log(this.props.frag)
        if(this.props.isEasyMode){
            glContext.shaderSource(fs, this.preFrag + this.props.frag + this.postFrag);
        }else{
            glContext.shaderSource(fs, this.props.frag);
        }

        // シェーダのコンパイル
        glContext.compileShader(fs);

        // シェーダのアタッチ
        glContext.attachShader(program, fs);


        let el = (glContext.getShaderInfoLog(fs));
        this.props.changeErrorLog(el);
        if(!glContext.getShaderInfoLog(vs) && !glContext.getShaderInfoLog(fs)){
            glContext.linkProgram(program);
        }

        glContext.useProgram(program);
        // シェーダのリンクステータスをチェック


        let uniforms = {};

        // uniform変数timeのロケーション取得

        uniforms.time = glContext.getUniformLocation(program, 'time');

        // uniform変数resolutionのロケーション取得
        uniforms.resolution = glContext.getUniformLocation(program, 'resolution');
        this.setState({uniforms});

        let attributions = glContext.getAttribLocation(program, 'position');

        // attribute有効化
        glContext.enableVertexAttribArray(attributions);
        glContext.vertexAttribPointer(attributions, 3, glContext.FLOAT, false, 0, 0);

        let hasShaderLinked = glContext.getProgramParameter(program, glContext.LINK_STATUS);
        this.setState({hasShaderLinked});

    }

    canvasRender(){
        let canvas = document.getElementById('PreviewCanvas');
        let glContext = canvas.getContext("webgl");
        if(this.props.frag != this.state.currentFrag){
            this.updateShader(glContext);
            this.setState({currentFrag:this.props.frag});
        }
        // シェーダのリンクに失敗していたら実行しない
        if(!this.state.hasShaderLinked){
            console.log("err");
            requestAnimationFrame(this.canvasRender);
            return;}

        // ビューポートを動的に指定する

        glContext.viewport(0, 0, canvas.width, canvas.height);

        // 時間の経過を調べる
        let shaderTime = (new Date().getTime() - this.state.beginTime) * 0.001;
        if(this.props.isGenBegin){
            shaderTime = this.props.currentGenFrame * 0.001;
        }

        glContext.uniform1f(this.state.uniforms.time, shaderTime);
        glContext.uniform2fv(this.state.uniforms.resolution, [canvas.width, canvas.height]);

        // フレームバッファをクリア
        glContext.clear(glContext.COLOR_BUFFER_BIT);

        // uniform変数をプッシュ

        // プリミティブのレンダリング
        glContext.drawArrays(glContext.TRIANGLE_STRIP, 0, 4);
        glContext.flush();

        let can_2d = document.getElementById("2dCanvas");
        let ctx_2d = can_2d.getContext("2d");
        // canvasクリア
        ctx_2d.clearRect(0,0, can_2d.width, can_2d.height);
        // webglのcanvasを指定
        ctx_2d.drawImage(canvas, 0, 0);


        // 再起
        requestAnimationFrame(this.canvasRender);
    }

    render() {
        return (
            <div>
                <canvas id={"PreviewCanvas"} width={450} height={300} style={{width:"450px",height:"300px",borderRadius:"8px", filter:"drop-shadow(2px 2px 4px)"}}/>
                <canvas id={"2dCanvas"} width={450} height={300} style={{width:"450px",height:"300px",borderRadius:"8px", filter:"drop-shadow(2px 2px 4px)",display:"none"}}/>
            </div>
        );
    }

}