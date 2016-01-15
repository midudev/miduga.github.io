$script.ready( 'jquery', function() {

/* dynamo plugin */
(function($){$.fn.dynamo=function(options){return this.each(function(i,v){options=options||{};var v=$(v);if(v.data("initialized")=="true")return;var delay=options.delay||parseInt(v.data("delay"))||3e3;var speed=options.speed||parseInt(v.data("speed"))||350;var pause=options.pause||v.data("pause")||false;var lines=options.lines||v.data("lines").split(v.data("delimiter")||",");var callback=options.callback||v.data("callback")||function(){};v.html($("<span></span>").text(v.text())).data("initialized","true");var max=v.find("span:eq(0)").width();for(k in lines){var span=$("<span></span>").text(lines[k]);v.append(span);max=Math.max(max,span.width())}v.find("span").each(function(i,ele){s=$(ele).remove();d=$("<div></div>").text(s.text());if(!i){d.data("trigger","true")}d.width(max);v.append(d)});var height=v.find(">:first-child").height();v.width(max).height(height).css({display:"inline-block",position:"relative",overflow:"hidden","vertical-align":"bottom","text-align":"left"});if(v.data("center"))v.css("text-align","center");var transition=function(){v.dynamo_trigger({speed:speed,callback:callback})};if(!pause){setInterval(transition,delay)}})};$.fn.dynamo_trigger=function(options){return this.each(function(i,v){options=options||{};var speed=options.speed||$(v).data("speed")||350;var callback=options.callback||$(v).data("callback")||function(){};$(v).find("div:first").slideUp(speed,function(){$(v).append($(this).show());if($(v).find("div:first").data("trigger")=="true")eval(callback).call()})})};$(".dynamo").dynamo()})(jQuery);
/* jquery unveil plugin */
;(function($){$.fn.unveil=function(threshold){var $w=$(window),th=threshold||0,retina=window.devicePixelRatio>1,attrib=retina?"data-src-retina":"data-src",images=this,loaded,inview,source;this.one("unveil",function(){source=this.getAttribute(attrib);source=source||this.getAttribute("data-src");if(source)this.setAttribute("src",source);});function unveil(){inview=images.filter(function(){var $e=$(this),wt=$w.scrollTop(),wb=wt+$w.height(),et=$e.offset().top,eb=et+$e.height();return eb>=wt-th&&et<=wb+th;});loaded=inview.trigger("unveil");images=images.not(loaded);}$w.scroll(unveil);$w.resize(unveil);unveil();return this;};})(window.jQuery||window.Zepto);

	$( '#dynamo' ).dynamo({
		speed: 200,
    	delay: 2000
    });

	$(".proyecto img").unveil();

	$('a[href^="#"]').bind( 'click.smoothscroll', function  ( e)
	{

	    var target = this.hash;
	    var $target = $( target );

	    if ( $target.offset() != null )
	    {
	    	e.preventDefault();
		    $('html, body').stop().animate({
		        'scrollTop': $target.offset().top
		    }, 500, 'swing', function () {
		        window.location.hash = target;
		    });
	    }


	});

	$( document.getElementById( 'botonEnviarFormulario' ) ).on( 'click', function(e )
	{
		e.preventDefault();

		var _campoNombre 	= document.getElementById( 'campoNombre' ),
		  _campoMail = document.getElementById( 'campoMail' ),
			_campoSpam 		= document.getElementById( 'campoSpam' ),
			_campoMensaje 	= document.getElementById( 'campoMensaje' );

		var params = {
			nombre: _campoNombre.value,
			mail: _campoSpam.value,
			spam: _campoMail.value,
			mensaje: _campoMensaje.value
		};

		var formularioOk = true;

		var revisarCampoObligatiorio = function( valor, campo )
		{
			if ( valor == "" )
			{
				campo.className = 'campoObligatorio';
				formularioOk = false;
			}
			else
			{
				campo.className = '';
			}
		};

		var revisarCampoMail = function( mail, campo )
		{
			var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

			if ( !filter.test( mail ) | mail == "" )
			{
				campo.className = 'campoObligatorio';
				formularioOk = false;
				return false;
			}
			else
			{
				campo.className = '';
				return true;
			}
		};

		revisarCampoObligatiorio( params.nombre, _campoNombre );
		revisarCampoMail( params.mail, _campoMail );
		revisarCampoObligatiorio( params.mensaje, _campoMensaje );

		if ( formularioOk == false )
		{
			return false;
		}
		else
		{
			$.post( '../php/enviarMail.php', params, function( data )
			{
				if ( data == "enviado" )
				{
					_campoNombre.value = '';
					_campoMail.value = '';
					_campoMensaje.value = '';

					$( document.getElementById( 'formularioEnviado' ) ).fadeIn( 'slow' );
				}
				else
				{
					$( document.getElementById( 'formularioError' ) ).fadeIn( 'slow' );
				}
			});
		}
	});

	var fading = function( $element, opacity ) {
		$element.stop().animate({ opacity: opacity}, 'fast' )
	}

	$( window ).on( 'scroll', function()
	{
		var centroScroll = $( window ).height() / 2;

		if ( $( window ).scrollTop() < 50 )
		{
			fading( $( 'section' ), 0.2 )
			fading( $( '#quienSoy' ), 1 )
			return false
		}

		$( 'section' ).each( function()
		{
			var $this = $( this ),
				seccionTop = $this.offset().top - $( window ).scrollTop(),
				seccionTopPasado = seccionTop + $this.height()

			if ( seccionTop > centroScroll )
				fading( $this, 0.2 )
			else if ( seccionTopPasado < centroScroll )
				fading( $this, 0.2 )
			else
				fading( $this, 1 )
		})

	});

});