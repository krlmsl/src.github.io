$.fn.extend({
	printElement: function() {
		var frameName = 'printIframe';
		var doc = window.frames[frameName];
		if (!doc) {
			$('<iframe>').hide().attr('name', frameName).appendTo(document.body);
			doc = window.frames[frameName];
		}
		doc.document.body.innerHTML = this.html();
		doc.window.print();
		return this;
	}
});

$.fn.tabs = function() {
	var selector = this;

	this.each(function() {
		var obj = $(this); 
		$(obj.attr('href')).hide();
		$(obj).click(function() {
			$(selector).removeClass('selected');
			
			$(selector).each(function(i, element) {
				$($(element).attr('href')).hide();
			});
			
			$(this).addClass('selected');
			$($(this).attr('href')).fadeIn();
			return false;
		});
	});

	$(this).show();
	$(this).first().click();
	if(location.hash!='' && $('a[href="' + location.hash + '"]').length)
		$('a[href="' + location.hash + '"]').click();	
};


 jQuery.validator.setDefaults({
  errorClass: 'invalid',
	successClass: 'valid',
	focusInvalid: false,
	errorElement: 'span',
	errorPlacement: function (error, element) {
    if ( element.parent().hasClass('jq-checkbox') ||  element.parent().hasClass('jq-radio')) {
      element.closest('label').after(error);
      
    } else if (element.parent().hasClass('jq-selectbox')) {
      element.closest('.jq-selectbox').after(error);
    } else {
      error.insertAfter(element);
    }
  },
  highlight: function(element, errorClass, validClass) {
    if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().addClass(errorClass).removeClass(validClass);
    } else {
    	$(element).addClass(errorClass).removeClass(validClass);
    }
  },
  unhighlight: function(element, errorClass, validClass) {
  	if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().removeClass(errorClass).addClass(validClass);
    } else {
    	$(element).removeClass(errorClass).addClass(validClass);
    }
  }
});
//дефолтные сообщения, предупреждения
jQuery.extend(jQuery.validator.messages, {
  required: "Обязательное поле",
  email: "Некорректный email адрес",
  url: "Некорректный URL",
  number: "Некорректный номер",
  digits: "Это поле поддерживает только числа",
  equalTo: "Поля не совпадают",
  maxlength: jQuery.validator.format('Максимальная длина поля {0} символа(ов)'),
  minlength: jQuery.validator.format('Минимальная длина поля {0} символа(ов)'),
  require_from_group: jQuery.validator.format('Отметьте миниммум {0} из этих полей')
});
//кастомные методы валидатора
jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-zA-ZА-Яа-я\s]+$/i.test(value);
}, "Только буквы");

jQuery.validator.addMethod("telephone", function(value, element) {
  return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/i.test(value);
}, "Некорректный формат"); 




