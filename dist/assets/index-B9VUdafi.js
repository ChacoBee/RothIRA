var fx=Object.defineProperty;var hx=(e,t,n)=>t in e?fx(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var E=(e,t,n)=>hx(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function px(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var lp={exports:{}},Ql={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gx=Symbol.for("react.transitional.element"),mx=Symbol.for("react.fragment");function op(e,t,n){var a=null;if(n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),"key"in t){n={};for(var r in t)r!=="key"&&(n[r]=t[r])}else n=t;return t=n.ref,{$$typeof:gx,type:e,key:a,ref:t!==void 0?t:null,props:n}}Ql.Fragment=mx;Ql.jsx=op;Ql.jsxs=op;lp.exports=Ql;var _=lp.exports,cp={exports:{}},B={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ld=Symbol.for("react.transitional.element"),bx=Symbol.for("react.portal"),xx=Symbol.for("react.fragment"),yx=Symbol.for("react.strict_mode"),vx=Symbol.for("react.profiler"),_x=Symbol.for("react.consumer"),kx=Symbol.for("react.context"),Sx=Symbol.for("react.forward_ref"),wx=Symbol.for("react.suspense"),Mx=Symbol.for("react.memo"),dp=Symbol.for("react.lazy"),Ax=Symbol.for("react.activity"),rf=Symbol.iterator;function Tx(e){return e===null||typeof e!="object"?null:(e=rf&&e[rf]||e["@@iterator"],typeof e=="function"?e:null)}var up={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},fp=Object.assign,hp={};function Ar(e,t,n){this.props=e,this.context=t,this.refs=hp,this.updater=n||up}Ar.prototype.isReactComponent={};Ar.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ar.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function pp(){}pp.prototype=Ar.prototype;function Bd(e,t,n){this.props=e,this.context=t,this.refs=hp,this.updater=n||up}var Hd=Bd.prototype=new pp;Hd.constructor=Bd;fp(Hd,Ar.prototype);Hd.isPureReactComponent=!0;var sf=Array.isArray;function kc(){}var dt={H:null,A:null,T:null,S:null},gp=Object.prototype.hasOwnProperty;function Vd(e,t,n){var a=n.ref;return{$$typeof:Ld,type:e,key:t,ref:a!==void 0?a:null,props:n}}function Dx(e,t){return Vd(e.type,t,e.props)}function Ud(e){return typeof e=="object"&&e!==null&&e.$$typeof===Ld}function Cx(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var lf=/\/+/g;function vo(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Cx(""+e.key):t.toString(36)}function Ex(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(kc,kc):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Ya(e,t,n,a,r){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(i){case"bigint":case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case Ld:case bx:s=!0;break;case dp:return s=e._init,Ya(s(e._payload),t,n,a,r)}}if(s)return r=r(e),s=a===""?"."+vo(e,0):a,sf(r)?(n="",s!=null&&(n=s.replace(lf,"$&/")+"/"),Ya(r,t,n,"",function(c){return c})):r!=null&&(Ud(r)&&(r=Dx(r,n+(r.key==null||e&&e.key===r.key?"":(""+r.key).replace(lf,"$&/")+"/")+s)),t.push(r)),1;s=0;var l=a===""?".":a+":";if(sf(e))for(var o=0;o<e.length;o++)a=e[o],i=l+vo(a,o),s+=Ya(a,t,n,i,r);else if(o=Tx(e),typeof o=="function")for(e=o.call(e),o=0;!(a=e.next()).done;)a=a.value,i=l+vo(a,o++),s+=Ya(a,t,n,i,r);else if(i==="object"){if(typeof e.then=="function")return Ya(Ex(e),t,n,a,r);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return s}function ls(e,t,n){if(e==null)return e;var a=[],r=0;return Ya(e,a,"","",function(i){return t.call(n,i,r++)}),a}function Ox(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var of=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},zx={map:ls,forEach:function(e,t,n){ls(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ls(e,function(){t++}),t},toArray:function(e){return ls(e,function(t){return t})||[]},only:function(e){if(!Ud(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};B.Activity=Ax;B.Children=zx;B.Component=Ar;B.Fragment=xx;B.Profiler=vx;B.PureComponent=Bd;B.StrictMode=yx;B.Suspense=wx;B.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=dt;B.__COMPILER_RUNTIME={__proto__:null,c:function(e){return dt.H.useMemoCache(e)}};B.cache=function(e){return function(){return e.apply(null,arguments)}};B.cacheSignal=function(){return null};B.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var a=fp({},e.props),r=e.key;if(t!=null)for(i in t.key!==void 0&&(r=""+t.key),t)!gp.call(t,i)||i==="key"||i==="__self"||i==="__source"||i==="ref"&&t.ref===void 0||(a[i]=t[i]);var i=arguments.length-2;if(i===1)a.children=n;else if(1<i){for(var s=Array(i),l=0;l<i;l++)s[l]=arguments[l+2];a.children=s}return Vd(e.type,r,a)};B.createContext=function(e){return e={$$typeof:kx,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:_x,_context:e},e};B.createElement=function(e,t,n){var a,r={},i=null;if(t!=null)for(a in t.key!==void 0&&(i=""+t.key),t)gp.call(t,a)&&a!=="key"&&a!=="__self"&&a!=="__source"&&(r[a]=t[a]);var s=arguments.length-2;if(s===1)r.children=n;else if(1<s){for(var l=Array(s),o=0;o<s;o++)l[o]=arguments[o+2];r.children=l}if(e&&e.defaultProps)for(a in s=e.defaultProps,s)r[a]===void 0&&(r[a]=s[a]);return Vd(e,i,r)};B.createRef=function(){return{current:null}};B.forwardRef=function(e){return{$$typeof:Sx,render:e}};B.isValidElement=Ud;B.lazy=function(e){return{$$typeof:dp,_payload:{_status:-1,_result:e},_init:Ox}};B.memo=function(e,t){return{$$typeof:Mx,type:e,compare:t===void 0?null:t}};B.startTransition=function(e){var t=dt.T,n={};dt.T=n;try{var a=e(),r=dt.S;r!==null&&r(n,a),typeof a=="object"&&a!==null&&typeof a.then=="function"&&a.then(kc,of)}catch(i){of(i)}finally{t!==null&&n.types!==null&&(t.types=n.types),dt.T=t}};B.unstable_useCacheRefresh=function(){return dt.H.useCacheRefresh()};B.use=function(e){return dt.H.use(e)};B.useActionState=function(e,t,n){return dt.H.useActionState(e,t,n)};B.useCallback=function(e,t){return dt.H.useCallback(e,t)};B.useContext=function(e){return dt.H.useContext(e)};B.useDebugValue=function(){};B.useDeferredValue=function(e,t){return dt.H.useDeferredValue(e,t)};B.useEffect=function(e,t){return dt.H.useEffect(e,t)};B.useEffectEvent=function(e){return dt.H.useEffectEvent(e)};B.useId=function(){return dt.H.useId()};B.useImperativeHandle=function(e,t,n){return dt.H.useImperativeHandle(e,t,n)};B.useInsertionEffect=function(e,t){return dt.H.useInsertionEffect(e,t)};B.useLayoutEffect=function(e,t){return dt.H.useLayoutEffect(e,t)};B.useMemo=function(e,t){return dt.H.useMemo(e,t)};B.useOptimistic=function(e,t){return dt.H.useOptimistic(e,t)};B.useReducer=function(e,t,n){return dt.H.useReducer(e,t,n)};B.useRef=function(e){return dt.H.useRef(e)};B.useState=function(e){return dt.H.useState(e)};B.useSyncExternalStore=function(e,t,n){return dt.H.useSyncExternalStore(e,t,n)};B.useTransition=function(){return dt.H.useTransition()};B.version="19.2.5";cp.exports=B;var K=cp.exports;const Nx=px(K);var mp={exports:{}},Kl={},bp={exports:{}},xp={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(D,z){var j=D.length;D.push(z);t:for(;0<j;){var U=j-1>>>1,lt=D[U];if(0<r(lt,z))D[U]=z,D[j]=lt,j=U;else break t}}function n(D){return D.length===0?null:D[0]}function a(D){if(D.length===0)return null;var z=D[0],j=D.pop();if(j!==z){D[0]=j;t:for(var U=0,lt=D.length,Ge=lt>>>1;U<Ge;){var Ae=2*(U+1)-1,Fe=D[Ae],Ft=Ae+1,ze=D[Ft];if(0>r(Fe,j))Ft<lt&&0>r(ze,Fe)?(D[U]=ze,D[Ft]=j,U=Ft):(D[U]=Fe,D[Ae]=j,U=Ae);else if(Ft<lt&&0>r(ze,j))D[U]=ze,D[Ft]=j,U=Ft;else break t}}return z}function r(D,z){var j=D.sortIndex-z.sortIndex;return j!==0?j:D.id-z.id}if(e.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var s=Date,l=s.now();e.unstable_now=function(){return s.now()-l}}var o=[],c=[],d=1,u=null,h=3,f=!1,m=!1,b=!1,y=!1,p=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,x=typeof setImmediate<"u"?setImmediate:null;function v(D){for(var z=n(c);z!==null;){if(z.callback===null)a(c);else if(z.startTime<=D)a(c),z.sortIndex=z.expirationTime,t(o,z);else break;z=n(c)}}function k(D){if(b=!1,v(D),!m)if(n(o)!==null)m=!0,S||(S=!0,N());else{var z=n(c);z!==null&&Q(k,z.startTime-D)}}var S=!1,w=-1,M=5,T=-1;function C(){return y?!0:!(e.unstable_now()-T<M)}function O(){if(y=!1,S){var D=e.unstable_now();T=D;var z=!0;try{t:{m=!1,b&&(b=!1,g(w),w=-1),f=!0;var j=h;try{e:{for(v(D),u=n(o);u!==null&&!(u.expirationTime>D&&C());){var U=u.callback;if(typeof U=="function"){u.callback=null,h=u.priorityLevel;var lt=U(u.expirationTime<=D);if(D=e.unstable_now(),typeof lt=="function"){u.callback=lt,v(D),z=!0;break e}u===n(o)&&a(o),v(D)}else a(o);u=n(o)}if(u!==null)z=!0;else{var Ge=n(c);Ge!==null&&Q(k,Ge.startTime-D),z=!1}}break t}finally{u=null,h=j,f=!1}z=void 0}}finally{z?N():S=!1}}}var N;if(typeof x=="function")N=function(){x(O)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,H=J.port2;J.port1.onmessage=O,N=function(){H.postMessage(null)}}else N=function(){p(O,0)};function Q(D,z){w=p(function(){D(e.unstable_now())},z)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(D){D.callback=null},e.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<D?Math.floor(1e3/D):5},e.unstable_getCurrentPriorityLevel=function(){return h},e.unstable_next=function(D){switch(h){case 1:case 2:case 3:var z=3;break;default:z=h}var j=h;h=z;try{return D()}finally{h=j}},e.unstable_requestPaint=function(){y=!0},e.unstable_runWithPriority=function(D,z){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var j=h;h=D;try{return z()}finally{h=j}},e.unstable_scheduleCallback=function(D,z,j){var U=e.unstable_now();switch(typeof j=="object"&&j!==null?(j=j.delay,j=typeof j=="number"&&0<j?U+j:U):j=U,D){case 1:var lt=-1;break;case 2:lt=250;break;case 5:lt=1073741823;break;case 4:lt=1e4;break;default:lt=5e3}return lt=j+lt,D={id:d++,callback:z,priorityLevel:D,startTime:j,expirationTime:lt,sortIndex:-1},j>U?(D.sortIndex=j,t(c,D),n(o)===null&&D===n(c)&&(b?(g(w),w=-1):b=!0,Q(k,j-U))):(D.sortIndex=lt,t(o,D),m||f||(m=!0,S||(S=!0,N()))),D},e.unstable_shouldYield=C,e.unstable_wrapCallback=function(D){var z=h;return function(){var j=h;h=z;try{return D.apply(this,arguments)}finally{h=j}}}})(xp);bp.exports=xp;var jx=bp.exports,yp={exports:{}},Qt={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Rx=K;function vp(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function vn(){}var Pt={d:{f:vn,r:function(){throw Error(vp(522))},D:vn,C:vn,L:vn,m:vn,X:vn,S:vn,M:vn},p:0,findDOMNode:null},Lx=Symbol.for("react.portal");function Bx(e,t,n){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Lx,key:a==null?null:""+a,children:e,containerInfo:t,implementation:n}}var ri=Rx.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Zl(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}Qt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Pt;Qt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(vp(299));return Bx(e,t,null,n)};Qt.flushSync=function(e){var t=ri.T,n=Pt.p;try{if(ri.T=null,Pt.p=2,e)return e()}finally{ri.T=t,Pt.p=n,Pt.d.f()}};Qt.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,Pt.d.C(e,t))};Qt.prefetchDNS=function(e){typeof e=="string"&&Pt.d.D(e)};Qt.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,a=Zl(n,t.crossOrigin),r=typeof t.integrity=="string"?t.integrity:void 0,i=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?Pt.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:a,integrity:r,fetchPriority:i}):n==="script"&&Pt.d.X(e,{crossOrigin:a,integrity:r,fetchPriority:i,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};Qt.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=Zl(t.as,t.crossOrigin);Pt.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&Pt.d.M(e)};Qt.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,a=Zl(n,t.crossOrigin);Pt.d.L(e,n,{crossOrigin:a,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};Qt.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=Zl(t.as,t.crossOrigin);Pt.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else Pt.d.m(e)};Qt.requestFormReset=function(e){Pt.d.r(e)};Qt.unstable_batchedUpdates=function(e,t){return e(t)};Qt.useFormState=function(e,t,n){return ri.H.useFormState(e,t,n)};Qt.useFormStatus=function(){return ri.H.useHostTransitionStatus()};Qt.version="19.2.5";function _p(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_p)}catch(e){console.error(e)}}_p(),yp.exports=Qt;var kp=yp.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ct=jx,Sp=K,Hx=kp;function A(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function wp(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Qi(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Mp(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Ap(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function cf(e){if(Qi(e)!==e)throw Error(A(188))}function Vx(e){var t=e.alternate;if(!t){if(t=Qi(e),t===null)throw Error(A(188));return t!==e?null:e}for(var n=e,a=t;;){var r=n.return;if(r===null)break;var i=r.alternate;if(i===null){if(a=r.return,a!==null){n=a;continue}break}if(r.child===i.child){for(i=r.child;i;){if(i===n)return cf(r),e;if(i===a)return cf(r),t;i=i.sibling}throw Error(A(188))}if(n.return!==a.return)n=r,a=i;else{for(var s=!1,l=r.child;l;){if(l===n){s=!0,n=r,a=i;break}if(l===a){s=!0,a=r,n=i;break}l=l.sibling}if(!s){for(l=i.child;l;){if(l===n){s=!0,n=i,a=r;break}if(l===a){s=!0,a=i,n=r;break}l=l.sibling}if(!s)throw Error(A(189))}}if(n.alternate!==a)throw Error(A(190))}if(n.tag!==3)throw Error(A(188));return n.stateNode.current===n?e:t}function Tp(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Tp(e),t!==null)return t;e=e.sibling}return null}var ft=Object.assign,Ux=Symbol.for("react.element"),os=Symbol.for("react.transitional.element"),Qr=Symbol.for("react.portal"),qa=Symbol.for("react.fragment"),Dp=Symbol.for("react.strict_mode"),Sc=Symbol.for("react.profiler"),Cp=Symbol.for("react.consumer"),an=Symbol.for("react.context"),Yd=Symbol.for("react.forward_ref"),wc=Symbol.for("react.suspense"),Mc=Symbol.for("react.suspense_list"),Gd=Symbol.for("react.memo"),kn=Symbol.for("react.lazy"),Ac=Symbol.for("react.activity"),Yx=Symbol.for("react.memo_cache_sentinel"),df=Symbol.iterator;function jr(e){return e===null||typeof e!="object"?null:(e=df&&e[df]||e["@@iterator"],typeof e=="function"?e:null)}var Gx=Symbol.for("react.client.reference");function Tc(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===Gx?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case qa:return"Fragment";case Sc:return"Profiler";case Dp:return"StrictMode";case wc:return"Suspense";case Mc:return"SuspenseList";case Ac:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case Qr:return"Portal";case an:return e.displayName||"Context";case Cp:return(e._context.displayName||"Context")+".Consumer";case Yd:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Gd:return t=e.displayName||null,t!==null?t:Tc(e.type)||"Memo";case kn:t=e._payload,e=e._init;try{return Tc(e(t))}catch{}}return null}var Kr=Array.isArray,R=Sp.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,I=Hx.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ma={pending:!1,data:null,method:null,action:null},Dc=[],Xa=-1;function Ue(e){return{current:e}}function Nt(e){0>Xa||(e.current=Dc[Xa],Dc[Xa]=null,Xa--)}function st(e,t){Xa++,Dc[Xa]=e.current,e.current=t}var He=Ue(null),wi=Ue(null),Hn=Ue(null),dl=Ue(null);function ul(e,t){switch(st(Hn,t),st(wi,e),st(He,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?mh(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=mh(t),e=Zm(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}Nt(He),st(He,e)}function ur(){Nt(He),Nt(wi),Nt(Hn)}function Cc(e){e.memoizedState!==null&&st(dl,e);var t=He.current,n=Zm(t,e.type);t!==n&&(st(wi,e),st(He,n))}function fl(e){wi.current===e&&(Nt(He),Nt(wi)),dl.current===e&&(Nt(dl),Ri._currentValue=ma)}var _o,uf;function ca(e){if(_o===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);_o=t&&t[1]||"",uf=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+_o+e+uf}var ko=!1;function So(e,t){if(!e||ko)return"";ko=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(t){var u=function(){throw Error()};if(Object.defineProperty(u.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(u,[])}catch(f){var h=f}Reflect.construct(e,[],u)}else{try{u.call()}catch(f){h=f}e.call(u.prototype)}}else{try{throw Error()}catch(f){h=f}(u=e())&&typeof u.catch=="function"&&u.catch(function(){})}}catch(f){if(f&&h&&typeof f.stack=="string")return[f.stack,h.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var r=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");r&&r.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var i=a.DetermineComponentFrameRoot(),s=i[0],l=i[1];if(s&&l){var o=s.split(`
`),c=l.split(`
`);for(r=a=0;a<o.length&&!o[a].includes("DetermineComponentFrameRoot");)a++;for(;r<c.length&&!c[r].includes("DetermineComponentFrameRoot");)r++;if(a===o.length||r===c.length)for(a=o.length-1,r=c.length-1;1<=a&&0<=r&&o[a]!==c[r];)r--;for(;1<=a&&0<=r;a--,r--)if(o[a]!==c[r]){if(a!==1||r!==1)do if(a--,r--,0>r||o[a]!==c[r]){var d=`
`+o[a].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=a&&0<=r);break}}}finally{ko=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?ca(n):""}function Fx(e,t){switch(e.tag){case 26:case 27:case 5:return ca(e.type);case 16:return ca("Lazy");case 13:return e.child!==t&&t!==null?ca("Suspense Fallback"):ca("Suspense");case 19:return ca("SuspenseList");case 0:case 15:return So(e.type,!1);case 11:return So(e.type.render,!1);case 1:return So(e.type,!0);case 31:return ca("Activity");default:return""}}function ff(e){try{var t="",n=null;do t+=Fx(e,n),n=e,e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var Ec=Object.prototype.hasOwnProperty,Fd=Ct.unstable_scheduleCallback,wo=Ct.unstable_cancelCallback,qx=Ct.unstable_shouldYield,Xx=Ct.unstable_requestPaint,ce=Ct.unstable_now,Px=Ct.unstable_getCurrentPriorityLevel,Ep=Ct.unstable_ImmediatePriority,Op=Ct.unstable_UserBlockingPriority,hl=Ct.unstable_NormalPriority,Qx=Ct.unstable_LowPriority,zp=Ct.unstable_IdlePriority,Kx=Ct.log,Zx=Ct.unstable_setDisableYieldValue,Ki=null,de=null;function Dn(e){if(typeof Kx=="function"&&Zx(e),de&&typeof de.setStrictMode=="function")try{de.setStrictMode(Ki,e)}catch{}}var ue=Math.clz32?Math.clz32:Jx,Wx=Math.log,Ix=Math.LN2;function Jx(e){return e>>>=0,e===0?32:31-(Wx(e)/Ix|0)|0}var cs=256,ds=262144,us=4194304;function da(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Wl(e,t,n){var a=e.pendingLanes;if(a===0)return 0;var r=0,i=e.suspendedLanes,s=e.pingedLanes;e=e.warmLanes;var l=a&134217727;return l!==0?(a=l&~i,a!==0?r=da(a):(s&=l,s!==0?r=da(s):n||(n=l&~e,n!==0&&(r=da(n))))):(l=a&~i,l!==0?r=da(l):s!==0?r=da(s):n||(n=a&~e,n!==0&&(r=da(n)))),r===0?0:t!==0&&t!==r&&!(t&i)&&(i=r&-r,n=t&-t,i>=n||i===32&&(n&4194048)!==0)?t:r}function Zi(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function $x(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Np(){var e=us;return us<<=1,!(us&62914560)&&(us=4194304),e}function Mo(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Wi(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function ty(e,t,n,a,r,i){var s=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var l=e.entanglements,o=e.expirationTimes,c=e.hiddenUpdates;for(n=s&~n;0<n;){var d=31-ue(n),u=1<<d;l[d]=0,o[d]=-1;var h=c[d];if(h!==null)for(c[d]=null,d=0;d<h.length;d++){var f=h[d];f!==null&&(f.lane&=-536870913)}n&=~u}a!==0&&jp(e,a,0),i!==0&&r===0&&e.tag!==0&&(e.suspendedLanes|=i&~(s&~t))}function jp(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var a=31-ue(t);e.entangledLanes|=t,e.entanglements[a]=e.entanglements[a]|1073741824|n&261930}function Rp(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-ue(n),r=1<<a;r&t|e[a]&t&&(e[a]|=t),n&=~r}}function Lp(e,t){var n=t&-t;return n=n&42?1:qd(n),n&(e.suspendedLanes|t)?0:n}function qd(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Xd(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function Bp(){var e=I.p;return e!==0?e:(e=window.event,e===void 0?32:sb(e.type))}function hf(e,t){var n=I.p;try{return I.p=e,t()}finally{I.p=n}}var ta=Math.random().toString(36).slice(2),Rt="__reactFiber$"+ta,ne="__reactProps$"+ta,Tr="__reactContainer$"+ta,Oc="__reactEvents$"+ta,ey="__reactListeners$"+ta,ny="__reactHandles$"+ta,pf="__reactResources$"+ta,Ii="__reactMarker$"+ta;function Pd(e){delete e[Rt],delete e[ne],delete e[Oc],delete e[ey],delete e[ny]}function Pa(e){var t=e[Rt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Tr]||n[Rt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=_h(e);e!==null;){if(n=e[Rt])return n;e=_h(e)}return t}e=n,n=e.parentNode}return null}function Dr(e){if(e=e[Rt]||e[Tr]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Zr(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(A(33))}function ar(e){var t=e[pf];return t||(t=e[pf]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ot(e){e[Ii]=!0}var Hp=new Set,Vp={};function Ea(e,t){fr(e,t),fr(e+"Capture",t)}function fr(e,t){for(Vp[e]=t,e=0;e<t.length;e++)Hp.add(t[e])}var ay=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),gf={},mf={};function ry(e){return Ec.call(mf,e)?!0:Ec.call(gf,e)?!1:ay.test(e)?mf[e]=!0:(gf[e]=!0,!1)}function Us(e,t,n){if(ry(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var a=t.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function fs(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function qe(e,t,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+a)}}function be(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Up(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function iy(e,t,n){var a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var r=a.get,i=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return r.call(this)},set:function(s){n=""+s,i.call(this,s)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(s){n=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function zc(e){if(!e._valueTracker){var t=Up(e)?"checked":"value";e._valueTracker=iy(e,t,""+e[t])}}function Yp(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=Up(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function pl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var sy=/[\n"\\]/g;function ve(e){return e.replace(sy,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Nc(e,t,n,a,r,i,s,l){e.name="",s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?e.type=s:e.removeAttribute("type"),t!=null?s==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+be(t)):e.value!==""+be(t)&&(e.value=""+be(t)):s!=="submit"&&s!=="reset"||e.removeAttribute("value"),t!=null?jc(e,s,be(t)):n!=null?jc(e,s,be(n)):a!=null&&e.removeAttribute("value"),r==null&&i!=null&&(e.defaultChecked=!!i),r!=null&&(e.checked=r&&typeof r!="function"&&typeof r!="symbol"),l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"?e.name=""+be(l):e.removeAttribute("name")}function Gp(e,t,n,a,r,i,s,l){if(i!=null&&typeof i!="function"&&typeof i!="symbol"&&typeof i!="boolean"&&(e.type=i),t!=null||n!=null){if(!(i!=="submit"&&i!=="reset"||t!=null)){zc(e);return}n=n!=null?""+be(n):"",t=t!=null?""+be(t):n,l||t===e.value||(e.value=t),e.defaultValue=t}a=a??r,a=typeof a!="function"&&typeof a!="symbol"&&!!a,e.checked=l?e.checked:!!a,e.defaultChecked=!!a,s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.name=s),zc(e)}function jc(e,t,n){t==="number"&&pl(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function rr(e,t,n,a){if(e=e.options,t){t={};for(var r=0;r<n.length;r++)t["$"+n[r]]=!0;for(n=0;n<e.length;n++)r=t.hasOwnProperty("$"+e[n].value),e[n].selected!==r&&(e[n].selected=r),r&&a&&(e[n].defaultSelected=!0)}else{for(n=""+be(n),t=null,r=0;r<e.length;r++){if(e[r].value===n){e[r].selected=!0,a&&(e[r].defaultSelected=!0);return}t!==null||e[r].disabled||(t=e[r])}t!==null&&(t.selected=!0)}}function Fp(e,t,n){if(t!=null&&(t=""+be(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+be(n):""}function qp(e,t,n,a){if(t==null){if(a!=null){if(n!=null)throw Error(A(92));if(Kr(a)){if(1<a.length)throw Error(A(93));a=a[0]}n=a}n==null&&(n=""),t=n}n=be(t),e.defaultValue=n,a=e.textContent,a===n&&a!==""&&a!==null&&(e.value=a),zc(e)}function hr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var ly=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function bf(e,t,n){var a=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":a?e.setProperty(t,n):typeof n!="number"||n===0||ly.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function Xp(e,t,n){if(t!=null&&typeof t!="object")throw Error(A(62));if(e=e.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||t!=null&&t.hasOwnProperty(a)||(a.indexOf("--")===0?e.setProperty(a,""):a==="float"?e.cssFloat="":e[a]="");for(var r in t)a=t[r],t.hasOwnProperty(r)&&n[r]!==a&&bf(e,r,a)}else for(var i in t)t.hasOwnProperty(i)&&bf(e,i,t[i])}function Qd(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var oy=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),cy=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ys(e){return cy.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function rn(){}var Rc=null;function Kd(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Qa=null,ir=null;function xf(e){var t=Dr(e);if(t&&(e=t.stateNode)){var n=e[ne]||null;t:switch(e=t.stateNode,t.type){case"input":if(Nc(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+ve(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var r=a[ne]||null;if(!r)throw Error(A(90));Nc(a,r.value,r.defaultValue,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name)}}for(t=0;t<n.length;t++)a=n[t],a.form===e.form&&Yp(a)}break t;case"textarea":Fp(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&rr(e,!!n.multiple,t,!1)}}}var Ao=!1;function Pp(e,t,n){if(Ao)return e(t,n);Ao=!0;try{var a=e(t);return a}finally{if(Ao=!1,(Qa!==null||ir!==null)&&(oo(),Qa&&(t=Qa,e=ir,ir=Qa=null,xf(t),e)))for(t=0;t<e.length;t++)xf(e[t])}}function Mi(e,t){var n=e.stateNode;if(n===null)return null;var a=n[ne]||null;if(a===null)return null;n=a[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(A(231,t,typeof n));return n}var hn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Lc=!1;if(hn)try{var Rr={};Object.defineProperty(Rr,"passive",{get:function(){Lc=!0}}),window.addEventListener("test",Rr,Rr),window.removeEventListener("test",Rr,Rr)}catch{Lc=!1}var Cn=null,Zd=null,Gs=null;function Qp(){if(Gs)return Gs;var e,t=Zd,n=t.length,a,r="value"in Cn?Cn.value:Cn.textContent,i=r.length;for(e=0;e<n&&t[e]===r[e];e++);var s=n-e;for(a=1;a<=s&&t[n-a]===r[i-a];a++);return Gs=r.slice(e,1<a?1-a:void 0)}function Fs(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function hs(){return!0}function yf(){return!1}function ae(e){function t(n,a,r,i,s){this._reactName=n,this._targetInst=r,this.type=a,this.nativeEvent=i,this.target=s,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?hs:yf,this.isPropagationStopped=yf,this}return ft(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=hs)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=hs)},persist:function(){},isPersistent:hs}),t}var Oa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Il=ae(Oa),Ji=ft({},Oa,{view:0,detail:0}),dy=ae(Ji),To,Do,Lr,Jl=ft({},Ji,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Wd,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Lr&&(Lr&&e.type==="mousemove"?(To=e.screenX-Lr.screenX,Do=e.screenY-Lr.screenY):Do=To=0,Lr=e),To)},movementY:function(e){return"movementY"in e?e.movementY:Do}}),vf=ae(Jl),uy=ft({},Jl,{dataTransfer:0}),fy=ae(uy),hy=ft({},Ji,{relatedTarget:0}),Co=ae(hy),py=ft({},Oa,{animationName:0,elapsedTime:0,pseudoElement:0}),gy=ae(py),my=ft({},Oa,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),by=ae(my),xy=ft({},Oa,{data:0}),_f=ae(xy),yy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},vy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},_y={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ky(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=_y[e])?!!t[e]:!1}function Wd(){return ky}var Sy=ft({},Ji,{key:function(e){if(e.key){var t=yy[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Fs(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?vy[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Wd,charCode:function(e){return e.type==="keypress"?Fs(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Fs(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),wy=ae(Sy),My=ft({},Jl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),kf=ae(My),Ay=ft({},Ji,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Wd}),Ty=ae(Ay),Dy=ft({},Oa,{propertyName:0,elapsedTime:0,pseudoElement:0}),Cy=ae(Dy),Ey=ft({},Jl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Oy=ae(Ey),zy=ft({},Oa,{newState:0,oldState:0}),Ny=ae(zy),jy=[9,13,27,32],Id=hn&&"CompositionEvent"in window,ii=null;hn&&"documentMode"in document&&(ii=document.documentMode);var Ry=hn&&"TextEvent"in window&&!ii,Kp=hn&&(!Id||ii&&8<ii&&11>=ii),Sf=" ",wf=!1;function Zp(e,t){switch(e){case"keyup":return jy.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Wp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ka=!1;function Ly(e,t){switch(e){case"compositionend":return Wp(t);case"keypress":return t.which!==32?null:(wf=!0,Sf);case"textInput":return e=t.data,e===Sf&&wf?null:e;default:return null}}function By(e,t){if(Ka)return e==="compositionend"||!Id&&Zp(e,t)?(e=Qp(),Gs=Zd=Cn=null,Ka=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Kp&&t.locale!=="ko"?null:t.data;default:return null}}var Hy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Mf(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Hy[e.type]:t==="textarea"}function Ip(e,t,n,a){Qa?ir?ir.push(a):ir=[a]:Qa=a,t=zl(t,"onChange"),0<t.length&&(n=new Il("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var si=null,Ai=null;function Vy(e){Pm(e,0)}function $l(e){var t=Zr(e);if(Yp(t))return e}function Af(e,t){if(e==="change")return t}var Jp=!1;if(hn){var Eo;if(hn){var Oo="oninput"in document;if(!Oo){var Tf=document.createElement("div");Tf.setAttribute("oninput","return;"),Oo=typeof Tf.oninput=="function"}Eo=Oo}else Eo=!1;Jp=Eo&&(!document.documentMode||9<document.documentMode)}function Df(){si&&(si.detachEvent("onpropertychange",$p),Ai=si=null)}function $p(e){if(e.propertyName==="value"&&$l(Ai)){var t=[];Ip(t,Ai,e,Kd(e)),Pp(Vy,t)}}function Uy(e,t,n){e==="focusin"?(Df(),si=t,Ai=n,si.attachEvent("onpropertychange",$p)):e==="focusout"&&Df()}function Yy(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return $l(Ai)}function Gy(e,t){if(e==="click")return $l(t)}function Fy(e,t){if(e==="input"||e==="change")return $l(t)}function qy(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var he=typeof Object.is=="function"?Object.is:qy;function Ti(e,t){if(he(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var r=n[a];if(!Ec.call(t,r)||!he(e[r],t[r]))return!1}return!0}function Cf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ef(e,t){var n=Cf(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Cf(n)}}function tg(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?tg(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function eg(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=pl(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=pl(e.document)}return t}function Jd(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Xy=hn&&"documentMode"in document&&11>=document.documentMode,Za=null,Bc=null,li=null,Hc=!1;function Of(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Hc||Za==null||Za!==pl(a)||(a=Za,"selectionStart"in a&&Jd(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),li&&Ti(li,a)||(li=a,a=zl(Bc,"onSelect"),0<a.length&&(t=new Il("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=Za)))}function ra(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Wa={animationend:ra("Animation","AnimationEnd"),animationiteration:ra("Animation","AnimationIteration"),animationstart:ra("Animation","AnimationStart"),transitionrun:ra("Transition","TransitionRun"),transitionstart:ra("Transition","TransitionStart"),transitioncancel:ra("Transition","TransitionCancel"),transitionend:ra("Transition","TransitionEnd")},zo={},ng={};hn&&(ng=document.createElement("div").style,"AnimationEvent"in window||(delete Wa.animationend.animation,delete Wa.animationiteration.animation,delete Wa.animationstart.animation),"TransitionEvent"in window||delete Wa.transitionend.transition);function za(e){if(zo[e])return zo[e];if(!Wa[e])return e;var t=Wa[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ng)return zo[e]=t[n];return e}var ag=za("animationend"),rg=za("animationiteration"),ig=za("animationstart"),Py=za("transitionrun"),Qy=za("transitionstart"),Ky=za("transitioncancel"),sg=za("transitionend"),lg=new Map,Vc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Vc.push("scrollEnd");function Oe(e,t){lg.set(e,t),Ea(t,[e])}var gl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},me=[],Ia=0,$d=0;function to(){for(var e=Ia,t=$d=Ia=0;t<e;){var n=me[t];me[t++]=null;var a=me[t];me[t++]=null;var r=me[t];me[t++]=null;var i=me[t];if(me[t++]=null,a!==null&&r!==null){var s=a.pending;s===null?r.next=r:(r.next=s.next,s.next=r),a.pending=r}i!==0&&og(n,r,i)}}function eo(e,t,n,a){me[Ia++]=e,me[Ia++]=t,me[Ia++]=n,me[Ia++]=a,$d|=a,e.lanes|=a,e=e.alternate,e!==null&&(e.lanes|=a)}function tu(e,t,n,a){return eo(e,t,n,a),ml(e)}function Na(e,t){return eo(e,null,null,t),ml(e)}function og(e,t,n){e.lanes|=n;var a=e.alternate;a!==null&&(a.lanes|=n);for(var r=!1,i=e.return;i!==null;)i.childLanes|=n,a=i.alternate,a!==null&&(a.childLanes|=n),i.tag===22&&(e=i.stateNode,e===null||e._visibility&1||(r=!0)),e=i,i=i.return;return e.tag===3?(i=e.stateNode,r&&t!==null&&(r=31-ue(n),e=i.hiddenUpdates,a=e[r],a===null?e[r]=[t]:a.push(t),t.lane=n|536870912),i):null}function ml(e){if(50<mi)throw mi=0,sd=null,Error(A(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Ja={};function Zy(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function le(e,t,n,a){return new Zy(e,t,n,a)}function eu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function dn(e,t){var n=e.alternate;return n===null?(n=le(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function cg(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function qs(e,t,n,a,r,i){var s=0;if(a=e,typeof e=="function")eu(e)&&(s=1);else if(typeof e=="string")s=t2(e,n,He.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case Ac:return e=le(31,n,t,r),e.elementType=Ac,e.lanes=i,e;case qa:return ba(n.children,r,i,t);case Dp:s=8,r|=24;break;case Sc:return e=le(12,n,t,r|2),e.elementType=Sc,e.lanes=i,e;case wc:return e=le(13,n,t,r),e.elementType=wc,e.lanes=i,e;case Mc:return e=le(19,n,t,r),e.elementType=Mc,e.lanes=i,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case an:s=10;break t;case Cp:s=9;break t;case Yd:s=11;break t;case Gd:s=14;break t;case kn:s=16,a=null;break t}s=29,n=Error(A(130,e===null?"null":typeof e,"")),a=null}return t=le(s,n,t,r),t.elementType=e,t.type=a,t.lanes=i,t}function ba(e,t,n,a){return e=le(7,e,a,t),e.lanes=n,e}function No(e,t,n){return e=le(6,e,null,t),e.lanes=n,e}function dg(e){var t=le(18,null,null,0);return t.stateNode=e,t}function jo(e,t,n){return t=le(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var zf=new WeakMap;function _e(e,t){if(typeof e=="object"&&e!==null){var n=zf.get(e);return n!==void 0?n:(t={value:e,source:t,stack:ff(t)},zf.set(e,t),t)}return{value:e,source:t,stack:ff(t)}}var $a=[],tr=0,bl=null,Di=0,xe=[],ye=0,Kn=null,Re=1,Le="";function $e(e,t){$a[tr++]=Di,$a[tr++]=bl,bl=e,Di=t}function ug(e,t,n){xe[ye++]=Re,xe[ye++]=Le,xe[ye++]=Kn,Kn=e;var a=Re;e=Le;var r=32-ue(a)-1;a&=~(1<<r),n+=1;var i=32-ue(t)+r;if(30<i){var s=r-r%5;i=(a&(1<<s)-1).toString(32),a>>=s,r-=s,Re=1<<32-ue(t)+r|n<<r|a,Le=i+e}else Re=1<<i|n<<r|a,Le=e}function nu(e){e.return!==null&&($e(e,1),ug(e,1,0))}function au(e){for(;e===bl;)bl=$a[--tr],$a[tr]=null,Di=$a[--tr],$a[tr]=null;for(;e===Kn;)Kn=xe[--ye],xe[ye]=null,Le=xe[--ye],xe[ye]=null,Re=xe[--ye],xe[ye]=null}function fg(e,t){xe[ye++]=Re,xe[ye++]=Le,xe[ye++]=Kn,Re=t.id,Le=t.overflow,Kn=e}var Lt=null,ct=null,P=!1,Vn=null,ke=!1,Uc=Error(A(519));function Zn(e){var t=Error(A(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ci(_e(t,e)),Uc}function Nf(e){var t=e.stateNode,n=e.type,a=e.memoizedProps;switch(t[Rt]=e,t[ne]=a,n){case"dialog":Y("cancel",t),Y("close",t);break;case"iframe":case"object":case"embed":Y("load",t);break;case"video":case"audio":for(n=0;n<Ni.length;n++)Y(Ni[n],t);break;case"source":Y("error",t);break;case"img":case"image":case"link":Y("error",t),Y("load",t);break;case"details":Y("toggle",t);break;case"input":Y("invalid",t),Gp(t,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":Y("invalid",t);break;case"textarea":Y("invalid",t),qp(t,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||a.suppressHydrationWarning===!0||Km(t.textContent,n)?(a.popover!=null&&(Y("beforetoggle",t),Y("toggle",t)),a.onScroll!=null&&Y("scroll",t),a.onScrollEnd!=null&&Y("scrollend",t),a.onClick!=null&&(t.onclick=rn),t=!0):t=!1,t||Zn(e,!0)}function jf(e){for(Lt=e.return;Lt;)switch(Lt.tag){case 5:case 31:case 13:ke=!1;return;case 27:case 3:ke=!0;return;default:Lt=Lt.return}}function La(e){if(e!==Lt)return!1;if(!P)return jf(e),P=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||ud(e.type,e.memoizedProps)),n=!n),n&&ct&&Zn(e),jf(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(A(317));ct=vh(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(A(317));ct=vh(e)}else t===27?(t=ct,ea(e.type)?(e=gd,gd=null,ct=e):ct=t):ct=Lt?we(e.stateNode.nextSibling):null;return!0}function Sa(){ct=Lt=null,P=!1}function Ro(){var e=Vn;return e!==null&&(Jt===null?Jt=e:Jt.push.apply(Jt,e),Vn=null),e}function Ci(e){Vn===null?Vn=[e]:Vn.push(e)}var Yc=Ue(null),ja=null,sn=null;function wn(e,t,n){st(Yc,t._currentValue),t._currentValue=n}function un(e){e._currentValue=Yc.current,Nt(Yc)}function Gc(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function Fc(e,t,n,a){var r=e.child;for(r!==null&&(r.return=e);r!==null;){var i=r.dependencies;if(i!==null){var s=r.child;i=i.firstContext;t:for(;i!==null;){var l=i;i=r;for(var o=0;o<t.length;o++)if(l.context===t[o]){i.lanes|=n,l=i.alternate,l!==null&&(l.lanes|=n),Gc(i.return,n,e),a||(s=null);break t}i=l.next}}else if(r.tag===18){if(s=r.return,s===null)throw Error(A(341));s.lanes|=n,i=s.alternate,i!==null&&(i.lanes|=n),Gc(s,n,e),s=null}else s=r.child;if(s!==null)s.return=r;else for(s=r;s!==null;){if(s===e){s=null;break}if(r=s.sibling,r!==null){r.return=s.return,s=r;break}s=s.return}r=s}}function Cr(e,t,n,a){e=null;for(var r=t,i=!1;r!==null;){if(!i){if(r.flags&524288)i=!0;else if(r.flags&262144)break}if(r.tag===10){var s=r.alternate;if(s===null)throw Error(A(387));if(s=s.memoizedProps,s!==null){var l=r.type;he(r.pendingProps.value,s.value)||(e!==null?e.push(l):e=[l])}}else if(r===dl.current){if(s=r.alternate,s===null)throw Error(A(387));s.memoizedState.memoizedState!==r.memoizedState.memoizedState&&(e!==null?e.push(Ri):e=[Ri])}r=r.return}e!==null&&Fc(t,e,n,a),t.flags|=262144}function xl(e){for(e=e.firstContext;e!==null;){if(!he(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function wa(e){ja=e,sn=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Bt(e){return hg(ja,e)}function ps(e,t){return ja===null&&wa(e),hg(e,t)}function hg(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},sn===null){if(e===null)throw Error(A(308));sn=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else sn=sn.next=t;return n}var Wy=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,a){e.push(a)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},Iy=Ct.unstable_scheduleCallback,Jy=Ct.unstable_NormalPriority,wt={$$typeof:an,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ru(){return{controller:new Wy,data:new Map,refCount:0}}function $i(e){e.refCount--,e.refCount===0&&Iy(Jy,function(){e.controller.abort()})}var oi=null,qc=0,pr=0,sr=null;function $y(e,t){if(oi===null){var n=oi=[];qc=0,pr=Cu(),sr={status:"pending",value:void 0,then:function(a){n.push(a)}}}return qc++,t.then(Rf,Rf),t}function Rf(){if(--qc===0&&oi!==null){sr!==null&&(sr.status="fulfilled");var e=oi;oi=null,pr=0,sr=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function tv(e,t){var n=[],a={status:"pending",value:null,reason:null,then:function(r){n.push(r)}};return e.then(function(){a.status="fulfilled",a.value=t;for(var r=0;r<n.length;r++)(0,n[r])(t)},function(r){for(a.status="rejected",a.reason=r,r=0;r<n.length;r++)(0,n[r])(void 0)}),a}var Lf=R.S;R.S=function(e,t){Tm=ce(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&$y(e,t),Lf!==null&&Lf(e,t)};var xa=Ue(null);function iu(){var e=xa.current;return e!==null?e:rt.pooledCache}function Xs(e,t){t===null?st(xa,xa.current):st(xa,t.pool)}function pg(){var e=iu();return e===null?null:{parent:wt._currentValue,pool:e}}var Er=Error(A(460)),su=Error(A(474)),no=Error(A(542)),yl={then:function(){}};function Bf(e){return e=e.status,e==="fulfilled"||e==="rejected"}function gg(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(rn,rn),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Vf(e),e;default:if(typeof t.status=="string")t.then(rn,rn);else{if(e=rt,e!==null&&100<e.shellSuspendCounter)throw Error(A(482));e=t,e.status="pending",e.then(function(a){if(t.status==="pending"){var r=t;r.status="fulfilled",r.value=a}},function(a){if(t.status==="pending"){var r=t;r.status="rejected",r.reason=a}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Vf(e),e}throw ya=t,Er}}function ua(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(ya=n,Er):n}}var ya=null;function Hf(){if(ya===null)throw Error(A(459));var e=ya;return ya=null,e}function Vf(e){if(e===Er||e===no)throw Error(A(483))}var lr=null,Ei=0;function gs(e){var t=Ei;return Ei+=1,lr===null&&(lr=[]),gg(lr,e,t)}function Br(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function ms(e,t){throw t.$$typeof===Ux?Error(A(525)):(e=Object.prototype.toString.call(t),Error(A(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function mg(e){function t(p,g){if(e){var x=p.deletions;x===null?(p.deletions=[g],p.flags|=16):x.push(g)}}function n(p,g){if(!e)return null;for(;g!==null;)t(p,g),g=g.sibling;return null}function a(p){for(var g=new Map;p!==null;)p.key!==null?g.set(p.key,p):g.set(p.index,p),p=p.sibling;return g}function r(p,g){return p=dn(p,g),p.index=0,p.sibling=null,p}function i(p,g,x){return p.index=x,e?(x=p.alternate,x!==null?(x=x.index,x<g?(p.flags|=67108866,g):x):(p.flags|=67108866,g)):(p.flags|=1048576,g)}function s(p){return e&&p.alternate===null&&(p.flags|=67108866),p}function l(p,g,x,v){return g===null||g.tag!==6?(g=No(x,p.mode,v),g.return=p,g):(g=r(g,x),g.return=p,g)}function o(p,g,x,v){var k=x.type;return k===qa?d(p,g,x.props.children,v,x.key):g!==null&&(g.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===kn&&ua(k)===g.type)?(g=r(g,x.props),Br(g,x),g.return=p,g):(g=qs(x.type,x.key,x.props,null,p.mode,v),Br(g,x),g.return=p,g)}function c(p,g,x,v){return g===null||g.tag!==4||g.stateNode.containerInfo!==x.containerInfo||g.stateNode.implementation!==x.implementation?(g=jo(x,p.mode,v),g.return=p,g):(g=r(g,x.children||[]),g.return=p,g)}function d(p,g,x,v,k){return g===null||g.tag!==7?(g=ba(x,p.mode,v,k),g.return=p,g):(g=r(g,x),g.return=p,g)}function u(p,g,x){if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return g=No(""+g,p.mode,x),g.return=p,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case os:return x=qs(g.type,g.key,g.props,null,p.mode,x),Br(x,g),x.return=p,x;case Qr:return g=jo(g,p.mode,x),g.return=p,g;case kn:return g=ua(g),u(p,g,x)}if(Kr(g)||jr(g))return g=ba(g,p.mode,x,null),g.return=p,g;if(typeof g.then=="function")return u(p,gs(g),x);if(g.$$typeof===an)return u(p,ps(p,g),x);ms(p,g)}return null}function h(p,g,x,v){var k=g!==null?g.key:null;if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return k!==null?null:l(p,g,""+x,v);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case os:return x.key===k?o(p,g,x,v):null;case Qr:return x.key===k?c(p,g,x,v):null;case kn:return x=ua(x),h(p,g,x,v)}if(Kr(x)||jr(x))return k!==null?null:d(p,g,x,v,null);if(typeof x.then=="function")return h(p,g,gs(x),v);if(x.$$typeof===an)return h(p,g,ps(p,x),v);ms(p,x)}return null}function f(p,g,x,v,k){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return p=p.get(x)||null,l(g,p,""+v,k);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case os:return p=p.get(v.key===null?x:v.key)||null,o(g,p,v,k);case Qr:return p=p.get(v.key===null?x:v.key)||null,c(g,p,v,k);case kn:return v=ua(v),f(p,g,x,v,k)}if(Kr(v)||jr(v))return p=p.get(x)||null,d(g,p,v,k,null);if(typeof v.then=="function")return f(p,g,x,gs(v),k);if(v.$$typeof===an)return f(p,g,x,ps(g,v),k);ms(g,v)}return null}function m(p,g,x,v){for(var k=null,S=null,w=g,M=g=0,T=null;w!==null&&M<x.length;M++){w.index>M?(T=w,w=null):T=w.sibling;var C=h(p,w,x[M],v);if(C===null){w===null&&(w=T);break}e&&w&&C.alternate===null&&t(p,w),g=i(C,g,M),S===null?k=C:S.sibling=C,S=C,w=T}if(M===x.length)return n(p,w),P&&$e(p,M),k;if(w===null){for(;M<x.length;M++)w=u(p,x[M],v),w!==null&&(g=i(w,g,M),S===null?k=w:S.sibling=w,S=w);return P&&$e(p,M),k}for(w=a(w);M<x.length;M++)T=f(w,p,M,x[M],v),T!==null&&(e&&T.alternate!==null&&w.delete(T.key===null?M:T.key),g=i(T,g,M),S===null?k=T:S.sibling=T,S=T);return e&&w.forEach(function(O){return t(p,O)}),P&&$e(p,M),k}function b(p,g,x,v){if(x==null)throw Error(A(151));for(var k=null,S=null,w=g,M=g=0,T=null,C=x.next();w!==null&&!C.done;M++,C=x.next()){w.index>M?(T=w,w=null):T=w.sibling;var O=h(p,w,C.value,v);if(O===null){w===null&&(w=T);break}e&&w&&O.alternate===null&&t(p,w),g=i(O,g,M),S===null?k=O:S.sibling=O,S=O,w=T}if(C.done)return n(p,w),P&&$e(p,M),k;if(w===null){for(;!C.done;M++,C=x.next())C=u(p,C.value,v),C!==null&&(g=i(C,g,M),S===null?k=C:S.sibling=C,S=C);return P&&$e(p,M),k}for(w=a(w);!C.done;M++,C=x.next())C=f(w,p,M,C.value,v),C!==null&&(e&&C.alternate!==null&&w.delete(C.key===null?M:C.key),g=i(C,g,M),S===null?k=C:S.sibling=C,S=C);return e&&w.forEach(function(N){return t(p,N)}),P&&$e(p,M),k}function y(p,g,x,v){if(typeof x=="object"&&x!==null&&x.type===qa&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case os:t:{for(var k=x.key;g!==null;){if(g.key===k){if(k=x.type,k===qa){if(g.tag===7){n(p,g.sibling),v=r(g,x.props.children),v.return=p,p=v;break t}}else if(g.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===kn&&ua(k)===g.type){n(p,g.sibling),v=r(g,x.props),Br(v,x),v.return=p,p=v;break t}n(p,g);break}else t(p,g);g=g.sibling}x.type===qa?(v=ba(x.props.children,p.mode,v,x.key),v.return=p,p=v):(v=qs(x.type,x.key,x.props,null,p.mode,v),Br(v,x),v.return=p,p=v)}return s(p);case Qr:t:{for(k=x.key;g!==null;){if(g.key===k)if(g.tag===4&&g.stateNode.containerInfo===x.containerInfo&&g.stateNode.implementation===x.implementation){n(p,g.sibling),v=r(g,x.children||[]),v.return=p,p=v;break t}else{n(p,g);break}else t(p,g);g=g.sibling}v=jo(x,p.mode,v),v.return=p,p=v}return s(p);case kn:return x=ua(x),y(p,g,x,v)}if(Kr(x))return m(p,g,x,v);if(jr(x)){if(k=jr(x),typeof k!="function")throw Error(A(150));return x=k.call(x),b(p,g,x,v)}if(typeof x.then=="function")return y(p,g,gs(x),v);if(x.$$typeof===an)return y(p,g,ps(p,x),v);ms(p,x)}return typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint"?(x=""+x,g!==null&&g.tag===6?(n(p,g.sibling),v=r(g,x),v.return=p,p=v):(n(p,g),v=No(x,p.mode,v),v.return=p,p=v),s(p)):n(p,g)}return function(p,g,x,v){try{Ei=0;var k=y(p,g,x,v);return lr=null,k}catch(w){if(w===Er||w===no)throw w;var S=le(29,w,null,p.mode);return S.lanes=v,S.return=p,S}finally{}}}var Ma=mg(!0),bg=mg(!1),Sn=!1;function lu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Xc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Un(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Yn(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,W&2){var r=a.pending;return r===null?t.next=t:(t.next=r.next,r.next=t),a.pending=t,t=ml(e),og(e,null,n),t}return eo(e,a,t,n),ml(e)}function ci(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,Rp(e,n)}}function Lo(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var r=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var s={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};i===null?r=i=s:i=i.next=s,n=n.next}while(n!==null);i===null?r=i=t:i=i.next=t}else r=i=t;n={baseState:a.baseState,firstBaseUpdate:r,lastBaseUpdate:i,shared:a.shared,callbacks:a.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Pc=!1;function di(){if(Pc){var e=sr;if(e!==null)throw e}}function ui(e,t,n,a){Pc=!1;var r=e.updateQueue;Sn=!1;var i=r.firstBaseUpdate,s=r.lastBaseUpdate,l=r.shared.pending;if(l!==null){r.shared.pending=null;var o=l,c=o.next;o.next=null,s===null?i=c:s.next=c,s=o;var d=e.alternate;d!==null&&(d=d.updateQueue,l=d.lastBaseUpdate,l!==s&&(l===null?d.firstBaseUpdate=c:l.next=c,d.lastBaseUpdate=o))}if(i!==null){var u=r.baseState;s=0,d=c=o=null,l=i;do{var h=l.lane&-536870913,f=h!==l.lane;if(f?(q&h)===h:(a&h)===h){h!==0&&h===pr&&(Pc=!0),d!==null&&(d=d.next={lane:0,tag:l.tag,payload:l.payload,callback:null,next:null});t:{var m=e,b=l;h=t;var y=n;switch(b.tag){case 1:if(m=b.payload,typeof m=="function"){u=m.call(y,u,h);break t}u=m;break t;case 3:m.flags=m.flags&-65537|128;case 0:if(m=b.payload,h=typeof m=="function"?m.call(y,u,h):m,h==null)break t;u=ft({},u,h);break t;case 2:Sn=!0}}h=l.callback,h!==null&&(e.flags|=64,f&&(e.flags|=8192),f=r.callbacks,f===null?r.callbacks=[h]:f.push(h))}else f={lane:h,tag:l.tag,payload:l.payload,callback:l.callback,next:null},d===null?(c=d=f,o=u):d=d.next=f,s|=h;if(l=l.next,l===null){if(l=r.shared.pending,l===null)break;f=l,l=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(!0);d===null&&(o=u),r.baseState=o,r.firstBaseUpdate=c,r.lastBaseUpdate=d,i===null&&(r.shared.lanes=0),In|=s,e.lanes=s,e.memoizedState=u}}function xg(e,t){if(typeof e!="function")throw Error(A(191,e));e.call(t)}function yg(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)xg(n[e],t)}var gr=Ue(null),vl=Ue(0);function Uf(e,t){e=bn,st(vl,e),st(gr,t),bn=e|t.baseLanes}function Qc(){st(vl,bn),st(gr,gr.current)}function ou(){bn=vl.current,Nt(gr),Nt(vl)}var pe=Ue(null),Se=null;function Mn(e){var t=e.alternate;st(yt,yt.current&1),st(pe,e),Se===null&&(t===null||gr.current!==null||t.memoizedState!==null)&&(Se=e)}function Kc(e){st(yt,yt.current),st(pe,e),Se===null&&(Se=e)}function vg(e){e.tag===22?(st(yt,yt.current),st(pe,e),Se===null&&(Se=e)):An()}function An(){st(yt,yt.current),st(pe,pe.current)}function se(e){Nt(pe),Se===e&&(Se=null),Nt(yt)}var yt=Ue(0);function _l(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||hd(n)||pd(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var pn=0,V=null,at=null,kt=null,kl=!1,or=!1,Aa=!1,Sl=0,Oi=0,cr=null,ev=0;function mt(){throw Error(A(321))}function cu(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!he(e[n],t[n]))return!1;return!0}function du(e,t,n,a,r,i){return pn=i,V=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,R.H=e===null||e.memoizedState===null?Ig:_u,Aa=!1,i=n(a,r),Aa=!1,or&&(i=kg(t,n,a,r)),_g(e),i}function _g(e){R.H=zi;var t=at!==null&&at.next!==null;if(pn=0,kt=at=V=null,kl=!1,Oi=0,cr=null,t)throw Error(A(300));e===null||Mt||(e=e.dependencies,e!==null&&xl(e)&&(Mt=!0))}function kg(e,t,n,a){V=e;var r=0;do{if(or&&(cr=null),Oi=0,or=!1,25<=r)throw Error(A(301));if(r+=1,kt=at=null,e.updateQueue!=null){var i=e.updateQueue;i.lastEffect=null,i.events=null,i.stores=null,i.memoCache!=null&&(i.memoCache.index=0)}R.H=Jg,i=t(n,a)}while(or);return i}function nv(){var e=R.H,t=e.useState()[0];return t=typeof t.then=="function"?ts(t):t,e=e.useState()[0],(at!==null?at.memoizedState:null)!==e&&(V.flags|=1024),t}function uu(){var e=Sl!==0;return Sl=0,e}function fu(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function hu(e){if(kl){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}kl=!1}pn=0,kt=at=V=null,or=!1,Oi=Sl=0,cr=null}function qt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return kt===null?V.memoizedState=kt=e:kt=kt.next=e,kt}function _t(){if(at===null){var e=V.alternate;e=e!==null?e.memoizedState:null}else e=at.next;var t=kt===null?V.memoizedState:kt.next;if(t!==null)kt=t,at=e;else{if(e===null)throw V.alternate===null?Error(A(467)):Error(A(310));at=e,e={memoizedState:at.memoizedState,baseState:at.baseState,baseQueue:at.baseQueue,queue:at.queue,next:null},kt===null?V.memoizedState=kt=e:kt=kt.next=e}return kt}function ao(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ts(e){var t=Oi;return Oi+=1,cr===null&&(cr=[]),e=gg(cr,e,t),t=V,(kt===null?t.memoizedState:kt.next)===null&&(t=t.alternate,R.H=t===null||t.memoizedState===null?Ig:_u),e}function ro(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return ts(e);if(e.$$typeof===an)return Bt(e)}throw Error(A(438,String(e)))}function pu(e){var t=null,n=V.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var a=V.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(t={data:a.data.map(function(r){return r.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=ao(),V.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),a=0;a<e;a++)n[a]=Yx;return t.index++,n}function gn(e,t){return typeof t=="function"?t(e):t}function Ps(e){var t=_t();return gu(t,at,e)}function gu(e,t,n){var a=e.queue;if(a===null)throw Error(A(311));a.lastRenderedReducer=n;var r=e.baseQueue,i=a.pending;if(i!==null){if(r!==null){var s=r.next;r.next=i.next,i.next=s}t.baseQueue=r=i,a.pending=null}if(i=e.baseState,r===null)e.memoizedState=i;else{t=r.next;var l=s=null,o=null,c=t,d=!1;do{var u=c.lane&-536870913;if(u!==c.lane?(q&u)===u:(pn&u)===u){var h=c.revertLane;if(h===0)o!==null&&(o=o.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),u===pr&&(d=!0);else if((pn&h)===h){c=c.next,h===pr&&(d=!0);continue}else u={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},o===null?(l=o=u,s=i):o=o.next=u,V.lanes|=h,In|=h;u=c.action,Aa&&n(i,u),i=c.hasEagerState?c.eagerState:n(i,u)}else h={lane:u,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},o===null?(l=o=h,s=i):o=o.next=h,V.lanes|=u,In|=u;c=c.next}while(c!==null&&c!==t);if(o===null?s=i:o.next=l,!he(i,e.memoizedState)&&(Mt=!0,d&&(n=sr,n!==null)))throw n;e.memoizedState=i,e.baseState=s,e.baseQueue=o,a.lastRenderedState=i}return r===null&&(a.lanes=0),[e.memoizedState,a.dispatch]}function Bo(e){var t=_t(),n=t.queue;if(n===null)throw Error(A(311));n.lastRenderedReducer=e;var a=n.dispatch,r=n.pending,i=t.memoizedState;if(r!==null){n.pending=null;var s=r=r.next;do i=e(i,s.action),s=s.next;while(s!==r);he(i,t.memoizedState)||(Mt=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,a]}function Sg(e,t,n){var a=V,r=_t(),i=P;if(i){if(n===void 0)throw Error(A(407));n=n()}else n=t();var s=!he((at||r).memoizedState,n);if(s&&(r.memoizedState=n,Mt=!0),r=r.queue,mu(Ag.bind(null,a,r,e),[e]),r.getSnapshot!==t||s||kt!==null&&kt.memoizedState.tag&1){if(a.flags|=2048,mr(9,{destroy:void 0},Mg.bind(null,a,r,n,t),null),rt===null)throw Error(A(349));i||pn&127||wg(a,t,n)}return n}function wg(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=V.updateQueue,t===null?(t=ao(),V.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Mg(e,t,n,a){t.value=n,t.getSnapshot=a,Tg(t)&&Dg(e)}function Ag(e,t,n){return n(function(){Tg(t)&&Dg(e)})}function Tg(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!he(e,n)}catch{return!0}}function Dg(e){var t=Na(e,2);t!==null&&ee(t,e,2)}function Zc(e){var t=qt();if(typeof e=="function"){var n=e;if(e=n(),Aa){Dn(!0);try{n()}finally{Dn(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:gn,lastRenderedState:e},t}function Cg(e,t,n,a){return e.baseState=n,gu(e,at,typeof a=="function"?a:gn)}function av(e,t,n,a,r){if(so(e))throw Error(A(485));if(e=t.action,e!==null){var i={payload:r,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(s){i.listeners.push(s)}};R.T!==null?n(!0):i.isTransition=!1,a(i),n=t.pending,n===null?(i.next=t.pending=i,Eg(t,i)):(i.next=n.next,t.pending=n.next=i)}}function Eg(e,t){var n=t.action,a=t.payload,r=e.state;if(t.isTransition){var i=R.T,s={};R.T=s;try{var l=n(r,a),o=R.S;o!==null&&o(s,l),Yf(e,t,l)}catch(c){Wc(e,t,c)}finally{i!==null&&s.types!==null&&(i.types=s.types),R.T=i}}else try{i=n(r,a),Yf(e,t,i)}catch(c){Wc(e,t,c)}}function Yf(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){Gf(e,t,a)},function(a){return Wc(e,t,a)}):Gf(e,t,n)}function Gf(e,t,n){t.status="fulfilled",t.value=n,Og(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Eg(e,n)))}function Wc(e,t,n){var a=e.pending;if(e.pending=null,a!==null){a=a.next;do t.status="rejected",t.reason=n,Og(t),t=t.next;while(t!==a)}e.action=null}function Og(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function zg(e,t){return t}function Ff(e,t){if(P){var n=rt.formState;if(n!==null){t:{var a=V;if(P){if(ct){e:{for(var r=ct,i=ke;r.nodeType!==8;){if(!i){r=null;break e}if(r=we(r.nextSibling),r===null){r=null;break e}}i=r.data,r=i==="F!"||i==="F"?r:null}if(r){ct=we(r.nextSibling),a=r.data==="F!";break t}}Zn(a)}a=!1}a&&(t=n[0])}}return n=qt(),n.memoizedState=n.baseState=t,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:zg,lastRenderedState:t},n.queue=a,n=Kg.bind(null,V,a),a.dispatch=n,a=Zc(!1),i=vu.bind(null,V,!1,a.queue),a=qt(),r={state:t,dispatch:null,action:e,pending:null},a.queue=r,n=av.bind(null,V,r,i,n),r.dispatch=n,a.memoizedState=e,[t,n,!1]}function qf(e){var t=_t();return Ng(t,at,e)}function Ng(e,t,n){if(t=gu(e,t,zg)[0],e=Ps(gn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var a=ts(t)}catch(s){throw s===Er?no:s}else a=t;t=_t();var r=t.queue,i=r.dispatch;return n!==t.memoizedState&&(V.flags|=2048,mr(9,{destroy:void 0},rv.bind(null,r,n),null)),[a,i,e]}function rv(e,t){e.action=t}function Xf(e){var t=_t(),n=at;if(n!==null)return Ng(t,n,e);_t(),t=t.memoizedState,n=_t();var a=n.queue.dispatch;return n.memoizedState=e,[t,a,!1]}function mr(e,t,n,a){return e={tag:e,create:n,deps:a,inst:t,next:null},t=V.updateQueue,t===null&&(t=ao(),V.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e),e}function jg(){return _t().memoizedState}function Qs(e,t,n,a){var r=qt();V.flags|=e,r.memoizedState=mr(1|t,{destroy:void 0},n,a===void 0?null:a)}function io(e,t,n,a){var r=_t();a=a===void 0?null:a;var i=r.memoizedState.inst;at!==null&&a!==null&&cu(a,at.memoizedState.deps)?r.memoizedState=mr(t,i,n,a):(V.flags|=e,r.memoizedState=mr(1|t,i,n,a))}function Pf(e,t){Qs(8390656,8,e,t)}function mu(e,t){io(2048,8,e,t)}function iv(e){V.flags|=4;var t=V.updateQueue;if(t===null)t=ao(),V.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Rg(e){var t=_t().memoizedState;return iv({ref:t,nextImpl:e}),function(){if(W&2)throw Error(A(440));return t.impl.apply(void 0,arguments)}}function Lg(e,t){return io(4,2,e,t)}function Bg(e,t){return io(4,4,e,t)}function Hg(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Vg(e,t,n){n=n!=null?n.concat([e]):null,io(4,4,Hg.bind(null,t,e),n)}function bu(){}function Ug(e,t){var n=_t();t=t===void 0?null:t;var a=n.memoizedState;return t!==null&&cu(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function Yg(e,t){var n=_t();t=t===void 0?null:t;var a=n.memoizedState;if(t!==null&&cu(t,a[1]))return a[0];if(a=e(),Aa){Dn(!0);try{e()}finally{Dn(!1)}}return n.memoizedState=[a,t],a}function xu(e,t,n){return n===void 0||pn&1073741824&&!(q&261930)?e.memoizedState=t:(e.memoizedState=n,e=Cm(),V.lanes|=e,In|=e,n)}function Gg(e,t,n,a){return he(n,t)?n:gr.current!==null?(e=xu(e,n,a),he(e,t)||(Mt=!0),e):!(pn&42)||pn&1073741824&&!(q&261930)?(Mt=!0,e.memoizedState=n):(e=Cm(),V.lanes|=e,In|=e,t)}function Fg(e,t,n,a,r){var i=I.p;I.p=i!==0&&8>i?i:8;var s=R.T,l={};R.T=l,vu(e,!1,t,n);try{var o=r(),c=R.S;if(c!==null&&c(l,o),o!==null&&typeof o=="object"&&typeof o.then=="function"){var d=tv(o,a);fi(e,t,d,fe(e))}else fi(e,t,a,fe(e))}catch(u){fi(e,t,{then:function(){},status:"rejected",reason:u},fe())}finally{I.p=i,s!==null&&l.types!==null&&(s.types=l.types),R.T=s}}function sv(){}function Ic(e,t,n,a){if(e.tag!==5)throw Error(A(476));var r=qg(e).queue;Fg(e,r,t,ma,n===null?sv:function(){return Xg(e),n(a)})}function qg(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ma,baseState:ma,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:gn,lastRenderedState:ma},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:gn,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Xg(e){var t=qg(e);t.next===null&&(t=e.alternate.memoizedState),fi(e,t.next.queue,{},fe())}function yu(){return Bt(Ri)}function Pg(){return _t().memoizedState}function Qg(){return _t().memoizedState}function lv(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=fe();e=Un(n);var a=Yn(t,e,n);a!==null&&(ee(a,t,n),ci(a,t,n)),t={cache:ru()},e.payload=t;return}t=t.return}}function ov(e,t,n){var a=fe();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},so(e)?Zg(t,n):(n=tu(e,t,n,a),n!==null&&(ee(n,e,a),Wg(n,t,a)))}function Kg(e,t,n){var a=fe();fi(e,t,n,a)}function fi(e,t,n,a){var r={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(so(e))Zg(t,r);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var s=t.lastRenderedState,l=i(s,n);if(r.hasEagerState=!0,r.eagerState=l,he(l,s))return eo(e,t,r,0),rt===null&&to(),!1}catch{}finally{}if(n=tu(e,t,r,a),n!==null)return ee(n,e,a),Wg(n,t,a),!0}return!1}function vu(e,t,n,a){if(a={lane:2,revertLane:Cu(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},so(e)){if(t)throw Error(A(479))}else t=tu(e,n,a,2),t!==null&&ee(t,e,2)}function so(e){var t=e.alternate;return e===V||t!==null&&t===V}function Zg(e,t){or=kl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Wg(e,t,n){if(n&4194048){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,Rp(e,n)}}var zi={readContext:Bt,use:ro,useCallback:mt,useContext:mt,useEffect:mt,useImperativeHandle:mt,useLayoutEffect:mt,useInsertionEffect:mt,useMemo:mt,useReducer:mt,useRef:mt,useState:mt,useDebugValue:mt,useDeferredValue:mt,useTransition:mt,useSyncExternalStore:mt,useId:mt,useHostTransitionStatus:mt,useFormState:mt,useActionState:mt,useOptimistic:mt,useMemoCache:mt,useCacheRefresh:mt};zi.useEffectEvent=mt;var Ig={readContext:Bt,use:ro,useCallback:function(e,t){return qt().memoizedState=[e,t===void 0?null:t],e},useContext:Bt,useEffect:Pf,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,Qs(4194308,4,Hg.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Qs(4194308,4,e,t)},useInsertionEffect:function(e,t){Qs(4,2,e,t)},useMemo:function(e,t){var n=qt();t=t===void 0?null:t;var a=e();if(Aa){Dn(!0);try{e()}finally{Dn(!1)}}return n.memoizedState=[a,t],a},useReducer:function(e,t,n){var a=qt();if(n!==void 0){var r=n(t);if(Aa){Dn(!0);try{n(t)}finally{Dn(!1)}}}else r=t;return a.memoizedState=a.baseState=r,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:r},a.queue=e,e=e.dispatch=ov.bind(null,V,e),[a.memoizedState,e]},useRef:function(e){var t=qt();return e={current:e},t.memoizedState=e},useState:function(e){e=Zc(e);var t=e.queue,n=Kg.bind(null,V,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:bu,useDeferredValue:function(e,t){var n=qt();return xu(n,e,t)},useTransition:function(){var e=Zc(!1);return e=Fg.bind(null,V,e.queue,!0,!1),qt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var a=V,r=qt();if(P){if(n===void 0)throw Error(A(407));n=n()}else{if(n=t(),rt===null)throw Error(A(349));q&127||wg(a,t,n)}r.memoizedState=n;var i={value:n,getSnapshot:t};return r.queue=i,Pf(Ag.bind(null,a,i,e),[e]),a.flags|=2048,mr(9,{destroy:void 0},Mg.bind(null,a,i,n,t),null),n},useId:function(){var e=qt(),t=rt.identifierPrefix;if(P){var n=Le,a=Re;n=(a&~(1<<32-ue(a)-1)).toString(32)+n,t="_"+t+"R_"+n,n=Sl++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=ev++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:yu,useFormState:Ff,useActionState:Ff,useOptimistic:function(e){var t=qt();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=vu.bind(null,V,!0,n),n.dispatch=t,[e,t]},useMemoCache:pu,useCacheRefresh:function(){return qt().memoizedState=lv.bind(null,V)},useEffectEvent:function(e){var t=qt(),n={impl:e};return t.memoizedState=n,function(){if(W&2)throw Error(A(440));return n.impl.apply(void 0,arguments)}}},_u={readContext:Bt,use:ro,useCallback:Ug,useContext:Bt,useEffect:mu,useImperativeHandle:Vg,useInsertionEffect:Lg,useLayoutEffect:Bg,useMemo:Yg,useReducer:Ps,useRef:jg,useState:function(){return Ps(gn)},useDebugValue:bu,useDeferredValue:function(e,t){var n=_t();return Gg(n,at.memoizedState,e,t)},useTransition:function(){var e=Ps(gn)[0],t=_t().memoizedState;return[typeof e=="boolean"?e:ts(e),t]},useSyncExternalStore:Sg,useId:Pg,useHostTransitionStatus:yu,useFormState:qf,useActionState:qf,useOptimistic:function(e,t){var n=_t();return Cg(n,at,e,t)},useMemoCache:pu,useCacheRefresh:Qg};_u.useEffectEvent=Rg;var Jg={readContext:Bt,use:ro,useCallback:Ug,useContext:Bt,useEffect:mu,useImperativeHandle:Vg,useInsertionEffect:Lg,useLayoutEffect:Bg,useMemo:Yg,useReducer:Bo,useRef:jg,useState:function(){return Bo(gn)},useDebugValue:bu,useDeferredValue:function(e,t){var n=_t();return at===null?xu(n,e,t):Gg(n,at.memoizedState,e,t)},useTransition:function(){var e=Bo(gn)[0],t=_t().memoizedState;return[typeof e=="boolean"?e:ts(e),t]},useSyncExternalStore:Sg,useId:Pg,useHostTransitionStatus:yu,useFormState:Xf,useActionState:Xf,useOptimistic:function(e,t){var n=_t();return at!==null?Cg(n,at,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:pu,useCacheRefresh:Qg};Jg.useEffectEvent=Rg;function Ho(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:ft({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Jc={enqueueSetState:function(e,t,n){e=e._reactInternals;var a=fe(),r=Un(a);r.payload=t,n!=null&&(r.callback=n),t=Yn(e,r,a),t!==null&&(ee(t,e,a),ci(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=fe(),r=Un(a);r.tag=1,r.payload=t,n!=null&&(r.callback=n),t=Yn(e,r,a),t!==null&&(ee(t,e,a),ci(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=fe(),a=Un(n);a.tag=2,t!=null&&(a.callback=t),t=Yn(e,a,n),t!==null&&(ee(t,e,n),ci(t,e,n))}};function Qf(e,t,n,a,r,i,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,i,s):t.prototype&&t.prototype.isPureReactComponent?!Ti(n,a)||!Ti(r,i):!0}function Kf(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&Jc.enqueueReplaceState(t,t.state,null)}function Ta(e,t){var n=t;if("ref"in t){n={};for(var a in t)a!=="ref"&&(n[a]=t[a])}if(e=e.defaultProps){n===t&&(n=ft({},n));for(var r in e)n[r]===void 0&&(n[r]=e[r])}return n}function $g(e){gl(e)}function tm(e){console.error(e)}function em(e){gl(e)}function wl(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(a){setTimeout(function(){throw a})}}function Zf(e,t,n){try{var a=e.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(r){setTimeout(function(){throw r})}}function $c(e,t,n){return n=Un(n),n.tag=3,n.payload={element:null},n.callback=function(){wl(e,t)},n}function nm(e){return e=Un(e),e.tag=3,e}function am(e,t,n,a){var r=n.type.getDerivedStateFromError;if(typeof r=="function"){var i=a.value;e.payload=function(){return r(i)},e.callback=function(){Zf(t,n,a)}}var s=n.stateNode;s!==null&&typeof s.componentDidCatch=="function"&&(e.callback=function(){Zf(t,n,a),typeof r!="function"&&(Gn===null?Gn=new Set([this]):Gn.add(this));var l=a.stack;this.componentDidCatch(a.value,{componentStack:l!==null?l:""})})}function cv(e,t,n,a,r){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(t=n.alternate,t!==null&&Cr(t,n,r,!0),n=pe.current,n!==null){switch(n.tag){case 31:case 13:return Se===null?Cl():n.alternate===null&&bt===0&&(bt=3),n.flags&=-257,n.flags|=65536,n.lanes=r,a===yl?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([a]):t.add(a),Zo(e,a,r)),!1;case 22:return n.flags|=65536,a===yl?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([a]):n.add(a)),Zo(e,a,r)),!1}throw Error(A(435,n.tag))}return Zo(e,a,r),Cl(),!1}if(P)return t=pe.current,t!==null?(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=r,a!==Uc&&(e=Error(A(422),{cause:a}),Ci(_e(e,n)))):(a!==Uc&&(t=Error(A(423),{cause:a}),Ci(_e(t,n))),e=e.current.alternate,e.flags|=65536,r&=-r,e.lanes|=r,a=_e(a,n),r=$c(e.stateNode,a,r),Lo(e,r),bt!==4&&(bt=2)),!1;var i=Error(A(520),{cause:a});if(i=_e(i,n),gi===null?gi=[i]:gi.push(i),bt!==4&&(bt=2),t===null)return!0;a=_e(a,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=r&-r,n.lanes|=e,e=$c(n.stateNode,a,e),Lo(n,e),!1;case 1:if(t=n.type,i=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||i!==null&&typeof i.componentDidCatch=="function"&&(Gn===null||!Gn.has(i))))return n.flags|=65536,r&=-r,n.lanes|=r,r=nm(r),am(r,e,n,a),Lo(n,r),!1}n=n.return}while(n!==null);return!1}var ku=Error(A(461)),Mt=!1;function jt(e,t,n,a){t.child=e===null?bg(t,null,n,a):Ma(t,e.child,n,a)}function Wf(e,t,n,a,r){n=n.render;var i=t.ref;if("ref"in a){var s={};for(var l in a)l!=="ref"&&(s[l]=a[l])}else s=a;return wa(t),a=du(e,t,n,s,i,r),l=uu(),e!==null&&!Mt?(fu(e,t,r),mn(e,t,r)):(P&&l&&nu(t),t.flags|=1,jt(e,t,a,r),t.child)}function If(e,t,n,a,r){if(e===null){var i=n.type;return typeof i=="function"&&!eu(i)&&i.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=i,rm(e,t,i,a,r)):(e=qs(n.type,null,a,t,t.mode,r),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!Su(e,r)){var s=i.memoizedProps;if(n=n.compare,n=n!==null?n:Ti,n(s,a)&&e.ref===t.ref)return mn(e,t,r)}return t.flags|=1,e=dn(i,a),e.ref=t.ref,e.return=t,t.child=e}function rm(e,t,n,a,r){if(e!==null){var i=e.memoizedProps;if(Ti(i,a)&&e.ref===t.ref)if(Mt=!1,t.pendingProps=a=i,Su(e,r))e.flags&131072&&(Mt=!0);else return t.lanes=e.lanes,mn(e,t,r)}return td(e,t,n,a,r)}function im(e,t,n,a){var r=a.children,i=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if(t.flags&128){if(i=i!==null?i.baseLanes|n:n,e!==null){for(a=t.child=e.child,r=0;a!==null;)r=r|a.lanes|a.childLanes,a=a.sibling;a=r&~i}else a=0,t.child=null;return Jf(e,t,i,n,a)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Xs(t,i!==null?i.cachePool:null),i!==null?Uf(t,i):Qc(),vg(t);else return a=t.lanes=536870912,Jf(e,t,i!==null?i.baseLanes|n:n,n,a)}else i!==null?(Xs(t,i.cachePool),Uf(t,i),An(),t.memoizedState=null):(e!==null&&Xs(t,null),Qc(),An());return jt(e,t,r,n),t.child}function Wr(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Jf(e,t,n,a,r){var i=iu();return i=i===null?null:{parent:wt._currentValue,pool:i},t.memoizedState={baseLanes:n,cachePool:i},e!==null&&Xs(t,null),Qc(),vg(t),e!==null&&Cr(e,t,a,!0),t.childLanes=r,null}function Ks(e,t){return t=Ml({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function $f(e,t,n){return Ma(t,e.child,null,n),e=Ks(t,t.pendingProps),e.flags|=2,se(t),t.memoizedState=null,e}function dv(e,t,n){var a=t.pendingProps,r=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(P){if(a.mode==="hidden")return e=Ks(t,a),t.lanes=536870912,Wr(null,e);if(Kc(t),(e=ct)?(e=Im(e,ke),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Kn!==null?{id:Re,overflow:Le}:null,retryLane:536870912,hydrationErrors:null},n=dg(e),n.return=t,t.child=n,Lt=t,ct=null)):e=null,e===null)throw Zn(t);return t.lanes=536870912,null}return Ks(t,a)}var i=e.memoizedState;if(i!==null){var s=i.dehydrated;if(Kc(t),r)if(t.flags&256)t.flags&=-257,t=$f(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(A(558));else if(Mt||Cr(e,t,n,!1),r=(n&e.childLanes)!==0,Mt||r){if(a=rt,a!==null&&(s=Lp(a,n),s!==0&&s!==i.retryLane))throw i.retryLane=s,Na(e,s),ee(a,e,s),ku;Cl(),t=$f(e,t,n)}else e=i.treeContext,ct=we(s.nextSibling),Lt=t,P=!0,Vn=null,ke=!1,e!==null&&fg(t,e),t=Ks(t,a),t.flags|=4096;return t}return e=dn(e.child,{mode:a.mode,children:a.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Zs(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(A(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function td(e,t,n,a,r){return wa(t),n=du(e,t,n,a,void 0,r),a=uu(),e!==null&&!Mt?(fu(e,t,r),mn(e,t,r)):(P&&a&&nu(t),t.flags|=1,jt(e,t,n,r),t.child)}function th(e,t,n,a,r,i){return wa(t),t.updateQueue=null,n=kg(t,a,n,r),_g(e),a=uu(),e!==null&&!Mt?(fu(e,t,i),mn(e,t,i)):(P&&a&&nu(t),t.flags|=1,jt(e,t,n,i),t.child)}function eh(e,t,n,a,r){if(wa(t),t.stateNode===null){var i=Ja,s=n.contextType;typeof s=="object"&&s!==null&&(i=Bt(s)),i=new n(a,i),t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Jc,t.stateNode=i,i._reactInternals=t,i=t.stateNode,i.props=a,i.state=t.memoizedState,i.refs={},lu(t),s=n.contextType,i.context=typeof s=="object"&&s!==null?Bt(s):Ja,i.state=t.memoizedState,s=n.getDerivedStateFromProps,typeof s=="function"&&(Ho(t,n,s,a),i.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(s=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),s!==i.state&&Jc.enqueueReplaceState(i,i.state,null),ui(t,a,i,r),di(),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!0}else if(e===null){i=t.stateNode;var l=t.memoizedProps,o=Ta(n,l);i.props=o;var c=i.context,d=n.contextType;s=Ja,typeof d=="object"&&d!==null&&(s=Bt(d));var u=n.getDerivedStateFromProps;d=typeof u=="function"||typeof i.getSnapshotBeforeUpdate=="function",l=t.pendingProps!==l,d||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(l||c!==s)&&Kf(t,i,a,s),Sn=!1;var h=t.memoizedState;i.state=h,ui(t,a,i,r),di(),c=t.memoizedState,l||h!==c||Sn?(typeof u=="function"&&(Ho(t,n,u,a),c=t.memoizedState),(o=Sn||Qf(t,n,o,a,h,c,s))?(d||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=c),i.props=a,i.state=c,i.context=s,a=o):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{i=t.stateNode,Xc(e,t),s=t.memoizedProps,d=Ta(n,s),i.props=d,u=t.pendingProps,h=i.context,c=n.contextType,o=Ja,typeof c=="object"&&c!==null&&(o=Bt(c)),l=n.getDerivedStateFromProps,(c=typeof l=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==u||h!==o)&&Kf(t,i,a,o),Sn=!1,h=t.memoizedState,i.state=h,ui(t,a,i,r),di();var f=t.memoizedState;s!==u||h!==f||Sn||e!==null&&e.dependencies!==null&&xl(e.dependencies)?(typeof l=="function"&&(Ho(t,n,l,a),f=t.memoizedState),(d=Sn||Qf(t,n,d,a,h,f,o)||e!==null&&e.dependencies!==null&&xl(e.dependencies))?(c||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(a,f,o),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(a,f,o)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=f),i.props=a,i.state=f,i.context=o,a=d):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),a=!1)}return i=a,Zs(e,t),a=(t.flags&128)!==0,i||a?(i=t.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:i.render(),t.flags|=1,e!==null&&a?(t.child=Ma(t,e.child,null,r),t.child=Ma(t,null,n,r)):jt(e,t,n,r),t.memoizedState=i.state,e=t.child):e=mn(e,t,r),e}function nh(e,t,n,a){return Sa(),t.flags|=256,jt(e,t,n,a),t.child}var Vo={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Uo(e){return{baseLanes:e,cachePool:pg()}}function Yo(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=oe),e}function sm(e,t,n){var a=t.pendingProps,r=!1,i=(t.flags&128)!==0,s;if((s=i)||(s=e!==null&&e.memoizedState===null?!1:(yt.current&2)!==0),s&&(r=!0,t.flags&=-129),s=(t.flags&32)!==0,t.flags&=-33,e===null){if(P){if(r?Mn(t):An(),(e=ct)?(e=Im(e,ke),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Kn!==null?{id:Re,overflow:Le}:null,retryLane:536870912,hydrationErrors:null},n=dg(e),n.return=t,t.child=n,Lt=t,ct=null)):e=null,e===null)throw Zn(t);return pd(e)?t.lanes=32:t.lanes=536870912,null}var l=a.children;return a=a.fallback,r?(An(),r=t.mode,l=Ml({mode:"hidden",children:l},r),a=ba(a,r,n,null),l.return=t,a.return=t,l.sibling=a,t.child=l,a=t.child,a.memoizedState=Uo(n),a.childLanes=Yo(e,s,n),t.memoizedState=Vo,Wr(null,a)):(Mn(t),ed(t,l))}var o=e.memoizedState;if(o!==null&&(l=o.dehydrated,l!==null)){if(i)t.flags&256?(Mn(t),t.flags&=-257,t=Go(e,t,n)):t.memoizedState!==null?(An(),t.child=e.child,t.flags|=128,t=null):(An(),l=a.fallback,r=t.mode,a=Ml({mode:"visible",children:a.children},r),l=ba(l,r,n,null),l.flags|=2,a.return=t,l.return=t,a.sibling=l,t.child=a,Ma(t,e.child,null,n),a=t.child,a.memoizedState=Uo(n),a.childLanes=Yo(e,s,n),t.memoizedState=Vo,t=Wr(null,a));else if(Mn(t),pd(l)){if(s=l.nextSibling&&l.nextSibling.dataset,s)var c=s.dgst;s=c,a=Error(A(419)),a.stack="",a.digest=s,Ci({value:a,source:null,stack:null}),t=Go(e,t,n)}else if(Mt||Cr(e,t,n,!1),s=(n&e.childLanes)!==0,Mt||s){if(s=rt,s!==null&&(a=Lp(s,n),a!==0&&a!==o.retryLane))throw o.retryLane=a,Na(e,a),ee(s,e,a),ku;hd(l)||Cl(),t=Go(e,t,n)}else hd(l)?(t.flags|=192,t.child=e.child,t=null):(e=o.treeContext,ct=we(l.nextSibling),Lt=t,P=!0,Vn=null,ke=!1,e!==null&&fg(t,e),t=ed(t,a.children),t.flags|=4096);return t}return r?(An(),l=a.fallback,r=t.mode,o=e.child,c=o.sibling,a=dn(o,{mode:"hidden",children:a.children}),a.subtreeFlags=o.subtreeFlags&65011712,c!==null?l=dn(c,l):(l=ba(l,r,n,null),l.flags|=2),l.return=t,a.return=t,a.sibling=l,t.child=a,Wr(null,a),a=t.child,l=e.child.memoizedState,l===null?l=Uo(n):(r=l.cachePool,r!==null?(o=wt._currentValue,r=r.parent!==o?{parent:o,pool:o}:r):r=pg(),l={baseLanes:l.baseLanes|n,cachePool:r}),a.memoizedState=l,a.childLanes=Yo(e,s,n),t.memoizedState=Vo,Wr(e.child,a)):(Mn(t),n=e.child,e=n.sibling,n=dn(n,{mode:"visible",children:a.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function ed(e,t){return t=Ml({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Ml(e,t){return e=le(22,e,null,t),e.lanes=0,e}function Go(e,t,n){return Ma(t,e.child,null,n),e=ed(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function ah(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),Gc(e.return,t,n)}function Fo(e,t,n,a,r,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:r,treeForkCount:i}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=a,s.tail=n,s.tailMode=r,s.treeForkCount=i)}function lm(e,t,n){var a=t.pendingProps,r=a.revealOrder,i=a.tail;a=a.children;var s=yt.current,l=(s&2)!==0;if(l?(s=s&1|2,t.flags|=128):s&=1,st(yt,s),jt(e,t,a,n),a=P?Di:0,!l&&e!==null&&e.flags&128)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ah(e,n,t);else if(e.tag===19)ah(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(r){case"forwards":for(n=t.child,r=null;n!==null;)e=n.alternate,e!==null&&_l(e)===null&&(r=n),n=n.sibling;n=r,n===null?(r=t.child,t.child=null):(r=n.sibling,n.sibling=null),Fo(t,!1,r,n,i,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,r=t.child,t.child=null;r!==null;){if(e=r.alternate,e!==null&&_l(e)===null){t.child=r;break}e=r.sibling,r.sibling=n,n=r,r=e}Fo(t,!0,n,null,i,a);break;case"together":Fo(t,!1,null,null,void 0,a);break;default:t.memoizedState=null}return t.child}function mn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),In|=t.lanes,!(n&t.childLanes))if(e!==null){if(Cr(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(A(153));if(t.child!==null){for(e=t.child,n=dn(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=dn(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Su(e,t){return e.lanes&t?!0:(e=e.dependencies,!!(e!==null&&xl(e)))}function uv(e,t,n){switch(t.tag){case 3:ul(t,t.stateNode.containerInfo),wn(t,wt,e.memoizedState.cache),Sa();break;case 27:case 5:Cc(t);break;case 4:ul(t,t.stateNode.containerInfo);break;case 10:wn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Kc(t),null;break;case 13:var a=t.memoizedState;if(a!==null)return a.dehydrated!==null?(Mn(t),t.flags|=128,null):n&t.child.childLanes?sm(e,t,n):(Mn(t),e=mn(e,t,n),e!==null?e.sibling:null);Mn(t);break;case 19:var r=(e.flags&128)!==0;if(a=(n&t.childLanes)!==0,a||(Cr(e,t,n,!1),a=(n&t.childLanes)!==0),r){if(a)return lm(e,t,n);t.flags|=128}if(r=t.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),st(yt,yt.current),a)break;return null;case 22:return t.lanes=0,im(e,t,n,t.pendingProps);case 24:wn(t,wt,e.memoizedState.cache)}return mn(e,t,n)}function om(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Mt=!0;else{if(!Su(e,n)&&!(t.flags&128))return Mt=!1,uv(e,t,n);Mt=!!(e.flags&131072)}else Mt=!1,P&&t.flags&1048576&&ug(t,Di,t.index);switch(t.lanes=0,t.tag){case 16:t:{var a=t.pendingProps;if(e=ua(t.elementType),t.type=e,typeof e=="function")eu(e)?(a=Ta(e,a),t.tag=1,t=eh(null,t,e,a,n)):(t.tag=0,t=td(null,t,e,a,n));else{if(e!=null){var r=e.$$typeof;if(r===Yd){t.tag=11,t=Wf(null,t,e,a,n);break t}else if(r===Gd){t.tag=14,t=If(null,t,e,a,n);break t}}throw t=Tc(e)||e,Error(A(306,t,""))}}return t;case 0:return td(e,t,t.type,t.pendingProps,n);case 1:return a=t.type,r=Ta(a,t.pendingProps),eh(e,t,a,r,n);case 3:t:{if(ul(t,t.stateNode.containerInfo),e===null)throw Error(A(387));a=t.pendingProps;var i=t.memoizedState;r=i.element,Xc(e,t),ui(t,a,null,n);var s=t.memoizedState;if(a=s.cache,wn(t,wt,a),a!==i.cache&&Fc(t,[wt],n,!0),di(),a=s.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){t=nh(e,t,a,n);break t}else if(a!==r){r=_e(Error(A(424)),t),Ci(r),t=nh(e,t,a,n);break t}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(ct=we(e.firstChild),Lt=t,P=!0,Vn=null,ke=!0,n=bg(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Sa(),a===r){t=mn(e,t,n);break t}jt(e,t,a,n)}t=t.child}return t;case 26:return Zs(e,t),e===null?(n=Sh(t.type,null,t.pendingProps,null))?t.memoizedState=n:P||(n=t.type,e=t.pendingProps,a=Nl(Hn.current).createElement(n),a[Rt]=t,a[ne]=e,Ht(a,n,e),Ot(a),t.stateNode=a):t.memoizedState=Sh(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Cc(t),e===null&&P&&(a=t.stateNode=Jm(t.type,t.pendingProps,Hn.current),Lt=t,ke=!0,r=ct,ea(t.type)?(gd=r,ct=we(a.firstChild)):ct=r),jt(e,t,t.pendingProps.children,n),Zs(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&P&&((r=a=ct)&&(a=Yv(a,t.type,t.pendingProps,ke),a!==null?(t.stateNode=a,Lt=t,ct=we(a.firstChild),ke=!1,r=!0):r=!1),r||Zn(t)),Cc(t),r=t.type,i=t.pendingProps,s=e!==null?e.memoizedProps:null,a=i.children,ud(r,i)?a=null:s!==null&&ud(r,s)&&(t.flags|=32),t.memoizedState!==null&&(r=du(e,t,nv,null,null,n),Ri._currentValue=r),Zs(e,t),jt(e,t,a,n),t.child;case 6:return e===null&&P&&((e=n=ct)&&(n=Gv(n,t.pendingProps,ke),n!==null?(t.stateNode=n,Lt=t,ct=null,e=!0):e=!1),e||Zn(t)),null;case 13:return sm(e,t,n);case 4:return ul(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=Ma(t,null,a,n):jt(e,t,a,n),t.child;case 11:return Wf(e,t,t.type,t.pendingProps,n);case 7:return jt(e,t,t.pendingProps,n),t.child;case 8:return jt(e,t,t.pendingProps.children,n),t.child;case 12:return jt(e,t,t.pendingProps.children,n),t.child;case 10:return a=t.pendingProps,wn(t,t.type,a.value),jt(e,t,a.children,n),t.child;case 9:return r=t.type._context,a=t.pendingProps.children,wa(t),r=Bt(r),a=a(r),t.flags|=1,jt(e,t,a,n),t.child;case 14:return If(e,t,t.type,t.pendingProps,n);case 15:return rm(e,t,t.type,t.pendingProps,n);case 19:return lm(e,t,n);case 31:return dv(e,t,n);case 22:return im(e,t,n,t.pendingProps);case 24:return wa(t),a=Bt(wt),e===null?(r=iu(),r===null&&(r=rt,i=ru(),r.pooledCache=i,i.refCount++,i!==null&&(r.pooledCacheLanes|=n),r=i),t.memoizedState={parent:a,cache:r},lu(t),wn(t,wt,r)):(e.lanes&n&&(Xc(e,t),ui(t,null,null,n),di()),r=e.memoizedState,i=t.memoizedState,r.parent!==a?(r={parent:a,cache:a},t.memoizedState=r,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=r),wn(t,wt,a)):(a=i.cache,wn(t,wt,a),a!==r.cache&&Fc(t,[wt],n,!0))),jt(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(A(156,t.tag))}function Xe(e){e.flags|=4}function qo(e,t,n,a,r){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(r&335544128)===r)if(e.stateNode.complete)e.flags|=8192;else if(zm())e.flags|=8192;else throw ya=yl,su}else e.flags&=-16777217}function rh(e,t){if(t.type!=="stylesheet"||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!eb(t))if(zm())e.flags|=8192;else throw ya=yl,su}function bs(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Np():536870912,e.lanes|=t,br|=t)}function Hr(e,t){if(!P)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function ot(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var r=e.child;r!==null;)n|=r.lanes|r.childLanes,a|=r.subtreeFlags&65011712,a|=r.flags&65011712,r.return=e,r=r.sibling;else for(r=e.child;r!==null;)n|=r.lanes|r.childLanes,a|=r.subtreeFlags,a|=r.flags,r.return=e,r=r.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function fv(e,t,n){var a=t.pendingProps;switch(au(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ot(t),null;case 1:return ot(t),null;case 3:return n=t.stateNode,a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),un(wt),ur(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(La(t)?Xe(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ro())),ot(t),null;case 26:var r=t.type,i=t.memoizedState;return e===null?(Xe(t),i!==null?(ot(t),rh(t,i)):(ot(t),qo(t,r,null,a,n))):i?i!==e.memoizedState?(Xe(t),ot(t),rh(t,i)):(ot(t),t.flags&=-16777217):(e=e.memoizedProps,e!==a&&Xe(t),ot(t),qo(t,r,e,a,n)),null;case 27:if(fl(t),n=Hn.current,r=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&Xe(t);else{if(!a){if(t.stateNode===null)throw Error(A(166));return ot(t),null}e=He.current,La(t)?Nf(t):(e=Jm(r,a,n),t.stateNode=e,Xe(t))}return ot(t),null;case 5:if(fl(t),r=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&Xe(t);else{if(!a){if(t.stateNode===null)throw Error(A(166));return ot(t),null}if(i=He.current,La(t))Nf(t);else{var s=Nl(Hn.current);switch(i){case 1:i=s.createElementNS("http://www.w3.org/2000/svg",r);break;case 2:i=s.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;default:switch(r){case"svg":i=s.createElementNS("http://www.w3.org/2000/svg",r);break;case"math":i=s.createElementNS("http://www.w3.org/1998/Math/MathML",r);break;case"script":i=s.createElement("div"),i.innerHTML="<script><\/script>",i=i.removeChild(i.firstChild);break;case"select":i=typeof a.is=="string"?s.createElement("select",{is:a.is}):s.createElement("select"),a.multiple?i.multiple=!0:a.size&&(i.size=a.size);break;default:i=typeof a.is=="string"?s.createElement(r,{is:a.is}):s.createElement(r)}}i[Rt]=t,i[ne]=a;t:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)i.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break t;for(;s.sibling===null;){if(s.return===null||s.return===t)break t;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=i;t:switch(Ht(i,r,a),r){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break t;case"img":a=!0;break t;default:a=!1}a&&Xe(t)}}return ot(t),qo(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==a&&Xe(t);else{if(typeof a!="string"&&t.stateNode===null)throw Error(A(166));if(e=Hn.current,La(t)){if(e=t.stateNode,n=t.memoizedProps,a=null,r=Lt,r!==null)switch(r.tag){case 27:case 5:a=r.memoizedProps}e[Rt]=t,e=!!(e.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||Km(e.nodeValue,n)),e||Zn(t,!0)}else e=Nl(e).createTextNode(a),e[Rt]=t,t.stateNode=e}return ot(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(a=La(t),n!==null){if(e===null){if(!a)throw Error(A(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(A(557));e[Rt]=t}else Sa(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ot(t),e=!1}else n=Ro(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(se(t),t):(se(t),null);if(t.flags&128)throw Error(A(558))}return ot(t),null;case 13:if(a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(r=La(t),a!==null&&a.dehydrated!==null){if(e===null){if(!r)throw Error(A(318));if(r=t.memoizedState,r=r!==null?r.dehydrated:null,!r)throw Error(A(317));r[Rt]=t}else Sa(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ot(t),r=!1}else r=Ro(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=r),r=!0;if(!r)return t.flags&256?(se(t),t):(se(t),null)}return se(t),t.flags&128?(t.lanes=n,t):(n=a!==null,e=e!==null&&e.memoizedState!==null,n&&(a=t.child,r=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(r=a.alternate.memoizedState.cachePool.pool),i=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(i=a.memoizedState.cachePool.pool),i!==r&&(a.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),bs(t,t.updateQueue),ot(t),null);case 4:return ur(),e===null&&Eu(t.stateNode.containerInfo),ot(t),null;case 10:return un(t.type),ot(t),null;case 19:if(Nt(yt),a=t.memoizedState,a===null)return ot(t),null;if(r=(t.flags&128)!==0,i=a.rendering,i===null)if(r)Hr(a,!1);else{if(bt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=_l(e),i!==null){for(t.flags|=128,Hr(a,!1),e=i.updateQueue,t.updateQueue=e,bs(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)cg(n,e),n=n.sibling;return st(yt,yt.current&1|2),P&&$e(t,a.treeForkCount),t.child}e=e.sibling}a.tail!==null&&ce()>Tl&&(t.flags|=128,r=!0,Hr(a,!1),t.lanes=4194304)}else{if(!r)if(e=_l(i),e!==null){if(t.flags|=128,r=!0,e=e.updateQueue,t.updateQueue=e,bs(t,e),Hr(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!P)return ot(t),null}else 2*ce()-a.renderingStartTime>Tl&&n!==536870912&&(t.flags|=128,r=!0,Hr(a,!1),t.lanes=4194304);a.isBackwards?(i.sibling=t.child,t.child=i):(e=a.last,e!==null?e.sibling=i:t.child=i,a.last=i)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=ce(),e.sibling=null,n=yt.current,st(yt,r?n&1|2:n&1),P&&$e(t,a.treeForkCount),e):(ot(t),null);case 22:case 23:return se(t),ou(),a=t.memoizedState!==null,e!==null?e.memoizedState!==null!==a&&(t.flags|=8192):a&&(t.flags|=8192),a?n&536870912&&!(t.flags&128)&&(ot(t),t.subtreeFlags&6&&(t.flags|=8192)):ot(t),n=t.updateQueue,n!==null&&bs(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),a=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),a!==n&&(t.flags|=2048),e!==null&&Nt(xa),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),un(wt),ot(t),null;case 25:return null;case 30:return null}throw Error(A(156,t.tag))}function hv(e,t){switch(au(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return un(wt),ur(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return fl(t),null;case 31:if(t.memoizedState!==null){if(se(t),t.alternate===null)throw Error(A(340));Sa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(se(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(A(340));Sa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Nt(yt),null;case 4:return ur(),null;case 10:return un(t.type),null;case 22:case 23:return se(t),ou(),e!==null&&Nt(xa),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return un(wt),null;case 25:return null;default:return null}}function cm(e,t){switch(au(t),t.tag){case 3:un(wt),ur();break;case 26:case 27:case 5:fl(t);break;case 4:ur();break;case 31:t.memoizedState!==null&&se(t);break;case 13:se(t);break;case 19:Nt(yt);break;case 10:un(t.type);break;case 22:case 23:se(t),ou(),e!==null&&Nt(xa);break;case 24:un(wt)}}function es(e,t){try{var n=t.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var r=a.next;n=r;do{if((n.tag&e)===e){a=void 0;var i=n.create,s=n.inst;a=i(),s.destroy=a}n=n.next}while(n!==r)}}catch(l){et(t,t.return,l)}}function Wn(e,t,n){try{var a=t.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var i=r.next;a=i;do{if((a.tag&e)===e){var s=a.inst,l=s.destroy;if(l!==void 0){s.destroy=void 0,r=t;var o=n,c=l;try{c()}catch(d){et(r,o,d)}}}a=a.next}while(a!==i)}}catch(d){et(t,t.return,d)}}function dm(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{yg(t,n)}catch(a){et(e,e.return,a)}}}function um(e,t,n){n.props=Ta(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(a){et(e,t,a)}}function hi(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var a=e.stateNode;break;case 30:a=e.stateNode;break;default:a=e.stateNode}typeof n=="function"?e.refCleanup=n(a):n.current=a}}catch(r){et(e,t,r)}}function Be(e,t){var n=e.ref,a=e.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(r){et(e,t,r)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(r){et(e,t,r)}else n.current=null}function fm(e){var t=e.type,n=e.memoizedProps,a=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break t;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(r){et(e,e.return,r)}}function Xo(e,t,n){try{var a=e.stateNode;Rv(a,e.type,n,t),a[ne]=t}catch(r){et(e,e.return,r)}}function hm(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ea(e.type)||e.tag===4}function Po(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||hm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ea(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function nd(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=rn));else if(a!==4&&(a===27&&ea(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(nd(e,t,n),e=e.sibling;e!==null;)nd(e,t,n),e=e.sibling}function Al(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(a===27&&ea(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Al(e,t,n),e=e.sibling;e!==null;)Al(e,t,n),e=e.sibling}function pm(e){var t=e.stateNode,n=e.memoizedProps;try{for(var a=e.type,r=t.attributes;r.length;)t.removeAttributeNode(r[0]);Ht(t,a,n),t[Rt]=e,t[ne]=n}catch(i){et(e,e.return,i)}}var nn=!1,St=!1,Qo=!1,ih=typeof WeakSet=="function"?WeakSet:Set,Et=null;function pv(e,t){if(e=e.containerInfo,cd=Bl,e=eg(e),Jd(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else t:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var r=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break t}var s=0,l=-1,o=-1,c=0,d=0,u=e,h=null;e:for(;;){for(var f;u!==n||r!==0&&u.nodeType!==3||(l=s+r),u!==i||a!==0&&u.nodeType!==3||(o=s+a),u.nodeType===3&&(s+=u.nodeValue.length),(f=u.firstChild)!==null;)h=u,u=f;for(;;){if(u===e)break e;if(h===n&&++c===r&&(l=s),h===i&&++d===a&&(o=s),(f=u.nextSibling)!==null)break;u=h,h=u.parentNode}u=f}n=l===-1||o===-1?null:{start:l,end:o}}else n=null}n=n||{start:0,end:0}}else n=null;for(dd={focusedElem:e,selectionRange:n},Bl=!1,Et=t;Et!==null;)if(t=Et,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Et=e;else for(;Et!==null;){switch(t=Et,i=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)r=e[n],r.ref.impl=r.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&i!==null){e=void 0,n=t,r=i.memoizedProps,i=i.memoizedState,a=n.stateNode;try{var m=Ta(n.type,r);e=a.getSnapshotBeforeUpdate(m,i),a.__reactInternalSnapshotBeforeUpdate=e}catch(b){et(n,n.return,b)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)fd(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":fd(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(A(163))}if(e=t.sibling,e!==null){e.return=t.return,Et=e;break}Et=t.return}}function gm(e,t,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:Qe(e,n),a&4&&es(5,n);break;case 1:if(Qe(e,n),a&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(s){et(n,n.return,s)}else{var r=Ta(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(r,t,e.__reactInternalSnapshotBeforeUpdate)}catch(s){et(n,n.return,s)}}a&64&&dm(n),a&512&&hi(n,n.return);break;case 3:if(Qe(e,n),a&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{yg(e,t)}catch(s){et(n,n.return,s)}}break;case 27:t===null&&a&4&&pm(n);case 26:case 5:Qe(e,n),t===null&&a&4&&fm(n),a&512&&hi(n,n.return);break;case 12:Qe(e,n);break;case 31:Qe(e,n),a&4&&xm(e,n);break;case 13:Qe(e,n),a&4&&ym(e,n),a&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Sv.bind(null,n),Fv(e,n))));break;case 22:if(a=n.memoizedState!==null||nn,!a){t=t!==null&&t.memoizedState!==null||St,r=nn;var i=St;nn=a,(St=t)&&!i?We(e,n,(n.subtreeFlags&8772)!==0):Qe(e,n),nn=r,St=i}break;case 30:break;default:Qe(e,n)}}function mm(e){var t=e.alternate;t!==null&&(e.alternate=null,mm(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Pd(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var ht=null,It=!1;function Pe(e,t,n){for(n=n.child;n!==null;)bm(e,t,n),n=n.sibling}function bm(e,t,n){if(de&&typeof de.onCommitFiberUnmount=="function")try{de.onCommitFiberUnmount(Ki,n)}catch{}switch(n.tag){case 26:St||Be(n,t),Pe(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:St||Be(n,t);var a=ht,r=It;ea(n.type)&&(ht=n.stateNode,It=!1),Pe(e,t,n),bi(n.stateNode),ht=a,It=r;break;case 5:St||Be(n,t);case 6:if(a=ht,r=It,ht=null,Pe(e,t,n),ht=a,It=r,ht!==null)if(It)try{(ht.nodeType===9?ht.body:ht.nodeName==="HTML"?ht.ownerDocument.body:ht).removeChild(n.stateNode)}catch(i){et(n,t,i)}else try{ht.removeChild(n.stateNode)}catch(i){et(n,t,i)}break;case 18:ht!==null&&(It?(e=ht,xh(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),_r(e)):xh(ht,n.stateNode));break;case 4:a=ht,r=It,ht=n.stateNode.containerInfo,It=!0,Pe(e,t,n),ht=a,It=r;break;case 0:case 11:case 14:case 15:Wn(2,n,t),St||Wn(4,n,t),Pe(e,t,n);break;case 1:St||(Be(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"&&um(n,t,a)),Pe(e,t,n);break;case 21:Pe(e,t,n);break;case 22:St=(a=St)||n.memoizedState!==null,Pe(e,t,n),St=a;break;default:Pe(e,t,n)}}function xm(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{_r(e)}catch(n){et(t,t.return,n)}}}function ym(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{_r(e)}catch(n){et(t,t.return,n)}}function gv(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ih),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ih),t;default:throw Error(A(435,e.tag))}}function xs(e,t){var n=gv(e);t.forEach(function(a){if(!n.has(a)){n.add(a);var r=wv.bind(null,e,a);a.then(r,r)}})}function Kt(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var r=n[a],i=e,s=t,l=s;t:for(;l!==null;){switch(l.tag){case 27:if(ea(l.type)){ht=l.stateNode,It=!1;break t}break;case 5:ht=l.stateNode,It=!1;break t;case 3:case 4:ht=l.stateNode.containerInfo,It=!0;break t}l=l.return}if(ht===null)throw Error(A(160));bm(i,s,r),ht=null,It=!1,i=r.alternate,i!==null&&(i.return=null),r.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)vm(t,e),t=t.sibling}var De=null;function vm(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Kt(t,e),Zt(e),a&4&&(Wn(3,e,e.return),es(3,e),Wn(5,e,e.return));break;case 1:Kt(t,e),Zt(e),a&512&&(St||n===null||Be(n,n.return)),a&64&&nn&&(e=e.updateQueue,e!==null&&(a=e.callbacks,a!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var r=De;if(Kt(t,e),Zt(e),a&512&&(St||n===null||Be(n,n.return)),a&4){var i=n!==null?n.memoizedState:null;if(a=e.memoizedState,n===null)if(a===null)if(e.stateNode===null){t:{a=e.type,n=e.memoizedProps,r=r.ownerDocument||r;e:switch(a){case"title":i=r.getElementsByTagName("title")[0],(!i||i[Ii]||i[Rt]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=r.createElement(a),r.head.insertBefore(i,r.querySelector("head > title"))),Ht(i,a,n),i[Rt]=e,Ot(i),a=i;break t;case"link":var s=Mh("link","href",r).get(a+(n.href||""));if(s){for(var l=0;l<s.length;l++)if(i=s[l],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(l,1);break e}}i=r.createElement(a),Ht(i,a,n),r.head.appendChild(i);break;case"meta":if(s=Mh("meta","content",r).get(a+(n.content||""))){for(l=0;l<s.length;l++)if(i=s[l],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){s.splice(l,1);break e}}i=r.createElement(a),Ht(i,a,n),r.head.appendChild(i);break;default:throw Error(A(468,a))}i[Rt]=e,Ot(i),a=i}e.stateNode=a}else Ah(r,e.type,e.stateNode);else e.stateNode=wh(r,a,e.memoizedProps);else i!==a?(i===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):i.count--,a===null?Ah(r,e.type,e.stateNode):wh(r,a,e.memoizedProps)):a===null&&e.stateNode!==null&&Xo(e,e.memoizedProps,n.memoizedProps)}break;case 27:Kt(t,e),Zt(e),a&512&&(St||n===null||Be(n,n.return)),n!==null&&a&4&&Xo(e,e.memoizedProps,n.memoizedProps);break;case 5:if(Kt(t,e),Zt(e),a&512&&(St||n===null||Be(n,n.return)),e.flags&32){r=e.stateNode;try{hr(r,"")}catch(m){et(e,e.return,m)}}a&4&&e.stateNode!=null&&(r=e.memoizedProps,Xo(e,r,n!==null?n.memoizedProps:r)),a&1024&&(Qo=!0);break;case 6:if(Kt(t,e),Zt(e),a&4){if(e.stateNode===null)throw Error(A(162));a=e.memoizedProps,n=e.stateNode;try{n.nodeValue=a}catch(m){et(e,e.return,m)}}break;case 3:if(Js=null,r=De,De=jl(t.containerInfo),Kt(t,e),De=r,Zt(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{_r(t.containerInfo)}catch(m){et(e,e.return,m)}Qo&&(Qo=!1,_m(e));break;case 4:a=De,De=jl(e.stateNode.containerInfo),Kt(t,e),Zt(e),De=a;break;case 12:Kt(t,e),Zt(e);break;case 31:Kt(t,e),Zt(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,xs(e,a)));break;case 13:Kt(t,e),Zt(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(lo=ce()),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,xs(e,a)));break;case 22:r=e.memoizedState!==null;var o=n!==null&&n.memoizedState!==null,c=nn,d=St;if(nn=c||r,St=d||o,Kt(t,e),St=d,nn=c,Zt(e),a&8192)t:for(t=e.stateNode,t._visibility=r?t._visibility&-2:t._visibility|1,r&&(n===null||o||nn||St||fa(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){o=n=t;try{if(i=o.stateNode,r)s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none";else{l=o.stateNode;var u=o.memoizedProps.style,h=u!=null&&u.hasOwnProperty("display")?u.display:null;l.style.display=h==null||typeof h=="boolean"?"":(""+h).trim()}}catch(m){et(o,o.return,m)}}}else if(t.tag===6){if(n===null){o=t;try{o.stateNode.nodeValue=r?"":o.memoizedProps}catch(m){et(o,o.return,m)}}}else if(t.tag===18){if(n===null){o=t;try{var f=o.stateNode;r?yh(f,!0):yh(o.stateNode,!1)}catch(m){et(o,o.return,m)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}a&4&&(a=e.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,xs(e,n))));break;case 19:Kt(t,e),Zt(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,xs(e,a)));break;case 30:break;case 21:break;default:Kt(t,e),Zt(e)}}function Zt(e){var t=e.flags;if(t&2){try{for(var n,a=e.return;a!==null;){if(hm(a)){n=a;break}a=a.return}if(n==null)throw Error(A(160));switch(n.tag){case 27:var r=n.stateNode,i=Po(e);Al(e,i,r);break;case 5:var s=n.stateNode;n.flags&32&&(hr(s,""),n.flags&=-33);var l=Po(e);Al(e,l,s);break;case 3:case 4:var o=n.stateNode.containerInfo,c=Po(e);nd(e,c,o);break;default:throw Error(A(161))}}catch(d){et(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function _m(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;_m(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Qe(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)gm(e,t.alternate,t),t=t.sibling}function fa(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Wn(4,t,t.return),fa(t);break;case 1:Be(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&um(t,t.return,n),fa(t);break;case 27:bi(t.stateNode);case 26:case 5:Be(t,t.return),fa(t);break;case 22:t.memoizedState===null&&fa(t);break;case 30:fa(t);break;default:fa(t)}e=e.sibling}}function We(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var a=t.alternate,r=e,i=t,s=i.flags;switch(i.tag){case 0:case 11:case 15:We(r,i,n),es(4,i);break;case 1:if(We(r,i,n),a=i,r=a.stateNode,typeof r.componentDidMount=="function")try{r.componentDidMount()}catch(c){et(a,a.return,c)}if(a=i,r=a.updateQueue,r!==null){var l=a.stateNode;try{var o=r.shared.hiddenCallbacks;if(o!==null)for(r.shared.hiddenCallbacks=null,r=0;r<o.length;r++)xg(o[r],l)}catch(c){et(a,a.return,c)}}n&&s&64&&dm(i),hi(i,i.return);break;case 27:pm(i);case 26:case 5:We(r,i,n),n&&a===null&&s&4&&fm(i),hi(i,i.return);break;case 12:We(r,i,n);break;case 31:We(r,i,n),n&&s&4&&xm(r,i);break;case 13:We(r,i,n),n&&s&4&&ym(r,i);break;case 22:i.memoizedState===null&&We(r,i,n),hi(i,i.return);break;case 30:break;default:We(r,i,n)}t=t.sibling}}function wu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&$i(n))}function Mu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&$i(e))}function Te(e,t,n,a){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)km(e,t,n,a),t=t.sibling}function km(e,t,n,a){var r=t.flags;switch(t.tag){case 0:case 11:case 15:Te(e,t,n,a),r&2048&&es(9,t);break;case 1:Te(e,t,n,a);break;case 3:Te(e,t,n,a),r&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&$i(e)));break;case 12:if(r&2048){Te(e,t,n,a),e=t.stateNode;try{var i=t.memoizedProps,s=i.id,l=i.onPostCommit;typeof l=="function"&&l(s,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(o){et(t,t.return,o)}}else Te(e,t,n,a);break;case 31:Te(e,t,n,a);break;case 13:Te(e,t,n,a);break;case 23:break;case 22:i=t.stateNode,s=t.alternate,t.memoizedState!==null?i._visibility&2?Te(e,t,n,a):pi(e,t):i._visibility&2?Te(e,t,n,a):(i._visibility|=2,Ga(e,t,n,a,(t.subtreeFlags&10256)!==0||!1)),r&2048&&wu(s,t);break;case 24:Te(e,t,n,a),r&2048&&Mu(t.alternate,t);break;default:Te(e,t,n,a)}}function Ga(e,t,n,a,r){for(r=r&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var i=e,s=t,l=n,o=a,c=s.flags;switch(s.tag){case 0:case 11:case 15:Ga(i,s,l,o,r),es(8,s);break;case 23:break;case 22:var d=s.stateNode;s.memoizedState!==null?d._visibility&2?Ga(i,s,l,o,r):pi(i,s):(d._visibility|=2,Ga(i,s,l,o,r)),r&&c&2048&&wu(s.alternate,s);break;case 24:Ga(i,s,l,o,r),r&&c&2048&&Mu(s.alternate,s);break;default:Ga(i,s,l,o,r)}t=t.sibling}}function pi(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,a=t,r=a.flags;switch(a.tag){case 22:pi(n,a),r&2048&&wu(a.alternate,a);break;case 24:pi(n,a),r&2048&&Mu(a.alternate,a);break;default:pi(n,a)}t=t.sibling}}var Ir=8192;function Ba(e,t,n){if(e.subtreeFlags&Ir)for(e=e.child;e!==null;)Sm(e,t,n),e=e.sibling}function Sm(e,t,n){switch(e.tag){case 26:Ba(e,t,n),e.flags&Ir&&e.memoizedState!==null&&e2(n,De,e.memoizedState,e.memoizedProps);break;case 5:Ba(e,t,n);break;case 3:case 4:var a=De;De=jl(e.stateNode.containerInfo),Ba(e,t,n),De=a;break;case 22:e.memoizedState===null&&(a=e.alternate,a!==null&&a.memoizedState!==null?(a=Ir,Ir=16777216,Ba(e,t,n),Ir=a):Ba(e,t,n));break;default:Ba(e,t,n)}}function wm(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Vr(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];Et=a,Am(a,e)}wm(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Mm(e),e=e.sibling}function Mm(e){switch(e.tag){case 0:case 11:case 15:Vr(e),e.flags&2048&&Wn(9,e,e.return);break;case 3:Vr(e);break;case 12:Vr(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ws(e)):Vr(e);break;default:Vr(e)}}function Ws(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];Et=a,Am(a,e)}wm(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Wn(8,t,t.return),Ws(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ws(t));break;default:Ws(t)}e=e.sibling}}function Am(e,t){for(;Et!==null;){var n=Et;switch(n.tag){case 0:case 11:case 15:Wn(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:$i(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Et=a;else t:for(n=e;Et!==null;){a=Et;var r=a.sibling,i=a.return;if(mm(a),a===n){Et=null;break t}if(r!==null){r.return=i,Et=r;break t}Et=i}}}var mv={getCacheForType:function(e){var t=Bt(wt),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Bt(wt).controller.signal}},bv=typeof WeakMap=="function"?WeakMap:Map,W=0,rt=null,G=null,q=0,$=0,ie=null,En=!1,Or=!1,Au=!1,bn=0,bt=0,In=0,va=0,Tu=0,oe=0,br=0,gi=null,Jt=null,ad=!1,lo=0,Tm=0,Tl=1/0,Dl=null,Gn=null,Tt=0,Fn=null,xr=null,fn=0,rd=0,id=null,Dm=null,mi=0,sd=null;function fe(){return W&2&&q!==0?q&-q:R.T!==null?Cu():Bp()}function Cm(){if(oe===0)if(!(q&536870912)||P){var e=ds;ds<<=1,!(ds&3932160)&&(ds=262144),oe=e}else oe=536870912;return e=pe.current,e!==null&&(e.flags|=32),oe}function ee(e,t,n){(e===rt&&($===2||$===9)||e.cancelPendingCommit!==null)&&(yr(e,0),On(e,q,oe,!1)),Wi(e,n),(!(W&2)||e!==rt)&&(e===rt&&(!(W&2)&&(va|=n),bt===4&&On(e,q,oe,!1)),Ye(e))}function Em(e,t,n){if(W&6)throw Error(A(327));var a=!n&&(t&127)===0&&(t&e.expiredLanes)===0||Zi(e,t),r=a?vv(e,t):Ko(e,t,!0),i=a;do{if(r===0){Or&&!a&&On(e,t,0,!1);break}else{if(n=e.current.alternate,i&&!xv(n)){r=Ko(e,t,!1),i=!1;continue}if(r===2){if(i=t,e.errorRecoveryDisabledLanes&i)var s=0;else s=e.pendingLanes&-536870913,s=s!==0?s:s&536870912?536870912:0;if(s!==0){t=s;t:{var l=e;r=gi;var o=l.current.memoizedState.isDehydrated;if(o&&(yr(l,s).flags|=256),s=Ko(l,s,!1),s!==2){if(Au&&!o){l.errorRecoveryDisabledLanes|=i,va|=i,r=4;break t}i=Jt,Jt=r,i!==null&&(Jt===null?Jt=i:Jt.push.apply(Jt,i))}r=s}if(i=!1,r!==2)continue}}if(r===1){yr(e,0),On(e,t,0,!0);break}t:{switch(a=e,i=r,i){case 0:case 1:throw Error(A(345));case 4:if((t&4194048)!==t)break;case 6:On(a,t,oe,!En);break t;case 2:Jt=null;break;case 3:case 5:break;default:throw Error(A(329))}if((t&62914560)===t&&(r=lo+300-ce(),10<r)){if(On(a,t,oe,!En),Wl(a,0,!0)!==0)break t;fn=t,a.timeoutHandle=Wm(sh.bind(null,a,n,Jt,Dl,ad,t,oe,va,br,En,i,"Throttled",-0,0),r);break t}sh(a,n,Jt,Dl,ad,t,oe,va,br,En,i,null,-0,0)}}break}while(!0);Ye(e)}function sh(e,t,n,a,r,i,s,l,o,c,d,u,h,f){if(e.timeoutHandle=-1,u=t.subtreeFlags,u&8192||(u&16785408)===16785408){u={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:rn},Sm(t,i,u);var m=(i&62914560)===i?lo-ce():(i&4194048)===i?Tm-ce():0;if(m=n2(u,m),m!==null){fn=i,e.cancelPendingCommit=m(oh.bind(null,e,t,i,n,a,r,s,l,o,d,u,null,h,f)),On(e,i,s,!c);return}}oh(e,t,i,n,a,r,s,l,o)}function xv(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var r=n[a],i=r.getSnapshot;r=r.value;try{if(!he(i(),r))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function On(e,t,n,a){t&=~Tu,t&=~va,e.suspendedLanes|=t,e.pingedLanes&=~t,a&&(e.warmLanes|=t),a=e.expirationTimes;for(var r=t;0<r;){var i=31-ue(r),s=1<<i;a[i]=-1,r&=~s}n!==0&&jp(e,n,t)}function oo(){return W&6?!0:(ns(0),!1)}function Du(){if(G!==null){if($===0)var e=G.return;else e=G,sn=ja=null,hu(e),lr=null,Ei=0,e=G;for(;e!==null;)cm(e.alternate,e),e=e.return;G=null}}function yr(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,Hv(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),fn=0,Du(),rt=e,G=n=dn(e.current,null),q=t,$=0,ie=null,En=!1,Or=Zi(e,t),Au=!1,br=oe=Tu=va=In=bt=0,Jt=gi=null,ad=!1,t&8&&(t|=t&32);var a=e.entangledLanes;if(a!==0)for(e=e.entanglements,a&=t;0<a;){var r=31-ue(a),i=1<<r;t|=e[r],a&=~i}return bn=t,to(),n}function Om(e,t){V=null,R.H=zi,t===Er||t===no?(t=Hf(),$=3):t===su?(t=Hf(),$=4):$=t===ku?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,ie=t,G===null&&(bt=1,wl(e,_e(t,e.current)))}function zm(){var e=pe.current;return e===null?!0:(q&4194048)===q?Se===null:(q&62914560)===q||q&536870912?e===Se:!1}function Nm(){var e=R.H;return R.H=zi,e===null?zi:e}function jm(){var e=R.A;return R.A=mv,e}function Cl(){bt=4,En||(q&4194048)!==q&&pe.current!==null||(Or=!0),!(In&134217727)&&!(va&134217727)||rt===null||On(rt,q,oe,!1)}function Ko(e,t,n){var a=W;W|=2;var r=Nm(),i=jm();(rt!==e||q!==t)&&(Dl=null,yr(e,t)),t=!1;var s=bt;t:do try{if($!==0&&G!==null){var l=G,o=ie;switch($){case 8:Du(),s=6;break t;case 3:case 2:case 9:case 6:pe.current===null&&(t=!0);var c=$;if($=0,ie=null,er(e,l,o,c),n&&Or){s=0;break t}break;default:c=$,$=0,ie=null,er(e,l,o,c)}}yv(),s=bt;break}catch(d){Om(e,d)}while(!0);return t&&e.shellSuspendCounter++,sn=ja=null,W=a,R.H=r,R.A=i,G===null&&(rt=null,q=0,to()),s}function yv(){for(;G!==null;)Rm(G)}function vv(e,t){var n=W;W|=2;var a=Nm(),r=jm();rt!==e||q!==t?(Dl=null,Tl=ce()+500,yr(e,t)):Or=Zi(e,t);t:do try{if($!==0&&G!==null){t=G;var i=ie;e:switch($){case 1:$=0,ie=null,er(e,t,i,1);break;case 2:case 9:if(Bf(i)){$=0,ie=null,lh(t);break}t=function(){$!==2&&$!==9||rt!==e||($=7),Ye(e)},i.then(t,t);break t;case 3:$=7;break t;case 4:$=5;break t;case 7:Bf(i)?($=0,ie=null,lh(t)):($=0,ie=null,er(e,t,i,7));break;case 5:var s=null;switch(G.tag){case 26:s=G.memoizedState;case 5:case 27:var l=G;if(s?eb(s):l.stateNode.complete){$=0,ie=null;var o=l.sibling;if(o!==null)G=o;else{var c=l.return;c!==null?(G=c,co(c)):G=null}break e}}$=0,ie=null,er(e,t,i,5);break;case 6:$=0,ie=null,er(e,t,i,6);break;case 8:Du(),bt=6;break t;default:throw Error(A(462))}}_v();break}catch(d){Om(e,d)}while(!0);return sn=ja=null,R.H=a,R.A=r,W=n,G!==null?0:(rt=null,q=0,to(),bt)}function _v(){for(;G!==null&&!qx();)Rm(G)}function Rm(e){var t=om(e.alternate,e,bn);e.memoizedProps=e.pendingProps,t===null?co(e):G=t}function lh(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=th(n,t,t.pendingProps,t.type,void 0,q);break;case 11:t=th(n,t,t.pendingProps,t.type.render,t.ref,q);break;case 5:hu(t);default:cm(n,t),t=G=cg(t,bn),t=om(n,t,bn)}e.memoizedProps=e.pendingProps,t===null?co(e):G=t}function er(e,t,n,a){sn=ja=null,hu(t),lr=null,Ei=0;var r=t.return;try{if(cv(e,r,t,n,q)){bt=1,wl(e,_e(n,e.current)),G=null;return}}catch(i){if(r!==null)throw G=r,i;bt=1,wl(e,_e(n,e.current)),G=null;return}t.flags&32768?(P||a===1?e=!0:Or||q&536870912?e=!1:(En=e=!0,(a===2||a===9||a===3||a===6)&&(a=pe.current,a!==null&&a.tag===13&&(a.flags|=16384))),Lm(t,e)):co(t)}function co(e){var t=e;do{if(t.flags&32768){Lm(t,En);return}e=t.return;var n=fv(t.alternate,t,bn);if(n!==null){G=n;return}if(t=t.sibling,t!==null){G=t;return}G=t=e}while(t!==null);bt===0&&(bt=5)}function Lm(e,t){do{var n=hv(e.alternate,e);if(n!==null){n.flags&=32767,G=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){G=e;return}G=e=n}while(e!==null);bt=6,G=null}function oh(e,t,n,a,r,i,s,l,o){e.cancelPendingCommit=null;do uo();while(Tt!==0);if(W&6)throw Error(A(327));if(t!==null){if(t===e.current)throw Error(A(177));if(i=t.lanes|t.childLanes,i|=$d,ty(e,n,i,s,l,o),e===rt&&(G=rt=null,q=0),xr=t,Fn=e,fn=n,rd=i,id=r,Dm=a,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Mv(hl,function(){return Ym(),null})):(e.callbackNode=null,e.callbackPriority=0),a=(t.flags&13878)!==0,t.subtreeFlags&13878||a){a=R.T,R.T=null,r=I.p,I.p=2,s=W,W|=4;try{pv(e,t,n)}finally{W=s,I.p=r,R.T=a}}Tt=1,Bm(),Hm(),Vm()}}function Bm(){if(Tt===1){Tt=0;var e=Fn,t=xr,n=(t.flags&13878)!==0;if(t.subtreeFlags&13878||n){n=R.T,R.T=null;var a=I.p;I.p=2;var r=W;W|=4;try{vm(t,e);var i=dd,s=eg(e.containerInfo),l=i.focusedElem,o=i.selectionRange;if(s!==l&&l&&l.ownerDocument&&tg(l.ownerDocument.documentElement,l)){if(o!==null&&Jd(l)){var c=o.start,d=o.end;if(d===void 0&&(d=c),"selectionStart"in l)l.selectionStart=c,l.selectionEnd=Math.min(d,l.value.length);else{var u=l.ownerDocument||document,h=u&&u.defaultView||window;if(h.getSelection){var f=h.getSelection(),m=l.textContent.length,b=Math.min(o.start,m),y=o.end===void 0?b:Math.min(o.end,m);!f.extend&&b>y&&(s=y,y=b,b=s);var p=Ef(l,b),g=Ef(l,y);if(p&&g&&(f.rangeCount!==1||f.anchorNode!==p.node||f.anchorOffset!==p.offset||f.focusNode!==g.node||f.focusOffset!==g.offset)){var x=u.createRange();x.setStart(p.node,p.offset),f.removeAllRanges(),b>y?(f.addRange(x),f.extend(g.node,g.offset)):(x.setEnd(g.node,g.offset),f.addRange(x))}}}}for(u=[],f=l;f=f.parentNode;)f.nodeType===1&&u.push({element:f,left:f.scrollLeft,top:f.scrollTop});for(typeof l.focus=="function"&&l.focus(),l=0;l<u.length;l++){var v=u[l];v.element.scrollLeft=v.left,v.element.scrollTop=v.top}}Bl=!!cd,dd=cd=null}finally{W=r,I.p=a,R.T=n}}e.current=t,Tt=2}}function Hm(){if(Tt===2){Tt=0;var e=Fn,t=xr,n=(t.flags&8772)!==0;if(t.subtreeFlags&8772||n){n=R.T,R.T=null;var a=I.p;I.p=2;var r=W;W|=4;try{gm(e,t.alternate,t)}finally{W=r,I.p=a,R.T=n}}Tt=3}}function Vm(){if(Tt===4||Tt===3){Tt=0,Xx();var e=Fn,t=xr,n=fn,a=Dm;t.subtreeFlags&10256||t.flags&10256?Tt=5:(Tt=0,xr=Fn=null,Um(e,e.pendingLanes));var r=e.pendingLanes;if(r===0&&(Gn=null),Xd(n),t=t.stateNode,de&&typeof de.onCommitFiberRoot=="function")try{de.onCommitFiberRoot(Ki,t,void 0,(t.current.flags&128)===128)}catch{}if(a!==null){t=R.T,r=I.p,I.p=2,R.T=null;try{for(var i=e.onRecoverableError,s=0;s<a.length;s++){var l=a[s];i(l.value,{componentStack:l.stack})}}finally{R.T=t,I.p=r}}fn&3&&uo(),Ye(e),r=e.pendingLanes,n&261930&&r&42?e===sd?mi++:(mi=0,sd=e):mi=0,ns(0)}}function Um(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,$i(t)))}function uo(){return Bm(),Hm(),Vm(),Ym()}function Ym(){if(Tt!==5)return!1;var e=Fn,t=rd;rd=0;var n=Xd(fn),a=R.T,r=I.p;try{I.p=32>n?32:n,R.T=null,n=id,id=null;var i=Fn,s=fn;if(Tt=0,xr=Fn=null,fn=0,W&6)throw Error(A(331));var l=W;if(W|=4,Mm(i.current),km(i,i.current,s,n),W=l,ns(0,!1),de&&typeof de.onPostCommitFiberRoot=="function")try{de.onPostCommitFiberRoot(Ki,i)}catch{}return!0}finally{I.p=r,R.T=a,Um(e,t)}}function ch(e,t,n){t=_e(n,t),t=$c(e.stateNode,t,2),e=Yn(e,t,2),e!==null&&(Wi(e,2),Ye(e))}function et(e,t,n){if(e.tag===3)ch(e,e,n);else for(;t!==null;){if(t.tag===3){ch(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(Gn===null||!Gn.has(a))){e=_e(n,e),n=nm(2),a=Yn(t,n,2),a!==null&&(am(n,a,t,e),Wi(a,2),Ye(a));break}}t=t.return}}function Zo(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new bv;var r=new Set;a.set(t,r)}else r=a.get(t),r===void 0&&(r=new Set,a.set(t,r));r.has(n)||(Au=!0,r.add(n),e=kv.bind(null,e,t,n),t.then(e,e))}function kv(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,rt===e&&(q&n)===n&&(bt===4||bt===3&&(q&62914560)===q&&300>ce()-lo?!(W&2)&&yr(e,0):Tu|=n,br===q&&(br=0)),Ye(e)}function Gm(e,t){t===0&&(t=Np()),e=Na(e,t),e!==null&&(Wi(e,t),Ye(e))}function Sv(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Gm(e,n)}function wv(e,t){var n=0;switch(e.tag){case 31:case 13:var a=e.stateNode,r=e.memoizedState;r!==null&&(n=r.retryLane);break;case 19:a=e.stateNode;break;case 22:a=e.stateNode._retryCache;break;default:throw Error(A(314))}a!==null&&a.delete(t),Gm(e,n)}function Mv(e,t){return Fd(e,t)}var El=null,Fa=null,ld=!1,Ol=!1,Wo=!1,zn=0;function Ye(e){e!==Fa&&e.next===null&&(Fa===null?El=Fa=e:Fa=Fa.next=e),Ol=!0,ld||(ld=!0,Tv())}function ns(e,t){if(!Wo&&Ol){Wo=!0;do for(var n=!1,a=El;a!==null;){if(e!==0){var r=a.pendingLanes;if(r===0)var i=0;else{var s=a.suspendedLanes,l=a.pingedLanes;i=(1<<31-ue(42|e)+1)-1,i&=r&~(s&~l),i=i&201326741?i&201326741|1:i?i|2:0}i!==0&&(n=!0,dh(a,i))}else i=q,i=Wl(a,a===rt?i:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),!(i&3)||Zi(a,i)||(n=!0,dh(a,i));a=a.next}while(n);Wo=!1}}function Av(){Fm()}function Fm(){Ol=ld=!1;var e=0;zn!==0&&Bv()&&(e=zn);for(var t=ce(),n=null,a=El;a!==null;){var r=a.next,i=qm(a,t);i===0?(a.next=null,n===null?El=r:n.next=r,r===null&&(Fa=n)):(n=a,(e!==0||i&3)&&(Ol=!0)),a=r}Tt!==0&&Tt!==5||ns(e),zn!==0&&(zn=0)}function qm(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,r=e.expirationTimes,i=e.pendingLanes&-62914561;0<i;){var s=31-ue(i),l=1<<s,o=r[s];o===-1?(!(l&n)||l&a)&&(r[s]=$x(l,t)):o<=t&&(e.expiredLanes|=l),i&=~l}if(t=rt,n=q,n=Wl(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a=e.callbackNode,n===0||e===t&&($===2||$===9)||e.cancelPendingCommit!==null)return a!==null&&a!==null&&wo(a),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Zi(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(a!==null&&wo(a),Xd(n)){case 2:case 8:n=Op;break;case 32:n=hl;break;case 268435456:n=zp;break;default:n=hl}return a=Xm.bind(null,e),n=Fd(n,a),e.callbackPriority=t,e.callbackNode=n,t}return a!==null&&a!==null&&wo(a),e.callbackPriority=2,e.callbackNode=null,2}function Xm(e,t){if(Tt!==0&&Tt!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(uo()&&e.callbackNode!==n)return null;var a=q;return a=Wl(e,e===rt?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a===0?null:(Em(e,a,t),qm(e,ce()),e.callbackNode!=null&&e.callbackNode===n?Xm.bind(null,e):null)}function dh(e,t){if(uo())return null;Em(e,t,!0)}function Tv(){Vv(function(){W&6?Fd(Ep,Av):Fm()})}function Cu(){if(zn===0){var e=pr;e===0&&(e=cs,cs<<=1,!(cs&261888)&&(cs=256)),zn=e}return zn}function uh(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ys(""+e)}function fh(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function Dv(e,t,n,a,r){if(t==="submit"&&n&&n.stateNode===r){var i=uh((r[ne]||null).action),s=a.submitter;s&&(t=(t=s[ne]||null)?uh(t.formAction):s.getAttribute("formAction"),t!==null&&(i=t,s=null));var l=new Il("action","action",null,a,r);e.push({event:l,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(zn!==0){var o=s?fh(r,s):new FormData(r);Ic(n,{pending:!0,data:o,method:r.method,action:i},null,o)}}else typeof i=="function"&&(l.preventDefault(),o=s?fh(r,s):new FormData(r),Ic(n,{pending:!0,data:o,method:r.method,action:i},i,o))},currentTarget:r}]})}}for(var Io=0;Io<Vc.length;Io++){var Jo=Vc[Io],Cv=Jo.toLowerCase(),Ev=Jo[0].toUpperCase()+Jo.slice(1);Oe(Cv,"on"+Ev)}Oe(ag,"onAnimationEnd");Oe(rg,"onAnimationIteration");Oe(ig,"onAnimationStart");Oe("dblclick","onDoubleClick");Oe("focusin","onFocus");Oe("focusout","onBlur");Oe(Py,"onTransitionRun");Oe(Qy,"onTransitionStart");Oe(Ky,"onTransitionCancel");Oe(sg,"onTransitionEnd");fr("onMouseEnter",["mouseout","mouseover"]);fr("onMouseLeave",["mouseout","mouseover"]);fr("onPointerEnter",["pointerout","pointerover"]);fr("onPointerLeave",["pointerout","pointerover"]);Ea("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ea("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ea("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ea("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ea("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ea("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ni="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Ov=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ni));function Pm(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],r=a.event;a=a.listeners;t:{var i=void 0;if(t)for(var s=a.length-1;0<=s;s--){var l=a[s],o=l.instance,c=l.currentTarget;if(l=l.listener,o!==i&&r.isPropagationStopped())break t;i=l,r.currentTarget=c;try{i(r)}catch(d){gl(d)}r.currentTarget=null,i=o}else for(s=0;s<a.length;s++){if(l=a[s],o=l.instance,c=l.currentTarget,l=l.listener,o!==i&&r.isPropagationStopped())break t;i=l,r.currentTarget=c;try{i(r)}catch(d){gl(d)}r.currentTarget=null,i=o}}}}function Y(e,t){var n=t[Oc];n===void 0&&(n=t[Oc]=new Set);var a=e+"__bubble";n.has(a)||(Qm(t,e,2,!1),n.add(a))}function $o(e,t,n){var a=0;t&&(a|=4),Qm(n,e,a,t)}var ys="_reactListening"+Math.random().toString(36).slice(2);function Eu(e){if(!e[ys]){e[ys]=!0,Hp.forEach(function(n){n!=="selectionchange"&&(Ov.has(n)||$o(n,!1,e),$o(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ys]||(t[ys]=!0,$o("selectionchange",!1,t))}}function Qm(e,t,n,a){switch(sb(t)){case 2:var r=i2;break;case 8:r=s2;break;default:r=ju}n=r.bind(null,t,n,e),r=void 0,!Lc||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(r=!0),a?r!==void 0?e.addEventListener(t,n,{capture:!0,passive:r}):e.addEventListener(t,n,!0):r!==void 0?e.addEventListener(t,n,{passive:r}):e.addEventListener(t,n,!1)}function tc(e,t,n,a,r){var i=a;if(!(t&1)&&!(t&2)&&a!==null)t:for(;;){if(a===null)return;var s=a.tag;if(s===3||s===4){var l=a.stateNode.containerInfo;if(l===r)break;if(s===4)for(s=a.return;s!==null;){var o=s.tag;if((o===3||o===4)&&s.stateNode.containerInfo===r)return;s=s.return}for(;l!==null;){if(s=Pa(l),s===null)return;if(o=s.tag,o===5||o===6||o===26||o===27){a=i=s;continue t}l=l.parentNode}}a=a.return}Pp(function(){var c=i,d=Kd(n),u=[];t:{var h=lg.get(e);if(h!==void 0){var f=Il,m=e;switch(e){case"keypress":if(Fs(n)===0)break t;case"keydown":case"keyup":f=wy;break;case"focusin":m="focus",f=Co;break;case"focusout":m="blur",f=Co;break;case"beforeblur":case"afterblur":f=Co;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":f=vf;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":f=fy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":f=Ty;break;case ag:case rg:case ig:f=gy;break;case sg:f=Cy;break;case"scroll":case"scrollend":f=dy;break;case"wheel":f=Oy;break;case"copy":case"cut":case"paste":f=by;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":f=kf;break;case"toggle":case"beforetoggle":f=Ny}var b=(t&4)!==0,y=!b&&(e==="scroll"||e==="scrollend"),p=b?h!==null?h+"Capture":null:h;b=[];for(var g=c,x;g!==null;){var v=g;if(x=v.stateNode,v=v.tag,v!==5&&v!==26&&v!==27||x===null||p===null||(v=Mi(g,p),v!=null&&b.push(ji(g,v,x))),y)break;g=g.return}0<b.length&&(h=new f(h,m,null,n,d),u.push({event:h,listeners:b}))}}if(!(t&7)){t:{if(h=e==="mouseover"||e==="pointerover",f=e==="mouseout"||e==="pointerout",h&&n!==Rc&&(m=n.relatedTarget||n.fromElement)&&(Pa(m)||m[Tr]))break t;if((f||h)&&(h=d.window===d?d:(h=d.ownerDocument)?h.defaultView||h.parentWindow:window,f?(m=n.relatedTarget||n.toElement,f=c,m=m?Pa(m):null,m!==null&&(y=Qi(m),b=m.tag,m!==y||b!==5&&b!==27&&b!==6)&&(m=null)):(f=null,m=c),f!==m)){if(b=vf,v="onMouseLeave",p="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(b=kf,v="onPointerLeave",p="onPointerEnter",g="pointer"),y=f==null?h:Zr(f),x=m==null?h:Zr(m),h=new b(v,g+"leave",f,n,d),h.target=y,h.relatedTarget=x,v=null,Pa(d)===c&&(b=new b(p,g+"enter",m,n,d),b.target=x,b.relatedTarget=y,v=b),y=v,f&&m)e:{for(b=zv,p=f,g=m,x=0,v=p;v;v=b(v))x++;v=0;for(var k=g;k;k=b(k))v++;for(;0<x-v;)p=b(p),x--;for(;0<v-x;)g=b(g),v--;for(;x--;){if(p===g||g!==null&&p===g.alternate){b=p;break e}p=b(p),g=b(g)}b=null}else b=null;f!==null&&hh(u,h,f,b,!1),m!==null&&y!==null&&hh(u,y,m,b,!0)}}t:{if(h=c?Zr(c):window,f=h.nodeName&&h.nodeName.toLowerCase(),f==="select"||f==="input"&&h.type==="file")var S=Af;else if(Mf(h))if(Jp)S=Fy;else{S=Yy;var w=Uy}else f=h.nodeName,!f||f.toLowerCase()!=="input"||h.type!=="checkbox"&&h.type!=="radio"?c&&Qd(c.elementType)&&(S=Af):S=Gy;if(S&&(S=S(e,c))){Ip(u,S,n,d);break t}w&&w(e,h,c),e==="focusout"&&c&&h.type==="number"&&c.memoizedProps.value!=null&&jc(h,"number",h.value)}switch(w=c?Zr(c):window,e){case"focusin":(Mf(w)||w.contentEditable==="true")&&(Za=w,Bc=c,li=null);break;case"focusout":li=Bc=Za=null;break;case"mousedown":Hc=!0;break;case"contextmenu":case"mouseup":case"dragend":Hc=!1,Of(u,n,d);break;case"selectionchange":if(Xy)break;case"keydown":case"keyup":Of(u,n,d)}var M;if(Id)t:{switch(e){case"compositionstart":var T="onCompositionStart";break t;case"compositionend":T="onCompositionEnd";break t;case"compositionupdate":T="onCompositionUpdate";break t}T=void 0}else Ka?Zp(e,n)&&(T="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(T="onCompositionStart");T&&(Kp&&n.locale!=="ko"&&(Ka||T!=="onCompositionStart"?T==="onCompositionEnd"&&Ka&&(M=Qp()):(Cn=d,Zd="value"in Cn?Cn.value:Cn.textContent,Ka=!0)),w=zl(c,T),0<w.length&&(T=new _f(T,e,null,n,d),u.push({event:T,listeners:w}),M?T.data=M:(M=Wp(n),M!==null&&(T.data=M)))),(M=Ry?Ly(e,n):By(e,n))&&(T=zl(c,"onBeforeInput"),0<T.length&&(w=new _f("onBeforeInput","beforeinput",null,n,d),u.push({event:w,listeners:T}),w.data=M)),Dv(u,e,c,n,d)}Pm(u,t)})}function ji(e,t,n){return{instance:e,listener:t,currentTarget:n}}function zl(e,t){for(var n=t+"Capture",a=[];e!==null;){var r=e,i=r.stateNode;if(r=r.tag,r!==5&&r!==26&&r!==27||i===null||(r=Mi(e,n),r!=null&&a.unshift(ji(e,r,i)),r=Mi(e,t),r!=null&&a.push(ji(e,r,i))),e.tag===3)return a;e=e.return}return[]}function zv(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function hh(e,t,n,a,r){for(var i=t._reactName,s=[];n!==null&&n!==a;){var l=n,o=l.alternate,c=l.stateNode;if(l=l.tag,o!==null&&o===a)break;l!==5&&l!==26&&l!==27||c===null||(o=c,r?(c=Mi(n,i),c!=null&&s.unshift(ji(n,c,o))):r||(c=Mi(n,i),c!=null&&s.push(ji(n,c,o)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var Nv=/\r\n?/g,jv=/\u0000|\uFFFD/g;function ph(e){return(typeof e=="string"?e:""+e).replace(Nv,`
`).replace(jv,"")}function Km(e,t){return t=ph(t),ph(e)===t}function nt(e,t,n,a,r,i){switch(n){case"children":typeof a=="string"?t==="body"||t==="textarea"&&a===""||hr(e,a):(typeof a=="number"||typeof a=="bigint")&&t!=="body"&&hr(e,""+a);break;case"className":fs(e,"class",a);break;case"tabIndex":fs(e,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":fs(e,n,a);break;case"style":Xp(e,a,i);break;case"data":if(t!=="object"){fs(e,"data",a);break}case"src":case"href":if(a===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=Ys(""+a),e.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof i=="function"&&(n==="formAction"?(t!=="input"&&nt(e,t,"name",r.name,r,null),nt(e,t,"formEncType",r.formEncType,r,null),nt(e,t,"formMethod",r.formMethod,r,null),nt(e,t,"formTarget",r.formTarget,r,null)):(nt(e,t,"encType",r.encType,r,null),nt(e,t,"method",r.method,r,null),nt(e,t,"target",r.target,r,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=Ys(""+a),e.setAttribute(n,a);break;case"onClick":a!=null&&(e.onclick=rn);break;case"onScroll":a!=null&&Y("scroll",e);break;case"onScrollEnd":a!=null&&Y("scrollend",e);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(A(61));if(n=a.__html,n!=null){if(r.children!=null)throw Error(A(60));e.innerHTML=n}}break;case"multiple":e.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":e.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){e.removeAttribute("xlink:href");break}n=Ys(""+a),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""+a):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":a===!0?e.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,a):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?e.setAttribute(n,a):e.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?e.removeAttribute(n):e.setAttribute(n,a);break;case"popover":Y("beforetoggle",e),Y("toggle",e),Us(e,"popover",a);break;case"xlinkActuate":qe(e,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":qe(e,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":qe(e,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":qe(e,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":qe(e,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":qe(e,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":qe(e,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":qe(e,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":qe(e,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Us(e,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=oy.get(n)||n,Us(e,n,a))}}function od(e,t,n,a,r,i){switch(n){case"style":Xp(e,a,i);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(A(61));if(n=a.__html,n!=null){if(r.children!=null)throw Error(A(60));e.innerHTML=n}}break;case"children":typeof a=="string"?hr(e,a):(typeof a=="number"||typeof a=="bigint")&&hr(e,""+a);break;case"onScroll":a!=null&&Y("scroll",e);break;case"onScrollEnd":a!=null&&Y("scrollend",e);break;case"onClick":a!=null&&(e.onclick=rn);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Vp.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(r=n.endsWith("Capture"),t=n.slice(2,r?n.length-7:void 0),i=e[ne]||null,i=i!=null?i[n]:null,typeof i=="function"&&e.removeEventListener(t,i,r),typeof a=="function")){typeof i!="function"&&i!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,a,r);break t}n in e?e[n]=a:a===!0?e.setAttribute(n,""):Us(e,n,a)}}}function Ht(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Y("error",e),Y("load",e);var a=!1,r=!1,i;for(i in n)if(n.hasOwnProperty(i)){var s=n[i];if(s!=null)switch(i){case"src":a=!0;break;case"srcSet":r=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(A(137,t));default:nt(e,t,i,s,n,null)}}r&&nt(e,t,"srcSet",n.srcSet,n,null),a&&nt(e,t,"src",n.src,n,null);return;case"input":Y("invalid",e);var l=i=s=r=null,o=null,c=null;for(a in n)if(n.hasOwnProperty(a)){var d=n[a];if(d!=null)switch(a){case"name":r=d;break;case"type":s=d;break;case"checked":o=d;break;case"defaultChecked":c=d;break;case"value":i=d;break;case"defaultValue":l=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(A(137,t));break;default:nt(e,t,a,d,n,null)}}Gp(e,i,l,o,c,s,r,!1);return;case"select":Y("invalid",e),a=s=i=null;for(r in n)if(n.hasOwnProperty(r)&&(l=n[r],l!=null))switch(r){case"value":i=l;break;case"defaultValue":s=l;break;case"multiple":a=l;default:nt(e,t,r,l,n,null)}t=i,n=s,e.multiple=!!a,t!=null?rr(e,!!a,t,!1):n!=null&&rr(e,!!a,n,!0);return;case"textarea":Y("invalid",e),i=r=a=null;for(s in n)if(n.hasOwnProperty(s)&&(l=n[s],l!=null))switch(s){case"value":a=l;break;case"defaultValue":r=l;break;case"children":i=l;break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(A(91));break;default:nt(e,t,s,l,n,null)}qp(e,a,r,i);return;case"option":for(o in n)if(n.hasOwnProperty(o)&&(a=n[o],a!=null))switch(o){case"selected":e.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:nt(e,t,o,a,n,null)}return;case"dialog":Y("beforetoggle",e),Y("toggle",e),Y("cancel",e),Y("close",e);break;case"iframe":case"object":Y("load",e);break;case"video":case"audio":for(a=0;a<Ni.length;a++)Y(Ni[a],e);break;case"image":Y("error",e),Y("load",e);break;case"details":Y("toggle",e);break;case"embed":case"source":case"link":Y("error",e),Y("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(a=n[c],a!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(A(137,t));default:nt(e,t,c,a,n,null)}return;default:if(Qd(t)){for(d in n)n.hasOwnProperty(d)&&(a=n[d],a!==void 0&&od(e,t,d,a,n,void 0));return}}for(l in n)n.hasOwnProperty(l)&&(a=n[l],a!=null&&nt(e,t,l,a,n,null))}function Rv(e,t,n,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var r=null,i=null,s=null,l=null,o=null,c=null,d=null;for(f in n){var u=n[f];if(n.hasOwnProperty(f)&&u!=null)switch(f){case"checked":break;case"value":break;case"defaultValue":o=u;default:a.hasOwnProperty(f)||nt(e,t,f,null,a,u)}}for(var h in a){var f=a[h];if(u=n[h],a.hasOwnProperty(h)&&(f!=null||u!=null))switch(h){case"type":i=f;break;case"name":r=f;break;case"checked":c=f;break;case"defaultChecked":d=f;break;case"value":s=f;break;case"defaultValue":l=f;break;case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(A(137,t));break;default:f!==u&&nt(e,t,h,f,a,u)}}Nc(e,s,l,o,c,d,i,r);return;case"select":f=s=l=h=null;for(i in n)if(o=n[i],n.hasOwnProperty(i)&&o!=null)switch(i){case"value":break;case"multiple":f=o;default:a.hasOwnProperty(i)||nt(e,t,i,null,a,o)}for(r in a)if(i=a[r],o=n[r],a.hasOwnProperty(r)&&(i!=null||o!=null))switch(r){case"value":h=i;break;case"defaultValue":l=i;break;case"multiple":s=i;default:i!==o&&nt(e,t,r,i,a,o)}t=l,n=s,a=f,h!=null?rr(e,!!n,h,!1):!!a!=!!n&&(t!=null?rr(e,!!n,t,!0):rr(e,!!n,n?[]:"",!1));return;case"textarea":f=h=null;for(l in n)if(r=n[l],n.hasOwnProperty(l)&&r!=null&&!a.hasOwnProperty(l))switch(l){case"value":break;case"children":break;default:nt(e,t,l,null,a,r)}for(s in a)if(r=a[s],i=n[s],a.hasOwnProperty(s)&&(r!=null||i!=null))switch(s){case"value":h=r;break;case"defaultValue":f=r;break;case"children":break;case"dangerouslySetInnerHTML":if(r!=null)throw Error(A(91));break;default:r!==i&&nt(e,t,s,r,a,i)}Fp(e,h,f);return;case"option":for(var m in n)if(h=n[m],n.hasOwnProperty(m)&&h!=null&&!a.hasOwnProperty(m))switch(m){case"selected":e.selected=!1;break;default:nt(e,t,m,null,a,h)}for(o in a)if(h=a[o],f=n[o],a.hasOwnProperty(o)&&h!==f&&(h!=null||f!=null))switch(o){case"selected":e.selected=h&&typeof h!="function"&&typeof h!="symbol";break;default:nt(e,t,o,h,a,f)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var b in n)h=n[b],n.hasOwnProperty(b)&&h!=null&&!a.hasOwnProperty(b)&&nt(e,t,b,null,a,h);for(c in a)if(h=a[c],f=n[c],a.hasOwnProperty(c)&&h!==f&&(h!=null||f!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(A(137,t));break;default:nt(e,t,c,h,a,f)}return;default:if(Qd(t)){for(var y in n)h=n[y],n.hasOwnProperty(y)&&h!==void 0&&!a.hasOwnProperty(y)&&od(e,t,y,void 0,a,h);for(d in a)h=a[d],f=n[d],!a.hasOwnProperty(d)||h===f||h===void 0&&f===void 0||od(e,t,d,h,a,f);return}}for(var p in n)h=n[p],n.hasOwnProperty(p)&&h!=null&&!a.hasOwnProperty(p)&&nt(e,t,p,null,a,h);for(u in a)h=a[u],f=n[u],!a.hasOwnProperty(u)||h===f||h==null&&f==null||nt(e,t,u,h,a,f)}function gh(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Lv(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var r=n[a],i=r.transferSize,s=r.initiatorType,l=r.duration;if(i&&l&&gh(s)){for(s=0,l=r.responseEnd,a+=1;a<n.length;a++){var o=n[a],c=o.startTime;if(c>l)break;var d=o.transferSize,u=o.initiatorType;d&&gh(u)&&(o=o.responseEnd,s+=d*(o<l?1:(l-c)/(o-c)))}if(--a,t+=8*(i+s)/(r.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var cd=null,dd=null;function Nl(e){return e.nodeType===9?e:e.ownerDocument}function mh(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Zm(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function ud(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ec=null;function Bv(){var e=window.event;return e&&e.type==="popstate"?e===ec?!1:(ec=e,!0):(ec=null,!1)}var Wm=typeof setTimeout=="function"?setTimeout:void 0,Hv=typeof clearTimeout=="function"?clearTimeout:void 0,bh=typeof Promise=="function"?Promise:void 0,Vv=typeof queueMicrotask=="function"?queueMicrotask:typeof bh<"u"?function(e){return bh.resolve(null).then(e).catch(Uv)}:Wm;function Uv(e){setTimeout(function(){throw e})}function ea(e){return e==="head"}function xh(e,t){var n=t,a=0;do{var r=n.nextSibling;if(e.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"||n==="/&"){if(a===0){e.removeChild(r),_r(t);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")bi(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,bi(n);for(var i=n.firstChild;i;){var s=i.nextSibling,l=i.nodeName;i[Ii]||l==="SCRIPT"||l==="STYLE"||l==="LINK"&&i.rel.toLowerCase()==="stylesheet"||n.removeChild(i),i=s}}else n==="body"&&bi(e.ownerDocument.body);n=r}while(n);_r(t)}function yh(e,t){var n=e;e=0;do{var a=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=a}while(n)}function fd(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":fd(n),Pd(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function Yv(e,t,n,a){for(;e.nodeType===1;){var r=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!a&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(a){if(!e[Ii])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(i=e.getAttribute("rel"),i==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(i!==r.rel||e.getAttribute("href")!==(r.href==null||r.href===""?null:r.href)||e.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin)||e.getAttribute("title")!==(r.title==null?null:r.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(i=e.getAttribute("src"),(i!==(r.src==null?null:r.src)||e.getAttribute("type")!==(r.type==null?null:r.type)||e.getAttribute("crossorigin")!==(r.crossOrigin==null?null:r.crossOrigin))&&i&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var i=r.name==null?null:""+r.name;if(r.type==="hidden"&&e.getAttribute("name")===i)return e}else return e;if(e=we(e.nextSibling),e===null)break}return null}function Gv(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=we(e.nextSibling),e===null))return null;return e}function Im(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=we(e.nextSibling),e===null))return null;return e}function hd(e){return e.data==="$?"||e.data==="$~"}function pd(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function Fv(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var a=function(){t(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),e._reactRetry=a}}function we(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var gd=null;function vh(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return we(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function _h(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function Jm(e,t,n){switch(t=Nl(n),e){case"html":if(e=t.documentElement,!e)throw Error(A(452));return e;case"head":if(e=t.head,!e)throw Error(A(453));return e;case"body":if(e=t.body,!e)throw Error(A(454));return e;default:throw Error(A(451))}}function bi(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Pd(e)}var Me=new Map,kh=new Set;function jl(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var xn=I.d;I.d={f:qv,r:Xv,D:Pv,C:Qv,L:Kv,m:Zv,X:Iv,S:Wv,M:Jv};function qv(){var e=xn.f(),t=oo();return e||t}function Xv(e){var t=Dr(e);t!==null&&t.tag===5&&t.type==="form"?Xg(t):xn.r(e)}var zr=typeof document>"u"?null:document;function $m(e,t,n){var a=zr;if(a&&typeof t=="string"&&t){var r=ve(t);r='link[rel="'+e+'"][href="'+r+'"]',typeof n=="string"&&(r+='[crossorigin="'+n+'"]'),kh.has(r)||(kh.add(r),e={rel:e,crossOrigin:n,href:t},a.querySelector(r)===null&&(t=a.createElement("link"),Ht(t,"link",e),Ot(t),a.head.appendChild(t)))}}function Pv(e){xn.D(e),$m("dns-prefetch",e,null)}function Qv(e,t){xn.C(e,t),$m("preconnect",e,t)}function Kv(e,t,n){xn.L(e,t,n);var a=zr;if(a&&e&&t){var r='link[rel="preload"][as="'+ve(t)+'"]';t==="image"&&n&&n.imageSrcSet?(r+='[imagesrcset="'+ve(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(r+='[imagesizes="'+ve(n.imageSizes)+'"]')):r+='[href="'+ve(e)+'"]';var i=r;switch(t){case"style":i=vr(e);break;case"script":i=Nr(e)}Me.has(i)||(e=ft({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),Me.set(i,e),a.querySelector(r)!==null||t==="style"&&a.querySelector(as(i))||t==="script"&&a.querySelector(rs(i))||(t=a.createElement("link"),Ht(t,"link",e),Ot(t),a.head.appendChild(t)))}}function Zv(e,t){xn.m(e,t);var n=zr;if(n&&e){var a=t&&typeof t.as=="string"?t.as:"script",r='link[rel="modulepreload"][as="'+ve(a)+'"][href="'+ve(e)+'"]',i=r;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":i=Nr(e)}if(!Me.has(i)&&(e=ft({rel:"modulepreload",href:e},t),Me.set(i,e),n.querySelector(r)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(rs(i)))return}a=n.createElement("link"),Ht(a,"link",e),Ot(a),n.head.appendChild(a)}}}function Wv(e,t,n){xn.S(e,t,n);var a=zr;if(a&&e){var r=ar(a).hoistableStyles,i=vr(e);t=t||"default";var s=r.get(i);if(!s){var l={loading:0,preload:null};if(s=a.querySelector(as(i)))l.loading=5;else{e=ft({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Me.get(i))&&Ou(e,n);var o=s=a.createElement("link");Ot(o),Ht(o,"link",e),o._p=new Promise(function(c,d){o.onload=c,o.onerror=d}),o.addEventListener("load",function(){l.loading|=1}),o.addEventListener("error",function(){l.loading|=2}),l.loading|=4,Is(s,t,a)}s={type:"stylesheet",instance:s,count:1,state:l},r.set(i,s)}}}function Iv(e,t){xn.X(e,t);var n=zr;if(n&&e){var a=ar(n).hoistableScripts,r=Nr(e),i=a.get(r);i||(i=n.querySelector(rs(r)),i||(e=ft({src:e,async:!0},t),(t=Me.get(r))&&zu(e,t),i=n.createElement("script"),Ot(i),Ht(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(r,i))}}function Jv(e,t){xn.M(e,t);var n=zr;if(n&&e){var a=ar(n).hoistableScripts,r=Nr(e),i=a.get(r);i||(i=n.querySelector(rs(r)),i||(e=ft({src:e,async:!0,type:"module"},t),(t=Me.get(r))&&zu(e,t),i=n.createElement("script"),Ot(i),Ht(i,"link",e),n.head.appendChild(i)),i={type:"script",instance:i,count:1,state:null},a.set(r,i))}}function Sh(e,t,n,a){var r=(r=Hn.current)?jl(r):null;if(!r)throw Error(A(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=vr(n.href),n=ar(r).hoistableStyles,a=n.get(t),a||(a={type:"style",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=vr(n.href);var i=ar(r).hoistableStyles,s=i.get(e);if(s||(r=r.ownerDocument||r,s={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},i.set(e,s),(i=r.querySelector(as(e)))&&!i._p&&(s.instance=i,s.state.loading=5),Me.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Me.set(e,n),i||$v(r,e,n,s.state))),t&&a===null)throw Error(A(528,""));return s}if(t&&a!==null)throw Error(A(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Nr(n),n=ar(r).hoistableScripts,a=n.get(t),a||(a={type:"script",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(A(444,e))}}function vr(e){return'href="'+ve(e)+'"'}function as(e){return'link[rel="stylesheet"]['+e+"]"}function tb(e){return ft({},e,{"data-precedence":e.precedence,precedence:null})}function $v(e,t,n,a){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?a.loading=1:(t=e.createElement("link"),a.preload=t,t.addEventListener("load",function(){return a.loading|=1}),t.addEventListener("error",function(){return a.loading|=2}),Ht(t,"link",n),Ot(t),e.head.appendChild(t))}function Nr(e){return'[src="'+ve(e)+'"]'}function rs(e){return"script[async]"+e}function wh(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var a=e.querySelector('style[data-href~="'+ve(n.href)+'"]');if(a)return t.instance=a,Ot(a),a;var r=ft({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(e.ownerDocument||e).createElement("style"),Ot(a),Ht(a,"style",r),Is(a,n.precedence,e),t.instance=a;case"stylesheet":r=vr(n.href);var i=e.querySelector(as(r));if(i)return t.state.loading|=4,t.instance=i,Ot(i),i;a=tb(n),(r=Me.get(r))&&Ou(a,r),i=(e.ownerDocument||e).createElement("link"),Ot(i);var s=i;return s._p=new Promise(function(l,o){s.onload=l,s.onerror=o}),Ht(i,"link",a),t.state.loading|=4,Is(i,n.precedence,e),t.instance=i;case"script":return i=Nr(n.src),(r=e.querySelector(rs(i)))?(t.instance=r,Ot(r),r):(a=n,(r=Me.get(i))&&(a=ft({},n),zu(a,r)),e=e.ownerDocument||e,r=e.createElement("script"),Ot(r),Ht(r,"link",a),e.head.appendChild(r),t.instance=r);case"void":return null;default:throw Error(A(443,t.type))}else t.type==="stylesheet"&&!(t.state.loading&4)&&(a=t.instance,t.state.loading|=4,Is(a,n.precedence,e));return t.instance}function Is(e,t,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),r=a.length?a[a.length-1]:null,i=r,s=0;s<a.length;s++){var l=a[s];if(l.dataset.precedence===t)i=l;else if(i!==r)break}i?i.parentNode.insertBefore(e,i.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Ou(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function zu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Js=null;function Mh(e,t,n){if(Js===null){var a=new Map,r=Js=new Map;r.set(n,a)}else r=Js,a=r.get(n),a||(a=new Map,r.set(n,a));if(a.has(e))return a;for(a.set(e,null),n=n.getElementsByTagName(e),r=0;r<n.length;r++){var i=n[r];if(!(i[Ii]||i[Rt]||e==="link"&&i.getAttribute("rel")==="stylesheet")&&i.namespaceURI!=="http://www.w3.org/2000/svg"){var s=i.getAttribute(t)||"";s=e+s;var l=a.get(s);l?l.push(i):a.set(s,[i])}}return a}function Ah(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function t2(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function eb(e){return!(e.type==="stylesheet"&&!(e.state.loading&3))}function e2(e,t,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var r=vr(a.href),i=t.querySelector(as(r));if(i){t=i._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Rl.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=i,Ot(i);return}i=t.ownerDocument||t,a=tb(a),(r=Me.get(r))&&Ou(a,r),i=i.createElement("link"),Ot(i);var s=i;s._p=new Promise(function(l,o){s.onload=l,s.onerror=o}),Ht(i,"link",a),n.instance=i}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Rl.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var nc=0;function n2(e,t){return e.stylesheets&&e.count===0&&$s(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var a=setTimeout(function(){if(e.stylesheets&&$s(e,e.stylesheets),e.unsuspend){var i=e.unsuspend;e.unsuspend=null,i()}},6e4+t);0<e.imgBytes&&nc===0&&(nc=62500*Lv());var r=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&$s(e,e.stylesheets),e.unsuspend)){var i=e.unsuspend;e.unsuspend=null,i()}},(e.imgBytes>nc?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(a),clearTimeout(r)}}:null}function Rl(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)$s(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Ll=null;function $s(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Ll=new Map,t.forEach(a2,e),Ll=null,Rl.call(e))}function a2(e,t){if(!(t.state.loading&4)){var n=Ll.get(e);if(n)var a=n.get(null);else{n=new Map,Ll.set(e,n);for(var r=e.querySelectorAll("link[data-precedence],style[data-precedence]"),i=0;i<r.length;i++){var s=r[i];(s.nodeName==="LINK"||s.getAttribute("media")!=="not all")&&(n.set(s.dataset.precedence,s),a=s)}a&&n.set(null,a)}r=t.instance,s=r.getAttribute("data-precedence"),i=n.get(s)||a,i===a&&n.set(null,r),n.set(s,r),this.count++,a=Rl.bind(this),r.addEventListener("load",a),r.addEventListener("error",a),i?i.parentNode.insertBefore(r,i.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(r,e.firstChild)),t.state.loading|=4}}var Ri={$$typeof:an,Provider:null,Consumer:null,_currentValue:ma,_currentValue2:ma,_threadCount:0};function r2(e,t,n,a,r,i,s,l,o){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Mo(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Mo(0),this.hiddenUpdates=Mo(null),this.identifierPrefix=a,this.onUncaughtError=r,this.onCaughtError=i,this.onRecoverableError=s,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.incompleteTransitions=new Map}function nb(e,t,n,a,r,i,s,l,o,c,d,u){return e=new r2(e,t,n,s,o,c,d,u,l),t=1,i===!0&&(t|=24),i=le(3,null,null,t),e.current=i,i.stateNode=e,t=ru(),t.refCount++,e.pooledCache=t,t.refCount++,i.memoizedState={element:a,isDehydrated:n,cache:t},lu(i),e}function ab(e){return e?(e=Ja,e):Ja}function rb(e,t,n,a,r,i){r=ab(r),a.context===null?a.context=r:a.pendingContext=r,a=Un(t),a.payload={element:n},i=i===void 0?null:i,i!==null&&(a.callback=i),n=Yn(e,a,t),n!==null&&(ee(n,e,t),ci(n,e,t))}function Th(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Nu(e,t){Th(e,t),(e=e.alternate)&&Th(e,t)}function ib(e){if(e.tag===13||e.tag===31){var t=Na(e,67108864);t!==null&&ee(t,e,67108864),Nu(e,67108864)}}function Dh(e){if(e.tag===13||e.tag===31){var t=fe();t=qd(t);var n=Na(e,t);n!==null&&ee(n,e,t),Nu(e,t)}}var Bl=!0;function i2(e,t,n,a){var r=R.T;R.T=null;var i=I.p;try{I.p=2,ju(e,t,n,a)}finally{I.p=i,R.T=r}}function s2(e,t,n,a){var r=R.T;R.T=null;var i=I.p;try{I.p=8,ju(e,t,n,a)}finally{I.p=i,R.T=r}}function ju(e,t,n,a){if(Bl){var r=md(a);if(r===null)tc(e,t,a,Hl,n),Ch(e,a);else if(o2(r,e,t,n,a))a.stopPropagation();else if(Ch(e,a),t&4&&-1<l2.indexOf(e)){for(;r!==null;){var i=Dr(r);if(i!==null)switch(i.tag){case 3:if(i=i.stateNode,i.current.memoizedState.isDehydrated){var s=da(i.pendingLanes);if(s!==0){var l=i;for(l.pendingLanes|=2,l.entangledLanes|=2;s;){var o=1<<31-ue(s);l.entanglements[1]|=o,s&=~o}Ye(i),!(W&6)&&(Tl=ce()+500,ns(0))}}break;case 31:case 13:l=Na(i,2),l!==null&&ee(l,i,2),oo(),Nu(i,2)}if(i=md(a),i===null&&tc(e,t,a,Hl,n),i===r)break;r=i}r!==null&&a.stopPropagation()}else tc(e,t,a,null,n)}}function md(e){return e=Kd(e),Ru(e)}var Hl=null;function Ru(e){if(Hl=null,e=Pa(e),e!==null){var t=Qi(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=Mp(t),e!==null)return e;e=null}else if(n===31){if(e=Ap(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Hl=e,null}function sb(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Px()){case Ep:return 2;case Op:return 8;case hl:case Qx:return 32;case zp:return 268435456;default:return 32}default:return 32}}var bd=!1,qn=null,Xn=null,Pn=null,Li=new Map,Bi=new Map,Tn=[],l2="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Ch(e,t){switch(e){case"focusin":case"focusout":qn=null;break;case"dragenter":case"dragleave":Xn=null;break;case"mouseover":case"mouseout":Pn=null;break;case"pointerover":case"pointerout":Li.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Bi.delete(t.pointerId)}}function Ur(e,t,n,a,r,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:i,targetContainers:[r]},t!==null&&(t=Dr(t),t!==null&&ib(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,r!==null&&t.indexOf(r)===-1&&t.push(r),e)}function o2(e,t,n,a,r){switch(t){case"focusin":return qn=Ur(qn,e,t,n,a,r),!0;case"dragenter":return Xn=Ur(Xn,e,t,n,a,r),!0;case"mouseover":return Pn=Ur(Pn,e,t,n,a,r),!0;case"pointerover":var i=r.pointerId;return Li.set(i,Ur(Li.get(i)||null,e,t,n,a,r)),!0;case"gotpointercapture":return i=r.pointerId,Bi.set(i,Ur(Bi.get(i)||null,e,t,n,a,r)),!0}return!1}function lb(e){var t=Pa(e.target);if(t!==null){var n=Qi(t);if(n!==null){if(t=n.tag,t===13){if(t=Mp(n),t!==null){e.blockedOn=t,hf(e.priority,function(){Dh(n)});return}}else if(t===31){if(t=Ap(n),t!==null){e.blockedOn=t,hf(e.priority,function(){Dh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function tl(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=md(e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);Rc=a,n.target.dispatchEvent(a),Rc=null}else return t=Dr(n),t!==null&&ib(t),e.blockedOn=n,!1;t.shift()}return!0}function Eh(e,t,n){tl(e)&&n.delete(t)}function c2(){bd=!1,qn!==null&&tl(qn)&&(qn=null),Xn!==null&&tl(Xn)&&(Xn=null),Pn!==null&&tl(Pn)&&(Pn=null),Li.forEach(Eh),Bi.forEach(Eh)}function vs(e,t){e.blockedOn===t&&(e.blockedOn=null,bd||(bd=!0,Ct.unstable_scheduleCallback(Ct.unstable_NormalPriority,c2)))}var _s=null;function Oh(e){_s!==e&&(_s=e,Ct.unstable_scheduleCallback(Ct.unstable_NormalPriority,function(){_s===e&&(_s=null);for(var t=0;t<e.length;t+=3){var n=e[t],a=e[t+1],r=e[t+2];if(typeof a!="function"){if(Ru(a||n)===null)continue;break}var i=Dr(n);i!==null&&(e.splice(t,3),t-=3,Ic(i,{pending:!0,data:r,method:n.method,action:a},a,r))}}))}function _r(e){function t(o){return vs(o,e)}qn!==null&&vs(qn,e),Xn!==null&&vs(Xn,e),Pn!==null&&vs(Pn,e),Li.forEach(t),Bi.forEach(t);for(var n=0;n<Tn.length;n++){var a=Tn[n];a.blockedOn===e&&(a.blockedOn=null)}for(;0<Tn.length&&(n=Tn[0],n.blockedOn===null);)lb(n),n.blockedOn===null&&Tn.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var r=n[a],i=n[a+1],s=r[ne]||null;if(typeof i=="function")s||Oh(n);else if(s){var l=null;if(i&&i.hasAttribute("formAction")){if(r=i,s=i[ne]||null)l=s.formAction;else if(Ru(r)!==null)continue}else l=s.action;typeof l=="function"?n[a+1]=l:(n.splice(a,3),a-=3),Oh(n)}}}function ob(){function e(i){i.canIntercept&&i.info==="react-transition"&&i.intercept({handler:function(){return new Promise(function(s){return r=s})},focusReset:"manual",scroll:"manual"})}function t(){r!==null&&(r(),r=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var i=navigation.currentEntry;i&&i.url!=null&&navigation.navigate(i.url,{state:i.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,r=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),r!==null&&(r(),r=null)}}}function Lu(e){this._internalRoot=e}fo.prototype.render=Lu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(A(409));var n=t.current,a=fe();rb(n,a,e,t,null,null)};fo.prototype.unmount=Lu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;rb(e.current,2,null,e,null,null),oo(),t[Tr]=null}};function fo(e){this._internalRoot=e}fo.prototype.unstable_scheduleHydration=function(e){if(e){var t=Bp();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Tn.length&&t!==0&&t<Tn[n].priority;n++);Tn.splice(n,0,e),n===0&&lb(e)}};var zh=Sp.version;if(zh!=="19.2.5")throw Error(A(527,zh,"19.2.5"));I.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(A(188)):(e=Object.keys(e).join(","),Error(A(268,e)));return e=Vx(t),e=e!==null?Tp(e):null,e=e===null?null:e.stateNode,e};var d2={bundleType:0,version:"19.2.5",rendererPackageName:"react-dom",currentDispatcherRef:R,reconcilerVersion:"19.2.5"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ks=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ks.isDisabled&&ks.supportsFiber)try{Ki=ks.inject(d2),de=ks}catch{}}Kl.createRoot=function(e,t){if(!wp(e))throw Error(A(299));var n=!1,a="",r=$g,i=tm,s=em;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onUncaughtError!==void 0&&(r=t.onUncaughtError),t.onCaughtError!==void 0&&(i=t.onCaughtError),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=nb(e,1,!1,null,null,n,a,null,r,i,s,ob),e[Tr]=t.current,Eu(e),new Lu(t)};Kl.hydrateRoot=function(e,t,n){if(!wp(e))throw Error(A(299));var a=!1,r="",i=$g,s=tm,l=em,o=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(i=n.onUncaughtError),n.onCaughtError!==void 0&&(s=n.onCaughtError),n.onRecoverableError!==void 0&&(l=n.onRecoverableError),n.formState!==void 0&&(o=n.formState)),t=nb(e,1,!0,t,n??null,a,r,o,i,s,l,ob),t.context=ab(null),n=t.current,a=fe(),a=qd(a),r=Un(a),r.callback=null,Yn(n,r,a),n=a,t.current.lanes=n,Wi(t,n),Ye(t),e[Tr]=t.current,Eu(e),new fo(t)};Kl.version="19.2.5";function cb(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cb)}catch(e){console.error(e)}}cb(),mp.exports=Kl;var db=mp.exports;/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function is(e){return e+.5|0}const Nn=(e,t,n)=>Math.max(Math.min(e,n),t);function Jr(e){return Nn(is(e*2.55),0,255)}function Qn(e){return Nn(is(e*255),0,255)}function tn(e){return Nn(is(e/2.55)/100,0,1)}function Nh(e){return Nn(is(e*100),0,100)}const ge={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},xd=[..."0123456789ABCDEF"],u2=e=>xd[e&15],f2=e=>xd[(e&240)>>4]+xd[e&15],Ss=e=>(e&240)>>4===(e&15),h2=e=>Ss(e.r)&&Ss(e.g)&&Ss(e.b)&&Ss(e.a);function p2(e){var t=e.length,n;return e[0]==="#"&&(t===4||t===5?n={r:255&ge[e[1]]*17,g:255&ge[e[2]]*17,b:255&ge[e[3]]*17,a:t===5?ge[e[4]]*17:255}:(t===7||t===9)&&(n={r:ge[e[1]]<<4|ge[e[2]],g:ge[e[3]]<<4|ge[e[4]],b:ge[e[5]]<<4|ge[e[6]],a:t===9?ge[e[7]]<<4|ge[e[8]]:255})),n}const g2=(e,t)=>e<255?t(e):"";function m2(e){var t=h2(e)?u2:f2;return e?"#"+t(e.r)+t(e.g)+t(e.b)+g2(e.a,t):void 0}const b2=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function ub(e,t,n){const a=t*Math.min(n,1-n),r=(i,s=(i+e/30)%12)=>n-a*Math.max(Math.min(s-3,9-s,1),-1);return[r(0),r(8),r(4)]}function x2(e,t,n){const a=(r,i=(r+e/60)%6)=>n-n*t*Math.max(Math.min(i,4-i,1),0);return[a(5),a(3),a(1)]}function y2(e,t,n){const a=ub(e,1,.5);let r;for(t+n>1&&(r=1/(t+n),t*=r,n*=r),r=0;r<3;r++)a[r]*=1-t-n,a[r]+=t;return a}function v2(e,t,n,a,r){return e===r?(t-n)/a+(t<n?6:0):t===r?(n-e)/a+2:(e-t)/a+4}function Bu(e){const n=e.r/255,a=e.g/255,r=e.b/255,i=Math.max(n,a,r),s=Math.min(n,a,r),l=(i+s)/2;let o,c,d;return i!==s&&(d=i-s,c=l>.5?d/(2-i-s):d/(i+s),o=v2(n,a,r,d,i),o=o*60+.5),[o|0,c||0,l]}function Hu(e,t,n,a){return(Array.isArray(t)?e(t[0],t[1],t[2]):e(t,n,a)).map(Qn)}function Vu(e,t,n){return Hu(ub,e,t,n)}function _2(e,t,n){return Hu(y2,e,t,n)}function k2(e,t,n){return Hu(x2,e,t,n)}function fb(e){return(e%360+360)%360}function S2(e){const t=b2.exec(e);let n=255,a;if(!t)return;t[5]!==a&&(n=t[6]?Jr(+t[5]):Qn(+t[5]));const r=fb(+t[2]),i=+t[3]/100,s=+t[4]/100;return t[1]==="hwb"?a=_2(r,i,s):t[1]==="hsv"?a=k2(r,i,s):a=Vu(r,i,s),{r:a[0],g:a[1],b:a[2],a:n}}function w2(e,t){var n=Bu(e);n[0]=fb(n[0]+t),n=Vu(n),e.r=n[0],e.g=n[1],e.b=n[2]}function M2(e){if(!e)return;const t=Bu(e),n=t[0],a=Nh(t[1]),r=Nh(t[2]);return e.a<255?`hsla(${n}, ${a}%, ${r}%, ${tn(e.a)})`:`hsl(${n}, ${a}%, ${r}%)`}const jh={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Rh={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function A2(){const e={},t=Object.keys(Rh),n=Object.keys(jh);let a,r,i,s,l;for(a=0;a<t.length;a++){for(s=l=t[a],r=0;r<n.length;r++)i=n[r],l=l.replace(i,jh[i]);i=parseInt(Rh[s],16),e[l]=[i>>16&255,i>>8&255,i&255]}return e}let ws;function T2(e){ws||(ws=A2(),ws.transparent=[0,0,0,0]);const t=ws[e.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const D2=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function C2(e){const t=D2.exec(e);let n=255,a,r,i;if(t){if(t[7]!==a){const s=+t[7];n=t[8]?Jr(s):Nn(s*255,0,255)}return a=+t[1],r=+t[3],i=+t[5],a=255&(t[2]?Jr(a):Nn(a,0,255)),r=255&(t[4]?Jr(r):Nn(r,0,255)),i=255&(t[6]?Jr(i):Nn(i,0,255)),{r:a,g:r,b:i,a:n}}}function E2(e){return e&&(e.a<255?`rgba(${e.r}, ${e.g}, ${e.b}, ${tn(e.a)})`:`rgb(${e.r}, ${e.g}, ${e.b})`)}const ac=e=>e<=.0031308?e*12.92:Math.pow(e,1/2.4)*1.055-.055,Ha=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function O2(e,t,n){const a=Ha(tn(e.r)),r=Ha(tn(e.g)),i=Ha(tn(e.b));return{r:Qn(ac(a+n*(Ha(tn(t.r))-a))),g:Qn(ac(r+n*(Ha(tn(t.g))-r))),b:Qn(ac(i+n*(Ha(tn(t.b))-i))),a:e.a+n*(t.a-e.a)}}function Ms(e,t,n){if(e){let a=Bu(e);a[t]=Math.max(0,Math.min(a[t]+a[t]*n,t===0?360:1)),a=Vu(a),e.r=a[0],e.g=a[1],e.b=a[2]}}function hb(e,t){return e&&Object.assign(t||{},e)}function Lh(e){var t={r:0,g:0,b:0,a:255};return Array.isArray(e)?e.length>=3&&(t={r:e[0],g:e[1],b:e[2],a:255},e.length>3&&(t.a=Qn(e[3]))):(t=hb(e,{r:0,g:0,b:0,a:1}),t.a=Qn(t.a)),t}function z2(e){return e.charAt(0)==="r"?C2(e):S2(e)}class Hi{constructor(t){if(t instanceof Hi)return t;const n=typeof t;let a;n==="object"?a=Lh(t):n==="string"&&(a=p2(t)||T2(t)||z2(t)),this._rgb=a,this._valid=!!a}get valid(){return this._valid}get rgb(){var t=hb(this._rgb);return t&&(t.a=tn(t.a)),t}set rgb(t){this._rgb=Lh(t)}rgbString(){return this._valid?E2(this._rgb):void 0}hexString(){return this._valid?m2(this._rgb):void 0}hslString(){return this._valid?M2(this._rgb):void 0}mix(t,n){if(t){const a=this.rgb,r=t.rgb;let i;const s=n===i?.5:n,l=2*s-1,o=a.a-r.a,c=((l*o===-1?l:(l+o)/(1+l*o))+1)/2;i=1-c,a.r=255&c*a.r+i*r.r+.5,a.g=255&c*a.g+i*r.g+.5,a.b=255&c*a.b+i*r.b+.5,a.a=s*a.a+(1-s)*r.a,this.rgb=a}return this}interpolate(t,n){return t&&(this._rgb=O2(this._rgb,t._rgb,n)),this}clone(){return new Hi(this.rgb)}alpha(t){return this._rgb.a=Qn(t),this}clearer(t){const n=this._rgb;return n.a*=1-t,this}greyscale(){const t=this._rgb,n=is(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=n,this}opaquer(t){const n=this._rgb;return n.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return Ms(this._rgb,2,t),this}darken(t){return Ms(this._rgb,2,-t),this}saturate(t){return Ms(this._rgb,1,t),this}desaturate(t){return Ms(this._rgb,1,-t),this}rotate(t){return w2(this._rgb,t),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function Ke(){}const N2=(()=>{let e=0;return()=>e++})();function F(e){return e==null}function pt(e){if(Array.isArray&&Array.isArray(e))return!0;const t=Object.prototype.toString.call(e);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function X(e){return e!==null&&Object.prototype.toString.call(e)==="[object Object]"}function xt(e){return(typeof e=="number"||e instanceof Number)&&isFinite(+e)}function re(e,t){return xt(e)?e:t}function L(e,t){return typeof e>"u"?t:e}const j2=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100:+e/t,pb=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100*t:+e;function it(e,t,n){if(e&&typeof e.call=="function")return e.apply(n,t)}function tt(e,t,n,a){let r,i,s;if(pt(e))for(i=e.length,r=0;r<i;r++)t.call(n,e[r],r);else if(X(e))for(s=Object.keys(e),i=s.length,r=0;r<i;r++)t.call(n,e[s[r]],s[r])}function Vl(e,t){let n,a,r,i;if(!e||!t||e.length!==t.length)return!1;for(n=0,a=e.length;n<a;++n)if(r=e[n],i=t[n],r.datasetIndex!==i.datasetIndex||r.index!==i.index)return!1;return!0}function Ul(e){if(pt(e))return e.map(Ul);if(X(e)){const t=Object.create(null),n=Object.keys(e),a=n.length;let r=0;for(;r<a;++r)t[n[r]]=Ul(e[n[r]]);return t}return e}function gb(e){return["__proto__","prototype","constructor"].indexOf(e)===-1}function R2(e,t,n,a){if(!gb(e))return;const r=t[e],i=n[e];X(r)&&X(i)?Vi(r,i,a):t[e]=Ul(i)}function Vi(e,t,n){const a=pt(t)?t:[t],r=a.length;if(!X(e))return e;n=n||{};const i=n.merger||R2;let s;for(let l=0;l<r;++l){if(s=a[l],!X(s))continue;const o=Object.keys(s);for(let c=0,d=o.length;c<d;++c)i(o[c],e,s,n)}return e}function xi(e,t){return Vi(e,t,{merger:L2})}function L2(e,t,n){if(!gb(e))return;const a=t[e],r=n[e];X(a)&&X(r)?xi(a,r):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=Ul(r))}const Bh={"":e=>e,x:e=>e.x,y:e=>e.y};function B2(e){const t=e.split("."),n=[];let a="";for(const r of t)a+=r,a.endsWith("\\")?a=a.slice(0,-1)+".":(n.push(a),a="");return n}function H2(e){const t=B2(e);return n=>{for(const a of t){if(a==="")break;n=n&&n[a]}return n}}function Jn(e,t){return(Bh[t]||(Bh[t]=H2(t)))(e)}function Uu(e){return e.charAt(0).toUpperCase()+e.slice(1)}const Ui=e=>typeof e<"u",$n=e=>typeof e=="function",Hh=(e,t)=>{if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0};function V2(e){return e.type==="mouseup"||e.type==="click"||e.type==="contextmenu"}const Z=Math.PI,ut=2*Z,U2=ut+Z,Yl=Number.POSITIVE_INFINITY,Y2=Z/180,vt=Z/2,ia=Z/4,Vh=Z*2/3,jn=Math.log10,Ve=Math.sign;function yi(e,t,n){return Math.abs(e-t)<n}function Uh(e){const t=Math.round(e);e=yi(e,t,e/1e3)?t:e;const n=Math.pow(10,Math.floor(jn(e))),a=e/n;return(a<=1?1:a<=2?2:a<=5?5:10)*n}function G2(e){const t=[],n=Math.sqrt(e);let a;for(a=1;a<n;a++)e%a===0&&(t.push(a),t.push(e/a));return n===(n|0)&&t.push(n),t.sort((r,i)=>r-i).pop(),t}function F2(e){return typeof e=="symbol"||typeof e=="object"&&e!==null&&!(Symbol.toPrimitive in e||"toString"in e||"valueOf"in e)}function kr(e){return!F2(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function q2(e,t){const n=Math.round(e);return n-t<=e&&n+t>=e}function mb(e,t,n){let a,r,i;for(a=0,r=e.length;a<r;a++)i=e[a][n],isNaN(i)||(t.min=Math.min(t.min,i),t.max=Math.max(t.max,i))}function Ce(e){return e*(Z/180)}function Yu(e){return e*(180/Z)}function Yh(e){if(!xt(e))return;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n++;return n}function bb(e,t){const n=t.x-e.x,a=t.y-e.y,r=Math.sqrt(n*n+a*a);let i=Math.atan2(a,n);return i<-.5*Z&&(i+=ut),{angle:i,distance:r}}function yd(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function X2(e,t){return(e-t+U2)%ut-Z}function Ut(e){return(e%ut+ut)%ut}function Yi(e,t,n,a){const r=Ut(e),i=Ut(t),s=Ut(n),l=Ut(i-r),o=Ut(s-r),c=Ut(r-i),d=Ut(r-s);return r===i||r===s||a&&i===s||l>o&&c<d}function zt(e,t,n){return Math.max(t,Math.min(n,e))}function P2(e){return zt(e,-32768,32767)}function ln(e,t,n,a=1e-6){return e>=Math.min(t,n)-a&&e<=Math.max(t,n)+a}function Gu(e,t,n){n=n||(s=>e[s]<t);let a=e.length-1,r=0,i;for(;a-r>1;)i=r+a>>1,n(i)?r=i:a=i;return{lo:r,hi:a}}const on=(e,t,n,a)=>Gu(e,n,a?r=>{const i=e[r][t];return i<n||i===n&&e[r+1][t]===n}:r=>e[r][t]<n),Q2=(e,t,n)=>Gu(e,n,a=>e[a][t]>=n);function K2(e,t,n){let a=0,r=e.length;for(;a<r&&e[a]<t;)a++;for(;r>a&&e[r-1]>n;)r--;return a>0||r<e.length?e.slice(a,r):e}const xb=["push","pop","shift","splice","unshift"];function Z2(e,t){if(e._chartjs){e._chartjs.listeners.push(t);return}Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),xb.forEach(n=>{const a="_onData"+Uu(n),r=e[n];Object.defineProperty(e,n,{configurable:!0,enumerable:!1,value(...i){const s=r.apply(this,i);return e._chartjs.listeners.forEach(l=>{typeof l[a]=="function"&&l[a](...i)}),s}})})}function Gh(e,t){const n=e._chartjs;if(!n)return;const a=n.listeners,r=a.indexOf(t);r!==-1&&a.splice(r,1),!(a.length>0)&&(xb.forEach(i=>{delete e[i]}),delete e._chartjs)}function yb(e){const t=new Set(e);return t.size===e.length?e:Array.from(t)}const vb=function(){return typeof window>"u"?function(e){return e()}:window.requestAnimationFrame}();function _b(e,t){let n=[],a=!1;return function(...r){n=r,a||(a=!0,vb.call(window,()=>{a=!1,e.apply(t,n)}))}}function W2(e,t){let n;return function(...a){return t?(clearTimeout(n),n=setTimeout(e,t,a)):e.apply(this,a),t}}const Fu=e=>e==="start"?"left":e==="end"?"right":"center",Vt=(e,t,n)=>e==="start"?t:e==="end"?n:(t+n)/2,I2=(e,t,n,a)=>e===(a?"left":"right")?n:e==="center"?(t+n)/2:t;function kb(e,t,n){const a=t.length;let r=0,i=a;if(e._sorted){const{iScale:s,vScale:l,_parsed:o}=e,c=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null,d=s.axis,{min:u,max:h,minDefined:f,maxDefined:m}=s.getUserBounds();if(f){if(r=Math.min(on(o,d,u).lo,n?a:on(t,d,s.getPixelForValue(u)).lo),c){const b=o.slice(0,r+1).reverse().findIndex(y=>!F(y[l.axis]));r-=Math.max(0,b)}r=zt(r,0,a-1)}if(m){let b=Math.max(on(o,s.axis,h,!0).hi+1,n?0:on(t,d,s.getPixelForValue(h),!0).hi+1);if(c){const y=o.slice(b-1).findIndex(p=>!F(p[l.axis]));b+=Math.max(0,y)}i=zt(b,r,a)-r}else i=a-r}return{start:r,count:i}}function Sb(e){const{xScale:t,yScale:n,_scaleRanges:a}=e,r={xmin:t.min,xmax:t.max,ymin:n.min,ymax:n.max};if(!a)return e._scaleRanges=r,!0;const i=a.xmin!==t.min||a.xmax!==t.max||a.ymin!==n.min||a.ymax!==n.max;return Object.assign(a,r),i}const As=e=>e===0||e===1,Fh=(e,t,n)=>-(Math.pow(2,10*(e-=1))*Math.sin((e-t)*ut/n)),qh=(e,t,n)=>Math.pow(2,-10*e)*Math.sin((e-t)*ut/n)+1,vi={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>(e-=1)*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-((e-=1)*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>(e-=1)*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>-Math.cos(e*vt)+1,easeOutSine:e=>Math.sin(e*vt),easeInOutSine:e=>-.5*(Math.cos(Z*e)-1),easeInExpo:e=>e===0?0:Math.pow(2,10*(e-1)),easeOutExpo:e=>e===1?1:-Math.pow(2,-10*e)+1,easeInOutExpo:e=>As(e)?e:e<.5?.5*Math.pow(2,10*(e*2-1)):.5*(-Math.pow(2,-10*(e*2-1))+2),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1-(e-=1)*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>As(e)?e:Fh(e,.075,.3),easeOutElastic:e=>As(e)?e:qh(e,.075,.3),easeInOutElastic(e){return As(e)?e:e<.5?.5*Fh(e*2,.1125,.45):.5+.5*qh(e*2-1,.1125,.45)},easeInBack(e){return e*e*((1.70158+1)*e-1.70158)},easeOutBack(e){return(e-=1)*e*((1.70158+1)*e+1.70158)+1},easeInOutBack(e){let t=1.70158;return(e/=.5)<1?.5*(e*e*(((t*=1.525)+1)*e-t)):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:e=>1-vi.easeOutBounce(1-e),easeOutBounce(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},easeInOutBounce:e=>e<.5?vi.easeInBounce(e*2)*.5:vi.easeOutBounce(e*2-1)*.5+.5};function qu(e){if(e&&typeof e=="object"){const t=e.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function Xh(e){return qu(e)?e:new Hi(e)}function rc(e){return qu(e)?e:new Hi(e).saturate(.5).darken(.1).hexString()}const J2=["x","y","borderWidth","radius","tension"],$2=["color","borderColor","backgroundColor"];function t_(e){e.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),e.set("animations",{colors:{type:"color",properties:$2},numbers:{type:"number",properties:J2}}),e.describe("animations",{_fallback:"animation"}),e.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function e_(e){e.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const Ph=new Map;function n_(e,t){t=t||{};const n=e+JSON.stringify(t);let a=Ph.get(n);return a||(a=new Intl.NumberFormat(e,t),Ph.set(n,a)),a}function ss(e,t,n){return n_(t,n).format(e)}const wb={values(e){return pt(e)?e:""+e},numeric(e,t,n){if(e===0)return"0";const a=this.chart.options.locale;let r,i=e;if(n.length>1){const c=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(c<1e-4||c>1e15)&&(r="scientific"),i=a_(e,n)}const s=jn(Math.abs(i)),l=isNaN(s)?1:Math.max(Math.min(-1*Math.floor(s),20),0),o={notation:r,minimumFractionDigits:l,maximumFractionDigits:l};return Object.assign(o,this.options.ticks.format),ss(e,a,o)},logarithmic(e,t,n){if(e===0)return"0";const a=n[t].significand||e/Math.pow(10,Math.floor(jn(e)));return[1,2,3,5,10,15].includes(a)||t>.8*n.length?wb.numeric.call(this,e,t,n):""}};function a_(e,t){let n=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(n)>=1&&e!==Math.floor(e)&&(n=e-Math.floor(e)),n}var ho={formatters:wb};function r_(e){e.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,n)=>n.lineWidth,tickColor:(t,n)=>n.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:ho.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),e.route("scale.ticks","color","","color"),e.route("scale.grid","color","","borderColor"),e.route("scale.border","color","","borderColor"),e.route("scale.title","color","","color"),e.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),e.describe("scales",{_fallback:"scale"}),e.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const Da=Object.create(null),vd=Object.create(null);function _i(e,t){if(!t)return e;const n=t.split(".");for(let a=0,r=n.length;a<r;++a){const i=n[a];e=e[i]||(e[i]=Object.create(null))}return e}function ic(e,t,n){return typeof t=="string"?Vi(_i(e,t),n):Vi(_i(e,""),t)}class i_{constructor(t,n){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=a=>a.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(a,r)=>rc(r.backgroundColor),this.hoverBorderColor=(a,r)=>rc(r.borderColor),this.hoverColor=(a,r)=>rc(r.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(n)}set(t,n){return ic(this,t,n)}get(t){return _i(this,t)}describe(t,n){return ic(vd,t,n)}override(t,n){return ic(Da,t,n)}route(t,n,a,r){const i=_i(this,t),s=_i(this,a),l="_"+n;Object.defineProperties(i,{[l]:{value:i[n],writable:!0},[n]:{enumerable:!0,get(){const o=this[l],c=s[r];return X(o)?Object.assign({},c,o):L(o,c)},set(o){this[l]=o}}})}apply(t){t.forEach(n=>n(this))}}var gt=new i_({_scriptable:e=>!e.startsWith("on"),_indexable:e=>e!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[t_,e_,r_]);function s_(e){return!e||F(e.size)||F(e.family)?null:(e.style?e.style+" ":"")+(e.weight?e.weight+" ":"")+e.size+"px "+e.family}function Gl(e,t,n,a,r){let i=t[r];return i||(i=t[r]=e.measureText(r).width,n.push(r)),i>a&&(a=i),a}function l_(e,t,n,a){a=a||{};let r=a.data=a.data||{},i=a.garbageCollect=a.garbageCollect||[];a.font!==t&&(r=a.data={},i=a.garbageCollect=[],a.font=t),e.save(),e.font=t;let s=0;const l=n.length;let o,c,d,u,h;for(o=0;o<l;o++)if(u=n[o],u!=null&&!pt(u))s=Gl(e,r,i,s,u);else if(pt(u))for(c=0,d=u.length;c<d;c++)h=u[c],h!=null&&!pt(h)&&(s=Gl(e,r,i,s,h));e.restore();const f=i.length/2;if(f>n.length){for(o=0;o<f;o++)delete r[i[o]];i.splice(0,f)}return s}function sa(e,t,n){const a=e.currentDevicePixelRatio,r=n!==0?Math.max(n/2,.5):0;return Math.round((t-r)*a)/a+r}function Qh(e,t){!t&&!e||(t=t||e.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,e.width,e.height),t.restore())}function _d(e,t,n,a){Mb(e,t,n,a,null)}function Mb(e,t,n,a,r){let i,s,l,o,c,d,u,h;const f=t.pointStyle,m=t.rotation,b=t.radius;let y=(m||0)*Y2;if(f&&typeof f=="object"&&(i=f.toString(),i==="[object HTMLImageElement]"||i==="[object HTMLCanvasElement]")){e.save(),e.translate(n,a),e.rotate(y),e.drawImage(f,-f.width/2,-f.height/2,f.width,f.height),e.restore();return}if(!(isNaN(b)||b<=0)){switch(e.beginPath(),f){default:r?e.ellipse(n,a,r/2,b,0,0,ut):e.arc(n,a,b,0,ut),e.closePath();break;case"triangle":d=r?r/2:b,e.moveTo(n+Math.sin(y)*d,a-Math.cos(y)*b),y+=Vh,e.lineTo(n+Math.sin(y)*d,a-Math.cos(y)*b),y+=Vh,e.lineTo(n+Math.sin(y)*d,a-Math.cos(y)*b),e.closePath();break;case"rectRounded":c=b*.516,o=b-c,s=Math.cos(y+ia)*o,u=Math.cos(y+ia)*(r?r/2-c:o),l=Math.sin(y+ia)*o,h=Math.sin(y+ia)*(r?r/2-c:o),e.arc(n-u,a-l,c,y-Z,y-vt),e.arc(n+h,a-s,c,y-vt,y),e.arc(n+u,a+l,c,y,y+vt),e.arc(n-h,a+s,c,y+vt,y+Z),e.closePath();break;case"rect":if(!m){o=Math.SQRT1_2*b,d=r?r/2:o,e.rect(n-d,a-o,2*d,2*o);break}y+=ia;case"rectRot":u=Math.cos(y)*(r?r/2:b),s=Math.cos(y)*b,l=Math.sin(y)*b,h=Math.sin(y)*(r?r/2:b),e.moveTo(n-u,a-l),e.lineTo(n+h,a-s),e.lineTo(n+u,a+l),e.lineTo(n-h,a+s),e.closePath();break;case"crossRot":y+=ia;case"cross":u=Math.cos(y)*(r?r/2:b),s=Math.cos(y)*b,l=Math.sin(y)*b,h=Math.sin(y)*(r?r/2:b),e.moveTo(n-u,a-l),e.lineTo(n+u,a+l),e.moveTo(n+h,a-s),e.lineTo(n-h,a+s);break;case"star":u=Math.cos(y)*(r?r/2:b),s=Math.cos(y)*b,l=Math.sin(y)*b,h=Math.sin(y)*(r?r/2:b),e.moveTo(n-u,a-l),e.lineTo(n+u,a+l),e.moveTo(n+h,a-s),e.lineTo(n-h,a+s),y+=ia,u=Math.cos(y)*(r?r/2:b),s=Math.cos(y)*b,l=Math.sin(y)*b,h=Math.sin(y)*(r?r/2:b),e.moveTo(n-u,a-l),e.lineTo(n+u,a+l),e.moveTo(n+h,a-s),e.lineTo(n-h,a+s);break;case"line":s=r?r/2:Math.cos(y)*b,l=Math.sin(y)*b,e.moveTo(n-s,a-l),e.lineTo(n+s,a+l);break;case"dash":e.moveTo(n,a),e.lineTo(n+Math.cos(y)*(r?r/2:b),a+Math.sin(y)*b);break;case!1:e.closePath();break}e.fill(),t.borderWidth>0&&e.stroke()}}function cn(e,t,n){return n=n||.5,!t||e&&e.x>t.left-n&&e.x<t.right+n&&e.y>t.top-n&&e.y<t.bottom+n}function po(e,t){e.save(),e.beginPath(),e.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),e.clip()}function go(e){e.restore()}function o_(e,t,n,a,r){if(!t)return e.lineTo(n.x,n.y);if(r==="middle"){const i=(t.x+n.x)/2;e.lineTo(i,t.y),e.lineTo(i,n.y)}else r==="after"!=!!a?e.lineTo(t.x,n.y):e.lineTo(n.x,t.y);e.lineTo(n.x,n.y)}function c_(e,t,n,a){if(!t)return e.lineTo(n.x,n.y);e.bezierCurveTo(a?t.cp1x:t.cp2x,a?t.cp1y:t.cp2y,a?n.cp2x:n.cp1x,a?n.cp2y:n.cp1y,n.x,n.y)}function d_(e,t){t.translation&&e.translate(t.translation[0],t.translation[1]),F(t.rotation)||e.rotate(t.rotation),t.color&&(e.fillStyle=t.color),t.textAlign&&(e.textAlign=t.textAlign),t.textBaseline&&(e.textBaseline=t.textBaseline)}function u_(e,t,n,a,r){if(r.strikethrough||r.underline){const i=e.measureText(a),s=t-i.actualBoundingBoxLeft,l=t+i.actualBoundingBoxRight,o=n-i.actualBoundingBoxAscent,c=n+i.actualBoundingBoxDescent,d=r.strikethrough?(o+c)/2:c;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=r.decorationWidth||2,e.moveTo(s,d),e.lineTo(l,d),e.stroke()}}function f_(e,t){const n=e.fillStyle;e.fillStyle=t.color,e.fillRect(t.left,t.top,t.width,t.height),e.fillStyle=n}function Ca(e,t,n,a,r,i={}){const s=pt(t)?t:[t],l=i.strokeWidth>0&&i.strokeColor!=="";let o,c;for(e.save(),e.font=r.string,d_(e,i),o=0;o<s.length;++o)c=s[o],i.backdrop&&f_(e,i.backdrop),l&&(i.strokeColor&&(e.strokeStyle=i.strokeColor),F(i.strokeWidth)||(e.lineWidth=i.strokeWidth),e.strokeText(c,n,a,i.maxWidth)),e.fillText(c,n,a,i.maxWidth),u_(e,n,a,c,i),a+=Number(r.lineHeight);e.restore()}function Gi(e,t){const{x:n,y:a,w:r,h:i,radius:s}=t;e.arc(n+s.topLeft,a+s.topLeft,s.topLeft,1.5*Z,Z,!0),e.lineTo(n,a+i-s.bottomLeft),e.arc(n+s.bottomLeft,a+i-s.bottomLeft,s.bottomLeft,Z,vt,!0),e.lineTo(n+r-s.bottomRight,a+i),e.arc(n+r-s.bottomRight,a+i-s.bottomRight,s.bottomRight,vt,0,!0),e.lineTo(n+r,a+s.topRight),e.arc(n+r-s.topRight,a+s.topRight,s.topRight,0,-vt,!0),e.lineTo(n+s.topLeft,a)}const h_=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,p_=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function g_(e,t){const n=(""+e).match(h_);if(!n||n[1]==="normal")return t*1.2;switch(e=+n[2],n[3]){case"px":return e;case"%":e/=100;break}return t*e}const m_=e=>+e||0;function Xu(e,t){const n={},a=X(t),r=a?Object.keys(t):t,i=X(e)?a?s=>L(e[s],e[t[s]]):s=>e[s]:()=>e;for(const s of r)n[s]=m_(i(s));return n}function Ab(e){return Xu(e,{top:"y",right:"x",bottom:"y",left:"x"})}function _a(e){return Xu(e,["topLeft","topRight","bottomLeft","bottomRight"])}function Gt(e){const t=Ab(e);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function Dt(e,t){e=e||{},t=t||gt.font;let n=L(e.size,t.size);typeof n=="string"&&(n=parseInt(n,10));let a=L(e.style,t.style);a&&!(""+a).match(p_)&&(console.warn('Invalid font style specified: "'+a+'"'),a=void 0);const r={family:L(e.family,t.family),lineHeight:g_(L(e.lineHeight,t.lineHeight),n),size:n,style:a,weight:L(e.weight,t.weight),string:""};return r.string=s_(r),r}function $r(e,t,n,a){let r,i,s;for(r=0,i=e.length;r<i;++r)if(s=e[r],s!==void 0&&s!==void 0)return s}function b_(e,t,n){const{min:a,max:r}=e,i=pb(t,(r-a)/2),s=(l,o)=>n&&l===0?0:l+o;return{min:s(a,-Math.abs(i)),max:s(r,i)}}function na(e,t){return Object.assign(Object.create(e),t)}function Pu(e,t=[""],n,a,r=()=>e[0]){const i=n||e;typeof a>"u"&&(a=Eb("_fallback",e));const s={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:e,_rootScopes:i,_fallback:a,_getTarget:r,override:l=>Pu([l,...e],t,i,a)};return new Proxy(s,{deleteProperty(l,o){return delete l[o],delete l._keys,delete e[0][o],!0},get(l,o){return Db(l,o,()=>M_(o,t,e,l))},getOwnPropertyDescriptor(l,o){return Reflect.getOwnPropertyDescriptor(l._scopes[0],o)},getPrototypeOf(){return Reflect.getPrototypeOf(e[0])},has(l,o){return Zh(l).includes(o)},ownKeys(l){return Zh(l)},set(l,o,c){const d=l._storage||(l._storage=r());return l[o]=d[o]=c,delete l._keys,!0}})}function Sr(e,t,n,a){const r={_cacheable:!1,_proxy:e,_context:t,_subProxy:n,_stack:new Set,_descriptors:Tb(e,a),setContext:i=>Sr(e,i,n,a),override:i=>Sr(e.override(i),t,n,a)};return new Proxy(r,{deleteProperty(i,s){return delete i[s],delete e[s],!0},get(i,s,l){return Db(i,s,()=>y_(i,s,l))},getOwnPropertyDescriptor(i,s){return i._descriptors.allKeys?Reflect.has(e,s)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,s)},getPrototypeOf(){return Reflect.getPrototypeOf(e)},has(i,s){return Reflect.has(e,s)},ownKeys(){return Reflect.ownKeys(e)},set(i,s,l){return e[s]=l,delete i[s],!0}})}function Tb(e,t={scriptable:!0,indexable:!0}){const{_scriptable:n=t.scriptable,_indexable:a=t.indexable,_allKeys:r=t.allKeys}=e;return{allKeys:r,scriptable:n,indexable:a,isScriptable:$n(n)?n:()=>n,isIndexable:$n(a)?a:()=>a}}const x_=(e,t)=>e?e+Uu(t):t,Qu=(e,t)=>X(t)&&e!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Db(e,t,n){if(Object.prototype.hasOwnProperty.call(e,t)||t==="constructor")return e[t];const a=n();return e[t]=a,a}function y_(e,t,n){const{_proxy:a,_context:r,_subProxy:i,_descriptors:s}=e;let l=a[t];return $n(l)&&s.isScriptable(t)&&(l=v_(t,l,e,n)),pt(l)&&l.length&&(l=__(t,l,e,s.isIndexable)),Qu(t,l)&&(l=Sr(l,r,i&&i[t],s)),l}function v_(e,t,n,a){const{_proxy:r,_context:i,_subProxy:s,_stack:l}=n;if(l.has(e))throw new Error("Recursion detected: "+Array.from(l).join("->")+"->"+e);l.add(e);let o=t(i,s||a);return l.delete(e),Qu(e,o)&&(o=Ku(r._scopes,r,e,o)),o}function __(e,t,n,a){const{_proxy:r,_context:i,_subProxy:s,_descriptors:l}=n;if(typeof i.index<"u"&&a(e))return t[i.index%t.length];if(X(t[0])){const o=t,c=r._scopes.filter(d=>d!==o);t=[];for(const d of o){const u=Ku(c,r,e,d);t.push(Sr(u,i,s&&s[e],l))}}return t}function Cb(e,t,n){return $n(e)?e(t,n):e}const k_=(e,t)=>e===!0?t:typeof e=="string"?Jn(t,e):void 0;function S_(e,t,n,a,r){for(const i of t){const s=k_(n,i);if(s){e.add(s);const l=Cb(s._fallback,n,r);if(typeof l<"u"&&l!==n&&l!==a)return l}else if(s===!1&&typeof a<"u"&&n!==a)return null}return!1}function Ku(e,t,n,a){const r=t._rootScopes,i=Cb(t._fallback,n,a),s=[...e,...r],l=new Set;l.add(a);let o=Kh(l,s,n,i||n,a);return o===null||typeof i<"u"&&i!==n&&(o=Kh(l,s,i,o,a),o===null)?!1:Pu(Array.from(l),[""],r,i,()=>w_(t,n,a))}function Kh(e,t,n,a,r){for(;n;)n=S_(e,t,n,a,r);return n}function w_(e,t,n){const a=e._getTarget();t in a||(a[t]={});const r=a[t];return pt(r)&&X(n)?n:r||{}}function M_(e,t,n,a){let r;for(const i of t)if(r=Eb(x_(i,e),n),typeof r<"u")return Qu(e,r)?Ku(n,a,e,r):r}function Eb(e,t){for(const n of t){if(!n)continue;const a=n[e];if(typeof a<"u")return a}}function Zh(e){let t=e._keys;return t||(t=e._keys=A_(e._scopes)),t}function A_(e){const t=new Set;for(const n of e)for(const a of Object.keys(n).filter(r=>!r.startsWith("_")))t.add(a);return Array.from(t)}function Ob(e,t,n,a){const{iScale:r}=e,{key:i="r"}=this._parsing,s=new Array(a);let l,o,c,d;for(l=0,o=a;l<o;++l)c=l+n,d=t[c],s[l]={r:r.parse(Jn(d,i),c)};return s}const T_=Number.EPSILON||1e-14,wr=(e,t)=>t<e.length&&!e[t].skip&&e[t],zb=e=>e==="x"?"y":"x";function D_(e,t,n,a){const r=e.skip?t:e,i=t,s=n.skip?t:n,l=yd(i,r),o=yd(s,i);let c=l/(l+o),d=o/(l+o);c=isNaN(c)?0:c,d=isNaN(d)?0:d;const u=a*c,h=a*d;return{previous:{x:i.x-u*(s.x-r.x),y:i.y-u*(s.y-r.y)},next:{x:i.x+h*(s.x-r.x),y:i.y+h*(s.y-r.y)}}}function C_(e,t,n){const a=e.length;let r,i,s,l,o,c=wr(e,0);for(let d=0;d<a-1;++d)if(o=c,c=wr(e,d+1),!(!o||!c)){if(yi(t[d],0,T_)){n[d]=n[d+1]=0;continue}r=n[d]/t[d],i=n[d+1]/t[d],l=Math.pow(r,2)+Math.pow(i,2),!(l<=9)&&(s=3/Math.sqrt(l),n[d]=r*s*t[d],n[d+1]=i*s*t[d])}}function E_(e,t,n="x"){const a=zb(n),r=e.length;let i,s,l,o=wr(e,0);for(let c=0;c<r;++c){if(s=l,l=o,o=wr(e,c+1),!l)continue;const d=l[n],u=l[a];s&&(i=(d-s[n])/3,l[`cp1${n}`]=d-i,l[`cp1${a}`]=u-i*t[c]),o&&(i=(o[n]-d)/3,l[`cp2${n}`]=d+i,l[`cp2${a}`]=u+i*t[c])}}function O_(e,t="x"){const n=zb(t),a=e.length,r=Array(a).fill(0),i=Array(a);let s,l,o,c=wr(e,0);for(s=0;s<a;++s)if(l=o,o=c,c=wr(e,s+1),!!o){if(c){const d=c[t]-o[t];r[s]=d!==0?(c[n]-o[n])/d:0}i[s]=l?c?Ve(r[s-1])!==Ve(r[s])?0:(r[s-1]+r[s])/2:r[s-1]:r[s]}C_(e,r,i),E_(e,i,t)}function Ts(e,t,n){return Math.max(Math.min(e,n),t)}function z_(e,t){let n,a,r,i,s,l=cn(e[0],t);for(n=0,a=e.length;n<a;++n)s=i,i=l,l=n<a-1&&cn(e[n+1],t),i&&(r=e[n],s&&(r.cp1x=Ts(r.cp1x,t.left,t.right),r.cp1y=Ts(r.cp1y,t.top,t.bottom)),l&&(r.cp2x=Ts(r.cp2x,t.left,t.right),r.cp2y=Ts(r.cp2y,t.top,t.bottom)))}function N_(e,t,n,a,r){let i,s,l,o;if(t.spanGaps&&(e=e.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")O_(e,r);else{let c=a?e[e.length-1]:e[0];for(i=0,s=e.length;i<s;++i)l=e[i],o=D_(c,l,e[Math.min(i+1,s-(a?0:1))%s],t.tension),l.cp1x=o.previous.x,l.cp1y=o.previous.y,l.cp2x=o.next.x,l.cp2y=o.next.y,c=l}t.capBezierPoints&&z_(e,n)}function Zu(){return typeof window<"u"&&typeof document<"u"}function Wu(e){let t=e.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function Fl(e,t,n){let a;return typeof e=="string"?(a=parseInt(e,10),e.indexOf("%")!==-1&&(a=a/100*t.parentNode[n])):a=e,a}const mo=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);function j_(e,t){return mo(e).getPropertyValue(t)}const R_=["top","right","bottom","left"];function ka(e,t,n){const a={};n=n?"-"+n:"";for(let r=0;r<4;r++){const i=R_[r];a[i]=parseFloat(e[t+"-"+i+n])||0}return a.width=a.left+a.right,a.height=a.top+a.bottom,a}const L_=(e,t,n)=>(e>0||t>0)&&(!n||!n.shadowRoot);function B_(e,t){const n=e.touches,a=n&&n.length?n[0]:e,{offsetX:r,offsetY:i}=a;let s=!1,l,o;if(L_(r,i,e.target))l=r,o=i;else{const c=t.getBoundingClientRect();l=a.clientX-c.left,o=a.clientY-c.top,s=!0}return{x:l,y:o,box:s}}function ha(e,t){if("native"in e)return e;const{canvas:n,currentDevicePixelRatio:a}=t,r=mo(n),i=r.boxSizing==="border-box",s=ka(r,"padding"),l=ka(r,"border","width"),{x:o,y:c,box:d}=B_(e,n),u=s.left+(d&&l.left),h=s.top+(d&&l.top);let{width:f,height:m}=t;return i&&(f-=s.width+l.width,m-=s.height+l.height),{x:Math.round((o-u)/f*n.width/a),y:Math.round((c-h)/m*n.height/a)}}function H_(e,t,n){let a,r;if(t===void 0||n===void 0){const i=e&&Wu(e);if(!i)t=e.clientWidth,n=e.clientHeight;else{const s=i.getBoundingClientRect(),l=mo(i),o=ka(l,"border","width"),c=ka(l,"padding");t=s.width-c.width-o.width,n=s.height-c.height-o.height,a=Fl(l.maxWidth,i,"clientWidth"),r=Fl(l.maxHeight,i,"clientHeight")}}return{width:t,height:n,maxWidth:a||Yl,maxHeight:r||Yl}}const Rn=e=>Math.round(e*10)/10;function V_(e,t,n,a){const r=mo(e),i=ka(r,"margin"),s=Fl(r.maxWidth,e,"clientWidth")||Yl,l=Fl(r.maxHeight,e,"clientHeight")||Yl,o=H_(e,t,n);let{width:c,height:d}=o;if(r.boxSizing==="content-box"){const h=ka(r,"border","width"),f=ka(r,"padding");c-=f.width+h.width,d-=f.height+h.height}return c=Math.max(0,c-i.width),d=Math.max(0,a?c/a:d-i.height),c=Rn(Math.min(c,s,o.maxWidth)),d=Rn(Math.min(d,l,o.maxHeight)),c&&!d&&(d=Rn(c/2)),(t!==void 0||n!==void 0)&&a&&o.height&&d>o.height&&(d=o.height,c=Rn(Math.floor(d*a))),{width:c,height:d}}function Wh(e,t,n){const a=t||1,r=Rn(e.height*a),i=Rn(e.width*a);e.height=Rn(e.height),e.width=Rn(e.width);const s=e.canvas;return s.style&&(n||!s.style.height&&!s.style.width)&&(s.style.height=`${e.height}px`,s.style.width=`${e.width}px`),e.currentDevicePixelRatio!==a||s.height!==r||s.width!==i?(e.currentDevicePixelRatio=a,s.height=r,s.width=i,e.ctx.setTransform(a,0,0,a,0,0),!0):!1}const U_=function(){let e=!1;try{const t={get passive(){return e=!0,!1}};Zu()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return e}();function Ih(e,t){const n=j_(e,t),a=n&&n.match(/^(\d+)(\.\d+)?px$/);return a?+a[1]:void 0}function pa(e,t,n,a){return{x:e.x+n*(t.x-e.x),y:e.y+n*(t.y-e.y)}}function Y_(e,t,n,a){return{x:e.x+n*(t.x-e.x),y:a==="middle"?n<.5?e.y:t.y:a==="after"?n<1?e.y:t.y:n>0?t.y:e.y}}function G_(e,t,n,a){const r={x:e.cp2x,y:e.cp2y},i={x:t.cp1x,y:t.cp1y},s=pa(e,r,n),l=pa(r,i,n),o=pa(i,t,n),c=pa(s,l,n),d=pa(l,o,n);return pa(c,d,n)}const F_=function(e,t){return{x(n){return e+e+t-n},setWidth(n){t=n},textAlign(n){return n==="center"?n:n==="right"?"left":"right"},xPlus(n,a){return n-a},leftForLtr(n,a){return n-a}}},q_=function(){return{x(e){return e},setWidth(e){},textAlign(e){return e},xPlus(e,t){return e+t},leftForLtr(e,t){return e}}};function dr(e,t,n){return e?F_(t,n):q_()}function Nb(e,t){let n,a;(t==="ltr"||t==="rtl")&&(n=e.canvas.style,a=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",t,"important"),e.prevTextDirection=a)}function jb(e,t){t!==void 0&&(delete e.prevTextDirection,e.canvas.style.setProperty("direction",t[0],t[1]))}function Rb(e){return e==="angle"?{between:Yi,compare:X2,normalize:Ut}:{between:ln,compare:(t,n)=>t-n,normalize:t=>t}}function Jh({start:e,end:t,count:n,loop:a,style:r}){return{start:e%n,end:t%n,loop:a&&(t-e+1)%n===0,style:r}}function X_(e,t,n){const{property:a,start:r,end:i}=n,{between:s,normalize:l}=Rb(a),o=t.length;let{start:c,end:d,loop:u}=e,h,f;if(u){for(c+=o,d+=o,h=0,f=o;h<f&&s(l(t[c%o][a]),r,i);++h)c--,d--;c%=o,d%=o}return d<c&&(d+=o),{start:c,end:d,loop:u,style:e.style}}function Lb(e,t,n){if(!n)return[e];const{property:a,start:r,end:i}=n,s=t.length,{compare:l,between:o,normalize:c}=Rb(a),{start:d,end:u,loop:h,style:f}=X_(e,t,n),m=[];let b=!1,y=null,p,g,x;const v=()=>o(r,x,p)&&l(r,x)!==0,k=()=>l(i,p)===0||o(i,x,p),S=()=>b||v(),w=()=>!b||k();for(let M=d,T=d;M<=u;++M)g=t[M%s],!g.skip&&(p=c(g[a]),p!==x&&(b=o(p,r,i),y===null&&S()&&(y=l(p,r)===0?M:T),y!==null&&w()&&(m.push(Jh({start:y,end:M,loop:h,count:s,style:f})),y=null),T=M,x=p));return y!==null&&m.push(Jh({start:y,end:u,loop:h,count:s,style:f})),m}function Bb(e,t){const n=[],a=e.segments;for(let r=0;r<a.length;r++){const i=Lb(a[r],e.points,t);i.length&&n.push(...i)}return n}function P_(e,t,n,a){let r=0,i=t-1;if(n&&!a)for(;r<t&&!e[r].skip;)r++;for(;r<t&&e[r].skip;)r++;for(r%=t,n&&(i+=r);i>r&&e[i%t].skip;)i--;return i%=t,{start:r,end:i}}function Q_(e,t,n,a){const r=e.length,i=[];let s=t,l=e[t],o;for(o=t+1;o<=n;++o){const c=e[o%r];c.skip||c.stop?l.skip||(a=!1,i.push({start:t%r,end:(o-1)%r,loop:a}),t=s=c.stop?o:null):(s=o,l.skip&&(t=o)),l=c}return s!==null&&i.push({start:t%r,end:s%r,loop:a}),i}function K_(e,t){const n=e.points,a=e.options.spanGaps,r=n.length;if(!r)return[];const i=!!e._loop,{start:s,end:l}=P_(n,r,i,a);if(a===!0)return $h(e,[{start:s,end:l,loop:i}],n,t);const o=l<s?l+r:l,c=!!e._fullLoop&&s===0&&l===r-1;return $h(e,Q_(n,s,o,c),n,t)}function $h(e,t,n,a){return!a||!a.setContext||!n?t:Z_(e,t,n,a)}function Z_(e,t,n,a){const r=e._chart.getContext(),i=t0(e.options),{_datasetIndex:s,options:{spanGaps:l}}=e,o=n.length,c=[];let d=i,u=t[0].start,h=u;function f(m,b,y,p){const g=l?-1:1;if(m!==b){for(m+=o;n[m%o].skip;)m-=g;for(;n[b%o].skip;)b+=g;m%o!==b%o&&(c.push({start:m%o,end:b%o,loop:y,style:p}),d=p,u=b%o)}}for(const m of t){u=l?u:m.start;let b=n[u%o],y;for(h=u+1;h<=m.end;h++){const p=n[h%o];y=t0(a.setContext(na(r,{type:"segment",p0:b,p1:p,p0DataIndex:(h-1)%o,p1DataIndex:h%o,datasetIndex:s}))),W_(y,d)&&f(u,h-1,m.loop,d),b=p,d=y}u<h-1&&f(u,h-1,m.loop,d)}return c}function t0(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function W_(e,t){if(!t)return!1;const n=[],a=function(r,i){return qu(i)?(n.includes(i)||n.push(i),n.indexOf(i)):i};return JSON.stringify(e,a)!==JSON.stringify(t,a)}function Ds(e,t,n){return e.options.clip?e[n]:t[n]}function I_(e,t){const{xScale:n,yScale:a}=e;return n&&a?{left:Ds(n,t,"left"),right:Ds(n,t,"right"),top:Ds(a,t,"top"),bottom:Ds(a,t,"bottom")}:t}function Hb(e,t){const n=t._clip;if(n.disabled)return!1;const a=I_(t,e.chartArea);return{left:n.left===!1?0:a.left-(n.left===!0?0:n.left),right:n.right===!1?e.width:a.right+(n.right===!0?0:n.right),top:n.top===!1?0:a.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?e.height:a.bottom+(n.bottom===!0?0:n.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class J_{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,n,a,r){const i=n.listeners[r],s=n.duration;i.forEach(l=>l({chart:t,initial:n.initial,numSteps:s,currentStep:Math.min(a-n.start,s)}))}_refresh(){this._request||(this._running=!0,this._request=vb.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let n=0;this._charts.forEach((a,r)=>{if(!a.running||!a.items.length)return;const i=a.items;let s=i.length-1,l=!1,o;for(;s>=0;--s)o=i[s],o._active?(o._total>a.duration&&(a.duration=o._total),o.tick(t),l=!0):(i[s]=i[i.length-1],i.pop());l&&(r.draw(),this._notify(r,a,t,"progress")),i.length||(a.running=!1,this._notify(r,a,t,"complete"),a.initial=!1),n+=i.length}),this._lastDate=t,n===0&&(this._running=!1)}_getAnims(t){const n=this._charts;let a=n.get(t);return a||(a={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},n.set(t,a)),a}listen(t,n,a){this._getAnims(t).listeners[n].push(a)}add(t,n){!n||!n.length||this._getAnims(t).items.push(...n)}has(t){return this._getAnims(t).items.length>0}start(t){const n=this._charts.get(t);n&&(n.running=!0,n.start=Date.now(),n.duration=n.items.reduce((a,r)=>Math.max(a,r._duration),0),this._refresh())}running(t){if(!this._running)return!1;const n=this._charts.get(t);return!(!n||!n.running||!n.items.length)}stop(t){const n=this._charts.get(t);if(!n||!n.items.length)return;const a=n.items;let r=a.length-1;for(;r>=0;--r)a[r].cancel();n.items=[],this._notify(t,n,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var Ie=new J_;const e0="transparent",$_={boolean(e,t,n){return n>.5?t:e},color(e,t,n){const a=Xh(e||e0),r=a.valid&&Xh(t||e0);return r&&r.valid?r.mix(a,n).hexString():t},number(e,t,n){return e+(t-e)*n}};class t1{constructor(t,n,a,r){const i=n[a];r=$r([t.to,r,i,t.from]);const s=$r([t.from,i,r]);this._active=!0,this._fn=t.fn||$_[t.type||typeof s],this._easing=vi[t.easing]||vi.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=n,this._prop=a,this._from=s,this._to=r,this._promises=void 0}active(){return this._active}update(t,n,a){if(this._active){this._notify(!1);const r=this._target[this._prop],i=a-this._start,s=this._duration-i;this._start=a,this._duration=Math.floor(Math.max(s,t.duration)),this._total+=i,this._loop=!!t.loop,this._to=$r([t.to,n,r,t.from]),this._from=$r([t.from,r,n])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const n=t-this._start,a=this._duration,r=this._prop,i=this._from,s=this._loop,l=this._to;let o;if(this._active=i!==l&&(s||n<a),!this._active){this._target[r]=l,this._notify(!0);return}if(n<0){this._target[r]=i;return}o=n/a%2,o=s&&o>1?2-o:o,o=this._easing(Math.min(1,Math.max(0,o))),this._target[r]=this._fn(i,l,o)}wait(){const t=this._promises||(this._promises=[]);return new Promise((n,a)=>{t.push({res:n,rej:a})})}_notify(t){const n=t?"res":"rej",a=this._promises||[];for(let r=0;r<a.length;r++)a[r][n]()}}class Vb{constructor(t,n){this._chart=t,this._properties=new Map,this.configure(n)}configure(t){if(!X(t))return;const n=Object.keys(gt.animation),a=this._properties;Object.getOwnPropertyNames(t).forEach(r=>{const i=t[r];if(!X(i))return;const s={};for(const l of n)s[l]=i[l];(pt(i.properties)&&i.properties||[r]).forEach(l=>{(l===r||!a.has(l))&&a.set(l,s)})})}_animateOptions(t,n){const a=n.options,r=n1(t,a);if(!r)return[];const i=this._createAnimations(r,a);return a.$shared&&e1(t.options.$animations,a).then(()=>{t.options=a},()=>{}),i}_createAnimations(t,n){const a=this._properties,r=[],i=t.$animations||(t.$animations={}),s=Object.keys(n),l=Date.now();let o;for(o=s.length-1;o>=0;--o){const c=s[o];if(c.charAt(0)==="$")continue;if(c==="options"){r.push(...this._animateOptions(t,n));continue}const d=n[c];let u=i[c];const h=a.get(c);if(u)if(h&&u.active()){u.update(h,d,l);continue}else u.cancel();if(!h||!h.duration){t[c]=d;continue}i[c]=u=new t1(h,t,c,d),r.push(u)}return r}update(t,n){if(this._properties.size===0){Object.assign(t,n);return}const a=this._createAnimations(t,n);if(a.length)return Ie.add(this._chart,a),!0}}function e1(e,t){const n=[],a=Object.keys(t);for(let r=0;r<a.length;r++){const i=e[a[r]];i&&i.active()&&n.push(i.wait())}return Promise.all(n)}function n1(e,t){if(!t)return;let n=e.options;if(!n){e.options=t;return}return n.$shared&&(e.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function n0(e,t){const n=e&&e.options||{},a=n.reverse,r=n.min===void 0?t:0,i=n.max===void 0?t:0;return{start:a?i:r,end:a?r:i}}function a1(e,t,n){if(n===!1)return!1;const a=n0(e,n),r=n0(t,n);return{top:r.end,right:a.end,bottom:r.start,left:a.start}}function r1(e){let t,n,a,r;return X(e)?(t=e.top,n=e.right,a=e.bottom,r=e.left):t=n=a=r=e,{top:t,right:n,bottom:a,left:r,disabled:e===!1}}function Ub(e,t){const n=[],a=e._getSortedDatasetMetas(t);let r,i;for(r=0,i=a.length;r<i;++r)n.push(a[r].index);return n}function a0(e,t,n,a={}){const r=e.keys,i=a.mode==="single";let s,l,o,c;if(t===null)return;let d=!1;for(s=0,l=r.length;s<l;++s){if(o=+r[s],o===n){if(d=!0,a.all)continue;break}c=e.values[o],xt(c)&&(i||t===0||Ve(t)===Ve(c))&&(t+=c)}return!d&&!a.all?0:t}function i1(e,t){const{iScale:n,vScale:a}=t,r=n.axis==="x"?"x":"y",i=a.axis==="x"?"x":"y",s=Object.keys(e),l=new Array(s.length);let o,c,d;for(o=0,c=s.length;o<c;++o)d=s[o],l[o]={[r]:d,[i]:e[d]};return l}function sc(e,t){const n=e&&e.options.stacked;return n||n===void 0&&t.stack!==void 0}function s1(e,t,n){return`${e.id}.${t.id}.${n.stack||n.type}`}function l1(e){const{min:t,max:n,minDefined:a,maxDefined:r}=e.getUserBounds();return{min:a?t:Number.NEGATIVE_INFINITY,max:r?n:Number.POSITIVE_INFINITY}}function o1(e,t,n){const a=e[t]||(e[t]={});return a[n]||(a[n]={})}function r0(e,t,n,a){for(const r of t.getMatchingVisibleMetas(a).reverse()){const i=e[r.index];if(n&&i>0||!n&&i<0)return r.index}return null}function i0(e,t){const{chart:n,_cachedMeta:a}=e,r=n._stacks||(n._stacks={}),{iScale:i,vScale:s,index:l}=a,o=i.axis,c=s.axis,d=s1(i,s,a),u=t.length;let h;for(let f=0;f<u;++f){const m=t[f],{[o]:b,[c]:y}=m,p=m._stacks||(m._stacks={});h=p[c]=o1(r,d,b),h[l]=y,h._top=r0(h,s,!0,a.type),h._bottom=r0(h,s,!1,a.type);const g=h._visualValues||(h._visualValues={});g[l]=y}}function lc(e,t){const n=e.scales;return Object.keys(n).filter(a=>n[a].axis===t).shift()}function c1(e,t){return na(e,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function d1(e,t,n){return na(e,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:n,index:t,mode:"default",type:"data"})}function Yr(e,t){const n=e.controller.index,a=e.vScale&&e.vScale.axis;if(a){t=t||e._parsed;for(const r of t){const i=r._stacks;if(!i||i[a]===void 0||i[a][n]===void 0)return;delete i[a][n],i[a]._visualValues!==void 0&&i[a]._visualValues[n]!==void 0&&delete i[a]._visualValues[n]}}}const oc=e=>e==="reset"||e==="none",s0=(e,t)=>t?e:Object.assign({},e),u1=(e,t,n)=>e&&!t.hidden&&t._stacked&&{keys:Ub(n,!0),values:null};class Ee{constructor(t,n){this.chart=t,this._ctx=t.ctx,this.index=n,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=sc(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&Yr(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,n=this._cachedMeta,a=this.getDataset(),r=(u,h,f,m)=>u==="x"?h:u==="r"?m:f,i=n.xAxisID=L(a.xAxisID,lc(t,"x")),s=n.yAxisID=L(a.yAxisID,lc(t,"y")),l=n.rAxisID=L(a.rAxisID,lc(t,"r")),o=n.indexAxis,c=n.iAxisID=r(o,i,s,l),d=n.vAxisID=r(o,s,i,l);n.xScale=this.getScaleForId(i),n.yScale=this.getScaleForId(s),n.rScale=this.getScaleForId(l),n.iScale=this.getScaleForId(c),n.vScale=this.getScaleForId(d)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const n=this._cachedMeta;return t===n.iScale?n.vScale:n.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&Gh(this._data,this),t._stacked&&Yr(t)}_dataCheck(){const t=this.getDataset(),n=t.data||(t.data=[]),a=this._data;if(X(n)){const r=this._cachedMeta;this._data=i1(n,r)}else if(a!==n){if(a){Gh(a,this);const r=this._cachedMeta;Yr(r),r._parsed=[]}n&&Object.isExtensible(n)&&Z2(n,this),this._syncList=[],this._data=n}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const n=this._cachedMeta,a=this.getDataset();let r=!1;this._dataCheck();const i=n._stacked;n._stacked=sc(n.vScale,n),n.stack!==a.stack&&(r=!0,Yr(n),n.stack=a.stack),this._resyncElements(t),(r||i!==n._stacked)&&(i0(this,n._parsed),n._stacked=sc(n.vScale,n))}configure(){const t=this.chart.config,n=t.datasetScopeKeys(this._type),a=t.getOptionScopes(this.getDataset(),n,!0);this.options=t.createResolver(a,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,n){const{_cachedMeta:a,_data:r}=this,{iScale:i,_stacked:s}=a,l=i.axis;let o=t===0&&n===r.length?!0:a._sorted,c=t>0&&a._parsed[t-1],d,u,h;if(this._parsing===!1)a._parsed=r,a._sorted=!0,h=r;else{pt(r[t])?h=this.parseArrayData(a,r,t,n):X(r[t])?h=this.parseObjectData(a,r,t,n):h=this.parsePrimitiveData(a,r,t,n);const f=()=>u[l]===null||c&&u[l]<c[l];for(d=0;d<n;++d)a._parsed[d+t]=u=h[d],o&&(f()&&(o=!1),c=u);a._sorted=o}s&&i0(this,h)}parsePrimitiveData(t,n,a,r){const{iScale:i,vScale:s}=t,l=i.axis,o=s.axis,c=i.getLabels(),d=i===s,u=new Array(r);let h,f,m;for(h=0,f=r;h<f;++h)m=h+a,u[h]={[l]:d||i.parse(c[m],m),[o]:s.parse(n[m],m)};return u}parseArrayData(t,n,a,r){const{xScale:i,yScale:s}=t,l=new Array(r);let o,c,d,u;for(o=0,c=r;o<c;++o)d=o+a,u=n[d],l[o]={x:i.parse(u[0],d),y:s.parse(u[1],d)};return l}parseObjectData(t,n,a,r){const{xScale:i,yScale:s}=t,{xAxisKey:l="x",yAxisKey:o="y"}=this._parsing,c=new Array(r);let d,u,h,f;for(d=0,u=r;d<u;++d)h=d+a,f=n[h],c[d]={x:i.parse(Jn(f,l),h),y:s.parse(Jn(f,o),h)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,n,a){const r=this.chart,i=this._cachedMeta,s=n[t.axis],l={keys:Ub(r,!0),values:n._stacks[t.axis]._visualValues};return a0(l,s,i.index,{mode:a})}updateRangeFromParsed(t,n,a,r){const i=a[n.axis];let s=i===null?NaN:i;const l=r&&a._stacks[n.axis];r&&l&&(r.values=l,s=a0(r,i,this._cachedMeta.index)),t.min=Math.min(t.min,s),t.max=Math.max(t.max,s)}getMinMax(t,n){const a=this._cachedMeta,r=a._parsed,i=a._sorted&&t===a.iScale,s=r.length,l=this._getOtherScale(t),o=u1(n,a,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:d,max:u}=l1(l);let h,f;function m(){f=r[h];const b=f[l.axis];return!xt(f[t.axis])||d>b||u<b}for(h=0;h<s&&!(!m()&&(this.updateRangeFromParsed(c,t,f,o),i));++h);if(i){for(h=s-1;h>=0;--h)if(!m()){this.updateRangeFromParsed(c,t,f,o);break}}return c}getAllParsedValues(t){const n=this._cachedMeta._parsed,a=[];let r,i,s;for(r=0,i=n.length;r<i;++r)s=n[r][t.axis],xt(s)&&a.push(s);return a}getMaxOverflow(){return!1}getLabelAndValue(t){const n=this._cachedMeta,a=n.iScale,r=n.vScale,i=this.getParsed(t);return{label:a?""+a.getLabelForValue(i[a.axis]):"",value:r?""+r.getLabelForValue(i[r.axis]):""}}_update(t){const n=this._cachedMeta;this.update(t||"default"),n._clip=r1(L(this.options.clip,a1(n.xScale,n.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,n=this.chart,a=this._cachedMeta,r=a.data||[],i=n.chartArea,s=[],l=this._drawStart||0,o=this._drawCount||r.length-l,c=this.options.drawActiveElementsOnTop;let d;for(a.dataset&&a.dataset.draw(t,i,l,o),d=l;d<l+o;++d){const u=r[d];u.hidden||(u.active&&c?s.push(u):u.draw(t,i))}for(d=0;d<s.length;++d)s[d].draw(t,i)}getStyle(t,n){const a=n?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(a):this.resolveDataElementOptions(t||0,a)}getContext(t,n,a){const r=this.getDataset();let i;if(t>=0&&t<this._cachedMeta.data.length){const s=this._cachedMeta.data[t];i=s.$context||(s.$context=d1(this.getContext(),t,s)),i.parsed=this.getParsed(t),i.raw=r.data[t],i.index=i.dataIndex=t}else i=this.$context||(this.$context=c1(this.chart.getContext(),this.index)),i.dataset=r,i.index=i.datasetIndex=this.index;return i.active=!!n,i.mode=a,i}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,n){return this._resolveElementOptions(this.dataElementType.id,n,t)}_resolveElementOptions(t,n="default",a){const r=n==="active",i=this._cachedDataOpts,s=t+"-"+n,l=i[s],o=this.enableOptionSharing&&Ui(a);if(l)return s0(l,o);const c=this.chart.config,d=c.datasetElementScopeKeys(this._type,t),u=r?[`${t}Hover`,"hover",t,""]:[t,""],h=c.getOptionScopes(this.getDataset(),d),f=Object.keys(gt.elements[t]),m=()=>this.getContext(a,r,n),b=c.resolveNamedOptions(h,f,m,u);return b.$shared&&(b.$shared=o,i[s]=Object.freeze(s0(b,o))),b}_resolveAnimations(t,n,a){const r=this.chart,i=this._cachedDataOpts,s=`animation-${n}`,l=i[s];if(l)return l;let o;if(r.options.animation!==!1){const d=this.chart.config,u=d.datasetAnimationScopeKeys(this._type,n),h=d.getOptionScopes(this.getDataset(),u);o=d.createResolver(h,this.getContext(t,a,n))}const c=new Vb(r,o&&o.animations);return o&&o._cacheable&&(i[s]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,n){return!n||oc(t)||this.chart._animationsDisabled}_getSharedOptions(t,n){const a=this.resolveDataElementOptions(t,n),r=this._sharedOptions,i=this.getSharedOptions(a),s=this.includeOptions(n,i)||i!==r;return this.updateSharedOptions(i,n,a),{sharedOptions:i,includeOptions:s}}updateElement(t,n,a,r){oc(r)?Object.assign(t,a):this._resolveAnimations(n,r).update(t,a)}updateSharedOptions(t,n,a){t&&!oc(n)&&this._resolveAnimations(void 0,n).update(t,a)}_setStyle(t,n,a,r){t.active=r;const i=this.getStyle(n,r);this._resolveAnimations(n,a,r).update(t,{options:!r&&this.getSharedOptions(i)||i})}removeHoverStyle(t,n,a){this._setStyle(t,a,"active",!1)}setHoverStyle(t,n,a){this._setStyle(t,a,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const n=this._data,a=this._cachedMeta.data;for(const[l,o,c]of this._syncList)this[l](o,c);this._syncList=[];const r=a.length,i=n.length,s=Math.min(i,r);s&&this.parse(0,s),i>r?this._insertElements(r,i-r,t):i<r&&this._removeElements(i,r-i)}_insertElements(t,n,a=!0){const r=this._cachedMeta,i=r.data,s=t+n;let l;const o=c=>{for(c.length+=n,l=c.length-1;l>=s;l--)c[l]=c[l-n]};for(o(i),l=t;l<s;++l)i[l]=new this.dataElementType;this._parsing&&o(r._parsed),this.parse(t,n),a&&this.updateElements(i,t,n,"reset")}updateElements(t,n,a,r){}_removeElements(t,n){const a=this._cachedMeta;if(this._parsing){const r=a._parsed.splice(t,n);a._stacked&&Yr(a,r)}a.data.splice(t,n)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[n,a,r]=t;this[n](a,r)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,n){n&&this._sync(["_removeElements",t,n]);const a=arguments.length-2;a&&this._sync(["_insertElements",t,a])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}E(Ee,"defaults",{}),E(Ee,"datasetElementType",null),E(Ee,"dataElementType",null);function f1(e,t){if(!e._cache.$bar){const n=e.getMatchingVisibleMetas(t);let a=[];for(let r=0,i=n.length;r<i;r++)a=a.concat(n[r].controller.getAllParsedValues(e));e._cache.$bar=yb(a.sort((r,i)=>r-i))}return e._cache.$bar}function h1(e){const t=e.iScale,n=f1(t,e.type);let a=t._length,r,i,s,l;const o=()=>{s===32767||s===-32768||(Ui(l)&&(a=Math.min(a,Math.abs(s-l)||a)),l=s)};for(r=0,i=n.length;r<i;++r)s=t.getPixelForValue(n[r]),o();for(l=void 0,r=0,i=t.ticks.length;r<i;++r)s=t.getPixelForTick(r),o();return a}function p1(e,t,n,a){const r=n.barThickness;let i,s;return F(r)?(i=t.min*n.categoryPercentage,s=n.barPercentage):(i=r*a,s=1),{chunk:i/a,ratio:s,start:t.pixels[e]-i/2}}function g1(e,t,n,a){const r=t.pixels,i=r[e];let s=e>0?r[e-1]:null,l=e<r.length-1?r[e+1]:null;const o=n.categoryPercentage;s===null&&(s=i-(l===null?t.end-t.start:l-i)),l===null&&(l=i+i-s);const c=i-(i-Math.min(s,l))/2*o;return{chunk:Math.abs(l-s)/2*o/a,ratio:n.barPercentage,start:c}}function m1(e,t,n,a){const r=n.parse(e[0],a),i=n.parse(e[1],a),s=Math.min(r,i),l=Math.max(r,i);let o=s,c=l;Math.abs(s)>Math.abs(l)&&(o=l,c=s),t[n.axis]=c,t._custom={barStart:o,barEnd:c,start:r,end:i,min:s,max:l}}function Yb(e,t,n,a){return pt(e)?m1(e,t,n,a):t[n.axis]=n.parse(e,a),t}function l0(e,t,n,a){const r=e.iScale,i=e.vScale,s=r.getLabels(),l=r===i,o=[];let c,d,u,h;for(c=n,d=n+a;c<d;++c)h=t[c],u={},u[r.axis]=l||r.parse(s[c],c),o.push(Yb(h,u,i,c));return o}function cc(e){return e&&e.barStart!==void 0&&e.barEnd!==void 0}function b1(e,t,n){return e!==0?Ve(e):(t.isHorizontal()?1:-1)*(t.min>=n?1:-1)}function x1(e){let t,n,a,r,i;return e.horizontal?(t=e.base>e.x,n="left",a="right"):(t=e.base<e.y,n="bottom",a="top"),t?(r="end",i="start"):(r="start",i="end"),{start:n,end:a,reverse:t,top:r,bottom:i}}function y1(e,t,n,a){let r=t.borderSkipped;const i={};if(!r){e.borderSkipped=i;return}if(r===!0){e.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:s,end:l,reverse:o,top:c,bottom:d}=x1(e);r==="middle"&&n&&(e.enableBorderRadius=!0,(n._top||0)===a?r=c:(n._bottom||0)===a?r=d:(i[o0(d,s,l,o)]=!0,r=c)),i[o0(r,s,l,o)]=!0,e.borderSkipped=i}function o0(e,t,n,a){return a?(e=v1(e,t,n),e=c0(e,n,t)):e=c0(e,t,n),e}function v1(e,t,n){return e===t?n:e===n?t:e}function c0(e,t,n){return e==="start"?t:e==="end"?n:e}function _1(e,{inflateAmount:t},n){e.inflateAmount=t==="auto"?n===1?.33:0:t}class el extends Ee{parsePrimitiveData(t,n,a,r){return l0(t,n,a,r)}parseArrayData(t,n,a,r){return l0(t,n,a,r)}parseObjectData(t,n,a,r){const{iScale:i,vScale:s}=t,{xAxisKey:l="x",yAxisKey:o="y"}=this._parsing,c=i.axis==="x"?l:o,d=s.axis==="x"?l:o,u=[];let h,f,m,b;for(h=a,f=a+r;h<f;++h)b=n[h],m={},m[i.axis]=i.parse(Jn(b,c),h),u.push(Yb(Jn(b,d),m,s,h));return u}updateRangeFromParsed(t,n,a,r){super.updateRangeFromParsed(t,n,a,r);const i=a._custom;i&&n===this._cachedMeta.vScale&&(t.min=Math.min(t.min,i.min),t.max=Math.max(t.max,i.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const n=this._cachedMeta,{iScale:a,vScale:r}=n,i=this.getParsed(t),s=i._custom,l=cc(s)?"["+s.start+", "+s.end+"]":""+r.getLabelForValue(i[r.axis]);return{label:""+a.getLabelForValue(i[a.axis]),value:l}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const n=this._cachedMeta;this.updateElements(n.data,0,n.data.length,t)}updateElements(t,n,a,r){const i=r==="reset",{index:s,_cachedMeta:{vScale:l}}=this,o=l.getBasePixel(),c=l.isHorizontal(),d=this._getRuler(),{sharedOptions:u,includeOptions:h}=this._getSharedOptions(n,r);for(let f=n;f<n+a;f++){const m=this.getParsed(f),b=i||F(m[l.axis])?{base:o,head:o}:this._calculateBarValuePixels(f),y=this._calculateBarIndexPixels(f,d),p=(m._stacks||{})[l.axis],g={horizontal:c,base:b.base,enableBorderRadius:!p||cc(m._custom)||s===p._top||s===p._bottom,x:c?b.head:y.center,y:c?y.center:b.head,height:c?y.size:Math.abs(b.size),width:c?Math.abs(b.size):y.size};h&&(g.options=u||this.resolveDataElementOptions(f,t[f].active?"active":r));const x=g.options||t[f].options;y1(g,x,p,s),_1(g,x,d.ratio),this.updateElement(t[f],f,g,r)}}_getStacks(t,n){const{iScale:a}=this._cachedMeta,r=a.getMatchingVisibleMetas(this._type).filter(d=>d.controller.options.grouped),i=a.options.stacked,s=[],l=this._cachedMeta.controller.getParsed(n),o=l&&l[a.axis],c=d=>{const u=d._parsed.find(f=>f[a.axis]===o),h=u&&u[d.vScale.axis];if(F(h)||isNaN(h))return!0};for(const d of r)if(!(n!==void 0&&c(d))&&((i===!1||s.indexOf(d.stack)===-1||i===void 0&&d.stack===void 0)&&s.push(d.stack),d.index===t))break;return s.length||s.push(void 0),s}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,n=this.chart.options.indexAxis;return Object.keys(t).filter(a=>t[a].axis===n).shift()}_getAxis(){const t={},n=this.getFirstScaleIdForIndexAxis();for(const a of this.chart.data.datasets)t[L(this.chart.options.indexAxis==="x"?a.xAxisID:a.yAxisID,n)]=!0;return Object.keys(t)}_getStackIndex(t,n,a){const r=this._getStacks(t,a),i=n!==void 0?r.indexOf(n):-1;return i===-1?r.length-1:i}_getRuler(){const t=this.options,n=this._cachedMeta,a=n.iScale,r=[];let i,s;for(i=0,s=n.data.length;i<s;++i)r.push(a.getPixelForValue(this.getParsed(i)[a.axis],i));const l=t.barThickness;return{min:l||h1(n),pixels:r,start:a._startPixel,end:a._endPixel,stackCount:this._getStackCount(),scale:a,grouped:t.grouped,ratio:l?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:n,_stacked:a,index:r},options:{base:i,minBarLength:s}}=this,l=i||0,o=this.getParsed(t),c=o._custom,d=cc(c);let u=o[n.axis],h=0,f=a?this.applyStack(n,o,a):u,m,b;f!==u&&(h=f-u,f=u),d&&(u=c.barStart,f=c.barEnd-c.barStart,u!==0&&Ve(u)!==Ve(c.barEnd)&&(h=0),h+=u);const y=!F(i)&&!d?i:h;let p=n.getPixelForValue(y);if(this.chart.getDataVisibility(t)?m=n.getPixelForValue(h+f):m=p,b=m-p,Math.abs(b)<s){b=b1(b,n,l)*s,u===l&&(p-=b/2);const g=n.getPixelForDecimal(0),x=n.getPixelForDecimal(1),v=Math.min(g,x),k=Math.max(g,x);p=Math.max(Math.min(p,k),v),m=p+b,a&&!d&&(o._stacks[n.axis]._visualValues[r]=n.getValueForPixel(m)-n.getValueForPixel(p))}if(p===n.getPixelForValue(l)){const g=Ve(b)*n.getLineWidthForValue(l)/2;p+=g,b-=g}return{size:b,base:p,head:m,center:m+b/2}}_calculateBarIndexPixels(t,n){const a=n.scale,r=this.options,i=r.skipNull,s=L(r.maxBarThickness,1/0);let l,o;const c=this._getAxisCount();if(n.grouped){const d=i?this._getStackCount(t):n.stackCount,u=r.barThickness==="flex"?g1(t,n,r,d*c):p1(t,n,r,d*c),h=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,f=this._getAxis().indexOf(L(h,this.getFirstScaleIdForIndexAxis())),m=this._getStackIndex(this.index,this._cachedMeta.stack,i?t:void 0)+f;l=u.start+u.chunk*m+u.chunk/2,o=Math.min(s,u.chunk*u.ratio)}else l=a.getPixelForValue(this.getParsed(t)[a.axis],t),o=Math.min(s,n.min*n.ratio);return{base:l-o/2,head:l+o/2,center:l,size:o}}draw(){const t=this._cachedMeta,n=t.vScale,a=t.data,r=a.length;let i=0;for(;i<r;++i)this.getParsed(i)[n.axis]!==null&&!a[i].hidden&&a[i].draw(this._ctx)}}E(el,"id","bar"),E(el,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),E(el,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});class nl extends Ee{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,n,a,r){const i=super.parsePrimitiveData(t,n,a,r);for(let s=0;s<i.length;s++)i[s]._custom=this.resolveDataElementOptions(s+a).radius;return i}parseArrayData(t,n,a,r){const i=super.parseArrayData(t,n,a,r);for(let s=0;s<i.length;s++){const l=n[a+s];i[s]._custom=L(l[2],this.resolveDataElementOptions(s+a).radius)}return i}parseObjectData(t,n,a,r){const i=super.parseObjectData(t,n,a,r);for(let s=0;s<i.length;s++){const l=n[a+s];i[s]._custom=L(l&&l.r&&+l.r,this.resolveDataElementOptions(s+a).radius)}return i}getMaxOverflow(){const t=this._cachedMeta.data;let n=0;for(let a=t.length-1;a>=0;--a)n=Math.max(n,t[a].size(this.resolveDataElementOptions(a))/2);return n>0&&n}getLabelAndValue(t){const n=this._cachedMeta,a=this.chart.data.labels||[],{xScale:r,yScale:i}=n,s=this.getParsed(t),l=r.getLabelForValue(s.x),o=i.getLabelForValue(s.y),c=s._custom;return{label:a[t]||"",value:"("+l+", "+o+(c?", "+c:"")+")"}}update(t){const n=this._cachedMeta.data;this.updateElements(n,0,n.length,t)}updateElements(t,n,a,r){const i=r==="reset",{iScale:s,vScale:l}=this._cachedMeta,{sharedOptions:o,includeOptions:c}=this._getSharedOptions(n,r),d=s.axis,u=l.axis;for(let h=n;h<n+a;h++){const f=t[h],m=!i&&this.getParsed(h),b={},y=b[d]=i?s.getPixelForDecimal(.5):s.getPixelForValue(m[d]),p=b[u]=i?l.getBasePixel():l.getPixelForValue(m[u]);b.skip=isNaN(y)||isNaN(p),c&&(b.options=o||this.resolveDataElementOptions(h,f.active?"active":r),i&&(b.options.radius=0)),this.updateElement(f,h,b,r)}}resolveDataElementOptions(t,n){const a=this.getParsed(t);let r=super.resolveDataElementOptions(t,n);r.$shared&&(r=Object.assign({},r,{$shared:!1}));const i=r.radius;return n!=="active"&&(r.radius=0),r.radius+=L(a&&a._custom,i),r}}E(nl,"id","bubble"),E(nl,"defaults",{datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}}),E(nl,"overrides",{scales:{x:{type:"linear"},y:{type:"linear"}}});function k1(e,t,n){let a=1,r=1,i=0,s=0;if(t<ut){const l=e,o=l+t,c=Math.cos(l),d=Math.sin(l),u=Math.cos(o),h=Math.sin(o),f=(x,v,k)=>Yi(x,l,o,!0)?1:Math.max(v,v*n,k,k*n),m=(x,v,k)=>Yi(x,l,o,!0)?-1:Math.min(v,v*n,k,k*n),b=f(0,c,u),y=f(vt,d,h),p=m(Z,c,u),g=m(Z+vt,d,h);a=(b-p)/2,r=(y-g)/2,i=-(b+p)/2,s=-(y+g)/2}return{ratioX:a,ratioY:r,offsetX:i,offsetY:s}}class ga extends Ee{constructor(t,n){super(t,n),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,n){const a=this.getDataset().data,r=this._cachedMeta;if(this._parsing===!1)r._parsed=a;else{let i=o=>+a[o];if(X(a[t])){const{key:o="value"}=this._parsing;i=c=>+Jn(a[c],o)}let s,l;for(s=t,l=t+n;s<l;++s)r._parsed[s]=i(s)}}_getRotation(){return Ce(this.options.rotation-90)}_getCircumference(){return Ce(this.options.circumference)}_getRotationExtents(){let t=ut,n=-ut;for(let a=0;a<this.chart.data.datasets.length;++a)if(this.chart.isDatasetVisible(a)&&this.chart.getDatasetMeta(a).type===this._type){const r=this.chart.getDatasetMeta(a).controller,i=r._getRotation(),s=r._getCircumference();t=Math.min(t,i),n=Math.max(n,i+s)}return{rotation:t,circumference:n-t}}update(t){const n=this.chart,{chartArea:a}=n,r=this._cachedMeta,i=r.data,s=this.getMaxBorderWidth()+this.getMaxOffset(i)+this.options.spacing,l=Math.max((Math.min(a.width,a.height)-s)/2,0),o=Math.min(j2(this.options.cutout,l),1),c=this._getRingWeight(this.index),{circumference:d,rotation:u}=this._getRotationExtents(),{ratioX:h,ratioY:f,offsetX:m,offsetY:b}=k1(u,d,o),y=(a.width-s)/h,p=(a.height-s)/f,g=Math.max(Math.min(y,p)/2,0),x=pb(this.options.radius,g),v=Math.max(x*o,0),k=(x-v)/this._getVisibleDatasetWeightTotal();this.offsetX=m*x,this.offsetY=b*x,r.total=this.calculateTotal(),this.outerRadius=x-k*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-k*c,0),this.updateElements(i,0,i.length,t)}_circumference(t,n){const a=this.options,r=this._cachedMeta,i=this._getCircumference();return n&&a.animation.animateRotate||!this.chart.getDataVisibility(t)||r._parsed[t]===null||r.data[t].hidden?0:this.calculateCircumference(r._parsed[t]*i/ut)}updateElements(t,n,a,r){const i=r==="reset",s=this.chart,l=s.chartArea,c=s.options.animation,d=(l.left+l.right)/2,u=(l.top+l.bottom)/2,h=i&&c.animateScale,f=h?0:this.innerRadius,m=h?0:this.outerRadius,{sharedOptions:b,includeOptions:y}=this._getSharedOptions(n,r);let p=this._getRotation(),g;for(g=0;g<n;++g)p+=this._circumference(g,i);for(g=n;g<n+a;++g){const x=this._circumference(g,i),v=t[g],k={x:d+this.offsetX,y:u+this.offsetY,startAngle:p,endAngle:p+x,circumference:x,outerRadius:m,innerRadius:f};y&&(k.options=b||this.resolveDataElementOptions(g,v.active?"active":r)),p+=x,this.updateElement(v,g,k,r)}}calculateTotal(){const t=this._cachedMeta,n=t.data;let a=0,r;for(r=0;r<n.length;r++){const i=t._parsed[r];i!==null&&!isNaN(i)&&this.chart.getDataVisibility(r)&&!n[r].hidden&&(a+=Math.abs(i))}return a}calculateCircumference(t){const n=this._cachedMeta.total;return n>0&&!isNaN(t)?ut*(Math.abs(t)/n):0}getLabelAndValue(t){const n=this._cachedMeta,a=this.chart,r=a.data.labels||[],i=ss(n._parsed[t],a.options.locale);return{label:r[t]||"",value:i}}getMaxBorderWidth(t){let n=0;const a=this.chart;let r,i,s,l,o;if(!t){for(r=0,i=a.data.datasets.length;r<i;++r)if(a.isDatasetVisible(r)){s=a.getDatasetMeta(r),t=s.data,l=s.controller;break}}if(!t)return 0;for(r=0,i=t.length;r<i;++r)o=l.resolveDataElementOptions(r),o.borderAlign!=="inner"&&(n=Math.max(n,o.borderWidth||0,o.hoverBorderWidth||0));return n}getMaxOffset(t){let n=0;for(let a=0,r=t.length;a<r;++a){const i=this.resolveDataElementOptions(a);n=Math.max(n,i.offset||0,i.hoverOffset||0)}return n}_getRingWeightOffset(t){let n=0;for(let a=0;a<t;++a)this.chart.isDatasetVisible(a)&&(n+=this._getRingWeight(a));return n}_getRingWeight(t){return Math.max(L(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}E(ga,"id","doughnut"),E(ga,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),E(ga,"descriptors",{_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")}),E(ga,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const n=t.data,{labels:{pointStyle:a,textAlign:r,color:i,useBorderRadius:s,borderRadius:l}}=t.legend.options;return n.labels.length&&n.datasets.length?n.labels.map((o,c)=>{const u=t.getDatasetMeta(0).controller.getStyle(c);return{text:o,fillStyle:u.backgroundColor,fontColor:i,hidden:!t.getDataVisibility(c),lineDash:u.borderDash,lineDashOffset:u.borderDashOffset,lineJoin:u.borderJoinStyle,lineWidth:u.borderWidth,strokeStyle:u.borderColor,textAlign:r,pointStyle:a,borderRadius:s&&(l||u.borderRadius),index:c}}):[]}},onClick(t,n,a){a.chart.toggleDataVisibility(n.index),a.chart.update()}}}});class al extends Ee{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const n=this._cachedMeta,{dataset:a,data:r=[],_dataset:i}=n,s=this.chart._animationsDisabled;let{start:l,count:o}=kb(n,r,s);this._drawStart=l,this._drawCount=o,Sb(n)&&(l=0,o=r.length),a._chart=this.chart,a._datasetIndex=this.index,a._decimated=!!i._decimated,a.points=r;const c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(a,void 0,{animated:!s,options:c},t),this.updateElements(r,l,o,t)}updateElements(t,n,a,r){const i=r==="reset",{iScale:s,vScale:l,_stacked:o,_dataset:c}=this._cachedMeta,{sharedOptions:d,includeOptions:u}=this._getSharedOptions(n,r),h=s.axis,f=l.axis,{spanGaps:m,segment:b}=this.options,y=kr(m)?m:Number.POSITIVE_INFINITY,p=this.chart._animationsDisabled||i||r==="none",g=n+a,x=t.length;let v=n>0&&this.getParsed(n-1);for(let k=0;k<x;++k){const S=t[k],w=p?S:{};if(k<n||k>=g){w.skip=!0;continue}const M=this.getParsed(k),T=F(M[f]),C=w[h]=s.getPixelForValue(M[h],k),O=w[f]=i||T?l.getBasePixel():l.getPixelForValue(o?this.applyStack(l,M,o):M[f],k);w.skip=isNaN(C)||isNaN(O)||T,w.stop=k>0&&Math.abs(M[h]-v[h])>y,b&&(w.parsed=M,w.raw=c.data[k]),u&&(w.options=d||this.resolveDataElementOptions(k,S.active?"active":r)),p||this.updateElement(S,k,w,r),v=M}}getMaxOverflow(){const t=this._cachedMeta,n=t.dataset,a=n.options&&n.options.borderWidth||0,r=t.data||[];if(!r.length)return a;const i=r[0].size(this.resolveDataElementOptions(0)),s=r[r.length-1].size(this.resolveDataElementOptions(r.length-1));return Math.max(a,i,s)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}E(al,"id","line"),E(al,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),E(al,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});class ki extends Ee{constructor(t,n){super(t,n),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const n=this._cachedMeta,a=this.chart,r=a.data.labels||[],i=ss(n._parsed[t].r,a.options.locale);return{label:r[t]||"",value:i}}parseObjectData(t,n,a,r){return Ob.bind(this)(t,n,a,r)}update(t){const n=this._cachedMeta.data;this._updateRadius(),this.updateElements(n,0,n.length,t)}getMinMax(){const t=this._cachedMeta,n={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((a,r)=>{const i=this.getParsed(r).r;!isNaN(i)&&this.chart.getDataVisibility(r)&&(i<n.min&&(n.min=i),i>n.max&&(n.max=i))}),n}_updateRadius(){const t=this.chart,n=t.chartArea,a=t.options,r=Math.min(n.right-n.left,n.bottom-n.top),i=Math.max(r/2,0),s=Math.max(a.cutoutPercentage?i/100*a.cutoutPercentage:1,0),l=(i-s)/t.getVisibleDatasetCount();this.outerRadius=i-l*this.index,this.innerRadius=this.outerRadius-l}updateElements(t,n,a,r){const i=r==="reset",s=this.chart,o=s.options.animation,c=this._cachedMeta.rScale,d=c.xCenter,u=c.yCenter,h=c.getIndexAngle(0)-.5*Z;let f=h,m;const b=360/this.countVisibleElements();for(m=0;m<n;++m)f+=this._computeAngle(m,r,b);for(m=n;m<n+a;m++){const y=t[m];let p=f,g=f+this._computeAngle(m,r,b),x=s.getDataVisibility(m)?c.getDistanceFromCenterForValue(this.getParsed(m).r):0;f=g,i&&(o.animateScale&&(x=0),o.animateRotate&&(p=g=h));const v={x:d,y:u,innerRadius:0,outerRadius:x,startAngle:p,endAngle:g,options:this.resolveDataElementOptions(m,y.active?"active":r)};this.updateElement(y,m,v,r)}}countVisibleElements(){const t=this._cachedMeta;let n=0;return t.data.forEach((a,r)=>{!isNaN(this.getParsed(r).r)&&this.chart.getDataVisibility(r)&&n++}),n}_computeAngle(t,n,a){return this.chart.getDataVisibility(t)?Ce(this.resolveDataElementOptions(t,n).angle||a):0}}E(ki,"id","polarArea"),E(ki,"defaults",{dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0}),E(ki,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const n=t.data;if(n.labels.length&&n.datasets.length){const{labels:{pointStyle:a,color:r}}=t.legend.options;return n.labels.map((i,s)=>{const o=t.getDatasetMeta(0).controller.getStyle(s);return{text:i,fillStyle:o.backgroundColor,strokeStyle:o.borderColor,fontColor:r,lineWidth:o.borderWidth,pointStyle:a,hidden:!t.getDataVisibility(s),index:s}})}return[]}},onClick(t,n,a){a.chart.toggleDataVisibility(n.index),a.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}});class kd extends ga{}E(kd,"id","pie"),E(kd,"defaults",{cutout:0,rotation:0,circumference:360,radius:"100%"});class rl extends Ee{getLabelAndValue(t){const n=this._cachedMeta.vScale,a=this.getParsed(t);return{label:n.getLabels()[t],value:""+n.getLabelForValue(a[n.axis])}}parseObjectData(t,n,a,r){return Ob.bind(this)(t,n,a,r)}update(t){const n=this._cachedMeta,a=n.dataset,r=n.data||[],i=n.iScale.getLabels();if(a.points=r,t!=="resize"){const s=this.resolveDatasetElementOptions(t);this.options.showLine||(s.borderWidth=0);const l={_loop:!0,_fullLoop:i.length===r.length,options:s};this.updateElement(a,void 0,l,t)}this.updateElements(r,0,r.length,t)}updateElements(t,n,a,r){const i=this._cachedMeta.rScale,s=r==="reset";for(let l=n;l<n+a;l++){const o=t[l],c=this.resolveDataElementOptions(l,o.active?"active":r),d=i.getPointPositionForValue(l,this.getParsed(l).r),u=s?i.xCenter:d.x,h=s?i.yCenter:d.y,f={x:u,y:h,angle:d.angle,skip:isNaN(u)||isNaN(h),options:c};this.updateElement(o,l,f,r)}}}E(rl,"id","radar"),E(rl,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),E(rl,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});class il extends Ee{getLabelAndValue(t){const n=this._cachedMeta,a=this.chart.data.labels||[],{xScale:r,yScale:i}=n,s=this.getParsed(t),l=r.getLabelForValue(s.x),o=i.getLabelForValue(s.y);return{label:a[t]||"",value:"("+l+", "+o+")"}}update(t){const n=this._cachedMeta,{data:a=[]}=n,r=this.chart._animationsDisabled;let{start:i,count:s}=kb(n,a,r);if(this._drawStart=i,this._drawCount=s,Sb(n)&&(i=0,s=a.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:l,_dataset:o}=n;l._chart=this.chart,l._datasetIndex=this.index,l._decimated=!!o._decimated,l.points=a;const c=this.resolveDatasetElementOptions(t);c.segment=this.options.segment,this.updateElement(l,void 0,{animated:!r,options:c},t)}else this.datasetElementType&&(delete n.dataset,this.datasetElementType=!1);this.updateElements(a,i,s,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,n,a,r){const i=r==="reset",{iScale:s,vScale:l,_stacked:o,_dataset:c}=this._cachedMeta,d=this.resolveDataElementOptions(n,r),u=this.getSharedOptions(d),h=this.includeOptions(r,u),f=s.axis,m=l.axis,{spanGaps:b,segment:y}=this.options,p=kr(b)?b:Number.POSITIVE_INFINITY,g=this.chart._animationsDisabled||i||r==="none";let x=n>0&&this.getParsed(n-1);for(let v=n;v<n+a;++v){const k=t[v],S=this.getParsed(v),w=g?k:{},M=F(S[m]),T=w[f]=s.getPixelForValue(S[f],v),C=w[m]=i||M?l.getBasePixel():l.getPixelForValue(o?this.applyStack(l,S,o):S[m],v);w.skip=isNaN(T)||isNaN(C)||M,w.stop=v>0&&Math.abs(S[f]-x[f])>p,y&&(w.parsed=S,w.raw=c.data[v]),h&&(w.options=u||this.resolveDataElementOptions(v,k.active?"active":r)),g||this.updateElement(k,v,w,r),x=S}this.updateSharedOptions(u,r,d)}getMaxOverflow(){const t=this._cachedMeta,n=t.data||[];if(!this.options.showLine){let l=0;for(let o=n.length-1;o>=0;--o)l=Math.max(l,n[o].size(this.resolveDataElementOptions(o))/2);return l>0&&l}const a=t.dataset,r=a.options&&a.options.borderWidth||0;if(!n.length)return r;const i=n[0].size(this.resolveDataElementOptions(0)),s=n[n.length-1].size(this.resolveDataElementOptions(n.length-1));return Math.max(r,i,s)/2}}E(il,"id","scatter"),E(il,"defaults",{datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1}),E(il,"overrides",{interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}});var S1=Object.freeze({__proto__:null,BarController:el,BubbleController:nl,DoughnutController:ga,LineController:al,PieController:kd,PolarAreaController:ki,RadarController:rl,ScatterController:il});function la(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class Iu{constructor(t){E(this,"options");this.options=t||{}}static override(t){Object.assign(Iu.prototype,t)}init(){}formats(){return la()}parse(){return la()}format(){return la()}add(){return la()}diff(){return la()}startOf(){return la()}endOf(){return la()}}var w1={_date:Iu};function M1(e,t,n,a){const{controller:r,data:i,_sorted:s}=e,l=r._cachedMeta.iScale,o=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null;if(l&&t===l.axis&&t!=="r"&&s&&i.length){const c=l._reversePixels?Q2:on;if(a){if(r._sharedOptions){const d=i[0],u=typeof d.getRange=="function"&&d.getRange(t);if(u){const h=c(i,t,n-u),f=c(i,t,n+u);return{lo:h.lo,hi:f.hi}}}}else{const d=c(i,t,n);if(o){const{vScale:u}=r._cachedMeta,{_parsed:h}=e,f=h.slice(0,d.lo+1).reverse().findIndex(b=>!F(b[u.axis]));d.lo-=Math.max(0,f);const m=h.slice(d.hi).findIndex(b=>!F(b[u.axis]));d.hi+=Math.max(0,m)}return d}}return{lo:0,hi:i.length-1}}function bo(e,t,n,a,r){const i=e.getSortedVisibleDatasetMetas(),s=n[t];for(let l=0,o=i.length;l<o;++l){const{index:c,data:d}=i[l],{lo:u,hi:h}=M1(i[l],t,s,r);for(let f=u;f<=h;++f){const m=d[f];m.skip||a(m,c,f)}}}function A1(e){const t=e.indexOf("x")!==-1,n=e.indexOf("y")!==-1;return function(a,r){const i=t?Math.abs(a.x-r.x):0,s=n?Math.abs(a.y-r.y):0;return Math.sqrt(Math.pow(i,2)+Math.pow(s,2))}}function dc(e,t,n,a,r){const i=[];return!r&&!e.isPointInArea(t)||bo(e,n,t,function(l,o,c){!r&&!cn(l,e.chartArea,0)||l.inRange(t.x,t.y,a)&&i.push({element:l,datasetIndex:o,index:c})},!0),i}function T1(e,t,n,a){let r=[];function i(s,l,o){const{startAngle:c,endAngle:d}=s.getProps(["startAngle","endAngle"],a),{angle:u}=bb(s,{x:t.x,y:t.y});Yi(u,c,d)&&r.push({element:s,datasetIndex:l,index:o})}return bo(e,n,t,i),r}function D1(e,t,n,a,r,i){let s=[];const l=A1(n);let o=Number.POSITIVE_INFINITY;function c(d,u,h){const f=d.inRange(t.x,t.y,r);if(a&&!f)return;const m=d.getCenterPoint(r);if(!(!!i||e.isPointInArea(m))&&!f)return;const y=l(t,m);y<o?(s=[{element:d,datasetIndex:u,index:h}],o=y):y===o&&s.push({element:d,datasetIndex:u,index:h})}return bo(e,n,t,c),s}function uc(e,t,n,a,r,i){return!i&&!e.isPointInArea(t)?[]:n==="r"&&!a?T1(e,t,n,r):D1(e,t,n,a,r,i)}function d0(e,t,n,a,r){const i=[],s=n==="x"?"inXRange":"inYRange";let l=!1;return bo(e,n,t,(o,c,d)=>{o[s]&&o[s](t[n],r)&&(i.push({element:o,datasetIndex:c,index:d}),l=l||o.inRange(t.x,t.y,r))}),a&&!l?[]:i}var C1={modes:{index(e,t,n,a){const r=ha(t,e),i=n.axis||"x",s=n.includeInvisible||!1,l=n.intersect?dc(e,r,i,a,s):uc(e,r,i,!1,a,s),o=[];return l.length?(e.getSortedVisibleDatasetMetas().forEach(c=>{const d=l[0].index,u=c.data[d];u&&!u.skip&&o.push({element:u,datasetIndex:c.index,index:d})}),o):[]},dataset(e,t,n,a){const r=ha(t,e),i=n.axis||"xy",s=n.includeInvisible||!1;let l=n.intersect?dc(e,r,i,a,s):uc(e,r,i,!1,a,s);if(l.length>0){const o=l[0].datasetIndex,c=e.getDatasetMeta(o).data;l=[];for(let d=0;d<c.length;++d)l.push({element:c[d],datasetIndex:o,index:d})}return l},point(e,t,n,a){const r=ha(t,e),i=n.axis||"xy",s=n.includeInvisible||!1;return dc(e,r,i,a,s)},nearest(e,t,n,a){const r=ha(t,e),i=n.axis||"xy",s=n.includeInvisible||!1;return uc(e,r,i,n.intersect,a,s)},x(e,t,n,a){const r=ha(t,e);return d0(e,r,"x",n.intersect,a)},y(e,t,n,a){const r=ha(t,e);return d0(e,r,"y",n.intersect,a)}}};const Gb=["left","top","right","bottom"];function Gr(e,t){return e.filter(n=>n.pos===t)}function u0(e,t){return e.filter(n=>Gb.indexOf(n.pos)===-1&&n.box.axis===t)}function Fr(e,t){return e.sort((n,a)=>{const r=t?a:n,i=t?n:a;return r.weight===i.weight?r.index-i.index:r.weight-i.weight})}function E1(e){const t=[];let n,a,r,i,s,l;for(n=0,a=(e||[]).length;n<a;++n)r=e[n],{position:i,options:{stack:s,stackWeight:l=1}}=r,t.push({index:n,box:r,pos:i,horizontal:r.isHorizontal(),weight:r.weight,stack:s&&i+s,stackWeight:l});return t}function O1(e){const t={};for(const n of e){const{stack:a,pos:r,stackWeight:i}=n;if(!a||!Gb.includes(r))continue;const s=t[a]||(t[a]={count:0,placed:0,weight:0,size:0});s.count++,s.weight+=i}return t}function z1(e,t){const n=O1(e),{vBoxMaxWidth:a,hBoxMaxHeight:r}=t;let i,s,l;for(i=0,s=e.length;i<s;++i){l=e[i];const{fullSize:o}=l.box,c=n[l.stack],d=c&&l.stackWeight/c.weight;l.horizontal?(l.width=d?d*a:o&&t.availableWidth,l.height=r):(l.width=a,l.height=d?d*r:o&&t.availableHeight)}return n}function N1(e){const t=E1(e),n=Fr(t.filter(c=>c.box.fullSize),!0),a=Fr(Gr(t,"left"),!0),r=Fr(Gr(t,"right")),i=Fr(Gr(t,"top"),!0),s=Fr(Gr(t,"bottom")),l=u0(t,"x"),o=u0(t,"y");return{fullSize:n,leftAndTop:a.concat(i),rightAndBottom:r.concat(o).concat(s).concat(l),chartArea:Gr(t,"chartArea"),vertical:a.concat(r).concat(o),horizontal:i.concat(s).concat(l)}}function f0(e,t,n,a){return Math.max(e[n],t[n])+Math.max(e[a],t[a])}function Fb(e,t){e.top=Math.max(e.top,t.top),e.left=Math.max(e.left,t.left),e.bottom=Math.max(e.bottom,t.bottom),e.right=Math.max(e.right,t.right)}function j1(e,t,n,a){const{pos:r,box:i}=n,s=e.maxPadding;if(!X(r)){n.size&&(e[r]-=n.size);const u=a[n.stack]||{size:0,count:1};u.size=Math.max(u.size,n.horizontal?i.height:i.width),n.size=u.size/u.count,e[r]+=n.size}i.getPadding&&Fb(s,i.getPadding());const l=Math.max(0,t.outerWidth-f0(s,e,"left","right")),o=Math.max(0,t.outerHeight-f0(s,e,"top","bottom")),c=l!==e.w,d=o!==e.h;return e.w=l,e.h=o,n.horizontal?{same:c,other:d}:{same:d,other:c}}function R1(e){const t=e.maxPadding;function n(a){const r=Math.max(t[a]-e[a],0);return e[a]+=r,r}e.y+=n("top"),e.x+=n("left"),n("right"),n("bottom")}function L1(e,t){const n=t.maxPadding;function a(r){const i={left:0,top:0,right:0,bottom:0};return r.forEach(s=>{i[s]=Math.max(t[s],n[s])}),i}return a(e?["left","right"]:["top","bottom"])}function ti(e,t,n,a){const r=[];let i,s,l,o,c,d;for(i=0,s=e.length,c=0;i<s;++i){l=e[i],o=l.box,o.update(l.width||t.w,l.height||t.h,L1(l.horizontal,t));const{same:u,other:h}=j1(t,n,l,a);c|=u&&r.length,d=d||h,o.fullSize||r.push(l)}return c&&ti(r,t,n,a)||d}function Cs(e,t,n,a,r){e.top=n,e.left=t,e.right=t+a,e.bottom=n+r,e.width=a,e.height=r}function h0(e,t,n,a){const r=n.padding;let{x:i,y:s}=t;for(const l of e){const o=l.box,c=a[l.stack]||{placed:0,weight:1},d=l.stackWeight/c.weight||1;if(l.horizontal){const u=t.w*d,h=c.size||o.height;Ui(c.start)&&(s=c.start),o.fullSize?Cs(o,r.left,s,n.outerWidth-r.right-r.left,h):Cs(o,t.left+c.placed,s,u,h),c.start=s,c.placed+=u,s=o.bottom}else{const u=t.h*d,h=c.size||o.width;Ui(c.start)&&(i=c.start),o.fullSize?Cs(o,i,r.top,h,n.outerHeight-r.bottom-r.top):Cs(o,i,t.top+c.placed,h,u),c.start=i,c.placed+=u,i=o.right}}t.x=i,t.y=s}var Yt={addBox(e,t){e.boxes||(e.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(n){t.draw(n)}}]},e.boxes.push(t)},removeBox(e,t){const n=e.boxes?e.boxes.indexOf(t):-1;n!==-1&&e.boxes.splice(n,1)},configure(e,t,n){t.fullSize=n.fullSize,t.position=n.position,t.weight=n.weight},update(e,t,n,a){if(!e)return;const r=Gt(e.options.layout.padding),i=Math.max(t-r.width,0),s=Math.max(n-r.height,0),l=N1(e.boxes),o=l.vertical,c=l.horizontal;tt(e.boxes,b=>{typeof b.beforeLayout=="function"&&b.beforeLayout()});const d=o.reduce((b,y)=>y.box.options&&y.box.options.display===!1?b:b+1,0)||1,u=Object.freeze({outerWidth:t,outerHeight:n,padding:r,availableWidth:i,availableHeight:s,vBoxMaxWidth:i/2/d,hBoxMaxHeight:s/2}),h=Object.assign({},r);Fb(h,Gt(a));const f=Object.assign({maxPadding:h,w:i,h:s,x:r.left,y:r.top},r),m=z1(o.concat(c),u);ti(l.fullSize,f,u,m),ti(o,f,u,m),ti(c,f,u,m)&&ti(o,f,u,m),R1(f),h0(l.leftAndTop,f,u,m),f.x+=f.w,f.y+=f.h,h0(l.rightAndBottom,f,u,m),e.chartArea={left:f.left,top:f.top,right:f.left+f.w,bottom:f.top+f.h,height:f.h,width:f.w},tt(l.chartArea,b=>{const y=b.box;Object.assign(y,e.chartArea),y.update(f.w,f.h,{left:0,top:0,right:0,bottom:0})})}};class qb{acquireContext(t,n){}releaseContext(t){return!1}addEventListener(t,n,a){}removeEventListener(t,n,a){}getDevicePixelRatio(){return 1}getMaximumSize(t,n,a,r){return n=Math.max(0,n||t.width),a=a||t.height,{width:n,height:Math.max(0,r?Math.floor(n/r):a)}}isAttached(t){return!0}updateConfig(t){}}class B1 extends qb{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const sl="$chartjs",H1={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},p0=e=>e===null||e==="";function V1(e,t){const n=e.style,a=e.getAttribute("height"),r=e.getAttribute("width");if(e[sl]={initial:{height:a,width:r,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||"block",n.boxSizing=n.boxSizing||"border-box",p0(r)){const i=Ih(e,"width");i!==void 0&&(e.width=i)}if(p0(a))if(e.style.height==="")e.height=e.width/(t||2);else{const i=Ih(e,"height");i!==void 0&&(e.height=i)}return e}const Xb=U_?{passive:!0}:!1;function U1(e,t,n){e&&e.addEventListener(t,n,Xb)}function Y1(e,t,n){e&&e.canvas&&e.canvas.removeEventListener(t,n,Xb)}function G1(e,t){const n=H1[e.type]||e.type,{x:a,y:r}=ha(e,t);return{type:n,chart:t,native:e,x:a!==void 0?a:null,y:r!==void 0?r:null}}function ql(e,t){for(const n of e)if(n===t||n.contains(t))return!0}function F1(e,t,n){const a=e.canvas,r=new MutationObserver(i=>{let s=!1;for(const l of i)s=s||ql(l.addedNodes,a),s=s&&!ql(l.removedNodes,a);s&&n()});return r.observe(document,{childList:!0,subtree:!0}),r}function q1(e,t,n){const a=e.canvas,r=new MutationObserver(i=>{let s=!1;for(const l of i)s=s||ql(l.removedNodes,a),s=s&&!ql(l.addedNodes,a);s&&n()});return r.observe(document,{childList:!0,subtree:!0}),r}const Fi=new Map;let g0=0;function Pb(){const e=window.devicePixelRatio;e!==g0&&(g0=e,Fi.forEach((t,n)=>{n.currentDevicePixelRatio!==e&&t()}))}function X1(e,t){Fi.size||window.addEventListener("resize",Pb),Fi.set(e,t)}function P1(e){Fi.delete(e),Fi.size||window.removeEventListener("resize",Pb)}function Q1(e,t,n){const a=e.canvas,r=a&&Wu(a);if(!r)return;const i=_b((l,o)=>{const c=r.clientWidth;n(l,o),c<r.clientWidth&&n()},window),s=new ResizeObserver(l=>{const o=l[0],c=o.contentRect.width,d=o.contentRect.height;c===0&&d===0||i(c,d)});return s.observe(r),X1(e,i),s}function fc(e,t,n){n&&n.disconnect(),t==="resize"&&P1(e)}function K1(e,t,n){const a=e.canvas,r=_b(i=>{e.ctx!==null&&n(G1(i,e))},e);return U1(a,t,r),r}class Z1 extends qb{acquireContext(t,n){const a=t&&t.getContext&&t.getContext("2d");return a&&a.canvas===t?(V1(t,n),a):null}releaseContext(t){const n=t.canvas;if(!n[sl])return!1;const a=n[sl].initial;["height","width"].forEach(i=>{const s=a[i];F(s)?n.removeAttribute(i):n.setAttribute(i,s)});const r=a.style||{};return Object.keys(r).forEach(i=>{n.style[i]=r[i]}),n.width=n.width,delete n[sl],!0}addEventListener(t,n,a){this.removeEventListener(t,n);const r=t.$proxies||(t.$proxies={}),s={attach:F1,detach:q1,resize:Q1}[n]||K1;r[n]=s(t,n,a)}removeEventListener(t,n){const a=t.$proxies||(t.$proxies={}),r=a[n];if(!r)return;({attach:fc,detach:fc,resize:fc}[n]||Y1)(t,n,r),a[n]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,n,a,r){return V_(t,n,a,r)}isAttached(t){const n=t&&Wu(t);return!!(n&&n.isConnected)}}function W1(e){return!Zu()||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas?B1:Z1}var Vs;let yn=(Vs=class{constructor(){E(this,"x");E(this,"y");E(this,"active",!1);E(this,"options");E(this,"$animations")}tooltipPosition(t){const{x:n,y:a}=this.getProps(["x","y"],t);return{x:n,y:a}}hasValue(){return kr(this.x)&&kr(this.y)}getProps(t,n){const a=this.$animations;if(!n||!a)return this;const r={};return t.forEach(i=>{r[i]=a[i]&&a[i].active()?a[i]._to:this[i]}),r}},E(Vs,"defaults",{}),E(Vs,"defaultRoutes"),Vs);function I1(e,t){const n=e.options.ticks,a=J1(e),r=Math.min(n.maxTicksLimit||a,a),i=n.major.enabled?tk(t):[],s=i.length,l=i[0],o=i[s-1],c=[];if(s>r)return ek(t,c,i,s/r),c;const d=$1(i,t,r);if(s>0){let u,h;const f=s>1?Math.round((o-l)/(s-1)):null;for(Es(t,c,d,F(f)?0:l-f,l),u=0,h=s-1;u<h;u++)Es(t,c,d,i[u],i[u+1]);return Es(t,c,d,o,F(f)?t.length:o+f),c}return Es(t,c,d),c}function J1(e){const t=e.options.offset,n=e._tickSize(),a=e._length/n+(t?0:1),r=e._maxLength/n;return Math.floor(Math.min(a,r))}function $1(e,t,n){const a=nk(e),r=t.length/n;if(!a)return Math.max(r,1);const i=G2(a);for(let s=0,l=i.length-1;s<l;s++){const o=i[s];if(o>r)return o}return Math.max(r,1)}function tk(e){const t=[];let n,a;for(n=0,a=e.length;n<a;n++)e[n].major&&t.push(n);return t}function ek(e,t,n,a){let r=0,i=n[0],s;for(a=Math.ceil(a),s=0;s<e.length;s++)s===i&&(t.push(e[s]),r++,i=n[r*a])}function Es(e,t,n,a,r){const i=L(a,0),s=Math.min(L(r,e.length),e.length);let l=0,o,c,d;for(n=Math.ceil(n),r&&(o=r-a,n=o/Math.floor(o/n)),d=i;d<0;)l++,d=Math.round(i+l*n);for(c=Math.max(i,0);c<s;c++)c===d&&(t.push(e[c]),l++,d=Math.round(i+l*n))}function nk(e){const t=e.length;let n,a;if(t<2)return!1;for(a=e[0],n=1;n<t;++n)if(e[n]-e[n-1]!==a)return!1;return a}const ak=e=>e==="left"?"right":e==="right"?"left":e,m0=(e,t,n)=>t==="top"||t==="left"?e[t]+n:e[t]-n,b0=(e,t)=>Math.min(t||e,e);function x0(e,t){const n=[],a=e.length/t,r=e.length;let i=0;for(;i<r;i+=a)n.push(e[Math.floor(i)]);return n}function rk(e,t,n){const a=e.ticks.length,r=Math.min(t,a-1),i=e._startPixel,s=e._endPixel,l=1e-6;let o=e.getPixelForTick(r),c;if(!(n&&(a===1?c=Math.max(o-i,s-o):t===0?c=(e.getPixelForTick(1)-o)/2:c=(o-e.getPixelForTick(r-1))/2,o+=r<t?c:-c,o<i-l||o>s+l)))return o}function ik(e,t){tt(e,n=>{const a=n.gc,r=a.length/2;let i;if(r>t){for(i=0;i<r;++i)delete n.data[a[i]];a.splice(0,r)}})}function qr(e){return e.drawTicks?e.tickLength:0}function y0(e,t){if(!e.display)return 0;const n=Dt(e.font,t),a=Gt(e.padding);return(pt(e.text)?e.text.length:1)*n.lineHeight+a.height}function sk(e,t){return na(e,{scale:t,type:"scale"})}function lk(e,t,n){return na(e,{tick:n,index:t,type:"tick"})}function ok(e,t,n){let a=Fu(e);return(n&&t!=="right"||!n&&t==="right")&&(a=ak(a)),a}function ck(e,t,n,a){const{top:r,left:i,bottom:s,right:l,chart:o}=e,{chartArea:c,scales:d}=o;let u=0,h,f,m;const b=s-r,y=l-i;if(e.isHorizontal()){if(f=Vt(a,i,l),X(n)){const p=Object.keys(n)[0],g=n[p];m=d[p].getPixelForValue(g)+b-t}else n==="center"?m=(c.bottom+c.top)/2+b-t:m=m0(e,n,t);h=l-i}else{if(X(n)){const p=Object.keys(n)[0],g=n[p];f=d[p].getPixelForValue(g)-y+t}else n==="center"?f=(c.left+c.right)/2-y+t:f=m0(e,n,t);m=Vt(a,s,r),u=n==="left"?-vt:vt}return{titleX:f,titleY:m,maxWidth:h,rotation:u}}class Ra extends yn{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,n){return t}getUserBounds(){let{_userMin:t,_userMax:n,_suggestedMin:a,_suggestedMax:r}=this;return t=re(t,Number.POSITIVE_INFINITY),n=re(n,Number.NEGATIVE_INFINITY),a=re(a,Number.POSITIVE_INFINITY),r=re(r,Number.NEGATIVE_INFINITY),{min:re(t,a),max:re(n,r),minDefined:xt(t),maxDefined:xt(n)}}getMinMax(t){let{min:n,max:a,minDefined:r,maxDefined:i}=this.getUserBounds(),s;if(r&&i)return{min:n,max:a};const l=this.getMatchingVisibleMetas();for(let o=0,c=l.length;o<c;++o)s=l[o].controller.getMinMax(this,t),r||(n=Math.min(n,s.min)),i||(a=Math.max(a,s.max));return n=i&&n>a?a:n,a=r&&n>a?n:a,{min:re(n,re(a,n)),max:re(a,re(n,a))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){it(this.options.beforeUpdate,[this])}update(t,n,a){const{beginAtZero:r,grace:i,ticks:s}=this.options,l=s.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=n,this._margins=a=Object.assign({left:0,right:0,top:0,bottom:0},a),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+a.left+a.right:this.height+a.top+a.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=b_(this,i,r),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const o=l<this.ticks.length;this._convertTicksToLabels(o?x0(this.ticks,l):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),s.display&&(s.autoSkip||s.source==="auto")&&(this.ticks=I1(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),o&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,n,a;this.isHorizontal()?(n=this.left,a=this.right):(n=this.top,a=this.bottom,t=!t),this._startPixel=n,this._endPixel=a,this._reversePixels=t,this._length=a-n,this._alignToPixels=this.options.alignToPixels}afterUpdate(){it(this.options.afterUpdate,[this])}beforeSetDimensions(){it(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){it(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),it(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){it(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const n=this.options.ticks;let a,r,i;for(a=0,r=t.length;a<r;a++)i=t[a],i.label=it(n.callback,[i.value,a,t],this)}afterTickToLabelConversion(){it(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){it(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,n=t.ticks,a=b0(this.ticks.length,t.ticks.maxTicksLimit),r=n.minRotation||0,i=n.maxRotation;let s=r,l,o,c;if(!this._isVisible()||!n.display||r>=i||a<=1||!this.isHorizontal()){this.labelRotation=r;return}const d=this._getLabelSizes(),u=d.widest.width,h=d.highest.height,f=zt(this.chart.width-u,0,this.maxWidth);l=t.offset?this.maxWidth/a:f/(a-1),u+6>l&&(l=f/(a-(t.offset?.5:1)),o=this.maxHeight-qr(t.grid)-n.padding-y0(t.title,this.chart.options.font),c=Math.sqrt(u*u+h*h),s=Yu(Math.min(Math.asin(zt((d.highest.height+6)/l,-1,1)),Math.asin(zt(o/c,-1,1))-Math.asin(zt(h/c,-1,1)))),s=Math.max(r,Math.min(i,s))),this.labelRotation=s}afterCalculateLabelRotation(){it(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){it(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:n,options:{ticks:a,title:r,grid:i}}=this,s=this._isVisible(),l=this.isHorizontal();if(s){const o=y0(r,n.options.font);if(l?(t.width=this.maxWidth,t.height=qr(i)+o):(t.height=this.maxHeight,t.width=qr(i)+o),a.display&&this.ticks.length){const{first:c,last:d,widest:u,highest:h}=this._getLabelSizes(),f=a.padding*2,m=Ce(this.labelRotation),b=Math.cos(m),y=Math.sin(m);if(l){const p=a.mirror?0:y*u.width+b*h.height;t.height=Math.min(this.maxHeight,t.height+p+f)}else{const p=a.mirror?0:b*u.width+y*h.height;t.width=Math.min(this.maxWidth,t.width+p+f)}this._calculatePadding(c,d,y,b)}}this._handleMargins(),l?(this.width=this._length=n.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=n.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,n,a,r){const{ticks:{align:i,padding:s},position:l}=this.options,o=this.labelRotation!==0,c=l!=="top"&&this.axis==="x";if(this.isHorizontal()){const d=this.getPixelForTick(0)-this.left,u=this.right-this.getPixelForTick(this.ticks.length-1);let h=0,f=0;o?c?(h=r*t.width,f=a*n.height):(h=a*t.height,f=r*n.width):i==="start"?f=n.width:i==="end"?h=t.width:i!=="inner"&&(h=t.width/2,f=n.width/2),this.paddingLeft=Math.max((h-d+s)*this.width/(this.width-d),0),this.paddingRight=Math.max((f-u+s)*this.width/(this.width-u),0)}else{let d=n.height/2,u=t.height/2;i==="start"?(d=0,u=t.height):i==="end"&&(d=n.height,u=0),this.paddingTop=d+s,this.paddingBottom=u+s}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){it(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:n}=this.options;return n==="top"||n==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let n,a;for(n=0,a=t.length;n<a;n++)F(t[n].label)&&(t.splice(n,1),a--,n--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const n=this.options.ticks.sampleSize;let a=this.ticks;n<a.length&&(a=x0(a,n)),this._labelSizes=t=this._computeLabelSizes(a,a.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,n,a){const{ctx:r,_longestTextCache:i}=this,s=[],l=[],o=Math.floor(n/b0(n,a));let c=0,d=0,u,h,f,m,b,y,p,g,x,v,k;for(u=0;u<n;u+=o){if(m=t[u].label,b=this._resolveTickFontOptions(u),r.font=y=b.string,p=i[y]=i[y]||{data:{},gc:[]},g=b.lineHeight,x=v=0,!F(m)&&!pt(m))x=Gl(r,p.data,p.gc,x,m),v=g;else if(pt(m))for(h=0,f=m.length;h<f;++h)k=m[h],!F(k)&&!pt(k)&&(x=Gl(r,p.data,p.gc,x,k),v+=g);s.push(x),l.push(v),c=Math.max(x,c),d=Math.max(v,d)}ik(i,n);const S=s.indexOf(c),w=l.indexOf(d),M=T=>({width:s[T]||0,height:l[T]||0});return{first:M(0),last:M(n-1),widest:M(S),highest:M(w),widths:s,heights:l}}getLabelForValue(t){return t}getPixelForValue(t,n){return NaN}getValueForPixel(t){}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const n=this._startPixel+t*this._length;return P2(this._alignToPixels?sa(this.chart,n,0):n)}getDecimalForPixel(t){const n=(t-this._startPixel)/this._length;return this._reversePixels?1-n:n}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:n}=this;return t<0&&n<0?n:t>0&&n>0?t:0}getContext(t){const n=this.ticks||[];if(t>=0&&t<n.length){const a=n[t];return a.$context||(a.$context=lk(this.getContext(),t,a))}return this.$context||(this.$context=sk(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,n=Ce(this.labelRotation),a=Math.abs(Math.cos(n)),r=Math.abs(Math.sin(n)),i=this._getLabelSizes(),s=t.autoSkipPadding||0,l=i?i.widest.width+s:0,o=i?i.highest.height+s:0;return this.isHorizontal()?o*a>l*r?l/a:o/r:o*r<l*a?o/a:l/r}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const n=this.axis,a=this.chart,r=this.options,{grid:i,position:s,border:l}=r,o=i.offset,c=this.isHorizontal(),u=this.ticks.length+(o?1:0),h=qr(i),f=[],m=l.setContext(this.getContext()),b=m.display?m.width:0,y=b/2,p=function(D){return sa(a,D,b)};let g,x,v,k,S,w,M,T,C,O,N,J;if(s==="top")g=p(this.bottom),w=this.bottom-h,T=g-y,O=p(t.top)+y,J=t.bottom;else if(s==="bottom")g=p(this.top),O=t.top,J=p(t.bottom)-y,w=g+y,T=this.top+h;else if(s==="left")g=p(this.right),S=this.right-h,M=g-y,C=p(t.left)+y,N=t.right;else if(s==="right")g=p(this.left),C=t.left,N=p(t.right)-y,S=g+y,M=this.left+h;else if(n==="x"){if(s==="center")g=p((t.top+t.bottom)/2+.5);else if(X(s)){const D=Object.keys(s)[0],z=s[D];g=p(this.chart.scales[D].getPixelForValue(z))}O=t.top,J=t.bottom,w=g+y,T=w+h}else if(n==="y"){if(s==="center")g=p((t.left+t.right)/2);else if(X(s)){const D=Object.keys(s)[0],z=s[D];g=p(this.chart.scales[D].getPixelForValue(z))}S=g-y,M=S-h,C=t.left,N=t.right}const H=L(r.ticks.maxTicksLimit,u),Q=Math.max(1,Math.ceil(u/H));for(x=0;x<u;x+=Q){const D=this.getContext(x),z=i.setContext(D),j=l.setContext(D),U=z.lineWidth,lt=z.color,Ge=j.dash||[],Ae=j.dashOffset,Fe=z.tickWidth,Ft=z.tickColor,ze=z.tickBorderDash||[],aa=z.tickBorderDashOffset;v=rk(this,x,o),v!==void 0&&(k=sa(a,v,U),c?S=M=C=N=k:w=T=O=J=k,f.push({tx1:S,ty1:w,tx2:M,ty2:T,x1:C,y1:O,x2:N,y2:J,width:U,color:lt,borderDash:Ge,borderDashOffset:Ae,tickWidth:Fe,tickColor:Ft,tickBorderDash:ze,tickBorderDashOffset:aa}))}return this._ticksLength=u,this._borderValue=g,f}_computeLabelItems(t){const n=this.axis,a=this.options,{position:r,ticks:i}=a,s=this.isHorizontal(),l=this.ticks,{align:o,crossAlign:c,padding:d,mirror:u}=i,h=qr(a.grid),f=h+d,m=u?-d:f,b=-Ce(this.labelRotation),y=[];let p,g,x,v,k,S,w,M,T,C,O,N,J="middle";if(r==="top")S=this.bottom-m,w=this._getXAxisLabelAlignment();else if(r==="bottom")S=this.top+m,w=this._getXAxisLabelAlignment();else if(r==="left"){const Q=this._getYAxisLabelAlignment(h);w=Q.textAlign,k=Q.x}else if(r==="right"){const Q=this._getYAxisLabelAlignment(h);w=Q.textAlign,k=Q.x}else if(n==="x"){if(r==="center")S=(t.top+t.bottom)/2+f;else if(X(r)){const Q=Object.keys(r)[0],D=r[Q];S=this.chart.scales[Q].getPixelForValue(D)+f}w=this._getXAxisLabelAlignment()}else if(n==="y"){if(r==="center")k=(t.left+t.right)/2-f;else if(X(r)){const Q=Object.keys(r)[0],D=r[Q];k=this.chart.scales[Q].getPixelForValue(D)}w=this._getYAxisLabelAlignment(h).textAlign}n==="y"&&(o==="start"?J="top":o==="end"&&(J="bottom"));const H=this._getLabelSizes();for(p=0,g=l.length;p<g;++p){x=l[p],v=x.label;const Q=i.setContext(this.getContext(p));M=this.getPixelForTick(p)+i.labelOffset,T=this._resolveTickFontOptions(p),C=T.lineHeight,O=pt(v)?v.length:1;const D=O/2,z=Q.color,j=Q.textStrokeColor,U=Q.textStrokeWidth;let lt=w;s?(k=M,w==="inner"&&(p===g-1?lt=this.options.reverse?"left":"right":p===0?lt=this.options.reverse?"right":"left":lt="center"),r==="top"?c==="near"||b!==0?N=-O*C+C/2:c==="center"?N=-H.highest.height/2-D*C+C:N=-H.highest.height+C/2:c==="near"||b!==0?N=C/2:c==="center"?N=H.highest.height/2-D*C:N=H.highest.height-O*C,u&&(N*=-1),b!==0&&!Q.showLabelBackdrop&&(k+=C/2*Math.sin(b))):(S=M,N=(1-O)*C/2);let Ge;if(Q.showLabelBackdrop){const Ae=Gt(Q.backdropPadding),Fe=H.heights[p],Ft=H.widths[p];let ze=N-Ae.top,aa=0-Ae.left;switch(J){case"middle":ze-=Fe/2;break;case"bottom":ze-=Fe;break}switch(w){case"center":aa-=Ft/2;break;case"right":aa-=Ft;break;case"inner":p===g-1?aa-=Ft:p>0&&(aa-=Ft/2);break}Ge={left:aa,top:ze,width:Ft+Ae.width,height:Fe+Ae.height,color:Q.backdropColor}}y.push({label:v,font:T,textOffset:N,options:{rotation:b,color:z,strokeColor:j,strokeWidth:U,textAlign:lt,textBaseline:J,translation:[k,S],backdrop:Ge}})}return y}_getXAxisLabelAlignment(){const{position:t,ticks:n}=this.options;if(-Ce(this.labelRotation))return t==="top"?"left":"right";let r="center";return n.align==="start"?r="left":n.align==="end"?r="right":n.align==="inner"&&(r="inner"),r}_getYAxisLabelAlignment(t){const{position:n,ticks:{crossAlign:a,mirror:r,padding:i}}=this.options,s=this._getLabelSizes(),l=t+i,o=s.widest.width;let c,d;return n==="left"?r?(d=this.right+i,a==="near"?c="left":a==="center"?(c="center",d+=o/2):(c="right",d+=o)):(d=this.right-l,a==="near"?c="right":a==="center"?(c="center",d-=o/2):(c="left",d=this.left)):n==="right"?r?(d=this.left+i,a==="near"?c="right":a==="center"?(c="center",d-=o/2):(c="left",d-=o)):(d=this.left+l,a==="near"?c="left":a==="center"?(c="center",d+=o/2):(c="right",d=this.right)):c="right",{textAlign:c,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,n=this.options.position;if(n==="left"||n==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(n==="top"||n==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:n},left:a,top:r,width:i,height:s}=this;n&&(t.save(),t.fillStyle=n,t.fillRect(a,r,i,s),t.restore())}getLineWidthForValue(t){const n=this.options.grid;if(!this._isVisible()||!n.display)return 0;const r=this.ticks.findIndex(i=>i.value===t);return r>=0?n.setContext(this.getContext(r)).lineWidth:0}drawGrid(t){const n=this.options.grid,a=this.ctx,r=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let i,s;const l=(o,c,d)=>{!d.width||!d.color||(a.save(),a.lineWidth=d.width,a.strokeStyle=d.color,a.setLineDash(d.borderDash||[]),a.lineDashOffset=d.borderDashOffset,a.beginPath(),a.moveTo(o.x,o.y),a.lineTo(c.x,c.y),a.stroke(),a.restore())};if(n.display)for(i=0,s=r.length;i<s;++i){const o=r[i];n.drawOnChartArea&&l({x:o.x1,y:o.y1},{x:o.x2,y:o.y2},o),n.drawTicks&&l({x:o.tx1,y:o.ty1},{x:o.tx2,y:o.ty2},{color:o.tickColor,width:o.tickWidth,borderDash:o.tickBorderDash,borderDashOffset:o.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:n,options:{border:a,grid:r}}=this,i=a.setContext(this.getContext()),s=a.display?i.width:0;if(!s)return;const l=r.setContext(this.getContext(0)).lineWidth,o=this._borderValue;let c,d,u,h;this.isHorizontal()?(c=sa(t,this.left,s)-s/2,d=sa(t,this.right,l)+l/2,u=h=o):(u=sa(t,this.top,s)-s/2,h=sa(t,this.bottom,l)+l/2,c=d=o),n.save(),n.lineWidth=i.width,n.strokeStyle=i.color,n.beginPath(),n.moveTo(c,u),n.lineTo(d,h),n.stroke(),n.restore()}drawLabels(t){if(!this.options.ticks.display)return;const a=this.ctx,r=this._computeLabelArea();r&&po(a,r);const i=this.getLabelItems(t);for(const s of i){const l=s.options,o=s.font,c=s.label,d=s.textOffset;Ca(a,c,0,d,o,l)}r&&go(a)}drawTitle(){const{ctx:t,options:{position:n,title:a,reverse:r}}=this;if(!a.display)return;const i=Dt(a.font),s=Gt(a.padding),l=a.align;let o=i.lineHeight/2;n==="bottom"||n==="center"||X(n)?(o+=s.bottom,pt(a.text)&&(o+=i.lineHeight*(a.text.length-1))):o+=s.top;const{titleX:c,titleY:d,maxWidth:u,rotation:h}=ck(this,o,n,l);Ca(t,a.text,0,0,i,{color:a.color,maxWidth:u,rotation:h,textAlign:ok(l,n,r),textBaseline:"middle",translation:[c,d]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,n=t.ticks&&t.ticks.z||0,a=L(t.grid&&t.grid.z,-1),r=L(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==Ra.prototype.draw?[{z:n,draw:i=>{this.draw(i)}}]:[{z:a,draw:i=>{this.drawBackground(),this.drawGrid(i),this.drawTitle()}},{z:r,draw:()=>{this.drawBorder()}},{z:n,draw:i=>{this.drawLabels(i)}}]}getMatchingVisibleMetas(t){const n=this.chart.getSortedVisibleDatasetMetas(),a=this.axis+"AxisID",r=[];let i,s;for(i=0,s=n.length;i<s;++i){const l=n[i];l[a]===this.id&&(!t||l.type===t)&&r.push(l)}return r}_resolveTickFontOptions(t){const n=this.options.ticks.setContext(this.getContext(t));return Dt(n.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class Os{constructor(t,n,a){this.type=t,this.scope=n,this.override=a,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const n=Object.getPrototypeOf(t);let a;fk(n)&&(a=this.register(n));const r=this.items,i=t.id,s=this.scope+"."+i;if(!i)throw new Error("class does not have id: "+t);return i in r||(r[i]=t,dk(t,s,a),this.override&&gt.override(t.id,t.overrides)),s}get(t){return this.items[t]}unregister(t){const n=this.items,a=t.id,r=this.scope;a in n&&delete n[a],r&&a in gt[r]&&(delete gt[r][a],this.override&&delete Da[a])}}function dk(e,t,n){const a=Vi(Object.create(null),[n?gt.get(n):{},gt.get(t),e.defaults]);gt.set(t,a),e.defaultRoutes&&uk(t,e.defaultRoutes),e.descriptors&&gt.describe(t,e.descriptors)}function uk(e,t){Object.keys(t).forEach(n=>{const a=n.split("."),r=a.pop(),i=[e].concat(a).join("."),s=t[n].split("."),l=s.pop(),o=s.join(".");gt.route(i,r,o,l)})}function fk(e){return"id"in e&&"defaults"in e}class hk{constructor(){this.controllers=new Os(Ee,"datasets",!0),this.elements=new Os(yn,"elements"),this.plugins=new Os(Object,"plugins"),this.scales=new Os(Ra,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,n,a){[...n].forEach(r=>{const i=a||this._getRegistryForType(r);a||i.isForType(r)||i===this.plugins&&r.id?this._exec(t,i,r):tt(r,s=>{const l=a||this._getRegistryForType(s);this._exec(t,l,s)})})}_exec(t,n,a){const r=Uu(t);it(a["before"+r],[],a),n[t](a),it(a["after"+r],[],a)}_getRegistryForType(t){for(let n=0;n<this._typedRegistries.length;n++){const a=this._typedRegistries[n];if(a.isForType(t))return a}return this.plugins}_get(t,n,a){const r=n.get(t);if(r===void 0)throw new Error('"'+t+'" is not a registered '+a+".");return r}}var je=new hk;class pk{constructor(){this._init=void 0}notify(t,n,a,r){if(n==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const i=r?this._descriptors(t).filter(r):this._descriptors(t),s=this._notify(i,t,n,a);return n==="afterDestroy"&&(this._notify(i,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),s}_notify(t,n,a,r){r=r||{};for(const i of t){const s=i.plugin,l=s[a],o=[n,r,i.options];if(it(l,o,s)===!1&&r.cancelable)return!1}return!0}invalidate(){F(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const n=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),n}_createDescriptors(t,n){const a=t&&t.config,r=L(a.options&&a.options.plugins,{}),i=gk(a);return r===!1&&!n?[]:bk(t,i,r,n)}_notifyStateChanges(t){const n=this._oldCache||[],a=this._cache,r=(i,s)=>i.filter(l=>!s.some(o=>l.plugin.id===o.plugin.id));this._notify(r(n,a),t,"stop"),this._notify(r(a,n),t,"start")}}function gk(e){const t={},n=[],a=Object.keys(je.plugins.items);for(let i=0;i<a.length;i++)n.push(je.getPlugin(a[i]));const r=e.plugins||[];for(let i=0;i<r.length;i++){const s=r[i];n.indexOf(s)===-1&&(n.push(s),t[s.id]=!0)}return{plugins:n,localIds:t}}function mk(e,t){return!t&&e===!1?null:e===!0?{}:e}function bk(e,{plugins:t,localIds:n},a,r){const i=[],s=e.getContext();for(const l of t){const o=l.id,c=mk(a[o],r);c!==null&&i.push({plugin:l,options:xk(e.config,{plugin:l,local:n[o]},c,s)})}return i}function xk(e,{plugin:t,local:n},a,r){const i=e.pluginScopeKeys(t),s=e.getOptionScopes(a,i);return n&&t.defaults&&s.push(t.defaults),e.createResolver(s,r,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function Sd(e,t){const n=gt.datasets[e]||{};return((t.datasets||{})[e]||{}).indexAxis||t.indexAxis||n.indexAxis||"x"}function yk(e,t){let n=e;return e==="_index_"?n=t:e==="_value_"&&(n=t==="x"?"y":"x"),n}function vk(e,t){return e===t?"_index_":"_value_"}function v0(e){if(e==="x"||e==="y"||e==="r")return e}function _k(e){if(e==="top"||e==="bottom")return"x";if(e==="left"||e==="right")return"y"}function wd(e,...t){if(v0(e))return e;for(const n of t){const a=n.axis||_k(n.position)||e.length>1&&v0(e[0].toLowerCase());if(a)return a}throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`)}function _0(e,t,n){if(n[t+"AxisID"]===e)return{axis:t}}function kk(e,t){if(t.data&&t.data.datasets){const n=t.data.datasets.filter(a=>a.xAxisID===e||a.yAxisID===e);if(n.length)return _0(e,"x",n[0])||_0(e,"y",n[0])}return{}}function Sk(e,t){const n=Da[e.type]||{scales:{}},a=t.scales||{},r=Sd(e.type,t),i=Object.create(null);return Object.keys(a).forEach(s=>{const l=a[s];if(!X(l))return console.error(`Invalid scale configuration for scale: ${s}`);if(l._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${s}`);const o=wd(s,l,kk(s,e),gt.scales[l.type]),c=vk(o,r),d=n.scales||{};i[s]=xi(Object.create(null),[{axis:o},l,d[o],d[c]])}),e.data.datasets.forEach(s=>{const l=s.type||e.type,o=s.indexAxis||Sd(l,t),d=(Da[l]||{}).scales||{};Object.keys(d).forEach(u=>{const h=yk(u,o),f=s[h+"AxisID"]||h;i[f]=i[f]||Object.create(null),xi(i[f],[{axis:h},a[f],d[u]])})}),Object.keys(i).forEach(s=>{const l=i[s];xi(l,[gt.scales[l.type],gt.scale])}),i}function Qb(e){const t=e.options||(e.options={});t.plugins=L(t.plugins,{}),t.scales=Sk(e,t)}function Kb(e){return e=e||{},e.datasets=e.datasets||[],e.labels=e.labels||[],e}function wk(e){return e=e||{},e.data=Kb(e.data),Qb(e),e}const k0=new Map,Zb=new Set;function zs(e,t){let n=k0.get(e);return n||(n=t(),k0.set(e,n),Zb.add(n)),n}const Xr=(e,t,n)=>{const a=Jn(t,n);a!==void 0&&e.add(a)};class Mk{constructor(t){this._config=wk(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=Kb(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),Qb(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return zs(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,n){return zs(`${t}.transition.${n}`,()=>[[`datasets.${t}.transitions.${n}`,`transitions.${n}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,n){return zs(`${t}-${n}`,()=>[[`datasets.${t}.elements.${n}`,`datasets.${t}`,`elements.${n}`,""]])}pluginScopeKeys(t){const n=t.id,a=this.type;return zs(`${a}-plugin-${n}`,()=>[[`plugins.${n}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,n){const a=this._scopeCache;let r=a.get(t);return(!r||n)&&(r=new Map,a.set(t,r)),r}getOptionScopes(t,n,a){const{options:r,type:i}=this,s=this._cachedScopes(t,a),l=s.get(n);if(l)return l;const o=new Set;n.forEach(d=>{t&&(o.add(t),d.forEach(u=>Xr(o,t,u))),d.forEach(u=>Xr(o,r,u)),d.forEach(u=>Xr(o,Da[i]||{},u)),d.forEach(u=>Xr(o,gt,u)),d.forEach(u=>Xr(o,vd,u))});const c=Array.from(o);return c.length===0&&c.push(Object.create(null)),Zb.has(n)&&s.set(n,c),c}chartOptionScopes(){const{options:t,type:n}=this;return[t,Da[n]||{},gt.datasets[n]||{},{type:n},gt,vd]}resolveNamedOptions(t,n,a,r=[""]){const i={$shared:!0},{resolver:s,subPrefixes:l}=S0(this._resolverCache,t,r);let o=s;if(Tk(s,n)){i.$shared=!1,a=$n(a)?a():a;const c=this.createResolver(t,a,l);o=Sr(s,a,c)}for(const c of n)i[c]=o[c];return i}createResolver(t,n,a=[""],r){const{resolver:i}=S0(this._resolverCache,t,a);return X(n)?Sr(i,n,void 0,r):i}}function S0(e,t,n){let a=e.get(t);a||(a=new Map,e.set(t,a));const r=n.join();let i=a.get(r);return i||(i={resolver:Pu(t,n),subPrefixes:n.filter(l=>!l.toLowerCase().includes("hover"))},a.set(r,i)),i}const Ak=e=>X(e)&&Object.getOwnPropertyNames(e).some(t=>$n(e[t]));function Tk(e,t){const{isScriptable:n,isIndexable:a}=Tb(e);for(const r of t){const i=n(r),s=a(r),l=(s||i)&&e[r];if(i&&($n(l)||Ak(l))||s&&pt(l))return!0}return!1}var Dk="4.5.1";const Ck=["top","bottom","left","right","chartArea"];function w0(e,t){return e==="top"||e==="bottom"||Ck.indexOf(e)===-1&&t==="x"}function M0(e,t){return function(n,a){return n[e]===a[e]?n[t]-a[t]:n[e]-a[e]}}function A0(e){const t=e.chart,n=t.options.animation;t.notifyPlugins("afterRender"),it(n&&n.onComplete,[e],t)}function Ek(e){const t=e.chart,n=t.options.animation;it(n&&n.onProgress,[e],t)}function Wb(e){return Zu()&&typeof e=="string"?e=document.getElementById(e):e&&e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e}const ll={},T0=e=>{const t=Wb(e);return Object.values(ll).filter(n=>n.canvas===t).pop()};function Ok(e,t,n){const a=Object.keys(e);for(const r of a){const i=+r;if(i>=t){const s=e[r];delete e[r],(n>0||i>t)&&(e[i+n]=s)}}}function zk(e,t,n,a){return!n||e.type==="mouseout"?null:a?t:e}class en{static register(...t){je.add(...t),D0()}static unregister(...t){je.remove(...t),D0()}constructor(t,n){const a=this.config=new Mk(n),r=Wb(t),i=T0(r);if(i)throw new Error("Canvas is already in use. Chart with ID '"+i.id+"' must be destroyed before the canvas with ID '"+i.canvas.id+"' can be reused.");const s=a.createResolver(a.chartOptionScopes(),this.getContext());this.platform=new(a.platform||W1(r)),this.platform.updateConfig(a);const l=this.platform.acquireContext(r,s.aspectRatio),o=l&&l.canvas,c=o&&o.height,d=o&&o.width;if(this.id=N2(),this.ctx=l,this.canvas=o,this.width=d,this.height=c,this._options=s,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new pk,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=W2(u=>this.update(u),s.resizeDelay||0),this._dataChanges=[],ll[this.id]=this,!l||!o){console.error("Failed to create chart: can't acquire context from the given item");return}Ie.listen(this,"complete",A0),Ie.listen(this,"progress",Ek),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:n},width:a,height:r,_aspectRatio:i}=this;return F(t)?n&&i?i:r?a/r:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return je}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():Wh(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Qh(this.canvas,this.ctx),this}stop(){return Ie.stop(this),this}resize(t,n){Ie.running(this)?this._resizeBeforeDraw={width:t,height:n}:this._resize(t,n)}_resize(t,n){const a=this.options,r=this.canvas,i=a.maintainAspectRatio&&this.aspectRatio,s=this.platform.getMaximumSize(r,t,n,i),l=a.devicePixelRatio||this.platform.getDevicePixelRatio(),o=this.width?"resize":"attach";this.width=s.width,this.height=s.height,this._aspectRatio=this.aspectRatio,Wh(this,l,!0)&&(this.notifyPlugins("resize",{size:s}),it(a.onResize,[this,s],this),this.attached&&this._doResize(o)&&this.render())}ensureScalesHaveIDs(){const n=this.options.scales||{};tt(n,(a,r)=>{a.id=r})}buildOrUpdateScales(){const t=this.options,n=t.scales,a=this.scales,r=Object.keys(a).reduce((s,l)=>(s[l]=!1,s),{});let i=[];n&&(i=i.concat(Object.keys(n).map(s=>{const l=n[s],o=wd(s,l),c=o==="r",d=o==="x";return{options:l,dposition:c?"chartArea":d?"bottom":"left",dtype:c?"radialLinear":d?"category":"linear"}}))),tt(i,s=>{const l=s.options,o=l.id,c=wd(o,l),d=L(l.type,s.dtype);(l.position===void 0||w0(l.position,c)!==w0(s.dposition))&&(l.position=s.dposition),r[o]=!0;let u=null;if(o in a&&a[o].type===d)u=a[o];else{const h=je.getScale(d);u=new h({id:o,type:d,ctx:this.ctx,chart:this}),a[u.id]=u}u.init(l,t)}),tt(r,(s,l)=>{s||delete a[l]}),tt(a,s=>{Yt.configure(this,s,s.options),Yt.addBox(this,s)})}_updateMetasets(){const t=this._metasets,n=this.data.datasets.length,a=t.length;if(t.sort((r,i)=>r.index-i.index),a>n){for(let r=n;r<a;++r)this._destroyDatasetMeta(r);t.splice(n,a-n)}this._sortedMetasets=t.slice(0).sort(M0("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:n}}=this;t.length>n.length&&delete this._stacks,t.forEach((a,r)=>{n.filter(i=>i===a._dataset).length===0&&this._destroyDatasetMeta(r)})}buildOrUpdateControllers(){const t=[],n=this.data.datasets;let a,r;for(this._removeUnreferencedMetasets(),a=0,r=n.length;a<r;a++){const i=n[a];let s=this.getDatasetMeta(a);const l=i.type||this.config.type;if(s.type&&s.type!==l&&(this._destroyDatasetMeta(a),s=this.getDatasetMeta(a)),s.type=l,s.indexAxis=i.indexAxis||Sd(l,this.options),s.order=i.order||0,s.index=a,s.label=""+i.label,s.visible=this.isDatasetVisible(a),s.controller)s.controller.updateIndex(a),s.controller.linkScales();else{const o=je.getController(l),{datasetElementType:c,dataElementType:d}=gt.datasets[l];Object.assign(o,{dataElementType:je.getElement(d),datasetElementType:c&&je.getElement(c)}),s.controller=new o(this,a),t.push(s.controller)}}return this._updateMetasets(),t}_resetElements(){tt(this.data.datasets,(t,n)=>{this.getDatasetMeta(n).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const n=this.config;n.update();const a=this._options=n.createResolver(n.chartOptionScopes(),this.getContext()),r=this._animationsDisabled=!a.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const i=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let s=0;for(let c=0,d=this.data.datasets.length;c<d;c++){const{controller:u}=this.getDatasetMeta(c),h=!r&&i.indexOf(u)===-1;u.buildOrUpdateElements(h),s=Math.max(+u.getMaxOverflow(),s)}s=this._minPadding=a.layout.autoPadding?s:0,this._updateLayout(s),r||tt(i,c=>{c.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(M0("z","_idx"));const{_active:l,_lastEvent:o}=this;o?this._eventHandler(o,!0):l.length&&this._updateHoverStyles(l,l,!0),this.render()}_updateScales(){tt(this.scales,t=>{Yt.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,n=new Set(Object.keys(this._listeners)),a=new Set(t.events);(!Hh(n,a)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,n=this._getUniformDataChanges()||[];for(const{method:a,start:r,count:i}of n){const s=a==="_removeElements"?-i:i;Ok(t,r,s)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const n=this.data.datasets.length,a=i=>new Set(t.filter(s=>s[0]===i).map((s,l)=>l+","+s.splice(1).join(","))),r=a(0);for(let i=1;i<n;i++)if(!Hh(r,a(i)))return;return Array.from(r).map(i=>i.split(",")).map(i=>({method:i[1],start:+i[2],count:+i[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;Yt.update(this,this.width,this.height,t);const n=this.chartArea,a=n.width<=0||n.height<=0;this._layers=[],tt(this.boxes,r=>{a&&r.position==="chartArea"||(r.configure&&r.configure(),this._layers.push(...r._layers()))},this),this._layers.forEach((r,i)=>{r._idx=i}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let n=0,a=this.data.datasets.length;n<a;++n)this.getDatasetMeta(n).controller.configure();for(let n=0,a=this.data.datasets.length;n<a;++n)this._updateDataset(n,$n(t)?t({datasetIndex:n}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,n){const a=this.getDatasetMeta(t),r={meta:a,index:t,mode:n,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",r)!==!1&&(a.controller._update(n),r.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",r))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(Ie.has(this)?this.attached&&!Ie.running(this)&&Ie.start(this):(this.draw(),A0({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:a,height:r}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(a,r)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const n=this._layers;for(t=0;t<n.length&&n[t].z<=0;++t)n[t].draw(this.chartArea);for(this._drawDatasets();t<n.length;++t)n[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const n=this._sortedMetasets,a=[];let r,i;for(r=0,i=n.length;r<i;++r){const s=n[r];(!t||s.visible)&&a.push(s)}return a}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let n=t.length-1;n>=0;--n)this._drawDataset(t[n]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const n=this.ctx,a={meta:t,index:t.index,cancelable:!0},r=Hb(this,t);this.notifyPlugins("beforeDatasetDraw",a)!==!1&&(r&&po(n,r),t.controller.draw(),r&&go(n),a.cancelable=!1,this.notifyPlugins("afterDatasetDraw",a))}isPointInArea(t){return cn(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,n,a,r){const i=C1.modes[n];return typeof i=="function"?i(this,t,a,r):[]}getDatasetMeta(t){const n=this.data.datasets[t],a=this._metasets;let r=a.filter(i=>i&&i._dataset===n).pop();return r||(r={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:n&&n.order||0,index:t,_dataset:n,_parsed:[],_sorted:!1},a.push(r)),r}getContext(){return this.$context||(this.$context=na(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const n=this.data.datasets[t];if(!n)return!1;const a=this.getDatasetMeta(t);return typeof a.hidden=="boolean"?!a.hidden:!n.hidden}setDatasetVisibility(t,n){const a=this.getDatasetMeta(t);a.hidden=!n}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,n,a){const r=a?"show":"hide",i=this.getDatasetMeta(t),s=i.controller._resolveAnimations(void 0,r);Ui(n)?(i.data[n].hidden=!a,this.update()):(this.setDatasetVisibility(t,a),s.update(i,{visible:a}),this.update(l=>l.datasetIndex===t?r:void 0))}hide(t,n){this._updateVisibility(t,n,!1)}show(t,n){this._updateVisibility(t,n,!0)}_destroyDatasetMeta(t){const n=this._metasets[t];n&&n.controller&&n.controller._destroy(),delete this._metasets[t]}_stop(){let t,n;for(this.stop(),Ie.remove(this),t=0,n=this.data.datasets.length;t<n;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:n}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),Qh(t,n),this.platform.releaseContext(n),this.canvas=null,this.ctx=null),delete ll[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,n=this.platform,a=(i,s)=>{n.addEventListener(this,i,s),t[i]=s},r=(i,s,l)=>{i.offsetX=s,i.offsetY=l,this._eventHandler(i)};tt(this.options.events,i=>a(i,r))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,n=this.platform,a=(o,c)=>{n.addEventListener(this,o,c),t[o]=c},r=(o,c)=>{t[o]&&(n.removeEventListener(this,o,c),delete t[o])},i=(o,c)=>{this.canvas&&this.resize(o,c)};let s;const l=()=>{r("attach",l),this.attached=!0,this.resize(),a("resize",i),a("detach",s)};s=()=>{this.attached=!1,r("resize",i),this._stop(),this._resize(0,0),a("attach",l)},n.isAttached(this.canvas)?l():s()}unbindEvents(){tt(this._listeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._listeners={},tt(this._responsiveListeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,n,a){const r=a?"set":"remove";let i,s,l,o;for(n==="dataset"&&(i=this.getDatasetMeta(t[0].datasetIndex),i.controller["_"+r+"DatasetHoverStyle"]()),l=0,o=t.length;l<o;++l){s=t[l];const c=s&&this.getDatasetMeta(s.datasetIndex).controller;c&&c[r+"HoverStyle"](s.element,s.datasetIndex,s.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const n=this._active||[],a=t.map(({datasetIndex:i,index:s})=>{const l=this.getDatasetMeta(i);if(!l)throw new Error("No dataset found at index "+i);return{datasetIndex:i,element:l.data[s],index:s}});!Vl(a,n)&&(this._active=a,this._lastEvent=null,this._updateHoverStyles(a,n))}notifyPlugins(t,n,a){return this._plugins.notify(this,t,n,a)}isPluginEnabled(t){return this._plugins._cache.filter(n=>n.plugin.id===t).length===1}_updateHoverStyles(t,n,a){const r=this.options.hover,i=(o,c)=>o.filter(d=>!c.some(u=>d.datasetIndex===u.datasetIndex&&d.index===u.index)),s=i(n,t),l=a?t:i(t,n);s.length&&this.updateHoverStyle(s,r.mode,!1),l.length&&r.mode&&this.updateHoverStyle(l,r.mode,!0)}_eventHandler(t,n){const a={event:t,replay:n,cancelable:!0,inChartArea:this.isPointInArea(t)},r=s=>(s.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",a,r)===!1)return;const i=this._handleEvent(t,n,a.inChartArea);return a.cancelable=!1,this.notifyPlugins("afterEvent",a,r),(i||a.changed)&&this.render(),this}_handleEvent(t,n,a){const{_active:r=[],options:i}=this,s=n,l=this._getActiveElements(t,r,a,s),o=V2(t),c=zk(t,this._lastEvent,a,o);a&&(this._lastEvent=null,it(i.onHover,[t,l,this],this),o&&it(i.onClick,[t,l,this],this));const d=!Vl(l,r);return(d||n)&&(this._active=l,this._updateHoverStyles(l,r,n)),this._lastEvent=c,d}_getActiveElements(t,n,a,r){if(t.type==="mouseout")return[];if(!a)return n;const i=this.options.hover;return this.getElementsAtEventForMode(t,i.mode,i,r)}}E(en,"defaults",gt),E(en,"instances",ll),E(en,"overrides",Da),E(en,"registry",je),E(en,"version",Dk),E(en,"getChart",T0);function D0(){return tt(en.instances,e=>e._plugins.invalidate())}function Nk(e,t,n){const{startAngle:a,x:r,y:i,outerRadius:s,innerRadius:l,options:o}=t,{borderWidth:c,borderJoinStyle:d}=o,u=Math.min(c/s,Ut(a-n));if(e.beginPath(),e.arc(r,i,s-c/2,a+u/2,n-u/2),l>0){const h=Math.min(c/l,Ut(a-n));e.arc(r,i,l+c/2,n-h/2,a+h/2,!0)}else{const h=Math.min(c/2,s*Ut(a-n));if(d==="round")e.arc(r,i,h,n-Z/2,a+Z/2,!0);else if(d==="bevel"){const f=2*h*h,m=-f*Math.cos(n+Z/2)+r,b=-f*Math.sin(n+Z/2)+i,y=f*Math.cos(a+Z/2)+r,p=f*Math.sin(a+Z/2)+i;e.lineTo(m,b),e.lineTo(y,p)}}e.closePath(),e.moveTo(0,0),e.rect(0,0,e.canvas.width,e.canvas.height),e.clip("evenodd")}function jk(e,t,n){const{startAngle:a,pixelMargin:r,x:i,y:s,outerRadius:l,innerRadius:o}=t;let c=r/l;e.beginPath(),e.arc(i,s,l,a-c,n+c),o>r?(c=r/o,e.arc(i,s,o,n+c,a-c,!0)):e.arc(i,s,r,n+vt,a-vt),e.closePath(),e.clip()}function Rk(e){return Xu(e,["outerStart","outerEnd","innerStart","innerEnd"])}function Lk(e,t,n,a){const r=Rk(e.options.borderRadius),i=(n-t)/2,s=Math.min(i,a*t/2),l=o=>{const c=(n-Math.min(i,o))*a/2;return zt(o,0,Math.min(i,c))};return{outerStart:l(r.outerStart),outerEnd:l(r.outerEnd),innerStart:zt(r.innerStart,0,s),innerEnd:zt(r.innerEnd,0,s)}}function Va(e,t,n,a){return{x:n+e*Math.cos(t),y:a+e*Math.sin(t)}}function Xl(e,t,n,a,r,i){const{x:s,y:l,startAngle:o,pixelMargin:c,innerRadius:d}=t,u=Math.max(t.outerRadius+a+n-c,0),h=d>0?d+a+n+c:0;let f=0;const m=r-o;if(a){const Q=d>0?d-a:0,D=u>0?u-a:0,z=(Q+D)/2,j=z!==0?m*z/(z+a):m;f=(m-j)/2}const b=Math.max(.001,m*u-n/Z)/u,y=(m-b)/2,p=o+y+f,g=r-y-f,{outerStart:x,outerEnd:v,innerStart:k,innerEnd:S}=Lk(t,h,u,g-p),w=u-x,M=u-v,T=p+x/w,C=g-v/M,O=h+k,N=h+S,J=p+k/O,H=g-S/N;if(e.beginPath(),i){const Q=(T+C)/2;if(e.arc(s,l,u,T,Q),e.arc(s,l,u,Q,C),v>0){const U=Va(M,C,s,l);e.arc(U.x,U.y,v,C,g+vt)}const D=Va(N,g,s,l);if(e.lineTo(D.x,D.y),S>0){const U=Va(N,H,s,l);e.arc(U.x,U.y,S,g+vt,H+Math.PI)}const z=(g-S/h+(p+k/h))/2;if(e.arc(s,l,h,g-S/h,z,!0),e.arc(s,l,h,z,p+k/h,!0),k>0){const U=Va(O,J,s,l);e.arc(U.x,U.y,k,J+Math.PI,p-vt)}const j=Va(w,p,s,l);if(e.lineTo(j.x,j.y),x>0){const U=Va(w,T,s,l);e.arc(U.x,U.y,x,p-vt,T)}}else{e.moveTo(s,l);const Q=Math.cos(T)*u+s,D=Math.sin(T)*u+l;e.lineTo(Q,D);const z=Math.cos(C)*u+s,j=Math.sin(C)*u+l;e.lineTo(z,j)}e.closePath()}function Bk(e,t,n,a,r){const{fullCircles:i,startAngle:s,circumference:l}=t;let o=t.endAngle;if(i){Xl(e,t,n,a,o,r);for(let c=0;c<i;++c)e.fill();isNaN(l)||(o=s+(l%ut||ut))}return Xl(e,t,n,a,o,r),e.fill(),o}function Hk(e,t,n,a,r){const{fullCircles:i,startAngle:s,circumference:l,options:o}=t,{borderWidth:c,borderJoinStyle:d,borderDash:u,borderDashOffset:h,borderRadius:f}=o,m=o.borderAlign==="inner";if(!c)return;e.setLineDash(u||[]),e.lineDashOffset=h,m?(e.lineWidth=c*2,e.lineJoin=d||"round"):(e.lineWidth=c,e.lineJoin=d||"bevel");let b=t.endAngle;if(i){Xl(e,t,n,a,b,r);for(let y=0;y<i;++y)e.stroke();isNaN(l)||(b=s+(l%ut||ut))}m&&jk(e,t,b),o.selfJoin&&b-s>=Z&&f===0&&d!=="miter"&&Nk(e,t,b),i||(Xl(e,t,n,a,b,r),e.stroke())}class ei extends yn{constructor(n){super();E(this,"circumference");E(this,"endAngle");E(this,"fullCircles");E(this,"innerRadius");E(this,"outerRadius");E(this,"pixelMargin");E(this,"startAngle");this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,n&&Object.assign(this,n)}inRange(n,a,r){const i=this.getProps(["x","y"],r),{angle:s,distance:l}=bb(i,{x:n,y:a}),{startAngle:o,endAngle:c,innerRadius:d,outerRadius:u,circumference:h}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],r),f=(this.options.spacing+this.options.borderWidth)/2,m=L(h,c-o),b=Yi(s,o,c)&&o!==c,y=m>=ut||b,p=ln(l,d+f,u+f);return y&&p}getCenterPoint(n){const{x:a,y:r,startAngle:i,endAngle:s,innerRadius:l,outerRadius:o}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],n),{offset:c,spacing:d}=this.options,u=(i+s)/2,h=(l+o+d+c)/2;return{x:a+Math.cos(u)*h,y:r+Math.sin(u)*h}}tooltipPosition(n){return this.getCenterPoint(n)}draw(n){const{options:a,circumference:r}=this,i=(a.offset||0)/4,s=(a.spacing||0)/2,l=a.circular;if(this.pixelMargin=a.borderAlign==="inner"?.33:0,this.fullCircles=r>ut?Math.floor(r/ut):0,r===0||this.innerRadius<0||this.outerRadius<0)return;n.save();const o=(this.startAngle+this.endAngle)/2;n.translate(Math.cos(o)*i,Math.sin(o)*i);const c=1-Math.sin(Math.min(Z,r||0)),d=i*c;n.fillStyle=a.backgroundColor,n.strokeStyle=a.borderColor,Bk(n,this,d,s,l),Hk(n,this,d,s,l),n.restore()}}E(ei,"id","arc"),E(ei,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1}),E(ei,"defaultRoutes",{backgroundColor:"backgroundColor"}),E(ei,"descriptors",{_scriptable:!0,_indexable:n=>n!=="borderDash"});function Ib(e,t,n=t){e.lineCap=L(n.borderCapStyle,t.borderCapStyle),e.setLineDash(L(n.borderDash,t.borderDash)),e.lineDashOffset=L(n.borderDashOffset,t.borderDashOffset),e.lineJoin=L(n.borderJoinStyle,t.borderJoinStyle),e.lineWidth=L(n.borderWidth,t.borderWidth),e.strokeStyle=L(n.borderColor,t.borderColor)}function Vk(e,t,n){e.lineTo(n.x,n.y)}function Uk(e){return e.stepped?o_:e.tension||e.cubicInterpolationMode==="monotone"?c_:Vk}function Jb(e,t,n={}){const a=e.length,{start:r=0,end:i=a-1}=n,{start:s,end:l}=t,o=Math.max(r,s),c=Math.min(i,l),d=r<s&&i<s||r>l&&i>l;return{count:a,start:o,loop:t.loop,ilen:c<o&&!d?a+c-o:c-o}}function Yk(e,t,n,a){const{points:r,options:i}=t,{count:s,start:l,loop:o,ilen:c}=Jb(r,n,a),d=Uk(i);let{move:u=!0,reverse:h}=a||{},f,m,b;for(f=0;f<=c;++f)m=r[(l+(h?c-f:f))%s],!m.skip&&(u?(e.moveTo(m.x,m.y),u=!1):d(e,b,m,h,i.stepped),b=m);return o&&(m=r[(l+(h?c:0))%s],d(e,b,m,h,i.stepped)),!!o}function Gk(e,t,n,a){const r=t.points,{count:i,start:s,ilen:l}=Jb(r,n,a),{move:o=!0,reverse:c}=a||{};let d=0,u=0,h,f,m,b,y,p;const g=v=>(s+(c?l-v:v))%i,x=()=>{b!==y&&(e.lineTo(d,y),e.lineTo(d,b),e.lineTo(d,p))};for(o&&(f=r[g(0)],e.moveTo(f.x,f.y)),h=0;h<=l;++h){if(f=r[g(h)],f.skip)continue;const v=f.x,k=f.y,S=v|0;S===m?(k<b?b=k:k>y&&(y=k),d=(u*d+v)/++u):(x(),e.lineTo(v,k),m=S,u=0,b=y=k),p=k}x()}function Md(e){const t=e.options,n=t.borderDash&&t.borderDash.length;return!e._decimated&&!e._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!n?Gk:Yk}function Fk(e){return e.stepped?Y_:e.tension||e.cubicInterpolationMode==="monotone"?G_:pa}function qk(e,t,n,a){let r=t._path;r||(r=t._path=new Path2D,t.path(r,n,a)&&r.closePath()),Ib(e,t.options),e.stroke(r)}function Xk(e,t,n,a){const{segments:r,options:i}=t,s=Md(t);for(const l of r)Ib(e,i,l.style),e.beginPath(),s(e,t,l,{start:n,end:n+a-1})&&e.closePath(),e.stroke()}const Pk=typeof Path2D=="function";function Qk(e,t,n,a){Pk&&!t.options.segment?qk(e,t,n,a):Xk(e,t,n,a)}class Ln extends yn{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,n){const a=this.options;if((a.tension||a.cubicInterpolationMode==="monotone")&&!a.stepped&&!this._pointsUpdated){const r=a.spanGaps?this._loop:this._fullLoop;N_(this._points,a,t,r,n),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=K_(this,this.options.segment))}first(){const t=this.segments,n=this.points;return t.length&&n[t[0].start]}last(){const t=this.segments,n=this.points,a=t.length;return a&&n[t[a-1].end]}interpolate(t,n){const a=this.options,r=t[n],i=this.points,s=Bb(this,{property:n,start:r,end:r});if(!s.length)return;const l=[],o=Fk(a);let c,d;for(c=0,d=s.length;c<d;++c){const{start:u,end:h}=s[c],f=i[u],m=i[h];if(f===m){l.push(f);continue}const b=Math.abs((r-f[n])/(m[n]-f[n])),y=o(f,m,b,a.stepped);y[n]=t[n],l.push(y)}return l.length===1?l[0]:l}pathSegment(t,n,a){return Md(this)(t,this,n,a)}path(t,n,a){const r=this.segments,i=Md(this);let s=this._loop;n=n||0,a=a||this.points.length-n;for(const l of r)s&=i(t,this,l,{start:n,end:n+a-1});return!!s}draw(t,n,a,r){const i=this.options||{};(this.points||[]).length&&i.borderWidth&&(t.save(),Qk(t,this,a,r),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}E(Ln,"id","line"),E(Ln,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),E(Ln,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),E(Ln,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function C0(e,t,n,a){const r=e.options,{[n]:i}=e.getProps([n],a);return Math.abs(t-i)<r.radius+r.hitRadius}class ol extends yn{constructor(n){super();E(this,"parsed");E(this,"skip");E(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,n&&Object.assign(this,n)}inRange(n,a,r){const i=this.options,{x:s,y:l}=this.getProps(["x","y"],r);return Math.pow(n-s,2)+Math.pow(a-l,2)<Math.pow(i.hitRadius+i.radius,2)}inXRange(n,a){return C0(this,n,"x",a)}inYRange(n,a){return C0(this,n,"y",a)}getCenterPoint(n){const{x:a,y:r}=this.getProps(["x","y"],n);return{x:a,y:r}}size(n){n=n||this.options||{};let a=n.radius||0;a=Math.max(a,a&&n.hoverRadius||0);const r=a&&n.borderWidth||0;return(a+r)*2}draw(n,a){const r=this.options;this.skip||r.radius<.1||!cn(this,a,this.size(r)/2)||(n.strokeStyle=r.borderColor,n.lineWidth=r.borderWidth,n.fillStyle=r.backgroundColor,_d(n,r,this.x,this.y))}getRange(){const n=this.options||{};return n.radius+n.hitRadius}}E(ol,"id","point"),E(ol,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),E(ol,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function $b(e,t){const{x:n,y:a,base:r,width:i,height:s}=e.getProps(["x","y","base","width","height"],t);let l,o,c,d,u;return e.horizontal?(u=s/2,l=Math.min(n,r),o=Math.max(n,r),c=a-u,d=a+u):(u=i/2,l=n-u,o=n+u,c=Math.min(a,r),d=Math.max(a,r)),{left:l,top:c,right:o,bottom:d}}function Bn(e,t,n,a){return e?0:zt(t,n,a)}function Kk(e,t,n){const a=e.options.borderWidth,r=e.borderSkipped,i=Ab(a);return{t:Bn(r.top,i.top,0,n),r:Bn(r.right,i.right,0,t),b:Bn(r.bottom,i.bottom,0,n),l:Bn(r.left,i.left,0,t)}}function Zk(e,t,n){const{enableBorderRadius:a}=e.getProps(["enableBorderRadius"]),r=e.options.borderRadius,i=_a(r),s=Math.min(t,n),l=e.borderSkipped,o=a||X(r);return{topLeft:Bn(!o||l.top||l.left,i.topLeft,0,s),topRight:Bn(!o||l.top||l.right,i.topRight,0,s),bottomLeft:Bn(!o||l.bottom||l.left,i.bottomLeft,0,s),bottomRight:Bn(!o||l.bottom||l.right,i.bottomRight,0,s)}}function Wk(e){const t=$b(e),n=t.right-t.left,a=t.bottom-t.top,r=Kk(e,n/2,a/2),i=Zk(e,n/2,a/2);return{outer:{x:t.left,y:t.top,w:n,h:a,radius:i},inner:{x:t.left+r.l,y:t.top+r.t,w:n-r.l-r.r,h:a-r.t-r.b,radius:{topLeft:Math.max(0,i.topLeft-Math.max(r.t,r.l)),topRight:Math.max(0,i.topRight-Math.max(r.t,r.r)),bottomLeft:Math.max(0,i.bottomLeft-Math.max(r.b,r.l)),bottomRight:Math.max(0,i.bottomRight-Math.max(r.b,r.r))}}}}function hc(e,t,n,a){const r=t===null,i=n===null,l=e&&!(r&&i)&&$b(e,a);return l&&(r||ln(t,l.left,l.right))&&(i||ln(n,l.top,l.bottom))}function Ik(e){return e.topLeft||e.topRight||e.bottomLeft||e.bottomRight}function Jk(e,t){e.rect(t.x,t.y,t.w,t.h)}function pc(e,t,n={}){const a=e.x!==n.x?-t:0,r=e.y!==n.y?-t:0,i=(e.x+e.w!==n.x+n.w?t:0)-a,s=(e.y+e.h!==n.y+n.h?t:0)-r;return{x:e.x+a,y:e.y+r,w:e.w+i,h:e.h+s,radius:e.radius}}class cl extends yn{constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:n,options:{borderColor:a,backgroundColor:r}}=this,{inner:i,outer:s}=Wk(this),l=Ik(s.radius)?Gi:Jk;t.save(),(s.w!==i.w||s.h!==i.h)&&(t.beginPath(),l(t,pc(s,n,i)),t.clip(),l(t,pc(i,-n,s)),t.fillStyle=a,t.fill("evenodd")),t.beginPath(),l(t,pc(i,n)),t.fillStyle=r,t.fill(),t.restore()}inRange(t,n,a){return hc(this,t,n,a)}inXRange(t,n){return hc(this,t,null,n)}inYRange(t,n){return hc(this,null,t,n)}getCenterPoint(t){const{x:n,y:a,base:r,horizontal:i}=this.getProps(["x","y","base","horizontal"],t);return{x:i?(n+r)/2:n,y:i?a:(a+r)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}E(cl,"id","bar"),E(cl,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),E(cl,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});var $k=Object.freeze({__proto__:null,ArcElement:ei,BarElement:cl,LineElement:Ln,PointElement:ol});const Ad=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],E0=Ad.map(e=>e.replace("rgb(","rgba(").replace(")",", 0.5)"));function tx(e){return Ad[e%Ad.length]}function ex(e){return E0[e%E0.length]}function tS(e,t){return e.borderColor=tx(t),e.backgroundColor=ex(t),++t}function eS(e,t){return e.backgroundColor=e.data.map(()=>tx(t++)),t}function nS(e,t){return e.backgroundColor=e.data.map(()=>ex(t++)),t}function aS(e){let t=0;return(n,a)=>{const r=e.getDatasetMeta(a).controller;r instanceof ga?t=eS(n,t):r instanceof ki?t=nS(n,t):r&&(t=tS(n,t))}}function O0(e){let t;for(t in e)if(e[t].borderColor||e[t].backgroundColor)return!0;return!1}function rS(e){return e&&(e.borderColor||e.backgroundColor)}function iS(){return gt.borderColor!=="rgba(0,0,0,0.1)"||gt.backgroundColor!=="rgba(0,0,0,0.1)"}var sS={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(e,t,n){if(!n.enabled)return;const{data:{datasets:a},options:r}=e.config,{elements:i}=r,s=O0(a)||rS(r)||i&&O0(i)||iS();if(!n.forceOverride&&s)return;const l=aS(e);a.forEach(l)}};function lS(e,t,n,a,r){const i=r.samples||a;if(i>=n)return e.slice(t,t+n);const s=[],l=(n-2)/(i-2);let o=0;const c=t+n-1;let d=t,u,h,f,m,b;for(s[o++]=e[d],u=0;u<i-2;u++){let y=0,p=0,g;const x=Math.floor((u+1)*l)+1+t,v=Math.min(Math.floor((u+2)*l)+1,n)+t,k=v-x;for(g=x;g<v;g++)y+=e[g].x,p+=e[g].y;y/=k,p/=k;const S=Math.floor(u*l)+1+t,w=Math.min(Math.floor((u+1)*l)+1,n)+t,{x:M,y:T}=e[d];for(f=m=-1,g=S;g<w;g++)m=.5*Math.abs((M-y)*(e[g].y-T)-(M-e[g].x)*(p-T)),m>f&&(f=m,h=e[g],b=g);s[o++]=h,d=b}return s[o++]=e[c],s}function oS(e,t,n,a){let r=0,i=0,s,l,o,c,d,u,h,f,m,b;const y=[],p=t+n-1,g=e[t].x,v=e[p].x-g;for(s=t;s<t+n;++s){l=e[s],o=(l.x-g)/v*a,c=l.y;const k=o|0;if(k===d)c<m?(m=c,u=s):c>b&&(b=c,h=s),r=(i*r+l.x)/++i;else{const S=s-1;if(!F(u)&&!F(h)){const w=Math.min(u,h),M=Math.max(u,h);w!==f&&w!==S&&y.push({...e[w],x:r}),M!==f&&M!==S&&y.push({...e[M],x:r})}s>0&&S!==f&&y.push(e[S]),y.push(l),d=k,i=0,m=b=c,u=h=f=s}}return y}function nx(e){if(e._decimated){const t=e._data;delete e._decimated,delete e._data,Object.defineProperty(e,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function z0(e){e.data.datasets.forEach(t=>{nx(t)})}function cS(e,t){const n=t.length;let a=0,r;const{iScale:i}=e,{min:s,max:l,minDefined:o,maxDefined:c}=i.getUserBounds();return o&&(a=zt(on(t,i.axis,s).lo,0,n-1)),c?r=zt(on(t,i.axis,l).hi+1,a,n)-a:r=n-a,{start:a,count:r}}var dS={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(e,t,n)=>{if(!n.enabled){z0(e);return}const a=e.width;e.data.datasets.forEach((r,i)=>{const{_data:s,indexAxis:l}=r,o=e.getDatasetMeta(i),c=s||r.data;if($r([l,e.options.indexAxis])==="y"||!o.controller.supportsDecimation)return;const d=e.scales[o.xAxisID];if(d.type!=="linear"&&d.type!=="time"||e.options.parsing)return;let{start:u,count:h}=cS(o,c);const f=n.threshold||4*a;if(h<=f){nx(r);return}F(s)&&(r._data=c,delete r.data,Object.defineProperty(r,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(b){this._data=b}}));let m;switch(n.algorithm){case"lttb":m=lS(c,u,h,a,n);break;case"min-max":m=oS(c,u,h,a);break;default:throw new Error(`Unsupported decimation algorithm '${n.algorithm}'`)}r._decimated=m})},destroy(e){z0(e)}};function uS(e,t,n){const a=e.segments,r=e.points,i=t.points,s=[];for(const l of a){let{start:o,end:c}=l;c=xo(o,c,r);const d=Td(n,r[o],r[c],l.loop);if(!t.segments){s.push({source:l,target:d,start:r[o],end:r[c]});continue}const u=Bb(t,d);for(const h of u){const f=Td(n,i[h.start],i[h.end],h.loop),m=Lb(l,r,f);for(const b of m)s.push({source:b,target:h,start:{[n]:N0(d,f,"start",Math.max)},end:{[n]:N0(d,f,"end",Math.min)}})}}return s}function Td(e,t,n,a){if(a)return;let r=t[e],i=n[e];return e==="angle"&&(r=Ut(r),i=Ut(i)),{property:e,start:r,end:i}}function fS(e,t){const{x:n=null,y:a=null}=e||{},r=t.points,i=[];return t.segments.forEach(({start:s,end:l})=>{l=xo(s,l,r);const o=r[s],c=r[l];a!==null?(i.push({x:o.x,y:a}),i.push({x:c.x,y:a})):n!==null&&(i.push({x:n,y:o.y}),i.push({x:n,y:c.y}))}),i}function xo(e,t,n){for(;t>e;t--){const a=n[t];if(!isNaN(a.x)&&!isNaN(a.y))break}return t}function N0(e,t,n,a){return e&&t?a(e[n],t[n]):e?e[n]:t?t[n]:0}function ax(e,t){let n=[],a=!1;return pt(e)?(a=!0,n=e):n=fS(e,t),n.length?new Ln({points:n,options:{tension:0},_loop:a,_fullLoop:a}):null}function j0(e){return e&&e.fill!==!1}function hS(e,t,n){let r=e[t].fill;const i=[t];let s;if(!n)return r;for(;r!==!1&&i.indexOf(r)===-1;){if(!xt(r))return r;if(s=e[r],!s)return!1;if(s.visible)return r;i.push(r),r=s.fill}return!1}function pS(e,t,n){const a=xS(e);if(X(a))return isNaN(a.value)?!1:a;let r=parseFloat(a);return xt(r)&&Math.floor(r)===r?gS(a[0],t,r,n):["origin","start","end","stack","shape"].indexOf(a)>=0&&a}function gS(e,t,n,a){return(e==="-"||e==="+")&&(n=t+n),n===t||n<0||n>=a?!1:n}function mS(e,t){let n=null;return e==="start"?n=t.bottom:e==="end"?n=t.top:X(e)?n=t.getPixelForValue(e.value):t.getBasePixel&&(n=t.getBasePixel()),n}function bS(e,t,n){let a;return e==="start"?a=n:e==="end"?a=t.options.reverse?t.min:t.max:X(e)?a=e.value:a=t.getBaseValue(),a}function xS(e){const t=e.options,n=t.fill;let a=L(n&&n.target,n);return a===void 0&&(a=!!t.backgroundColor),a===!1||a===null?!1:a===!0?"origin":a}function yS(e){const{scale:t,index:n,line:a}=e,r=[],i=a.segments,s=a.points,l=vS(t,n);l.push(ax({x:null,y:t.bottom},a));for(let o=0;o<i.length;o++){const c=i[o];for(let d=c.start;d<=c.end;d++)_S(r,s[d],l)}return new Ln({points:r,options:{}})}function vS(e,t){const n=[],a=e.getMatchingVisibleMetas("line");for(let r=0;r<a.length;r++){const i=a[r];if(i.index===t)break;i.hidden||n.unshift(i.dataset)}return n}function _S(e,t,n){const a=[];for(let r=0;r<n.length;r++){const i=n[r],{first:s,last:l,point:o}=kS(i,t,"x");if(!(!o||s&&l)){if(s)a.unshift(o);else if(e.push(o),!l)break}}e.push(...a)}function kS(e,t,n){const a=e.interpolate(t,n);if(!a)return{};const r=a[n],i=e.segments,s=e.points;let l=!1,o=!1;for(let c=0;c<i.length;c++){const d=i[c],u=s[d.start][n],h=s[d.end][n];if(ln(r,u,h)){l=r===u,o=r===h;break}}return{first:l,last:o,point:a}}class rx{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,n,a){const{x:r,y:i,radius:s}=this;return n=n||{start:0,end:ut},t.arc(r,i,s,n.end,n.start,!0),!a.bounds}interpolate(t){const{x:n,y:a,radius:r}=this,i=t.angle;return{x:n+Math.cos(i)*r,y:a+Math.sin(i)*r,angle:i}}}function SS(e){const{chart:t,fill:n,line:a}=e;if(xt(n))return wS(t,n);if(n==="stack")return yS(e);if(n==="shape")return!0;const r=MS(e);return r instanceof rx?r:ax(r,a)}function wS(e,t){const n=e.getDatasetMeta(t);return n&&e.isDatasetVisible(t)?n.dataset:null}function MS(e){return(e.scale||{}).getPointPositionForValue?TS(e):AS(e)}function AS(e){const{scale:t={},fill:n}=e,a=mS(n,t);if(xt(a)){const r=t.isHorizontal();return{x:r?a:null,y:r?null:a}}return null}function TS(e){const{scale:t,fill:n}=e,a=t.options,r=t.getLabels().length,i=a.reverse?t.max:t.min,s=bS(n,t,i),l=[];if(a.grid.circular){const o=t.getPointPositionForValue(0,i);return new rx({x:o.x,y:o.y,radius:t.getDistanceFromCenterForValue(s)})}for(let o=0;o<r;++o)l.push(t.getPointPositionForValue(o,s));return l}function gc(e,t,n){const a=SS(t),{chart:r,index:i,line:s,scale:l,axis:o}=t,c=s.options,d=c.fill,u=c.backgroundColor,{above:h=u,below:f=u}=d||{},m=r.getDatasetMeta(i),b=Hb(r,m);a&&s.points.length&&(po(e,n),DS(e,{line:s,target:a,above:h,below:f,area:n,scale:l,axis:o,clip:b}),go(e))}function DS(e,t){const{line:n,target:a,above:r,below:i,area:s,scale:l,clip:o}=t,c=n._loop?"angle":t.axis;e.save();let d=i;i!==r&&(c==="x"?(R0(e,a,s.top),mc(e,{line:n,target:a,color:r,scale:l,property:c,clip:o}),e.restore(),e.save(),R0(e,a,s.bottom)):c==="y"&&(L0(e,a,s.left),mc(e,{line:n,target:a,color:i,scale:l,property:c,clip:o}),e.restore(),e.save(),L0(e,a,s.right),d=r)),mc(e,{line:n,target:a,color:d,scale:l,property:c,clip:o}),e.restore()}function R0(e,t,n){const{segments:a,points:r}=t;let i=!0,s=!1;e.beginPath();for(const l of a){const{start:o,end:c}=l,d=r[o],u=r[xo(o,c,r)];i?(e.moveTo(d.x,d.y),i=!1):(e.lineTo(d.x,n),e.lineTo(d.x,d.y)),s=!!t.pathSegment(e,l,{move:s}),s?e.closePath():e.lineTo(u.x,n)}e.lineTo(t.first().x,n),e.closePath(),e.clip()}function L0(e,t,n){const{segments:a,points:r}=t;let i=!0,s=!1;e.beginPath();for(const l of a){const{start:o,end:c}=l,d=r[o],u=r[xo(o,c,r)];i?(e.moveTo(d.x,d.y),i=!1):(e.lineTo(n,d.y),e.lineTo(d.x,d.y)),s=!!t.pathSegment(e,l,{move:s}),s?e.closePath():e.lineTo(n,u.y)}e.lineTo(n,t.first().y),e.closePath(),e.clip()}function mc(e,t){const{line:n,target:a,property:r,color:i,scale:s,clip:l}=t,o=uS(n,a,r);for(const{source:c,target:d,start:u,end:h}of o){const{style:{backgroundColor:f=i}={}}=c,m=a!==!0;e.save(),e.fillStyle=f,CS(e,s,l,m&&Td(r,u,h)),e.beginPath();const b=!!n.pathSegment(e,c);let y;if(m){b?e.closePath():B0(e,a,h,r);const p=!!a.pathSegment(e,d,{move:b,reverse:!0});y=b&&p,y||B0(e,a,u,r)}e.closePath(),e.fill(y?"evenodd":"nonzero"),e.restore()}}function CS(e,t,n,a){const r=t.chart.chartArea,{property:i,start:s,end:l}=a||{};if(i==="x"||i==="y"){let o,c,d,u;i==="x"?(o=s,c=r.top,d=l,u=r.bottom):(o=r.left,c=s,d=r.right,u=l),e.beginPath(),n&&(o=Math.max(o,n.left),d=Math.min(d,n.right),c=Math.max(c,n.top),u=Math.min(u,n.bottom)),e.rect(o,c,d-o,u-c),e.clip()}}function B0(e,t,n,a){const r=t.interpolate(n,a);r&&e.lineTo(r.x,r.y)}var ES={id:"filler",afterDatasetsUpdate(e,t,n){const a=(e.data.datasets||[]).length,r=[];let i,s,l,o;for(s=0;s<a;++s)i=e.getDatasetMeta(s),l=i.dataset,o=null,l&&l.options&&l instanceof Ln&&(o={visible:e.isDatasetVisible(s),index:s,fill:pS(l,s,a),chart:e,axis:i.controller.options.indexAxis,scale:i.vScale,line:l}),i.$filler=o,r.push(o);for(s=0;s<a;++s)o=r[s],!(!o||o.fill===!1)&&(o.fill=hS(r,s,n.propagate))},beforeDraw(e,t,n){const a=n.drawTime==="beforeDraw",r=e.getSortedVisibleDatasetMetas(),i=e.chartArea;for(let s=r.length-1;s>=0;--s){const l=r[s].$filler;l&&(l.line.updateControlPoints(i,l.axis),a&&l.fill&&gc(e.ctx,l,i))}},beforeDatasetsDraw(e,t,n){if(n.drawTime!=="beforeDatasetsDraw")return;const a=e.getSortedVisibleDatasetMetas();for(let r=a.length-1;r>=0;--r){const i=a[r].$filler;j0(i)&&gc(e.ctx,i,e.chartArea)}},beforeDatasetDraw(e,t,n){const a=t.meta.$filler;!j0(a)||n.drawTime!=="beforeDatasetDraw"||gc(e.ctx,a,e.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const H0=(e,t)=>{let{boxHeight:n=t,boxWidth:a=t}=e;return e.usePointStyle&&(n=Math.min(n,t),a=e.pointStyleWidth||Math.min(a,t)),{boxWidth:a,boxHeight:n,itemHeight:Math.max(t,n)}},OS=(e,t)=>e!==null&&t!==null&&e.datasetIndex===t.datasetIndex&&e.index===t.index;class V0 extends yn{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n,a){this.maxWidth=t,this.maxHeight=n,this._margins=a,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let n=it(t.generateLabels,[this.chart],this)||[];t.filter&&(n=n.filter(a=>t.filter(a,this.chart.data))),t.sort&&(n=n.sort((a,r)=>t.sort(a,r,this.chart.data))),this.options.reverse&&n.reverse(),this.legendItems=n}fit(){const{options:t,ctx:n}=this;if(!t.display){this.width=this.height=0;return}const a=t.labels,r=Dt(a.font),i=r.size,s=this._computeTitleHeight(),{boxWidth:l,itemHeight:o}=H0(a,i);let c,d;n.font=r.string,this.isHorizontal()?(c=this.maxWidth,d=this._fitRows(s,i,l,o)+10):(d=this.maxHeight,c=this._fitCols(s,r,l,o)+10),this.width=Math.min(c,t.maxWidth||this.maxWidth),this.height=Math.min(d,t.maxHeight||this.maxHeight)}_fitRows(t,n,a,r){const{ctx:i,maxWidth:s,options:{labels:{padding:l}}}=this,o=this.legendHitBoxes=[],c=this.lineWidths=[0],d=r+l;let u=t;i.textAlign="left",i.textBaseline="middle";let h=-1,f=-d;return this.legendItems.forEach((m,b)=>{const y=a+n/2+i.measureText(m.text).width;(b===0||c[c.length-1]+y+2*l>s)&&(u+=d,c[c.length-(b>0?0:1)]=0,f+=d,h++),o[b]={left:0,top:f,row:h,width:y,height:r},c[c.length-1]+=y+l}),u}_fitCols(t,n,a,r){const{ctx:i,maxHeight:s,options:{labels:{padding:l}}}=this,o=this.legendHitBoxes=[],c=this.columnSizes=[],d=s-t;let u=l,h=0,f=0,m=0,b=0;return this.legendItems.forEach((y,p)=>{const{itemWidth:g,itemHeight:x}=zS(a,n,i,y,r);p>0&&f+x+2*l>d&&(u+=h+l,c.push({width:h,height:f}),m+=h+l,b++,h=f=0),o[p]={left:m,top:f,col:b,width:g,height:x},h=Math.max(h,g),f+=x+l}),u+=h,c.push({width:h,height:f}),u}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:n,options:{align:a,labels:{padding:r},rtl:i}}=this,s=dr(i,this.left,this.width);if(this.isHorizontal()){let l=0,o=Vt(a,this.left+r,this.right-this.lineWidths[l]);for(const c of n)l!==c.row&&(l=c.row,o=Vt(a,this.left+r,this.right-this.lineWidths[l])),c.top+=this.top+t+r,c.left=s.leftForLtr(s.x(o),c.width),o+=c.width+r}else{let l=0,o=Vt(a,this.top+t+r,this.bottom-this.columnSizes[l].height);for(const c of n)c.col!==l&&(l=c.col,o=Vt(a,this.top+t+r,this.bottom-this.columnSizes[l].height)),c.top=o,c.left+=this.left+r,c.left=s.leftForLtr(s.x(c.left),c.width),o+=c.height+r}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;po(t,this),this._draw(),go(t)}}_draw(){const{options:t,columnSizes:n,lineWidths:a,ctx:r}=this,{align:i,labels:s}=t,l=gt.color,o=dr(t.rtl,this.left,this.width),c=Dt(s.font),{padding:d}=s,u=c.size,h=u/2;let f;this.drawTitle(),r.textAlign=o.textAlign("left"),r.textBaseline="middle",r.lineWidth=.5,r.font=c.string;const{boxWidth:m,boxHeight:b,itemHeight:y}=H0(s,u),p=function(S,w,M){if(isNaN(m)||m<=0||isNaN(b)||b<0)return;r.save();const T=L(M.lineWidth,1);if(r.fillStyle=L(M.fillStyle,l),r.lineCap=L(M.lineCap,"butt"),r.lineDashOffset=L(M.lineDashOffset,0),r.lineJoin=L(M.lineJoin,"miter"),r.lineWidth=T,r.strokeStyle=L(M.strokeStyle,l),r.setLineDash(L(M.lineDash,[])),s.usePointStyle){const C={radius:b*Math.SQRT2/2,pointStyle:M.pointStyle,rotation:M.rotation,borderWidth:T},O=o.xPlus(S,m/2),N=w+h;Mb(r,C,O,N,s.pointStyleWidth&&m)}else{const C=w+Math.max((u-b)/2,0),O=o.leftForLtr(S,m),N=_a(M.borderRadius);r.beginPath(),Object.values(N).some(J=>J!==0)?Gi(r,{x:O,y:C,w:m,h:b,radius:N}):r.rect(O,C,m,b),r.fill(),T!==0&&r.stroke()}r.restore()},g=function(S,w,M){Ca(r,M.text,S,w+y/2,c,{strikethrough:M.hidden,textAlign:o.textAlign(M.textAlign)})},x=this.isHorizontal(),v=this._computeTitleHeight();x?f={x:Vt(i,this.left+d,this.right-a[0]),y:this.top+d+v,line:0}:f={x:this.left+d,y:Vt(i,this.top+v+d,this.bottom-n[0].height),line:0},Nb(this.ctx,t.textDirection);const k=y+d;this.legendItems.forEach((S,w)=>{r.strokeStyle=S.fontColor,r.fillStyle=S.fontColor;const M=r.measureText(S.text).width,T=o.textAlign(S.textAlign||(S.textAlign=s.textAlign)),C=m+h+M;let O=f.x,N=f.y;o.setWidth(this.width),x?w>0&&O+C+d>this.right&&(N=f.y+=k,f.line++,O=f.x=Vt(i,this.left+d,this.right-a[f.line])):w>0&&N+k>this.bottom&&(O=f.x=O+n[f.line].width+d,f.line++,N=f.y=Vt(i,this.top+v+d,this.bottom-n[f.line].height));const J=o.x(O);if(p(J,N,S),O=I2(T,O+m+h,x?O+C:this.right,t.rtl),g(o.x(O),N,S),x)f.x+=C+d;else if(typeof S.text!="string"){const H=c.lineHeight;f.y+=ix(S,H)+d}else f.y+=k}),jb(this.ctx,t.textDirection)}drawTitle(){const t=this.options,n=t.title,a=Dt(n.font),r=Gt(n.padding);if(!n.display)return;const i=dr(t.rtl,this.left,this.width),s=this.ctx,l=n.position,o=a.size/2,c=r.top+o;let d,u=this.left,h=this.width;if(this.isHorizontal())h=Math.max(...this.lineWidths),d=this.top+c,u=Vt(t.align,u,this.right-h);else{const m=this.columnSizes.reduce((b,y)=>Math.max(b,y.height),0);d=c+Vt(t.align,this.top,this.bottom-m-t.labels.padding-this._computeTitleHeight())}const f=Vt(l,u,u+h);s.textAlign=i.textAlign(Fu(l)),s.textBaseline="middle",s.strokeStyle=n.color,s.fillStyle=n.color,s.font=a.string,Ca(s,n.text,f,d,a)}_computeTitleHeight(){const t=this.options.title,n=Dt(t.font),a=Gt(t.padding);return t.display?n.lineHeight+a.height:0}_getLegendItemAt(t,n){let a,r,i;if(ln(t,this.left,this.right)&&ln(n,this.top,this.bottom)){for(i=this.legendHitBoxes,a=0;a<i.length;++a)if(r=i[a],ln(t,r.left,r.left+r.width)&&ln(n,r.top,r.top+r.height))return this.legendItems[a]}return null}handleEvent(t){const n=this.options;if(!RS(t.type,n))return;const a=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const r=this._hoveredItem,i=OS(r,a);r&&!i&&it(n.onLeave,[t,r,this],this),this._hoveredItem=a,a&&!i&&it(n.onHover,[t,a,this],this)}else a&&it(n.onClick,[t,a,this],this)}}function zS(e,t,n,a,r){const i=NS(a,e,t,n),s=jS(r,a,t.lineHeight);return{itemWidth:i,itemHeight:s}}function NS(e,t,n,a){let r=e.text;return r&&typeof r!="string"&&(r=r.reduce((i,s)=>i.length>s.length?i:s)),t+n.size/2+a.measureText(r).width}function jS(e,t,n){let a=e;return typeof t.text!="string"&&(a=ix(t,n)),a}function ix(e,t){const n=e.text?e.text.length:0;return t*n}function RS(e,t){return!!((e==="mousemove"||e==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(e==="click"||e==="mouseup"))}var LS={id:"legend",_element:V0,start(e,t,n){const a=e.legend=new V0({ctx:e.ctx,options:n,chart:e});Yt.configure(e,a,n),Yt.addBox(e,a)},stop(e){Yt.removeBox(e,e.legend),delete e.legend},beforeUpdate(e,t,n){const a=e.legend;Yt.configure(e,a,n),a.options=n},afterUpdate(e){const t=e.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(e,t){t.replay||e.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(e,t,n){const a=t.datasetIndex,r=n.chart;r.isDatasetVisible(a)?(r.hide(a),t.hidden=!0):(r.show(a),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:e=>e.chart.options.color,boxWidth:40,padding:10,generateLabels(e){const t=e.data.datasets,{labels:{usePointStyle:n,pointStyle:a,textAlign:r,color:i,useBorderRadius:s,borderRadius:l}}=e.legend.options;return e._getSortedDatasetMetas().map(o=>{const c=o.controller.getStyle(n?0:void 0),d=Gt(c.borderWidth);return{text:t[o.index].label,fillStyle:c.backgroundColor,fontColor:i,hidden:!o.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(d.width+d.height)/4,strokeStyle:c.borderColor,pointStyle:a||c.pointStyle,rotation:c.rotation,textAlign:r||c.textAlign,borderRadius:s&&(l||c.borderRadius),datasetIndex:o.index}},this)}},title:{color:e=>e.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:e=>!e.startsWith("on"),labels:{_scriptable:e=>!["generateLabels","filter","sort"].includes(e)}}};class Ju extends yn{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n){const a=this.options;if(this.left=0,this.top=0,!a.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=n;const r=pt(a.text)?a.text.length:1;this._padding=Gt(a.padding);const i=r*Dt(a.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=i:this.width=i}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:n,left:a,bottom:r,right:i,options:s}=this,l=s.align;let o=0,c,d,u;return this.isHorizontal()?(d=Vt(l,a,i),u=n+t,c=i-a):(s.position==="left"?(d=a+t,u=Vt(l,r,n),o=Z*-.5):(d=i-t,u=Vt(l,n,r),o=Z*.5),c=r-n),{titleX:d,titleY:u,maxWidth:c,rotation:o}}draw(){const t=this.ctx,n=this.options;if(!n.display)return;const a=Dt(n.font),i=a.lineHeight/2+this._padding.top,{titleX:s,titleY:l,maxWidth:o,rotation:c}=this._drawArgs(i);Ca(t,n.text,0,0,a,{color:n.color,maxWidth:o,rotation:c,textAlign:Fu(n.align),textBaseline:"middle",translation:[s,l]})}}function BS(e,t){const n=new Ju({ctx:e.ctx,options:t,chart:e});Yt.configure(e,n,t),Yt.addBox(e,n),e.titleBlock=n}var HS={id:"title",_element:Ju,start(e,t,n){BS(e,n)},stop(e){const t=e.titleBlock;Yt.removeBox(e,t),delete e.titleBlock},beforeUpdate(e,t,n){const a=e.titleBlock;Yt.configure(e,a,n),a.options=n},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Ns=new WeakMap;var VS={id:"subtitle",start(e,t,n){const a=new Ju({ctx:e.ctx,options:n,chart:e});Yt.configure(e,a,n),Yt.addBox(e,a),Ns.set(e,a)},stop(e){Yt.removeBox(e,Ns.get(e)),Ns.delete(e)},beforeUpdate(e,t,n){const a=Ns.get(e);Yt.configure(e,a,n),a.options=n},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const ni={average(e){if(!e.length)return!1;let t,n,a=new Set,r=0,i=0;for(t=0,n=e.length;t<n;++t){const l=e[t].element;if(l&&l.hasValue()){const o=l.tooltipPosition();a.add(o.x),r+=o.y,++i}}return i===0||a.size===0?!1:{x:[...a].reduce((l,o)=>l+o)/a.size,y:r/i}},nearest(e,t){if(!e.length)return!1;let n=t.x,a=t.y,r=Number.POSITIVE_INFINITY,i,s,l;for(i=0,s=e.length;i<s;++i){const o=e[i].element;if(o&&o.hasValue()){const c=o.getCenterPoint(),d=yd(t,c);d<r&&(r=d,l=o)}}if(l){const o=l.tooltipPosition();n=o.x,a=o.y}return{x:n,y:a}}};function Ne(e,t){return t&&(pt(t)?Array.prototype.push.apply(e,t):e.push(t)),e}function Je(e){return(typeof e=="string"||e instanceof String)&&e.indexOf(`
`)>-1?e.split(`
`):e}function US(e,t){const{element:n,datasetIndex:a,index:r}=t,i=e.getDatasetMeta(a).controller,{label:s,value:l}=i.getLabelAndValue(r);return{chart:e,label:s,parsed:i.getParsed(r),raw:e.data.datasets[a].data[r],formattedValue:l,dataset:i.getDataset(),dataIndex:r,datasetIndex:a,element:n}}function U0(e,t){const n=e.chart.ctx,{body:a,footer:r,title:i}=e,{boxWidth:s,boxHeight:l}=t,o=Dt(t.bodyFont),c=Dt(t.titleFont),d=Dt(t.footerFont),u=i.length,h=r.length,f=a.length,m=Gt(t.padding);let b=m.height,y=0,p=a.reduce((v,k)=>v+k.before.length+k.lines.length+k.after.length,0);if(p+=e.beforeBody.length+e.afterBody.length,u&&(b+=u*c.lineHeight+(u-1)*t.titleSpacing+t.titleMarginBottom),p){const v=t.displayColors?Math.max(l,o.lineHeight):o.lineHeight;b+=f*v+(p-f)*o.lineHeight+(p-1)*t.bodySpacing}h&&(b+=t.footerMarginTop+h*d.lineHeight+(h-1)*t.footerSpacing);let g=0;const x=function(v){y=Math.max(y,n.measureText(v).width+g)};return n.save(),n.font=c.string,tt(e.title,x),n.font=o.string,tt(e.beforeBody.concat(e.afterBody),x),g=t.displayColors?s+2+t.boxPadding:0,tt(a,v=>{tt(v.before,x),tt(v.lines,x),tt(v.after,x)}),g=0,n.font=d.string,tt(e.footer,x),n.restore(),y+=m.width,{width:y,height:b}}function YS(e,t){const{y:n,height:a}=t;return n<a/2?"top":n>e.height-a/2?"bottom":"center"}function GS(e,t,n,a){const{x:r,width:i}=a,s=n.caretSize+n.caretPadding;if(e==="left"&&r+i+s>t.width||e==="right"&&r-i-s<0)return!0}function FS(e,t,n,a){const{x:r,width:i}=n,{width:s,chartArea:{left:l,right:o}}=e;let c="center";return a==="center"?c=r<=(l+o)/2?"left":"right":r<=i/2?c="left":r>=s-i/2&&(c="right"),GS(c,e,t,n)&&(c="center"),c}function Y0(e,t,n){const a=n.yAlign||t.yAlign||YS(e,n);return{xAlign:n.xAlign||t.xAlign||FS(e,t,n,a),yAlign:a}}function qS(e,t){let{x:n,width:a}=e;return t==="right"?n-=a:t==="center"&&(n-=a/2),n}function XS(e,t,n){let{y:a,height:r}=e;return t==="top"?a+=n:t==="bottom"?a-=r+n:a-=r/2,a}function G0(e,t,n,a){const{caretSize:r,caretPadding:i,cornerRadius:s}=e,{xAlign:l,yAlign:o}=n,c=r+i,{topLeft:d,topRight:u,bottomLeft:h,bottomRight:f}=_a(s);let m=qS(t,l);const b=XS(t,o,c);return o==="center"?l==="left"?m+=c:l==="right"&&(m-=c):l==="left"?m-=Math.max(d,h)+r:l==="right"&&(m+=Math.max(u,f)+r),{x:zt(m,0,a.width-t.width),y:zt(b,0,a.height-t.height)}}function js(e,t,n){const a=Gt(n.padding);return t==="center"?e.x+e.width/2:t==="right"?e.x+e.width-a.right:e.x+a.left}function F0(e){return Ne([],Je(e))}function PS(e,t,n){return na(e,{tooltip:t,tooltipItems:n,type:"tooltip"})}function q0(e,t){const n=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return n?e.override(n):e}const sx={beforeTitle:Ke,title(e){if(e.length>0){const t=e[0],n=t.chart.data.labels,a=n?n.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(a>0&&t.dataIndex<a)return n[t.dataIndex]}return""},afterTitle:Ke,beforeBody:Ke,beforeLabel:Ke,label(e){if(this&&this.options&&this.options.mode==="dataset")return e.label+": "+e.formattedValue||e.formattedValue;let t=e.dataset.label||"";t&&(t+=": ");const n=e.formattedValue;return F(n)||(t+=n),t},labelColor(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{borderColor:n.borderColor,backgroundColor:n.backgroundColor,borderWidth:n.borderWidth,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{pointStyle:n.pointStyle,rotation:n.rotation}},afterLabel:Ke,afterBody:Ke,beforeFooter:Ke,footer:Ke,afterFooter:Ke};function Wt(e,t,n,a){const r=e[t].call(n,a);return typeof r>"u"?sx[t].call(n,a):r}class Dd extends yn{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const n=this.chart,a=this.options.setContext(this.getContext()),r=a.enabled&&n.options.animation&&a.animations,i=new Vb(this.chart,r);return r._cacheable&&(this._cachedAnimations=Object.freeze(i)),i}getContext(){return this.$context||(this.$context=PS(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,n){const{callbacks:a}=n,r=Wt(a,"beforeTitle",this,t),i=Wt(a,"title",this,t),s=Wt(a,"afterTitle",this,t);let l=[];return l=Ne(l,Je(r)),l=Ne(l,Je(i)),l=Ne(l,Je(s)),l}getBeforeBody(t,n){return F0(Wt(n.callbacks,"beforeBody",this,t))}getBody(t,n){const{callbacks:a}=n,r=[];return tt(t,i=>{const s={before:[],lines:[],after:[]},l=q0(a,i);Ne(s.before,Je(Wt(l,"beforeLabel",this,i))),Ne(s.lines,Wt(l,"label",this,i)),Ne(s.after,Je(Wt(l,"afterLabel",this,i))),r.push(s)}),r}getAfterBody(t,n){return F0(Wt(n.callbacks,"afterBody",this,t))}getFooter(t,n){const{callbacks:a}=n,r=Wt(a,"beforeFooter",this,t),i=Wt(a,"footer",this,t),s=Wt(a,"afterFooter",this,t);let l=[];return l=Ne(l,Je(r)),l=Ne(l,Je(i)),l=Ne(l,Je(s)),l}_createItems(t){const n=this._active,a=this.chart.data,r=[],i=[],s=[];let l=[],o,c;for(o=0,c=n.length;o<c;++o)l.push(US(this.chart,n[o]));return t.filter&&(l=l.filter((d,u,h)=>t.filter(d,u,h,a))),t.itemSort&&(l=l.sort((d,u)=>t.itemSort(d,u,a))),tt(l,d=>{const u=q0(t.callbacks,d);r.push(Wt(u,"labelColor",this,d)),i.push(Wt(u,"labelPointStyle",this,d)),s.push(Wt(u,"labelTextColor",this,d))}),this.labelColors=r,this.labelPointStyles=i,this.labelTextColors=s,this.dataPoints=l,l}update(t,n){const a=this.options.setContext(this.getContext()),r=this._active;let i,s=[];if(!r.length)this.opacity!==0&&(i={opacity:0});else{const l=ni[a.position].call(this,r,this._eventPosition);s=this._createItems(a),this.title=this.getTitle(s,a),this.beforeBody=this.getBeforeBody(s,a),this.body=this.getBody(s,a),this.afterBody=this.getAfterBody(s,a),this.footer=this.getFooter(s,a);const o=this._size=U0(this,a),c=Object.assign({},l,o),d=Y0(this.chart,a,c),u=G0(a,c,d,this.chart);this.xAlign=d.xAlign,this.yAlign=d.yAlign,i={opacity:1,x:u.x,y:u.y,width:o.width,height:o.height,caretX:l.x,caretY:l.y}}this._tooltipItems=s,this.$context=void 0,i&&this._resolveAnimations().update(this,i),t&&a.external&&a.external.call(this,{chart:this.chart,tooltip:this,replay:n})}drawCaret(t,n,a,r){const i=this.getCaretPosition(t,a,r);n.lineTo(i.x1,i.y1),n.lineTo(i.x2,i.y2),n.lineTo(i.x3,i.y3)}getCaretPosition(t,n,a){const{xAlign:r,yAlign:i}=this,{caretSize:s,cornerRadius:l}=a,{topLeft:o,topRight:c,bottomLeft:d,bottomRight:u}=_a(l),{x:h,y:f}=t,{width:m,height:b}=n;let y,p,g,x,v,k;return i==="center"?(v=f+b/2,r==="left"?(y=h,p=y-s,x=v+s,k=v-s):(y=h+m,p=y+s,x=v-s,k=v+s),g=y):(r==="left"?p=h+Math.max(o,d)+s:r==="right"?p=h+m-Math.max(c,u)-s:p=this.caretX,i==="top"?(x=f,v=x-s,y=p-s,g=p+s):(x=f+b,v=x+s,y=p+s,g=p-s),k=x),{x1:y,x2:p,x3:g,y1:x,y2:v,y3:k}}drawTitle(t,n,a){const r=this.title,i=r.length;let s,l,o;if(i){const c=dr(a.rtl,this.x,this.width);for(t.x=js(this,a.titleAlign,a),n.textAlign=c.textAlign(a.titleAlign),n.textBaseline="middle",s=Dt(a.titleFont),l=a.titleSpacing,n.fillStyle=a.titleColor,n.font=s.string,o=0;o<i;++o)n.fillText(r[o],c.x(t.x),t.y+s.lineHeight/2),t.y+=s.lineHeight+l,o+1===i&&(t.y+=a.titleMarginBottom-l)}}_drawColorBox(t,n,a,r,i){const s=this.labelColors[a],l=this.labelPointStyles[a],{boxHeight:o,boxWidth:c}=i,d=Dt(i.bodyFont),u=js(this,"left",i),h=r.x(u),f=o<d.lineHeight?(d.lineHeight-o)/2:0,m=n.y+f;if(i.usePointStyle){const b={radius:Math.min(c,o)/2,pointStyle:l.pointStyle,rotation:l.rotation,borderWidth:1},y=r.leftForLtr(h,c)+c/2,p=m+o/2;t.strokeStyle=i.multiKeyBackground,t.fillStyle=i.multiKeyBackground,_d(t,b,y,p),t.strokeStyle=s.borderColor,t.fillStyle=s.backgroundColor,_d(t,b,y,p)}else{t.lineWidth=X(s.borderWidth)?Math.max(...Object.values(s.borderWidth)):s.borderWidth||1,t.strokeStyle=s.borderColor,t.setLineDash(s.borderDash||[]),t.lineDashOffset=s.borderDashOffset||0;const b=r.leftForLtr(h,c),y=r.leftForLtr(r.xPlus(h,1),c-2),p=_a(s.borderRadius);Object.values(p).some(g=>g!==0)?(t.beginPath(),t.fillStyle=i.multiKeyBackground,Gi(t,{x:b,y:m,w:c,h:o,radius:p}),t.fill(),t.stroke(),t.fillStyle=s.backgroundColor,t.beginPath(),Gi(t,{x:y,y:m+1,w:c-2,h:o-2,radius:p}),t.fill()):(t.fillStyle=i.multiKeyBackground,t.fillRect(b,m,c,o),t.strokeRect(b,m,c,o),t.fillStyle=s.backgroundColor,t.fillRect(y,m+1,c-2,o-2))}t.fillStyle=this.labelTextColors[a]}drawBody(t,n,a){const{body:r}=this,{bodySpacing:i,bodyAlign:s,displayColors:l,boxHeight:o,boxWidth:c,boxPadding:d}=a,u=Dt(a.bodyFont);let h=u.lineHeight,f=0;const m=dr(a.rtl,this.x,this.width),b=function(M){n.fillText(M,m.x(t.x+f),t.y+h/2),t.y+=h+i},y=m.textAlign(s);let p,g,x,v,k,S,w;for(n.textAlign=s,n.textBaseline="middle",n.font=u.string,t.x=js(this,y,a),n.fillStyle=a.bodyColor,tt(this.beforeBody,b),f=l&&y!=="right"?s==="center"?c/2+d:c+2+d:0,v=0,S=r.length;v<S;++v){for(p=r[v],g=this.labelTextColors[v],n.fillStyle=g,tt(p.before,b),x=p.lines,l&&x.length&&(this._drawColorBox(n,t,v,m,a),h=Math.max(u.lineHeight,o)),k=0,w=x.length;k<w;++k)b(x[k]),h=u.lineHeight;tt(p.after,b)}f=0,h=u.lineHeight,tt(this.afterBody,b),t.y-=i}drawFooter(t,n,a){const r=this.footer,i=r.length;let s,l;if(i){const o=dr(a.rtl,this.x,this.width);for(t.x=js(this,a.footerAlign,a),t.y+=a.footerMarginTop,n.textAlign=o.textAlign(a.footerAlign),n.textBaseline="middle",s=Dt(a.footerFont),n.fillStyle=a.footerColor,n.font=s.string,l=0;l<i;++l)n.fillText(r[l],o.x(t.x),t.y+s.lineHeight/2),t.y+=s.lineHeight+a.footerSpacing}}drawBackground(t,n,a,r){const{xAlign:i,yAlign:s}=this,{x:l,y:o}=t,{width:c,height:d}=a,{topLeft:u,topRight:h,bottomLeft:f,bottomRight:m}=_a(r.cornerRadius);n.fillStyle=r.backgroundColor,n.strokeStyle=r.borderColor,n.lineWidth=r.borderWidth,n.beginPath(),n.moveTo(l+u,o),s==="top"&&this.drawCaret(t,n,a,r),n.lineTo(l+c-h,o),n.quadraticCurveTo(l+c,o,l+c,o+h),s==="center"&&i==="right"&&this.drawCaret(t,n,a,r),n.lineTo(l+c,o+d-m),n.quadraticCurveTo(l+c,o+d,l+c-m,o+d),s==="bottom"&&this.drawCaret(t,n,a,r),n.lineTo(l+f,o+d),n.quadraticCurveTo(l,o+d,l,o+d-f),s==="center"&&i==="left"&&this.drawCaret(t,n,a,r),n.lineTo(l,o+u),n.quadraticCurveTo(l,o,l+u,o),n.closePath(),n.fill(),r.borderWidth>0&&n.stroke()}_updateAnimationTarget(t){const n=this.chart,a=this.$animations,r=a&&a.x,i=a&&a.y;if(r||i){const s=ni[t.position].call(this,this._active,this._eventPosition);if(!s)return;const l=this._size=U0(this,t),o=Object.assign({},s,this._size),c=Y0(n,t,o),d=G0(t,o,c,n);(r._to!==d.x||i._to!==d.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=l.width,this.height=l.height,this.caretX=s.x,this.caretY=s.y,this._resolveAnimations().update(this,d))}}_willRender(){return!!this.opacity}draw(t){const n=this.options.setContext(this.getContext());let a=this.opacity;if(!a)return;this._updateAnimationTarget(n);const r={width:this.width,height:this.height},i={x:this.x,y:this.y};a=Math.abs(a)<.001?0:a;const s=Gt(n.padding),l=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;n.enabled&&l&&(t.save(),t.globalAlpha=a,this.drawBackground(i,t,r,n),Nb(t,n.textDirection),i.y+=s.top,this.drawTitle(i,t,n),this.drawBody(i,t,n),this.drawFooter(i,t,n),jb(t,n.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,n){const a=this._active,r=t.map(({datasetIndex:l,index:o})=>{const c=this.chart.getDatasetMeta(l);if(!c)throw new Error("Cannot find a dataset at index "+l);return{datasetIndex:l,element:c.data[o],index:o}}),i=!Vl(a,r),s=this._positionChanged(r,n);(i||s)&&(this._active=r,this._eventPosition=n,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,n,a=!0){if(n&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const r=this.options,i=this._active||[],s=this._getActiveElements(t,i,n,a),l=this._positionChanged(s,t),o=n||!Vl(s,i)||l;return o&&(this._active=s,(r.enabled||r.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,n))),o}_getActiveElements(t,n,a,r){const i=this.options;if(t.type==="mouseout")return[];if(!r)return n.filter(l=>this.chart.data.datasets[l.datasetIndex]&&this.chart.getDatasetMeta(l.datasetIndex).controller.getParsed(l.index)!==void 0);const s=this.chart.getElementsAtEventForMode(t,i.mode,i,a);return i.reverse&&s.reverse(),s}_positionChanged(t,n){const{caretX:a,caretY:r,options:i}=this,s=ni[i.position].call(this,t,n);return s!==!1&&(a!==s.x||r!==s.y)}}E(Dd,"positioners",ni);var QS={id:"tooltip",_element:Dd,positioners:ni,afterInit(e,t,n){n&&(e.tooltip=new Dd({chart:e,options:n}))},beforeUpdate(e,t,n){e.tooltip&&e.tooltip.initialize(n)},reset(e,t,n){e.tooltip&&e.tooltip.initialize(n)},afterDraw(e){const t=e.tooltip;if(t&&t._willRender()){const n={tooltip:t};if(e.notifyPlugins("beforeTooltipDraw",{...n,cancelable:!0})===!1)return;t.draw(e.ctx),e.notifyPlugins("afterTooltipDraw",n)}},afterEvent(e,t){if(e.tooltip){const n=t.replay;e.tooltip.handleEvent(t.event,n,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(e,t)=>t.bodyFont.size,boxWidth:(e,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:sx},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:e=>e!=="filter"&&e!=="itemSort"&&e!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},KS=Object.freeze({__proto__:null,Colors:sS,Decimation:dS,Filler:ES,Legend:LS,SubTitle:VS,Title:HS,Tooltip:QS});const ZS=(e,t,n,a)=>(typeof t=="string"?(n=e.push(t)-1,a.unshift({index:n,label:t})):isNaN(t)&&(n=null),n);function WS(e,t,n,a){const r=e.indexOf(t);if(r===-1)return ZS(e,t,n,a);const i=e.lastIndexOf(t);return r!==i?n:r}const IS=(e,t)=>e===null?null:zt(Math.round(e),0,t);function X0(e){const t=this.getLabels();return e>=0&&e<t.length?t[e]:e}class Cd extends Ra{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const n=this._addedLabels;if(n.length){const a=this.getLabels();for(const{index:r,label:i}of n)a[r]===i&&a.splice(r,1);this._addedLabels=[]}super.init(t)}parse(t,n){if(F(t))return null;const a=this.getLabels();return n=isFinite(n)&&a[n]===t?n:WS(a,t,L(n,t),this._addedLabels),IS(n,a.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let{min:a,max:r}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(a=0),n||(r=this.getLabels().length-1)),this.min=a,this.max=r}buildTicks(){const t=this.min,n=this.max,a=this.options.offset,r=[];let i=this.getLabels();i=t===0&&n===i.length-1?i:i.slice(t,n+1),this._valueRange=Math.max(i.length-(a?0:1),1),this._startValue=this.min-(a?.5:0);for(let s=t;s<=n;s++)r.push({value:s});return r}getLabelForValue(t){return X0.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}E(Cd,"id","category"),E(Cd,"defaults",{ticks:{callback:X0}});function JS(e,t){const n=[],{bounds:r,step:i,min:s,max:l,precision:o,count:c,maxTicks:d,maxDigits:u,includeBounds:h}=e,f=i||1,m=d-1,{min:b,max:y}=t,p=!F(s),g=!F(l),x=!F(c),v=(y-b)/(u+1);let k=Uh((y-b)/m/f)*f,S,w,M,T;if(k<1e-14&&!p&&!g)return[{value:b},{value:y}];T=Math.ceil(y/k)-Math.floor(b/k),T>m&&(k=Uh(T*k/m/f)*f),F(o)||(S=Math.pow(10,o),k=Math.ceil(k*S)/S),r==="ticks"?(w=Math.floor(b/k)*k,M=Math.ceil(y/k)*k):(w=b,M=y),p&&g&&i&&q2((l-s)/i,k/1e3)?(T=Math.round(Math.min((l-s)/k,d)),k=(l-s)/T,w=s,M=l):x?(w=p?s:w,M=g?l:M,T=c-1,k=(M-w)/T):(T=(M-w)/k,yi(T,Math.round(T),k/1e3)?T=Math.round(T):T=Math.ceil(T));const C=Math.max(Yh(k),Yh(w));S=Math.pow(10,F(o)?C:o),w=Math.round(w*S)/S,M=Math.round(M*S)/S;let O=0;for(p&&(h&&w!==s?(n.push({value:s}),w<s&&O++,yi(Math.round((w+O*k)*S)/S,s,P0(s,v,e))&&O++):w<s&&O++);O<T;++O){const N=Math.round((w+O*k)*S)/S;if(g&&N>l)break;n.push({value:N})}return g&&h&&M!==l?n.length&&yi(n[n.length-1].value,l,P0(l,v,e))?n[n.length-1].value=l:n.push({value:l}):(!g||M===l)&&n.push({value:M}),n}function P0(e,t,{horizontal:n,minRotation:a}){const r=Ce(a),i=(n?Math.sin(r):Math.cos(r))||.001,s=.75*t*(""+e).length;return Math.min(t/i,s)}class Pl extends Ra{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,n){return F(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:n,maxDefined:a}=this.getUserBounds();let{min:r,max:i}=this;const s=o=>r=n?r:o,l=o=>i=a?i:o;if(t){const o=Ve(r),c=Ve(i);o<0&&c<0?l(0):o>0&&c>0&&s(0)}if(r===i){let o=i===0?1:Math.abs(i*.05);l(i+o),t||s(r-o)}this.min=r,this.max=i}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:n,stepSize:a}=t,r;return a?(r=Math.ceil(this.max/a)-Math.floor(this.min/a)+1,r>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${a} would result generating up to ${r} ticks. Limiting to 1000.`),r=1e3)):(r=this.computeTickLimit(),n=n||11),n&&(r=Math.min(n,r)),r}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,n=t.ticks;let a=this.getTickLimit();a=Math.max(2,a);const r={maxTicks:a,bounds:t.bounds,min:t.min,max:t.max,precision:n.precision,step:n.stepSize,count:n.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:n.minRotation||0,includeBounds:n.includeBounds!==!1},i=this._range||this,s=JS(r,i);return t.bounds==="ticks"&&mb(s,this,"value"),t.reverse?(s.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),s}configure(){const t=this.ticks;let n=this.min,a=this.max;if(super.configure(),this.options.offset&&t.length){const r=(a-n)/Math.max(t.length-1,1)/2;n-=r,a+=r}this._startValue=n,this._endValue=a,this._valueRange=a-n}getLabelForValue(t){return ss(t,this.chart.options.locale,this.options.ticks.format)}}class Ed extends Pl{determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=xt(t)?t:0,this.max=xt(n)?n:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),n=t?this.width:this.height,a=Ce(this.options.ticks.minRotation),r=(t?Math.sin(a):Math.cos(a))||.001,i=this._resolveTickFontOptions(0);return Math.ceil(n/Math.min(40,i.lineHeight/r))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}E(Ed,"id","linear"),E(Ed,"defaults",{ticks:{callback:ho.formatters.numeric}});const qi=e=>Math.floor(jn(e)),oa=(e,t)=>Math.pow(10,qi(e)+t);function Q0(e){return e/Math.pow(10,qi(e))===1}function K0(e,t,n){const a=Math.pow(10,n),r=Math.floor(e/a);return Math.ceil(t/a)-r}function $S(e,t){const n=t-e;let a=qi(n);for(;K0(e,t,a)>10;)a++;for(;K0(e,t,a)<10;)a--;return Math.min(a,qi(e))}function tw(e,{min:t,max:n}){t=re(e.min,t);const a=[],r=qi(t);let i=$S(t,n),s=i<0?Math.pow(10,Math.abs(i)):1;const l=Math.pow(10,i),o=r>i?Math.pow(10,r):0,c=Math.round((t-o)*s)/s,d=Math.floor((t-o)/l/10)*l*10;let u=Math.floor((c-d)/Math.pow(10,i)),h=re(e.min,Math.round((o+d+u*Math.pow(10,i))*s)/s);for(;h<n;)a.push({value:h,major:Q0(h),significand:u}),u>=10?u=u<15?15:20:u++,u>=20&&(i++,u=2,s=i>=0?1:s),h=Math.round((o+d+u*Math.pow(10,i))*s)/s;const f=re(e.max,h);return a.push({value:f,major:Q0(f),significand:u}),a}class Od extends Ra{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,n){const a=Pl.prototype.parse.apply(this,[t,n]);if(a===0){this._zero=!0;return}return xt(a)&&a>0?a:null}determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=xt(t)?Math.max(0,t):null,this.max=xt(n)?Math.max(0,n):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!xt(this._userMin)&&(this.min=t===oa(this.min,0)?oa(this.min,-1):oa(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let a=this.min,r=this.max;const i=l=>a=t?a:l,s=l=>r=n?r:l;a===r&&(a<=0?(i(1),s(10)):(i(oa(a,-1)),s(oa(r,1)))),a<=0&&i(oa(r,-1)),r<=0&&s(oa(a,1)),this.min=a,this.max=r}buildTicks(){const t=this.options,n={min:this._userMin,max:this._userMax},a=tw(n,this);return t.bounds==="ticks"&&mb(a,this,"value"),t.reverse?(a.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),a}getLabelForValue(t){return t===void 0?"0":ss(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=jn(t),this._valueRange=jn(this.max)-jn(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(jn(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const n=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+n*this._valueRange)}}E(Od,"id","logarithmic"),E(Od,"defaults",{ticks:{callback:ho.formatters.logarithmic,major:{enabled:!0}}});function zd(e){const t=e.ticks;if(t.display&&e.display){const n=Gt(t.backdropPadding);return L(t.font&&t.font.size,gt.font.size)+n.height}return 0}function ew(e,t,n){return n=pt(n)?n:[n],{w:l_(e,t.string,n),h:n.length*t.lineHeight}}function Z0(e,t,n,a,r){return e===a||e===r?{start:t-n/2,end:t+n/2}:e<a||e>r?{start:t-n,end:t}:{start:t,end:t+n}}function nw(e){const t={l:e.left+e._padding.left,r:e.right-e._padding.right,t:e.top+e._padding.top,b:e.bottom-e._padding.bottom},n=Object.assign({},t),a=[],r=[],i=e._pointLabels.length,s=e.options.pointLabels,l=s.centerPointLabels?Z/i:0;for(let o=0;o<i;o++){const c=s.setContext(e.getPointLabelContext(o));r[o]=c.padding;const d=e.getPointPosition(o,e.drawingArea+r[o],l),u=Dt(c.font),h=ew(e.ctx,u,e._pointLabels[o]);a[o]=h;const f=Ut(e.getIndexAngle(o)+l),m=Math.round(Yu(f)),b=Z0(m,d.x,h.w,0,180),y=Z0(m,d.y,h.h,90,270);aw(n,t,f,b,y)}e.setCenterPoint(t.l-n.l,n.r-t.r,t.t-n.t,n.b-t.b),e._pointLabelItems=sw(e,a,r)}function aw(e,t,n,a,r){const i=Math.abs(Math.sin(n)),s=Math.abs(Math.cos(n));let l=0,o=0;a.start<t.l?(l=(t.l-a.start)/i,e.l=Math.min(e.l,t.l-l)):a.end>t.r&&(l=(a.end-t.r)/i,e.r=Math.max(e.r,t.r+l)),r.start<t.t?(o=(t.t-r.start)/s,e.t=Math.min(e.t,t.t-o)):r.end>t.b&&(o=(r.end-t.b)/s,e.b=Math.max(e.b,t.b+o))}function rw(e,t,n){const a=e.drawingArea,{extra:r,additionalAngle:i,padding:s,size:l}=n,o=e.getPointPosition(t,a+r+s,i),c=Math.round(Yu(Ut(o.angle+vt))),d=cw(o.y,l.h,c),u=lw(c),h=ow(o.x,l.w,u);return{visible:!0,x:o.x,y:d,textAlign:u,left:h,top:d,right:h+l.w,bottom:d+l.h}}function iw(e,t){if(!t)return!0;const{left:n,top:a,right:r,bottom:i}=e;return!(cn({x:n,y:a},t)||cn({x:n,y:i},t)||cn({x:r,y:a},t)||cn({x:r,y:i},t))}function sw(e,t,n){const a=[],r=e._pointLabels.length,i=e.options,{centerPointLabels:s,display:l}=i.pointLabels,o={extra:zd(i)/2,additionalAngle:s?Z/r:0};let c;for(let d=0;d<r;d++){o.padding=n[d],o.size=t[d];const u=rw(e,d,o);a.push(u),l==="auto"&&(u.visible=iw(u,c),u.visible&&(c=u))}return a}function lw(e){return e===0||e===180?"center":e<180?"left":"right"}function ow(e,t,n){return n==="right"?e-=t:n==="center"&&(e-=t/2),e}function cw(e,t,n){return n===90||n===270?e-=t/2:(n>270||n<90)&&(e-=t),e}function dw(e,t,n){const{left:a,top:r,right:i,bottom:s}=n,{backdropColor:l}=t;if(!F(l)){const o=_a(t.borderRadius),c=Gt(t.backdropPadding);e.fillStyle=l;const d=a-c.left,u=r-c.top,h=i-a+c.width,f=s-r+c.height;Object.values(o).some(m=>m!==0)?(e.beginPath(),Gi(e,{x:d,y:u,w:h,h:f,radius:o}),e.fill()):e.fillRect(d,u,h,f)}}function uw(e,t){const{ctx:n,options:{pointLabels:a}}=e;for(let r=t-1;r>=0;r--){const i=e._pointLabelItems[r];if(!i.visible)continue;const s=a.setContext(e.getPointLabelContext(r));dw(n,s,i);const l=Dt(s.font),{x:o,y:c,textAlign:d}=i;Ca(n,e._pointLabels[r],o,c+l.lineHeight/2,l,{color:s.color,textAlign:d,textBaseline:"middle"})}}function lx(e,t,n,a){const{ctx:r}=e;if(n)r.arc(e.xCenter,e.yCenter,t,0,ut);else{let i=e.getPointPosition(0,t);r.moveTo(i.x,i.y);for(let s=1;s<a;s++)i=e.getPointPosition(s,t),r.lineTo(i.x,i.y)}}function fw(e,t,n,a,r){const i=e.ctx,s=t.circular,{color:l,lineWidth:o}=t;!s&&!a||!l||!o||n<0||(i.save(),i.strokeStyle=l,i.lineWidth=o,i.setLineDash(r.dash||[]),i.lineDashOffset=r.dashOffset,i.beginPath(),lx(e,n,s,a),i.closePath(),i.stroke(),i.restore())}function hw(e,t,n){return na(e,{label:n,index:t,type:"pointLabel"})}class ai extends Pl{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=Gt(zd(this.options)/2),n=this.width=this.maxWidth-t.width,a=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+n/2+t.left),this.yCenter=Math.floor(this.top+a/2+t.top),this.drawingArea=Math.floor(Math.min(n,a)/2)}determineDataLimits(){const{min:t,max:n}=this.getMinMax(!1);this.min=xt(t)&&!isNaN(t)?t:0,this.max=xt(n)&&!isNaN(n)?n:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/zd(this.options))}generateTickLabels(t){Pl.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((n,a)=>{const r=it(this.options.pointLabels.callback,[n,a],this);return r||r===0?r:""}).filter((n,a)=>this.chart.getDataVisibility(a))}fit(){const t=this.options;t.display&&t.pointLabels.display?nw(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,n,a,r){this.xCenter+=Math.floor((t-n)/2),this.yCenter+=Math.floor((a-r)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,n,a,r))}getIndexAngle(t){const n=ut/(this._pointLabels.length||1),a=this.options.startAngle||0;return Ut(t*n+Ce(a))}getDistanceFromCenterForValue(t){if(F(t))return NaN;const n=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*n:(t-this.min)*n}getValueForDistanceFromCenter(t){if(F(t))return NaN;const n=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-n:this.min+n}getPointLabelContext(t){const n=this._pointLabels||[];if(t>=0&&t<n.length){const a=n[t];return hw(this.getContext(),t,a)}}getPointPosition(t,n,a=0){const r=this.getIndexAngle(t)-vt+a;return{x:Math.cos(r)*n+this.xCenter,y:Math.sin(r)*n+this.yCenter,angle:r}}getPointPositionForValue(t,n){return this.getPointPosition(t,this.getDistanceFromCenterForValue(n))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:n,top:a,right:r,bottom:i}=this._pointLabelItems[t];return{left:n,top:a,right:r,bottom:i}}drawBackground(){const{backgroundColor:t,grid:{circular:n}}=this.options;if(t){const a=this.ctx;a.save(),a.beginPath(),lx(this,this.getDistanceFromCenterForValue(this._endValue),n,this._pointLabels.length),a.closePath(),a.fillStyle=t,a.fill(),a.restore()}}drawGrid(){const t=this.ctx,n=this.options,{angleLines:a,grid:r,border:i}=n,s=this._pointLabels.length;let l,o,c;if(n.pointLabels.display&&uw(this,s),r.display&&this.ticks.forEach((d,u)=>{if(u!==0||u===0&&this.min<0){o=this.getDistanceFromCenterForValue(d.value);const h=this.getContext(u),f=r.setContext(h),m=i.setContext(h);fw(this,f,o,s,m)}}),a.display){for(t.save(),l=s-1;l>=0;l--){const d=a.setContext(this.getPointLabelContext(l)),{color:u,lineWidth:h}=d;!h||!u||(t.lineWidth=h,t.strokeStyle=u,t.setLineDash(d.borderDash),t.lineDashOffset=d.borderDashOffset,o=this.getDistanceFromCenterForValue(n.reverse?this.min:this.max),c=this.getPointPosition(l,o),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(c.x,c.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,n=this.options,a=n.ticks;if(!a.display)return;const r=this.getIndexAngle(0);let i,s;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(r),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((l,o)=>{if(o===0&&this.min>=0&&!n.reverse)return;const c=a.setContext(this.getContext(o)),d=Dt(c.font);if(i=this.getDistanceFromCenterForValue(this.ticks[o].value),c.showLabelBackdrop){t.font=d.string,s=t.measureText(l.label).width,t.fillStyle=c.backdropColor;const u=Gt(c.backdropPadding);t.fillRect(-s/2-u.left,-i-d.size/2-u.top,s+u.width,d.size+u.height)}Ca(t,l.label,0,-i,d,{color:c.color,strokeColor:c.textStrokeColor,strokeWidth:c.textStrokeWidth})}),t.restore()}drawTitle(){}}E(ai,"id","radialLinear"),E(ai,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:ho.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}}),E(ai,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),E(ai,"descriptors",{angleLines:{_fallback:"grid"}});const yo={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},te=Object.keys(yo);function W0(e,t){return e-t}function I0(e,t){if(F(t))return null;const n=e._adapter,{parser:a,round:r,isoWeekday:i}=e._parseOpts;let s=t;return typeof a=="function"&&(s=a(s)),xt(s)||(s=typeof a=="string"?n.parse(s,a):n.parse(s)),s===null?null:(r&&(s=r==="week"&&(kr(i)||i===!0)?n.startOf(s,"isoWeek",i):n.startOf(s,r)),+s)}function J0(e,t,n,a){const r=te.length;for(let i=te.indexOf(e);i<r-1;++i){const s=yo[te[i]],l=s.steps?s.steps:Number.MAX_SAFE_INTEGER;if(s.common&&Math.ceil((n-t)/(l*s.size))<=a)return te[i]}return te[r-1]}function pw(e,t,n,a,r){for(let i=te.length-1;i>=te.indexOf(n);i--){const s=te[i];if(yo[s].common&&e._adapter.diff(r,a,s)>=t-1)return s}return te[n?te.indexOf(n):0]}function gw(e){for(let t=te.indexOf(e)+1,n=te.length;t<n;++t)if(yo[te[t]].common)return te[t]}function $0(e,t,n){if(!n)e[t]=!0;else if(n.length){const{lo:a,hi:r}=Gu(n,t),i=n[a]>=t?n[a]:n[r];e[i]=!0}}function mw(e,t,n,a){const r=e._adapter,i=+r.startOf(t[0].value,a),s=t[t.length-1].value;let l,o;for(l=i;l<=s;l=+r.add(l,1,a))o=n[l],o>=0&&(t[o].major=!0);return t}function tp(e,t,n){const a=[],r={},i=t.length;let s,l;for(s=0;s<i;++s)l=t[s],r[l]=s,a.push({value:l,major:!1});return i===0||!n?a:mw(e,a,r,n)}class Xi extends Ra{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,n={}){const a=t.time||(t.time={}),r=this._adapter=new w1._date(t.adapters.date);r.init(n),xi(a.displayFormats,r.formats()),this._parseOpts={parser:a.parser,round:a.round,isoWeekday:a.isoWeekday},super.init(t),this._normalized=n.normalized}parse(t,n){return t===void 0?null:I0(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,n=this._adapter,a=t.time.unit||"day";let{min:r,max:i,minDefined:s,maxDefined:l}=this.getUserBounds();function o(c){!s&&!isNaN(c.min)&&(r=Math.min(r,c.min)),!l&&!isNaN(c.max)&&(i=Math.max(i,c.max))}(!s||!l)&&(o(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&o(this.getMinMax(!1))),r=xt(r)&&!isNaN(r)?r:+n.startOf(Date.now(),a),i=xt(i)&&!isNaN(i)?i:+n.endOf(Date.now(),a)+1,this.min=Math.min(r,i-1),this.max=Math.max(r+1,i)}_getLabelBounds(){const t=this.getLabelTimestamps();let n=Number.POSITIVE_INFINITY,a=Number.NEGATIVE_INFINITY;return t.length&&(n=t[0],a=t[t.length-1]),{min:n,max:a}}buildTicks(){const t=this.options,n=t.time,a=t.ticks,r=a.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&r.length&&(this.min=this._userMin||r[0],this.max=this._userMax||r[r.length-1]);const i=this.min,s=this.max,l=K2(r,i,s);return this._unit=n.unit||(a.autoSkip?J0(n.minUnit,this.min,this.max,this._getLabelCapacity(i)):pw(this,l.length,n.minUnit,this.min,this.max)),this._majorUnit=!a.major.enabled||this._unit==="year"?void 0:gw(this._unit),this.initOffsets(r),t.reverse&&l.reverse(),tp(this,l,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let n=0,a=0,r,i;this.options.offset&&t.length&&(r=this.getDecimalForValue(t[0]),t.length===1?n=1-r:n=(this.getDecimalForValue(t[1])-r)/2,i=this.getDecimalForValue(t[t.length-1]),t.length===1?a=i:a=(i-this.getDecimalForValue(t[t.length-2]))/2);const s=t.length<3?.5:.25;n=zt(n,0,s),a=zt(a,0,s),this._offsets={start:n,end:a,factor:1/(n+1+a)}}_generate(){const t=this._adapter,n=this.min,a=this.max,r=this.options,i=r.time,s=i.unit||J0(i.minUnit,n,a,this._getLabelCapacity(n)),l=L(r.ticks.stepSize,1),o=s==="week"?i.isoWeekday:!1,c=kr(o)||o===!0,d={};let u=n,h,f;if(c&&(u=+t.startOf(u,"isoWeek",o)),u=+t.startOf(u,c?"day":s),t.diff(a,n,s)>1e5*l)throw new Error(n+" and "+a+" are too far apart with stepSize of "+l+" "+s);const m=r.ticks.source==="data"&&this.getDataTimestamps();for(h=u,f=0;h<a;h=+t.add(h,l,s),f++)$0(d,h,m);return(h===a||r.bounds==="ticks"||f===1)&&$0(d,h,m),Object.keys(d).sort(W0).map(b=>+b)}getLabelForValue(t){const n=this._adapter,a=this.options.time;return a.tooltipFormat?n.format(t,a.tooltipFormat):n.format(t,a.displayFormats.datetime)}format(t,n){const r=this.options.time.displayFormats,i=this._unit,s=n||r[i];return this._adapter.format(t,s)}_tickFormatFunction(t,n,a,r){const i=this.options,s=i.ticks.callback;if(s)return it(s,[t,n,a],this);const l=i.time.displayFormats,o=this._unit,c=this._majorUnit,d=o&&l[o],u=c&&l[c],h=a[n],f=c&&u&&h&&h.major;return this._adapter.format(t,r||(f?u:d))}generateTickLabels(t){let n,a,r;for(n=0,a=t.length;n<a;++n)r=t[n],r.label=this._tickFormatFunction(r.value,n,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const n=this._offsets,a=this.getDecimalForValue(t);return this.getPixelForDecimal((n.start+a)*n.factor)}getValueForPixel(t){const n=this._offsets,a=this.getDecimalForPixel(t)/n.factor-n.end;return this.min+a*(this.max-this.min)}_getLabelSize(t){const n=this.options.ticks,a=this.ctx.measureText(t).width,r=Ce(this.isHorizontal()?n.maxRotation:n.minRotation),i=Math.cos(r),s=Math.sin(r),l=this._resolveTickFontOptions(0).size;return{w:a*i+l*s,h:a*s+l*i}}_getLabelCapacity(t){const n=this.options.time,a=n.displayFormats,r=a[n.unit]||a.millisecond,i=this._tickFormatFunction(t,0,tp(this,[t],this._majorUnit),r),s=this._getLabelSize(i),l=Math.floor(this.isHorizontal()?this.width/s.w:this.height/s.h)-1;return l>0?l:1}getDataTimestamps(){let t=this._cache.data||[],n,a;if(t.length)return t;const r=this.getMatchingVisibleMetas();if(this._normalized&&r.length)return this._cache.data=r[0].controller.getAllParsedValues(this);for(n=0,a=r.length;n<a;++n)t=t.concat(r[n].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let n,a;if(t.length)return t;const r=this.getLabels();for(n=0,a=r.length;n<a;++n)t.push(I0(this,r[n]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return yb(t.sort(W0))}}E(Xi,"id","time"),E(Xi,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function Rs(e,t,n){let a=0,r=e.length-1,i,s,l,o;n?(t>=e[a].pos&&t<=e[r].pos&&({lo:a,hi:r}=on(e,"pos",t)),{pos:i,time:l}=e[a],{pos:s,time:o}=e[r]):(t>=e[a].time&&t<=e[r].time&&({lo:a,hi:r}=on(e,"time",t)),{time:i,pos:l}=e[a],{time:s,pos:o}=e[r]);const c=s-i;return c?l+(o-l)*(t-i)/c:l}class Nd extends Xi{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),n=this._table=this.buildLookupTable(t);this._minPos=Rs(n,this.min),this._tableRange=Rs(n,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:n,max:a}=this,r=[],i=[];let s,l,o,c,d;for(s=0,l=t.length;s<l;++s)c=t[s],c>=n&&c<=a&&r.push(c);if(r.length<2)return[{time:n,pos:0},{time:a,pos:1}];for(s=0,l=r.length;s<l;++s)d=r[s+1],o=r[s-1],c=r[s],Math.round((d+o)/2)!==c&&i.push({time:c,pos:s/(l-1)});return i}_generate(){const t=this.min,n=this.max;let a=super.getDataTimestamps();return(!a.includes(t)||!a.length)&&a.splice(0,0,t),(!a.includes(n)||a.length===1)&&a.push(n),a.sort((r,i)=>r-i)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const n=this.getDataTimestamps(),a=this.getLabelTimestamps();return n.length&&a.length?t=this.normalize(n.concat(a)):t=n.length?n:a,t=this._cache.all=t,t}getDecimalForValue(t){return(Rs(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const n=this._offsets,a=this.getDecimalForPixel(t)/n.factor-n.end;return Rs(this._table,a*this._tableRange+this._minPos,!0)}}E(Nd,"id","timeseries"),E(Nd,"defaults",Xi.defaults);var bw=Object.freeze({__proto__:null,CategoryScale:Cd,LinearScale:Ed,LogarithmicScale:Od,RadialLinearScale:ai,TimeScale:Xi,TimeSeriesScale:Nd});const xw=[S1,$k,KS,bw];en.register(...xw);const jd="hangar.finnhubKey",yw=["finnhubKey","finnhubToken","token"],Ua=4,$u=24;function Mr(e){return typeof e=="string"?e.trim():""}function vw(e={}){return Mr((e==null?void 0:e.VITE_FINNHUB_KEY)||"")}function _w(e=globalThis==null?void 0:globalThis.localStorage){if(!e||typeof e.getItem!="function")return"";try{return Mr(e.getItem(jd)||"")}catch{return""}}function kw(e,t=globalThis==null?void 0:globalThis.localStorage){if(!t||typeof t.setItem!="function")return;const n=Mr(e);try{n?t.setItem(jd,n):typeof t.removeItem=="function"&&t.removeItem(jd)}catch{}}function Sw({viteEnv:e={},search:t="",appConfig:n={},storage:a=globalThis==null?void 0:globalThis.localStorage}={}){var l;let r="",i="missing";const s=vw(e);if(s)return{key:s,source:"env"};try{const o=new URLSearchParams(t||"");for(const c of yw){const d=Mr(o.get(c));if(d){r=d,i="query",kw(d,a);break}}}catch{}if(!r){const o=_w(a);o&&(r=o,i="storage")}if(!r){const o=Mr(((l=n==null?void 0:n.marketData)==null?void 0:l.finnhubKey)||"");o&&(r=o,i="config")}return{key:r,source:i}}function ww(e,t=$u){return Array.isArray(e)?e.map((n,a)=>({id:(n==null?void 0:n.id)||(n==null?void 0:n.headline)||`news-${a}`,headline:String((n==null?void 0:n.headline)||"").trim(),summary:String((n==null?void 0:n.summary)||"").trim(),source:String((n==null?void 0:n.source)||"Finnhub").trim(),url:String((n==null?void 0:n.url)||"").trim(),image:String((n==null?void 0:n.image)||"").trim(),category:String((n==null?void 0:n.category)||"").trim(),datetime:Number(n==null?void 0:n.datetime)||0})).filter(n=>n.headline&&n.url).sort((n,a)=>a.datetime-n.datetime).slice(0,t):[]}async function Mw({apiKey:e,fetchImpl:t=globalThis.fetch,category:n="general",limit:a=$u}={}){const r=Mr(e);if(!r)throw new Error("FINNHUB_KEY_MISSING");if(typeof t!="function")throw new Error("FETCH_UNAVAILABLE");const i=new URL("https://finnhub.io/api/v1/news");i.searchParams.set("category",n),i.searchParams.set("token",r);const s=await t(i.toString(),{headers:{Accept:"application/json"},cache:"no-cache"});if(!s.ok)throw new Error(`FINNHUB_NEWS_${s.status}`);const l=await s.json();return ww(l,a)}const Aw={VITE_FINNHUB_KEY:"d7g4oihr01qqb8ribc8gd7g4oihr01qqb8ribc90"};function bc(e,t,n){typeof window>"u"||(window.latestFinnhubMarketNews=Array.isArray(e)?e:[],document.dispatchEvent(new CustomEvent("finnhubMarketNewsUpdated",{detail:{items:window.latestFinnhubMarketNews,status:t,keyDetails:n}})))}function Tw(){const e=K.useMemo(()=>typeof window>"u"?{key:"",source:"missing"}:Sw({viteEnv:Aw,search:window.location.search,appConfig:window.APP_CONFIG||{},storage:window.localStorage}),[]),[t,n]=K.useState([]),[a,r]=K.useState(e.key?"loading":"missing-key"),[i,s]=K.useState(""),[l,o]=K.useState(0),c=K.useCallback(async()=>{if(!e.key){r("missing-key"),n([]),s(""),bc([],"missing-key",e);return}r("loading"),s("");try{const d=await Mw({apiKey:e.key,limit:$u});n(d),r(d.length?"ready":"empty"),o(Date.now()),bc(d,d.length?"ready":"empty",e)}catch(d){n([]),r("error"),s(d instanceof Error?d.message:"Unable to load market news."),bc([],"error",e)}},[e.key]);return K.useEffect(()=>{c()},[c]),{items:t,status:a,error:i,lastUpdated:l,refresh:c,keyDetails:e}}function Dw(e){if(!e)return"--";const t=new Date(e*1e3);return Number.isNaN(t.getTime())?"--":t.toLocaleString("en-US",{month:"short",day:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function Cw(e){return e?e.length<=180?e:`${e.slice(0,177).trim()}...`:"Open the article for the full market brief."}function Ew(){const{items:e,status:t,error:n,lastUpdated:a,refresh:r,keyDetails:i}=Tw(),[s,l]=K.useState(1),o=K.useMemo(()=>a?new Date(a).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"Awaiting first sync",[a]);K.useEffect(()=>{l(1)},[e]);const c=Math.max(1,Math.ceil(e.length/Ua)),d=K.useMemo(()=>{const f=(s-1)*Ua;return e.slice(f,f+Ua)},[s,e]),u=K.useMemo(()=>{if(!e.length)return"No stories loaded yet";const f=(s-1)*Ua+1,m=Math.min(e.length,s*Ua);return`Showing ${f}-${m} of ${e.length} headlines`},[s,e]),h=t==="loading";return _.jsxs("article",{className:"bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-5 space-y-5",children:[_.jsxs("div",{className:"flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",children:[_.jsxs("div",{className:"space-y-1",children:[_.jsx("p",{className:"text-xs font-semibold tracking-widest uppercase text-sky-500 dark:text-sky-300",children:"Global Market Brief"}),_.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white",children:"World Stock News"}),_.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-400 max-w-3xl",children:"Live headlines from Finnhub's general market news feed so the supply deck surfaces what is moving global equities right now."})]}),_.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-xs",children:[_.jsxs("span",{className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60",children:[_.jsx("span",{className:"font-semibold",children:"Key source"}),_.jsx("span",{children:i.source==="missing"?"Not configured":i.source})]}),_.jsxs("span",{className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 dark:bg-sky-900/30 text-sky-600 dark:text-sky-200 border border-sky-500/20 dark:border-sky-500/30",children:[_.jsx("span",{className:"font-semibold",children:"Last sync"}),_.jsx("span",{children:o})]}),_.jsxs("button",{type:"button",onClick:r,disabled:h||t==="missing-key",className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-sky-500/40 text-sky-600 dark:text-sky-200 bg-white/70 dark:bg-slate-900/50 text-xs font-semibold hover:bg-sky-500/10 hover:border-sky-500/70 transition disabled:opacity-50 disabled:cursor-not-allowed",children:[_.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:_.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})}),h?"Refreshing...":"Refresh feed"]})]})]}),t==="missing-key"?_.jsxs("div",{className:"rounded-xl border border-amber-300/70 dark:border-amber-500/40 bg-amber-50/80 dark:bg-amber-900/20 p-4 space-y-2 text-sm text-amber-800 dark:text-amber-100",children:[_.jsx("p",{className:"font-semibold",children:"Finnhub key not configured."}),_.jsxs("p",{children:["Add ",_.jsx("code",{children:"VITE_FINNHUB_KEY"})," to ",_.jsx("code",{children:".env.local"}),", then restart the Vite dev server. Query-string, local storage, and ",_.jsx("code",{children:"window.APP_CONFIG.marketData.finnhubKey"})," still work as fallbacks."]})]}):null,t==="error"?_.jsxs("div",{className:"rounded-xl border border-rose-300/70 dark:border-rose-500/40 bg-rose-50/80 dark:bg-rose-900/20 p-4 text-sm text-rose-700 dark:text-rose-100",children:["Unable to load world stock news. ",n||"Unknown error."]}):null,t==="loading"?_.jsx("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-4","aria-live":"polite",children:Array.from({length:Ua}).map((f,m)=>_.jsxs("div",{className:"rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50/70 dark:bg-slate-900/30 p-4 space-y-3 animate-pulse",children:[_.jsx("div",{className:"h-3 w-24 rounded bg-slate-200 dark:bg-slate-700"}),_.jsx("div",{className:"h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-700"}),_.jsx("div",{className:"h-20 rounded bg-slate-200 dark:bg-slate-700"}),_.jsx("div",{className:"h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-700"})]},m))}):null,t==="empty"?_.jsx("div",{className:"rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/30 p-4 text-sm text-slate-600 dark:text-slate-300",children:"Finnhub returned no market headlines for the current query."}):null,t==="ready"?_.jsxs("div",{className:"space-y-4",children:[_.jsx("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-4","aria-live":"polite",children:d.map(f=>_.jsxs("article",{"data-news-card":!0,className:"rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50/70 dark:bg-slate-900/30 overflow-hidden",children:[f.image?_.jsx("div",{className:"aspect-[16/7] overflow-hidden bg-slate-200 dark:bg-slate-800",children:_.jsx("img",{src:f.image,alt:"",className:"h-full w-full object-cover",loading:"lazy"})}):null,_.jsxs("div",{className:"p-4 space-y-3",children:[_.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400",children:[_.jsx("span",{children:f.source}),_.jsx("span",{className:"h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500"}),_.jsx("span",{children:Dw(f.datetime)}),f.category?_.jsxs(_.Fragment,{children:[_.jsx("span",{className:"h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500"}),_.jsx("span",{children:f.category})]}):null]}),_.jsx("h4",{className:"text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug",children:_.jsx("a",{href:f.url,target:"_blank",rel:"noopener noreferrer",className:"hover:text-sky-600 dark:hover:text-sky-300 transition",children:f.headline})}),_.jsx("p",{className:"text-sm text-slate-600 dark:text-slate-300",children:Cw(f.summary)}),_.jsxs("a",{href:f.url,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-300 hover:underline",children:["Read article",_.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:_.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M14 5l7 7m0 0l-7 7m7-7H3"})})]})]})]},f.id))}),c>1?_.jsxs("div",{className:"flex flex-col gap-3 border-t border-slate-200/80 dark:border-slate-700/70 pt-4 sm:flex-row sm:items-center sm:justify-between",children:[_.jsxs("div",{className:"space-y-1",children:[_.jsxs("p",{"data-news-page-indicator":!0,className:"text-sm font-semibold text-slate-900 dark:text-slate-100",children:["Page ",s," of ",c]}),_.jsx("p",{className:"text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400",children:u})]}),_.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[_.jsx("button",{type:"button","data-news-pagination-prev":!0,"aria-label":"Previous news page",onClick:()=>l(f=>Math.max(1,f-1)),disabled:s===1,className:"inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300/80 dark:border-slate-600/80 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-45 disabled:cursor-not-allowed",children:"Prev"}),_.jsx("button",{type:"button","data-news-pagination-next":!0,"aria-label":"Next news page",onClick:()=>l(f=>Math.min(c,f+1)),disabled:s===c,className:"inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300/80 dark:border-slate-600/80 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-45 disabled:cursor-not-allowed",children:"Next"})]})]}):null]}):null]})}const Ls=new Map;function tf(){return typeof window>"u"?null:window.HangarDataBridge||null}function ep(){const e=tf();if(!e||typeof e.getCurrentPortfolioSnapshot!="function")return null;try{return e.getCurrentPortfolioSnapshot()}catch(t){return console.warn("Unable to read current portfolio snapshot from runtime bridge.",t),null}}function ox(){const e=tf();if(!e||typeof e.getAlphaVantageState!="function")return{configured:!1,source:"missing"};try{return e.getAlphaVantageState()||{configured:!1,source:"missing"}}catch(t){return console.warn("Unable to read Alpha Vantage state from runtime bridge.",t),{configured:!1,source:"missing"}}}async function Ow(e,t={}){const n=tf();if(!n||typeof n.fetchDailyAdjustedSeries!="function")return[];const a=String(e||"").trim().toUpperCase();if(!a)return[];const r=String((t==null?void 0:t.outputSize)||"full").trim().toLowerCase()==="compact"?"compact":"full",i=`${a}:${r}`;if(Ls.has(i))return Ls.get(i);const s=Promise.resolve(n.fetchDailyAdjustedSeries(a,{...t,outputSize:r})).catch(l=>(console.warn(`Unable to fetch historical series for ${a}.`,l),[])).finally(()=>{Ls.delete(i)});return Ls.set(i,s),s}async function cx(e,t={}){const n=Array.from(new Set((Array.isArray(e)?e:[]).map(r=>String(r||"").trim().toUpperCase()).filter(Boolean))),a=await Promise.all(n.map(async r=>[r,await Ow(r,t)]));return Object.fromEntries(a)}function zw(e,t){if(typeof window>"u")return t;try{const n=window.localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function Nw(e,t){if(!(typeof window>"u"))try{window.localStorage.setItem(e,JSON.stringify(t))}catch(n){console.warn(`Unable to persist ${e} to localStorage.`,n)}}function ef(){const[e,t]=K.useState(()=>ep()),n=K.useCallback(()=>{const a=ep();a&&t(a)},[]);return K.useEffect(()=>{n();const a=["hangar-data-bridge-ready","livePriceSheetUpdated","portfolio-assumptions-reset","hangar-settings-changed","hangar-settings-ready","alpha-vantage-key-changed"],r=()=>{window.setTimeout(n,80)},i=o=>{const c=o.target;c instanceof Element&&c.closest("#calculateRebalanceBtn")&&r()},s=o=>{const c=o.target;c instanceof Element&&c.matches('input[data-stock][data-field="target"], input[data-stock][data-field="currentValue"]')&&r()};a.forEach(o=>{window.addEventListener(o,r)}),document.addEventListener("click",i),document.addEventListener("change",s,!0);const l=window.setInterval(n,15e3);return()=>{a.forEach(o=>{window.removeEventListener(o,r)}),document.removeEventListener("click",i),document.removeEventListener("change",s,!0),window.clearInterval(l)}},[n]),{snapshot:e,refresh:n}}function nf(e,t){const[n,a]=K.useState(()=>zw(e,t));return K.useEffect(()=>{Nw(e,n)},[e,n]),[n,a]}const At=1e-6,jw=.5,Rw=2,Lw=63,Bw=126,Hw=126;function dx(e,t,n){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):t}function nr(e){return e.reduce((t,n)=>t+n,0)}function Vw(e){const t=Array.isArray(e)?e.map(a=>({key:String((a==null?void 0:a.key)||"").trim(),targetPercent:Number(a==null?void 0:a.targetPercent)||0,currentValue:Number(a==null?void 0:a.currentValue)||0,price:Number(a==null?void 0:a.price)||0})).filter(a=>a.key):[],n=nr(t.map(a=>a.targetPercent>0?a.targetPercent:0));return n<=At?t.map(a=>({...a,normalizedTargetPercent:t.length?100/t.length:0})):t.map(a=>({...a,normalizedTargetPercent:a.targetPercent>0?a.targetPercent/n*100:0}))}function Uw(e,t=[]){const n=t.length?t:Object.keys(e||{}).filter(i=>i),a=n.map(i=>Math.max(0,Number(e==null?void 0:e[i])||0)),r=nr(a);return r<=At?Object.fromEntries(n.map(i=>[i,t.length?1/t.length:0])):Object.fromEntries(n.map((i,s)=>[i,a[s]/r]))}function Yw(e,t){return Object.fromEntries(Object.entries(e||{}).map(([n,a])=>[n,(Number(a)||0)*t]))}function xc(e,t,n){const a=Object.keys(n||{}),r=Object.fromEntries(a.map(o=>[o,0])),i=new Set;let s=Math.max(0,Number(t)||0),l=a.filter(o=>(Number(n==null?void 0:n[o])||0)>At);for(;s>At&&l.length;){const o=Uw(e,l),c=[];let d=!1;if(l.forEach(u=>{const h=Math.max(0,Number(n==null?void 0:n[u])||0)-(Number(r[u])||0),f=s*(o[u]||0);f>=h-At&&(r[u]+=h,s-=h,c.push(u),d=!0,h+At<f&&i.add(u))}),!d){l.forEach(u=>{r[u]+=s*(o[u]||0)}),s=0;break}l=l.filter(u=>!c.includes(u))}return{allocations:r,cappedKeys:i,unallocatedCash:s>At?s:0}}function Gw(e){return e instanceof Date?e.getTime():typeof e=="number"?e:typeof e=="string"?/^\d{4}-\d{2}-\d{2}$/.test(e)?Date.parse(`${e}T00:00:00Z`):Date.parse(e):Number.NaN}function Fw(e,t={}){const n=Math.max(1,(t==null?void 0:t.momentumShortDays)||Lw),a=Math.max(1,(t==null?void 0:t.momentumLongDays)||Bw),r=Math.max(1,(t==null?void 0:t.drawdownLookbackDays)||Hw),i=Array.isArray(e)?e.map(y=>({date:y==null?void 0:y.date,price:Number(y==null?void 0:y.price),time:Gw(y==null?void 0:y.date)})).filter(y=>Number.isFinite(y.price)&&Number.isFinite(y.time)).sort((y,p)=>y.time-p.time):[];if(!i.length)return{lastPrice:null,momentum63:null,momentum126:null,drawdownFromHigh:null,historyLength:0,hasCompleteHistory:!1};const s=i.length-1,l=i[s].price,o=s-n,c=s-a,d=Math.max(0,s-r),u=i.slice(d,s+1),h=Math.max(...u.map(y=>y.price)),f=o>=0&&i[o].price>0?l/i[o].price-1:null,m=c>=0&&i[c].price>0?l/i[c].price-1:null,b=h>0?dx(1-l/h,0,1):null;return{lastPrice:l,momentum63:f,momentum126:m,drawdownFromHigh:b,historyLength:i.length,hasCompleteHistory:Number.isFinite(f)&&Number.isFinite(m)&&Number.isFinite(b)}}function np(e,t=.5){if(!e.length)return[];const n=Math.min(...e),a=Math.max(...e);return Math.abs(a-n)<=At?e.map(()=>t):e.map(r=>(r-n)/(a-n))}function qw(e){const t=Object.entries(e||{}).map(([s,l])=>({key:s,signal:l||{},momentumComposite:Number.isFinite(l==null?void 0:l.momentum63)&&Number.isFinite(l==null?void 0:l.momentum126)?l.momentum63*.58+l.momentum126*.42:null,drawdownFromHigh:Number.isFinite(l==null?void 0:l.drawdownFromHigh)?l.drawdownFromHigh:null})),n=t.filter(s=>{var l;return Number.isFinite(s.momentumComposite)&&Number.isFinite(s.drawdownFromHigh)&&((l=s.signal)==null?void 0:l.hasCompleteHistory)}),a=np(n.map(s=>s.momentumComposite)),r=np(n.map(s=>s.drawdownFromHigh)),i=Object.fromEntries(n.map((s,l)=>[s.key,{...s.signal,momentumComposite:s.momentumComposite,normalizedMomentum:a[l],normalizedDrawdown:r[l],score:a[l]*.7+r[l]*.3}]));return Object.fromEntries(t.map(s=>[s.key,i[s.key]||{...s.signal,momentumComposite:s.momentumComposite,normalizedMomentum:null,normalizedDrawdown:null,score:null}]))}function Xw({driftNeed:e,signal:t,wasTiltCapped:n}){const a=[];return e>At&&a.push("underweight"),Number.isFinite(t==null?void 0:t.momentumComposite)&&t.momentumComposite>=.03&&a.push("trend strong"),Number.isFinite(t==null?void 0:t.drawdownFromHigh)&&t.drawdownFromHigh>=.08&&a.push("pullback attractive"),n&&a.push("tilt capped"),a}function Pw({assets:e,depositAmount:t,signalScoreMap:n=null,minimumDriftShare:a=jw,maxTargetBandPercent:r=Rw}={}){const i=Vw(e),s=i.map(S=>S.key),l=Math.max(0,Number(t)||0),o=nr(i.map(S=>Math.max(0,S.currentValue))),c=o+l,d=Object.fromEntries(i.map(S=>[S.key,Math.max(0,(S.normalizedTargetPercent+r)/100*c-S.currentValue)])),u=Object.fromEntries(i.map(S=>[S.key,Math.max(0,S.normalizedTargetPercent/100*c-S.currentValue)])),h=nr(Object.values(u))>At?u:Object.fromEntries(i.map(S=>[S.key,S.normalizedTargetPercent])),f=xc(h,l,d),m=n?qw(n):null,b=m&&s.every(S=>m[S]&&Number.isFinite(m[S].score));let y={...f.allocations},p=Object.fromEntries(s.map(S=>[S,0])),g="pure-drift-fallback",x=null,v=new Set;if(b&&l>At){const S=Yw(f.allocations,dx(a,0,1)),w=nr(Object.values(S)),M=Math.max(0,l-w),T=Object.fromEntries(s.map(H=>[H,Math.max(0,d[H]-S[H])])),C=Object.fromEntries(s.map(H=>[H,Math.max(0,m[H].score||0)])),O=xc(C,M,T),N=nr(Object.values(O.allocations)),J=O.unallocatedCash>At?xc(u,O.unallocatedCash,Object.fromEntries(s.map(H=>[H,Math.max(0,T[H]-(O.allocations[H]||0))]))):{allocations:Object.fromEntries(s.map(H=>[H,0])),cappedKeys:new Set};p=Object.fromEntries(s.map(H=>[H,(O.allocations[H]||0)+(J.allocations[H]||0)])),y=Object.fromEntries(s.map(H=>[H,(S[H]||0)+(p[H]||0)])),g="market-tilt",v=new Set([...O.cappedKeys,...J.cappedKeys]),O.unallocatedCash>At&&N<=At&&(x="Signal overlay could not be applied cleanly, so the plan stayed close to drift correction.")}else l>At&&(x="Historical signal stack is incomplete, so this recommendation falls back to pure drift correction.");const k=i.map(S=>{const w=y[S.key]||0,M=S.currentValue+w,T=c>At?M/c*100:0,C=m?m[S.key]:null;return{key:S.key,targetPercent:S.normalizedTargetPercent,currentValue:S.currentValue,currentWeightPercent:o>At?S.currentValue/o*100:0,recommendedAmount:w,baseDriftAmount:f.allocations[S.key]||0,overlayAmount:p[S.key]||0,estimatedShares:S.price>At?w/S.price:null,price:S.price>At?S.price:null,driftNeed:u[S.key]||0,signalScore:Number.isFinite(C==null?void 0:C.score)?C.score:null,signal:C,postContributionValue:M,postWeightPercent:T,reasons:Xw({driftNeed:u[S.key]||0,signal:C,wasTiltCapped:v.has(S.key)})}}).sort((S,w)=>w.recommendedAmount-S.recommendedAmount);return{mode:g,depositAmount:l,totalCurrentValue:o,totalAfterContribution:c,hasCompleteSignalHistory:!!b,warning:x,rows:k,baseDriftAllocation:f.allocations,finalAllocations:y,unallocatedCash:f.unallocatedCash,topPick:k[0]||null}}const Qw=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0}),Kw=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}),Zw=new Intl.NumberFormat("en-US",{minimumFractionDigits:1,maximumFractionDigits:1});function Xt(e,t=!1){return Number.isFinite(e)?(t?Kw:Qw).format(e):"--"}function $t(e){return Number.isFinite(e)?`${Zw.format(e)}%`:"--"}function Pr(e){if(!e)return"--";const t=new Date(`${e}T00:00:00Z`);return Number.isNaN(t.getTime())?"--":t.toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"})}function Bs({label:e,value:t,detail:n}){return _.jsxs("div",{className:"rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm dark:border-slate-700/70 dark:bg-slate-950/50",children:[_.jsx("p",{className:"text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400",children:e}),_.jsx("p",{className:"mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-50",children:t}),n?_.jsx("p",{className:"mt-2 text-sm text-slate-600 dark:text-slate-300",children:n}):null]})}function Ww({reason:e}){return _.jsx("span",{className:"rounded-full border border-sky-500/20 bg-sky-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-200",children:e})}function Iw(){const{snapshot:e,refresh:t}=ef(),[n,a]=nf("hangar.contributionOptimizer",{depositAmount:1e3}),[r,i]=K.useState({status:"idle",message:"",signalByAsset:null,lastSynced:0}),s=Number(n==null?void 0:n.depositAmount)||0,l=(e==null?void 0:e.assets)||[],o=l.map(f=>f.key),c=(e==null?void 0:e.alphaVantage)||ox();K.useEffect(()=>{let f=!1;async function m(){if(!o.length)return;if(!(c!=null&&c.configured)){f||i({status:"missing-key",message:"Historical signal stack is unavailable without an Alpha Vantage key, so the optimizer is staying on pure drift correction.",signalByAsset:null,lastSynced:0});return}i(g=>({...g,status:"loading",message:"Syncing full historical series for each asset. The first cold run can take a while on Alpha Vantage free-tier limits."}));const b=await cx(o,{outputSize:"full"}),y=Object.fromEntries(o.map(g=>[g,Fw(b[g])])),p=o.every(g=>{var x;return(x=y[g])==null?void 0:x.hasCompleteHistory});f||i({status:p?"ready":"fallback",message:p?"Momentum and pullback overlays are active.":"One or more assets are missing enough history, so the optimizer fell back to pure drift correction.",signalByAsset:y,lastSynced:Date.now()})}return m(),()=>{f=!0}},[c==null?void 0:c.configured,o.join("|")]);const d=K.useMemo(()=>l.length?Pw({assets:l,depositAmount:s,signalScoreMap:r.status==="ready"?r.signalByAsset:null}):null,[l,s,r.signalByAsset,r.status]),u=(d==null?void 0:d.topPick)||null,h=r.lastSynced?new Date(r.lastSynced).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"--";return _.jsxs("div",{className:"space-y-6",children:[_.jsxs("div",{className:"rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/60",children:[_.jsxs("div",{className:"flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between",children:[_.jsxs("div",{className:"space-y-2",children:[_.jsx("p",{className:"text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400",children:"Decision Engine"}),_.jsx("h3",{className:"text-2xl font-semibold text-slate-950 dark:text-slate-50",children:"Capital Deployment Optimizer"}),_.jsx("p",{className:"max-w-3xl text-sm text-slate-600 dark:text-slate-300",children:"This model keeps at least half of every new contribution anchored to drift correction, then uses momentum and pullback context to tilt the rest inside a strict target band."})]}),_.jsxs("div",{className:"flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-900/40",children:[_.jsx("label",{htmlFor:"optimizerDepositAmount",className:"text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400",children:"New contribution"}),_.jsx("input",{id:"optimizerDepositAmount",type:"number",min:"0",step:"50",value:s,onChange:f=>a(m=>({...m,depositAmount:Number(f.target.value)||0})),className:"w-44 rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg font-semibold text-slate-950 shadow-sm outline-none transition focus:border-sky-500 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-50"}),_.jsx("div",{className:"flex flex-wrap items-center gap-2",children:_.jsx("button",{type:"button",onClick:()=>{t(),i(f=>({...f,status:"idle"}))},className:"rounded-xl border border-slate-300/80 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800",children:"Refresh snapshot"})})]})]}),_.jsxs("div",{className:"mt-6 grid grid-cols-1 gap-4 lg:grid-cols-4",children:[_.jsx(Bs,{label:"Primary Deployment",value:u?u.key:"--",detail:u?`${Xt(u.recommendedAmount)} recommended`:"Waiting for portfolio state"}),_.jsx(Bs,{label:"Execution Mode",value:(d==null?void 0:d.mode)==="market-tilt"?"Hybrid tilt":"Pure drift",detail:(d==null?void 0:d.mode)==="market-tilt"?"50% drift floor preserved":"Signal layer not active"}),_.jsx(Bs,{label:"Band Discipline",value:"Target + 2%",detail:"No recommendation is allowed to push an asset above its tactical cap."}),_.jsx(Bs,{label:"Signal Sync",value:r.status==="ready"?"Active":r.status==="loading"?"Loading":"Fallback",detail:`Last sync: ${h}`})]})]}),_.jsx("div",{className:`rounded-2xl border px-4 py-3 text-sm ${r.status==="ready"?"border-emerald-400/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200":r.status==="loading"?"border-slate-300/80 bg-slate-100/80 text-slate-700 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200":"border-amber-400/40 bg-amber-500/10 text-amber-900 dark:text-amber-100"}`,children:r.message||(d==null?void 0:d.warning)||"Waiting for the optimizer to initialize."}),d?_.jsxs("div",{className:"overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/80 shadow-xl shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/60",children:[_.jsx("div",{className:"border-b border-slate-200/80 px-6 py-4 dark:border-slate-700/70",children:_.jsxs("div",{className:"flex flex-col gap-2 md:flex-row md:items-center md:justify-between",children:[_.jsxs("div",{children:[_.jsx("p",{className:"text-xs uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400",children:"Recommendation Matrix"}),_.jsx("h4",{className:"mt-1 text-lg font-semibold text-slate-950 dark:text-slate-50",children:"Suggested deployment order"})]}),_.jsxs("p",{className:"text-sm text-slate-600 dark:text-slate-300",children:["Current portfolio value ",Xt(d.totalCurrentValue),". This run allocates ",Xt(d.depositAmount),"."]})]})}),_.jsx("div",{className:"overflow-x-auto",children:_.jsxs("table",{className:"min-w-full divide-y divide-slate-200/80 dark:divide-slate-700/70",children:[_.jsx("thead",{className:"bg-slate-100/80 dark:bg-slate-900/70",children:_.jsxs("tr",{className:"text-left text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400",children:[_.jsx("th",{className:"px-6 py-3",children:"Asset"}),_.jsx("th",{className:"px-6 py-3",children:"Current"}),_.jsx("th",{className:"px-6 py-3",children:"Target"}),_.jsx("th",{className:"px-6 py-3",children:"Recommend"}),_.jsx("th",{className:"px-6 py-3",children:"Est. shares"}),_.jsx("th",{className:"px-6 py-3",children:"Post-weight"}),_.jsx("th",{className:"px-6 py-3",children:"Signal"}),_.jsx("th",{className:"px-6 py-3",children:"Reasons"})]})}),_.jsx("tbody",{className:"divide-y divide-slate-200/70 text-sm dark:divide-slate-800/70",children:d.rows.map(f=>{var m,b;return _.jsxs("tr",{className:"align-top",children:[_.jsxs("td",{className:"px-6 py-4",children:[_.jsx("p",{className:"font-semibold text-slate-950 dark:text-slate-50",children:f.key}),_.jsx("p",{className:"mt-1 text-xs text-slate-500 dark:text-slate-400",children:f.signalScore!==null?`Signal score ${(f.signalScore*100).toFixed(0)}`:"Signal overlay inactive"})]}),_.jsxs("td",{className:"px-6 py-4 text-slate-700 dark:text-slate-300",children:[_.jsx("p",{children:Xt(f.currentValue)}),_.jsx("p",{className:"mt-1 text-xs text-slate-500 dark:text-slate-400",children:$t(f.currentWeightPercent)})]}),_.jsx("td",{className:"px-6 py-4 text-slate-700 dark:text-slate-300",children:$t(f.targetPercent)}),_.jsxs("td",{className:"px-6 py-4 text-slate-950 dark:text-slate-50",children:[_.jsx("p",{className:"font-semibold",children:Xt(f.recommendedAmount)}),_.jsxs("p",{className:"mt-1 text-xs text-slate-500 dark:text-slate-400",children:["Drift ",Xt(f.baseDriftAmount)," / Tilt ",Xt(f.overlayAmount)]})]}),_.jsx("td",{className:"px-6 py-4 text-slate-700 dark:text-slate-300",children:f.estimatedShares!==null?f.estimatedShares.toFixed(2):"--"}),_.jsx("td",{className:"px-6 py-4 text-slate-700 dark:text-slate-300",children:$t(f.postWeightPercent)}),_.jsx("td",{className:"px-6 py-4 text-slate-700 dark:text-slate-300",children:((m=f.signal)==null?void 0:m.momentumComposite)!==null&&Number.isFinite((b=f.signal)==null?void 0:b.momentumComposite)?_.jsxs("div",{className:"space-y-1 text-xs",children:[_.jsxs("p",{children:["Momentum ",(f.signal.momentumComposite*100).toFixed(1),"%"]}),_.jsxs("p",{children:["Pullback ",(f.signal.drawdownFromHigh*100).toFixed(1),"%"]})]}):_.jsx("span",{className:"text-xs text-slate-500 dark:text-slate-400",children:"Drift-only"})}),_.jsx("td",{className:"px-6 py-4",children:_.jsx("div",{className:"flex flex-wrap gap-2",children:f.reasons.length?f.reasons.map(y=>_.jsx(Ww,{reason:y},y)):_.jsx("span",{className:"text-xs text-slate-500 dark:text-slate-400",children:"Within band"})})})]},f.key)})})]})})]}):null]})}function Jw(e,t,n,a,r){if(!e.length)return"";const i=e.length>1?t/(e.length-1):t,s=Math.max(r-a,1e-4);return e.map((l,o)=>{const c=o*i,d=n-(l.value-a)/s*n;return`${o===0?"M":"L"} ${c.toFixed(2)} ${d.toFixed(2)}`}).join(" ")}function $w({series:e,height:t=240,emptyLabel:n="No chart data available for the current selection."}){var u,h;const a=Array.isArray(e)?e.filter(f=>Array.isArray(f==null?void 0:f.points)&&f.points.length):[];if(!a.length)return _.jsx("div",{className:"rounded-2xl border border-dashed border-slate-300/80 bg-slate-50/70 px-4 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-400",children:n});const r=a.flatMap(f=>f.points.map(m=>m.value)),i=Math.min(...r),s=Math.max(...r),l=t-32,o=760,c=((u=a[0].points[0])==null?void 0:u.date)||"",d=((h=a[0].points[a[0].points.length-1])==null?void 0:h.date)||"";return _.jsxs("div",{className:"space-y-4",children:[_.jsx("div",{className:"flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400",children:a.map(f=>_.jsxs("span",{className:"inline-flex items-center gap-2",children:[_.jsx("span",{className:"h-2.5 w-2.5 rounded-full",style:{backgroundColor:f.color}}),f.label]},f.label))}),_.jsxs("div",{className:"overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm dark:border-slate-700/70 dark:bg-slate-950/50",children:[_.jsxs("svg",{viewBox:`0 0 ${o} ${t}`,className:"h-60 w-full",role:"img","aria-label":"Historical portfolio replay chart",children:[[0,.25,.5,.75,1].map(f=>{const m=l-l*f;return _.jsx("line",{x1:"0",y1:m,x2:o,y2:m,stroke:"rgba(148, 163, 184, 0.2)",strokeDasharray:"6 10"},f)}),a.map(f=>_.jsx("path",{d:Jw(f.points,o,l,i,s),fill:"none",stroke:f.color,strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round"},f.label))]}),_.jsxs("div",{className:"mt-2 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400",children:[_.jsx("span",{children:c}),_.jsx("span",{children:d})]})]})]})}const Si=1e-6,yc=Object.freeze([{id:"dot-com-crash",label:"Dot-com Crash",startDate:"2000-03-24",endDate:"2002-10-09"},{id:"global-financial-crisis",label:"Global Financial Crisis",startDate:"2007-10-09",endDate:"2009-03-09"},{id:"covid-crash",label:"COVID Crash",startDate:"2020-02-19",endDate:"2020-03-23"},{id:"inflation-rate-shock",label:"Inflation / Rate Shock",startDate:"2022-01-03",endDate:"2022-10-12"}]);function Pi(e){return e instanceof Date?e.getTime():typeof e=="number"?e:typeof e=="string"?/^\d{4}-\d{2}-\d{2}$/.test(e)?Date.parse(`${e}T00:00:00Z`):Date.parse(e):Number.NaN}function ap(e){return Array.isArray(e)?e.map(t=>({date:t==null?void 0:t.date,price:Number(t==null?void 0:t.price),time:Pi(t==null?void 0:t.date)})).filter(t=>Number.isFinite(t.price)&&Number.isFinite(t.time)).sort((t,n)=>t.time-n.time):[]}function t4(e){const t=Object.entries(e||{}).filter(([r])=>r),n=t.map(([,r])=>Math.max(0,Number(r)||0)),a=n.reduce((r,i)=>r+i,0);return a<=Si?Object.fromEntries(t.map(([r])=>[r,0])):Object.fromEntries(t.map(([r],i)=>[r,n[i]/a]))}function e4(e,t,n){return e.filter(a=>a.time>=t&&a.time<=n)}function rp(e,t,n){return e.length?e[0].time<=t&&e[e.length-1].time>=n:!1}function ip(e,t){if(!e.length||!t.length)return[];let n=0,a=null,r=null;const i=[];return t.forEach(s=>{for(;n<e.length&&e[n].time<=s.time;)a=e[n].price,n+=1;Number.isFinite(a)&&(Number.isFinite(r)||(r=a),i.push({date:s.date,time:s.time,value:r>0?a/r:0}))}),i}function n4(e){if(!e.length)return{maxDrawdown:0,peakDate:null,troughDate:null,recoveryDate:null,recoveryCalendarDays:null,recoveryTradingDays:null,troughIndex:-1};let t=e[0].value,n=e[0].date,a=0,r=0,i=e[0].date,s=0,l=t,o=n,c=a;e.forEach((f,m)=>{f.value>t&&(t=f.value,n=f.date,a=m);const b=t>0?1-f.value/t:0;b>r+Si&&(r=b,i=f.date,s=m,l=t,o=n,c=a)});let d=null,u=null,h=null;if(r>Si){for(let f=s+1;f<e.length;f+=1)if(e[f].value>=l-Si){d=e[f].date,u=f-s,h=Math.round((Pi(d)-Pi(i))/(24*60*60*1e3));break}}return{maxDrawdown:r,peakDate:o,troughDate:i,recoveryDate:d,recoveryCalendarDays:h,recoveryTradingDays:u,troughIndex:s,peakIndex:c}}function a4({assetSeriesByKey:e,weightByKey:t,startDate:n,endDate:a,benchmarkSeries:r=null,benchmarkLabel:i="SPY"}={}){const s=Pi(n),l=Pi(a);if(!Number.isFinite(s)||!Number.isFinite(l)||s>=l)return{ok:!1,reason:"INVALID_WINDOW"};const o=t4(t),c=Object.fromEntries(Object.entries(e||{}).map(([M,T])=>[M,ap(T)])),d=Object.keys(o).filter(M=>rp(c[M]||[],s,l)),u=Object.keys(o).filter(M=>!d.includes(M)),h=d.reduce((M,T)=>M+(o[T]||0),0);if(h<=Si)return{ok:!1,reason:"NO_COVERAGE",coveredKeys:d,excludedKeys:u,coveragePercent:0};const f=Object.fromEntries(d.map(M=>[M,(o[M]||0)/h])),m=ap(r),b=rp(m,s,l),y=b?m:c[d[0]]||[],p=e4(y,s,l);if(!p.length)return{ok:!1,reason:"EMPTY_TIMELINE",coveredKeys:d,excludedKeys:u,coveragePercent:h*100};const g=Object.fromEntries(d.map(M=>[M,ip(c[M],p)])),x=b?ip(m,p):[],v=p.map((M,T)=>{const C=d.reduce((O,N)=>{var H;const J=(H=g[N])==null?void 0:H[T];return J?O+(f[N]||0)*J.value:O},0);return{date:M.date,time:M.time,value:C}}),k=n4(v),S=k.troughIndex,w=S>=0?d.map(M=>{var O,N,J,H;const T=((N=(O=g[M])==null?void 0:O[0])==null?void 0:N.value)||1,C=((H=(J=g[M])==null?void 0:J[S])==null?void 0:H.value)||T;return{key:M,contribution:(f[M]||0)*(C-T),weight:f[M]||0}}).sort((M,T)=>M.contribution-T.contribution):[];return{ok:!0,benchmarkLabel:i,coveredKeys:d,excludedKeys:u,coveragePercent:h*100,normalizedWeights:f,portfolioCurve:v,benchmarkCurve:x,startDate:p[0].date,endDate:p[p.length-1].date,totalReturn:v.length&&v[0].value>0?v[v.length-1].value-1:0,benchmarkReturn:x.length&&x[0].value>0?x[x.length-1].value-1:null,drawdown:k,worstContributors:w}}const sp="SPY";function Hs({label:e,value:t,detail:n}){return _.jsxs("div",{className:"rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm dark:border-slate-700/70 dark:bg-slate-950/50",children:[_.jsx("p",{className:"text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400",children:e}),_.jsx("p",{className:"mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-50",children:t}),n?_.jsx("p",{className:"mt-2 text-sm text-slate-600 dark:text-slate-300",children:n}):null]})}function r4(e){const t=e.reduce((a,r)=>a+(Number(r.currentValue)||0),0);if(t>0)return Object.fromEntries(e.map(a=>[a.key,(a.currentValue||0)/t]));const n=e.reduce((a,r)=>a+(Number(r.targetPercent)||0),0);return Object.fromEntries(e.map(a=>[a.key,n>0?(a.targetPercent||0)/n:0]))}function i4(){const{snapshot:e}=ef(),[t,n]=nf("hangar.crisisReplay",{mode:"preset",presetId:"covid-crash",customStartDate:"2022-01-03",customEndDate:"2022-10-12"}),[a,r]=K.useState({status:"idle",message:"",seriesMap:null,lastSynced:0}),i=(e==null?void 0:e.assets)||[],s=i.map(f=>f.key),l=(e==null?void 0:e.alphaVantage)||ox();K.useEffect(()=>{let f=!1;async function m(){if(!s.length)return;if(!(l!=null&&l.configured)){f||r({status:"missing-key",message:"Historical replay needs Alpha Vantage history. Add a key to unlock preset and custom stress windows.",seriesMap:null,lastSynced:0});return}r({status:"loading",message:"Hydrating full daily-adjusted history for portfolio assets and the SPY benchmark. Cold syncs can take a while on the free tier.",seriesMap:null,lastSynced:0});const b=await cx([...s,sp],{outputSize:"full"});f||r({status:"ready",message:"Historical replay engine is ready.",seriesMap:b,lastSynced:Date.now()})}return m(),()=>{f=!0}},[l==null?void 0:l.configured,s.join("|")]);const o=K.useMemo(()=>yc.find(f=>f.id===t.presetId)||yc[0],[t.presetId]),c=t.mode==="custom"?{startDate:t.customStartDate,endDate:t.customEndDate,label:"Custom window"}:o,d=K.useMemo(()=>a.status!=="ready"||!a.seriesMap||!i.length?null:a4({assetSeriesByKey:Object.fromEntries(s.map(f=>[f,a.seriesMap[f]||[]])),weightByKey:r4(i),startDate:c.startDate,endDate:c.endDate,benchmarkSeries:a.seriesMap[sp]||[],benchmarkLabel:"SPY benchmark"}),[c.endDate,c.startDate,s,i,a.seriesMap,a.status]),u=a.lastSynced?new Date(a.lastSynced).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}):"--",h=d!=null&&d.ok?[{label:"Portfolio",color:"#0ea5e9",points:d.portfolioCurve},d.benchmarkCurve.length?{label:d.benchmarkLabel,color:"#f97316",points:d.benchmarkCurve}:null].filter(Boolean):[];return _.jsxs("div",{className:"space-y-6",children:[_.jsxs("div",{className:"rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/60",children:[_.jsxs("div",{className:"flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between",children:[_.jsxs("div",{className:"space-y-2",children:[_.jsx("p",{className:"text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400",children:"Stress Engine"}),_.jsx("h3",{className:"text-2xl font-semibold text-slate-950 dark:text-slate-50",children:"Historical Stress Replay Chamber"}),_.jsx("p",{className:"max-w-3xl text-sm text-slate-600 dark:text-slate-300",children:"Replay the portfolio through the biggest historical dislocations and inspect drawdown depth, recovery speed, and which sleeves did the most damage."})]}),_.jsxs("div",{className:"rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-900/40",children:[_.jsx("p",{className:"text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400",children:"Replay Mode"}),_.jsxs("div",{className:"mt-3 flex flex-wrap gap-2",children:[_.jsx("button",{type:"button",onClick:()=>n(f=>({...f,mode:"preset"})),className:`rounded-xl px-3 py-2 text-sm font-semibold ${t.mode==="preset"?"bg-slate-950 text-white dark:bg-slate-50 dark:text-slate-950":"border border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-200"}`,children:"Preset crisis"}),_.jsx("button",{type:"button",onClick:()=>n(f=>({...f,mode:"custom"})),className:`rounded-xl px-3 py-2 text-sm font-semibold ${t.mode==="custom"?"bg-slate-950 text-white dark:bg-slate-50 dark:text-slate-950":"border border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-200"}`,children:"Custom range"})]})]})]}),t.mode==="preset"?_.jsx("div",{className:"mt-6 flex flex-wrap gap-3",children:yc.map(f=>_.jsxs("button",{type:"button",onClick:()=>n(m=>({...m,presetId:f.id})),className:`rounded-2xl border px-4 py-3 text-left ${f.id===o.id?"border-sky-500/40 bg-sky-500/10 text-sky-900 dark:text-sky-100":"border-slate-200/80 bg-white/60 text-slate-700 dark:border-slate-700/70 dark:bg-slate-900/30 dark:text-slate-200"}`,children:[_.jsx("p",{className:"text-sm font-semibold",children:f.label}),_.jsxs("p",{className:"mt-1 text-xs uppercase tracking-[0.18em] opacity-75",children:[f.startDate," to ",f.endDate]})]},f.id))}):_.jsxs("div",{className:"mt-6 grid grid-cols-1 gap-4 md:grid-cols-2",children:[_.jsxs("label",{className:"space-y-2 text-sm text-slate-700 dark:text-slate-300",children:[_.jsx("span",{className:"text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400",children:"Start date"}),_.jsx("input",{type:"date",value:t.customStartDate,onChange:f=>n(m=>({...m,customStartDate:f.target.value})),className:"w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500 dark:border-slate-600 dark:bg-slate-950"})]}),_.jsxs("label",{className:"space-y-2 text-sm text-slate-700 dark:text-slate-300",children:[_.jsx("span",{className:"text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400",children:"End date"}),_.jsx("input",{type:"date",value:t.customEndDate,onChange:f=>n(m=>({...m,customEndDate:f.target.value})),className:"w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500 dark:border-slate-600 dark:bg-slate-950"})]})]})]}),_.jsxs("div",{className:`rounded-2xl border px-4 py-3 text-sm ${a.status==="ready"?"border-emerald-400/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100":a.status==="loading"?"border-slate-300/80 bg-slate-100/80 text-slate-700 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200":"border-amber-400/40 bg-amber-500/10 text-amber-900 dark:text-amber-100"}`,children:[a.message," Last sync: ",u,"."]}),d!=null&&d.ok?_.jsxs(_.Fragment,{children:[_.jsxs("div",{className:"grid grid-cols-1 gap-4 lg:grid-cols-4",children:[_.jsx(Hs,{label:"Covered Weight",value:$t(d.coveragePercent),detail:`${d.coveredKeys.length} asset sleeves fully covered in this window.`}),_.jsx(Hs,{label:"Max Drawdown",value:$t(d.drawdown.maxDrawdown*100),detail:`Peak ${Pr(d.drawdown.peakDate)} / trough ${Pr(d.drawdown.troughDate)}`}),_.jsx(Hs,{label:"Recovery",value:d.drawdown.recoveryDate?Pr(d.drawdown.recoveryDate):"Not recovered",detail:d.drawdown.recoveryCalendarDays!==null?`${d.drawdown.recoveryCalendarDays} calendar days from trough`:"Still below the prior peak at the end of the replay"}),_.jsx(Hs,{label:"Portfolio Return",value:$t(d.totalReturn*100),detail:d.benchmarkReturn!==null?`Benchmark ${$t(d.benchmarkReturn*100)}`:"Benchmark coverage unavailable"})]}),_.jsxs("div",{className:"rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/60",children:[_.jsxs("div",{className:"mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between",children:[_.jsxs("div",{children:[_.jsx("p",{className:"text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400",children:"Replay Window"}),_.jsx("h4",{className:"mt-1 text-lg font-semibold text-slate-950 dark:text-slate-50",children:c.label})]}),_.jsxs("p",{className:"text-sm text-slate-600 dark:text-slate-300",children:["Showing ",Pr(d.startDate)," to ",Pr(d.endDate),"."]})]}),_.jsx($w,{series:h}),_.jsxs("div",{className:"mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr,1fr]",children:[_.jsxs("div",{className:"rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-700/70 dark:bg-slate-900/40",children:[_.jsx("p",{className:"text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400",children:"Coverage Notes"}),_.jsx("p",{className:"mt-3 text-sm text-slate-700 dark:text-slate-300",children:"Assets without full window history are excluded entirely, then the remaining covered sleeves are renormalized to preserve a clean buy-and-hold replay."}),d.excludedKeys.length?_.jsxs("p",{className:"mt-3 text-sm text-slate-600 dark:text-slate-300",children:["Excluded in this window: ",d.excludedKeys.join(", "),"."]}):_.jsx("p",{className:"mt-3 text-sm text-slate-600 dark:text-slate-300",children:"All current sleeves had full coverage in this window."})]}),_.jsxs("div",{className:"rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-700/70 dark:bg-slate-900/40",children:[_.jsx("p",{className:"text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400",children:"Worst Contributors"}),_.jsx("div",{className:"mt-3 space-y-3",children:d.worstContributors.slice(0,4).map(f=>_.jsxs("div",{className:"flex items-center justify-between rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-slate-700/70 dark:bg-slate-950/40",children:[_.jsxs("div",{children:[_.jsx("p",{className:"font-semibold text-slate-950 dark:text-slate-50",children:f.key}),_.jsxs("p",{className:"text-xs text-slate-500 dark:text-slate-400",children:["Weight ",$t(f.weight*100)]})]}),_.jsx("p",{className:"font-semibold text-rose-600 dark:text-rose-300",children:$t(f.contribution*100)})]},f.key))})]})]})]})]}):a.status==="ready"?_.jsx("div",{className:"rounded-[28px] border border-dashed border-slate-300/80 bg-slate-50/70 px-6 py-12 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-300",children:(d==null?void 0:d.reason)==="NO_COVERAGE"?"The selected window has no fully-covered current sleeves. Try a newer crisis or a custom window with more ETF history.":"Unable to build a clean replay for the selected window."}):null]})}const Rd=1e-6,af=42,s4=1e4;function l4(e=af){let t=Number(e)>>>0||1;return()=>(t=Math.imul(1664525,t)+1013904223>>>0,t/4294967296)}function o4(e){let t=null;return()=>{if(t!==null){const i=t;return t=null,i}const n=Math.max(e(),Rd),a=Math.max(e(),Rd),r=Math.sqrt(-2*Math.log(n));return t=r*Math.sin(2*Math.PI*a),r*Math.cos(2*Math.PI*a)}}function vc(e,t){if(!e.length)return 0;const n=Math.min(1,Math.max(0,t)),a=(e.length-1)*n,r=Math.floor(a),i=Math.ceil(a),s=a-r;return r===i?e[r]:e[r]*(1-s)+e[i]*s}function c4({yearsToRetirement:e,desiredAnnualSpending:t,inflationRate:n}){const a=Math.max(0,Number(e)||0),r=Math.max(0,Number(t)||0),i=Math.max(-.99,Number(n)||0),s=r*Math.pow(1+i,a);return{yearsToRetirement:a,inflatedAnnualSpending:s,targetNestEgg:s/.04}}function d4({currentPortfolioValue:e,yearsToRetirement:t,annualContribution:n,annualContributionGrowth:a,expectedReturn:r,volatility:i,seed:s=af}={}){const l=Math.max(0,Number(e)||0),o=Math.max(0,Number(t)||0),c=Math.round(o*12),d=Math.max(0,Number(n)||0)/12,u=Number(a)||0,h=Number(r)||0,f=Math.max(0,Number(i)||0),m=(h-f*f/2)/12,b=f/Math.sqrt(12),y=l4(s),p=o4(y);let g=l,x=d;for(let v=0;v<c;v+=1){v>0&&v%12===0&&(x*=1+u);const k=b>0?p():0,S=Math.exp(m+b*k);g=g*S+x}return g}function u4({currentPortfolioValue:e,currentAge:t,retirementAge:n,annualContribution:a,annualContributionGrowth:r,expectedReturn:i,volatility:s,inflationRate:l,desiredAnnualSpending:o,simulationCount:c=s4,seed:d=af}={}){const u=Math.max(0,(Number(n)||0)-(Number(t)||0)),h=Math.max(1,Math.floor(Number(c)||0)),f=c4({yearsToRetirement:u,desiredAnnualSpending:o,inflationRate:l}),m=[];for(let k=0;k<h;k+=1)m.push(d4({currentPortfolioValue:e,yearsToRetirement:u,annualContribution:a,annualContributionGrowth:r,expectedReturn:i,volatility:s,seed:d+k}));const b=[...m].sort((k,S)=>k-S),y=vc(b,.1),p=vc(b,.5),g=vc(b,.9),v=b.filter(k=>k>=f.targetNestEgg-Rd).length/h;return{simulationCount:h,yearsToRetirement:u,endingBalances:b,successProbability:v,shortfallProbability:1-v,percentiles:{p10:y,p50:p,p90:g},inflatedAnnualSpending:f.inflatedAnnualSpending,targetNestEgg:f.targetNestEgg,medianSurplus:p-f.targetNestEgg,impliedSafeAnnualSpend:p*.04}}function Ze({label:e,value:t,detail:n}){return _.jsxs("div",{className:"rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm dark:border-slate-700/70 dark:bg-slate-950/50",children:[_.jsx("p",{className:"text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400",children:e}),_.jsx("p",{className:"mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-50",children:t}),n?_.jsx("p",{className:"mt-2 text-sm text-slate-600 dark:text-slate-300",children:n}):null]})}function _n({label:e,type:t="number",value:n,onChange:a,suffix:r=null}){return _.jsxs("label",{className:"space-y-2 text-sm text-slate-700 dark:text-slate-300",children:[_.jsx("span",{className:"text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400",children:e}),_.jsxs("div",{className:"relative",children:[_.jsx("input",{type:t,value:n,onChange:a,className:"w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500 dark:border-slate-600 dark:bg-slate-950"}),r?_.jsx("span",{className:"pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-slate-500 dark:text-slate-400",children:r}):null]})]})}function f4(){var h,f,m,b,y,p,g,x;const{snapshot:e}=ef(),[t,n]=nf("hangar.retirementLab",{currentAge:30,retirementAge:60,annualContribution:7e3,annualContributionGrowth:3,inflationRate:2.5,desiredAnnualSpending:5e4,useManualAssumptions:!1,manualExpectedReturn:null,manualVolatility:null}),[a,r]=K.useState({status:"idle",result:null}),i=(((h=e==null?void 0:e.analytics)==null?void 0:h.expectedReturn)||((m=(f=e==null?void 0:e.defaults)==null?void 0:f.portfolioDefaults)==null?void 0:m.marketReturn)||.08)*100,s=(((b=e==null?void 0:e.analytics)==null?void 0:b.volatility)||((p=(y=e==null?void 0:e.defaults)==null?void 0:y.portfolioDefaults)==null?void 0:p.benchmarkVolatility)||.16)*100,l=((g=e==null?void 0:e.totals)==null?void 0:g.currentValue)||((x=e==null?void 0:e.assets)==null?void 0:x.reduce((v,k)=>v+(k.currentValue||0),0))||0,o=t.useManualAssumptions?Number(t.manualExpectedReturn??i)||0:i,c=t.useManualAssumptions?Number(t.manualVolatility??s)||0:s,d=K.useMemo(()=>({currentPortfolioValue:l,currentAge:Number(t.currentAge)||0,retirementAge:Number(t.retirementAge)||0,annualContribution:Number(t.annualContribution)||0,annualContributionGrowth:(Number(t.annualContributionGrowth)||0)/100,expectedReturn:o/100,volatility:c/100,inflationRate:(Number(t.inflationRate)||0)/100,desiredAnnualSpending:Number(t.desiredAnnualSpending)||0,simulationCount:1e4,seed:42}),[l,o,t.annualContribution,t.annualContributionGrowth,t.currentAge,t.desiredAnnualSpending,t.inflationRate,t.retirementAge,c]);K.useEffect(()=>{let v=!1;r(S=>({...S,status:"calculating"}));const k=window.setTimeout(()=>{const S=u4(d);v||K.startTransition(()=>{r({status:"ready",result:S})})},0);return()=>{v=!0,window.clearTimeout(k)}},[d]);const u=a.result;return _.jsxs("div",{className:"space-y-6",children:[_.jsxs("div",{className:"rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/60",children:[_.jsxs("div",{className:"flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between",children:[_.jsxs("div",{className:"space-y-2",children:[_.jsx("p",{className:"text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400",children:"Probability Engine"}),_.jsx("h3",{className:"text-2xl font-semibold text-slate-950 dark:text-slate-50",children:"Monte Carlo Retirement Lab"}),_.jsx("p",{className:"max-w-3xl text-sm text-slate-600 dark:text-slate-300",children:"This lab projects retirement readiness using the current portfolio as the default return and volatility source, then runs 10,000 seeded paths to estimate success and shortfall risk."})]}),_.jsxs("div",{className:"rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-900/40",children:[_.jsx("p",{className:"text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400",children:"Portfolio defaults"}),_.jsxs("div",{className:"mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300",children:[_.jsxs("p",{children:["Expected return ",$t(i)]}),_.jsxs("p",{children:["Volatility ",$t(s)]}),_.jsxs("p",{children:["Current value ",Xt(l)]})]})]})]}),_.jsxs("div",{className:"mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",children:[_.jsx(_n,{label:"Current age",value:t.currentAge,onChange:v=>n(k=>({...k,currentAge:Number(v.target.value)||0}))}),_.jsx(_n,{label:"Retirement age",value:t.retirementAge,onChange:v=>n(k=>({...k,retirementAge:Number(v.target.value)||0}))}),_.jsx(_n,{label:"Annual contribution",value:t.annualContribution,onChange:v=>n(k=>({...k,annualContribution:Number(v.target.value)||0}))}),_.jsx(_n,{label:"Contribution growth",value:t.annualContributionGrowth,suffix:"%",onChange:v=>n(k=>({...k,annualContributionGrowth:Number(v.target.value)||0}))}),_.jsx(_n,{label:"Inflation",value:t.inflationRate,suffix:"%",onChange:v=>n(k=>({...k,inflationRate:Number(v.target.value)||0}))}),_.jsx(_n,{label:"Desired annual spending",value:t.desiredAnnualSpending,onChange:v=>n(k=>({...k,desiredAnnualSpending:Number(v.target.value)||0}))})]}),_.jsxs("div",{className:"mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-700/70 dark:bg-slate-900/40",children:[_.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[_.jsxs("div",{children:[_.jsx("p",{className:"text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400",children:"Assumption source"}),_.jsx("p",{className:"mt-1 text-sm text-slate-700 dark:text-slate-300",children:"Toggle manual assumptions only when you want to override the live portfolio baseline."})]}),_.jsxs("label",{className:"inline-flex items-center gap-3 rounded-full border border-slate-300/80 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-950/50 dark:text-slate-200",children:[_.jsx("input",{type:"checkbox",checked:t.useManualAssumptions,onChange:v=>n(k=>({...k,useManualAssumptions:v.target.checked,manualExpectedReturn:k.manualExpectedReturn??Number(i.toFixed(2)),manualVolatility:k.manualVolatility??Number(s.toFixed(2))}))}),"Use manual assumptions"]})]}),t.useManualAssumptions?_.jsxs("div",{className:"mt-4 grid grid-cols-1 gap-4 md:grid-cols-2",children:[_.jsx(_n,{label:"Expected return override",value:t.manualExpectedReturn??Number(i.toFixed(2)),suffix:"%",onChange:v=>n(k=>({...k,manualExpectedReturn:Number(v.target.value)||0}))}),_.jsx(_n,{label:"Volatility override",value:t.manualVolatility??Number(s.toFixed(2)),suffix:"%",onChange:v=>n(k=>({...k,manualVolatility:Number(v.target.value)||0}))})]}):null]})]}),_.jsxs("div",{className:"rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xl shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/60",children:[_.jsx("p",{className:"text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400",children:"Retirement readiness"}),_.jsx("div",{className:"mt-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800",children:_.jsx("div",{className:"h-full rounded-full bg-gradient-to-r from-sky-500 via-emerald-400 to-emerald-500 transition-all",style:{width:`${a.status==="ready"&&u?Math.max(4,u.successProbability*100):6}%`}})}),_.jsx("p",{className:"mt-3 text-sm text-slate-600 dark:text-slate-300",children:a.status==="calculating"?"Running 10,000 deterministic paths…":u?`${$t(u.successProbability*100)} probability of reaching the target nest egg by retirement.`:"Waiting for the simulation to initialize."})]}),u?_.jsxs(_.Fragment,{children:[_.jsxs("div",{className:"grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-6",children:[_.jsx(Ze,{label:"Success",value:$t(u.successProbability*100),detail:"Probability of hitting the target nest egg"}),_.jsx(Ze,{label:"Shortfall",value:$t(u.shortfallProbability*100),detail:"Probability of ending below the target"}),_.jsx(Ze,{label:"P10 balance",value:Xt(u.percentiles.p10),detail:"Cautious path"}),_.jsx(Ze,{label:"P50 balance",value:Xt(u.percentiles.p50),detail:"Median outcome"}),_.jsx(Ze,{label:"P90 balance",value:Xt(u.percentiles.p90),detail:"Strong path"}),_.jsx(Ze,{label:"Safe spend",value:Xt(u.impliedSafeAnnualSpend),detail:"4% of the median retirement balance"})]}),_.jsxs("div",{className:"grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr,1fr]",children:[_.jsxs("div",{className:"rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/60",children:[_.jsx("p",{className:"text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400",children:"Target math"}),_.jsxs("div",{className:"mt-5 grid grid-cols-1 gap-4 md:grid-cols-3",children:[_.jsx(Ze,{label:"Years to retirement",value:String(u.yearsToRetirement)}),_.jsx(Ze,{label:"Inflated spending",value:Xt(u.inflatedAnnualSpending),detail:"Desired annual spending carried forward to retirement"}),_.jsx(Ze,{label:"Target nest egg",value:Xt(u.targetNestEgg),detail:"Inflated spending divided by 4%"})]})]}),_.jsxs("div",{className:"rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/60",children:[_.jsx("p",{className:"text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400",children:"Median outcome"}),_.jsx("p",{className:"mt-3 text-3xl font-semibold text-slate-950 dark:text-slate-50",children:Xt(u.medianSurplus)}),_.jsx("p",{className:"mt-2 text-sm text-slate-600 dark:text-slate-300",children:u.medianSurplus>=0?"Median path clears the target by this amount.":"Median path lands below the target by this amount."})]})]})]}):null]})}const ux=`<!DOCTYPE html>\r
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
          <div class="app-sidebar__top">
            <div>
              <p class="app-sidebar__eyebrow">Gunpla Hangar</p>
              <p class="app-sidebar__title">Command Hub</p>
            </div>
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
          </div>
          <p class="app-sidebar__intro">
            Jump between diagnostics, loadouts, and decision tools without leaving the cockpit.
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
                placeholder="Jump to section"
                aria-describedby="sidebarSearchStatus"
              />
              <button
                id="sidebarSearchClearBtn"
                class="app-sidebar__command-clear"
                type="button"
                aria-label="Clear quick jump search"
                title="Clear quick jump search"
              >
                <span aria-hidden="true">&times;</span>
                <span class="sr-only">Clear</span>
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
              <li>
                <a class="app-sidebar__link" href="#fearGreed"
                  ><span class="app-sidebar__index">11</span><span>Psycho-Frame Index</span></a
                >
              </li>
              <li>
                <a class="app-sidebar__link" href="#capitalDeploymentOptimizer"
                  ><span class="app-sidebar__index">12</span><span>Capital Deployment</span></a
                >
              </li>
              <li>
                <a class="app-sidebar__link" href="#historicalStressReplay"
                  ><span class="app-sidebar__index">13</span><span>Stress Replay</span></a
                >
              </li>
              <li>
                <a class="app-sidebar__link" href="#monteCarloRetirementLab"
                  ><span class="app-sidebar__index">14</span><span>Retirement Lab</span></a
                >
              </li>
            </ul>
          </nav>
        </div>
      </aside>
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
      <section id="fearGreed" class="section mb-12">
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
        </div>
      </section>

      <section id="capitalDeploymentOptimizer" class="section mb-12">
        <div class="section-header">
          <div class="section-header__icon">
            <svg
              class="w-8 h-8 text-sky-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h10m-10 6h7m10-9l3 3m0 0l-3 3m3-3h-8"
              ></path>
            </svg>
          </div>
          <div>
            <h2 class="section-title">12. Capital Deployment Optimizer</h2>
            <p class="section-intro">
              Route fresh capital into the portfolio with a disciplined blend of drift correction and market-aware tactical tilt.
            </p>
          </div>
        </div>
        <div id="capitalDeploymentOptimizerMount"></div>
      </section>

      <section id="historicalStressReplay" class="section mb-12">
        <div class="section-header">
          <div class="section-header__icon">
            <svg
              class="w-8 h-8 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5h18M7 5v14m10-14v14M5 19h14M9 9h6m-6 4h4"
              ></path>
            </svg>
          </div>
          <div>
            <h2 class="section-title">13. Historical Stress Replay Chamber</h2>
            <p class="section-intro">
              Reconstruct past crisis windows to see how the current portfolio would have behaved under real historical pressure.
            </p>
          </div>
        </div>
        <div id="historicalStressReplayMount"></div>
      </section>

      <section id="monteCarloRetirementLab" class="section mb-12">
        <div class="section-header">
          <div class="section-header__icon">
            <svg
              class="w-8 h-8 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 19V5m0 14h16M7 15l3-3 3 2 5-6"
              ></path>
            </svg>
          </div>
          <div>
            <h2 class="section-title">14. Monte Carlo Retirement Lab</h2>
            <p class="section-intro">
              Test retirement readiness with seeded Monte Carlo paths using the portfolio's current expected return and volatility profile.
            </p>
          </div>
        </div>
        <div id="monteCarloRetirementLabMount"></div>
      </section>

      <footer
        class="text-center mt-12 pt-6 border-t border-gray-300 dark:border-gray-700"
      >
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
`,h4="transition-colors duration-300",p4=`
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <div id="worldStockNewsMount" class="xl:col-span-2"></div>
        </div>
`,g4='<section id="advanced-tracker"',m4='<div class="grid grid-cols-1 gap-6 mb-6">',b4=`<div
          class="mb-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"`;function x4(e){return e.replace(/\r\n/g,`
`)}function y4(e){const t=e.match(/<body([^>]*)>/i);return t?t[1]:""}function v4(e){const t=e.match(/<body[^>]*>([\s\S]*?)<\/body>/i);return t?x4(t[1]):""}function _4(e){return e.replace(/\s*<script\b[^>]*><\/script>/gi,"")}function k4(e){const t=e.indexOf(g4);if(t===-1)return e;const n=e.indexOf(m4,t),a=e.indexOf(b4,n);return n===-1||a===-1?e:`${e.slice(0,n)}${p4}${e.slice(a)}`}const S4=y4(ux),_c=S4.match(/class="([^"]+)"/i),w4=(_c==null?void 0:_c[1])||h4,M4=v4(ux),A4=k4(_4(M4)).trim();function T4(){return K.useLayoutEffect(()=>{document.body.className=w4;const t=[["worldStockNewsMount",_.jsx(Ew,{})],["capitalDeploymentOptimizerMount",_.jsx(Iw,{})],["historicalStressReplayMount",_.jsx(i4,{})],["monteCarloRetirementLabMount",_.jsx(f4,{})]].map(([n,a])=>{const r=document.getElementById(n);if(!r)return null;const i=db.createRoot(r);return i.render(a),i}).filter(Boolean);return()=>{t.forEach(n=>n.unmount())}},[]),_.jsx("div",{style:{display:"contents"},dangerouslySetInnerHTML:{__html:A4}})}window.React=Nx;window.Chart=en;function D4(){var t;if(typeof window>"u"||(t=window.APP_CONFIG)!=null&&t.marketData)return Promise.resolve();const e=document.querySelector('script[data-runtime-config="true"]');return(e==null?void 0:e.dataset.loaded)==="true"?Promise.resolve():e?new Promise((n,a)=>{e.addEventListener("load",()=>n(),{once:!0}),e.addEventListener("error",()=>a(new Error("CONFIG_LOAD_FAILED")),{once:!0})}):new Promise((n,a)=>{const r=document.createElement("script");r.src="/RothIRA/config.js",r.async=!1,r.dataset.runtimeConfig="true",r.addEventListener("load",()=>{r.dataset.loaded="true",n()},{once:!0}),r.addEventListener("error",()=>a(new Error("CONFIG_LOAD_FAILED")),{once:!0}),document.head.appendChild(r)})}async function C4(){await D4();const e=document.getElementById("root"),t=db.createRoot(e);kp.flushSync(()=>{t.render(_.jsx(T4,{}))})}C4().catch(e=>{console.error("App bootstrap failed:",e)});
