// 画布相关变量的声明
var canWidth=0;//画布宽度
var canHeight=0;//画布高度
var canvas=null;//画布
var mouseTop=0;//鼠标实时纵坐标
var mouseLeft=0;//鼠标实时横坐标
var bubbleArr=[];//bubble数组




//画布初始化，使画布充满整个页面
(function(){
	canWidth=window.innerWidth;//画布宽为页面宽
	canHeight=window.innerHeight;
	canvas=document.getElementById("canvas").getContext("2d");
	document.getElementById('canvas').height=canHeight;
	document.getElementById('canvas').width=canWidth;
	canvas.fillStyle='#eee';
	canvas.fillRect(0,0,canWidth,canHeight);
	canvas.fill();
	window.onresize=arguments.callee;//画布大小随窗口改变而改动
})();

//随机函数
function random(min,max){
	return Math.floor(Math.random()*max+min);
}

//创建球球对象，拥有初始化init,绘画draw,移动move方法
function Bubble(){}
Bubble.prototype={    //构造原生链
	"init":function(){
			this.x=random(0,canWidth);
			this.y=random(0,canHeight);
			var colorArr=["#58D3F7","#40FF00","#FFFF00","#FF4000"];//球球颜色集合
			this.color=colorArr[random(0,5)];
			this.vx=random(-1,3);
			this.vy=random(-1,3);
			this.r=random(1,5);
			this.prer=this.r;
			this.vr=2;
			this.maxr=50;//最大的半径为50
	},
	"draw":function(){
			canvas.beginPath();
			canvas.fillStyle=this.color;
			canvas.arc(this.x,this.y,this.r,0,Math.PI*2);//画圆
			canvas.fill();
	},
	"move":function(){
			this.x+=this.vx;
			this.y+=this.vy;
			if((this.x<=this.r)||(this.x+this.r>=canWidth)){
				this.vx=-this.vx;//球球碰壁时返回

			}
			if((this.y<=this.r)||(this.y+this.r>=canHeight)){
				this.vy=-this.vy;//球球碰壁时返回
				
			}
			//鼠标66范围内。球球变大。超出66范围内，球球变小
			var inVertical=Math.abs(this.y-mouseTop);
			var inHorizontal=Math.abs(this.x-mouseLeft);
			if((this.r<this.maxr)&&(inVertical<66)&&(inHorizontal<66)){
				this.r+=this.vr;
			}
			if((this.r>this.prer)&&(inVertical>66)&&(inHorizontal>66)){
				this.r-=this.vr;
			}
			this.draw();
	},
};

//创造球球的函数
function create(){
	var bubble=new Bubble;
	bubble.init();
	bubble.draw();
	bubbleArr.push(bubble);
}

//循环生成666个球
for(var i=0;i<666;i++){
	create();
}

//使用计时器控制球球的动态效果
setInterval(function(){
	canvas.clearRect(0,0,canWidth,canHeight);
	for(var item of bubbleArr){
		item.move();
	}
},1000/30);

//获取鼠标的实时从横坐标位置
document.body.addEventListener("mousemove",function(e){
	mouseTop=e.clientY;
	mouseLeft=e.clientX;
	console.log(mouseTop+":"+mouseLeft);
})

