var h=function(z){if(z.ok)return z.json()},o=function(z){g.abort(z),g=new AbortController,P.signal=g.signal},N={NAV_LINK:"0",COLL_TITLE:"4",COLL_BUTTON:"5",COLL_ITEM:"6",MODAL:"8",MODAL_CLOSE:"9",MODAL_GENRE:"10",MODAL_COMPANY:"11",MODAL_CAST:"12",MODAL_C_MORE:"13",MODAL_SEASON_N:"14"},l={random(z){return Math.floor(Math.random()*z)},randomPermutation(z){var K=z.length;for(var Q=0;Q<K-1;Q+=1){var W=Q+Math.floor(Math.random()*(K-Q)),Z=z[Q];z[Q]=z[W],z[W]=Z}}},Y={current:"dark",DARK:"dark",LIGHT:"light",init(){var z=localStorage.getItem("theme");if(z==="dark"||z==="light")Y.current=z;else{if(window.matchMedia!==void 0&&window.matchMedia("(prefers-color-scheme: dark)").matches)Y.current=Y.DARK;else Y.current=Y.LIGHT;localStorage.setItem("theme",Y.current)}document.firstElementChild?.setAttribute("class",Y.current)},change(z){localStorage.setItem("theme",z),document.firstElementChild?.setAttribute("class",Y.current)},onclick(z){var K=z.currentTarget;if(K===null)return;if(Y.current===Y.DARK)Y.current=Y.LIGHT;else Y.current=Y.DARK;K.setAttribute("data-type",Y.current),Y.change(Y.current)}},S={getTrending(z,K="1"){return fetch(`${window.location.origin}/api/trending?type=${z}&page=${K}`).then(h)},getPopular(z,K="1"){return fetch(`${window.location.origin}/api/popular?type=${z}&page=${K}`).then(h)},getDiscover(z,K,Q="1"){var W=`${window.location.origin}/api/discover?type=${z}&page=${Q}`;if(K!==void 0)W=`${W}&genre=${K}`;return fetch(W).then(h)},getImages(z,K){return fetch(`${window.location.origin}/api/images?type=${K}&id=${z}`).then(h)},getGenres(z){return fetch(`${window.location.origin}/api/genres?type=${z}`).then(h)},getTopRated(z,K="1"){return fetch(`${window.location.origin}/api/toprated?type=${z}&page=${K}`).then(h)},get(z,K,Q,W){var Z=`${window.location.origin}/api/${z}?id=${K}`;if(Q)Z+="&similar";return fetch(Z,W).then(h)},getCredits(z,K,Q){return fetch(`${window.location.origin}/api/credits?type=${z}&id=${K}`,Q).then(h)},getSeason(z,K,Q){return fetch(`${window.location.origin}/api/season?id=${z}&n=${K}`,Q).then(h)}},E={ATTR_SELECTED:"data-selected",ATTR_LINK_TYPE:"data-linkt",ATTR_SHOW:"data-mbshow",HIDDEN:"0",SHOW:"1",buttonNavOnclick(z){var K=z.currentTarget,Q=K.nextElementSibling;if(Q.getAttribute(E.ATTR_SHOW)===E.HIDDEN)Q.setAttribute(E.ATTR_SHOW,E.SHOW),Q.firstElementChild.firstElementChild.focus();else Q.setAttribute(E.ATTR_SHOW,E.HIDDEN)},navOnfocusout(z){var K=z.relatedTarget;if(K===null||K.getAttribute("data-type")!==N.NAV_LINK){var Q=z.currentTarget;Q.setAttribute(E.ATTR_SHOW,E.HIDDEN)}}},m={select(z){return z[l.random(z.length)]},selectHero(z){if(z){if(!z.results||z.results.length===0)throw Error("trending.results does not have data");return m.select(z.results)}},async getHeroLogo(z){if(z===void 0)return;var{id:K,media_type:Q}=z,W=await S.getImages(K,Q);if(W.logos.length>0)return W.logos[0].file_path;else return},initDOMImgLogo(z,K){var Q=K.lastElementChild.firstElementChild;if(z!==void 0)Q.firstElementChild.setAttribute("data-opacity","0"),Q.lastElementChild.setAttribute("data-display","1"),Q.lastElementChild.setAttribute("src",`https://image.tmdb.org/t/p/w300${z}`)},initDOM(z,K){var Q=K.firstElementChild.firstElementChild,W=K.lastElementChild,Z=W.firstElementChild.firstElementChild,$=W.lastElementChild;if(Q.setAttribute("data-display","1"),Q.setAttribute("src",`https://image.tmdb.org/t/p/w1280${z.backdrop_path}`),z.media_type==="tv")Z.insertAdjacentText("beforeend",z.name);else Z.insertAdjacentText("beforeend",z.title);W.setAttribute("data-media",z.media_type),W.setAttribute("data-id",z.id),$.insertAdjacentText("beforeend",z.overview)},DOMTitleOnclick(z,K){var Q=z.getAttribute("data-id"),W=z.getAttribute("data-media");if(Q!==null&&W!==null)X.open(W,Q,K,!0)}},v={url:new URL(window.location.href),origin:`${window.location.origin}${window.location.pathname}`,getHref(z,K){return`${v.origin}?type=${z}&id=${K}`},pushstate(z){history.pushState(void 0,"",z)},init(z){var K=v.url.searchParams.get("type"),Q=v.url.searchParams.get("id");if(K!==null&&Q!==null)if(K=="tv"||K=="movie")X.open(K,Q,z,!1);else console.error(`Bad query: 'type=${K}'`)},onpopstate(z){v.url.href=window.location.href;var K=v.url.searchParams.get("type"),Q=v.url.searchParams.get("id");if(K!==null||Q!==null){if(X.close(z),K==="tv"||K==="movie")X.open(K,Q,z,!1)}else if(X.isOpen)X.close(z)}},C={TYPE_SBUTTON:"data-sbuttont",topScroll:0,DOMCollButtonOnclick(z){var K=z.parentElement.lastElementChild;const Q=z.parentElement.children[1],W=z.parentElement.children[2];var Z=z.getAttribute(C.TYPE_SBUTTON),$=K.clientWidth-K.clientWidth*6/100;if(K.scrollLeft-$<=0)Q.setAttribute("data-display","0");else Q.setAttribute("data-display","1");if(Z==="0"){if(K.scrollBy(-$,0),K.scrollLeft-$<=0)Q.setAttribute("data-display","0");W.setAttribute("data-display","1")}else{if(K.scrollBy($,0),K.scrollLeft+$>=K.scrollWidth-K.clientWidth)W.setAttribute("data-display","0");Q.setAttribute("data-display","1")}},async setItemImage(z,K,Q){var W=await z,Z=K.firstElementChild;if(W===void 0||W.backdrops===void 0||W.backdrops.length===0){if(Q!==null&&Q.length>0)Z.setAttribute("src",`https://image.tmdb.org/t/p/w400${Q}`),Z.setAttribute("data-display","1"),K.lastElementChild?.setAttribute("data-opacity","0")}else{var $=W.backdrops[0];Z.setAttribute("src",`https://image.tmdb.org/t/p/w400${$.file_path}`),Z.setAttribute("data-display","1"),K.lastElementChild?.setAttribute("data-opacity","0")}},createDOMCollection(z,K,Q,W){var Z=W.children[1].cloneNode(!0),$=W.children[2],G=Z.children[0];G.insertAdjacentText("beforeend",z);for(var k of K){const H=$.cloneNode(!0);H.setAttribute("data-id",k.id);let q,V;if(Q!==void 0)V=Q;else V=k.media_type;if(V==="movie")q=k.title;else q=k.name;H.setAttribute("title",q),H.setAttribute("data-media",V),H.lastElementChild.insertAdjacentText("beforeend",q),H.firstElementChild.setAttribute("alt",q),C.setItemImage(S.getImages(k.id,V),H,k.backdrop_path),Z.lastElementChild.appendChild(H)}return Z},async discover(z,K,Q,W,Z,$){var G=await z;if(console.info(K,G),G?.results===void 0||G.results.length===0)throw Error("API.getTopRated does not have data");var k=C.createDOMCollection(K,G.results,Q,$.templateCollection.content),H=$.view.children[Z+W];H.insertAdjacentElement("beforebegin",k),H.remove()},onclick(z,K){var Q=z.getAttribute("data-type");if(Q===N.COLL_BUTTON)C.DOMCollButtonOnclick(z);else if(Q===N.COLL_ITEM){var W=z.getAttribute("data-media"),Z=z.getAttribute("data-id");if(W!==null&&Z!==null)X.open(W,Z,K,!0);else console.error("View onclick bad mediaType or id")}}},g=new AbortController,P={signal:g.signal},X={fragment:document.createDocumentFragment(),id:"",isOpen:!1,mediaType:"tv",creditsLoaded:!1,dataLoaded:!1,similarLoaded:!1,seasonLoaded:!1,seasonNumber:-1,async getCredit(z,K,Q,W){var Z=await S.getCredits(z,K,P);if(console.info("credits:",Z),Z===void 0)return;X.DOMMCreditsFill(Z,Q,W),X.creditsLoaded=!0},async getData(z,K,Q,W){var Z;try{Z=await S.get(z,K,!1,P)}catch{X.close(Q);return}if(console.info("data:",Z),Z===void 0){X.close(Q);return}if(W)v.pushstate(v.getHref(z,K));if(z==="tv"){var $=Q.modal.children[0];X.getCredit(z,K,$,Q.templateModal.content),X.getSimilar(z,K,$,Q.templateModal.content);var G=Z.seasons;if(G.length>0){var k=!1;for(var H of G)if(H.season_number===1){k=!0;break}if(k)X.seasonNumber=1;else X.seasonNumber=G[0].season_number;X.getSeason(K,X.seasonNumber,$,Q.templateModal.content)}else X.seasonNumber=-1;X.DOMMTvFill(Z,Q)}else{var q=Q.modal.children[1];X.getCredit(z,K,q,Q.templateModal.content),X.getSimilar(z,K,q,Q.templateModal.content),X.DOMMMovieFill(Z,Q)}X.dataLoaded=!0},async getSeason(z,K,Q,W){var Z=await S.getSeason(z,K,P);if(console.info("season:",Z),Z===void 0)return;X.DOMSeasonFill(Z,Q,W),X.seasonLoaded=!0},async getSimilar(z,K,Q,W){var Z=await S.get(z,K,!0,P);if(console.info("similars:",Z),Z===void 0)return;X.DOMMSimilarFill(Z,z,Q,W),X.similarLoaded=!0},orderCredits(z){if(z.length<2)return z.length;var K=0,Q=0,W=0,Z=1;for(var $=1;$<z.length;$+=1){var G=z[$];if(G.department!=="Crew"){while(K<=Q){if(K<Q)W=Math.floor((K+Q)/2);else W=K;if(G.department<z[W].department)Q=W-1;else if(G.department>z[W].department)K=W+1;else if(G.job<z[W].job)Q=W-1;else K=W+1}if(K!==Z)z.copyWithin(K+1,K,Z);z[K]=G,K=0,Q=Z,Z+=1}}return Z},DOMSeasonFill(z,K,Q){var W=K.children[3].children[6],Z=Q.children[8],$=Q.children[4],G=W.firstElementChild.firstElementChild,k=W.children[1],H=W.children[2],q=W.children[3];if(q.setAttribute("data-more","0"),G.textContent=`${z.episodes.length} episodes`,k.textContent=z.name,H.textContent=z.overview,z.episodes.length>0){var V=z.episodes;for(var x of V){var U=Z.cloneNode(!0),A=U.children[0].firstElementChild,J=U.children[1],f=U.children[2].children[0],b=U.children[2].children[1],B=U.children[2].children[2],_=U.children[2].children[3];if(x.still_path!==null)A.setAttribute("src",`https://image.tmdb.org/t/p/w400${x.still_path}`),A.setAttribute("alt",x.name);if(f.textContent=x.air_date,J.textContent=x.episode_number,b.textContent=x.name,x.runtime!==null)B.textContent=`${x.runtime} min`;_.textContent=x.overview,X.fragment.appendChild(U)}if(z.episodes.length>4){var j=$.cloneNode(!0);j.textContent="more +",j.setAttribute("data-type",N.MODAL_C_MORE),X.fragment.appendChild(j)}q.replaceChildren(X.fragment)}else q.replaceChildren()},DOMMSimilarFill(z,K,Q,W){var Z=Q.children[3].children.length,$=Q.children[3].children[Z-2],G=$.lastElementChild,k=W.children[5],H=z.results;if(H!=null&&0<H.length){$.setAttribute("data-display","1");var q=0;while(q<H.length){var V=H[q],x=k.cloneNode(!0);x.setAttribute("data-id",V.id);let J;if(K==="movie")J=V.title;else J=V.name;x.setAttribute("title",J),x.setAttribute("data-media",K);var{firstElementChild:U,lastElementChild:A}=x;if(U.setAttribute("alt",J),A.insertAdjacentText("beforeend",J),V.poster_path!=null&&V.poster_path.length>0)U.setAttribute("src",`https://image.tmdb.org/t/p/w200${V.poster_path}`);else U.setAttribute("data-display","0"),A.setAttribute("data-opacity","1");X.fragment.appendChild(x),q+=1}G.appendChild(X.fragment)}},DOMMCreditsFill(z,K,Q){var W=K.children[3].children[5],Z=K.children[3].lastElementChild,$=Q.children[0],G=Q.children[1],k=Q.children[2],H=Q.children[3],q=Q.children[4],V,x,U,A=z.cast;if(A.length>0){U=k.cloneNode(!0),U.setAttribute("data-more","0"),U.firstElementChild.textContent="Cast:";for(var J=0;J<A.length;J+=1){var f=A[J];x=$.cloneNode(!1),x.setAttribute("data-id",f.id),x.setAttribute("data-type",N.MODAL_CAST),x.textContent=f.name,U.appendChild(x)}if(A.length>3){var b=q.cloneNode(!1);b.setAttribute("class","more"),b.setAttribute("data-type",N.MODAL_C_MORE),b.textContent="more",U.appendChild(b)}W.appendChild(U),U=void 0}if(z.crew.length>0){var B=z.crew,_=X.orderCredits(B),j="",w="";for(var L=0;L<_;L+=1){var F=B[L];if(F.department!==j){if(V!==void 0){if(U!==void 0)V?.appendChild(U),U=void 0;X.fragment.appendChild(V)}j=F.department,V=G.cloneNode(!0),V.firstElementChild.textContent=j}if(F.job!==w){if(U!==void 0)V?.appendChild(U);w=F.job,U=k.cloneNode(!0),U.firstElementChild.textContent=`${w}:`}if(j==="Directing"&&(w==="Director"||w==="Series Director"||w==="Action Director"))x=$.cloneNode(!0),x.setAttribute("data-id",F.id),x.setAttribute("data-type",N.MODAL_CAST);else x=H.cloneNode(!1);x.textContent=F.name,U.appendChild(x)}if(V!==void 0){if(U!==void 0)V?.appendChild(U);X.fragment.appendChild(V)}Z?.appendChild(X.fragment)}},DOMMMovieFill(z,K){var Q=K.modal,W=K.templateModal.content.children[2],U=K.templateModal.content.children[0],Z=Q.children[1],$=Z.children[1].firstElementChild.firstElementChild,G=Z.children[3],k=G.children[0],H=G.children[1],q=G.children[2],V=G.children[3],x=G.children[4],U=K.templateModal.content.children[0],A=K.templateModal.content.children[3],J=K.templateModal.content.children[4],f;if(k.textContent=z.title,V.textContent=z?.overview,z.runtime!==void 0)q.textContent=`${z.runtime} min`;if(z?.backdrop_path!=null)$.setAttribute("src",`https://image.tmdb.org/t/p/w780${z.backdrop_path}`),$.setAttribute("alt",z.title),$.setAttribute("data-display","1");if(z.genres.length>0){for(var b of z.genres)f=U.cloneNode(!0),f.textContent=b.name,f.setAttribute("data-id",b.id),f.setAttribute("data-type",N.MODAL_GENRE),X.fragment.appendChild(f);H.appendChild(X.fragment)}var B=W.cloneNode(!0);B.firstElementChild.textContent="Popularity:",f=A.cloneNode(!0),f.textContent=String(z.popularity),B.appendChild(f),x?.appendChild(B);var _=W.cloneNode(!0);if(_.firstElementChild.textContent="Release Date:",f=A.cloneNode(!0),f.textContent=z.release_date,_.appendChild(f),x?.appendChild(_),z.spoken_languages.length>0){var j=W.cloneNode(!0);j.firstElementChild.textContent="Languages:";for(var w of z.spoken_languages){if(f=A.cloneNode(!0),w.name.length>0)f.textContent=w.name;else f.textContent=w.english_name;j.appendChild(f)}x?.appendChild(j)}if(z.production_countries.length>0){var L=W.cloneNode(!0);L.firstElementChild.textContent="Countries:";for(var F of z.production_countries)f=A.cloneNode(!0),f.textContent=F.name,L.appendChild(f);x?.appendChild(L)}if(z.production_companies.length>0){var L=W.cloneNode(!0);L.setAttribute("data-more","0"),L.firstElementChild.textContent="Companies:";for(var c of z.production_companies)f=U.cloneNode(!0),U.setAttribute("data-type",N.MODAL_COMPANY),U.setAttribute("data-id",c.id),f.textContent=c.name,L.appendChild(f);if(z.production_companies.length>3){var R=J.cloneNode(!1);R.setAttribute("class","more"),R.setAttribute("data-type",N.MODAL_C_MORE),R.textContent="more",L.appendChild(R)}x?.appendChild(L)}},DOMMTvFill(z,K){var Q=K.modal,W=K.templateModal.content.children[2],A=K.templateModal.content.children[0],Z=Q.children[0],$=Z.children[1].firstElementChild.firstElementChild,G=Z.children[3],k=G.children[0],H=G.children[1],q=G.children[2],V=G.children[3],x=G.children[4],U=G.children[6],A=K.templateModal.content.children[0],J=K.templateModal.content.children[3],f=K.templateModal.content.children[4],b=K.templateModal.content.children[6],B=K.templateModal.content.children[7],_;if(k.textContent=z.name,V.textContent=z?.overview,q.textContent=`${z.number_of_episodes} episodes, ${z.number_of_seasons} seasons`,z?.backdrop_path!=null)$.setAttribute("src",`https://image.tmdb.org/t/p/w780${z.backdrop_path}`),$.setAttribute("alt",z.name),$.setAttribute("data-display","1");if(z.genres.length>0){for(var j of z.genres)_=A.cloneNode(!0),_.textContent=j.name,_.setAttribute("data-id",j.id),_.setAttribute("data-type",N.MODAL_GENRE),X.fragment.appendChild(_);H.appendChild(X.fragment)}var w=W.cloneNode(!0);w.firstElementChild.textContent="Popularity:",_=J.cloneNode(!0),_.textContent=String(z.popularity),w.appendChild(_),x?.appendChild(w);var L=W.cloneNode(!0);if(L.firstElementChild.textContent="First Air Date:",_=J.cloneNode(!0),_.textContent=z.first_air_date,L.appendChild(_),x.appendChild(L),z.spoken_languages.length>0){var F=W.cloneNode(!0);F.firstElementChild.textContent="Languages:";for(var c of z.spoken_languages){if(_=J.cloneNode(!0),c.name.length>0)_.textContent=c.name;else _.textContent=c.english_name;F.appendChild(_)}x?.appendChild(F)}if(z.production_countries.length>0){var R=W.cloneNode(!0);R.firstElementChild.textContent="Countries:";for(var i of z.production_countries)_=J.cloneNode(!0),_.textContent=i.name,R.appendChild(_);x?.appendChild(R)}if(z.production_companies.length>0){var R=W.cloneNode(!0);R.setAttribute("data-more","0"),R.firstElementChild.textContent="Companies:";for(var p of z.production_companies)_=A.cloneNode(!0),A.setAttribute("data-type",N.MODAL_COMPANY),A.setAttribute("data-id",p.id),_.textContent=p.name,R.appendChild(_);if(z.production_companies.length>3){var u=f.cloneNode(!1);u.setAttribute("class","more"),u.setAttribute("data-type",N.MODAL_C_MORE),u.textContent="more",R.appendChild(u)}x?.appendChild(R)}if(X.seasonNumber!==-1){var I=z.seasons,n=b.content.cloneNode(!0),r=n.children[0].lastElementChild;if(U.setAttribute("data-display","1"),I.length>1)for(let s=0;s<I.length;s+=1){var T=I[s].season_number,y=B.cloneNode(!1);if(T===1)y.setAttribute("selected","true");y.textContent=`Season ${T}`,y.setAttribute("value",String(T)),r.appendChild(y)}else r.setAttribute("data-display","0");U.appendChild(n)}},close(z){if(!X.dataLoaded||!X.creditsLoaded||!X.similarLoaded||!X.seasonLoaded)o("The modal is closed");var K;if(X.mediaType==="tv")K=z.modal.children[0];else K=z.modal.children[1];var Q=K.children[1].firstElementChild?.firstElementChild,W=K.children[3];Q?.setAttribute("data-display","0"),Q?.setAttribute("src",""),Q?.setAttribute("alt","");var Z=W.children.length;if(W.children[0].replaceChildren(),W.children[1].replaceChildren(),W.children[2].replaceChildren(),W.children[3].replaceChildren(),W.children[4].replaceChildren(),W.children[5].replaceChildren(),W.lastElementChild.replaceChildren(),X.mediaType==="tv"){var $=W.children[6];$.replaceChildren(),$.setAttribute("data-display","0")}var G=W.children[Z-2];G.setAttribute("data-display","0"),G.lastElementChild.replaceChildren(),z.main.style.removeProperty("transform"),z.main.style.setProperty("position","relative"),z.modal.setAttribute("data-display","0"),document.firstElementChild.scrollTop=C.topScroll,X.isOpen=!1,X.seasonNumber=-1,X.id="",X.dataLoaded=!1,X.creditsLoaded=!1,X.similarLoaded=!1,X.seasonLoaded=!1},open(z,K,Q,W){C.topScroll=document.firstElementChild.scrollTop,document.firstElementChild.scrollTop=0,X.isOpen=!0,X.mediaType=z,X.id=K,Q.modal.setAttribute("data-display","1"),Q.modal.setAttribute("data-select",z),Q.main.style.setProperty("transform",`translateY(-${C.topScroll}px)`),Q.main.style.setProperty("position","fixed"),X.getData(z,K,Q,W)},onchange(z,K){var Q=z.getAttribute("data-type");if(Q===N.MODAL_SEASON_N){var W=Number(z.value);if(W===NaN)return;if(W!==X.seasonNumber)X.seasonNumber=W,X.getSeason(X.id,W,K.modal.children[0],K.templateModal.content)}},onclick(z,K){var Q=z.getAttribute("data-type");if(Q===N.MODAL||Q===N.MODAL_CLOSE)X.close(K),v.pushstate(v.origin);else if(Q===N.MODAL_C_MORE)z.parentElement.setAttribute("data-more","1");else if(Q===N.COLL_ITEM){var W=z?.getAttribute("data-id"),Z=z?.getAttribute("data-media");X.close(K),X.open(Z,W,K,!0)}}},d={TYPE:N,API:S,Theme:Y,Hero:m,Nav:E,Route:v,View:C,Modal:X,Utils:l};export{d as default};