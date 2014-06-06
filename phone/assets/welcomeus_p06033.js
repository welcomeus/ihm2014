(function(e){e.fn.fastClick=function(t){return e(this).each(function(){e.FastButton(e(this)[0],t)})};e.FastButton=function(t,n){var r,i;var s=function(){e(t).unbind("touchend");e("body").unbind("touchmove.fastClick")};var o=function(t){t.stopPropagation();s();n.call(this,t);if(t.type==="touchend"){e.clickbuster.preventGhostClick(r,i)}};var u=function(e){if(Math.abs(e.originalEvent.touches[0].clientX-r)>10||Math.abs(e.originalEvent.touches[0].clientY-i)>10){s()}};var a=function(n){n.stopPropagation();e(t).bind("touchend",o);e("body").bind("touchmove.fastClick",u);r=n.originalEvent.touches[0].clientX;i=n.originalEvent.touches[0].clientY};e(t).bind({touchstart:a,click:o})};e.clickbuster={coordinates:[],preventGhostClick:function(t,n){e.clickbuster.coordinates.push(t,n);window.setTimeout(e.clickbuster.pop,2500)},pop:function(){e.clickbuster.coordinates.splice(0,2)},onClick:function(t){var n,r,i;for(i=0;i<e.clickbuster.coordinates.length;i+=2){n=e.clickbuster.coordinates[i];r=e.clickbuster.coordinates[i+1];if(Math.abs(t.clientX-n)<25&&Math.abs(t.clientY-r)<25){t.stopPropagation();t.preventDefault()}}}};e(function(){if(document.addEventListener){document.addEventListener("click",e.clickbuster.onClick,true)}else if(document.attachEvent){document.attachEvent("onclick",e.clickbuster.onClick)}})})(jQuery);

