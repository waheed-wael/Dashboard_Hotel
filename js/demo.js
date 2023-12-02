"use strict"

var themeOptionArr = {
			typography: '',
			version: '',
			layout: '',
			primary: '',
			headerBg: '',
			navheaderBg: '',
			sidebarBg: '',
			sidebarStyle: '',
			sidebarPosition: '',
			headerPosition: '',
			containerLayout: '',
			//direction: '',
		};
		
		

/* Cookies Function */
function setCookie(cname, cvalue, exhours) 
	{
		var d = new Date();
		d.setTime(d.getTime() + (30*60*1000)); /* 30 Minutes */
		var expires = "expires="+ d.toString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

function getCookie(cname) 
	{
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

function deleteCookie(cname) 
	{
		var d = new Date();
		d.setTime(d.getTime() + (1)); // 1/1000 second
		var expires = "expires="+ d.toString();
		//document.cookie = cname + "=1;" + expires + ";path=/";
		document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"+";path=/";
	}

function deleteAllCookie(reload = true)
	{
		jQuery.each(themeOptionArr, function(optionKey, optionValue) {
				deleteCookie(optionKey);
		});
		if(reload){
			location.reload();
		}
	}
 	
/* Cookies Function END */	


 	

(function($) {
	
	"use strict"
	
	//var direction =  getUrlParams('dir');
	var theme =  getUrlParams('theme');
	
	/* Dz Theme Demo Settings  */
	
	var dezThemeSet0 = { /* Default Theme */
		typography: "poppins",
		version: "light",
		layout: "vertical",
		headerBg: "color_1",
		primary: "color_1",
		navheaderBg: "color_1",
		sidebarBg: "color_1",
		sidebarStyle: "full",
		sidebarPosition: "fixed",
		headerPosition: "fixed",
		containerLayout: "full",
	};
	
	var dezThemeSet1 = {
		typography: "poppins",
		version: "light",
		layout: "vertical",
		primary: "color_2",
		headerBg: "color_1",
		navheaderBg: "color_2",
		sidebarBg: "color_2",
		sidebarStyle: "modern",
		sidebarPosition: "fixed",
		headerPosition: "fixed",
		containerLayout: "full",
	};
	
	var dezThemeSet2 = {
		typography: "poppins",
		version: "light",
		layout: "vertical",
		primary: "color_3",
		headerBg: "color_1",
		navheaderBg: "color_3",
		sidebarBg: "color_3",
		sidebarStyle: "full",
		sidebarPosition: "fixed",
		headerPosition: "fixed",
		containerLayout: "full",
	};
	
	
	var dezThemeSet3 = {
		typography: "poppins",
		version: "dark",
		layout: "vertical",
		primary: "color_5",
		headerBg: "color_1",
		navheaderBg: "color_5",
		sidebarBg: "color_5",
		sidebarStyle: "full",
		sidebarPosition: "fixed",
		headerPosition: "fixed",
		containerLayout: "full",
	};
	
	var dezThemeSet4 = {
		typography: "poppins",
		version: "light",
		layout: "vertical",
		primary: "color_9",
		headerBg: "color_9",
		navheaderBg: "color_9",
		sidebarBg: "color_1",
		sidebarStyle: "full",
		sidebarPosition: "fixed",
		headerPosition: "fixed",
		containerLayout: "full",
	};
	
	var dezThemeSet5 = {
		typography: "poppins",
		version: "light",
		layout: "horizontal",
		primary: "color_3",
		headerBg: "color_1",
		navheaderBg: "color_1",
		sidebarBg: "color_3",
		sidebarStyle: "full",
		sidebarPosition: "static",
		headerPosition: "fixed",
		containerLayout: "full",
	};
	
		
	function themeChange(theme){
		var themeSettings = {};
		themeSettings = eval('dezThemeSet'+theme);
		dezSettingsOptions = themeSettings; /* For Screen Resize */
		new dezSettings(themeSettings);
		
		setThemeInCookie(themeSettings);
	}
	
	function setThemeInCookie(themeSettings)
	{
		//console.log(themeSettings);
		jQuery.each(themeSettings, function(optionKey, optionValue) {
			setCookie(optionKey,optionValue);
		});
	}
	
	function setThemeLogo() {
		var logo = getCookie('logo_src');
		
		var logo2 = getCookie('logo_src2');
		
		if(logo != ''){
			jQuery('.nav-header .logo-abbr').attr("src", logo);
		}
		
		if(logo2 != ''){
			jQuery('.nav-header .logo-compact, .nav-header .brand-title').attr("src", logo2);
		}
	}
	/*  set switcher option start  */
	function getElementAttrs(el) {
	  return [].slice.call(el.attributes).map((attr) => {
		return {
		  name: attr.name,
		  value: attr.value
		}
	  });
	}
	
	function handleSetThemeOption(item, index, arr) {
		
		var attrName = item.name.replace('data-','').replace('-','_');
		if(attrName === "sidebarbg" || attrName === "primary" || attrName === "headerbg" || attrName === "nav_headerbg"){
			
			
			if(item.value === "color_1"){
				return false;
			}
			var attrNameColor = attrName.replace("bg","")
			document.getElementById(attrNameColor+"_"+item.value).checked = true;
		}else if(attrName === "direction" || attrName === "nav_headerbg" || attrName === "headerbg"){
		}else if(attrName === "sidebar_style" || attrName === "sidebar_position" || attrName === "header_position" || attrName === "typography" || attrName === "theme_version" ){
			if(item.value === "cairo" || item.value === "full" || item.value === "fixed"|| item.value === "light"){return false}
			document.getElementById(attrName).value = item.value;				
		}else if(attrName === "layout"){
			if(item.value === "vertical"){return false}
			document.getElementById("theme_layout").value = item.value;		
		}
		else if(attrName === "container"){
			if(item.value === "wide"){return false}
			document.getElementById("container_layout").value = item.value;				
		}
		$('.default-select').niceSelect('update');
	}
	
	/* / set switcher option end / */
	
	function setThemeOptionOnPage()
	{
		if(getCookie('version') != '')
		{
			jQuery.each(themeOptionArr, function(optionKey, optionValue) {
				var optionData = getCookie(optionKey);
				themeOptionArr[optionKey] = (optionData != '')?optionData:dezSettingsOptions[optionKey];
			});
			//console.log(themeOptionArr);
			dezSettingsOptions = themeOptionArr;
			new dezSettings(dezSettingsOptions);
			
			setThemeLogo();
		}
	}
	
	jQuery(document).on('click', '.dz_theme_demo', function(){
	setTimeout(() => {
			var allAttrs = getElementAttrs(document.querySelector('body'));
			allAttrs.forEach(handleSetThemeOption);
		},1500);
		var demoTheme = jQuery(this).data('theme');
		themeChange(demoTheme, 'ltr');
	});


	jQuery(document).on('click', '.dz_theme_demo_rtl', function(){
		var demoTheme = jQuery(this).data('theme');
		themeChange(demoTheme, 'rtl');
	});
	
	
	jQuery(window).on('load', function(){
		//direction = (direction != undefined)?direction:'ltr';
		if(theme != undefined){
			themeChange(theme);
		}else if(getCookie('version') == ''){	
				themeChange(0);
			
		}
		setTimeout(() => {
			var allAttrs = getElementAttrs(document.querySelector('body'));
			allAttrs.forEach(handleSetThemeOption);
		},1500);
		
		/* Set Theme On Page From Cookie */
		setThemeOptionOnPage();
	});
	jQuery(window).on('resize', function(){
		
		setThemeOptionOnPage();
	});
	

})(jQuery);