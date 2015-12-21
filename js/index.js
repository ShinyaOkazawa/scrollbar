(function($){
	var targetValue = 0;
	var currentValue = 0;
	var $thumb;
	var $scroller;
	var $content;
	var min;
	var max;
	$(document).ready(function(){
		$thumb = $('#thumb');
		$content = $('#content');
		$scroller = $('#scroller');
		//スクロールバーの可動範囲
		min = 0;
		max = $('#scroller').height() - $('#thumb').height();
		contentArea = $('#content').height() - $('#container').height();

		$('#thumb').mousedown(mouseDownHandler);
		setInterval(tick, 1000 / 60);
	});

	function tick(){
		currentValue += (targetValue - currentValue) * 0.1;
		$content.css('top', -1 * currentValue);
	}

	function mouseDownHandler(e){
		$(document).on('mousemove', mouseMoveHandler);
		$(document).on('mouseup', mouseUpHandler);
		return false;
	}

	function mouseMoveHandler(e){
		//つまみの制御
		var thumbY = (e.pageY - $('#container').position().top) - $('#thumb').height() / 2;
		//つまみの座標を可動範囲に収める
		thumbY = Math.max(min, Math.min(max, thumbY));
		$('#thumb').css('top', thumbY); //適用
		//スクロールバーの値を反映
		var rate = thumbY / max;
		targetValue = contentArea * rate;
	}

	function mouseUpHandler(e){
		$(document).off('mousemove', mouseMoveHandler);
		$(document).off('mouseup', mouseUpHandler);
	}
})(jQuery);
//1.つまみにmousedownイベントをハンドリング
//2.mousedownイベントで、mousemoveとmouseupを登録
//3.mousemoveでスクロールバーの移動制御
	//つまみの位置をマウスカーソル(event.pageY)の位置と同期。つまみの可動範囲に収まるように注意
	//スクロールバーのつまみ位置が、スクローラーの可動範囲のうちの何%の位置にあるかを計算
	//コンテンツと可視領域の差分がスクロールさせたい移動量のため、この移動量に対してスクロールバーの位置で求めた値を適用

//4.mouseupで2で登録したイベントを解除