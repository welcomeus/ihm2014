/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function(k){k.transit={version:"0.9.9",propertyMap:{marginLeft:"margin",marginRight:"margin",marginBottom:"margin",marginTop:"margin",paddingLeft:"padding",paddingRight:"padding",paddingBottom:"padding",paddingTop:"padding"},enabled:true,useTransitionEnd:false};var d=document.createElement("div");var q={};function b(v){if(v in d.style){return v}var u=["Moz","Webkit","O","ms"];var r=v.charAt(0).toUpperCase()+v.substr(1);if(v in d.style){return v}for(var t=0;t<u.length;++t){var s=u[t]+r;if(s in d.style){return s}}}function e(){d.style[q.transform]="";d.style[q.transform]="rotateY(90deg)";return d.style[q.transform]!==""}var a=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;q.transition=b("transition");q.transitionDelay=b("transitionDelay");q.transform=b("transform");q.transformOrigin=b("transformOrigin");q.transform3d=e();var i={transition:"transitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",WebkitTransition:"webkitTransitionEnd",msTransition:"MSTransitionEnd"};var f=q.transitionEnd=i[q.transition]||null;for(var p in q){if(q.hasOwnProperty(p)&&typeof k.support[p]==="undefined"){k.support[p]=q[p]}}d=null;k.cssEase={_default:"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};k.cssHooks["transit:transform"]={get:function(r){return k(r).data("transform")||new j()},set:function(s,r){var t=r;if(!(t instanceof j)){t=new j(t)}if(q.transform==="WebkitTransform"&&!a){s.style[q.transform]=t.toString(true)}else{s.style[q.transform]=t.toString()}k(s).data("transform",t)}};k.cssHooks.transform={set:k.cssHooks["transit:transform"].set};if(k.fn.jquery<"1.8"){k.cssHooks.transformOrigin={get:function(r){return r.style[q.transformOrigin]},set:function(r,s){r.style[q.transformOrigin]=s}};k.cssHooks.transition={get:function(r){return r.style[q.transition]},set:function(r,s){r.style[q.transition]=s}}}n("scale");n("translate");n("rotate");n("rotateX");n("rotateY");n("rotate3d");n("perspective");n("skewX");n("skewY");n("x",true);n("y",true);function j(r){if(typeof r==="string"){this.parse(r)}return this}j.prototype={setFromString:function(t,s){var r=(typeof s==="string")?s.split(","):(s.constructor===Array)?s:[s];r.unshift(t);j.prototype.set.apply(this,r)},set:function(s){var r=Array.prototype.slice.apply(arguments,[1]);if(this.setter[s]){this.setter[s].apply(this,r)}else{this[s]=r.join(",")}},get:function(r){if(this.getter[r]){return this.getter[r].apply(this)}else{return this[r]||0}},setter:{rotate:function(r){this.rotate=o(r,"deg")},rotateX:function(r){this.rotateX=o(r,"deg")},rotateY:function(r){this.rotateY=o(r,"deg")},scale:function(r,s){if(s===undefined){s=r}this.scale=r+","+s},skewX:function(r){this.skewX=o(r,"deg")},skewY:function(r){this.skewY=o(r,"deg")},perspective:function(r){this.perspective=o(r,"px")},x:function(r){this.set("translate",r,null)},y:function(r){this.set("translate",null,r)},translate:function(r,s){if(this._translateX===undefined){this._translateX=0}if(this._translateY===undefined){this._translateY=0}if(r!==null&&r!==undefined){this._translateX=o(r,"px")}if(s!==null&&s!==undefined){this._translateY=o(s,"px")}this.translate=this._translateX+","+this._translateY}},getter:{x:function(){return this._translateX||0},y:function(){return this._translateY||0},scale:function(){var r=(this.scale||"1,1").split(",");if(r[0]){r[0]=parseFloat(r[0])}if(r[1]){r[1]=parseFloat(r[1])}return(r[0]===r[1])?r[0]:r},rotate3d:function(){var t=(this.rotate3d||"0,0,0,0deg").split(",");for(var r=0;r<=3;++r){if(t[r]){t[r]=parseFloat(t[r])}}if(t[3]){t[3]=o(t[3],"deg")}return t}},parse:function(s){var r=this;s.replace(/([a-zA-Z0-9]+)\((.*?)\)/g,function(t,v,u){r.setFromString(v,u)})},toString:function(t){var s=[];for(var r in this){if(this.hasOwnProperty(r)){if((!q.transform3d)&&((r==="rotateX")||(r==="rotateY")||(r==="perspective")||(r==="transformOrigin"))){continue}if(r[0]!=="_"){if(t&&(r==="scale")){s.push(r+"3d("+this[r]+",1)")}else{if(t&&(r==="translate")){s.push(r+"3d("+this[r]+",0)")}else{s.push(r+"("+this[r]+")")}}}}}return s.join(" ")}};function m(s,r,t){if(r===true){s.queue(t)}else{if(r){s.queue(r,t)}else{t()}}}function h(s){var r=[];k.each(s,function(t){t=k.camelCase(t);t=k.transit.propertyMap[t]||k.cssProps[t]||t;t=c(t);if(k.inArray(t,r)===-1){r.push(t)}});return r}function g(s,v,x,r){var t=h(s);if(k.cssEase[x]){x=k.cssEase[x]}var w=""+l(v)+" "+x;if(parseInt(r,10)>0){w+=" "+l(r)}var u=[];k.each(t,function(z,y){u.push(y+" "+w)});return u.join(", ")}k.fn.transition=k.fn.transit=function(z,s,y,C){var D=this;var u=0;var w=true;if(typeof s==="function"){C=s;s=undefined}if(typeof y==="function"){C=y;y=undefined}if(typeof z.easing!=="undefined"){y=z.easing;delete z.easing}if(typeof z.duration!=="undefined"){s=z.duration;delete z.duration}if(typeof z.complete!=="undefined"){C=z.complete;delete z.complete}if(typeof z.queue!=="undefined"){w=z.queue;delete z.queue}if(typeof z.delay!=="undefined"){u=z.delay;delete z.delay}if(typeof s==="undefined"){s=k.fx.speeds._default}if(typeof y==="undefined"){y=k.cssEase._default}s=l(s);var E=g(z,s,y,u);var B=k.transit.enabled&&q.transition;var t=B?(parseInt(s,10)+parseInt(u,10)):0;if(t===0){var A=function(F){D.css(z);if(C){C.apply(D)}if(F){F()}};m(D,w,A);return D}var x={};var r=function(H){var G=false;var F=function(){if(G){D.unbind(f,F)}if(t>0){D.each(function(){this.style[q.transition]=(x[this]||null)})}if(typeof C==="function"){C.apply(D)}if(typeof H==="function"){H()}};if((t>0)&&(f)&&(k.transit.useTransitionEnd)){G=true;D.bind(f,F)}else{window.setTimeout(F,t)}D.each(function(){if(t>0){this.style[q.transition]=E}k(this).css(z)})};var v=function(F){this.offsetWidth;r(F)};m(D,w,v);return this};function n(s,r){if(!r){k.cssNumber[s]=true}k.transit.propertyMap[s]=q.transform;k.cssHooks[s]={get:function(v){var u=k(v).css("transit:transform");return u.get(s)},set:function(v,w){var u=k(v).css("transit:transform");u.setFromString(s,w);k(v).css({"transit:transform":u})}}}function c(r){return r.replace(/([A-Z])/g,function(s){return"-"+s.toLowerCase()})}function o(s,r){if((typeof s==="string")&&(!s.match(/^[\-0-9\.]+$/))){return s}else{return""+s+r}}function l(s){var r=s;if(k.fx.speeds[r]){r=k.fx.speeds[r]}return o(r,"ms")}k.transit.getTransitionValue=g})(jQuery);


// welcome.us
(function() {
  var afterAltYearPreviewSelect, backButtonForPanel, bindFormKeyup, checkTouchDevice, completeFormReset, disableDownloadLink, enableDownloadLink, getTrimmedValue, hideIntroPanel, initAltYearLinks, initAltYearPreview, initBackButton, initDownloadLinks, initHideIntroPanel, initShowHideIntro, initYearFormField, loadBgImg, registerGAevent, showDecadePreview, showErrorMessage, showEstPreview, showIntroPanel, showRightSubpanel, showYearForm, uncoverBgImg, updateDownloadLink, useJqAnimate, validateYearInput, validateYearRange, valueIsInteger, yearFieldFocus;

  $(function() {
    loadBgImg();
    useJqAnimate();
    initShowHideIntro();
    initDownloadLinks();
    return checkTouchDevice();
  });

  useJqAnimate = function() {
    if (!$.support.transition) {
      return $.fn.transition = $.fn.animate;
    }
  };

  checkTouchDevice = function() {
    if (Muse.Redirect.Touch) {
      return $('html').addClass('touch');
    }
  };

  initShowHideIntro = function() {
    return setTimeout((function() {
      return showIntroPanel();
    }), 500);
  };

  initYearFormField = function() {
    yearFieldFocus();
    return bindFormKeyup();
  };

  showIntroPanel = function() {
    return $("#cu_intro").css({
      opacity: 0,
      display: 'block'
    }).transition({
      opacity: 1
    }, function() {
      return initHideIntroPanel();
    });
  };

  initHideIntroPanel = function() {
    return setTimeout((function() {
      return hideIntroPanel();
    }), 1500);
  };

  hideIntroPanel = function() {
    return $("#cu_intro").transition({
      opacity: 0
    }, function() {
      $(this).hide();
      return showYearForm();
    });
  };

  showYearForm = function() {
    return $('#cu_form_wrap').css({
      opacity: 0,
      display: 'block',
      y: -25
    }).transition({
      opacity: 1,
      y: 0
    }, function() {
      $(this).addClass('visible').attr('style', '');
      initAltYearLinks();
      initYearFormField();
      return initBackButton();
    });
  };

  showRightSubpanel = function(panel) {
    var $hidePanel, $showPanel;
    if (panel === 'share') {
      $showPanel = $('#cu_form_share');
      $hidePanel = $('#cu_form_info');
    } else {
      $showPanel = $('#cu_form_info');
      $hidePanel = $('#cu_form_share');
    }
    if (!$showPanel.is(":visible")) {
      $hidePanel.hide();
      backButtonForPanel(panel);
      return $showPanel.css({
        opacity: .5,
        display: 'block',
        x: 25
      }).transition({
        opacity: 1,
        x: 0
      });
    }
  };

  initBackButton = function() {
    return $('#cu_reset_form').on('click', function() {
      showRightSubpanel('info');
      return completeFormReset();
    });
  };

  backButtonForPanel = function(panel) {
    if (panel === 'share') {
      return $('#cu_reset_form').show();
    } else {
      return $('#cu_reset_form').hide();
    }
  };

  initAltYearLinks = function() {
    return initAltYearPreview();
  };

  initAltYearPreview = function() {
    return $('#alt_year_links').on('click', 'span', function() {
      var content, urlExt;
      $('#cu_year_input').hide();
      if ($(this).hasClass('est')) {
        showEstPreview();
      } else {
        content = $(this).attr('data-attr-text');
        showDecadePreview(content);
      }
      urlExt = $(this).attr('data-url-ext');
      return afterAltYearPreviewSelect(urlExt);
    });
  };

  afterAltYearPreviewSelect = function(url) {
    showRightSubpanel('share');
    updateDownloadLink(true, url);
    return showErrorMessage(false);
  };

  showDecadePreview = function(text) {
    $('#cu_est').show();
    $('#cu_year_input_wrap').removeClass('preview_est');
    return $('#cu_alt_entry').text(text).show();
  };

  showEstPreview = function() {
    $('#cu_est').hide();
    $('#cu_year_input_wrap').addClass('preview_est');
    return $('#cu_alt_entry').text('EST.').show();
  };

  completeFormReset = function() {
    $('#cu_est').show();
    $('#cu_year_input_wrap').removeClass('preview_est');
    $('#cu_year_input').show();
    $('#cu_alt_entry').hide();
    yearFieldFocus();
    return showErrorMessage(false);
  };

  bindFormKeyup = function() {
    var $yearInput;
    $yearInput = $('#cu_year_input');
    return $yearInput.on('keyup', function(e) {
      var trimmedVal;
      trimmedVal = $.trim($yearInput.val());
      $yearInput.val(trimmedVal);
      if (validateYearInput(trimmedVal)) {
        return showRightSubpanel('share');
      }
    });
  };

  yearFieldFocus = function() {
    if (!$('html').hasClass('touch')) {
      return $('#cu_year_input').val('').focus();
    }
  };

  validateYearInput = function(value) {
    var error, isValid, validDateRange;
    isValid = false;
    if (valueIsInteger(value)) {
      isValid = validDateRange = validateYearRange(value);
      error = value.length === 4 ? !isValid : false;
      showErrorMessage(error);
    } else {
      showErrorMessage(true);
    }
    updateDownloadLink(isValid, value);
    return isValid;
  };

  validateYearRange = function(int) {
    var maxYear, minYear;
    minYear = 1000;
    maxYear = new Date().getFullYear();
    return int >= minYear && int <= maxYear;
  };

  valueIsInteger = function(value) {
    return !isNaN(value) && parseInt(value) && parseInt(value) > 0;
  };

  getTrimmedValue = function(fieldId) {
    var $field, trimmedValue;
    $field = $("#" + fieldId);
    trimmedValue = $.trim($field.val());
    return trimmedValue;
  };

  showErrorMessage = function(isError) {
    var $hideElem, $showElem;
    if (isError) {
      $showElem = $('#cu_form_error_msg');
      $hideElem = $('#cu_form_footer');
    } else {
      $showElem = $('#cu_form_footer');
      $hideElem = $('#cu_form_error_msg');
    }
    if (!$showElem.is(":visible")) {
      $hideElem.hide();
      return $showElem.css({
        bottom: 0,
        opacity: 0,
        display: 'block'
      }).transition({
        bottom: 15,
        opacity: 1
      });
    }
  };

  initDownloadLinks = function() {
    return $('#cu_form_share').on('click', 'a.cu_dwnld', function(e) {
      var gaEventName;
      if ($(this).hasClass('enabled')) {
        gaEventName = $(this).attr('data-ga-event');
        return registerGAevent(gaEventName);
      } else {
        e.preventDefault();
        showErrorMessage(true);
        return yearFieldFocus();
      }
    });
  };

  updateDownloadLink = function(valid, year) {
    if (valid) {
      return enableDownloadLink(year);
    } else {
      return disableDownloadLink();
    }
  };

  enableDownloadLink = function(year) {
    var coverUrl, profileUrl;
    coverUrl = "http://welcome.us/cover/cover_" + year + ".jpg";
    profileUrl = "http://welcome.us/profile/profile_" + year + ".jpg";
    $('#cu_dwnld_cover').attr('href', coverUrl).addClass('enabled');
    return $('#cu_dwnld_profile').attr('href', profileUrl).addClass('enabled');
  };

  disableDownloadLink = function() {
    return $('#cu_form_share .cu_dwnld').removeClass('enabled').attr('href', '');
  };

  registerGAevent = function(eventName) {
    return ga('send', 'event', 'button', 'click', eventName);
  };

  loadBgImg = function() {
    var $imgHolder, $self, imgSrc;
    $self = $('#cu_background');
    imgSrc = $self.attr('data-img-src');
    $imgHolder = $("<img />");
    $imgHolder.one("load", function() {
      $self.css({
        'background-image': "url(" + imgSrc + ")"
      }).attr({
        'data-loaded': 'loaded'
      }).removeAttr('data-img-src');
      return uncoverBgImg();
    });
    return $imgHolder.error(function() {
      return $self.attr({
        'data-loaded': 'error'
      });
    }).attr('src', imgSrc);
  };

  uncoverBgImg = function() {
    return $('#cu_background span').transition({
      opacity: .8
    });
  };

}).call(this);
(function(d){
  var js, id = 'facebook-jssdk';
  if (d.getElementById(id))
    return;
  js = d.createElement('script');
  js.id = id;
  js.async = true;
  js.src = '//connect.facebook.net/en_US/all.js';
  d.getElementsByTagName('head')[0].appendChild(js);
}(document));

window.fbAsyncInit=function(){
  FB.init({appId:'538632239579703',cookie:true,status:true});
};

function share_image(img_url, text) {
//Check to see if the user has authenticated the App.
    FB.getLoginStatus(function(response) {

        if (response.status === 'connected') {
            //If you want the user's Facebook ID or their access token, this is how you get them.
            var uid = response.authResponse.userID;
            var access_token = response.authResponse.accessToken;

            do_api_share(access_token, img_url, text);

        } else {

            //If they haven't, call the FB.login method
            FB.login(function(response) {

                if (response.authResponse) {

                    //If you want the user's Facebook ID or their access token, this is how you get them.
                    var uid = response.authResponse.userID;
                    var access_token = response.authResponse.accessToken;

                    do_api_share(access_token, img_url, text);
                } else {
                    alert("You must install the application to share your greeting.");
                }
            }, {scope: 'publish_stream'});
        }
    });
}


function do_api_share(at, img_url, text) {

    FB.api("/me/photos", 'post', { message: text, url: img_url}, function(response) {

        console.log(response);

    });
}