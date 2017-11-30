'use strict';

var timer = function(){
    var self = this;
    //Setup variables used by timer
    this.type = "bell";
    this.interval = 1;
    this.running = false;
    this.paused = false;
    this.intervalNumber = 'one';
    this.length = 300;
    this.startLength = 300;
    this.lengthMins = 300 / 60;
    this.timer = null;

    /******************************
     * Main function of the timer *
     ******************************/
    
    this.start = function () {
        var self = this;
        this.running = true;
        this.paused = false;
        if(!this.animation)
        this.animationSetUpElements();
        if(this.length > 0){
            this.timer = setInterval (function () {
                self.incrementTimer();
            }, 1000);
            this.animation.intv = setInterval(function () {
                self.animation.moveAnimation();
            }, 100);
        }
        //make me stay awake
        if(DB.isMobile)
        window.plugins.insomnia.keepAwake();
    };
    
    this.stop = function () {
        this.type = "bell";
        this.interval = 1;
        this.running = false;
        this.paused = false;
        clearInterval(this.timer);
        this.stopAnimation()
    };
    
    this.pause = function () {
        clearInterval(this.timer);
        clearInterval(this.animation.intv);
        this.paused = true;
    };
    
    this.playSound = function () {
        var audio = document.getElementById(this.type);
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    };
    
    this.checksoundTime = function () {
        var quaterTime = this.startLength / this.interval;
        for(var i = 1; i <= this.interval; i++){
            var checkTime = quaterTime * i;
            if(this.length === checkTime || this.length === 0){
                return true;
            }
        }
    };
    
    this.incrementTimer = function () {
        this.length = this.length -= 1;
        if(this.length === -1){
            this.pause();
        }else {
            this.lengthMins = Math.floor(this.length / 60);
            this.lengthSeconds = this.length - this.lengthMins * 60;
            if (this.lengthSeconds.toString().length === 1) {
                this.lengthSeconds = '0' + this.lengthSeconds;
            }
            $('.timeText').text(this.lengthMins + ':' + this.lengthSeconds);
            if(this.checksoundTime()){
                this.playSound();
            }
        }
    };
    
    /*******************************************
     * Set up Animation of timer counting down *
     ******************************************/

    this.animationInitVars = function () {
        var self = this;
        this.animation = {
            canvas: null,
            ctx: null,
            startAngle: 0,
            time: 0,
            intv: null,
            moveAnimation: function () {
                self.animation.ctx.clearRect(0, 0, 600, 600);
                var endAngle = (Math.PI * self.animation.time * 2 / self.animation.sec);
                self.animation.ctx.arc(90, 90, 85, self.animation.startAngle, endAngle, false);
                self.animation.startAngle = endAngle;
                self.animation.ctx.stroke();

                self.animation.countdown--;
                if (++self.animation.time > self.animation.sec, self.animation.countdown == 0) { 
                    self.stopAnimation();
                }
            }
        };
        this.setAnimationTimes();
    };
    
    this.setAnimationTimes = function () {
        if(this.animation) {
            this.animation.sec = this.length * 10;
            this.animation.countdown = this.animation.sec;
        }
    }

    this.stopAnimation = function () {
        var self = this;
        if(typeof this.animation !== "undefined") {
            clearInterval(this.animation.intv), $("#timer, #counter").show();
            if(DB.isMobile)
            window.plugins.insomnia.allowSleepAgain()
        }
        setTimeout(self.animationReset, 0);
    }

    this.animationReset = function () {
        var removeElement = document.getElementsByClassName('playButton')[0];
        var child = removeElement.childNodes[0],
        secondChild = removeElement.childNodes[1],
        cloneChild = child.cloneNode(true);
        
        removeElement.removeChild(child);
        removeElement.insertBefore(cloneChild, secondChild);
        self.animationSetUpElements();
        // setTimeout(self.animationSetUpElements, 100);
    };

    this.animationSetUpElements = function () {
        self.animationInitVars();
        
        //Canvas elements
        this.animation.canvas = document.getElementById('timer');
        this.animation.ctx = this.animation.canvas.getContext('2d');
        
        //canvas Settings
        this.animation.ctx.lineWidth = 10;
        this.animation.ctx.strokeStyle = "#5D141C";
        //this.animation.ctx.strokeStyle = "#FFFFFF";
        this.animation.ctx.strokeStyle = "#A2202C";
    };
};

//Give back the timer
module.exports = timer;