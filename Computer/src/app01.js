var MainLayer = cc.Layer.extend({
    sprite:null,
    nums:new Array(10),
    rects:new Array(10),
    enter:null,
    enterrect:null,
    back:null,
    backrect:null,
    clear:null,
    clearrect:null,
    addition:null,
    additionrect:null,
    subtraction:null,
    subtractionrect:null,
    multiplication:null,
    multiplicationrect:null,
    division:null,
    divisionrect:null,
    input:null,
    answer:null,
    guess:"",
    // dx:4,
    counter:0,
    // answer:createAnswer(3),
    // isRun:true,
    ctor:function () {
        this._super();

        var title = new cc.LabelTTF("計算機","",48);
        title.x = cc.winSize.width / 2;
        title.y = cc.winSize.height * 7 / 8;
        this.addChild(title);

        this.initLayout();

        this.setUpmymouse(this);

        return true;
    },

    initLayout: function(){
        var frameCache = cc.spriteFrameCache;
        frameCache.addSpriteFrames(res.number_plist, res.number_png);

        //number key
        var px,py;
        for (i = 0; i<this.nums.length ;i++){
            this.nums[i] = new cc.Sprite("#number"+ i +".png");
            if(i==0){
                px = 3;
                py = 1;
            }
            else{
                px = (i-1) % 3 + 2;
                py = parseInt((i-1) / 3) + 2;
            }

            this.nums[i].x = cc.winSize.width * px /7;
            this.nums[i].y = cc.winSize.height * py /8;

            this.rects[i] = new cc.Rect(
                this.nums[i].x - this.nums[i].width/2,
                this.nums[i].y - this.nums[i].height/2,
                this.nums[i].width,
                this.nums[i].height
            );

            this.addChild(this.nums[i]);
        }

        //enter key
        this.enter = new cc.Sprite(res.enter_png);
        this.enter.x = cc.winSize.width * 4 / 7;
        this.enter.y = cc.winSize.height * 1 / 8;

        this.enterrect = new cc.Rect(
            this.enter.x - this.enter.width/2,
            this.enter.y - this.enter.height/2,
            this.enter.width,
            this.enter.height,
        );

        this.addChild(this.enter);


        //back key
        this.back = new cc.Sprite(res.back_png);
        this.back.x = cc.winSize.width * 2 / 7;
        this.back.y = cc.winSize.height * 1 / 8;

        this.backrect = new cc.Rect(
            this.back.x - this.back.width/2,
            this.back.y - this.back.height/2,
            this.back.width,
            this.back.height,
        );

        this.addChild(this.back);

        //clear key
        this.clear = new cc.Sprite(res.clear_png);
        this.clear.x = cc.winSize.width * 1 / 7;
        this.clear.y = cc.winSize.height * 1 / 8;

        this.clearrect = new cc.Rect(
            this.clear.x - this.clear.width/2,
            this.clear.y - this.clear.height/2,
            this.clear.width,
            this.clear.height,
        );

        this.addChild(this.clear);

        //input
        this.input = new cc.LabelTTF("","",36);
        this.input.x = cc.winSize.width * 3 / 6;
        this.input.y = cc.winSize.height * 6 / 8;
        this.addChild(this.input);

        //answer
        this.answer = new cc.LabelTTF("","",48);
        this.answer.x = cc.winSize.width * 3 / 6;
        this.answer.y = cc.winSize.height * 5 / 8;
        this.addChild(this.answer);

        //addition key
        this.addition = new cc.Sprite(res.addition_png);
        this.addition.x = cc.winSize.width * 5 / 7;
        this.addition.y = cc.winSize.height * 4 / 8;

        this.additionrect = new cc.Rect(
            this.addition.x - this.addition.width/2,
            this.addition.y - this.addition.height/2,
            this.addition.width,
            this.addition.height,
        );
        this.addChild(this.addition);

        //subtraction key
        this.subtraction = new cc.Sprite(res.subtraction_png);
        this.subtraction.x = cc.winSize.width * 5 / 7;
        this.subtraction.y = cc.winSize.height * 3 / 8;

        this.subtractionrect = new cc.Rect(
            this.subtraction.x - this.subtraction.width/2,
            this.subtraction.y - this.subtraction.height/2,
            this.subtraction.width,
            this.subtraction.height,
        );
        this.addChild(this.subtraction);

        //multiplication key
        this.multiplication = new cc.Sprite(res.multiplication_png);
        this.multiplication.x = cc.winSize.width * 5 / 7;
        this.multiplication.y = cc.winSize.height * 2 / 8;

        this.multiplicationrect = new cc.Rect(
            this.multiplication.x - this.multiplication.width/2,
            this.multiplication.y - this.multiplication.height/2,
            this.multiplication.width,
            this.multiplication.height,
        );
        this.addChild(this.multiplication);

        //division key
        this.division = new cc.Sprite(res.division_png);
        this.division.x = cc.winSize.width * 5 / 7;
        this.division.y = cc.winSize.height * 1 / 8;

        this.divisionrect = new cc.Rect(
            this.division.x - this.division.width/2,
            this.division.y - this.division.height/2,
            this.division.width,
            this.division.height,
        );
        this.addChild(this.division);

    },

    setUpmymouse: function(layer){
        if('mouse' in cc.sys.capabilities){
            // define listener object
            var mouseListener = {
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                    var x = event.getLocationX();
                    var y = event.getLocationY();
                    // console.log(x + " x " + y);
                    var point = new cc.Point(x, y);


                    // back
                    if (cc.rectContainsPoint(layer.backrect, point)) {
                        console.log("press:back");
                        layer.guess = layer.guess.substring(0, layer.guess.length-1);
                        layer.input.setString(layer.guess);
                        return;
                    }

                    // clear
                    if (cc.rectContainsPoint(layer.clearrect, point)) {
                        console.log("press:clear");
                        layer.input.setString("");
                        layer.answer.setString("");
                        layer.guess = "";
                    }

                    // enter
                    if (cc.rectContainsPoint(layer.enterrect, point)) {
                        console.log("press:enter");

                        if (layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "+" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "-" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "*" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "/" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "" ) {

                            var result = eval(layer.guess);
                            layer.answer.setString(result);

                        }
                    }

                    // number
                    for (i = 0; i < layer.rects.length; i++) {
                        if (cc.rectContainsPoint(layer.rects[i], point)) {
                            console.log("press:" + i);
                            layer.guess += i;
                            layer.input.setString(layer.guess);

                            break;
                        }
                    }

                    // addition
                    if (cc.rectContainsPoint(layer.additionrect, point)) {
                        console.log("press:addition");
                        if (layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "+" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "-" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "*" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "/" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "" ) {

                            layer.guess += "+";
                            layer.input.setString(layer.guess);

                        }

                    }

                    // subtraction
                    if (cc.rectContainsPoint(layer.subtractionrect, point)) {
                        console.log("press:subtraction");

                        if (layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "+" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "-" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "*" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "/" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "" ) {

                            layer.guess += "-";
                            layer.input.setString(layer.guess);

                        }
                    }

                    // multiplication
                    if (cc.rectContainsPoint(layer.multiplicationrect, point)) {
                        console.log("press:multiplication");
                        if (layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "+" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "-" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "*" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "/" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "" ) {

                            layer.guess += "*";
                            layer.input.setString(layer.guess);

                        }
                    }

                    // division
                    if (cc.rectContainsPoint(layer.divisionrect, point)) {
                        console.log("press:division");
                        if (layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "+" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "-" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "*" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "/" &&
                            layer.guess.substring(layer.guess.length - 1, layer.guess.length) != "" ) {

                            layer.guess += "/";
                            layer.input.setString(layer.guess);

                        }
                    }

                },
            };
            cc.eventManager.addListener(mouseListener,this);
        }
    },

});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});

