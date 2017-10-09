/*
 淡出效果的焦点图

 使用例子：
 	banner({
		query: '.banner',
		UlTag: '.banner-ul',
		LiTag: '.banner-li',
		BtnsTag: '.btns-ul',
		BtnTag: '.btns-li',
		prevTag: '.prev',
		nextTag: '.next',
		LiClass: 'banner-act',
		BtnClass: 'btns-act'
	});
*/

var banner = function(opts={}){
	return new banner.fn.init(opts);
}

banner.fn = banner.prototype = {
	init: function(opts){
		let _this = this;
		_this.opts = $.extend({
			query: null,
			UlTag: '',
			LiTag: '',
			BtnsTag: '',
			BtnTag: '',
			prevTag: '',
			nextTag: '',
			LiClass: '',
			BtnClass: '',
			autoPlay: true,
			autoTime: 2000
		},opts);

		_this.query = $(_this.opts.query);
		if(_this.query.length<=0){
			throw new Error("should have the banner object!");
			return;
		}
		_this.Li = _this.query.find(_this.opts.LiTag);

		_this.btn = _this.query.find(_this.opts.BtnTag);


		if(_this.Li.length <=0 || _this.btn.length <=0){
			throw new Error("can't find object of li or btn!");
			return;
		}

		_this.Len = _this.Li.length;


		_this.n = 0;
		_this.old = 0;
		_this.events();

		if(_this.opts.autoPlay){
			let timer = setInterval(()=>{
				_this.n = ++_this.n%_this.Len;
				_this.move();

			},_this.opts.autoTime);

			_this.query.hover(()=>{
				clearInterval(timer);
			},()=>{
				timer = setInterval(()=>{
					_this.n = ++_this.n%_this.Len;
					_this.move();

				},_this.opts.autoTime);
			});
		}

	},

	events: function(){
		let _this = this;
		let $query = _this.query;
		let opts = _this.opts;
		let $prev = _this.prev = $query.find(opts.prevTag);
		let $next = _this.next = $query.find(opts.nextTag);
		let $btn = _this.btn;

		if($prev.length<=0 || $next.length <=0){
			throw new Error("can't find the object of prev or next!");
			return;
		} 

		$query.hover(()=>{
			$prev.show();
			$next.show();
		},()=>{
			$prev.hide();
			$next.hide();
		});

		$next.on('click.next', ()=>{
			_this.n = ++_this.n%_this.Len;
			
			_this.move();
		});

		$prev.on('click.prev', ()=>{
			_this.n = --_this.n%_this.Len;
			
			_this.move();
		});

		$btn.each((i,el)=>{
			$(el).on('click.btn', ()=>{
				_this.n = i;
				_this.move();
			});
		});


	},

	move: function(){
		let _this = this;
		let opts = _this.opts;
		let $query = _this.query;
		let $Li = _this.Li;
		let $btn = _this.btn;

		$Li.eq(_this.n).css({opacity: 1});
		$Li.eq(_this.old).animate({opacity:0},500, ()=>{
			$Li.eq(_this.old).removeClass(opts.LiClass);
			$Li.eq(_this.n).addClass(opts.LiClass);
			$btn.eq(_this.old).removeClass(opts.BtnClass);
			$btn.eq(_this.n).addClass(opts.BtnClass);
			_this.old = _this.n;
		});

		
		

	}
}

banner.fn.init.prototype = banner.prototype;