function FastClick(e,t){"use strict";function r(e,t){return function(){return e.apply(t,arguments)}}var n;t=t||{};this.trackingClick=false;this.trackingClickStart=0;this.targetElement=null;this.touchStartX=0;this.touchStartY=0;this.lastTouchIdentifier=0;this.touchBoundary=t.touchBoundary||10;this.layer=e;this.tapDelay=t.tapDelay||200;if(FastClick.notNeeded(e)){return}var i=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"];var s=this;for(var o=0,u=i.length;o<u;o++){s[i[o]]=r(s[i[o]],s)}if(deviceIsAndroid){e.addEventListener("mouseover",this.onMouse,true);e.addEventListener("mousedown",this.onMouse,true);e.addEventListener("mouseup",this.onMouse,true)}e.addEventListener("click",this.onClick,true);e.addEventListener("touchstart",this.onTouchStart,false);e.addEventListener("touchmove",this.onTouchMove,false);e.addEventListener("touchend",this.onTouchEnd,false);e.addEventListener("touchcancel",this.onTouchCancel,false);if(!Event.prototype.stopImmediatePropagation){e.removeEventListener=function(t,n,r){var i=Node.prototype.removeEventListener;if(t==="click"){i.call(e,t,n.hijacked||n,r)}else{i.call(e,t,n,r)}};e.addEventListener=function(t,n,r){var i=Node.prototype.addEventListener;if(t==="click"){i.call(e,t,n.hijacked||(n.hijacked=function(e){if(!e.propagationStopped){n(e)}}),r)}else{i.call(e,t,n,r)}}}if(typeof e.onclick==="function"){n=e.onclick;e.addEventListener("click",function(e){n(e)},false);e.onclick=null}}var deviceIsAndroid=navigator.userAgent.indexOf("Android")>0;var deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent);var deviceIsIOS4=deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent);var deviceIsIOSWithBadTarget=deviceIsIOS&&/OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);var deviceIsBlackBerry10=navigator.userAgent.indexOf("BB10")>0;FastClick.prototype.needsClick=function(e){"use strict";switch(e.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(e.disabled){return true}break;case"input":if(deviceIsIOS&&e.type==="file"||e.disabled){return true}break;case"label":case"video":return true}return/\bneedsclick\b/.test(e.className)};FastClick.prototype.needsFocus=function(e){"use strict";switch(e.nodeName.toLowerCase()){case"textarea":return true;case"select":return!deviceIsAndroid;case"input":switch(e.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return false}return!e.disabled&&!e.readOnly;default:return/\bneedsfocus\b/.test(e.className)}};FastClick.prototype.sendClick=function(e,t){"use strict";var n,r;if(document.activeElement&&document.activeElement!==e){document.activeElement.blur()}r=t.changedTouches[0];n=document.createEvent("MouseEvents");n.initMouseEvent(this.determineEventType(e),true,true,window,1,r.screenX,r.screenY,r.clientX,r.clientY,false,false,false,false,0,null);n.forwardedTouchEvent=true;e.dispatchEvent(n)};FastClick.prototype.determineEventType=function(e){"use strict";if(deviceIsAndroid&&e.tagName.toLowerCase()==="select"){return"mousedown"}return"click"};FastClick.prototype.focus=function(e){"use strict";var t;if(deviceIsIOS&&e.setSelectionRange&&e.type.indexOf("date")!==0&&e.type!=="time"){t=e.value.length;e.setSelectionRange(t,t)}else{e.focus()}};FastClick.prototype.updateScrollParent=function(e){"use strict";var t,n;t=e.fastClickScrollParent;if(!t||!t.contains(e)){n=e;do{if(n.scrollHeight>n.offsetHeight){t=n;e.fastClickScrollParent=n;break}n=n.parentElement}while(n)}if(t){t.fastClickLastScrollTop=t.scrollTop}};FastClick.prototype.getTargetElementFromEventTarget=function(e){"use strict";if(e.nodeType===Node.TEXT_NODE){return e.parentNode}return e};FastClick.prototype.onTouchStart=function(e){"use strict";var t,n,r;if(e.targetTouches.length>1){return true}t=this.getTargetElementFromEventTarget(e.target);n=e.targetTouches[0];if(deviceIsIOS){r=window.getSelection();if(r.rangeCount&&!r.isCollapsed){return true}if(!deviceIsIOS4){if(n.identifier===this.lastTouchIdentifier){e.preventDefault();return false}this.lastTouchIdentifier=n.identifier;this.updateScrollParent(t)}}this.trackingClick=true;this.trackingClickStart=e.timeStamp;this.targetElement=t;this.touchStartX=n.pageX;this.touchStartY=n.pageY;if(e.timeStamp-this.lastClickTime<this.tapDelay){e.preventDefault()}return true};FastClick.prototype.touchHasMoved=function(e){"use strict";var t=e.changedTouches[0],n=this.touchBoundary;if(Math.abs(t.pageX-this.touchStartX)>n||Math.abs(t.pageY-this.touchStartY)>n){return true}return false};FastClick.prototype.onTouchMove=function(e){"use strict";if(!this.trackingClick){return true}if(this.targetElement!==this.getTargetElementFromEventTarget(e.target)||this.touchHasMoved(e)){this.trackingClick=false;this.targetElement=null}return true};FastClick.prototype.findControl=function(e){"use strict";if(e.control!==undefined){return e.control}if(e.htmlFor){return document.getElementById(e.htmlFor)}return e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")};FastClick.prototype.onTouchEnd=function(e){"use strict";var t,n,r,i,s,o=this.targetElement;if(!this.trackingClick){return true}if(e.timeStamp-this.lastClickTime<this.tapDelay){this.cancelNextClick=true;return true}this.cancelNextClick=false;this.lastClickTime=e.timeStamp;n=this.trackingClickStart;this.trackingClick=false;this.trackingClickStart=0;if(deviceIsIOSWithBadTarget){s=e.changedTouches[0];o=document.elementFromPoint(s.pageX-window.pageXOffset,s.pageY-window.pageYOffset)||o;o.fastClickScrollParent=this.targetElement.fastClickScrollParent}r=o.tagName.toLowerCase();if(r==="label"){t=this.findControl(o);if(t){this.focus(o);if(deviceIsAndroid){return false}o=t}}else if(this.needsFocus(o)){if(e.timeStamp-n>100||deviceIsIOS&&window.top!==window&&r==="input"){this.targetElement=null;return false}this.focus(o);this.sendClick(o,e);if(!deviceIsIOS||r!=="select"){this.targetElement=null;e.preventDefault()}return false}if(deviceIsIOS&&!deviceIsIOS4){i=o.fastClickScrollParent;if(i&&i.fastClickLastScrollTop!==i.scrollTop){return true}}if(!this.needsClick(o)){e.preventDefault();this.sendClick(o,e)}return false};FastClick.prototype.onTouchCancel=function(){"use strict";this.trackingClick=false;this.targetElement=null};FastClick.prototype.onMouse=function(e){"use strict";if(!this.targetElement){return true}if(e.forwardedTouchEvent){return true}if(!e.cancelable){return true}if(!this.needsClick(this.targetElement)||this.cancelNextClick){if(e.stopImmediatePropagation){e.stopImmediatePropagation()}else{e.propagationStopped=true}e.stopPropagation();e.preventDefault();return false}return true};FastClick.prototype.onClick=function(e){"use strict";var t;if(this.trackingClick){this.targetElement=null;this.trackingClick=false;return true}if(e.target.type==="submit"&&e.detail===0){return true}t=this.onMouse(e);if(!t){this.targetElement=null}return t};FastClick.prototype.destroy=function(){"use strict";var e=this.layer;if(deviceIsAndroid){e.removeEventListener("mouseover",this.onMouse,true);e.removeEventListener("mousedown",this.onMouse,true);e.removeEventListener("mouseup",this.onMouse,true)}e.removeEventListener("click",this.onClick,true);e.removeEventListener("touchstart",this.onTouchStart,false);e.removeEventListener("touchmove",this.onTouchMove,false);e.removeEventListener("touchend",this.onTouchEnd,false);e.removeEventListener("touchcancel",this.onTouchCancel,false)};FastClick.notNeeded=function(e){"use strict";var t;var n;var r;if(typeof window.ontouchstart==="undefined"){return true}n=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(n){if(deviceIsAndroid){t=document.querySelector("meta[name=viewport]");if(t){if(t.content.indexOf("user-scalable=no")!==-1){return true}if(n>31&&document.documentElement.scrollWidth<=window.outerWidth){return true}}}else{return true}}if(deviceIsBlackBerry10){r=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);if(r[1]>=10&&r[2]>=3){t=document.querySelector("meta[name=viewport]");if(t){if(t.content.indexOf("user-scalable=no")!==-1){return true}if(document.documentElement.scrollWidth<=window.outerWidth){return true}}}}if(e.style.msTouchAction==="none"){return true}return false};FastClick.attach=function(e,t){"use strict";return new FastClick(e,t)};if(typeof define=="function"&&typeof define.amd=="object"&&define.amd){define(function(){"use strict";return FastClick})}else if(typeof module!=="undefined"&&module.exports){module.exports=FastClick.attach;module.exports.FastClick=FastClick}else{window.FastClick=FastClick};

