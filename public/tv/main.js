import E from"../general.js";var A=function(u,b,B){var f,y,I,v=p.genres,h=p.index;u.buttonMore?.setAttribute("data-display","0");var T=0,w=!1;if(p.count+b<p.len)T=p.count+b;else T=p.len,w=!0;if(B)for(var z=p.count;z<T;z+=1){var H=u.templateCollection.content.children[0].cloneNode(!0);u.view?.appendChild(H)}var J=u.view.children.length-T,q=p.count;while(q<T)f=v[h].id,y=v[h].name,I=`${y} Tv series`,E.View.discover(E.API.getDiscover("tv",f,"1"),I,"tv",q,J,u),h+=1,q+=1;if(p.index=h,p.count=q,!w)u.buttonMore?.setAttribute("data-display","1")},p={STEPS:5,len:0,count:3,index:0,genres:null};window.addEventListener("DOMContentLoaded",function(){var u={templateCollection:document.getElementById("template_collection"),templateModal:document.getElementById("template_modal"),headerButtonNav:document.getElementById("header_button-nav"),headerNav:document.getElementById("header_nav"),headerButtonSearch:document.getElementById("header_button-search"),headerButtonTheme:document.getElementById("header_button-theme"),main:document.getElementById("main"),hero:document.getElementById("hero"),view:document.getElementById("view"),buttonMore:document.getElementById("button-more"),modal:document.getElementById("modal")};if(u.templateCollection===null)throw Error("DOM.templateCollection is null");if(u.templateModal===null)throw Error("DOM.templateModal is null");if(u.headerButtonNav===null)throw Error("DOM.headerButtonNav is null");if(u.headerNav===null)throw Error("DOM.headerNav is null");if(u.headerButtonSearch===null)throw Error("DOM.headerButtonSearch is null");if(u.headerButtonTheme===null)throw Error("DOM.headerButtonTheme is null");if(u.main===null)throw Error("DOM.main is null");if(u.hero===null)throw Error("DOM.hero is null");if(u.view===null)throw Error("DOM.view is null");if(u.buttonMore===null)throw Error("DOM.buttonMore is null");if(u.modal===null)throw Error("DOM.modal is null");E.Theme.init(),E.Route.init(u),window.addEventListener("popstate",function(){E.Route.onpopstate(u)}),u.headerButtonTheme.setAttribute("data-type",E.Theme.current),u.headerButtonTheme.addEventListener("click",E.Theme.onclick),u.headerButtonNav.addEventListener("click",E.Nav.buttonNavOnclick),u.headerNav.addEventListener("focusout",E.Nav.navOnfocusout),u.view.addEventListener("click",function(y){E.View.onclick(y.target,u)}),u.hero.lastElementChild.addEventListener("click",function(y){E.Hero.DOMTitleOnclick(y.target,u)}),u.modal.addEventListener("click",function(y){E.Modal.onclick(y.target,u)}),u.modal.addEventListener("change",function(y){E.Modal.onchange(y.target,u)}),u.buttonMore.addEventListener("click",function(){A(u,p.STEPS,!0)});var b=E.API.getGenres("tv"),B=E.API.getTrending("tv","1");B.then(function(y){console.info("trending: ",y)});var f=B.then(E.Hero.selectHero);f.then(function(y){console.info("hero: ",y)}),f.then(E.Hero.getHeroLogo).then(function(y){E.Hero.initDOMImgLogo(y,u.hero)}),f.then(function(y){if(y!==void 0)E.Hero.initDOM(y,u.hero)}),B.then(function(y){if(y?.results===void 0||y.results.length===0)throw Error("API.getTrending does not have data");var I=E.View.createDOMCollection("Week Trendings",y.results,void 0,u.templateCollection.content),v=u.view.children[0];v.insertAdjacentElement("beforebegin",I),v.remove()}),E.API.getPopular("tv","1").then(function(y){if(console.info("getPopular tv",y),y?.results===void 0||y.results.length===0)throw Error("API.getDiscover does not have data");var I=E.View.createDOMCollection("Popular Tv series",y.results,"tv",u.templateCollection.content),v=u.view.children[1];v.insertAdjacentElement("beforebegin",I),v.remove()}),E.API.getTopRated("tv","1").then(function(y){if(console.info("getTopRate tv",y),y?.results===void 0||y.results.length===0)throw Error("API.getTopRated does not have data");var I=E.View.createDOMCollection("Top rated tv serie",y.results,"tv",u.templateCollection.content),v=u.view.children[2];v.insertAdjacentElement("beforebegin",I),v.remove()}),b.then(function(y){if(y===void 0||y.genres===void 0||y.genres.length===0)throw Error("API.getGenre does not have data");p.genres=y.genres,p.len=y.genres.length,E.Utils.randomPermutation(p.genres),A(u,4,!1)})});