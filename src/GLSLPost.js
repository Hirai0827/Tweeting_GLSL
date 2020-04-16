import React, {Component} from "react";
import {Button,Grid,TextField} from "@material-ui/core";
require('./jsgif-master/GIFEncoder');
require('./jsgif-master/LZWEncoder');
require('./jsgif-master/NeuQuant');

/*eslint-disable no-undef*/

export class GLSLPost extends Component{
    constructor(props) {
        super(props);
        this.state = {
            date:new Date(),
            isButtonEnable:true,
            gifLength:3,
            lengthIsValid:true
        }
        this.onClicked = this.onClicked.bind(this);
        this.onCopyButtonClicked = this.onCopyButtonClicked.bind(this);
        this.onGIFLengthChanged = this.onGIFLengthChanged.bind(this);
    }
    componentDidMount() {
        this.si = setInterval(() => {
            this.setState({date:new Date()})
        });
    }
    componentWillUnmount() {
        clearInterval(this.si);
    }

    onClicked(event){
        this.props.changeIsGenBegin(true);
        this.setState({isButtonEnable:false});
        let ctx = document.getElementById("2dCanvas").getContext("2d");
        let encoder = new GIFEncoder();
        encoder.setRepeat(0);
        encoder.setFrameRate(30);
        encoder.start();
        let count = 0;
        let loop_detected = false;
        let initialPixels = [];
        let prevframes = [];
        let prevsamples = [];
        let checkGrid = 4;
        let samplePerFrame = checkGrid*checkGrid;
        let checkFrameCount = 5;
        let randInt = function (max){
            return Math.floor(Math.random() * max);
        }
        let pos = function(x,y){
            this.x = x;
            this.y = y;
        }
        let int = setInterval(() => {
            if(count == 30 * this.state.gifLength || loop_detected){
                encoder.finish();
                encoder.download("result.gif");
                clearInterval(int);
                this.props.changeIsGenBegin(false);
                this.setState({isButtonEnable:true});
                this.props.changeCurrentGenFrame(-count * 33);
            }else{
                if(this.props.isLDOn){
                    if(count < checkFrameCount){
                        initialPixels.push(ctx.getImageData(0,0,450,300));
                        console.log(initialPixels[count]);
                    }else{
                        // for(let i = 0; i < samplePerFrame; i++){
                        //     let x = randInt(450);
                        //     let y = randInt(300);
                        //     let p = new pos(x,y);
                        //     prevsamples.push(p);
                        //     prevframes.push(ctx.getImageData(p.x,p.y,1,1));
                        // }
                        for (let yi = 0; yi < checkGrid; yi++){
                            for(let xi = 0; xi < checkGrid; xi++){
                                let x;
                                let y;
                                if(yi == checkGrid - 1){
                                    y = yi * (300/checkGrid) + randInt(300/checkGrid);
                                }else{
                                    y = yi * (300/checkGrid) + randInt(300/checkGrid);
                                }
                                if(xi == checkGrid - 1){
                                    x = xi * (300/checkGrid) + randInt(300/checkGrid);
                                }else{
                                    x = xi * (300/checkGrid) + randInt(300/checkGrid);
                                }
                                let p = new pos(x,y);
                                prevsamples.push(p);
                                prevframes.push(ctx.getImageData(p.x,p.y,1,1));
                            }
                        }
                        if(prevsamples.length == (checkFrameCount + 1) * samplePerFrame){
                            for (let i = 0; i < samplePerFrame; i++){
                                prevsamples.shift();
                                prevframes.shift();
                            }
                            let correctCount = 0;
                            for(let i = 0; i < checkFrameCount; i++){
                                for(let j = 0; j < samplePerFrame; j++){
                                    let pixelIndex = prevsamples[i * samplePerFrame + j].x + 450 * prevsamples[i * samplePerFrame + j].y;
                                    //console.log("begin");
                                    //console.log(initialPixels[i].data[pixelIndex * 4],initialPixels[i].data[pixelIndex * 4 + 1],initialPixels[i].data[pixelIndex * 4 + 2]);
                                    //console.log("end");
                                    //console.log(prevframes[i * samplePerFrame + j].data[0],prevframes[i*samplePerFrame+j].data[1],prevframes[i*samplePerFrame+j].data[2]);
                                    let diff = Math.abs(initialPixels[i].data[pixelIndex * 4] - prevframes[i * samplePerFrame + j].data[0])
                                        + Math.abs(initialPixels[i].data[pixelIndex * 4 + 1] - prevframes[i * samplePerFrame + j].data[1])
                                        +Math.abs(initialPixels[i].data[pixelIndex * 4 + 2] - prevframes[i * samplePerFrame + j].data[2]);
                                    if(diff < 30){
                                        //console.log("correct");
                                        correctCount++;
                                    }
                                }
                            }
                            if(correctCount >= checkFrameCount * samplePerFrame * 0.9){
                                console.log("loop detected.");
                                loop_detected = true;
                            }
                        }

                        encoder.addFrame(ctx);
                    }
                    count++;
                    this.props.changeCurrentGenFrame(33);
                }else{
                    encoder.addFrame(ctx);
                    count++;
                    console.log(count);
                    this.props.changeCurrentGenFrame(33);
                }

            }
        },33);

    }
    onCopyButtonClicked(event){
        let copyArea = document.getElementById("copyTextarea");
        copyArea.value = "#つぶやきGLSL " + this.props.frag;
        copyArea.select();
        document.execCommand("copy");
        copyArea.value="";
    }
    onGIFLengthChanged(event){
        if(event.target.value == ""){
            this.setState({lengthIsValid:false});
        }else{
            this.setState({lengthIsValid:true});
        }

        this.setState({gifLength:event.target.value});
    }