// welcome.us
(function() {
  var bindFormKeyup, completeFormReset, disableDownloadLinks, enableDownloadLinks, getTrimmedValue, initAltYearLinks, initAltYearPreview, initDownloadLinks, initResetAltYearPreview, loadBgImg, registerGAevent, showDecadePreview, showErrorMessage, showEstPreview, uncoverBgImg, updateDownloadLink, updateYearInputField, validateYearInput, validateYearRange, valueIsInteger;

  $(function() {
    loadBgImg();
    bindFormKeyup();
    initDownloadLinks();
    initAltYearLinks();
    return FastClick.attach(document.body);
  });

  bindFormKeyup = function() {
    var $yearInput;
    $yearInput = $('#cu_year_input');
    return $yearInput.on('keyup', function(e) {
      var trimmedVal;
      trimmedVal = $.trim($yearInput.val());
      $yearInput.val(trimmedVal);
      return validateYearInput(trimmedVal);
    });
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
    if (!$showElem.hasClass('visible')) {
      $hideElem.removeClass('visible');
      return $showElem.addClass('visible');
    }
  };

  initDownloadLinks = function() {
    return $('#cu_download').on('click', 'a.cu_dwnld', function(e) {
      var gaEventName;
      if ($(this).hasClass('enabled')) {
        gaEventName = $(this).attr('data-ga-event');
        return registerGAevent(gaEventName);
      } else {
        e.preventDefault();
        return showErrorMessage(true);
      }
    });
  };

  updateDownloadLink = function(valid, year) {
    if (valid) {
      return enableDownloadLinks(year);
    } else {
      return disableDownloadLinks();
    }
  };

  enableDownloadLinks = function(year) {
    var coverUrl, profileUrl;
    coverUrl = "http://welcome.us/cover/cover_" + year + ".jpg";
    profileUrl = "http://welcome.us/profile/profile_" + year + ".jpg";
    updateYearInputField('valid');
    $('#cu_dwnld_cover').attr('href', coverUrl).addClass('enabled');
    $('#cu_publish_profile').addClass('enabled').click(function() {
      share_image(profileUrl, "Here's when my family and I were welcomed!");
      return false;
    });
    return $('#cu_dwnld_profile').attr('href', profileUrl).addClass('enabled');
  };

  disableDownloadLinks = function() {
    updateYearInputField(false);
    return $('#cu_download .cu_dwnld').removeClass('enabled').attr('href', '');
  };

  updateYearInputField = function(status) {
    if (status === 'valid') {
      return $('#cu_year_input').addClass('valid');
    } else {
      return $('#cu_year_input').removeClass('valid');
    }
  };

  initAltYearLinks = function() {
    initAltYearPreview();
    return initResetAltYearPreview();
  };

  initAltYearPreview = function() {
    return $('#cu_alt_year_links .alt-img').fastClick(function() {
      var content;
      $('#cu_year_input').hide();
      if ($(this).hasClass('est')) {
        showEstPreview();
      } else {
        content = $(this).attr('data-attr-text');
        showDecadePreview(content);
      }
      showErrorMessage(false);
      return updateDownloadLink(true, $(this).attr('data-url-ext'));
    });
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

  initResetAltYearPreview = function() {
    return $('#cu_reset').fastClick(function() {
      return completeFormReset();
    });
  };

  completeFormReset = function() {
    $('#cu_est').show();
    $('#cu_year_input_wrap').removeClass('preview_est');
    $('#cu_alt_entry').hide();
    $('#cu_year_input').val('').show();
    disableDownloadLinks();
    return showErrorMessage(false);
  };

  registerGAevent = function(eventName) {
    return ga('send', 'event', 'button', 'click', eventName);
  };

  loadBgImg = function() {
    var $imgHolder, $self, imgSrc;
    $self = $('#cu_home_container');
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
    return $('#cu_overlay').addClass('open');
  };

}).call(this);

function isDev() {
  return document.location.hostname != "welcome.us" && document.location.hostname != "www.welcome.us"
}


(function(d){
  var js, id = 'facebook-jssdk';
  if (d.getElementById(id))
    return;
  js = d.createElement('script');
  js.id = id;
  js.async = true;
  js.src = isDev() ? 'http://connect.facebook.net/en_US/all.js' : '//connect.facebook.net/en_US/all.js';
  d.getElementsByTagName('head')[0].appendChild(js);
}(document));

window.fbAsyncInit=function(){
  var appId = isDev() ? '721860751176197' : '124295237751512';
  FB.init({appId:appId, cookie:true, status:true});
};

function share_image(img_url, text) {
    if (isDev()) { console.log ('sharing image'); }

    //Check to see if the user has authenticated the App.
    FB.getLoginStatus(function(response) {
        if (isDev()) { console.log ('got auth response:'+response); }

        if (response.status === 'connected') {
            if (isDev()) { console.log ('connected!'); }
            //If you want the user's Facebook ID or their access token, this is how you get them.
            var uid = response.authResponse.userID;
            var access_token = response.authResponse.accessToken;

            do_api_share(access_token, img_url, text);

        } else {
            if (isDev()) { console.log ('NOT connected'); }

            //If they haven't, call the FB.login method
            FB.login(function(response) {
              if (isDev()) { console.log ('logging in...'); }

                if (response.authResponse) {
                  if (isDev()) { console.log ('logged in!?'); }
                    //If you want the user's Facebook ID or their access token, this is how you get them.
                    var uid = response.authResponse.userID;
                    var access_token = response.authResponse.accessToken;

                    do_api_share(access_token, img_url, text);
                } else {
                    if (isDev()) { console.log ('login failed'); }
                    alert("You must install the application to share your greeting.");
                }
            }, {scope: 'publish_stream'});
        }
    });
}


function do_api_share(at, img_url, text) {
  var bottom_bar = $('#bottom_bar')
  bottom_bar.show()
  bottom_bar.find('p').css('background-color', '#47A3FF');
  bottom_bar.find('p').html('Uploading to Facebook....')
  FB.api("/me/photos", 'post', { message: text, url: img_url}, function(response) {
    //alert("We've just posted the image to your Facebook feed. Now you can make it your profile photo!");
    var id = response['id'];
    var post_id = response['post_id'];
    var profile_photo_url = 'https://www.facebook.com/photo.php?fbid=' + id + "&makeprofile=1";
    bottom_bar.find('p').html('Photo Uploaded!<br><a href="'+profile_photo_url+'" target="_blank">Make Profile Photo</a>');
  });
}