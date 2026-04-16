var Hb=Object.defineProperty;var Ub=(t,e,n)=>e in t?Hb(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var D=(t,e,n)=>Ub(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function Vb(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var B0={exports:{}},Bl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yb=Symbol.for("react.transitional.element"),Gb=Symbol.for("react.fragment");function N0(t,e,n){var a=null;if(n!==void 0&&(a=""+n),e.key!==void 0&&(a=""+e.key),"key"in e){n={};for(var i in e)i!=="key"&&(n[i]=e[i])}else n=e;return e=n.ref,{$$typeof:Yb,type:t,key:a,ref:e!==void 0?e:null,props:n}}Bl.Fragment=Gb;Bl.jsx=N0;Bl.jsxs=N0;B0.exports=Bl;var O=B0.exports,j0={exports:{}},j={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xd=Symbol.for("react.transitional.element"),qb=Symbol.for("react.portal"),Xb=Symbol.for("react.fragment"),Fb=Symbol.for("react.strict_mode"),Qb=Symbol.for("react.profiler"),Zb=Symbol.for("react.consumer"),Kb=Symbol.for("react.context"),Pb=Symbol.for("react.forward_ref"),Wb=Symbol.for("react.suspense"),Jb=Symbol.for("react.memo"),H0=Symbol.for("react.lazy"),Ib=Symbol.for("react.activity"),Hu=Symbol.iterator;function $b(t){return t===null||typeof t!="object"?null:(t=Hu&&t[Hu]||t["@@iterator"],typeof t=="function"?t:null)}var U0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},V0=Object.assign,Y0={};function xi(t,e,n){this.props=t,this.context=e,this.refs=Y0,this.updater=n||U0}xi.prototype.isReactComponent={};xi.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};xi.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function G0(){}G0.prototype=xi.prototype;function _d(t,e,n){this.props=t,this.context=e,this.refs=Y0,this.updater=n||U0}var kd=_d.prototype=new G0;kd.constructor=_d;V0(kd,xi.prototype);kd.isPureReactComponent=!0;var Uu=Array.isArray;function lc(){}var lt={H:null,A:null,T:null,S:null},q0=Object.prototype.hasOwnProperty;function Sd(t,e,n){var a=n.ref;return{$$typeof:xd,type:t,key:e,ref:a!==void 0?a:null,props:n}}function ty(t,e){return Sd(t.type,e,t.props)}function wd(t){return typeof t=="object"&&t!==null&&t.$$typeof===xd}function ey(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Vu=/\/+/g;function lo(t,e){return typeof t=="object"&&t!==null&&t.key!=null?ey(""+t.key):e.toString(36)}function ny(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(lc,lc):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function Na(t,e,n,a,i){var r=typeof t;(r==="undefined"||r==="boolean")&&(t=null);var s=!1;if(t===null)s=!0;else switch(r){case"bigint":case"string":case"number":s=!0;break;case"object":switch(t.$$typeof){case xd:case qb:s=!0;break;case H0:return s=t._init,Na(s(t._payload),e,n,a,i)}}if(s)return i=i(t),s=a===""?"."+lo(t,0):a,Uu(i)?(n="",s!=null&&(n=s.replace(Vu,"$&/")+"/"),Na(i,e,n,"",function(c){return c})):i!=null&&(wd(i)&&(i=ty(i,n+(i.key==null||t&&t.key===i.key?"":(""+i.key).replace(Vu,"$&/")+"/")+s)),e.push(i)),1;s=0;var l=a===""?".":a+":";if(Uu(t))for(var o=0;o<t.length;o++)a=t[o],r=l+lo(a,o),s+=Na(a,e,n,r,i);else if(o=$b(t),typeof o=="function")for(t=o.call(t),o=0;!(a=t.next()).done;)a=a.value,r=l+lo(a,o++),s+=Na(a,e,n,r,i);else if(r==="object"){if(typeof t.then=="function")return Na(ny(t),e,n,a,i);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return s}function $r(t,e,n){if(t==null)return t;var a=[],i=0;return Na(t,a,"","",function(r){return e.call(n,r,i++)}),a}function ay(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Yu=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},iy={map:$r,forEach:function(t,e,n){$r(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return $r(t,function(){e++}),e},toArray:function(t){return $r(t,function(e){return e})||[]},only:function(t){if(!wd(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};j.Activity=Ib;j.Children=iy;j.Component=xi;j.Fragment=Xb;j.Profiler=Qb;j.PureComponent=_d;j.StrictMode=Fb;j.Suspense=Wb;j.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=lt;j.__COMPILER_RUNTIME={__proto__:null,c:function(t){return lt.H.useMemoCache(t)}};j.cache=function(t){return function(){return t.apply(null,arguments)}};j.cacheSignal=function(){return null};j.cloneElement=function(t,e,n){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var a=V0({},t.props),i=t.key;if(e!=null)for(r in e.key!==void 0&&(i=""+e.key),e)!q0.call(e,r)||r==="key"||r==="__self"||r==="__source"||r==="ref"&&e.ref===void 0||(a[r]=e[r]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var s=Array(r),l=0;l<r;l++)s[l]=arguments[l+2];a.children=s}return Sd(t.type,i,a)};j.createContext=function(t){return t={$$typeof:Kb,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:Zb,_context:t},t};j.createElement=function(t,e,n){var a,i={},r=null;if(e!=null)for(a in e.key!==void 0&&(r=""+e.key),e)q0.call(e,a)&&a!=="key"&&a!=="__self"&&a!=="__source"&&(i[a]=e[a]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var l=Array(s),o=0;o<s;o++)l[o]=arguments[o+2];i.children=l}if(t&&t.defaultProps)for(a in s=t.defaultProps,s)i[a]===void 0&&(i[a]=s[a]);return Sd(t,r,i)};j.createRef=function(){return{current:null}};j.forwardRef=function(t){return{$$typeof:Pb,render:t}};j.isValidElement=wd;j.lazy=function(t){return{$$typeof:H0,_payload:{_status:-1,_result:t},_init:ay}};j.memo=function(t,e){return{$$typeof:Jb,type:t,compare:e===void 0?null:e}};j.startTransition=function(t){var e=lt.T,n={};lt.T=n;try{var a=t(),i=lt.S;i!==null&&i(n,a),typeof a=="object"&&a!==null&&typeof a.then=="function"&&a.then(lc,Yu)}catch(r){Yu(r)}finally{e!==null&&n.types!==null&&(e.types=n.types),lt.T=e}};j.unstable_useCacheRefresh=function(){return lt.H.useCacheRefresh()};j.use=function(t){return lt.H.use(t)};j.useActionState=function(t,e,n){return lt.H.useActionState(t,e,n)};j.useCallback=function(t,e){return lt.H.useCallback(t,e)};j.useContext=function(t){return lt.H.useContext(t)};j.useDebugValue=function(){};j.useDeferredValue=function(t,e){return lt.H.useDeferredValue(t,e)};j.useEffect=function(t,e){return lt.H.useEffect(t,e)};j.useEffectEvent=function(t){return lt.H.useEffectEvent(t)};j.useId=function(){return lt.H.useId()};j.useImperativeHandle=function(t,e,n){return lt.H.useImperativeHandle(t,e,n)};j.useInsertionEffect=function(t,e){return lt.H.useInsertionEffect(t,e)};j.useLayoutEffect=function(t,e){return lt.H.useLayoutEffect(t,e)};j.useMemo=function(t,e){return lt.H.useMemo(t,e)};j.useOptimistic=function(t,e){return lt.H.useOptimistic(t,e)};j.useReducer=function(t,e,n){return lt.H.useReducer(t,e,n)};j.useRef=function(t){return lt.H.useRef(t)};j.useState=function(t){return lt.H.useState(t)};j.useSyncExternalStore=function(t,e,n){return lt.H.useSyncExternalStore(t,e,n)};j.useTransition=function(){return lt.H.useTransition()};j.version="19.2.5";j0.exports=j;var jt=j0.exports;const ry=Vb(jt);var X0={exports:{}},Nl={},F0={exports:{}},Q0={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(T,E){var R=T.length;T.push(E);t:for(;0<R;){var U=R-1>>>1,it=T[U];if(0<i(it,E))T[U]=E,T[R]=it,R=U;else break t}}function n(T){return T.length===0?null:T[0]}function a(T){if(T.length===0)return null;var E=T[0],R=T.pop();if(R!==E){T[0]=R;t:for(var U=0,it=T.length,Ve=it>>>1;U<Ve;){var Se=2*(U+1)-1,Ye=T[Se],Gt=Se+1,Oe=T[Gt];if(0>i(Ye,R))Gt<it&&0>i(Oe,Ye)?(T[U]=Oe,T[Gt]=R,U=Gt):(T[U]=Ye,T[Se]=R,U=Se);else if(Gt<it&&0>i(Oe,R))T[U]=Oe,T[Gt]=R,U=Gt;else break t}}return E}function i(T,E){var R=T.sortIndex-E.sortIndex;return R!==0?R:T.id-E.id}if(t.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var r=performance;t.unstable_now=function(){return r.now()}}else{var s=Date,l=s.now();t.unstable_now=function(){return s.now()-l}}var o=[],c=[],d=1,u=null,f=3,h=!1,m=!1,b=!1,v=!1,p=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,y=typeof setImmediate<"u"?setImmediate:null;function x(T){for(var E=n(c);E!==null;){if(E.callback===null)a(c);else if(E.startTime<=T)a(c),E.sortIndex=E.expirationTime,e(o,E);else break;E=n(c)}}function _(T){if(b=!1,x(T),!m)if(n(o)!==null)m=!0,w||(w=!0,N());else{var E=n(c);E!==null&&Q(_,E.startTime-T)}}var w=!1,k=-1,S=5,A=-1;function C(){return v?!0:!(t.unstable_now()-A<S)}function z(){if(v=!1,w){var T=t.unstable_now();A=T;var E=!0;try{t:{m=!1,b&&(b=!1,g(k),k=-1),h=!0;var R=f;try{e:{for(x(T),u=n(o);u!==null&&!(u.expirationTime>T&&C());){var U=u.callback;if(typeof U=="function"){u.callback=null,f=u.priorityLevel;var it=U(u.expirationTime<=T);if(T=t.unstable_now(),typeof it=="function"){u.callback=it,x(T),E=!0;break e}u===n(o)&&a(o),x(T)}else a(o);u=n(o)}if(u!==null)E=!0;else{var Ve=n(c);Ve!==null&&Q(_,Ve.startTime-T),E=!1}}break t}finally{u=null,f=R,h=!1}E=void 0}}finally{E?N():w=!1}}}var N;if(typeof y=="function")N=function(){y(z)};else if(typeof MessageChannel<"u"){var vt=new MessageChannel,Yt=vt.port2;vt.port1.onmessage=z,N=function(){Yt.postMessage(null)}}else N=function(){p(z,0)};function Q(T,E){k=p(function(){T(t.unstable_now())},E)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(T){T.callback=null},t.unstable_forceFrameRate=function(T){0>T||125<T?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):S=0<T?Math.floor(1e3/T):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_next=function(T){switch(f){case 1:case 2:case 3:var E=3;break;default:E=f}var R=f;f=E;try{return T()}finally{f=R}},t.unstable_requestPaint=function(){v=!0},t.unstable_runWithPriority=function(T,E){switch(T){case 1:case 2:case 3:case 4:case 5:break;default:T=3}var R=f;f=T;try{return E()}finally{f=R}},t.unstable_scheduleCallback=function(T,E,R){var U=t.unstable_now();switch(typeof R=="object"&&R!==null?(R=R.delay,R=typeof R=="number"&&0<R?U+R:U):R=U,T){case 1:var it=-1;break;case 2:it=250;break;case 5:it=1073741823;break;case 4:it=1e4;break;default:it=5e3}return it=R+it,T={id:d++,callback:E,priorityLevel:T,startTime:R,expirationTime:it,sortIndex:-1},R>U?(T.sortIndex=R,e(c,T),n(o)===null&&T===n(c)&&(b?(g(k),k=-1):b=!0,Q(_,R-U))):(T.sortIndex=it,e(o,T),m||h||(m=!0,w||(w=!0,N()))),T},t.unstable_shouldYield=C,t.unstable_wrapCallback=function(T){var E=f;return function(){var R=f;f=E;try{return T.apply(this,arguments)}finally{f=R}}}})(Q0);F0.exports=Q0;var sy=F0.exports,Z0={exports:{}},Ft={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ly=jt;function K0(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function mn(){}var Xt={d:{f:mn,r:function(){throw Error(K0(522))},D:mn,C:mn,L:mn,m:mn,X:mn,S:mn,M:mn},p:0,findDOMNode:null},oy=Symbol.for("react.portal");function cy(t,e,n){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:oy,key:a==null?null:""+a,children:t,containerInfo:e,implementation:n}}var Ji=ly.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function jl(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}Ft.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Xt;Ft.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(K0(299));return cy(t,e,null,n)};Ft.flushSync=function(t){var e=Ji.T,n=Xt.p;try{if(Ji.T=null,Xt.p=2,t)return t()}finally{Ji.T=e,Xt.p=n,Xt.d.f()}};Ft.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,Xt.d.C(t,e))};Ft.prefetchDNS=function(t){typeof t=="string"&&Xt.d.D(t)};Ft.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var n=e.as,a=jl(n,e.crossOrigin),i=typeof e.integrity=="string"?e.integrity:void 0,r=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;n==="style"?Xt.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:a,integrity:i,fetchPriority:r}):n==="script"&&Xt.d.X(t,{crossOrigin:a,integrity:i,fetchPriority:r,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};Ft.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var n=jl(e.as,e.crossOrigin);Xt.d.M(t,{crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&Xt.d.M(t)};Ft.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var n=e.as,a=jl(n,e.crossOrigin);Xt.d.L(t,n,{crossOrigin:a,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};Ft.preloadModule=function(t,e){if(typeof t=="string")if(e){var n=jl(e.as,e.crossOrigin);Xt.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else Xt.d.m(t)};Ft.requestFormReset=function(t){Xt.d.r(t)};Ft.unstable_batchedUpdates=function(t,e){return t(e)};Ft.useFormState=function(t,e,n){return Ji.H.useFormState(t,e,n)};Ft.useFormStatus=function(){return Ji.H.useHostTransitionStatus()};Ft.version="19.2.5";function P0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(P0)}catch(t){console.error(t)}}P0(),Z0.exports=Ft;var W0=Z0.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var At=sy,J0=jt,dy=W0;function M(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function I0(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Ur(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function $0(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function tp(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Gu(t){if(Ur(t)!==t)throw Error(M(188))}function uy(t){var e=t.alternate;if(!e){if(e=Ur(t),e===null)throw Error(M(188));return e!==t?null:t}for(var n=t,a=e;;){var i=n.return;if(i===null)break;var r=i.alternate;if(r===null){if(a=i.return,a!==null){n=a;continue}break}if(i.child===r.child){for(r=i.child;r;){if(r===n)return Gu(i),t;if(r===a)return Gu(i),e;r=r.sibling}throw Error(M(188))}if(n.return!==a.return)n=i,a=r;else{for(var s=!1,l=i.child;l;){if(l===n){s=!0,n=i,a=r;break}if(l===a){s=!0,a=i,n=r;break}l=l.sibling}if(!s){for(l=r.child;l;){if(l===n){s=!0,n=r,a=i;break}if(l===a){s=!0,a=r,n=i;break}l=l.sibling}if(!s)throw Error(M(189))}}if(n.alternate!==a)throw Error(M(190))}if(n.tag!==3)throw Error(M(188));return n.stateNode.current===n?t:e}function ep(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=ep(t),e!==null)return e;t=t.sibling}return null}var ct=Object.assign,fy=Symbol.for("react.element"),ts=Symbol.for("react.transitional.element"),Vi=Symbol.for("react.portal"),Ua=Symbol.for("react.fragment"),np=Symbol.for("react.strict_mode"),oc=Symbol.for("react.profiler"),ap=Symbol.for("react.consumer"),tn=Symbol.for("react.context"),Md=Symbol.for("react.forward_ref"),cc=Symbol.for("react.suspense"),dc=Symbol.for("react.suspense_list"),Ad=Symbol.for("react.memo"),bn=Symbol.for("react.lazy"),uc=Symbol.for("react.activity"),hy=Symbol.for("react.memo_cache_sentinel"),qu=Symbol.iterator;function Di(t){return t===null||typeof t!="object"?null:(t=qu&&t[qu]||t["@@iterator"],typeof t=="function"?t:null)}var py=Symbol.for("react.client.reference");function fc(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===py?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Ua:return"Fragment";case oc:return"Profiler";case np:return"StrictMode";case cc:return"Suspense";case dc:return"SuspenseList";case uc:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case Vi:return"Portal";case tn:return t.displayName||"Context";case ap:return(t._context.displayName||"Context")+".Consumer";case Md:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Ad:return e=t.displayName||null,e!==null?e:fc(t.type)||"Memo";case bn:e=t._payload,t=t._init;try{return fc(t(e))}catch{}}return null}var Yi=Array.isArray,L=J0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,P=dy.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ua={pending:!1,data:null,method:null,action:null},hc=[],Va=-1;function He(t){return{current:t}}function Ot(t){0>Va||(t.current=hc[Va],hc[Va]=null,Va--)}function at(t,e){Va++,hc[Va]=t.current,t.current=e}var Ne=He(null),mr=He(null),Rn=He(null),Is=He(null);function $s(t,e){switch(at(Rn,e),at(mr,t),at(Ne,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?Wf(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=Wf(e),t=Sm(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Ot(Ne),at(Ne,t)}function ri(){Ot(Ne),Ot(mr),Ot(Rn)}function pc(t){t.memoizedState!==null&&at(Is,t);var e=Ne.current,n=Sm(e,t.type);e!==n&&(at(mr,t),at(Ne,n))}function tl(t){mr.current===t&&(Ot(Ne),Ot(mr)),Is.current===t&&(Ot(Is),Tr._currentValue=ua)}var oo,Xu;function ia(t){if(oo===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);oo=e&&e[1]||"",Xu=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+oo+t+Xu}var co=!1;function uo(t,e){if(!t||co)return"";co=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(e){var u=function(){throw Error()};if(Object.defineProperty(u.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(u,[])}catch(h){var f=h}Reflect.construct(t,[],u)}else{try{u.call()}catch(h){f=h}t.call(u.prototype)}}else{try{throw Error()}catch(h){f=h}(u=t())&&typeof u.catch=="function"&&u.catch(function(){})}}catch(h){if(h&&f&&typeof h.stack=="string")return[h.stack,f.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var i=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");i&&i.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var r=a.DetermineComponentFrameRoot(),s=r[0],l=r[1];if(s&&l){var o=s.split(`
`),c=l.split(`
`);for(i=a=0;a<o.length&&!o[a].includes("DetermineComponentFrameRoot");)a++;for(;i<c.length&&!c[i].includes("DetermineComponentFrameRoot");)i++;if(a===o.length||i===c.length)for(a=o.length-1,i=c.length-1;1<=a&&0<=i&&o[a]!==c[i];)i--;for(;1<=a&&0<=i;a--,i--)if(o[a]!==c[i]){if(a!==1||i!==1)do if(a--,i--,0>i||o[a]!==c[i]){var d=`
`+o[a].replace(" at new "," at ");return t.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",t.displayName)),d}while(1<=a&&0<=i);break}}}finally{co=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?ia(n):""}function gy(t,e){switch(t.tag){case 26:case 27:case 5:return ia(t.type);case 16:return ia("Lazy");case 13:return t.child!==e&&e!==null?ia("Suspense Fallback"):ia("Suspense");case 19:return ia("SuspenseList");case 0:case 15:return uo(t.type,!1);case 11:return uo(t.type.render,!1);case 1:return uo(t.type,!0);case 31:return ia("Activity");default:return""}}function Fu(t){try{var e="",n=null;do e+=gy(t,n),n=t,t=t.return;while(t);return e}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var gc=Object.prototype.hasOwnProperty,Td=At.unstable_scheduleCallback,fo=At.unstable_cancelCallback,my=At.unstable_shouldYield,by=At.unstable_requestPaint,se=At.unstable_now,yy=At.unstable_getCurrentPriorityLevel,ip=At.unstable_ImmediatePriority,rp=At.unstable_UserBlockingPriority,el=At.unstable_NormalPriority,vy=At.unstable_LowPriority,sp=At.unstable_IdlePriority,xy=At.log,_y=At.unstable_setDisableYieldValue,Vr=null,le=null;function Sn(t){if(typeof xy=="function"&&_y(t),le&&typeof le.setStrictMode=="function")try{le.setStrictMode(Vr,t)}catch{}}var oe=Math.clz32?Math.clz32:wy,ky=Math.log,Sy=Math.LN2;function wy(t){return t>>>=0,t===0?32:31-(ky(t)/Sy|0)|0}var es=256,ns=262144,as=4194304;function ra(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Hl(t,e,n){var a=t.pendingLanes;if(a===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes;t=t.warmLanes;var l=a&134217727;return l!==0?(a=l&~r,a!==0?i=ra(a):(s&=l,s!==0?i=ra(s):n||(n=l&~t,n!==0&&(i=ra(n))))):(l=a&~r,l!==0?i=ra(l):s!==0?i=ra(s):n||(n=a&~t,n!==0&&(i=ra(n)))),i===0?0:e!==0&&e!==i&&!(e&r)&&(r=i&-i,n=e&-e,r>=n||r===32&&(n&4194048)!==0)?e:i}function Yr(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function My(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function lp(){var t=as;return as<<=1,!(as&62914560)&&(as=4194304),t}function ho(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Gr(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Ay(t,e,n,a,i,r){var s=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var l=t.entanglements,o=t.expirationTimes,c=t.hiddenUpdates;for(n=s&~n;0<n;){var d=31-oe(n),u=1<<d;l[d]=0,o[d]=-1;var f=c[d];if(f!==null)for(c[d]=null,d=0;d<f.length;d++){var h=f[d];h!==null&&(h.lane&=-536870913)}n&=~u}a!==0&&op(t,a,0),r!==0&&i===0&&t.tag!==0&&(t.suspendedLanes|=r&~(s&~e))}function op(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var a=31-oe(e);t.entangledLanes|=e,t.entanglements[a]=t.entanglements[a]|1073741824|n&261930}function cp(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var a=31-oe(n),i=1<<a;i&e|t[a]&e&&(t[a]|=e),n&=~i}}function dp(t,e){var n=e&-e;return n=n&42?1:Dd(n),n&(t.suspendedLanes|e)?0:n}function Dd(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Cd(t){return t&=-t,2<t?8<t?t&134217727?32:268435456:8:2}function up(){var t=P.p;return t!==0?t:(t=window.event,t===void 0?32:Lm(t.type))}function Qu(t,e){var n=P.p;try{return P.p=t,e()}finally{P.p=n}}var Pn=Math.random().toString(36).slice(2),zt="__reactFiber$"+Pn,$t="__reactProps$"+Pn,_i="__reactContainer$"+Pn,mc="__reactEvents$"+Pn,Ty="__reactListeners$"+Pn,Dy="__reactHandles$"+Pn,Zu="__reactResources$"+Pn,qr="__reactMarker$"+Pn;function Od(t){delete t[zt],delete t[$t],delete t[mc],delete t[Ty],delete t[Dy]}function Ya(t){var e=t[zt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[_i]||n[zt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=eh(t);t!==null;){if(n=t[zt])return n;t=eh(t)}return e}t=n,n=t.parentNode}return null}function ki(t){if(t=t[zt]||t[_i]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Gi(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(M(33))}function Ja(t){var e=t[Zu];return e||(e=t[Zu]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Dt(t){t[qr]=!0}var fp=new Set,hp={};function Ma(t,e){si(t,e),si(t+"Capture",e)}function si(t,e){for(hp[t]=e,t=0;t<e.length;t++)fp.add(e[t])}var Cy=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Ku={},Pu={};function Oy(t){return gc.call(Pu,t)?!0:gc.call(Ku,t)?!1:Cy.test(t)?Pu[t]=!0:(Ku[t]=!0,!1)}function Ds(t,e,n){if(Oy(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var a=e.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function is(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function Ge(t,e,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+a)}}function pe(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function pp(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Ey(t,e,n){var a=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var i=a.get,r=a.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(s){n=""+s,r.call(this,s)}}),Object.defineProperty(t,e,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(s){n=""+s},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function bc(t){if(!t._valueTracker){var e=pp(t)?"checked":"value";t._valueTracker=Ey(t,e,""+t[e])}}function gp(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),a="";return t&&(a=pp(t)?t.checked?"true":"false":t.value),t=a,t!==n?(e.setValue(t),!0):!1}function nl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var zy=/[\n"\\]/g;function be(t){return t.replace(zy,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function yc(t,e,n,a,i,r,s,l){t.name="",s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?t.type=s:t.removeAttribute("type"),e!=null?s==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+pe(e)):t.value!==""+pe(e)&&(t.value=""+pe(e)):s!=="submit"&&s!=="reset"||t.removeAttribute("value"),e!=null?vc(t,s,pe(e)):n!=null?vc(t,s,pe(n)):a!=null&&t.removeAttribute("value"),i==null&&r!=null&&(t.defaultChecked=!!r),i!=null&&(t.checked=i&&typeof i!="function"&&typeof i!="symbol"),l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"?t.name=""+pe(l):t.removeAttribute("name")}function mp(t,e,n,a,i,r,s,l){if(r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(t.type=r),e!=null||n!=null){if(!(r!=="submit"&&r!=="reset"||e!=null)){bc(t);return}n=n!=null?""+pe(n):"",e=e!=null?""+pe(e):n,l||e===t.value||(t.value=e),t.defaultValue=e}a=a??i,a=typeof a!="function"&&typeof a!="symbol"&&!!a,t.checked=l?t.checked:!!a,t.defaultChecked=!!a,s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(t.name=s),bc(t)}function vc(t,e,n){e==="number"&&nl(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function Ia(t,e,n,a){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&a&&(t[n].defaultSelected=!0)}else{for(n=""+pe(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,a&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function bp(t,e,n){if(e!=null&&(e=""+pe(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+pe(n):""}function yp(t,e,n,a){if(e==null){if(a!=null){if(n!=null)throw Error(M(92));if(Yi(a)){if(1<a.length)throw Error(M(93));a=a[0]}n=a}n==null&&(n=""),e=n}n=pe(e),t.defaultValue=n,a=t.textContent,a===n&&a!==""&&a!==null&&(t.value=a),bc(t)}function li(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Ry=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Wu(t,e,n){var a=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":a?t.setProperty(e,n):typeof n!="number"||n===0||Ry.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function vp(t,e,n){if(e!=null&&typeof e!="object")throw Error(M(62));if(t=t.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||e!=null&&e.hasOwnProperty(a)||(a.indexOf("--")===0?t.setProperty(a,""):a==="float"?t.cssFloat="":t[a]="");for(var i in e)a=e[i],e.hasOwnProperty(i)&&n[i]!==a&&Wu(t,i,a)}else for(var r in e)e.hasOwnProperty(r)&&Wu(t,r,e[r])}function Ed(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ly=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),By=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Cs(t){return By.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function en(){}var xc=null;function zd(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ga=null,$a=null;function Ju(t){var e=ki(t);if(e&&(t=e.stateNode)){var n=t[$t]||null;t:switch(t=e.stateNode,e.type){case"input":if(yc(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+be(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var a=n[e];if(a!==t&&a.form===t.form){var i=a[$t]||null;if(!i)throw Error(M(90));yc(a,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(e=0;e<n.length;e++)a=n[e],a.form===t.form&&gp(a)}break t;case"textarea":bp(t,n.value,n.defaultValue);break t;case"select":e=n.value,e!=null&&Ia(t,!!n.multiple,e,!1)}}}var po=!1;function xp(t,e,n){if(po)return t(e,n);po=!0;try{var a=t(e);return a}finally{if(po=!1,(Ga!==null||$a!==null)&&(Wl(),Ga&&(e=Ga,t=$a,$a=Ga=null,Ju(e),t)))for(e=0;e<t.length;e++)Ju(t[e])}}function br(t,e){var n=t.stateNode;if(n===null)return null;var a=n[$t]||null;if(a===null)return null;n=a[e];t:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(t=t.type,a=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!a;break t;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(M(231,e,typeof n));return n}var dn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),_c=!1;if(dn)try{var Ci={};Object.defineProperty(Ci,"passive",{get:function(){_c=!0}}),window.addEventListener("test",Ci,Ci),window.removeEventListener("test",Ci,Ci)}catch{_c=!1}var wn=null,Rd=null,Os=null;function _p(){if(Os)return Os;var t,e=Rd,n=e.length,a,i="value"in wn?wn.value:wn.textContent,r=i.length;for(t=0;t<n&&e[t]===i[t];t++);var s=n-t;for(a=1;a<=s&&e[n-a]===i[r-a];a++);return Os=i.slice(t,1<a?1-a:void 0)}function Es(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function rs(){return!0}function Iu(){return!1}function te(t){function e(n,a,i,r,s){this._reactName=n,this._targetInst=i,this.type=a,this.nativeEvent=r,this.target=s,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(r):r[l]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?rs:Iu,this.isPropagationStopped=Iu,this}return ct(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=rs)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=rs)},persist:function(){},isPersistent:rs}),e}var Aa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ul=te(Aa),Xr=ct({},Aa,{view:0,detail:0}),Ny=te(Xr),go,mo,Oi,Vl=ct({},Xr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ld,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Oi&&(Oi&&t.type==="mousemove"?(go=t.screenX-Oi.screenX,mo=t.screenY-Oi.screenY):mo=go=0,Oi=t),go)},movementY:function(t){return"movementY"in t?t.movementY:mo}}),$u=te(Vl),jy=ct({},Vl,{dataTransfer:0}),Hy=te(jy),Uy=ct({},Xr,{relatedTarget:0}),bo=te(Uy),Vy=ct({},Aa,{animationName:0,elapsedTime:0,pseudoElement:0}),Yy=te(Vy),Gy=ct({},Aa,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),qy=te(Gy),Xy=ct({},Aa,{data:0}),tf=te(Xy),Fy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Qy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Zy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ky(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Zy[t])?!!e[t]:!1}function Ld(){return Ky}var Py=ct({},Xr,{key:function(t){if(t.key){var e=Fy[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Es(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Qy[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ld,charCode:function(t){return t.type==="keypress"?Es(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Es(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Wy=te(Py),Jy=ct({},Vl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ef=te(Jy),Iy=ct({},Xr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ld}),$y=te(Iy),tv=ct({},Aa,{propertyName:0,elapsedTime:0,pseudoElement:0}),ev=te(tv),nv=ct({},Vl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),av=te(nv),iv=ct({},Aa,{newState:0,oldState:0}),rv=te(iv),sv=[9,13,27,32],Bd=dn&&"CompositionEvent"in window,Ii=null;dn&&"documentMode"in document&&(Ii=document.documentMode);var lv=dn&&"TextEvent"in window&&!Ii,kp=dn&&(!Bd||Ii&&8<Ii&&11>=Ii),nf=" ",af=!1;function Sp(t,e){switch(t){case"keyup":return sv.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function wp(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var qa=!1;function ov(t,e){switch(t){case"compositionend":return wp(e);case"keypress":return e.which!==32?null:(af=!0,nf);case"textInput":return t=e.data,t===nf&&af?null:t;default:return null}}function cv(t,e){if(qa)return t==="compositionend"||!Bd&&Sp(t,e)?(t=_p(),Os=Rd=wn=null,qa=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return kp&&e.locale!=="ko"?null:e.data;default:return null}}var dv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function rf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!dv[t.type]:e==="textarea"}function Mp(t,e,n,a){Ga?$a?$a.push(a):$a=[a]:Ga=a,e=xl(e,"onChange"),0<e.length&&(n=new Ul("onChange","change",null,n,a),t.push({event:n,listeners:e}))}var $i=null,yr=null;function uv(t){xm(t,0)}function Yl(t){var e=Gi(t);if(gp(e))return t}function sf(t,e){if(t==="change")return e}var Ap=!1;if(dn){var yo;if(dn){var vo="oninput"in document;if(!vo){var lf=document.createElement("div");lf.setAttribute("oninput","return;"),vo=typeof lf.oninput=="function"}yo=vo}else yo=!1;Ap=yo&&(!document.documentMode||9<document.documentMode)}function of(){$i&&($i.detachEvent("onpropertychange",Tp),yr=$i=null)}function Tp(t){if(t.propertyName==="value"&&Yl(yr)){var e=[];Mp(e,yr,t,zd(t)),xp(uv,e)}}function fv(t,e,n){t==="focusin"?(of(),$i=e,yr=n,$i.attachEvent("onpropertychange",Tp)):t==="focusout"&&of()}function hv(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Yl(yr)}function pv(t,e){if(t==="click")return Yl(e)}function gv(t,e){if(t==="input"||t==="change")return Yl(e)}function mv(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var de=typeof Object.is=="function"?Object.is:mv;function vr(t,e){if(de(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),a=Object.keys(e);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var i=n[a];if(!gc.call(e,i)||!de(t[i],e[i]))return!1}return!0}function cf(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function df(t,e){var n=cf(t);t=0;for(var a;n;){if(n.nodeType===3){if(a=t+n.textContent.length,t<=e&&a>=e)return{node:n,offset:e-t};t=a}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=cf(n)}}function Dp(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Dp(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Cp(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=nl(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=nl(t.document)}return e}function Nd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var bv=dn&&"documentMode"in document&&11>=document.documentMode,Xa=null,kc=null,tr=null,Sc=!1;function uf(t,e,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Sc||Xa==null||Xa!==nl(a)||(a=Xa,"selectionStart"in a&&Nd(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),tr&&vr(tr,a)||(tr=a,a=xl(kc,"onSelect"),0<a.length&&(e=new Ul("onSelect","select",null,e,n),t.push({event:e,listeners:a}),e.target=Xa)))}function $n(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Fa={animationend:$n("Animation","AnimationEnd"),animationiteration:$n("Animation","AnimationIteration"),animationstart:$n("Animation","AnimationStart"),transitionrun:$n("Transition","TransitionRun"),transitionstart:$n("Transition","TransitionStart"),transitioncancel:$n("Transition","TransitionCancel"),transitionend:$n("Transition","TransitionEnd")},xo={},Op={};dn&&(Op=document.createElement("div").style,"AnimationEvent"in window||(delete Fa.animationend.animation,delete Fa.animationiteration.animation,delete Fa.animationstart.animation),"TransitionEvent"in window||delete Fa.transitionend.transition);function Ta(t){if(xo[t])return xo[t];if(!Fa[t])return t;var e=Fa[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Op)return xo[t]=e[n];return t}var Ep=Ta("animationend"),zp=Ta("animationiteration"),Rp=Ta("animationstart"),yv=Ta("transitionrun"),vv=Ta("transitionstart"),xv=Ta("transitioncancel"),Lp=Ta("transitionend"),Bp=new Map,wc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");wc.push("scrollEnd");function Ce(t,e){Bp.set(t,e),Ma(e,[t])}var al=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},he=[],Qa=0,jd=0;function Gl(){for(var t=Qa,e=jd=Qa=0;e<t;){var n=he[e];he[e++]=null;var a=he[e];he[e++]=null;var i=he[e];he[e++]=null;var r=he[e];if(he[e++]=null,a!==null&&i!==null){var s=a.pending;s===null?i.next=i:(i.next=s.next,s.next=i),a.pending=i}r!==0&&Np(n,i,r)}}function ql(t,e,n,a){he[Qa++]=t,he[Qa++]=e,he[Qa++]=n,he[Qa++]=a,jd|=a,t.lanes|=a,t=t.alternate,t!==null&&(t.lanes|=a)}function Hd(t,e,n,a){return ql(t,e,n,a),il(t)}function Da(t,e){return ql(t,null,null,e),il(t)}function Np(t,e,n){t.lanes|=n;var a=t.alternate;a!==null&&(a.lanes|=n);for(var i=!1,r=t.return;r!==null;)r.childLanes|=n,a=r.alternate,a!==null&&(a.childLanes|=n),r.tag===22&&(t=r.stateNode,t===null||t._visibility&1||(i=!0)),t=r,r=r.return;return t.tag===3?(r=t.stateNode,i&&e!==null&&(i=31-oe(n),t=r.hiddenUpdates,a=t[i],a===null?t[i]=[e]:a.push(e),e.lane=n|536870912),r):null}function il(t){if(50<cr)throw cr=0,Fc=null,Error(M(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var Za={};function _v(t,e,n,a){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ie(t,e,n,a){return new _v(t,e,n,a)}function Ud(t){return t=t.prototype,!(!t||!t.isReactComponent)}function ln(t,e){var n=t.alternate;return n===null?(n=ie(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function jp(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function zs(t,e,n,a,i,r){var s=0;if(a=t,typeof t=="function")Ud(t)&&(s=1);else if(typeof t=="string")s=Ax(t,n,Ne.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case uc:return t=ie(31,n,e,i),t.elementType=uc,t.lanes=r,t;case Ua:return fa(n.children,i,r,e);case np:s=8,i|=24;break;case oc:return t=ie(12,n,e,i|2),t.elementType=oc,t.lanes=r,t;case cc:return t=ie(13,n,e,i),t.elementType=cc,t.lanes=r,t;case dc:return t=ie(19,n,e,i),t.elementType=dc,t.lanes=r,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case tn:s=10;break t;case ap:s=9;break t;case Md:s=11;break t;case Ad:s=14;break t;case bn:s=16,a=null;break t}s=29,n=Error(M(130,t===null?"null":typeof t,"")),a=null}return e=ie(s,n,e,i),e.elementType=t,e.type=a,e.lanes=r,e}function fa(t,e,n,a){return t=ie(7,t,a,e),t.lanes=n,t}function _o(t,e,n){return t=ie(6,t,null,e),t.lanes=n,t}function Hp(t){var e=ie(18,null,null,0);return e.stateNode=t,e}function ko(t,e,n){return e=ie(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var ff=new WeakMap;function ye(t,e){if(typeof t=="object"&&t!==null){var n=ff.get(t);return n!==void 0?n:(e={value:t,source:e,stack:Fu(e)},ff.set(t,e),e)}return{value:t,source:e,stack:Fu(e)}}var Ka=[],Pa=0,rl=null,xr=0,ge=[],me=0,qn=null,Re=1,Le="";function We(t,e){Ka[Pa++]=xr,Ka[Pa++]=rl,rl=t,xr=e}function Up(t,e,n){ge[me++]=Re,ge[me++]=Le,ge[me++]=qn,qn=t;var a=Re;t=Le;var i=32-oe(a)-1;a&=~(1<<i),n+=1;var r=32-oe(e)+i;if(30<r){var s=i-i%5;r=(a&(1<<s)-1).toString(32),a>>=s,i-=s,Re=1<<32-oe(e)+i|n<<i|a,Le=r+t}else Re=1<<r|n<<i|a,Le=t}function Vd(t){t.return!==null&&(We(t,1),Up(t,1,0))}function Yd(t){for(;t===rl;)rl=Ka[--Pa],Ka[Pa]=null,xr=Ka[--Pa],Ka[Pa]=null;for(;t===qn;)qn=ge[--me],ge[me]=null,Le=ge[--me],ge[me]=null,Re=ge[--me],ge[me]=null}function Vp(t,e){ge[me++]=Re,ge[me++]=Le,ge[me++]=qn,Re=e.id,Le=e.overflow,qn=t}var Rt=null,st=null,F=!1,Ln=null,ve=!1,Mc=Error(M(519));function Xn(t){var e=Error(M(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw _r(ye(e,t)),Mc}function hf(t){var e=t.stateNode,n=t.type,a=t.memoizedProps;switch(e[zt]=t,e[$t]=a,n){case"dialog":V("cancel",e),V("close",e);break;case"iframe":case"object":case"embed":V("load",e);break;case"video":case"audio":for(n=0;n<Mr.length;n++)V(Mr[n],e);break;case"source":V("error",e);break;case"img":case"image":case"link":V("error",e),V("load",e);break;case"details":V("toggle",e);break;case"input":V("invalid",e),mp(e,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":V("invalid",e);break;case"textarea":V("invalid",e),yp(e,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||a.suppressHydrationWarning===!0||km(e.textContent,n)?(a.popover!=null&&(V("beforetoggle",e),V("toggle",e)),a.onScroll!=null&&V("scroll",e),a.onScrollEnd!=null&&V("scrollend",e),a.onClick!=null&&(e.onclick=en),e=!0):e=!1,e||Xn(t,!0)}function pf(t){for(Rt=t.return;Rt;)switch(Rt.tag){case 5:case 31:case 13:ve=!1;return;case 27:case 3:ve=!0;return;default:Rt=Rt.return}}function Ea(t){if(t!==Rt)return!1;if(!F)return pf(t),F=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||Wc(t.type,t.memoizedProps)),n=!n),n&&st&&Xn(t),pf(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(M(317));st=th(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(M(317));st=th(t)}else e===27?(e=st,Wn(t.type)?(t=td,td=null,st=t):st=e):st=Rt?_e(t.stateNode.nextSibling):null;return!0}function ya(){st=Rt=null,F=!1}function So(){var t=Ln;return t!==null&&(Wt===null?Wt=t:Wt.push.apply(Wt,t),Ln=null),t}function _r(t){Ln===null?Ln=[t]:Ln.push(t)}var Ac=He(null),Ca=null,nn=null;function vn(t,e,n){at(Ac,e._currentValue),e._currentValue=n}function on(t){t._currentValue=Ac.current,Ot(Ac)}function Tc(t,e,n){for(;t!==null;){var a=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,a!==null&&(a.childLanes|=e)):a!==null&&(a.childLanes&e)!==e&&(a.childLanes|=e),t===n)break;t=t.return}}function Dc(t,e,n,a){var i=t.child;for(i!==null&&(i.return=t);i!==null;){var r=i.dependencies;if(r!==null){var s=i.child;r=r.firstContext;t:for(;r!==null;){var l=r;r=i;for(var o=0;o<e.length;o++)if(l.context===e[o]){r.lanes|=n,l=r.alternate,l!==null&&(l.lanes|=n),Tc(r.return,n,t),a||(s=null);break t}r=l.next}}else if(i.tag===18){if(s=i.return,s===null)throw Error(M(341));s.lanes|=n,r=s.alternate,r!==null&&(r.lanes|=n),Tc(s,n,t),s=null}else s=i.child;if(s!==null)s.return=i;else for(s=i;s!==null;){if(s===t){s=null;break}if(i=s.sibling,i!==null){i.return=s.return,s=i;break}s=s.return}i=s}}function Si(t,e,n,a){t=null;for(var i=e,r=!1;i!==null;){if(!r){if(i.flags&524288)r=!0;else if(i.flags&262144)break}if(i.tag===10){var s=i.alternate;if(s===null)throw Error(M(387));if(s=s.memoizedProps,s!==null){var l=i.type;de(i.pendingProps.value,s.value)||(t!==null?t.push(l):t=[l])}}else if(i===Is.current){if(s=i.alternate,s===null)throw Error(M(387));s.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(t!==null?t.push(Tr):t=[Tr])}i=i.return}t!==null&&Dc(e,t,n,a),e.flags|=262144}function sl(t){for(t=t.firstContext;t!==null;){if(!de(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function va(t){Ca=t,nn=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Lt(t){return Yp(Ca,t)}function ss(t,e){return Ca===null&&va(t),Yp(t,e)}function Yp(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},nn===null){if(t===null)throw Error(M(308));nn=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else nn=nn.next=e;return n}var kv=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,a){t.push(a)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},Sv=At.unstable_scheduleCallback,wv=At.unstable_NormalPriority,kt={$$typeof:tn,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Gd(){return{controller:new kv,data:new Map,refCount:0}}function Fr(t){t.refCount--,t.refCount===0&&Sv(wv,function(){t.controller.abort()})}var er=null,Cc=0,oi=0,ti=null;function Mv(t,e){if(er===null){var n=er=[];Cc=0,oi=hu(),ti={status:"pending",value:void 0,then:function(a){n.push(a)}}}return Cc++,e.then(gf,gf),e}function gf(){if(--Cc===0&&er!==null){ti!==null&&(ti.status="fulfilled");var t=er;er=null,oi=0,ti=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function Av(t,e){var n=[],a={status:"pending",value:null,reason:null,then:function(i){n.push(i)}};return t.then(function(){a.status="fulfilled",a.value=e;for(var i=0;i<n.length;i++)(0,n[i])(e)},function(i){for(a.status="rejected",a.reason=i,i=0;i<n.length;i++)(0,n[i])(void 0)}),a}var mf=L.S;L.S=function(t,e){em=se(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Mv(t,e),mf!==null&&mf(t,e)};var ha=He(null);function qd(){var t=ha.current;return t!==null?t:et.pooledCache}function Rs(t,e){e===null?at(ha,ha.current):at(ha,e.pool)}function Gp(){var t=qd();return t===null?null:{parent:kt._currentValue,pool:t}}var wi=Error(M(460)),Xd=Error(M(474)),Xl=Error(M(542)),ll={then:function(){}};function bf(t){return t=t.status,t==="fulfilled"||t==="rejected"}function qp(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(en,en),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,vf(t),t;default:if(typeof e.status=="string")e.then(en,en);else{if(t=et,t!==null&&100<t.shellSuspendCounter)throw Error(M(482));t=e,t.status="pending",t.then(function(a){if(e.status==="pending"){var i=e;i.status="fulfilled",i.value=a}},function(a){if(e.status==="pending"){var i=e;i.status="rejected",i.reason=a}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,vf(t),t}throw pa=e,wi}}function sa(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(pa=n,wi):n}}var pa=null;function yf(){if(pa===null)throw Error(M(459));var t=pa;return pa=null,t}function vf(t){if(t===wi||t===Xl)throw Error(M(483))}var ei=null,kr=0;function ls(t){var e=kr;return kr+=1,ei===null&&(ei=[]),qp(ei,t,e)}function Ei(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function os(t,e){throw e.$$typeof===fy?Error(M(525)):(t=Object.prototype.toString.call(e),Error(M(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function Xp(t){function e(p,g){if(t){var y=p.deletions;y===null?(p.deletions=[g],p.flags|=16):y.push(g)}}function n(p,g){if(!t)return null;for(;g!==null;)e(p,g),g=g.sibling;return null}function a(p){for(var g=new Map;p!==null;)p.key!==null?g.set(p.key,p):g.set(p.index,p),p=p.sibling;return g}function i(p,g){return p=ln(p,g),p.index=0,p.sibling=null,p}function r(p,g,y){return p.index=y,t?(y=p.alternate,y!==null?(y=y.index,y<g?(p.flags|=67108866,g):y):(p.flags|=67108866,g)):(p.flags|=1048576,g)}function s(p){return t&&p.alternate===null&&(p.flags|=67108866),p}function l(p,g,y,x){return g===null||g.tag!==6?(g=_o(y,p.mode,x),g.return=p,g):(g=i(g,y),g.return=p,g)}function o(p,g,y,x){var _=y.type;return _===Ua?d(p,g,y.props.children,x,y.key):g!==null&&(g.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===bn&&sa(_)===g.type)?(g=i(g,y.props),Ei(g,y),g.return=p,g):(g=zs(y.type,y.key,y.props,null,p.mode,x),Ei(g,y),g.return=p,g)}function c(p,g,y,x){return g===null||g.tag!==4||g.stateNode.containerInfo!==y.containerInfo||g.stateNode.implementation!==y.implementation?(g=ko(y,p.mode,x),g.return=p,g):(g=i(g,y.children||[]),g.return=p,g)}function d(p,g,y,x,_){return g===null||g.tag!==7?(g=fa(y,p.mode,x,_),g.return=p,g):(g=i(g,y),g.return=p,g)}function u(p,g,y){if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return g=_o(""+g,p.mode,y),g.return=p,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case ts:return y=zs(g.type,g.key,g.props,null,p.mode,y),Ei(y,g),y.return=p,y;case Vi:return g=ko(g,p.mode,y),g.return=p,g;case bn:return g=sa(g),u(p,g,y)}if(Yi(g)||Di(g))return g=fa(g,p.mode,y,null),g.return=p,g;if(typeof g.then=="function")return u(p,ls(g),y);if(g.$$typeof===tn)return u(p,ss(p,g),y);os(p,g)}return null}function f(p,g,y,x){var _=g!==null?g.key:null;if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return _!==null?null:l(p,g,""+y,x);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case ts:return y.key===_?o(p,g,y,x):null;case Vi:return y.key===_?c(p,g,y,x):null;case bn:return y=sa(y),f(p,g,y,x)}if(Yi(y)||Di(y))return _!==null?null:d(p,g,y,x,null);if(typeof y.then=="function")return f(p,g,ls(y),x);if(y.$$typeof===tn)return f(p,g,ss(p,y),x);os(p,y)}return null}function h(p,g,y,x,_){if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return p=p.get(y)||null,l(g,p,""+x,_);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case ts:return p=p.get(x.key===null?y:x.key)||null,o(g,p,x,_);case Vi:return p=p.get(x.key===null?y:x.key)||null,c(g,p,x,_);case bn:return x=sa(x),h(p,g,y,x,_)}if(Yi(x)||Di(x))return p=p.get(y)||null,d(g,p,x,_,null);if(typeof x.then=="function")return h(p,g,y,ls(x),_);if(x.$$typeof===tn)return h(p,g,y,ss(g,x),_);os(g,x)}return null}function m(p,g,y,x){for(var _=null,w=null,k=g,S=g=0,A=null;k!==null&&S<y.length;S++){k.index>S?(A=k,k=null):A=k.sibling;var C=f(p,k,y[S],x);if(C===null){k===null&&(k=A);break}t&&k&&C.alternate===null&&e(p,k),g=r(C,g,S),w===null?_=C:w.sibling=C,w=C,k=A}if(S===y.length)return n(p,k),F&&We(p,S),_;if(k===null){for(;S<y.length;S++)k=u(p,y[S],x),k!==null&&(g=r(k,g,S),w===null?_=k:w.sibling=k,w=k);return F&&We(p,S),_}for(k=a(k);S<y.length;S++)A=h(k,p,S,y[S],x),A!==null&&(t&&A.alternate!==null&&k.delete(A.key===null?S:A.key),g=r(A,g,S),w===null?_=A:w.sibling=A,w=A);return t&&k.forEach(function(z){return e(p,z)}),F&&We(p,S),_}function b(p,g,y,x){if(y==null)throw Error(M(151));for(var _=null,w=null,k=g,S=g=0,A=null,C=y.next();k!==null&&!C.done;S++,C=y.next()){k.index>S?(A=k,k=null):A=k.sibling;var z=f(p,k,C.value,x);if(z===null){k===null&&(k=A);break}t&&k&&z.alternate===null&&e(p,k),g=r(z,g,S),w===null?_=z:w.sibling=z,w=z,k=A}if(C.done)return n(p,k),F&&We(p,S),_;if(k===null){for(;!C.done;S++,C=y.next())C=u(p,C.value,x),C!==null&&(g=r(C,g,S),w===null?_=C:w.sibling=C,w=C);return F&&We(p,S),_}for(k=a(k);!C.done;S++,C=y.next())C=h(k,p,S,C.value,x),C!==null&&(t&&C.alternate!==null&&k.delete(C.key===null?S:C.key),g=r(C,g,S),w===null?_=C:w.sibling=C,w=C);return t&&k.forEach(function(N){return e(p,N)}),F&&We(p,S),_}function v(p,g,y,x){if(typeof y=="object"&&y!==null&&y.type===Ua&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case ts:t:{for(var _=y.key;g!==null;){if(g.key===_){if(_=y.type,_===Ua){if(g.tag===7){n(p,g.sibling),x=i(g,y.props.children),x.return=p,p=x;break t}}else if(g.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===bn&&sa(_)===g.type){n(p,g.sibling),x=i(g,y.props),Ei(x,y),x.return=p,p=x;break t}n(p,g);break}else e(p,g);g=g.sibling}y.type===Ua?(x=fa(y.props.children,p.mode,x,y.key),x.return=p,p=x):(x=zs(y.type,y.key,y.props,null,p.mode,x),Ei(x,y),x.return=p,p=x)}return s(p);case Vi:t:{for(_=y.key;g!==null;){if(g.key===_)if(g.tag===4&&g.stateNode.containerInfo===y.containerInfo&&g.stateNode.implementation===y.implementation){n(p,g.sibling),x=i(g,y.children||[]),x.return=p,p=x;break t}else{n(p,g);break}else e(p,g);g=g.sibling}x=ko(y,p.mode,x),x.return=p,p=x}return s(p);case bn:return y=sa(y),v(p,g,y,x)}if(Yi(y))return m(p,g,y,x);if(Di(y)){if(_=Di(y),typeof _!="function")throw Error(M(150));return y=_.call(y),b(p,g,y,x)}if(typeof y.then=="function")return v(p,g,ls(y),x);if(y.$$typeof===tn)return v(p,g,ss(p,y),x);os(p,y)}return typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint"?(y=""+y,g!==null&&g.tag===6?(n(p,g.sibling),x=i(g,y),x.return=p,p=x):(n(p,g),x=_o(y,p.mode,x),x.return=p,p=x),s(p)):n(p,g)}return function(p,g,y,x){try{kr=0;var _=v(p,g,y,x);return ei=null,_}catch(k){if(k===wi||k===Xl)throw k;var w=ie(29,k,null,p.mode);return w.lanes=x,w.return=p,w}finally{}}}var xa=Xp(!0),Fp=Xp(!1),yn=!1;function Fd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Oc(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Bn(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Nn(t,e,n){var a=t.updateQueue;if(a===null)return null;if(a=a.shared,K&2){var i=a.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),a.pending=e,e=il(t),Np(t,null,n),e}return ql(t,a,e,n),il(t)}function nr(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,cp(t,n)}}function wo(t,e){var n=t.updateQueue,a=t.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var i=null,r=null;if(n=n.firstBaseUpdate,n!==null){do{var s={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};r===null?i=r=s:r=r.next=s,n=n.next}while(n!==null);r===null?i=r=e:r=r.next=e}else i=r=e;n={baseState:a.baseState,firstBaseUpdate:i,lastBaseUpdate:r,shared:a.shared,callbacks:a.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var Ec=!1;function ar(){if(Ec){var t=ti;if(t!==null)throw t}}function ir(t,e,n,a){Ec=!1;var i=t.updateQueue;yn=!1;var r=i.firstBaseUpdate,s=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var o=l,c=o.next;o.next=null,s===null?r=c:s.next=c,s=o;var d=t.alternate;d!==null&&(d=d.updateQueue,l=d.lastBaseUpdate,l!==s&&(l===null?d.firstBaseUpdate=c:l.next=c,d.lastBaseUpdate=o))}if(r!==null){var u=i.baseState;s=0,d=c=o=null,l=r;do{var f=l.lane&-536870913,h=f!==l.lane;if(h?(q&f)===f:(a&f)===f){f!==0&&f===oi&&(Ec=!0),d!==null&&(d=d.next={lane:0,tag:l.tag,payload:l.payload,callback:null,next:null});t:{var m=t,b=l;f=e;var v=n;switch(b.tag){case 1:if(m=b.payload,typeof m=="function"){u=m.call(v,u,f);break t}u=m;break t;case 3:m.flags=m.flags&-65537|128;case 0:if(m=b.payload,f=typeof m=="function"?m.call(v,u,f):m,f==null)break t;u=ct({},u,f);break t;case 2:yn=!0}}f=l.callback,f!==null&&(t.flags|=64,h&&(t.flags|=8192),h=i.callbacks,h===null?i.callbacks=[f]:h.push(f))}else h={lane:f,tag:l.tag,payload:l.payload,callback:l.callback,next:null},d===null?(c=d=h,o=u):d=d.next=h,s|=f;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;h=l,l=h.next,h.next=null,i.lastBaseUpdate=h,i.shared.pending=null}}while(!0);d===null&&(o=u),i.baseState=o,i.firstBaseUpdate=c,i.lastBaseUpdate=d,r===null&&(i.shared.lanes=0),Qn|=s,t.lanes=s,t.memoizedState=u}}function Qp(t,e){if(typeof t!="function")throw Error(M(191,t));t.call(e)}function Zp(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)Qp(n[t],e)}var ci=He(null),ol=He(0);function xf(t,e){t=pn,at(ol,t),at(ci,e),pn=t|e.baseLanes}function zc(){at(ol,pn),at(ci,ci.current)}function Qd(){pn=ol.current,Ot(ci),Ot(ol)}var ue=He(null),xe=null;function xn(t){var e=t.alternate;at(mt,mt.current&1),at(ue,t),xe===null&&(e===null||ci.current!==null||e.memoizedState!==null)&&(xe=t)}function Rc(t){at(mt,mt.current),at(ue,t),xe===null&&(xe=t)}function Kp(t){t.tag===22?(at(mt,mt.current),at(ue,t),xe===null&&(xe=t)):_n()}function _n(){at(mt,mt.current),at(ue,ue.current)}function ae(t){Ot(ue),xe===t&&(xe=null),Ot(mt)}var mt=He(0);function cl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Ic(n)||$c(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var un=0,H=null,tt=null,xt=null,dl=!1,ni=!1,_a=!1,ul=0,Sr=0,ai=null,Tv=0;function ht(){throw Error(M(321))}function Zd(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!de(t[n],e[n]))return!1;return!0}function Kd(t,e,n,a,i,r){return un=r,H=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,L.H=t===null||t.memoizedState===null?Mg:ru,_a=!1,r=n(a,i),_a=!1,ni&&(r=Wp(e,n,a,i)),Pp(t),r}function Pp(t){L.H=wr;var e=tt!==null&&tt.next!==null;if(un=0,xt=tt=H=null,dl=!1,Sr=0,ai=null,e)throw Error(M(300));t===null||St||(t=t.dependencies,t!==null&&sl(t)&&(St=!0))}function Wp(t,e,n,a){H=t;var i=0;do{if(ni&&(ai=null),Sr=0,ni=!1,25<=i)throw Error(M(301));if(i+=1,xt=tt=null,t.updateQueue!=null){var r=t.updateQueue;r.lastEffect=null,r.events=null,r.stores=null,r.memoCache!=null&&(r.memoCache.index=0)}L.H=Ag,r=e(n,a)}while(ni);return r}function Dv(){var t=L.H,e=t.useState()[0];return e=typeof e.then=="function"?Qr(e):e,t=t.useState()[0],(tt!==null?tt.memoizedState:null)!==t&&(H.flags|=1024),e}function Pd(){var t=ul!==0;return ul=0,t}function Wd(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function Jd(t){if(dl){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}dl=!1}un=0,xt=tt=H=null,ni=!1,Sr=ul=0,ai=null}function qt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return xt===null?H.memoizedState=xt=t:xt=xt.next=t,xt}function yt(){if(tt===null){var t=H.alternate;t=t!==null?t.memoizedState:null}else t=tt.next;var e=xt===null?H.memoizedState:xt.next;if(e!==null)xt=e,tt=t;else{if(t===null)throw H.alternate===null?Error(M(467)):Error(M(310));tt=t,t={memoizedState:tt.memoizedState,baseState:tt.baseState,baseQueue:tt.baseQueue,queue:tt.queue,next:null},xt===null?H.memoizedState=xt=t:xt=xt.next=t}return xt}function Fl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Qr(t){var e=Sr;return Sr+=1,ai===null&&(ai=[]),t=qp(ai,t,e),e=H,(xt===null?e.memoizedState:xt.next)===null&&(e=e.alternate,L.H=e===null||e.memoizedState===null?Mg:ru),t}function Ql(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Qr(t);if(t.$$typeof===tn)return Lt(t)}throw Error(M(438,String(t)))}function Id(t){var e=null,n=H.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var a=H.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(e={data:a.data.map(function(i){return i.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=Fl(),H.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),a=0;a<t;a++)n[a]=hy;return e.index++,n}function fn(t,e){return typeof e=="function"?e(t):e}function Ls(t){var e=yt();return $d(e,tt,t)}function $d(t,e,n){var a=t.queue;if(a===null)throw Error(M(311));a.lastRenderedReducer=n;var i=t.baseQueue,r=a.pending;if(r!==null){if(i!==null){var s=i.next;i.next=r.next,r.next=s}e.baseQueue=i=r,a.pending=null}if(r=t.baseState,i===null)t.memoizedState=r;else{e=i.next;var l=s=null,o=null,c=e,d=!1;do{var u=c.lane&-536870913;if(u!==c.lane?(q&u)===u:(un&u)===u){var f=c.revertLane;if(f===0)o!==null&&(o=o.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),u===oi&&(d=!0);else if((un&f)===f){c=c.next,f===oi&&(d=!0);continue}else u={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},o===null?(l=o=u,s=r):o=o.next=u,H.lanes|=f,Qn|=f;u=c.action,_a&&n(r,u),r=c.hasEagerState?c.eagerState:n(r,u)}else f={lane:u,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},o===null?(l=o=f,s=r):o=o.next=f,H.lanes|=u,Qn|=u;c=c.next}while(c!==null&&c!==e);if(o===null?s=r:o.next=l,!de(r,t.memoizedState)&&(St=!0,d&&(n=ti,n!==null)))throw n;t.memoizedState=r,t.baseState=s,t.baseQueue=o,a.lastRenderedState=r}return i===null&&(a.lanes=0),[t.memoizedState,a.dispatch]}function Mo(t){var e=yt(),n=e.queue;if(n===null)throw Error(M(311));n.lastRenderedReducer=t;var a=n.dispatch,i=n.pending,r=e.memoizedState;if(i!==null){n.pending=null;var s=i=i.next;do r=t(r,s.action),s=s.next;while(s!==i);de(r,e.memoizedState)||(St=!0),e.memoizedState=r,e.baseQueue===null&&(e.baseState=r),n.lastRenderedState=r}return[r,a]}function Jp(t,e,n){var a=H,i=yt(),r=F;if(r){if(n===void 0)throw Error(M(407));n=n()}else n=e();var s=!de((tt||i).memoizedState,n);if(s&&(i.memoizedState=n,St=!0),i=i.queue,tu(tg.bind(null,a,i,t),[t]),i.getSnapshot!==e||s||xt!==null&&xt.memoizedState.tag&1){if(a.flags|=2048,di(9,{destroy:void 0},$p.bind(null,a,i,n,e),null),et===null)throw Error(M(349));r||un&127||Ip(a,e,n)}return n}function Ip(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=H.updateQueue,e===null?(e=Fl(),H.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function $p(t,e,n,a){e.value=n,e.getSnapshot=a,eg(e)&&ng(t)}function tg(t,e,n){return n(function(){eg(e)&&ng(t)})}function eg(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!de(t,n)}catch{return!0}}function ng(t){var e=Da(t,2);e!==null&&It(e,t,2)}function Lc(t){var e=qt();if(typeof t=="function"){var n=t;if(t=n(),_a){Sn(!0);try{n()}finally{Sn(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:fn,lastRenderedState:t},e}function ag(t,e,n,a){return t.baseState=n,$d(t,tt,typeof a=="function"?a:fn)}function Cv(t,e,n,a,i){if(Kl(t))throw Error(M(485));if(t=e.action,t!==null){var r={payload:i,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(s){r.listeners.push(s)}};L.T!==null?n(!0):r.isTransition=!1,a(r),n=e.pending,n===null?(r.next=e.pending=r,ig(e,r)):(r.next=n.next,e.pending=n.next=r)}}function ig(t,e){var n=e.action,a=e.payload,i=t.state;if(e.isTransition){var r=L.T,s={};L.T=s;try{var l=n(i,a),o=L.S;o!==null&&o(s,l),_f(t,e,l)}catch(c){Bc(t,e,c)}finally{r!==null&&s.types!==null&&(r.types=s.types),L.T=r}}else try{r=n(i,a),_f(t,e,r)}catch(c){Bc(t,e,c)}}function _f(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){kf(t,e,a)},function(a){return Bc(t,e,a)}):kf(t,e,n)}function kf(t,e,n){e.status="fulfilled",e.value=n,rg(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,ig(t,n)))}function Bc(t,e,n){var a=t.pending;if(t.pending=null,a!==null){a=a.next;do e.status="rejected",e.reason=n,rg(e),e=e.next;while(e!==a)}t.action=null}function rg(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function sg(t,e){return e}function Sf(t,e){if(F){var n=et.formState;if(n!==null){t:{var a=H;if(F){if(st){e:{for(var i=st,r=ve;i.nodeType!==8;){if(!r){i=null;break e}if(i=_e(i.nextSibling),i===null){i=null;break e}}r=i.data,i=r==="F!"||r==="F"?i:null}if(i){st=_e(i.nextSibling),a=i.data==="F!";break t}}Xn(a)}a=!1}a&&(e=n[0])}}return n=qt(),n.memoizedState=n.baseState=e,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:sg,lastRenderedState:e},n.queue=a,n=kg.bind(null,H,a),a.dispatch=n,a=Lc(!1),r=iu.bind(null,H,!1,a.queue),a=qt(),i={state:e,dispatch:null,action:t,pending:null},a.queue=i,n=Cv.bind(null,H,i,r,n),i.dispatch=n,a.memoizedState=t,[e,n,!1]}function wf(t){var e=yt();return lg(e,tt,t)}function lg(t,e,n){if(e=$d(t,e,sg)[0],t=Ls(fn)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var a=Qr(e)}catch(s){throw s===wi?Xl:s}else a=e;e=yt();var i=e.queue,r=i.dispatch;return n!==e.memoizedState&&(H.flags|=2048,di(9,{destroy:void 0},Ov.bind(null,i,n),null)),[a,r,t]}function Ov(t,e){t.action=e}function Mf(t){var e=yt(),n=tt;if(n!==null)return lg(e,n,t);yt(),e=e.memoizedState,n=yt();var a=n.queue.dispatch;return n.memoizedState=t,[e,a,!1]}function di(t,e,n,a){return t={tag:t,create:n,deps:a,inst:e,next:null},e=H.updateQueue,e===null&&(e=Fl(),H.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(a=n.next,n.next=t,t.next=a,e.lastEffect=t),t}function og(){return yt().memoizedState}function Bs(t,e,n,a){var i=qt();H.flags|=t,i.memoizedState=di(1|e,{destroy:void 0},n,a===void 0?null:a)}function Zl(t,e,n,a){var i=yt();a=a===void 0?null:a;var r=i.memoizedState.inst;tt!==null&&a!==null&&Zd(a,tt.memoizedState.deps)?i.memoizedState=di(e,r,n,a):(H.flags|=t,i.memoizedState=di(1|e,r,n,a))}function Af(t,e){Bs(8390656,8,t,e)}function tu(t,e){Zl(2048,8,t,e)}function Ev(t){H.flags|=4;var e=H.updateQueue;if(e===null)e=Fl(),H.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function cg(t){var e=yt().memoizedState;return Ev({ref:e,nextImpl:t}),function(){if(K&2)throw Error(M(440));return e.impl.apply(void 0,arguments)}}function dg(t,e){return Zl(4,2,t,e)}function ug(t,e){return Zl(4,4,t,e)}function fg(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function hg(t,e,n){n=n!=null?n.concat([t]):null,Zl(4,4,fg.bind(null,e,t),n)}function eu(){}function pg(t,e){var n=yt();e=e===void 0?null:e;var a=n.memoizedState;return e!==null&&Zd(e,a[1])?a[0]:(n.memoizedState=[t,e],t)}function gg(t,e){var n=yt();e=e===void 0?null:e;var a=n.memoizedState;if(e!==null&&Zd(e,a[1]))return a[0];if(a=t(),_a){Sn(!0);try{t()}finally{Sn(!1)}}return n.memoizedState=[a,e],a}function nu(t,e,n){return n===void 0||un&1073741824&&!(q&261930)?t.memoizedState=e:(t.memoizedState=n,t=am(),H.lanes|=t,Qn|=t,n)}function mg(t,e,n,a){return de(n,e)?n:ci.current!==null?(t=nu(t,n,a),de(t,e)||(St=!0),t):!(un&42)||un&1073741824&&!(q&261930)?(St=!0,t.memoizedState=n):(t=am(),H.lanes|=t,Qn|=t,e)}function bg(t,e,n,a,i){var r=P.p;P.p=r!==0&&8>r?r:8;var s=L.T,l={};L.T=l,iu(t,!1,e,n);try{var o=i(),c=L.S;if(c!==null&&c(l,o),o!==null&&typeof o=="object"&&typeof o.then=="function"){var d=Av(o,a);rr(t,e,d,ce(t))}else rr(t,e,a,ce(t))}catch(u){rr(t,e,{then:function(){},status:"rejected",reason:u},ce())}finally{P.p=r,s!==null&&l.types!==null&&(s.types=l.types),L.T=s}}function zv(){}function Nc(t,e,n,a){if(t.tag!==5)throw Error(M(476));var i=yg(t).queue;bg(t,i,e,ua,n===null?zv:function(){return vg(t),n(a)})}function yg(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:ua,baseState:ua,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fn,lastRenderedState:ua},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fn,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function vg(t){var e=yg(t);e.next===null&&(e=t.alternate.memoizedState),rr(t,e.next.queue,{},ce())}function au(){return Lt(Tr)}function xg(){return yt().memoizedState}function _g(){return yt().memoizedState}function Rv(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ce();t=Bn(n);var a=Nn(e,t,n);a!==null&&(It(a,e,n),nr(a,e,n)),e={cache:Gd()},t.payload=e;return}e=e.return}}function Lv(t,e,n){var a=ce();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Kl(t)?Sg(e,n):(n=Hd(t,e,n,a),n!==null&&(It(n,t,a),wg(n,e,a)))}function kg(t,e,n){var a=ce();rr(t,e,n,a)}function rr(t,e,n,a){var i={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Kl(t))Sg(e,i);else{var r=t.alternate;if(t.lanes===0&&(r===null||r.lanes===0)&&(r=e.lastRenderedReducer,r!==null))try{var s=e.lastRenderedState,l=r(s,n);if(i.hasEagerState=!0,i.eagerState=l,de(l,s))return ql(t,e,i,0),et===null&&Gl(),!1}catch{}finally{}if(n=Hd(t,e,i,a),n!==null)return It(n,t,a),wg(n,e,a),!0}return!1}function iu(t,e,n,a){if(a={lane:2,revertLane:hu(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Kl(t)){if(e)throw Error(M(479))}else e=Hd(t,n,a,2),e!==null&&It(e,t,2)}function Kl(t){var e=t.alternate;return t===H||e!==null&&e===H}function Sg(t,e){ni=dl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function wg(t,e,n){if(n&4194048){var a=e.lanes;a&=t.pendingLanes,n|=a,e.lanes=n,cp(t,n)}}var wr={readContext:Lt,use:Ql,useCallback:ht,useContext:ht,useEffect:ht,useImperativeHandle:ht,useLayoutEffect:ht,useInsertionEffect:ht,useMemo:ht,useReducer:ht,useRef:ht,useState:ht,useDebugValue:ht,useDeferredValue:ht,useTransition:ht,useSyncExternalStore:ht,useId:ht,useHostTransitionStatus:ht,useFormState:ht,useActionState:ht,useOptimistic:ht,useMemoCache:ht,useCacheRefresh:ht};wr.useEffectEvent=ht;var Mg={readContext:Lt,use:Ql,useCallback:function(t,e){return qt().memoizedState=[t,e===void 0?null:e],t},useContext:Lt,useEffect:Af,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,Bs(4194308,4,fg.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Bs(4194308,4,t,e)},useInsertionEffect:function(t,e){Bs(4,2,t,e)},useMemo:function(t,e){var n=qt();e=e===void 0?null:e;var a=t();if(_a){Sn(!0);try{t()}finally{Sn(!1)}}return n.memoizedState=[a,e],a},useReducer:function(t,e,n){var a=qt();if(n!==void 0){var i=n(e);if(_a){Sn(!0);try{n(e)}finally{Sn(!1)}}}else i=e;return a.memoizedState=a.baseState=i,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:i},a.queue=t,t=t.dispatch=Lv.bind(null,H,t),[a.memoizedState,t]},useRef:function(t){var e=qt();return t={current:t},e.memoizedState=t},useState:function(t){t=Lc(t);var e=t.queue,n=kg.bind(null,H,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:eu,useDeferredValue:function(t,e){var n=qt();return nu(n,t,e)},useTransition:function(){var t=Lc(!1);return t=bg.bind(null,H,t.queue,!0,!1),qt().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var a=H,i=qt();if(F){if(n===void 0)throw Error(M(407));n=n()}else{if(n=e(),et===null)throw Error(M(349));q&127||Ip(a,e,n)}i.memoizedState=n;var r={value:n,getSnapshot:e};return i.queue=r,Af(tg.bind(null,a,r,t),[t]),a.flags|=2048,di(9,{destroy:void 0},$p.bind(null,a,r,n,e),null),n},useId:function(){var t=qt(),e=et.identifierPrefix;if(F){var n=Le,a=Re;n=(a&~(1<<32-oe(a)-1)).toString(32)+n,e="_"+e+"R_"+n,n=ul++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=Tv++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:au,useFormState:Sf,useActionState:Sf,useOptimistic:function(t){var e=qt();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=iu.bind(null,H,!0,n),n.dispatch=e,[t,e]},useMemoCache:Id,useCacheRefresh:function(){return qt().memoizedState=Rv.bind(null,H)},useEffectEvent:function(t){var e=qt(),n={impl:t};return e.memoizedState=n,function(){if(K&2)throw Error(M(440));return n.impl.apply(void 0,arguments)}}},ru={readContext:Lt,use:Ql,useCallback:pg,useContext:Lt,useEffect:tu,useImperativeHandle:hg,useInsertionEffect:dg,useLayoutEffect:ug,useMemo:gg,useReducer:Ls,useRef:og,useState:function(){return Ls(fn)},useDebugValue:eu,useDeferredValue:function(t,e){var n=yt();return mg(n,tt.memoizedState,t,e)},useTransition:function(){var t=Ls(fn)[0],e=yt().memoizedState;return[typeof t=="boolean"?t:Qr(t),e]},useSyncExternalStore:Jp,useId:xg,useHostTransitionStatus:au,useFormState:wf,useActionState:wf,useOptimistic:function(t,e){var n=yt();return ag(n,tt,t,e)},useMemoCache:Id,useCacheRefresh:_g};ru.useEffectEvent=cg;var Ag={readContext:Lt,use:Ql,useCallback:pg,useContext:Lt,useEffect:tu,useImperativeHandle:hg,useInsertionEffect:dg,useLayoutEffect:ug,useMemo:gg,useReducer:Mo,useRef:og,useState:function(){return Mo(fn)},useDebugValue:eu,useDeferredValue:function(t,e){var n=yt();return tt===null?nu(n,t,e):mg(n,tt.memoizedState,t,e)},useTransition:function(){var t=Mo(fn)[0],e=yt().memoizedState;return[typeof t=="boolean"?t:Qr(t),e]},useSyncExternalStore:Jp,useId:xg,useHostTransitionStatus:au,useFormState:Mf,useActionState:Mf,useOptimistic:function(t,e){var n=yt();return tt!==null?ag(n,tt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:Id,useCacheRefresh:_g};Ag.useEffectEvent=cg;function Ao(t,e,n,a){e=t.memoizedState,n=n(a,e),n=n==null?e:ct({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var jc={enqueueSetState:function(t,e,n){t=t._reactInternals;var a=ce(),i=Bn(a);i.payload=e,n!=null&&(i.callback=n),e=Nn(t,i,a),e!==null&&(It(e,t,a),nr(e,t,a))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var a=ce(),i=Bn(a);i.tag=1,i.payload=e,n!=null&&(i.callback=n),e=Nn(t,i,a),e!==null&&(It(e,t,a),nr(e,t,a))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ce(),a=Bn(n);a.tag=2,e!=null&&(a.callback=e),e=Nn(t,a,n),e!==null&&(It(e,t,n),nr(e,t,n))}};function Tf(t,e,n,a,i,r,s){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(a,r,s):e.prototype&&e.prototype.isPureReactComponent?!vr(n,a)||!vr(i,r):!0}function Df(t,e,n,a){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,a),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,a),e.state!==t&&jc.enqueueReplaceState(e,e.state,null)}function ka(t,e){var n=e;if("ref"in e){n={};for(var a in e)a!=="ref"&&(n[a]=e[a])}if(t=t.defaultProps){n===e&&(n=ct({},n));for(var i in t)n[i]===void 0&&(n[i]=t[i])}return n}function Tg(t){al(t)}function Dg(t){console.error(t)}function Cg(t){al(t)}function fl(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(a){setTimeout(function(){throw a})}}function Cf(t,e,n){try{var a=t.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(i){setTimeout(function(){throw i})}}function Hc(t,e,n){return n=Bn(n),n.tag=3,n.payload={element:null},n.callback=function(){fl(t,e)},n}function Og(t){return t=Bn(t),t.tag=3,t}function Eg(t,e,n,a){var i=n.type.getDerivedStateFromError;if(typeof i=="function"){var r=a.value;t.payload=function(){return i(r)},t.callback=function(){Cf(e,n,a)}}var s=n.stateNode;s!==null&&typeof s.componentDidCatch=="function"&&(t.callback=function(){Cf(e,n,a),typeof i!="function"&&(jn===null?jn=new Set([this]):jn.add(this));var l=a.stack;this.componentDidCatch(a.value,{componentStack:l!==null?l:""})})}function Bv(t,e,n,a,i){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(e=n.alternate,e!==null&&Si(e,n,i,!0),n=ue.current,n!==null){switch(n.tag){case 31:case 13:return xe===null?bl():n.alternate===null&&pt===0&&(pt=3),n.flags&=-257,n.flags|=65536,n.lanes=i,a===ll?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([a]):e.add(a),jo(t,a,i)),!1;case 22:return n.flags|=65536,a===ll?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([a]):n.add(a)),jo(t,a,i)),!1}throw Error(M(435,n.tag))}return jo(t,a,i),bl(),!1}if(F)return e=ue.current,e!==null?(!(e.flags&65536)&&(e.flags|=256),e.flags|=65536,e.lanes=i,a!==Mc&&(t=Error(M(422),{cause:a}),_r(ye(t,n)))):(a!==Mc&&(e=Error(M(423),{cause:a}),_r(ye(e,n))),t=t.current.alternate,t.flags|=65536,i&=-i,t.lanes|=i,a=ye(a,n),i=Hc(t.stateNode,a,i),wo(t,i),pt!==4&&(pt=2)),!1;var r=Error(M(520),{cause:a});if(r=ye(r,n),or===null?or=[r]:or.push(r),pt!==4&&(pt=2),e===null)return!0;a=ye(a,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=i&-i,n.lanes|=t,t=Hc(n.stateNode,a,t),wo(n,t),!1;case 1:if(e=n.type,r=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||r!==null&&typeof r.componentDidCatch=="function"&&(jn===null||!jn.has(r))))return n.flags|=65536,i&=-i,n.lanes|=i,i=Og(i),Eg(i,t,n,a),wo(n,i),!1}n=n.return}while(n!==null);return!1}var su=Error(M(461)),St=!1;function Et(t,e,n,a){e.child=t===null?Fp(e,null,n,a):xa(e,t.child,n,a)}function Of(t,e,n,a,i){n=n.render;var r=e.ref;if("ref"in a){var s={};for(var l in a)l!=="ref"&&(s[l]=a[l])}else s=a;return va(e),a=Kd(t,e,n,s,r,i),l=Pd(),t!==null&&!St?(Wd(t,e,i),hn(t,e,i)):(F&&l&&Vd(e),e.flags|=1,Et(t,e,a,i),e.child)}function Ef(t,e,n,a,i){if(t===null){var r=n.type;return typeof r=="function"&&!Ud(r)&&r.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=r,zg(t,e,r,a,i)):(t=zs(n.type,null,a,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(r=t.child,!lu(t,i)){var s=r.memoizedProps;if(n=n.compare,n=n!==null?n:vr,n(s,a)&&t.ref===e.ref)return hn(t,e,i)}return e.flags|=1,t=ln(r,a),t.ref=e.ref,t.return=e,e.child=t}function zg(t,e,n,a,i){if(t!==null){var r=t.memoizedProps;if(vr(r,a)&&t.ref===e.ref)if(St=!1,e.pendingProps=a=r,lu(t,i))t.flags&131072&&(St=!0);else return e.lanes=t.lanes,hn(t,e,i)}return Uc(t,e,n,a,i)}function Rg(t,e,n,a){var i=a.children,r=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if(e.flags&128){if(r=r!==null?r.baseLanes|n:n,t!==null){for(a=e.child=t.child,i=0;a!==null;)i=i|a.lanes|a.childLanes,a=a.sibling;a=i&~r}else a=0,e.child=null;return zf(t,e,r,n,a)}if(n&536870912)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&Rs(e,r!==null?r.cachePool:null),r!==null?xf(e,r):zc(),Kp(e);else return a=e.lanes=536870912,zf(t,e,r!==null?r.baseLanes|n:n,n,a)}else r!==null?(Rs(e,r.cachePool),xf(e,r),_n(),e.memoizedState=null):(t!==null&&Rs(e,null),zc(),_n());return Et(t,e,i,n),e.child}function qi(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function zf(t,e,n,a,i){var r=qd();return r=r===null?null:{parent:kt._currentValue,pool:r},e.memoizedState={baseLanes:n,cachePool:r},t!==null&&Rs(e,null),zc(),Kp(e),t!==null&&Si(t,e,a,!0),e.childLanes=i,null}function Ns(t,e){return e=hl({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function Rf(t,e,n){return xa(e,t.child,null,n),t=Ns(e,e.pendingProps),t.flags|=2,ae(e),e.memoizedState=null,t}function Nv(t,e,n){var a=e.pendingProps,i=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(F){if(a.mode==="hidden")return t=Ns(e,a),e.lanes=536870912,qi(null,t);if(Rc(e),(t=st)?(t=Mm(t,ve),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:qn!==null?{id:Re,overflow:Le}:null,retryLane:536870912,hydrationErrors:null},n=Hp(t),n.return=e,e.child=n,Rt=e,st=null)):t=null,t===null)throw Xn(e);return e.lanes=536870912,null}return Ns(e,a)}var r=t.memoizedState;if(r!==null){var s=r.dehydrated;if(Rc(e),i)if(e.flags&256)e.flags&=-257,e=Rf(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(M(558));else if(St||Si(t,e,n,!1),i=(n&t.childLanes)!==0,St||i){if(a=et,a!==null&&(s=dp(a,n),s!==0&&s!==r.retryLane))throw r.retryLane=s,Da(t,s),It(a,t,s),su;bl(),e=Rf(t,e,n)}else t=r.treeContext,st=_e(s.nextSibling),Rt=e,F=!0,Ln=null,ve=!1,t!==null&&Vp(e,t),e=Ns(e,a),e.flags|=4096;return e}return t=ln(t.child,{mode:a.mode,children:a.children}),t.ref=e.ref,e.child=t,t.return=e,t}function js(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(M(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function Uc(t,e,n,a,i){return va(e),n=Kd(t,e,n,a,void 0,i),a=Pd(),t!==null&&!St?(Wd(t,e,i),hn(t,e,i)):(F&&a&&Vd(e),e.flags|=1,Et(t,e,n,i),e.child)}function Lf(t,e,n,a,i,r){return va(e),e.updateQueue=null,n=Wp(e,a,n,i),Pp(t),a=Pd(),t!==null&&!St?(Wd(t,e,r),hn(t,e,r)):(F&&a&&Vd(e),e.flags|=1,Et(t,e,n,r),e.child)}function Bf(t,e,n,a,i){if(va(e),e.stateNode===null){var r=Za,s=n.contextType;typeof s=="object"&&s!==null&&(r=Lt(s)),r=new n(a,r),e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=jc,e.stateNode=r,r._reactInternals=e,r=e.stateNode,r.props=a,r.state=e.memoizedState,r.refs={},Fd(e),s=n.contextType,r.context=typeof s=="object"&&s!==null?Lt(s):Za,r.state=e.memoizedState,s=n.getDerivedStateFromProps,typeof s=="function"&&(Ao(e,n,s,a),r.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(s=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),s!==r.state&&jc.enqueueReplaceState(r,r.state,null),ir(e,a,r,i),ar(),r.state=e.memoizedState),typeof r.componentDidMount=="function"&&(e.flags|=4194308),a=!0}else if(t===null){r=e.stateNode;var l=e.memoizedProps,o=ka(n,l);r.props=o;var c=r.context,d=n.contextType;s=Za,typeof d=="object"&&d!==null&&(s=Lt(d));var u=n.getDerivedStateFromProps;d=typeof u=="function"||typeof r.getSnapshotBeforeUpdate=="function",l=e.pendingProps!==l,d||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(l||c!==s)&&Df(e,r,a,s),yn=!1;var f=e.memoizedState;r.state=f,ir(e,a,r,i),ar(),c=e.memoizedState,l||f!==c||yn?(typeof u=="function"&&(Ao(e,n,u,a),c=e.memoizedState),(o=yn||Tf(e,n,o,a,f,c,s))?(d||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount()),typeof r.componentDidMount=="function"&&(e.flags|=4194308)):(typeof r.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=a,e.memoizedState=c),r.props=a,r.state=c,r.context=s,a=o):(typeof r.componentDidMount=="function"&&(e.flags|=4194308),a=!1)}else{r=e.stateNode,Oc(t,e),s=e.memoizedProps,d=ka(n,s),r.props=d,u=e.pendingProps,f=r.context,c=n.contextType,o=Za,typeof c=="object"&&c!==null&&(o=Lt(c)),l=n.getDerivedStateFromProps,(c=typeof l=="function"||typeof r.getSnapshotBeforeUpdate=="function")||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(s!==u||f!==o)&&Df(e,r,a,o),yn=!1,f=e.memoizedState,r.state=f,ir(e,a,r,i),ar();var h=e.memoizedState;s!==u||f!==h||yn||t!==null&&t.dependencies!==null&&sl(t.dependencies)?(typeof l=="function"&&(Ao(e,n,l,a),h=e.memoizedState),(d=yn||Tf(e,n,d,a,f,h,o)||t!==null&&t.dependencies!==null&&sl(t.dependencies))?(c||typeof r.UNSAFE_componentWillUpdate!="function"&&typeof r.componentWillUpdate!="function"||(typeof r.componentWillUpdate=="function"&&r.componentWillUpdate(a,h,o),typeof r.UNSAFE_componentWillUpdate=="function"&&r.UNSAFE_componentWillUpdate(a,h,o)),typeof r.componentDidUpdate=="function"&&(e.flags|=4),typeof r.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof r.componentDidUpdate!="function"||s===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=a,e.memoizedState=h),r.props=a,r.state=h,r.context=o,a=d):(typeof r.componentDidUpdate!="function"||s===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||s===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),a=!1)}return r=a,js(t,e),a=(e.flags&128)!==0,r||a?(r=e.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:r.render(),e.flags|=1,t!==null&&a?(e.child=xa(e,t.child,null,i),e.child=xa(e,null,n,i)):Et(t,e,n,i),e.memoizedState=r.state,t=e.child):t=hn(t,e,i),t}function Nf(t,e,n,a){return ya(),e.flags|=256,Et(t,e,n,a),e.child}var To={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Do(t){return{baseLanes:t,cachePool:Gp()}}function Co(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=re),t}function Lg(t,e,n){var a=e.pendingProps,i=!1,r=(e.flags&128)!==0,s;if((s=r)||(s=t!==null&&t.memoizedState===null?!1:(mt.current&2)!==0),s&&(i=!0,e.flags&=-129),s=(e.flags&32)!==0,e.flags&=-33,t===null){if(F){if(i?xn(e):_n(),(t=st)?(t=Mm(t,ve),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:qn!==null?{id:Re,overflow:Le}:null,retryLane:536870912,hydrationErrors:null},n=Hp(t),n.return=e,e.child=n,Rt=e,st=null)):t=null,t===null)throw Xn(e);return $c(t)?e.lanes=32:e.lanes=536870912,null}var l=a.children;return a=a.fallback,i?(_n(),i=e.mode,l=hl({mode:"hidden",children:l},i),a=fa(a,i,n,null),l.return=e,a.return=e,l.sibling=a,e.child=l,a=e.child,a.memoizedState=Do(n),a.childLanes=Co(t,s,n),e.memoizedState=To,qi(null,a)):(xn(e),Vc(e,l))}var o=t.memoizedState;if(o!==null&&(l=o.dehydrated,l!==null)){if(r)e.flags&256?(xn(e),e.flags&=-257,e=Oo(t,e,n)):e.memoizedState!==null?(_n(),e.child=t.child,e.flags|=128,e=null):(_n(),l=a.fallback,i=e.mode,a=hl({mode:"visible",children:a.children},i),l=fa(l,i,n,null),l.flags|=2,a.return=e,l.return=e,a.sibling=l,e.child=a,xa(e,t.child,null,n),a=e.child,a.memoizedState=Do(n),a.childLanes=Co(t,s,n),e.memoizedState=To,e=qi(null,a));else if(xn(e),$c(l)){if(s=l.nextSibling&&l.nextSibling.dataset,s)var c=s.dgst;s=c,a=Error(M(419)),a.stack="",a.digest=s,_r({value:a,source:null,stack:null}),e=Oo(t,e,n)}else if(St||Si(t,e,n,!1),s=(n&t.childLanes)!==0,St||s){if(s=et,s!==null&&(a=dp(s,n),a!==0&&a!==o.retryLane))throw o.retryLane=a,Da(t,a),It(s,t,a),su;Ic(l)||bl(),e=Oo(t,e,n)}else Ic(l)?(e.flags|=192,e.child=t.child,e=null):(t=o.treeContext,st=_e(l.nextSibling),Rt=e,F=!0,Ln=null,ve=!1,t!==null&&Vp(e,t),e=Vc(e,a.children),e.flags|=4096);return e}return i?(_n(),l=a.fallback,i=e.mode,o=t.child,c=o.sibling,a=ln(o,{mode:"hidden",children:a.children}),a.subtreeFlags=o.subtreeFlags&65011712,c!==null?l=ln(c,l):(l=fa(l,i,n,null),l.flags|=2),l.return=e,a.return=e,a.sibling=l,e.child=a,qi(null,a),a=e.child,l=t.child.memoizedState,l===null?l=Do(n):(i=l.cachePool,i!==null?(o=kt._currentValue,i=i.parent!==o?{parent:o,pool:o}:i):i=Gp(),l={baseLanes:l.baseLanes|n,cachePool:i}),a.memoizedState=l,a.childLanes=Co(t,s,n),e.memoizedState=To,qi(t.child,a)):(xn(e),n=t.child,t=n.sibling,n=ln(n,{mode:"visible",children:a.children}),n.return=e,n.sibling=null,t!==null&&(s=e.deletions,s===null?(e.deletions=[t],e.flags|=16):s.push(t)),e.child=n,e.memoizedState=null,n)}function Vc(t,e){return e=hl({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function hl(t,e){return t=ie(22,t,null,e),t.lanes=0,t}function Oo(t,e,n){return xa(e,t.child,null,n),t=Vc(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function jf(t,e,n){t.lanes|=e;var a=t.alternate;a!==null&&(a.lanes|=e),Tc(t.return,e,n)}function Eo(t,e,n,a,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:i,treeForkCount:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=a,s.tail=n,s.tailMode=i,s.treeForkCount=r)}function Bg(t,e,n){var a=e.pendingProps,i=a.revealOrder,r=a.tail;a=a.children;var s=mt.current,l=(s&2)!==0;if(l?(s=s&1|2,e.flags|=128):s&=1,at(mt,s),Et(t,e,a,n),a=F?xr:0,!l&&t!==null&&t.flags&128)t:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&jf(t,n,e);else if(t.tag===19)jf(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&cl(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),Eo(e,!1,i,n,r,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&cl(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}Eo(e,!0,n,null,r,a);break;case"together":Eo(e,!1,null,null,void 0,a);break;default:e.memoizedState=null}return e.child}function hn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Qn|=e.lanes,!(n&e.childLanes))if(t!==null){if(Si(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(M(153));if(e.child!==null){for(t=e.child,n=ln(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=ln(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function lu(t,e){return t.lanes&e?!0:(t=t.dependencies,!!(t!==null&&sl(t)))}function jv(t,e,n){switch(e.tag){case 3:$s(e,e.stateNode.containerInfo),vn(e,kt,t.memoizedState.cache),ya();break;case 27:case 5:pc(e);break;case 4:$s(e,e.stateNode.containerInfo);break;case 10:vn(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,Rc(e),null;break;case 13:var a=e.memoizedState;if(a!==null)return a.dehydrated!==null?(xn(e),e.flags|=128,null):n&e.child.childLanes?Lg(t,e,n):(xn(e),t=hn(t,e,n),t!==null?t.sibling:null);xn(e);break;case 19:var i=(t.flags&128)!==0;if(a=(n&e.childLanes)!==0,a||(Si(t,e,n,!1),a=(n&e.childLanes)!==0),i){if(a)return Bg(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),at(mt,mt.current),a)break;return null;case 22:return e.lanes=0,Rg(t,e,n,e.pendingProps);case 24:vn(e,kt,t.memoizedState.cache)}return hn(t,e,n)}function Ng(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)St=!0;else{if(!lu(t,n)&&!(e.flags&128))return St=!1,jv(t,e,n);St=!!(t.flags&131072)}else St=!1,F&&e.flags&1048576&&Up(e,xr,e.index);switch(e.lanes=0,e.tag){case 16:t:{var a=e.pendingProps;if(t=sa(e.elementType),e.type=t,typeof t=="function")Ud(t)?(a=ka(t,a),e.tag=1,e=Bf(null,e,t,a,n)):(e.tag=0,e=Uc(null,e,t,a,n));else{if(t!=null){var i=t.$$typeof;if(i===Md){e.tag=11,e=Of(null,e,t,a,n);break t}else if(i===Ad){e.tag=14,e=Ef(null,e,t,a,n);break t}}throw e=fc(t)||t,Error(M(306,e,""))}}return e;case 0:return Uc(t,e,e.type,e.pendingProps,n);case 1:return a=e.type,i=ka(a,e.pendingProps),Bf(t,e,a,i,n);case 3:t:{if($s(e,e.stateNode.containerInfo),t===null)throw Error(M(387));a=e.pendingProps;var r=e.memoizedState;i=r.element,Oc(t,e),ir(e,a,null,n);var s=e.memoizedState;if(a=s.cache,vn(e,kt,a),a!==r.cache&&Dc(e,[kt],n,!0),ar(),a=s.element,r.isDehydrated)if(r={element:a,isDehydrated:!1,cache:s.cache},e.updateQueue.baseState=r,e.memoizedState=r,e.flags&256){e=Nf(t,e,a,n);break t}else if(a!==i){i=ye(Error(M(424)),e),_r(i),e=Nf(t,e,a,n);break t}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(st=_e(t.firstChild),Rt=e,F=!0,Ln=null,ve=!0,n=Fp(e,null,a,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(ya(),a===i){e=hn(t,e,n);break t}Et(t,e,a,n)}e=e.child}return e;case 26:return js(t,e),t===null?(n=ah(e.type,null,e.pendingProps,null))?e.memoizedState=n:F||(n=e.type,t=e.pendingProps,a=_l(Rn.current).createElement(n),a[zt]=e,a[$t]=t,Bt(a,n,t),Dt(a),e.stateNode=a):e.memoizedState=ah(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return pc(e),t===null&&F&&(a=e.stateNode=Am(e.type,e.pendingProps,Rn.current),Rt=e,ve=!0,i=st,Wn(e.type)?(td=i,st=_e(a.firstChild)):st=i),Et(t,e,e.pendingProps.children,n),js(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&F&&((i=a=st)&&(a=hx(a,e.type,e.pendingProps,ve),a!==null?(e.stateNode=a,Rt=e,st=_e(a.firstChild),ve=!1,i=!0):i=!1),i||Xn(e)),pc(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,Wc(i,r)?a=null:s!==null&&Wc(i,s)&&(e.flags|=32),e.memoizedState!==null&&(i=Kd(t,e,Dv,null,null,n),Tr._currentValue=i),js(t,e),Et(t,e,a,n),e.child;case 6:return t===null&&F&&((t=n=st)&&(n=px(n,e.pendingProps,ve),n!==null?(e.stateNode=n,Rt=e,st=null,t=!0):t=!1),t||Xn(e)),null;case 13:return Lg(t,e,n);case 4:return $s(e,e.stateNode.containerInfo),a=e.pendingProps,t===null?e.child=xa(e,null,a,n):Et(t,e,a,n),e.child;case 11:return Of(t,e,e.type,e.pendingProps,n);case 7:return Et(t,e,e.pendingProps,n),e.child;case 8:return Et(t,e,e.pendingProps.children,n),e.child;case 12:return Et(t,e,e.pendingProps.children,n),e.child;case 10:return a=e.pendingProps,vn(e,e.type,a.value),Et(t,e,a.children,n),e.child;case 9:return i=e.type._context,a=e.pendingProps.children,va(e),i=Lt(i),a=a(i),e.flags|=1,Et(t,e,a,n),e.child;case 14:return Ef(t,e,e.type,e.pendingProps,n);case 15:return zg(t,e,e.type,e.pendingProps,n);case 19:return Bg(t,e,n);case 31:return Nv(t,e,n);case 22:return Rg(t,e,n,e.pendingProps);case 24:return va(e),a=Lt(kt),t===null?(i=qd(),i===null&&(i=et,r=Gd(),i.pooledCache=r,r.refCount++,r!==null&&(i.pooledCacheLanes|=n),i=r),e.memoizedState={parent:a,cache:i},Fd(e),vn(e,kt,i)):(t.lanes&n&&(Oc(t,e),ir(e,null,null,n),ar()),i=t.memoizedState,r=e.memoizedState,i.parent!==a?(i={parent:a,cache:a},e.memoizedState=i,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=i),vn(e,kt,a)):(a=r.cache,vn(e,kt,a),a!==i.cache&&Dc(e,[kt],n,!0))),Et(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(M(156,e.tag))}function qe(t){t.flags|=4}function zo(t,e,n,a,i){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(i&335544128)===i)if(t.stateNode.complete)t.flags|=8192;else if(sm())t.flags|=8192;else throw pa=ll,Xd}else t.flags&=-16777217}function Hf(t,e){if(e.type!=="stylesheet"||e.state.loading&4)t.flags&=-16777217;else if(t.flags|=16777216,!Cm(e))if(sm())t.flags|=8192;else throw pa=ll,Xd}function cs(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?lp():536870912,t.lanes|=e,ui|=e)}function zi(t,e){if(!F)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:a.sibling=null}}function rt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,a=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,a|=i.subtreeFlags&65011712,a|=i.flags&65011712,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,a|=i.subtreeFlags,a|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=a,t.childLanes=n,e}function Hv(t,e,n){var a=e.pendingProps;switch(Yd(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return rt(e),null;case 1:return rt(e),null;case 3:return n=e.stateNode,a=null,t!==null&&(a=t.memoizedState.cache),e.memoizedState.cache!==a&&(e.flags|=2048),on(kt),ri(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(Ea(e)?qe(e):t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,So())),rt(e),null;case 26:var i=e.type,r=e.memoizedState;return t===null?(qe(e),r!==null?(rt(e),Hf(e,r)):(rt(e),zo(e,i,null,a,n))):r?r!==t.memoizedState?(qe(e),rt(e),Hf(e,r)):(rt(e),e.flags&=-16777217):(t=t.memoizedProps,t!==a&&qe(e),rt(e),zo(e,i,t,a,n)),null;case 27:if(tl(e),n=Rn.current,i=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&qe(e);else{if(!a){if(e.stateNode===null)throw Error(M(166));return rt(e),null}t=Ne.current,Ea(e)?hf(e):(t=Am(i,a,n),e.stateNode=t,qe(e))}return rt(e),null;case 5:if(tl(e),i=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==a&&qe(e);else{if(!a){if(e.stateNode===null)throw Error(M(166));return rt(e),null}if(r=Ne.current,Ea(e))hf(e);else{var s=_l(Rn.current);switch(r){case 1:r=s.createElementNS("http://www.w3.org/2000/svg",i);break;case 2:r=s.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;default:switch(i){case"svg":r=s.createElementNS("http://www.w3.org/2000/svg",i);break;case"math":r=s.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;case"script":r=s.createElement("div"),r.innerHTML="<script><\/script>",r=r.removeChild(r.firstChild);break;case"select":r=typeof a.is=="string"?s.createElement("select",{is:a.is}):s.createElement("select"),a.multiple?r.multiple=!0:a.size&&(r.size=a.size);break;default:r=typeof a.is=="string"?s.createElement(i,{is:a.is}):s.createElement(i)}}r[zt]=e,r[$t]=a;t:for(s=e.child;s!==null;){if(s.tag===5||s.tag===6)r.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===e)break t;for(;s.sibling===null;){if(s.return===null||s.return===e)break t;s=s.return}s.sibling.return=s.return,s=s.sibling}e.stateNode=r;t:switch(Bt(r,i,a),i){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break t;case"img":a=!0;break t;default:a=!1}a&&qe(e)}}return rt(e),zo(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==a&&qe(e);else{if(typeof a!="string"&&e.stateNode===null)throw Error(M(166));if(t=Rn.current,Ea(e)){if(t=e.stateNode,n=e.memoizedProps,a=null,i=Rt,i!==null)switch(i.tag){case 27:case 5:a=i.memoizedProps}t[zt]=e,t=!!(t.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||km(t.nodeValue,n)),t||Xn(e,!0)}else t=_l(t).createTextNode(a),t[zt]=e,e.stateNode=t}return rt(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(a=Ea(e),n!==null){if(t===null){if(!a)throw Error(M(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(M(557));t[zt]=e}else ya(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;rt(e),t=!1}else n=So(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(ae(e),e):(ae(e),null);if(e.flags&128)throw Error(M(558))}return rt(e),null;case 13:if(a=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(i=Ea(e),a!==null&&a.dehydrated!==null){if(t===null){if(!i)throw Error(M(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(M(317));i[zt]=e}else ya(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;rt(e),i=!1}else i=So(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=i),i=!0;if(!i)return e.flags&256?(ae(e),e):(ae(e),null)}return ae(e),e.flags&128?(e.lanes=n,e):(n=a!==null,t=t!==null&&t.memoizedState!==null,n&&(a=e.child,i=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(i=a.alternate.memoizedState.cachePool.pool),r=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(r=a.memoizedState.cachePool.pool),r!==i&&(a.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),cs(e,e.updateQueue),rt(e),null);case 4:return ri(),t===null&&pu(e.stateNode.containerInfo),rt(e),null;case 10:return on(e.type),rt(e),null;case 19:if(Ot(mt),a=e.memoizedState,a===null)return rt(e),null;if(i=(e.flags&128)!==0,r=a.rendering,r===null)if(i)zi(a,!1);else{if(pt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(r=cl(t),r!==null){for(e.flags|=128,zi(a,!1),t=r.updateQueue,e.updateQueue=t,cs(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)jp(n,t),n=n.sibling;return at(mt,mt.current&1|2),F&&We(e,a.treeForkCount),e.child}t=t.sibling}a.tail!==null&&se()>gl&&(e.flags|=128,i=!0,zi(a,!1),e.lanes=4194304)}else{if(!i)if(t=cl(r),t!==null){if(e.flags|=128,i=!0,t=t.updateQueue,e.updateQueue=t,cs(e,t),zi(a,!0),a.tail===null&&a.tailMode==="hidden"&&!r.alternate&&!F)return rt(e),null}else 2*se()-a.renderingStartTime>gl&&n!==536870912&&(e.flags|=128,i=!0,zi(a,!1),e.lanes=4194304);a.isBackwards?(r.sibling=e.child,e.child=r):(t=a.last,t!==null?t.sibling=r:e.child=r,a.last=r)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=se(),t.sibling=null,n=mt.current,at(mt,i?n&1|2:n&1),F&&We(e,a.treeForkCount),t):(rt(e),null);case 22:case 23:return ae(e),Qd(),a=e.memoizedState!==null,t!==null?t.memoizedState!==null!==a&&(e.flags|=8192):a&&(e.flags|=8192),a?n&536870912&&!(e.flags&128)&&(rt(e),e.subtreeFlags&6&&(e.flags|=8192)):rt(e),n=e.updateQueue,n!==null&&cs(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),a=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),a!==n&&(e.flags|=2048),t!==null&&Ot(ha),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),on(kt),rt(e),null;case 25:return null;case 30:return null}throw Error(M(156,e.tag))}function Uv(t,e){switch(Yd(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return on(kt),ri(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return tl(e),null;case 31:if(e.memoizedState!==null){if(ae(e),e.alternate===null)throw Error(M(340));ya()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(ae(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(M(340));ya()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Ot(mt),null;case 4:return ri(),null;case 10:return on(e.type),null;case 22:case 23:return ae(e),Qd(),t!==null&&Ot(ha),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return on(kt),null;case 25:return null;default:return null}}function jg(t,e){switch(Yd(e),e.tag){case 3:on(kt),ri();break;case 26:case 27:case 5:tl(e);break;case 4:ri();break;case 31:e.memoizedState!==null&&ae(e);break;case 13:ae(e);break;case 19:Ot(mt);break;case 10:on(e.type);break;case 22:case 23:ae(e),Qd(),t!==null&&Ot(ha);break;case 24:on(kt)}}function Zr(t,e){try{var n=e.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var i=a.next;n=i;do{if((n.tag&t)===t){a=void 0;var r=n.create,s=n.inst;a=r(),s.destroy=a}n=n.next}while(n!==i)}}catch(l){I(e,e.return,l)}}function Fn(t,e,n){try{var a=e.updateQueue,i=a!==null?a.lastEffect:null;if(i!==null){var r=i.next;a=r;do{if((a.tag&t)===t){var s=a.inst,l=s.destroy;if(l!==void 0){s.destroy=void 0,i=e;var o=n,c=l;try{c()}catch(d){I(i,o,d)}}}a=a.next}while(a!==r)}}catch(d){I(e,e.return,d)}}function Hg(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{Zp(e,n)}catch(a){I(t,t.return,a)}}}function Ug(t,e,n){n.props=ka(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(a){I(t,e,a)}}function sr(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var a=t.stateNode;break;case 30:a=t.stateNode;break;default:a=t.stateNode}typeof n=="function"?t.refCleanup=n(a):n.current=a}}catch(i){I(t,e,i)}}function Be(t,e){var n=t.ref,a=t.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(i){I(t,e,i)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(i){I(t,e,i)}else n.current=null}function Vg(t){var e=t.type,n=t.memoizedProps,a=t.stateNode;try{t:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break t;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(i){I(t,t.return,i)}}function Ro(t,e,n){try{var a=t.stateNode;lx(a,t.type,n,e),a[$t]=e}catch(i){I(t,t.return,i)}}function Yg(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Wn(t.type)||t.tag===4}function Lo(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||Yg(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Wn(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Yc(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=en));else if(a!==4&&(a===27&&Wn(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Yc(t,e,n),t=t.sibling;t!==null;)Yc(t,e,n),t=t.sibling}function pl(t,e,n){var a=t.tag;if(a===5||a===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(a!==4&&(a===27&&Wn(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(pl(t,e,n),t=t.sibling;t!==null;)pl(t,e,n),t=t.sibling}function Gg(t){var e=t.stateNode,n=t.memoizedProps;try{for(var a=t.type,i=e.attributes;i.length;)e.removeAttributeNode(i[0]);Bt(e,a,n),e[zt]=t,e[$t]=n}catch(r){I(t,t.return,r)}}var $e=!1,_t=!1,Bo=!1,Uf=typeof WeakSet=="function"?WeakSet:Set,Tt=null;function Vv(t,e){if(t=t.containerInfo,Kc=Ml,t=Cp(t),Nd(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else t:{n=(n=t.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var i=a.anchorOffset,r=a.focusNode;a=a.focusOffset;try{n.nodeType,r.nodeType}catch{n=null;break t}var s=0,l=-1,o=-1,c=0,d=0,u=t,f=null;e:for(;;){for(var h;u!==n||i!==0&&u.nodeType!==3||(l=s+i),u!==r||a!==0&&u.nodeType!==3||(o=s+a),u.nodeType===3&&(s+=u.nodeValue.length),(h=u.firstChild)!==null;)f=u,u=h;for(;;){if(u===t)break e;if(f===n&&++c===i&&(l=s),f===r&&++d===a&&(o=s),(h=u.nextSibling)!==null)break;u=f,f=u.parentNode}u=h}n=l===-1||o===-1?null:{start:l,end:o}}else n=null}n=n||{start:0,end:0}}else n=null;for(Pc={focusedElem:t,selectionRange:n},Ml=!1,Tt=e;Tt!==null;)if(e=Tt,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Tt=t;else for(;Tt!==null;){switch(e=Tt,r=e.alternate,t=e.flags,e.tag){case 0:if(t&4&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)i=t[n],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if(t&1024&&r!==null){t=void 0,n=e,i=r.memoizedProps,r=r.memoizedState,a=n.stateNode;try{var m=ka(n.type,i);t=a.getSnapshotBeforeUpdate(m,r),a.__reactInternalSnapshotBeforeUpdate=t}catch(b){I(n,n.return,b)}}break;case 3:if(t&1024){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)Jc(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Jc(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(t&1024)throw Error(M(163))}if(t=e.sibling,t!==null){t.return=e.return,Tt=t;break}Tt=e.return}}function qg(t,e,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:Fe(t,n),a&4&&Zr(5,n);break;case 1:if(Fe(t,n),a&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(s){I(n,n.return,s)}else{var i=ka(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(i,e,t.__reactInternalSnapshotBeforeUpdate)}catch(s){I(n,n.return,s)}}a&64&&Hg(n),a&512&&sr(n,n.return);break;case 3:if(Fe(t,n),a&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{Zp(t,e)}catch(s){I(n,n.return,s)}}break;case 27:e===null&&a&4&&Gg(n);case 26:case 5:Fe(t,n),e===null&&a&4&&Vg(n),a&512&&sr(n,n.return);break;case 12:Fe(t,n);break;case 31:Fe(t,n),a&4&&Qg(t,n);break;case 13:Fe(t,n),a&4&&Zg(t,n),a&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=Pv.bind(null,n),gx(t,n))));break;case 22:if(a=n.memoizedState!==null||$e,!a){e=e!==null&&e.memoizedState!==null||_t,i=$e;var r=_t;$e=a,(_t=e)&&!r?Ze(t,n,(n.subtreeFlags&8772)!==0):Fe(t,n),$e=i,_t=r}break;case 30:break;default:Fe(t,n)}}function Xg(t){var e=t.alternate;e!==null&&(t.alternate=null,Xg(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&Od(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var dt=null,Pt=!1;function Xe(t,e,n){for(n=n.child;n!==null;)Fg(t,e,n),n=n.sibling}function Fg(t,e,n){if(le&&typeof le.onCommitFiberUnmount=="function")try{le.onCommitFiberUnmount(Vr,n)}catch{}switch(n.tag){case 26:_t||Be(n,e),Xe(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:_t||Be(n,e);var a=dt,i=Pt;Wn(n.type)&&(dt=n.stateNode,Pt=!1),Xe(t,e,n),dr(n.stateNode),dt=a,Pt=i;break;case 5:_t||Be(n,e);case 6:if(a=dt,i=Pt,dt=null,Xe(t,e,n),dt=a,Pt=i,dt!==null)if(Pt)try{(dt.nodeType===9?dt.body:dt.nodeName==="HTML"?dt.ownerDocument.body:dt).removeChild(n.stateNode)}catch(r){I(n,e,r)}else try{dt.removeChild(n.stateNode)}catch(r){I(n,e,r)}break;case 18:dt!==null&&(Pt?(t=dt,If(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),gi(t)):If(dt,n.stateNode));break;case 4:a=dt,i=Pt,dt=n.stateNode.containerInfo,Pt=!0,Xe(t,e,n),dt=a,Pt=i;break;case 0:case 11:case 14:case 15:Fn(2,n,e),_t||Fn(4,n,e),Xe(t,e,n);break;case 1:_t||(Be(n,e),a=n.stateNode,typeof a.componentWillUnmount=="function"&&Ug(n,e,a)),Xe(t,e,n);break;case 21:Xe(t,e,n);break;case 22:_t=(a=_t)||n.memoizedState!==null,Xe(t,e,n),_t=a;break;default:Xe(t,e,n)}}function Qg(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{gi(t)}catch(n){I(e,e.return,n)}}}function Zg(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{gi(t)}catch(n){I(e,e.return,n)}}function Yv(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new Uf),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new Uf),e;default:throw Error(M(435,t.tag))}}function ds(t,e){var n=Yv(t);e.forEach(function(a){if(!n.has(a)){n.add(a);var i=Wv.bind(null,t,a);a.then(i,i)}})}function Qt(t,e){var n=e.deletions;if(n!==null)for(var a=0;a<n.length;a++){var i=n[a],r=t,s=e,l=s;t:for(;l!==null;){switch(l.tag){case 27:if(Wn(l.type)){dt=l.stateNode,Pt=!1;break t}break;case 5:dt=l.stateNode,Pt=!1;break t;case 3:case 4:dt=l.stateNode.containerInfo,Pt=!0;break t}l=l.return}if(dt===null)throw Error(M(160));Fg(r,s,i),dt=null,Pt=!1,r=i.alternate,r!==null&&(r.return=null),i.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)Kg(e,t),e=e.sibling}var Me=null;function Kg(t,e){var n=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Qt(e,t),Zt(t),a&4&&(Fn(3,t,t.return),Zr(3,t),Fn(5,t,t.return));break;case 1:Qt(e,t),Zt(t),a&512&&(_t||n===null||Be(n,n.return)),a&64&&$e&&(t=t.updateQueue,t!==null&&(a=t.callbacks,a!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var i=Me;if(Qt(e,t),Zt(t),a&512&&(_t||n===null||Be(n,n.return)),a&4){var r=n!==null?n.memoizedState:null;if(a=t.memoizedState,n===null)if(a===null)if(t.stateNode===null){t:{a=t.type,n=t.memoizedProps,i=i.ownerDocument||i;e:switch(a){case"title":r=i.getElementsByTagName("title")[0],(!r||r[qr]||r[zt]||r.namespaceURI==="http://www.w3.org/2000/svg"||r.hasAttribute("itemprop"))&&(r=i.createElement(a),i.head.insertBefore(r,i.querySelector("head > title"))),Bt(r,a,n),r[zt]=t,Dt(r),a=r;break t;case"link":var s=rh("link","href",i).get(a+(n.href||""));if(s){for(var l=0;l<s.length;l++)if(r=s[l],r.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&r.getAttribute("rel")===(n.rel==null?null:n.rel)&&r.getAttribute("title")===(n.title==null?null:n.title)&&r.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(l,1);break e}}r=i.createElement(a),Bt(r,a,n),i.head.appendChild(r);break;case"meta":if(s=rh("meta","content",i).get(a+(n.content||""))){for(l=0;l<s.length;l++)if(r=s[l],r.getAttribute("content")===(n.content==null?null:""+n.content)&&r.getAttribute("name")===(n.name==null?null:n.name)&&r.getAttribute("property")===(n.property==null?null:n.property)&&r.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute("charset")===(n.charSet==null?null:n.charSet)){s.splice(l,1);break e}}r=i.createElement(a),Bt(r,a,n),i.head.appendChild(r);break;default:throw Error(M(468,a))}r[zt]=t,Dt(r),a=r}t.stateNode=a}else sh(i,t.type,t.stateNode);else t.stateNode=ih(i,a,t.memoizedProps);else r!==a?(r===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):r.count--,a===null?sh(i,t.type,t.stateNode):ih(i,a,t.memoizedProps)):a===null&&t.stateNode!==null&&Ro(t,t.memoizedProps,n.memoizedProps)}break;case 27:Qt(e,t),Zt(t),a&512&&(_t||n===null||Be(n,n.return)),n!==null&&a&4&&Ro(t,t.memoizedProps,n.memoizedProps);break;case 5:if(Qt(e,t),Zt(t),a&512&&(_t||n===null||Be(n,n.return)),t.flags&32){i=t.stateNode;try{li(i,"")}catch(m){I(t,t.return,m)}}a&4&&t.stateNode!=null&&(i=t.memoizedProps,Ro(t,i,n!==null?n.memoizedProps:i)),a&1024&&(Bo=!0);break;case 6:if(Qt(e,t),Zt(t),a&4){if(t.stateNode===null)throw Error(M(162));a=t.memoizedProps,n=t.stateNode;try{n.nodeValue=a}catch(m){I(t,t.return,m)}}break;case 3:if(Vs=null,i=Me,Me=kl(e.containerInfo),Qt(e,t),Me=i,Zt(t),a&4&&n!==null&&n.memoizedState.isDehydrated)try{gi(e.containerInfo)}catch(m){I(t,t.return,m)}Bo&&(Bo=!1,Pg(t));break;case 4:a=Me,Me=kl(t.stateNode.containerInfo),Qt(e,t),Zt(t),Me=a;break;case 12:Qt(e,t),Zt(t);break;case 31:Qt(e,t),Zt(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,ds(t,a)));break;case 13:Qt(e,t),Zt(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Pl=se()),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,ds(t,a)));break;case 22:i=t.memoizedState!==null;var o=n!==null&&n.memoizedState!==null,c=$e,d=_t;if($e=c||i,_t=d||o,Qt(e,t),_t=d,$e=c,Zt(t),a&8192)t:for(e=t.stateNode,e._visibility=i?e._visibility&-2:e._visibility|1,i&&(n===null||o||$e||_t||la(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){o=n=e;try{if(r=o.stateNode,i)s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none";else{l=o.stateNode;var u=o.memoizedProps.style,f=u!=null&&u.hasOwnProperty("display")?u.display:null;l.style.display=f==null||typeof f=="boolean"?"":(""+f).trim()}}catch(m){I(o,o.return,m)}}}else if(e.tag===6){if(n===null){o=e;try{o.stateNode.nodeValue=i?"":o.memoizedProps}catch(m){I(o,o.return,m)}}}else if(e.tag===18){if(n===null){o=e;try{var h=o.stateNode;i?$f(h,!0):$f(o.stateNode,!1)}catch(m){I(o,o.return,m)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}a&4&&(a=t.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,ds(t,n))));break;case 19:Qt(e,t),Zt(t),a&4&&(a=t.updateQueue,a!==null&&(t.updateQueue=null,ds(t,a)));break;case 30:break;case 21:break;default:Qt(e,t),Zt(t)}}function Zt(t){var e=t.flags;if(e&2){try{for(var n,a=t.return;a!==null;){if(Yg(a)){n=a;break}a=a.return}if(n==null)throw Error(M(160));switch(n.tag){case 27:var i=n.stateNode,r=Lo(t);pl(t,r,i);break;case 5:var s=n.stateNode;n.flags&32&&(li(s,""),n.flags&=-33);var l=Lo(t);pl(t,l,s);break;case 3:case 4:var o=n.stateNode.containerInfo,c=Lo(t);Yc(t,c,o);break;default:throw Error(M(161))}}catch(d){I(t,t.return,d)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Pg(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;Pg(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function Fe(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)qg(t,e.alternate,e),e=e.sibling}function la(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:Fn(4,e,e.return),la(e);break;case 1:Be(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&Ug(e,e.return,n),la(e);break;case 27:dr(e.stateNode);case 26:case 5:Be(e,e.return),la(e);break;case 22:e.memoizedState===null&&la(e);break;case 30:la(e);break;default:la(e)}t=t.sibling}}function Ze(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var a=e.alternate,i=t,r=e,s=r.flags;switch(r.tag){case 0:case 11:case 15:Ze(i,r,n),Zr(4,r);break;case 1:if(Ze(i,r,n),a=r,i=a.stateNode,typeof i.componentDidMount=="function")try{i.componentDidMount()}catch(c){I(a,a.return,c)}if(a=r,i=a.updateQueue,i!==null){var l=a.stateNode;try{var o=i.shared.hiddenCallbacks;if(o!==null)for(i.shared.hiddenCallbacks=null,i=0;i<o.length;i++)Qp(o[i],l)}catch(c){I(a,a.return,c)}}n&&s&64&&Hg(r),sr(r,r.return);break;case 27:Gg(r);case 26:case 5:Ze(i,r,n),n&&a===null&&s&4&&Vg(r),sr(r,r.return);break;case 12:Ze(i,r,n);break;case 31:Ze(i,r,n),n&&s&4&&Qg(i,r);break;case 13:Ze(i,r,n),n&&s&4&&Zg(i,r);break;case 22:r.memoizedState===null&&Ze(i,r,n),sr(r,r.return);break;case 30:break;default:Ze(i,r,n)}e=e.sibling}}function ou(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&Fr(n))}function cu(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Fr(t))}function we(t,e,n,a){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Wg(t,e,n,a),e=e.sibling}function Wg(t,e,n,a){var i=e.flags;switch(e.tag){case 0:case 11:case 15:we(t,e,n,a),i&2048&&Zr(9,e);break;case 1:we(t,e,n,a);break;case 3:we(t,e,n,a),i&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Fr(t)));break;case 12:if(i&2048){we(t,e,n,a),t=e.stateNode;try{var r=e.memoizedProps,s=r.id,l=r.onPostCommit;typeof l=="function"&&l(s,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(o){I(e,e.return,o)}}else we(t,e,n,a);break;case 31:we(t,e,n,a);break;case 13:we(t,e,n,a);break;case 23:break;case 22:r=e.stateNode,s=e.alternate,e.memoizedState!==null?r._visibility&2?we(t,e,n,a):lr(t,e):r._visibility&2?we(t,e,n,a):(r._visibility|=2,ja(t,e,n,a,(e.subtreeFlags&10256)!==0||!1)),i&2048&&ou(s,e);break;case 24:we(t,e,n,a),i&2048&&cu(e.alternate,e);break;default:we(t,e,n,a)}}function ja(t,e,n,a,i){for(i=i&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var r=t,s=e,l=n,o=a,c=s.flags;switch(s.tag){case 0:case 11:case 15:ja(r,s,l,o,i),Zr(8,s);break;case 23:break;case 22:var d=s.stateNode;s.memoizedState!==null?d._visibility&2?ja(r,s,l,o,i):lr(r,s):(d._visibility|=2,ja(r,s,l,o,i)),i&&c&2048&&ou(s.alternate,s);break;case 24:ja(r,s,l,o,i),i&&c&2048&&cu(s.alternate,s);break;default:ja(r,s,l,o,i)}e=e.sibling}}function lr(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,a=e,i=a.flags;switch(a.tag){case 22:lr(n,a),i&2048&&ou(a.alternate,a);break;case 24:lr(n,a),i&2048&&cu(a.alternate,a);break;default:lr(n,a)}e=e.sibling}}var Xi=8192;function za(t,e,n){if(t.subtreeFlags&Xi)for(t=t.child;t!==null;)Jg(t,e,n),t=t.sibling}function Jg(t,e,n){switch(t.tag){case 26:za(t,e,n),t.flags&Xi&&t.memoizedState!==null&&Tx(n,Me,t.memoizedState,t.memoizedProps);break;case 5:za(t,e,n);break;case 3:case 4:var a=Me;Me=kl(t.stateNode.containerInfo),za(t,e,n),Me=a;break;case 22:t.memoizedState===null&&(a=t.alternate,a!==null&&a.memoizedState!==null?(a=Xi,Xi=16777216,za(t,e,n),Xi=a):za(t,e,n));break;default:za(t,e,n)}}function Ig(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function Ri(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Tt=a,tm(a,t)}Ig(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)$g(t),t=t.sibling}function $g(t){switch(t.tag){case 0:case 11:case 15:Ri(t),t.flags&2048&&Fn(9,t,t.return);break;case 3:Ri(t);break;case 12:Ri(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,Hs(t)):Ri(t);break;default:Ri(t)}}function Hs(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var a=e[n];Tt=a,tm(a,t)}Ig(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:Fn(8,e,e.return),Hs(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,Hs(e));break;default:Hs(e)}t=t.sibling}}function tm(t,e){for(;Tt!==null;){var n=Tt;switch(n.tag){case 0:case 11:case 15:Fn(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:Fr(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Tt=a;else t:for(n=t;Tt!==null;){a=Tt;var i=a.sibling,r=a.return;if(Xg(a),a===n){Tt=null;break t}if(i!==null){i.return=r,Tt=i;break t}Tt=r}}}var Gv={getCacheForType:function(t){var e=Lt(kt),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return Lt(kt).controller.signal}},qv=typeof WeakMap=="function"?WeakMap:Map,K=0,et=null,Y=null,q=0,W=0,ne=null,Mn=!1,Mi=!1,du=!1,pn=0,pt=0,Qn=0,ga=0,uu=0,re=0,ui=0,or=null,Wt=null,Gc=!1,Pl=0,em=0,gl=1/0,ml=null,jn=null,wt=0,Hn=null,fi=null,cn=0,qc=0,Xc=null,nm=null,cr=0,Fc=null;function ce(){return K&2&&q!==0?q&-q:L.T!==null?hu():up()}function am(){if(re===0)if(!(q&536870912)||F){var t=ns;ns<<=1,!(ns&3932160)&&(ns=262144),re=t}else re=536870912;return t=ue.current,t!==null&&(t.flags|=32),re}function It(t,e,n){(t===et&&(W===2||W===9)||t.cancelPendingCommit!==null)&&(hi(t,0),An(t,q,re,!1)),Gr(t,n),(!(K&2)||t!==et)&&(t===et&&(!(K&2)&&(ga|=n),pt===4&&An(t,q,re,!1)),Ue(t))}function im(t,e,n){if(K&6)throw Error(M(327));var a=!n&&(e&127)===0&&(e&t.expiredLanes)===0||Yr(t,e),i=a?Qv(t,e):No(t,e,!0),r=a;do{if(i===0){Mi&&!a&&An(t,e,0,!1);break}else{if(n=t.current.alternate,r&&!Xv(n)){i=No(t,e,!1),r=!1;continue}if(i===2){if(r=e,t.errorRecoveryDisabledLanes&r)var s=0;else s=t.pendingLanes&-536870913,s=s!==0?s:s&536870912?536870912:0;if(s!==0){e=s;t:{var l=t;i=or;var o=l.current.memoizedState.isDehydrated;if(o&&(hi(l,s).flags|=256),s=No(l,s,!1),s!==2){if(du&&!o){l.errorRecoveryDisabledLanes|=r,ga|=r,i=4;break t}r=Wt,Wt=i,r!==null&&(Wt===null?Wt=r:Wt.push.apply(Wt,r))}i=s}if(r=!1,i!==2)continue}}if(i===1){hi(t,0),An(t,e,0,!0);break}t:{switch(a=t,r=i,r){case 0:case 1:throw Error(M(345));case 4:if((e&4194048)!==e)break;case 6:An(a,e,re,!Mn);break t;case 2:Wt=null;break;case 3:case 5:break;default:throw Error(M(329))}if((e&62914560)===e&&(i=Pl+300-se(),10<i)){if(An(a,e,re,!Mn),Hl(a,0,!0)!==0)break t;cn=e,a.timeoutHandle=wm(Vf.bind(null,a,n,Wt,ml,Gc,e,re,ga,ui,Mn,r,"Throttled",-0,0),i);break t}Vf(a,n,Wt,ml,Gc,e,re,ga,ui,Mn,r,null,-0,0)}}break}while(!0);Ue(t)}function Vf(t,e,n,a,i,r,s,l,o,c,d,u,f,h){if(t.timeoutHandle=-1,u=e.subtreeFlags,u&8192||(u&16785408)===16785408){u={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:en},Jg(e,r,u);var m=(r&62914560)===r?Pl-se():(r&4194048)===r?em-se():0;if(m=Dx(u,m),m!==null){cn=r,t.cancelPendingCommit=m(Gf.bind(null,t,e,r,n,a,i,s,l,o,d,u,null,f,h)),An(t,r,s,!c);return}}Gf(t,e,r,n,a,i,s,l,o)}function Xv(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var i=n[a],r=i.getSnapshot;i=i.value;try{if(!de(r(),i))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function An(t,e,n,a){e&=~uu,e&=~ga,t.suspendedLanes|=e,t.pingedLanes&=~e,a&&(t.warmLanes|=e),a=t.expirationTimes;for(var i=e;0<i;){var r=31-oe(i),s=1<<r;a[r]=-1,i&=~s}n!==0&&op(t,n,e)}function Wl(){return K&6?!0:(Kr(0),!1)}function fu(){if(Y!==null){if(W===0)var t=Y.return;else t=Y,nn=Ca=null,Jd(t),ei=null,kr=0,t=Y;for(;t!==null;)jg(t.alternate,t),t=t.return;Y=null}}function hi(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,dx(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),cn=0,fu(),et=t,Y=n=ln(t.current,null),q=e,W=0,ne=null,Mn=!1,Mi=Yr(t,e),du=!1,ui=re=uu=ga=Qn=pt=0,Wt=or=null,Gc=!1,e&8&&(e|=e&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=e;0<a;){var i=31-oe(a),r=1<<i;e|=t[i],a&=~r}return pn=e,Gl(),n}function rm(t,e){H=null,L.H=wr,e===wi||e===Xl?(e=yf(),W=3):e===Xd?(e=yf(),W=4):W=e===su?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,ne=e,Y===null&&(pt=1,fl(t,ye(e,t.current)))}function sm(){var t=ue.current;return t===null?!0:(q&4194048)===q?xe===null:(q&62914560)===q||q&536870912?t===xe:!1}function lm(){var t=L.H;return L.H=wr,t===null?wr:t}function om(){var t=L.A;return L.A=Gv,t}function bl(){pt=4,Mn||(q&4194048)!==q&&ue.current!==null||(Mi=!0),!(Qn&134217727)&&!(ga&134217727)||et===null||An(et,q,re,!1)}function No(t,e,n){var a=K;K|=2;var i=lm(),r=om();(et!==t||q!==e)&&(ml=null,hi(t,e)),e=!1;var s=pt;t:do try{if(W!==0&&Y!==null){var l=Y,o=ne;switch(W){case 8:fu(),s=6;break t;case 3:case 2:case 9:case 6:ue.current===null&&(e=!0);var c=W;if(W=0,ne=null,Wa(t,l,o,c),n&&Mi){s=0;break t}break;default:c=W,W=0,ne=null,Wa(t,l,o,c)}}Fv(),s=pt;break}catch(d){rm(t,d)}while(!0);return e&&t.shellSuspendCounter++,nn=Ca=null,K=a,L.H=i,L.A=r,Y===null&&(et=null,q=0,Gl()),s}function Fv(){for(;Y!==null;)cm(Y)}function Qv(t,e){var n=K;K|=2;var a=lm(),i=om();et!==t||q!==e?(ml=null,gl=se()+500,hi(t,e)):Mi=Yr(t,e);t:do try{if(W!==0&&Y!==null){e=Y;var r=ne;e:switch(W){case 1:W=0,ne=null,Wa(t,e,r,1);break;case 2:case 9:if(bf(r)){W=0,ne=null,Yf(e);break}e=function(){W!==2&&W!==9||et!==t||(W=7),Ue(t)},r.then(e,e);break t;case 3:W=7;break t;case 4:W=5;break t;case 7:bf(r)?(W=0,ne=null,Yf(e)):(W=0,ne=null,Wa(t,e,r,7));break;case 5:var s=null;switch(Y.tag){case 26:s=Y.memoizedState;case 5:case 27:var l=Y;if(s?Cm(s):l.stateNode.complete){W=0,ne=null;var o=l.sibling;if(o!==null)Y=o;else{var c=l.return;c!==null?(Y=c,Jl(c)):Y=null}break e}}W=0,ne=null,Wa(t,e,r,5);break;case 6:W=0,ne=null,Wa(t,e,r,6);break;case 8:fu(),pt=6;break t;default:throw Error(M(462))}}Zv();break}catch(d){rm(t,d)}while(!0);return nn=Ca=null,L.H=a,L.A=i,K=n,Y!==null?0:(et=null,q=0,Gl(),pt)}function Zv(){for(;Y!==null&&!my();)cm(Y)}function cm(t){var e=Ng(t.alternate,t,pn);t.memoizedProps=t.pendingProps,e===null?Jl(t):Y=e}function Yf(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=Lf(n,e,e.pendingProps,e.type,void 0,q);break;case 11:e=Lf(n,e,e.pendingProps,e.type.render,e.ref,q);break;case 5:Jd(e);default:jg(n,e),e=Y=jp(e,pn),e=Ng(n,e,pn)}t.memoizedProps=t.pendingProps,e===null?Jl(t):Y=e}function Wa(t,e,n,a){nn=Ca=null,Jd(e),ei=null,kr=0;var i=e.return;try{if(Bv(t,i,e,n,q)){pt=1,fl(t,ye(n,t.current)),Y=null;return}}catch(r){if(i!==null)throw Y=i,r;pt=1,fl(t,ye(n,t.current)),Y=null;return}e.flags&32768?(F||a===1?t=!0:Mi||q&536870912?t=!1:(Mn=t=!0,(a===2||a===9||a===3||a===6)&&(a=ue.current,a!==null&&a.tag===13&&(a.flags|=16384))),dm(e,t)):Jl(e)}function Jl(t){var e=t;do{if(e.flags&32768){dm(e,Mn);return}t=e.return;var n=Hv(e.alternate,e,pn);if(n!==null){Y=n;return}if(e=e.sibling,e!==null){Y=e;return}Y=e=t}while(e!==null);pt===0&&(pt=5)}function dm(t,e){do{var n=Uv(t.alternate,t);if(n!==null){n.flags&=32767,Y=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){Y=t;return}Y=t=n}while(t!==null);pt=6,Y=null}function Gf(t,e,n,a,i,r,s,l,o){t.cancelPendingCommit=null;do Il();while(wt!==0);if(K&6)throw Error(M(327));if(e!==null){if(e===t.current)throw Error(M(177));if(r=e.lanes|e.childLanes,r|=jd,Ay(t,n,r,s,l,o),t===et&&(Y=et=null,q=0),fi=e,Hn=t,cn=n,qc=r,Xc=i,nm=a,e.subtreeFlags&10256||e.flags&10256?(t.callbackNode=null,t.callbackPriority=0,Jv(el,function(){return gm(),null})):(t.callbackNode=null,t.callbackPriority=0),a=(e.flags&13878)!==0,e.subtreeFlags&13878||a){a=L.T,L.T=null,i=P.p,P.p=2,s=K,K|=4;try{Vv(t,e,n)}finally{K=s,P.p=i,L.T=a}}wt=1,um(),fm(),hm()}}function um(){if(wt===1){wt=0;var t=Hn,e=fi,n=(e.flags&13878)!==0;if(e.subtreeFlags&13878||n){n=L.T,L.T=null;var a=P.p;P.p=2;var i=K;K|=4;try{Kg(e,t);var r=Pc,s=Cp(t.containerInfo),l=r.focusedElem,o=r.selectionRange;if(s!==l&&l&&l.ownerDocument&&Dp(l.ownerDocument.documentElement,l)){if(o!==null&&Nd(l)){var c=o.start,d=o.end;if(d===void 0&&(d=c),"selectionStart"in l)l.selectionStart=c,l.selectionEnd=Math.min(d,l.value.length);else{var u=l.ownerDocument||document,f=u&&u.defaultView||window;if(f.getSelection){var h=f.getSelection(),m=l.textContent.length,b=Math.min(o.start,m),v=o.end===void 0?b:Math.min(o.end,m);!h.extend&&b>v&&(s=v,v=b,b=s);var p=df(l,b),g=df(l,v);if(p&&g&&(h.rangeCount!==1||h.anchorNode!==p.node||h.anchorOffset!==p.offset||h.focusNode!==g.node||h.focusOffset!==g.offset)){var y=u.createRange();y.setStart(p.node,p.offset),h.removeAllRanges(),b>v?(h.addRange(y),h.extend(g.node,g.offset)):(y.setEnd(g.node,g.offset),h.addRange(y))}}}}for(u=[],h=l;h=h.parentNode;)h.nodeType===1&&u.push({element:h,left:h.scrollLeft,top:h.scrollTop});for(typeof l.focus=="function"&&l.focus(),l=0;l<u.length;l++){var x=u[l];x.element.scrollLeft=x.left,x.element.scrollTop=x.top}}Ml=!!Kc,Pc=Kc=null}finally{K=i,P.p=a,L.T=n}}t.current=e,wt=2}}function fm(){if(wt===2){wt=0;var t=Hn,e=fi,n=(e.flags&8772)!==0;if(e.subtreeFlags&8772||n){n=L.T,L.T=null;var a=P.p;P.p=2;var i=K;K|=4;try{qg(t,e.alternate,e)}finally{K=i,P.p=a,L.T=n}}wt=3}}function hm(){if(wt===4||wt===3){wt=0,by();var t=Hn,e=fi,n=cn,a=nm;e.subtreeFlags&10256||e.flags&10256?wt=5:(wt=0,fi=Hn=null,pm(t,t.pendingLanes));var i=t.pendingLanes;if(i===0&&(jn=null),Cd(n),e=e.stateNode,le&&typeof le.onCommitFiberRoot=="function")try{le.onCommitFiberRoot(Vr,e,void 0,(e.current.flags&128)===128)}catch{}if(a!==null){e=L.T,i=P.p,P.p=2,L.T=null;try{for(var r=t.onRecoverableError,s=0;s<a.length;s++){var l=a[s];r(l.value,{componentStack:l.stack})}}finally{L.T=e,P.p=i}}cn&3&&Il(),Ue(t),i=t.pendingLanes,n&261930&&i&42?t===Fc?cr++:(cr=0,Fc=t):cr=0,Kr(0)}}function pm(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,Fr(e)))}function Il(){return um(),fm(),hm(),gm()}function gm(){if(wt!==5)return!1;var t=Hn,e=qc;qc=0;var n=Cd(cn),a=L.T,i=P.p;try{P.p=32>n?32:n,L.T=null,n=Xc,Xc=null;var r=Hn,s=cn;if(wt=0,fi=Hn=null,cn=0,K&6)throw Error(M(331));var l=K;if(K|=4,$g(r.current),Wg(r,r.current,s,n),K=l,Kr(0,!1),le&&typeof le.onPostCommitFiberRoot=="function")try{le.onPostCommitFiberRoot(Vr,r)}catch{}return!0}finally{P.p=i,L.T=a,pm(t,e)}}function qf(t,e,n){e=ye(n,e),e=Hc(t.stateNode,e,2),t=Nn(t,e,2),t!==null&&(Gr(t,2),Ue(t))}function I(t,e,n){if(t.tag===3)qf(t,t,n);else for(;e!==null;){if(e.tag===3){qf(e,t,n);break}else if(e.tag===1){var a=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(jn===null||!jn.has(a))){t=ye(n,t),n=Og(2),a=Nn(e,n,2),a!==null&&(Eg(n,a,e,t),Gr(a,2),Ue(a));break}}e=e.return}}function jo(t,e,n){var a=t.pingCache;if(a===null){a=t.pingCache=new qv;var i=new Set;a.set(e,i)}else i=a.get(e),i===void 0&&(i=new Set,a.set(e,i));i.has(n)||(du=!0,i.add(n),t=Kv.bind(null,t,e,n),e.then(t,t))}function Kv(t,e,n){var a=t.pingCache;a!==null&&a.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,et===t&&(q&n)===n&&(pt===4||pt===3&&(q&62914560)===q&&300>se()-Pl?!(K&2)&&hi(t,0):uu|=n,ui===q&&(ui=0)),Ue(t)}function mm(t,e){e===0&&(e=lp()),t=Da(t,e),t!==null&&(Gr(t,e),Ue(t))}function Pv(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),mm(t,n)}function Wv(t,e){var n=0;switch(t.tag){case 31:case 13:var a=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:a=t.stateNode;break;case 22:a=t.stateNode._retryCache;break;default:throw Error(M(314))}a!==null&&a.delete(e),mm(t,n)}function Jv(t,e){return Td(t,e)}var yl=null,Ha=null,Qc=!1,vl=!1,Ho=!1,Tn=0;function Ue(t){t!==Ha&&t.next===null&&(Ha===null?yl=Ha=t:Ha=Ha.next=t),vl=!0,Qc||(Qc=!0,$v())}function Kr(t,e){if(!Ho&&vl){Ho=!0;do for(var n=!1,a=yl;a!==null;){if(t!==0){var i=a.pendingLanes;if(i===0)var r=0;else{var s=a.suspendedLanes,l=a.pingedLanes;r=(1<<31-oe(42|t)+1)-1,r&=i&~(s&~l),r=r&201326741?r&201326741|1:r?r|2:0}r!==0&&(n=!0,Xf(a,r))}else r=q,r=Hl(a,a===et?r:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),!(r&3)||Yr(a,r)||(n=!0,Xf(a,r));a=a.next}while(n);Ho=!1}}function Iv(){bm()}function bm(){vl=Qc=!1;var t=0;Tn!==0&&cx()&&(t=Tn);for(var e=se(),n=null,a=yl;a!==null;){var i=a.next,r=ym(a,e);r===0?(a.next=null,n===null?yl=i:n.next=i,i===null&&(Ha=n)):(n=a,(t!==0||r&3)&&(vl=!0)),a=i}wt!==0&&wt!==5||Kr(t),Tn!==0&&(Tn=0)}function ym(t,e){for(var n=t.suspendedLanes,a=t.pingedLanes,i=t.expirationTimes,r=t.pendingLanes&-62914561;0<r;){var s=31-oe(r),l=1<<s,o=i[s];o===-1?(!(l&n)||l&a)&&(i[s]=My(l,e)):o<=e&&(t.expiredLanes|=l),r&=~l}if(e=et,n=q,n=Hl(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a=t.callbackNode,n===0||t===e&&(W===2||W===9)||t.cancelPendingCommit!==null)return a!==null&&a!==null&&fo(a),t.callbackNode=null,t.callbackPriority=0;if(!(n&3)||Yr(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(a!==null&&fo(a),Cd(n)){case 2:case 8:n=rp;break;case 32:n=el;break;case 268435456:n=sp;break;default:n=el}return a=vm.bind(null,t),n=Td(n,a),t.callbackPriority=e,t.callbackNode=n,e}return a!==null&&a!==null&&fo(a),t.callbackPriority=2,t.callbackNode=null,2}function vm(t,e){if(wt!==0&&wt!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Il()&&t.callbackNode!==n)return null;var a=q;return a=Hl(t,t===et?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),a===0?null:(im(t,a,e),ym(t,se()),t.callbackNode!=null&&t.callbackNode===n?vm.bind(null,t):null)}function Xf(t,e){if(Il())return null;im(t,e,!0)}function $v(){ux(function(){K&6?Td(ip,Iv):bm()})}function hu(){if(Tn===0){var t=oi;t===0&&(t=es,es<<=1,!(es&261888)&&(es=256)),Tn=t}return Tn}function Ff(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Cs(""+t)}function Qf(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function tx(t,e,n,a,i){if(e==="submit"&&n&&n.stateNode===i){var r=Ff((i[$t]||null).action),s=a.submitter;s&&(e=(e=s[$t]||null)?Ff(e.formAction):s.getAttribute("formAction"),e!==null&&(r=e,s=null));var l=new Ul("action","action",null,a,i);t.push({event:l,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(Tn!==0){var o=s?Qf(i,s):new FormData(i);Nc(n,{pending:!0,data:o,method:i.method,action:r},null,o)}}else typeof r=="function"&&(l.preventDefault(),o=s?Qf(i,s):new FormData(i),Nc(n,{pending:!0,data:o,method:i.method,action:r},r,o))},currentTarget:i}]})}}for(var Uo=0;Uo<wc.length;Uo++){var Vo=wc[Uo],ex=Vo.toLowerCase(),nx=Vo[0].toUpperCase()+Vo.slice(1);Ce(ex,"on"+nx)}Ce(Ep,"onAnimationEnd");Ce(zp,"onAnimationIteration");Ce(Rp,"onAnimationStart");Ce("dblclick","onDoubleClick");Ce("focusin","onFocus");Ce("focusout","onBlur");Ce(yv,"onTransitionRun");Ce(vv,"onTransitionStart");Ce(xv,"onTransitionCancel");Ce(Lp,"onTransitionEnd");si("onMouseEnter",["mouseout","mouseover"]);si("onMouseLeave",["mouseout","mouseover"]);si("onPointerEnter",["pointerout","pointerover"]);si("onPointerLeave",["pointerout","pointerover"]);Ma("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ma("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ma("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ma("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ma("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ma("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Mr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ax=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Mr));function xm(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var a=t[n],i=a.event;a=a.listeners;t:{var r=void 0;if(e)for(var s=a.length-1;0<=s;s--){var l=a[s],o=l.instance,c=l.currentTarget;if(l=l.listener,o!==r&&i.isPropagationStopped())break t;r=l,i.currentTarget=c;try{r(i)}catch(d){al(d)}i.currentTarget=null,r=o}else for(s=0;s<a.length;s++){if(l=a[s],o=l.instance,c=l.currentTarget,l=l.listener,o!==r&&i.isPropagationStopped())break t;r=l,i.currentTarget=c;try{r(i)}catch(d){al(d)}i.currentTarget=null,r=o}}}}function V(t,e){var n=e[mc];n===void 0&&(n=e[mc]=new Set);var a=t+"__bubble";n.has(a)||(_m(e,t,2,!1),n.add(a))}function Yo(t,e,n){var a=0;e&&(a|=4),_m(n,t,a,e)}var us="_reactListening"+Math.random().toString(36).slice(2);function pu(t){if(!t[us]){t[us]=!0,fp.forEach(function(n){n!=="selectionchange"&&(ax.has(n)||Yo(n,!1,t),Yo(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[us]||(e[us]=!0,Yo("selectionchange",!1,e))}}function _m(t,e,n,a){switch(Lm(e)){case 2:var i=Ex;break;case 8:i=zx;break;default:i=yu}n=i.bind(null,e,n,t),i=void 0,!_c||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),a?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function Go(t,e,n,a,i){var r=a;if(!(e&1)&&!(e&2)&&a!==null)t:for(;;){if(a===null)return;var s=a.tag;if(s===3||s===4){var l=a.stateNode.containerInfo;if(l===i)break;if(s===4)for(s=a.return;s!==null;){var o=s.tag;if((o===3||o===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;l!==null;){if(s=Ya(l),s===null)return;if(o=s.tag,o===5||o===6||o===26||o===27){a=r=s;continue t}l=l.parentNode}}a=a.return}xp(function(){var c=r,d=zd(n),u=[];t:{var f=Bp.get(t);if(f!==void 0){var h=Ul,m=t;switch(t){case"keypress":if(Es(n)===0)break t;case"keydown":case"keyup":h=Wy;break;case"focusin":m="focus",h=bo;break;case"focusout":m="blur",h=bo;break;case"beforeblur":case"afterblur":h=bo;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":h=$u;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":h=Hy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":h=$y;break;case Ep:case zp:case Rp:h=Yy;break;case Lp:h=ev;break;case"scroll":case"scrollend":h=Ny;break;case"wheel":h=av;break;case"copy":case"cut":case"paste":h=qy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":h=ef;break;case"toggle":case"beforetoggle":h=rv}var b=(e&4)!==0,v=!b&&(t==="scroll"||t==="scrollend"),p=b?f!==null?f+"Capture":null:f;b=[];for(var g=c,y;g!==null;){var x=g;if(y=x.stateNode,x=x.tag,x!==5&&x!==26&&x!==27||y===null||p===null||(x=br(g,p),x!=null&&b.push(Ar(g,x,y))),v)break;g=g.return}0<b.length&&(f=new h(f,m,null,n,d),u.push({event:f,listeners:b}))}}if(!(e&7)){t:{if(f=t==="mouseover"||t==="pointerover",h=t==="mouseout"||t==="pointerout",f&&n!==xc&&(m=n.relatedTarget||n.fromElement)&&(Ya(m)||m[_i]))break t;if((h||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,h?(m=n.relatedTarget||n.toElement,h=c,m=m?Ya(m):null,m!==null&&(v=Ur(m),b=m.tag,m!==v||b!==5&&b!==27&&b!==6)&&(m=null)):(h=null,m=c),h!==m)){if(b=$u,x="onMouseLeave",p="onMouseEnter",g="mouse",(t==="pointerout"||t==="pointerover")&&(b=ef,x="onPointerLeave",p="onPointerEnter",g="pointer"),v=h==null?f:Gi(h),y=m==null?f:Gi(m),f=new b(x,g+"leave",h,n,d),f.target=v,f.relatedTarget=y,x=null,Ya(d)===c&&(b=new b(p,g+"enter",m,n,d),b.target=y,b.relatedTarget=v,x=b),v=x,h&&m)e:{for(b=ix,p=h,g=m,y=0,x=p;x;x=b(x))y++;x=0;for(var _=g;_;_=b(_))x++;for(;0<y-x;)p=b(p),y--;for(;0<x-y;)g=b(g),x--;for(;y--;){if(p===g||g!==null&&p===g.alternate){b=p;break e}p=b(p),g=b(g)}b=null}else b=null;h!==null&&Zf(u,f,h,b,!1),m!==null&&v!==null&&Zf(u,v,m,b,!0)}}t:{if(f=c?Gi(c):window,h=f.nodeName&&f.nodeName.toLowerCase(),h==="select"||h==="input"&&f.type==="file")var w=sf;else if(rf(f))if(Ap)w=gv;else{w=hv;var k=fv}else h=f.nodeName,!h||h.toLowerCase()!=="input"||f.type!=="checkbox"&&f.type!=="radio"?c&&Ed(c.elementType)&&(w=sf):w=pv;if(w&&(w=w(t,c))){Mp(u,w,n,d);break t}k&&k(t,f,c),t==="focusout"&&c&&f.type==="number"&&c.memoizedProps.value!=null&&vc(f,"number",f.value)}switch(k=c?Gi(c):window,t){case"focusin":(rf(k)||k.contentEditable==="true")&&(Xa=k,kc=c,tr=null);break;case"focusout":tr=kc=Xa=null;break;case"mousedown":Sc=!0;break;case"contextmenu":case"mouseup":case"dragend":Sc=!1,uf(u,n,d);break;case"selectionchange":if(bv)break;case"keydown":case"keyup":uf(u,n,d)}var S;if(Bd)t:{switch(t){case"compositionstart":var A="onCompositionStart";break t;case"compositionend":A="onCompositionEnd";break t;case"compositionupdate":A="onCompositionUpdate";break t}A=void 0}else qa?Sp(t,n)&&(A="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(A="onCompositionStart");A&&(kp&&n.locale!=="ko"&&(qa||A!=="onCompositionStart"?A==="onCompositionEnd"&&qa&&(S=_p()):(wn=d,Rd="value"in wn?wn.value:wn.textContent,qa=!0)),k=xl(c,A),0<k.length&&(A=new tf(A,t,null,n,d),u.push({event:A,listeners:k}),S?A.data=S:(S=wp(n),S!==null&&(A.data=S)))),(S=lv?ov(t,n):cv(t,n))&&(A=xl(c,"onBeforeInput"),0<A.length&&(k=new tf("onBeforeInput","beforeinput",null,n,d),u.push({event:k,listeners:A}),k.data=S)),tx(u,t,c,n,d)}xm(u,e)})}function Ar(t,e,n){return{instance:t,listener:e,currentTarget:n}}function xl(t,e){for(var n=e+"Capture",a=[];t!==null;){var i=t,r=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||r===null||(i=br(t,n),i!=null&&a.unshift(Ar(t,i,r)),i=br(t,e),i!=null&&a.push(Ar(t,i,r))),t.tag===3)return a;t=t.return}return[]}function ix(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Zf(t,e,n,a,i){for(var r=e._reactName,s=[];n!==null&&n!==a;){var l=n,o=l.alternate,c=l.stateNode;if(l=l.tag,o!==null&&o===a)break;l!==5&&l!==26&&l!==27||c===null||(o=c,i?(c=br(n,r),c!=null&&s.unshift(Ar(n,c,o))):i||(c=br(n,r),c!=null&&s.push(Ar(n,c,o)))),n=n.return}s.length!==0&&t.push({event:e,listeners:s})}var rx=/\r\n?/g,sx=/\u0000|\uFFFD/g;function Kf(t){return(typeof t=="string"?t:""+t).replace(rx,`
`).replace(sx,"")}function km(t,e){return e=Kf(e),Kf(t)===e}function $(t,e,n,a,i,r){switch(n){case"children":typeof a=="string"?e==="body"||e==="textarea"&&a===""||li(t,a):(typeof a=="number"||typeof a=="bigint")&&e!=="body"&&li(t,""+a);break;case"className":is(t,"class",a);break;case"tabIndex":is(t,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":is(t,n,a);break;case"style":vp(t,a,r);break;case"data":if(e!=="object"){is(t,"data",a);break}case"src":case"href":if(a===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Cs(""+a),t.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof r=="function"&&(n==="formAction"?(e!=="input"&&$(t,e,"name",i.name,i,null),$(t,e,"formEncType",i.formEncType,i,null),$(t,e,"formMethod",i.formMethod,i,null),$(t,e,"formTarget",i.formTarget,i,null)):($(t,e,"encType",i.encType,i,null),$(t,e,"method",i.method,i,null),$(t,e,"target",i.target,i,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){t.removeAttribute(n);break}a=Cs(""+a),t.setAttribute(n,a);break;case"onClick":a!=null&&(t.onclick=en);break;case"onScroll":a!=null&&V("scroll",t);break;case"onScrollEnd":a!=null&&V("scrollend",t);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(M(61));if(n=a.__html,n!=null){if(i.children!=null)throw Error(M(60));t.innerHTML=n}}break;case"multiple":t.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":t.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){t.removeAttribute("xlink:href");break}n=Cs(""+a),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""+a):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":a===!0?t.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?t.setAttribute(n,a):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?t.setAttribute(n,a):t.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?t.removeAttribute(n):t.setAttribute(n,a);break;case"popover":V("beforetoggle",t),V("toggle",t),Ds(t,"popover",a);break;case"xlinkActuate":Ge(t,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":Ge(t,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":Ge(t,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":Ge(t,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":Ge(t,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":Ge(t,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":Ge(t,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":Ge(t,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":Ge(t,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Ds(t,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=Ly.get(n)||n,Ds(t,n,a))}}function Zc(t,e,n,a,i,r){switch(n){case"style":vp(t,a,r);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(M(61));if(n=a.__html,n!=null){if(i.children!=null)throw Error(M(60));t.innerHTML=n}}break;case"children":typeof a=="string"?li(t,a):(typeof a=="number"||typeof a=="bigint")&&li(t,""+a);break;case"onScroll":a!=null&&V("scroll",t);break;case"onScrollEnd":a!=null&&V("scrollend",t);break;case"onClick":a!=null&&(t.onclick=en);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!hp.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(i=n.endsWith("Capture"),e=n.slice(2,i?n.length-7:void 0),r=t[$t]||null,r=r!=null?r[n]:null,typeof r=="function"&&t.removeEventListener(e,r,i),typeof a=="function")){typeof r!="function"&&r!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,a,i);break t}n in t?t[n]=a:a===!0?t.setAttribute(n,""):Ds(t,n,a)}}}function Bt(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":V("error",t),V("load",t);var a=!1,i=!1,r;for(r in n)if(n.hasOwnProperty(r)){var s=n[r];if(s!=null)switch(r){case"src":a=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(M(137,e));default:$(t,e,r,s,n,null)}}i&&$(t,e,"srcSet",n.srcSet,n,null),a&&$(t,e,"src",n.src,n,null);return;case"input":V("invalid",t);var l=r=s=i=null,o=null,c=null;for(a in n)if(n.hasOwnProperty(a)){var d=n[a];if(d!=null)switch(a){case"name":i=d;break;case"type":s=d;break;case"checked":o=d;break;case"defaultChecked":c=d;break;case"value":r=d;break;case"defaultValue":l=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(M(137,e));break;default:$(t,e,a,d,n,null)}}mp(t,r,l,o,c,s,i,!1);return;case"select":V("invalid",t),a=s=r=null;for(i in n)if(n.hasOwnProperty(i)&&(l=n[i],l!=null))switch(i){case"value":r=l;break;case"defaultValue":s=l;break;case"multiple":a=l;default:$(t,e,i,l,n,null)}e=r,n=s,t.multiple=!!a,e!=null?Ia(t,!!a,e,!1):n!=null&&Ia(t,!!a,n,!0);return;case"textarea":V("invalid",t),r=i=a=null;for(s in n)if(n.hasOwnProperty(s)&&(l=n[s],l!=null))switch(s){case"value":a=l;break;case"defaultValue":i=l;break;case"children":r=l;break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(M(91));break;default:$(t,e,s,l,n,null)}yp(t,a,i,r);return;case"option":for(o in n)if(n.hasOwnProperty(o)&&(a=n[o],a!=null))switch(o){case"selected":t.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:$(t,e,o,a,n,null)}return;case"dialog":V("beforetoggle",t),V("toggle",t),V("cancel",t),V("close",t);break;case"iframe":case"object":V("load",t);break;case"video":case"audio":for(a=0;a<Mr.length;a++)V(Mr[a],t);break;case"image":V("error",t),V("load",t);break;case"details":V("toggle",t);break;case"embed":case"source":case"link":V("error",t),V("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(a=n[c],a!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(M(137,e));default:$(t,e,c,a,n,null)}return;default:if(Ed(e)){for(d in n)n.hasOwnProperty(d)&&(a=n[d],a!==void 0&&Zc(t,e,d,a,n,void 0));return}}for(l in n)n.hasOwnProperty(l)&&(a=n[l],a!=null&&$(t,e,l,a,n,null))}function lx(t,e,n,a){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var i=null,r=null,s=null,l=null,o=null,c=null,d=null;for(h in n){var u=n[h];if(n.hasOwnProperty(h)&&u!=null)switch(h){case"checked":break;case"value":break;case"defaultValue":o=u;default:a.hasOwnProperty(h)||$(t,e,h,null,a,u)}}for(var f in a){var h=a[f];if(u=n[f],a.hasOwnProperty(f)&&(h!=null||u!=null))switch(f){case"type":r=h;break;case"name":i=h;break;case"checked":c=h;break;case"defaultChecked":d=h;break;case"value":s=h;break;case"defaultValue":l=h;break;case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(M(137,e));break;default:h!==u&&$(t,e,f,h,a,u)}}yc(t,s,l,o,c,d,r,i);return;case"select":h=s=l=f=null;for(r in n)if(o=n[r],n.hasOwnProperty(r)&&o!=null)switch(r){case"value":break;case"multiple":h=o;default:a.hasOwnProperty(r)||$(t,e,r,null,a,o)}for(i in a)if(r=a[i],o=n[i],a.hasOwnProperty(i)&&(r!=null||o!=null))switch(i){case"value":f=r;break;case"defaultValue":l=r;break;case"multiple":s=r;default:r!==o&&$(t,e,i,r,a,o)}e=l,n=s,a=h,f!=null?Ia(t,!!n,f,!1):!!a!=!!n&&(e!=null?Ia(t,!!n,e,!0):Ia(t,!!n,n?[]:"",!1));return;case"textarea":h=f=null;for(l in n)if(i=n[l],n.hasOwnProperty(l)&&i!=null&&!a.hasOwnProperty(l))switch(l){case"value":break;case"children":break;default:$(t,e,l,null,a,i)}for(s in a)if(i=a[s],r=n[s],a.hasOwnProperty(s)&&(i!=null||r!=null))switch(s){case"value":f=i;break;case"defaultValue":h=i;break;case"children":break;case"dangerouslySetInnerHTML":if(i!=null)throw Error(M(91));break;default:i!==r&&$(t,e,s,i,a,r)}bp(t,f,h);return;case"option":for(var m in n)if(f=n[m],n.hasOwnProperty(m)&&f!=null&&!a.hasOwnProperty(m))switch(m){case"selected":t.selected=!1;break;default:$(t,e,m,null,a,f)}for(o in a)if(f=a[o],h=n[o],a.hasOwnProperty(o)&&f!==h&&(f!=null||h!=null))switch(o){case"selected":t.selected=f&&typeof f!="function"&&typeof f!="symbol";break;default:$(t,e,o,f,a,h)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var b in n)f=n[b],n.hasOwnProperty(b)&&f!=null&&!a.hasOwnProperty(b)&&$(t,e,b,null,a,f);for(c in a)if(f=a[c],h=n[c],a.hasOwnProperty(c)&&f!==h&&(f!=null||h!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(M(137,e));break;default:$(t,e,c,f,a,h)}return;default:if(Ed(e)){for(var v in n)f=n[v],n.hasOwnProperty(v)&&f!==void 0&&!a.hasOwnProperty(v)&&Zc(t,e,v,void 0,a,f);for(d in a)f=a[d],h=n[d],!a.hasOwnProperty(d)||f===h||f===void 0&&h===void 0||Zc(t,e,d,f,a,h);return}}for(var p in n)f=n[p],n.hasOwnProperty(p)&&f!=null&&!a.hasOwnProperty(p)&&$(t,e,p,null,a,f);for(u in a)f=a[u],h=n[u],!a.hasOwnProperty(u)||f===h||f==null&&h==null||$(t,e,u,f,a,h)}function Pf(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function ox(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var i=n[a],r=i.transferSize,s=i.initiatorType,l=i.duration;if(r&&l&&Pf(s)){for(s=0,l=i.responseEnd,a+=1;a<n.length;a++){var o=n[a],c=o.startTime;if(c>l)break;var d=o.transferSize,u=o.initiatorType;d&&Pf(u)&&(o=o.responseEnd,s+=d*(o<l?1:(l-c)/(o-c)))}if(--a,e+=8*(r+s)/(i.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Kc=null,Pc=null;function _l(t){return t.nodeType===9?t:t.ownerDocument}function Wf(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Sm(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function Wc(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var qo=null;function cx(){var t=window.event;return t&&t.type==="popstate"?t===qo?!1:(qo=t,!0):(qo=null,!1)}var wm=typeof setTimeout=="function"?setTimeout:void 0,dx=typeof clearTimeout=="function"?clearTimeout:void 0,Jf=typeof Promise=="function"?Promise:void 0,ux=typeof queueMicrotask=="function"?queueMicrotask:typeof Jf<"u"?function(t){return Jf.resolve(null).then(t).catch(fx)}:wm;function fx(t){setTimeout(function(){throw t})}function Wn(t){return t==="head"}function If(t,e){var n=e,a=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"||n==="/&"){if(a===0){t.removeChild(i),gi(e);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")dr(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,dr(n);for(var r=n.firstChild;r;){var s=r.nextSibling,l=r.nodeName;r[qr]||l==="SCRIPT"||l==="STYLE"||l==="LINK"&&r.rel.toLowerCase()==="stylesheet"||n.removeChild(r),r=s}}else n==="body"&&dr(t.ownerDocument.body);n=i}while(n);gi(e)}function $f(t,e){var n=t;t=0;do{var a=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=a}while(n)}function Jc(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Jc(n),Od(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function hx(t,e,n,a){for(;t.nodeType===1;){var i=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!a&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(a){if(!t[qr])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(r=t.getAttribute("rel"),r==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(r!==i.rel||t.getAttribute("href")!==(i.href==null||i.href===""?null:i.href)||t.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin)||t.getAttribute("title")!==(i.title==null?null:i.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(r=t.getAttribute("src"),(r!==(i.src==null?null:i.src)||t.getAttribute("type")!==(i.type==null?null:i.type)||t.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin))&&r&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var r=i.name==null?null:""+i.name;if(i.type==="hidden"&&t.getAttribute("name")===r)return t}else return t;if(t=_e(t.nextSibling),t===null)break}return null}function px(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=_e(t.nextSibling),t===null))return null;return t}function Mm(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=_e(t.nextSibling),t===null))return null;return t}function Ic(t){return t.data==="$?"||t.data==="$~"}function $c(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function gx(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var a=function(){e(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),t._reactRetry=a}}function _e(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var td=null;function th(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return _e(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function eh(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function Am(t,e,n){switch(e=_l(n),t){case"html":if(t=e.documentElement,!t)throw Error(M(452));return t;case"head":if(t=e.head,!t)throw Error(M(453));return t;case"body":if(t=e.body,!t)throw Error(M(454));return t;default:throw Error(M(451))}}function dr(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);Od(t)}var ke=new Map,nh=new Set;function kl(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var gn=P.d;P.d={f:mx,r:bx,D:yx,C:vx,L:xx,m:_x,X:Sx,S:kx,M:wx};function mx(){var t=gn.f(),e=Wl();return t||e}function bx(t){var e=ki(t);e!==null&&e.tag===5&&e.type==="form"?vg(e):gn.r(t)}var Ai=typeof document>"u"?null:document;function Tm(t,e,n){var a=Ai;if(a&&typeof e=="string"&&e){var i=be(e);i='link[rel="'+t+'"][href="'+i+'"]',typeof n=="string"&&(i+='[crossorigin="'+n+'"]'),nh.has(i)||(nh.add(i),t={rel:t,crossOrigin:n,href:e},a.querySelector(i)===null&&(e=a.createElement("link"),Bt(e,"link",t),Dt(e),a.head.appendChild(e)))}}function yx(t){gn.D(t),Tm("dns-prefetch",t,null)}function vx(t,e){gn.C(t,e),Tm("preconnect",t,e)}function xx(t,e,n){gn.L(t,e,n);var a=Ai;if(a&&t&&e){var i='link[rel="preload"][as="'+be(e)+'"]';e==="image"&&n&&n.imageSrcSet?(i+='[imagesrcset="'+be(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(i+='[imagesizes="'+be(n.imageSizes)+'"]')):i+='[href="'+be(t)+'"]';var r=i;switch(e){case"style":r=pi(t);break;case"script":r=Ti(t)}ke.has(r)||(t=ct({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),ke.set(r,t),a.querySelector(i)!==null||e==="style"&&a.querySelector(Pr(r))||e==="script"&&a.querySelector(Wr(r))||(e=a.createElement("link"),Bt(e,"link",t),Dt(e),a.head.appendChild(e)))}}function _x(t,e){gn.m(t,e);var n=Ai;if(n&&t){var a=e&&typeof e.as=="string"?e.as:"script",i='link[rel="modulepreload"][as="'+be(a)+'"][href="'+be(t)+'"]',r=i;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":r=Ti(t)}if(!ke.has(r)&&(t=ct({rel:"modulepreload",href:t},e),ke.set(r,t),n.querySelector(i)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Wr(r)))return}a=n.createElement("link"),Bt(a,"link",t),Dt(a),n.head.appendChild(a)}}}function kx(t,e,n){gn.S(t,e,n);var a=Ai;if(a&&t){var i=Ja(a).hoistableStyles,r=pi(t);e=e||"default";var s=i.get(r);if(!s){var l={loading:0,preload:null};if(s=a.querySelector(Pr(r)))l.loading=5;else{t=ct({rel:"stylesheet",href:t,"data-precedence":e},n),(n=ke.get(r))&&gu(t,n);var o=s=a.createElement("link");Dt(o),Bt(o,"link",t),o._p=new Promise(function(c,d){o.onload=c,o.onerror=d}),o.addEventListener("load",function(){l.loading|=1}),o.addEventListener("error",function(){l.loading|=2}),l.loading|=4,Us(s,e,a)}s={type:"stylesheet",instance:s,count:1,state:l},i.set(r,s)}}}function Sx(t,e){gn.X(t,e);var n=Ai;if(n&&t){var a=Ja(n).hoistableScripts,i=Ti(t),r=a.get(i);r||(r=n.querySelector(Wr(i)),r||(t=ct({src:t,async:!0},e),(e=ke.get(i))&&mu(t,e),r=n.createElement("script"),Dt(r),Bt(r,"link",t),n.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},a.set(i,r))}}function wx(t,e){gn.M(t,e);var n=Ai;if(n&&t){var a=Ja(n).hoistableScripts,i=Ti(t),r=a.get(i);r||(r=n.querySelector(Wr(i)),r||(t=ct({src:t,async:!0,type:"module"},e),(e=ke.get(i))&&mu(t,e),r=n.createElement("script"),Dt(r),Bt(r,"link",t),n.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},a.set(i,r))}}function ah(t,e,n,a){var i=(i=Rn.current)?kl(i):null;if(!i)throw Error(M(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=pi(n.href),n=Ja(i).hoistableStyles,a=n.get(e),a||(a={type:"style",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=pi(n.href);var r=Ja(i).hoistableStyles,s=r.get(t);if(s||(i=i.ownerDocument||i,s={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},r.set(t,s),(r=i.querySelector(Pr(t)))&&!r._p&&(s.instance=r,s.state.loading=5),ke.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},ke.set(t,n),r||Mx(i,t,n,s.state))),e&&a===null)throw Error(M(528,""));return s}if(e&&a!==null)throw Error(M(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Ti(n),n=Ja(i).hoistableScripts,a=n.get(e),a||(a={type:"script",instance:null,count:0,state:null},n.set(e,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(M(444,t))}}function pi(t){return'href="'+be(t)+'"'}function Pr(t){return'link[rel="stylesheet"]['+t+"]"}function Dm(t){return ct({},t,{"data-precedence":t.precedence,precedence:null})}function Mx(t,e,n,a){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?a.loading=1:(e=t.createElement("link"),a.preload=e,e.addEventListener("load",function(){return a.loading|=1}),e.addEventListener("error",function(){return a.loading|=2}),Bt(e,"link",n),Dt(e),t.head.appendChild(e))}function Ti(t){return'[src="'+be(t)+'"]'}function Wr(t){return"script[async]"+t}function ih(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var a=t.querySelector('style[data-href~="'+be(n.href)+'"]');if(a)return e.instance=a,Dt(a),a;var i=ct({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(t.ownerDocument||t).createElement("style"),Dt(a),Bt(a,"style",i),Us(a,n.precedence,t),e.instance=a;case"stylesheet":i=pi(n.href);var r=t.querySelector(Pr(i));if(r)return e.state.loading|=4,e.instance=r,Dt(r),r;a=Dm(n),(i=ke.get(i))&&gu(a,i),r=(t.ownerDocument||t).createElement("link"),Dt(r);var s=r;return s._p=new Promise(function(l,o){s.onload=l,s.onerror=o}),Bt(r,"link",a),e.state.loading|=4,Us(r,n.precedence,t),e.instance=r;case"script":return r=Ti(n.src),(i=t.querySelector(Wr(r)))?(e.instance=i,Dt(i),i):(a=n,(i=ke.get(r))&&(a=ct({},n),mu(a,i)),t=t.ownerDocument||t,i=t.createElement("script"),Dt(i),Bt(i,"link",a),t.head.appendChild(i),e.instance=i);case"void":return null;default:throw Error(M(443,e.type))}else e.type==="stylesheet"&&!(e.state.loading&4)&&(a=e.instance,e.state.loading|=4,Us(a,n.precedence,t));return e.instance}function Us(t,e,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),i=a.length?a[a.length-1]:null,r=i,s=0;s<a.length;s++){var l=a[s];if(l.dataset.precedence===e)r=l;else if(r!==i)break}r?r.parentNode.insertBefore(t,r.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function gu(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function mu(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var Vs=null;function rh(t,e,n){if(Vs===null){var a=new Map,i=Vs=new Map;i.set(n,a)}else i=Vs,a=i.get(n),a||(a=new Map,i.set(n,a));if(a.has(t))return a;for(a.set(t,null),n=n.getElementsByTagName(t),i=0;i<n.length;i++){var r=n[i];if(!(r[qr]||r[zt]||t==="link"&&r.getAttribute("rel")==="stylesheet")&&r.namespaceURI!=="http://www.w3.org/2000/svg"){var s=r.getAttribute(e)||"";s=t+s;var l=a.get(s);l?l.push(r):a.set(s,[r])}}return a}function sh(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function Ax(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Cm(t){return!(t.type==="stylesheet"&&!(t.state.loading&3))}function Tx(t,e,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var i=pi(a.href),r=e.querySelector(Pr(i));if(r){e=r._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Sl.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=r,Dt(r);return}r=e.ownerDocument||e,a=Dm(a),(i=ke.get(i))&&gu(a,i),r=r.createElement("link"),Dt(r);var s=r;s._p=new Promise(function(l,o){s.onload=l,s.onerror=o}),Bt(r,"link",a),n.instance=r}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&!(n.state.loading&3)&&(t.count++,n=Sl.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var Xo=0;function Dx(t,e){return t.stylesheets&&t.count===0&&Ys(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var a=setTimeout(function(){if(t.stylesheets&&Ys(t,t.stylesheets),t.unsuspend){var r=t.unsuspend;t.unsuspend=null,r()}},6e4+e);0<t.imgBytes&&Xo===0&&(Xo=62500*ox());var i=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Ys(t,t.stylesheets),t.unsuspend)){var r=t.unsuspend;t.unsuspend=null,r()}},(t.imgBytes>Xo?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(a),clearTimeout(i)}}:null}function Sl(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Ys(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var wl=null;function Ys(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,wl=new Map,e.forEach(Cx,t),wl=null,Sl.call(t))}function Cx(t,e){if(!(e.state.loading&4)){var n=wl.get(t);if(n)var a=n.get(null);else{n=new Map,wl.set(t,n);for(var i=t.querySelectorAll("link[data-precedence],style[data-precedence]"),r=0;r<i.length;r++){var s=i[r];(s.nodeName==="LINK"||s.getAttribute("media")!=="not all")&&(n.set(s.dataset.precedence,s),a=s)}a&&n.set(null,a)}i=e.instance,s=i.getAttribute("data-precedence"),r=n.get(s)||a,r===a&&n.set(null,i),n.set(s,i),this.count++,a=Sl.bind(this),i.addEventListener("load",a),i.addEventListener("error",a),r?r.parentNode.insertBefore(i,r.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(i,t.firstChild)),e.state.loading|=4}}var Tr={$$typeof:tn,Provider:null,Consumer:null,_currentValue:ua,_currentValue2:ua,_threadCount:0};function Ox(t,e,n,a,i,r,s,l,o){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ho(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ho(0),this.hiddenUpdates=ho(null),this.identifierPrefix=a,this.onUncaughtError=i,this.onCaughtError=r,this.onRecoverableError=s,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.incompleteTransitions=new Map}function Om(t,e,n,a,i,r,s,l,o,c,d,u){return t=new Ox(t,e,n,s,o,c,d,u,l),e=1,r===!0&&(e|=24),r=ie(3,null,null,e),t.current=r,r.stateNode=t,e=Gd(),e.refCount++,t.pooledCache=e,e.refCount++,r.memoizedState={element:a,isDehydrated:n,cache:e},Fd(r),t}function Em(t){return t?(t=Za,t):Za}function zm(t,e,n,a,i,r){i=Em(i),a.context===null?a.context=i:a.pendingContext=i,a=Bn(e),a.payload={element:n},r=r===void 0?null:r,r!==null&&(a.callback=r),n=Nn(t,a,e),n!==null&&(It(n,t,e),nr(n,t,e))}function lh(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function bu(t,e){lh(t,e),(t=t.alternate)&&lh(t,e)}function Rm(t){if(t.tag===13||t.tag===31){var e=Da(t,67108864);e!==null&&It(e,t,67108864),bu(t,67108864)}}function oh(t){if(t.tag===13||t.tag===31){var e=ce();e=Dd(e);var n=Da(t,e);n!==null&&It(n,t,e),bu(t,e)}}var Ml=!0;function Ex(t,e,n,a){var i=L.T;L.T=null;var r=P.p;try{P.p=2,yu(t,e,n,a)}finally{P.p=r,L.T=i}}function zx(t,e,n,a){var i=L.T;L.T=null;var r=P.p;try{P.p=8,yu(t,e,n,a)}finally{P.p=r,L.T=i}}function yu(t,e,n,a){if(Ml){var i=ed(a);if(i===null)Go(t,e,a,Al,n),ch(t,a);else if(Lx(i,t,e,n,a))a.stopPropagation();else if(ch(t,a),e&4&&-1<Rx.indexOf(t)){for(;i!==null;){var r=ki(i);if(r!==null)switch(r.tag){case 3:if(r=r.stateNode,r.current.memoizedState.isDehydrated){var s=ra(r.pendingLanes);if(s!==0){var l=r;for(l.pendingLanes|=2,l.entangledLanes|=2;s;){var o=1<<31-oe(s);l.entanglements[1]|=o,s&=~o}Ue(r),!(K&6)&&(gl=se()+500,Kr(0))}}break;case 31:case 13:l=Da(r,2),l!==null&&It(l,r,2),Wl(),bu(r,2)}if(r=ed(a),r===null&&Go(t,e,a,Al,n),r===i)break;i=r}i!==null&&a.stopPropagation()}else Go(t,e,a,null,n)}}function ed(t){return t=zd(t),vu(t)}var Al=null;function vu(t){if(Al=null,t=Ya(t),t!==null){var e=Ur(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=$0(e),t!==null)return t;t=null}else if(n===31){if(t=tp(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Al=t,null}function Lm(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(yy()){case ip:return 2;case rp:return 8;case el:case vy:return 32;case sp:return 268435456;default:return 32}default:return 32}}var nd=!1,Un=null,Vn=null,Yn=null,Dr=new Map,Cr=new Map,kn=[],Rx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function ch(t,e){switch(t){case"focusin":case"focusout":Un=null;break;case"dragenter":case"dragleave":Vn=null;break;case"mouseover":case"mouseout":Yn=null;break;case"pointerover":case"pointerout":Dr.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Cr.delete(e.pointerId)}}function Li(t,e,n,a,i,r){return t===null||t.nativeEvent!==r?(t={blockedOn:e,domEventName:n,eventSystemFlags:a,nativeEvent:r,targetContainers:[i]},e!==null&&(e=ki(e),e!==null&&Rm(e)),t):(t.eventSystemFlags|=a,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function Lx(t,e,n,a,i){switch(e){case"focusin":return Un=Li(Un,t,e,n,a,i),!0;case"dragenter":return Vn=Li(Vn,t,e,n,a,i),!0;case"mouseover":return Yn=Li(Yn,t,e,n,a,i),!0;case"pointerover":var r=i.pointerId;return Dr.set(r,Li(Dr.get(r)||null,t,e,n,a,i)),!0;case"gotpointercapture":return r=i.pointerId,Cr.set(r,Li(Cr.get(r)||null,t,e,n,a,i)),!0}return!1}function Bm(t){var e=Ya(t.target);if(e!==null){var n=Ur(e);if(n!==null){if(e=n.tag,e===13){if(e=$0(n),e!==null){t.blockedOn=e,Qu(t.priority,function(){oh(n)});return}}else if(e===31){if(e=tp(n),e!==null){t.blockedOn=e,Qu(t.priority,function(){oh(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Gs(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=ed(t.nativeEvent);if(n===null){n=t.nativeEvent;var a=new n.constructor(n.type,n);xc=a,n.target.dispatchEvent(a),xc=null}else return e=ki(n),e!==null&&Rm(e),t.blockedOn=n,!1;e.shift()}return!0}function dh(t,e,n){Gs(t)&&n.delete(e)}function Bx(){nd=!1,Un!==null&&Gs(Un)&&(Un=null),Vn!==null&&Gs(Vn)&&(Vn=null),Yn!==null&&Gs(Yn)&&(Yn=null),Dr.forEach(dh),Cr.forEach(dh)}function fs(t,e){t.blockedOn===e&&(t.blockedOn=null,nd||(nd=!0,At.unstable_scheduleCallback(At.unstable_NormalPriority,Bx)))}var hs=null;function uh(t){hs!==t&&(hs=t,At.unstable_scheduleCallback(At.unstable_NormalPriority,function(){hs===t&&(hs=null);for(var e=0;e<t.length;e+=3){var n=t[e],a=t[e+1],i=t[e+2];if(typeof a!="function"){if(vu(a||n)===null)continue;break}var r=ki(n);r!==null&&(t.splice(e,3),e-=3,Nc(r,{pending:!0,data:i,method:n.method,action:a},a,i))}}))}function gi(t){function e(o){return fs(o,t)}Un!==null&&fs(Un,t),Vn!==null&&fs(Vn,t),Yn!==null&&fs(Yn,t),Dr.forEach(e),Cr.forEach(e);for(var n=0;n<kn.length;n++){var a=kn[n];a.blockedOn===t&&(a.blockedOn=null)}for(;0<kn.length&&(n=kn[0],n.blockedOn===null);)Bm(n),n.blockedOn===null&&kn.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var i=n[a],r=n[a+1],s=i[$t]||null;if(typeof r=="function")s||uh(n);else if(s){var l=null;if(r&&r.hasAttribute("formAction")){if(i=r,s=r[$t]||null)l=s.formAction;else if(vu(i)!==null)continue}else l=s.action;typeof l=="function"?n[a+1]=l:(n.splice(a,3),a-=3),uh(n)}}}function Nm(){function t(r){r.canIntercept&&r.info==="react-transition"&&r.intercept({handler:function(){return new Promise(function(s){return i=s})},focusReset:"manual",scroll:"manual"})}function e(){i!==null&&(i(),i=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var r=navigation.currentEntry;r&&r.url!=null&&navigation.navigate(r.url,{state:r.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,i=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),i!==null&&(i(),i=null)}}}function xu(t){this._internalRoot=t}$l.prototype.render=xu.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(M(409));var n=e.current,a=ce();zm(n,a,t,e,null,null)};$l.prototype.unmount=xu.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;zm(t.current,2,null,t,null,null),Wl(),e[_i]=null}};function $l(t){this._internalRoot=t}$l.prototype.unstable_scheduleHydration=function(t){if(t){var e=up();t={blockedOn:null,target:t,priority:e};for(var n=0;n<kn.length&&e!==0&&e<kn[n].priority;n++);kn.splice(n,0,t),n===0&&Bm(t)}};var fh=J0.version;if(fh!=="19.2.5")throw Error(M(527,fh,"19.2.5"));P.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(M(188)):(t=Object.keys(t).join(","),Error(M(268,t)));return t=uy(e),t=t!==null?ep(t):null,t=t===null?null:t.stateNode,t};var Nx={bundleType:0,version:"19.2.5",rendererPackageName:"react-dom",currentDispatcherRef:L,reconcilerVersion:"19.2.5"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ps=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ps.isDisabled&&ps.supportsFiber)try{Vr=ps.inject(Nx),le=ps}catch{}}Nl.createRoot=function(t,e){if(!I0(t))throw Error(M(299));var n=!1,a="",i=Tg,r=Dg,s=Cg;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(a=e.identifierPrefix),e.onUncaughtError!==void 0&&(i=e.onUncaughtError),e.onCaughtError!==void 0&&(r=e.onCaughtError),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=Om(t,1,!1,null,null,n,a,null,i,r,s,Nm),t[_i]=e.current,pu(t),new xu(e)};Nl.hydrateRoot=function(t,e,n){if(!I0(t))throw Error(M(299));var a=!1,i="",r=Tg,s=Dg,l=Cg,o=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onUncaughtError!==void 0&&(r=n.onUncaughtError),n.onCaughtError!==void 0&&(s=n.onCaughtError),n.onRecoverableError!==void 0&&(l=n.onRecoverableError),n.formState!==void 0&&(o=n.formState)),e=Om(t,1,!0,e,n??null,a,i,o,r,s,l,Nm),e.context=Em(null),n=e.current,a=ce(),a=Dd(a),i=Bn(a),i.callback=null,Nn(n,i,a),n=a,e.current.lanes=n,Gr(e,n),Ue(e),t[_i]=e.current,pu(t),new $l(e)};Nl.version="19.2.5";function jm(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(jm)}catch(t){console.error(t)}}jm(),X0.exports=Nl;var Hm=X0.exports;/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function Jr(t){return t+.5|0}const Dn=(t,e,n)=>Math.max(Math.min(t,n),e);function Fi(t){return Dn(Jr(t*2.55),0,255)}function Gn(t){return Dn(Jr(t*255),0,255)}function Je(t){return Dn(Jr(t/2.55)/100,0,1)}function hh(t){return Dn(Jr(t*100),0,100)}const fe={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},ad=[..."0123456789ABCDEF"],jx=t=>ad[t&15],Hx=t=>ad[(t&240)>>4]+ad[t&15],gs=t=>(t&240)>>4===(t&15),Ux=t=>gs(t.r)&&gs(t.g)&&gs(t.b)&&gs(t.a);function Vx(t){var e=t.length,n;return t[0]==="#"&&(e===4||e===5?n={r:255&fe[t[1]]*17,g:255&fe[t[2]]*17,b:255&fe[t[3]]*17,a:e===5?fe[t[4]]*17:255}:(e===7||e===9)&&(n={r:fe[t[1]]<<4|fe[t[2]],g:fe[t[3]]<<4|fe[t[4]],b:fe[t[5]]<<4|fe[t[6]],a:e===9?fe[t[7]]<<4|fe[t[8]]:255})),n}const Yx=(t,e)=>t<255?e(t):"";function Gx(t){var e=Ux(t)?jx:Hx;return t?"#"+e(t.r)+e(t.g)+e(t.b)+Yx(t.a,e):void 0}const qx=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Um(t,e,n){const a=e*Math.min(n,1-n),i=(r,s=(r+t/30)%12)=>n-a*Math.max(Math.min(s-3,9-s,1),-1);return[i(0),i(8),i(4)]}function Xx(t,e,n){const a=(i,r=(i+t/60)%6)=>n-n*e*Math.max(Math.min(r,4-r,1),0);return[a(5),a(3),a(1)]}function Fx(t,e,n){const a=Um(t,1,.5);let i;for(e+n>1&&(i=1/(e+n),e*=i,n*=i),i=0;i<3;i++)a[i]*=1-e-n,a[i]+=e;return a}function Qx(t,e,n,a,i){return t===i?(e-n)/a+(e<n?6:0):e===i?(n-t)/a+2:(t-e)/a+4}function _u(t){const n=t.r/255,a=t.g/255,i=t.b/255,r=Math.max(n,a,i),s=Math.min(n,a,i),l=(r+s)/2;let o,c,d;return r!==s&&(d=r-s,c=l>.5?d/(2-r-s):d/(r+s),o=Qx(n,a,i,d,r),o=o*60+.5),[o|0,c||0,l]}function ku(t,e,n,a){return(Array.isArray(e)?t(e[0],e[1],e[2]):t(e,n,a)).map(Gn)}function Su(t,e,n){return ku(Um,t,e,n)}function Zx(t,e,n){return ku(Fx,t,e,n)}function Kx(t,e,n){return ku(Xx,t,e,n)}function Vm(t){return(t%360+360)%360}function Px(t){const e=qx.exec(t);let n=255,a;if(!e)return;e[5]!==a&&(n=e[6]?Fi(+e[5]):Gn(+e[5]));const i=Vm(+e[2]),r=+e[3]/100,s=+e[4]/100;return e[1]==="hwb"?a=Zx(i,r,s):e[1]==="hsv"?a=Kx(i,r,s):a=Su(i,r,s),{r:a[0],g:a[1],b:a[2],a:n}}function Wx(t,e){var n=_u(t);n[0]=Vm(n[0]+e),n=Su(n),t.r=n[0],t.g=n[1],t.b=n[2]}function Jx(t){if(!t)return;const e=_u(t),n=e[0],a=hh(e[1]),i=hh(e[2]);return t.a<255?`hsla(${n}, ${a}%, ${i}%, ${Je(t.a)})`:`hsl(${n}, ${a}%, ${i}%)`}const ph={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},gh={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function Ix(){const t={},e=Object.keys(gh),n=Object.keys(ph);let a,i,r,s,l;for(a=0;a<e.length;a++){for(s=l=e[a],i=0;i<n.length;i++)r=n[i],l=l.replace(r,ph[r]);r=parseInt(gh[s],16),t[l]=[r>>16&255,r>>8&255,r&255]}return t}let ms;function $x(t){ms||(ms=Ix(),ms.transparent=[0,0,0,0]);const e=ms[t.toLowerCase()];return e&&{r:e[0],g:e[1],b:e[2],a:e.length===4?e[3]:255}}const t_=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function e_(t){const e=t_.exec(t);let n=255,a,i,r;if(e){if(e[7]!==a){const s=+e[7];n=e[8]?Fi(s):Dn(s*255,0,255)}return a=+e[1],i=+e[3],r=+e[5],a=255&(e[2]?Fi(a):Dn(a,0,255)),i=255&(e[4]?Fi(i):Dn(i,0,255)),r=255&(e[6]?Fi(r):Dn(r,0,255)),{r:a,g:i,b:r,a:n}}}function n_(t){return t&&(t.a<255?`rgba(${t.r}, ${t.g}, ${t.b}, ${Je(t.a)})`:`rgb(${t.r}, ${t.g}, ${t.b})`)}const Fo=t=>t<=.0031308?t*12.92:Math.pow(t,1/2.4)*1.055-.055,Ra=t=>t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4);function a_(t,e,n){const a=Ra(Je(t.r)),i=Ra(Je(t.g)),r=Ra(Je(t.b));return{r:Gn(Fo(a+n*(Ra(Je(e.r))-a))),g:Gn(Fo(i+n*(Ra(Je(e.g))-i))),b:Gn(Fo(r+n*(Ra(Je(e.b))-r))),a:t.a+n*(e.a-t.a)}}function bs(t,e,n){if(t){let a=_u(t);a[e]=Math.max(0,Math.min(a[e]+a[e]*n,e===0?360:1)),a=Su(a),t.r=a[0],t.g=a[1],t.b=a[2]}}function Ym(t,e){return t&&Object.assign(e||{},t)}function mh(t){var e={r:0,g:0,b:0,a:255};return Array.isArray(t)?t.length>=3&&(e={r:t[0],g:t[1],b:t[2],a:255},t.length>3&&(e.a=Gn(t[3]))):(e=Ym(t,{r:0,g:0,b:0,a:1}),e.a=Gn(e.a)),e}function i_(t){return t.charAt(0)==="r"?e_(t):Px(t)}class Or{constructor(e){if(e instanceof Or)return e;const n=typeof e;let a;n==="object"?a=mh(e):n==="string"&&(a=Vx(e)||$x(e)||i_(e)),this._rgb=a,this._valid=!!a}get valid(){return this._valid}get rgb(){var e=Ym(this._rgb);return e&&(e.a=Je(e.a)),e}set rgb(e){this._rgb=mh(e)}rgbString(){return this._valid?n_(this._rgb):void 0}hexString(){return this._valid?Gx(this._rgb):void 0}hslString(){return this._valid?Jx(this._rgb):void 0}mix(e,n){if(e){const a=this.rgb,i=e.rgb;let r;const s=n===r?.5:n,l=2*s-1,o=a.a-i.a,c=((l*o===-1?l:(l+o)/(1+l*o))+1)/2;r=1-c,a.r=255&c*a.r+r*i.r+.5,a.g=255&c*a.g+r*i.g+.5,a.b=255&c*a.b+r*i.b+.5,a.a=s*a.a+(1-s)*i.a,this.rgb=a}return this}interpolate(e,n){return e&&(this._rgb=a_(this._rgb,e._rgb,n)),this}clone(){return new Or(this.rgb)}alpha(e){return this._rgb.a=Gn(e),this}clearer(e){const n=this._rgb;return n.a*=1-e,this}greyscale(){const e=this._rgb,n=Jr(e.r*.3+e.g*.59+e.b*.11);return e.r=e.g=e.b=n,this}opaquer(e){const n=this._rgb;return n.a*=1+e,this}negate(){const e=this._rgb;return e.r=255-e.r,e.g=255-e.g,e.b=255-e.b,this}lighten(e){return bs(this._rgb,2,e),this}darken(e){return bs(this._rgb,2,-e),this}saturate(e){return bs(this._rgb,1,e),this}desaturate(e){return bs(this._rgb,1,-e),this}rotate(e){return Wx(this._rgb,e),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function Qe(){}const r_=(()=>{let t=0;return()=>t++})();function G(t){return t==null}function ut(t){if(Array.isArray&&Array.isArray(t))return!0;const e=Object.prototype.toString.call(t);return e.slice(0,7)==="[object"&&e.slice(-6)==="Array]"}function X(t){return t!==null&&Object.prototype.toString.call(t)==="[object Object]"}function gt(t){return(typeof t=="number"||t instanceof Number)&&isFinite(+t)}function ee(t,e){return gt(t)?t:e}function B(t,e){return typeof t>"u"?e:t}const s_=(t,e)=>typeof t=="string"&&t.endsWith("%")?parseFloat(t)/100:+t/e,Gm=(t,e)=>typeof t=="string"&&t.endsWith("%")?parseFloat(t)/100*e:+t;function nt(t,e,n){if(t&&typeof t.call=="function")return t.apply(n,e)}function J(t,e,n,a){let i,r,s;if(ut(t))for(r=t.length,i=0;i<r;i++)e.call(n,t[i],i);else if(X(t))for(s=Object.keys(t),r=s.length,i=0;i<r;i++)e.call(n,t[s[i]],s[i])}function Tl(t,e){let n,a,i,r;if(!t||!e||t.length!==e.length)return!1;for(n=0,a=t.length;n<a;++n)if(i=t[n],r=e[n],i.datasetIndex!==r.datasetIndex||i.index!==r.index)return!1;return!0}function Dl(t){if(ut(t))return t.map(Dl);if(X(t)){const e=Object.create(null),n=Object.keys(t),a=n.length;let i=0;for(;i<a;++i)e[n[i]]=Dl(t[n[i]]);return e}return t}function qm(t){return["__proto__","prototype","constructor"].indexOf(t)===-1}function l_(t,e,n,a){if(!qm(t))return;const i=e[t],r=n[t];X(i)&&X(r)?Er(i,r,a):e[t]=Dl(r)}function Er(t,e,n){const a=ut(e)?e:[e],i=a.length;if(!X(t))return t;n=n||{};const r=n.merger||l_;let s;for(let l=0;l<i;++l){if(s=a[l],!X(s))continue;const o=Object.keys(s);for(let c=0,d=o.length;c<d;++c)r(o[c],t,s,n)}return t}function ur(t,e){return Er(t,e,{merger:o_})}function o_(t,e,n){if(!qm(t))return;const a=e[t],i=n[t];X(a)&&X(i)?ur(a,i):Object.prototype.hasOwnProperty.call(e,t)||(e[t]=Dl(i))}const bh={"":t=>t,x:t=>t.x,y:t=>t.y};function c_(t){const e=t.split("."),n=[];let a="";for(const i of e)a+=i,a.endsWith("\\")?a=a.slice(0,-1)+".":(n.push(a),a="");return n}function d_(t){const e=c_(t);return n=>{for(const a of e){if(a==="")break;n=n&&n[a]}return n}}function Zn(t,e){return(bh[e]||(bh[e]=d_(e)))(t)}function wu(t){return t.charAt(0).toUpperCase()+t.slice(1)}const zr=t=>typeof t<"u",Kn=t=>typeof t=="function",yh=(t,e)=>{if(t.size!==e.size)return!1;for(const n of t)if(!e.has(n))return!1;return!0};function u_(t){return t.type==="mouseup"||t.type==="click"||t.type==="contextmenu"}const Z=Math.PI,ot=2*Z,f_=ot+Z,Cl=Number.POSITIVE_INFINITY,h_=Z/180,bt=Z/2,ta=Z/4,vh=Z*2/3,Cn=Math.log10,je=Math.sign;function fr(t,e,n){return Math.abs(t-e)<n}function xh(t){const e=Math.round(t);t=fr(t,e,t/1e3)?e:t;const n=Math.pow(10,Math.floor(Cn(t))),a=t/n;return(a<=1?1:a<=2?2:a<=5?5:10)*n}function p_(t){const e=[],n=Math.sqrt(t);let a;for(a=1;a<n;a++)t%a===0&&(e.push(a),e.push(t/a));return n===(n|0)&&e.push(n),e.sort((i,r)=>i-r).pop(),e}function g_(t){return typeof t=="symbol"||typeof t=="object"&&t!==null&&!(Symbol.toPrimitive in t||"toString"in t||"valueOf"in t)}function mi(t){return!g_(t)&&!isNaN(parseFloat(t))&&isFinite(t)}function m_(t,e){const n=Math.round(t);return n-e<=t&&n+e>=t}function Xm(t,e,n){let a,i,r;for(a=0,i=t.length;a<i;a++)r=t[a][n],isNaN(r)||(e.min=Math.min(e.min,r),e.max=Math.max(e.max,r))}function Ae(t){return t*(Z/180)}function Mu(t){return t*(180/Z)}function _h(t){if(!gt(t))return;let e=1,n=0;for(;Math.round(t*e)/e!==t;)e*=10,n++;return n}function Fm(t,e){const n=e.x-t.x,a=e.y-t.y,i=Math.sqrt(n*n+a*a);let r=Math.atan2(a,n);return r<-.5*Z&&(r+=ot),{angle:r,distance:i}}function id(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function b_(t,e){return(t-e+f_)%ot-Z}function Ht(t){return(t%ot+ot)%ot}function Rr(t,e,n,a){const i=Ht(t),r=Ht(e),s=Ht(n),l=Ht(r-i),o=Ht(s-i),c=Ht(i-r),d=Ht(i-s);return i===r||i===s||a&&r===s||l>o&&c<d}function Ct(t,e,n){return Math.max(e,Math.min(n,t))}function y_(t){return Ct(t,-32768,32767)}function an(t,e,n,a=1e-6){return t>=Math.min(e,n)-a&&t<=Math.max(e,n)+a}function Au(t,e,n){n=n||(s=>t[s]<e);let a=t.length-1,i=0,r;for(;a-i>1;)r=i+a>>1,n(r)?i=r:a=r;return{lo:i,hi:a}}const rn=(t,e,n,a)=>Au(t,n,a?i=>{const r=t[i][e];return r<n||r===n&&t[i+1][e]===n}:i=>t[i][e]<n),v_=(t,e,n)=>Au(t,n,a=>t[a][e]>=n);function x_(t,e,n){let a=0,i=t.length;for(;a<i&&t[a]<e;)a++;for(;i>a&&t[i-1]>n;)i--;return a>0||i<t.length?t.slice(a,i):t}const Qm=["push","pop","shift","splice","unshift"];function __(t,e){if(t._chartjs){t._chartjs.listeners.push(e);return}Object.defineProperty(t,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[e]}}),Qm.forEach(n=>{const a="_onData"+wu(n),i=t[n];Object.defineProperty(t,n,{configurable:!0,enumerable:!1,value(...r){const s=i.apply(this,r);return t._chartjs.listeners.forEach(l=>{typeof l[a]=="function"&&l[a](...r)}),s}})})}function kh(t,e){const n=t._chartjs;if(!n)return;const a=n.listeners,i=a.indexOf(e);i!==-1&&a.splice(i,1),!(a.length>0)&&(Qm.forEach(r=>{delete t[r]}),delete t._chartjs)}function Zm(t){const e=new Set(t);return e.size===t.length?t:Array.from(e)}const Km=function(){return typeof window>"u"?function(t){return t()}:window.requestAnimationFrame}();function Pm(t,e){let n=[],a=!1;return function(...i){n=i,a||(a=!0,Km.call(window,()=>{a=!1,t.apply(e,n)}))}}function k_(t,e){let n;return function(...a){return e?(clearTimeout(n),n=setTimeout(t,e,a)):t.apply(this,a),e}}const Tu=t=>t==="start"?"left":t==="end"?"right":"center",Nt=(t,e,n)=>t==="start"?e:t==="end"?n:(e+n)/2,S_=(t,e,n,a)=>t===(a?"left":"right")?n:t==="center"?(e+n)/2:e;function Wm(t,e,n){const a=e.length;let i=0,r=a;if(t._sorted){const{iScale:s,vScale:l,_parsed:o}=t,c=t.dataset&&t.dataset.options?t.dataset.options.spanGaps:null,d=s.axis,{min:u,max:f,minDefined:h,maxDefined:m}=s.getUserBounds();if(h){if(i=Math.min(rn(o,d,u).lo,n?a:rn(e,d,s.getPixelForValue(u)).lo),c){const b=o.slice(0,i+1).reverse().findIndex(v=>!G(v[l.axis]));i-=Math.max(0,b)}i=Ct(i,0,a-1)}if(m){let b=Math.max(rn(o,s.axis,f,!0).hi+1,n?0:rn(e,d,s.getPixelForValue(f),!0).hi+1);if(c){const v=o.slice(b-1).findIndex(p=>!G(p[l.axis]));b+=Math.max(0,v)}r=Ct(b,i,a)-i}else r=a-i}return{start:i,count:r}}function Jm(t){const{xScale:e,yScale:n,_scaleRanges:a}=t,i={xmin:e.min,xmax:e.max,ymin:n.min,ymax:n.max};if(!a)return t._scaleRanges=i,!0;const r=a.xmin!==e.min||a.xmax!==e.max||a.ymin!==n.min||a.ymax!==n.max;return Object.assign(a,i),r}const ys=t=>t===0||t===1,Sh=(t,e,n)=>-(Math.pow(2,10*(t-=1))*Math.sin((t-e)*ot/n)),wh=(t,e,n)=>Math.pow(2,-10*t)*Math.sin((t-e)*ot/n)+1,hr={linear:t=>t,easeInQuad:t=>t*t,easeOutQuad:t=>-t*(t-2),easeInOutQuad:t=>(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1),easeInCubic:t=>t*t*t,easeOutCubic:t=>(t-=1)*t*t+1,easeInOutCubic:t=>(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2),easeInQuart:t=>t*t*t*t,easeOutQuart:t=>-((t-=1)*t*t*t-1),easeInOutQuart:t=>(t/=.5)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2),easeInQuint:t=>t*t*t*t*t,easeOutQuint:t=>(t-=1)*t*t*t*t+1,easeInOutQuint:t=>(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2),easeInSine:t=>-Math.cos(t*bt)+1,easeOutSine:t=>Math.sin(t*bt),easeInOutSine:t=>-.5*(Math.cos(Z*t)-1),easeInExpo:t=>t===0?0:Math.pow(2,10*(t-1)),easeOutExpo:t=>t===1?1:-Math.pow(2,-10*t)+1,easeInOutExpo:t=>ys(t)?t:t<.5?.5*Math.pow(2,10*(t*2-1)):.5*(-Math.pow(2,-10*(t*2-1))+2),easeInCirc:t=>t>=1?t:-(Math.sqrt(1-t*t)-1),easeOutCirc:t=>Math.sqrt(1-(t-=1)*t),easeInOutCirc:t=>(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1),easeInElastic:t=>ys(t)?t:Sh(t,.075,.3),easeOutElastic:t=>ys(t)?t:wh(t,.075,.3),easeInOutElastic(t){return ys(t)?t:t<.5?.5*Sh(t*2,.1125,.45):.5+.5*wh(t*2-1,.1125,.45)},easeInBack(t){return t*t*((1.70158+1)*t-1.70158)},easeOutBack(t){return(t-=1)*t*((1.70158+1)*t+1.70158)+1},easeInOutBack(t){let e=1.70158;return(t/=.5)<1?.5*(t*t*(((e*=1.525)+1)*t-e)):.5*((t-=2)*t*(((e*=1.525)+1)*t+e)+2)},easeInBounce:t=>1-hr.easeOutBounce(1-t),easeOutBounce(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},easeInOutBounce:t=>t<.5?hr.easeInBounce(t*2)*.5:hr.easeOutBounce(t*2-1)*.5+.5};function Du(t){if(t&&typeof t=="object"){const e=t.toString();return e==="[object CanvasPattern]"||e==="[object CanvasGradient]"}return!1}function Mh(t){return Du(t)?t:new Or(t)}function Qo(t){return Du(t)?t:new Or(t).saturate(.5).darken(.1).hexString()}const w_=["x","y","borderWidth","radius","tension"],M_=["color","borderColor","backgroundColor"];function A_(t){t.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),t.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:e=>e!=="onProgress"&&e!=="onComplete"&&e!=="fn"}),t.set("animations",{colors:{type:"color",properties:M_},numbers:{type:"number",properties:w_}}),t.describe("animations",{_fallback:"animation"}),t.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:e=>e|0}}}})}function T_(t){t.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const Ah=new Map;function D_(t,e){e=e||{};const n=t+JSON.stringify(e);let a=Ah.get(n);return a||(a=new Intl.NumberFormat(t,e),Ah.set(n,a)),a}function Ir(t,e,n){return D_(e,n).format(t)}const Im={values(t){return ut(t)?t:""+t},numeric(t,e,n){if(t===0)return"0";const a=this.chart.options.locale;let i,r=t;if(n.length>1){const c=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(c<1e-4||c>1e15)&&(i="scientific"),r=C_(t,n)}const s=Cn(Math.abs(r)),l=isNaN(s)?1:Math.max(Math.min(-1*Math.floor(s),20),0),o={notation:i,minimumFractionDigits:l,maximumFractionDigits:l};return Object.assign(o,this.options.ticks.format),Ir(t,a,o)},logarithmic(t,e,n){if(t===0)return"0";const a=n[e].significand||t/Math.pow(10,Math.floor(Cn(t)));return[1,2,3,5,10,15].includes(a)||e>.8*n.length?Im.numeric.call(this,t,e,n):""}};function C_(t,e){let n=e.length>3?e[2].value-e[1].value:e[1].value-e[0].value;return Math.abs(n)>=1&&t!==Math.floor(t)&&(n=t-Math.floor(t)),n}var to={formatters:Im};function O_(t){t.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(e,n)=>n.lineWidth,tickColor:(e,n)=>n.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:to.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),t.route("scale.ticks","color","","color"),t.route("scale.grid","color","","borderColor"),t.route("scale.border","color","","borderColor"),t.route("scale.title","color","","color"),t.describe("scale",{_fallback:!1,_scriptable:e=>!e.startsWith("before")&&!e.startsWith("after")&&e!=="callback"&&e!=="parser",_indexable:e=>e!=="borderDash"&&e!=="tickBorderDash"&&e!=="dash"}),t.describe("scales",{_fallback:"scale"}),t.describe("scale.ticks",{_scriptable:e=>e!=="backdropPadding"&&e!=="callback",_indexable:e=>e!=="backdropPadding"})}const Sa=Object.create(null),rd=Object.create(null);function pr(t,e){if(!e)return t;const n=e.split(".");for(let a=0,i=n.length;a<i;++a){const r=n[a];t=t[r]||(t[r]=Object.create(null))}return t}function Zo(t,e,n){return typeof e=="string"?Er(pr(t,e),n):Er(pr(t,""),e)}class E_{constructor(e,n){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=a=>a.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(a,i)=>Qo(i.backgroundColor),this.hoverBorderColor=(a,i)=>Qo(i.borderColor),this.hoverColor=(a,i)=>Qo(i.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(e),this.apply(n)}set(e,n){return Zo(this,e,n)}get(e){return pr(this,e)}describe(e,n){return Zo(rd,e,n)}override(e,n){return Zo(Sa,e,n)}route(e,n,a,i){const r=pr(this,e),s=pr(this,a),l="_"+n;Object.defineProperties(r,{[l]:{value:r[n],writable:!0},[n]:{enumerable:!0,get(){const o=this[l],c=s[i];return X(o)?Object.assign({},c,o):B(o,c)},set(o){this[l]=o}}})}apply(e){e.forEach(n=>n(this))}}var ft=new E_({_scriptable:t=>!t.startsWith("on"),_indexable:t=>t!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[A_,T_,O_]);function z_(t){return!t||G(t.size)||G(t.family)?null:(t.style?t.style+" ":"")+(t.weight?t.weight+" ":"")+t.size+"px "+t.family}function Ol(t,e,n,a,i){let r=e[i];return r||(r=e[i]=t.measureText(i).width,n.push(i)),r>a&&(a=r),a}function R_(t,e,n,a){a=a||{};let i=a.data=a.data||{},r=a.garbageCollect=a.garbageCollect||[];a.font!==e&&(i=a.data={},r=a.garbageCollect=[],a.font=e),t.save(),t.font=e;let s=0;const l=n.length;let o,c,d,u,f;for(o=0;o<l;o++)if(u=n[o],u!=null&&!ut(u))s=Ol(t,i,r,s,u);else if(ut(u))for(c=0,d=u.length;c<d;c++)f=u[c],f!=null&&!ut(f)&&(s=Ol(t,i,r,s,f));t.restore();const h=r.length/2;if(h>n.length){for(o=0;o<h;o++)delete i[r[o]];r.splice(0,h)}return s}function ea(t,e,n){const a=t.currentDevicePixelRatio,i=n!==0?Math.max(n/2,.5):0;return Math.round((e-i)*a)/a+i}function Th(t,e){!e&&!t||(e=e||t.getContext("2d"),e.save(),e.resetTransform(),e.clearRect(0,0,t.width,t.height),e.restore())}function sd(t,e,n,a){$m(t,e,n,a,null)}function $m(t,e,n,a,i){let r,s,l,o,c,d,u,f;const h=e.pointStyle,m=e.rotation,b=e.radius;let v=(m||0)*h_;if(h&&typeof h=="object"&&(r=h.toString(),r==="[object HTMLImageElement]"||r==="[object HTMLCanvasElement]")){t.save(),t.translate(n,a),t.rotate(v),t.drawImage(h,-h.width/2,-h.height/2,h.width,h.height),t.restore();return}if(!(isNaN(b)||b<=0)){switch(t.beginPath(),h){default:i?t.ellipse(n,a,i/2,b,0,0,ot):t.arc(n,a,b,0,ot),t.closePath();break;case"triangle":d=i?i/2:b,t.moveTo(n+Math.sin(v)*d,a-Math.cos(v)*b),v+=vh,t.lineTo(n+Math.sin(v)*d,a-Math.cos(v)*b),v+=vh,t.lineTo(n+Math.sin(v)*d,a-Math.cos(v)*b),t.closePath();break;case"rectRounded":c=b*.516,o=b-c,s=Math.cos(v+ta)*o,u=Math.cos(v+ta)*(i?i/2-c:o),l=Math.sin(v+ta)*o,f=Math.sin(v+ta)*(i?i/2-c:o),t.arc(n-u,a-l,c,v-Z,v-bt),t.arc(n+f,a-s,c,v-bt,v),t.arc(n+u,a+l,c,v,v+bt),t.arc(n-f,a+s,c,v+bt,v+Z),t.closePath();break;case"rect":if(!m){o=Math.SQRT1_2*b,d=i?i/2:o,t.rect(n-d,a-o,2*d,2*o);break}v+=ta;case"rectRot":u=Math.cos(v)*(i?i/2:b),s=Math.cos(v)*b,l=Math.sin(v)*b,f=Math.sin(v)*(i?i/2:b),t.moveTo(n-u,a-l),t.lineTo(n+f,a-s),t.lineTo(n+u,a+l),t.lineTo(n-f,a+s),t.closePath();break;case"crossRot":v+=ta;case"cross":u=Math.cos(v)*(i?i/2:b),s=Math.cos(v)*b,l=Math.sin(v)*b,f=Math.sin(v)*(i?i/2:b),t.moveTo(n-u,a-l),t.lineTo(n+u,a+l),t.moveTo(n+f,a-s),t.lineTo(n-f,a+s);break;case"star":u=Math.cos(v)*(i?i/2:b),s=Math.cos(v)*b,l=Math.sin(v)*b,f=Math.sin(v)*(i?i/2:b),t.moveTo(n-u,a-l),t.lineTo(n+u,a+l),t.moveTo(n+f,a-s),t.lineTo(n-f,a+s),v+=ta,u=Math.cos(v)*(i?i/2:b),s=Math.cos(v)*b,l=Math.sin(v)*b,f=Math.sin(v)*(i?i/2:b),t.moveTo(n-u,a-l),t.lineTo(n+u,a+l),t.moveTo(n+f,a-s),t.lineTo(n-f,a+s);break;case"line":s=i?i/2:Math.cos(v)*b,l=Math.sin(v)*b,t.moveTo(n-s,a-l),t.lineTo(n+s,a+l);break;case"dash":t.moveTo(n,a),t.lineTo(n+Math.cos(v)*(i?i/2:b),a+Math.sin(v)*b);break;case!1:t.closePath();break}t.fill(),e.borderWidth>0&&t.stroke()}}function sn(t,e,n){return n=n||.5,!e||t&&t.x>e.left-n&&t.x<e.right+n&&t.y>e.top-n&&t.y<e.bottom+n}function eo(t,e){t.save(),t.beginPath(),t.rect(e.left,e.top,e.right-e.left,e.bottom-e.top),t.clip()}function no(t){t.restore()}function L_(t,e,n,a,i){if(!e)return t.lineTo(n.x,n.y);if(i==="middle"){const r=(e.x+n.x)/2;t.lineTo(r,e.y),t.lineTo(r,n.y)}else i==="after"!=!!a?t.lineTo(e.x,n.y):t.lineTo(n.x,e.y);t.lineTo(n.x,n.y)}function B_(t,e,n,a){if(!e)return t.lineTo(n.x,n.y);t.bezierCurveTo(a?e.cp1x:e.cp2x,a?e.cp1y:e.cp2y,a?n.cp2x:n.cp1x,a?n.cp2y:n.cp1y,n.x,n.y)}function N_(t,e){e.translation&&t.translate(e.translation[0],e.translation[1]),G(e.rotation)||t.rotate(e.rotation),e.color&&(t.fillStyle=e.color),e.textAlign&&(t.textAlign=e.textAlign),e.textBaseline&&(t.textBaseline=e.textBaseline)}function j_(t,e,n,a,i){if(i.strikethrough||i.underline){const r=t.measureText(a),s=e-r.actualBoundingBoxLeft,l=e+r.actualBoundingBoxRight,o=n-r.actualBoundingBoxAscent,c=n+r.actualBoundingBoxDescent,d=i.strikethrough?(o+c)/2:c;t.strokeStyle=t.fillStyle,t.beginPath(),t.lineWidth=i.decorationWidth||2,t.moveTo(s,d),t.lineTo(l,d),t.stroke()}}function H_(t,e){const n=t.fillStyle;t.fillStyle=e.color,t.fillRect(e.left,e.top,e.width,e.height),t.fillStyle=n}function wa(t,e,n,a,i,r={}){const s=ut(e)?e:[e],l=r.strokeWidth>0&&r.strokeColor!=="";let o,c;for(t.save(),t.font=i.string,N_(t,r),o=0;o<s.length;++o)c=s[o],r.backdrop&&H_(t,r.backdrop),l&&(r.strokeColor&&(t.strokeStyle=r.strokeColor),G(r.strokeWidth)||(t.lineWidth=r.strokeWidth),t.strokeText(c,n,a,r.maxWidth)),t.fillText(c,n,a,r.maxWidth),j_(t,n,a,c,r),a+=Number(i.lineHeight);t.restore()}function Lr(t,e){const{x:n,y:a,w:i,h:r,radius:s}=e;t.arc(n+s.topLeft,a+s.topLeft,s.topLeft,1.5*Z,Z,!0),t.lineTo(n,a+r-s.bottomLeft),t.arc(n+s.bottomLeft,a+r-s.bottomLeft,s.bottomLeft,Z,bt,!0),t.lineTo(n+i-s.bottomRight,a+r),t.arc(n+i-s.bottomRight,a+r-s.bottomRight,s.bottomRight,bt,0,!0),t.lineTo(n+i,a+s.topRight),t.arc(n+i-s.topRight,a+s.topRight,s.topRight,0,-bt,!0),t.lineTo(n+s.topLeft,a)}const U_=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,V_=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function Y_(t,e){const n=(""+t).match(U_);if(!n||n[1]==="normal")return e*1.2;switch(t=+n[2],n[3]){case"px":return t;case"%":t/=100;break}return e*t}const G_=t=>+t||0;function Cu(t,e){const n={},a=X(e),i=a?Object.keys(e):e,r=X(t)?a?s=>B(t[s],t[e[s]]):s=>t[s]:()=>t;for(const s of i)n[s]=G_(r(s));return n}function tb(t){return Cu(t,{top:"y",right:"x",bottom:"y",left:"x"})}function ma(t){return Cu(t,["topLeft","topRight","bottomLeft","bottomRight"])}function Vt(t){const e=tb(t);return e.width=e.left+e.right,e.height=e.top+e.bottom,e}function Mt(t,e){t=t||{},e=e||ft.font;let n=B(t.size,e.size);typeof n=="string"&&(n=parseInt(n,10));let a=B(t.style,e.style);a&&!(""+a).match(V_)&&(console.warn('Invalid font style specified: "'+a+'"'),a=void 0);const i={family:B(t.family,e.family),lineHeight:Y_(B(t.lineHeight,e.lineHeight),n),size:n,style:a,weight:B(t.weight,e.weight),string:""};return i.string=z_(i),i}function Qi(t,e,n,a){let i,r,s;for(i=0,r=t.length;i<r;++i)if(s=t[i],s!==void 0&&s!==void 0)return s}function q_(t,e,n){const{min:a,max:i}=t,r=Gm(e,(i-a)/2),s=(l,o)=>n&&l===0?0:l+o;return{min:s(a,-Math.abs(r)),max:s(i,r)}}function Jn(t,e){return Object.assign(Object.create(t),e)}function Ou(t,e=[""],n,a,i=()=>t[0]){const r=n||t;typeof a>"u"&&(a=ib("_fallback",t));const s={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:t,_rootScopes:r,_fallback:a,_getTarget:i,override:l=>Ou([l,...t],e,r,a)};return new Proxy(s,{deleteProperty(l,o){return delete l[o],delete l._keys,delete t[0][o],!0},get(l,o){return nb(l,o,()=>J_(o,e,t,l))},getOwnPropertyDescriptor(l,o){return Reflect.getOwnPropertyDescriptor(l._scopes[0],o)},getPrototypeOf(){return Reflect.getPrototypeOf(t[0])},has(l,o){return Ch(l).includes(o)},ownKeys(l){return Ch(l)},set(l,o,c){const d=l._storage||(l._storage=i());return l[o]=d[o]=c,delete l._keys,!0}})}function bi(t,e,n,a){const i={_cacheable:!1,_proxy:t,_context:e,_subProxy:n,_stack:new Set,_descriptors:eb(t,a),setContext:r=>bi(t,r,n,a),override:r=>bi(t.override(r),e,n,a)};return new Proxy(i,{deleteProperty(r,s){return delete r[s],delete t[s],!0},get(r,s,l){return nb(r,s,()=>F_(r,s,l))},getOwnPropertyDescriptor(r,s){return r._descriptors.allKeys?Reflect.has(t,s)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(t,s)},getPrototypeOf(){return Reflect.getPrototypeOf(t)},has(r,s){return Reflect.has(t,s)},ownKeys(){return Reflect.ownKeys(t)},set(r,s,l){return t[s]=l,delete r[s],!0}})}function eb(t,e={scriptable:!0,indexable:!0}){const{_scriptable:n=e.scriptable,_indexable:a=e.indexable,_allKeys:i=e.allKeys}=t;return{allKeys:i,scriptable:n,indexable:a,isScriptable:Kn(n)?n:()=>n,isIndexable:Kn(a)?a:()=>a}}const X_=(t,e)=>t?t+wu(e):e,Eu=(t,e)=>X(e)&&t!=="adapters"&&(Object.getPrototypeOf(e)===null||e.constructor===Object);function nb(t,e,n){if(Object.prototype.hasOwnProperty.call(t,e)||e==="constructor")return t[e];const a=n();return t[e]=a,a}function F_(t,e,n){const{_proxy:a,_context:i,_subProxy:r,_descriptors:s}=t;let l=a[e];return Kn(l)&&s.isScriptable(e)&&(l=Q_(e,l,t,n)),ut(l)&&l.length&&(l=Z_(e,l,t,s.isIndexable)),Eu(e,l)&&(l=bi(l,i,r&&r[e],s)),l}function Q_(t,e,n,a){const{_proxy:i,_context:r,_subProxy:s,_stack:l}=n;if(l.has(t))throw new Error("Recursion detected: "+Array.from(l).join("->")+"->"+t);l.add(t);let o=e(r,s||a);return l.delete(t),Eu(t,o)&&(o=zu(i._scopes,i,t,o)),o}function Z_(t,e,n,a){const{_proxy:i,_context:r,_subProxy:s,_descriptors:l}=n;if(typeof r.index<"u"&&a(t))return e[r.index%e.length];if(X(e[0])){const o=e,c=i._scopes.filter(d=>d!==o);e=[];for(const d of o){const u=zu(c,i,t,d);e.push(bi(u,r,s&&s[t],l))}}return e}function ab(t,e,n){return Kn(t)?t(e,n):t}const K_=(t,e)=>t===!0?e:typeof t=="string"?Zn(e,t):void 0;function P_(t,e,n,a,i){for(const r of e){const s=K_(n,r);if(s){t.add(s);const l=ab(s._fallback,n,i);if(typeof l<"u"&&l!==n&&l!==a)return l}else if(s===!1&&typeof a<"u"&&n!==a)return null}return!1}function zu(t,e,n,a){const i=e._rootScopes,r=ab(e._fallback,n,a),s=[...t,...i],l=new Set;l.add(a);let o=Dh(l,s,n,r||n,a);return o===null||typeof r<"u"&&r!==n&&(o=Dh(l,s,r,o,a),o===null)?!1:Ou(Array.from(l),[""],i,r,()=>W_(e,n,a))}function Dh(t,e,n,a,i){for(;n;)n=P_(t,e,n,a,i);return n}function W_(t,e,n){const a=t._getTarget();e in a||(a[e]={});const i=a[e];return ut(i)&&X(n)?n:i||{}}function J_(t,e,n,a){let i;for(const r of e)if(i=ib(X_(r,t),n),typeof i<"u")return Eu(t,i)?zu(n,a,t,i):i}function ib(t,e){for(const n of e){if(!n)continue;const a=n[t];if(typeof a<"u")return a}}function Ch(t){let e=t._keys;return e||(e=t._keys=I_(t._scopes)),e}function I_(t){const e=new Set;for(const n of t)for(const a of Object.keys(n).filter(i=>!i.startsWith("_")))e.add(a);return Array.from(e)}function rb(t,e,n,a){const{iScale:i}=t,{key:r="r"}=this._parsing,s=new Array(a);let l,o,c,d;for(l=0,o=a;l<o;++l)c=l+n,d=e[c],s[l]={r:i.parse(Zn(d,r),c)};return s}const $_=Number.EPSILON||1e-14,yi=(t,e)=>e<t.length&&!t[e].skip&&t[e],sb=t=>t==="x"?"y":"x";function t2(t,e,n,a){const i=t.skip?e:t,r=e,s=n.skip?e:n,l=id(r,i),o=id(s,r);let c=l/(l+o),d=o/(l+o);c=isNaN(c)?0:c,d=isNaN(d)?0:d;const u=a*c,f=a*d;return{previous:{x:r.x-u*(s.x-i.x),y:r.y-u*(s.y-i.y)},next:{x:r.x+f*(s.x-i.x),y:r.y+f*(s.y-i.y)}}}function e2(t,e,n){const a=t.length;let i,r,s,l,o,c=yi(t,0);for(let d=0;d<a-1;++d)if(o=c,c=yi(t,d+1),!(!o||!c)){if(fr(e[d],0,$_)){n[d]=n[d+1]=0;continue}i=n[d]/e[d],r=n[d+1]/e[d],l=Math.pow(i,2)+Math.pow(r,2),!(l<=9)&&(s=3/Math.sqrt(l),n[d]=i*s*e[d],n[d+1]=r*s*e[d])}}function n2(t,e,n="x"){const a=sb(n),i=t.length;let r,s,l,o=yi(t,0);for(let c=0;c<i;++c){if(s=l,l=o,o=yi(t,c+1),!l)continue;const d=l[n],u=l[a];s&&(r=(d-s[n])/3,l[`cp1${n}`]=d-r,l[`cp1${a}`]=u-r*e[c]),o&&(r=(o[n]-d)/3,l[`cp2${n}`]=d+r,l[`cp2${a}`]=u+r*e[c])}}function a2(t,e="x"){const n=sb(e),a=t.length,i=Array(a).fill(0),r=Array(a);let s,l,o,c=yi(t,0);for(s=0;s<a;++s)if(l=o,o=c,c=yi(t,s+1),!!o){if(c){const d=c[e]-o[e];i[s]=d!==0?(c[n]-o[n])/d:0}r[s]=l?c?je(i[s-1])!==je(i[s])?0:(i[s-1]+i[s])/2:i[s-1]:i[s]}e2(t,i,r),n2(t,r,e)}function vs(t,e,n){return Math.max(Math.min(t,n),e)}function i2(t,e){let n,a,i,r,s,l=sn(t[0],e);for(n=0,a=t.length;n<a;++n)s=r,r=l,l=n<a-1&&sn(t[n+1],e),r&&(i=t[n],s&&(i.cp1x=vs(i.cp1x,e.left,e.right),i.cp1y=vs(i.cp1y,e.top,e.bottom)),l&&(i.cp2x=vs(i.cp2x,e.left,e.right),i.cp2y=vs(i.cp2y,e.top,e.bottom)))}function r2(t,e,n,a,i){let r,s,l,o;if(e.spanGaps&&(t=t.filter(c=>!c.skip)),e.cubicInterpolationMode==="monotone")a2(t,i);else{let c=a?t[t.length-1]:t[0];for(r=0,s=t.length;r<s;++r)l=t[r],o=t2(c,l,t[Math.min(r+1,s-(a?0:1))%s],e.tension),l.cp1x=o.previous.x,l.cp1y=o.previous.y,l.cp2x=o.next.x,l.cp2y=o.next.y,c=l}e.capBezierPoints&&i2(t,n)}function Ru(){return typeof window<"u"&&typeof document<"u"}function Lu(t){let e=t.parentNode;return e&&e.toString()==="[object ShadowRoot]"&&(e=e.host),e}function El(t,e,n){let a;return typeof t=="string"?(a=parseInt(t,10),t.indexOf("%")!==-1&&(a=a/100*e.parentNode[n])):a=t,a}const ao=t=>t.ownerDocument.defaultView.getComputedStyle(t,null);function s2(t,e){return ao(t).getPropertyValue(e)}const l2=["top","right","bottom","left"];function ba(t,e,n){const a={};n=n?"-"+n:"";for(let i=0;i<4;i++){const r=l2[i];a[r]=parseFloat(t[e+"-"+r+n])||0}return a.width=a.left+a.right,a.height=a.top+a.bottom,a}const o2=(t,e,n)=>(t>0||e>0)&&(!n||!n.shadowRoot);function c2(t,e){const n=t.touches,a=n&&n.length?n[0]:t,{offsetX:i,offsetY:r}=a;let s=!1,l,o;if(o2(i,r,t.target))l=i,o=r;else{const c=e.getBoundingClientRect();l=a.clientX-c.left,o=a.clientY-c.top,s=!0}return{x:l,y:o,box:s}}function oa(t,e){if("native"in t)return t;const{canvas:n,currentDevicePixelRatio:a}=e,i=ao(n),r=i.boxSizing==="border-box",s=ba(i,"padding"),l=ba(i,"border","width"),{x:o,y:c,box:d}=c2(t,n),u=s.left+(d&&l.left),f=s.top+(d&&l.top);let{width:h,height:m}=e;return r&&(h-=s.width+l.width,m-=s.height+l.height),{x:Math.round((o-u)/h*n.width/a),y:Math.round((c-f)/m*n.height/a)}}function d2(t,e,n){let a,i;if(e===void 0||n===void 0){const r=t&&Lu(t);if(!r)e=t.clientWidth,n=t.clientHeight;else{const s=r.getBoundingClientRect(),l=ao(r),o=ba(l,"border","width"),c=ba(l,"padding");e=s.width-c.width-o.width,n=s.height-c.height-o.height,a=El(l.maxWidth,r,"clientWidth"),i=El(l.maxHeight,r,"clientHeight")}}return{width:e,height:n,maxWidth:a||Cl,maxHeight:i||Cl}}const On=t=>Math.round(t*10)/10;function u2(t,e,n,a){const i=ao(t),r=ba(i,"margin"),s=El(i.maxWidth,t,"clientWidth")||Cl,l=El(i.maxHeight,t,"clientHeight")||Cl,o=d2(t,e,n);let{width:c,height:d}=o;if(i.boxSizing==="content-box"){const f=ba(i,"border","width"),h=ba(i,"padding");c-=h.width+f.width,d-=h.height+f.height}return c=Math.max(0,c-r.width),d=Math.max(0,a?c/a:d-r.height),c=On(Math.min(c,s,o.maxWidth)),d=On(Math.min(d,l,o.maxHeight)),c&&!d&&(d=On(c/2)),(e!==void 0||n!==void 0)&&a&&o.height&&d>o.height&&(d=o.height,c=On(Math.floor(d*a))),{width:c,height:d}}function Oh(t,e,n){const a=e||1,i=On(t.height*a),r=On(t.width*a);t.height=On(t.height),t.width=On(t.width);const s=t.canvas;return s.style&&(n||!s.style.height&&!s.style.width)&&(s.style.height=`${t.height}px`,s.style.width=`${t.width}px`),t.currentDevicePixelRatio!==a||s.height!==i||s.width!==r?(t.currentDevicePixelRatio=a,s.height=i,s.width=r,t.ctx.setTransform(a,0,0,a,0,0),!0):!1}const f2=function(){let t=!1;try{const e={get passive(){return t=!0,!1}};Ru()&&(window.addEventListener("test",null,e),window.removeEventListener("test",null,e))}catch{}return t}();function Eh(t,e){const n=s2(t,e),a=n&&n.match(/^(\d+)(\.\d+)?px$/);return a?+a[1]:void 0}function ca(t,e,n,a){return{x:t.x+n*(e.x-t.x),y:t.y+n*(e.y-t.y)}}function h2(t,e,n,a){return{x:t.x+n*(e.x-t.x),y:a==="middle"?n<.5?t.y:e.y:a==="after"?n<1?t.y:e.y:n>0?e.y:t.y}}function p2(t,e,n,a){const i={x:t.cp2x,y:t.cp2y},r={x:e.cp1x,y:e.cp1y},s=ca(t,i,n),l=ca(i,r,n),o=ca(r,e,n),c=ca(s,l,n),d=ca(l,o,n);return ca(c,d,n)}const g2=function(t,e){return{x(n){return t+t+e-n},setWidth(n){e=n},textAlign(n){return n==="center"?n:n==="right"?"left":"right"},xPlus(n,a){return n-a},leftForLtr(n,a){return n-a}}},m2=function(){return{x(t){return t},setWidth(t){},textAlign(t){return t},xPlus(t,e){return t+e},leftForLtr(t,e){return t}}};function ii(t,e,n){return t?g2(e,n):m2()}function lb(t,e){let n,a;(e==="ltr"||e==="rtl")&&(n=t.canvas.style,a=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",e,"important"),t.prevTextDirection=a)}function ob(t,e){e!==void 0&&(delete t.prevTextDirection,t.canvas.style.setProperty("direction",e[0],e[1]))}function cb(t){return t==="angle"?{between:Rr,compare:b_,normalize:Ht}:{between:an,compare:(e,n)=>e-n,normalize:e=>e}}function zh({start:t,end:e,count:n,loop:a,style:i}){return{start:t%n,end:e%n,loop:a&&(e-t+1)%n===0,style:i}}function b2(t,e,n){const{property:a,start:i,end:r}=n,{between:s,normalize:l}=cb(a),o=e.length;let{start:c,end:d,loop:u}=t,f,h;if(u){for(c+=o,d+=o,f=0,h=o;f<h&&s(l(e[c%o][a]),i,r);++f)c--,d--;c%=o,d%=o}return d<c&&(d+=o),{start:c,end:d,loop:u,style:t.style}}function db(t,e,n){if(!n)return[t];const{property:a,start:i,end:r}=n,s=e.length,{compare:l,between:o,normalize:c}=cb(a),{start:d,end:u,loop:f,style:h}=b2(t,e,n),m=[];let b=!1,v=null,p,g,y;const x=()=>o(i,y,p)&&l(i,y)!==0,_=()=>l(r,p)===0||o(r,y,p),w=()=>b||x(),k=()=>!b||_();for(let S=d,A=d;S<=u;++S)g=e[S%s],!g.skip&&(p=c(g[a]),p!==y&&(b=o(p,i,r),v===null&&w()&&(v=l(p,i)===0?S:A),v!==null&&k()&&(m.push(zh({start:v,end:S,loop:f,count:s,style:h})),v=null),A=S,y=p));return v!==null&&m.push(zh({start:v,end:u,loop:f,count:s,style:h})),m}function ub(t,e){const n=[],a=t.segments;for(let i=0;i<a.length;i++){const r=db(a[i],t.points,e);r.length&&n.push(...r)}return n}function y2(t,e,n,a){let i=0,r=e-1;if(n&&!a)for(;i<e&&!t[i].skip;)i++;for(;i<e&&t[i].skip;)i++;for(i%=e,n&&(r+=i);r>i&&t[r%e].skip;)r--;return r%=e,{start:i,end:r}}function v2(t,e,n,a){const i=t.length,r=[];let s=e,l=t[e],o;for(o=e+1;o<=n;++o){const c=t[o%i];c.skip||c.stop?l.skip||(a=!1,r.push({start:e%i,end:(o-1)%i,loop:a}),e=s=c.stop?o:null):(s=o,l.skip&&(e=o)),l=c}return s!==null&&r.push({start:e%i,end:s%i,loop:a}),r}function x2(t,e){const n=t.points,a=t.options.spanGaps,i=n.length;if(!i)return[];const r=!!t._loop,{start:s,end:l}=y2(n,i,r,a);if(a===!0)return Rh(t,[{start:s,end:l,loop:r}],n,e);const o=l<s?l+i:l,c=!!t._fullLoop&&s===0&&l===i-1;return Rh(t,v2(n,s,o,c),n,e)}function Rh(t,e,n,a){return!a||!a.setContext||!n?e:_2(t,e,n,a)}function _2(t,e,n,a){const i=t._chart.getContext(),r=Lh(t.options),{_datasetIndex:s,options:{spanGaps:l}}=t,o=n.length,c=[];let d=r,u=e[0].start,f=u;function h(m,b,v,p){const g=l?-1:1;if(m!==b){for(m+=o;n[m%o].skip;)m-=g;for(;n[b%o].skip;)b+=g;m%o!==b%o&&(c.push({start:m%o,end:b%o,loop:v,style:p}),d=p,u=b%o)}}for(const m of e){u=l?u:m.start;let b=n[u%o],v;for(f=u+1;f<=m.end;f++){const p=n[f%o];v=Lh(a.setContext(Jn(i,{type:"segment",p0:b,p1:p,p0DataIndex:(f-1)%o,p1DataIndex:f%o,datasetIndex:s}))),k2(v,d)&&h(u,f-1,m.loop,d),b=p,d=v}u<f-1&&h(u,f-1,m.loop,d)}return c}function Lh(t){return{backgroundColor:t.backgroundColor,borderCapStyle:t.borderCapStyle,borderDash:t.borderDash,borderDashOffset:t.borderDashOffset,borderJoinStyle:t.borderJoinStyle,borderWidth:t.borderWidth,borderColor:t.borderColor}}function k2(t,e){if(!e)return!1;const n=[],a=function(i,r){return Du(r)?(n.includes(r)||n.push(r),n.indexOf(r)):r};return JSON.stringify(t,a)!==JSON.stringify(e,a)}function xs(t,e,n){return t.options.clip?t[n]:e[n]}function S2(t,e){const{xScale:n,yScale:a}=t;return n&&a?{left:xs(n,e,"left"),right:xs(n,e,"right"),top:xs(a,e,"top"),bottom:xs(a,e,"bottom")}:e}function fb(t,e){const n=e._clip;if(n.disabled)return!1;const a=S2(e,t.chartArea);return{left:n.left===!1?0:a.left-(n.left===!0?0:n.left),right:n.right===!1?t.width:a.right+(n.right===!0?0:n.right),top:n.top===!1?0:a.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?t.height:a.bottom+(n.bottom===!0?0:n.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class w2{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(e,n,a,i){const r=n.listeners[i],s=n.duration;r.forEach(l=>l({chart:e,initial:n.initial,numSteps:s,currentStep:Math.min(a-n.start,s)}))}_refresh(){this._request||(this._running=!0,this._request=Km.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(e=Date.now()){let n=0;this._charts.forEach((a,i)=>{if(!a.running||!a.items.length)return;const r=a.items;let s=r.length-1,l=!1,o;for(;s>=0;--s)o=r[s],o._active?(o._total>a.duration&&(a.duration=o._total),o.tick(e),l=!0):(r[s]=r[r.length-1],r.pop());l&&(i.draw(),this._notify(i,a,e,"progress")),r.length||(a.running=!1,this._notify(i,a,e,"complete"),a.initial=!1),n+=r.length}),this._lastDate=e,n===0&&(this._running=!1)}_getAnims(e){const n=this._charts;let a=n.get(e);return a||(a={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},n.set(e,a)),a}listen(e,n,a){this._getAnims(e).listeners[n].push(a)}add(e,n){!n||!n.length||this._getAnims(e).items.push(...n)}has(e){return this._getAnims(e).items.length>0}start(e){const n=this._charts.get(e);n&&(n.running=!0,n.start=Date.now(),n.duration=n.items.reduce((a,i)=>Math.max(a,i._duration),0),this._refresh())}running(e){if(!this._running)return!1;const n=this._charts.get(e);return!(!n||!n.running||!n.items.length)}stop(e){const n=this._charts.get(e);if(!n||!n.items.length)return;const a=n.items;let i=a.length-1;for(;i>=0;--i)a[i].cancel();n.items=[],this._notify(e,n,Date.now(),"complete")}remove(e){return this._charts.delete(e)}}var Ke=new w2;const Bh="transparent",M2={boolean(t,e,n){return n>.5?e:t},color(t,e,n){const a=Mh(t||Bh),i=a.valid&&Mh(e||Bh);return i&&i.valid?i.mix(a,n).hexString():e},number(t,e,n){return t+(e-t)*n}};class A2{constructor(e,n,a,i){const r=n[a];i=Qi([e.to,i,r,e.from]);const s=Qi([e.from,r,i]);this._active=!0,this._fn=e.fn||M2[e.type||typeof s],this._easing=hr[e.easing]||hr.linear,this._start=Math.floor(Date.now()+(e.delay||0)),this._duration=this._total=Math.floor(e.duration),this._loop=!!e.loop,this._target=n,this._prop=a,this._from=s,this._to=i,this._promises=void 0}active(){return this._active}update(e,n,a){if(this._active){this._notify(!1);const i=this._target[this._prop],r=a-this._start,s=this._duration-r;this._start=a,this._duration=Math.floor(Math.max(s,e.duration)),this._total+=r,this._loop=!!e.loop,this._to=Qi([e.to,n,i,e.from]),this._from=Qi([e.from,i,n])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(e){const n=e-this._start,a=this._duration,i=this._prop,r=this._from,s=this._loop,l=this._to;let o;if(this._active=r!==l&&(s||n<a),!this._active){this._target[i]=l,this._notify(!0);return}if(n<0){this._target[i]=r;return}o=n/a%2,o=s&&o>1?2-o:o,o=this._easing(Math.min(1,Math.max(0,o))),this._target[i]=this._fn(r,l,o)}wait(){const e=this._promises||(this._promises=[]);return new Promise((n,a)=>{e.push({res:n,rej:a})})}_notify(e){const n=e?"res":"rej",a=this._promises||[];for(let i=0;i<a.length;i++)a[i][n]()}}class hb{constructor(e,n){this._chart=e,this._properties=new Map,this.configure(n)}configure(e){if(!X(e))return;const n=Object.keys(ft.animation),a=this._properties;Object.getOwnPropertyNames(e).forEach(i=>{const r=e[i];if(!X(r))return;const s={};for(const l of n)s[l]=r[l];(ut(r.properties)&&r.properties||[i]).forEach(l=>{(l===i||!a.has(l))&&a.set(l,s)})})}_animateOptions(e,n){const a=n.options,i=D2(e,a);if(!i)return[];const r=this._createAnimations(i,a);return a.$shared&&T2(e.options.$animations,a).then(()=>{e.options=a},()=>{}),r}_createAnimations(e,n){const a=this._properties,i=[],r=e.$animations||(e.$animations={}),s=Object.keys(n),l=Date.now();let o;for(o=s.length-1;o>=0;--o){const c=s[o];if(c.charAt(0)==="$")continue;if(c==="options"){i.push(...this._animateOptions(e,n));continue}const d=n[c];let u=r[c];const f=a.get(c);if(u)if(f&&u.active()){u.update(f,d,l);continue}else u.cancel();if(!f||!f.duration){e[c]=d;continue}r[c]=u=new A2(f,e,c,d),i.push(u)}return i}update(e,n){if(this._properties.size===0){Object.assign(e,n);return}const a=this._createAnimations(e,n);if(a.length)return Ke.add(this._chart,a),!0}}function T2(t,e){const n=[],a=Object.keys(e);for(let i=0;i<a.length;i++){const r=t[a[i]];r&&r.active()&&n.push(r.wait())}return Promise.all(n)}function D2(t,e){if(!e)return;let n=t.options;if(!n){t.options=e;return}return n.$shared&&(t.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function Nh(t,e){const n=t&&t.options||{},a=n.reverse,i=n.min===void 0?e:0,r=n.max===void 0?e:0;return{start:a?r:i,end:a?i:r}}function C2(t,e,n){if(n===!1)return!1;const a=Nh(t,n),i=Nh(e,n);return{top:i.end,right:a.end,bottom:i.start,left:a.start}}function O2(t){let e,n,a,i;return X(t)?(e=t.top,n=t.right,a=t.bottom,i=t.left):e=n=a=i=t,{top:e,right:n,bottom:a,left:i,disabled:t===!1}}function pb(t,e){const n=[],a=t._getSortedDatasetMetas(e);let i,r;for(i=0,r=a.length;i<r;++i)n.push(a[i].index);return n}function jh(t,e,n,a={}){const i=t.keys,r=a.mode==="single";let s,l,o,c;if(e===null)return;let d=!1;for(s=0,l=i.length;s<l;++s){if(o=+i[s],o===n){if(d=!0,a.all)continue;break}c=t.values[o],gt(c)&&(r||e===0||je(e)===je(c))&&(e+=c)}return!d&&!a.all?0:e}function E2(t,e){const{iScale:n,vScale:a}=e,i=n.axis==="x"?"x":"y",r=a.axis==="x"?"x":"y",s=Object.keys(t),l=new Array(s.length);let o,c,d;for(o=0,c=s.length;o<c;++o)d=s[o],l[o]={[i]:d,[r]:t[d]};return l}function Ko(t,e){const n=t&&t.options.stacked;return n||n===void 0&&e.stack!==void 0}function z2(t,e,n){return`${t.id}.${e.id}.${n.stack||n.type}`}function R2(t){const{min:e,max:n,minDefined:a,maxDefined:i}=t.getUserBounds();return{min:a?e:Number.NEGATIVE_INFINITY,max:i?n:Number.POSITIVE_INFINITY}}function L2(t,e,n){const a=t[e]||(t[e]={});return a[n]||(a[n]={})}function Hh(t,e,n,a){for(const i of e.getMatchingVisibleMetas(a).reverse()){const r=t[i.index];if(n&&r>0||!n&&r<0)return i.index}return null}function Uh(t,e){const{chart:n,_cachedMeta:a}=t,i=n._stacks||(n._stacks={}),{iScale:r,vScale:s,index:l}=a,o=r.axis,c=s.axis,d=z2(r,s,a),u=e.length;let f;for(let h=0;h<u;++h){const m=e[h],{[o]:b,[c]:v}=m,p=m._stacks||(m._stacks={});f=p[c]=L2(i,d,b),f[l]=v,f._top=Hh(f,s,!0,a.type),f._bottom=Hh(f,s,!1,a.type);const g=f._visualValues||(f._visualValues={});g[l]=v}}function Po(t,e){const n=t.scales;return Object.keys(n).filter(a=>n[a].axis===e).shift()}function B2(t,e){return Jn(t,{active:!1,dataset:void 0,datasetIndex:e,index:e,mode:"default",type:"dataset"})}function N2(t,e,n){return Jn(t,{active:!1,dataIndex:e,parsed:void 0,raw:void 0,element:n,index:e,mode:"default",type:"data"})}function Bi(t,e){const n=t.controller.index,a=t.vScale&&t.vScale.axis;if(a){e=e||t._parsed;for(const i of e){const r=i._stacks;if(!r||r[a]===void 0||r[a][n]===void 0)return;delete r[a][n],r[a]._visualValues!==void 0&&r[a]._visualValues[n]!==void 0&&delete r[a]._visualValues[n]}}}const Wo=t=>t==="reset"||t==="none",Vh=(t,e)=>e?t:Object.assign({},t),j2=(t,e,n)=>t&&!e.hidden&&e._stacked&&{keys:pb(n,!0),values:null};class Te{constructor(e,n){this.chart=e,this._ctx=e.ctx,this.index=n,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const e=this._cachedMeta;this.configure(),this.linkScales(),e._stacked=Ko(e.vScale,e),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(e){this.index!==e&&Bi(this._cachedMeta),this.index=e}linkScales(){const e=this.chart,n=this._cachedMeta,a=this.getDataset(),i=(u,f,h,m)=>u==="x"?f:u==="r"?m:h,r=n.xAxisID=B(a.xAxisID,Po(e,"x")),s=n.yAxisID=B(a.yAxisID,Po(e,"y")),l=n.rAxisID=B(a.rAxisID,Po(e,"r")),o=n.indexAxis,c=n.iAxisID=i(o,r,s,l),d=n.vAxisID=i(o,s,r,l);n.xScale=this.getScaleForId(r),n.yScale=this.getScaleForId(s),n.rScale=this.getScaleForId(l),n.iScale=this.getScaleForId(c),n.vScale=this.getScaleForId(d)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(e){return this.chart.scales[e]}_getOtherScale(e){const n=this._cachedMeta;return e===n.iScale?n.vScale:n.iScale}reset(){this._update("reset")}_destroy(){const e=this._cachedMeta;this._data&&kh(this._data,this),e._stacked&&Bi(e)}_dataCheck(){const e=this.getDataset(),n=e.data||(e.data=[]),a=this._data;if(X(n)){const i=this._cachedMeta;this._data=E2(n,i)}else if(a!==n){if(a){kh(a,this);const i=this._cachedMeta;Bi(i),i._parsed=[]}n&&Object.isExtensible(n)&&__(n,this),this._syncList=[],this._data=n}}addElements(){const e=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(e.dataset=new this.datasetElementType)}buildOrUpdateElements(e){const n=this._cachedMeta,a=this.getDataset();let i=!1;this._dataCheck();const r=n._stacked;n._stacked=Ko(n.vScale,n),n.stack!==a.stack&&(i=!0,Bi(n),n.stack=a.stack),this._resyncElements(e),(i||r!==n._stacked)&&(Uh(this,n._parsed),n._stacked=Ko(n.vScale,n))}configure(){const e=this.chart.config,n=e.datasetScopeKeys(this._type),a=e.getOptionScopes(this.getDataset(),n,!0);this.options=e.createResolver(a,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(e,n){const{_cachedMeta:a,_data:i}=this,{iScale:r,_stacked:s}=a,l=r.axis;let o=e===0&&n===i.length?!0:a._sorted,c=e>0&&a._parsed[e-1],d,u,f;if(this._parsing===!1)a._parsed=i,a._sorted=!0,f=i;else{ut(i[e])?f=this.parseArrayData(a,i,e,n):X(i[e])?f=this.parseObjectData(a,i,e,n):f=this.parsePrimitiveData(a,i,e,n);const h=()=>u[l]===null||c&&u[l]<c[l];for(d=0;d<n;++d)a._parsed[d+e]=u=f[d],o&&(h()&&(o=!1),c=u);a._sorted=o}s&&Uh(this,f)}parsePrimitiveData(e,n,a,i){const{iScale:r,vScale:s}=e,l=r.axis,o=s.axis,c=r.getLabels(),d=r===s,u=new Array(i);let f,h,m;for(f=0,h=i;f<h;++f)m=f+a,u[f]={[l]:d||r.parse(c[m],m),[o]:s.parse(n[m],m)};return u}parseArrayData(e,n,a,i){const{xScale:r,yScale:s}=e,l=new Array(i);let o,c,d,u;for(o=0,c=i;o<c;++o)d=o+a,u=n[d],l[o]={x:r.parse(u[0],d),y:s.parse(u[1],d)};return l}parseObjectData(e,n,a,i){const{xScale:r,yScale:s}=e,{xAxisKey:l="x",yAxisKey:o="y"}=this._parsing,c=new Array(i);let d,u,f,h;for(d=0,u=i;d<u;++d)f=d+a,h=n[f],c[d]={x:r.parse(Zn(h,l),f),y:s.parse(Zn(h,o),f)};return c}getParsed(e){return this._cachedMeta._parsed[e]}getDataElement(e){return this._cachedMeta.data[e]}applyStack(e,n,a){const i=this.chart,r=this._cachedMeta,s=n[e.axis],l={keys:pb(i,!0),values:n._stacks[e.axis]._visualValues};return jh(l,s,r.index,{mode:a})}updateRangeFromParsed(e,n,a,i){const r=a[n.axis];let s=r===null?NaN:r;const l=i&&a._stacks[n.axis];i&&l&&(i.values=l,s=jh(i,r,this._cachedMeta.index)),e.min=Math.min(e.min,s),e.max=Math.max(e.max,s)}getMinMax(e,n){const a=this._cachedMeta,i=a._parsed,r=a._sorted&&e===a.iScale,s=i.length,l=this._getOtherScale(e),o=j2(n,a,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:d,max:u}=R2(l);let f,h;function m(){h=i[f];const b=h[l.axis];return!gt(h[e.axis])||d>b||u<b}for(f=0;f<s&&!(!m()&&(this.updateRangeFromParsed(c,e,h,o),r));++f);if(r){for(f=s-1;f>=0;--f)if(!m()){this.updateRangeFromParsed(c,e,h,o);break}}return c}getAllParsedValues(e){const n=this._cachedMeta._parsed,a=[];let i,r,s;for(i=0,r=n.length;i<r;++i)s=n[i][e.axis],gt(s)&&a.push(s);return a}getMaxOverflow(){return!1}getLabelAndValue(e){const n=this._cachedMeta,a=n.iScale,i=n.vScale,r=this.getParsed(e);return{label:a?""+a.getLabelForValue(r[a.axis]):"",value:i?""+i.getLabelForValue(r[i.axis]):""}}_update(e){const n=this._cachedMeta;this.update(e||"default"),n._clip=O2(B(this.options.clip,C2(n.xScale,n.yScale,this.getMaxOverflow())))}update(e){}draw(){const e=this._ctx,n=this.chart,a=this._cachedMeta,i=a.data||[],r=n.chartArea,s=[],l=this._drawStart||0,o=this._drawCount||i.length-l,c=this.options.drawActiveElementsOnTop;let d;for(a.dataset&&a.dataset.draw(e,r,l,o),d=l;d<l+o;++d){const u=i[d];u.hidden||(u.active&&c?s.push(u):u.draw(e,r))}for(d=0;d<s.length;++d)s[d].draw(e,r)}getStyle(e,n){const a=n?"active":"default";return e===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(a):this.resolveDataElementOptions(e||0,a)}getContext(e,n,a){const i=this.getDataset();let r;if(e>=0&&e<this._cachedMeta.data.length){const s=this._cachedMeta.data[e];r=s.$context||(s.$context=N2(this.getContext(),e,s)),r.parsed=this.getParsed(e),r.raw=i.data[e],r.index=r.dataIndex=e}else r=this.$context||(this.$context=B2(this.chart.getContext(),this.index)),r.dataset=i,r.index=r.datasetIndex=this.index;return r.active=!!n,r.mode=a,r}resolveDatasetElementOptions(e){return this._resolveElementOptions(this.datasetElementType.id,e)}resolveDataElementOptions(e,n){return this._resolveElementOptions(this.dataElementType.id,n,e)}_resolveElementOptions(e,n="default",a){const i=n==="active",r=this._cachedDataOpts,s=e+"-"+n,l=r[s],o=this.enableOptionSharing&&zr(a);if(l)return Vh(l,o);const c=this.chart.config,d=c.datasetElementScopeKeys(this._type,e),u=i?[`${e}Hover`,"hover",e,""]:[e,""],f=c.getOptionScopes(this.getDataset(),d),h=Object.keys(ft.elements[e]),m=()=>this.getContext(a,i,n),b=c.resolveNamedOptions(f,h,m,u);return b.$shared&&(b.$shared=o,r[s]=Object.freeze(Vh(b,o))),b}_resolveAnimations(e,n,a){const i=this.chart,r=this._cachedDataOpts,s=`animation-${n}`,l=r[s];if(l)return l;let o;if(i.options.animation!==!1){const d=this.chart.config,u=d.datasetAnimationScopeKeys(this._type,n),f=d.getOptionScopes(this.getDataset(),u);o=d.createResolver(f,this.getContext(e,a,n))}const c=new hb(i,o&&o.animations);return o&&o._cacheable&&(r[s]=Object.freeze(c)),c}getSharedOptions(e){if(e.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},e))}includeOptions(e,n){return!n||Wo(e)||this.chart._animationsDisabled}_getSharedOptions(e,n){const a=this.resolveDataElementOptions(e,n),i=this._sharedOptions,r=this.getSharedOptions(a),s=this.includeOptions(n,r)||r!==i;return this.updateSharedOptions(r,n,a),{sharedOptions:r,includeOptions:s}}updateElement(e,n,a,i){Wo(i)?Object.assign(e,a):this._resolveAnimations(n,i).update(e,a)}updateSharedOptions(e,n,a){e&&!Wo(n)&&this._resolveAnimations(void 0,n).update(e,a)}_setStyle(e,n,a,i){e.active=i;const r=this.getStyle(n,i);this._resolveAnimations(n,a,i).update(e,{options:!i&&this.getSharedOptions(r)||r})}removeHoverStyle(e,n,a){this._setStyle(e,a,"active",!1)}setHoverStyle(e,n,a){this._setStyle(e,a,"active",!0)}_removeDatasetHoverStyle(){const e=this._cachedMeta.dataset;e&&this._setStyle(e,void 0,"active",!1)}_setDatasetHoverStyle(){const e=this._cachedMeta.dataset;e&&this._setStyle(e,void 0,"active",!0)}_resyncElements(e){const n=this._data,a=this._cachedMeta.data;for(const[l,o,c]of this._syncList)this[l](o,c);this._syncList=[];const i=a.length,r=n.length,s=Math.min(r,i);s&&this.parse(0,s),r>i?this._insertElements(i,r-i,e):r<i&&this._removeElements(r,i-r)}_insertElements(e,n,a=!0){const i=this._cachedMeta,r=i.data,s=e+n;let l;const o=c=>{for(c.length+=n,l=c.length-1;l>=s;l--)c[l]=c[l-n]};for(o(r),l=e;l<s;++l)r[l]=new this.dataElementType;this._parsing&&o(i._parsed),this.parse(e,n),a&&this.updateElements(r,e,n,"reset")}updateElements(e,n,a,i){}_removeElements(e,n){const a=this._cachedMeta;if(this._parsing){const i=a._parsed.splice(e,n);a._stacked&&Bi(a,i)}a.data.splice(e,n)}_sync(e){if(this._parsing)this._syncList.push(e);else{const[n,a,i]=e;this[n](a,i)}this.chart._dataChanges.push([this.index,...e])}_onDataPush(){const e=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-e,e])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(e,n){n&&this._sync(["_removeElements",e,n]);const a=arguments.length-2;a&&this._sync(["_insertElements",e,a])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}D(Te,"defaults",{}),D(Te,"datasetElementType",null),D(Te,"dataElementType",null);function H2(t,e){if(!t._cache.$bar){const n=t.getMatchingVisibleMetas(e);let a=[];for(let i=0,r=n.length;i<r;i++)a=a.concat(n[i].controller.getAllParsedValues(t));t._cache.$bar=Zm(a.sort((i,r)=>i-r))}return t._cache.$bar}function U2(t){const e=t.iScale,n=H2(e,t.type);let a=e._length,i,r,s,l;const o=()=>{s===32767||s===-32768||(zr(l)&&(a=Math.min(a,Math.abs(s-l)||a)),l=s)};for(i=0,r=n.length;i<r;++i)s=e.getPixelForValue(n[i]),o();for(l=void 0,i=0,r=e.ticks.length;i<r;++i)s=e.getPixelForTick(i),o();return a}function V2(t,e,n,a){const i=n.barThickness;let r,s;return G(i)?(r=e.min*n.categoryPercentage,s=n.barPercentage):(r=i*a,s=1),{chunk:r/a,ratio:s,start:e.pixels[t]-r/2}}function Y2(t,e,n,a){const i=e.pixels,r=i[t];let s=t>0?i[t-1]:null,l=t<i.length-1?i[t+1]:null;const o=n.categoryPercentage;s===null&&(s=r-(l===null?e.end-e.start:l-r)),l===null&&(l=r+r-s);const c=r-(r-Math.min(s,l))/2*o;return{chunk:Math.abs(l-s)/2*o/a,ratio:n.barPercentage,start:c}}function G2(t,e,n,a){const i=n.parse(t[0],a),r=n.parse(t[1],a),s=Math.min(i,r),l=Math.max(i,r);let o=s,c=l;Math.abs(s)>Math.abs(l)&&(o=l,c=s),e[n.axis]=c,e._custom={barStart:o,barEnd:c,start:i,end:r,min:s,max:l}}function gb(t,e,n,a){return ut(t)?G2(t,e,n,a):e[n.axis]=n.parse(t,a),e}function Yh(t,e,n,a){const i=t.iScale,r=t.vScale,s=i.getLabels(),l=i===r,o=[];let c,d,u,f;for(c=n,d=n+a;c<d;++c)f=e[c],u={},u[i.axis]=l||i.parse(s[c],c),o.push(gb(f,u,r,c));return o}function Jo(t){return t&&t.barStart!==void 0&&t.barEnd!==void 0}function q2(t,e,n){return t!==0?je(t):(e.isHorizontal()?1:-1)*(e.min>=n?1:-1)}function X2(t){let e,n,a,i,r;return t.horizontal?(e=t.base>t.x,n="left",a="right"):(e=t.base<t.y,n="bottom",a="top"),e?(i="end",r="start"):(i="start",r="end"),{start:n,end:a,reverse:e,top:i,bottom:r}}function F2(t,e,n,a){let i=e.borderSkipped;const r={};if(!i){t.borderSkipped=r;return}if(i===!0){t.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:s,end:l,reverse:o,top:c,bottom:d}=X2(t);i==="middle"&&n&&(t.enableBorderRadius=!0,(n._top||0)===a?i=c:(n._bottom||0)===a?i=d:(r[Gh(d,s,l,o)]=!0,i=c)),r[Gh(i,s,l,o)]=!0,t.borderSkipped=r}function Gh(t,e,n,a){return a?(t=Q2(t,e,n),t=qh(t,n,e)):t=qh(t,e,n),t}function Q2(t,e,n){return t===e?n:t===n?e:t}function qh(t,e,n){return t==="start"?e:t==="end"?n:t}function Z2(t,{inflateAmount:e},n){t.inflateAmount=e==="auto"?n===1?.33:0:e}class qs extends Te{parsePrimitiveData(e,n,a,i){return Yh(e,n,a,i)}parseArrayData(e,n,a,i){return Yh(e,n,a,i)}parseObjectData(e,n,a,i){const{iScale:r,vScale:s}=e,{xAxisKey:l="x",yAxisKey:o="y"}=this._parsing,c=r.axis==="x"?l:o,d=s.axis==="x"?l:o,u=[];let f,h,m,b;for(f=a,h=a+i;f<h;++f)b=n[f],m={},m[r.axis]=r.parse(Zn(b,c),f),u.push(gb(Zn(b,d),m,s,f));return u}updateRangeFromParsed(e,n,a,i){super.updateRangeFromParsed(e,n,a,i);const r=a._custom;r&&n===this._cachedMeta.vScale&&(e.min=Math.min(e.min,r.min),e.max=Math.max(e.max,r.max))}getMaxOverflow(){return 0}getLabelAndValue(e){const n=this._cachedMeta,{iScale:a,vScale:i}=n,r=this.getParsed(e),s=r._custom,l=Jo(s)?"["+s.start+", "+s.end+"]":""+i.getLabelForValue(r[i.axis]);return{label:""+a.getLabelForValue(r[a.axis]),value:l}}initialize(){this.enableOptionSharing=!0,super.initialize();const e=this._cachedMeta;e.stack=this.getDataset().stack}update(e){const n=this._cachedMeta;this.updateElements(n.data,0,n.data.length,e)}updateElements(e,n,a,i){const r=i==="reset",{index:s,_cachedMeta:{vScale:l}}=this,o=l.getBasePixel(),c=l.isHorizontal(),d=this._getRuler(),{sharedOptions:u,includeOptions:f}=this._getSharedOptions(n,i);for(let h=n;h<n+a;h++){const m=this.getParsed(h),b=r||G(m[l.axis])?{base:o,head:o}:this._calculateBarValuePixels(h),v=this._calculateBarIndexPixels(h,d),p=(m._stacks||{})[l.axis],g={horizontal:c,base:b.base,enableBorderRadius:!p||Jo(m._custom)||s===p._top||s===p._bottom,x:c?b.head:v.center,y:c?v.center:b.head,height:c?v.size:Math.abs(b.size),width:c?Math.abs(b.size):v.size};f&&(g.options=u||this.resolveDataElementOptions(h,e[h].active?"active":i));const y=g.options||e[h].options;F2(g,y,p,s),Z2(g,y,d.ratio),this.updateElement(e[h],h,g,i)}}_getStacks(e,n){const{iScale:a}=this._cachedMeta,i=a.getMatchingVisibleMetas(this._type).filter(d=>d.controller.options.grouped),r=a.options.stacked,s=[],l=this._cachedMeta.controller.getParsed(n),o=l&&l[a.axis],c=d=>{const u=d._parsed.find(h=>h[a.axis]===o),f=u&&u[d.vScale.axis];if(G(f)||isNaN(f))return!0};for(const d of i)if(!(n!==void 0&&c(d))&&((r===!1||s.indexOf(d.stack)===-1||r===void 0&&d.stack===void 0)&&s.push(d.stack),d.index===e))break;return s.length||s.push(void 0),s}_getStackCount(e){return this._getStacks(void 0,e).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const e=this.chart.scales,n=this.chart.options.indexAxis;return Object.keys(e).filter(a=>e[a].axis===n).shift()}_getAxis(){const e={},n=this.getFirstScaleIdForIndexAxis();for(const a of this.chart.data.datasets)e[B(this.chart.options.indexAxis==="x"?a.xAxisID:a.yAxisID,n)]=!0;return Object.keys(e)}_getStackIndex(e,n,a){const i=this._getStacks(e,a),r=n!==void 0?i.indexOf(n):-1;return r===-1?i.length-1:r}_getRuler(){const e=this.options,n=this._cachedMeta,a=n.iScale,i=[];let r,s;for(r=0,s=n.data.length;r<s;++r)i.push(a.getPixelForValue(this.getParsed(r)[a.axis],r));const l=e.barThickness;return{min:l||U2(n),pixels:i,start:a._startPixel,end:a._endPixel,stackCount:this._getStackCount(),scale:a,grouped:e.grouped,ratio:l?1:e.categoryPercentage*e.barPercentage}}_calculateBarValuePixels(e){const{_cachedMeta:{vScale:n,_stacked:a,index:i},options:{base:r,minBarLength:s}}=this,l=r||0,o=this.getParsed(e),c=o._custom,d=Jo(c);let u=o[n.axis],f=0,h=a?this.applyStack(n,o,a):u,m,b;h!==u&&(f=h-u,h=u),d&&(u=c.barStart,h=c.barEnd-c.barStart,u!==0&&je(u)!==je(c.barEnd)&&(f=0),f+=u);const v=!G(r)&&!d?r:f;let p=n.getPixelForValue(v);if(this.chart.getDataVisibility(e)?m=n.getPixelForValue(f+h):m=p,b=m-p,Math.abs(b)<s){b=q2(b,n,l)*s,u===l&&(p-=b/2);const g=n.getPixelForDecimal(0),y=n.getPixelForDecimal(1),x=Math.min(g,y),_=Math.max(g,y);p=Math.max(Math.min(p,_),x),m=p+b,a&&!d&&(o._stacks[n.axis]._visualValues[i]=n.getValueForPixel(m)-n.getValueForPixel(p))}if(p===n.getPixelForValue(l)){const g=je(b)*n.getLineWidthForValue(l)/2;p+=g,b-=g}return{size:b,base:p,head:m,center:m+b/2}}_calculateBarIndexPixels(e,n){const a=n.scale,i=this.options,r=i.skipNull,s=B(i.maxBarThickness,1/0);let l,o;const c=this._getAxisCount();if(n.grouped){const d=r?this._getStackCount(e):n.stackCount,u=i.barThickness==="flex"?Y2(e,n,i,d*c):V2(e,n,i,d*c),f=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,h=this._getAxis().indexOf(B(f,this.getFirstScaleIdForIndexAxis())),m=this._getStackIndex(this.index,this._cachedMeta.stack,r?e:void 0)+h;l=u.start+u.chunk*m+u.chunk/2,o=Math.min(s,u.chunk*u.ratio)}else l=a.getPixelForValue(this.getParsed(e)[a.axis],e),o=Math.min(s,n.min*n.ratio);return{base:l-o/2,head:l+o/2,center:l,size:o}}draw(){const e=this._cachedMeta,n=e.vScale,a=e.data,i=a.length;let r=0;for(;r<i;++r)this.getParsed(r)[n.axis]!==null&&!a[r].hidden&&a[r].draw(this._ctx)}}D(qs,"id","bar"),D(qs,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),D(qs,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});class Xs extends Te{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(e,n,a,i){const r=super.parsePrimitiveData(e,n,a,i);for(let s=0;s<r.length;s++)r[s]._custom=this.resolveDataElementOptions(s+a).radius;return r}parseArrayData(e,n,a,i){const r=super.parseArrayData(e,n,a,i);for(let s=0;s<r.length;s++){const l=n[a+s];r[s]._custom=B(l[2],this.resolveDataElementOptions(s+a).radius)}return r}parseObjectData(e,n,a,i){const r=super.parseObjectData(e,n,a,i);for(let s=0;s<r.length;s++){const l=n[a+s];r[s]._custom=B(l&&l.r&&+l.r,this.resolveDataElementOptions(s+a).radius)}return r}getMaxOverflow(){const e=this._cachedMeta.data;let n=0;for(let a=e.length-1;a>=0;--a)n=Math.max(n,e[a].size(this.resolveDataElementOptions(a))/2);return n>0&&n}getLabelAndValue(e){const n=this._cachedMeta,a=this.chart.data.labels||[],{xScale:i,yScale:r}=n,s=this.getParsed(e),l=i.getLabelForValue(s.x),o=r.getLabelForValue(s.y),c=s._custom;return{label:a[e]||"",value:"("+l+", "+o+(c?", "+c:"")+")"}}update(e){const n=this._cachedMeta.data;this.updateElements(n,0,n.length,e)}updateElements(e,n,a,i){const r=i==="reset",{iScale:s,vScale:l}=this._cachedMeta,{sharedOptions:o,includeOptions:c}=this._getSharedOptions(n,i),d=s.axis,u=l.axis;for(let f=n;f<n+a;f++){const h=e[f],m=!r&&this.getParsed(f),b={},v=b[d]=r?s.getPixelForDecimal(.5):s.getPixelForValue(m[d]),p=b[u]=r?l.getBasePixel():l.getPixelForValue(m[u]);b.skip=isNaN(v)||isNaN(p),c&&(b.options=o||this.resolveDataElementOptions(f,h.active?"active":i),r&&(b.options.radius=0)),this.updateElement(h,f,b,i)}}resolveDataElementOptions(e,n){const a=this.getParsed(e);let i=super.resolveDataElementOptions(e,n);i.$shared&&(i=Object.assign({},i,{$shared:!1}));const r=i.radius;return n!=="active"&&(i.radius=0),i.radius+=B(a&&a._custom,r),i}}D(Xs,"id","bubble"),D(Xs,"defaults",{datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}}),D(Xs,"overrides",{scales:{x:{type:"linear"},y:{type:"linear"}}});function K2(t,e,n){let a=1,i=1,r=0,s=0;if(e<ot){const l=t,o=l+e,c=Math.cos(l),d=Math.sin(l),u=Math.cos(o),f=Math.sin(o),h=(y,x,_)=>Rr(y,l,o,!0)?1:Math.max(x,x*n,_,_*n),m=(y,x,_)=>Rr(y,l,o,!0)?-1:Math.min(x,x*n,_,_*n),b=h(0,c,u),v=h(bt,d,f),p=m(Z,c,u),g=m(Z+bt,d,f);a=(b-p)/2,i=(v-g)/2,r=-(b+p)/2,s=-(v+g)/2}return{ratioX:a,ratioY:i,offsetX:r,offsetY:s}}class da extends Te{constructor(e,n){super(e,n),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(e,n){const a=this.getDataset().data,i=this._cachedMeta;if(this._parsing===!1)i._parsed=a;else{let r=o=>+a[o];if(X(a[e])){const{key:o="value"}=this._parsing;r=c=>+Zn(a[c],o)}let s,l;for(s=e,l=e+n;s<l;++s)i._parsed[s]=r(s)}}_getRotation(){return Ae(this.options.rotation-90)}_getCircumference(){return Ae(this.options.circumference)}_getRotationExtents(){let e=ot,n=-ot;for(let a=0;a<this.chart.data.datasets.length;++a)if(this.chart.isDatasetVisible(a)&&this.chart.getDatasetMeta(a).type===this._type){const i=this.chart.getDatasetMeta(a).controller,r=i._getRotation(),s=i._getCircumference();e=Math.min(e,r),n=Math.max(n,r+s)}return{rotation:e,circumference:n-e}}update(e){const n=this.chart,{chartArea:a}=n,i=this._cachedMeta,r=i.data,s=this.getMaxBorderWidth()+this.getMaxOffset(r)+this.options.spacing,l=Math.max((Math.min(a.width,a.height)-s)/2,0),o=Math.min(s_(this.options.cutout,l),1),c=this._getRingWeight(this.index),{circumference:d,rotation:u}=this._getRotationExtents(),{ratioX:f,ratioY:h,offsetX:m,offsetY:b}=K2(u,d,o),v=(a.width-s)/f,p=(a.height-s)/h,g=Math.max(Math.min(v,p)/2,0),y=Gm(this.options.radius,g),x=Math.max(y*o,0),_=(y-x)/this._getVisibleDatasetWeightTotal();this.offsetX=m*y,this.offsetY=b*y,i.total=this.calculateTotal(),this.outerRadius=y-_*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-_*c,0),this.updateElements(r,0,r.length,e)}_circumference(e,n){const a=this.options,i=this._cachedMeta,r=this._getCircumference();return n&&a.animation.animateRotate||!this.chart.getDataVisibility(e)||i._parsed[e]===null||i.data[e].hidden?0:this.calculateCircumference(i._parsed[e]*r/ot)}updateElements(e,n,a,i){const r=i==="reset",s=this.chart,l=s.chartArea,c=s.options.animation,d=(l.left+l.right)/2,u=(l.top+l.bottom)/2,f=r&&c.animateScale,h=f?0:this.innerRadius,m=f?0:this.outerRadius,{sharedOptions:b,includeOptions:v}=this._getSharedOptions(n,i);let p=this._getRotation(),g;for(g=0;g<n;++g)p+=this._circumference(g,r);for(g=n;g<n+a;++g){const y=this._circumference(g,r),x=e[g],_={x:d+this.offsetX,y:u+this.offsetY,startAngle:p,endAngle:p+y,circumference:y,outerRadius:m,innerRadius:h};v&&(_.options=b||this.resolveDataElementOptions(g,x.active?"active":i)),p+=y,this.updateElement(x,g,_,i)}}calculateTotal(){const e=this._cachedMeta,n=e.data;let a=0,i;for(i=0;i<n.length;i++){const r=e._parsed[i];r!==null&&!isNaN(r)&&this.chart.getDataVisibility(i)&&!n[i].hidden&&(a+=Math.abs(r))}return a}calculateCircumference(e){const n=this._cachedMeta.total;return n>0&&!isNaN(e)?ot*(Math.abs(e)/n):0}getLabelAndValue(e){const n=this._cachedMeta,a=this.chart,i=a.data.labels||[],r=Ir(n._parsed[e],a.options.locale);return{label:i[e]||"",value:r}}getMaxBorderWidth(e){let n=0;const a=this.chart;let i,r,s,l,o;if(!e){for(i=0,r=a.data.datasets.length;i<r;++i)if(a.isDatasetVisible(i)){s=a.getDatasetMeta(i),e=s.data,l=s.controller;break}}if(!e)return 0;for(i=0,r=e.length;i<r;++i)o=l.resolveDataElementOptions(i),o.borderAlign!=="inner"&&(n=Math.max(n,o.borderWidth||0,o.hoverBorderWidth||0));return n}getMaxOffset(e){let n=0;for(let a=0,i=e.length;a<i;++a){const r=this.resolveDataElementOptions(a);n=Math.max(n,r.offset||0,r.hoverOffset||0)}return n}_getRingWeightOffset(e){let n=0;for(let a=0;a<e;++a)this.chart.isDatasetVisible(a)&&(n+=this._getRingWeight(a));return n}_getRingWeight(e){return Math.max(B(this.chart.data.datasets[e].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}D(da,"id","doughnut"),D(da,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),D(da,"descriptors",{_scriptable:e=>e!=="spacing",_indexable:e=>e!=="spacing"&&!e.startsWith("borderDash")&&!e.startsWith("hoverBorderDash")}),D(da,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(e){const n=e.data,{labels:{pointStyle:a,textAlign:i,color:r,useBorderRadius:s,borderRadius:l}}=e.legend.options;return n.labels.length&&n.datasets.length?n.labels.map((o,c)=>{const u=e.getDatasetMeta(0).controller.getStyle(c);return{text:o,fillStyle:u.backgroundColor,fontColor:r,hidden:!e.getDataVisibility(c),lineDash:u.borderDash,lineDashOffset:u.borderDashOffset,lineJoin:u.borderJoinStyle,lineWidth:u.borderWidth,strokeStyle:u.borderColor,textAlign:i,pointStyle:a,borderRadius:s&&(l||u.borderRadius),index:c}}):[]}},onClick(e,n,a){a.chart.toggleDataVisibility(n.index),a.chart.update()}}}});class Fs extends Te{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(e){const n=this._cachedMeta,{dataset:a,data:i=[],_dataset:r}=n,s=this.chart._animationsDisabled;let{start:l,count:o}=Wm(n,i,s);this._drawStart=l,this._drawCount=o,Jm(n)&&(l=0,o=i.length),a._chart=this.chart,a._datasetIndex=this.index,a._decimated=!!r._decimated,a.points=i;const c=this.resolveDatasetElementOptions(e);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(a,void 0,{animated:!s,options:c},e),this.updateElements(i,l,o,e)}updateElements(e,n,a,i){const r=i==="reset",{iScale:s,vScale:l,_stacked:o,_dataset:c}=this._cachedMeta,{sharedOptions:d,includeOptions:u}=this._getSharedOptions(n,i),f=s.axis,h=l.axis,{spanGaps:m,segment:b}=this.options,v=mi(m)?m:Number.POSITIVE_INFINITY,p=this.chart._animationsDisabled||r||i==="none",g=n+a,y=e.length;let x=n>0&&this.getParsed(n-1);for(let _=0;_<y;++_){const w=e[_],k=p?w:{};if(_<n||_>=g){k.skip=!0;continue}const S=this.getParsed(_),A=G(S[h]),C=k[f]=s.getPixelForValue(S[f],_),z=k[h]=r||A?l.getBasePixel():l.getPixelForValue(o?this.applyStack(l,S,o):S[h],_);k.skip=isNaN(C)||isNaN(z)||A,k.stop=_>0&&Math.abs(S[f]-x[f])>v,b&&(k.parsed=S,k.raw=c.data[_]),u&&(k.options=d||this.resolveDataElementOptions(_,w.active?"active":i)),p||this.updateElement(w,_,k,i),x=S}}getMaxOverflow(){const e=this._cachedMeta,n=e.dataset,a=n.options&&n.options.borderWidth||0,i=e.data||[];if(!i.length)return a;const r=i[0].size(this.resolveDataElementOptions(0)),s=i[i.length-1].size(this.resolveDataElementOptions(i.length-1));return Math.max(a,r,s)/2}draw(){const e=this._cachedMeta;e.dataset.updateControlPoints(this.chart.chartArea,e.iScale.axis),super.draw()}}D(Fs,"id","line"),D(Fs,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),D(Fs,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});class gr extends Te{constructor(e,n){super(e,n),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(e){const n=this._cachedMeta,a=this.chart,i=a.data.labels||[],r=Ir(n._parsed[e].r,a.options.locale);return{label:i[e]||"",value:r}}parseObjectData(e,n,a,i){return rb.bind(this)(e,n,a,i)}update(e){const n=this._cachedMeta.data;this._updateRadius(),this.updateElements(n,0,n.length,e)}getMinMax(){const e=this._cachedMeta,n={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return e.data.forEach((a,i)=>{const r=this.getParsed(i).r;!isNaN(r)&&this.chart.getDataVisibility(i)&&(r<n.min&&(n.min=r),r>n.max&&(n.max=r))}),n}_updateRadius(){const e=this.chart,n=e.chartArea,a=e.options,i=Math.min(n.right-n.left,n.bottom-n.top),r=Math.max(i/2,0),s=Math.max(a.cutoutPercentage?r/100*a.cutoutPercentage:1,0),l=(r-s)/e.getVisibleDatasetCount();this.outerRadius=r-l*this.index,this.innerRadius=this.outerRadius-l}updateElements(e,n,a,i){const r=i==="reset",s=this.chart,o=s.options.animation,c=this._cachedMeta.rScale,d=c.xCenter,u=c.yCenter,f=c.getIndexAngle(0)-.5*Z;let h=f,m;const b=360/this.countVisibleElements();for(m=0;m<n;++m)h+=this._computeAngle(m,i,b);for(m=n;m<n+a;m++){const v=e[m];let p=h,g=h+this._computeAngle(m,i,b),y=s.getDataVisibility(m)?c.getDistanceFromCenterForValue(this.getParsed(m).r):0;h=g,r&&(o.animateScale&&(y=0),o.animateRotate&&(p=g=f));const x={x:d,y:u,innerRadius:0,outerRadius:y,startAngle:p,endAngle:g,options:this.resolveDataElementOptions(m,v.active?"active":i)};this.updateElement(v,m,x,i)}}countVisibleElements(){const e=this._cachedMeta;let n=0;return e.data.forEach((a,i)=>{!isNaN(this.getParsed(i).r)&&this.chart.getDataVisibility(i)&&n++}),n}_computeAngle(e,n,a){return this.chart.getDataVisibility(e)?Ae(this.resolveDataElementOptions(e,n).angle||a):0}}D(gr,"id","polarArea"),D(gr,"defaults",{dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0}),D(gr,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(e){const n=e.data;if(n.labels.length&&n.datasets.length){const{labels:{pointStyle:a,color:i}}=e.legend.options;return n.labels.map((r,s)=>{const o=e.getDatasetMeta(0).controller.getStyle(s);return{text:r,fillStyle:o.backgroundColor,strokeStyle:o.borderColor,fontColor:i,lineWidth:o.borderWidth,pointStyle:a,hidden:!e.getDataVisibility(s),index:s}})}return[]}},onClick(e,n,a){a.chart.toggleDataVisibility(n.index),a.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}});class ld extends da{}D(ld,"id","pie"),D(ld,"defaults",{cutout:0,rotation:0,circumference:360,radius:"100%"});class Qs extends Te{getLabelAndValue(e){const n=this._cachedMeta.vScale,a=this.getParsed(e);return{label:n.getLabels()[e],value:""+n.getLabelForValue(a[n.axis])}}parseObjectData(e,n,a,i){return rb.bind(this)(e,n,a,i)}update(e){const n=this._cachedMeta,a=n.dataset,i=n.data||[],r=n.iScale.getLabels();if(a.points=i,e!=="resize"){const s=this.resolveDatasetElementOptions(e);this.options.showLine||(s.borderWidth=0);const l={_loop:!0,_fullLoop:r.length===i.length,options:s};this.updateElement(a,void 0,l,e)}this.updateElements(i,0,i.length,e)}updateElements(e,n,a,i){const r=this._cachedMeta.rScale,s=i==="reset";for(let l=n;l<n+a;l++){const o=e[l],c=this.resolveDataElementOptions(l,o.active?"active":i),d=r.getPointPositionForValue(l,this.getParsed(l).r),u=s?r.xCenter:d.x,f=s?r.yCenter:d.y,h={x:u,y:f,angle:d.angle,skip:isNaN(u)||isNaN(f),options:c};this.updateElement(o,l,h,i)}}}D(Qs,"id","radar"),D(Qs,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),D(Qs,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});class Zs extends Te{getLabelAndValue(e){const n=this._cachedMeta,a=this.chart.data.labels||[],{xScale:i,yScale:r}=n,s=this.getParsed(e),l=i.getLabelForValue(s.x),o=r.getLabelForValue(s.y);return{label:a[e]||"",value:"("+l+", "+o+")"}}update(e){const n=this._cachedMeta,{data:a=[]}=n,i=this.chart._animationsDisabled;let{start:r,count:s}=Wm(n,a,i);if(this._drawStart=r,this._drawCount=s,Jm(n)&&(r=0,s=a.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:l,_dataset:o}=n;l._chart=this.chart,l._datasetIndex=this.index,l._decimated=!!o._decimated,l.points=a;const c=this.resolveDatasetElementOptions(e);c.segment=this.options.segment,this.updateElement(l,void 0,{animated:!i,options:c},e)}else this.datasetElementType&&(delete n.dataset,this.datasetElementType=!1);this.updateElements(a,r,s,e)}addElements(){const{showLine:e}=this.options;!this.datasetElementType&&e&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(e,n,a,i){const r=i==="reset",{iScale:s,vScale:l,_stacked:o,_dataset:c}=this._cachedMeta,d=this.resolveDataElementOptions(n,i),u=this.getSharedOptions(d),f=this.includeOptions(i,u),h=s.axis,m=l.axis,{spanGaps:b,segment:v}=this.options,p=mi(b)?b:Number.POSITIVE_INFINITY,g=this.chart._animationsDisabled||r||i==="none";let y=n>0&&this.getParsed(n-1);for(let x=n;x<n+a;++x){const _=e[x],w=this.getParsed(x),k=g?_:{},S=G(w[m]),A=k[h]=s.getPixelForValue(w[h],x),C=k[m]=r||S?l.getBasePixel():l.getPixelForValue(o?this.applyStack(l,w,o):w[m],x);k.skip=isNaN(A)||isNaN(C)||S,k.stop=x>0&&Math.abs(w[h]-y[h])>p,v&&(k.parsed=w,k.raw=c.data[x]),f&&(k.options=u||this.resolveDataElementOptions(x,_.active?"active":i)),g||this.updateElement(_,x,k,i),y=w}this.updateSharedOptions(u,i,d)}getMaxOverflow(){const e=this._cachedMeta,n=e.data||[];if(!this.options.showLine){let l=0;for(let o=n.length-1;o>=0;--o)l=Math.max(l,n[o].size(this.resolveDataElementOptions(o))/2);return l>0&&l}const a=e.dataset,i=a.options&&a.options.borderWidth||0;if(!n.length)return i;const r=n[0].size(this.resolveDataElementOptions(0)),s=n[n.length-1].size(this.resolveDataElementOptions(n.length-1));return Math.max(i,r,s)/2}}D(Zs,"id","scatter"),D(Zs,"defaults",{datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1}),D(Zs,"overrides",{interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}});var P2=Object.freeze({__proto__:null,BarController:qs,BubbleController:Xs,DoughnutController:da,LineController:Fs,PieController:ld,PolarAreaController:gr,RadarController:Qs,ScatterController:Zs});function na(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class Bu{constructor(e){D(this,"options");this.options=e||{}}static override(e){Object.assign(Bu.prototype,e)}init(){}formats(){return na()}parse(){return na()}format(){return na()}add(){return na()}diff(){return na()}startOf(){return na()}endOf(){return na()}}var W2={_date:Bu};function J2(t,e,n,a){const{controller:i,data:r,_sorted:s}=t,l=i._cachedMeta.iScale,o=t.dataset&&t.dataset.options?t.dataset.options.spanGaps:null;if(l&&e===l.axis&&e!=="r"&&s&&r.length){const c=l._reversePixels?v_:rn;if(a){if(i._sharedOptions){const d=r[0],u=typeof d.getRange=="function"&&d.getRange(e);if(u){const f=c(r,e,n-u),h=c(r,e,n+u);return{lo:f.lo,hi:h.hi}}}}else{const d=c(r,e,n);if(o){const{vScale:u}=i._cachedMeta,{_parsed:f}=t,h=f.slice(0,d.lo+1).reverse().findIndex(b=>!G(b[u.axis]));d.lo-=Math.max(0,h);const m=f.slice(d.hi).findIndex(b=>!G(b[u.axis]));d.hi+=Math.max(0,m)}return d}}return{lo:0,hi:r.length-1}}function io(t,e,n,a,i){const r=t.getSortedVisibleDatasetMetas(),s=n[e];for(let l=0,o=r.length;l<o;++l){const{index:c,data:d}=r[l],{lo:u,hi:f}=J2(r[l],e,s,i);for(let h=u;h<=f;++h){const m=d[h];m.skip||a(m,c,h)}}}function I2(t){const e=t.indexOf("x")!==-1,n=t.indexOf("y")!==-1;return function(a,i){const r=e?Math.abs(a.x-i.x):0,s=n?Math.abs(a.y-i.y):0;return Math.sqrt(Math.pow(r,2)+Math.pow(s,2))}}function Io(t,e,n,a,i){const r=[];return!i&&!t.isPointInArea(e)||io(t,n,e,function(l,o,c){!i&&!sn(l,t.chartArea,0)||l.inRange(e.x,e.y,a)&&r.push({element:l,datasetIndex:o,index:c})},!0),r}function $2(t,e,n,a){let i=[];function r(s,l,o){const{startAngle:c,endAngle:d}=s.getProps(["startAngle","endAngle"],a),{angle:u}=Fm(s,{x:e.x,y:e.y});Rr(u,c,d)&&i.push({element:s,datasetIndex:l,index:o})}return io(t,n,e,r),i}function t1(t,e,n,a,i,r){let s=[];const l=I2(n);let o=Number.POSITIVE_INFINITY;function c(d,u,f){const h=d.inRange(e.x,e.y,i);if(a&&!h)return;const m=d.getCenterPoint(i);if(!(!!r||t.isPointInArea(m))&&!h)return;const v=l(e,m);v<o?(s=[{element:d,datasetIndex:u,index:f}],o=v):v===o&&s.push({element:d,datasetIndex:u,index:f})}return io(t,n,e,c),s}function $o(t,e,n,a,i,r){return!r&&!t.isPointInArea(e)?[]:n==="r"&&!a?$2(t,e,n,i):t1(t,e,n,a,i,r)}function Xh(t,e,n,a,i){const r=[],s=n==="x"?"inXRange":"inYRange";let l=!1;return io(t,n,e,(o,c,d)=>{o[s]&&o[s](e[n],i)&&(r.push({element:o,datasetIndex:c,index:d}),l=l||o.inRange(e.x,e.y,i))}),a&&!l?[]:r}var e1={modes:{index(t,e,n,a){const i=oa(e,t),r=n.axis||"x",s=n.includeInvisible||!1,l=n.intersect?Io(t,i,r,a,s):$o(t,i,r,!1,a,s),o=[];return l.length?(t.getSortedVisibleDatasetMetas().forEach(c=>{const d=l[0].index,u=c.data[d];u&&!u.skip&&o.push({element:u,datasetIndex:c.index,index:d})}),o):[]},dataset(t,e,n,a){const i=oa(e,t),r=n.axis||"xy",s=n.includeInvisible||!1;let l=n.intersect?Io(t,i,r,a,s):$o(t,i,r,!1,a,s);if(l.length>0){const o=l[0].datasetIndex,c=t.getDatasetMeta(o).data;l=[];for(let d=0;d<c.length;++d)l.push({element:c[d],datasetIndex:o,index:d})}return l},point(t,e,n,a){const i=oa(e,t),r=n.axis||"xy",s=n.includeInvisible||!1;return Io(t,i,r,a,s)},nearest(t,e,n,a){const i=oa(e,t),r=n.axis||"xy",s=n.includeInvisible||!1;return $o(t,i,r,n.intersect,a,s)},x(t,e,n,a){const i=oa(e,t);return Xh(t,i,"x",n.intersect,a)},y(t,e,n,a){const i=oa(e,t);return Xh(t,i,"y",n.intersect,a)}}};const mb=["left","top","right","bottom"];function Ni(t,e){return t.filter(n=>n.pos===e)}function Fh(t,e){return t.filter(n=>mb.indexOf(n.pos)===-1&&n.box.axis===e)}function ji(t,e){return t.sort((n,a)=>{const i=e?a:n,r=e?n:a;return i.weight===r.weight?i.index-r.index:i.weight-r.weight})}function n1(t){const e=[];let n,a,i,r,s,l;for(n=0,a=(t||[]).length;n<a;++n)i=t[n],{position:r,options:{stack:s,stackWeight:l=1}}=i,e.push({index:n,box:i,pos:r,horizontal:i.isHorizontal(),weight:i.weight,stack:s&&r+s,stackWeight:l});return e}function a1(t){const e={};for(const n of t){const{stack:a,pos:i,stackWeight:r}=n;if(!a||!mb.includes(i))continue;const s=e[a]||(e[a]={count:0,placed:0,weight:0,size:0});s.count++,s.weight+=r}return e}function i1(t,e){const n=a1(t),{vBoxMaxWidth:a,hBoxMaxHeight:i}=e;let r,s,l;for(r=0,s=t.length;r<s;++r){l=t[r];const{fullSize:o}=l.box,c=n[l.stack],d=c&&l.stackWeight/c.weight;l.horizontal?(l.width=d?d*a:o&&e.availableWidth,l.height=i):(l.width=a,l.height=d?d*i:o&&e.availableHeight)}return n}function r1(t){const e=n1(t),n=ji(e.filter(c=>c.box.fullSize),!0),a=ji(Ni(e,"left"),!0),i=ji(Ni(e,"right")),r=ji(Ni(e,"top"),!0),s=ji(Ni(e,"bottom")),l=Fh(e,"x"),o=Fh(e,"y");return{fullSize:n,leftAndTop:a.concat(r),rightAndBottom:i.concat(o).concat(s).concat(l),chartArea:Ni(e,"chartArea"),vertical:a.concat(i).concat(o),horizontal:r.concat(s).concat(l)}}function Qh(t,e,n,a){return Math.max(t[n],e[n])+Math.max(t[a],e[a])}function bb(t,e){t.top=Math.max(t.top,e.top),t.left=Math.max(t.left,e.left),t.bottom=Math.max(t.bottom,e.bottom),t.right=Math.max(t.right,e.right)}function s1(t,e,n,a){const{pos:i,box:r}=n,s=t.maxPadding;if(!X(i)){n.size&&(t[i]-=n.size);const u=a[n.stack]||{size:0,count:1};u.size=Math.max(u.size,n.horizontal?r.height:r.width),n.size=u.size/u.count,t[i]+=n.size}r.getPadding&&bb(s,r.getPadding());const l=Math.max(0,e.outerWidth-Qh(s,t,"left","right")),o=Math.max(0,e.outerHeight-Qh(s,t,"top","bottom")),c=l!==t.w,d=o!==t.h;return t.w=l,t.h=o,n.horizontal?{same:c,other:d}:{same:d,other:c}}function l1(t){const e=t.maxPadding;function n(a){const i=Math.max(e[a]-t[a],0);return t[a]+=i,i}t.y+=n("top"),t.x+=n("left"),n("right"),n("bottom")}function o1(t,e){const n=e.maxPadding;function a(i){const r={left:0,top:0,right:0,bottom:0};return i.forEach(s=>{r[s]=Math.max(e[s],n[s])}),r}return a(t?["left","right"]:["top","bottom"])}function Zi(t,e,n,a){const i=[];let r,s,l,o,c,d;for(r=0,s=t.length,c=0;r<s;++r){l=t[r],o=l.box,o.update(l.width||e.w,l.height||e.h,o1(l.horizontal,e));const{same:u,other:f}=s1(e,n,l,a);c|=u&&i.length,d=d||f,o.fullSize||i.push(l)}return c&&Zi(i,e,n,a)||d}function _s(t,e,n,a,i){t.top=n,t.left=e,t.right=e+a,t.bottom=n+i,t.width=a,t.height=i}function Zh(t,e,n,a){const i=n.padding;let{x:r,y:s}=e;for(const l of t){const o=l.box,c=a[l.stack]||{placed:0,weight:1},d=l.stackWeight/c.weight||1;if(l.horizontal){const u=e.w*d,f=c.size||o.height;zr(c.start)&&(s=c.start),o.fullSize?_s(o,i.left,s,n.outerWidth-i.right-i.left,f):_s(o,e.left+c.placed,s,u,f),c.start=s,c.placed+=u,s=o.bottom}else{const u=e.h*d,f=c.size||o.width;zr(c.start)&&(r=c.start),o.fullSize?_s(o,r,i.top,f,n.outerHeight-i.bottom-i.top):_s(o,r,e.top+c.placed,f,u),c.start=r,c.placed+=u,r=o.right}}e.x=r,e.y=s}var Ut={addBox(t,e){t.boxes||(t.boxes=[]),e.fullSize=e.fullSize||!1,e.position=e.position||"top",e.weight=e.weight||0,e._layers=e._layers||function(){return[{z:0,draw(n){e.draw(n)}}]},t.boxes.push(e)},removeBox(t,e){const n=t.boxes?t.boxes.indexOf(e):-1;n!==-1&&t.boxes.splice(n,1)},configure(t,e,n){e.fullSize=n.fullSize,e.position=n.position,e.weight=n.weight},update(t,e,n,a){if(!t)return;const i=Vt(t.options.layout.padding),r=Math.max(e-i.width,0),s=Math.max(n-i.height,0),l=r1(t.boxes),o=l.vertical,c=l.horizontal;J(t.boxes,b=>{typeof b.beforeLayout=="function"&&b.beforeLayout()});const d=o.reduce((b,v)=>v.box.options&&v.box.options.display===!1?b:b+1,0)||1,u=Object.freeze({outerWidth:e,outerHeight:n,padding:i,availableWidth:r,availableHeight:s,vBoxMaxWidth:r/2/d,hBoxMaxHeight:s/2}),f=Object.assign({},i);bb(f,Vt(a));const h=Object.assign({maxPadding:f,w:r,h:s,x:i.left,y:i.top},i),m=i1(o.concat(c),u);Zi(l.fullSize,h,u,m),Zi(o,h,u,m),Zi(c,h,u,m)&&Zi(o,h,u,m),l1(h),Zh(l.leftAndTop,h,u,m),h.x+=h.w,h.y+=h.h,Zh(l.rightAndBottom,h,u,m),t.chartArea={left:h.left,top:h.top,right:h.left+h.w,bottom:h.top+h.h,height:h.h,width:h.w},J(l.chartArea,b=>{const v=b.box;Object.assign(v,t.chartArea),v.update(h.w,h.h,{left:0,top:0,right:0,bottom:0})})}};class yb{acquireContext(e,n){}releaseContext(e){return!1}addEventListener(e,n,a){}removeEventListener(e,n,a){}getDevicePixelRatio(){return 1}getMaximumSize(e,n,a,i){return n=Math.max(0,n||e.width),a=a||e.height,{width:n,height:Math.max(0,i?Math.floor(n/i):a)}}isAttached(e){return!0}updateConfig(e){}}class c1 extends yb{acquireContext(e){return e&&e.getContext&&e.getContext("2d")||null}updateConfig(e){e.options.animation=!1}}const Ks="$chartjs",d1={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Kh=t=>t===null||t==="";function u1(t,e){const n=t.style,a=t.getAttribute("height"),i=t.getAttribute("width");if(t[Ks]={initial:{height:a,width:i,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||"block",n.boxSizing=n.boxSizing||"border-box",Kh(i)){const r=Eh(t,"width");r!==void 0&&(t.width=r)}if(Kh(a))if(t.style.height==="")t.height=t.width/(e||2);else{const r=Eh(t,"height");r!==void 0&&(t.height=r)}return t}const vb=f2?{passive:!0}:!1;function f1(t,e,n){t&&t.addEventListener(e,n,vb)}function h1(t,e,n){t&&t.canvas&&t.canvas.removeEventListener(e,n,vb)}function p1(t,e){const n=d1[t.type]||t.type,{x:a,y:i}=oa(t,e);return{type:n,chart:e,native:t,x:a!==void 0?a:null,y:i!==void 0?i:null}}function zl(t,e){for(const n of t)if(n===e||n.contains(e))return!0}function g1(t,e,n){const a=t.canvas,i=new MutationObserver(r=>{let s=!1;for(const l of r)s=s||zl(l.addedNodes,a),s=s&&!zl(l.removedNodes,a);s&&n()});return i.observe(document,{childList:!0,subtree:!0}),i}function m1(t,e,n){const a=t.canvas,i=new MutationObserver(r=>{let s=!1;for(const l of r)s=s||zl(l.removedNodes,a),s=s&&!zl(l.addedNodes,a);s&&n()});return i.observe(document,{childList:!0,subtree:!0}),i}const Br=new Map;let Ph=0;function xb(){const t=window.devicePixelRatio;t!==Ph&&(Ph=t,Br.forEach((e,n)=>{n.currentDevicePixelRatio!==t&&e()}))}function b1(t,e){Br.size||window.addEventListener("resize",xb),Br.set(t,e)}function y1(t){Br.delete(t),Br.size||window.removeEventListener("resize",xb)}function v1(t,e,n){const a=t.canvas,i=a&&Lu(a);if(!i)return;const r=Pm((l,o)=>{const c=i.clientWidth;n(l,o),c<i.clientWidth&&n()},window),s=new ResizeObserver(l=>{const o=l[0],c=o.contentRect.width,d=o.contentRect.height;c===0&&d===0||r(c,d)});return s.observe(i),b1(t,r),s}function tc(t,e,n){n&&n.disconnect(),e==="resize"&&y1(t)}function x1(t,e,n){const a=t.canvas,i=Pm(r=>{t.ctx!==null&&n(p1(r,t))},t);return f1(a,e,i),i}class _1 extends yb{acquireContext(e,n){const a=e&&e.getContext&&e.getContext("2d");return a&&a.canvas===e?(u1(e,n),a):null}releaseContext(e){const n=e.canvas;if(!n[Ks])return!1;const a=n[Ks].initial;["height","width"].forEach(r=>{const s=a[r];G(s)?n.removeAttribute(r):n.setAttribute(r,s)});const i=a.style||{};return Object.keys(i).forEach(r=>{n.style[r]=i[r]}),n.width=n.width,delete n[Ks],!0}addEventListener(e,n,a){this.removeEventListener(e,n);const i=e.$proxies||(e.$proxies={}),s={attach:g1,detach:m1,resize:v1}[n]||x1;i[n]=s(e,n,a)}removeEventListener(e,n){const a=e.$proxies||(e.$proxies={}),i=a[n];if(!i)return;({attach:tc,detach:tc,resize:tc}[n]||h1)(e,n,i),a[n]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(e,n,a,i){return u2(e,n,a,i)}isAttached(e){const n=e&&Lu(e);return!!(n&&n.isConnected)}}function k1(t){return!Ru()||typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas?c1:_1}class De{constructor(){D(this,"x");D(this,"y");D(this,"active",!1);D(this,"options");D(this,"$animations")}tooltipPosition(e){const{x:n,y:a}=this.getProps(["x","y"],e);return{x:n,y:a}}hasValue(){return mi(this.x)&&mi(this.y)}getProps(e,n){const a=this.$animations;if(!n||!a)return this;const i={};return e.forEach(r=>{i[r]=a[r]&&a[r].active()?a[r]._to:this[r]}),i}}D(De,"defaults",{}),D(De,"defaultRoutes");function S1(t,e){const n=t.options.ticks,a=w1(t),i=Math.min(n.maxTicksLimit||a,a),r=n.major.enabled?A1(e):[],s=r.length,l=r[0],o=r[s-1],c=[];if(s>i)return T1(e,c,r,s/i),c;const d=M1(r,e,i);if(s>0){let u,f;const h=s>1?Math.round((o-l)/(s-1)):null;for(ks(e,c,d,G(h)?0:l-h,l),u=0,f=s-1;u<f;u++)ks(e,c,d,r[u],r[u+1]);return ks(e,c,d,o,G(h)?e.length:o+h),c}return ks(e,c,d),c}function w1(t){const e=t.options.offset,n=t._tickSize(),a=t._length/n+(e?0:1),i=t._maxLength/n;return Math.floor(Math.min(a,i))}function M1(t,e,n){const a=D1(t),i=e.length/n;if(!a)return Math.max(i,1);const r=p_(a);for(let s=0,l=r.length-1;s<l;s++){const o=r[s];if(o>i)return o}return Math.max(i,1)}function A1(t){const e=[];let n,a;for(n=0,a=t.length;n<a;n++)t[n].major&&e.push(n);return e}function T1(t,e,n,a){let i=0,r=n[0],s;for(a=Math.ceil(a),s=0;s<t.length;s++)s===r&&(e.push(t[s]),i++,r=n[i*a])}function ks(t,e,n,a,i){const r=B(a,0),s=Math.min(B(i,t.length),t.length);let l=0,o,c,d;for(n=Math.ceil(n),i&&(o=i-a,n=o/Math.floor(o/n)),d=r;d<0;)l++,d=Math.round(r+l*n);for(c=Math.max(r,0);c<s;c++)c===d&&(e.push(t[c]),l++,d=Math.round(r+l*n))}function D1(t){const e=t.length;let n,a;if(e<2)return!1;for(a=t[0],n=1;n<e;++n)if(t[n]-t[n-1]!==a)return!1;return a}const C1=t=>t==="left"?"right":t==="right"?"left":t,Wh=(t,e,n)=>e==="top"||e==="left"?t[e]+n:t[e]-n,Jh=(t,e)=>Math.min(e||t,t);function Ih(t,e){const n=[],a=t.length/e,i=t.length;let r=0;for(;r<i;r+=a)n.push(t[Math.floor(r)]);return n}function O1(t,e,n){const a=t.ticks.length,i=Math.min(e,a-1),r=t._startPixel,s=t._endPixel,l=1e-6;let o=t.getPixelForTick(i),c;if(!(n&&(a===1?c=Math.max(o-r,s-o):e===0?c=(t.getPixelForTick(1)-o)/2:c=(o-t.getPixelForTick(i-1))/2,o+=i<e?c:-c,o<r-l||o>s+l)))return o}function E1(t,e){J(t,n=>{const a=n.gc,i=a.length/2;let r;if(i>e){for(r=0;r<i;++r)delete n.data[a[r]];a.splice(0,i)}})}function Hi(t){return t.drawTicks?t.tickLength:0}function $h(t,e){if(!t.display)return 0;const n=Mt(t.font,e),a=Vt(t.padding);return(ut(t.text)?t.text.length:1)*n.lineHeight+a.height}function z1(t,e){return Jn(t,{scale:e,type:"scale"})}function R1(t,e,n){return Jn(t,{tick:n,index:e,type:"tick"})}function L1(t,e,n){let a=Tu(t);return(n&&e!=="right"||!n&&e==="right")&&(a=C1(a)),a}function B1(t,e,n,a){const{top:i,left:r,bottom:s,right:l,chart:o}=t,{chartArea:c,scales:d}=o;let u=0,f,h,m;const b=s-i,v=l-r;if(t.isHorizontal()){if(h=Nt(a,r,l),X(n)){const p=Object.keys(n)[0],g=n[p];m=d[p].getPixelForValue(g)+b-e}else n==="center"?m=(c.bottom+c.top)/2+b-e:m=Wh(t,n,e);f=l-r}else{if(X(n)){const p=Object.keys(n)[0],g=n[p];h=d[p].getPixelForValue(g)-v+e}else n==="center"?h=(c.left+c.right)/2-v+e:h=Wh(t,n,e);m=Nt(a,s,i),u=n==="left"?-bt:bt}return{titleX:h,titleY:m,maxWidth:f,rotation:u}}class Oa extends De{constructor(e){super(),this.id=e.id,this.type=e.type,this.options=void 0,this.ctx=e.ctx,this.chart=e.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(e){this.options=e.setContext(this.getContext()),this.axis=e.axis,this._userMin=this.parse(e.min),this._userMax=this.parse(e.max),this._suggestedMin=this.parse(e.suggestedMin),this._suggestedMax=this.parse(e.suggestedMax)}parse(e,n){return e}getUserBounds(){let{_userMin:e,_userMax:n,_suggestedMin:a,_suggestedMax:i}=this;return e=ee(e,Number.POSITIVE_INFINITY),n=ee(n,Number.NEGATIVE_INFINITY),a=ee(a,Number.POSITIVE_INFINITY),i=ee(i,Number.NEGATIVE_INFINITY),{min:ee(e,a),max:ee(n,i),minDefined:gt(e),maxDefined:gt(n)}}getMinMax(e){let{min:n,max:a,minDefined:i,maxDefined:r}=this.getUserBounds(),s;if(i&&r)return{min:n,max:a};const l=this.getMatchingVisibleMetas();for(let o=0,c=l.length;o<c;++o)s=l[o].controller.getMinMax(this,e),i||(n=Math.min(n,s.min)),r||(a=Math.max(a,s.max));return n=r&&n>a?a:n,a=i&&n>a?n:a,{min:ee(n,ee(a,n)),max:ee(a,ee(n,a))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const e=this.chart.data;return this.options.labels||(this.isHorizontal()?e.xLabels:e.yLabels)||e.labels||[]}getLabelItems(e=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(e))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){nt(this.options.beforeUpdate,[this])}update(e,n,a){const{beginAtZero:i,grace:r,ticks:s}=this.options,l=s.sampleSize;this.beforeUpdate(),this.maxWidth=e,this.maxHeight=n,this._margins=a=Object.assign({left:0,right:0,top:0,bottom:0},a),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+a.left+a.right:this.height+a.top+a.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=q_(this,r,i),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const o=l<this.ticks.length;this._convertTicksToLabels(o?Ih(this.ticks,l):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),s.display&&(s.autoSkip||s.source==="auto")&&(this.ticks=S1(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),o&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let e=this.options.reverse,n,a;this.isHorizontal()?(n=this.left,a=this.right):(n=this.top,a=this.bottom,e=!e),this._startPixel=n,this._endPixel=a,this._reversePixels=e,this._length=a-n,this._alignToPixels=this.options.alignToPixels}afterUpdate(){nt(this.options.afterUpdate,[this])}beforeSetDimensions(){nt(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){nt(this.options.afterSetDimensions,[this])}_callHooks(e){this.chart.notifyPlugins(e,this.getContext()),nt(this.options[e],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){nt(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(e){const n=this.options.ticks;let a,i,r;for(a=0,i=e.length;a<i;a++)r=e[a],r.label=nt(n.callback,[r.value,a,e],this)}afterTickToLabelConversion(){nt(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){nt(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const e=this.options,n=e.ticks,a=Jh(this.ticks.length,e.ticks.maxTicksLimit),i=n.minRotation||0,r=n.maxRotation;let s=i,l,o,c;if(!this._isVisible()||!n.display||i>=r||a<=1||!this.isHorizontal()){this.labelRotation=i;return}const d=this._getLabelSizes(),u=d.widest.width,f=d.highest.height,h=Ct(this.chart.width-u,0,this.maxWidth);l=e.offset?this.maxWidth/a:h/(a-1),u+6>l&&(l=h/(a-(e.offset?.5:1)),o=this.maxHeight-Hi(e.grid)-n.padding-$h(e.title,this.chart.options.font),c=Math.sqrt(u*u+f*f),s=Mu(Math.min(Math.asin(Ct((d.highest.height+6)/l,-1,1)),Math.asin(Ct(o/c,-1,1))-Math.asin(Ct(f/c,-1,1)))),s=Math.max(i,Math.min(r,s))),this.labelRotation=s}afterCalculateLabelRotation(){nt(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){nt(this.options.beforeFit,[this])}fit(){const e={width:0,height:0},{chart:n,options:{ticks:a,title:i,grid:r}}=this,s=this._isVisible(),l=this.isHorizontal();if(s){const o=$h(i,n.options.font);if(l?(e.width=this.maxWidth,e.height=Hi(r)+o):(e.height=this.maxHeight,e.width=Hi(r)+o),a.display&&this.ticks.length){const{first:c,last:d,widest:u,highest:f}=this._getLabelSizes(),h=a.padding*2,m=Ae(this.labelRotation),b=Math.cos(m),v=Math.sin(m);if(l){const p=a.mirror?0:v*u.width+b*f.height;e.height=Math.min(this.maxHeight,e.height+p+h)}else{const p=a.mirror?0:b*u.width+v*f.height;e.width=Math.min(this.maxWidth,e.width+p+h)}this._calculatePadding(c,d,v,b)}}this._handleMargins(),l?(this.width=this._length=n.width-this._margins.left-this._margins.right,this.height=e.height):(this.width=e.width,this.height=this._length=n.height-this._margins.top-this._margins.bottom)}_calculatePadding(e,n,a,i){const{ticks:{align:r,padding:s},position:l}=this.options,o=this.labelRotation!==0,c=l!=="top"&&this.axis==="x";if(this.isHorizontal()){const d=this.getPixelForTick(0)-this.left,u=this.right-this.getPixelForTick(this.ticks.length-1);let f=0,h=0;o?c?(f=i*e.width,h=a*n.height):(f=a*e.height,h=i*n.width):r==="start"?h=n.width:r==="end"?f=e.width:r!=="inner"&&(f=e.width/2,h=n.width/2),this.paddingLeft=Math.max((f-d+s)*this.width/(this.width-d),0),this.paddingRight=Math.max((h-u+s)*this.width/(this.width-u),0)}else{let d=n.height/2,u=e.height/2;r==="start"?(d=0,u=e.height):r==="end"&&(d=n.height,u=0),this.paddingTop=d+s,this.paddingBottom=u+s}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){nt(this.options.afterFit,[this])}isHorizontal(){const{axis:e,position:n}=this.options;return n==="top"||n==="bottom"||e==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(e){this.beforeTickToLabelConversion(),this.generateTickLabels(e);let n,a;for(n=0,a=e.length;n<a;n++)G(e[n].label)&&(e.splice(n,1),a--,n--);this.afterTickToLabelConversion()}_getLabelSizes(){let e=this._labelSizes;if(!e){const n=this.options.ticks.sampleSize;let a=this.ticks;n<a.length&&(a=Ih(a,n)),this._labelSizes=e=this._computeLabelSizes(a,a.length,this.options.ticks.maxTicksLimit)}return e}_computeLabelSizes(e,n,a){const{ctx:i,_longestTextCache:r}=this,s=[],l=[],o=Math.floor(n/Jh(n,a));let c=0,d=0,u,f,h,m,b,v,p,g,y,x,_;for(u=0;u<n;u+=o){if(m=e[u].label,b=this._resolveTickFontOptions(u),i.font=v=b.string,p=r[v]=r[v]||{data:{},gc:[]},g=b.lineHeight,y=x=0,!G(m)&&!ut(m))y=Ol(i,p.data,p.gc,y,m),x=g;else if(ut(m))for(f=0,h=m.length;f<h;++f)_=m[f],!G(_)&&!ut(_)&&(y=Ol(i,p.data,p.gc,y,_),x+=g);s.push(y),l.push(x),c=Math.max(y,c),d=Math.max(x,d)}E1(r,n);const w=s.indexOf(c),k=l.indexOf(d),S=A=>({width:s[A]||0,height:l[A]||0});return{first:S(0),last:S(n-1),widest:S(w),highest:S(k),widths:s,heights:l}}getLabelForValue(e){return e}getPixelForValue(e,n){return NaN}getValueForPixel(e){}getPixelForTick(e){const n=this.ticks;return e<0||e>n.length-1?null:this.getPixelForValue(n[e].value)}getPixelForDecimal(e){this._reversePixels&&(e=1-e);const n=this._startPixel+e*this._length;return y_(this._alignToPixels?ea(this.chart,n,0):n)}getDecimalForPixel(e){const n=(e-this._startPixel)/this._length;return this._reversePixels?1-n:n}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:e,max:n}=this;return e<0&&n<0?n:e>0&&n>0?e:0}getContext(e){const n=this.ticks||[];if(e>=0&&e<n.length){const a=n[e];return a.$context||(a.$context=R1(this.getContext(),e,a))}return this.$context||(this.$context=z1(this.chart.getContext(),this))}_tickSize(){const e=this.options.ticks,n=Ae(this.labelRotation),a=Math.abs(Math.cos(n)),i=Math.abs(Math.sin(n)),r=this._getLabelSizes(),s=e.autoSkipPadding||0,l=r?r.widest.width+s:0,o=r?r.highest.height+s:0;return this.isHorizontal()?o*a>l*i?l/a:o/i:o*i<l*a?o/a:l/i}_isVisible(){const e=this.options.display;return e!=="auto"?!!e:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(e){const n=this.axis,a=this.chart,i=this.options,{grid:r,position:s,border:l}=i,o=r.offset,c=this.isHorizontal(),u=this.ticks.length+(o?1:0),f=Hi(r),h=[],m=l.setContext(this.getContext()),b=m.display?m.width:0,v=b/2,p=function(T){return ea(a,T,b)};let g,y,x,_,w,k,S,A,C,z,N,vt;if(s==="top")g=p(this.bottom),k=this.bottom-f,A=g-v,z=p(e.top)+v,vt=e.bottom;else if(s==="bottom")g=p(this.top),z=e.top,vt=p(e.bottom)-v,k=g+v,A=this.top+f;else if(s==="left")g=p(this.right),w=this.right-f,S=g-v,C=p(e.left)+v,N=e.right;else if(s==="right")g=p(this.left),C=e.left,N=p(e.right)-v,w=g+v,S=this.left+f;else if(n==="x"){if(s==="center")g=p((e.top+e.bottom)/2+.5);else if(X(s)){const T=Object.keys(s)[0],E=s[T];g=p(this.chart.scales[T].getPixelForValue(E))}z=e.top,vt=e.bottom,k=g+v,A=k+f}else if(n==="y"){if(s==="center")g=p((e.left+e.right)/2);else if(X(s)){const T=Object.keys(s)[0],E=s[T];g=p(this.chart.scales[T].getPixelForValue(E))}w=g-v,S=w-f,C=e.left,N=e.right}const Yt=B(i.ticks.maxTicksLimit,u),Q=Math.max(1,Math.ceil(u/Yt));for(y=0;y<u;y+=Q){const T=this.getContext(y),E=r.setContext(T),R=l.setContext(T),U=E.lineWidth,it=E.color,Ve=R.dash||[],Se=R.dashOffset,Ye=E.tickWidth,Gt=E.tickColor,Oe=E.tickBorderDash||[],In=E.tickBorderDashOffset;x=O1(this,y,o),x!==void 0&&(_=ea(a,x,U),c?w=S=C=N=_:k=A=z=vt=_,h.push({tx1:w,ty1:k,tx2:S,ty2:A,x1:C,y1:z,x2:N,y2:vt,width:U,color:it,borderDash:Ve,borderDashOffset:Se,tickWidth:Ye,tickColor:Gt,tickBorderDash:Oe,tickBorderDashOffset:In}))}return this._ticksLength=u,this._borderValue=g,h}_computeLabelItems(e){const n=this.axis,a=this.options,{position:i,ticks:r}=a,s=this.isHorizontal(),l=this.ticks,{align:o,crossAlign:c,padding:d,mirror:u}=r,f=Hi(a.grid),h=f+d,m=u?-d:h,b=-Ae(this.labelRotation),v=[];let p,g,y,x,_,w,k,S,A,C,z,N,vt="middle";if(i==="top")w=this.bottom-m,k=this._getXAxisLabelAlignment();else if(i==="bottom")w=this.top+m,k=this._getXAxisLabelAlignment();else if(i==="left"){const Q=this._getYAxisLabelAlignment(f);k=Q.textAlign,_=Q.x}else if(i==="right"){const Q=this._getYAxisLabelAlignment(f);k=Q.textAlign,_=Q.x}else if(n==="x"){if(i==="center")w=(e.top+e.bottom)/2+h;else if(X(i)){const Q=Object.keys(i)[0],T=i[Q];w=this.chart.scales[Q].getPixelForValue(T)+h}k=this._getXAxisLabelAlignment()}else if(n==="y"){if(i==="center")_=(e.left+e.right)/2-h;else if(X(i)){const Q=Object.keys(i)[0],T=i[Q];_=this.chart.scales[Q].getPixelForValue(T)}k=this._getYAxisLabelAlignment(f).textAlign}n==="y"&&(o==="start"?vt="top":o==="end"&&(vt="bottom"));const Yt=this._getLabelSizes();for(p=0,g=l.length;p<g;++p){y=l[p],x=y.label;const Q=r.setContext(this.getContext(p));S=this.getPixelForTick(p)+r.labelOffset,A=this._resolveTickFontOptions(p),C=A.lineHeight,z=ut(x)?x.length:1;const T=z/2,E=Q.color,R=Q.textStrokeColor,U=Q.textStrokeWidth;let it=k;s?(_=S,k==="inner"&&(p===g-1?it=this.options.reverse?"left":"right":p===0?it=this.options.reverse?"right":"left":it="center"),i==="top"?c==="near"||b!==0?N=-z*C+C/2:c==="center"?N=-Yt.highest.height/2-T*C+C:N=-Yt.highest.height+C/2:c==="near"||b!==0?N=C/2:c==="center"?N=Yt.highest.height/2-T*C:N=Yt.highest.height-z*C,u&&(N*=-1),b!==0&&!Q.showLabelBackdrop&&(_+=C/2*Math.sin(b))):(w=S,N=(1-z)*C/2);let Ve;if(Q.showLabelBackdrop){const Se=Vt(Q.backdropPadding),Ye=Yt.heights[p],Gt=Yt.widths[p];let Oe=N-Se.top,In=0-Se.left;switch(vt){case"middle":Oe-=Ye/2;break;case"bottom":Oe-=Ye;break}switch(k){case"center":In-=Gt/2;break;case"right":In-=Gt;break;case"inner":p===g-1?In-=Gt:p>0&&(In-=Gt/2);break}Ve={left:In,top:Oe,width:Gt+Se.width,height:Ye+Se.height,color:Q.backdropColor}}v.push({label:x,font:A,textOffset:N,options:{rotation:b,color:E,strokeColor:R,strokeWidth:U,textAlign:it,textBaseline:vt,translation:[_,w],backdrop:Ve}})}return v}_getXAxisLabelAlignment(){const{position:e,ticks:n}=this.options;if(-Ae(this.labelRotation))return e==="top"?"left":"right";let i="center";return n.align==="start"?i="left":n.align==="end"?i="right":n.align==="inner"&&(i="inner"),i}_getYAxisLabelAlignment(e){const{position:n,ticks:{crossAlign:a,mirror:i,padding:r}}=this.options,s=this._getLabelSizes(),l=e+r,o=s.widest.width;let c,d;return n==="left"?i?(d=this.right+r,a==="near"?c="left":a==="center"?(c="center",d+=o/2):(c="right",d+=o)):(d=this.right-l,a==="near"?c="right":a==="center"?(c="center",d-=o/2):(c="left",d=this.left)):n==="right"?i?(d=this.left+r,a==="near"?c="right":a==="center"?(c="center",d-=o/2):(c="left",d-=o)):(d=this.left+l,a==="near"?c="left":a==="center"?(c="center",d+=o/2):(c="right",d=this.right)):c="right",{textAlign:c,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;const e=this.chart,n=this.options.position;if(n==="left"||n==="right")return{top:0,left:this.left,bottom:e.height,right:this.right};if(n==="top"||n==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:e.width}}drawBackground(){const{ctx:e,options:{backgroundColor:n},left:a,top:i,width:r,height:s}=this;n&&(e.save(),e.fillStyle=n,e.fillRect(a,i,r,s),e.restore())}getLineWidthForValue(e){const n=this.options.grid;if(!this._isVisible()||!n.display)return 0;const i=this.ticks.findIndex(r=>r.value===e);return i>=0?n.setContext(this.getContext(i)).lineWidth:0}drawGrid(e){const n=this.options.grid,a=this.ctx,i=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(e));let r,s;const l=(o,c,d)=>{!d.width||!d.color||(a.save(),a.lineWidth=d.width,a.strokeStyle=d.color,a.setLineDash(d.borderDash||[]),a.lineDashOffset=d.borderDashOffset,a.beginPath(),a.moveTo(o.x,o.y),a.lineTo(c.x,c.y),a.stroke(),a.restore())};if(n.display)for(r=0,s=i.length;r<s;++r){const o=i[r];n.drawOnChartArea&&l({x:o.x1,y:o.y1},{x:o.x2,y:o.y2},o),n.drawTicks&&l({x:o.tx1,y:o.ty1},{x:o.tx2,y:o.ty2},{color:o.tickColor,width:o.tickWidth,borderDash:o.tickBorderDash,borderDashOffset:o.tickBorderDashOffset})}}drawBorder(){const{chart:e,ctx:n,options:{border:a,grid:i}}=this,r=a.setContext(this.getContext()),s=a.display?r.width:0;if(!s)return;const l=i.setContext(this.getContext(0)).lineWidth,o=this._borderValue;let c,d,u,f;this.isHorizontal()?(c=ea(e,this.left,s)-s/2,d=ea(e,this.right,l)+l/2,u=f=o):(u=ea(e,this.top,s)-s/2,f=ea(e,this.bottom,l)+l/2,c=d=o),n.save(),n.lineWidth=r.width,n.strokeStyle=r.color,n.beginPath(),n.moveTo(c,u),n.lineTo(d,f),n.stroke(),n.restore()}drawLabels(e){if(!this.options.ticks.display)return;const a=this.ctx,i=this._computeLabelArea();i&&eo(a,i);const r=this.getLabelItems(e);for(const s of r){const l=s.options,o=s.font,c=s.label,d=s.textOffset;wa(a,c,0,d,o,l)}i&&no(a)}drawTitle(){const{ctx:e,options:{position:n,title:a,reverse:i}}=this;if(!a.display)return;const r=Mt(a.font),s=Vt(a.padding),l=a.align;let o=r.lineHeight/2;n==="bottom"||n==="center"||X(n)?(o+=s.bottom,ut(a.text)&&(o+=r.lineHeight*(a.text.length-1))):o+=s.top;const{titleX:c,titleY:d,maxWidth:u,rotation:f}=B1(this,o,n,l);wa(e,a.text,0,0,r,{color:a.color,maxWidth:u,rotation:f,textAlign:L1(l,n,i),textBaseline:"middle",translation:[c,d]})}draw(e){this._isVisible()&&(this.drawBackground(),this.drawGrid(e),this.drawBorder(),this.drawTitle(),this.drawLabels(e))}_layers(){const e=this.options,n=e.ticks&&e.ticks.z||0,a=B(e.grid&&e.grid.z,-1),i=B(e.border&&e.border.z,0);return!this._isVisible()||this.draw!==Oa.prototype.draw?[{z:n,draw:r=>{this.draw(r)}}]:[{z:a,draw:r=>{this.drawBackground(),this.drawGrid(r),this.drawTitle()}},{z:i,draw:()=>{this.drawBorder()}},{z:n,draw:r=>{this.drawLabels(r)}}]}getMatchingVisibleMetas(e){const n=this.chart.getSortedVisibleDatasetMetas(),a=this.axis+"AxisID",i=[];let r,s;for(r=0,s=n.length;r<s;++r){const l=n[r];l[a]===this.id&&(!e||l.type===e)&&i.push(l)}return i}_resolveTickFontOptions(e){const n=this.options.ticks.setContext(this.getContext(e));return Mt(n.font)}_maxDigits(){const e=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/e}}class Ss{constructor(e,n,a){this.type=e,this.scope=n,this.override=a,this.items=Object.create(null)}isForType(e){return Object.prototype.isPrototypeOf.call(this.type.prototype,e.prototype)}register(e){const n=Object.getPrototypeOf(e);let a;H1(n)&&(a=this.register(n));const i=this.items,r=e.id,s=this.scope+"."+r;if(!r)throw new Error("class does not have id: "+e);return r in i||(i[r]=e,N1(e,s,a),this.override&&ft.override(e.id,e.overrides)),s}get(e){return this.items[e]}unregister(e){const n=this.items,a=e.id,i=this.scope;a in n&&delete n[a],i&&a in ft[i]&&(delete ft[i][a],this.override&&delete Sa[a])}}function N1(t,e,n){const a=Er(Object.create(null),[n?ft.get(n):{},ft.get(e),t.defaults]);ft.set(e,a),t.defaultRoutes&&j1(e,t.defaultRoutes),t.descriptors&&ft.describe(e,t.descriptors)}function j1(t,e){Object.keys(e).forEach(n=>{const a=n.split("."),i=a.pop(),r=[t].concat(a).join("."),s=e[n].split("."),l=s.pop(),o=s.join(".");ft.route(r,i,o,l)})}function H1(t){return"id"in t&&"defaults"in t}class U1{constructor(){this.controllers=new Ss(Te,"datasets",!0),this.elements=new Ss(De,"elements"),this.plugins=new Ss(Object,"plugins"),this.scales=new Ss(Oa,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...e){this._each("register",e)}remove(...e){this._each("unregister",e)}addControllers(...e){this._each("register",e,this.controllers)}addElements(...e){this._each("register",e,this.elements)}addPlugins(...e){this._each("register",e,this.plugins)}addScales(...e){this._each("register",e,this.scales)}getController(e){return this._get(e,this.controllers,"controller")}getElement(e){return this._get(e,this.elements,"element")}getPlugin(e){return this._get(e,this.plugins,"plugin")}getScale(e){return this._get(e,this.scales,"scale")}removeControllers(...e){this._each("unregister",e,this.controllers)}removeElements(...e){this._each("unregister",e,this.elements)}removePlugins(...e){this._each("unregister",e,this.plugins)}removeScales(...e){this._each("unregister",e,this.scales)}_each(e,n,a){[...n].forEach(i=>{const r=a||this._getRegistryForType(i);a||r.isForType(i)||r===this.plugins&&i.id?this._exec(e,r,i):J(i,s=>{const l=a||this._getRegistryForType(s);this._exec(e,l,s)})})}_exec(e,n,a){const i=wu(e);nt(a["before"+i],[],a),n[e](a),nt(a["after"+i],[],a)}_getRegistryForType(e){for(let n=0;n<this._typedRegistries.length;n++){const a=this._typedRegistries[n];if(a.isForType(e))return a}return this.plugins}_get(e,n,a){const i=n.get(e);if(i===void 0)throw new Error('"'+e+'" is not a registered '+a+".");return i}}var ze=new U1;class V1{constructor(){this._init=void 0}notify(e,n,a,i){if(n==="beforeInit"&&(this._init=this._createDescriptors(e,!0),this._notify(this._init,e,"install")),this._init===void 0)return;const r=i?this._descriptors(e).filter(i):this._descriptors(e),s=this._notify(r,e,n,a);return n==="afterDestroy"&&(this._notify(r,e,"stop"),this._notify(this._init,e,"uninstall"),this._init=void 0),s}_notify(e,n,a,i){i=i||{};for(const r of e){const s=r.plugin,l=s[a],o=[n,i,r.options];if(nt(l,o,s)===!1&&i.cancelable)return!1}return!0}invalidate(){G(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(e){if(this._cache)return this._cache;const n=this._cache=this._createDescriptors(e);return this._notifyStateChanges(e),n}_createDescriptors(e,n){const a=e&&e.config,i=B(a.options&&a.options.plugins,{}),r=Y1(a);return i===!1&&!n?[]:q1(e,r,i,n)}_notifyStateChanges(e){const n=this._oldCache||[],a=this._cache,i=(r,s)=>r.filter(l=>!s.some(o=>l.plugin.id===o.plugin.id));this._notify(i(n,a),e,"stop"),this._notify(i(a,n),e,"start")}}function Y1(t){const e={},n=[],a=Object.keys(ze.plugins.items);for(let r=0;r<a.length;r++)n.push(ze.getPlugin(a[r]));const i=t.plugins||[];for(let r=0;r<i.length;r++){const s=i[r];n.indexOf(s)===-1&&(n.push(s),e[s.id]=!0)}return{plugins:n,localIds:e}}function G1(t,e){return!e&&t===!1?null:t===!0?{}:t}function q1(t,{plugins:e,localIds:n},a,i){const r=[],s=t.getContext();for(const l of e){const o=l.id,c=G1(a[o],i);c!==null&&r.push({plugin:l,options:X1(t.config,{plugin:l,local:n[o]},c,s)})}return r}function X1(t,{plugin:e,local:n},a,i){const r=t.pluginScopeKeys(e),s=t.getOptionScopes(a,r);return n&&e.defaults&&s.push(e.defaults),t.createResolver(s,i,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function od(t,e){const n=ft.datasets[t]||{};return((e.datasets||{})[t]||{}).indexAxis||e.indexAxis||n.indexAxis||"x"}function F1(t,e){let n=t;return t==="_index_"?n=e:t==="_value_"&&(n=e==="x"?"y":"x"),n}function Q1(t,e){return t===e?"_index_":"_value_"}function t0(t){if(t==="x"||t==="y"||t==="r")return t}function Z1(t){if(t==="top"||t==="bottom")return"x";if(t==="left"||t==="right")return"y"}function cd(t,...e){if(t0(t))return t;for(const n of e){const a=n.axis||Z1(n.position)||t.length>1&&t0(t[0].toLowerCase());if(a)return a}throw new Error(`Cannot determine type of '${t}' axis. Please provide 'axis' or 'position' option.`)}function e0(t,e,n){if(n[e+"AxisID"]===t)return{axis:e}}function K1(t,e){if(e.data&&e.data.datasets){const n=e.data.datasets.filter(a=>a.xAxisID===t||a.yAxisID===t);if(n.length)return e0(t,"x",n[0])||e0(t,"y",n[0])}return{}}function P1(t,e){const n=Sa[t.type]||{scales:{}},a=e.scales||{},i=od(t.type,e),r=Object.create(null);return Object.keys(a).forEach(s=>{const l=a[s];if(!X(l))return console.error(`Invalid scale configuration for scale: ${s}`);if(l._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${s}`);const o=cd(s,l,K1(s,t),ft.scales[l.type]),c=Q1(o,i),d=n.scales||{};r[s]=ur(Object.create(null),[{axis:o},l,d[o],d[c]])}),t.data.datasets.forEach(s=>{const l=s.type||t.type,o=s.indexAxis||od(l,e),d=(Sa[l]||{}).scales||{};Object.keys(d).forEach(u=>{const f=F1(u,o),h=s[f+"AxisID"]||f;r[h]=r[h]||Object.create(null),ur(r[h],[{axis:f},a[h],d[u]])})}),Object.keys(r).forEach(s=>{const l=r[s];ur(l,[ft.scales[l.type],ft.scale])}),r}function _b(t){const e=t.options||(t.options={});e.plugins=B(e.plugins,{}),e.scales=P1(t,e)}function kb(t){return t=t||{},t.datasets=t.datasets||[],t.labels=t.labels||[],t}function W1(t){return t=t||{},t.data=kb(t.data),_b(t),t}const n0=new Map,Sb=new Set;function ws(t,e){let n=n0.get(t);return n||(n=e(),n0.set(t,n),Sb.add(n)),n}const Ui=(t,e,n)=>{const a=Zn(e,n);a!==void 0&&t.add(a)};class J1{constructor(e){this._config=W1(e),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(e){this._config.type=e}get data(){return this._config.data}set data(e){this._config.data=kb(e)}get options(){return this._config.options}set options(e){this._config.options=e}get plugins(){return this._config.plugins}update(){const e=this._config;this.clearCache(),_b(e)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(e){return ws(e,()=>[[`datasets.${e}`,""]])}datasetAnimationScopeKeys(e,n){return ws(`${e}.transition.${n}`,()=>[[`datasets.${e}.transitions.${n}`,`transitions.${n}`],[`datasets.${e}`,""]])}datasetElementScopeKeys(e,n){return ws(`${e}-${n}`,()=>[[`datasets.${e}.elements.${n}`,`datasets.${e}`,`elements.${n}`,""]])}pluginScopeKeys(e){const n=e.id,a=this.type;return ws(`${a}-plugin-${n}`,()=>[[`plugins.${n}`,...e.additionalOptionScopes||[]]])}_cachedScopes(e,n){const a=this._scopeCache;let i=a.get(e);return(!i||n)&&(i=new Map,a.set(e,i)),i}getOptionScopes(e,n,a){const{options:i,type:r}=this,s=this._cachedScopes(e,a),l=s.get(n);if(l)return l;const o=new Set;n.forEach(d=>{e&&(o.add(e),d.forEach(u=>Ui(o,e,u))),d.forEach(u=>Ui(o,i,u)),d.forEach(u=>Ui(o,Sa[r]||{},u)),d.forEach(u=>Ui(o,ft,u)),d.forEach(u=>Ui(o,rd,u))});const c=Array.from(o);return c.length===0&&c.push(Object.create(null)),Sb.has(n)&&s.set(n,c),c}chartOptionScopes(){const{options:e,type:n}=this;return[e,Sa[n]||{},ft.datasets[n]||{},{type:n},ft,rd]}resolveNamedOptions(e,n,a,i=[""]){const r={$shared:!0},{resolver:s,subPrefixes:l}=a0(this._resolverCache,e,i);let o=s;if($1(s,n)){r.$shared=!1,a=Kn(a)?a():a;const c=this.createResolver(e,a,l);o=bi(s,a,c)}for(const c of n)r[c]=o[c];return r}createResolver(e,n,a=[""],i){const{resolver:r}=a0(this._resolverCache,e,a);return X(n)?bi(r,n,void 0,i):r}}function a0(t,e,n){let a=t.get(e);a||(a=new Map,t.set(e,a));const i=n.join();let r=a.get(i);return r||(r={resolver:Ou(e,n),subPrefixes:n.filter(l=>!l.toLowerCase().includes("hover"))},a.set(i,r)),r}const I1=t=>X(t)&&Object.getOwnPropertyNames(t).some(e=>Kn(t[e]));function $1(t,e){const{isScriptable:n,isIndexable:a}=eb(t);for(const i of e){const r=n(i),s=a(i),l=(s||r)&&t[i];if(r&&(Kn(l)||I1(l))||s&&ut(l))return!0}return!1}var tk="4.5.1";const ek=["top","bottom","left","right","chartArea"];function i0(t,e){return t==="top"||t==="bottom"||ek.indexOf(t)===-1&&e==="x"}function r0(t,e){return function(n,a){return n[t]===a[t]?n[e]-a[e]:n[t]-a[t]}}function s0(t){const e=t.chart,n=e.options.animation;e.notifyPlugins("afterRender"),nt(n&&n.onComplete,[t],e)}function nk(t){const e=t.chart,n=e.options.animation;nt(n&&n.onProgress,[t],e)}function wb(t){return Ru()&&typeof t=="string"?t=document.getElementById(t):t&&t.length&&(t=t[0]),t&&t.canvas&&(t=t.canvas),t}const Ps={},l0=t=>{const e=wb(t);return Object.values(Ps).filter(n=>n.canvas===e).pop()};function ak(t,e,n){const a=Object.keys(t);for(const i of a){const r=+i;if(r>=e){const s=t[i];delete t[i],(n>0||r>e)&&(t[r+n]=s)}}}function ik(t,e,n,a){return!n||t.type==="mouseout"?null:a?e:t}class Ie{static register(...e){ze.add(...e),o0()}static unregister(...e){ze.remove(...e),o0()}constructor(e,n){const a=this.config=new J1(n),i=wb(e),r=l0(i);if(r)throw new Error("Canvas is already in use. Chart with ID '"+r.id+"' must be destroyed before the canvas with ID '"+r.canvas.id+"' can be reused.");const s=a.createResolver(a.chartOptionScopes(),this.getContext());this.platform=new(a.platform||k1(i)),this.platform.updateConfig(a);const l=this.platform.acquireContext(i,s.aspectRatio),o=l&&l.canvas,c=o&&o.height,d=o&&o.width;if(this.id=r_(),this.ctx=l,this.canvas=o,this.width=d,this.height=c,this._options=s,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new V1,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=k_(u=>this.update(u),s.resizeDelay||0),this._dataChanges=[],Ps[this.id]=this,!l||!o){console.error("Failed to create chart: can't acquire context from the given item");return}Ke.listen(this,"complete",s0),Ke.listen(this,"progress",nk),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:e,maintainAspectRatio:n},width:a,height:i,_aspectRatio:r}=this;return G(e)?n&&r?r:i?a/i:null:e}get data(){return this.config.data}set data(e){this.config.data=e}get options(){return this._options}set options(e){this.config.options=e}get registry(){return ze}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():Oh(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Th(this.canvas,this.ctx),this}stop(){return Ke.stop(this),this}resize(e,n){Ke.running(this)?this._resizeBeforeDraw={width:e,height:n}:this._resize(e,n)}_resize(e,n){const a=this.options,i=this.canvas,r=a.maintainAspectRatio&&this.aspectRatio,s=this.platform.getMaximumSize(i,e,n,r),l=a.devicePixelRatio||this.platform.getDevicePixelRatio(),o=this.width?"resize":"attach";this.width=s.width,this.height=s.height,this._aspectRatio=this.aspectRatio,Oh(this,l,!0)&&(this.notifyPlugins("resize",{size:s}),nt(a.onResize,[this,s],this),this.attached&&this._doResize(o)&&this.render())}ensureScalesHaveIDs(){const n=this.options.scales||{};J(n,(a,i)=>{a.id=i})}buildOrUpdateScales(){const e=this.options,n=e.scales,a=this.scales,i=Object.keys(a).reduce((s,l)=>(s[l]=!1,s),{});let r=[];n&&(r=r.concat(Object.keys(n).map(s=>{const l=n[s],o=cd(s,l),c=o==="r",d=o==="x";return{options:l,dposition:c?"chartArea":d?"bottom":"left",dtype:c?"radialLinear":d?"category":"linear"}}))),J(r,s=>{const l=s.options,o=l.id,c=cd(o,l),d=B(l.type,s.dtype);(l.position===void 0||i0(l.position,c)!==i0(s.dposition))&&(l.position=s.dposition),i[o]=!0;let u=null;if(o in a&&a[o].type===d)u=a[o];else{const f=ze.getScale(d);u=new f({id:o,type:d,ctx:this.ctx,chart:this}),a[u.id]=u}u.init(l,e)}),J(i,(s,l)=>{s||delete a[l]}),J(a,s=>{Ut.configure(this,s,s.options),Ut.addBox(this,s)})}_updateMetasets(){const e=this._metasets,n=this.data.datasets.length,a=e.length;if(e.sort((i,r)=>i.index-r.index),a>n){for(let i=n;i<a;++i)this._destroyDatasetMeta(i);e.splice(n,a-n)}this._sortedMetasets=e.slice(0).sort(r0("order","index"))}_removeUnreferencedMetasets(){const{_metasets:e,data:{datasets:n}}=this;e.length>n.length&&delete this._stacks,e.forEach((a,i)=>{n.filter(r=>r===a._dataset).length===0&&this._destroyDatasetMeta(i)})}buildOrUpdateControllers(){const e=[],n=this.data.datasets;let a,i;for(this._removeUnreferencedMetasets(),a=0,i=n.length;a<i;a++){const r=n[a];let s=this.getDatasetMeta(a);const l=r.type||this.config.type;if(s.type&&s.type!==l&&(this._destroyDatasetMeta(a),s=this.getDatasetMeta(a)),s.type=l,s.indexAxis=r.indexAxis||od(l,this.options),s.order=r.order||0,s.index=a,s.label=""+r.label,s.visible=this.isDatasetVisible(a),s.controller)s.controller.updateIndex(a),s.controller.linkScales();else{const o=ze.getController(l),{datasetElementType:c,dataElementType:d}=ft.datasets[l];Object.assign(o,{dataElementType:ze.getElement(d),datasetElementType:c&&ze.getElement(c)}),s.controller=new o(this,a),e.push(s.controller)}}return this._updateMetasets(),e}_resetElements(){J(this.data.datasets,(e,n)=>{this.getDatasetMeta(n).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(e){const n=this.config;n.update();const a=this._options=n.createResolver(n.chartOptionScopes(),this.getContext()),i=this._animationsDisabled=!a.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:e,cancelable:!0})===!1)return;const r=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let s=0;for(let c=0,d=this.data.datasets.length;c<d;c++){const{controller:u}=this.getDatasetMeta(c),f=!i&&r.indexOf(u)===-1;u.buildOrUpdateElements(f),s=Math.max(+u.getMaxOverflow(),s)}s=this._minPadding=a.layout.autoPadding?s:0,this._updateLayout(s),i||J(r,c=>{c.reset()}),this._updateDatasets(e),this.notifyPlugins("afterUpdate",{mode:e}),this._layers.sort(r0("z","_idx"));const{_active:l,_lastEvent:o}=this;o?this._eventHandler(o,!0):l.length&&this._updateHoverStyles(l,l,!0),this.render()}_updateScales(){J(this.scales,e=>{Ut.removeBox(this,e)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const e=this.options,n=new Set(Object.keys(this._listeners)),a=new Set(e.events);(!yh(n,a)||!!this._responsiveListeners!==e.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:e}=this,n=this._getUniformDataChanges()||[];for(const{method:a,start:i,count:r}of n){const s=a==="_removeElements"?-r:r;ak(e,i,s)}}_getUniformDataChanges(){const e=this._dataChanges;if(!e||!e.length)return;this._dataChanges=[];const n=this.data.datasets.length,a=r=>new Set(e.filter(s=>s[0]===r).map((s,l)=>l+","+s.splice(1).join(","))),i=a(0);for(let r=1;r<n;r++)if(!yh(i,a(r)))return;return Array.from(i).map(r=>r.split(",")).map(r=>({method:r[1],start:+r[2],count:+r[3]}))}_updateLayout(e){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;Ut.update(this,this.width,this.height,e);const n=this.chartArea,a=n.width<=0||n.height<=0;this._layers=[],J(this.boxes,i=>{a&&i.position==="chartArea"||(i.configure&&i.configure(),this._layers.push(...i._layers()))},this),this._layers.forEach((i,r)=>{i._idx=r}),this.notifyPlugins("afterLayout")}_updateDatasets(e){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:e,cancelable:!0})!==!1){for(let n=0,a=this.data.datasets.length;n<a;++n)this.getDatasetMeta(n).controller.configure();for(let n=0,a=this.data.datasets.length;n<a;++n)this._updateDataset(n,Kn(e)?e({datasetIndex:n}):e);this.notifyPlugins("afterDatasetsUpdate",{mode:e})}}_updateDataset(e,n){const a=this.getDatasetMeta(e),i={meta:a,index:e,mode:n,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",i)!==!1&&(a.controller._update(n),i.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",i))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(Ke.has(this)?this.attached&&!Ke.running(this)&&Ke.start(this):(this.draw(),s0({chart:this})))}draw(){let e;if(this._resizeBeforeDraw){const{width:a,height:i}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(a,i)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const n=this._layers;for(e=0;e<n.length&&n[e].z<=0;++e)n[e].draw(this.chartArea);for(this._drawDatasets();e<n.length;++e)n[e].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(e){const n=this._sortedMetasets,a=[];let i,r;for(i=0,r=n.length;i<r;++i){const s=n[i];(!e||s.visible)&&a.push(s)}return a}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const e=this.getSortedVisibleDatasetMetas();for(let n=e.length-1;n>=0;--n)this._drawDataset(e[n]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(e){const n=this.ctx,a={meta:e,index:e.index,cancelable:!0},i=fb(this,e);this.notifyPlugins("beforeDatasetDraw",a)!==!1&&(i&&eo(n,i),e.controller.draw(),i&&no(n),a.cancelable=!1,this.notifyPlugins("afterDatasetDraw",a))}isPointInArea(e){return sn(e,this.chartArea,this._minPadding)}getElementsAtEventForMode(e,n,a,i){const r=e1.modes[n];return typeof r=="function"?r(this,e,a,i):[]}getDatasetMeta(e){const n=this.data.datasets[e],a=this._metasets;let i=a.filter(r=>r&&r._dataset===n).pop();return i||(i={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:n&&n.order||0,index:e,_dataset:n,_parsed:[],_sorted:!1},a.push(i)),i}getContext(){return this.$context||(this.$context=Jn(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(e){const n=this.data.datasets[e];if(!n)return!1;const a=this.getDatasetMeta(e);return typeof a.hidden=="boolean"?!a.hidden:!n.hidden}setDatasetVisibility(e,n){const a=this.getDatasetMeta(e);a.hidden=!n}toggleDataVisibility(e){this._hiddenIndices[e]=!this._hiddenIndices[e]}getDataVisibility(e){return!this._hiddenIndices[e]}_updateVisibility(e,n,a){const i=a?"show":"hide",r=this.getDatasetMeta(e),s=r.controller._resolveAnimations(void 0,i);zr(n)?(r.data[n].hidden=!a,this.update()):(this.setDatasetVisibility(e,a),s.update(r,{visible:a}),this.update(l=>l.datasetIndex===e?i:void 0))}hide(e,n){this._updateVisibility(e,n,!1)}show(e,n){this._updateVisibility(e,n,!0)}_destroyDatasetMeta(e){const n=this._metasets[e];n&&n.controller&&n.controller._destroy(),delete this._metasets[e]}_stop(){let e,n;for(this.stop(),Ke.remove(this),e=0,n=this.data.datasets.length;e<n;++e)this._destroyDatasetMeta(e)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:e,ctx:n}=this;this._stop(),this.config.clearCache(),e&&(this.unbindEvents(),Th(e,n),this.platform.releaseContext(n),this.canvas=null,this.ctx=null),delete Ps[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...e){return this.canvas.toDataURL(...e)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const e=this._listeners,n=this.platform,a=(r,s)=>{n.addEventListener(this,r,s),e[r]=s},i=(r,s,l)=>{r.offsetX=s,r.offsetY=l,this._eventHandler(r)};J(this.options.events,r=>a(r,i))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const e=this._responsiveListeners,n=this.platform,a=(o,c)=>{n.addEventListener(this,o,c),e[o]=c},i=(o,c)=>{e[o]&&(n.removeEventListener(this,o,c),delete e[o])},r=(o,c)=>{this.canvas&&this.resize(o,c)};let s;const l=()=>{i("attach",l),this.attached=!0,this.resize(),a("resize",r),a("detach",s)};s=()=>{this.attached=!1,i("resize",r),this._stop(),this._resize(0,0),a("attach",l)},n.isAttached(this.canvas)?l():s()}unbindEvents(){J(this._listeners,(e,n)=>{this.platform.removeEventListener(this,n,e)}),this._listeners={},J(this._responsiveListeners,(e,n)=>{this.platform.removeEventListener(this,n,e)}),this._responsiveListeners=void 0}updateHoverStyle(e,n,a){const i=a?"set":"remove";let r,s,l,o;for(n==="dataset"&&(r=this.getDatasetMeta(e[0].datasetIndex),r.controller["_"+i+"DatasetHoverStyle"]()),l=0,o=e.length;l<o;++l){s=e[l];const c=s&&this.getDatasetMeta(s.datasetIndex).controller;c&&c[i+"HoverStyle"](s.element,s.datasetIndex,s.index)}}getActiveElements(){return this._active||[]}setActiveElements(e){const n=this._active||[],a=e.map(({datasetIndex:r,index:s})=>{const l=this.getDatasetMeta(r);if(!l)throw new Error("No dataset found at index "+r);return{datasetIndex:r,element:l.data[s],index:s}});!Tl(a,n)&&(this._active=a,this._lastEvent=null,this._updateHoverStyles(a,n))}notifyPlugins(e,n,a){return this._plugins.notify(this,e,n,a)}isPluginEnabled(e){return this._plugins._cache.filter(n=>n.plugin.id===e).length===1}_updateHoverStyles(e,n,a){const i=this.options.hover,r=(o,c)=>o.filter(d=>!c.some(u=>d.datasetIndex===u.datasetIndex&&d.index===u.index)),s=r(n,e),l=a?e:r(e,n);s.length&&this.updateHoverStyle(s,i.mode,!1),l.length&&i.mode&&this.updateHoverStyle(l,i.mode,!0)}_eventHandler(e,n){const a={event:e,replay:n,cancelable:!0,inChartArea:this.isPointInArea(e)},i=s=>(s.options.events||this.options.events).includes(e.native.type);if(this.notifyPlugins("beforeEvent",a,i)===!1)return;const r=this._handleEvent(e,n,a.inChartArea);return a.cancelable=!1,this.notifyPlugins("afterEvent",a,i),(r||a.changed)&&this.render(),this}_handleEvent(e,n,a){const{_active:i=[],options:r}=this,s=n,l=this._getActiveElements(e,i,a,s),o=u_(e),c=ik(e,this._lastEvent,a,o);a&&(this._lastEvent=null,nt(r.onHover,[e,l,this],this),o&&nt(r.onClick,[e,l,this],this));const d=!Tl(l,i);return(d||n)&&(this._active=l,this._updateHoverStyles(l,i,n)),this._lastEvent=c,d}_getActiveElements(e,n,a,i){if(e.type==="mouseout")return[];if(!a)return n;const r=this.options.hover;return this.getElementsAtEventForMode(e,r.mode,r,i)}}D(Ie,"defaults",ft),D(Ie,"instances",Ps),D(Ie,"overrides",Sa),D(Ie,"registry",ze),D(Ie,"version",tk),D(Ie,"getChart",l0);function o0(){return J(Ie.instances,t=>t._plugins.invalidate())}function rk(t,e,n){const{startAngle:a,x:i,y:r,outerRadius:s,innerRadius:l,options:o}=e,{borderWidth:c,borderJoinStyle:d}=o,u=Math.min(c/s,Ht(a-n));if(t.beginPath(),t.arc(i,r,s-c/2,a+u/2,n-u/2),l>0){const f=Math.min(c/l,Ht(a-n));t.arc(i,r,l+c/2,n-f/2,a+f/2,!0)}else{const f=Math.min(c/2,s*Ht(a-n));if(d==="round")t.arc(i,r,f,n-Z/2,a+Z/2,!0);else if(d==="bevel"){const h=2*f*f,m=-h*Math.cos(n+Z/2)+i,b=-h*Math.sin(n+Z/2)+r,v=h*Math.cos(a+Z/2)+i,p=h*Math.sin(a+Z/2)+r;t.lineTo(m,b),t.lineTo(v,p)}}t.closePath(),t.moveTo(0,0),t.rect(0,0,t.canvas.width,t.canvas.height),t.clip("evenodd")}function sk(t,e,n){const{startAngle:a,pixelMargin:i,x:r,y:s,outerRadius:l,innerRadius:o}=e;let c=i/l;t.beginPath(),t.arc(r,s,l,a-c,n+c),o>i?(c=i/o,t.arc(r,s,o,n+c,a-c,!0)):t.arc(r,s,i,n+bt,a-bt),t.closePath(),t.clip()}function lk(t){return Cu(t,["outerStart","outerEnd","innerStart","innerEnd"])}function ok(t,e,n,a){const i=lk(t.options.borderRadius),r=(n-e)/2,s=Math.min(r,a*e/2),l=o=>{const c=(n-Math.min(r,o))*a/2;return Ct(o,0,Math.min(r,c))};return{outerStart:l(i.outerStart),outerEnd:l(i.outerEnd),innerStart:Ct(i.innerStart,0,s),innerEnd:Ct(i.innerEnd,0,s)}}function La(t,e,n,a){return{x:n+t*Math.cos(e),y:a+t*Math.sin(e)}}function Rl(t,e,n,a,i,r){const{x:s,y:l,startAngle:o,pixelMargin:c,innerRadius:d}=e,u=Math.max(e.outerRadius+a+n-c,0),f=d>0?d+a+n+c:0;let h=0;const m=i-o;if(a){const Q=d>0?d-a:0,T=u>0?u-a:0,E=(Q+T)/2,R=E!==0?m*E/(E+a):m;h=(m-R)/2}const b=Math.max(.001,m*u-n/Z)/u,v=(m-b)/2,p=o+v+h,g=i-v-h,{outerStart:y,outerEnd:x,innerStart:_,innerEnd:w}=ok(e,f,u,g-p),k=u-y,S=u-x,A=p+y/k,C=g-x/S,z=f+_,N=f+w,vt=p+_/z,Yt=g-w/N;if(t.beginPath(),r){const Q=(A+C)/2;if(t.arc(s,l,u,A,Q),t.arc(s,l,u,Q,C),x>0){const U=La(S,C,s,l);t.arc(U.x,U.y,x,C,g+bt)}const T=La(N,g,s,l);if(t.lineTo(T.x,T.y),w>0){const U=La(N,Yt,s,l);t.arc(U.x,U.y,w,g+bt,Yt+Math.PI)}const E=(g-w/f+(p+_/f))/2;if(t.arc(s,l,f,g-w/f,E,!0),t.arc(s,l,f,E,p+_/f,!0),_>0){const U=La(z,vt,s,l);t.arc(U.x,U.y,_,vt+Math.PI,p-bt)}const R=La(k,p,s,l);if(t.lineTo(R.x,R.y),y>0){const U=La(k,A,s,l);t.arc(U.x,U.y,y,p-bt,A)}}else{t.moveTo(s,l);const Q=Math.cos(A)*u+s,T=Math.sin(A)*u+l;t.lineTo(Q,T);const E=Math.cos(C)*u+s,R=Math.sin(C)*u+l;t.lineTo(E,R)}t.closePath()}function ck(t,e,n,a,i){const{fullCircles:r,startAngle:s,circumference:l}=e;let o=e.endAngle;if(r){Rl(t,e,n,a,o,i);for(let c=0;c<r;++c)t.fill();isNaN(l)||(o=s+(l%ot||ot))}return Rl(t,e,n,a,o,i),t.fill(),o}function dk(t,e,n,a,i){const{fullCircles:r,startAngle:s,circumference:l,options:o}=e,{borderWidth:c,borderJoinStyle:d,borderDash:u,borderDashOffset:f,borderRadius:h}=o,m=o.borderAlign==="inner";if(!c)return;t.setLineDash(u||[]),t.lineDashOffset=f,m?(t.lineWidth=c*2,t.lineJoin=d||"round"):(t.lineWidth=c,t.lineJoin=d||"bevel");let b=e.endAngle;if(r){Rl(t,e,n,a,b,i);for(let v=0;v<r;++v)t.stroke();isNaN(l)||(b=s+(l%ot||ot))}m&&sk(t,e,b),o.selfJoin&&b-s>=Z&&h===0&&d!=="miter"&&rk(t,e,b),r||(Rl(t,e,n,a,b,i),t.stroke())}class Ki extends De{constructor(n){super();D(this,"circumference");D(this,"endAngle");D(this,"fullCircles");D(this,"innerRadius");D(this,"outerRadius");D(this,"pixelMargin");D(this,"startAngle");this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,n&&Object.assign(this,n)}inRange(n,a,i){const r=this.getProps(["x","y"],i),{angle:s,distance:l}=Fm(r,{x:n,y:a}),{startAngle:o,endAngle:c,innerRadius:d,outerRadius:u,circumference:f}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],i),h=(this.options.spacing+this.options.borderWidth)/2,m=B(f,c-o),b=Rr(s,o,c)&&o!==c,v=m>=ot||b,p=an(l,d+h,u+h);return v&&p}getCenterPoint(n){const{x:a,y:i,startAngle:r,endAngle:s,innerRadius:l,outerRadius:o}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],n),{offset:c,spacing:d}=this.options,u=(r+s)/2,f=(l+o+d+c)/2;return{x:a+Math.cos(u)*f,y:i+Math.sin(u)*f}}tooltipPosition(n){return this.getCenterPoint(n)}draw(n){const{options:a,circumference:i}=this,r=(a.offset||0)/4,s=(a.spacing||0)/2,l=a.circular;if(this.pixelMargin=a.borderAlign==="inner"?.33:0,this.fullCircles=i>ot?Math.floor(i/ot):0,i===0||this.innerRadius<0||this.outerRadius<0)return;n.save();const o=(this.startAngle+this.endAngle)/2;n.translate(Math.cos(o)*r,Math.sin(o)*r);const c=1-Math.sin(Math.min(Z,i||0)),d=r*c;n.fillStyle=a.backgroundColor,n.strokeStyle=a.borderColor,ck(n,this,d,s,l),dk(n,this,d,s,l),n.restore()}}D(Ki,"id","arc"),D(Ki,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1}),D(Ki,"defaultRoutes",{backgroundColor:"backgroundColor"}),D(Ki,"descriptors",{_scriptable:!0,_indexable:n=>n!=="borderDash"});function Mb(t,e,n=e){t.lineCap=B(n.borderCapStyle,e.borderCapStyle),t.setLineDash(B(n.borderDash,e.borderDash)),t.lineDashOffset=B(n.borderDashOffset,e.borderDashOffset),t.lineJoin=B(n.borderJoinStyle,e.borderJoinStyle),t.lineWidth=B(n.borderWidth,e.borderWidth),t.strokeStyle=B(n.borderColor,e.borderColor)}function uk(t,e,n){t.lineTo(n.x,n.y)}function fk(t){return t.stepped?L_:t.tension||t.cubicInterpolationMode==="monotone"?B_:uk}function Ab(t,e,n={}){const a=t.length,{start:i=0,end:r=a-1}=n,{start:s,end:l}=e,o=Math.max(i,s),c=Math.min(r,l),d=i<s&&r<s||i>l&&r>l;return{count:a,start:o,loop:e.loop,ilen:c<o&&!d?a+c-o:c-o}}function hk(t,e,n,a){const{points:i,options:r}=e,{count:s,start:l,loop:o,ilen:c}=Ab(i,n,a),d=fk(r);let{move:u=!0,reverse:f}=a||{},h,m,b;for(h=0;h<=c;++h)m=i[(l+(f?c-h:h))%s],!m.skip&&(u?(t.moveTo(m.x,m.y),u=!1):d(t,b,m,f,r.stepped),b=m);return o&&(m=i[(l+(f?c:0))%s],d(t,b,m,f,r.stepped)),!!o}function pk(t,e,n,a){const i=e.points,{count:r,start:s,ilen:l}=Ab(i,n,a),{move:o=!0,reverse:c}=a||{};let d=0,u=0,f,h,m,b,v,p;const g=x=>(s+(c?l-x:x))%r,y=()=>{b!==v&&(t.lineTo(d,v),t.lineTo(d,b),t.lineTo(d,p))};for(o&&(h=i[g(0)],t.moveTo(h.x,h.y)),f=0;f<=l;++f){if(h=i[g(f)],h.skip)continue;const x=h.x,_=h.y,w=x|0;w===m?(_<b?b=_:_>v&&(v=_),d=(u*d+x)/++u):(y(),t.lineTo(x,_),m=w,u=0,b=v=_),p=_}y()}function dd(t){const e=t.options,n=e.borderDash&&e.borderDash.length;return!t._decimated&&!t._loop&&!e.tension&&e.cubicInterpolationMode!=="monotone"&&!e.stepped&&!n?pk:hk}function gk(t){return t.stepped?h2:t.tension||t.cubicInterpolationMode==="monotone"?p2:ca}function mk(t,e,n,a){let i=e._path;i||(i=e._path=new Path2D,e.path(i,n,a)&&i.closePath()),Mb(t,e.options),t.stroke(i)}function bk(t,e,n,a){const{segments:i,options:r}=e,s=dd(e);for(const l of i)Mb(t,r,l.style),t.beginPath(),s(t,e,l,{start:n,end:n+a-1})&&t.closePath(),t.stroke()}const yk=typeof Path2D=="function";function vk(t,e,n,a){yk&&!e.options.segment?mk(t,e,n,a):bk(t,e,n,a)}class En extends De{constructor(e){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,e&&Object.assign(this,e)}updateControlPoints(e,n){const a=this.options;if((a.tension||a.cubicInterpolationMode==="monotone")&&!a.stepped&&!this._pointsUpdated){const i=a.spanGaps?this._loop:this._fullLoop;r2(this._points,a,e,i,n),this._pointsUpdated=!0}}set points(e){this._points=e,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=x2(this,this.options.segment))}first(){const e=this.segments,n=this.points;return e.length&&n[e[0].start]}last(){const e=this.segments,n=this.points,a=e.length;return a&&n[e[a-1].end]}interpolate(e,n){const a=this.options,i=e[n],r=this.points,s=ub(this,{property:n,start:i,end:i});if(!s.length)return;const l=[],o=gk(a);let c,d;for(c=0,d=s.length;c<d;++c){const{start:u,end:f}=s[c],h=r[u],m=r[f];if(h===m){l.push(h);continue}const b=Math.abs((i-h[n])/(m[n]-h[n])),v=o(h,m,b,a.stepped);v[n]=e[n],l.push(v)}return l.length===1?l[0]:l}pathSegment(e,n,a){return dd(this)(e,this,n,a)}path(e,n,a){const i=this.segments,r=dd(this);let s=this._loop;n=n||0,a=a||this.points.length-n;for(const l of i)s&=r(e,this,l,{start:n,end:n+a-1});return!!s}draw(e,n,a,i){const r=this.options||{};(this.points||[]).length&&r.borderWidth&&(e.save(),vk(e,this,a,i),e.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}D(En,"id","line"),D(En,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),D(En,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),D(En,"descriptors",{_scriptable:!0,_indexable:e=>e!=="borderDash"&&e!=="fill"});function c0(t,e,n,a){const i=t.options,{[n]:r}=t.getProps([n],a);return Math.abs(e-r)<i.radius+i.hitRadius}class Ws extends De{constructor(n){super();D(this,"parsed");D(this,"skip");D(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,n&&Object.assign(this,n)}inRange(n,a,i){const r=this.options,{x:s,y:l}=this.getProps(["x","y"],i);return Math.pow(n-s,2)+Math.pow(a-l,2)<Math.pow(r.hitRadius+r.radius,2)}inXRange(n,a){return c0(this,n,"x",a)}inYRange(n,a){return c0(this,n,"y",a)}getCenterPoint(n){const{x:a,y:i}=this.getProps(["x","y"],n);return{x:a,y:i}}size(n){n=n||this.options||{};let a=n.radius||0;a=Math.max(a,a&&n.hoverRadius||0);const i=a&&n.borderWidth||0;return(a+i)*2}draw(n,a){const i=this.options;this.skip||i.radius<.1||!sn(this,a,this.size(i)/2)||(n.strokeStyle=i.borderColor,n.lineWidth=i.borderWidth,n.fillStyle=i.backgroundColor,sd(n,i,this.x,this.y))}getRange(){const n=this.options||{};return n.radius+n.hitRadius}}D(Ws,"id","point"),D(Ws,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),D(Ws,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function Tb(t,e){const{x:n,y:a,base:i,width:r,height:s}=t.getProps(["x","y","base","width","height"],e);let l,o,c,d,u;return t.horizontal?(u=s/2,l=Math.min(n,i),o=Math.max(n,i),c=a-u,d=a+u):(u=r/2,l=n-u,o=n+u,c=Math.min(a,i),d=Math.max(a,i)),{left:l,top:c,right:o,bottom:d}}function zn(t,e,n,a){return t?0:Ct(e,n,a)}function xk(t,e,n){const a=t.options.borderWidth,i=t.borderSkipped,r=tb(a);return{t:zn(i.top,r.top,0,n),r:zn(i.right,r.right,0,e),b:zn(i.bottom,r.bottom,0,n),l:zn(i.left,r.left,0,e)}}function _k(t,e,n){const{enableBorderRadius:a}=t.getProps(["enableBorderRadius"]),i=t.options.borderRadius,r=ma(i),s=Math.min(e,n),l=t.borderSkipped,o=a||X(i);return{topLeft:zn(!o||l.top||l.left,r.topLeft,0,s),topRight:zn(!o||l.top||l.right,r.topRight,0,s),bottomLeft:zn(!o||l.bottom||l.left,r.bottomLeft,0,s),bottomRight:zn(!o||l.bottom||l.right,r.bottomRight,0,s)}}function kk(t){const e=Tb(t),n=e.right-e.left,a=e.bottom-e.top,i=xk(t,n/2,a/2),r=_k(t,n/2,a/2);return{outer:{x:e.left,y:e.top,w:n,h:a,radius:r},inner:{x:e.left+i.l,y:e.top+i.t,w:n-i.l-i.r,h:a-i.t-i.b,radius:{topLeft:Math.max(0,r.topLeft-Math.max(i.t,i.l)),topRight:Math.max(0,r.topRight-Math.max(i.t,i.r)),bottomLeft:Math.max(0,r.bottomLeft-Math.max(i.b,i.l)),bottomRight:Math.max(0,r.bottomRight-Math.max(i.b,i.r))}}}}function ec(t,e,n,a){const i=e===null,r=n===null,l=t&&!(i&&r)&&Tb(t,a);return l&&(i||an(e,l.left,l.right))&&(r||an(n,l.top,l.bottom))}function Sk(t){return t.topLeft||t.topRight||t.bottomLeft||t.bottomRight}function wk(t,e){t.rect(e.x,e.y,e.w,e.h)}function nc(t,e,n={}){const a=t.x!==n.x?-e:0,i=t.y!==n.y?-e:0,r=(t.x+t.w!==n.x+n.w?e:0)-a,s=(t.y+t.h!==n.y+n.h?e:0)-i;return{x:t.x+a,y:t.y+i,w:t.w+r,h:t.h+s,radius:t.radius}}class Js extends De{constructor(e){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,e&&Object.assign(this,e)}draw(e){const{inflateAmount:n,options:{borderColor:a,backgroundColor:i}}=this,{inner:r,outer:s}=kk(this),l=Sk(s.radius)?Lr:wk;e.save(),(s.w!==r.w||s.h!==r.h)&&(e.beginPath(),l(e,nc(s,n,r)),e.clip(),l(e,nc(r,-n,s)),e.fillStyle=a,e.fill("evenodd")),e.beginPath(),l(e,nc(r,n)),e.fillStyle=i,e.fill(),e.restore()}inRange(e,n,a){return ec(this,e,n,a)}inXRange(e,n){return ec(this,e,null,n)}inYRange(e,n){return ec(this,null,e,n)}getCenterPoint(e){const{x:n,y:a,base:i,horizontal:r}=this.getProps(["x","y","base","horizontal"],e);return{x:r?(n+i)/2:n,y:r?a:(a+i)/2}}getRange(e){return e==="x"?this.width/2:this.height/2}}D(Js,"id","bar"),D(Js,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),D(Js,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});var Mk=Object.freeze({__proto__:null,ArcElement:Ki,BarElement:Js,LineElement:En,PointElement:Ws});const ud=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],d0=ud.map(t=>t.replace("rgb(","rgba(").replace(")",", 0.5)"));function Db(t){return ud[t%ud.length]}function Cb(t){return d0[t%d0.length]}function Ak(t,e){return t.borderColor=Db(e),t.backgroundColor=Cb(e),++e}function Tk(t,e){return t.backgroundColor=t.data.map(()=>Db(e++)),e}function Dk(t,e){return t.backgroundColor=t.data.map(()=>Cb(e++)),e}function Ck(t){let e=0;return(n,a)=>{const i=t.getDatasetMeta(a).controller;i instanceof da?e=Tk(n,e):i instanceof gr?e=Dk(n,e):i&&(e=Ak(n,e))}}function u0(t){let e;for(e in t)if(t[e].borderColor||t[e].backgroundColor)return!0;return!1}function Ok(t){return t&&(t.borderColor||t.backgroundColor)}function Ek(){return ft.borderColor!=="rgba(0,0,0,0.1)"||ft.backgroundColor!=="rgba(0,0,0,0.1)"}var zk={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(t,e,n){if(!n.enabled)return;const{data:{datasets:a},options:i}=t.config,{elements:r}=i,s=u0(a)||Ok(i)||r&&u0(r)||Ek();if(!n.forceOverride&&s)return;const l=Ck(t);a.forEach(l)}};function Rk(t,e,n,a,i){const r=i.samples||a;if(r>=n)return t.slice(e,e+n);const s=[],l=(n-2)/(r-2);let o=0;const c=e+n-1;let d=e,u,f,h,m,b;for(s[o++]=t[d],u=0;u<r-2;u++){let v=0,p=0,g;const y=Math.floor((u+1)*l)+1+e,x=Math.min(Math.floor((u+2)*l)+1,n)+e,_=x-y;for(g=y;g<x;g++)v+=t[g].x,p+=t[g].y;v/=_,p/=_;const w=Math.floor(u*l)+1+e,k=Math.min(Math.floor((u+1)*l)+1,n)+e,{x:S,y:A}=t[d];for(h=m=-1,g=w;g<k;g++)m=.5*Math.abs((S-v)*(t[g].y-A)-(S-t[g].x)*(p-A)),m>h&&(h=m,f=t[g],b=g);s[o++]=f,d=b}return s[o++]=t[c],s}function Lk(t,e,n,a){let i=0,r=0,s,l,o,c,d,u,f,h,m,b;const v=[],p=e+n-1,g=t[e].x,x=t[p].x-g;for(s=e;s<e+n;++s){l=t[s],o=(l.x-g)/x*a,c=l.y;const _=o|0;if(_===d)c<m?(m=c,u=s):c>b&&(b=c,f=s),i=(r*i+l.x)/++r;else{const w=s-1;if(!G(u)&&!G(f)){const k=Math.min(u,f),S=Math.max(u,f);k!==h&&k!==w&&v.push({...t[k],x:i}),S!==h&&S!==w&&v.push({...t[S],x:i})}s>0&&w!==h&&v.push(t[w]),v.push(l),d=_,r=0,m=b=c,u=f=h=s}}return v}function Ob(t){if(t._decimated){const e=t._data;delete t._decimated,delete t._data,Object.defineProperty(t,"data",{configurable:!0,enumerable:!0,writable:!0,value:e})}}function f0(t){t.data.datasets.forEach(e=>{Ob(e)})}function Bk(t,e){const n=e.length;let a=0,i;const{iScale:r}=t,{min:s,max:l,minDefined:o,maxDefined:c}=r.getUserBounds();return o&&(a=Ct(rn(e,r.axis,s).lo,0,n-1)),c?i=Ct(rn(e,r.axis,l).hi+1,a,n)-a:i=n-a,{start:a,count:i}}var Nk={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(t,e,n)=>{if(!n.enabled){f0(t);return}const a=t.width;t.data.datasets.forEach((i,r)=>{const{_data:s,indexAxis:l}=i,o=t.getDatasetMeta(r),c=s||i.data;if(Qi([l,t.options.indexAxis])==="y"||!o.controller.supportsDecimation)return;const d=t.scales[o.xAxisID];if(d.type!=="linear"&&d.type!=="time"||t.options.parsing)return;let{start:u,count:f}=Bk(o,c);const h=n.threshold||4*a;if(f<=h){Ob(i);return}G(s)&&(i._data=c,delete i.data,Object.defineProperty(i,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(b){this._data=b}}));let m;switch(n.algorithm){case"lttb":m=Rk(c,u,f,a,n);break;case"min-max":m=Lk(c,u,f,a);break;default:throw new Error(`Unsupported decimation algorithm '${n.algorithm}'`)}i._decimated=m})},destroy(t){f0(t)}};function jk(t,e,n){const a=t.segments,i=t.points,r=e.points,s=[];for(const l of a){let{start:o,end:c}=l;c=ro(o,c,i);const d=fd(n,i[o],i[c],l.loop);if(!e.segments){s.push({source:l,target:d,start:i[o],end:i[c]});continue}const u=ub(e,d);for(const f of u){const h=fd(n,r[f.start],r[f.end],f.loop),m=db(l,i,h);for(const b of m)s.push({source:b,target:f,start:{[n]:h0(d,h,"start",Math.max)},end:{[n]:h0(d,h,"end",Math.min)}})}}return s}function fd(t,e,n,a){if(a)return;let i=e[t],r=n[t];return t==="angle"&&(i=Ht(i),r=Ht(r)),{property:t,start:i,end:r}}function Hk(t,e){const{x:n=null,y:a=null}=t||{},i=e.points,r=[];return e.segments.forEach(({start:s,end:l})=>{l=ro(s,l,i);const o=i[s],c=i[l];a!==null?(r.push({x:o.x,y:a}),r.push({x:c.x,y:a})):n!==null&&(r.push({x:n,y:o.y}),r.push({x:n,y:c.y}))}),r}function ro(t,e,n){for(;e>t;e--){const a=n[e];if(!isNaN(a.x)&&!isNaN(a.y))break}return e}function h0(t,e,n,a){return t&&e?a(t[n],e[n]):t?t[n]:e?e[n]:0}function Eb(t,e){let n=[],a=!1;return ut(t)?(a=!0,n=t):n=Hk(t,e),n.length?new En({points:n,options:{tension:0},_loop:a,_fullLoop:a}):null}function p0(t){return t&&t.fill!==!1}function Uk(t,e,n){let i=t[e].fill;const r=[e];let s;if(!n)return i;for(;i!==!1&&r.indexOf(i)===-1;){if(!gt(i))return i;if(s=t[i],!s)return!1;if(s.visible)return i;r.push(i),i=s.fill}return!1}function Vk(t,e,n){const a=Xk(t);if(X(a))return isNaN(a.value)?!1:a;let i=parseFloat(a);return gt(i)&&Math.floor(i)===i?Yk(a[0],e,i,n):["origin","start","end","stack","shape"].indexOf(a)>=0&&a}function Yk(t,e,n,a){return(t==="-"||t==="+")&&(n=e+n),n===e||n<0||n>=a?!1:n}function Gk(t,e){let n=null;return t==="start"?n=e.bottom:t==="end"?n=e.top:X(t)?n=e.getPixelForValue(t.value):e.getBasePixel&&(n=e.getBasePixel()),n}function qk(t,e,n){let a;return t==="start"?a=n:t==="end"?a=e.options.reverse?e.min:e.max:X(t)?a=t.value:a=e.getBaseValue(),a}function Xk(t){const e=t.options,n=e.fill;let a=B(n&&n.target,n);return a===void 0&&(a=!!e.backgroundColor),a===!1||a===null?!1:a===!0?"origin":a}function Fk(t){const{scale:e,index:n,line:a}=t,i=[],r=a.segments,s=a.points,l=Qk(e,n);l.push(Eb({x:null,y:e.bottom},a));for(let o=0;o<r.length;o++){const c=r[o];for(let d=c.start;d<=c.end;d++)Zk(i,s[d],l)}return new En({points:i,options:{}})}function Qk(t,e){const n=[],a=t.getMatchingVisibleMetas("line");for(let i=0;i<a.length;i++){const r=a[i];if(r.index===e)break;r.hidden||n.unshift(r.dataset)}return n}function Zk(t,e,n){const a=[];for(let i=0;i<n.length;i++){const r=n[i],{first:s,last:l,point:o}=Kk(r,e,"x");if(!(!o||s&&l)){if(s)a.unshift(o);else if(t.push(o),!l)break}}t.push(...a)}function Kk(t,e,n){const a=t.interpolate(e,n);if(!a)return{};const i=a[n],r=t.segments,s=t.points;let l=!1,o=!1;for(let c=0;c<r.length;c++){const d=r[c],u=s[d.start][n],f=s[d.end][n];if(an(i,u,f)){l=i===u,o=i===f;break}}return{first:l,last:o,point:a}}class zb{constructor(e){this.x=e.x,this.y=e.y,this.radius=e.radius}pathSegment(e,n,a){const{x:i,y:r,radius:s}=this;return n=n||{start:0,end:ot},e.arc(i,r,s,n.end,n.start,!0),!a.bounds}interpolate(e){const{x:n,y:a,radius:i}=this,r=e.angle;return{x:n+Math.cos(r)*i,y:a+Math.sin(r)*i,angle:r}}}function Pk(t){const{chart:e,fill:n,line:a}=t;if(gt(n))return Wk(e,n);if(n==="stack")return Fk(t);if(n==="shape")return!0;const i=Jk(t);return i instanceof zb?i:Eb(i,a)}function Wk(t,e){const n=t.getDatasetMeta(e);return n&&t.isDatasetVisible(e)?n.dataset:null}function Jk(t){return(t.scale||{}).getPointPositionForValue?$k(t):Ik(t)}function Ik(t){const{scale:e={},fill:n}=t,a=Gk(n,e);if(gt(a)){const i=e.isHorizontal();return{x:i?a:null,y:i?null:a}}return null}function $k(t){const{scale:e,fill:n}=t,a=e.options,i=e.getLabels().length,r=a.reverse?e.max:e.min,s=qk(n,e,r),l=[];if(a.grid.circular){const o=e.getPointPositionForValue(0,r);return new zb({x:o.x,y:o.y,radius:e.getDistanceFromCenterForValue(s)})}for(let o=0;o<i;++o)l.push(e.getPointPositionForValue(o,s));return l}function ac(t,e,n){const a=Pk(e),{chart:i,index:r,line:s,scale:l,axis:o}=e,c=s.options,d=c.fill,u=c.backgroundColor,{above:f=u,below:h=u}=d||{},m=i.getDatasetMeta(r),b=fb(i,m);a&&s.points.length&&(eo(t,n),tS(t,{line:s,target:a,above:f,below:h,area:n,scale:l,axis:o,clip:b}),no(t))}function tS(t,e){const{line:n,target:a,above:i,below:r,area:s,scale:l,clip:o}=e,c=n._loop?"angle":e.axis;t.save();let d=r;r!==i&&(c==="x"?(g0(t,a,s.top),ic(t,{line:n,target:a,color:i,scale:l,property:c,clip:o}),t.restore(),t.save(),g0(t,a,s.bottom)):c==="y"&&(m0(t,a,s.left),ic(t,{line:n,target:a,color:r,scale:l,property:c,clip:o}),t.restore(),t.save(),m0(t,a,s.right),d=i)),ic(t,{line:n,target:a,color:d,scale:l,property:c,clip:o}),t.restore()}function g0(t,e,n){const{segments:a,points:i}=e;let r=!0,s=!1;t.beginPath();for(const l of a){const{start:o,end:c}=l,d=i[o],u=i[ro(o,c,i)];r?(t.moveTo(d.x,d.y),r=!1):(t.lineTo(d.x,n),t.lineTo(d.x,d.y)),s=!!e.pathSegment(t,l,{move:s}),s?t.closePath():t.lineTo(u.x,n)}t.lineTo(e.first().x,n),t.closePath(),t.clip()}function m0(t,e,n){const{segments:a,points:i}=e;let r=!0,s=!1;t.beginPath();for(const l of a){const{start:o,end:c}=l,d=i[o],u=i[ro(o,c,i)];r?(t.moveTo(d.x,d.y),r=!1):(t.lineTo(n,d.y),t.lineTo(d.x,d.y)),s=!!e.pathSegment(t,l,{move:s}),s?t.closePath():t.lineTo(n,u.y)}t.lineTo(n,e.first().y),t.closePath(),t.clip()}function ic(t,e){const{line:n,target:a,property:i,color:r,scale:s,clip:l}=e,o=jk(n,a,i);for(const{source:c,target:d,start:u,end:f}of o){const{style:{backgroundColor:h=r}={}}=c,m=a!==!0;t.save(),t.fillStyle=h,eS(t,s,l,m&&fd(i,u,f)),t.beginPath();const b=!!n.pathSegment(t,c);let v;if(m){b?t.closePath():b0(t,a,f,i);const p=!!a.pathSegment(t,d,{move:b,reverse:!0});v=b&&p,v||b0(t,a,u,i)}t.closePath(),t.fill(v?"evenodd":"nonzero"),t.restore()}}function eS(t,e,n,a){const i=e.chart.chartArea,{property:r,start:s,end:l}=a||{};if(r==="x"||r==="y"){let o,c,d,u;r==="x"?(o=s,c=i.top,d=l,u=i.bottom):(o=i.left,c=s,d=i.right,u=l),t.beginPath(),n&&(o=Math.max(o,n.left),d=Math.min(d,n.right),c=Math.max(c,n.top),u=Math.min(u,n.bottom)),t.rect(o,c,d-o,u-c),t.clip()}}function b0(t,e,n,a){const i=e.interpolate(n,a);i&&t.lineTo(i.x,i.y)}var nS={id:"filler",afterDatasetsUpdate(t,e,n){const a=(t.data.datasets||[]).length,i=[];let r,s,l,o;for(s=0;s<a;++s)r=t.getDatasetMeta(s),l=r.dataset,o=null,l&&l.options&&l instanceof En&&(o={visible:t.isDatasetVisible(s),index:s,fill:Vk(l,s,a),chart:t,axis:r.controller.options.indexAxis,scale:r.vScale,line:l}),r.$filler=o,i.push(o);for(s=0;s<a;++s)o=i[s],!(!o||o.fill===!1)&&(o.fill=Uk(i,s,n.propagate))},beforeDraw(t,e,n){const a=n.drawTime==="beforeDraw",i=t.getSortedVisibleDatasetMetas(),r=t.chartArea;for(let s=i.length-1;s>=0;--s){const l=i[s].$filler;l&&(l.line.updateControlPoints(r,l.axis),a&&l.fill&&ac(t.ctx,l,r))}},beforeDatasetsDraw(t,e,n){if(n.drawTime!=="beforeDatasetsDraw")return;const a=t.getSortedVisibleDatasetMetas();for(let i=a.length-1;i>=0;--i){const r=a[i].$filler;p0(r)&&ac(t.ctx,r,t.chartArea)}},beforeDatasetDraw(t,e,n){const a=e.meta.$filler;!p0(a)||n.drawTime!=="beforeDatasetDraw"||ac(t.ctx,a,t.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const y0=(t,e)=>{let{boxHeight:n=e,boxWidth:a=e}=t;return t.usePointStyle&&(n=Math.min(n,e),a=t.pointStyleWidth||Math.min(a,e)),{boxWidth:a,boxHeight:n,itemHeight:Math.max(e,n)}},aS=(t,e)=>t!==null&&e!==null&&t.datasetIndex===e.datasetIndex&&t.index===e.index;class v0 extends De{constructor(e){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=e.chart,this.options=e.options,this.ctx=e.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(e,n,a){this.maxWidth=e,this.maxHeight=n,this._margins=a,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const e=this.options.labels||{};let n=nt(e.generateLabels,[this.chart],this)||[];e.filter&&(n=n.filter(a=>e.filter(a,this.chart.data))),e.sort&&(n=n.sort((a,i)=>e.sort(a,i,this.chart.data))),this.options.reverse&&n.reverse(),this.legendItems=n}fit(){const{options:e,ctx:n}=this;if(!e.display){this.width=this.height=0;return}const a=e.labels,i=Mt(a.font),r=i.size,s=this._computeTitleHeight(),{boxWidth:l,itemHeight:o}=y0(a,r);let c,d;n.font=i.string,this.isHorizontal()?(c=this.maxWidth,d=this._fitRows(s,r,l,o)+10):(d=this.maxHeight,c=this._fitCols(s,i,l,o)+10),this.width=Math.min(c,e.maxWidth||this.maxWidth),this.height=Math.min(d,e.maxHeight||this.maxHeight)}_fitRows(e,n,a,i){const{ctx:r,maxWidth:s,options:{labels:{padding:l}}}=this,o=this.legendHitBoxes=[],c=this.lineWidths=[0],d=i+l;let u=e;r.textAlign="left",r.textBaseline="middle";let f=-1,h=-d;return this.legendItems.forEach((m,b)=>{const v=a+n/2+r.measureText(m.text).width;(b===0||c[c.length-1]+v+2*l>s)&&(u+=d,c[c.length-(b>0?0:1)]=0,h+=d,f++),o[b]={left:0,top:h,row:f,width:v,height:i},c[c.length-1]+=v+l}),u}_fitCols(e,n,a,i){const{ctx:r,maxHeight:s,options:{labels:{padding:l}}}=this,o=this.legendHitBoxes=[],c=this.columnSizes=[],d=s-e;let u=l,f=0,h=0,m=0,b=0;return this.legendItems.forEach((v,p)=>{const{itemWidth:g,itemHeight:y}=iS(a,n,r,v,i);p>0&&h+y+2*l>d&&(u+=f+l,c.push({width:f,height:h}),m+=f+l,b++,f=h=0),o[p]={left:m,top:h,col:b,width:g,height:y},f=Math.max(f,g),h+=y+l}),u+=f,c.push({width:f,height:h}),u}adjustHitBoxes(){if(!this.options.display)return;const e=this._computeTitleHeight(),{legendHitBoxes:n,options:{align:a,labels:{padding:i},rtl:r}}=this,s=ii(r,this.left,this.width);if(this.isHorizontal()){let l=0,o=Nt(a,this.left+i,this.right-this.lineWidths[l]);for(const c of n)l!==c.row&&(l=c.row,o=Nt(a,this.left+i,this.right-this.lineWidths[l])),c.top+=this.top+e+i,c.left=s.leftForLtr(s.x(o),c.width),o+=c.width+i}else{let l=0,o=Nt(a,this.top+e+i,this.bottom-this.columnSizes[l].height);for(const c of n)c.col!==l&&(l=c.col,o=Nt(a,this.top+e+i,this.bottom-this.columnSizes[l].height)),c.top=o,c.left+=this.left+i,c.left=s.leftForLtr(s.x(c.left),c.width),o+=c.height+i}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const e=this.ctx;eo(e,this),this._draw(),no(e)}}_draw(){const{options:e,columnSizes:n,lineWidths:a,ctx:i}=this,{align:r,labels:s}=e,l=ft.color,o=ii(e.rtl,this.left,this.width),c=Mt(s.font),{padding:d}=s,u=c.size,f=u/2;let h;this.drawTitle(),i.textAlign=o.textAlign("left"),i.textBaseline="middle",i.lineWidth=.5,i.font=c.string;const{boxWidth:m,boxHeight:b,itemHeight:v}=y0(s,u),p=function(w,k,S){if(isNaN(m)||m<=0||isNaN(b)||b<0)return;i.save();const A=B(S.lineWidth,1);if(i.fillStyle=B(S.fillStyle,l),i.lineCap=B(S.lineCap,"butt"),i.lineDashOffset=B(S.lineDashOffset,0),i.lineJoin=B(S.lineJoin,"miter"),i.lineWidth=A,i.strokeStyle=B(S.strokeStyle,l),i.setLineDash(B(S.lineDash,[])),s.usePointStyle){const C={radius:b*Math.SQRT2/2,pointStyle:S.pointStyle,rotation:S.rotation,borderWidth:A},z=o.xPlus(w,m/2),N=k+f;$m(i,C,z,N,s.pointStyleWidth&&m)}else{const C=k+Math.max((u-b)/2,0),z=o.leftForLtr(w,m),N=ma(S.borderRadius);i.beginPath(),Object.values(N).some(vt=>vt!==0)?Lr(i,{x:z,y:C,w:m,h:b,radius:N}):i.rect(z,C,m,b),i.fill(),A!==0&&i.stroke()}i.restore()},g=function(w,k,S){wa(i,S.text,w,k+v/2,c,{strikethrough:S.hidden,textAlign:o.textAlign(S.textAlign)})},y=this.isHorizontal(),x=this._computeTitleHeight();y?h={x:Nt(r,this.left+d,this.right-a[0]),y:this.top+d+x,line:0}:h={x:this.left+d,y:Nt(r,this.top+x+d,this.bottom-n[0].height),line:0},lb(this.ctx,e.textDirection);const _=v+d;this.legendItems.forEach((w,k)=>{i.strokeStyle=w.fontColor,i.fillStyle=w.fontColor;const S=i.measureText(w.text).width,A=o.textAlign(w.textAlign||(w.textAlign=s.textAlign)),C=m+f+S;let z=h.x,N=h.y;o.setWidth(this.width),y?k>0&&z+C+d>this.right&&(N=h.y+=_,h.line++,z=h.x=Nt(r,this.left+d,this.right-a[h.line])):k>0&&N+_>this.bottom&&(z=h.x=z+n[h.line].width+d,h.line++,N=h.y=Nt(r,this.top+x+d,this.bottom-n[h.line].height));const vt=o.x(z);if(p(vt,N,w),z=S_(A,z+m+f,y?z+C:this.right,e.rtl),g(o.x(z),N,w),y)h.x+=C+d;else if(typeof w.text!="string"){const Yt=c.lineHeight;h.y+=Rb(w,Yt)+d}else h.y+=_}),ob(this.ctx,e.textDirection)}drawTitle(){const e=this.options,n=e.title,a=Mt(n.font),i=Vt(n.padding);if(!n.display)return;const r=ii(e.rtl,this.left,this.width),s=this.ctx,l=n.position,o=a.size/2,c=i.top+o;let d,u=this.left,f=this.width;if(this.isHorizontal())f=Math.max(...this.lineWidths),d=this.top+c,u=Nt(e.align,u,this.right-f);else{const m=this.columnSizes.reduce((b,v)=>Math.max(b,v.height),0);d=c+Nt(e.align,this.top,this.bottom-m-e.labels.padding-this._computeTitleHeight())}const h=Nt(l,u,u+f);s.textAlign=r.textAlign(Tu(l)),s.textBaseline="middle",s.strokeStyle=n.color,s.fillStyle=n.color,s.font=a.string,wa(s,n.text,h,d,a)}_computeTitleHeight(){const e=this.options.title,n=Mt(e.font),a=Vt(e.padding);return e.display?n.lineHeight+a.height:0}_getLegendItemAt(e,n){let a,i,r;if(an(e,this.left,this.right)&&an(n,this.top,this.bottom)){for(r=this.legendHitBoxes,a=0;a<r.length;++a)if(i=r[a],an(e,i.left,i.left+i.width)&&an(n,i.top,i.top+i.height))return this.legendItems[a]}return null}handleEvent(e){const n=this.options;if(!lS(e.type,n))return;const a=this._getLegendItemAt(e.x,e.y);if(e.type==="mousemove"||e.type==="mouseout"){const i=this._hoveredItem,r=aS(i,a);i&&!r&&nt(n.onLeave,[e,i,this],this),this._hoveredItem=a,a&&!r&&nt(n.onHover,[e,a,this],this)}else a&&nt(n.onClick,[e,a,this],this)}}function iS(t,e,n,a,i){const r=rS(a,t,e,n),s=sS(i,a,e.lineHeight);return{itemWidth:r,itemHeight:s}}function rS(t,e,n,a){let i=t.text;return i&&typeof i!="string"&&(i=i.reduce((r,s)=>r.length>s.length?r:s)),e+n.size/2+a.measureText(i).width}function sS(t,e,n){let a=t;return typeof e.text!="string"&&(a=Rb(e,n)),a}function Rb(t,e){const n=t.text?t.text.length:0;return e*n}function lS(t,e){return!!((t==="mousemove"||t==="mouseout")&&(e.onHover||e.onLeave)||e.onClick&&(t==="click"||t==="mouseup"))}var oS={id:"legend",_element:v0,start(t,e,n){const a=t.legend=new v0({ctx:t.ctx,options:n,chart:t});Ut.configure(t,a,n),Ut.addBox(t,a)},stop(t){Ut.removeBox(t,t.legend),delete t.legend},beforeUpdate(t,e,n){const a=t.legend;Ut.configure(t,a,n),a.options=n},afterUpdate(t){const e=t.legend;e.buildLabels(),e.adjustHitBoxes()},afterEvent(t,e){e.replay||t.legend.handleEvent(e.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(t,e,n){const a=e.datasetIndex,i=n.chart;i.isDatasetVisible(a)?(i.hide(a),e.hidden=!0):(i.show(a),e.hidden=!1)},onHover:null,onLeave:null,labels:{color:t=>t.chart.options.color,boxWidth:40,padding:10,generateLabels(t){const e=t.data.datasets,{labels:{usePointStyle:n,pointStyle:a,textAlign:i,color:r,useBorderRadius:s,borderRadius:l}}=t.legend.options;return t._getSortedDatasetMetas().map(o=>{const c=o.controller.getStyle(n?0:void 0),d=Vt(c.borderWidth);return{text:e[o.index].label,fillStyle:c.backgroundColor,fontColor:r,hidden:!o.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(d.width+d.height)/4,strokeStyle:c.borderColor,pointStyle:a||c.pointStyle,rotation:c.rotation,textAlign:i||c.textAlign,borderRadius:s&&(l||c.borderRadius),datasetIndex:o.index}},this)}},title:{color:t=>t.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:t=>!t.startsWith("on"),labels:{_scriptable:t=>!["generateLabels","filter","sort"].includes(t)}}};class Nu extends De{constructor(e){super(),this.chart=e.chart,this.options=e.options,this.ctx=e.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(e,n){const a=this.options;if(this.left=0,this.top=0,!a.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=e,this.height=this.bottom=n;const i=ut(a.text)?a.text.length:1;this._padding=Vt(a.padding);const r=i*Mt(a.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=r:this.width=r}isHorizontal(){const e=this.options.position;return e==="top"||e==="bottom"}_drawArgs(e){const{top:n,left:a,bottom:i,right:r,options:s}=this,l=s.align;let o=0,c,d,u;return this.isHorizontal()?(d=Nt(l,a,r),u=n+e,c=r-a):(s.position==="left"?(d=a+e,u=Nt(l,i,n),o=Z*-.5):(d=r-e,u=Nt(l,n,i),o=Z*.5),c=i-n),{titleX:d,titleY:u,maxWidth:c,rotation:o}}draw(){const e=this.ctx,n=this.options;if(!n.display)return;const a=Mt(n.font),r=a.lineHeight/2+this._padding.top,{titleX:s,titleY:l,maxWidth:o,rotation:c}=this._drawArgs(r);wa(e,n.text,0,0,a,{color:n.color,maxWidth:o,rotation:c,textAlign:Tu(n.align),textBaseline:"middle",translation:[s,l]})}}function cS(t,e){const n=new Nu({ctx:t.ctx,options:e,chart:t});Ut.configure(t,n,e),Ut.addBox(t,n),t.titleBlock=n}var dS={id:"title",_element:Nu,start(t,e,n){cS(t,n)},stop(t){const e=t.titleBlock;Ut.removeBox(t,e),delete t.titleBlock},beforeUpdate(t,e,n){const a=t.titleBlock;Ut.configure(t,a,n),a.options=n},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Ms=new WeakMap;var uS={id:"subtitle",start(t,e,n){const a=new Nu({ctx:t.ctx,options:n,chart:t});Ut.configure(t,a,n),Ut.addBox(t,a),Ms.set(t,a)},stop(t){Ut.removeBox(t,Ms.get(t)),Ms.delete(t)},beforeUpdate(t,e,n){const a=Ms.get(t);Ut.configure(t,a,n),a.options=n},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Pi={average(t){if(!t.length)return!1;let e,n,a=new Set,i=0,r=0;for(e=0,n=t.length;e<n;++e){const l=t[e].element;if(l&&l.hasValue()){const o=l.tooltipPosition();a.add(o.x),i+=o.y,++r}}return r===0||a.size===0?!1:{x:[...a].reduce((l,o)=>l+o)/a.size,y:i/r}},nearest(t,e){if(!t.length)return!1;let n=e.x,a=e.y,i=Number.POSITIVE_INFINITY,r,s,l;for(r=0,s=t.length;r<s;++r){const o=t[r].element;if(o&&o.hasValue()){const c=o.getCenterPoint(),d=id(e,c);d<i&&(i=d,l=o)}}if(l){const o=l.tooltipPosition();n=o.x,a=o.y}return{x:n,y:a}}};function Ee(t,e){return e&&(ut(e)?Array.prototype.push.apply(t,e):t.push(e)),t}function Pe(t){return(typeof t=="string"||t instanceof String)&&t.indexOf(`
`)>-1?t.split(`
`):t}function fS(t,e){const{element:n,datasetIndex:a,index:i}=e,r=t.getDatasetMeta(a).controller,{label:s,value:l}=r.getLabelAndValue(i);return{chart:t,label:s,parsed:r.getParsed(i),raw:t.data.datasets[a].data[i],formattedValue:l,dataset:r.getDataset(),dataIndex:i,datasetIndex:a,element:n}}function x0(t,e){const n=t.chart.ctx,{body:a,footer:i,title:r}=t,{boxWidth:s,boxHeight:l}=e,o=Mt(e.bodyFont),c=Mt(e.titleFont),d=Mt(e.footerFont),u=r.length,f=i.length,h=a.length,m=Vt(e.padding);let b=m.height,v=0,p=a.reduce((x,_)=>x+_.before.length+_.lines.length+_.after.length,0);if(p+=t.beforeBody.length+t.afterBody.length,u&&(b+=u*c.lineHeight+(u-1)*e.titleSpacing+e.titleMarginBottom),p){const x=e.displayColors?Math.max(l,o.lineHeight):o.lineHeight;b+=h*x+(p-h)*o.lineHeight+(p-1)*e.bodySpacing}f&&(b+=e.footerMarginTop+f*d.lineHeight+(f-1)*e.footerSpacing);let g=0;const y=function(x){v=Math.max(v,n.measureText(x).width+g)};return n.save(),n.font=c.string,J(t.title,y),n.font=o.string,J(t.beforeBody.concat(t.afterBody),y),g=e.displayColors?s+2+e.boxPadding:0,J(a,x=>{J(x.before,y),J(x.lines,y),J(x.after,y)}),g=0,n.font=d.string,J(t.footer,y),n.restore(),v+=m.width,{width:v,height:b}}function hS(t,e){const{y:n,height:a}=e;return n<a/2?"top":n>t.height-a/2?"bottom":"center"}function pS(t,e,n,a){const{x:i,width:r}=a,s=n.caretSize+n.caretPadding;if(t==="left"&&i+r+s>e.width||t==="right"&&i-r-s<0)return!0}function gS(t,e,n,a){const{x:i,width:r}=n,{width:s,chartArea:{left:l,right:o}}=t;let c="center";return a==="center"?c=i<=(l+o)/2?"left":"right":i<=r/2?c="left":i>=s-r/2&&(c="right"),pS(c,t,e,n)&&(c="center"),c}function _0(t,e,n){const a=n.yAlign||e.yAlign||hS(t,n);return{xAlign:n.xAlign||e.xAlign||gS(t,e,n,a),yAlign:a}}function mS(t,e){let{x:n,width:a}=t;return e==="right"?n-=a:e==="center"&&(n-=a/2),n}function bS(t,e,n){let{y:a,height:i}=t;return e==="top"?a+=n:e==="bottom"?a-=i+n:a-=i/2,a}function k0(t,e,n,a){const{caretSize:i,caretPadding:r,cornerRadius:s}=t,{xAlign:l,yAlign:o}=n,c=i+r,{topLeft:d,topRight:u,bottomLeft:f,bottomRight:h}=ma(s);let m=mS(e,l);const b=bS(e,o,c);return o==="center"?l==="left"?m+=c:l==="right"&&(m-=c):l==="left"?m-=Math.max(d,f)+i:l==="right"&&(m+=Math.max(u,h)+i),{x:Ct(m,0,a.width-e.width),y:Ct(b,0,a.height-e.height)}}function As(t,e,n){const a=Vt(n.padding);return e==="center"?t.x+t.width/2:e==="right"?t.x+t.width-a.right:t.x+a.left}function S0(t){return Ee([],Pe(t))}function yS(t,e,n){return Jn(t,{tooltip:e,tooltipItems:n,type:"tooltip"})}function w0(t,e){const n=e&&e.dataset&&e.dataset.tooltip&&e.dataset.tooltip.callbacks;return n?t.override(n):t}const Lb={beforeTitle:Qe,title(t){if(t.length>0){const e=t[0],n=e.chart.data.labels,a=n?n.length:0;if(this&&this.options&&this.options.mode==="dataset")return e.dataset.label||"";if(e.label)return e.label;if(a>0&&e.dataIndex<a)return n[e.dataIndex]}return""},afterTitle:Qe,beforeBody:Qe,beforeLabel:Qe,label(t){if(this&&this.options&&this.options.mode==="dataset")return t.label+": "+t.formattedValue||t.formattedValue;let e=t.dataset.label||"";e&&(e+=": ");const n=t.formattedValue;return G(n)||(e+=n),e},labelColor(t){const n=t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);return{borderColor:n.borderColor,backgroundColor:n.backgroundColor,borderWidth:n.borderWidth,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(t){const n=t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);return{pointStyle:n.pointStyle,rotation:n.rotation}},afterLabel:Qe,afterBody:Qe,beforeFooter:Qe,footer:Qe,afterFooter:Qe};function Kt(t,e,n,a){const i=t[e].call(n,a);return typeof i>"u"?Lb[e].call(n,a):i}class hd extends De{constructor(e){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=e.chart,this.options=e.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(e){this.options=e,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const e=this._cachedAnimations;if(e)return e;const n=this.chart,a=this.options.setContext(this.getContext()),i=a.enabled&&n.options.animation&&a.animations,r=new hb(this.chart,i);return i._cacheable&&(this._cachedAnimations=Object.freeze(r)),r}getContext(){return this.$context||(this.$context=yS(this.chart.getContext(),this,this._tooltipItems))}getTitle(e,n){const{callbacks:a}=n,i=Kt(a,"beforeTitle",this,e),r=Kt(a,"title",this,e),s=Kt(a,"afterTitle",this,e);let l=[];return l=Ee(l,Pe(i)),l=Ee(l,Pe(r)),l=Ee(l,Pe(s)),l}getBeforeBody(e,n){return S0(Kt(n.callbacks,"beforeBody",this,e))}getBody(e,n){const{callbacks:a}=n,i=[];return J(e,r=>{const s={before:[],lines:[],after:[]},l=w0(a,r);Ee(s.before,Pe(Kt(l,"beforeLabel",this,r))),Ee(s.lines,Kt(l,"label",this,r)),Ee(s.after,Pe(Kt(l,"afterLabel",this,r))),i.push(s)}),i}getAfterBody(e,n){return S0(Kt(n.callbacks,"afterBody",this,e))}getFooter(e,n){const{callbacks:a}=n,i=Kt(a,"beforeFooter",this,e),r=Kt(a,"footer",this,e),s=Kt(a,"afterFooter",this,e);let l=[];return l=Ee(l,Pe(i)),l=Ee(l,Pe(r)),l=Ee(l,Pe(s)),l}_createItems(e){const n=this._active,a=this.chart.data,i=[],r=[],s=[];let l=[],o,c;for(o=0,c=n.length;o<c;++o)l.push(fS(this.chart,n[o]));return e.filter&&(l=l.filter((d,u,f)=>e.filter(d,u,f,a))),e.itemSort&&(l=l.sort((d,u)=>e.itemSort(d,u,a))),J(l,d=>{const u=w0(e.callbacks,d);i.push(Kt(u,"labelColor",this,d)),r.push(Kt(u,"labelPointStyle",this,d)),s.push(Kt(u,"labelTextColor",this,d))}),this.labelColors=i,this.labelPointStyles=r,this.labelTextColors=s,this.dataPoints=l,l}update(e,n){const a=this.options.setContext(this.getContext()),i=this._active;let r,s=[];if(!i.length)this.opacity!==0&&(r={opacity:0});else{const l=Pi[a.position].call(this,i,this._eventPosition);s=this._createItems(a),this.title=this.getTitle(s,a),this.beforeBody=this.getBeforeBody(s,a),this.body=this.getBody(s,a),this.afterBody=this.getAfterBody(s,a),this.footer=this.getFooter(s,a);const o=this._size=x0(this,a),c=Object.assign({},l,o),d=_0(this.chart,a,c),u=k0(a,c,d,this.chart);this.xAlign=d.xAlign,this.yAlign=d.yAlign,r={opacity:1,x:u.x,y:u.y,width:o.width,height:o.height,caretX:l.x,caretY:l.y}}this._tooltipItems=s,this.$context=void 0,r&&this._resolveAnimations().update(this,r),e&&a.external&&a.external.call(this,{chart:this.chart,tooltip:this,replay:n})}drawCaret(e,n,a,i){const r=this.getCaretPosition(e,a,i);n.lineTo(r.x1,r.y1),n.lineTo(r.x2,r.y2),n.lineTo(r.x3,r.y3)}getCaretPosition(e,n,a){const{xAlign:i,yAlign:r}=this,{caretSize:s,cornerRadius:l}=a,{topLeft:o,topRight:c,bottomLeft:d,bottomRight:u}=ma(l),{x:f,y:h}=e,{width:m,height:b}=n;let v,p,g,y,x,_;return r==="center"?(x=h+b/2,i==="left"?(v=f,p=v-s,y=x+s,_=x-s):(v=f+m,p=v+s,y=x-s,_=x+s),g=v):(i==="left"?p=f+Math.max(o,d)+s:i==="right"?p=f+m-Math.max(c,u)-s:p=this.caretX,r==="top"?(y=h,x=y-s,v=p-s,g=p+s):(y=h+b,x=y+s,v=p+s,g=p-s),_=y),{x1:v,x2:p,x3:g,y1:y,y2:x,y3:_}}drawTitle(e,n,a){const i=this.title,r=i.length;let s,l,o;if(r){const c=ii(a.rtl,this.x,this.width);for(e.x=As(this,a.titleAlign,a),n.textAlign=c.textAlign(a.titleAlign),n.textBaseline="middle",s=Mt(a.titleFont),l=a.titleSpacing,n.fillStyle=a.titleColor,n.font=s.string,o=0;o<r;++o)n.fillText(i[o],c.x(e.x),e.y+s.lineHeight/2),e.y+=s.lineHeight+l,o+1===r&&(e.y+=a.titleMarginBottom-l)}}_drawColorBox(e,n,a,i,r){const s=this.labelColors[a],l=this.labelPointStyles[a],{boxHeight:o,boxWidth:c}=r,d=Mt(r.bodyFont),u=As(this,"left",r),f=i.x(u),h=o<d.lineHeight?(d.lineHeight-o)/2:0,m=n.y+h;if(r.usePointStyle){const b={radius:Math.min(c,o)/2,pointStyle:l.pointStyle,rotation:l.rotation,borderWidth:1},v=i.leftForLtr(f,c)+c/2,p=m+o/2;e.strokeStyle=r.multiKeyBackground,e.fillStyle=r.multiKeyBackground,sd(e,b,v,p),e.strokeStyle=s.borderColor,e.fillStyle=s.backgroundColor,sd(e,b,v,p)}else{e.lineWidth=X(s.borderWidth)?Math.max(...Object.values(s.borderWidth)):s.borderWidth||1,e.strokeStyle=s.borderColor,e.setLineDash(s.borderDash||[]),e.lineDashOffset=s.borderDashOffset||0;const b=i.leftForLtr(f,c),v=i.leftForLtr(i.xPlus(f,1),c-2),p=ma(s.borderRadius);Object.values(p).some(g=>g!==0)?(e.beginPath(),e.fillStyle=r.multiKeyBackground,Lr(e,{x:b,y:m,w:c,h:o,radius:p}),e.fill(),e.stroke(),e.fillStyle=s.backgroundColor,e.beginPath(),Lr(e,{x:v,y:m+1,w:c-2,h:o-2,radius:p}),e.fill()):(e.fillStyle=r.multiKeyBackground,e.fillRect(b,m,c,o),e.strokeRect(b,m,c,o),e.fillStyle=s.backgroundColor,e.fillRect(v,m+1,c-2,o-2))}e.fillStyle=this.labelTextColors[a]}drawBody(e,n,a){const{body:i}=this,{bodySpacing:r,bodyAlign:s,displayColors:l,boxHeight:o,boxWidth:c,boxPadding:d}=a,u=Mt(a.bodyFont);let f=u.lineHeight,h=0;const m=ii(a.rtl,this.x,this.width),b=function(S){n.fillText(S,m.x(e.x+h),e.y+f/2),e.y+=f+r},v=m.textAlign(s);let p,g,y,x,_,w,k;for(n.textAlign=s,n.textBaseline="middle",n.font=u.string,e.x=As(this,v,a),n.fillStyle=a.bodyColor,J(this.beforeBody,b),h=l&&v!=="right"?s==="center"?c/2+d:c+2+d:0,x=0,w=i.length;x<w;++x){for(p=i[x],g=this.labelTextColors[x],n.fillStyle=g,J(p.before,b),y=p.lines,l&&y.length&&(this._drawColorBox(n,e,x,m,a),f=Math.max(u.lineHeight,o)),_=0,k=y.length;_<k;++_)b(y[_]),f=u.lineHeight;J(p.after,b)}h=0,f=u.lineHeight,J(this.afterBody,b),e.y-=r}drawFooter(e,n,a){const i=this.footer,r=i.length;let s,l;if(r){const o=ii(a.rtl,this.x,this.width);for(e.x=As(this,a.footerAlign,a),e.y+=a.footerMarginTop,n.textAlign=o.textAlign(a.footerAlign),n.textBaseline="middle",s=Mt(a.footerFont),n.fillStyle=a.footerColor,n.font=s.string,l=0;l<r;++l)n.fillText(i[l],o.x(e.x),e.y+s.lineHeight/2),e.y+=s.lineHeight+a.footerSpacing}}drawBackground(e,n,a,i){const{xAlign:r,yAlign:s}=this,{x:l,y:o}=e,{width:c,height:d}=a,{topLeft:u,topRight:f,bottomLeft:h,bottomRight:m}=ma(i.cornerRadius);n.fillStyle=i.backgroundColor,n.strokeStyle=i.borderColor,n.lineWidth=i.borderWidth,n.beginPath(),n.moveTo(l+u,o),s==="top"&&this.drawCaret(e,n,a,i),n.lineTo(l+c-f,o),n.quadraticCurveTo(l+c,o,l+c,o+f),s==="center"&&r==="right"&&this.drawCaret(e,n,a,i),n.lineTo(l+c,o+d-m),n.quadraticCurveTo(l+c,o+d,l+c-m,o+d),s==="bottom"&&this.drawCaret(e,n,a,i),n.lineTo(l+h,o+d),n.quadraticCurveTo(l,o+d,l,o+d-h),s==="center"&&r==="left"&&this.drawCaret(e,n,a,i),n.lineTo(l,o+u),n.quadraticCurveTo(l,o,l+u,o),n.closePath(),n.fill(),i.borderWidth>0&&n.stroke()}_updateAnimationTarget(e){const n=this.chart,a=this.$animations,i=a&&a.x,r=a&&a.y;if(i||r){const s=Pi[e.position].call(this,this._active,this._eventPosition);if(!s)return;const l=this._size=x0(this,e),o=Object.assign({},s,this._size),c=_0(n,e,o),d=k0(e,o,c,n);(i._to!==d.x||r._to!==d.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=l.width,this.height=l.height,this.caretX=s.x,this.caretY=s.y,this._resolveAnimations().update(this,d))}}_willRender(){return!!this.opacity}draw(e){const n=this.options.setContext(this.getContext());let a=this.opacity;if(!a)return;this._updateAnimationTarget(n);const i={width:this.width,height:this.height},r={x:this.x,y:this.y};a=Math.abs(a)<.001?0:a;const s=Vt(n.padding),l=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;n.enabled&&l&&(e.save(),e.globalAlpha=a,this.drawBackground(r,e,i,n),lb(e,n.textDirection),r.y+=s.top,this.drawTitle(r,e,n),this.drawBody(r,e,n),this.drawFooter(r,e,n),ob(e,n.textDirection),e.restore())}getActiveElements(){return this._active||[]}setActiveElements(e,n){const a=this._active,i=e.map(({datasetIndex:l,index:o})=>{const c=this.chart.getDatasetMeta(l);if(!c)throw new Error("Cannot find a dataset at index "+l);return{datasetIndex:l,element:c.data[o],index:o}}),r=!Tl(a,i),s=this._positionChanged(i,n);(r||s)&&(this._active=i,this._eventPosition=n,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(e,n,a=!0){if(n&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const i=this.options,r=this._active||[],s=this._getActiveElements(e,r,n,a),l=this._positionChanged(s,e),o=n||!Tl(s,r)||l;return o&&(this._active=s,(i.enabled||i.external)&&(this._eventPosition={x:e.x,y:e.y},this.update(!0,n))),o}_getActiveElements(e,n,a,i){const r=this.options;if(e.type==="mouseout")return[];if(!i)return n.filter(l=>this.chart.data.datasets[l.datasetIndex]&&this.chart.getDatasetMeta(l.datasetIndex).controller.getParsed(l.index)!==void 0);const s=this.chart.getElementsAtEventForMode(e,r.mode,r,a);return r.reverse&&s.reverse(),s}_positionChanged(e,n){const{caretX:a,caretY:i,options:r}=this,s=Pi[r.position].call(this,e,n);return s!==!1&&(a!==s.x||i!==s.y)}}D(hd,"positioners",Pi);var vS={id:"tooltip",_element:hd,positioners:Pi,afterInit(t,e,n){n&&(t.tooltip=new hd({chart:t,options:n}))},beforeUpdate(t,e,n){t.tooltip&&t.tooltip.initialize(n)},reset(t,e,n){t.tooltip&&t.tooltip.initialize(n)},afterDraw(t){const e=t.tooltip;if(e&&e._willRender()){const n={tooltip:e};if(t.notifyPlugins("beforeTooltipDraw",{...n,cancelable:!0})===!1)return;e.draw(t.ctx),t.notifyPlugins("afterTooltipDraw",n)}},afterEvent(t,e){if(t.tooltip){const n=e.replay;t.tooltip.handleEvent(e.event,n,e.inChartArea)&&(e.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(t,e)=>e.bodyFont.size,boxWidth:(t,e)=>e.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:Lb},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:t=>t!=="filter"&&t!=="itemSort"&&t!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},xS=Object.freeze({__proto__:null,Colors:zk,Decimation:Nk,Filler:nS,Legend:oS,SubTitle:uS,Title:dS,Tooltip:vS});const _S=(t,e,n,a)=>(typeof e=="string"?(n=t.push(e)-1,a.unshift({index:n,label:e})):isNaN(e)&&(n=null),n);function kS(t,e,n,a){const i=t.indexOf(e);if(i===-1)return _S(t,e,n,a);const r=t.lastIndexOf(e);return i!==r?n:i}const SS=(t,e)=>t===null?null:Ct(Math.round(t),0,e);function M0(t){const e=this.getLabels();return t>=0&&t<e.length?e[t]:t}class pd extends Oa{constructor(e){super(e),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(e){const n=this._addedLabels;if(n.length){const a=this.getLabels();for(const{index:i,label:r}of n)a[i]===r&&a.splice(i,1);this._addedLabels=[]}super.init(e)}parse(e,n){if(G(e))return null;const a=this.getLabels();return n=isFinite(n)&&a[n]===e?n:kS(a,e,B(n,e),this._addedLabels),SS(n,a.length-1)}determineDataLimits(){const{minDefined:e,maxDefined:n}=this.getUserBounds();let{min:a,max:i}=this.getMinMax(!0);this.options.bounds==="ticks"&&(e||(a=0),n||(i=this.getLabels().length-1)),this.min=a,this.max=i}buildTicks(){const e=this.min,n=this.max,a=this.options.offset,i=[];let r=this.getLabels();r=e===0&&n===r.length-1?r:r.slice(e,n+1),this._valueRange=Math.max(r.length-(a?0:1),1),this._startValue=this.min-(a?.5:0);for(let s=e;s<=n;s++)i.push({value:s});return i}getLabelForValue(e){return M0.call(this,e)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(e){return typeof e!="number"&&(e=this.parse(e)),e===null?NaN:this.getPixelForDecimal((e-this._startValue)/this._valueRange)}getPixelForTick(e){const n=this.ticks;return e<0||e>n.length-1?null:this.getPixelForValue(n[e].value)}getValueForPixel(e){return Math.round(this._startValue+this.getDecimalForPixel(e)*this._valueRange)}getBasePixel(){return this.bottom}}D(pd,"id","category"),D(pd,"defaults",{ticks:{callback:M0}});function wS(t,e){const n=[],{bounds:i,step:r,min:s,max:l,precision:o,count:c,maxTicks:d,maxDigits:u,includeBounds:f}=t,h=r||1,m=d-1,{min:b,max:v}=e,p=!G(s),g=!G(l),y=!G(c),x=(v-b)/(u+1);let _=xh((v-b)/m/h)*h,w,k,S,A;if(_<1e-14&&!p&&!g)return[{value:b},{value:v}];A=Math.ceil(v/_)-Math.floor(b/_),A>m&&(_=xh(A*_/m/h)*h),G(o)||(w=Math.pow(10,o),_=Math.ceil(_*w)/w),i==="ticks"?(k=Math.floor(b/_)*_,S=Math.ceil(v/_)*_):(k=b,S=v),p&&g&&r&&m_((l-s)/r,_/1e3)?(A=Math.round(Math.min((l-s)/_,d)),_=(l-s)/A,k=s,S=l):y?(k=p?s:k,S=g?l:S,A=c-1,_=(S-k)/A):(A=(S-k)/_,fr(A,Math.round(A),_/1e3)?A=Math.round(A):A=Math.ceil(A));const C=Math.max(_h(_),_h(k));w=Math.pow(10,G(o)?C:o),k=Math.round(k*w)/w,S=Math.round(S*w)/w;let z=0;for(p&&(f&&k!==s?(n.push({value:s}),k<s&&z++,fr(Math.round((k+z*_)*w)/w,s,A0(s,x,t))&&z++):k<s&&z++);z<A;++z){const N=Math.round((k+z*_)*w)/w;if(g&&N>l)break;n.push({value:N})}return g&&f&&S!==l?n.length&&fr(n[n.length-1].value,l,A0(l,x,t))?n[n.length-1].value=l:n.push({value:l}):(!g||S===l)&&n.push({value:S}),n}function A0(t,e,{horizontal:n,minRotation:a}){const i=Ae(a),r=(n?Math.sin(i):Math.cos(i))||.001,s=.75*e*(""+t).length;return Math.min(e/r,s)}class Ll extends Oa{constructor(e){super(e),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(e,n){return G(e)||(typeof e=="number"||e instanceof Number)&&!isFinite(+e)?null:+e}handleTickRangeOptions(){const{beginAtZero:e}=this.options,{minDefined:n,maxDefined:a}=this.getUserBounds();let{min:i,max:r}=this;const s=o=>i=n?i:o,l=o=>r=a?r:o;if(e){const o=je(i),c=je(r);o<0&&c<0?l(0):o>0&&c>0&&s(0)}if(i===r){let o=r===0?1:Math.abs(r*.05);l(r+o),e||s(i-o)}this.min=i,this.max=r}getTickLimit(){const e=this.options.ticks;let{maxTicksLimit:n,stepSize:a}=e,i;return a?(i=Math.ceil(this.max/a)-Math.floor(this.min/a)+1,i>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${a} would result generating up to ${i} ticks. Limiting to 1000.`),i=1e3)):(i=this.computeTickLimit(),n=n||11),n&&(i=Math.min(n,i)),i}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const e=this.options,n=e.ticks;let a=this.getTickLimit();a=Math.max(2,a);const i={maxTicks:a,bounds:e.bounds,min:e.min,max:e.max,precision:n.precision,step:n.stepSize,count:n.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:n.minRotation||0,includeBounds:n.includeBounds!==!1},r=this._range||this,s=wS(i,r);return e.bounds==="ticks"&&Xm(s,this,"value"),e.reverse?(s.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),s}configure(){const e=this.ticks;let n=this.min,a=this.max;if(super.configure(),this.options.offset&&e.length){const i=(a-n)/Math.max(e.length-1,1)/2;n-=i,a+=i}this._startValue=n,this._endValue=a,this._valueRange=a-n}getLabelForValue(e){return Ir(e,this.chart.options.locale,this.options.ticks.format)}}class gd extends Ll{determineDataLimits(){const{min:e,max:n}=this.getMinMax(!0);this.min=gt(e)?e:0,this.max=gt(n)?n:1,this.handleTickRangeOptions()}computeTickLimit(){const e=this.isHorizontal(),n=e?this.width:this.height,a=Ae(this.options.ticks.minRotation),i=(e?Math.sin(a):Math.cos(a))||.001,r=this._resolveTickFontOptions(0);return Math.ceil(n/Math.min(40,r.lineHeight/i))}getPixelForValue(e){return e===null?NaN:this.getPixelForDecimal((e-this._startValue)/this._valueRange)}getValueForPixel(e){return this._startValue+this.getDecimalForPixel(e)*this._valueRange}}D(gd,"id","linear"),D(gd,"defaults",{ticks:{callback:to.formatters.numeric}});const Nr=t=>Math.floor(Cn(t)),aa=(t,e)=>Math.pow(10,Nr(t)+e);function T0(t){return t/Math.pow(10,Nr(t))===1}function D0(t,e,n){const a=Math.pow(10,n),i=Math.floor(t/a);return Math.ceil(e/a)-i}function MS(t,e){const n=e-t;let a=Nr(n);for(;D0(t,e,a)>10;)a++;for(;D0(t,e,a)<10;)a--;return Math.min(a,Nr(t))}function AS(t,{min:e,max:n}){e=ee(t.min,e);const a=[],i=Nr(e);let r=MS(e,n),s=r<0?Math.pow(10,Math.abs(r)):1;const l=Math.pow(10,r),o=i>r?Math.pow(10,i):0,c=Math.round((e-o)*s)/s,d=Math.floor((e-o)/l/10)*l*10;let u=Math.floor((c-d)/Math.pow(10,r)),f=ee(t.min,Math.round((o+d+u*Math.pow(10,r))*s)/s);for(;f<n;)a.push({value:f,major:T0(f),significand:u}),u>=10?u=u<15?15:20:u++,u>=20&&(r++,u=2,s=r>=0?1:s),f=Math.round((o+d+u*Math.pow(10,r))*s)/s;const h=ee(t.max,f);return a.push({value:h,major:T0(h),significand:u}),a}class md extends Oa{constructor(e){super(e),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(e,n){const a=Ll.prototype.parse.apply(this,[e,n]);if(a===0){this._zero=!0;return}return gt(a)&&a>0?a:null}determineDataLimits(){const{min:e,max:n}=this.getMinMax(!0);this.min=gt(e)?Math.max(0,e):null,this.max=gt(n)?Math.max(0,n):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!gt(this._userMin)&&(this.min=e===aa(this.min,0)?aa(this.min,-1):aa(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:e,maxDefined:n}=this.getUserBounds();let a=this.min,i=this.max;const r=l=>a=e?a:l,s=l=>i=n?i:l;a===i&&(a<=0?(r(1),s(10)):(r(aa(a,-1)),s(aa(i,1)))),a<=0&&r(aa(i,-1)),i<=0&&s(aa(a,1)),this.min=a,this.max=i}buildTicks(){const e=this.options,n={min:this._userMin,max:this._userMax},a=AS(n,this);return e.bounds==="ticks"&&Xm(a,this,"value"),e.reverse?(a.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),a}getLabelForValue(e){return e===void 0?"0":Ir(e,this.chart.options.locale,this.options.ticks.format)}configure(){const e=this.min;super.configure(),this._startValue=Cn(e),this._valueRange=Cn(this.max)-Cn(e)}getPixelForValue(e){return(e===void 0||e===0)&&(e=this.min),e===null||isNaN(e)?NaN:this.getPixelForDecimal(e===this.min?0:(Cn(e)-this._startValue)/this._valueRange)}getValueForPixel(e){const n=this.getDecimalForPixel(e);return Math.pow(10,this._startValue+n*this._valueRange)}}D(md,"id","logarithmic"),D(md,"defaults",{ticks:{callback:to.formatters.logarithmic,major:{enabled:!0}}});function bd(t){const e=t.ticks;if(e.display&&t.display){const n=Vt(e.backdropPadding);return B(e.font&&e.font.size,ft.font.size)+n.height}return 0}function TS(t,e,n){return n=ut(n)?n:[n],{w:R_(t,e.string,n),h:n.length*e.lineHeight}}function C0(t,e,n,a,i){return t===a||t===i?{start:e-n/2,end:e+n/2}:t<a||t>i?{start:e-n,end:e}:{start:e,end:e+n}}function DS(t){const e={l:t.left+t._padding.left,r:t.right-t._padding.right,t:t.top+t._padding.top,b:t.bottom-t._padding.bottom},n=Object.assign({},e),a=[],i=[],r=t._pointLabels.length,s=t.options.pointLabels,l=s.centerPointLabels?Z/r:0;for(let o=0;o<r;o++){const c=s.setContext(t.getPointLabelContext(o));i[o]=c.padding;const d=t.getPointPosition(o,t.drawingArea+i[o],l),u=Mt(c.font),f=TS(t.ctx,u,t._pointLabels[o]);a[o]=f;const h=Ht(t.getIndexAngle(o)+l),m=Math.round(Mu(h)),b=C0(m,d.x,f.w,0,180),v=C0(m,d.y,f.h,90,270);CS(n,e,h,b,v)}t.setCenterPoint(e.l-n.l,n.r-e.r,e.t-n.t,n.b-e.b),t._pointLabelItems=zS(t,a,i)}function CS(t,e,n,a,i){const r=Math.abs(Math.sin(n)),s=Math.abs(Math.cos(n));let l=0,o=0;a.start<e.l?(l=(e.l-a.start)/r,t.l=Math.min(t.l,e.l-l)):a.end>e.r&&(l=(a.end-e.r)/r,t.r=Math.max(t.r,e.r+l)),i.start<e.t?(o=(e.t-i.start)/s,t.t=Math.min(t.t,e.t-o)):i.end>e.b&&(o=(i.end-e.b)/s,t.b=Math.max(t.b,e.b+o))}function OS(t,e,n){const a=t.drawingArea,{extra:i,additionalAngle:r,padding:s,size:l}=n,o=t.getPointPosition(e,a+i+s,r),c=Math.round(Mu(Ht(o.angle+bt))),d=BS(o.y,l.h,c),u=RS(c),f=LS(o.x,l.w,u);return{visible:!0,x:o.x,y:d,textAlign:u,left:f,top:d,right:f+l.w,bottom:d+l.h}}function ES(t,e){if(!e)return!0;const{left:n,top:a,right:i,bottom:r}=t;return!(sn({x:n,y:a},e)||sn({x:n,y:r},e)||sn({x:i,y:a},e)||sn({x:i,y:r},e))}function zS(t,e,n){const a=[],i=t._pointLabels.length,r=t.options,{centerPointLabels:s,display:l}=r.pointLabels,o={extra:bd(r)/2,additionalAngle:s?Z/i:0};let c;for(let d=0;d<i;d++){o.padding=n[d],o.size=e[d];const u=OS(t,d,o);a.push(u),l==="auto"&&(u.visible=ES(u,c),u.visible&&(c=u))}return a}function RS(t){return t===0||t===180?"center":t<180?"left":"right"}function LS(t,e,n){return n==="right"?t-=e:n==="center"&&(t-=e/2),t}function BS(t,e,n){return n===90||n===270?t-=e/2:(n>270||n<90)&&(t-=e),t}function NS(t,e,n){const{left:a,top:i,right:r,bottom:s}=n,{backdropColor:l}=e;if(!G(l)){const o=ma(e.borderRadius),c=Vt(e.backdropPadding);t.fillStyle=l;const d=a-c.left,u=i-c.top,f=r-a+c.width,h=s-i+c.height;Object.values(o).some(m=>m!==0)?(t.beginPath(),Lr(t,{x:d,y:u,w:f,h,radius:o}),t.fill()):t.fillRect(d,u,f,h)}}function jS(t,e){const{ctx:n,options:{pointLabels:a}}=t;for(let i=e-1;i>=0;i--){const r=t._pointLabelItems[i];if(!r.visible)continue;const s=a.setContext(t.getPointLabelContext(i));NS(n,s,r);const l=Mt(s.font),{x:o,y:c,textAlign:d}=r;wa(n,t._pointLabels[i],o,c+l.lineHeight/2,l,{color:s.color,textAlign:d,textBaseline:"middle"})}}function Bb(t,e,n,a){const{ctx:i}=t;if(n)i.arc(t.xCenter,t.yCenter,e,0,ot);else{let r=t.getPointPosition(0,e);i.moveTo(r.x,r.y);for(let s=1;s<a;s++)r=t.getPointPosition(s,e),i.lineTo(r.x,r.y)}}function HS(t,e,n,a,i){const r=t.ctx,s=e.circular,{color:l,lineWidth:o}=e;!s&&!a||!l||!o||n<0||(r.save(),r.strokeStyle=l,r.lineWidth=o,r.setLineDash(i.dash||[]),r.lineDashOffset=i.dashOffset,r.beginPath(),Bb(t,n,s,a),r.closePath(),r.stroke(),r.restore())}function US(t,e,n){return Jn(t,{label:n,index:e,type:"pointLabel"})}class Wi extends Ll{constructor(e){super(e),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const e=this._padding=Vt(bd(this.options)/2),n=this.width=this.maxWidth-e.width,a=this.height=this.maxHeight-e.height;this.xCenter=Math.floor(this.left+n/2+e.left),this.yCenter=Math.floor(this.top+a/2+e.top),this.drawingArea=Math.floor(Math.min(n,a)/2)}determineDataLimits(){const{min:e,max:n}=this.getMinMax(!1);this.min=gt(e)&&!isNaN(e)?e:0,this.max=gt(n)&&!isNaN(n)?n:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/bd(this.options))}generateTickLabels(e){Ll.prototype.generateTickLabels.call(this,e),this._pointLabels=this.getLabels().map((n,a)=>{const i=nt(this.options.pointLabels.callback,[n,a],this);return i||i===0?i:""}).filter((n,a)=>this.chart.getDataVisibility(a))}fit(){const e=this.options;e.display&&e.pointLabels.display?DS(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(e,n,a,i){this.xCenter+=Math.floor((e-n)/2),this.yCenter+=Math.floor((a-i)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(e,n,a,i))}getIndexAngle(e){const n=ot/(this._pointLabels.length||1),a=this.options.startAngle||0;return Ht(e*n+Ae(a))}getDistanceFromCenterForValue(e){if(G(e))return NaN;const n=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-e)*n:(e-this.min)*n}getValueForDistanceFromCenter(e){if(G(e))return NaN;const n=e/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-n:this.min+n}getPointLabelContext(e){const n=this._pointLabels||[];if(e>=0&&e<n.length){const a=n[e];return US(this.getContext(),e,a)}}getPointPosition(e,n,a=0){const i=this.getIndexAngle(e)-bt+a;return{x:Math.cos(i)*n+this.xCenter,y:Math.sin(i)*n+this.yCenter,angle:i}}getPointPositionForValue(e,n){return this.getPointPosition(e,this.getDistanceFromCenterForValue(n))}getBasePosition(e){return this.getPointPositionForValue(e||0,this.getBaseValue())}getPointLabelPosition(e){const{left:n,top:a,right:i,bottom:r}=this._pointLabelItems[e];return{left:n,top:a,right:i,bottom:r}}drawBackground(){const{backgroundColor:e,grid:{circular:n}}=this.options;if(e){const a=this.ctx;a.save(),a.beginPath(),Bb(this,this.getDistanceFromCenterForValue(this._endValue),n,this._pointLabels.length),a.closePath(),a.fillStyle=e,a.fill(),a.restore()}}drawGrid(){const e=this.ctx,n=this.options,{angleLines:a,grid:i,border:r}=n,s=this._pointLabels.length;let l,o,c;if(n.pointLabels.display&&jS(this,s),i.display&&this.ticks.forEach((d,u)=>{if(u!==0||u===0&&this.min<0){o=this.getDistanceFromCenterForValue(d.value);const f=this.getContext(u),h=i.setContext(f),m=r.setContext(f);HS(this,h,o,s,m)}}),a.display){for(e.save(),l=s-1;l>=0;l--){const d=a.setContext(this.getPointLabelContext(l)),{color:u,lineWidth:f}=d;!f||!u||(e.lineWidth=f,e.strokeStyle=u,e.setLineDash(d.borderDash),e.lineDashOffset=d.borderDashOffset,o=this.getDistanceFromCenterForValue(n.reverse?this.min:this.max),c=this.getPointPosition(l,o),e.beginPath(),e.moveTo(this.xCenter,this.yCenter),e.lineTo(c.x,c.y),e.stroke())}e.restore()}}drawBorder(){}drawLabels(){const e=this.ctx,n=this.options,a=n.ticks;if(!a.display)return;const i=this.getIndexAngle(0);let r,s;e.save(),e.translate(this.xCenter,this.yCenter),e.rotate(i),e.textAlign="center",e.textBaseline="middle",this.ticks.forEach((l,o)=>{if(o===0&&this.min>=0&&!n.reverse)return;const c=a.setContext(this.getContext(o)),d=Mt(c.font);if(r=this.getDistanceFromCenterForValue(this.ticks[o].value),c.showLabelBackdrop){e.font=d.string,s=e.measureText(l.label).width,e.fillStyle=c.backdropColor;const u=Vt(c.backdropPadding);e.fillRect(-s/2-u.left,-r-d.size/2-u.top,s+u.width,d.size+u.height)}wa(e,l.label,0,-r,d,{color:c.color,strokeColor:c.textStrokeColor,strokeWidth:c.textStrokeWidth})}),e.restore()}drawTitle(){}}D(Wi,"id","radialLinear"),D(Wi,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:to.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(e){return e},padding:5,centerPointLabels:!1}}),D(Wi,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),D(Wi,"descriptors",{angleLines:{_fallback:"grid"}});const so={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},Jt=Object.keys(so);function O0(t,e){return t-e}function E0(t,e){if(G(e))return null;const n=t._adapter,{parser:a,round:i,isoWeekday:r}=t._parseOpts;let s=e;return typeof a=="function"&&(s=a(s)),gt(s)||(s=typeof a=="string"?n.parse(s,a):n.parse(s)),s===null?null:(i&&(s=i==="week"&&(mi(r)||r===!0)?n.startOf(s,"isoWeek",r):n.startOf(s,i)),+s)}function z0(t,e,n,a){const i=Jt.length;for(let r=Jt.indexOf(t);r<i-1;++r){const s=so[Jt[r]],l=s.steps?s.steps:Number.MAX_SAFE_INTEGER;if(s.common&&Math.ceil((n-e)/(l*s.size))<=a)return Jt[r]}return Jt[i-1]}function VS(t,e,n,a,i){for(let r=Jt.length-1;r>=Jt.indexOf(n);r--){const s=Jt[r];if(so[s].common&&t._adapter.diff(i,a,s)>=e-1)return s}return Jt[n?Jt.indexOf(n):0]}function YS(t){for(let e=Jt.indexOf(t)+1,n=Jt.length;e<n;++e)if(so[Jt[e]].common)return Jt[e]}function R0(t,e,n){if(!n)t[e]=!0;else if(n.length){const{lo:a,hi:i}=Au(n,e),r=n[a]>=e?n[a]:n[i];t[r]=!0}}function GS(t,e,n,a){const i=t._adapter,r=+i.startOf(e[0].value,a),s=e[e.length-1].value;let l,o;for(l=r;l<=s;l=+i.add(l,1,a))o=n[l],o>=0&&(e[o].major=!0);return e}function L0(t,e,n){const a=[],i={},r=e.length;let s,l;for(s=0;s<r;++s)l=e[s],i[l]=s,a.push({value:l,major:!1});return r===0||!n?a:GS(t,a,i,n)}class jr extends Oa{constructor(e){super(e),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(e,n={}){const a=e.time||(e.time={}),i=this._adapter=new W2._date(e.adapters.date);i.init(n),ur(a.displayFormats,i.formats()),this._parseOpts={parser:a.parser,round:a.round,isoWeekday:a.isoWeekday},super.init(e),this._normalized=n.normalized}parse(e,n){return e===void 0?null:E0(this,e)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const e=this.options,n=this._adapter,a=e.time.unit||"day";let{min:i,max:r,minDefined:s,maxDefined:l}=this.getUserBounds();function o(c){!s&&!isNaN(c.min)&&(i=Math.min(i,c.min)),!l&&!isNaN(c.max)&&(r=Math.max(r,c.max))}(!s||!l)&&(o(this._getLabelBounds()),(e.bounds!=="ticks"||e.ticks.source!=="labels")&&o(this.getMinMax(!1))),i=gt(i)&&!isNaN(i)?i:+n.startOf(Date.now(),a),r=gt(r)&&!isNaN(r)?r:+n.endOf(Date.now(),a)+1,this.min=Math.min(i,r-1),this.max=Math.max(i+1,r)}_getLabelBounds(){const e=this.getLabelTimestamps();let n=Number.POSITIVE_INFINITY,a=Number.NEGATIVE_INFINITY;return e.length&&(n=e[0],a=e[e.length-1]),{min:n,max:a}}buildTicks(){const e=this.options,n=e.time,a=e.ticks,i=a.source==="labels"?this.getLabelTimestamps():this._generate();e.bounds==="ticks"&&i.length&&(this.min=this._userMin||i[0],this.max=this._userMax||i[i.length-1]);const r=this.min,s=this.max,l=x_(i,r,s);return this._unit=n.unit||(a.autoSkip?z0(n.minUnit,this.min,this.max,this._getLabelCapacity(r)):VS(this,l.length,n.minUnit,this.min,this.max)),this._majorUnit=!a.major.enabled||this._unit==="year"?void 0:YS(this._unit),this.initOffsets(i),e.reverse&&l.reverse(),L0(this,l,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(e=>+e.value))}initOffsets(e=[]){let n=0,a=0,i,r;this.options.offset&&e.length&&(i=this.getDecimalForValue(e[0]),e.length===1?n=1-i:n=(this.getDecimalForValue(e[1])-i)/2,r=this.getDecimalForValue(e[e.length-1]),e.length===1?a=r:a=(r-this.getDecimalForValue(e[e.length-2]))/2);const s=e.length<3?.5:.25;n=Ct(n,0,s),a=Ct(a,0,s),this._offsets={start:n,end:a,factor:1/(n+1+a)}}_generate(){const e=this._adapter,n=this.min,a=this.max,i=this.options,r=i.time,s=r.unit||z0(r.minUnit,n,a,this._getLabelCapacity(n)),l=B(i.ticks.stepSize,1),o=s==="week"?r.isoWeekday:!1,c=mi(o)||o===!0,d={};let u=n,f,h;if(c&&(u=+e.startOf(u,"isoWeek",o)),u=+e.startOf(u,c?"day":s),e.diff(a,n,s)>1e5*l)throw new Error(n+" and "+a+" are too far apart with stepSize of "+l+" "+s);const m=i.ticks.source==="data"&&this.getDataTimestamps();for(f=u,h=0;f<a;f=+e.add(f,l,s),h++)R0(d,f,m);return(f===a||i.bounds==="ticks"||h===1)&&R0(d,f,m),Object.keys(d).sort(O0).map(b=>+b)}getLabelForValue(e){const n=this._adapter,a=this.options.time;return a.tooltipFormat?n.format(e,a.tooltipFormat):n.format(e,a.displayFormats.datetime)}format(e,n){const i=this.options.time.displayFormats,r=this._unit,s=n||i[r];return this._adapter.format(e,s)}_tickFormatFunction(e,n,a,i){const r=this.options,s=r.ticks.callback;if(s)return nt(s,[e,n,a],this);const l=r.time.displayFormats,o=this._unit,c=this._majorUnit,d=o&&l[o],u=c&&l[c],f=a[n],h=c&&u&&f&&f.major;return this._adapter.format(e,i||(h?u:d))}generateTickLabels(e){let n,a,i;for(n=0,a=e.length;n<a;++n)i=e[n],i.label=this._tickFormatFunction(i.value,n,e)}getDecimalForValue(e){return e===null?NaN:(e-this.min)/(this.max-this.min)}getPixelForValue(e){const n=this._offsets,a=this.getDecimalForValue(e);return this.getPixelForDecimal((n.start+a)*n.factor)}getValueForPixel(e){const n=this._offsets,a=this.getDecimalForPixel(e)/n.factor-n.end;return this.min+a*(this.max-this.min)}_getLabelSize(e){const n=this.options.ticks,a=this.ctx.measureText(e).width,i=Ae(this.isHorizontal()?n.maxRotation:n.minRotation),r=Math.cos(i),s=Math.sin(i),l=this._resolveTickFontOptions(0).size;return{w:a*r+l*s,h:a*s+l*r}}_getLabelCapacity(e){const n=this.options.time,a=n.displayFormats,i=a[n.unit]||a.millisecond,r=this._tickFormatFunction(e,0,L0(this,[e],this._majorUnit),i),s=this._getLabelSize(r),l=Math.floor(this.isHorizontal()?this.width/s.w:this.height/s.h)-1;return l>0?l:1}getDataTimestamps(){let e=this._cache.data||[],n,a;if(e.length)return e;const i=this.getMatchingVisibleMetas();if(this._normalized&&i.length)return this._cache.data=i[0].controller.getAllParsedValues(this);for(n=0,a=i.length;n<a;++n)e=e.concat(i[n].controller.getAllParsedValues(this));return this._cache.data=this.normalize(e)}getLabelTimestamps(){const e=this._cache.labels||[];let n,a;if(e.length)return e;const i=this.getLabels();for(n=0,a=i.length;n<a;++n)e.push(E0(this,i[n]));return this._cache.labels=this._normalized?e:this.normalize(e)}normalize(e){return Zm(e.sort(O0))}}D(jr,"id","time"),D(jr,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function Ts(t,e,n){let a=0,i=t.length-1,r,s,l,o;n?(e>=t[a].pos&&e<=t[i].pos&&({lo:a,hi:i}=rn(t,"pos",e)),{pos:r,time:l}=t[a],{pos:s,time:o}=t[i]):(e>=t[a].time&&e<=t[i].time&&({lo:a,hi:i}=rn(t,"time",e)),{time:r,pos:l}=t[a],{time:s,pos:o}=t[i]);const c=s-r;return c?l+(o-l)*(e-r)/c:l}class yd extends jr{constructor(e){super(e),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const e=this._getTimestampsForTable(),n=this._table=this.buildLookupTable(e);this._minPos=Ts(n,this.min),this._tableRange=Ts(n,this.max)-this._minPos,super.initOffsets(e)}buildLookupTable(e){const{min:n,max:a}=this,i=[],r=[];let s,l,o,c,d;for(s=0,l=e.length;s<l;++s)c=e[s],c>=n&&c<=a&&i.push(c);if(i.length<2)return[{time:n,pos:0},{time:a,pos:1}];for(s=0,l=i.length;s<l;++s)d=i[s+1],o=i[s-1],c=i[s],Math.round((d+o)/2)!==c&&r.push({time:c,pos:s/(l-1)});return r}_generate(){const e=this.min,n=this.max;let a=super.getDataTimestamps();return(!a.includes(e)||!a.length)&&a.splice(0,0,e),(!a.includes(n)||a.length===1)&&a.push(n),a.sort((i,r)=>i-r)}_getTimestampsForTable(){let e=this._cache.all||[];if(e.length)return e;const n=this.getDataTimestamps(),a=this.getLabelTimestamps();return n.length&&a.length?e=this.normalize(n.concat(a)):e=n.length?n:a,e=this._cache.all=e,e}getDecimalForValue(e){return(Ts(this._table,e)-this._minPos)/this._tableRange}getValueForPixel(e){const n=this._offsets,a=this.getDecimalForPixel(e)/n.factor-n.end;return Ts(this._table,a*this._tableRange+this._minPos,!0)}}D(yd,"id","timeseries"),D(yd,"defaults",jr.defaults);var qS=Object.freeze({__proto__:null,CategoryScale:pd,LinearScale:gd,LogarithmicScale:md,RadialLinearScale:Wi,TimeScale:jr,TimeSeriesScale:yd});const XS=[P2,Mk,xS,qS];Ie.register(...XS);const vd="hangar.finnhubKey",FS=["finnhubKey","finnhubToken","token"],Ba=4,Hr=24;function vi(t){return typeof t=="string"?t.trim():""}function QS(t={}){return vi((t==null?void 0:t.VITE_FINNHUB_KEY)||"")}function ju(t){return typeof t=="string"?t.trim().replace(/\/+$/,""):""}function ZS(t={}){return ju((t==null?void 0:t.VITE_FINNHUB_PROXY_BASE_URL)||"")}function KS(t=globalThis==null?void 0:globalThis.localStorage){if(!t||typeof t.getItem!="function")return"";try{return vi(t.getItem(vd)||"")}catch{return""}}function PS(t,e=globalThis==null?void 0:globalThis.localStorage){if(!e||typeof e.setItem!="function")return;const n=vi(t);try{n?e.setItem(vd,n):typeof e.removeItem=="function"&&e.removeItem(vd)}catch{}}function WS({viteEnv:t={},search:e="",appConfig:n={},storage:a=globalThis==null?void 0:globalThis.localStorage}={}){var l;let i="",r="missing";const s=QS(t);if(s)return{key:s,source:"env"};try{const o=new URLSearchParams(e||"");for(const c of FS){const d=vi(o.get(c));if(d){i=d,r="query",PS(d,a);break}}}catch{}if(!i){const o=KS(a);o&&(i=o,r="storage")}if(!i){const o=vi(((l=n==null?void 0:n.marketData)==null?void 0:l.finnhubKey)||"");o&&(i=o,r="config")}return{key:i,source:r}}function JS({viteEnv:t={},search:e="",appConfig:n={},storage:a=globalThis==null?void 0:globalThis.localStorage}={}){var l;const i=ZS(t);if(i)return{mode:"proxy",source:"proxy-env",proxyBaseUrl:i,key:""};const r=ju(((l=n==null?void 0:n.marketData)==null?void 0:l.finnhubProxyBaseUrl)||"");if(r)return{mode:"proxy",source:"proxy-config",proxyBaseUrl:r,key:""};const s=WS({viteEnv:t,search:e,appConfig:n,storage:a});return{mode:s.key?"direct":"missing",source:s.source,proxyBaseUrl:"",key:s.key}}function Nb(t,e=Hr){return Array.isArray(t)?t.map((n,a)=>({id:(n==null?void 0:n.id)||(n==null?void 0:n.headline)||`news-${a}`,headline:String((n==null?void 0:n.headline)||"").trim(),summary:String((n==null?void 0:n.summary)||"").trim(),source:String((n==null?void 0:n.source)||"Finnhub").trim(),url:String((n==null?void 0:n.url)||"").trim(),image:String((n==null?void 0:n.image)||"").trim(),category:String((n==null?void 0:n.category)||"").trim(),datetime:Number(n==null?void 0:n.datetime)||0})).filter(n=>n.headline&&n.url).sort((n,a)=>a.datetime-n.datetime).slice(0,e):[]}async function IS({apiKey:t,fetchImpl:e=globalThis.fetch,category:n="general",limit:a=Hr}={}){const i=vi(t);if(!i)throw new Error("FINNHUB_KEY_MISSING");if(typeof e!="function")throw new Error("FETCH_UNAVAILABLE");const r=new URL("https://finnhub.io/api/v1/news");r.searchParams.set("category",n),r.searchParams.set("token",i);const s=await e(r.toString(),{headers:{Accept:"application/json"},cache:"no-cache"});if(!s.ok)throw new Error(`FINNHUB_NEWS_${s.status}`);const l=await s.json();return Nb(l,a)}async function $S({baseUrl:t,fetchImpl:e=globalThis.fetch,category:n="general",limit:a=Hr}={}){const i=ju(t);if(!i)throw new Error("FINNHUB_PROXY_BASE_URL_MISSING");if(typeof e!="function")throw new Error("FETCH_UNAVAILABLE");const r=new URL(`${i}/api/finnhub/news`);r.searchParams.set("category",n),r.searchParams.set("limit",String(a));const s=await e(r.toString(),{headers:{Accept:"application/json"},cache:"no-cache"});let l=null;try{l=await s.json()}catch{l=null}if(!s.ok){const o=typeof(l==null?void 0:l.error)=="string"?l.error:`FINNHUB_PROXY_${s.status}`;throw new Error(o)}return Nb((l==null?void 0:l.items)??l,a)}const tw={VITE_FINNHUB_KEY:"d7g4oihr01qqb8ribc8gd7g4oihr01qqb8ribc90"};function rc(t,e,n){typeof window>"u"||(window.latestFinnhubMarketNews=Array.isArray(t)?t:[],document.dispatchEvent(new CustomEvent("finnhubMarketNewsUpdated",{detail:{items:window.latestFinnhubMarketNews,status:e,accessDetails:n,keyDetails:n}})))}function ew(){const t=jt.useMemo(()=>typeof window>"u"?{mode:"missing",key:"",proxyBaseUrl:"",source:"missing"}:JS({viteEnv:tw,search:window.location.search,appConfig:window.APP_CONFIG||{},storage:window.localStorage}),[]),[e,n]=jt.useState([]),[a,i]=jt.useState(t.mode==="missing"?"missing-config":"loading"),[r,s]=jt.useState(""),[l,o]=jt.useState(0),c=jt.useCallback(async()=>{if(t.mode==="missing"){i("missing-config"),n([]),s(""),rc([],"missing-config",t);return}i("loading"),s("");try{const d=t.mode==="proxy"?await $S({baseUrl:t.proxyBaseUrl,limit:Hr}):await IS({apiKey:t.key,limit:Hr});n(d),i(d.length?"ready":"empty"),o(Date.now()),rc(d,d.length?"ready":"empty",t)}catch(d){n([]),i("error"),s(d instanceof Error?d.message:"Unable to load market news."),rc([],"error",t)}},[t]);return jt.useEffect(()=>{c()},[c]),{items:e,status:a,error:r,lastUpdated:l,refresh:c,accessDetails:t}}function nw(t){return!t||t.source==="missing"?"Not configured":{"proxy-env":"Proxy env","proxy-config":"Proxy config",env:"Env key",query:"Query key",storage:"Stored key",config:"Runtime key"}[t.source]||t.source}function aw(t){if(!t)return"--";const e=new Date(t*1e3);return Number.isNaN(e.getTime())?"--":e.toLocaleString("en-US",{month:"short",day:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function iw(t){return t?t.length<=180?t:`${t.slice(0,177).trim()}...`:"Open the article for the full market brief."}function rw(){const{items:t,status:e,error:n,lastUpdated:a,refresh:i,accessDetails:r}=ew(),[s,l]=jt.useState(1),o=jt.useMemo(()=>a?new Date(a).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"Awaiting first sync",[a]);jt.useEffect(()=>{l(1)},[t]);const c=Math.max(1,Math.ceil(t.length/Ba)),d=jt.useMemo(()=>{const h=(s-1)*Ba;return t.slice(h,h+Ba)},[s,t]),u=jt.useMemo(()=>{if(!t.length)return"No stories loaded yet";const h=(s-1)*Ba+1,m=Math.min(t.length,s*Ba);return`Showing ${h}-${m} of ${t.length} headlines`},[s,t]),f=e==="loading";return O.jsxs("article",{className:"bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-5 space-y-5",children:[O.jsxs("div",{className:"flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",children:[O.jsxs("div",{className:"space-y-1",children:[O.jsx("p",{className:"text-xs font-semibold tracking-widest uppercase text-sky-500 dark:text-sky-300",children:"Global Market Brief"}),O.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white",children:"World Stock News"}),O.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-400 max-w-3xl",children:"Live headlines from Finnhub's general market news feed so the supply deck surfaces what is moving global equities right now."})]}),O.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-xs",children:[O.jsxs("span",{className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60",children:[O.jsx("span",{className:"font-semibold",children:"Feed source"}),O.jsx("span",{children:nw(r)})]}),O.jsxs("span",{className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 dark:bg-sky-900/30 text-sky-600 dark:text-sky-200 border border-sky-500/20 dark:border-sky-500/30",children:[O.jsx("span",{className:"font-semibold",children:"Last sync"}),O.jsx("span",{children:o})]}),O.jsxs("button",{type:"button",onClick:i,disabled:f||e==="missing-config",className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-sky-500/40 text-sky-600 dark:text-sky-200 bg-white/70 dark:bg-slate-900/50 text-xs font-semibold hover:bg-sky-500/10 hover:border-sky-500/70 transition disabled:opacity-50 disabled:cursor-not-allowed",children:[O.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:O.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})}),f?"Refreshing...":"Refresh feed"]})]})]}),e==="missing-config"?O.jsxs("div",{className:"rounded-xl border border-amber-300/70 dark:border-amber-500/40 bg-amber-50/80 dark:bg-amber-900/20 p-4 space-y-2 text-sm text-amber-800 dark:text-amber-100",children:[O.jsx("p",{className:"font-semibold",children:"Finnhub feed is not configured."}),O.jsxs("p",{children:["Recommended for production: set ",O.jsx("code",{children:"VITE_FINNHUB_PROXY_BASE_URL"})," or"," ",O.jsx("code",{children:"window.APP_CONFIG.marketData.finnhubProxyBaseUrl"})," to a proxy endpoint that keeps"," ",O.jsx("code",{children:"FINNHUB_API_KEY"})," on the server. Direct key sources still work as local fallbacks."]})]}):null,e==="error"?O.jsxs("div",{className:"rounded-xl border border-rose-300/70 dark:border-rose-500/40 bg-rose-50/80 dark:bg-rose-900/20 p-4 text-sm text-rose-700 dark:text-rose-100",children:["Unable to load world stock news. ",n||"Unknown error."]}):null,e==="loading"?O.jsx("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-4","aria-live":"polite",children:Array.from({length:Ba}).map((h,m)=>O.jsxs("div",{className:"rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50/70 dark:bg-slate-900/30 p-4 space-y-3 animate-pulse",children:[O.jsx("div",{className:"h-3 w-24 rounded bg-slate-200 dark:bg-slate-700"}),O.jsx("div",{className:"h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-700"}),O.jsx("div",{className:"h-20 rounded bg-slate-200 dark:bg-slate-700"}),O.jsx("div",{className:"h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-700"})]},m))}):null,e==="empty"?O.jsx("div",{className:"rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/30 p-4 text-sm text-slate-600 dark:text-slate-300",children:"Finnhub returned no market headlines for the current query."}):null,e==="ready"?O.jsxs("div",{className:"space-y-4",children:[O.jsx("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-4","aria-live":"polite",children:d.map(h=>O.jsxs("article",{"data-news-card":!0,className:"rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50/70 dark:bg-slate-900/30 overflow-hidden",children:[h.image?O.jsx("div",{className:"aspect-[16/7] overflow-hidden bg-slate-200 dark:bg-slate-800",children:O.jsx("img",{src:h.image,alt:"",className:"h-full w-full object-cover",loading:"lazy"})}):null,O.jsxs("div",{className:"p-4 space-y-3",children:[O.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400",children:[O.jsx("span",{children:h.source}),O.jsx("span",{className:"h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500"}),O.jsx("span",{children:aw(h.datetime)}),h.category?O.jsxs(O.Fragment,{children:[O.jsx("span",{className:"h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500"}),O.jsx("span",{children:h.category})]}):null]}),O.jsx("h4",{className:"text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug",children:O.jsx("a",{href:h.url,target:"_blank",rel:"noopener noreferrer",className:"hover:text-sky-600 dark:hover:text-sky-300 transition",children:h.headline})}),O.jsx("p",{className:"text-sm text-slate-600 dark:text-slate-300",children:iw(h.summary)}),O.jsxs("a",{href:h.url,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-300 hover:underline",children:["Read article",O.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:O.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M14 5l7 7m0 0l-7 7m7-7H3"})})]})]})]},h.id))}),c>1?O.jsxs("div",{className:"flex flex-col gap-3 border-t border-slate-200/80 dark:border-slate-700/70 pt-4 sm:flex-row sm:items-center sm:justify-between",children:[O.jsxs("div",{className:"space-y-1",children:[O.jsxs("p",{"data-news-page-indicator":!0,className:"text-sm font-semibold text-slate-900 dark:text-slate-100",children:["Page ",s," of ",c]}),O.jsx("p",{className:"text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400",children:u})]}),O.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[O.jsx("button",{type:"button","data-news-pagination-prev":!0,"aria-label":"Previous news page",onClick:()=>l(h=>Math.max(1,h-1)),disabled:s===1,className:"inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300/80 dark:border-slate-600/80 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-45 disabled:cursor-not-allowed",children:"Prev"}),O.jsx("button",{type:"button","data-news-pagination-next":!0,"aria-label":"Next news page",onClick:()=>l(h=>Math.min(c,h+1)),disabled:s===c,className:"inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300/80 dark:border-slate-600/80 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-45 disabled:cursor-not-allowed",children:"Next"})]})]}):null]}):null]})}const jb=`<!DOCTYPE html>\r
<html lang="en">\r
  <head>\r
    <meta charset="UTF-8" />\r
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\r
    <title>Gunpla Hangar Command Console</title>\r
    <link rel="icon" type="image/svg+xml" href="img/favicon.svg" />\r
    <link rel="stylesheet" href="css/styles.css" />\r
    <script src="https://cdn.tailwindcss.com"><\/script>\r
    <script src="https://cdn.jsdelivr.net/npm/chart.js" defer><\/script>\r
    <link\r
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@500;600&display=swap"\r
      rel="stylesheet"\r
    />\r
  </head>\r
  <body class="transition-colors duration-300">
    <a class="skip-link" href="#mainContent">Skip to main content</a>
    <div class="page-progress" aria-hidden="true">
      <div id="pageProgressBar" class="page-progress__bar"></div>
    </div>
    <div
      id="actionFeedbackPanel"
      class="action-feedback action-feedback--hidden"
      role="status"
      aria-live="polite"
      aria-atomic="true"\r
      aria-hidden="true"\r
    ></div>\r
    <div class="app-shell">\r
      <aside class="app-sidebar card card--lifted" aria-label="Primary navigation">\r
        <div class="app-sidebar__inner">\r
          <div class="app-sidebar__top">\r
            <div>\r
              <p class="app-sidebar__eyebrow">Gunpla Hangar</p>\r
              <p class="app-sidebar__title">Command Hub</p>\r
            </div>\r
            <button\r
              id="themeToggleBtn"\r
              class="theme-toggle"\r
              type="button"\r
              aria-label="Switch to dark theme"\r
              aria-pressed="false"\r
            >\r
              <svg\r
                id="sunIcon"\r
                class="theme-toggle__icon theme-toggle__icon--sun hidden"\r
                fill="none"\r
                stroke="currentColor"\r
                viewBox="0 0 24 24"\r
                xmlns="http://www.w3.org/2000/svg"\r
              >\r
                <path\r
                  stroke-linecap="round"\r
                  stroke-linejoin="round"\r
                  stroke-width="2"\r
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"\r
                ></path>\r
              </svg>\r
              <svg\r
                id="moonIcon"\r
                class="theme-toggle__icon theme-toggle__icon--moon"\r
                fill="none"\r
                stroke="currentColor"\r
                viewBox="0 0 24 24"\r
                xmlns="http://www.w3.org/2000/svg"\r
              >\r
                <path\r
                  stroke-linecap="round"\r
                  stroke-linejoin="round"\r
                  stroke-width="2"\r
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"\r
                ></path>\r
              </svg>\r
            </button>\r
          </div>\r
          <p class="app-sidebar__intro">
            Route between diagnostics, loadouts, and supply lines without leaving the cockpit.
          </p>
          <div class="app-sidebar__command">
            <label class="app-sidebar__command-label" for="sidebarSearchInput">
              Quick jump
            </label>
            <div class="app-sidebar__command-field">
              <input
                id="sidebarSearchInput"
                class="app-sidebar__command-input"
                type="search"
                inputmode="search"
                autocomplete="off"
                placeholder="Type section name..."
                aria-describedby="sidebarSearchStatus"
              />
              <button
                id="sidebarSearchClearBtn"
                class="app-sidebar__command-clear"
                type="button"
                aria-label="Clear quick jump search"
              >
                Clear
              </button>
            </div>
            <p
              id="sidebarSearchStatus"
              class="app-sidebar__command-status"
              aria-live="polite"
            >
              Showing all sections
            </p>
          </div>
          <nav class="app-sidebar__nav" aria-label="Section navigation">
            <ul id="sidebarSectionList" class="app-sidebar__list">
              <li>\r
                <a class="app-sidebar__link" href="#overview"\r
                  ><span class="app-sidebar__index">01</span><span>Hangar Overview</span></a\r
                >\r
              </li>\r
              <li>\r
                <a class="app-sidebar__link" href="#allocation"\r
                  ><span class="app-sidebar__index">02</span><span>Unit Loadout</span></a\r
                >\r
              </li>\r
              <li>\r
                <a class="app-sidebar__link" href="#chart-section"\r
                  ><span class="app-sidebar__index">03</span><span>Combat Telemetry</span></a\r
                >\r
              </li>\r
              <li>\r
                <a class="app-sidebar__link" href="#details"\r
                  ><span class="app-sidebar__index">04</span><span>Inventory Manifest</span></a\r
                >\r
              </li>\r
              <li>\r
                <a class="app-sidebar__link" href="#simulation"\r
                  ><span class="app-sidebar__index">05</span><span>Battle Simulation</span></a\r
                >\r
              </li>\r
              <li>\r
                <a class="app-sidebar__link" href="#advanced-tracker"\r
                  ><span class="app-sidebar__index">06</span><span>Supply Logistics</span></a\r
                >\r
              </li>\r
              <li>\r
                <a class="app-sidebar__link" href="#analytics"\r
                  ><span class="app-sidebar__index">07</span><span>Analysis Deck</span></a\r
                >\r
              </li>\r
              <li>\r
                <a class="app-sidebar__link" href="#performance"\r
                  ><span class="app-sidebar__index">08</span><span>Sortie Debrief</span></a\r
                >\r
              </li>\r
              <li>\r
                <a class="app-sidebar__link" href="#marketHeatmap"\r
                  ><span class="app-sidebar__index">09</span><span>Sector Heatmap</span></a\r
                >\r
              </li>\r
              <li>\r
                <a class="app-sidebar__link" href="#marketIndices"\r
                  ><span class="app-sidebar__index">10</span><span>Federation Indices</span></a\r
                >\r
              </li>\r
              <li>\r
                <a class="app-sidebar__link" href="#fearGreed"\r
                  ><span class="app-sidebar__index">11</span><span>Psycho-Frame Index</span></a\r
                >\r
              </li>\r
            </ul>\r
          </nav>\r
        </div>\r
      </aside>\r
\r
      <main id="mainContent" class="app-main" tabindex="-1">
        <div class="container mx-auto p-4 md:p-8 max-w-7xl">\r
\r
      <header class="hero card card--lifted">\r
        <span class="hero__badge">Side 7 Hangar  -  RX Ops</span>\r
        <p class="hero__eyebrow">Tan Tran  -  Hangar Chief</p>\r
        <h1 class="hero__title">Gunpla Hangar Command Console</h1>\r
        <p class="hero__lead">\r
          Monitor frame integrity, supply flows, and sortie readiness for every Gunpla kit in your collection  -  all from a single operations deck.\r
        </p>\r
        <div class="hero__actions">\r
          <a class="hero__btn hero__btn--primary" href="#analytics">Deploy analytics deck</a>\r
          <a class="hero__btn hero__btn--ghost" href="#advanced-tracker">Open supply logistics</a>\r
        </div>\r
        <div class="hero__readouts">\r
          <div class="hero__readout">\r
            <span class="hero__readout-label">Frame integrity</span>\r
            <span class="hero__readout-value">92%</span>\r
          </div>\r
          <div class="hero__readout">\r
            <span class="hero__readout-label">Sortie readiness</span>\r
            <span class="hero__readout-value">T-05 days</span>\r
          </div>\r
          <div class="hero__readout">\r
            <span class="hero__readout-label">Supply reserves</span>\r
            <span class="hero__readout-value">78%</span>\r
          </div>\r
        </div>\r
      </header>\r
\r
      <section id="overview" class="section mb-12">\r
        <div class="section-header">\r
          <div class="section-header__icon">\r
            <svg\r
              class="w-8 h-8 text-sky-300"\r
              fill="none"\r
              stroke="currentColor"\r
              viewBox="0 0 24 24"\r
              xmlns="http://www.w3.org/2000/svg"\r
            >\r
              <path\r
                stroke-linecap="round"\r
                stroke-linejoin="round"\r
                stroke-width="2"\r
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"\r
              ></path>\r
            </svg>\r
          </div>\r
          <div>\r
            <h2 class="section-title">1. Hangar Diagnostics</h2>\r
            <p class="section-intro">\r
              Run quick vitals on your Gunpla fleet  -  frame stability, pilot readiness, and resource flow  -  before launching into deeper analysis.\r
            </p>\r
          </div>\r
        </div>\r
\r
        <div class="stat-grid">\r
          <article class="stat-card stat-card--emerald">\r
            <div class="stat-card__top">\r
              <div class="stat-card__icon">\r
                <svg\r
                  class="w-5 h-5"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  viewBox="0 0 24 24"\r
                  xmlns="http://www.w3.org/2000/svg"\r
                >\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    stroke-width="2"\r
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"\r
                  ></path>\r
                </svg>\r
              </div>\r
              <div>\r
                <p class="stat-card__label">Portfolio score</p>\r
                <div class="stat-card__value">\r
                  <span id="portfolioScore">--</span>\r
                  <span class="stat-card__unit">/10</span>\r
                </div>\r
              </div>\r
            </div>\r
            <p class="stat-card__description">\r
              Live signal updates after telemetry loads\r
            </p>\r
            <div class="stat-card__progress">\r
              <div\r
                class="stat-card__progress-bar"\r
                id="portfolioScoreBar"\r
                role="progressbar"\r
                aria-valuemin="0"\r
                aria-valuemax="10"\r
                aria-valuenow="0"\r
                style="width: 0%"\r
              ></div>\r
            </div>\r
          </article>\r
\r
          <article class="stat-card stat-card--indigo">\r
            <div class="stat-card__top">\r
              <div class="stat-card__icon">\r
                <svg\r
                  class="w-5 h-5"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  viewBox="0 0 24 24"\r
                  xmlns="http://www.w3.org/2000/svg"\r
                >\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    stroke-width="2"\r
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"\r
                  ></path>\r
                </svg>\r
              </div>\r
              <div>\r
                <p class="stat-card__label">Portfolio value</p>\r
                <div class="stat-card__value">\r
                  <span id="currentTotalValueDisplay">$449.12</span>\r
                  <span class="stat-card__unit">USD</span>\r
                </div>\r
              </div>\r
            </div>\r
            <p class="stat-card__description">Current market value</p>\r
            <div class="stat-card__progress">\r
              <div class="stat-card__progress-bar" style="width: 75%"></div>\r
            </div>\r
          </article>\r
\r
          <article class="stat-card stat-card--amber">\r
            <div class="stat-card__top">\r
              <div class="stat-card__icon">\r
                <svg\r
                  class="w-5 h-5"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  viewBox="0 0 24 24"\r
                  xmlns="http://www.w3.org/2000/svg"\r
                >\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    stroke-width="2"\r
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"\r
                  ></path>\r
                </svg>\r
              </div>\r
              <div>\r
                <p class="stat-card__label">Risk posture</p>\r
                <div class="stat-card__value">\r
                  <span id="riskLevel">High</span>\r
                </div>\r
              </div>\r
            </div>\r
            <div class="stat-card__progress">\r
              <div class="stat-card__progress-bar" id="riskLevelBar" style="width: 85%"></div>\r
            </div>\r
            <p class="stat-card__description">20-30 year horizon</p>\r
          </article>\r
        </div>\r
\r
        <div class="metric-grid">\r
          <article class="metric-tile">\r
            <span class="metric-tile__dot metric-tile__dot--psycho" aria-hidden="true"></span>\r
            <div class="metric-tile__content">\r
              <p class="metric-tile__label">Assets</p>\r
              <p class="metric-tile__value" id="metricAssetCount">--</p>\r
              <p class="metric-tile__caption" id="metricAssetCaption">Holdings</p>\r
              <div class="metric-dropdown-wrapper">\r
                <button\r
                  type="button"\r
                  class="metric-dropdown-toggle"\r
                  data-metric-toggle="metricAssetList"\r
                  aria-controls="metricAssetList"\r
                  aria-expanded="false"\r
                >\r
                  View holdings\r
                </button>\r
                <ul\r
                  id="metricAssetList"\r
                  class="metric-dropdown hidden"\r
                  aria-hidden="true"\r
                ></ul>\r
              </div>\r
            </div>\r
          </article>\r
          <article class="metric-tile">\r
            <span class="metric-tile__dot metric-tile__dot--blue" aria-hidden="true"></span>\r
            <div class="metric-tile__content">\r
              <p class="metric-tile__label">Sectors</p>\r
              <p class="metric-tile__value" id="metricSectorCount">--</p>\r
              <p class="metric-tile__caption" id="metricSectorCaption">Sectors covered</p>\r
              <div class="metric-dropdown-wrapper">\r
                <button\r
                  type="button"\r
                  class="metric-dropdown-toggle"\r
                  data-metric-toggle="metricSectorList"\r
                  aria-controls="metricSectorList"\r
                  aria-expanded="false"\r
                >\r
                  View sectors\r
                </button>\r
                <ul\r
                  id="metricSectorList"\r
                  class="metric-dropdown hidden"\r
                  aria-hidden="true"\r
                ></ul>\r
              </div>\r
            </div>\r
          </article>\r
          <article class="metric-tile">\r
            <span class="metric-tile__dot metric-tile__dot--purple" aria-hidden="true"></span>\r
            <div class="metric-tile__content">\r
              <p class="metric-tile__label">Regions</p>\r
              <p class="metric-tile__value" id="metricRegionCount">--</p>\r
              <p class="metric-tile__caption" id="metricRegionCaption">Regions tracked</p>\r
              <div class="metric-dropdown-wrapper">\r
                <button\r
                  type="button"\r
                  class="metric-dropdown-toggle"\r
                  data-metric-toggle="metricRegionList"\r
                  aria-controls="metricRegionList"\r
                  aria-expanded="false"\r
                >\r
                  View regions\r
                </button>\r
                <ul\r
                  id="metricRegionList"\r
                  class="metric-dropdown hidden"\r
                  aria-hidden="true"\r
                ></ul>\r
              </div>\r
            </div>\r
          </article>\r
          <article class="metric-tile">\r
            <span class="metric-tile__dot metric-tile__dot--orange" aria-hidden="true"></span>\r
            <div class="metric-tile__content">\r
              <p class="metric-tile__label">Last update</p>\r
              <p class="metric-tile__value" id="metricLastUpdateValue">--</p>\r
              <p class="metric-tile__caption" id="metricLastUpdateCaption">Awaiting sync</p>\r
            </div>\r
          </article>\r
        </div>\r
      </section>\r
\r
      <section id="allocation" class="section mb-12">\r
        <div class="section-header">\r
          <div class="section-header__icon">\r
            <svg\r
              class="w-8 h-8 text-sky-300"\r
              fill="none"\r
              stroke="currentColor"\r
              viewBox="0 0 24 24"\r
              xmlns="http://www.w3.org/2000/svg"\r
            >\r
              <path\r
                stroke-linecap="round"\r
                stroke-linejoin="round"\r
                stroke-width="2"\r
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"\r
              ></path>\r
              <path\r
                stroke-linecap="round"\r
                stroke-linejoin="round"\r
                stroke-width="2"\r
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"\r
              ></path>\r
            </svg>\r
          </div>\r
          <div>\r
            <h2 class="section-title">2. Unit Loadout Matrix</h2>\r
            <p class="section-intro">\r
              Compare planned loadouts versus actual deployments to see which Gunpla squads need reinforcement or part redistribution.\r
            </p>\r
          </div>\r
        </div>\r
\r
        <!-- Allocation Summary Cards -->\r
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">\r
          <div\r
            class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300"\r
          >\r
            <div class="flex items-center gap-3 mb-2">\r
              <div class="w-3 h-3 bg-rose-500 rounded-full"></div>\r
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Total Assets</span>\r
            </div>\r
            <div class="text-2xl font-bold text-gray-900 dark:text-white" id="allocationAssetCount">--</div>\r
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">\r
              Holdings\r
            </div>\r
            <div class="metric-dropdown-wrapper metric-dropdown-wrapper--full">\r
              <button\r
                type="button"\r
                class="metric-dropdown-toggle metric-dropdown-toggle--light"\r
                data-metric-toggle="allocationAssetList"\r
                aria-controls="allocationAssetList"\r
                aria-expanded="false"\r
              >\r
                View list\r
              </button>\r
              <ul\r
                id="allocationAssetList"\r
                class="metric-dropdown metric-dropdown--surface hidden"\r
                aria-hidden="true"\r
              ></ul>\r
            </div>\r
          </div>\r
\r
          <div\r
            class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300"\r
          >\r
            <div class="flex items-center gap-3 mb-2">\r
              <div class="w-3 h-3 bg-blue-500 rounded-full"></div>\r
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">US Stocks</span>\r
            </div>\r
            <div class="text-2xl font-bold text-gray-900 dark:text-white" id="usStockCount">--</div>\r
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">Domestic holdings</div>\r
            <div class="metric-dropdown-wrapper metric-dropdown-wrapper--full">\r
              <button\r
                type="button"\r
                class="metric-dropdown-toggle metric-dropdown-toggle--light"\r
                data-metric-toggle="allocationUSList"\r
                aria-controls="allocationUSList"\r
                aria-expanded="false"\r
              >\r
                View tickers\r
              </button>\r
              <ul\r
                id="allocationUSList"\r
                class="metric-dropdown metric-dropdown--surface hidden"\r
                aria-hidden="true"\r
              ></ul>\r
            </div>\r
          </div>\r
\r
          <div\r
            class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300"\r
          >\r
            <div class="flex items-center gap-3 mb-2">\r
              <div class="w-3 h-3 bg-purple-500 rounded-full"></div>\r
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">International Stocks</span>\r
            </div>\r
            <div class="text-2xl font-bold text-gray-900 dark:text-white" id="intlStockCount">--</div>\r
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">Global exposure</div>\r
            <div class="metric-dropdown-wrapper metric-dropdown-wrapper--full">\r
              <button\r
                type="button"\r
                class="metric-dropdown-toggle metric-dropdown-toggle--light"\r
                data-metric-toggle="allocationIntlList"\r
                aria-controls="allocationIntlList"\r
                aria-expanded="false"\r
              >\r
                View tickers\r
              </button>\r
              <ul\r
                id="allocationIntlList"\r
                class="metric-dropdown metric-dropdown--surface hidden"\r
                aria-hidden="true"\r
              ></ul>\r
            </div>\r
          </div>\r
\r
          <div\r
            class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300"\r
          >\r
            <div class="flex items-center gap-3 mb-2">\r
              <div class="w-3 h-3 bg-orange-500 rounded-full"></div>\r
              <span class="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Alternatives</span>\r
            </div>\r
            <div class="text-2xl font-bold text-gray-900 dark:text-white" id="altAssetCount">--</div>\r
            <div class="text-xs text-gray-500 dark:text-gray-500 mt-1">Non-traditional assets</div>\r
            <div class="metric-dropdown-wrapper metric-dropdown-wrapper--full">\r
              <button\r
                type="button"\r
                class="metric-dropdown-toggle metric-dropdown-toggle--light"\r
                data-metric-toggle="allocationAltList"\r
                aria-controls="allocationAltList"\r
                aria-expanded="false"\r
              >\r
                View tickers\r
              </button>\r
              <ul\r
                id="allocationAltList"\r
                class="metric-dropdown metric-dropdown--surface hidden"\r
                aria-hidden="true"\r
              ></ul>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <div class="mb-8">\r
          <div\r
            id="allocation-ai-review-card"\r
            class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-shadow duration-300"\r
          >\r
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6">\r
                            <div class="flex-1 space-y-3">\r
                <div class="flex items-center gap-2 text-sm font-semibold text-sky-500 dark:text-sky-200 uppercase tracking-wide">\r
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">\r
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>\r
                  </svg>\r
                  AI Allocation Insight\r
                </div>\r
                <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">\r
                  AI allocation diagnostics keep your target mix on course.\r
                </h3>\r
                <p id="allocation-ai-summary" class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">\r
                  AI is preparing the latest allocation review. Launch the analysis to refresh this panel.\r
                </p>\r
                <div id="allocation-ai-focus" class="text-sm font-medium text-blue-600 dark:text-blue-400">\r
                  Run the AI analysis to surface the next recommended action.\r
                </div>\r
              </div>\r
              <div class="flex flex-col items-center justify-center min-w-[160px] bg-gray-50 dark:bg-slate-900/60 rounded-xl border border-gray-200 dark:border-gray-700 p-5">\r
                <div class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">\r
                  AI Score\r
                </div>\r
                <div id="allocation-ai-score" class="text-4xl font-black text-gray-900 dark:text-white">\r
                  --\r
                </div>\r
                <div id="allocation-ai-status" class="mt-1 text-sm font-semibold text-gray-600 dark:text-gray-300">\r
                  Waiting\r
                </div>\r
                <span\r
                  id="allocation-ai-priority"\r
                  class="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"\r
                >\r
                  Pending\r
                </span>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Chart and Top Holdings Grid -->\r
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">\r
          <!-- Main Chart -->\r
          <div class="lg:col-span-2">\r
            <div\r
              class="allocation-chart-shell card card--lifted relative overflow-hidden rounded-3xl p-6 md:p-8 transition-all duration-500"\r
            >\r
              <div class="flex items-center justify-between mb-6">\r
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">\r
                  Portfolio Distribution\r
                </h3>\r
                <div class="flex items-center gap-2">\r
                  <div class="w-3 h-3 bg-rose-500 rounded-full"></div>\r
                  <span class="text-sm text-gray-600 dark:text-gray-400"\r
                    >Portfolio Allocation</span\r
                  >\r
                </div>\r
              </div>\r
              <div class="chart-container allocation-chart-container h-[24rem] md:h-[28rem] max-h-[28rem]">\r
                <canvas id="allocationChart"></canvas>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <!-- Top Holdings Sidebar -->\r
          <div class="space-y-6">\r
            <!-- Top Holdings -->\r
            <div\r
              class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl"\r
            >\r
              <h3\r
                class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"\r
              >\r
                <svg\r
                  class="w-5 h-5 text-sky-300"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  viewBox="0 0 24 24"\r
                >\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    stroke-width="2"\r
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"\r
                  ></path>\r
                </svg>\r
                Top Holdings\r
              </h3>\r
              <div class="space-y-3" id="topHoldingsList">\r
                <!-- Will be populated by JS -->\r
              </div>\r
            </div>\r
\r
            <!-- Allocation Insights -->\r
            <div\r
              class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800"\r
            >\r
              <h3\r
                class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"\r
              >\r
                <svg\r
                  class="w-5 h-5 text-blue-500"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  viewBox="0 0 24 24"\r
                >\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    stroke-width="2"\r
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"\r
                  ></path>\r
                </svg>\r
                Insights\r
              </h3>\r
              <div class="space-y-3 text-sm text-gray-700 dark:text-gray-300">\r
                <div class="flex items-start gap-2">\r
                  <div\r
                    class="w-2 h-2 bg-rose-500 rounded-full mt-1.5 flex-shrink-0"\r
                  ></div>\r
                  <p>Well-diversified across asset classes</p>\r
                </div>\r
                <div class="flex items-start gap-2">\r
                  <div\r
                    class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"\r
                  ></div>\r
                  <p>Balanced growth and income focus</p>\r
                </div>\r
                <div class="flex items-start gap-2">\r
                  <div\r
                    class="w-2 h-2 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"\r
                  ></div>\r
                  <p>Moderate risk-adjusted positioning</p>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </section>\r
\r
      <!-- UPDATED SECTION 3: FULL STOCK CHART -->\r
      <section id="chart-section" class="section mb-12">\r
        <div class="section-header">\r
          <div class="section-header__icon">\r
            <svg\r
              class="w-8 h-8 text-sky-300"\r
              fill="none"\r
              stroke="currentColor"\r
              viewBox="0 0 24 24"\r
              xmlns="http://www.w3.org/2000/svg"\r
            >\r
              <path\r
                stroke-linecap="round"\r
                stroke-linejoin="round"\r
                stroke-width="2"\r
                d="M7 12l3-3 3 3 4-4"\r
              ></path>\r
              <path\r
                stroke-linecap="round"\r
                stroke-linejoin="round"\r
                stroke-width="2"\r
                d="M8 21l4-4 4 4M3 4h18M5 4h14v16H5z"\r
              ></path>\r
            </svg>\r
          </div>\r
          <div>\r
            <h2 class="section-title">3. Combat Telemetry</h2>\r
            <p class="section-intro">\r
              Visualize sortie performance, damage logs, and rival benchmarks with live telemetry overlays.\r
            </p>\r
          </div>\r
        </div>\r
        <div class="p-6 md:p-8 rounded-xl border card min-h-[500px] h-[70vh]">\r
          <div id="tradingview_chart" class="h-full w-full"></div>\r
        </div>\r
      </section>\r
\r
      <!-- SECTION 4: ASSET DETAILS -->\r
      <section id="details" class="section mb-12">\r
        <div class="section-header">\r
          <div class="section-header__icon">\r
            <svg\r
              class="w-8 h-8 text-sky-300"\r
              fill="none"\r
              stroke="currentColor"\r
              viewBox="0 0 24 24"\r
              xmlns="http://www.w3.org/2000/svg"\r
            >\r
              <path\r
                stroke-linecap="round"\r
                stroke-linejoin="round"\r
                stroke-width="2"\r
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"\r
              ></path>\r
            </svg>\r
          </div>\r
          <div>\r
            <h2 class="section-title">4. Inventory Manifest</h2>\r
            <p class="section-intro">\r
              Audit individual kits, upgrade grades, and custom mod stats to prioritize your next maintenance cycle.\r
            </p>\r
          </div>\r
        </div>\r
        <div\r
          class="flex flex-wrap justify-center gap-4 mb-6"\r
          id="stockTabs"\r
        ></div>\r
\r
        <div\r
          id="stockDetailContent"\r
          class="p-6 md:p-8 rounded-xl border card min-h-[600px] transition-all duration-500"\r
        >\r
          <p class="text-center text-gray-500 dark:text-gray-400 animate-pulse">\r
            Select a ticker above to load fundamentals, risk stats, and tailored guidance. Use the "+ Ticker" button to add custom symbols.\r
          </p>\r
        </div>\r
      </section>\r
\r
      <section id="simulation" class="section mb-12">\r
        <div class="section-header">\r
          <div class="section-header__icon">\r
            <svg\r
              class="w-8 h-8 text-sky-300"\r
              fill="none"\r
              stroke="currentColor"\r
              viewBox="0 0 24 24"\r
              xmlns="http://www.w3.org/2000/svg"\r
            >\r
              <path\r
                stroke-linecap="round"\r
                stroke-linejoin="round"\r
                stroke-width="2"\r
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"\r
              ></path>\r
            </svg>\r
          </div>\r
          <div>\r
            <h2 class="section-title">5. Battle Simulation Lab</h2>\r
            <p class="section-intro">\r
              Simulate build queues, sortie frequencies, and resource shocks to see how each Gunpla responds under fire.\r
            </p>\r
          </div>\r
        </div>\r
\r
        <!-- Compact Form with Icons -->\r
        <div class="simulation-panel border rounded-xl p-4 mb-6">\r
          <h3\r
            class="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-2"\r
          >\r
            <svg\r
              class="w-5 h-5"\r
              fill="none"\r
              stroke="currentColor"\r
              viewBox="0 0 24 24"\r
            >\r
              <path\r
                stroke-linecap="round"\r
                stroke-linejoin="round"\r
                stroke-width="2"\r
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"\r
              ></path>\r
            </svg>\r
            Investment Parameters\r
          </h3>\r
          <form\r
            id="simForm"\r
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end"\r
          >\r
            <div class="space-y-1">\r
              <label\r
                for="initial"\r
                class="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-400"\r
              >\r
                <svg\r
                  class="w-3 h-3 text-sky-300"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  viewBox="0 0 24 24"\r
                >\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    stroke-width="2"\r
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"\r
                  ></path>\r
                </svg>\r
                Initial Capital ($)\r
              </label>\r
              <input\r
                type="text"\r
                id="initial"\r
                inputmode="decimal"\r
                pattern="[0-9]*\\.?[0-9]*"\r
                autocomplete="off"\r
                readonly\r
                value="449.12"\r
                class="block w-full styled-input text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"\r
              />\r
            </div>\r
            <div class="space-y-1">\r
              <label\r
                for="monthly"\r
                class="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-400"\r
              >\r
                <svg\r
                  class="w-3 h-3 text-blue-500"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  viewBox="0 0 24 24"\r
                >\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    stroke-width="2"\r
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"\r
                  ></path>\r
                </svg>\r
                Monthly Investment ($)\r
              </label>\r
              <input\r
                type="number"\r
                id="monthly"\r
                value="500"\r
                class="block w-full styled-input text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"\r
              />\r
            </div>\r
            <div class="space-y-1">\r
              <label\r
                for="rate"\r
                class="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-400"\r
              >\r
                <svg\r
                  class="w-3 h-3 text-purple-500"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  viewBox="0 0 24 24"\r
                >\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    stroke-width="2"\r
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"\r
                  ></path>\r
                </svg>\r
                Annual Return (%)\r
              </label>\r
              <input\r
                type="number"\r
                id="rate"\r
                step="any"\r
                value="10"\r
                class="block w-full styled-input text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"\r
              />\r
            </div>\r
            <div class="space-y-1">\r
              <label\r
                for="years"\r
                class="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-400"\r
              >\r
                <svg\r
                  class="w-3 h-3 text-orange-500"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  viewBox="0 0 24 24"\r
                >\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    stroke-width="2"\r
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"\r
                  ></path>\r
                </svg>\r
                Time Horizon (Years)\r
              </label>\r
              <input\r
                type="number"\r
                id="years"\r
                value="36"\r
                min="1"\r
                max="100"\r
                class="block w-full styled-input text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"\r
              />\r
            </div>\r
            <div class="md:col-span-2 lg:col-span-4 flex justify-center mt-2">\r
              <button\r
                type="submit"\r
                class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-6 rounded-lg shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 text-sm flex items-center gap-1"\r
              >\r
                <svg\r
                  class="w-4 h-4"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  viewBox="0 0 24 24"\r
                >\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    stroke-width="2"\r
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l.707.707A1 1 0 0012.414 11H15m2 0h1.586a1 1 0 01.707.293l.707.707A1 1 0 0021 12.414V15m0 2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2.586a1 1 0 01.293-.707l.707-.707A1 1 0 015.414 13H7"\r
                  ></path>\r
                </svg>\r
                Run Growth Simulation\r
              </button>\r
            </div>\r
          </form>\r
        </div>\r
\r
        <!-- Compact Chart Container -->\r
        <div\r
          class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden"\r
        >\r
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">\r
            <h3\r
              class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2"\r
            >\r
              <svg\r
                class="w-5 h-5 text-sky-300"\r
                fill="none"\r
                stroke="currentColor"\r
                viewBox="0 0 24 24"\r
              >\r
                <path\r
                  stroke-linecap="round"\r
                  stroke-linejoin="round"\r
                  stroke-width="2"\r
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"\r
                ></path>\r
              </svg>\r
              Investment Growth Projection\r
            </h3>\r
          </div>\r
          <div class="p-4">\r
            <div\r
              class="chart-container max-w-4xl h-80 md:h-96 max-h-96 mx-auto relative"\r
            >\r
              <div\r
                id="chartLoadingIndicator"\r
                class="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 rounded-lg z-10 hidden"\r
              >\r
                <div class="text-center">\r
                  <div\r
                    class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"\r
                  ></div>\r
                  <p class="text-gray-600 dark:text-gray-400 text-sm">\r
                    Calculating growth projection...\r
                  </p>\r
                </div>\r
              </div>\r
              <canvas id="growthChart"></canvas>\r
            </div>\r
            <div\r
              id="simResult"\r
              class="text-center mt-2 px-4 py-3 bg-gradient-to-r from-sky-500/10 to-rose-500/10 dark:from-sky-900/20 dark:to-rose-900/20 rounded-xl border border-sky-400/40 dark:border-rose-700/40 transition-all duration-300 opacity-0 transform translate-y-1"\r
            >\r
              <div class="animate-pulse space-y-2">\r
                <div\r
                  class="text-3xl font-bold text-cyan-400 dark:text-cyan-300"\r
                >\r
                  $--\r
                </div>\r
                <p class="text-gray-500 text-xs uppercase tracking-wide">\r
                  Run simulation to see projected value\r
                </p>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
      </section>\r
\r
      <!-- SECTION 6: ADVANCED REBALANCE & DEPOSIT TOOL -->\r
      <section id="advanced-tracker" class="section mb-12">\r
        <div class="section-header">\r
          <div class="section-header__icon">\r
            <svg\r
              class="w-8 h-8 text-sky-300"\r
              fill="none"\r
              stroke="currentColor"\r
              viewBox="0 0 24 24"\r
              xmlns="http://www.w3.org/2000/svg"\r
            >\r
              <path\r
                stroke-linecap="round"\r
                stroke-linejoin="round"\r
                stroke-width="2"\r
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"\r
              ></path>\r
            </svg>\r
          </div>\r
          <div>\r
            <h2 class="section-title">6. Supply Logistics Deck</h2>\r
            <p class="section-intro">\r
              Stage shipments, allocate spare parts, and manage upgrade budgets across your Gunpla hangar.\r
            </p>\r
          </div>\r
        </div>\r
\r
        <!-- Compact Reference Data -->\r
        <div\r
          class="mb-6 p-3 rounded-lg bg-sky-500/10 dark:bg-sky-900/20 border border-sky-400/40 dark:border-sky-600/40"\r
        >          <p class="text-sm font-medium text-rose-500 dark:text-cyan-300 mb-1">\r
            Reference sheet used by this dashboard for live data connections. Open it if you need to inspect or update source values.\r
          </p>\r
          <div class="flex flex-wrap items-center gap-3">\r
            <a\r
              href="https://docs.google.com/spreadsheets/d/1NbkrKzAaiiEik1LGUAPm2GnstT23jDJV/edit?usp=sharing&ouid=104292123868888226876&rtpof=true&sd=true"\r
              target="_blank"\r
              rel="noopener noreferrer"\r
              class="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border text-sm font-semibold bg-white/70 dark:bg-slate-900/40 border-sky-200/70 dark:border-sky-600/40 text-sky-600 dark:text-sky-200 hover:border-sky-300 hover:text-sky-300 transition"\r
            >\r
              <svg\r
                aria-hidden="true"\r
                class="w-4 h-4"\r
                viewBox="0 0 24 24"\r
                fill="none"\r
                xmlns="http://www.w3.org/2000/svg"\r
              >\r
                <path\r
                  d="M6.3 3.2h7.3l4.1 4.1v13.5H6.3c-1.2 0-2.1-.9-2.1-2.1V5.3c0-1.2.9-2.1 2.1-2.1z"\r
                  fill="#16a34a"\r
                ></path>\r
                <path\r
                  d="M13.6 3.2l4.1 4.1h-3.2c-.5 0-.9-.4-.9-.9V3.2z"\r
                  fill="#4ade80"\r
                ></path>\r
                <rect x="7.8" y="10" width="8.4" height="1.8" rx=".35" fill="#ffffff"></rect>\r
                <rect x="7.8" y="13.2" width="8.4" height="1.8" rx=".35" fill="#ffffff"></rect>\r
                <rect x="7.8" y="16.4" width="8.4" height="1.8" rx=".35" fill="#ffffff"></rect>\r
              </svg>\r
              <span>Google Sheet</span>\r
            </a>\r
            <a\r
              href="https://www.portfoliovisualizer.com/analysis"\r
              target="_blank"\r
              rel="noopener noreferrer"\r
              class="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border text-sm font-semibold bg-white/70 dark:bg-slate-900/40 border-sky-200/70 dark:border-sky-600/40 text-sky-600 dark:text-sky-200 hover:border-sky-300 hover:text-sky-300 transition"\r
            >\r
              <svg\r
                class="w-4 h-4"\r
                viewBox="0 0 24 24"\r
                fill="none"\r
                stroke="currentColor"\r
                stroke-width="1.8"\r
                stroke-linecap="round"\r
                stroke-linejoin="round"\r
                aria-hidden="true"\r
              >\r
                <path d="M4 18h16" />\r
                <path d="M6 14l3-4 4 3 5-7" />\r
              </svg>\r
              <span>Portfolio Visualizer</span>\r
            </a>\r
            <a\r
              href="https://robinhood.com/retirement"\r
              target="_blank"\r
              rel="noopener noreferrer"\r
              class="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border text-sm font-semibold bg-white/70 dark:bg-slate-900/40 border-sky-200/70 dark:border-sky-600/40 text-sky-600 dark:text-sky-200 hover:border-sky-300 hover:text-sky-300 transition"\r
            >\r
              <svg\r
                aria-hidden="true"\r
                class="w-4 h-4"\r
                viewBox="0 0 24 24"\r
                fill="none"\r
                xmlns="http://www.w3.org/2000/svg"\r
              >\r
                <rect x="3" y="3" width="18" height="18" rx="3.2" fill="#d7ff00"></rect>\r
                <path\r
                  d="M12.1 4.4c-3.25 1.83-6.58 5.13-8.53 8.55l3.05-.77c-.38 2.64-1.32 5.34-1.69 7.34 2.99-3.02 5.47-6.33 7.78-10.15l3.46-.86c-.59-1.98-2.27-3.59-4.07-4.11z"\r
                  fill="#111111"\r
                ></path>\r
                <path\r
                  d="M8.05 16.6c1.16-2.18 3.07-5.2 5.45-7.66"\r
                  stroke="#d7ff00"\r
                  stroke-width="1.05"\r
                  stroke-linecap="round"\r
                ></path>\r
              </svg>\r
              <span>Robinhood</span>\r
            </a>\r
            <a\r
              href="https://app.koyfin.com/mp/5a-143ppe/summary"\r
              target="_blank"\r
              rel="noopener noreferrer"\r
              class="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border text-sm font-semibold bg-white/70 dark:bg-slate-900/40 border-slate-300/70 dark:border-slate-600/40 text-slate-700 dark:text-slate-200 hover:border-slate-400 hover:text-slate-300 transition"\r
            >\r
              <svg\r
                aria-hidden="true"\r
                class="w-4 h-4"\r
                viewBox="0 0 24 24"\r
                fill="none"\r
                xmlns="http://www.w3.org/2000/svg"\r
              >\r
                <path\r
                  d="M12 2.5L21.5 12 12 21.5 2.5 12 12 2.5z"\r
                  stroke="currentColor"\r
                  stroke-width="1.8"\r
                  stroke-linejoin="round"\r
                ></path>\r
                <path\r
                  d="M9 15l6-6"\r
                  stroke="currentColor"\r
                  stroke-width="1.8"\r
                  stroke-linecap="round"\r
                  stroke-linejoin="round"\r
                ></path>\r
                <path\r
                  d="M9 9h6v6"\r
                  stroke="currentColor"\r
                  stroke-width="1.8"\r
                  stroke-linecap="round"\r
                  stroke-linejoin="round"\r
                ></path>\r
              </svg>\r
              <span>Koyfin</span>\r
            </a>\r
            <a\r
              href="https://snowball-analytics.com/public/portfolios/fzyALWvBTO"\r
              target="_blank"\r
              rel="noopener noreferrer"\r
              class="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border text-sm font-semibold bg-white/70 dark:bg-slate-900/40 border-cyan-300/70 dark:border-cyan-600/50 text-cyan-700 dark:text-cyan-200 hover:border-cyan-400 hover:text-cyan-300 transition"\r
            >\r
              <svg\r
                aria-hidden="true"\r
                class="w-4 h-4"\r
                viewBox="0 0 24 24"\r
                fill="none"\r
                xmlns="http://www.w3.org/2000/svg"\r
              >\r
                <defs>\r
                  <linearGradient id="snowballGradient" x1="5" y1="5" x2="19" y2="19" gradientUnits="userSpaceOnUse">\r
                    <stop offset="0" stop-color="#60a5fa"></stop>\r
                    <stop offset="1" stop-color="#a855f7"></stop>\r
                  </linearGradient>\r
                </defs>\r
                <circle cx="12" cy="12" r="10" fill="url(#snowballGradient)"></circle>\r
                <text\r
                  x="12"\r
                  y="15"\r
                  text-anchor="middle"\r
                  font-family="Inter, 'Segoe UI', sans-serif"\r
                  font-size="10"\r
                  font-weight="700"\r
                  fill="#ffffff"\r
                >\r
                  S\r
                </text>\r
              </svg>\r
              <span>Snowball Analytics</span>\r
            </a>\r
            <a\r
              href="https://portfolioslab.com/tools/portfolio-analysis?d=1ec01eb"\r
              target="_blank"\r
              rel="noopener noreferrer"\r
              class="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border text-sm font-semibold bg-white/70 dark:bg-slate-900/40 border-emerald-300/70 dark:border-emerald-600/50 text-emerald-700 dark:text-emerald-200 hover:border-emerald-400 hover:text-emerald-300 transition"\r
            >\r
              <svg\r
                aria-hidden="true"\r
                class="w-4 h-4"\r
                viewBox="0 0 24 24"\r
                fill="none"\r
                xmlns="http://www.w3.org/2000/svg"\r
              >\r
                <circle cx="12" cy="12" r="10" fill="#020202"></circle>\r
                <path\r
                  d="M12 4.5a7.5 7.5 0 1 1-5.303 12.803"\r
                  stroke="#2dd4bf"\r
                  stroke-width="2"\r
                  stroke-linecap="round"\r
                ></path>\r
                <path\r
                  d="M12 4.5a7.5 7.5 0 0 0-7.5 7.5"\r
                  stroke="#ffffff"\r
                  stroke-width="2"\r
                  stroke-linecap="round"\r
                ></path>\r
                <path\r
                  d="M5.5 15.5c2.5-1 4.5-1 6.5 0s4 1 6.5-1"\r
                  stroke="#2dd4bf"\r
                  stroke-width="1.6"\r
                  stroke-linecap="round"\r
                  stroke-linejoin="round"\r
                ></path>\r
              </svg>\r
              <span>Pportfolioslab</span>\r
            </a>\r
            <a\r
              href="https://totalrealreturns.com/s/VOO,VXUS,AVDV,AVUV,JNJ,GOOGL"
              target="_blank"\r
              rel="noopener noreferrer"\r
              class="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border text-sm font-semibold bg-white/70 dark:bg-slate-900/40 border-amber-300/70 dark:border-amber-500/50 text-amber-700 dark:text-amber-200 hover:border-amber-400 hover:text-amber-300 transition"\r
            >\r
              <svg\r
                aria-hidden="true"\r
                class="w-4 h-4"\r
                viewBox="0 0 24 24"\r
                fill="none"\r
                xmlns="http://www.w3.org/2000/svg"\r
              >\r
                <rect x="2" y="2" width="20" height="20" rx="4" fill="#3f3f3f"></rect>\r
                <rect x="6" y="5" width="12" height="4" rx="0.7" fill="#ff2a2a"></rect>\r
                <rect x="6" y="10" width="12" height="4" rx="0.7" fill="#0057ff"></rect>\r
                <rect x="6" y="15" width="12" height="4" rx="0.7" fill="#11a63c"></rect>\r
              </svg>\r
              <span>Total Returns</span>\r
            </a>\r
          </div>\r
        </div>\r
\r
        <div class="grid grid-cols-1 gap-6 mb-6">
          <article\r
            class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-5 space-y-4"\r
          >\r
            <div class="space-y-1">\r
              <p class="text-xs font-semibold tracking-widest uppercase text-sky-500 dark:text-sky-300">\r
                API Connections\r
              </p>\r
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Alpha Vantage access</h3>\r
              <p class="text-sm text-gray-600 dark:text-gray-400">\r
                Add your personal API key to unlock realtime data (prices, correlations, volatility). Keys stay on this\r
                device and can be removed at any moment.\r
              </p>\r
            </div>\r
            <form id="alphaKeyForm" class="space-y-4" autocomplete="off">\r
              <div class="space-y-2">\r
                <label\r
                  for="alphaKeyInput"\r
                  class="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2"\r
                >\r
                  Alpha Vantage API key\r
                  <span\r
                    id="alphaKeyStatusBadge"\r
                    class="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300"\r
                  >\r
                    Demo\r
                  </span>\r
                </label>\r
                <div class="flex flex-col sm:flex-row gap-2">\r
                  <input\r
                    type="password"\r
                    id="alphaKeyInput"\r
                    class="flex-1 styled-input text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"\r
                    autocomplete="off"\r
                    autocapitalize="none"\r
                    spellcheck="false"\r
                    placeholder="Enter personal key (e.g. ABC123...)"\r
                  />\r
                  <button\r
                    type="button"\r
                    id="alphaKeyToggleBtn"\r
                    class="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"\r
                  >\r
                    Show\r
                  </button>\r
                </div>\r
                <p id="alphaKeyStatus" class="text-xs text-gray-500 dark:text-gray-400">\r
                  No custom key yet â€” dashboard remains on demo data.\r
                </p>\r
              </div>\r
              <div class="flex flex-wrap gap-3">\r
                <button\r
                  type="submit"\r
                  class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"\r
                >\r
                  Save key\r
                </button>\r
                <button\r
                  type="button"\r
                  id="alphaKeyClearBtn"\r
                  class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-semibold border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"\r
                >\r
                  Clear key\r
                </button>\r
              </div>\r
            </form>\r
          </article>\r
\r
          <article\r
            class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-5 space-y-4"\r
          >\r
            <div class="space-y-1">\r
              <p class="text-xs font-semibold tracking-widest uppercase text-amber-500 dark:text-amber-300">\r
                Rebalance Protocol\r
              </p>\r
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Annual Rebalance Clock</h3>\r
              <p class="text-sm text-gray-600 dark:text-gray-400">\r
                Lock in a fixed 01/01 rebalance (or any date you choose), track the countdown, buffer warnings, and mark\r
                completion so the next cycle is always ready.\r
              </p>\r
            </div>\r
\r
            <div class="space-y-4">\r
              <div\r
                class="rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50/60 dark:bg-slate-900/40 p-4 space-y-3"\r
              >\r
                <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">\r
                  <div>\r
                    <p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">\r
                      Countdown to next window\r
                    </p>\r
                    <p\r
                      id="rebalanceCountdownPrimary"\r
                      class="text-3xl md:text-4xl font-semibold text-emerald-500 dark:text-emerald-300"\r
                    >\r
                      --\r
                    </p>\r
                    <p id="rebalanceCountdownSecondary" class="text-xs text-gray-500 dark:text-gray-400">\r
                      No schedule yet\r
                    </p>\r
                  </div>\r
                  <div class="text-right">\r
                    <span\r
                      id="rebalanceBufferBadge"\r
                      class="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-600 dark:border-emerald-400/40 dark:bg-emerald-600/10 dark:text-emerald-300"\r
                      >Ãang theo dÃµi</span\r
                    >\r
                  </div>\r
                </div>\r
                <div class="h-2 rounded-full bg-gray-200/80 dark:bg-gray-700/80 overflow-hidden">\r
                  <span\r
                    id="rebalanceYearProgress"\r
                    class="block h-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all duration-500"\r
                    style="width: 0%"\r
                  ></span>\r
                </div>\r
                <div class="flex flex-wrap gap-4 text-xs text-gray-600 dark:text-gray-300">\r
                  <div>\r
                    <p class="uppercase tracking-widest text-[10px] text-slate-400 dark:text-slate-500">Next window</p>\r
                    <p id="rebalanceNextDateLabel" class="font-semibold text-gray-800 dark:text-gray-100">--</p>\r
                  </div>\r
                  <div>\r
                    <p class="uppercase tracking-widest text-[10px] text-slate-400 dark:text-slate-500">Last completed</p>\r
                    <p id="rebalanceLastDoneLabel" class="font-semibold text-gray-800 dark:text-gray-100">--</p>\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <form\r
                id="rebalanceScheduleForm"\r
                class="grid grid-cols-1 md:grid-cols-3 gap-3 items-end bg-slate-50/40 dark:bg-slate-900/30 rounded-xl border border-gray-200 dark:border-gray-700 p-4"\r
              >\r
                <div class="space-y-1">\r
                  <label for="rebalanceTargetInput" class="text-sm font-medium text-gray-800 dark:text-gray-200">\r
                    Annual target date\r
                  </label>\r
                  <input\r
                    type="date"\r
                    id="rebalanceTargetInput"\r
                    class="styled-input w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400 transition-colors"\r
                  />\r
                </div>\r
                <div class="space-y-1">\r
                  <label for="rebalanceBufferInput" class="text-sm font-medium text-gray-800 dark:text-gray-200">\r
                    Warning buffer (days)\r
                  </label>\r
                  <input\r
                    type="number"\r
                    id="rebalanceBufferInput"\r
                    min="0"\r
                    max="60"\r
                    class="styled-input w-full text-sm p-2 rounded-md border border-gray-300 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-400 transition-colors"\r
                    placeholder="3"\r
                  />\r
                </div>\r
                <div class="flex flex-wrap gap-2">\r
                  <button\r
                    type="submit"\r
                    id="rebalanceScheduleSaveBtn"\r
                    class="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"\r
                  >\r
                    Save schedule\r
                  </button>\r
                  <button\r
                    type="button"\r
                    id="rebalanceMarkCompleteBtn"\r
                    class="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-200 dark:border-gray-600 px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"\r
                  >\r
                    Mark completed\r
                  </button>\r
                </div>\r
              </form>\r
            </div>\r
          </article>\r
        </div>\r
\r
        <div\r
          class="mb-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"\r
        >\r
          <div\r
            class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 px-5 py-4 border-b border-gray-200 dark:border-gray-700"\r
          >\r
            <div class="space-y-1">\r
              <p class="text-sm font-medium text-gray-800 dark:text-gray-200">\r
                Live snapshot from Google Sheets\r
              </p>\r
              <p class="text-xs text-gray-500 dark:text-gray-400">\r
                Auto-refreshes every 60 seconds. Trigger a manual sync anytime.\r
              </p>\r
            </div>\r
            <div\r
              class="flex flex-wrap items-center gap-3"\r
            >\r
              <div\r
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/10 dark:bg-sky-900/30 border border-sky-500/30 text-sky-600 dark:text-sky-200 text-xs font-semibold"\r
              >\r
                <span class="uppercase tracking-wide text-[10px] text-sky-400 dark:text-sky-200/80"\r
                  >Total Value</span\r
                >\r
                <span\r
                  id="livePriceSummaryValue"\r
                  class="text-sm font-semibold text-slate-900 dark:text-slate-100"\r
                  >--</span\r
                >\r
              </div>\r
              <div\r
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-900/30 border border-emerald-500/30 text-emerald-600 dark:text-emerald-200 text-xs font-semibold"\r
              >\r
                <span class="uppercase tracking-wide text-[10px] text-emerald-400 dark:text-emerald-200/80"\r
                  >Total Return</span\r
                >\r
                <span\r
                  id="livePriceSummaryGain"\r
                  class="text-sm font-semibold"\r
                  >--</span\r
                >\r
              </div>\r
              <div\r
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 dark:bg-amber-900/40 border border-amber-500/30 text-amber-600 dark:text-amber-200 text-xs font-semibold"\r
              >\r
                <span class="uppercase tracking-wide text-[10px] text-amber-400 dark:text-amber-200/80"\r
                  >Yield Income</span\r
                >\r
                <span\r
                  id="livePriceSummaryYield"\r
                  class="text-sm font-semibold"\r
                  >--</span\r
                >\r
              </div>\r
              <span\r
                id="livePriceStatus"\r
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-900/80 text-gray-600 dark:text-gray-300 border border-gray-200/80 dark:border-gray-700/60"\r
                >Waiting for data...</span\r
              >\r
              <button\r
                id="livePriceRefreshBtn"\r
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-sky-500/40 text-sky-600 dark:text-sky-200 bg-white/70 dark:bg-slate-900/50 text-xs font-semibold hover:bg-sky-500/10 hover:border-sky-500/70 transition"\r
              >\r
                <svg\r
                  class="w-4 h-4"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  viewBox="0 0 24 24"\r
                >\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    stroke-width="2"\r
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"\r
                  ></path>\r
                </svg>\r
                Refresh\r
              </button>\r
            </div>\r
          </div>\r
\r
          <div class="overflow-x-auto live-snapshot-scroll">\r
            <table\r
              class="live-price-table min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm"\r
            >\r
              <caption class="sr-only">\r
                Live holdings snapshot with invested capital, allocation percentages, gains, losses, and yield\r
              </caption>\r
              <thead class="bg-gray-50 dark:bg-gray-700/80 backdrop-blur">\r
                <tr\r
                  class="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider text-right"\r
                >\r
                  <th scope="col" class="px-4 py-3 text-left">Ticker</th>\r
                  <th scope="col" class="px-4 py-3">Total Invested ($)</th>\r
                  <th scope="col" class="px-4 py-3">Held %</th>\r
                  <th scope="col" class="px-4 py-3">Shares Held</th>\r
                  <th scope="col" class="px-4 py-3">Stock Price ($)</th>\r
                  <th scope="col" class="px-4 py-3">Current Value ($)</th>\r
                  <th scope="col" class="px-4 py-3">Current %</th>\r
                  <th scope="col" class="px-4 py-3">Gain/Loss ($)</th>\r
                  <th scope="col" class="px-4 py-3">Gain/Loss (%)</th>\r
                  <th scope="col" class="px-4 py-3">Yield Income ($)</th>\r
                  <th scope="col" class="px-4 py-3">Total Return ($)</th>\r
                </tr>\r
              </thead>\r
              <tbody\r
                id="livePriceRows"\r
                class="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-100"\r
              ></tbody>\r
              <tfoot class="bg-gray-100 dark:bg-gray-700 font-semibold text-gray-800 dark:text-gray-100">\r
                <tr id="live-price-total-row">\r
                  <th scope="row" class="px-4 py-3 text-left">TOTAL</th>\r
                  <td class="px-4 py-3 text-right" data-field="totalInvested" data-label="Total invested ($)">--</td>\r
                  <td class="px-4 py-3 text-right" data-field="held" data-label="Held %">--</td>\r
                  <td class="px-4 py-3 text-right" data-field="shares" data-label="Shares held">--</td>\r
                  <td class="px-4 py-3 text-right" data-field="price" data-label="Stock price ($)">--</td>\r
                  <td class="px-4 py-3 text-right" data-field="currentValue" data-label="Current value ($)">--</td>\r
                  <td class="px-4 py-3 text-right" data-field="currentPercent" data-label="Current %">--</td>\r
                  <td class="px-4 py-3 text-right" data-field="gain" data-label="Gain/loss ($)">--</td>\r
                  <td class="px-4 py-3 text-right" data-field="gainPercent" data-label="Gain/loss (%)">--</td>\r
                  <td class="px-4 py-3 text-right" data-field="yield" data-label="Yield income ($)">--</td>\r
                  <td class="px-4 py-3 text-right" data-field="totalReturn" data-label="Total return ($)">--</td>\r
                </tr>\r
              </tfoot>\r
            </table>\r
          </div>\r
        </div>\r
\r
        <div class="grid grid-cols-1 gap-6 mb-6">
          <article\r
            class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-5 space-y-4"\r
          >\r
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">\r
              <div>\r
                <p class="text-xs font-semibold tracking-widest uppercase text-slate-500 dark:text-slate-400">\r
                  Guardrail Status\r
                </p>\r
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Drift Monitor</h3>\r
                <p id="driftMonitorStatus" class="text-sm text-slate-500 dark:text-slate-400">\r
                  Awaiting first calculation.\r
                </p>\r
              </div>\r
              <div class="drift-gauge" role="img" aria-live="polite" aria-label="Holdings inside guardrail">\r
                <div class="drift-gauge__ring" id="driftGaugeRing">\r
                  <div class="drift-gauge__mask">\r
                    <span id="driftGaugeValue" class="drift-gauge__value">0%</span>\r
                    <span id="driftGaugeCaption" class="drift-gauge__caption">No data</span>\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
            <dl class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">\r
              <div class="drift-stat">\r
                <dt>Within guardrail</dt>\r
                <dd id="driftInBoundsCount">--</dd>\r
                <small id="driftInBoundsPercent">-- of fleet</small>\r
              </div>\r
              <div class="drift-stat">\r
                <dt>Outliers</dt>\r
                <dd id="driftOutBoundsCount">--</dd>\r
                <small id="driftOutBoundsPercent">Need attention</small>\r
              </div>\r
              <div class="drift-stat">\r
                <dt>Cumulative drift</dt>\r
                <dd id="driftCumulativeValue">--</dd>\r
                <small id="driftCumulativeNote">Run module 6A</small>\r
              </div>\r
            </dl>\r
            <div>\r
              <div class="flex items-center justify-between gap-3">\r
                <p class="text-[11px] font-semibold tracking-widest uppercase text-slate-500 dark:text-slate-400">\r
                  Priority offenders\r
                </p>\r
                <span\r
                  id="driftGuardrailChip"\r
                  class="inline-flex items-center gap-1 rounded-full border border-amber-300/60 bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:border-amber-400/60 dark:bg-amber-500/20 dark:text-amber-200"\r
                >\r
                  Guardrail --\r
                </span>\r
              </div>\r
              <div id="driftOffenderList" class="drift-offender-list mt-2" aria-live="polite">\r
                <p class="text-xs text-slate-500 dark:text-slate-400">\r
                  Launch a rebalance scan to surface top drifts instantly.\r
                </p>\r
              </div>\r
            </div>\r
          </article>\r
\r
        </div>
\r
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">\r
          <!-- 6A: REBALANCE TOOL -->\r
          <div\r
            class="rebalance-card bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-4"\r
          >\r
            <h3\r
              class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2"\r
            >\r
              <svg\r
                class="w-5 h-5 text-sky-300"\r
                fill="none"\r
                stroke="currentColor"\r
                viewBox="0 0 24 24"\r
              >\r
                <path\r
                  stroke-linecap="round"\r
                  stroke-linejoin="round"\r
                  stroke-width="2"\r
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"\r
                ></path>\r
              </svg>\r
              Portfolio Tracker & Rebalance\r
            </h3>\r
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">\r
                Enter current values from your sheet\r
              </p>\r
\r
              <div class="flex flex-wrap gap-2 mb-3">\r
                <button\r
                  id="rebalanceNormalizeBtn"\r
                  type="button"\r
                  class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-900/50 hover:border-slate-400 hover:text-slate-900 dark:hover:text-white transition"\r
                >\r
                  <span>Normalize Targets</span>\r
                </button>\r
                <button\r
                  id="rebalanceResetTargetsBtn"\r
                  type="button"\r
                  class="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-rose-300 dark:border-rose-600 text-xs font-semibold text-rose-600 dark:text-rose-300 bg-white/80 dark:bg-rose-950/40 hover:border-rose-400 hover:text-rose-700 dark:hover:text-rose-200 transition"\r
                >\r
                  <span>Reset to Defaults</span>\r
                </button>\r
              </div>\r
\r
              <div class="overflow-x-auto fancy-scrollbar">\r
                <table\r
                  class="min-w-full divide-y divide-gray-200 dark:divide-gray-600 text-sm"\r
                >\r
                <thead class="bg-gray-50 dark:bg-gray-700">\r
                  <tr\r
                    class="text-[11px] md:text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider text-right"\r
                  >\r
                      <th class="px-2 py-2 text-left">Ticker</th>\r
                      <th class="px-2 py-2">Target %</th>\r
                      <th class="px-2 py-2">Current ($)</th>\r
                      <th class="px-2 py-2">Current %</th>\r
                      <th class="px-2 py-2">Drift %</th>\r
                      <th class="px-2 py-2">Rebalance ($)</th>\r
                    </tr>\r
                  </thead>\r
                  <tbody\r
                    id="rebalanceInputs"\r
                    class="divide-y divide-gray-200 dark:divide-gray-700"\r
                  ></tbody>\r
                  <tfoot class="bg-gray-100 dark:bg-gray-700 font-semibold">\r
                    <tr>\r
                      <td class="px-3 py-2 text-left">TOTAL</td>\r
                      <td id="totalTarget" class="px-3 py-2 text-right"></td>\r
                      <td\r
                        id="totalCurrentValue"\r
                        class="px-3 py-2 text-right"\r
                      ></td>\r
                      <td\r
                        id="totalCurrentPercent"\r
                        class="px-3 py-2 text-right"\r
                      ></td>\r
                      <td\r
                        id="totalDrift"\r
                        class="px-3 py-2 text-right text-slate-500"\r
                      ></td>\r
                      <td id="totalRebalance" class="px-3 py-2 text-right"></td>\r
                    </tr>\r
                  </tfoot>\r
                </table>\r
              </div>\r
\r
            <button\r
              id="calculateRebalanceBtn"\r
              class="w-full mt-4 bg-rose-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all duration-200 text-sm"\r
            >\r
              Update\r
            </button>\r
\r
              <div\r
                id="rebalanceResults"\r
                class="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"\r
              >\r
                <div class="rebalance-results-content">\r
                  <div class="rebalance-results-header flex items-start justify-between gap-3">\r
                    <div>\r
                      <h4 class="text-xl font-bold text-slate-700 dark:text-slate-200">Rebalance snapshot pending</h4>\r
                      <p class="text-xs text-slate-600 dark:text-slate-400">\r
                        Run an update to surface buy/sell suggestions. Adjust the guardrail below to change when alerts trigger.\r
                      </p>\r
                    </div>\r
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-semibold uppercase tracking-wide">Idle</span>\r
                  </div>\r
                  <div class="rebalance-results-scroll fancy-scrollbar">\r
                    <div class="flex items-center justify-center h-full">\r
                      <p class="text-sm font-medium text-slate-600 dark:text-slate-300 text-center">\r
                        Run an update to surface buy/sell suggestions. Adjust the guardrail below to change when alerts trigger.\r
                      </p>\r
                    </div>\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <div\r
                id="rebalanceAdvancedTools"\r
                class="rebalance-advanced-tools grid grid-cols-1 xl:grid-cols-3 gap-4"\r
              >\r
                <div\r
                  class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/50 p-4 flex flex-col gap-3"\r
                >\r
                  <div class="flex items-center justify-between">\r
                    <h4 class="text-sm font-semibold text-slate-700 dark:text-slate-200">\r
                      Control Center\r
                    </h4>\r
                    <span\r
                      class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300"\r
                    >\r
                      Drift tolerance\r
                    </span>\r
                  </div>\r
                  <div>\r
                    <label\r
                      for="rebalanceToleranceInput"\r
                      class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2"\r
                    >\r
                      Trigger warning at\r
                      <span\r
                        id="rebalanceToleranceValue"\r
                        class="font-semibold text-slate-800 dark:text-slate-100"\r
                        >5.0%</span\r
                      >\r
                    </label>\r
                    <input\r
                      type="range"\r
                      id="rebalanceToleranceInput"\r
                      min="1"\r
                      max="15"\r
                      step="0.5"\r
                      class="w-full accent-rose-500"\r
                    />\r
                    <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-2">\r
                      Lower the threshold to rebalance sooner, or raise it to allow more drift before firing alerts.\r
                    </p>\r
                  </div>\r
                  <button\r
                    id="rebalanceResetControlsBtn"\r
                    type="button"\r
                    class="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600 text-xs font-semibold text-slate-600 dark:text-slate-200 hover:border-slate-400 hover:text-slate-800 dark:hover:text-white transition"\r
                  >\r
                    Reset controls\r
                  </button>\r
                </div>\r
\r
                <div\r
                  class="rounded-xl border border-emerald-200/70 dark:border-emerald-700/60 bg-emerald-50/70 dark:bg-emerald-900/30 p-4 flex flex-col gap-3"\r
                >\r
                  <div class="flex items-center justify-between">\r
                    <h4 class="text-sm font-semibold text-emerald-800 dark:text-emerald-200">\r
                      Trade Flow Snapshot\r
                    </h4>\r
                    <span\r
                      class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-white/70 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-200"\r
                    >\r
                      Auto-updated\r
                    </span>\r
                  </div>\r
                  <dl class="space-y-2 text-sm">\r
                    <div class="flex items-center justify-between">\r
                      <dt class="text-emerald-700 dark:text-emerald-200">Buys Required</dt>\r
                      <dd\r
                        id="rebalanceTotalBuy"\r
                        class="font-semibold text-emerald-900 dark:text-emerald-100"\r
                      >\r
                        $0.00\r
                      </dd>\r
                    </div>\r
                    <div class="flex items-center justify-between">\r
                      <dt class="text-emerald-700 dark:text-emerald-200">Sells Required</dt>\r
                      <dd\r
                        id="rebalanceTotalSell"\r
                        class="font-semibold text-emerald-900 dark:text-emerald-100"\r
                      >\r
                        $0.00\r
                      </dd>\r
                    </div>\r
                    <div class="flex items-center justify-between border-t border-emerald-200/70 dark:border-emerald-700/50 pt-2">\r
                      <dt class="text-emerald-700 dark:text-emerald-200">Net Cash Flow</dt>\r
                      <dd\r
                        id="rebalanceNetFlow"\r
                        class="font-semibold text-emerald-900 dark:text-emerald-100"\r
                      >\r
                        $0.00\r
                      </dd>\r
                    </div>\r
                  </dl>\r
                  <button\r
                    id="rebalanceCopySummaryBtn"\r
                    type="button"\r
                    class="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-emerald-300 dark:border-emerald-600 text-xs font-semibold text-emerald-700 dark:text-emerald-100 hover:border-emerald-400 hover:text-emerald-900 dark:hover:text-white transition"\r
                  >\r
                    Copy trade summary\r
                  </button>\r
                </div>\r
\r
                <div\r
                  class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/50 p-4 flex flex-col gap-3"\r
                >\r
                  <div class="flex items-center justify-between">\r
                    <h4 class="text-sm font-semibold text-slate-700 dark:text-slate-200">\r
                      Drift Watchlist\r
                    </h4>\r
                    <span\r
                      class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300"\r
                    >\r
                      Top movers\r
                    </span>\r
                  </div>\r
                  <div\r
                    id="rebalanceTopDrifts"\r
                    class="space-y-2 text-sm text-slate-600 dark:text-slate-300"\r
                  >\r
                    <p class="text-xs text-slate-500 dark:text-slate-400">\r
                      Update the table to surface the biggest deviations.\r
                    </p>\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
\r
            <div class="flex flex-col gap-6">\r
            <!-- 6B: NEW DEPOSIT ALLOCATION TOOL -->\r
            <div\r
              class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-4"\r
            >\r
              <h3\r
                class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2"\r
              >\r
                <svg\r
                  class="w-5 h-5 text-blue-500"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  viewBox="0 0 24 24"\r
                >\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    stroke-width="2"\r
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"\r
                  ></path>\r
                </svg>\r
                Deposit Allocation Tool\r
              </h3>\r
\r
              <div\r
                class="grid gap-3 md:grid-cols-[minmax(0,220px)_minmax(0,220px)_auto] md:items-end"\r
              >\r
                <div>\r
                  <label\r
                    for="newDepositInput"\r
                    class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"\r
                    >Deposit Amount ($)</label\r
                  >\r
                  <input\r
                    type="number"\r
                    id="newDepositInput"\r
                    value="500"\r
                    min="0"\r
                    step="0.01"\r
                    class="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-black focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"\r
                  />\r
                </div>\r
                <div>\r
                  <label\r
                    for="depositRoundingMode"\r
                    class="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"\r
                    >Rounding Mode</label\r
                  >\r
                  <select\r
                    id="depositRoundingMode"\r
                    class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"\r
                  >\r
                    <option value="exact">Exact dollars (no rounding)</option>\r
                    <option value="floor">Whole shares (round down)</option>\r
                    <option value="nearest">Whole shares (nearest share)</option>\r
                  </select>\r
                </div>\r
                <button\r
                  id="calculateDepositAllocationBtn"\r
                  class="w-full md:w-auto bg-blue-600 text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 text-sm md:justify-self-end"\r
                >\r
                  Calculate Allocation\r
                </button>\r
              </div>\r
              <div\r
                class="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400"\r
              >\r
                <span\r
                  id="depositPriceStatus"\r
                  class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-200"\r
                  >Waiting for live prices...</span\r
                >\r
                <span\r
                  id="depositCalcSummary"\r
                  class="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-200/70 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300"\r
                  >No allocation calculated yet.</span\r
                >\r
              </div>\r
\r
              <div\r
                id="depositAllocationResults"\r
                class="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"\r
              >\r
                <h4\r
                  class="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-3"\r
                >\r
                  Proposed Allocation ($)\r
                </h4>\r
                <div class="overflow-x-auto">\r
                  <table\r
                    class="min-w-full divide-y divide-gray-200 dark:divide-gray-600 text-sm"\r
                  >\r
                    <thead class="bg-gray-50 dark:bg-gray-700">\r
                      <tr\r
                        class="text-[11px] md:text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider text-right"\r
                      >\r
                        <th class="px-2 py-2 text-left">Ticker</th>\r
                        <th class="px-2 py-2">Target %</th>\r
                        <th class="px-2 py-2">Price ($)</th>\r
                        <th class="px-2 py-2">Raw ($)</th>\r
                        <th class="px-2 py-2">Shares</th>\r
                        <th class="px-2 py-2">Final ($)</th>\r
                      </tr>\r
                    </thead>\r
                    <tbody\r
                      id="depositAllocationRows"\r
                      class="divide-y divide-gray-200 dark:divide-gray-700"\r
                    ></tbody>\r
                    <tfoot class="bg-gray-100 dark:bg-gray-700 font-semibold">\r
                      <tr>\r
                        <td class="px-2 py-2 text-left">TOTAL</td>\r
                        <td\r
                          id="totalTargetAlloc"\r
                          class="px-2 py-2 text-right"\r
                        ></td>\r
                        <td\r
                          class="px-2 py-2 text-right text-gray-400 dark:text-gray-500"\r
                        >\r
                          --\r
                        </td>\r
                        <td\r
                          id="totalRawAmount"\r
                          class="px-2 py-2 text-right"\r
                        ></td>\r
                        <td\r
                          class="px-2 py-2 text-right text-gray-400 dark:text-gray-500"\r
                        >\r
                          --\r
                        </td>\r
                        <td\r
                          id="totalAllocatedAmount"\r
                          class="px-2 py-2 text-right text-blue-600 dark:text-blue-400"\r
                        ></td>\r
                      </tr>\r
                    </tfoot>\r
                  </table>\r
                </div>\r
                <div\r
                  id="depositAllocationSummary"\r
                  class="mt-3 grid gap-3 sm:grid-cols-2"\r
                >\r
                  <div\r
                    class="rounded-lg border border-blue-200 dark:border-blue-800 bg-white/80 dark:bg-blue-900/10 p-3"\r
                  >\r
                    <p class="text-xs font-semibold text-blue-700 dark:text-blue-200">\r
                      Leftover Cash / Shortfall\r
                    </p>\r
                    <p\r
                      id="depositLeftoverAmount"\r
                      class="text-lg font-semibold text-blue-800 dark:text-blue-200"\r
                    >\r
                      $0.00\r
                    </p>\r
                    <p\r
                      id="depositLeftoverNote"\r
                      class="text-[11px] text-blue-700/80 dark:text-blue-200/80"\r
                    >\r
                      Calculated after applying the selected rounding mode.\r
                    </p>\r
                  </div>\r
                  <div\r
                    class="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/30 p-3"\r
                  >\r
                    <p class="text-xs font-semibold text-slate-600 dark:text-slate-200">\r
                      Allocation Integrity\r
                    </p>\r
                    <p\r
                      id="depositIntegritySummary"\r
                      class="text-lg font-semibold text-slate-700 dark:text-slate-100"\r
                    >\r
                      Waiting for calculation\r
                    </p>\r
                    <p\r
                      id="depositIntegrityNote"\r
                      class="text-[11px] text-slate-500 dark:text-slate-400"\r
                    >\r
                      Targets rescale automatically when totals deviate from 100%.\r
                    </p>\r
                </div>\r
              </div>\r
\r
            </div>\r
          </div>\r
\r
            <!-- 6C: DEPOSIT REBALANCING HELPER -->\r
            <div\r
              class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-4"\r
            >\r
              <h3\r
                class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2"\r
              >\r
                <svg\r
                  class="w-5 h-5 text-amber-500"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  viewBox="0 0 24 24"\r
                >\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    stroke-width="2"\r
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.636 1.006M12 8V6m0 12v-2m8-4a8 8 0 11-16 0 8 8 0 0116 0z"\r
                  ></path>\r
                </svg>\r
                Deposit Rebalancing Helper\r
              </h3>\r
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">\r
                Use this helper to distribute fresh supply shipments across squads while staying aligned with mission loadouts. Enter the crate value, confirm target ratios, then run the calculator to see how much to allocate to each unit.\r
              </p>\r
\r
              <div\r
                class="grid gap-4 mb-4 md:grid-cols-[minmax(0,220px)_minmax(0,240px)_auto]"\r
              >\r
                <div class="w-full">\r
                  <label\r
                    for="rebalanceDepositAmount"\r
                    class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1"\r
                    >Total Deposit ($)</label\r
                  >\r
                  <input\r
                    type="number"\r
                    id="rebalanceDepositAmount"\r
                    min="0"\r
                    step="0.01"\r
                    placeholder="Enter deposit amount"\r
                    class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/60"\r
                  />\r
                  <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-1">\r
                    Tip: leave the field blank or zero if you do not want the new deposit to touch a holding.\r
                  </p>\r
                </div>\r
                <div class="w-full">\r
                  <label\r
                    for="rebalanceRoundingMode"\r
                    class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1"\r
                    >Share Rounding</label\r
                  >\r
                  <select\r
                    id="rebalanceRoundingMode"\r
                    class="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/60"\r
                  >\r
                    <option value="exact">Exact dollars (no rounding)</option>\r
                    <option value="floor">Whole shares (round down)</option>\r
                    <option value="nearest">Whole shares (nearest)</option>\r
                  </select>\r
                  <div class="flex items-center gap-2 mt-2">\r
                    <input\r
                      type="checkbox"\r
                      id="rebalanceAutoDistributeCheckbox"\r
                      class="h-3.5 w-3.5 rounded border-gray-300 text-amber-500 focus:ring-amber-400"\r
                      checked\r
                    />\r
                    <label\r
                      for="rebalanceAutoDistributeCheckbox"\r
                      class="text-[11px] font-medium text-gray-500 dark:text-gray-400"\r
                      >Auto-spend leftover by target weight</label\r
                    >\r
                  </div>\r
                </div>\r
                <button\r
                  id="rebalanceDepositCalcBtn"\r
                  class="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-amber-400/60 transition"\r
                >\r
                  Run Allocation\r
                  <svg\r
                    class="w-4 h-4"\r
                    fill="none"\r
                    stroke="currentColor"\r
                    viewBox="0 0 24 24"\r
                  >\r
                    <path\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                      stroke-width="2"\r
                      d="M4 4v6h6M20 20v-6h-6M5 19a9 9 0 010-14M19 5a9 9 0 010 14"\r
                    ></path>\r
                  </svg>\r
                </button>\r
              </div>\r
\r
              <div class="overflow-x-auto fancy-scrollbar">\r
                <table\r
                  class="min-w-full divide-y divide-gray-200 dark:divide-gray-600 text-xs md:text-sm deposit-rebalance-table"\r
                >\r
                  <thead class="bg-gray-50 dark:bg-gray-700">\r
                    <tr\r
                      class="text-[1px] md:text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider text-center"\r
                    >\r
                      <th class="px-1 py-2 text-left">Lock</th>\r
                      <th class="px-1 py-2 text-left">Ticker</th>\r
                      <th class="px-1 py-2">Current ($)</th>\r
                      <th class="px-1 py-2">Target %</th>\r
                      <th class="px-1 py-2">Current %</th>\r
                      <th class="px-1 py-2 bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200 rounded">Deposit ($)</th>\r
                      <th class="px-1 py-2">New ($)</th>\r
                      <th class="px-1 py-2">New %</th>\r
                      <th class="px-1 py-2">Delta vs Target (%)</th>\r
                    </tr>\r
                  </thead>\r
                  <tbody\r
                    id="rebalanceDepositRows"\r
                    class="divide-y divide-gray-200 dark:divide-gray-700"\r
                  ></tbody>\r
                  <tfoot class="bg-gray-100 dark:bg-gray-700 font-semibold text-gray-800 dark:text-gray-100">\r
                    <tr id="rebalance-deposit-total-row">\r
                      <td class="px-1 py-2 text-left text-gray-500 dark:text-gray-400">--</td>\r
                      <td class="px-1 py-2 text-left">TOTAL</td>\r
                      <td class="px-1 py-2 text-right" data-field="current">--</td>\r
                      <td class="px-1 py-2 text-right text-xs text-gray-500 dark:text-gray-400">100%</td>\r
                      <td class="px-1 py-2 text-right" data-field="currentPercent">--</td>\r
                      <td class="px-1 py-2 text-right" data-field="deposit"><span class="inline-flex items-center justify-end min-w-[72px] px-2 py-1 rounded bg-amber-500/20 text-amber-700 dark:bg-amber-500/30 dark:text-amber-200 font-semibold">--</span></td>\r
                      <td class="px-1 py-2 text-right" data-field="newValue">--</td>\r
                      <td class="px-1 py-2 text-right" data-field="newPercent">--</td>\r
                      <td class="px-1 py-2 text-right" data-field="delta">--</td>\r
                    </tr>\r
                  </tfoot>\r
                </table>\r
              </div>\r
              <div\r
                id="rebalanceDepositSummary"\r
                class="mt-3 grid gap-3 sm:grid-cols-2"\r
              >\r
                <div\r
                  class="rounded-lg border border-amber-300/60 dark:border-amber-500/40 bg-white/70 dark:bg-amber-500/10 p-3"\r
                >\r
                  <p class="text-xs font-semibold text-amber-700 dark:text-amber-200">\r
                    Cash Deployment\r
                  </p>\r
                  <p\r
                    id="rebalanceSpentSummary"\r
                    class="text-lg font-semibold text-amber-700 dark:text-amber-200"\r
                  >\r
                    $0.00 spent\r
                  </p>\r
                  <p\r
                    id="rebalanceLeftoverSummary"\r
                    class="text-[11px] text-amber-700/80 dark:text-amber-200/80"\r
                  >\r
                    $0.00 leftover\r
                  </p>\r
                </div>\r
                <div\r
                  class="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/40 p-3"\r
                >\r
                  <p class="text-xs font-semibold text-slate-600 dark:text-slate-200">\r
                    Rebalance Impact\r
                  </p>\r
                  <p\r
                    id="rebalanceImpactSummary"\r
                    class="text-lg font-semibold text-slate-700 dark:text-slate-100"\r
                  >\r
                    Waiting for calculation\r
                  </p>\r
                  <p\r
                    id="rebalanceImpactNote"\r
                    class="text-[11px] text-slate-500 dark:text-slate-400"\r
                  >\r
                    Run the allocation to see drift improvements and holdings touched.\r
                  </p>\r
                </div>\r
              </div>\r
              <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-3">\r
                Notes: totals stay pinned at 100% for both current and proposed allocations. Deposit and new value columns update live as you edit weights or cash.\r
              </p>\r
            </div>\r
          </div>\r
        </div>\r
      </section>\r
\r
      <section id="analytics" class="section mb-12">\r
        <div class="section-header">\r
          <div class="section-header__icon">\r
            <svg\r
              class="w-8 h-8 text-sky-300"\r
              fill="none"\r
              stroke="currentColor"\r
              viewBox="0 0 24 24"\r
              xmlns="http://www.w3.org/2000/svg"\r
            >\r
              <path\r
                stroke-linecap="round"\r
                stroke-linejoin="round"\r
                stroke-width="2"\r
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"\r
              ></path>\r
            </svg>\r
          </div>\r
          <div>\r
            <h2 class="section-title">7. Analysis Deck</h2>\r
            <p class="section-intro">\r
              Interrogate sortie logs, threat exposure, and diversification metrics as you tune each squad's mission profile.\r
            </p>\r
          </div>\r
        </div>\r
\r
        <div class="analysis-hud" id="analysisHud">
          <div class="analysis-hud__backdrop" aria-hidden="true"></div>\r
          <div class="analysis-hud__scanlines" aria-hidden="true"></div>\r
\r
          <div class="analysis-hud__header">\r
            <div>\r
              <p class="analysis-hud__eyebrow">Neo Zeon Telemetry Feed</p>\r
              <h3 class="analysis-hud__title">Mission Metric Console</h3>\r
              <p class="analysis-hud__meta text-xs text-slate-500 dark:text-slate-400">\r
                Baseline backtest Jan&nbsp;2020&nbsp;&ndash;&nbsp;Sep&nbsp;2025 (Portfolio Visualizer)\r
              </p>\r
            </div>\r
            <div class="flex items-center gap-3">\r
              <button\r
                type="button"\r
                id="resetAssumptionsBtn"\r
                class="inline-flex items-center gap-2 rounded-md border border-emerald-400/60 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-600 transition hover:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:ring-offset-2 focus:ring-offset-slate-900/40 dark:border-emerald-400/40 dark:bg-emerald-600/10 dark:text-emerald-300 dark:hover:bg-emerald-600/20"\r
                title="Reset expected return assumptions to the portfolio baseline"\r
              >\r
                <svg\r
                  class="h-3.5 w-3.5"\r
                  viewBox="0 0 24 24"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  stroke-width="1.8"\r
                  stroke-linecap="round"\r
                  stroke-linejoin="round"\r
                  aria-hidden="true"\r
                  focusable="false"\r
                >\r
                  <path d="M3 12a9 9 0 1115.9 5.9"></path>\r
                  <path d="M3 12h4"></path>\r
                  <path d="M3 16v-4"></path>\r
                </svg>\r
                <span>Reset assumptions</span>\r
              </button>\r
              <button\r
                type="button"\r
                id="hudModeToggle"\r
                class="hud-mode-toggle"\r
                aria-pressed="false"\r
              >\r
                <span class="hud-mode-toggle__label">Mission Mode</span>\r
                <span class="hud-mode-toggle__rail">\r
                  <span class="hud-mode-toggle__pill hud-mode-toggle__pill--analysis">Analysis</span>\r
                  <span class="hud-mode-toggle__pill hud-mode-toggle__pill--combat">Combat</span>\r
                </span>\r
              </button>\r
            </div>\r
          </div>\r
\r
          <div class="analysis-hud__grid analysis-hud__grid--matrix">\r
            <article class="hud-card hud-card--return">\r
              <div class="hud-card__halo" aria-hidden="true"></div>\r
              <div class="hud-card__inner">\r
                <header class="hud-card__header">\r
                  <span class="hud-card__eyebrow">Signal 01</span>\r
                  <svg\r
                    class="hud-card__glyph"\r
                    viewBox="0 0 24 24"\r
                    aria-hidden="true"\r
                    focusable="false"\r
                  >\r
                    <path\r
                      d="M4 15l4.5-4.5L12 14l6-6"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                    />\r
                    <path\r
                      d="M16 8h4v4"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                    />\r
                  </svg>\r
                </header>\r
                <h3 class="hud-card__title">Expected Annual Return</h3>\r
                <p id="expectedReturnValue" class="hud-card__value">-</p>\r
                <p id="expectedReturnDiagnostic" class="hud-card__diagnostic" aria-live="polite"></p>\r
                <footer class="hud-card__footer">\r
                  <span class="hud-card__tag">Growth Vector</span>\r
                  <span class="hud-card__sparkline" aria-hidden="true"></span>\r
                </footer>\r
              </div>\r
            </article>\r
\r
            <article class="hud-card hud-card--volatility">\r
              <div class="hud-card__halo" aria-hidden="true"></div>\r
              <div class="hud-card__inner">\r
                <header class="hud-card__header">\r
                  <span class="hud-card__eyebrow">Signal 02</span>\r
                  <svg\r
                    class="hud-card__glyph"\r
                    viewBox="0 0 24 24"\r
                    aria-hidden="true"\r
                    focusable="false"\r
                  >\r
                    <path\r
                      d="M4 18h16M4 6h16M8 6v12m8-12v12"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                    />\r
                  </svg>\r
                </header>\r
                <h3 class="hud-card__title">Portfolio Volatility</h3>\r
                <p id="volatilityValue" class="hud-card__value">-</p>\r
                <p id="volatilityDiagnostic" class="hud-card__diagnostic" aria-live="polite"></p>\r
                <footer class="hud-card__footer">\r
                  <span class="hud-card__tag">Stability Monitor</span>\r
                  <span class="hud-card__sparkline" aria-hidden="true"></span>\r
                </footer>\r
              </div>\r
            </article>\r
\r
            <article class="hud-card hud-card--sharpe">\r
              <div class="hud-card__halo" aria-hidden="true"></div>\r
              <div class="hud-card__inner">\r
                <header class="hud-card__header">\r
                  <span class="hud-card__eyebrow">Signal 03</span>\r
                  <svg\r
                    class="hud-card__glyph"\r
                    viewBox="0 0 24 24"\r
                    aria-hidden="true"\r
                    focusable="false"\r
                  >\r
                    <path\r
                      d="M5 17l4-9 3 5 3-7 4 11"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                    />\r
                  </svg>\r
                </header>\r
                <h3 class="hud-card__title">Sharpe Ratio</h3>\r
                <p id="sharpeValue" class="hud-card__value">-</p>\r
                <p id="sharpeDiagnostic" class="hud-card__diagnostic" aria-live="polite"></p>\r
                <footer class="hud-card__footer">\r
                  <span class="hud-card__tag">Efficiency Index</span>\r
                  <span class="hud-card__sparkline" aria-hidden="true"></span>\r
                </footer>\r
              </div>\r
            </article>\r
\r
            <article class="hud-card hud-card--beta">\r
              <div class="hud-card__halo" aria-hidden="true"></div>\r
              <div class="hud-card__inner">\r
                <header class="hud-card__header">\r
                  <span class="hud-card__eyebrow">Signal 04</span>\r
                  <svg\r
                    class="hud-card__glyph"\r
                    viewBox="0 0 24 24"\r
                    aria-hidden="true"\r
                    focusable="false"\r
                  >\r
                    <path\r
                      d="M5 12h5l2-4 2 8 2-4h3"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                    />\r
                  </svg>\r
                </header>\r
                <h3 class="hud-card__title">Portfolio Beta</h3>\r
                <p id="portfolioBetaValue" class="hud-card__value">-</p>\r
                <p id="betaDiagnostic" class="hud-card__diagnostic" aria-live="polite"></p>\r
                <footer class="hud-card__footer">\r
                  <span class="hud-card__tag">Market Sync</span>\r
                  <span class="hud-card__sparkline" aria-hidden="true"></span>\r
                </footer>\r
              </div>\r
            </article>\r
\r
            <article class="hud-card hud-card--score">\r
              <div class="hud-card__halo" aria-hidden="true"></div>\r
              <div class="hud-card__inner">\r
                <header class="hud-card__header">\r
                  <span class="hud-card__eyebrow">Signal 05</span>\r
                  <svg\r
                    class="hud-card__glyph"\r
                    viewBox="0 0 24 24"\r
                    aria-hidden="true"\r
                    focusable="false"\r
                  >\r
                    <path\r
                      d="M4 12l4 4 12-12"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                    />\r
                    <circle\r
                      cx="8"\r
                      cy="16"\r
                      r="1"\r
                      fill="currentColor"\r
                    />\r
                  </svg>\r
                </header>\r
                <h3 class="hud-card__title">Portfolio Score</h3>\r
                <p id="analyticsPortfolioScore" class="hud-card__value">-</p>\r
                <p id="portfolioScoreDiagnostic" class="hud-card__diagnostic" aria-live="polite"></p>\r
                <footer class="hud-card__footer">\r
                  <span class="hud-card__tag">Composite Signal</span>\r
                  <span class="hud-card__sparkline" aria-hidden="true"></span>\r
                </footer>\r
              </div>\r
            </article>\r
\r
            <article class="hud-card hud-card--diversity">\r
              <div class="hud-card__halo" aria-hidden="true"></div>\r
              <div class="hud-card__inner">\r
                <header class="hud-card__header">\r
                  <span class="hud-card__eyebrow">Signal 06</span>\r
                  <svg\r
                    class="hud-card__glyph"\r
                    viewBox="0 0 24 24"\r
                    aria-hidden="true"\r
                    focusable="false"\r
                  >\r
                    <path\r
                      d="M4 12h16M8 8l4-4 4 4M8 16l4 4 4-4"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                    />\r
                  </svg>\r
                </header>\r
                <h3 class="hud-card__title">Diversity Score</h3>\r
                <p id="diversityScoreValue" class="hud-card__value">-</p>\r
                <p id="diversityDiagnostic" class="hud-card__diagnostic" aria-live="polite"></p>\r
                <footer class="hud-card__footer">\r
                  <span class="hud-card__tag">Spread Index</span>\r
                  <span class="hud-card__sparkline" aria-hidden="true"></span>\r
                </footer>\r
              </div>\r
            </article>\r
            <article class="hud-card hud-card--compact hud-card--sortino">\r
              <div class="hud-card__halo" aria-hidden="true"></div>\r
              <div class="hud-card__inner">\r
                <header class="hud-card__header">\r
                  <span class="hud-card__eyebrow">Signal 07</span>\r
                  <svg\r
                    class="hud-card__glyph"\r
                    viewBox="0 0 24 24"\r
                    aria-hidden="true"\r
                    focusable="false"\r
                  >\r
                    <path\r
                      d="M5 19V9l6 4 8-8"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                    />\r
                  </svg>\r
                </header>\r
                <h3 class="hud-card__title">Sortino Ratio</h3>\r
                <p id="sortinoValue" class="hud-card__value">-</p>\r
                <p id="sortinoDiagnostic" class="hud-card__diagnostic" aria-live="polite"></p>\r
                <footer class="hud-card__footer">\r
                  <span class="hud-card__tag">Downside Shield</span>\r
                  <span class="hud-card__sparkline" aria-hidden="true"></span>\r
                </footer>\r
              </div>\r
            </article>\r
\r
            <article class="hud-card hud-card--compact hud-card--drawdown">\r
              <div class="hud-card__halo" aria-hidden="true"></div>\r
              <div class="hud-card__inner">\r
                <header class="hud-card__header">\r
                  <span class="hud-card__eyebrow">Signal 08</span>\r
                  <svg\r
                    class="hud-card__glyph"\r
                    viewBox="0 0 24 24"\r
                    aria-hidden="true"\r
                    focusable="false"\r
                  >\r
                    <path\r
                      d="M5 6l4 4-4 4m10-8l4 4-4 4"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                    />\r
                    <path\r
                      d="M9 10h6"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                    />\r
                  </svg>\r
                </header>\r
                <h3 class="hud-card__title">Max Drawdown</h3>\r
                <p id="maxDrawdownValue" class="hud-card__value">-</p>\r
                <p id="maxDrawdownDiagnostic" class="hud-card__diagnostic" aria-live="polite"></p>\r
                <footer class="hud-card__footer">\r
                  <span class="hud-card__tag">Loss Containment</span>\r
                  <span class="hud-card__sparkline" aria-hidden="true"></span>\r
                </footer>\r
              </div>\r
            </article>\r
\r
            <article class="hud-card hud-card--compact hud-card--calmar">\r
              <div class="hud-card__halo" aria-hidden="true"></div>\r
              <div class="hud-card__inner">\r
                <header class="hud-card__header">\r
                  <span class="hud-card__eyebrow">Signal 09</span>\r
                  <svg\r
                    class="hud-card__glyph"\r
                    viewBox="0 0 24 24"\r
                    aria-hidden="true"\r
                    focusable="false"\r
                  >\r
                    <path\r
                      d="M4 16l6-8 4 5 6-9"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                    />\r
                  </svg>\r
                </header>\r
                <h3 class="hud-card__title">Calmar Ratio</h3>\r
                <p id="calmarValue" class="hud-card__value">-</p>\r
                <p id="calmarDiagnostic" class="hud-card__diagnostic" aria-live="polite"></p>\r
                <footer class="hud-card__footer">\r
                  <span class="hud-card__tag">Uplift Quotient</span>\r
                  <span class="hud-card__sparkline" aria-hidden="true"></span>\r
                </footer>\r
              </div>\r
            </article>\r
\r
            <article class="hud-card hud-card--compact hud-card--alpha">\r
              <div class="hud-card__halo" aria-hidden="true"></div>\r
              <div class="hud-card__inner">\r
                <header class="hud-card__header">\r
                  <span class="hud-card__eyebrow">Signal 10</span>\r
                  <svg\r
                    class="hud-card__glyph"\r
                    viewBox="0 0 24 24"\r
                    aria-hidden="true"\r
                    focusable="false"\r
                  >\r
                    <path\r
                      d="M5 12h4l2-3 4 6 4-7"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                    />\r
                  </svg>\r
                </header>\r
                <h3 class="hud-card__title">Alpha vs. Market</h3>\r
                <p id="alphaValue" class="hud-card__value">-</p>\r
                <p id="alphaDiagnostic" class="hud-card__diagnostic" aria-live="polite"></p>\r
                <footer class="hud-card__footer">\r
                  <span class="hud-card__tag">Outperformance Pulse</span>\r
                  <span class="hud-card__sparkline" aria-hidden="true"></span>\r
                </footer>\r
              </div>\r
            </article>\r
\r
            <article class="hud-card hud-card--compact hud-card--expense">\r
              <div class="hud-card__halo" aria-hidden="true"></div>\r
              <div class="hud-card__inner">\r
                <header class="hud-card__header">\r
                  <span class="hud-card__eyebrow">Signal 11</span>\r
                  <svg\r
                    class="hud-card__glyph"\r
                    viewBox="0 0 24 24"\r
                    aria-hidden="true"\r
                    focusable="false"\r
                  >\r
                    <path\r
                      d="M5 11h14M8 7h8M9 15h6"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                    />\r
                    <circle\r
                      cx="12"\r
                      cy="12"\r
                      r="9"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                    />\r
                  </svg>\r
                </header>\r
                <h3 class="hud-card__title">Weighted Expense</h3>\r
                <p id="expenseRatioValue" class="hud-card__value">-</p>\r
                <p id="expenseDiagnostic" class="hud-card__diagnostic" aria-live="polite"></p>\r
                <footer class="hud-card__footer">\r
                  <span class="hud-card__tag">Cost Watch</span>\r
                  <span class="hud-card__sparkline" aria-hidden="true"></span>\r
                </footer>\r
              </div>\r
            </article>\r
\r
            <article class="hud-card hud-card--compact hud-card--multifactor">\r
              <div class="hud-card__halo" aria-hidden="true"></div>\r
              <div class="hud-card__inner">\r
                <header class="hud-card__header">\r
                  <span class="hud-card__eyebrow">Signal 12</span>\r
                  <svg\r
                    class="hud-card__glyph"\r
                    viewBox="0 0 24 24"\r
                    aria-hidden="true"\r
                    focusable="false"\r
                  >\r
                    <path\r
                      d="M4 17l4-5 4 3 4-6 4 8"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                    />\r
                  </svg>\r
                </header>\r
                <h3 class="hud-card__title">Multi-Factor Profile</h3>\r
                <div class="hud-card__stat-split">\r
                  <div>\r
                    <p class="hud-card__metric-label">RÂ²</p>\r
                    <p id="multiFactorR2" class="hud-card__value hud-card__value--compact">-</p>\r
                  </div>\r
                  <div>\r
                    <p class="hud-card__metric-label">Factor Betas</p>\r
                    <div id="multiFactorBetaList" class="hud-card__factor-grid"></div>\r
                  </div>\r
                </div>\r
                <p id="multiFactorDiagnostic" class="hud-card__diagnostic" aria-live="polite"></p>\r
                <footer class="hud-card__footer">\r
                  <span class="hud-card__tag">Regression Fit</span>\r
                  <span class="hud-card__sparkline" aria-hidden="true"></span>\r
                </footer>\r
              </div>\r
            </article>\r
\r
            <article class="hud-card hud-card--compact hud-card--capture">\r
              <div class="hud-card__halo" aria-hidden="true"></div>\r
              <div class="hud-card__inner">\r
                <header class="hud-card__header">\r
                  <span class="hud-card__eyebrow">Signal 13</span>\r
                  <svg\r
                    class="hud-card__glyph"\r
                    viewBox="0 0 24 24"\r
                    aria-hidden="true"\r
                    focusable="false"\r
                  >\r
                    <path\r
                      d="M7 15l5-5 5 5"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                    />\r
                    <path\r
                      d="M7 9l5 5 5-5"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                    />\r
                  </svg>\r
                </header>\r
                <h3 class="hud-card__title">Up/Down Capture</h3>\r
                <div class="hud-card__capture-grid">\r
                  <div>\r
                    <p class="hud-card__metric-label">Up Capture</p>\r
                    <p id="upCaptureValue" class="hud-card__value hud-card__value--compact">-</p>\r
                  </div>\r
                  <div>\r
                    <p class="hud-card__metric-label">Down Capture</p>\r
                    <p id="downCaptureValue" class="hud-card__value hud-card__value--compact">-</p>\r
                  </div>\r
                </div>\r
                <p id="captureDiagnostic" class="hud-card__diagnostic" aria-live="polite"></p>\r
                <footer class="hud-card__footer">\r
                  <span class="hud-card__tag">Asymmetry Gauge</span>\r
                  <span class="hud-card__sparkline" aria-hidden="true"></span>\r
                </footer>\r
              </div>\r
            </article>\r
\r
            <article class="hud-card hud-card--compact hud-card--cvar">\r
              <div class="hud-card__halo" aria-hidden="true"></div>\r
              <div class="hud-card__inner">\r
                <header class="hud-card__header">\r
                  <span class="hud-card__eyebrow">Signal 14</span>\r
                  <svg\r
                    class="hud-card__glyph"\r
                    viewBox="0 0 24 24"\r
                    aria-hidden="true"\r
                    focusable="false"\r
                  >\r
                    <path\r
                      d="M4 15.5l6-7 4 4 6-7"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                    />\r
                    <path\r
                      d="M4 19h16"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                    />\r
                  </svg>\r
                </header>\r
                <h3 class="hud-card__title">Tail Risk (CVaR)</h3>\r
                <div class="hud-card__stat-split">\r
                  <div>\r
                    <p class="hud-card__metric-label">CVaR 95%</p>\r
                    <p id="cvarValue" class="hud-card__value hud-card__value--compact">-</p>\r
                  </div>\r
                  <div>\r
                    <p class="hud-card__metric-label">VaR 95%</p>\r
                    <p id="varValue" class="hud-card__value hud-card__value--compact">-</p>\r
                  </div>\r
                </div>\r
                <p id="cvarDiagnostic" class="hud-card__diagnostic" aria-live="polite"></p>\r
                <footer class="hud-card__footer">\r
                  <span class="hud-card__tag">Expected Shortfall</span>\r
                  <span class="hud-card__sparkline" aria-hidden="true"></span>\r
                </footer>\r
              </div>\r
            </article>\r
\r
            <article class="hud-card hud-card--compact hud-card--tracking">\r
              <div class="hud-card__halo" aria-hidden="true"></div>\r
              <div class="hud-card__inner">\r
                <header class="hud-card__header">\r
                  <span class="hud-card__eyebrow">Signal 15</span>\r
                  <svg\r
                    class="hud-card__glyph"\r
                    viewBox="0 0 24 24"\r
                    aria-hidden="true"\r
                    focusable="false"\r
                  >\r
                    <path\r
                      d="M4 18l4-5 4 4 4-6 4 3"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                    />\r
                  </svg>\r
                </header>\r
                <h3 class="hud-card__title">Active Risk Profile</h3>\r
                <div class="hud-card__stat-split">\r
                  <div>\r
                    <p class="hud-card__metric-label">Tracking Error</p>\r
                    <p id="trackingErrorValue" class="hud-card__value hud-card__value--compact">-</p>\r
                  </div>\r
                  <div>\r
                    <p class="hud-card__metric-label">Information Ratio</p>\r
                    <p id="informationRatioValue" class="hud-card__value hud-card__value--compact">-</p>\r
                  </div>\r
                </div>\r
                <p id="trackingErrorDiagnostic" class="hud-card__diagnostic" aria-live="polite"></p>\r
                <footer class="hud-card__footer">\r
                  <span class="hud-card__tag">Benchmark Alignment</span>\r
                  <span class="hud-card__sparkline" aria-hidden="true"></span>\r
                </footer>\r
              </div>\r
            </article>\r
\r
            <article class="hud-card hud-card--compact hud-card--recovery">\r
              <div class="hud-card__halo" aria-hidden="true"></div>\r
              <div class="hud-card__inner">\r
                <header class="hud-card__header">\r
                  <span class="hud-card__eyebrow">Signal 16</span>\r
                  <svg\r
                    class="hud-card__glyph"\r
                    viewBox="0 0 24 24"\r
                    aria-hidden="true"\r
                    focusable="false"\r
                  >\r
                    <path\r
                      d="M12 6v6l3 3"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                    />\r
                    <circle\r
                      cx="12"\r
                      cy="12"\r
                      r="8"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      stroke-width="1.5"\r
                    />\r
                  </svg>\r
                </header>\r
                <h3 class="hud-card__title">Recovery Time</h3>\r
                <p id="recoveryTimeValue" class="hud-card__value">-</p>\r
                <p id="recoveryDiagnostic" class="hud-card__diagnostic" aria-live="polite"></p>\r
                <footer class="hud-card__footer">\r
                  <span class="hud-card__tag">Resilience Clock</span>\r
                  <span class="hud-card__sparkline" aria-hidden="true"></span>\r
                </footer>\r
              </div>\r
            </article>\r
          </div>\r
        </div>\r
\r
        <!-- Advanced Portfolio Insights & Recommendations -->\r
        <div\r
          class="mb-8 p-6 rounded-2xl border card bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 dark:from-blue-900/10 dark:via-indigo-900/5 dark:to-purple-900/10 relative overflow-hidden"\r
        >\r
          <!-- Background Pattern -->\r
          <div class="absolute inset-0 opacity-5">\r
            <div\r
              class="absolute top-4 left-4 w-20 h-20 border border-blue-500 rounded-full"\r
            ></div>\r
            <div\r
              class="absolute top-8 right-8 w-16 h-16 border border-purple-500 rounded-full"\r
            ></div>\r
            <div\r
              class="absolute bottom-6 left-1/2 w-12 h-12 border border-indigo-500 rounded-full"\r
            ></div>\r
          </div>\r
\r
          <div class="relative z-10">\r
            <h3\r
              class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3"\r
            >\r
              <div\r
                class="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500"\r
              >\r
                <svg\r
                  class="w-6 h-6 text-white"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  viewBox="0 0 24 24"\r
                >\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    stroke-width="2"\r
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"\r
                  ></path>\r
                </svg>\r
              </div>\r
              Portfolio Intelligence Hub\r
            </h3>\r
\r
                                    <div class="intelligence-ops">\r
              <section class="ops-column">\r
                <header class="ops-column__header">\r
                  <span class="ops-column__eyebrow">Telemetry Feed</span>\r
                  <h4 class="ops-column__title">Core Signals</h4>\r
                </header>\r
                <div class="ops-kpi-grid">\r
                  <article class="ops-kpi-card">\r
                    <p class="ops-kpi-label">Diversification</p>\r
                    <p id="diversificationLevel" class="ops-kpi-value">-</p>\r
                    <span class="ops-kpi-meta">Spread index across sleeves</span>\r
                  </article>\r
                  <article class="ops-kpi-card">\r
                    <p class="ops-kpi-label">Risk-Adjusted Return</p>\r
                    <p id="riskAdjustedReturn" class="ops-kpi-value">-</p>\r
                    <span class="ops-kpi-meta">Sharpe sync from analytics</span>\r
                  </article>\r
                  <article class="ops-kpi-card">\r
                    <p class="ops-kpi-label">Growth Potential</p>\r
                    <p id="growthPotential" class="ops-kpi-value">-</p>\r
                    <span class="ops-kpi-meta">Trajectory versus targets</span>\r
                  </article>\r
                  <article class="ops-kpi-card">\r
                    <p class="ops-kpi-label">Active Drift</p>\r
                    <p id="activeDriftValue" class="ops-kpi-value">-</p>\r
                    <span class="ops-kpi-meta">Tracking error & IR snapshot</span>\r
                  </article>\r
                </div>\r
              </section>\r
\r
              <section class="ops-column ops-column--timeline">\r
                <header class="ops-column__header">\r
                  <span class="ops-column__eyebrow">Mission Timeline</span>\r
                  <h4 class="ops-column__title">Health Grid</h4>\r
                </header>\r
                <div class="ops-timeline">\r
                  <article class="ops-timeline__item">\r
                    <div class="ops-timeline__marker ops-timeline__marker--active"></div>\r
                    <div class="ops-timeline__content">\r
                      <p class="ops-timeline__label">Risk Management</p>\r
                      <div class="ops-progress">\r
                        <span\r
                          id="healthRiskBar"\r
                          class="ops-progress__bar ops-progress__bar--risk"\r
                          role="progressbar"\r
                          aria-valuemin="0"\r
                          aria-valuemax="100"\r
                          aria-valuenow="0"\r
                          style="width: 0%"\r
                        ></span>\r
                      </div>\r
                      <span id="healthRiskValue" class="ops-timeline__value">--</span>\r
                    </div>\r
                  </article>\r
                  <article class="ops-timeline__item">\r
                    <div class="ops-timeline__marker"></div>\r
                    <div class="ops-timeline__content">\r
                      <p class="ops-timeline__label">Diversification</p>\r
                      <div class="ops-progress">\r
                        <span\r
                          id="healthDiversificationBar"\r
                          class="ops-progress__bar ops-progress__bar--diversification"\r
                          role="progressbar"\r
                          aria-valuemin="0"\r
                          aria-valuemax="100"\r
                          aria-valuenow="0"\r
                          style="width: 0%"\r
                        ></span>\r
                      </div>\r
                      <span id="healthDiversificationValue" class="ops-timeline__value">--</span>\r
                    </div>\r
                  </article>\r
                  <article class="ops-timeline__item">\r
                    <div class="ops-timeline__marker"></div>\r
                    <div class="ops-timeline__content">\r
                      <p class="ops-timeline__label">Growth Alignment</p>\r
                      <div class="ops-progress">\r
                        <span\r
                          id="healthGrowthBar"\r
                          class="ops-progress__bar ops-progress__bar--growth"\r
                          role="progressbar"\r
                          aria-valuemin="0"\r
                          aria-valuemax="100"\r
                          aria-valuenow="0"\r
                          style="width: 0%"\r
                        ></span>\r
                      </div>\r
                      <span id="healthGrowthValue" class="ops-timeline__value">--</span>\r
                    </div>\r
                  </article>\r
                </div>\r
              </section>\r
            </div>\r
        <!-- Asset Contribution Table -->\r
        <div class="p-4 rounded-xl border card mb-6">\r
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">\r
            <div>\r
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">\r
                Asset Contribution to Portfolio\r
              </h3>\r
              <p class="text-sm text-gray-500 dark:text-gray-400">\r
                Toggle between return, risk, and Sharpe lenses to inspect each sleeve's impact.\r
              </p>\r
            </div>\r
            <div class="flex items-center gap-2 flex-wrap">\r
              <span class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">View</span>\r
              <div\r
                class="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1 shadow-inner"\r
                role="group"\r
                aria-label="Contribution view selector"\r
              >\r
                <button\r
                  type="button"\r
                  class="contribution-toggle active"\r
                  data-mode="return"\r
                >\r
                  Return\r
                </button>\r
                <button\r
                  type="button"\r
                  class="contribution-toggle"\r
                  data-mode="risk"\r
                >\r
                  Risk\r
                </button>\r
                <button\r
                  type="button"\r
                  class="contribution-toggle"\r
                  data-mode="sharpe"\r
                >\r
                  Sharpe\r
                </button>\r
              </div>\r
            </div>\r
          </div>\r
\r
          <div class="grid gap-6 mt-4 lg:grid-cols-[minmax(0,1fr)_260px]">\r
            <div class="overflow-x-auto">\r
              <table\r
                class="min-w-full divide-y divide-gray-300 dark:divide-gray-600 modern-table text-sm"\r
              >\r
                <thead>\r
                  <tr\r
                    class="text-xs font-semibold text-gray-700 dark:text-gray-100 uppercase tracking-wider"\r
                  >\r
                    <th class="px-1.5 py-2 text-left">Asset</th>\r
                    <th class="px-1.5 py-2 text-right">Target %</th>\r
                    <th class="px-1.5 py-2 text-right" id="contributionSignalHeader">\r
                      Expected Return (%)\r
                    </th>\r
                    <th class="px-1.5 py-2 text-right">Volatility</th>\r
                    <th class="px-1.5 py-2 text-right" id="contributionValueHeader">\r
                      Contribution\r
                    </th>\r
                    <th class="px-1.5 py-2 text-right">Delta vs. Snapshot</th>\r
                  </tr>\r
                </thead>\r
                <tbody\r
                  id="assetContributionTable"\r
                  class="divide-y divide-gray-200 dark:divide-gray-700"\r
                >\r
                  <!-- Rows will be populated by JS -->\r
                </tbody>\r
                <tfoot\r
                  id="assetContributionSummary"\r
                  class="bg-slate-100/80 dark:bg-slate-900/40 text-gray-700 dark:text-gray-200"\r
                >\r
                  <tr>\r
                    <th class="px-2 py-3 text-left font-semibold" colspan="2">\r
                      Portfolio Totals\r
                    </th>\r
                    <td class="px-2 py-3 text-right font-semibold" id="summarySignalValue">--</td>\r
                    <td class="px-2 py-3 text-right text-gray-500 dark:text-gray-400"> - </td>\r
                    <td class="px-2 py-3 text-right font-semibold" id="summaryContributionValue">--</td>\r
                    <td class="px-2 py-3 text-right text-xs font-semibold" id="summaryDeltaValue">\r
                      Delta 0.0%\r
                    </td>\r
                  </tr>\r
                </tfoot>\r
              </table>\r
            </div>\r
\r
            <aside\r
              class="rounded-xl border border-slate-200/70 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/60 p-4 flex flex-col gap-4 backdrop-blur-sm"\r
            >\r
              <div>\r
                <h4 class="text-base font-semibold text-gray-800 dark:text-gray-200">\r
                  Scenario Stress Test\r
                </h4>\r
                <p class="text-xs text-gray-500 dark:text-gray-400">\r
                  Apply a +/-5% shift to expected returns to gauge sensitivity. Set back to 0% to clear.\r
                </p>\r
              </div>\r
              <div>\r
                <input\r
                  id="stressTestSlider"\r
                  type="range"\r
                  min="-5"\r
                  max="5"\r
                  step="0.5"\r
                  value="0"\r
                  class="w-full accent-blue-500"\r
                  aria-describedby="stressTestHint"\r
                />\r
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">\r
                  <span>-5%</span>\r
                  <span id="stressTestValue">0%</span>\r
                  <span>+5%</span>\r
                </div>\r
              </div>\r
              <button\r
                type="button"\r
                id="applyStressTestBtn"\r
                class="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400/60 styled-button"\r
              >\r
                Apply Scenario\r
              </button>\r
              <p\r
                id="stressTestHint"\r
                class="text-xs text-gray-500 dark:text-gray-400"\r
              >\r
                Latest multiplier: <span id="stressTestMultiplier">1.00x</span>\r
              </p>\r
            </aside>\r
          </div>\r
        </div>\r
\r
        <div class="text-center">\r
          <button\r
            id="refreshAnalyticsBtn"\r
            class="bg-rose-600 text-white font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-500/70 focus:ring-offset-2 styled-button"\r
          >\r
            Refresh Insights\r
          </button>\r
        </div>\r
      </section>\r
\r
      <section id="performance" class="section mb-12">\r
        <div class="section-header">\r
          <div class="section-header__icon">\r
            <svg\r
              class="w-8 h-8 text-sky-300"\r
              fill="none"\r
              stroke="currentColor"\r
              viewBox="0 0 24 24"\r
              xmlns="http://www.w3.org/2000/svg"\r
            >\r
              <path\r
                stroke-linecap="round"\r
                stroke-linejoin="round"\r
                stroke-width="2"\r
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"\r
              ></path>\r
            </svg>\r
          </div>\r
          <div>\r
            <h2 class="section-title">8. Sortie Debrief Analytics</h2>\r
            <p class="section-intro">\r
              Review sortie archives, projection bands, and rolling battle performance against your federation benchmarks.\r
            </p>\r
          </div>\r
        </div>\r
\r
        <div class="mb-6 flex justify-center gap-4 flex-wrap">\r
          <button\r
            id="period1Y"\r
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"\r
          >\r
            1 Year\r
          </button>\r
          <button\r
            id="period5Y"\r
            class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"\r
          >\r
            5 Years\r
          </button>\r
          <button\r
            id="period10Y"\r
            class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"\r
          >\r
            10 Years\r
          </button>\r
          <button\r
            id="period20Y"\r
            class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"\r
          >\r
            20 Years\r
          </button>\r
          <button\r
            id="period30Y"\r
            class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"\r
          >\r
            30 Years\r
          </button>\r
          <button\r
            id="period35Y"\r
            class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"\r
          >\r
            35 Years\r
          </button>\r
        </div>\r
\r
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">\r
          <!-- Performance Chart -->\r
          <div class="p-6 rounded-xl border card card--lifted">\r
            <h3\r
              class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4"\r
            >\r
              Portfolio Value Over Time\r
            </h3>\r
            <div class="chart-container h-80">\r
              <canvas id="performanceChart"></canvas>\r
            </div>\r
          </div>\r
\r
          <!-- Performance Metrics -->\r
          <div class="p-6 rounded-xl border card card--lifted">\r
            <h3\r
              class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4"\r
            >\r
              Performance Metrics\r
            </h3>\r
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">\r
              <div\r
                class="p-4 rounded-lg border border-sky-400/40 dark:border-rose-700/40 bg-sky-500/10 dark:bg-sky-900/20"\r
              >\r
                <div class="flex items-baseline justify-between">\r
                  <span class="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400"\r
                    >Portfolio CAGR</span\r
                  >\r
                  <span\r
                    id="annualizedReturn"\r
                    class="text-xl font-bold text-cyan-400 dark:text-cyan-300"\r
                    >-</span\r
                  >\r
                </div>\r
                <p class="mt-2 text-xs text-gray-600 dark:text-gray-400">\r
                  Compound annual growth over the selected window.\r
                </p>\r
              </div>\r
\r
              <div\r
                class="p-4 rounded-lg border border-blue-200/60 dark:border-blue-700/60 bg-blue-50/40 dark:bg-blue-900/10"\r
              >\r
                <div class="flex items-baseline justify-between">\r
                  <span class="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400"\r
                    >Benchmark CAGR</span\r
                  >\r
                  <span\r
                    id="benchmarkReturn"\r
                    class="text-xl font-bold text-blue-600 dark:text-blue-400"\r
                    >-</span\r
                  >\r
                </div>\r
                <p class="mt-2 text-xs text-gray-600 dark:text-gray-400">\r
                  S&P&nbsp;500 compound growth for the same period.\r
                </p>\r
              </div>\r
\r
              <div\r
                class="p-4 rounded-lg border border-sky-200/60 dark:border-sky-600/60 bg-sky-100/40 dark:bg-sky-900/10"\r
              >\r
                <div class="flex items-baseline justify-between">\r
                  <span class="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400"\r
                    >Excess CAGR</span\r
                  >\r
                  <span\r
                    id="excessAnnualizedReturn"\r
                    class="text-xl font-bold text-sky-500 dark:text-sky-300"\r
                    >-</span\r
                  >\r
                </div>\r
                <p class="mt-2 text-xs text-gray-600 dark:text-gray-400">\r
                  Annualised alpha versus the benchmark.\r
                </p>\r
              </div>\r
\r
              <div\r
                class="p-4 rounded-lg border border-indigo-200/60 dark:border-indigo-700/60 bg-indigo-50/40 dark:bg-indigo-900/10"\r
              >\r
                <div class="flex items-baseline justify-between">\r
                  <span class="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400"\r
                    >Total Return</span\r
                  >\r
                  <span\r
                    id="totalReturn"\r
                    class="text-xl font-bold text-indigo-600 dark:text-indigo-400"\r
                    >-</span\r
                  >\r
                </div>\r
                <div class="mt-3 space-y-1 text-xs text-gray-600 dark:text-gray-400">\r
                  <div class="flex justify-between">\r
                    <span>Benchmark</span>\r
                    <span\r
                      id="benchmarkTotalReturn"\r
                      class="font-semibold text-blue-600 dark:text-blue-400"\r
                      >-</span\r
                    >\r
                  </div>\r
                  <div class="flex justify-between">\r
                    <span>Excess</span>\r
                    <span\r
                      id="excessTotalReturn"\r
                      class="font-semibold text-sky-500 dark:text-sky-300"\r
                      >-</span\r
                    >\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <div\r
                class="p-4 rounded-lg border border-red-200/60 dark:border-red-700/60 bg-red-50/40 dark:bg-red-900/10"\r
              >\r
                <div class="flex items-baseline justify-between">\r
                  <span class="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400"\r
                    >Max Drawdown</span\r
                  >\r
                  <span\r
                    id="maxDrawdown"\r
                    class="text-xl font-bold text-red-600 dark:text-red-400"\r
                    >-</span\r
                  >\r
                </div>\r
                <div class="mt-3 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">\r
                  <span>Annual Volatility</span>\r
                  <span\r
                    id="performanceVolatility"\r
                    class="font-semibold text-orange-600 dark:text-orange-400"\r
                    >-</span\r
                  >\r
                </div>\r
              </div>\r
\r
              <div\r
                class="p-4 rounded-lg border border-slate-200/60 dark:border-slate-700/60 bg-slate-50/40 dark:bg-slate-900/10"\r
              >\r
                <div class="flex items-baseline justify-between">\r
                  <span class="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400"\r
                    >Risk Efficiency</span\r
                  >\r
                  <span\r
                    id="portfolioSharpe"\r
                    class="text-xl font-bold text-slate-700 dark:text-slate-200"\r
                    >-</span\r
                  >\r
                </div>\r
                <div class="mt-3 space-y-1 text-xs text-gray-600 dark:text-gray-400">\r
                  <div class="flex justify-between">\r
                    <span>Information Ratio</span>\r
                    <span\r
                      id="informationRatio"\r
                      class="font-semibold text-slate-700 dark:text-slate-200"\r
                      >-</span\r
                    >\r
                  </div>\r
                  <div class="flex justify-between">\r
                    <span>Tracking Error</span>\r
                    <span\r
                      id="trackingError"\r
                      class="font-semibold text-purple-600 dark:text-purple-400"\r
                      >-</span\r
                    >\r
                  </div>\r
                </div>\r
              </div>\r
            </div>\r
          </div>\r
        </div>\r
\r
        <!-- Asset Performance Table -->\r
        <div class="p-6 rounded-xl border card mb-6">\r
          <h3\r
            class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4"\r
          >\r
            Asset Performance Projections\r
          </h3>\r
          <div class="overflow-x-auto">\r
            <table\r
              class="min-w-full divide-y divide-gray-300 dark:divide-gray-600 modern-table"\r
            >\r
              <thead>\r
                <tr\r
                  class="text-xs font-semibold text-gray-700 dark:text-gray-100 uppercase tracking-wider"\r
                >\r
                  <th class="px-2 py-3 text-left">Asset</th>\r
                  <th class="px-2 py-3 text-right">1 Year</th>\r
                  <th class="px-2 py-3 text-right">5 Years</th>\r
                  <th class="px-2 py-3 text-right">10 Years</th>\r
                  <th class="px-2 py-3 text-right">15 Years</th>\r
                  <th class="px-2 py-3 text-right">20 Years</th>\r
                  <th class="px-2 py-3 text-right">30 Years</th>\r
                  <th class="px-2 py-3 text-right">35 Years</th>\r
                </tr>\r
              </thead>\r
              <tbody\r
                id="assetPerformanceTable"\r
                class="divide-y divide-gray-200 dark:divide-gray-700"\r
              >\r
                <!-- Rows will be populated by JS -->\r
              </tbody>\r
              <tfoot class="bg-gray-200 dark:bg-slate-700 font-bold text-sm">\r
                <tr>\r
                  <td class="px-2 py-3 text-left">TOTAL</td>\r
                  <td\r
                    id="total1Y"\r
                    class="px-2 py-3 text-right text-blue-600 dark:text-blue-400"\r
                  >\r
                    -\r
                  </td>\r
                  <td\r
                    id="total5Y"\r
                    class="px-2 py-3 text-right text-blue-600 dark:text-blue-400"\r
                  >\r
                    -\r
                  </td>\r
                  <td\r
                    id="total10Y"\r
                    class="px-2 py-3 text-right text-blue-600 dark:text-blue-400"\r
                  >\r
                    -\r
                  </td>\r
                  <td\r
                    id="total15Y"\r
                    class="px-2 py-3 text-right text-blue-600 dark:text-blue-400"\r
                  >\r
                    -\r
                  </td>\r
                  <td\r
                    id="total20Y"\r
                    class="px-2 py-3 text-right text-blue-600 dark:text-blue-400"\r
                  >\r
                    -\r
                  </td>\r
                  <td\r
                    id="total30Y"\r
                    class="px-2 py-3 text-right text-blue-600 dark:text-blue-400"\r
                  >\r
                    -\r
                  </td>\r
                  <td\r
                    id="total35Y"\r
                    class="px-2 py-3 text-right text-blue-600 dark:text-blue-400"\r
                  >\r
                    -\r
                  </td>\r
                </tr>\r
              </tfoot>\r
            </table>\r
          </div>\r
        </div>\r
\r
        <div class="text-center">\r
          <button\r
            id="refreshPerformanceBtn"\r
            class="bg-rose-600 text-white font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-500/70 focus:ring-offset-2 styled-button"\r
          >\r
            Refresh Performance\r
          </button>\r
        </div>\r
      </section>\r
\r
      <section id="marketHeatmap" class="section mb-12">\r
        <div class="section-header">\r
          <div class="section-header__icon">\r
            <svg\r
              class="w-8 h-8 text-sky-300"\r
              fill="none"\r
              stroke="currentColor"\r
              viewBox="0 0 24 24"\r
              xmlns="http://www.w3.org/2000/svg"\r
            >\r
              <path\r
                stroke-linecap="round"\r
                stroke-linejoin="round"\r
                stroke-width="2"\r
                d="M3 7h18M3 12h18M3 17h18"\r
              ></path>\r
            </svg>\r
          </div>\r
          <div>\r
            <h2 class="section-title">9. Sector Heatmap Array</h2>\r
            <p class="section-intro">\r
              Sweep battlefront sectors and global markets to spot hotspots before they impact your Gunpla supply lines.\r
            </p>\r
          </div>\r
        </div>\r
\r
        <div class="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">\r
          <aside\r
            class="card card--lifted rounded-3xl p-6 flex flex-col gap-6 bg-white/90 dark:bg-slate-950/90 border border-gray-100 dark:border-slate-800"\r
          >\r
            <div>\r
              <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">\r
                Map Filters\r
              </h3>\r
              <p class="text-sm text-gray-500 dark:text-gray-400">\r
                Toggle between preset universes to compare how sectors are behaving. Each view feeds the heatmap on the right.\r
              </p>\r
            </div>\r
\r
            <div id="heatmapFilters" class="flex flex-col gap-2">\r
              <button\r
                type="button"\r
                class="heatmap-filter-btn"\r
                data-filter="sp500"\r
              >\r
                S&P 500\r
              </button>\r
              <button\r
                type="button"\r
                class="heatmap-filter-btn"\r
                data-filter="dow30"\r
              >\r
                Dow Jones 30\r
              </button>\r
              <button\r
                type="button"\r
                class="heatmap-filter-btn"\r
                data-filter="nasdaq100"\r
              >\r
                Nasdaq 100\r
              </button>\r
              <button\r
                type="button"\r
                class="heatmap-filter-btn"\r
                data-filter="russell2000"\r
              >\r
                Russell 2000\r
              </button>\r
            </div>\r
\r
          </aside>\r
\r
          <div class="flex flex-col gap-6">\r
            <div\r
              class="card card--lifted relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/70 p-6 md:p-8 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 shadow-xl shadow-sky-400/5"\r
            >\r
              <div\r
                class="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-300/10 via-transparent to-sky-400/10 dark:from-sky-300/10 dark:via-transparent dark:to-sky-500/15"\r
              ></div>\r
\r
              <div class="relative flex flex-col gap-6">\r
              <div\r
                class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"\r
              >\r
                <div>\r
                  <h3\r
                    class="text-xl font-semibold text-gray-800 dark:text-gray-200"\r
                  >\r
                    Heatmap snapshot\r
                  </h3>\r
                  <p\r
                    id="heatmapSelectedLabel"\r
                    class="text-sm text-gray-600 dark:text-gray-400"\r
                  >\r
                    S&P 500 - 1-Day Change\r
                  </p>\r
                </div>\r
                <div\r
                  class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"\r
                >\r
                  <span class="font-semibold text-red-500">-5%</span>\r
                  <div class="heatmap-legend-bar"></div>\r
                  <span class="font-semibold text-sky-400">+5%</span>\r
                </div>\r
              </div>\r
\r
              <div class="relative">\r
                <div class="heatmap-widget-shell">  \r
                  <div\r
                    id="heatmapWidgetContainer"\r
                    class="tradingview-widget-container heatmap-widget-container"\r
                  ></div>\r
                </div>\r
                <div\r
                  id="heatmapLoading"\r
                  class="heatmap-loading-state hidden"\r
                >\r
                  Loading TradingView heatmap...\r
                </div>\r
                <div\r
                  id="heatmapError"\r
                  class="heatmap-error hidden"\r
                >\r
                  Unable to load the TradingView heatmap. Check your network connection and try again.\r
                </div>\r
              </div>\r
\r
              <div\r
                class="flex items-center justify-between flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400"\r
              >\r
                <span id="heatmapLastUpdated">Updated: --</span>\r
                <button\r
                  type="button"\r
                  id="heatmapReloadBtn"\r
                  class="inline-flex items-center gap-2 bg-sky-500 text-white font-semibold px-3 py-2 rounded-md shadow hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-400/60 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950"\r
                >\r
                  <svg\r
                    class="w-4 h-4"\r
                    fill="none"\r
                    stroke="currentColor"\r
                    viewBox="0 0 24 24"\r
                    xmlns="http://www.w3.org/2000/svg"\r
                  >\r
                    <path\r
                      stroke-linecap="round"\r
                      stroke-linejoin="round"\r
                      stroke-width="2"\r
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9M20 20v-5h-.581m-15.357-2a8.003 8.003 0 0015.357 2"\r
                    ></path>\r
                  </svg>\r
                  <span class="heatmap-reload-label">Reload TradingView heatmap</span>\r
                </button>\r
              </div>\r
\r
            </div>\r
\r
            <div class="grid gap-6 md:grid-cols-2">\r
              <section\r
                class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-5 shadow-sm shadow-sky-400/10"\r
                aria-labelledby="heatmapIntelTitle"\r
              >\r
                <div class="flex items-start justify-between gap-3">\r
                  <div>\r
                    <h4\r
                      id="heatmapIntelTitle"\r
                      class="text-lg font-semibold text-gray-800 dark:text-gray-200"\r
                    >\r
                      Sector Intel Briefing\r
                    </h4>\r
                    <p class="text-xs text-gray-500 dark:text-gray-400">\r
                      Tactical notes adapt to the selected universe and window.\r
                    </p>\r
                  </div>\r
                  <span\r
                    class="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-600 dark:text-sky-300"\r
                  >\r
                    Live\r
                  </span>\r
                </div>\r
                <ul\r
                  id="heatmapIntelList"\r
                  class="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300"\r
                ></ul>\r
                <p\r
                  id="heatmapIntelEmpty"\r
                  class="mt-4 text-sm text-gray-500 dark:text-gray-400"\r
                >\r
                  Select a sector universe or change the performance window to generate intel.\r
                </p>\r
              </section>\r
\r
              <section\r
                class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-5 shadow-sm shadow-sky-400/10"\r
                aria-labelledby="heatmapWatchlistTitle"\r
              >\r
                <div class="flex items-start justify-between gap-3">\r
                  <div>\r
                    <h4\r
                      id="heatmapWatchlistTitle"\r
                      class="text-lg font-semibold text-gray-800 dark:text-gray-200"\r
                    >\r
                      Tactical Watchlist\r
                    </h4>\r
                    <p class="text-xs text-gray-500 dark:text-gray-400">\r
                      Track priority tickers alongside the heatmap. Stored locally.\r
                    </p>\r
                  </div>\r
                </div>\r
                <form id="heatmapWatchlistForm" class="mt-4 flex flex-col gap-3 sm:flex-row">\r
                  <label class="sr-only" for="heatmapWatchlistInput">Add ticker</label>\r
                  <input\r
                    id="heatmapWatchlistInput"\r
                    type="text"\r
                    autocomplete="off"\r
                    class="flex-1 rounded-lg border border-slate-200 bg-white/70 px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300/40 dark:border-slate-700 dark:bg-slate-900/40 dark:text-gray-200"\r
                    placeholder="Enter ticker (e.g. NVDA)"\r
                    maxlength="10"\r
                  />\r
                  <button\r
                    id="heatmapWatchlistAddBtn"\r
                    type="submit"\r
                    class="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-400/70 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950"\r
                  >\r
                    <svg\r
                      class="h-4 w-4"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      viewBox="0 0 24 24"\r
                      xmlns="http://www.w3.org/2000/svg"\r
                    >\r
                      <path\r
                        stroke-linecap="round"\r
                        stroke-linejoin="round"\r
                        stroke-width="2"\r
                        d="M12 4v16m8-8H4"\r
                      ></path>\r
                    </svg>\r
                    Add\r
                  </button>\r
                </form>\r
                <p\r
                  id="heatmapWatchlistEmpty"\r
                  class="mt-4 text-sm text-gray-500 dark:text-gray-400"\r
                >\r
                  No tickers tracked yet. Add symbols to build a rapid response list.\r
                </p>\r
                <ul\r
                  id="heatmapWatchlist"\r
                  class="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300"\r
                ></ul>\r
                <p\r
                  id="heatmapWatchlistSummary"\r
                  class="mt-3 text-xs text-gray-500 dark:text-gray-400"\r
                ></p>\r
              </section>\r
            </div>\r
\r
          </div>\r
        </div>\r
      </section>\r
\r
      <section\r
        id="marketIndices"\r
        class="section mb-12"\r
        data-fmp-key="qPhDU6pPgXTmbdzSL7FxdxXUzQFELzW9"\r
      >\r
        <div class="section-header">\r
          <div class="section-header__icon">\r
            <svg\r
              class="w-8 h-8 text-sky-300"\r
              fill="none"\r
              stroke="currentColor"\r
              viewBox="0 0 24 24"\r
              xmlns="http://www.w3.org/2000/svg"\r
            >\r
              <path\r
                stroke-linecap="round"\r
                stroke-linejoin="round"\r
                stroke-width="2"\r
                d="M11 3h2a2 2 0 012 2v3h3a2 2 0 012 2v2a2 2 0 01-2 2h-3v3a2 2 0 01-2 2h-2a2 2 0 01-2-2v-3H6a2 2 0 01-2-2V10a2 2 0 012-2h3V5a2 2 0 012-2z"\r
              ></path>\r
            </svg>\r
          </div>\r
          <div>\r
            <h2 class="section-title">10. Federation Indices Feed</h2>\r
            <p class="section-intro">\r
              Ping Earth Federation markets for live signals and stage alerts directly into your cockpit.\r
            </p>\r
          </div>\r
        </div>\r
\r
        <div\r
          class="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/70 p-6 md:p-8 mb-6 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 shadow-xl shadow-sky-400/5"\r
        >\r
          <div\r
            class="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-300/10 via-transparent to-sky-400/10 dark:from-sky-300/10 dark:via-transparent dark:to-sky-500/15"\r
          ></div>\r
\r
          <div class="relative">\r
            <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">\r
              <div class="flex flex-col gap-6">\r
                <div\r
                  class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"\r
                >\r
                  <div class="space-y-4">\r
                    <div>\r
                      <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">\r
                        Real-time global benchmarks\r
                      </h3>\r
                      <p class="text-sm text-gray-600 dark:text-gray-400">\r
                        Track live pricing on major equity indices. Values refresh automatically every 60 seconds.\r
                      </p>\r
                    </div>\r
                    <div\r
                      id="indicesRegionFilters"\r
                      class="flex flex-wrap items-center gap-2"\r
                      role="tablist"\r
                      aria-label="Market theatre filter"\r
                    >\r
                      <button\r
                        type="button"\r
                        class="indices-filter-btn inline-flex items-center rounded-full border border-sky-500/30 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-sky-600 shadow-sm transition hover:border-sky-500 hover:text-sky-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/60 dark:bg-slate-900/40 dark:text-sky-200"\r
                        data-region="earth-sphere"\r
                        role="tab"\r
                        aria-selected="true"\r
                      >\r
                        US Benchmarks (S&P/Dow/NASDAQ/Russell)\r
                      </button>\r
                      <button\r
                        type="button"\r
                        class="indices-filter-btn inline-flex items-center rounded-full border border-sky-500/30 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-sky-600 shadow-sm transition hover:border-sky-500 hover:text-sky-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/60 dark:bg-slate-900/40 dark:text-sky-200"\r
                        data-region="outer-colonies"\r
                        role="tab"\r
                        aria-selected="false"\r
                      >\r
                        Global Hubs (FTSE/DAX/Nikkei)\r
                      </button>\r
                      <button\r
                        type="button"\r
                        class="indices-filter-btn inline-flex items-center rounded-full border border-sky-500/30 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-sky-600 shadow-sm transition hover:border-sky-500 hover:text-sky-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/60 dark:bg-slate-900/40 dark:text-sky-200"\r
                        data-region="neo-zeon"\r
                        role="tab"\r
                        aria-selected="false"\r
                      >\r
                        Frontier Watch (Hang Seng/Sensex)\r
                      </button>\r
                    </div>\r
                  </div>\r
                  <div class="flex items-center gap-4">\r
                    <button\r
                      type="button"\r
                      id="indicesAutoSyncToggle"\r
                      role="switch"\r
                      aria-checked="true"\r
                      class="relative flex items-center gap-3 rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-sky-600 transition hover:border-sky-500 hover:bg-sky-500/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/60 dark:border-sky-300/30 dark:bg-sky-400/10 dark:text-sky-200"\r
                    >\r
                      <span class="auto-sync-label">Auto-sync</span>\r
                      <span\r
                        class="inline-flex h-5 w-10 items-center rounded-full bg-slate-200/70 px-1 transition dark:bg-slate-700/70"\r
                      >\r
                        <span\r
                          class="toggle-indicator inline-block h-4 w-4 rounded-full bg-sky-500 shadow transition-transform"\r
                        ></span>\r
                      </span>\r
                    </button>\r
                    <div class="flex items-center gap-3">\r
                      <button\r
                        id="refreshIndicesBtn"\r
                        class="bg-sky-500 text-white font-semibold py-2 px-4 rounded-md shadow-lg hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-400/70 focus:ring-offset-2"\r
                      >\r
                        Refresh Now\r
                      </button>\r
                      <span\r
                        id="indicesLastUpdated"\r
                        class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400"\r
                      >\r
                        Updated: --\r
                      </span>\r
                    </div>\r
                  </div>\r
                </div>\r
\r
                <div\r
                  id="marketIndicesGrid"\r
                  class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"\r
                >\r
                  <!-- Live cards populated by JS -->\r
                </div>\r
\r
                <div\r
                  id="marketIndicesError"\r
                  class="hidden mt-2 p-4 rounded-xl border border-red-200 bg-red-50 text-red-600 dark:border-red-900/60 dark:bg-red-900/20 dark:text-red-200"\r
                >\r
                  Unable to load market data right now. Please try again shortly.\r
                </div>\r
\r
                <div\r
                  id="marketIndicesFallback"\r
                  class="hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-950/90 p-6 shadow-xl backdrop-blur"\r
                >\r
                  <h3\r
                    class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2"\r
                  >\r
                    <svg\r
                      class="w-5 h-5 text-sky-400"\r
                      fill="none"\r
                      stroke="currentColor"\r
                      viewBox="0 0 24 24"\r
                      xmlns="http://www.w3.org/2000/svg"\r
                    >\r
                      <path\r
                        stroke-linecap="round"\r
                        stroke-linejoin="round"\r
                        stroke-width="2"\r
                        d="M9 12l2 2 4-4M7.5 4.21l.97-.242a2 2 0 011.554.3l.757.535a2 2 0 002.222 0l.758-.535a2 2 0 011.553-.3l.97.242a2 2 0 011.43 1.43l.241.97a2 2 0 01-.3 1.554l-.535.757a2 2 0 000 2.222l.535.758a2 2 0 01.3 1.553l-.242.97a2 2 0 01-1.43 1.43l-.97.241a2 2 0 01-1.553-.3l-.758-.535a2 2 0 00-2.222 0l-.757.535a2 2 0 01-1.554.3l-.97-.242a2 2 0 01-1.43-1.43l-.241-.97a2 2 0 01.3-1.553l.535-.758a2 2 0 000-2.222l-.535-.757a2 2 0 01-.3-1.554l.242-.97a2 2 0 011.43-1.43z"\r
                      ></path>\r
                    </svg>\r
                    Live view provided by TradingView\r
                  </h3>\r
                  <div class="tradingview-widget-container">\r
                    <div\r
                      id="marketIndicesWidget"\r
                      class="overflow-hidden rounded-xl border border-gray-200/80 dark:border-slate-800/70"\r
                    ></div>\r
                    <div class="tradingview-widget-copyright text-xs text-gray-400">\r
                      <a\r
                        href="https://www.tradingview.com/markets/indices/quotes-major/"\r
                        rel="noopener"\r
                        target="_blank"\r
                        class="hover:underline"\r
                      >\r
                        Quotes by TradingView\r
                      </a>\r
                    </div>\r
                  </div>\r
                </div>\r
              </div>\r
\r
              <aside class="flex flex-col gap-6">\r
                <article\r
                  id="marketIndicesInsights"\r
                  class="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-lg dark:border-slate-800/70 dark:bg-slate-950/80"\r
                >\r
                  <header class="mb-4">\r
                    <p class="text-xs font-semibold uppercase tracking-wide text-sky-500 dark:text-sky-300">\r
                      Tactical Metrics\r
                    </p>\r
                    <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-100">\r
                      Mission readiness snapshot\r
                    </h4>\r
                    <p class="text-sm text-gray-600 dark:text-gray-400">\r
                      Compare live deltas against 30-day drift and key thresholds.\r
                    </p>\r
                  </header>\r
                  <dl\r
                    id="marketIndicesStats"\r
                    class="space-y-4 text-sm text-gray-700 dark:text-gray-300"\r
                  >\r
                    <div class="flex items-center justify-between gap-3">\r
                      <dt class="font-medium text-gray-500 dark:text-gray-400">\r
                        Volatility (30d stdev)\r
                      </dt>\r
                      <dd class="font-semibold text-gray-900 dark:text-gray-100" data-stat="volatility">\r
                        --\r
                      </dd>\r
                    </div>\r
                    <div class="flex items-center justify-between gap-3">\r
                      <dt class="font-medium text-gray-500 dark:text-gray-400">\r
                        Momentum Score\r
                      </dt>\r
                      <dd class="font-semibold text-gray-900 dark:text-gray-100" data-stat="momentum">\r
                        --\r
                      </dd>\r
                    </div>\r
                    <div class="flex items-center justify-between gap-3">\r
                      <dt class="font-medium text-gray-500 dark:text-gray-400">\r
                        52w Range Utilization\r
                      </dt>\r
                      <dd class="font-semibold text-gray-900 dark:text-gray-100" data-stat="range">\r
                        --\r
                      </dd>\r
                    </div>\r
                    <div class="flex items-center justify-between gap-3">\r
                      <dt class="font-medium text-gray-500 dark:text-gray-400">\r
                        Cross-Index Correlation\r
                      </dt>\r
                      <dd class="font-semibold text-gray-900 dark:text-gray-100" data-stat="correlation">\r
                        --\r
                      </dd>\r
                    </div>\r
                  </dl>\r
                </article>\r
\r
              </aside>\r
            </div>\r
          </div>\r
        </div>\r
      </section>\r
\r
      <section id="fearGreed" class="section mb-12">\r
        <div class="section-header">\r
          <div class="section-header__icon">\r
            <svg\r
              class="w-8 h-8 text-rose-400"\r
              fill="none"\r
              stroke="currentColor"\r
              viewBox="0 0 24 24"\r
              xmlns="http://www.w3.org/2000/svg"\r
            >\r
              <path\r
                stroke-linecap="round"\r
                stroke-linejoin="round"\r
                stroke-width="2"\r
                d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.95-6.95l-2.12 2.12M9.17 14.83L7.05 16.95m12.02 0l-2.12-2.12M9.17 9.17L7.05 7.05"\r
              ></path>\r
            </svg>\r
          </div>\r
          <div>\r
            <h2 class="section-title">11. Psycho-Frame Sentiment Monitor</h2>\r
            <p class="section-intro">\r
              Gauge collective pilot morale with a Psycho-Frame index, historical checkpoints, and context for redeploying your Gunpla assets.\r
            </p>\r
          </div>\r
        </div>\r
\r
        <div class="sentiment-hud" id="sentimentHud">\r
          <div class="sentiment-hud__backdrop" aria-hidden="true"></div>\r
          <div class="sentiment-hud__scanlines" aria-hidden="true"></div>\r
\r
          <header class="sentiment-hud__header">\r
            <div>\r
              <p class="sentiment-hud__eyebrow">Psycho-Frame Telemetry</p>\r
              <h3 class="sentiment-hud__title">Sentiment Nexus Console</h3>\r
            </div>\r
            <div class="sentiment-hud__actions">\r
              <span id="fearGreedError" class="sentiment-hud__error hidden">\r
                Live feed unstable â€“ pulling from cache\r
              </span>\r
              <button\r
                id="fearGreedRefreshBtn"\r
                type="button"\r
                class="sentiment-refresh-btn"\r
              >\r
                <svg\r
                  class="w-4 h-4"\r
                  fill="none"\r
                  stroke="currentColor"\r
                  viewBox="0 0 24 24"\r
                  xmlns="http://www.w3.org/2000/svg"\r
                >\r
                  <path\r
                    stroke-linecap="round"\r
                    stroke-linejoin="round"\r
                    stroke-width="2"\r
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"\r
                  ></path>\r
                </svg>\r
                <span class="fear-greed-refresh-label">Refresh now</span>\r
              </button>\r
            </div>\r
          </header>\r
\r
          <div class="sentiment-hud__grid">\r
            <article class="sentiment-module sentiment-module--core">\r
              <div class="sentiment-core">\r
                <div class="sentiment-core__gauge">\r
                  <div class="sentiment-module__titlebar">\r
                    <span class="sentiment-module__eyebrow">Core Index</span>\r
                    <h4 class="sentiment-module__title">Psycho-Frame Gauge</h4>\r
                  </div>\r
                  <div class="sentiment-core__gauge-inner">\r
                    <div class="fear-greed-meter">\r
                      <div class="fear-greed-meter__canvas">\r
                        <canvas id="fearGreedGauge"></canvas>\r
                        <div id="fearGreedNeedle" class="fear-greed-meter__needle"></div>\r
                        <div class="fear-greed-meter__pivot"></div>\r
                        <div class="fear-greed-meter__value">\r
                          <span id="fearGreedValue" class="fear-greed-meter__score">--</span>\r
                          <span id="fearGreedLabel" class="fear-greed-meter__status">Loading...</span>\r
                        </div>\r
                      </div>\r
                    </div>\r
                    <div class="sentiment-core__gauge-meta">\r
                      <div class="sentiment-core__badges">\r
                        <span id="fearGreedStatusBadge" class="fear-greed-badge">--</span>\r
                        <span id="fearGreedChange" class="fear-greed-change">\r
                          Awaiting data\r
                        </span>\r
                        <p\r
                          id="fearGreedComparison"\r
                          class="mt-2 text-xs text-gray-500 dark:text-gray-400"\r
                        >\r
                          --\r
                        </p>\r
                      </div>\r
                      <p class="sentiment-core__description">\r
                        Composite morale index blending momentum, breadth, volatility, and safety flows.\r
                        Deploy alongside battle plans to sense risk-on or risk-off pivots.\r
                      </p>\r
                      <dl class="sentiment-core__stats">\r
                        <div>\r
                          <dt>Updated</dt>\r
                          <dd id="fearGreedUpdated">--</dd>\r
                        </div>\r
                        <div>\r
                          <dt>Next refresh</dt>\r
                          <dd id="fearGreedCountdown">--</dd>\r
                        </div>\r
                        <div>\r
                          <dt>30-day mean</dt>\r
                          <dd id="fearGreedAverage">--</dd>\r
                        </div>\r
                      </dl>\r
                    </div>\r
                  </div>\r
                </div>\r
                <div class="sentiment-core__radar">\r
                  <div class="sentiment-module__titlebar">\r
                    <span class="sentiment-module__eyebrow">Source Sync</span>\r
                    <h4 class="sentiment-module__title">Composite Sentiment Mesh</h4>\r
                  </div>\r
                  <div class="sentiment-radar">\r
                    <canvas id="sentimentRadarChart"></canvas>\r
                  </div>\r
                  <ul id="sentimentSourceList" class="sentiment-source-list">\r
                    <li class="sentiment-source-list__item">\r
                      <span class="sentiment-source-list__label">Market breadth</span>\r
                      <span class="sentiment-source-list__value">--</span>\r
                    </li>\r
                    <li class="sentiment-source-list__item">\r
                      <span class="sentiment-source-list__label">Social pulse</span>\r
                      <span class="sentiment-source-list__value">--</span>\r
                    </li>\r
                    <li class="sentiment-source-list__item">\r
                      <span class="sentiment-source-list__label">Fund flows</span>\r
                      <span class="sentiment-source-list__value">--</span>\r
                    </li>\r
                    <li class="sentiment-source-list__item">\r
                      <span class="sentiment-source-list__label">Options skew</span>\r
                      <span class="sentiment-source-list__value">--</span>\r
                    </li>\r
                  </ul>\r
                </div>\r
              </div>\r
              <div class="sentiment-history">\r
                <div class="sentiment-module__titlebar">\r
                  <span class="sentiment-module__eyebrow">Checkpoints</span>\r
                  <h4 class="sentiment-module__title">Temporal Anchors</h4>\r
                </div>\r
                <ul id="fearGreedHistory" class="sentiment-history__list">\r
                  <li class="sentiment-history__item">\r
                    <p class="sentiment-history__label">Yesterday</p>\r
                    <p class="sentiment-history__meta">Awaiting data</p>\r
                    <span class="sentiment-history__value">--</span>\r
                  </li>\r
                  <li class="sentiment-history__item">\r
                    <p class="sentiment-history__label">Last week</p>\r
                    <p class="sentiment-history__meta">Awaiting data</p>\r
                    <span class="sentiment-history__value">--</span>\r
                  </li>\r
                  <li class="sentiment-history__item">\r
                    <p class="sentiment-history__label">Last month</p>\r
                    <p class="sentiment-history__meta">Awaiting data</p>\r
                    <span class="sentiment-history__value">--</span>\r
                  </li>\r
                </ul>\r
              </div>\r
            </article>\r
\r
            <article class="sentiment-module sentiment-module--forecast">\r
              <div class="sentiment-module__titlebar">\r
                <span class="sentiment-module__eyebrow">Sentiment Forecast</span>\r
                <h4 class="sentiment-module__title">7-Day Psycho-Frame Projection</h4>\r
              </div>\r
              <div class="sentiment-forecast-chart">\r
                <canvas id="sentimentForecastChart"></canvas>\r
              </div>\r
              <dl class="sentiment-forecast-stats" id="sentimentForecastStats">\r
                <div>\r
                  <dt>Trend vector</dt>\r
                  <dd id="forecastTrendLabel">--</dd>\r
                </div>\r
                <div>\r
                  <dt>Expected range</dt>\r
                  <dd id="forecastRangeLabel">--</dd>\r
                </div>\r
                <div>\r
                  <dt>Confidence band</dt>\r
                  <dd id="forecastConfidenceLabel">--</dd>\r
                </div>\r
              </dl>\r
            </article>\r
            <article class="sentiment-module sentiment-module--alerts">\r
              <div class="sentiment-module__titlebar">\r
                <span class="sentiment-module__eyebrow">Psycho-Frame Tripwires</span>\r
                <h4 class="sentiment-module__title">Custom Alert Programming</h4>\r
              </div>\r
              <div class="sentiment-alerts-grid">\r
                <div class="sentiment-alerts-slider">\r
                  <label for="alertLowerInput">Lower threshold</label>\r
                  <input id="alertLowerInput" type="range" min="0" max="100" step="1" />\r
                  <span id="alertLowerLabel" class="sentiment-alerts-value">--</span>\r
                </div>\r
                <div class="sentiment-alerts-slider">\r
                  <label for="alertUpperInput">Upper threshold</label>\r
                  <input id="alertUpperInput" type="range" min="0" max="100" step="1" />\r
                  <span id="alertUpperLabel" class="sentiment-alerts-value">--</span>\r
                </div>\r
                <div class="sentiment-alerts-options">\r
                  <label class="sentiment-toggle">\r
                    <input type="checkbox" id="alertEnableToggle" />\r
                    <span>Activate alerting protocol</span>\r
                  </label>\r
                  <label class="sentiment-toggle">\r
                    <input type="checkbox" id="alertSoundToggle" />\r
                    <span>Arm audio ping</span>\r
                  </label>\r
                  <label class="sentiment-toggle">\r
                    <input type="checkbox" id="alertThemeToggle" />\r
                    <span>Flash HUD colour on trigger</span>\r
                  </label>\r
                </div>\r
                <div class="sentiment-alerts-status">\r
                  <p class="sentiment-alerts-summary">\r
                    Status: <span id="sentimentAlertStatus">Standby</span>\r
                  </p>\r
                  <p class="sentiment-alerts-summary">\r
                    Current reading: <span id="sentimentAlertCurrent">--</span>\r
                  </p>\r
                </div>\r
              </div>\r
            </article>\r
          </div>\r
        </div>\r
      </section>\r
\r
      <footer\r
        class="text-center mt-12 pt-6 border-t border-gray-300 dark:border-gray-700"\r
      >\r
        <p class="text-sm text-gray-500 dark:text-gray-500">\r
          &copy; 2025. Side 7 Dockyard interface built for Tan Tran's Gunpla collection command ops.\r
        </p>\r
      </footer>\r
        </div>\r
      </main>\r
    </div>\r
\r
    <script src="config.js" defer><\/script>\r
    <script src="js/data.js" defer><\/script>\r
    <script src="js/utils.js" defer><\/script>\r
    <script src="js/charts.js" defer><\/script>\r
    <script src="js/deposit-core.js" defer><\/script>\r
    <script src="js/deposit-rebalance-core.js" defer><\/script>\r
    <script src="js/rebalance.js" defer><\/script>\r
    <script src="js/simulation.js" defer><\/script>\r
    <script src="js/tradingview.js" defer><\/script>\r
    <script src="js/tradingview-loader.js" defer><\/script>\r
    <script src="js/stockDetails.js" defer><\/script>\r
    <script src="js/theme.js" defer><\/script>\r
    <script src="js/analytics.js" defer><\/script>\r
    <script src="js/heatmap.js" defer><\/script>\r
    <script src="js/fear-greed.js" defer><\/script>\r
    <script src="js/market-indices.js" defer><\/script>\r
    <script src="js/performance.js" defer><\/script>\r
    <script src="js/live-prices.js" defer><\/script>\r
    <script src="js/live-portfolio-chart.js" defer><\/script>
    <script src="js/logistics-ops.js" defer><\/script>\r
    <script src="js/app.js" defer><\/script>\r
    <button\r
      type="button"\r
      id="scrollToTopBtn"\r
      class="scroll-to-top-btn"\r
      aria-label="Scroll to top"\r
    >\r
      <svg\r
        class="w-5 h-5"\r
        fill="none"\r
        stroke="currentColor"\r
        viewBox="0 0 24 24"\r
        xmlns="http://www.w3.org/2000/svg"\r
        width="20"\r
        height="20"\r
      >\r
        <path\r
          stroke-linecap="round"\r
          stroke-linejoin="round"\r
          stroke-width="2"\r
          d="M5 11l7-7m0 0l7 7m-7-7v18"\r
        ></path>\r
      </svg>\r
    </button>\r
  </body>\r
</html>\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
\r
`,sw="transition-colors duration-300",lw=`
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <div id="worldStockNewsMount" class="xl:col-span-2"></div>
        </div>
`,ow='<section id="advanced-tracker"',cw='<div class="grid grid-cols-1 gap-6 mb-6">',dw=`<div
          class="mb-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"`;function uw(t){return t.replace(/\r\n/g,`
`)}function fw(t){const e=t.match(/<body([^>]*)>/i);return e?e[1]:""}function hw(t){const e=t.match(/<body[^>]*>([\s\S]*?)<\/body>/i);return e?uw(e[1]):""}function pw(t){return t.replace(/\s*<script\b[^>]*><\/script>/gi,"")}function gw(t){const e=t.indexOf(ow);if(e===-1)return t;const n=t.indexOf(cw,e),a=t.indexOf(dw,n);return n===-1||a===-1?t:`${t.slice(0,n)}${lw}${t.slice(a)}`}const mw=fw(jb),sc=mw.match(/class="([^"]+)"/i),bw=(sc==null?void 0:sc[1])||sw,yw=hw(jb),vw=gw(pw(yw)).trim();function xw(){return jt.useLayoutEffect(()=>{document.body.className=bw;const t=document.getElementById("worldStockNewsMount"),e=t?Hm.createRoot(t):null;return e==null||e.render(O.jsx(rw,{})),()=>{e==null||e.unmount()}},[]),O.jsx("div",{style:{display:"contents"},dangerouslySetInnerHTML:{__html:vw}})}window.React=ry;window.Chart=Ie;const _w=document.getElementById("root"),kw=Hm.createRoot(_w);W0.flushSync(()=>{kw.render(O.jsx(xw,{}))});