    render() {
        return (
            <div style={{textAlign:"right"}}>
                <Grid container>
                    <Grid item xs={3} style={{textAlign:"left",fontSize:"16px",color:"gray"}}>
                        {this.state.date.toLocaleString()}
                    </Grid>
                    <Grid item xs={1} style={{textAlign:"right",fontSize:"20px"}}>
                        <LimitIndicator textLength={this.props.frag.length}/>
                    </Grid>
                    <Grid item xs={3} style={{paddingLeft:"50px"}}>
                        <TextField
                            label="gifLength(sec)"
                            type="number"
                            variant="outlined"
                            size="small"
                            color={"white"}
                            defaultValue={3}
                            value={this.state.gifLength}
                            onChange={this.onGIFLengthChanged}
                            style={{
                                borderWidth:"2px",
                            }}
                        />
                    </Grid>
                    <Grid item xs={2} style={{filter:"drop-shadow(2px 2px 4px)"}}>
                        <Button style={{backgroundColor:((this.state.isButtonEnable && this.state.lengthIsValid)? "teal" : "gray"), color:"white",fontSize:"18px",fontWeight:"bold"}} onClick={this.onClicked} disabled={!(this.state.isButtonEnable && this.state.lengthIsValid)}>
                            Gif出力
                        </Button>
                    </Grid>
                    <Grid item xs={3} style={{filter:"drop-shadow(2px 2px 4px)"}}>
                        <Button style={{backgroundColor:"teal", color:"white",fontSize:"18px",fontWeight:"bold"}} onClick={this.onCopyButtonClicked}>
                            コードコピー
                        </Button>
                    </Grid>
                </Grid>
                <textarea id={"copyTextarea"} style={{display:"inline",width:"0px",height:"0px",opacity:"0"}}></textarea>

            </div>
        );
    }
}

export class LimitIndicator extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{display:"inline", padding:"5px 5px 5px 5px", fontSize:"18px", fontWeight:"bold"}}>
                {this.props.textLength}/267
            </div>
        );
    }

}