jQuery(document).ready(function($){

	if (window.devicePixelRatio == 1) {
		$('html').addClass('no-retina');
	}


	$('.h-lang-toggler').on('click',function(e){
		e.preventDefault();
		$(this).toggleClass('opened');
		$(this).next().toggleClass('opened')
	});

	$.datepicker.setDefaults( $.datepicker.regional[ "ru" ] );
	$('#news-archieve-input').datepicker({
		dateFormat: "dd.mm.yy",
		prevText: "вперед",
		nextText: "назад",
		dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
		monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
		firstDay: 1,
		maxDate: 0,
	});
	

	if ( $('.ya-share2').length ) {
		var shareScript = document.createElement('script');
		shareScript.src = '//yastatic.net/share2/share.js';
		document.body.appendChild(shareScript);
	}


	$('.slick-related').slick({
		slidesToShow: 3,
		infinite: false,
		responsive: [
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					arrows: false,
					dots: true
				}
			}
		]
	});


	$("#feedback-form").validate({
    rules: {
      f_fio: {
        required: true,
        lettersonly: true
      },
      f_mail: {
        required: true,
        email: true
      }
    },
    /*submitHandler: function(){
      //сабмит формы
    }*/
  });


  $(document).on('click','.mobile-search-toggler',function(e){
  	e.preventDefault();
  	$(this).toggleClass('opened');
  	$('.h-search').toggleClass('opened');
  })


	//функция для навешивания изображений фоном
	function backgrounded (selector) {
		$(selector).each(function(){
			var $this = $(this),
			$src = $this.find('.bg').attr('src');
			if($this.find('.bg').length) {
				$this.addClass('backgrounded').css('backgroundImage','url('+$src+')');
			}
		});
	}



	


	// $('.phone-mask').mask("+375 (99)-999-99-99");


	$('main table').wrap('<div class="responsive-table"></div>');


	



  function readURL(input) {
	  if (input.files && input.files[0]) {
	    var reader = new FileReader();
	    reader.onload = function(e) {
	      $('.preview-avatar img').attr('src', e.target.result);
	    }
	    reader.readAsDataURL(input.files[0]);
	  }
	}


	//плавающие соц кнопки
	if ( $('.float-share').length) {

		$(window).on('scroll', function(){
			var windowOffset = $(window).scrollTop(),
					floatOffset = $('.node-float-space').offset().top,
					contentHeight = $('.node').height(),
					floatHeight = $('.float-share').height(),
					floatStop = floatOffset + contentHeight - floatHeight - 30;

			if (windowOffset > floatOffset && windowOffset < floatStop) {
				$('.float-share').addClass('float').removeClass('flip-bottom');
			} else {
				$('.float-share').removeClass('float').addClass('flip-bottom');

				if (windowOffset < floatStop) {
	        $('.float-share').removeClass('flip-bottom');
	    	}
			}
		});
	}//if end


	

	

	//галлерея для фотографий
  /* $('body').lightGallery({
  	selector: '.lightgallery'
	}); */

	



	
	
	


  if(matchMedia) {
		var screen992 = window.matchMedia('(max-width:992px)');
		screen992.addListener(changes);
		changes2(screen992);

		var screen880 = window.matchMedia('(max-width:880px)');
		screen880.addListener(changes);
		changes(screen880);
	}
	function changes(screen880) {
		if(screen880.matches) {
			
		} else {
			
		}
	}

	function changes2(screen992) {
		if(screen992.matches) {
		} else {
		}
	}


	//Замена телефонов и email ссылками
	$('.phone-link, .tel').each(function(){
		var phone = $(this).text().replace(/[^+0-9]/g, '');
		$(this).wrapInner('<a href="tel:' + phone + '"></a>');
	});
	$('.mail-link').each(function(){
		var mail = $(this).text().replace(/\W\@/g, '');
		$(this).wrapInner('<a href="mailto:' + mail + '"></a>');
	});



	
	



	



	//mfp для видео
  $('.mfp-video').magnificPopup({
    type: 'iframe',
    mainClass: 'magnific-video',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
	});
	

	$(document).on('click','.mfp-custom-close',function(e){
		e.preventDefault();
		$.magnificPopup.close();
	});
   

	
	//инициализация MFP popup для форм
	$(document).on('click','.ajax-mfp',function(){
		var a = $(this);
		$.magnificPopup.open({
			items: { src: a.attr('data-href') },
			type: 'ajax',    
			overflowY: 'scroll',
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in',
			ajax: {
				tError: 'Ошибка. <a href="%url%">Контент</a> не может быть загружен',
			},
			callbacks: {
				open: function () {
					setTimeout(function(){
						$('.mfp-wrap').addClass('not_delay');
						$('.white-popup').addClass('not_delay');
					},700);
				}
		  }
		});
		return false;
	});


	//стилизация элементов форм
  $(function() {
		$('input[type="checkbox"], input[type="radio"], input[type="file"], select').not('.not-styler').styler({
			singleSelectzIndex: '1',
		});
	});


	$(function() {
    $.fn.scrollToTop = function() {
	    // $(this).hide().removeAttr("href");
	    if ($(window).scrollTop() >= "350") $(this).addClass('active')
	    var scrollDiv = $(this);
	    $(window).scroll(function() {
	     if ($(window).scrollTop() <= "350") $(scrollDiv).removeClass('active')
	     else $(scrollDiv).addClass('active')
	    });
	    $(this).click(function() {
	     $("html, body").animate({scrollTop: 0}, "slow")
	    })
    }
  });
	$(function() {
	 $(".scroll-top").scrollToTop();
	});

	$('.pr-tabs a').tabs();
	$('.main-hot-tabs a').tabs();

	$(document).on('click','.products-list-style a',function(e){
		e.preventDefault();
		var $style = $(this).data('style');
		if ( $(this).hasClass('active') ) {return}
		$('.products-list-style a').removeClass('active');
		localStorage.setItem('catalogStyle',$style);
		$('.products-list').attr('data-style',$style);
		$(this).addClass('active');
	});

	if (localStorage.getItem('catalogStyle')) {
		var $style = localStorage.getItem('catalogStyle');
		$('.products-list').attr('data-style',$style);
		$('.products-list-style a').removeClass('active');
		$('.products-list-style a[data-style="'+$style+'"]').addClass('active');
	}

	$(document).on('click','.drop-filter-toggler',function(e){
		e.preventDefault();
		$('.drop-filter-toggler').not($(this)).parent().removeClass('opened');
		$(this).parent('.drop-filter').toggleClass('opened');
	});


});//ready close





$(window).on('load',function(){

	

});