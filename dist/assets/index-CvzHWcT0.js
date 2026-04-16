var Nb=Object.defineProperty;var jb=(e,t,n)=>t in e?Nb(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var D=(e,t,n)=>jb(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function Hb(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var L0={exports:{}},Ll={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ub=Symbol.for("react.transitional.element"),Vb=Symbol.for("react.fragment");function B0(e,t,n){var a=null;if(n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),"key"in t){n={};for(var i in t)i!=="key"&&(n[i]=t[i])}else n=t;return t=n.ref,{$$typeof:Ub,type:e,key:a,ref:t!==void 0?t:null,props:n}}Ll.Fragment=Vb;Ll.jsx=B0;Ll.jsxs=B0;L0.exports=Ll;var O=L0.exports,N0={exports:{}},j={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var vd=Symbol.for("react.transitional.element"),Yb=Symbol.for("react.portal"),Gb=Symbol.for("react.fragment"),qb=Symbol.for("react.strict_mode"),Xb=Symbol.for("react.profiler"),Fb=Symbol.for("react.consumer"),Qb=Symbol.for("react.context"),Zb=Symbol.for("react.forward_ref"),Kb=Symbol.for("react.suspense"),Pb=Symbol.for("react.memo"),j0=Symbol.for("react.lazy"),Wb=Symbol.for("react.activity"),ju=Symbol.iterator;function Jb(e){return e===null||typeof e!="object"?null:(e=ju&&e[ju]||e["@@iterator"],typeof e=="function"?e:null)}var H0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},U0=Object.assign,V0={};function xi(e,t,n){this.props=e,this.context=t,this.refs=V0,this.updater=n||H0}xi.prototype.isReactComponent={};xi.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};xi.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Y0(){}Y0.prototype=xi.prototype;function xd(e,t,n){this.props=e,this.context=t,this.refs=V0,this.updater=n||H0}var _d=xd.prototype=new Y0;_d.constructor=xd;U0(_d,xi.prototype);_d.isPureReactComponent=!0;var Hu=Array.isArray;function sc(){}var lt={H:null,A:null,T:null,S:null},G0=Object.prototype.hasOwnProperty;function kd(e,t,n){var a=n.ref;return{$$typeof:vd,type:e,key:t,ref:a!==void 0?a:null,props:n}}function Ib(e,t){return kd(e.type,t,e.props)}function Sd(e){return typeof e=="object"&&e!==null&&e.$$typeof===vd}function $b(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Uu=/\/+/g;function so(e,t){return typeof e=="object"&&e!==null&&e.key!=null?$b(""+e.key):t.toString(36)}function ty(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(sc,sc):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Na(e,t,n,a,i){var r=typeof e;(r==="undefined"||r==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(r){case"bigint":case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case vd:case Yb:s=!0;break;case j0:return s=e._init,Na(s(e._payload),t,n,a,i)}}if(s)return i=i(e),s=a===""?"."+so(e,0):a,Hu(i)?(n="",s!=null&&(n=s.replace(Uu,"$&/")+"/"),Na(i,t,n,"",function(c){return c})):i!=null&&(Sd(i)&&(i=Ib(i,n+(i.key==null||e&&e.key===i.key?"":(""+i.key).replace(Uu,"$&/")+"/")+s)),t.push(i)),1;s=0;var l=a===""?".":a+":";if(Hu(e))for(var o=0;o<e.length;o++)a=e[o],r=l+so(a,o),s+=Na(a,t,n,r,i);else if(o=Jb(e),typeof o=="function")for(e=o.call(e),o=0;!(a=e.next()).done;)a=a.value,r=l+so(a,o++),s+=Na(a,t,n,r,i);else if(r==="object"){if(typeof e.then=="function")return Na(ty(e),t,n,a,i);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return s}function Ir(e,t,n){if(e==null)return e;var a=[],i=0;return Na(e,a,"","",function(r){return t.call(n,r,i++)}),a}function ey(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Vu=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},ny={map:Ir,forEach:function(e,t,n){Ir(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Ir(e,function(){t++}),t},toArray:function(e){return Ir(e,function(t){return t})||[]},only:function(e){if(!Sd(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};j.Activity=Wb;j.Children=ny;j.Component=xi;j.Fragment=Gb;j.Profiler=Xb;j.PureComponent=xd;j.StrictMode=qb;j.Suspense=Kb;j.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=lt;j.__COMPILER_RUNTIME={__proto__:null,c:function(e){return lt.H.useMemoCache(e)}};j.cache=function(e){return function(){return e.apply(null,arguments)}};j.cacheSignal=function(){return null};j.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var a=U0({},e.props),i=e.key;if(t!=null)for(r in t.key!==void 0&&(i=""+t.key),t)!G0.call(t,r)||r==="key"||r==="__self"||r==="__source"||r==="ref"&&t.ref===void 0||(a[r]=t[r]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var s=Array(r),l=0;l<r;l++)s[l]=arguments[l+2];a.children=s}return kd(e.type,i,a)};j.createContext=function(e){return e={$$typeof:Qb,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:Fb,_context:e},e};j.createElement=function(e,t,n){var a,i={},r=null;if(t!=null)for(a in t.key!==void 0&&(r=""+t.key),t)G0.call(t,a)&&a!=="key"&&a!=="__self"&&a!=="__source"&&(i[a]=t[a]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var l=Array(s),o=0;o<s;o++)l[o]=arguments[o+2];i.children=l}if(e&&e.defaultProps)for(a in s=e.defaultProps,s)i[a]===void 0&&(i[a]=s[a]);return kd(e,r,i)};j.createRef=function(){return{current:null}};j.forwardRef=function(e){return{$$typeof:Zb,render:e}};j.isValidElement=Sd;j.lazy=function(e){return{$$typeof:j0,_payload:{_status:-1,_result:e},_init:ey}};j.memo=function(e,t){return{$$typeof:Pb,type:e,compare:t===void 0?null:t}};j.startTransition=function(e){var t=lt.T,n={};lt.T=n;try{var a=e(),i=lt.S;i!==null&&i(n,a),typeof a=="object"&&a!==null&&typeof a.then=="function"&&a.then(sc,Vu)}catch(r){Vu(r)}finally{t!==null&&n.types!==null&&(t.types=n.types),lt.T=t}};j.unstable_useCacheRefresh=function(){return lt.H.useCacheRefresh()};j.use=function(e){return lt.H.use(e)};j.useActionState=function(e,t,n){return lt.H.useActionState(e,t,n)};j.useCallback=function(e,t){return lt.H.useCallback(e,t)};j.useContext=function(e){return lt.H.useContext(e)};j.useDebugValue=function(){};j.useDeferredValue=function(e,t){return lt.H.useDeferredValue(e,t)};j.useEffect=function(e,t){return lt.H.useEffect(e,t)};j.useEffectEvent=function(e){return lt.H.useEffectEvent(e)};j.useId=function(){return lt.H.useId()};j.useImperativeHandle=function(e,t,n){return lt.H.useImperativeHandle(e,t,n)};j.useInsertionEffect=function(e,t){return lt.H.useInsertionEffect(e,t)};j.useLayoutEffect=function(e,t){return lt.H.useLayoutEffect(e,t)};j.useMemo=function(e,t){return lt.H.useMemo(e,t)};j.useOptimistic=function(e,t){return lt.H.useOptimistic(e,t)};j.useReducer=function(e,t,n){return lt.H.useReducer(e,t,n)};j.useRef=function(e){return lt.H.useRef(e)};j.useState=function(e){return lt.H.useState(e)};j.useSyncExternalStore=function(e,t,n){return lt.H.useSyncExternalStore(e,t,n)};j.useTransition=function(){return lt.H.useTransition()};j.version="19.2.5";N0.exports=j;var jt=N0.exports;const ay=Hb(jt);var q0={exports:{}},Bl={},X0={exports:{}},F0={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(T,E){var R=T.length;T.push(E);t:for(;0<R;){var U=R-1>>>1,it=T[U];if(0<i(it,E))T[U]=E,T[R]=it,R=U;else break t}}function n(T){return T.length===0?null:T[0]}function a(T){if(T.length===0)return null;var E=T[0],R=T.pop();if(R!==E){T[0]=R;t:for(var U=0,it=T.length,Ve=it>>>1;U<Ve;){var Se=2*(U+1)-1,Ye=T[Se],Gt=Se+1,Oe=T[Gt];if(0>i(Ye,R))Gt<it&&0>i(Oe,Ye)?(T[U]=Oe,T[Gt]=R,U=Gt):(T[U]=Ye,T[Se]=R,U=Se);else if(Gt<it&&0>i(Oe,R))T[U]=Oe,T[Gt]=R,U=Gt;else break t}}return E}function i(T,E){var R=T.sortIndex-E.sortIndex;return R!==0?R:T.id-E.id}if(e.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var r=performance;e.unstable_now=function(){return r.now()}}else{var s=Date,l=s.now();e.unstable_now=function(){return s.now()-l}}var o=[],c=[],d=1,u=null,f=3,h=!1,m=!1,b=!1,v=!1,p=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,y=typeof setImmediate<"u"?setImmediate:null;function x(T){for(var E=n(c);E!==null;){if(E.callback===null)a(c);else if(E.startTime<=T)a(c),E.sortIndex=E.expirationTime,t(o,E);else break;E=n(c)}}function _(T){if(b=!1,x(T),!m)if(n(o)!==null)m=!0,w||(w=!0,N());else{var E=n(c);E!==null&&Q(_,E.startTime-T)}}var w=!1,k=-1,S=5,A=-1;function C(){return v?!0:!(e.unstable_now()-A<S)}function z(){if(v=!1,w){var T=e.unstable_now();A=T;var E=!0;try{t:{m=!1,b&&(b=!1,g(k),k=-1),h=!0;var R=f;try{e:{for(x(T),u=n(o);u!==null&&!(u.expirationTime>T&&C());){var U=u.callback;if(typeof U=="function"){u.callback=null,f=u.priorityLevel;var it=U(u.expirationTime<=T);if(T=e.unstable_now(),typeof it=="function"){u.callback=it,x(T),E=!0;break e}u===n(o)&&a(o),x(T)}else a(o);u=n(o)}if(u!==null)E=!0;else{var Ve=n(c);Ve!==null&&Q(_,Ve.startTime-T),E=!1}}break t}finally{u=null,f=R,h=!1}E=void 0}}finally{E?N():w=!1}}}var N;if(typeof y=="function")N=function(){y(z)};else if(typeof MessageChannel<"u"){var vt=new MessageChannel,Yt=vt.port2;vt.port1.onmessage=z,N=function(){Yt.postMessage(null)}}else N=function(){p(z,0)};function Q(T,E){k=p(function(){T(e.unstable_now())},E)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(T){T.callback=null},e.unstable_forceFrameRate=function(T){0>T||125<T?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):S=0<T?Math.floor(1e3/T):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(T){switch(f){case 1:case 2:case 3:var E=3;break;default:E=f}var R=f;f=E;try{return T()}finally{f=R}},e.unstable_requestPaint=function(){v=!0},e.unstable_runWithPriority=function(T,E){switch(T){case 1:case 2:case 3:case 4:case 5:break;default:T=3}var R=f;f=T;try{return E()}finally{f=R}},e.unstable_scheduleCallback=function(T,E,R){var U=e.unstable_now();switch(typeof R=="object"&&R!==null?(R=R.delay,R=typeof R=="number"&&0<R?U+R:U):R=U,T){case 1:var it=-1;break;case 2:it=250;break;case 5:it=1073741823;break;case 4:it=1e4;break;default:it=5e3}return it=R+it,T={id:d++,callback:E,priorityLevel:T,startTime:R,expirationTime:it,sortIndex:-1},R>U?(T.sortIndex=R,t(c,T),n(o)===null&&T===n(c)&&(b?(g(k),k=-1):b=!0,Q(_,R-U))):(T.sortIndex=it,t(o,T),m||h||(m=!0,w||(w=!0,N()))),T},e.unstable_shouldYield=C,e.unstable_wrapCallback=function(T){var E=f;return function(){var R=f;f=E;try{return T.apply(this,arguments)}finally{f=R}}}})(F0);X0.exports=F0;var iy=X0.exports,Q0={exports:{}},Ft={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ry=jt;function Z0(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function mn(){}var Xt={d:{f:mn,r:function(){throw Error(Z0(522))},D:mn,C:mn,L:mn,m:mn,X:mn,S:mn,M:mn},p:0,findDOMNode:null},sy=Symbol.for("react.portal");function ly(e,t,n){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:sy,key:a==null?null:""+a,children:e,containerInfo:t,implementation:n}}var Ji=ry.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Nl(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}Ft.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Xt;Ft.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(Z0(299));return ly(e,t,null,n)};Ft.flushSync=function(e){var t=Ji.T,n=Xt.p;try{if(Ji.T=null,Xt.p=2,e)return e()}finally{Ji.T=t,Xt.p=n,Xt.d.f()}};Ft.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,Xt.d.C(e,t))};Ft.prefetchDNS=function(e){typeof e=="string"&&Xt.d.D(e)};Ft.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,a=Nl(n,t.crossOrigin),i=typeof t.integrity=="string"?t.integrity:void 0,r=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?Xt.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:a,integrity:i,fetchPriority:r}):n==="script"&&Xt.d.X(e,{crossOrigin:a,integrity:i,fetchPriority:r,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};Ft.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=Nl(t.as,t.crossOrigin);Xt.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&Xt.d.M(e)};Ft.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,a=Nl(n,t.crossOrigin);Xt.d.L(e,n,{crossOrigin:a,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};Ft.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=Nl(t.as,t.crossOrigin);Xt.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else Xt.d.m(e)};Ft.requestFormReset=function(e){Xt.d.r(e)};Ft.unstable_batchedUpdates=function(e,t){return e(t)};Ft.useFormState=function(e,t,n){return Ji.H.useFormState(e,t,n)};Ft.useFormStatus=function(){return Ji.H.useHostTransitionStatus()};Ft.version="19.2.5";function K0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(K0)}catch(e){console.error(e)}}K0(),Q0.exports=Ft;var P0=Q0.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var At=iy,W0=jt,oy=P0;function M(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function J0(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Hr(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function I0(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function $0(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Yu(e){if(Hr(e)!==e)throw Error(M(188))}function cy(e){var t=e.alternate;if(!t){if(t=Hr(e),t===null)throw Error(M(188));return t!==e?null:e}for(var n=e,a=t;;){var i=n.return;if(i===null)break;var r=i.alternate;if(r===null){if(a=i.return,a!==null){n=a;continue}break}if(i.child===r.child){for(r=i.child;r;){if(r===n)return Yu(i),e;if(r===a)return Yu(i),t;r=r.sibling}throw Error(M(188))}if(n.return!==a.return)n=i,a=r;else{for(var s=!1,l=i.child;l;){if(l===n){s=!0,n=i,a=r;break}if(l===a){s=!0,a=i,n=r;break}l=l.sibling}if(!s){for(l=r.child;l;){if(l===n){s=!0,n=r,a=i;break}if(l===a){s=!0,a=r,n=i;break}l=l.sibling}if(!s)throw Error(M(189))}}if(n.alternate!==a)throw Error(M(190))}if(n.tag!==3)throw Error(M(188));return n.stateNode.current===n?e:t}function tp(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=tp(e),t!==null)return t;e=e.sibling}return null}var ct=Object.assign,dy=Symbol.for("react.element"),$r=Symbol.for("react.transitional.element"),Vi=Symbol.for("react.portal"),Ua=Symbol.for("react.fragment"),ep=Symbol.for("react.strict_mode"),lc=Symbol.for("react.profiler"),np=Symbol.for("react.consumer"),tn=Symbol.for("react.context"),wd=Symbol.for("react.forward_ref"),oc=Symbol.for("react.suspense"),cc=Symbol.for("react.suspense_list"),Md=Symbol.for("react.memo"),bn=Symbol.for("react.lazy"),dc=Symbol.for("react.activity"),uy=Symbol.for("react.memo_cache_sentinel"),Gu=Symbol.iterator;function Di(e){return e===null||typeof e!="object"?null:(e=Gu&&e[Gu]||e["@@iterator"],typeof e=="function"?e:null)}var fy=Symbol.for("react.client.reference");function uc(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===fy?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ua:return"Fragment";case lc:return"Profiler";case ep:return"StrictMode";case oc:return"Suspense";case cc:return"SuspenseList";case dc:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case Vi:return"Portal";case tn:return e.displayName||"Context";case np:return(e._context.displayName||"Context")+".Consumer";case wd:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Md:return t=e.displayName||null,t!==null?t:uc(e.type)||"Memo";case bn:t=e._payload,e=e._init;try{return uc(e(t))}catch{}}return null}var Yi=Array.isArray,L=W0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,P=oy.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ua={pending:!1,data:null,method:null,action:null},fc=[],Va=-1;function He(e){return{current:e}}function Ot(e){0>Va||(e.current=fc[Va],fc[Va]=null,Va--)}function at(e,t){Va++,fc[Va]=e.current,e.current=t}var Ne=He(null),mr=He(null),Rn=He(null),Js=He(null);function Is(e,t){switch(at(Rn,t),at(mr,e),at(Ne,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Pf(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Pf(t),e=km(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}Ot(Ne),at(Ne,e)}function ri(){Ot(Ne),Ot(mr),Ot(Rn)}function hc(e){e.memoizedState!==null&&at(Js,e);var t=Ne.current,n=km(t,e.type);t!==n&&(at(mr,e),at(Ne,n))}function $s(e){mr.current===e&&(Ot(Ne),Ot(mr)),Js.current===e&&(Ot(Js),Tr._currentValue=ua)}var lo,qu;function ia(e){if(lo===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);lo=t&&t[1]||"",qu=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+lo+e+qu}var oo=!1;function co(e,t){if(!e||oo)return"";oo=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(t){var u=function(){throw Error()};if(Object.defineProperty(u.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(u,[])}catch(h){var f=h}Reflect.construct(e,[],u)}else{try{u.call()}catch(h){f=h}e.call(u.prototype)}}else{try{throw Error()}catch(h){f=h}(u=e())&&typeof u.catch=="function"&&u.catch(function(){})}}catch(h){if(h&&f&&typeof h.stack=="string")return[h.stack,f.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var i=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");i&&i.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var r=a.DetermineComponentFrameRoot(),s=r[0],l=r[1];if(s&&l){var o=s.split(`
`),c=l.split(`
`);for(i=a=0;a<o.length&&!o[a].includes("DetermineComponentFrameRoot");)a++;for(;i<c.length&&!c[i].includes("DetermineComponentFrameRoot");)i++;if(a===o.length||i===c.length)for(a=o.length-1,i=c.length-1;1<=a&&0<=i&&o[a]!==c[i];)i--;for(;1<=a&&0<=i;a--,i--)if(o[a]!==c[i]){if(a!==1||i!==1)do if(a--,i--,0>i||o[a]!==c[i]){var d=`
`+o[a].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=a&&0<=i);break}}}finally{oo=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?ia(n):""}function hy(e,t){switch(e.tag){case 26:case 27:case 5:return ia(e.type);case 16:return ia("Lazy");case 13:return e.child!==t&&t!==null?ia("Suspense Fallback"):ia("Suspense");case 19:return ia("SuspenseList");case 0:case 15:return co(e.type,!1);case 11:return co(e.type.render,!1);case 1:return co(e.type,!0);case 31:return ia("Activity");default:return""}}function Xu(e){try{var t="",n=null;do t+=hy(e,n),n=e,e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var pc=Object.prototype.hasOwnProperty,Ad=At.unstable_scheduleCallback,uo=At.unstable_cancelCallback,py=At.unstable_shouldYield,gy=At.unstable_requestPaint,se=At.unstable_now,my=At.unstable_getCurrentPriorityLevel,ap=At.unstable_ImmediatePriority,ip=At.unstable_UserBlockingPriority,tl=At.unstable_NormalPriority,by=At.unstable_LowPriority,rp=At.unstable_IdlePriority,yy=At.log,vy=At.unstable_setDisableYieldValue,Ur=null,le=null;function Sn(e){if(typeof yy=="function"&&vy(e),le&&typeof le.setStrictMode=="function")try{le.setStrictMode(Ur,e)}catch{}}var oe=Math.clz32?Math.clz32:ky,xy=Math.log,_y=Math.LN2;function ky(e){return e>>>=0,e===0?32:31-(xy(e)/_y|0)|0}var ts=256,es=262144,ns=4194304;function ra(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function jl(e,t,n){var a=e.pendingLanes;if(a===0)return 0;var i=0,r=e.suspendedLanes,s=e.pingedLanes;e=e.warmLanes;var l=a&134217727;return l!==0?(a=l&~r,a!==0?i=ra(a):(s&=l,s!==0?i=ra(s):n||(n=l&~e,n!==0&&(i=ra(n))))):(l=a&~r,l!==0?i=ra(l):s!==0?i=ra(s):n||(n=a&~e,n!==0&&(i=ra(n)))),i===0?0:t!==0&&t!==i&&!(t&r)&&(r=i&-i,n=t&-t,r>=n||r===32&&(n&4194048)!==0)?t:i}function Vr(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Sy(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function sp(){var e=ns;return ns<<=1,!(ns&62914560)&&(ns=4194304),e}function fo(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Yr(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function wy(e,t,n,a,i,r){var s=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var l=e.entanglements,o=e.expirationTimes,c=e.hiddenUpdates;for(n=s&~n;0<n;){var d=31-oe(n),u=1<<d;l[d]=0,o[d]=-1;var f=c[d];if(f!==null)for(c[d]=null,d=0;d<f.length;d++){var h=f[d];h!==null&&(h.lane&=-536870913)}n&=~u}a!==0&&lp(e,a,0),r!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=r&~(s&~t))}function lp(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var a=31-oe(t);e.entangledLanes|=t,e.entanglements[a]=e.entanglements[a]|1073741824|n&261930}function op(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-oe(n),i=1<<a;i&t|e[a]&t&&(e[a]|=t),n&=~i}}function cp(e,t){var n=t&-t;return n=n&42?1:Td(n),n&(e.suspendedLanes|t)?0:n}function Td(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Dd(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function dp(){var e=P.p;return e!==0?e:(e=window.event,e===void 0?32:Rm(e.type))}function Fu(e,t){var n=P.p;try{return P.p=e,t()}finally{P.p=n}}var Pn=Math.random().toString(36).slice(2),zt="__reactFiber$"+Pn,$t="__reactProps$"+Pn,_i="__reactContainer$"+Pn,gc="__reactEvents$"+Pn,My="__reactListeners$"+Pn,Ay="__reactHandles$"+Pn,Qu="__reactResources$"+Pn,Gr="__reactMarker$"+Pn;function Cd(e){delete e[zt],delete e[$t],delete e[gc],delete e[My],delete e[Ay]}function Ya(e){var t=e[zt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[_i]||n[zt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=th(e);e!==null;){if(n=e[zt])return n;e=th(e)}return t}e=n,n=e.parentNode}return null}function ki(e){if(e=e[zt]||e[_i]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Gi(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(M(33))}function Ja(e){var t=e[Qu];return t||(t=e[Qu]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Dt(e){e[Gr]=!0}var up=new Set,fp={};function Ma(e,t){si(e,t),si(e+"Capture",t)}function si(e,t){for(fp[e]=t,e=0;e<t.length;e++)up.add(t[e])}var Ty=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Zu={},Ku={};function Dy(e){return pc.call(Ku,e)?!0:pc.call(Zu,e)?!1:Ty.test(e)?Ku[e]=!0:(Zu[e]=!0,!1)}function Ts(e,t,n){if(Dy(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var a=t.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function as(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function Ge(e,t,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+a)}}function pe(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function hp(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Cy(e,t,n){var a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var i=a.get,r=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(s){n=""+s,r.call(this,s)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(s){n=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function mc(e){if(!e._valueTracker){var t=hp(e)?"checked":"value";e._valueTracker=Cy(e,t,""+e[t])}}function pp(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=hp(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function el(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Oy=/[\n"\\]/g;function be(e){return e.replace(Oy,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function bc(e,t,n,a,i,r,s,l){e.name="",s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?e.type=s:e.removeAttribute("type"),t!=null?s==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+pe(t)):e.value!==""+pe(t)&&(e.value=""+pe(t)):s!=="submit"&&s!=="reset"||e.removeAttribute("value"),t!=null?yc(e,s,pe(t)):n!=null?yc(e,s,pe(n)):a!=null&&e.removeAttribute("value"),i==null&&r!=null&&(e.defaultChecked=!!r),i!=null&&(e.checked=i&&typeof i!="function"&&typeof i!="symbol"),l!=null&&typeof l!="function"&&typeof l!="symbol"&&typeof l!="boolean"?e.name=""+pe(l):e.removeAttribute("name")}function gp(e,t,n,a,i,r,s,l){if(r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.type=r),t!=null||n!=null){if(!(r!=="submit"&&r!=="reset"||t!=null)){mc(e);return}n=n!=null?""+pe(n):"",t=t!=null?""+pe(t):n,l||t===e.value||(e.value=t),e.defaultValue=t}a=a??i,a=typeof a!="function"&&typeof a!="symbol"&&!!a,e.checked=l?e.checked:!!a,e.defaultChecked=!!a,s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.name=s),mc(e)}function yc(e,t,n){t==="number"&&el(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function Ia(e,t,n,a){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&a&&(e[n].defaultSelected=!0)}else{for(n=""+pe(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,a&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function mp(e,t,n){if(t!=null&&(t=""+pe(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+pe(n):""}function bp(e,t,n,a){if(t==null){if(a!=null){if(n!=null)throw Error(M(92));if(Yi(a)){if(1<a.length)throw Error(M(93));a=a[0]}n=a}n==null&&(n=""),t=n}n=pe(t),e.defaultValue=n,a=e.textContent,a===n&&a!==""&&a!==null&&(e.value=a),mc(e)}function li(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Ey=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Pu(e,t,n){var a=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":a?e.setProperty(t,n):typeof n!="number"||n===0||Ey.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function yp(e,t,n){if(t!=null&&typeof t!="object")throw Error(M(62));if(e=e.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||t!=null&&t.hasOwnProperty(a)||(a.indexOf("--")===0?e.setProperty(a,""):a==="float"?e.cssFloat="":e[a]="");for(var i in t)a=t[i],t.hasOwnProperty(i)&&n[i]!==a&&Pu(e,i,a)}else for(var r in t)t.hasOwnProperty(r)&&Pu(e,r,t[r])}function Od(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var zy=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ry=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ds(e){return Ry.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function en(){}var vc=null;function Ed(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ga=null,$a=null;function Wu(e){var t=ki(e);if(t&&(e=t.stateNode)){var n=e[$t]||null;t:switch(e=t.stateNode,t.type){case"input":if(bc(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+be(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var i=a[$t]||null;if(!i)throw Error(M(90));bc(a,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(t=0;t<n.length;t++)a=n[t],a.form===e.form&&pp(a)}break t;case"textarea":mp(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&Ia(e,!!n.multiple,t,!1)}}}var ho=!1;function vp(e,t,n){if(ho)return e(t,n);ho=!0;try{var a=e(t);return a}finally{if(ho=!1,(Ga!==null||$a!==null)&&(Pl(),Ga&&(t=Ga,e=$a,$a=Ga=null,Wu(t),e)))for(t=0;t<e.length;t++)Wu(e[t])}}function br(e,t){var n=e.stateNode;if(n===null)return null;var a=n[$t]||null;if(a===null)return null;n=a[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(M(231,t,typeof n));return n}var dn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),xc=!1;if(dn)try{var Ci={};Object.defineProperty(Ci,"passive",{get:function(){xc=!0}}),window.addEventListener("test",Ci,Ci),window.removeEventListener("test",Ci,Ci)}catch{xc=!1}var wn=null,zd=null,Cs=null;function xp(){if(Cs)return Cs;var e,t=zd,n=t.length,a,i="value"in wn?wn.value:wn.textContent,r=i.length;for(e=0;e<n&&t[e]===i[e];e++);var s=n-e;for(a=1;a<=s&&t[n-a]===i[r-a];a++);return Cs=i.slice(e,1<a?1-a:void 0)}function Os(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function is(){return!0}function Ju(){return!1}function te(e){function t(n,a,i,r,s){this._reactName=n,this._targetInst=i,this.type=a,this.nativeEvent=r,this.target=s,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(r):r[l]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?is:Ju,this.isPropagationStopped=Ju,this}return ct(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=is)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=is)},persist:function(){},isPersistent:is}),t}var Aa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Hl=te(Aa),qr=ct({},Aa,{view:0,detail:0}),Ly=te(qr),po,go,Oi,Ul=ct({},qr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Rd,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Oi&&(Oi&&e.type==="mousemove"?(po=e.screenX-Oi.screenX,go=e.screenY-Oi.screenY):go=po=0,Oi=e),po)},movementY:function(e){return"movementY"in e?e.movementY:go}}),Iu=te(Ul),By=ct({},Ul,{dataTransfer:0}),Ny=te(By),jy=ct({},qr,{relatedTarget:0}),mo=te(jy),Hy=ct({},Aa,{animationName:0,elapsedTime:0,pseudoElement:0}),Uy=te(Hy),Vy=ct({},Aa,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Yy=te(Vy),Gy=ct({},Aa,{data:0}),$u=te(Gy),qy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Xy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Fy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Qy(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Fy[e])?!!t[e]:!1}function Rd(){return Qy}var Zy=ct({},qr,{key:function(e){if(e.key){var t=qy[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Os(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Xy[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Rd,charCode:function(e){return e.type==="keypress"?Os(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Os(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Ky=te(Zy),Py=ct({},Ul,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),tf=te(Py),Wy=ct({},qr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Rd}),Jy=te(Wy),Iy=ct({},Aa,{propertyName:0,elapsedTime:0,pseudoElement:0}),$y=te(Iy),tv=ct({},Ul,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),ev=te(tv),nv=ct({},Aa,{newState:0,oldState:0}),av=te(nv),iv=[9,13,27,32],Ld=dn&&"CompositionEvent"in window,Ii=null;dn&&"documentMode"in document&&(Ii=document.documentMode);var rv=dn&&"TextEvent"in window&&!Ii,_p=dn&&(!Ld||Ii&&8<Ii&&11>=Ii),ef=" ",nf=!1;function kp(e,t){switch(e){case"keyup":return iv.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Sp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var qa=!1;function sv(e,t){switch(e){case"compositionend":return Sp(t);case"keypress":return t.which!==32?null:(nf=!0,ef);case"textInput":return e=t.data,e===ef&&nf?null:e;default:return null}}function lv(e,t){if(qa)return e==="compositionend"||!Ld&&kp(e,t)?(e=xp(),Cs=zd=wn=null,qa=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return _p&&t.locale!=="ko"?null:t.data;default:return null}}var ov={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function af(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!ov[e.type]:t==="textarea"}function wp(e,t,n,a){Ga?$a?$a.push(a):$a=[a]:Ga=a,t=vl(t,"onChange"),0<t.length&&(n=new Hl("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var $i=null,yr=null;function cv(e){vm(e,0)}function Vl(e){var t=Gi(e);if(pp(t))return e}function rf(e,t){if(e==="change")return t}var Mp=!1;if(dn){var bo;if(dn){var yo="oninput"in document;if(!yo){var sf=document.createElement("div");sf.setAttribute("oninput","return;"),yo=typeof sf.oninput=="function"}bo=yo}else bo=!1;Mp=bo&&(!document.documentMode||9<document.documentMode)}function lf(){$i&&($i.detachEvent("onpropertychange",Ap),yr=$i=null)}function Ap(e){if(e.propertyName==="value"&&Vl(yr)){var t=[];wp(t,yr,e,Ed(e)),vp(cv,t)}}function dv(e,t,n){e==="focusin"?(lf(),$i=t,yr=n,$i.attachEvent("onpropertychange",Ap)):e==="focusout"&&lf()}function uv(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Vl(yr)}function fv(e,t){if(e==="click")return Vl(t)}function hv(e,t){if(e==="input"||e==="change")return Vl(t)}function pv(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var de=typeof Object.is=="function"?Object.is:pv;function vr(e,t){if(de(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var i=n[a];if(!pc.call(t,i)||!de(e[i],t[i]))return!1}return!0}function of(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function cf(e,t){var n=of(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=of(n)}}function Tp(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Tp(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Dp(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=el(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=el(e.document)}return t}function Bd(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var gv=dn&&"documentMode"in document&&11>=document.documentMode,Xa=null,_c=null,tr=null,kc=!1;function df(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;kc||Xa==null||Xa!==el(a)||(a=Xa,"selectionStart"in a&&Bd(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),tr&&vr(tr,a)||(tr=a,a=vl(_c,"onSelect"),0<a.length&&(t=new Hl("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=Xa)))}function $n(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Fa={animationend:$n("Animation","AnimationEnd"),animationiteration:$n("Animation","AnimationIteration"),animationstart:$n("Animation","AnimationStart"),transitionrun:$n("Transition","TransitionRun"),transitionstart:$n("Transition","TransitionStart"),transitioncancel:$n("Transition","TransitionCancel"),transitionend:$n("Transition","TransitionEnd")},vo={},Cp={};dn&&(Cp=document.createElement("div").style,"AnimationEvent"in window||(delete Fa.animationend.animation,delete Fa.animationiteration.animation,delete Fa.animationstart.animation),"TransitionEvent"in window||delete Fa.transitionend.transition);function Ta(e){if(vo[e])return vo[e];if(!Fa[e])return e;var t=Fa[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Cp)return vo[e]=t[n];return e}var Op=Ta("animationend"),Ep=Ta("animationiteration"),zp=Ta("animationstart"),mv=Ta("transitionrun"),bv=Ta("transitionstart"),yv=Ta("transitioncancel"),Rp=Ta("transitionend"),Lp=new Map,Sc="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Sc.push("scrollEnd");function Ce(e,t){Lp.set(e,t),Ma(t,[e])}var nl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},he=[],Qa=0,Nd=0;function Yl(){for(var e=Qa,t=Nd=Qa=0;t<e;){var n=he[t];he[t++]=null;var a=he[t];he[t++]=null;var i=he[t];he[t++]=null;var r=he[t];if(he[t++]=null,a!==null&&i!==null){var s=a.pending;s===null?i.next=i:(i.next=s.next,s.next=i),a.pending=i}r!==0&&Bp(n,i,r)}}function Gl(e,t,n,a){he[Qa++]=e,he[Qa++]=t,he[Qa++]=n,he[Qa++]=a,Nd|=a,e.lanes|=a,e=e.alternate,e!==null&&(e.lanes|=a)}function jd(e,t,n,a){return Gl(e,t,n,a),al(e)}function Da(e,t){return Gl(e,null,null,t),al(e)}function Bp(e,t,n){e.lanes|=n;var a=e.alternate;a!==null&&(a.lanes|=n);for(var i=!1,r=e.return;r!==null;)r.childLanes|=n,a=r.alternate,a!==null&&(a.childLanes|=n),r.tag===22&&(e=r.stateNode,e===null||e._visibility&1||(i=!0)),e=r,r=r.return;return e.tag===3?(r=e.stateNode,i&&t!==null&&(i=31-oe(n),e=r.hiddenUpdates,a=e[i],a===null?e[i]=[t]:a.push(t),t.lane=n|536870912),r):null}function al(e){if(50<cr)throw cr=0,Xc=null,Error(M(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Za={};function vv(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ie(e,t,n,a){return new vv(e,t,n,a)}function Hd(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ln(e,t){var n=e.alternate;return n===null?(n=ie(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Np(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Es(e,t,n,a,i,r){var s=0;if(a=e,typeof e=="function")Hd(e)&&(s=1);else if(typeof e=="string")s=wx(e,n,Ne.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case dc:return e=ie(31,n,t,i),e.elementType=dc,e.lanes=r,e;case Ua:return fa(n.children,i,r,t);case ep:s=8,i|=24;break;case lc:return e=ie(12,n,t,i|2),e.elementType=lc,e.lanes=r,e;case oc:return e=ie(13,n,t,i),e.elementType=oc,e.lanes=r,e;case cc:return e=ie(19,n,t,i),e.elementType=cc,e.lanes=r,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case tn:s=10;break t;case np:s=9;break t;case wd:s=11;break t;case Md:s=14;break t;case bn:s=16,a=null;break t}s=29,n=Error(M(130,e===null?"null":typeof e,"")),a=null}return t=ie(s,n,t,i),t.elementType=e,t.type=a,t.lanes=r,t}function fa(e,t,n,a){return e=ie(7,e,a,t),e.lanes=n,e}function xo(e,t,n){return e=ie(6,e,null,t),e.lanes=n,e}function jp(e){var t=ie(18,null,null,0);return t.stateNode=e,t}function _o(e,t,n){return t=ie(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var uf=new WeakMap;function ye(e,t){if(typeof e=="object"&&e!==null){var n=uf.get(e);return n!==void 0?n:(t={value:e,source:t,stack:Xu(t)},uf.set(e,t),t)}return{value:e,source:t,stack:Xu(t)}}var Ka=[],Pa=0,il=null,xr=0,ge=[],me=0,qn=null,Re=1,Le="";function We(e,t){Ka[Pa++]=xr,Ka[Pa++]=il,il=e,xr=t}function Hp(e,t,n){ge[me++]=Re,ge[me++]=Le,ge[me++]=qn,qn=e;var a=Re;e=Le;var i=32-oe(a)-1;a&=~(1<<i),n+=1;var r=32-oe(t)+i;if(30<r){var s=i-i%5;r=(a&(1<<s)-1).toString(32),a>>=s,i-=s,Re=1<<32-oe(t)+i|n<<i|a,Le=r+e}else Re=1<<r|n<<i|a,Le=e}function Ud(e){e.return!==null&&(We(e,1),Hp(e,1,0))}function Vd(e){for(;e===il;)il=Ka[--Pa],Ka[Pa]=null,xr=Ka[--Pa],Ka[Pa]=null;for(;e===qn;)qn=ge[--me],ge[me]=null,Le=ge[--me],ge[me]=null,Re=ge[--me],ge[me]=null}function Up(e,t){ge[me++]=Re,ge[me++]=Le,ge[me++]=qn,Re=t.id,Le=t.overflow,qn=e}var Rt=null,st=null,F=!1,Ln=null,ve=!1,wc=Error(M(519));function Xn(e){var t=Error(M(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw _r(ye(t,e)),wc}function ff(e){var t=e.stateNode,n=e.type,a=e.memoizedProps;switch(t[zt]=e,t[$t]=a,n){case"dialog":V("cancel",t),V("close",t);break;case"iframe":case"object":case"embed":V("load",t);break;case"video":case"audio":for(n=0;n<Mr.length;n++)V(Mr[n],t);break;case"source":V("error",t);break;case"img":case"image":case"link":V("error",t),V("load",t);break;case"details":V("toggle",t);break;case"input":V("invalid",t),gp(t,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":V("invalid",t);break;case"textarea":V("invalid",t),bp(t,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||a.suppressHydrationWarning===!0||_m(t.textContent,n)?(a.popover!=null&&(V("beforetoggle",t),V("toggle",t)),a.onScroll!=null&&V("scroll",t),a.onScrollEnd!=null&&V("scrollend",t),a.onClick!=null&&(t.onclick=en),t=!0):t=!1,t||Xn(e,!0)}function hf(e){for(Rt=e.return;Rt;)switch(Rt.tag){case 5:case 31:case 13:ve=!1;return;case 27:case 3:ve=!0;return;default:Rt=Rt.return}}function Ea(e){if(e!==Rt)return!1;if(!F)return hf(e),F=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Pc(e.type,e.memoizedProps)),n=!n),n&&st&&Xn(e),hf(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(M(317));st=$f(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(M(317));st=$f(e)}else t===27?(t=st,Wn(e.type)?(e=$c,$c=null,st=e):st=t):st=Rt?_e(e.stateNode.nextSibling):null;return!0}function ya(){st=Rt=null,F=!1}function ko(){var e=Ln;return e!==null&&(Wt===null?Wt=e:Wt.push.apply(Wt,e),Ln=null),e}function _r(e){Ln===null?Ln=[e]:Ln.push(e)}var Mc=He(null),Ca=null,nn=null;function vn(e,t,n){at(Mc,t._currentValue),t._currentValue=n}function on(e){e._currentValue=Mc.current,Ot(Mc)}function Ac(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function Tc(e,t,n,a){var i=e.child;for(i!==null&&(i.return=e);i!==null;){var r=i.dependencies;if(r!==null){var s=i.child;r=r.firstContext;t:for(;r!==null;){var l=r;r=i;for(var o=0;o<t.length;o++)if(l.context===t[o]){r.lanes|=n,l=r.alternate,l!==null&&(l.lanes|=n),Ac(r.return,n,e),a||(s=null);break t}r=l.next}}else if(i.tag===18){if(s=i.return,s===null)throw Error(M(341));s.lanes|=n,r=s.alternate,r!==null&&(r.lanes|=n),Ac(s,n,e),s=null}else s=i.child;if(s!==null)s.return=i;else for(s=i;s!==null;){if(s===e){s=null;break}if(i=s.sibling,i!==null){i.return=s.return,s=i;break}s=s.return}i=s}}function Si(e,t,n,a){e=null;for(var i=t,r=!1;i!==null;){if(!r){if(i.flags&524288)r=!0;else if(i.flags&262144)break}if(i.tag===10){var s=i.alternate;if(s===null)throw Error(M(387));if(s=s.memoizedProps,s!==null){var l=i.type;de(i.pendingProps.value,s.value)||(e!==null?e.push(l):e=[l])}}else if(i===Js.current){if(s=i.alternate,s===null)throw Error(M(387));s.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(e!==null?e.push(Tr):e=[Tr])}i=i.return}e!==null&&Tc(t,e,n,a),t.flags|=262144}function rl(e){for(e=e.firstContext;e!==null;){if(!de(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function va(e){Ca=e,nn=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Lt(e){return Vp(Ca,e)}function rs(e,t){return Ca===null&&va(e),Vp(e,t)}function Vp(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},nn===null){if(e===null)throw Error(M(308));nn=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else nn=nn.next=t;return n}var xv=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,a){e.push(a)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},_v=At.unstable_scheduleCallback,kv=At.unstable_NormalPriority,kt={$$typeof:tn,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Yd(){return{controller:new xv,data:new Map,refCount:0}}function Xr(e){e.refCount--,e.refCount===0&&_v(kv,function(){e.controller.abort()})}var er=null,Dc=0,oi=0,ti=null;function Sv(e,t){if(er===null){var n=er=[];Dc=0,oi=fu(),ti={status:"pending",value:void 0,then:function(a){n.push(a)}}}return Dc++,t.then(pf,pf),t}function pf(){if(--Dc===0&&er!==null){ti!==null&&(ti.status="fulfilled");var e=er;er=null,oi=0,ti=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function wv(e,t){var n=[],a={status:"pending",value:null,reason:null,then:function(i){n.push(i)}};return e.then(function(){a.status="fulfilled",a.value=t;for(var i=0;i<n.length;i++)(0,n[i])(t)},function(i){for(a.status="rejected",a.reason=i,i=0;i<n.length;i++)(0,n[i])(void 0)}),a}var gf=L.S;L.S=function(e,t){tm=se(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&Sv(e,t),gf!==null&&gf(e,t)};var ha=He(null);function Gd(){var e=ha.current;return e!==null?e:et.pooledCache}function zs(e,t){t===null?at(ha,ha.current):at(ha,t.pool)}function Yp(){var e=Gd();return e===null?null:{parent:kt._currentValue,pool:e}}var wi=Error(M(460)),qd=Error(M(474)),ql=Error(M(542)),sl={then:function(){}};function mf(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Gp(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(en,en),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,yf(e),e;default:if(typeof t.status=="string")t.then(en,en);else{if(e=et,e!==null&&100<e.shellSuspendCounter)throw Error(M(482));e=t,e.status="pending",e.then(function(a){if(t.status==="pending"){var i=t;i.status="fulfilled",i.value=a}},function(a){if(t.status==="pending"){var i=t;i.status="rejected",i.reason=a}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,yf(e),e}throw pa=t,wi}}function sa(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(pa=n,wi):n}}var pa=null;function bf(){if(pa===null)throw Error(M(459));var e=pa;return pa=null,e}function yf(e){if(e===wi||e===ql)throw Error(M(483))}var ei=null,kr=0;function ss(e){var t=kr;return kr+=1,ei===null&&(ei=[]),Gp(ei,e,t)}function Ei(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function ls(e,t){throw t.$$typeof===dy?Error(M(525)):(e=Object.prototype.toString.call(t),Error(M(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function qp(e){function t(p,g){if(e){var y=p.deletions;y===null?(p.deletions=[g],p.flags|=16):y.push(g)}}function n(p,g){if(!e)return null;for(;g!==null;)t(p,g),g=g.sibling;return null}function a(p){for(var g=new Map;p!==null;)p.key!==null?g.set(p.key,p):g.set(p.index,p),p=p.sibling;return g}function i(p,g){return p=ln(p,g),p.index=0,p.sibling=null,p}function r(p,g,y){return p.index=y,e?(y=p.alternate,y!==null?(y=y.index,y<g?(p.flags|=67108866,g):y):(p.flags|=67108866,g)):(p.flags|=1048576,g)}function s(p){return e&&p.alternate===null&&(p.flags|=67108866),p}function l(p,g,y,x){return g===null||g.tag!==6?(g=xo(y,p.mode,x),g.return=p,g):(g=i(g,y),g.return=p,g)}function o(p,g,y,x){var _=y.type;return _===Ua?d(p,g,y.props.children,x,y.key):g!==null&&(g.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===bn&&sa(_)===g.type)?(g=i(g,y.props),Ei(g,y),g.return=p,g):(g=Es(y.type,y.key,y.props,null,p.mode,x),Ei(g,y),g.return=p,g)}function c(p,g,y,x){return g===null||g.tag!==4||g.stateNode.containerInfo!==y.containerInfo||g.stateNode.implementation!==y.implementation?(g=_o(y,p.mode,x),g.return=p,g):(g=i(g,y.children||[]),g.return=p,g)}function d(p,g,y,x,_){return g===null||g.tag!==7?(g=fa(y,p.mode,x,_),g.return=p,g):(g=i(g,y),g.return=p,g)}function u(p,g,y){if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return g=xo(""+g,p.mode,y),g.return=p,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case $r:return y=Es(g.type,g.key,g.props,null,p.mode,y),Ei(y,g),y.return=p,y;case Vi:return g=_o(g,p.mode,y),g.return=p,g;case bn:return g=sa(g),u(p,g,y)}if(Yi(g)||Di(g))return g=fa(g,p.mode,y,null),g.return=p,g;if(typeof g.then=="function")return u(p,ss(g),y);if(g.$$typeof===tn)return u(p,rs(p,g),y);ls(p,g)}return null}function f(p,g,y,x){var _=g!==null?g.key:null;if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return _!==null?null:l(p,g,""+y,x);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case $r:return y.key===_?o(p,g,y,x):null;case Vi:return y.key===_?c(p,g,y,x):null;case bn:return y=sa(y),f(p,g,y,x)}if(Yi(y)||Di(y))return _!==null?null:d(p,g,y,x,null);if(typeof y.then=="function")return f(p,g,ss(y),x);if(y.$$typeof===tn)return f(p,g,rs(p,y),x);ls(p,y)}return null}function h(p,g,y,x,_){if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return p=p.get(y)||null,l(g,p,""+x,_);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case $r:return p=p.get(x.key===null?y:x.key)||null,o(g,p,x,_);case Vi:return p=p.get(x.key===null?y:x.key)||null,c(g,p,x,_);case bn:return x=sa(x),h(p,g,y,x,_)}if(Yi(x)||Di(x))return p=p.get(y)||null,d(g,p,x,_,null);if(typeof x.then=="function")return h(p,g,y,ss(x),_);if(x.$$typeof===tn)return h(p,g,y,rs(g,x),_);ls(g,x)}return null}function m(p,g,y,x){for(var _=null,w=null,k=g,S=g=0,A=null;k!==null&&S<y.length;S++){k.index>S?(A=k,k=null):A=k.sibling;var C=f(p,k,y[S],x);if(C===null){k===null&&(k=A);break}e&&k&&C.alternate===null&&t(p,k),g=r(C,g,S),w===null?_=C:w.sibling=C,w=C,k=A}if(S===y.length)return n(p,k),F&&We(p,S),_;if(k===null){for(;S<y.length;S++)k=u(p,y[S],x),k!==null&&(g=r(k,g,S),w===null?_=k:w.sibling=k,w=k);return F&&We(p,S),_}for(k=a(k);S<y.length;S++)A=h(k,p,S,y[S],x),A!==null&&(e&&A.alternate!==null&&k.delete(A.key===null?S:A.key),g=r(A,g,S),w===null?_=A:w.sibling=A,w=A);return e&&k.forEach(function(z){return t(p,z)}),F&&We(p,S),_}function b(p,g,y,x){if(y==null)throw Error(M(151));for(var _=null,w=null,k=g,S=g=0,A=null,C=y.next();k!==null&&!C.done;S++,C=y.next()){k.index>S?(A=k,k=null):A=k.sibling;var z=f(p,k,C.value,x);if(z===null){k===null&&(k=A);break}e&&k&&z.alternate===null&&t(p,k),g=r(z,g,S),w===null?_=z:w.sibling=z,w=z,k=A}if(C.done)return n(p,k),F&&We(p,S),_;if(k===null){for(;!C.done;S++,C=y.next())C=u(p,C.value,x),C!==null&&(g=r(C,g,S),w===null?_=C:w.sibling=C,w=C);return F&&We(p,S),_}for(k=a(k);!C.done;S++,C=y.next())C=h(k,p,S,C.value,x),C!==null&&(e&&C.alternate!==null&&k.delete(C.key===null?S:C.key),g=r(C,g,S),w===null?_=C:w.sibling=C,w=C);return e&&k.forEach(function(N){return t(p,N)}),F&&We(p,S),_}function v(p,g,y,x){if(typeof y=="object"&&y!==null&&y.type===Ua&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case $r:t:{for(var _=y.key;g!==null;){if(g.key===_){if(_=y.type,_===Ua){if(g.tag===7){n(p,g.sibling),x=i(g,y.props.children),x.return=p,p=x;break t}}else if(g.elementType===_||typeof _=="object"&&_!==null&&_.$$typeof===bn&&sa(_)===g.type){n(p,g.sibling),x=i(g,y.props),Ei(x,y),x.return=p,p=x;break t}n(p,g);break}else t(p,g);g=g.sibling}y.type===Ua?(x=fa(y.props.children,p.mode,x,y.key),x.return=p,p=x):(x=Es(y.type,y.key,y.props,null,p.mode,x),Ei(x,y),x.return=p,p=x)}return s(p);case Vi:t:{for(_=y.key;g!==null;){if(g.key===_)if(g.tag===4&&g.stateNode.containerInfo===y.containerInfo&&g.stateNode.implementation===y.implementation){n(p,g.sibling),x=i(g,y.children||[]),x.return=p,p=x;break t}else{n(p,g);break}else t(p,g);g=g.sibling}x=_o(y,p.mode,x),x.return=p,p=x}return s(p);case bn:return y=sa(y),v(p,g,y,x)}if(Yi(y))return m(p,g,y,x);if(Di(y)){if(_=Di(y),typeof _!="function")throw Error(M(150));return y=_.call(y),b(p,g,y,x)}if(typeof y.then=="function")return v(p,g,ss(y),x);if(y.$$typeof===tn)return v(p,g,rs(p,y),x);ls(p,y)}return typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint"?(y=""+y,g!==null&&g.tag===6?(n(p,g.sibling),x=i(g,y),x.return=p,p=x):(n(p,g),x=xo(y,p.mode,x),x.return=p,p=x),s(p)):n(p,g)}return function(p,g,y,x){try{kr=0;var _=v(p,g,y,x);return ei=null,_}catch(k){if(k===wi||k===ql)throw k;var w=ie(29,k,null,p.mode);return w.lanes=x,w.return=p,w}finally{}}}var xa=qp(!0),Xp=qp(!1),yn=!1;function Xd(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Cc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Bn(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Nn(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,K&2){var i=a.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),a.pending=t,t=al(e),Bp(e,null,n),t}return Gl(e,a,t,n),al(e)}function nr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,op(e,n)}}function So(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var i=null,r=null;if(n=n.firstBaseUpdate,n!==null){do{var s={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};r===null?i=r=s:r=r.next=s,n=n.next}while(n!==null);r===null?i=r=t:r=r.next=t}else i=r=t;n={baseState:a.baseState,firstBaseUpdate:i,lastBaseUpdate:r,shared:a.shared,callbacks:a.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Oc=!1;function ar(){if(Oc){var e=ti;if(e!==null)throw e}}function ir(e,t,n,a){Oc=!1;var i=e.updateQueue;yn=!1;var r=i.firstBaseUpdate,s=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var o=l,c=o.next;o.next=null,s===null?r=c:s.next=c,s=o;var d=e.alternate;d!==null&&(d=d.updateQueue,l=d.lastBaseUpdate,l!==s&&(l===null?d.firstBaseUpdate=c:l.next=c,d.lastBaseUpdate=o))}if(r!==null){var u=i.baseState;s=0,d=c=o=null,l=r;do{var f=l.lane&-536870913,h=f!==l.lane;if(h?(q&f)===f:(a&f)===f){f!==0&&f===oi&&(Oc=!0),d!==null&&(d=d.next={lane:0,tag:l.tag,payload:l.payload,callback:null,next:null});t:{var m=e,b=l;f=t;var v=n;switch(b.tag){case 1:if(m=b.payload,typeof m=="function"){u=m.call(v,u,f);break t}u=m;break t;case 3:m.flags=m.flags&-65537|128;case 0:if(m=b.payload,f=typeof m=="function"?m.call(v,u,f):m,f==null)break t;u=ct({},u,f);break t;case 2:yn=!0}}f=l.callback,f!==null&&(e.flags|=64,h&&(e.flags|=8192),h=i.callbacks,h===null?i.callbacks=[f]:h.push(f))}else h={lane:f,tag:l.tag,payload:l.payload,callback:l.callback,next:null},d===null?(c=d=h,o=u):d=d.next=h,s|=f;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;h=l,l=h.next,h.next=null,i.lastBaseUpdate=h,i.shared.pending=null}}while(!0);d===null&&(o=u),i.baseState=o,i.firstBaseUpdate=c,i.lastBaseUpdate=d,r===null&&(i.shared.lanes=0),Qn|=s,e.lanes=s,e.memoizedState=u}}function Fp(e,t){if(typeof e!="function")throw Error(M(191,e));e.call(t)}function Qp(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Fp(n[e],t)}var ci=He(null),ll=He(0);function vf(e,t){e=pn,at(ll,e),at(ci,t),pn=e|t.baseLanes}function Ec(){at(ll,pn),at(ci,ci.current)}function Fd(){pn=ll.current,Ot(ci),Ot(ll)}var ue=He(null),xe=null;function xn(e){var t=e.alternate;at(mt,mt.current&1),at(ue,e),xe===null&&(t===null||ci.current!==null||t.memoizedState!==null)&&(xe=e)}function zc(e){at(mt,mt.current),at(ue,e),xe===null&&(xe=e)}function Zp(e){e.tag===22?(at(mt,mt.current),at(ue,e),xe===null&&(xe=e)):_n()}function _n(){at(mt,mt.current),at(ue,ue.current)}function ae(e){Ot(ue),xe===e&&(xe=null),Ot(mt)}var mt=He(0);function ol(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Jc(n)||Ic(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var un=0,H=null,tt=null,xt=null,cl=!1,ni=!1,_a=!1,dl=0,Sr=0,ai=null,Mv=0;function ht(){throw Error(M(321))}function Qd(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!de(e[n],t[n]))return!1;return!0}function Zd(e,t,n,a,i,r){return un=r,H=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,L.H=e===null||e.memoizedState===null?wg:iu,_a=!1,r=n(a,i),_a=!1,ni&&(r=Pp(t,n,a,i)),Kp(e),r}function Kp(e){L.H=wr;var t=tt!==null&&tt.next!==null;if(un=0,xt=tt=H=null,cl=!1,Sr=0,ai=null,t)throw Error(M(300));e===null||St||(e=e.dependencies,e!==null&&rl(e)&&(St=!0))}function Pp(e,t,n,a){H=e;var i=0;do{if(ni&&(ai=null),Sr=0,ni=!1,25<=i)throw Error(M(301));if(i+=1,xt=tt=null,e.updateQueue!=null){var r=e.updateQueue;r.lastEffect=null,r.events=null,r.stores=null,r.memoCache!=null&&(r.memoCache.index=0)}L.H=Mg,r=t(n,a)}while(ni);return r}function Av(){var e=L.H,t=e.useState()[0];return t=typeof t.then=="function"?Fr(t):t,e=e.useState()[0],(tt!==null?tt.memoizedState:null)!==e&&(H.flags|=1024),t}function Kd(){var e=dl!==0;return dl=0,e}function Pd(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Wd(e){if(cl){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}cl=!1}un=0,xt=tt=H=null,ni=!1,Sr=dl=0,ai=null}function qt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return xt===null?H.memoizedState=xt=e:xt=xt.next=e,xt}function yt(){if(tt===null){var e=H.alternate;e=e!==null?e.memoizedState:null}else e=tt.next;var t=xt===null?H.memoizedState:xt.next;if(t!==null)xt=t,tt=e;else{if(e===null)throw H.alternate===null?Error(M(467)):Error(M(310));tt=e,e={memoizedState:tt.memoizedState,baseState:tt.baseState,baseQueue:tt.baseQueue,queue:tt.queue,next:null},xt===null?H.memoizedState=xt=e:xt=xt.next=e}return xt}function Xl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Fr(e){var t=Sr;return Sr+=1,ai===null&&(ai=[]),e=Gp(ai,e,t),t=H,(xt===null?t.memoizedState:xt.next)===null&&(t=t.alternate,L.H=t===null||t.memoizedState===null?wg:iu),e}function Fl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Fr(e);if(e.$$typeof===tn)return Lt(e)}throw Error(M(438,String(e)))}function Jd(e){var t=null,n=H.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var a=H.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(t={data:a.data.map(function(i){return i.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Xl(),H.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),a=0;a<e;a++)n[a]=uy;return t.index++,n}function fn(e,t){return typeof t=="function"?t(e):t}function Rs(e){var t=yt();return Id(t,tt,e)}function Id(e,t,n){var a=e.queue;if(a===null)throw Error(M(311));a.lastRenderedReducer=n;var i=e.baseQueue,r=a.pending;if(r!==null){if(i!==null){var s=i.next;i.next=r.next,r.next=s}t.baseQueue=i=r,a.pending=null}if(r=e.baseState,i===null)e.memoizedState=r;else{t=i.next;var l=s=null,o=null,c=t,d=!1;do{var u=c.lane&-536870913;if(u!==c.lane?(q&u)===u:(un&u)===u){var f=c.revertLane;if(f===0)o!==null&&(o=o.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),u===oi&&(d=!0);else if((un&f)===f){c=c.next,f===oi&&(d=!0);continue}else u={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},o===null?(l=o=u,s=r):o=o.next=u,H.lanes|=f,Qn|=f;u=c.action,_a&&n(r,u),r=c.hasEagerState?c.eagerState:n(r,u)}else f={lane:u,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},o===null?(l=o=f,s=r):o=o.next=f,H.lanes|=u,Qn|=u;c=c.next}while(c!==null&&c!==t);if(o===null?s=r:o.next=l,!de(r,e.memoizedState)&&(St=!0,d&&(n=ti,n!==null)))throw n;e.memoizedState=r,e.baseState=s,e.baseQueue=o,a.lastRenderedState=r}return i===null&&(a.lanes=0),[e.memoizedState,a.dispatch]}function wo(e){var t=yt(),n=t.queue;if(n===null)throw Error(M(311));n.lastRenderedReducer=e;var a=n.dispatch,i=n.pending,r=t.memoizedState;if(i!==null){n.pending=null;var s=i=i.next;do r=e(r,s.action),s=s.next;while(s!==i);de(r,t.memoizedState)||(St=!0),t.memoizedState=r,t.baseQueue===null&&(t.baseState=r),n.lastRenderedState=r}return[r,a]}function Wp(e,t,n){var a=H,i=yt(),r=F;if(r){if(n===void 0)throw Error(M(407));n=n()}else n=t();var s=!de((tt||i).memoizedState,n);if(s&&(i.memoizedState=n,St=!0),i=i.queue,$d($p.bind(null,a,i,e),[e]),i.getSnapshot!==t||s||xt!==null&&xt.memoizedState.tag&1){if(a.flags|=2048,di(9,{destroy:void 0},Ip.bind(null,a,i,n,t),null),et===null)throw Error(M(349));r||un&127||Jp(a,t,n)}return n}function Jp(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=H.updateQueue,t===null?(t=Xl(),H.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Ip(e,t,n,a){t.value=n,t.getSnapshot=a,tg(t)&&eg(e)}function $p(e,t,n){return n(function(){tg(t)&&eg(e)})}function tg(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!de(e,n)}catch{return!0}}function eg(e){var t=Da(e,2);t!==null&&It(t,e,2)}function Rc(e){var t=qt();if(typeof e=="function"){var n=e;if(e=n(),_a){Sn(!0);try{n()}finally{Sn(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:fn,lastRenderedState:e},t}function ng(e,t,n,a){return e.baseState=n,Id(e,tt,typeof a=="function"?a:fn)}function Tv(e,t,n,a,i){if(Zl(e))throw Error(M(485));if(e=t.action,e!==null){var r={payload:i,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(s){r.listeners.push(s)}};L.T!==null?n(!0):r.isTransition=!1,a(r),n=t.pending,n===null?(r.next=t.pending=r,ag(t,r)):(r.next=n.next,t.pending=n.next=r)}}function ag(e,t){var n=t.action,a=t.payload,i=e.state;if(t.isTransition){var r=L.T,s={};L.T=s;try{var l=n(i,a),o=L.S;o!==null&&o(s,l),xf(e,t,l)}catch(c){Lc(e,t,c)}finally{r!==null&&s.types!==null&&(r.types=s.types),L.T=r}}else try{r=n(i,a),xf(e,t,r)}catch(c){Lc(e,t,c)}}function xf(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){_f(e,t,a)},function(a){return Lc(e,t,a)}):_f(e,t,n)}function _f(e,t,n){t.status="fulfilled",t.value=n,ig(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,ag(e,n)))}function Lc(e,t,n){var a=e.pending;if(e.pending=null,a!==null){a=a.next;do t.status="rejected",t.reason=n,ig(t),t=t.next;while(t!==a)}e.action=null}function ig(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function rg(e,t){return t}function kf(e,t){if(F){var n=et.formState;if(n!==null){t:{var a=H;if(F){if(st){e:{for(var i=st,r=ve;i.nodeType!==8;){if(!r){i=null;break e}if(i=_e(i.nextSibling),i===null){i=null;break e}}r=i.data,i=r==="F!"||r==="F"?i:null}if(i){st=_e(i.nextSibling),a=i.data==="F!";break t}}Xn(a)}a=!1}a&&(t=n[0])}}return n=qt(),n.memoizedState=n.baseState=t,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:rg,lastRenderedState:t},n.queue=a,n=_g.bind(null,H,a),a.dispatch=n,a=Rc(!1),r=au.bind(null,H,!1,a.queue),a=qt(),i={state:t,dispatch:null,action:e,pending:null},a.queue=i,n=Tv.bind(null,H,i,r,n),i.dispatch=n,a.memoizedState=e,[t,n,!1]}function Sf(e){var t=yt();return sg(t,tt,e)}function sg(e,t,n){if(t=Id(e,t,rg)[0],e=Rs(fn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var a=Fr(t)}catch(s){throw s===wi?ql:s}else a=t;t=yt();var i=t.queue,r=i.dispatch;return n!==t.memoizedState&&(H.flags|=2048,di(9,{destroy:void 0},Dv.bind(null,i,n),null)),[a,r,e]}function Dv(e,t){e.action=t}function wf(e){var t=yt(),n=tt;if(n!==null)return sg(t,n,e);yt(),t=t.memoizedState,n=yt();var a=n.queue.dispatch;return n.memoizedState=e,[t,a,!1]}function di(e,t,n,a){return e={tag:e,create:n,deps:a,inst:t,next:null},t=H.updateQueue,t===null&&(t=Xl(),H.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e),e}function lg(){return yt().memoizedState}function Ls(e,t,n,a){var i=qt();H.flags|=e,i.memoizedState=di(1|t,{destroy:void 0},n,a===void 0?null:a)}function Ql(e,t,n,a){var i=yt();a=a===void 0?null:a;var r=i.memoizedState.inst;tt!==null&&a!==null&&Qd(a,tt.memoizedState.deps)?i.memoizedState=di(t,r,n,a):(H.flags|=e,i.memoizedState=di(1|t,r,n,a))}function Mf(e,t){Ls(8390656,8,e,t)}function $d(e,t){Ql(2048,8,e,t)}function Cv(e){H.flags|=4;var t=H.updateQueue;if(t===null)t=Xl(),H.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function og(e){var t=yt().memoizedState;return Cv({ref:t,nextImpl:e}),function(){if(K&2)throw Error(M(440));return t.impl.apply(void 0,arguments)}}function cg(e,t){return Ql(4,2,e,t)}function dg(e,t){return Ql(4,4,e,t)}function ug(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function fg(e,t,n){n=n!=null?n.concat([e]):null,Ql(4,4,ug.bind(null,t,e),n)}function tu(){}function hg(e,t){var n=yt();t=t===void 0?null:t;var a=n.memoizedState;return t!==null&&Qd(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function pg(e,t){var n=yt();t=t===void 0?null:t;var a=n.memoizedState;if(t!==null&&Qd(t,a[1]))return a[0];if(a=e(),_a){Sn(!0);try{e()}finally{Sn(!1)}}return n.memoizedState=[a,t],a}function eu(e,t,n){return n===void 0||un&1073741824&&!(q&261930)?e.memoizedState=t:(e.memoizedState=n,e=nm(),H.lanes|=e,Qn|=e,n)}function gg(e,t,n,a){return de(n,t)?n:ci.current!==null?(e=eu(e,n,a),de(e,t)||(St=!0),e):!(un&42)||un&1073741824&&!(q&261930)?(St=!0,e.memoizedState=n):(e=nm(),H.lanes|=e,Qn|=e,t)}function mg(e,t,n,a,i){var r=P.p;P.p=r!==0&&8>r?r:8;var s=L.T,l={};L.T=l,au(e,!1,t,n);try{var o=i(),c=L.S;if(c!==null&&c(l,o),o!==null&&typeof o=="object"&&typeof o.then=="function"){var d=wv(o,a);rr(e,t,d,ce(e))}else rr(e,t,a,ce(e))}catch(u){rr(e,t,{then:function(){},status:"rejected",reason:u},ce())}finally{P.p=r,s!==null&&l.types!==null&&(s.types=l.types),L.T=s}}function Ov(){}function Bc(e,t,n,a){if(e.tag!==5)throw Error(M(476));var i=bg(e).queue;mg(e,i,t,ua,n===null?Ov:function(){return yg(e),n(a)})}function bg(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ua,baseState:ua,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fn,lastRenderedState:ua},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fn,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function yg(e){var t=bg(e);t.next===null&&(t=e.alternate.memoizedState),rr(e,t.next.queue,{},ce())}function nu(){return Lt(Tr)}function vg(){return yt().memoizedState}function xg(){return yt().memoizedState}function Ev(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=ce();e=Bn(n);var a=Nn(t,e,n);a!==null&&(It(a,t,n),nr(a,t,n)),t={cache:Yd()},e.payload=t;return}t=t.return}}function zv(e,t,n){var a=ce();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},Zl(e)?kg(t,n):(n=jd(e,t,n,a),n!==null&&(It(n,e,a),Sg(n,t,a)))}function _g(e,t,n){var a=ce();rr(e,t,n,a)}function rr(e,t,n,a){var i={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(Zl(e))kg(t,i);else{var r=e.alternate;if(e.lanes===0&&(r===null||r.lanes===0)&&(r=t.lastRenderedReducer,r!==null))try{var s=t.lastRenderedState,l=r(s,n);if(i.hasEagerState=!0,i.eagerState=l,de(l,s))return Gl(e,t,i,0),et===null&&Yl(),!1}catch{}finally{}if(n=jd(e,t,i,a),n!==null)return It(n,e,a),Sg(n,t,a),!0}return!1}function au(e,t,n,a){if(a={lane:2,revertLane:fu(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Zl(e)){if(t)throw Error(M(479))}else t=jd(e,n,a,2),t!==null&&It(t,e,2)}function Zl(e){var t=e.alternate;return e===H||t!==null&&t===H}function kg(e,t){ni=cl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Sg(e,t,n){if(n&4194048){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,op(e,n)}}var wr={readContext:Lt,use:Fl,useCallback:ht,useContext:ht,useEffect:ht,useImperativeHandle:ht,useLayoutEffect:ht,useInsertionEffect:ht,useMemo:ht,useReducer:ht,useRef:ht,useState:ht,useDebugValue:ht,useDeferredValue:ht,useTransition:ht,useSyncExternalStore:ht,useId:ht,useHostTransitionStatus:ht,useFormState:ht,useActionState:ht,useOptimistic:ht,useMemoCache:ht,useCacheRefresh:ht};wr.useEffectEvent=ht;var wg={readContext:Lt,use:Fl,useCallback:function(e,t){return qt().memoizedState=[e,t===void 0?null:t],e},useContext:Lt,useEffect:Mf,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,Ls(4194308,4,ug.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ls(4194308,4,e,t)},useInsertionEffect:function(e,t){Ls(4,2,e,t)},useMemo:function(e,t){var n=qt();t=t===void 0?null:t;var a=e();if(_a){Sn(!0);try{e()}finally{Sn(!1)}}return n.memoizedState=[a,t],a},useReducer:function(e,t,n){var a=qt();if(n!==void 0){var i=n(t);if(_a){Sn(!0);try{n(t)}finally{Sn(!1)}}}else i=t;return a.memoizedState=a.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},a.queue=e,e=e.dispatch=zv.bind(null,H,e),[a.memoizedState,e]},useRef:function(e){var t=qt();return e={current:e},t.memoizedState=e},useState:function(e){e=Rc(e);var t=e.queue,n=_g.bind(null,H,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:tu,useDeferredValue:function(e,t){var n=qt();return eu(n,e,t)},useTransition:function(){var e=Rc(!1);return e=mg.bind(null,H,e.queue,!0,!1),qt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var a=H,i=qt();if(F){if(n===void 0)throw Error(M(407));n=n()}else{if(n=t(),et===null)throw Error(M(349));q&127||Jp(a,t,n)}i.memoizedState=n;var r={value:n,getSnapshot:t};return i.queue=r,Mf($p.bind(null,a,r,e),[e]),a.flags|=2048,di(9,{destroy:void 0},Ip.bind(null,a,r,n,t),null),n},useId:function(){var e=qt(),t=et.identifierPrefix;if(F){var n=Le,a=Re;n=(a&~(1<<32-oe(a)-1)).toString(32)+n,t="_"+t+"R_"+n,n=dl++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=Mv++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:nu,useFormState:kf,useActionState:kf,useOptimistic:function(e){var t=qt();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=au.bind(null,H,!0,n),n.dispatch=t,[e,t]},useMemoCache:Jd,useCacheRefresh:function(){return qt().memoizedState=Ev.bind(null,H)},useEffectEvent:function(e){var t=qt(),n={impl:e};return t.memoizedState=n,function(){if(K&2)throw Error(M(440));return n.impl.apply(void 0,arguments)}}},iu={readContext:Lt,use:Fl,useCallback:hg,useContext:Lt,useEffect:$d,useImperativeHandle:fg,useInsertionEffect:cg,useLayoutEffect:dg,useMemo:pg,useReducer:Rs,useRef:lg,useState:function(){return Rs(fn)},useDebugValue:tu,useDeferredValue:function(e,t){var n=yt();return gg(n,tt.memoizedState,e,t)},useTransition:function(){var e=Rs(fn)[0],t=yt().memoizedState;return[typeof e=="boolean"?e:Fr(e),t]},useSyncExternalStore:Wp,useId:vg,useHostTransitionStatus:nu,useFormState:Sf,useActionState:Sf,useOptimistic:function(e,t){var n=yt();return ng(n,tt,e,t)},useMemoCache:Jd,useCacheRefresh:xg};iu.useEffectEvent=og;var Mg={readContext:Lt,use:Fl,useCallback:hg,useContext:Lt,useEffect:$d,useImperativeHandle:fg,useInsertionEffect:cg,useLayoutEffect:dg,useMemo:pg,useReducer:wo,useRef:lg,useState:function(){return wo(fn)},useDebugValue:tu,useDeferredValue:function(e,t){var n=yt();return tt===null?eu(n,e,t):gg(n,tt.memoizedState,e,t)},useTransition:function(){var e=wo(fn)[0],t=yt().memoizedState;return[typeof e=="boolean"?e:Fr(e),t]},useSyncExternalStore:Wp,useId:vg,useHostTransitionStatus:nu,useFormState:wf,useActionState:wf,useOptimistic:function(e,t){var n=yt();return tt!==null?ng(n,tt,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:Jd,useCacheRefresh:xg};Mg.useEffectEvent=og;function Mo(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:ct({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Nc={enqueueSetState:function(e,t,n){e=e._reactInternals;var a=ce(),i=Bn(a);i.payload=t,n!=null&&(i.callback=n),t=Nn(e,i,a),t!==null&&(It(t,e,a),nr(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=ce(),i=Bn(a);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Nn(e,i,a),t!==null&&(It(t,e,a),nr(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ce(),a=Bn(n);a.tag=2,t!=null&&(a.callback=t),t=Nn(e,a,n),t!==null&&(It(t,e,n),nr(t,e,n))}};function Af(e,t,n,a,i,r,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,r,s):t.prototype&&t.prototype.isPureReactComponent?!vr(n,a)||!vr(i,r):!0}function Tf(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&Nc.enqueueReplaceState(t,t.state,null)}function ka(e,t){var n=t;if("ref"in t){n={};for(var a in t)a!=="ref"&&(n[a]=t[a])}if(e=e.defaultProps){n===t&&(n=ct({},n));for(var i in e)n[i]===void 0&&(n[i]=e[i])}return n}function Ag(e){nl(e)}function Tg(e){console.error(e)}function Dg(e){nl(e)}function ul(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(a){setTimeout(function(){throw a})}}function Df(e,t,n){try{var a=e.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(i){setTimeout(function(){throw i})}}function jc(e,t,n){return n=Bn(n),n.tag=3,n.payload={element:null},n.callback=function(){ul(e,t)},n}function Cg(e){return e=Bn(e),e.tag=3,e}function Og(e,t,n,a){var i=n.type.getDerivedStateFromError;if(typeof i=="function"){var r=a.value;e.payload=function(){return i(r)},e.callback=function(){Df(t,n,a)}}var s=n.stateNode;s!==null&&typeof s.componentDidCatch=="function"&&(e.callback=function(){Df(t,n,a),typeof i!="function"&&(jn===null?jn=new Set([this]):jn.add(this));var l=a.stack;this.componentDidCatch(a.value,{componentStack:l!==null?l:""})})}function Rv(e,t,n,a,i){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(t=n.alternate,t!==null&&Si(t,n,i,!0),n=ue.current,n!==null){switch(n.tag){case 31:case 13:return xe===null?ml():n.alternate===null&&pt===0&&(pt=3),n.flags&=-257,n.flags|=65536,n.lanes=i,a===sl?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([a]):t.add(a),No(e,a,i)),!1;case 22:return n.flags|=65536,a===sl?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([a]):n.add(a)),No(e,a,i)),!1}throw Error(M(435,n.tag))}return No(e,a,i),ml(),!1}if(F)return t=ue.current,t!==null?(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=i,a!==wc&&(e=Error(M(422),{cause:a}),_r(ye(e,n)))):(a!==wc&&(t=Error(M(423),{cause:a}),_r(ye(t,n))),e=e.current.alternate,e.flags|=65536,i&=-i,e.lanes|=i,a=ye(a,n),i=jc(e.stateNode,a,i),So(e,i),pt!==4&&(pt=2)),!1;var r=Error(M(520),{cause:a});if(r=ye(r,n),or===null?or=[r]:or.push(r),pt!==4&&(pt=2),t===null)return!0;a=ye(a,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=i&-i,n.lanes|=e,e=jc(n.stateNode,a,e),So(n,e),!1;case 1:if(t=n.type,r=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||r!==null&&typeof r.componentDidCatch=="function"&&(jn===null||!jn.has(r))))return n.flags|=65536,i&=-i,n.lanes|=i,i=Cg(i),Og(i,e,n,a),So(n,i),!1}n=n.return}while(n!==null);return!1}var ru=Error(M(461)),St=!1;function Et(e,t,n,a){t.child=e===null?Xp(t,null,n,a):xa(t,e.child,n,a)}function Cf(e,t,n,a,i){n=n.render;var r=t.ref;if("ref"in a){var s={};for(var l in a)l!=="ref"&&(s[l]=a[l])}else s=a;return va(t),a=Zd(e,t,n,s,r,i),l=Kd(),e!==null&&!St?(Pd(e,t,i),hn(e,t,i)):(F&&l&&Ud(t),t.flags|=1,Et(e,t,a,i),t.child)}function Of(e,t,n,a,i){if(e===null){var r=n.type;return typeof r=="function"&&!Hd(r)&&r.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=r,Eg(e,t,r,a,i)):(e=Es(n.type,null,a,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(r=e.child,!su(e,i)){var s=r.memoizedProps;if(n=n.compare,n=n!==null?n:vr,n(s,a)&&e.ref===t.ref)return hn(e,t,i)}return t.flags|=1,e=ln(r,a),e.ref=t.ref,e.return=t,t.child=e}function Eg(e,t,n,a,i){if(e!==null){var r=e.memoizedProps;if(vr(r,a)&&e.ref===t.ref)if(St=!1,t.pendingProps=a=r,su(e,i))e.flags&131072&&(St=!0);else return t.lanes=e.lanes,hn(e,t,i)}return Hc(e,t,n,a,i)}function zg(e,t,n,a){var i=a.children,r=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if(t.flags&128){if(r=r!==null?r.baseLanes|n:n,e!==null){for(a=t.child=e.child,i=0;a!==null;)i=i|a.lanes|a.childLanes,a=a.sibling;a=i&~r}else a=0,t.child=null;return Ef(e,t,r,n,a)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&zs(t,r!==null?r.cachePool:null),r!==null?vf(t,r):Ec(),Zp(t);else return a=t.lanes=536870912,Ef(e,t,r!==null?r.baseLanes|n:n,n,a)}else r!==null?(zs(t,r.cachePool),vf(t,r),_n(),t.memoizedState=null):(e!==null&&zs(t,null),Ec(),_n());return Et(e,t,i,n),t.child}function qi(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Ef(e,t,n,a,i){var r=Gd();return r=r===null?null:{parent:kt._currentValue,pool:r},t.memoizedState={baseLanes:n,cachePool:r},e!==null&&zs(t,null),Ec(),Zp(t),e!==null&&Si(e,t,a,!0),t.childLanes=i,null}function Bs(e,t){return t=fl({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function zf(e,t,n){return xa(t,e.child,null,n),e=Bs(t,t.pendingProps),e.flags|=2,ae(t),t.memoizedState=null,e}function Lv(e,t,n){var a=t.pendingProps,i=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(F){if(a.mode==="hidden")return e=Bs(t,a),t.lanes=536870912,qi(null,e);if(zc(t),(e=st)?(e=wm(e,ve),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:qn!==null?{id:Re,overflow:Le}:null,retryLane:536870912,hydrationErrors:null},n=jp(e),n.return=t,t.child=n,Rt=t,st=null)):e=null,e===null)throw Xn(t);return t.lanes=536870912,null}return Bs(t,a)}var r=e.memoizedState;if(r!==null){var s=r.dehydrated;if(zc(t),i)if(t.flags&256)t.flags&=-257,t=zf(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(M(558));else if(St||Si(e,t,n,!1),i=(n&e.childLanes)!==0,St||i){if(a=et,a!==null&&(s=cp(a,n),s!==0&&s!==r.retryLane))throw r.retryLane=s,Da(e,s),It(a,e,s),ru;ml(),t=zf(e,t,n)}else e=r.treeContext,st=_e(s.nextSibling),Rt=t,F=!0,Ln=null,ve=!1,e!==null&&Up(t,e),t=Bs(t,a),t.flags|=4096;return t}return e=ln(e.child,{mode:a.mode,children:a.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Ns(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(M(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Hc(e,t,n,a,i){return va(t),n=Zd(e,t,n,a,void 0,i),a=Kd(),e!==null&&!St?(Pd(e,t,i),hn(e,t,i)):(F&&a&&Ud(t),t.flags|=1,Et(e,t,n,i),t.child)}function Rf(e,t,n,a,i,r){return va(t),t.updateQueue=null,n=Pp(t,a,n,i),Kp(e),a=Kd(),e!==null&&!St?(Pd(e,t,r),hn(e,t,r)):(F&&a&&Ud(t),t.flags|=1,Et(e,t,n,r),t.child)}function Lf(e,t,n,a,i){if(va(t),t.stateNode===null){var r=Za,s=n.contextType;typeof s=="object"&&s!==null&&(r=Lt(s)),r=new n(a,r),t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=Nc,t.stateNode=r,r._reactInternals=t,r=t.stateNode,r.props=a,r.state=t.memoizedState,r.refs={},Xd(t),s=n.contextType,r.context=typeof s=="object"&&s!==null?Lt(s):Za,r.state=t.memoizedState,s=n.getDerivedStateFromProps,typeof s=="function"&&(Mo(t,n,s,a),r.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(s=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),s!==r.state&&Nc.enqueueReplaceState(r,r.state,null),ir(t,a,r,i),ar(),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308),a=!0}else if(e===null){r=t.stateNode;var l=t.memoizedProps,o=ka(n,l);r.props=o;var c=r.context,d=n.contextType;s=Za,typeof d=="object"&&d!==null&&(s=Lt(d));var u=n.getDerivedStateFromProps;d=typeof u=="function"||typeof r.getSnapshotBeforeUpdate=="function",l=t.pendingProps!==l,d||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(l||c!==s)&&Tf(t,r,a,s),yn=!1;var f=t.memoizedState;r.state=f,ir(t,a,r,i),ar(),c=t.memoizedState,l||f!==c||yn?(typeof u=="function"&&(Mo(t,n,u,a),c=t.memoizedState),(o=yn||Af(t,n,o,a,f,c,s))?(d||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount()),typeof r.componentDidMount=="function"&&(t.flags|=4194308)):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=c),r.props=a,r.state=c,r.context=s,a=o):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{r=t.stateNode,Cc(e,t),s=t.memoizedProps,d=ka(n,s),r.props=d,u=t.pendingProps,f=r.context,c=n.contextType,o=Za,typeof c=="object"&&c!==null&&(o=Lt(c)),l=n.getDerivedStateFromProps,(c=typeof l=="function"||typeof r.getSnapshotBeforeUpdate=="function")||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(s!==u||f!==o)&&Tf(t,r,a,o),yn=!1,f=t.memoizedState,r.state=f,ir(t,a,r,i),ar();var h=t.memoizedState;s!==u||f!==h||yn||e!==null&&e.dependencies!==null&&rl(e.dependencies)?(typeof l=="function"&&(Mo(t,n,l,a),h=t.memoizedState),(d=yn||Af(t,n,d,a,f,h,o)||e!==null&&e.dependencies!==null&&rl(e.dependencies))?(c||typeof r.UNSAFE_componentWillUpdate!="function"&&typeof r.componentWillUpdate!="function"||(typeof r.componentWillUpdate=="function"&&r.componentWillUpdate(a,h,o),typeof r.UNSAFE_componentWillUpdate=="function"&&r.UNSAFE_componentWillUpdate(a,h,o)),typeof r.componentDidUpdate=="function"&&(t.flags|=4),typeof r.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof r.componentDidUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=h),r.props=a,r.state=h,r.context=o,a=d):(typeof r.componentDidUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),a=!1)}return r=a,Ns(e,t),a=(t.flags&128)!==0,r||a?(r=t.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:r.render(),t.flags|=1,e!==null&&a?(t.child=xa(t,e.child,null,i),t.child=xa(t,null,n,i)):Et(e,t,n,i),t.memoizedState=r.state,e=t.child):e=hn(e,t,i),e}function Bf(e,t,n,a){return ya(),t.flags|=256,Et(e,t,n,a),t.child}var Ao={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function To(e){return{baseLanes:e,cachePool:Yp()}}function Do(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=re),e}function Rg(e,t,n){var a=t.pendingProps,i=!1,r=(t.flags&128)!==0,s;if((s=r)||(s=e!==null&&e.memoizedState===null?!1:(mt.current&2)!==0),s&&(i=!0,t.flags&=-129),s=(t.flags&32)!==0,t.flags&=-33,e===null){if(F){if(i?xn(t):_n(),(e=st)?(e=wm(e,ve),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:qn!==null?{id:Re,overflow:Le}:null,retryLane:536870912,hydrationErrors:null},n=jp(e),n.return=t,t.child=n,Rt=t,st=null)):e=null,e===null)throw Xn(t);return Ic(e)?t.lanes=32:t.lanes=536870912,null}var l=a.children;return a=a.fallback,i?(_n(),i=t.mode,l=fl({mode:"hidden",children:l},i),a=fa(a,i,n,null),l.return=t,a.return=t,l.sibling=a,t.child=l,a=t.child,a.memoizedState=To(n),a.childLanes=Do(e,s,n),t.memoizedState=Ao,qi(null,a)):(xn(t),Uc(t,l))}var o=e.memoizedState;if(o!==null&&(l=o.dehydrated,l!==null)){if(r)t.flags&256?(xn(t),t.flags&=-257,t=Co(e,t,n)):t.memoizedState!==null?(_n(),t.child=e.child,t.flags|=128,t=null):(_n(),l=a.fallback,i=t.mode,a=fl({mode:"visible",children:a.children},i),l=fa(l,i,n,null),l.flags|=2,a.return=t,l.return=t,a.sibling=l,t.child=a,xa(t,e.child,null,n),a=t.child,a.memoizedState=To(n),a.childLanes=Do(e,s,n),t.memoizedState=Ao,t=qi(null,a));else if(xn(t),Ic(l)){if(s=l.nextSibling&&l.nextSibling.dataset,s)var c=s.dgst;s=c,a=Error(M(419)),a.stack="",a.digest=s,_r({value:a,source:null,stack:null}),t=Co(e,t,n)}else if(St||Si(e,t,n,!1),s=(n&e.childLanes)!==0,St||s){if(s=et,s!==null&&(a=cp(s,n),a!==0&&a!==o.retryLane))throw o.retryLane=a,Da(e,a),It(s,e,a),ru;Jc(l)||ml(),t=Co(e,t,n)}else Jc(l)?(t.flags|=192,t.child=e.child,t=null):(e=o.treeContext,st=_e(l.nextSibling),Rt=t,F=!0,Ln=null,ve=!1,e!==null&&Up(t,e),t=Uc(t,a.children),t.flags|=4096);return t}return i?(_n(),l=a.fallback,i=t.mode,o=e.child,c=o.sibling,a=ln(o,{mode:"hidden",children:a.children}),a.subtreeFlags=o.subtreeFlags&65011712,c!==null?l=ln(c,l):(l=fa(l,i,n,null),l.flags|=2),l.return=t,a.return=t,a.sibling=l,t.child=a,qi(null,a),a=t.child,l=e.child.memoizedState,l===null?l=To(n):(i=l.cachePool,i!==null?(o=kt._currentValue,i=i.parent!==o?{parent:o,pool:o}:i):i=Yp(),l={baseLanes:l.baseLanes|n,cachePool:i}),a.memoizedState=l,a.childLanes=Do(e,s,n),t.memoizedState=Ao,qi(e.child,a)):(xn(t),n=e.child,e=n.sibling,n=ln(n,{mode:"visible",children:a.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function Uc(e,t){return t=fl({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function fl(e,t){return e=ie(22,e,null,t),e.lanes=0,e}function Co(e,t,n){return xa(t,e.child,null,n),e=Uc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Nf(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),Ac(e.return,t,n)}function Oo(e,t,n,a,i,r){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:i,treeForkCount:r}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=a,s.tail=n,s.tailMode=i,s.treeForkCount=r)}function Lg(e,t,n){var a=t.pendingProps,i=a.revealOrder,r=a.tail;a=a.children;var s=mt.current,l=(s&2)!==0;if(l?(s=s&1|2,t.flags|=128):s&=1,at(mt,s),Et(e,t,a,n),a=F?xr:0,!l&&e!==null&&e.flags&128)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Nf(e,n,t);else if(e.tag===19)Nf(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&ol(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Oo(t,!1,i,n,r,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&ol(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Oo(t,!0,n,null,r,a);break;case"together":Oo(t,!1,null,null,void 0,a);break;default:t.memoizedState=null}return t.child}function hn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Qn|=t.lanes,!(n&t.childLanes))if(e!==null){if(Si(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(M(153));if(t.child!==null){for(e=t.child,n=ln(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=ln(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function su(e,t){return e.lanes&t?!0:(e=e.dependencies,!!(e!==null&&rl(e)))}function Bv(e,t,n){switch(t.tag){case 3:Is(t,t.stateNode.containerInfo),vn(t,kt,e.memoizedState.cache),ya();break;case 27:case 5:hc(t);break;case 4:Is(t,t.stateNode.containerInfo);break;case 10:vn(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,zc(t),null;break;case 13:var a=t.memoizedState;if(a!==null)return a.dehydrated!==null?(xn(t),t.flags|=128,null):n&t.child.childLanes?Rg(e,t,n):(xn(t),e=hn(e,t,n),e!==null?e.sibling:null);xn(t);break;case 19:var i=(e.flags&128)!==0;if(a=(n&t.childLanes)!==0,a||(Si(e,t,n,!1),a=(n&t.childLanes)!==0),i){if(a)return Lg(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),at(mt,mt.current),a)break;return null;case 22:return t.lanes=0,zg(e,t,n,t.pendingProps);case 24:vn(t,kt,e.memoizedState.cache)}return hn(e,t,n)}function Bg(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)St=!0;else{if(!su(e,n)&&!(t.flags&128))return St=!1,Bv(e,t,n);St=!!(e.flags&131072)}else St=!1,F&&t.flags&1048576&&Hp(t,xr,t.index);switch(t.lanes=0,t.tag){case 16:t:{var a=t.pendingProps;if(e=sa(t.elementType),t.type=e,typeof e=="function")Hd(e)?(a=ka(e,a),t.tag=1,t=Lf(null,t,e,a,n)):(t.tag=0,t=Hc(null,t,e,a,n));else{if(e!=null){var i=e.$$typeof;if(i===wd){t.tag=11,t=Cf(null,t,e,a,n);break t}else if(i===Md){t.tag=14,t=Of(null,t,e,a,n);break t}}throw t=uc(e)||e,Error(M(306,t,""))}}return t;case 0:return Hc(e,t,t.type,t.pendingProps,n);case 1:return a=t.type,i=ka(a,t.pendingProps),Lf(e,t,a,i,n);case 3:t:{if(Is(t,t.stateNode.containerInfo),e===null)throw Error(M(387));a=t.pendingProps;var r=t.memoizedState;i=r.element,Cc(e,t),ir(t,a,null,n);var s=t.memoizedState;if(a=s.cache,vn(t,kt,a),a!==r.cache&&Tc(t,[kt],n,!0),ar(),a=s.element,r.isDehydrated)if(r={element:a,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=r,t.memoizedState=r,t.flags&256){t=Bf(e,t,a,n);break t}else if(a!==i){i=ye(Error(M(424)),t),_r(i),t=Bf(e,t,a,n);break t}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(st=_e(e.firstChild),Rt=t,F=!0,Ln=null,ve=!0,n=Xp(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(ya(),a===i){t=hn(e,t,n);break t}Et(e,t,a,n)}t=t.child}return t;case 26:return Ns(e,t),e===null?(n=nh(t.type,null,t.pendingProps,null))?t.memoizedState=n:F||(n=t.type,e=t.pendingProps,a=xl(Rn.current).createElement(n),a[zt]=t,a[$t]=e,Bt(a,n,e),Dt(a),t.stateNode=a):t.memoizedState=nh(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return hc(t),e===null&&F&&(a=t.stateNode=Mm(t.type,t.pendingProps,Rn.current),Rt=t,ve=!0,i=st,Wn(t.type)?($c=i,st=_e(a.firstChild)):st=i),Et(e,t,t.pendingProps.children,n),Ns(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&F&&((i=a=st)&&(a=ux(a,t.type,t.pendingProps,ve),a!==null?(t.stateNode=a,Rt=t,st=_e(a.firstChild),ve=!1,i=!0):i=!1),i||Xn(t)),hc(t),i=t.type,r=t.pendingProps,s=e!==null?e.memoizedProps:null,a=r.children,Pc(i,r)?a=null:s!==null&&Pc(i,s)&&(t.flags|=32),t.memoizedState!==null&&(i=Zd(e,t,Av,null,null,n),Tr._currentValue=i),Ns(e,t),Et(e,t,a,n),t.child;case 6:return e===null&&F&&((e=n=st)&&(n=fx(n,t.pendingProps,ve),n!==null?(t.stateNode=n,Rt=t,st=null,e=!0):e=!1),e||Xn(t)),null;case 13:return Rg(e,t,n);case 4:return Is(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=xa(t,null,a,n):Et(e,t,a,n),t.child;case 11:return Cf(e,t,t.type,t.pendingProps,n);case 7:return Et(e,t,t.pendingProps,n),t.child;case 8:return Et(e,t,t.pendingProps.children,n),t.child;case 12:return Et(e,t,t.pendingProps.children,n),t.child;case 10:return a=t.pendingProps,vn(t,t.type,a.value),Et(e,t,a.children,n),t.child;case 9:return i=t.type._context,a=t.pendingProps.children,va(t),i=Lt(i),a=a(i),t.flags|=1,Et(e,t,a,n),t.child;case 14:return Of(e,t,t.type,t.pendingProps,n);case 15:return Eg(e,t,t.type,t.pendingProps,n);case 19:return Lg(e,t,n);case 31:return Lv(e,t,n);case 22:return zg(e,t,n,t.pendingProps);case 24:return va(t),a=Lt(kt),e===null?(i=Gd(),i===null&&(i=et,r=Yd(),i.pooledCache=r,r.refCount++,r!==null&&(i.pooledCacheLanes|=n),i=r),t.memoizedState={parent:a,cache:i},Xd(t),vn(t,kt,i)):(e.lanes&n&&(Cc(e,t),ir(t,null,null,n),ar()),i=e.memoizedState,r=t.memoizedState,i.parent!==a?(i={parent:a,cache:a},t.memoizedState=i,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=i),vn(t,kt,a)):(a=r.cache,vn(t,kt,a),a!==i.cache&&Tc(t,[kt],n,!0))),Et(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(M(156,t.tag))}function qe(e){e.flags|=4}function Eo(e,t,n,a,i){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(rm())e.flags|=8192;else throw pa=sl,qd}else e.flags&=-16777217}function jf(e,t){if(t.type!=="stylesheet"||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Dm(t))if(rm())e.flags|=8192;else throw pa=sl,qd}function os(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?sp():536870912,e.lanes|=t,ui|=t)}function zi(e,t){if(!F)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function rt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,a|=i.subtreeFlags&65011712,a|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,a|=i.subtreeFlags,a|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function Nv(e,t,n){var a=t.pendingProps;switch(Vd(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return rt(t),null;case 1:return rt(t),null;case 3:return n=t.stateNode,a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),on(kt),ri(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Ea(t)?qe(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,ko())),rt(t),null;case 26:var i=t.type,r=t.memoizedState;return e===null?(qe(t),r!==null?(rt(t),jf(t,r)):(rt(t),Eo(t,i,null,a,n))):r?r!==e.memoizedState?(qe(t),rt(t),jf(t,r)):(rt(t),t.flags&=-16777217):(e=e.memoizedProps,e!==a&&qe(t),rt(t),Eo(t,i,e,a,n)),null;case 27:if($s(t),n=Rn.current,i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&qe(t);else{if(!a){if(t.stateNode===null)throw Error(M(166));return rt(t),null}e=Ne.current,Ea(t)?ff(t):(e=Mm(i,a,n),t.stateNode=e,qe(t))}return rt(t),null;case 5:if($s(t),i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&qe(t);else{if(!a){if(t.stateNode===null)throw Error(M(166));return rt(t),null}if(r=Ne.current,Ea(t))ff(t);else{var s=xl(Rn.current);switch(r){case 1:r=s.createElementNS("http://www.w3.org/2000/svg",i);break;case 2:r=s.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;default:switch(i){case"svg":r=s.createElementNS("http://www.w3.org/2000/svg",i);break;case"math":r=s.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;case"script":r=s.createElement("div"),r.innerHTML="<script><\/script>",r=r.removeChild(r.firstChild);break;case"select":r=typeof a.is=="string"?s.createElement("select",{is:a.is}):s.createElement("select"),a.multiple?r.multiple=!0:a.size&&(r.size=a.size);break;default:r=typeof a.is=="string"?s.createElement(i,{is:a.is}):s.createElement(i)}}r[zt]=t,r[$t]=a;t:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)r.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break t;for(;s.sibling===null;){if(s.return===null||s.return===t)break t;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=r;t:switch(Bt(r,i,a),i){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break t;case"img":a=!0;break t;default:a=!1}a&&qe(t)}}return rt(t),Eo(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==a&&qe(t);else{if(typeof a!="string"&&t.stateNode===null)throw Error(M(166));if(e=Rn.current,Ea(t)){if(e=t.stateNode,n=t.memoizedProps,a=null,i=Rt,i!==null)switch(i.tag){case 27:case 5:a=i.memoizedProps}e[zt]=t,e=!!(e.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||_m(e.nodeValue,n)),e||Xn(t,!0)}else e=xl(e).createTextNode(a),e[zt]=t,t.stateNode=e}return rt(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(a=Ea(t),n!==null){if(e===null){if(!a)throw Error(M(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(M(557));e[zt]=t}else ya(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;rt(t),e=!1}else n=ko(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(ae(t),t):(ae(t),null);if(t.flags&128)throw Error(M(558))}return rt(t),null;case 13:if(a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(i=Ea(t),a!==null&&a.dehydrated!==null){if(e===null){if(!i)throw Error(M(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(M(317));i[zt]=t}else ya(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;rt(t),i=!1}else i=ko(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),i=!0;if(!i)return t.flags&256?(ae(t),t):(ae(t),null)}return ae(t),t.flags&128?(t.lanes=n,t):(n=a!==null,e=e!==null&&e.memoizedState!==null,n&&(a=t.child,i=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(i=a.alternate.memoizedState.cachePool.pool),r=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(r=a.memoizedState.cachePool.pool),r!==i&&(a.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),os(t,t.updateQueue),rt(t),null);case 4:return ri(),e===null&&hu(t.stateNode.containerInfo),rt(t),null;case 10:return on(t.type),rt(t),null;case 19:if(Ot(mt),a=t.memoizedState,a===null)return rt(t),null;if(i=(t.flags&128)!==0,r=a.rendering,r===null)if(i)zi(a,!1);else{if(pt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(r=ol(e),r!==null){for(t.flags|=128,zi(a,!1),e=r.updateQueue,t.updateQueue=e,os(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Np(n,e),n=n.sibling;return at(mt,mt.current&1|2),F&&We(t,a.treeForkCount),t.child}e=e.sibling}a.tail!==null&&se()>pl&&(t.flags|=128,i=!0,zi(a,!1),t.lanes=4194304)}else{if(!i)if(e=ol(r),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,os(t,e),zi(a,!0),a.tail===null&&a.tailMode==="hidden"&&!r.alternate&&!F)return rt(t),null}else 2*se()-a.renderingStartTime>pl&&n!==536870912&&(t.flags|=128,i=!0,zi(a,!1),t.lanes=4194304);a.isBackwards?(r.sibling=t.child,t.child=r):(e=a.last,e!==null?e.sibling=r:t.child=r,a.last=r)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=se(),e.sibling=null,n=mt.current,at(mt,i?n&1|2:n&1),F&&We(t,a.treeForkCount),e):(rt(t),null);case 22:case 23:return ae(t),Fd(),a=t.memoizedState!==null,e!==null?e.memoizedState!==null!==a&&(t.flags|=8192):a&&(t.flags|=8192),a?n&536870912&&!(t.flags&128)&&(rt(t),t.subtreeFlags&6&&(t.flags|=8192)):rt(t),n=t.updateQueue,n!==null&&os(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),a=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),a!==n&&(t.flags|=2048),e!==null&&Ot(ha),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),on(kt),rt(t),null;case 25:return null;case 30:return null}throw Error(M(156,t.tag))}function jv(e,t){switch(Vd(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return on(kt),ri(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return $s(t),null;case 31:if(t.memoizedState!==null){if(ae(t),t.alternate===null)throw Error(M(340));ya()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(ae(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(M(340));ya()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ot(mt),null;case 4:return ri(),null;case 10:return on(t.type),null;case 22:case 23:return ae(t),Fd(),e!==null&&Ot(ha),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return on(kt),null;case 25:return null;default:return null}}function Ng(e,t){switch(Vd(t),t.tag){case 3:on(kt),ri();break;case 26:case 27:case 5:$s(t);break;case 4:ri();break;case 31:t.memoizedState!==null&&ae(t);break;case 13:ae(t);break;case 19:Ot(mt);break;case 10:on(t.type);break;case 22:case 23:ae(t),Fd(),e!==null&&Ot(ha);break;case 24:on(kt)}}function Qr(e,t){try{var n=t.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var i=a.next;n=i;do{if((n.tag&e)===e){a=void 0;var r=n.create,s=n.inst;a=r(),s.destroy=a}n=n.next}while(n!==i)}}catch(l){I(t,t.return,l)}}function Fn(e,t,n){try{var a=t.updateQueue,i=a!==null?a.lastEffect:null;if(i!==null){var r=i.next;a=r;do{if((a.tag&e)===e){var s=a.inst,l=s.destroy;if(l!==void 0){s.destroy=void 0,i=t;var o=n,c=l;try{c()}catch(d){I(i,o,d)}}}a=a.next}while(a!==r)}}catch(d){I(t,t.return,d)}}function jg(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Qp(t,n)}catch(a){I(e,e.return,a)}}}function Hg(e,t,n){n.props=ka(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(a){I(e,t,a)}}function sr(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var a=e.stateNode;break;case 30:a=e.stateNode;break;default:a=e.stateNode}typeof n=="function"?e.refCleanup=n(a):n.current=a}}catch(i){I(e,t,i)}}function Be(e,t){var n=e.ref,a=e.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(i){I(e,t,i)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(i){I(e,t,i)}else n.current=null}function Ug(e){var t=e.type,n=e.memoizedProps,a=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break t;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(i){I(e,e.return,i)}}function zo(e,t,n){try{var a=e.stateNode;rx(a,e.type,n,t),a[$t]=t}catch(i){I(e,e.return,i)}}function Vg(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Wn(e.type)||e.tag===4}function Ro(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||Vg(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Wn(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Vc(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=en));else if(a!==4&&(a===27&&Wn(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Vc(e,t,n),e=e.sibling;e!==null;)Vc(e,t,n),e=e.sibling}function hl(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(a===27&&Wn(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(hl(e,t,n),e=e.sibling;e!==null;)hl(e,t,n),e=e.sibling}function Yg(e){var t=e.stateNode,n=e.memoizedProps;try{for(var a=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);Bt(t,a,n),t[zt]=e,t[$t]=n}catch(r){I(e,e.return,r)}}var $e=!1,_t=!1,Lo=!1,Hf=typeof WeakSet=="function"?WeakSet:Set,Tt=null;function Hv(e,t){if(e=e.containerInfo,Zc=wl,e=Dp(e),Bd(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else t:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var i=a.anchorOffset,r=a.focusNode;a=a.focusOffset;try{n.nodeType,r.nodeType}catch{n=null;break t}var s=0,l=-1,o=-1,c=0,d=0,u=e,f=null;e:for(;;){for(var h;u!==n||i!==0&&u.nodeType!==3||(l=s+i),u!==r||a!==0&&u.nodeType!==3||(o=s+a),u.nodeType===3&&(s+=u.nodeValue.length),(h=u.firstChild)!==null;)f=u,u=h;for(;;){if(u===e)break e;if(f===n&&++c===i&&(l=s),f===r&&++d===a&&(o=s),(h=u.nextSibling)!==null)break;u=f,f=u.parentNode}u=h}n=l===-1||o===-1?null:{start:l,end:o}}else n=null}n=n||{start:0,end:0}}else n=null;for(Kc={focusedElem:e,selectionRange:n},wl=!1,Tt=t;Tt!==null;)if(t=Tt,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,Tt=e;else for(;Tt!==null;){switch(t=Tt,r=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)i=e[n],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&r!==null){e=void 0,n=t,i=r.memoizedProps,r=r.memoizedState,a=n.stateNode;try{var m=ka(n.type,i);e=a.getSnapshotBeforeUpdate(m,r),a.__reactInternalSnapshotBeforeUpdate=e}catch(b){I(n,n.return,b)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)Wc(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Wc(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(M(163))}if(e=t.sibling,e!==null){e.return=t.return,Tt=e;break}Tt=t.return}}function Gg(e,t,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:Fe(e,n),a&4&&Qr(5,n);break;case 1:if(Fe(e,n),a&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(s){I(n,n.return,s)}else{var i=ka(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(s){I(n,n.return,s)}}a&64&&jg(n),a&512&&sr(n,n.return);break;case 3:if(Fe(e,n),a&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Qp(e,t)}catch(s){I(n,n.return,s)}}break;case 27:t===null&&a&4&&Yg(n);case 26:case 5:Fe(e,n),t===null&&a&4&&Ug(n),a&512&&sr(n,n.return);break;case 12:Fe(e,n);break;case 31:Fe(e,n),a&4&&Fg(e,n);break;case 13:Fe(e,n),a&4&&Qg(e,n),a&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Zv.bind(null,n),hx(e,n))));break;case 22:if(a=n.memoizedState!==null||$e,!a){t=t!==null&&t.memoizedState!==null||_t,i=$e;var r=_t;$e=a,(_t=t)&&!r?Ze(e,n,(n.subtreeFlags&8772)!==0):Fe(e,n),$e=i,_t=r}break;case 30:break;default:Fe(e,n)}}function qg(e){var t=e.alternate;t!==null&&(e.alternate=null,qg(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Cd(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var dt=null,Pt=!1;function Xe(e,t,n){for(n=n.child;n!==null;)Xg(e,t,n),n=n.sibling}function Xg(e,t,n){if(le&&typeof le.onCommitFiberUnmount=="function")try{le.onCommitFiberUnmount(Ur,n)}catch{}switch(n.tag){case 26:_t||Be(n,t),Xe(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:_t||Be(n,t);var a=dt,i=Pt;Wn(n.type)&&(dt=n.stateNode,Pt=!1),Xe(e,t,n),dr(n.stateNode),dt=a,Pt=i;break;case 5:_t||Be(n,t);case 6:if(a=dt,i=Pt,dt=null,Xe(e,t,n),dt=a,Pt=i,dt!==null)if(Pt)try{(dt.nodeType===9?dt.body:dt.nodeName==="HTML"?dt.ownerDocument.body:dt).removeChild(n.stateNode)}catch(r){I(n,t,r)}else try{dt.removeChild(n.stateNode)}catch(r){I(n,t,r)}break;case 18:dt!==null&&(Pt?(e=dt,Jf(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),gi(e)):Jf(dt,n.stateNode));break;case 4:a=dt,i=Pt,dt=n.stateNode.containerInfo,Pt=!0,Xe(e,t,n),dt=a,Pt=i;break;case 0:case 11:case 14:case 15:Fn(2,n,t),_t||Fn(4,n,t),Xe(e,t,n);break;case 1:_t||(Be(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"&&Hg(n,t,a)),Xe(e,t,n);break;case 21:Xe(e,t,n);break;case 22:_t=(a=_t)||n.memoizedState!==null,Xe(e,t,n),_t=a;break;default:Xe(e,t,n)}}function Fg(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{gi(e)}catch(n){I(t,t.return,n)}}}function Qg(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{gi(e)}catch(n){I(t,t.return,n)}}function Uv(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Hf),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Hf),t;default:throw Error(M(435,e.tag))}}function cs(e,t){var n=Uv(e);t.forEach(function(a){if(!n.has(a)){n.add(a);var i=Kv.bind(null,e,a);a.then(i,i)}})}function Qt(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var i=n[a],r=e,s=t,l=s;t:for(;l!==null;){switch(l.tag){case 27:if(Wn(l.type)){dt=l.stateNode,Pt=!1;break t}break;case 5:dt=l.stateNode,Pt=!1;break t;case 3:case 4:dt=l.stateNode.containerInfo,Pt=!0;break t}l=l.return}if(dt===null)throw Error(M(160));Xg(r,s,i),dt=null,Pt=!1,r=i.alternate,r!==null&&(r.return=null),i.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Zg(t,e),t=t.sibling}var Me=null;function Zg(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Qt(t,e),Zt(e),a&4&&(Fn(3,e,e.return),Qr(3,e),Fn(5,e,e.return));break;case 1:Qt(t,e),Zt(e),a&512&&(_t||n===null||Be(n,n.return)),a&64&&$e&&(e=e.updateQueue,e!==null&&(a=e.callbacks,a!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var i=Me;if(Qt(t,e),Zt(e),a&512&&(_t||n===null||Be(n,n.return)),a&4){var r=n!==null?n.memoizedState:null;if(a=e.memoizedState,n===null)if(a===null)if(e.stateNode===null){t:{a=e.type,n=e.memoizedProps,i=i.ownerDocument||i;e:switch(a){case"title":r=i.getElementsByTagName("title")[0],(!r||r[Gr]||r[zt]||r.namespaceURI==="http://www.w3.org/2000/svg"||r.hasAttribute("itemprop"))&&(r=i.createElement(a),i.head.insertBefore(r,i.querySelector("head > title"))),Bt(r,a,n),r[zt]=e,Dt(r),a=r;break t;case"link":var s=ih("link","href",i).get(a+(n.href||""));if(s){for(var l=0;l<s.length;l++)if(r=s[l],r.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&r.getAttribute("rel")===(n.rel==null?null:n.rel)&&r.getAttribute("title")===(n.title==null?null:n.title)&&r.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(l,1);break e}}r=i.createElement(a),Bt(r,a,n),i.head.appendChild(r);break;case"meta":if(s=ih("meta","content",i).get(a+(n.content||""))){for(l=0;l<s.length;l++)if(r=s[l],r.getAttribute("content")===(n.content==null?null:""+n.content)&&r.getAttribute("name")===(n.name==null?null:n.name)&&r.getAttribute("property")===(n.property==null?null:n.property)&&r.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute("charset")===(n.charSet==null?null:n.charSet)){s.splice(l,1);break e}}r=i.createElement(a),Bt(r,a,n),i.head.appendChild(r);break;default:throw Error(M(468,a))}r[zt]=e,Dt(r),a=r}e.stateNode=a}else rh(i,e.type,e.stateNode);else e.stateNode=ah(i,a,e.memoizedProps);else r!==a?(r===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):r.count--,a===null?rh(i,e.type,e.stateNode):ah(i,a,e.memoizedProps)):a===null&&e.stateNode!==null&&zo(e,e.memoizedProps,n.memoizedProps)}break;case 27:Qt(t,e),Zt(e),a&512&&(_t||n===null||Be(n,n.return)),n!==null&&a&4&&zo(e,e.memoizedProps,n.memoizedProps);break;case 5:if(Qt(t,e),Zt(e),a&512&&(_t||n===null||Be(n,n.return)),e.flags&32){i=e.stateNode;try{li(i,"")}catch(m){I(e,e.return,m)}}a&4&&e.stateNode!=null&&(i=e.memoizedProps,zo(e,i,n!==null?n.memoizedProps:i)),a&1024&&(Lo=!0);break;case 6:if(Qt(t,e),Zt(e),a&4){if(e.stateNode===null)throw Error(M(162));a=e.memoizedProps,n=e.stateNode;try{n.nodeValue=a}catch(m){I(e,e.return,m)}}break;case 3:if(Us=null,i=Me,Me=_l(t.containerInfo),Qt(t,e),Me=i,Zt(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{gi(t.containerInfo)}catch(m){I(e,e.return,m)}Lo&&(Lo=!1,Kg(e));break;case 4:a=Me,Me=_l(e.stateNode.containerInfo),Qt(t,e),Zt(e),Me=a;break;case 12:Qt(t,e),Zt(e);break;case 31:Qt(t,e),Zt(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,cs(e,a)));break;case 13:Qt(t,e),Zt(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Kl=se()),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,cs(e,a)));break;case 22:i=e.memoizedState!==null;var o=n!==null&&n.memoizedState!==null,c=$e,d=_t;if($e=c||i,_t=d||o,Qt(t,e),_t=d,$e=c,Zt(e),a&8192)t:for(t=e.stateNode,t._visibility=i?t._visibility&-2:t._visibility|1,i&&(n===null||o||$e||_t||la(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){o=n=t;try{if(r=o.stateNode,i)s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none";else{l=o.stateNode;var u=o.memoizedProps.style,f=u!=null&&u.hasOwnProperty("display")?u.display:null;l.style.display=f==null||typeof f=="boolean"?"":(""+f).trim()}}catch(m){I(o,o.return,m)}}}else if(t.tag===6){if(n===null){o=t;try{o.stateNode.nodeValue=i?"":o.memoizedProps}catch(m){I(o,o.return,m)}}}else if(t.tag===18){if(n===null){o=t;try{var h=o.stateNode;i?If(h,!0):If(o.stateNode,!1)}catch(m){I(o,o.return,m)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}a&4&&(a=e.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,cs(e,n))));break;case 19:Qt(t,e),Zt(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,cs(e,a)));break;case 30:break;case 21:break;default:Qt(t,e),Zt(e)}}function Zt(e){var t=e.flags;if(t&2){try{for(var n,a=e.return;a!==null;){if(Vg(a)){n=a;break}a=a.return}if(n==null)throw Error(M(160));switch(n.tag){case 27:var i=n.stateNode,r=Ro(e);hl(e,r,i);break;case 5:var s=n.stateNode;n.flags&32&&(li(s,""),n.flags&=-33);var l=Ro(e);hl(e,l,s);break;case 3:case 4:var o=n.stateNode.containerInfo,c=Ro(e);Vc(e,c,o);break;default:throw Error(M(161))}}catch(d){I(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Kg(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Kg(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Fe(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Gg(e,t.alternate,t),t=t.sibling}function la(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Fn(4,t,t.return),la(t);break;case 1:Be(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&Hg(t,t.return,n),la(t);break;case 27:dr(t.stateNode);case 26:case 5:Be(t,t.return),la(t);break;case 22:t.memoizedState===null&&la(t);break;case 30:la(t);break;default:la(t)}e=e.sibling}}function Ze(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var a=t.alternate,i=e,r=t,s=r.flags;switch(r.tag){case 0:case 11:case 15:Ze(i,r,n),Qr(4,r);break;case 1:if(Ze(i,r,n),a=r,i=a.stateNode,typeof i.componentDidMount=="function")try{i.componentDidMount()}catch(c){I(a,a.return,c)}if(a=r,i=a.updateQueue,i!==null){var l=a.stateNode;try{var o=i.shared.hiddenCallbacks;if(o!==null)for(i.shared.hiddenCallbacks=null,i=0;i<o.length;i++)Fp(o[i],l)}catch(c){I(a,a.return,c)}}n&&s&64&&jg(r),sr(r,r.return);break;case 27:Yg(r);case 26:case 5:Ze(i,r,n),n&&a===null&&s&4&&Ug(r),sr(r,r.return);break;case 12:Ze(i,r,n);break;case 31:Ze(i,r,n),n&&s&4&&Fg(i,r);break;case 13:Ze(i,r,n),n&&s&4&&Qg(i,r);break;case 22:r.memoizedState===null&&Ze(i,r,n),sr(r,r.return);break;case 30:break;default:Ze(i,r,n)}t=t.sibling}}function lu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Xr(n))}function ou(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Xr(e))}function we(e,t,n,a){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Pg(e,t,n,a),t=t.sibling}function Pg(e,t,n,a){var i=t.flags;switch(t.tag){case 0:case 11:case 15:we(e,t,n,a),i&2048&&Qr(9,t);break;case 1:we(e,t,n,a);break;case 3:we(e,t,n,a),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Xr(e)));break;case 12:if(i&2048){we(e,t,n,a),e=t.stateNode;try{var r=t.memoizedProps,s=r.id,l=r.onPostCommit;typeof l=="function"&&l(s,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(o){I(t,t.return,o)}}else we(e,t,n,a);break;case 31:we(e,t,n,a);break;case 13:we(e,t,n,a);break;case 23:break;case 22:r=t.stateNode,s=t.alternate,t.memoizedState!==null?r._visibility&2?we(e,t,n,a):lr(e,t):r._visibility&2?we(e,t,n,a):(r._visibility|=2,ja(e,t,n,a,(t.subtreeFlags&10256)!==0||!1)),i&2048&&lu(s,t);break;case 24:we(e,t,n,a),i&2048&&ou(t.alternate,t);break;default:we(e,t,n,a)}}function ja(e,t,n,a,i){for(i=i&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var r=e,s=t,l=n,o=a,c=s.flags;switch(s.tag){case 0:case 11:case 15:ja(r,s,l,o,i),Qr(8,s);break;case 23:break;case 22:var d=s.stateNode;s.memoizedState!==null?d._visibility&2?ja(r,s,l,o,i):lr(r,s):(d._visibility|=2,ja(r,s,l,o,i)),i&&c&2048&&lu(s.alternate,s);break;case 24:ja(r,s,l,o,i),i&&c&2048&&ou(s.alternate,s);break;default:ja(r,s,l,o,i)}t=t.sibling}}function lr(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,a=t,i=a.flags;switch(a.tag){case 22:lr(n,a),i&2048&&lu(a.alternate,a);break;case 24:lr(n,a),i&2048&&ou(a.alternate,a);break;default:lr(n,a)}t=t.sibling}}var Xi=8192;function za(e,t,n){if(e.subtreeFlags&Xi)for(e=e.child;e!==null;)Wg(e,t,n),e=e.sibling}function Wg(e,t,n){switch(e.tag){case 26:za(e,t,n),e.flags&Xi&&e.memoizedState!==null&&Mx(n,Me,e.memoizedState,e.memoizedProps);break;case 5:za(e,t,n);break;case 3:case 4:var a=Me;Me=_l(e.stateNode.containerInfo),za(e,t,n),Me=a;break;case 22:e.memoizedState===null&&(a=e.alternate,a!==null&&a.memoizedState!==null?(a=Xi,Xi=16777216,za(e,t,n),Xi=a):za(e,t,n));break;default:za(e,t,n)}}function Jg(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ri(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];Tt=a,$g(a,e)}Jg(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ig(e),e=e.sibling}function Ig(e){switch(e.tag){case 0:case 11:case 15:Ri(e),e.flags&2048&&Fn(9,e,e.return);break;case 3:Ri(e);break;case 12:Ri(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,js(e)):Ri(e);break;default:Ri(e)}}function js(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];Tt=a,$g(a,e)}Jg(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Fn(8,t,t.return),js(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,js(t));break;default:js(t)}e=e.sibling}}function $g(e,t){for(;Tt!==null;){var n=Tt;switch(n.tag){case 0:case 11:case 15:Fn(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:Xr(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,Tt=a;else t:for(n=e;Tt!==null;){a=Tt;var i=a.sibling,r=a.return;if(qg(a),a===n){Tt=null;break t}if(i!==null){i.return=r,Tt=i;break t}Tt=r}}}var Vv={getCacheForType:function(e){var t=Lt(kt),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Lt(kt).controller.signal}},Yv=typeof WeakMap=="function"?WeakMap:Map,K=0,et=null,Y=null,q=0,W=0,ne=null,Mn=!1,Mi=!1,cu=!1,pn=0,pt=0,Qn=0,ga=0,du=0,re=0,ui=0,or=null,Wt=null,Yc=!1,Kl=0,tm=0,pl=1/0,gl=null,jn=null,wt=0,Hn=null,fi=null,cn=0,Gc=0,qc=null,em=null,cr=0,Xc=null;function ce(){return K&2&&q!==0?q&-q:L.T!==null?fu():dp()}function nm(){if(re===0)if(!(q&536870912)||F){var e=es;es<<=1,!(es&3932160)&&(es=262144),re=e}else re=536870912;return e=ue.current,e!==null&&(e.flags|=32),re}function It(e,t,n){(e===et&&(W===2||W===9)||e.cancelPendingCommit!==null)&&(hi(e,0),An(e,q,re,!1)),Yr(e,n),(!(K&2)||e!==et)&&(e===et&&(!(K&2)&&(ga|=n),pt===4&&An(e,q,re,!1)),Ue(e))}function am(e,t,n){if(K&6)throw Error(M(327));var a=!n&&(t&127)===0&&(t&e.expiredLanes)===0||Vr(e,t),i=a?Xv(e,t):Bo(e,t,!0),r=a;do{if(i===0){Mi&&!a&&An(e,t,0,!1);break}else{if(n=e.current.alternate,r&&!Gv(n)){i=Bo(e,t,!1),r=!1;continue}if(i===2){if(r=t,e.errorRecoveryDisabledLanes&r)var s=0;else s=e.pendingLanes&-536870913,s=s!==0?s:s&536870912?536870912:0;if(s!==0){t=s;t:{var l=e;i=or;var o=l.current.memoizedState.isDehydrated;if(o&&(hi(l,s).flags|=256),s=Bo(l,s,!1),s!==2){if(cu&&!o){l.errorRecoveryDisabledLanes|=r,ga|=r,i=4;break t}r=Wt,Wt=i,r!==null&&(Wt===null?Wt=r:Wt.push.apply(Wt,r))}i=s}if(r=!1,i!==2)continue}}if(i===1){hi(e,0),An(e,t,0,!0);break}t:{switch(a=e,r=i,r){case 0:case 1:throw Error(M(345));case 4:if((t&4194048)!==t)break;case 6:An(a,t,re,!Mn);break t;case 2:Wt=null;break;case 3:case 5:break;default:throw Error(M(329))}if((t&62914560)===t&&(i=Kl+300-se(),10<i)){if(An(a,t,re,!Mn),jl(a,0,!0)!==0)break t;cn=t,a.timeoutHandle=Sm(Uf.bind(null,a,n,Wt,gl,Yc,t,re,ga,ui,Mn,r,"Throttled",-0,0),i);break t}Uf(a,n,Wt,gl,Yc,t,re,ga,ui,Mn,r,null,-0,0)}}break}while(!0);Ue(e)}function Uf(e,t,n,a,i,r,s,l,o,c,d,u,f,h){if(e.timeoutHandle=-1,u=t.subtreeFlags,u&8192||(u&16785408)===16785408){u={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:en},Wg(t,r,u);var m=(r&62914560)===r?Kl-se():(r&4194048)===r?tm-se():0;if(m=Ax(u,m),m!==null){cn=r,e.cancelPendingCommit=m(Yf.bind(null,e,t,r,n,a,i,s,l,o,d,u,null,f,h)),An(e,r,s,!c);return}}Yf(e,t,r,n,a,i,s,l,o)}function Gv(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var i=n[a],r=i.getSnapshot;i=i.value;try{if(!de(r(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function An(e,t,n,a){t&=~du,t&=~ga,e.suspendedLanes|=t,e.pingedLanes&=~t,a&&(e.warmLanes|=t),a=e.expirationTimes;for(var i=t;0<i;){var r=31-oe(i),s=1<<r;a[r]=-1,i&=~s}n!==0&&lp(e,n,t)}function Pl(){return K&6?!0:(Zr(0),!1)}function uu(){if(Y!==null){if(W===0)var e=Y.return;else e=Y,nn=Ca=null,Wd(e),ei=null,kr=0,e=Y;for(;e!==null;)Ng(e.alternate,e),e=e.return;Y=null}}function hi(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,ox(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),cn=0,uu(),et=e,Y=n=ln(e.current,null),q=t,W=0,ne=null,Mn=!1,Mi=Vr(e,t),cu=!1,ui=re=du=ga=Qn=pt=0,Wt=or=null,Yc=!1,t&8&&(t|=t&32);var a=e.entangledLanes;if(a!==0)for(e=e.entanglements,a&=t;0<a;){var i=31-oe(a),r=1<<i;t|=e[i],a&=~r}return pn=t,Yl(),n}function im(e,t){H=null,L.H=wr,t===wi||t===ql?(t=bf(),W=3):t===qd?(t=bf(),W=4):W=t===ru?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,ne=t,Y===null&&(pt=1,ul(e,ye(t,e.current)))}function rm(){var e=ue.current;return e===null?!0:(q&4194048)===q?xe===null:(q&62914560)===q||q&536870912?e===xe:!1}function sm(){var e=L.H;return L.H=wr,e===null?wr:e}function lm(){var e=L.A;return L.A=Vv,e}function ml(){pt=4,Mn||(q&4194048)!==q&&ue.current!==null||(Mi=!0),!(Qn&134217727)&&!(ga&134217727)||et===null||An(et,q,re,!1)}function Bo(e,t,n){var a=K;K|=2;var i=sm(),r=lm();(et!==e||q!==t)&&(gl=null,hi(e,t)),t=!1;var s=pt;t:do try{if(W!==0&&Y!==null){var l=Y,o=ne;switch(W){case 8:uu(),s=6;break t;case 3:case 2:case 9:case 6:ue.current===null&&(t=!0);var c=W;if(W=0,ne=null,Wa(e,l,o,c),n&&Mi){s=0;break t}break;default:c=W,W=0,ne=null,Wa(e,l,o,c)}}qv(),s=pt;break}catch(d){im(e,d)}while(!0);return t&&e.shellSuspendCounter++,nn=Ca=null,K=a,L.H=i,L.A=r,Y===null&&(et=null,q=0,Yl()),s}function qv(){for(;Y!==null;)om(Y)}function Xv(e,t){var n=K;K|=2;var a=sm(),i=lm();et!==e||q!==t?(gl=null,pl=se()+500,hi(e,t)):Mi=Vr(e,t);t:do try{if(W!==0&&Y!==null){t=Y;var r=ne;e:switch(W){case 1:W=0,ne=null,Wa(e,t,r,1);break;case 2:case 9:if(mf(r)){W=0,ne=null,Vf(t);break}t=function(){W!==2&&W!==9||et!==e||(W=7),Ue(e)},r.then(t,t);break t;case 3:W=7;break t;case 4:W=5;break t;case 7:mf(r)?(W=0,ne=null,Vf(t)):(W=0,ne=null,Wa(e,t,r,7));break;case 5:var s=null;switch(Y.tag){case 26:s=Y.memoizedState;case 5:case 27:var l=Y;if(s?Dm(s):l.stateNode.complete){W=0,ne=null;var o=l.sibling;if(o!==null)Y=o;else{var c=l.return;c!==null?(Y=c,Wl(c)):Y=null}break e}}W=0,ne=null,Wa(e,t,r,5);break;case 6:W=0,ne=null,Wa(e,t,r,6);break;case 8:uu(),pt=6;break t;default:throw Error(M(462))}}Fv();break}catch(d){im(e,d)}while(!0);return nn=Ca=null,L.H=a,L.A=i,K=n,Y!==null?0:(et=null,q=0,Yl(),pt)}function Fv(){for(;Y!==null&&!py();)om(Y)}function om(e){var t=Bg(e.alternate,e,pn);e.memoizedProps=e.pendingProps,t===null?Wl(e):Y=t}function Vf(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Rf(n,t,t.pendingProps,t.type,void 0,q);break;case 11:t=Rf(n,t,t.pendingProps,t.type.render,t.ref,q);break;case 5:Wd(t);default:Ng(n,t),t=Y=Np(t,pn),t=Bg(n,t,pn)}e.memoizedProps=e.pendingProps,t===null?Wl(e):Y=t}function Wa(e,t,n,a){nn=Ca=null,Wd(t),ei=null,kr=0;var i=t.return;try{if(Rv(e,i,t,n,q)){pt=1,ul(e,ye(n,e.current)),Y=null;return}}catch(r){if(i!==null)throw Y=i,r;pt=1,ul(e,ye(n,e.current)),Y=null;return}t.flags&32768?(F||a===1?e=!0:Mi||q&536870912?e=!1:(Mn=e=!0,(a===2||a===9||a===3||a===6)&&(a=ue.current,a!==null&&a.tag===13&&(a.flags|=16384))),cm(t,e)):Wl(t)}function Wl(e){var t=e;do{if(t.flags&32768){cm(t,Mn);return}e=t.return;var n=Nv(t.alternate,t,pn);if(n!==null){Y=n;return}if(t=t.sibling,t!==null){Y=t;return}Y=t=e}while(t!==null);pt===0&&(pt=5)}function cm(e,t){do{var n=jv(e.alternate,e);if(n!==null){n.flags&=32767,Y=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Y=e;return}Y=e=n}while(e!==null);pt=6,Y=null}function Yf(e,t,n,a,i,r,s,l,o){e.cancelPendingCommit=null;do Jl();while(wt!==0);if(K&6)throw Error(M(327));if(t!==null){if(t===e.current)throw Error(M(177));if(r=t.lanes|t.childLanes,r|=Nd,wy(e,n,r,s,l,o),e===et&&(Y=et=null,q=0),fi=t,Hn=e,cn=n,Gc=r,qc=i,em=a,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Pv(tl,function(){return pm(),null})):(e.callbackNode=null,e.callbackPriority=0),a=(t.flags&13878)!==0,t.subtreeFlags&13878||a){a=L.T,L.T=null,i=P.p,P.p=2,s=K,K|=4;try{Hv(e,t,n)}finally{K=s,P.p=i,L.T=a}}wt=1,dm(),um(),fm()}}function dm(){if(wt===1){wt=0;var e=Hn,t=fi,n=(t.flags&13878)!==0;if(t.subtreeFlags&13878||n){n=L.T,L.T=null;var a=P.p;P.p=2;var i=K;K|=4;try{Zg(t,e);var r=Kc,s=Dp(e.containerInfo),l=r.focusedElem,o=r.selectionRange;if(s!==l&&l&&l.ownerDocument&&Tp(l.ownerDocument.documentElement,l)){if(o!==null&&Bd(l)){var c=o.start,d=o.end;if(d===void 0&&(d=c),"selectionStart"in l)l.selectionStart=c,l.selectionEnd=Math.min(d,l.value.length);else{var u=l.ownerDocument||document,f=u&&u.defaultView||window;if(f.getSelection){var h=f.getSelection(),m=l.textContent.length,b=Math.min(o.start,m),v=o.end===void 0?b:Math.min(o.end,m);!h.extend&&b>v&&(s=v,v=b,b=s);var p=cf(l,b),g=cf(l,v);if(p&&g&&(h.rangeCount!==1||h.anchorNode!==p.node||h.anchorOffset!==p.offset||h.focusNode!==g.node||h.focusOffset!==g.offset)){var y=u.createRange();y.setStart(p.node,p.offset),h.removeAllRanges(),b>v?(h.addRange(y),h.extend(g.node,g.offset)):(y.setEnd(g.node,g.offset),h.addRange(y))}}}}for(u=[],h=l;h=h.parentNode;)h.nodeType===1&&u.push({element:h,left:h.scrollLeft,top:h.scrollTop});for(typeof l.focus=="function"&&l.focus(),l=0;l<u.length;l++){var x=u[l];x.element.scrollLeft=x.left,x.element.scrollTop=x.top}}wl=!!Zc,Kc=Zc=null}finally{K=i,P.p=a,L.T=n}}e.current=t,wt=2}}function um(){if(wt===2){wt=0;var e=Hn,t=fi,n=(t.flags&8772)!==0;if(t.subtreeFlags&8772||n){n=L.T,L.T=null;var a=P.p;P.p=2;var i=K;K|=4;try{Gg(e,t.alternate,t)}finally{K=i,P.p=a,L.T=n}}wt=3}}function fm(){if(wt===4||wt===3){wt=0,gy();var e=Hn,t=fi,n=cn,a=em;t.subtreeFlags&10256||t.flags&10256?wt=5:(wt=0,fi=Hn=null,hm(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(jn=null),Dd(n),t=t.stateNode,le&&typeof le.onCommitFiberRoot=="function")try{le.onCommitFiberRoot(Ur,t,void 0,(t.current.flags&128)===128)}catch{}if(a!==null){t=L.T,i=P.p,P.p=2,L.T=null;try{for(var r=e.onRecoverableError,s=0;s<a.length;s++){var l=a[s];r(l.value,{componentStack:l.stack})}}finally{L.T=t,P.p=i}}cn&3&&Jl(),Ue(e),i=e.pendingLanes,n&261930&&i&42?e===Xc?cr++:(cr=0,Xc=e):cr=0,Zr(0)}}function hm(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Xr(t)))}function Jl(){return dm(),um(),fm(),pm()}function pm(){if(wt!==5)return!1;var e=Hn,t=Gc;Gc=0;var n=Dd(cn),a=L.T,i=P.p;try{P.p=32>n?32:n,L.T=null,n=qc,qc=null;var r=Hn,s=cn;if(wt=0,fi=Hn=null,cn=0,K&6)throw Error(M(331));var l=K;if(K|=4,Ig(r.current),Pg(r,r.current,s,n),K=l,Zr(0,!1),le&&typeof le.onPostCommitFiberRoot=="function")try{le.onPostCommitFiberRoot(Ur,r)}catch{}return!0}finally{P.p=i,L.T=a,hm(e,t)}}function Gf(e,t,n){t=ye(n,t),t=jc(e.stateNode,t,2),e=Nn(e,t,2),e!==null&&(Yr(e,2),Ue(e))}function I(e,t,n){if(e.tag===3)Gf(e,e,n);else for(;t!==null;){if(t.tag===3){Gf(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(jn===null||!jn.has(a))){e=ye(n,e),n=Cg(2),a=Nn(t,n,2),a!==null&&(Og(n,a,t,e),Yr(a,2),Ue(a));break}}t=t.return}}function No(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new Yv;var i=new Set;a.set(t,i)}else i=a.get(t),i===void 0&&(i=new Set,a.set(t,i));i.has(n)||(cu=!0,i.add(n),e=Qv.bind(null,e,t,n),t.then(e,e))}function Qv(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,et===e&&(q&n)===n&&(pt===4||pt===3&&(q&62914560)===q&&300>se()-Kl?!(K&2)&&hi(e,0):du|=n,ui===q&&(ui=0)),Ue(e)}function gm(e,t){t===0&&(t=sp()),e=Da(e,t),e!==null&&(Yr(e,t),Ue(e))}function Zv(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),gm(e,n)}function Kv(e,t){var n=0;switch(e.tag){case 31:case 13:var a=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:a=e.stateNode;break;case 22:a=e.stateNode._retryCache;break;default:throw Error(M(314))}a!==null&&a.delete(t),gm(e,n)}function Pv(e,t){return Ad(e,t)}var bl=null,Ha=null,Fc=!1,yl=!1,jo=!1,Tn=0;function Ue(e){e!==Ha&&e.next===null&&(Ha===null?bl=Ha=e:Ha=Ha.next=e),yl=!0,Fc||(Fc=!0,Jv())}function Zr(e,t){if(!jo&&yl){jo=!0;do for(var n=!1,a=bl;a!==null;){if(e!==0){var i=a.pendingLanes;if(i===0)var r=0;else{var s=a.suspendedLanes,l=a.pingedLanes;r=(1<<31-oe(42|e)+1)-1,r&=i&~(s&~l),r=r&201326741?r&201326741|1:r?r|2:0}r!==0&&(n=!0,qf(a,r))}else r=q,r=jl(a,a===et?r:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),!(r&3)||Vr(a,r)||(n=!0,qf(a,r));a=a.next}while(n);jo=!1}}function Wv(){mm()}function mm(){yl=Fc=!1;var e=0;Tn!==0&&lx()&&(e=Tn);for(var t=se(),n=null,a=bl;a!==null;){var i=a.next,r=bm(a,t);r===0?(a.next=null,n===null?bl=i:n.next=i,i===null&&(Ha=n)):(n=a,(e!==0||r&3)&&(yl=!0)),a=i}wt!==0&&wt!==5||Zr(e),Tn!==0&&(Tn=0)}function bm(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,i=e.expirationTimes,r=e.pendingLanes&-62914561;0<r;){var s=31-oe(r),l=1<<s,o=i[s];o===-1?(!(l&n)||l&a)&&(i[s]=Sy(l,t)):o<=t&&(e.expiredLanes|=l),r&=~l}if(t=et,n=q,n=jl(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a=e.callbackNode,n===0||e===t&&(W===2||W===9)||e.cancelPendingCommit!==null)return a!==null&&a!==null&&uo(a),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Vr(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(a!==null&&uo(a),Dd(n)){case 2:case 8:n=ip;break;case 32:n=tl;break;case 268435456:n=rp;break;default:n=tl}return a=ym.bind(null,e),n=Ad(n,a),e.callbackPriority=t,e.callbackNode=n,t}return a!==null&&a!==null&&uo(a),e.callbackPriority=2,e.callbackNode=null,2}function ym(e,t){if(wt!==0&&wt!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Jl()&&e.callbackNode!==n)return null;var a=q;return a=jl(e,e===et?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a===0?null:(am(e,a,t),bm(e,se()),e.callbackNode!=null&&e.callbackNode===n?ym.bind(null,e):null)}function qf(e,t){if(Jl())return null;am(e,t,!0)}function Jv(){cx(function(){K&6?Ad(ap,Wv):mm()})}function fu(){if(Tn===0){var e=oi;e===0&&(e=ts,ts<<=1,!(ts&261888)&&(ts=256)),Tn=e}return Tn}function Xf(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ds(""+e)}function Ff(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function Iv(e,t,n,a,i){if(t==="submit"&&n&&n.stateNode===i){var r=Xf((i[$t]||null).action),s=a.submitter;s&&(t=(t=s[$t]||null)?Xf(t.formAction):s.getAttribute("formAction"),t!==null&&(r=t,s=null));var l=new Hl("action","action",null,a,i);e.push({event:l,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(Tn!==0){var o=s?Ff(i,s):new FormData(i);Bc(n,{pending:!0,data:o,method:i.method,action:r},null,o)}}else typeof r=="function"&&(l.preventDefault(),o=s?Ff(i,s):new FormData(i),Bc(n,{pending:!0,data:o,method:i.method,action:r},r,o))},currentTarget:i}]})}}for(var Ho=0;Ho<Sc.length;Ho++){var Uo=Sc[Ho],$v=Uo.toLowerCase(),tx=Uo[0].toUpperCase()+Uo.slice(1);Ce($v,"on"+tx)}Ce(Op,"onAnimationEnd");Ce(Ep,"onAnimationIteration");Ce(zp,"onAnimationStart");Ce("dblclick","onDoubleClick");Ce("focusin","onFocus");Ce("focusout","onBlur");Ce(mv,"onTransitionRun");Ce(bv,"onTransitionStart");Ce(yv,"onTransitionCancel");Ce(Rp,"onTransitionEnd");si("onMouseEnter",["mouseout","mouseover"]);si("onMouseLeave",["mouseout","mouseover"]);si("onPointerEnter",["pointerout","pointerover"]);si("onPointerLeave",["pointerout","pointerover"]);Ma("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ma("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ma("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ma("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ma("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ma("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Mr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ex=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Mr));function vm(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],i=a.event;a=a.listeners;t:{var r=void 0;if(t)for(var s=a.length-1;0<=s;s--){var l=a[s],o=l.instance,c=l.currentTarget;if(l=l.listener,o!==r&&i.isPropagationStopped())break t;r=l,i.currentTarget=c;try{r(i)}catch(d){nl(d)}i.currentTarget=null,r=o}else for(s=0;s<a.length;s++){if(l=a[s],o=l.instance,c=l.currentTarget,l=l.listener,o!==r&&i.isPropagationStopped())break t;r=l,i.currentTarget=c;try{r(i)}catch(d){nl(d)}i.currentTarget=null,r=o}}}}function V(e,t){var n=t[gc];n===void 0&&(n=t[gc]=new Set);var a=e+"__bubble";n.has(a)||(xm(t,e,2,!1),n.add(a))}function Vo(e,t,n){var a=0;t&&(a|=4),xm(n,e,a,t)}var ds="_reactListening"+Math.random().toString(36).slice(2);function hu(e){if(!e[ds]){e[ds]=!0,up.forEach(function(n){n!=="selectionchange"&&(ex.has(n)||Vo(n,!1,e),Vo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ds]||(t[ds]=!0,Vo("selectionchange",!1,t))}}function xm(e,t,n,a){switch(Rm(t)){case 2:var i=Cx;break;case 8:i=Ox;break;default:i=bu}n=i.bind(null,t,n,e),i=void 0,!xc||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),a?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Yo(e,t,n,a,i){var r=a;if(!(t&1)&&!(t&2)&&a!==null)t:for(;;){if(a===null)return;var s=a.tag;if(s===3||s===4){var l=a.stateNode.containerInfo;if(l===i)break;if(s===4)for(s=a.return;s!==null;){var o=s.tag;if((o===3||o===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;l!==null;){if(s=Ya(l),s===null)return;if(o=s.tag,o===5||o===6||o===26||o===27){a=r=s;continue t}l=l.parentNode}}a=a.return}vp(function(){var c=r,d=Ed(n),u=[];t:{var f=Lp.get(e);if(f!==void 0){var h=Hl,m=e;switch(e){case"keypress":if(Os(n)===0)break t;case"keydown":case"keyup":h=Ky;break;case"focusin":m="focus",h=mo;break;case"focusout":m="blur",h=mo;break;case"beforeblur":case"afterblur":h=mo;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":h=Iu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":h=Ny;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":h=Jy;break;case Op:case Ep:case zp:h=Uy;break;case Rp:h=$y;break;case"scroll":case"scrollend":h=Ly;break;case"wheel":h=ev;break;case"copy":case"cut":case"paste":h=Yy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":h=tf;break;case"toggle":case"beforetoggle":h=av}var b=(t&4)!==0,v=!b&&(e==="scroll"||e==="scrollend"),p=b?f!==null?f+"Capture":null:f;b=[];for(var g=c,y;g!==null;){var x=g;if(y=x.stateNode,x=x.tag,x!==5&&x!==26&&x!==27||y===null||p===null||(x=br(g,p),x!=null&&b.push(Ar(g,x,y))),v)break;g=g.return}0<b.length&&(f=new h(f,m,null,n,d),u.push({event:f,listeners:b}))}}if(!(t&7)){t:{if(f=e==="mouseover"||e==="pointerover",h=e==="mouseout"||e==="pointerout",f&&n!==vc&&(m=n.relatedTarget||n.fromElement)&&(Ya(m)||m[_i]))break t;if((h||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,h?(m=n.relatedTarget||n.toElement,h=c,m=m?Ya(m):null,m!==null&&(v=Hr(m),b=m.tag,m!==v||b!==5&&b!==27&&b!==6)&&(m=null)):(h=null,m=c),h!==m)){if(b=Iu,x="onMouseLeave",p="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(b=tf,x="onPointerLeave",p="onPointerEnter",g="pointer"),v=h==null?f:Gi(h),y=m==null?f:Gi(m),f=new b(x,g+"leave",h,n,d),f.target=v,f.relatedTarget=y,x=null,Ya(d)===c&&(b=new b(p,g+"enter",m,n,d),b.target=y,b.relatedTarget=v,x=b),v=x,h&&m)e:{for(b=nx,p=h,g=m,y=0,x=p;x;x=b(x))y++;x=0;for(var _=g;_;_=b(_))x++;for(;0<y-x;)p=b(p),y--;for(;0<x-y;)g=b(g),x--;for(;y--;){if(p===g||g!==null&&p===g.alternate){b=p;break e}p=b(p),g=b(g)}b=null}else b=null;h!==null&&Qf(u,f,h,b,!1),m!==null&&v!==null&&Qf(u,v,m,b,!0)}}t:{if(f=c?Gi(c):window,h=f.nodeName&&f.nodeName.toLowerCase(),h==="select"||h==="input"&&f.type==="file")var w=rf;else if(af(f))if(Mp)w=hv;else{w=uv;var k=dv}else h=f.nodeName,!h||h.toLowerCase()!=="input"||f.type!=="checkbox"&&f.type!=="radio"?c&&Od(c.elementType)&&(w=rf):w=fv;if(w&&(w=w(e,c))){wp(u,w,n,d);break t}k&&k(e,f,c),e==="focusout"&&c&&f.type==="number"&&c.memoizedProps.value!=null&&yc(f,"number",f.value)}switch(k=c?Gi(c):window,e){case"focusin":(af(k)||k.contentEditable==="true")&&(Xa=k,_c=c,tr=null);break;case"focusout":tr=_c=Xa=null;break;case"mousedown":kc=!0;break;case"contextmenu":case"mouseup":case"dragend":kc=!1,df(u,n,d);break;case"selectionchange":if(gv)break;case"keydown":case"keyup":df(u,n,d)}var S;if(Ld)t:{switch(e){case"compositionstart":var A="onCompositionStart";break t;case"compositionend":A="onCompositionEnd";break t;case"compositionupdate":A="onCompositionUpdate";break t}A=void 0}else qa?kp(e,n)&&(A="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(A="onCompositionStart");A&&(_p&&n.locale!=="ko"&&(qa||A!=="onCompositionStart"?A==="onCompositionEnd"&&qa&&(S=xp()):(wn=d,zd="value"in wn?wn.value:wn.textContent,qa=!0)),k=vl(c,A),0<k.length&&(A=new $u(A,e,null,n,d),u.push({event:A,listeners:k}),S?A.data=S:(S=Sp(n),S!==null&&(A.data=S)))),(S=rv?sv(e,n):lv(e,n))&&(A=vl(c,"onBeforeInput"),0<A.length&&(k=new $u("onBeforeInput","beforeinput",null,n,d),u.push({event:k,listeners:A}),k.data=S)),Iv(u,e,c,n,d)}vm(u,t)})}function Ar(e,t,n){return{instance:e,listener:t,currentTarget:n}}function vl(e,t){for(var n=t+"Capture",a=[];e!==null;){var i=e,r=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||r===null||(i=br(e,n),i!=null&&a.unshift(Ar(e,i,r)),i=br(e,t),i!=null&&a.push(Ar(e,i,r))),e.tag===3)return a;e=e.return}return[]}function nx(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Qf(e,t,n,a,i){for(var r=t._reactName,s=[];n!==null&&n!==a;){var l=n,o=l.alternate,c=l.stateNode;if(l=l.tag,o!==null&&o===a)break;l!==5&&l!==26&&l!==27||c===null||(o=c,i?(c=br(n,r),c!=null&&s.unshift(Ar(n,c,o))):i||(c=br(n,r),c!=null&&s.push(Ar(n,c,o)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var ax=/\r\n?/g,ix=/\u0000|\uFFFD/g;function Zf(e){return(typeof e=="string"?e:""+e).replace(ax,`
`).replace(ix,"")}function _m(e,t){return t=Zf(t),Zf(e)===t}function $(e,t,n,a,i,r){switch(n){case"children":typeof a=="string"?t==="body"||t==="textarea"&&a===""||li(e,a):(typeof a=="number"||typeof a=="bigint")&&t!=="body"&&li(e,""+a);break;case"className":as(e,"class",a);break;case"tabIndex":as(e,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":as(e,n,a);break;case"style":yp(e,a,r);break;case"data":if(t!=="object"){as(e,"data",a);break}case"src":case"href":if(a===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=Ds(""+a),e.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof r=="function"&&(n==="formAction"?(t!=="input"&&$(e,t,"name",i.name,i,null),$(e,t,"formEncType",i.formEncType,i,null),$(e,t,"formMethod",i.formMethod,i,null),$(e,t,"formTarget",i.formTarget,i,null)):($(e,t,"encType",i.encType,i,null),$(e,t,"method",i.method,i,null),$(e,t,"target",i.target,i,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=Ds(""+a),e.setAttribute(n,a);break;case"onClick":a!=null&&(e.onclick=en);break;case"onScroll":a!=null&&V("scroll",e);break;case"onScrollEnd":a!=null&&V("scrollend",e);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(M(61));if(n=a.__html,n!=null){if(i.children!=null)throw Error(M(60));e.innerHTML=n}}break;case"multiple":e.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":e.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){e.removeAttribute("xlink:href");break}n=Ds(""+a),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""+a):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":a===!0?e.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,a):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?e.setAttribute(n,a):e.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?e.removeAttribute(n):e.setAttribute(n,a);break;case"popover":V("beforetoggle",e),V("toggle",e),Ts(e,"popover",a);break;case"xlinkActuate":Ge(e,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":Ge(e,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":Ge(e,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":Ge(e,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":Ge(e,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":Ge(e,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":Ge(e,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":Ge(e,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":Ge(e,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":Ts(e,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=zy.get(n)||n,Ts(e,n,a))}}function Qc(e,t,n,a,i,r){switch(n){case"style":yp(e,a,r);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(M(61));if(n=a.__html,n!=null){if(i.children!=null)throw Error(M(60));e.innerHTML=n}}break;case"children":typeof a=="string"?li(e,a):(typeof a=="number"||typeof a=="bigint")&&li(e,""+a);break;case"onScroll":a!=null&&V("scroll",e);break;case"onScrollEnd":a!=null&&V("scrollend",e);break;case"onClick":a!=null&&(e.onclick=en);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!fp.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(i=n.endsWith("Capture"),t=n.slice(2,i?n.length-7:void 0),r=e[$t]||null,r=r!=null?r[n]:null,typeof r=="function"&&e.removeEventListener(t,r,i),typeof a=="function")){typeof r!="function"&&r!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,a,i);break t}n in e?e[n]=a:a===!0?e.setAttribute(n,""):Ts(e,n,a)}}}function Bt(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":V("error",e),V("load",e);var a=!1,i=!1,r;for(r in n)if(n.hasOwnProperty(r)){var s=n[r];if(s!=null)switch(r){case"src":a=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(M(137,t));default:$(e,t,r,s,n,null)}}i&&$(e,t,"srcSet",n.srcSet,n,null),a&&$(e,t,"src",n.src,n,null);return;case"input":V("invalid",e);var l=r=s=i=null,o=null,c=null;for(a in n)if(n.hasOwnProperty(a)){var d=n[a];if(d!=null)switch(a){case"name":i=d;break;case"type":s=d;break;case"checked":o=d;break;case"defaultChecked":c=d;break;case"value":r=d;break;case"defaultValue":l=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(M(137,t));break;default:$(e,t,a,d,n,null)}}gp(e,r,l,o,c,s,i,!1);return;case"select":V("invalid",e),a=s=r=null;for(i in n)if(n.hasOwnProperty(i)&&(l=n[i],l!=null))switch(i){case"value":r=l;break;case"defaultValue":s=l;break;case"multiple":a=l;default:$(e,t,i,l,n,null)}t=r,n=s,e.multiple=!!a,t!=null?Ia(e,!!a,t,!1):n!=null&&Ia(e,!!a,n,!0);return;case"textarea":V("invalid",e),r=i=a=null;for(s in n)if(n.hasOwnProperty(s)&&(l=n[s],l!=null))switch(s){case"value":a=l;break;case"defaultValue":i=l;break;case"children":r=l;break;case"dangerouslySetInnerHTML":if(l!=null)throw Error(M(91));break;default:$(e,t,s,l,n,null)}bp(e,a,i,r);return;case"option":for(o in n)if(n.hasOwnProperty(o)&&(a=n[o],a!=null))switch(o){case"selected":e.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:$(e,t,o,a,n,null)}return;case"dialog":V("beforetoggle",e),V("toggle",e),V("cancel",e),V("close",e);break;case"iframe":case"object":V("load",e);break;case"video":case"audio":for(a=0;a<Mr.length;a++)V(Mr[a],e);break;case"image":V("error",e),V("load",e);break;case"details":V("toggle",e);break;case"embed":case"source":case"link":V("error",e),V("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(a=n[c],a!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(M(137,t));default:$(e,t,c,a,n,null)}return;default:if(Od(t)){for(d in n)n.hasOwnProperty(d)&&(a=n[d],a!==void 0&&Qc(e,t,d,a,n,void 0));return}}for(l in n)n.hasOwnProperty(l)&&(a=n[l],a!=null&&$(e,t,l,a,n,null))}function rx(e,t,n,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var i=null,r=null,s=null,l=null,o=null,c=null,d=null;for(h in n){var u=n[h];if(n.hasOwnProperty(h)&&u!=null)switch(h){case"checked":break;case"value":break;case"defaultValue":o=u;default:a.hasOwnProperty(h)||$(e,t,h,null,a,u)}}for(var f in a){var h=a[f];if(u=n[f],a.hasOwnProperty(f)&&(h!=null||u!=null))switch(f){case"type":r=h;break;case"name":i=h;break;case"checked":c=h;break;case"defaultChecked":d=h;break;case"value":s=h;break;case"defaultValue":l=h;break;case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(M(137,t));break;default:h!==u&&$(e,t,f,h,a,u)}}bc(e,s,l,o,c,d,r,i);return;case"select":h=s=l=f=null;for(r in n)if(o=n[r],n.hasOwnProperty(r)&&o!=null)switch(r){case"value":break;case"multiple":h=o;default:a.hasOwnProperty(r)||$(e,t,r,null,a,o)}for(i in a)if(r=a[i],o=n[i],a.hasOwnProperty(i)&&(r!=null||o!=null))switch(i){case"value":f=r;break;case"defaultValue":l=r;break;case"multiple":s=r;default:r!==o&&$(e,t,i,r,a,o)}t=l,n=s,a=h,f!=null?Ia(e,!!n,f,!1):!!a!=!!n&&(t!=null?Ia(e,!!n,t,!0):Ia(e,!!n,n?[]:"",!1));return;case"textarea":h=f=null;for(l in n)if(i=n[l],n.hasOwnProperty(l)&&i!=null&&!a.hasOwnProperty(l))switch(l){case"value":break;case"children":break;default:$(e,t,l,null,a,i)}for(s in a)if(i=a[s],r=n[s],a.hasOwnProperty(s)&&(i!=null||r!=null))switch(s){case"value":f=i;break;case"defaultValue":h=i;break;case"children":break;case"dangerouslySetInnerHTML":if(i!=null)throw Error(M(91));break;default:i!==r&&$(e,t,s,i,a,r)}mp(e,f,h);return;case"option":for(var m in n)if(f=n[m],n.hasOwnProperty(m)&&f!=null&&!a.hasOwnProperty(m))switch(m){case"selected":e.selected=!1;break;default:$(e,t,m,null,a,f)}for(o in a)if(f=a[o],h=n[o],a.hasOwnProperty(o)&&f!==h&&(f!=null||h!=null))switch(o){case"selected":e.selected=f&&typeof f!="function"&&typeof f!="symbol";break;default:$(e,t,o,f,a,h)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var b in n)f=n[b],n.hasOwnProperty(b)&&f!=null&&!a.hasOwnProperty(b)&&$(e,t,b,null,a,f);for(c in a)if(f=a[c],h=n[c],a.hasOwnProperty(c)&&f!==h&&(f!=null||h!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(M(137,t));break;default:$(e,t,c,f,a,h)}return;default:if(Od(t)){for(var v in n)f=n[v],n.hasOwnProperty(v)&&f!==void 0&&!a.hasOwnProperty(v)&&Qc(e,t,v,void 0,a,f);for(d in a)f=a[d],h=n[d],!a.hasOwnProperty(d)||f===h||f===void 0&&h===void 0||Qc(e,t,d,f,a,h);return}}for(var p in n)f=n[p],n.hasOwnProperty(p)&&f!=null&&!a.hasOwnProperty(p)&&$(e,t,p,null,a,f);for(u in a)f=a[u],h=n[u],!a.hasOwnProperty(u)||f===h||f==null&&h==null||$(e,t,u,f,a,h)}function Kf(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function sx(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var i=n[a],r=i.transferSize,s=i.initiatorType,l=i.duration;if(r&&l&&Kf(s)){for(s=0,l=i.responseEnd,a+=1;a<n.length;a++){var o=n[a],c=o.startTime;if(c>l)break;var d=o.transferSize,u=o.initiatorType;d&&Kf(u)&&(o=o.responseEnd,s+=d*(o<l?1:(l-c)/(o-c)))}if(--a,t+=8*(r+s)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Zc=null,Kc=null;function xl(e){return e.nodeType===9?e:e.ownerDocument}function Pf(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function km(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Pc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Go=null;function lx(){var e=window.event;return e&&e.type==="popstate"?e===Go?!1:(Go=e,!0):(Go=null,!1)}var Sm=typeof setTimeout=="function"?setTimeout:void 0,ox=typeof clearTimeout=="function"?clearTimeout:void 0,Wf=typeof Promise=="function"?Promise:void 0,cx=typeof queueMicrotask=="function"?queueMicrotask:typeof Wf<"u"?function(e){return Wf.resolve(null).then(e).catch(dx)}:Sm;function dx(e){setTimeout(function(){throw e})}function Wn(e){return e==="head"}function Jf(e,t){var n=t,a=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"||n==="/&"){if(a===0){e.removeChild(i),gi(t);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")dr(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,dr(n);for(var r=n.firstChild;r;){var s=r.nextSibling,l=r.nodeName;r[Gr]||l==="SCRIPT"||l==="STYLE"||l==="LINK"&&r.rel.toLowerCase()==="stylesheet"||n.removeChild(r),r=s}}else n==="body"&&dr(e.ownerDocument.body);n=i}while(n);gi(t)}function If(e,t){var n=e;e=0;do{var a=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=a}while(n)}function Wc(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Wc(n),Cd(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function ux(e,t,n,a){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!a&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(a){if(!e[Gr])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(r=e.getAttribute("rel"),r==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(r!==i.rel||e.getAttribute("href")!==(i.href==null||i.href===""?null:i.href)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute("title")!==(i.title==null?null:i.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(r=e.getAttribute("src"),(r!==(i.src==null?null:i.src)||e.getAttribute("type")!==(i.type==null?null:i.type)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin))&&r&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var r=i.name==null?null:""+i.name;if(i.type==="hidden"&&e.getAttribute("name")===r)return e}else return e;if(e=_e(e.nextSibling),e===null)break}return null}function fx(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=_e(e.nextSibling),e===null))return null;return e}function wm(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=_e(e.nextSibling),e===null))return null;return e}function Jc(e){return e.data==="$?"||e.data==="$~"}function Ic(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function hx(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var a=function(){t(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),e._reactRetry=a}}function _e(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var $c=null;function $f(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return _e(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function th(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function Mm(e,t,n){switch(t=xl(n),e){case"html":if(e=t.documentElement,!e)throw Error(M(452));return e;case"head":if(e=t.head,!e)throw Error(M(453));return e;case"body":if(e=t.body,!e)throw Error(M(454));return e;default:throw Error(M(451))}}function dr(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Cd(e)}var ke=new Map,eh=new Set;function _l(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var gn=P.d;P.d={f:px,r:gx,D:mx,C:bx,L:yx,m:vx,X:_x,S:xx,M:kx};function px(){var e=gn.f(),t=Pl();return e||t}function gx(e){var t=ki(e);t!==null&&t.tag===5&&t.type==="form"?yg(t):gn.r(e)}var Ai=typeof document>"u"?null:document;function Am(e,t,n){var a=Ai;if(a&&typeof t=="string"&&t){var i=be(t);i='link[rel="'+e+'"][href="'+i+'"]',typeof n=="string"&&(i+='[crossorigin="'+n+'"]'),eh.has(i)||(eh.add(i),e={rel:e,crossOrigin:n,href:t},a.querySelector(i)===null&&(t=a.createElement("link"),Bt(t,"link",e),Dt(t),a.head.appendChild(t)))}}function mx(e){gn.D(e),Am("dns-prefetch",e,null)}function bx(e,t){gn.C(e,t),Am("preconnect",e,t)}function yx(e,t,n){gn.L(e,t,n);var a=Ai;if(a&&e&&t){var i='link[rel="preload"][as="'+be(t)+'"]';t==="image"&&n&&n.imageSrcSet?(i+='[imagesrcset="'+be(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(i+='[imagesizes="'+be(n.imageSizes)+'"]')):i+='[href="'+be(e)+'"]';var r=i;switch(t){case"style":r=pi(e);break;case"script":r=Ti(e)}ke.has(r)||(e=ct({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),ke.set(r,e),a.querySelector(i)!==null||t==="style"&&a.querySelector(Kr(r))||t==="script"&&a.querySelector(Pr(r))||(t=a.createElement("link"),Bt(t,"link",e),Dt(t),a.head.appendChild(t)))}}function vx(e,t){gn.m(e,t);var n=Ai;if(n&&e){var a=t&&typeof t.as=="string"?t.as:"script",i='link[rel="modulepreload"][as="'+be(a)+'"][href="'+be(e)+'"]',r=i;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":r=Ti(e)}if(!ke.has(r)&&(e=ct({rel:"modulepreload",href:e},t),ke.set(r,e),n.querySelector(i)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Pr(r)))return}a=n.createElement("link"),Bt(a,"link",e),Dt(a),n.head.appendChild(a)}}}function xx(e,t,n){gn.S(e,t,n);var a=Ai;if(a&&e){var i=Ja(a).hoistableStyles,r=pi(e);t=t||"default";var s=i.get(r);if(!s){var l={loading:0,preload:null};if(s=a.querySelector(Kr(r)))l.loading=5;else{e=ct({rel:"stylesheet",href:e,"data-precedence":t},n),(n=ke.get(r))&&pu(e,n);var o=s=a.createElement("link");Dt(o),Bt(o,"link",e),o._p=new Promise(function(c,d){o.onload=c,o.onerror=d}),o.addEventListener("load",function(){l.loading|=1}),o.addEventListener("error",function(){l.loading|=2}),l.loading|=4,Hs(s,t,a)}s={type:"stylesheet",instance:s,count:1,state:l},i.set(r,s)}}}function _x(e,t){gn.X(e,t);var n=Ai;if(n&&e){var a=Ja(n).hoistableScripts,i=Ti(e),r=a.get(i);r||(r=n.querySelector(Pr(i)),r||(e=ct({src:e,async:!0},t),(t=ke.get(i))&&gu(e,t),r=n.createElement("script"),Dt(r),Bt(r,"link",e),n.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},a.set(i,r))}}function kx(e,t){gn.M(e,t);var n=Ai;if(n&&e){var a=Ja(n).hoistableScripts,i=Ti(e),r=a.get(i);r||(r=n.querySelector(Pr(i)),r||(e=ct({src:e,async:!0,type:"module"},t),(t=ke.get(i))&&gu(e,t),r=n.createElement("script"),Dt(r),Bt(r,"link",e),n.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},a.set(i,r))}}function nh(e,t,n,a){var i=(i=Rn.current)?_l(i):null;if(!i)throw Error(M(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=pi(n.href),n=Ja(i).hoistableStyles,a=n.get(t),a||(a={type:"style",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=pi(n.href);var r=Ja(i).hoistableStyles,s=r.get(e);if(s||(i=i.ownerDocument||i,s={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},r.set(e,s),(r=i.querySelector(Kr(e)))&&!r._p&&(s.instance=r,s.state.loading=5),ke.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},ke.set(e,n),r||Sx(i,e,n,s.state))),t&&a===null)throw Error(M(528,""));return s}if(t&&a!==null)throw Error(M(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Ti(n),n=Ja(i).hoistableScripts,a=n.get(t),a||(a={type:"script",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(M(444,e))}}function pi(e){return'href="'+be(e)+'"'}function Kr(e){return'link[rel="stylesheet"]['+e+"]"}function Tm(e){return ct({},e,{"data-precedence":e.precedence,precedence:null})}function Sx(e,t,n,a){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?a.loading=1:(t=e.createElement("link"),a.preload=t,t.addEventListener("load",function(){return a.loading|=1}),t.addEventListener("error",function(){return a.loading|=2}),Bt(t,"link",n),Dt(t),e.head.appendChild(t))}function Ti(e){return'[src="'+be(e)+'"]'}function Pr(e){return"script[async]"+e}function ah(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var a=e.querySelector('style[data-href~="'+be(n.href)+'"]');if(a)return t.instance=a,Dt(a),a;var i=ct({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(e.ownerDocument||e).createElement("style"),Dt(a),Bt(a,"style",i),Hs(a,n.precedence,e),t.instance=a;case"stylesheet":i=pi(n.href);var r=e.querySelector(Kr(i));if(r)return t.state.loading|=4,t.instance=r,Dt(r),r;a=Tm(n),(i=ke.get(i))&&pu(a,i),r=(e.ownerDocument||e).createElement("link"),Dt(r);var s=r;return s._p=new Promise(function(l,o){s.onload=l,s.onerror=o}),Bt(r,"link",a),t.state.loading|=4,Hs(r,n.precedence,e),t.instance=r;case"script":return r=Ti(n.src),(i=e.querySelector(Pr(r)))?(t.instance=i,Dt(i),i):(a=n,(i=ke.get(r))&&(a=ct({},n),gu(a,i)),e=e.ownerDocument||e,i=e.createElement("script"),Dt(i),Bt(i,"link",a),e.head.appendChild(i),t.instance=i);case"void":return null;default:throw Error(M(443,t.type))}else t.type==="stylesheet"&&!(t.state.loading&4)&&(a=t.instance,t.state.loading|=4,Hs(a,n.precedence,e));return t.instance}function Hs(e,t,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),i=a.length?a[a.length-1]:null,r=i,s=0;s<a.length;s++){var l=a[s];if(l.dataset.precedence===t)r=l;else if(r!==i)break}r?r.parentNode.insertBefore(e,r.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function pu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function gu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Us=null;function ih(e,t,n){if(Us===null){var a=new Map,i=Us=new Map;i.set(n,a)}else i=Us,a=i.get(n),a||(a=new Map,i.set(n,a));if(a.has(e))return a;for(a.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var r=n[i];if(!(r[Gr]||r[zt]||e==="link"&&r.getAttribute("rel")==="stylesheet")&&r.namespaceURI!=="http://www.w3.org/2000/svg"){var s=r.getAttribute(t)||"";s=e+s;var l=a.get(s);l?l.push(r):a.set(s,[r])}}return a}function rh(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function wx(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Dm(e){return!(e.type==="stylesheet"&&!(e.state.loading&3))}function Mx(e,t,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var i=pi(a.href),r=t.querySelector(Kr(i));if(r){t=r._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=kl.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=r,Dt(r);return}r=t.ownerDocument||t,a=Tm(a),(i=ke.get(i))&&pu(a,i),r=r.createElement("link"),Dt(r);var s=r;s._p=new Promise(function(l,o){s.onload=l,s.onerror=o}),Bt(r,"link",a),n.instance=r}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=kl.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var qo=0;function Ax(e,t){return e.stylesheets&&e.count===0&&Vs(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var a=setTimeout(function(){if(e.stylesheets&&Vs(e,e.stylesheets),e.unsuspend){var r=e.unsuspend;e.unsuspend=null,r()}},6e4+t);0<e.imgBytes&&qo===0&&(qo=62500*sx());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Vs(e,e.stylesheets),e.unsuspend)){var r=e.unsuspend;e.unsuspend=null,r()}},(e.imgBytes>qo?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(a),clearTimeout(i)}}:null}function kl(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Vs(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Sl=null;function Vs(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Sl=new Map,t.forEach(Tx,e),Sl=null,kl.call(e))}function Tx(e,t){if(!(t.state.loading&4)){var n=Sl.get(e);if(n)var a=n.get(null);else{n=new Map,Sl.set(e,n);for(var i=e.querySelectorAll("link[data-precedence],style[data-precedence]"),r=0;r<i.length;r++){var s=i[r];(s.nodeName==="LINK"||s.getAttribute("media")!=="not all")&&(n.set(s.dataset.precedence,s),a=s)}a&&n.set(null,a)}i=t.instance,s=i.getAttribute("data-precedence"),r=n.get(s)||a,r===a&&n.set(null,i),n.set(s,i),this.count++,a=kl.bind(this),i.addEventListener("load",a),i.addEventListener("error",a),r?r.parentNode.insertBefore(i,r.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var Tr={$$typeof:tn,Provider:null,Consumer:null,_currentValue:ua,_currentValue2:ua,_threadCount:0};function Dx(e,t,n,a,i,r,s,l,o){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=fo(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=fo(0),this.hiddenUpdates=fo(null),this.identifierPrefix=a,this.onUncaughtError=i,this.onCaughtError=r,this.onRecoverableError=s,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.incompleteTransitions=new Map}function Cm(e,t,n,a,i,r,s,l,o,c,d,u){return e=new Dx(e,t,n,s,o,c,d,u,l),t=1,r===!0&&(t|=24),r=ie(3,null,null,t),e.current=r,r.stateNode=e,t=Yd(),t.refCount++,e.pooledCache=t,t.refCount++,r.memoizedState={element:a,isDehydrated:n,cache:t},Xd(r),e}function Om(e){return e?(e=Za,e):Za}function Em(e,t,n,a,i,r){i=Om(i),a.context===null?a.context=i:a.pendingContext=i,a=Bn(t),a.payload={element:n},r=r===void 0?null:r,r!==null&&(a.callback=r),n=Nn(e,a,t),n!==null&&(It(n,e,t),nr(n,e,t))}function sh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function mu(e,t){sh(e,t),(e=e.alternate)&&sh(e,t)}function zm(e){if(e.tag===13||e.tag===31){var t=Da(e,67108864);t!==null&&It(t,e,67108864),mu(e,67108864)}}function lh(e){if(e.tag===13||e.tag===31){var t=ce();t=Td(t);var n=Da(e,t);n!==null&&It(n,e,t),mu(e,t)}}var wl=!0;function Cx(e,t,n,a){var i=L.T;L.T=null;var r=P.p;try{P.p=2,bu(e,t,n,a)}finally{P.p=r,L.T=i}}function Ox(e,t,n,a){var i=L.T;L.T=null;var r=P.p;try{P.p=8,bu(e,t,n,a)}finally{P.p=r,L.T=i}}function bu(e,t,n,a){if(wl){var i=td(a);if(i===null)Yo(e,t,a,Ml,n),oh(e,a);else if(zx(i,e,t,n,a))a.stopPropagation();else if(oh(e,a),t&4&&-1<Ex.indexOf(e)){for(;i!==null;){var r=ki(i);if(r!==null)switch(r.tag){case 3:if(r=r.stateNode,r.current.memoizedState.isDehydrated){var s=ra(r.pendingLanes);if(s!==0){var l=r;for(l.pendingLanes|=2,l.entangledLanes|=2;s;){var o=1<<31-oe(s);l.entanglements[1]|=o,s&=~o}Ue(r),!(K&6)&&(pl=se()+500,Zr(0))}}break;case 31:case 13:l=Da(r,2),l!==null&&It(l,r,2),Pl(),mu(r,2)}if(r=td(a),r===null&&Yo(e,t,a,Ml,n),r===i)break;i=r}i!==null&&a.stopPropagation()}else Yo(e,t,a,null,n)}}function td(e){return e=Ed(e),yu(e)}var Ml=null;function yu(e){if(Ml=null,e=Ya(e),e!==null){var t=Hr(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=I0(t),e!==null)return e;e=null}else if(n===31){if(e=$0(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Ml=e,null}function Rm(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(my()){case ap:return 2;case ip:return 8;case tl:case by:return 32;case rp:return 268435456;default:return 32}default:return 32}}var ed=!1,Un=null,Vn=null,Yn=null,Dr=new Map,Cr=new Map,kn=[],Ex="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function oh(e,t){switch(e){case"focusin":case"focusout":Un=null;break;case"dragenter":case"dragleave":Vn=null;break;case"mouseover":case"mouseout":Yn=null;break;case"pointerover":case"pointerout":Dr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Cr.delete(t.pointerId)}}function Li(e,t,n,a,i,r){return e===null||e.nativeEvent!==r?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:r,targetContainers:[i]},t!==null&&(t=ki(t),t!==null&&zm(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function zx(e,t,n,a,i){switch(t){case"focusin":return Un=Li(Un,e,t,n,a,i),!0;case"dragenter":return Vn=Li(Vn,e,t,n,a,i),!0;case"mouseover":return Yn=Li(Yn,e,t,n,a,i),!0;case"pointerover":var r=i.pointerId;return Dr.set(r,Li(Dr.get(r)||null,e,t,n,a,i)),!0;case"gotpointercapture":return r=i.pointerId,Cr.set(r,Li(Cr.get(r)||null,e,t,n,a,i)),!0}return!1}function Lm(e){var t=Ya(e.target);if(t!==null){var n=Hr(t);if(n!==null){if(t=n.tag,t===13){if(t=I0(n),t!==null){e.blockedOn=t,Fu(e.priority,function(){lh(n)});return}}else if(t===31){if(t=$0(n),t!==null){e.blockedOn=t,Fu(e.priority,function(){lh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ys(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=td(e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);vc=a,n.target.dispatchEvent(a),vc=null}else return t=ki(n),t!==null&&zm(t),e.blockedOn=n,!1;t.shift()}return!0}function ch(e,t,n){Ys(e)&&n.delete(t)}function Rx(){ed=!1,Un!==null&&Ys(Un)&&(Un=null),Vn!==null&&Ys(Vn)&&(Vn=null),Yn!==null&&Ys(Yn)&&(Yn=null),Dr.forEach(ch),Cr.forEach(ch)}function us(e,t){e.blockedOn===t&&(e.blockedOn=null,ed||(ed=!0,At.unstable_scheduleCallback(At.unstable_NormalPriority,Rx)))}var fs=null;function dh(e){fs!==e&&(fs=e,At.unstable_scheduleCallback(At.unstable_NormalPriority,function(){fs===e&&(fs=null);for(var t=0;t<e.length;t+=3){var n=e[t],a=e[t+1],i=e[t+2];if(typeof a!="function"){if(yu(a||n)===null)continue;break}var r=ki(n);r!==null&&(e.splice(t,3),t-=3,Bc(r,{pending:!0,data:i,method:n.method,action:a},a,i))}}))}function gi(e){function t(o){return us(o,e)}Un!==null&&us(Un,e),Vn!==null&&us(Vn,e),Yn!==null&&us(Yn,e),Dr.forEach(t),Cr.forEach(t);for(var n=0;n<kn.length;n++){var a=kn[n];a.blockedOn===e&&(a.blockedOn=null)}for(;0<kn.length&&(n=kn[0],n.blockedOn===null);)Lm(n),n.blockedOn===null&&kn.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var i=n[a],r=n[a+1],s=i[$t]||null;if(typeof r=="function")s||dh(n);else if(s){var l=null;if(r&&r.hasAttribute("formAction")){if(i=r,s=r[$t]||null)l=s.formAction;else if(yu(i)!==null)continue}else l=s.action;typeof l=="function"?n[a+1]=l:(n.splice(a,3),a-=3),dh(n)}}}function Bm(){function e(r){r.canIntercept&&r.info==="react-transition"&&r.intercept({handler:function(){return new Promise(function(s){return i=s})},focusReset:"manual",scroll:"manual"})}function t(){i!==null&&(i(),i=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var r=navigation.currentEntry;r&&r.url!=null&&navigation.navigate(r.url,{state:r.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,i=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),i!==null&&(i(),i=null)}}}function vu(e){this._internalRoot=e}Il.prototype.render=vu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(M(409));var n=t.current,a=ce();Em(n,a,e,t,null,null)};Il.prototype.unmount=vu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Em(e.current,2,null,e,null,null),Pl(),t[_i]=null}};function Il(e){this._internalRoot=e}Il.prototype.unstable_scheduleHydration=function(e){if(e){var t=dp();e={blockedOn:null,target:e,priority:t};for(var n=0;n<kn.length&&t!==0&&t<kn[n].priority;n++);kn.splice(n,0,e),n===0&&Lm(e)}};var uh=W0.version;if(uh!=="19.2.5")throw Error(M(527,uh,"19.2.5"));P.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(M(188)):(e=Object.keys(e).join(","),Error(M(268,e)));return e=cy(t),e=e!==null?tp(e):null,e=e===null?null:e.stateNode,e};var Lx={bundleType:0,version:"19.2.5",rendererPackageName:"react-dom",currentDispatcherRef:L,reconcilerVersion:"19.2.5"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var hs=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!hs.isDisabled&&hs.supportsFiber)try{Ur=hs.inject(Lx),le=hs}catch{}}Bl.createRoot=function(e,t){if(!J0(e))throw Error(M(299));var n=!1,a="",i=Ag,r=Tg,s=Dg;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(r=t.onCaughtError),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=Cm(e,1,!1,null,null,n,a,null,i,r,s,Bm),e[_i]=t.current,hu(e),new vu(t)};Bl.hydrateRoot=function(e,t,n){if(!J0(e))throw Error(M(299));var a=!1,i="",r=Ag,s=Tg,l=Dg,o=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onUncaughtError!==void 0&&(r=n.onUncaughtError),n.onCaughtError!==void 0&&(s=n.onCaughtError),n.onRecoverableError!==void 0&&(l=n.onRecoverableError),n.formState!==void 0&&(o=n.formState)),t=Cm(e,1,!0,t,n??null,a,i,o,r,s,l,Bm),t.context=Om(null),n=t.current,a=ce(),a=Td(a),i=Bn(a),i.callback=null,Nn(n,i,a),n=a,t.current.lanes=n,Yr(t,n),Ue(t),e[_i]=t.current,hu(e),new Il(t)};Bl.version="19.2.5";function Nm(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Nm)}catch(e){console.error(e)}}Nm(),q0.exports=Bl;var jm=q0.exports;/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function Wr(e){return e+.5|0}const Dn=(e,t,n)=>Math.max(Math.min(e,n),t);function Fi(e){return Dn(Wr(e*2.55),0,255)}function Gn(e){return Dn(Wr(e*255),0,255)}function Je(e){return Dn(Wr(e/2.55)/100,0,1)}function fh(e){return Dn(Wr(e*100),0,100)}const fe={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},nd=[..."0123456789ABCDEF"],Bx=e=>nd[e&15],Nx=e=>nd[(e&240)>>4]+nd[e&15],ps=e=>(e&240)>>4===(e&15),jx=e=>ps(e.r)&&ps(e.g)&&ps(e.b)&&ps(e.a);function Hx(e){var t=e.length,n;return e[0]==="#"&&(t===4||t===5?n={r:255&fe[e[1]]*17,g:255&fe[e[2]]*17,b:255&fe[e[3]]*17,a:t===5?fe[e[4]]*17:255}:(t===7||t===9)&&(n={r:fe[e[1]]<<4|fe[e[2]],g:fe[e[3]]<<4|fe[e[4]],b:fe[e[5]]<<4|fe[e[6]],a:t===9?fe[e[7]]<<4|fe[e[8]]:255})),n}const Ux=(e,t)=>e<255?t(e):"";function Vx(e){var t=jx(e)?Bx:Nx;return e?"#"+t(e.r)+t(e.g)+t(e.b)+Ux(e.a,t):void 0}const Yx=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Hm(e,t,n){const a=t*Math.min(n,1-n),i=(r,s=(r+e/30)%12)=>n-a*Math.max(Math.min(s-3,9-s,1),-1);return[i(0),i(8),i(4)]}function Gx(e,t,n){const a=(i,r=(i+e/60)%6)=>n-n*t*Math.max(Math.min(r,4-r,1),0);return[a(5),a(3),a(1)]}function qx(e,t,n){const a=Hm(e,1,.5);let i;for(t+n>1&&(i=1/(t+n),t*=i,n*=i),i=0;i<3;i++)a[i]*=1-t-n,a[i]+=t;return a}function Xx(e,t,n,a,i){return e===i?(t-n)/a+(t<n?6:0):t===i?(n-e)/a+2:(e-t)/a+4}function xu(e){const n=e.r/255,a=e.g/255,i=e.b/255,r=Math.max(n,a,i),s=Math.min(n,a,i),l=(r+s)/2;let o,c,d;return r!==s&&(d=r-s,c=l>.5?d/(2-r-s):d/(r+s),o=Xx(n,a,i,d,r),o=o*60+.5),[o|0,c||0,l]}function _u(e,t,n,a){return(Array.isArray(t)?e(t[0],t[1],t[2]):e(t,n,a)).map(Gn)}function ku(e,t,n){return _u(Hm,e,t,n)}function Fx(e,t,n){return _u(qx,e,t,n)}function Qx(e,t,n){return _u(Gx,e,t,n)}function Um(e){return(e%360+360)%360}function Zx(e){const t=Yx.exec(e);let n=255,a;if(!t)return;t[5]!==a&&(n=t[6]?Fi(+t[5]):Gn(+t[5]));const i=Um(+t[2]),r=+t[3]/100,s=+t[4]/100;return t[1]==="hwb"?a=Fx(i,r,s):t[1]==="hsv"?a=Qx(i,r,s):a=ku(i,r,s),{r:a[0],g:a[1],b:a[2],a:n}}function Kx(e,t){var n=xu(e);n[0]=Um(n[0]+t),n=ku(n),e.r=n[0],e.g=n[1],e.b=n[2]}function Px(e){if(!e)return;const t=xu(e),n=t[0],a=fh(t[1]),i=fh(t[2]);return e.a<255?`hsla(${n}, ${a}%, ${i}%, ${Je(e.a)})`:`hsl(${n}, ${a}%, ${i}%)`}const hh={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},ph={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function Wx(){const e={},t=Object.keys(ph),n=Object.keys(hh);let a,i,r,s,l;for(a=0;a<t.length;a++){for(s=l=t[a],i=0;i<n.length;i++)r=n[i],l=l.replace(r,hh[r]);r=parseInt(ph[s],16),e[l]=[r>>16&255,r>>8&255,r&255]}return e}let gs;function Jx(e){gs||(gs=Wx(),gs.transparent=[0,0,0,0]);const t=gs[e.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const Ix=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function $x(e){const t=Ix.exec(e);let n=255,a,i,r;if(t){if(t[7]!==a){const s=+t[7];n=t[8]?Fi(s):Dn(s*255,0,255)}return a=+t[1],i=+t[3],r=+t[5],a=255&(t[2]?Fi(a):Dn(a,0,255)),i=255&(t[4]?Fi(i):Dn(i,0,255)),r=255&(t[6]?Fi(r):Dn(r,0,255)),{r:a,g:i,b:r,a:n}}}function t_(e){return e&&(e.a<255?`rgba(${e.r}, ${e.g}, ${e.b}, ${Je(e.a)})`:`rgb(${e.r}, ${e.g}, ${e.b})`)}const Xo=e=>e<=.0031308?e*12.92:Math.pow(e,1/2.4)*1.055-.055,Ra=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function e_(e,t,n){const a=Ra(Je(e.r)),i=Ra(Je(e.g)),r=Ra(Je(e.b));return{r:Gn(Xo(a+n*(Ra(Je(t.r))-a))),g:Gn(Xo(i+n*(Ra(Je(t.g))-i))),b:Gn(Xo(r+n*(Ra(Je(t.b))-r))),a:e.a+n*(t.a-e.a)}}function ms(e,t,n){if(e){let a=xu(e);a[t]=Math.max(0,Math.min(a[t]+a[t]*n,t===0?360:1)),a=ku(a),e.r=a[0],e.g=a[1],e.b=a[2]}}function Vm(e,t){return e&&Object.assign(t||{},e)}function gh(e){var t={r:0,g:0,b:0,a:255};return Array.isArray(e)?e.length>=3&&(t={r:e[0],g:e[1],b:e[2],a:255},e.length>3&&(t.a=Gn(e[3]))):(t=Vm(e,{r:0,g:0,b:0,a:1}),t.a=Gn(t.a)),t}function n_(e){return e.charAt(0)==="r"?$x(e):Zx(e)}class Or{constructor(t){if(t instanceof Or)return t;const n=typeof t;let a;n==="object"?a=gh(t):n==="string"&&(a=Hx(t)||Jx(t)||n_(t)),this._rgb=a,this._valid=!!a}get valid(){return this._valid}get rgb(){var t=Vm(this._rgb);return t&&(t.a=Je(t.a)),t}set rgb(t){this._rgb=gh(t)}rgbString(){return this._valid?t_(this._rgb):void 0}hexString(){return this._valid?Vx(this._rgb):void 0}hslString(){return this._valid?Px(this._rgb):void 0}mix(t,n){if(t){const a=this.rgb,i=t.rgb;let r;const s=n===r?.5:n,l=2*s-1,o=a.a-i.a,c=((l*o===-1?l:(l+o)/(1+l*o))+1)/2;r=1-c,a.r=255&c*a.r+r*i.r+.5,a.g=255&c*a.g+r*i.g+.5,a.b=255&c*a.b+r*i.b+.5,a.a=s*a.a+(1-s)*i.a,this.rgb=a}return this}interpolate(t,n){return t&&(this._rgb=e_(this._rgb,t._rgb,n)),this}clone(){return new Or(this.rgb)}alpha(t){return this._rgb.a=Gn(t),this}clearer(t){const n=this._rgb;return n.a*=1-t,this}greyscale(){const t=this._rgb,n=Wr(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=n,this}opaquer(t){const n=this._rgb;return n.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return ms(this._rgb,2,t),this}darken(t){return ms(this._rgb,2,-t),this}saturate(t){return ms(this._rgb,1,t),this}desaturate(t){return ms(this._rgb,1,-t),this}rotate(t){return Kx(this._rgb,t),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function Qe(){}const a_=(()=>{let e=0;return()=>e++})();function G(e){return e==null}function ut(e){if(Array.isArray&&Array.isArray(e))return!0;const t=Object.prototype.toString.call(e);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function X(e){return e!==null&&Object.prototype.toString.call(e)==="[object Object]"}function gt(e){return(typeof e=="number"||e instanceof Number)&&isFinite(+e)}function ee(e,t){return gt(e)?e:t}function B(e,t){return typeof e>"u"?t:e}const i_=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100:+e/t,Ym=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100*t:+e;function nt(e,t,n){if(e&&typeof e.call=="function")return e.apply(n,t)}function J(e,t,n,a){let i,r,s;if(ut(e))for(r=e.length,i=0;i<r;i++)t.call(n,e[i],i);else if(X(e))for(s=Object.keys(e),r=s.length,i=0;i<r;i++)t.call(n,e[s[i]],s[i])}function Al(e,t){let n,a,i,r;if(!e||!t||e.length!==t.length)return!1;for(n=0,a=e.length;n<a;++n)if(i=e[n],r=t[n],i.datasetIndex!==r.datasetIndex||i.index!==r.index)return!1;return!0}function Tl(e){if(ut(e))return e.map(Tl);if(X(e)){const t=Object.create(null),n=Object.keys(e),a=n.length;let i=0;for(;i<a;++i)t[n[i]]=Tl(e[n[i]]);return t}return e}function Gm(e){return["__proto__","prototype","constructor"].indexOf(e)===-1}function r_(e,t,n,a){if(!Gm(e))return;const i=t[e],r=n[e];X(i)&&X(r)?Er(i,r,a):t[e]=Tl(r)}function Er(e,t,n){const a=ut(t)?t:[t],i=a.length;if(!X(e))return e;n=n||{};const r=n.merger||r_;let s;for(let l=0;l<i;++l){if(s=a[l],!X(s))continue;const o=Object.keys(s);for(let c=0,d=o.length;c<d;++c)r(o[c],e,s,n)}return e}function ur(e,t){return Er(e,t,{merger:s_})}function s_(e,t,n){if(!Gm(e))return;const a=t[e],i=n[e];X(a)&&X(i)?ur(a,i):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=Tl(i))}const mh={"":e=>e,x:e=>e.x,y:e=>e.y};function l_(e){const t=e.split("."),n=[];let a="";for(const i of t)a+=i,a.endsWith("\\")?a=a.slice(0,-1)+".":(n.push(a),a="");return n}function o_(e){const t=l_(e);return n=>{for(const a of t){if(a==="")break;n=n&&n[a]}return n}}function Zn(e,t){return(mh[t]||(mh[t]=o_(t)))(e)}function Su(e){return e.charAt(0).toUpperCase()+e.slice(1)}const zr=e=>typeof e<"u",Kn=e=>typeof e=="function",bh=(e,t)=>{if(e.size!==t.size)return!1;for(const n of e)if(!t.has(n))return!1;return!0};function c_(e){return e.type==="mouseup"||e.type==="click"||e.type==="contextmenu"}const Z=Math.PI,ot=2*Z,d_=ot+Z,Dl=Number.POSITIVE_INFINITY,u_=Z/180,bt=Z/2,ta=Z/4,yh=Z*2/3,Cn=Math.log10,je=Math.sign;function fr(e,t,n){return Math.abs(e-t)<n}function vh(e){const t=Math.round(e);e=fr(e,t,e/1e3)?t:e;const n=Math.pow(10,Math.floor(Cn(e))),a=e/n;return(a<=1?1:a<=2?2:a<=5?5:10)*n}function f_(e){const t=[],n=Math.sqrt(e);let a;for(a=1;a<n;a++)e%a===0&&(t.push(a),t.push(e/a));return n===(n|0)&&t.push(n),t.sort((i,r)=>i-r).pop(),t}function h_(e){return typeof e=="symbol"||typeof e=="object"&&e!==null&&!(Symbol.toPrimitive in e||"toString"in e||"valueOf"in e)}function mi(e){return!h_(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function p_(e,t){const n=Math.round(e);return n-t<=e&&n+t>=e}function qm(e,t,n){let a,i,r;for(a=0,i=e.length;a<i;a++)r=e[a][n],isNaN(r)||(t.min=Math.min(t.min,r),t.max=Math.max(t.max,r))}function Ae(e){return e*(Z/180)}function wu(e){return e*(180/Z)}function xh(e){if(!gt(e))return;let t=1,n=0;for(;Math.round(e*t)/t!==e;)t*=10,n++;return n}function Xm(e,t){const n=t.x-e.x,a=t.y-e.y,i=Math.sqrt(n*n+a*a);let r=Math.atan2(a,n);return r<-.5*Z&&(r+=ot),{angle:r,distance:i}}function ad(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function g_(e,t){return(e-t+d_)%ot-Z}function Ht(e){return(e%ot+ot)%ot}function Rr(e,t,n,a){const i=Ht(e),r=Ht(t),s=Ht(n),l=Ht(r-i),o=Ht(s-i),c=Ht(i-r),d=Ht(i-s);return i===r||i===s||a&&r===s||l>o&&c<d}function Ct(e,t,n){return Math.max(t,Math.min(n,e))}function m_(e){return Ct(e,-32768,32767)}function an(e,t,n,a=1e-6){return e>=Math.min(t,n)-a&&e<=Math.max(t,n)+a}function Mu(e,t,n){n=n||(s=>e[s]<t);let a=e.length-1,i=0,r;for(;a-i>1;)r=i+a>>1,n(r)?i=r:a=r;return{lo:i,hi:a}}const rn=(e,t,n,a)=>Mu(e,n,a?i=>{const r=e[i][t];return r<n||r===n&&e[i+1][t]===n}:i=>e[i][t]<n),b_=(e,t,n)=>Mu(e,n,a=>e[a][t]>=n);function y_(e,t,n){let a=0,i=e.length;for(;a<i&&e[a]<t;)a++;for(;i>a&&e[i-1]>n;)i--;return a>0||i<e.length?e.slice(a,i):e}const Fm=["push","pop","shift","splice","unshift"];function v_(e,t){if(e._chartjs){e._chartjs.listeners.push(t);return}Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),Fm.forEach(n=>{const a="_onData"+Su(n),i=e[n];Object.defineProperty(e,n,{configurable:!0,enumerable:!1,value(...r){const s=i.apply(this,r);return e._chartjs.listeners.forEach(l=>{typeof l[a]=="function"&&l[a](...r)}),s}})})}function _h(e,t){const n=e._chartjs;if(!n)return;const a=n.listeners,i=a.indexOf(t);i!==-1&&a.splice(i,1),!(a.length>0)&&(Fm.forEach(r=>{delete e[r]}),delete e._chartjs)}function Qm(e){const t=new Set(e);return t.size===e.length?e:Array.from(t)}const Zm=function(){return typeof window>"u"?function(e){return e()}:window.requestAnimationFrame}();function Km(e,t){let n=[],a=!1;return function(...i){n=i,a||(a=!0,Zm.call(window,()=>{a=!1,e.apply(t,n)}))}}function x_(e,t){let n;return function(...a){return t?(clearTimeout(n),n=setTimeout(e,t,a)):e.apply(this,a),t}}const Au=e=>e==="start"?"left":e==="end"?"right":"center",Nt=(e,t,n)=>e==="start"?t:e==="end"?n:(t+n)/2,__=(e,t,n,a)=>e===(a?"left":"right")?n:e==="center"?(t+n)/2:t;function Pm(e,t,n){const a=t.length;let i=0,r=a;if(e._sorted){const{iScale:s,vScale:l,_parsed:o}=e,c=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null,d=s.axis,{min:u,max:f,minDefined:h,maxDefined:m}=s.getUserBounds();if(h){if(i=Math.min(rn(o,d,u).lo,n?a:rn(t,d,s.getPixelForValue(u)).lo),c){const b=o.slice(0,i+1).reverse().findIndex(v=>!G(v[l.axis]));i-=Math.max(0,b)}i=Ct(i,0,a-1)}if(m){let b=Math.max(rn(o,s.axis,f,!0).hi+1,n?0:rn(t,d,s.getPixelForValue(f),!0).hi+1);if(c){const v=o.slice(b-1).findIndex(p=>!G(p[l.axis]));b+=Math.max(0,v)}r=Ct(b,i,a)-i}else r=a-i}return{start:i,count:r}}function Wm(e){const{xScale:t,yScale:n,_scaleRanges:a}=e,i={xmin:t.min,xmax:t.max,ymin:n.min,ymax:n.max};if(!a)return e._scaleRanges=i,!0;const r=a.xmin!==t.min||a.xmax!==t.max||a.ymin!==n.min||a.ymax!==n.max;return Object.assign(a,i),r}const bs=e=>e===0||e===1,kh=(e,t,n)=>-(Math.pow(2,10*(e-=1))*Math.sin((e-t)*ot/n)),Sh=(e,t,n)=>Math.pow(2,-10*e)*Math.sin((e-t)*ot/n)+1,hr={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>(e-=1)*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-((e-=1)*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>(e-=1)*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>-Math.cos(e*bt)+1,easeOutSine:e=>Math.sin(e*bt),easeInOutSine:e=>-.5*(Math.cos(Z*e)-1),easeInExpo:e=>e===0?0:Math.pow(2,10*(e-1)),easeOutExpo:e=>e===1?1:-Math.pow(2,-10*e)+1,easeInOutExpo:e=>bs(e)?e:e<.5?.5*Math.pow(2,10*(e*2-1)):.5*(-Math.pow(2,-10*(e*2-1))+2),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1-(e-=1)*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>bs(e)?e:kh(e,.075,.3),easeOutElastic:e=>bs(e)?e:Sh(e,.075,.3),easeInOutElastic(e){return bs(e)?e:e<.5?.5*kh(e*2,.1125,.45):.5+.5*Sh(e*2-1,.1125,.45)},easeInBack(e){return e*e*((1.70158+1)*e-1.70158)},easeOutBack(e){return(e-=1)*e*((1.70158+1)*e+1.70158)+1},easeInOutBack(e){let t=1.70158;return(e/=.5)<1?.5*(e*e*(((t*=1.525)+1)*e-t)):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:e=>1-hr.easeOutBounce(1-e),easeOutBounce(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},easeInOutBounce:e=>e<.5?hr.easeInBounce(e*2)*.5:hr.easeOutBounce(e*2-1)*.5+.5};function Tu(e){if(e&&typeof e=="object"){const t=e.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function wh(e){return Tu(e)?e:new Or(e)}function Fo(e){return Tu(e)?e:new Or(e).saturate(.5).darken(.1).hexString()}const k_=["x","y","borderWidth","radius","tension"],S_=["color","borderColor","backgroundColor"];function w_(e){e.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),e.set("animations",{colors:{type:"color",properties:S_},numbers:{type:"number",properties:k_}}),e.describe("animations",{_fallback:"animation"}),e.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function M_(e){e.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const Mh=new Map;function A_(e,t){t=t||{};const n=e+JSON.stringify(t);let a=Mh.get(n);return a||(a=new Intl.NumberFormat(e,t),Mh.set(n,a)),a}function Jr(e,t,n){return A_(t,n).format(e)}const Jm={values(e){return ut(e)?e:""+e},numeric(e,t,n){if(e===0)return"0";const a=this.chart.options.locale;let i,r=e;if(n.length>1){const c=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(c<1e-4||c>1e15)&&(i="scientific"),r=T_(e,n)}const s=Cn(Math.abs(r)),l=isNaN(s)?1:Math.max(Math.min(-1*Math.floor(s),20),0),o={notation:i,minimumFractionDigits:l,maximumFractionDigits:l};return Object.assign(o,this.options.ticks.format),Jr(e,a,o)},logarithmic(e,t,n){if(e===0)return"0";const a=n[t].significand||e/Math.pow(10,Math.floor(Cn(e)));return[1,2,3,5,10,15].includes(a)||t>.8*n.length?Jm.numeric.call(this,e,t,n):""}};function T_(e,t){let n=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(n)>=1&&e!==Math.floor(e)&&(n=e-Math.floor(e)),n}var $l={formatters:Jm};function D_(e){e.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,n)=>n.lineWidth,tickColor:(t,n)=>n.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:$l.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),e.route("scale.ticks","color","","color"),e.route("scale.grid","color","","borderColor"),e.route("scale.border","color","","borderColor"),e.route("scale.title","color","","color"),e.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),e.describe("scales",{_fallback:"scale"}),e.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const Sa=Object.create(null),id=Object.create(null);function pr(e,t){if(!t)return e;const n=t.split(".");for(let a=0,i=n.length;a<i;++a){const r=n[a];e=e[r]||(e[r]=Object.create(null))}return e}function Qo(e,t,n){return typeof t=="string"?Er(pr(e,t),n):Er(pr(e,""),t)}class C_{constructor(t,n){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=a=>a.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(a,i)=>Fo(i.backgroundColor),this.hoverBorderColor=(a,i)=>Fo(i.borderColor),this.hoverColor=(a,i)=>Fo(i.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(n)}set(t,n){return Qo(this,t,n)}get(t){return pr(this,t)}describe(t,n){return Qo(id,t,n)}override(t,n){return Qo(Sa,t,n)}route(t,n,a,i){const r=pr(this,t),s=pr(this,a),l="_"+n;Object.defineProperties(r,{[l]:{value:r[n],writable:!0},[n]:{enumerable:!0,get(){const o=this[l],c=s[i];return X(o)?Object.assign({},c,o):B(o,c)},set(o){this[l]=o}}})}apply(t){t.forEach(n=>n(this))}}var ft=new C_({_scriptable:e=>!e.startsWith("on"),_indexable:e=>e!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[w_,M_,D_]);function O_(e){return!e||G(e.size)||G(e.family)?null:(e.style?e.style+" ":"")+(e.weight?e.weight+" ":"")+e.size+"px "+e.family}function Cl(e,t,n,a,i){let r=t[i];return r||(r=t[i]=e.measureText(i).width,n.push(i)),r>a&&(a=r),a}function E_(e,t,n,a){a=a||{};let i=a.data=a.data||{},r=a.garbageCollect=a.garbageCollect||[];a.font!==t&&(i=a.data={},r=a.garbageCollect=[],a.font=t),e.save(),e.font=t;let s=0;const l=n.length;let o,c,d,u,f;for(o=0;o<l;o++)if(u=n[o],u!=null&&!ut(u))s=Cl(e,i,r,s,u);else if(ut(u))for(c=0,d=u.length;c<d;c++)f=u[c],f!=null&&!ut(f)&&(s=Cl(e,i,r,s,f));e.restore();const h=r.length/2;if(h>n.length){for(o=0;o<h;o++)delete i[r[o]];r.splice(0,h)}return s}function ea(e,t,n){const a=e.currentDevicePixelRatio,i=n!==0?Math.max(n/2,.5):0;return Math.round((t-i)*a)/a+i}function Ah(e,t){!t&&!e||(t=t||e.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,e.width,e.height),t.restore())}function rd(e,t,n,a){Im(e,t,n,a,null)}function Im(e,t,n,a,i){let r,s,l,o,c,d,u,f;const h=t.pointStyle,m=t.rotation,b=t.radius;let v=(m||0)*u_;if(h&&typeof h=="object"&&(r=h.toString(),r==="[object HTMLImageElement]"||r==="[object HTMLCanvasElement]")){e.save(),e.translate(n,a),e.rotate(v),e.drawImage(h,-h.width/2,-h.height/2,h.width,h.height),e.restore();return}if(!(isNaN(b)||b<=0)){switch(e.beginPath(),h){default:i?e.ellipse(n,a,i/2,b,0,0,ot):e.arc(n,a,b,0,ot),e.closePath();break;case"triangle":d=i?i/2:b,e.moveTo(n+Math.sin(v)*d,a-Math.cos(v)*b),v+=yh,e.lineTo(n+Math.sin(v)*d,a-Math.cos(v)*b),v+=yh,e.lineTo(n+Math.sin(v)*d,a-Math.cos(v)*b),e.closePath();break;case"rectRounded":c=b*.516,o=b-c,s=Math.cos(v+ta)*o,u=Math.cos(v+ta)*(i?i/2-c:o),l=Math.sin(v+ta)*o,f=Math.sin(v+ta)*(i?i/2-c:o),e.arc(n-u,a-l,c,v-Z,v-bt),e.arc(n+f,a-s,c,v-bt,v),e.arc(n+u,a+l,c,v,v+bt),e.arc(n-f,a+s,c,v+bt,v+Z),e.closePath();break;case"rect":if(!m){o=Math.SQRT1_2*b,d=i?i/2:o,e.rect(n-d,a-o,2*d,2*o);break}v+=ta;case"rectRot":u=Math.cos(v)*(i?i/2:b),s=Math.cos(v)*b,l=Math.sin(v)*b,f=Math.sin(v)*(i?i/2:b),e.moveTo(n-u,a-l),e.lineTo(n+f,a-s),e.lineTo(n+u,a+l),e.lineTo(n-f,a+s),e.closePath();break;case"crossRot":v+=ta;case"cross":u=Math.cos(v)*(i?i/2:b),s=Math.cos(v)*b,l=Math.sin(v)*b,f=Math.sin(v)*(i?i/2:b),e.moveTo(n-u,a-l),e.lineTo(n+u,a+l),e.moveTo(n+f,a-s),e.lineTo(n-f,a+s);break;case"star":u=Math.cos(v)*(i?i/2:b),s=Math.cos(v)*b,l=Math.sin(v)*b,f=Math.sin(v)*(i?i/2:b),e.moveTo(n-u,a-l),e.lineTo(n+u,a+l),e.moveTo(n+f,a-s),e.lineTo(n-f,a+s),v+=ta,u=Math.cos(v)*(i?i/2:b),s=Math.cos(v)*b,l=Math.sin(v)*b,f=Math.sin(v)*(i?i/2:b),e.moveTo(n-u,a-l),e.lineTo(n+u,a+l),e.moveTo(n+f,a-s),e.lineTo(n-f,a+s);break;case"line":s=i?i/2:Math.cos(v)*b,l=Math.sin(v)*b,e.moveTo(n-s,a-l),e.lineTo(n+s,a+l);break;case"dash":e.moveTo(n,a),e.lineTo(n+Math.cos(v)*(i?i/2:b),a+Math.sin(v)*b);break;case!1:e.closePath();break}e.fill(),t.borderWidth>0&&e.stroke()}}function sn(e,t,n){return n=n||.5,!t||e&&e.x>t.left-n&&e.x<t.right+n&&e.y>t.top-n&&e.y<t.bottom+n}function to(e,t){e.save(),e.beginPath(),e.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),e.clip()}function eo(e){e.restore()}function z_(e,t,n,a,i){if(!t)return e.lineTo(n.x,n.y);if(i==="middle"){const r=(t.x+n.x)/2;e.lineTo(r,t.y),e.lineTo(r,n.y)}else i==="after"!=!!a?e.lineTo(t.x,n.y):e.lineTo(n.x,t.y);e.lineTo(n.x,n.y)}function R_(e,t,n,a){if(!t)return e.lineTo(n.x,n.y);e.bezierCurveTo(a?t.cp1x:t.cp2x,a?t.cp1y:t.cp2y,a?n.cp2x:n.cp1x,a?n.cp2y:n.cp1y,n.x,n.y)}function L_(e,t){t.translation&&e.translate(t.translation[0],t.translation[1]),G(t.rotation)||e.rotate(t.rotation),t.color&&(e.fillStyle=t.color),t.textAlign&&(e.textAlign=t.textAlign),t.textBaseline&&(e.textBaseline=t.textBaseline)}function B_(e,t,n,a,i){if(i.strikethrough||i.underline){const r=e.measureText(a),s=t-r.actualBoundingBoxLeft,l=t+r.actualBoundingBoxRight,o=n-r.actualBoundingBoxAscent,c=n+r.actualBoundingBoxDescent,d=i.strikethrough?(o+c)/2:c;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=i.decorationWidth||2,e.moveTo(s,d),e.lineTo(l,d),e.stroke()}}function N_(e,t){const n=e.fillStyle;e.fillStyle=t.color,e.fillRect(t.left,t.top,t.width,t.height),e.fillStyle=n}function wa(e,t,n,a,i,r={}){const s=ut(t)?t:[t],l=r.strokeWidth>0&&r.strokeColor!=="";let o,c;for(e.save(),e.font=i.string,L_(e,r),o=0;o<s.length;++o)c=s[o],r.backdrop&&N_(e,r.backdrop),l&&(r.strokeColor&&(e.strokeStyle=r.strokeColor),G(r.strokeWidth)||(e.lineWidth=r.strokeWidth),e.strokeText(c,n,a,r.maxWidth)),e.fillText(c,n,a,r.maxWidth),B_(e,n,a,c,r),a+=Number(i.lineHeight);e.restore()}function Lr(e,t){const{x:n,y:a,w:i,h:r,radius:s}=t;e.arc(n+s.topLeft,a+s.topLeft,s.topLeft,1.5*Z,Z,!0),e.lineTo(n,a+r-s.bottomLeft),e.arc(n+s.bottomLeft,a+r-s.bottomLeft,s.bottomLeft,Z,bt,!0),e.lineTo(n+i-s.bottomRight,a+r),e.arc(n+i-s.bottomRight,a+r-s.bottomRight,s.bottomRight,bt,0,!0),e.lineTo(n+i,a+s.topRight),e.arc(n+i-s.topRight,a+s.topRight,s.topRight,0,-bt,!0),e.lineTo(n+s.topLeft,a)}const j_=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,H_=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function U_(e,t){const n=(""+e).match(j_);if(!n||n[1]==="normal")return t*1.2;switch(e=+n[2],n[3]){case"px":return e;case"%":e/=100;break}return t*e}const V_=e=>+e||0;function Du(e,t){const n={},a=X(t),i=a?Object.keys(t):t,r=X(e)?a?s=>B(e[s],e[t[s]]):s=>e[s]:()=>e;for(const s of i)n[s]=V_(r(s));return n}function $m(e){return Du(e,{top:"y",right:"x",bottom:"y",left:"x"})}function ma(e){return Du(e,["topLeft","topRight","bottomLeft","bottomRight"])}function Vt(e){const t=$m(e);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function Mt(e,t){e=e||{},t=t||ft.font;let n=B(e.size,t.size);typeof n=="string"&&(n=parseInt(n,10));let a=B(e.style,t.style);a&&!(""+a).match(H_)&&(console.warn('Invalid font style specified: "'+a+'"'),a=void 0);const i={family:B(e.family,t.family),lineHeight:U_(B(e.lineHeight,t.lineHeight),n),size:n,style:a,weight:B(e.weight,t.weight),string:""};return i.string=O_(i),i}function Qi(e,t,n,a){let i,r,s;for(i=0,r=e.length;i<r;++i)if(s=e[i],s!==void 0&&s!==void 0)return s}function Y_(e,t,n){const{min:a,max:i}=e,r=Ym(t,(i-a)/2),s=(l,o)=>n&&l===0?0:l+o;return{min:s(a,-Math.abs(r)),max:s(i,r)}}function Jn(e,t){return Object.assign(Object.create(e),t)}function Cu(e,t=[""],n,a,i=()=>e[0]){const r=n||e;typeof a>"u"&&(a=ab("_fallback",e));const s={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:e,_rootScopes:r,_fallback:a,_getTarget:i,override:l=>Cu([l,...e],t,r,a)};return new Proxy(s,{deleteProperty(l,o){return delete l[o],delete l._keys,delete e[0][o],!0},get(l,o){return eb(l,o,()=>P_(o,t,e,l))},getOwnPropertyDescriptor(l,o){return Reflect.getOwnPropertyDescriptor(l._scopes[0],o)},getPrototypeOf(){return Reflect.getPrototypeOf(e[0])},has(l,o){return Dh(l).includes(o)},ownKeys(l){return Dh(l)},set(l,o,c){const d=l._storage||(l._storage=i());return l[o]=d[o]=c,delete l._keys,!0}})}function bi(e,t,n,a){const i={_cacheable:!1,_proxy:e,_context:t,_subProxy:n,_stack:new Set,_descriptors:tb(e,a),setContext:r=>bi(e,r,n,a),override:r=>bi(e.override(r),t,n,a)};return new Proxy(i,{deleteProperty(r,s){return delete r[s],delete e[s],!0},get(r,s,l){return eb(r,s,()=>q_(r,s,l))},getOwnPropertyDescriptor(r,s){return r._descriptors.allKeys?Reflect.has(e,s)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,s)},getPrototypeOf(){return Reflect.getPrototypeOf(e)},has(r,s){return Reflect.has(e,s)},ownKeys(){return Reflect.ownKeys(e)},set(r,s,l){return e[s]=l,delete r[s],!0}})}function tb(e,t={scriptable:!0,indexable:!0}){const{_scriptable:n=t.scriptable,_indexable:a=t.indexable,_allKeys:i=t.allKeys}=e;return{allKeys:i,scriptable:n,indexable:a,isScriptable:Kn(n)?n:()=>n,isIndexable:Kn(a)?a:()=>a}}const G_=(e,t)=>e?e+Su(t):t,Ou=(e,t)=>X(t)&&e!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function eb(e,t,n){if(Object.prototype.hasOwnProperty.call(e,t)||t==="constructor")return e[t];const a=n();return e[t]=a,a}function q_(e,t,n){const{_proxy:a,_context:i,_subProxy:r,_descriptors:s}=e;let l=a[t];return Kn(l)&&s.isScriptable(t)&&(l=X_(t,l,e,n)),ut(l)&&l.length&&(l=F_(t,l,e,s.isIndexable)),Ou(t,l)&&(l=bi(l,i,r&&r[t],s)),l}function X_(e,t,n,a){const{_proxy:i,_context:r,_subProxy:s,_stack:l}=n;if(l.has(e))throw new Error("Recursion detected: "+Array.from(l).join("->")+"->"+e);l.add(e);let o=t(r,s||a);return l.delete(e),Ou(e,o)&&(o=Eu(i._scopes,i,e,o)),o}function F_(e,t,n,a){const{_proxy:i,_context:r,_subProxy:s,_descriptors:l}=n;if(typeof r.index<"u"&&a(e))return t[r.index%t.length];if(X(t[0])){const o=t,c=i._scopes.filter(d=>d!==o);t=[];for(const d of o){const u=Eu(c,i,e,d);t.push(bi(u,r,s&&s[e],l))}}return t}function nb(e,t,n){return Kn(e)?e(t,n):e}const Q_=(e,t)=>e===!0?t:typeof e=="string"?Zn(t,e):void 0;function Z_(e,t,n,a,i){for(const r of t){const s=Q_(n,r);if(s){e.add(s);const l=nb(s._fallback,n,i);if(typeof l<"u"&&l!==n&&l!==a)return l}else if(s===!1&&typeof a<"u"&&n!==a)return null}return!1}function Eu(e,t,n,a){const i=t._rootScopes,r=nb(t._fallback,n,a),s=[...e,...i],l=new Set;l.add(a);let o=Th(l,s,n,r||n,a);return o===null||typeof r<"u"&&r!==n&&(o=Th(l,s,r,o,a),o===null)?!1:Cu(Array.from(l),[""],i,r,()=>K_(t,n,a))}function Th(e,t,n,a,i){for(;n;)n=Z_(e,t,n,a,i);return n}function K_(e,t,n){const a=e._getTarget();t in a||(a[t]={});const i=a[t];return ut(i)&&X(n)?n:i||{}}function P_(e,t,n,a){let i;for(const r of t)if(i=ab(G_(r,e),n),typeof i<"u")return Ou(e,i)?Eu(n,a,e,i):i}function ab(e,t){for(const n of t){if(!n)continue;const a=n[e];if(typeof a<"u")return a}}function Dh(e){let t=e._keys;return t||(t=e._keys=W_(e._scopes)),t}function W_(e){const t=new Set;for(const n of e)for(const a of Object.keys(n).filter(i=>!i.startsWith("_")))t.add(a);return Array.from(t)}function ib(e,t,n,a){const{iScale:i}=e,{key:r="r"}=this._parsing,s=new Array(a);let l,o,c,d;for(l=0,o=a;l<o;++l)c=l+n,d=t[c],s[l]={r:i.parse(Zn(d,r),c)};return s}const J_=Number.EPSILON||1e-14,yi=(e,t)=>t<e.length&&!e[t].skip&&e[t],rb=e=>e==="x"?"y":"x";function I_(e,t,n,a){const i=e.skip?t:e,r=t,s=n.skip?t:n,l=ad(r,i),o=ad(s,r);let c=l/(l+o),d=o/(l+o);c=isNaN(c)?0:c,d=isNaN(d)?0:d;const u=a*c,f=a*d;return{previous:{x:r.x-u*(s.x-i.x),y:r.y-u*(s.y-i.y)},next:{x:r.x+f*(s.x-i.x),y:r.y+f*(s.y-i.y)}}}function $_(e,t,n){const a=e.length;let i,r,s,l,o,c=yi(e,0);for(let d=0;d<a-1;++d)if(o=c,c=yi(e,d+1),!(!o||!c)){if(fr(t[d],0,J_)){n[d]=n[d+1]=0;continue}i=n[d]/t[d],r=n[d+1]/t[d],l=Math.pow(i,2)+Math.pow(r,2),!(l<=9)&&(s=3/Math.sqrt(l),n[d]=i*s*t[d],n[d+1]=r*s*t[d])}}function t2(e,t,n="x"){const a=rb(n),i=e.length;let r,s,l,o=yi(e,0);for(let c=0;c<i;++c){if(s=l,l=o,o=yi(e,c+1),!l)continue;const d=l[n],u=l[a];s&&(r=(d-s[n])/3,l[`cp1${n}`]=d-r,l[`cp1${a}`]=u-r*t[c]),o&&(r=(o[n]-d)/3,l[`cp2${n}`]=d+r,l[`cp2${a}`]=u+r*t[c])}}function e2(e,t="x"){const n=rb(t),a=e.length,i=Array(a).fill(0),r=Array(a);let s,l,o,c=yi(e,0);for(s=0;s<a;++s)if(l=o,o=c,c=yi(e,s+1),!!o){if(c){const d=c[t]-o[t];i[s]=d!==0?(c[n]-o[n])/d:0}r[s]=l?c?je(i[s-1])!==je(i[s])?0:(i[s-1]+i[s])/2:i[s-1]:i[s]}$_(e,i,r),t2(e,r,t)}function ys(e,t,n){return Math.max(Math.min(e,n),t)}function n2(e,t){let n,a,i,r,s,l=sn(e[0],t);for(n=0,a=e.length;n<a;++n)s=r,r=l,l=n<a-1&&sn(e[n+1],t),r&&(i=e[n],s&&(i.cp1x=ys(i.cp1x,t.left,t.right),i.cp1y=ys(i.cp1y,t.top,t.bottom)),l&&(i.cp2x=ys(i.cp2x,t.left,t.right),i.cp2y=ys(i.cp2y,t.top,t.bottom)))}function a2(e,t,n,a,i){let r,s,l,o;if(t.spanGaps&&(e=e.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")e2(e,i);else{let c=a?e[e.length-1]:e[0];for(r=0,s=e.length;r<s;++r)l=e[r],o=I_(c,l,e[Math.min(r+1,s-(a?0:1))%s],t.tension),l.cp1x=o.previous.x,l.cp1y=o.previous.y,l.cp2x=o.next.x,l.cp2y=o.next.y,c=l}t.capBezierPoints&&n2(e,n)}function zu(){return typeof window<"u"&&typeof document<"u"}function Ru(e){let t=e.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function Ol(e,t,n){let a;return typeof e=="string"?(a=parseInt(e,10),e.indexOf("%")!==-1&&(a=a/100*t.parentNode[n])):a=e,a}const no=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);function i2(e,t){return no(e).getPropertyValue(t)}const r2=["top","right","bottom","left"];function ba(e,t,n){const a={};n=n?"-"+n:"";for(let i=0;i<4;i++){const r=r2[i];a[r]=parseFloat(e[t+"-"+r+n])||0}return a.width=a.left+a.right,a.height=a.top+a.bottom,a}const s2=(e,t,n)=>(e>0||t>0)&&(!n||!n.shadowRoot);function l2(e,t){const n=e.touches,a=n&&n.length?n[0]:e,{offsetX:i,offsetY:r}=a;let s=!1,l,o;if(s2(i,r,e.target))l=i,o=r;else{const c=t.getBoundingClientRect();l=a.clientX-c.left,o=a.clientY-c.top,s=!0}return{x:l,y:o,box:s}}function oa(e,t){if("native"in e)return e;const{canvas:n,currentDevicePixelRatio:a}=t,i=no(n),r=i.boxSizing==="border-box",s=ba(i,"padding"),l=ba(i,"border","width"),{x:o,y:c,box:d}=l2(e,n),u=s.left+(d&&l.left),f=s.top+(d&&l.top);let{width:h,height:m}=t;return r&&(h-=s.width+l.width,m-=s.height+l.height),{x:Math.round((o-u)/h*n.width/a),y:Math.round((c-f)/m*n.height/a)}}function o2(e,t,n){let a,i;if(t===void 0||n===void 0){const r=e&&Ru(e);if(!r)t=e.clientWidth,n=e.clientHeight;else{const s=r.getBoundingClientRect(),l=no(r),o=ba(l,"border","width"),c=ba(l,"padding");t=s.width-c.width-o.width,n=s.height-c.height-o.height,a=Ol(l.maxWidth,r,"clientWidth"),i=Ol(l.maxHeight,r,"clientHeight")}}return{width:t,height:n,maxWidth:a||Dl,maxHeight:i||Dl}}const On=e=>Math.round(e*10)/10;function c2(e,t,n,a){const i=no(e),r=ba(i,"margin"),s=Ol(i.maxWidth,e,"clientWidth")||Dl,l=Ol(i.maxHeight,e,"clientHeight")||Dl,o=o2(e,t,n);let{width:c,height:d}=o;if(i.boxSizing==="content-box"){const f=ba(i,"border","width"),h=ba(i,"padding");c-=h.width+f.width,d-=h.height+f.height}return c=Math.max(0,c-r.width),d=Math.max(0,a?c/a:d-r.height),c=On(Math.min(c,s,o.maxWidth)),d=On(Math.min(d,l,o.maxHeight)),c&&!d&&(d=On(c/2)),(t!==void 0||n!==void 0)&&a&&o.height&&d>o.height&&(d=o.height,c=On(Math.floor(d*a))),{width:c,height:d}}function Ch(e,t,n){const a=t||1,i=On(e.height*a),r=On(e.width*a);e.height=On(e.height),e.width=On(e.width);const s=e.canvas;return s.style&&(n||!s.style.height&&!s.style.width)&&(s.style.height=`${e.height}px`,s.style.width=`${e.width}px`),e.currentDevicePixelRatio!==a||s.height!==i||s.width!==r?(e.currentDevicePixelRatio=a,s.height=i,s.width=r,e.ctx.setTransform(a,0,0,a,0,0),!0):!1}const d2=function(){let e=!1;try{const t={get passive(){return e=!0,!1}};zu()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return e}();function Oh(e,t){const n=i2(e,t),a=n&&n.match(/^(\d+)(\.\d+)?px$/);return a?+a[1]:void 0}function ca(e,t,n,a){return{x:e.x+n*(t.x-e.x),y:e.y+n*(t.y-e.y)}}function u2(e,t,n,a){return{x:e.x+n*(t.x-e.x),y:a==="middle"?n<.5?e.y:t.y:a==="after"?n<1?e.y:t.y:n>0?t.y:e.y}}function f2(e,t,n,a){const i={x:e.cp2x,y:e.cp2y},r={x:t.cp1x,y:t.cp1y},s=ca(e,i,n),l=ca(i,r,n),o=ca(r,t,n),c=ca(s,l,n),d=ca(l,o,n);return ca(c,d,n)}const h2=function(e,t){return{x(n){return e+e+t-n},setWidth(n){t=n},textAlign(n){return n==="center"?n:n==="right"?"left":"right"},xPlus(n,a){return n-a},leftForLtr(n,a){return n-a}}},p2=function(){return{x(e){return e},setWidth(e){},textAlign(e){return e},xPlus(e,t){return e+t},leftForLtr(e,t){return e}}};function ii(e,t,n){return e?h2(t,n):p2()}function sb(e,t){let n,a;(t==="ltr"||t==="rtl")&&(n=e.canvas.style,a=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",t,"important"),e.prevTextDirection=a)}function lb(e,t){t!==void 0&&(delete e.prevTextDirection,e.canvas.style.setProperty("direction",t[0],t[1]))}function ob(e){return e==="angle"?{between:Rr,compare:g_,normalize:Ht}:{between:an,compare:(t,n)=>t-n,normalize:t=>t}}function Eh({start:e,end:t,count:n,loop:a,style:i}){return{start:e%n,end:t%n,loop:a&&(t-e+1)%n===0,style:i}}function g2(e,t,n){const{property:a,start:i,end:r}=n,{between:s,normalize:l}=ob(a),o=t.length;let{start:c,end:d,loop:u}=e,f,h;if(u){for(c+=o,d+=o,f=0,h=o;f<h&&s(l(t[c%o][a]),i,r);++f)c--,d--;c%=o,d%=o}return d<c&&(d+=o),{start:c,end:d,loop:u,style:e.style}}function cb(e,t,n){if(!n)return[e];const{property:a,start:i,end:r}=n,s=t.length,{compare:l,between:o,normalize:c}=ob(a),{start:d,end:u,loop:f,style:h}=g2(e,t,n),m=[];let b=!1,v=null,p,g,y;const x=()=>o(i,y,p)&&l(i,y)!==0,_=()=>l(r,p)===0||o(r,y,p),w=()=>b||x(),k=()=>!b||_();for(let S=d,A=d;S<=u;++S)g=t[S%s],!g.skip&&(p=c(g[a]),p!==y&&(b=o(p,i,r),v===null&&w()&&(v=l(p,i)===0?S:A),v!==null&&k()&&(m.push(Eh({start:v,end:S,loop:f,count:s,style:h})),v=null),A=S,y=p));return v!==null&&m.push(Eh({start:v,end:u,loop:f,count:s,style:h})),m}function db(e,t){const n=[],a=e.segments;for(let i=0;i<a.length;i++){const r=cb(a[i],e.points,t);r.length&&n.push(...r)}return n}function m2(e,t,n,a){let i=0,r=t-1;if(n&&!a)for(;i<t&&!e[i].skip;)i++;for(;i<t&&e[i].skip;)i++;for(i%=t,n&&(r+=i);r>i&&e[r%t].skip;)r--;return r%=t,{start:i,end:r}}function b2(e,t,n,a){const i=e.length,r=[];let s=t,l=e[t],o;for(o=t+1;o<=n;++o){const c=e[o%i];c.skip||c.stop?l.skip||(a=!1,r.push({start:t%i,end:(o-1)%i,loop:a}),t=s=c.stop?o:null):(s=o,l.skip&&(t=o)),l=c}return s!==null&&r.push({start:t%i,end:s%i,loop:a}),r}function y2(e,t){const n=e.points,a=e.options.spanGaps,i=n.length;if(!i)return[];const r=!!e._loop,{start:s,end:l}=m2(n,i,r,a);if(a===!0)return zh(e,[{start:s,end:l,loop:r}],n,t);const o=l<s?l+i:l,c=!!e._fullLoop&&s===0&&l===i-1;return zh(e,b2(n,s,o,c),n,t)}function zh(e,t,n,a){return!a||!a.setContext||!n?t:v2(e,t,n,a)}function v2(e,t,n,a){const i=e._chart.getContext(),r=Rh(e.options),{_datasetIndex:s,options:{spanGaps:l}}=e,o=n.length,c=[];let d=r,u=t[0].start,f=u;function h(m,b,v,p){const g=l?-1:1;if(m!==b){for(m+=o;n[m%o].skip;)m-=g;for(;n[b%o].skip;)b+=g;m%o!==b%o&&(c.push({start:m%o,end:b%o,loop:v,style:p}),d=p,u=b%o)}}for(const m of t){u=l?u:m.start;let b=n[u%o],v;for(f=u+1;f<=m.end;f++){const p=n[f%o];v=Rh(a.setContext(Jn(i,{type:"segment",p0:b,p1:p,p0DataIndex:(f-1)%o,p1DataIndex:f%o,datasetIndex:s}))),x2(v,d)&&h(u,f-1,m.loop,d),b=p,d=v}u<f-1&&h(u,f-1,m.loop,d)}return c}function Rh(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function x2(e,t){if(!t)return!1;const n=[],a=function(i,r){return Tu(r)?(n.includes(r)||n.push(r),n.indexOf(r)):r};return JSON.stringify(e,a)!==JSON.stringify(t,a)}function vs(e,t,n){return e.options.clip?e[n]:t[n]}function _2(e,t){const{xScale:n,yScale:a}=e;return n&&a?{left:vs(n,t,"left"),right:vs(n,t,"right"),top:vs(a,t,"top"),bottom:vs(a,t,"bottom")}:t}function ub(e,t){const n=t._clip;if(n.disabled)return!1;const a=_2(t,e.chartArea);return{left:n.left===!1?0:a.left-(n.left===!0?0:n.left),right:n.right===!1?e.width:a.right+(n.right===!0?0:n.right),top:n.top===!1?0:a.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?e.height:a.bottom+(n.bottom===!0?0:n.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class k2{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,n,a,i){const r=n.listeners[i],s=n.duration;r.forEach(l=>l({chart:t,initial:n.initial,numSteps:s,currentStep:Math.min(a-n.start,s)}))}_refresh(){this._request||(this._running=!0,this._request=Zm.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let n=0;this._charts.forEach((a,i)=>{if(!a.running||!a.items.length)return;const r=a.items;let s=r.length-1,l=!1,o;for(;s>=0;--s)o=r[s],o._active?(o._total>a.duration&&(a.duration=o._total),o.tick(t),l=!0):(r[s]=r[r.length-1],r.pop());l&&(i.draw(),this._notify(i,a,t,"progress")),r.length||(a.running=!1,this._notify(i,a,t,"complete"),a.initial=!1),n+=r.length}),this._lastDate=t,n===0&&(this._running=!1)}_getAnims(t){const n=this._charts;let a=n.get(t);return a||(a={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},n.set(t,a)),a}listen(t,n,a){this._getAnims(t).listeners[n].push(a)}add(t,n){!n||!n.length||this._getAnims(t).items.push(...n)}has(t){return this._getAnims(t).items.length>0}start(t){const n=this._charts.get(t);n&&(n.running=!0,n.start=Date.now(),n.duration=n.items.reduce((a,i)=>Math.max(a,i._duration),0),this._refresh())}running(t){if(!this._running)return!1;const n=this._charts.get(t);return!(!n||!n.running||!n.items.length)}stop(t){const n=this._charts.get(t);if(!n||!n.items.length)return;const a=n.items;let i=a.length-1;for(;i>=0;--i)a[i].cancel();n.items=[],this._notify(t,n,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var Ke=new k2;const Lh="transparent",S2={boolean(e,t,n){return n>.5?t:e},color(e,t,n){const a=wh(e||Lh),i=a.valid&&wh(t||Lh);return i&&i.valid?i.mix(a,n).hexString():t},number(e,t,n){return e+(t-e)*n}};class w2{constructor(t,n,a,i){const r=n[a];i=Qi([t.to,i,r,t.from]);const s=Qi([t.from,r,i]);this._active=!0,this._fn=t.fn||S2[t.type||typeof s],this._easing=hr[t.easing]||hr.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=n,this._prop=a,this._from=s,this._to=i,this._promises=void 0}active(){return this._active}update(t,n,a){if(this._active){this._notify(!1);const i=this._target[this._prop],r=a-this._start,s=this._duration-r;this._start=a,this._duration=Math.floor(Math.max(s,t.duration)),this._total+=r,this._loop=!!t.loop,this._to=Qi([t.to,n,i,t.from]),this._from=Qi([t.from,i,n])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const n=t-this._start,a=this._duration,i=this._prop,r=this._from,s=this._loop,l=this._to;let o;if(this._active=r!==l&&(s||n<a),!this._active){this._target[i]=l,this._notify(!0);return}if(n<0){this._target[i]=r;return}o=n/a%2,o=s&&o>1?2-o:o,o=this._easing(Math.min(1,Math.max(0,o))),this._target[i]=this._fn(r,l,o)}wait(){const t=this._promises||(this._promises=[]);return new Promise((n,a)=>{t.push({res:n,rej:a})})}_notify(t){const n=t?"res":"rej",a=this._promises||[];for(let i=0;i<a.length;i++)a[i][n]()}}class fb{constructor(t,n){this._chart=t,this._properties=new Map,this.configure(n)}configure(t){if(!X(t))return;const n=Object.keys(ft.animation),a=this._properties;Object.getOwnPropertyNames(t).forEach(i=>{const r=t[i];if(!X(r))return;const s={};for(const l of n)s[l]=r[l];(ut(r.properties)&&r.properties||[i]).forEach(l=>{(l===i||!a.has(l))&&a.set(l,s)})})}_animateOptions(t,n){const a=n.options,i=A2(t,a);if(!i)return[];const r=this._createAnimations(i,a);return a.$shared&&M2(t.options.$animations,a).then(()=>{t.options=a},()=>{}),r}_createAnimations(t,n){const a=this._properties,i=[],r=t.$animations||(t.$animations={}),s=Object.keys(n),l=Date.now();let o;for(o=s.length-1;o>=0;--o){const c=s[o];if(c.charAt(0)==="$")continue;if(c==="options"){i.push(...this._animateOptions(t,n));continue}const d=n[c];let u=r[c];const f=a.get(c);if(u)if(f&&u.active()){u.update(f,d,l);continue}else u.cancel();if(!f||!f.duration){t[c]=d;continue}r[c]=u=new w2(f,t,c,d),i.push(u)}return i}update(t,n){if(this._properties.size===0){Object.assign(t,n);return}const a=this._createAnimations(t,n);if(a.length)return Ke.add(this._chart,a),!0}}function M2(e,t){const n=[],a=Object.keys(t);for(let i=0;i<a.length;i++){const r=e[a[i]];r&&r.active()&&n.push(r.wait())}return Promise.all(n)}function A2(e,t){if(!t)return;let n=e.options;if(!n){e.options=t;return}return n.$shared&&(e.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function Bh(e,t){const n=e&&e.options||{},a=n.reverse,i=n.min===void 0?t:0,r=n.max===void 0?t:0;return{start:a?r:i,end:a?i:r}}function T2(e,t,n){if(n===!1)return!1;const a=Bh(e,n),i=Bh(t,n);return{top:i.end,right:a.end,bottom:i.start,left:a.start}}function D2(e){let t,n,a,i;return X(e)?(t=e.top,n=e.right,a=e.bottom,i=e.left):t=n=a=i=e,{top:t,right:n,bottom:a,left:i,disabled:e===!1}}function hb(e,t){const n=[],a=e._getSortedDatasetMetas(t);let i,r;for(i=0,r=a.length;i<r;++i)n.push(a[i].index);return n}function Nh(e,t,n,a={}){const i=e.keys,r=a.mode==="single";let s,l,o,c;if(t===null)return;let d=!1;for(s=0,l=i.length;s<l;++s){if(o=+i[s],o===n){if(d=!0,a.all)continue;break}c=e.values[o],gt(c)&&(r||t===0||je(t)===je(c))&&(t+=c)}return!d&&!a.all?0:t}function C2(e,t){const{iScale:n,vScale:a}=t,i=n.axis==="x"?"x":"y",r=a.axis==="x"?"x":"y",s=Object.keys(e),l=new Array(s.length);let o,c,d;for(o=0,c=s.length;o<c;++o)d=s[o],l[o]={[i]:d,[r]:e[d]};return l}function Zo(e,t){const n=e&&e.options.stacked;return n||n===void 0&&t.stack!==void 0}function O2(e,t,n){return`${e.id}.${t.id}.${n.stack||n.type}`}function E2(e){const{min:t,max:n,minDefined:a,maxDefined:i}=e.getUserBounds();return{min:a?t:Number.NEGATIVE_INFINITY,max:i?n:Number.POSITIVE_INFINITY}}function z2(e,t,n){const a=e[t]||(e[t]={});return a[n]||(a[n]={})}function jh(e,t,n,a){for(const i of t.getMatchingVisibleMetas(a).reverse()){const r=e[i.index];if(n&&r>0||!n&&r<0)return i.index}return null}function Hh(e,t){const{chart:n,_cachedMeta:a}=e,i=n._stacks||(n._stacks={}),{iScale:r,vScale:s,index:l}=a,o=r.axis,c=s.axis,d=O2(r,s,a),u=t.length;let f;for(let h=0;h<u;++h){const m=t[h],{[o]:b,[c]:v}=m,p=m._stacks||(m._stacks={});f=p[c]=z2(i,d,b),f[l]=v,f._top=jh(f,s,!0,a.type),f._bottom=jh(f,s,!1,a.type);const g=f._visualValues||(f._visualValues={});g[l]=v}}function Ko(e,t){const n=e.scales;return Object.keys(n).filter(a=>n[a].axis===t).shift()}function R2(e,t){return Jn(e,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function L2(e,t,n){return Jn(e,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:n,index:t,mode:"default",type:"data"})}function Bi(e,t){const n=e.controller.index,a=e.vScale&&e.vScale.axis;if(a){t=t||e._parsed;for(const i of t){const r=i._stacks;if(!r||r[a]===void 0||r[a][n]===void 0)return;delete r[a][n],r[a]._visualValues!==void 0&&r[a]._visualValues[n]!==void 0&&delete r[a]._visualValues[n]}}}const Po=e=>e==="reset"||e==="none",Uh=(e,t)=>t?e:Object.assign({},e),B2=(e,t,n)=>e&&!t.hidden&&t._stacked&&{keys:hb(n,!0),values:null};class Te{constructor(t,n){this.chart=t,this._ctx=t.ctx,this.index=n,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=Zo(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&Bi(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,n=this._cachedMeta,a=this.getDataset(),i=(u,f,h,m)=>u==="x"?f:u==="r"?m:h,r=n.xAxisID=B(a.xAxisID,Ko(t,"x")),s=n.yAxisID=B(a.yAxisID,Ko(t,"y")),l=n.rAxisID=B(a.rAxisID,Ko(t,"r")),o=n.indexAxis,c=n.iAxisID=i(o,r,s,l),d=n.vAxisID=i(o,s,r,l);n.xScale=this.getScaleForId(r),n.yScale=this.getScaleForId(s),n.rScale=this.getScaleForId(l),n.iScale=this.getScaleForId(c),n.vScale=this.getScaleForId(d)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const n=this._cachedMeta;return t===n.iScale?n.vScale:n.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&_h(this._data,this),t._stacked&&Bi(t)}_dataCheck(){const t=this.getDataset(),n=t.data||(t.data=[]),a=this._data;if(X(n)){const i=this._cachedMeta;this._data=C2(n,i)}else if(a!==n){if(a){_h(a,this);const i=this._cachedMeta;Bi(i),i._parsed=[]}n&&Object.isExtensible(n)&&v_(n,this),this._syncList=[],this._data=n}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const n=this._cachedMeta,a=this.getDataset();let i=!1;this._dataCheck();const r=n._stacked;n._stacked=Zo(n.vScale,n),n.stack!==a.stack&&(i=!0,Bi(n),n.stack=a.stack),this._resyncElements(t),(i||r!==n._stacked)&&(Hh(this,n._parsed),n._stacked=Zo(n.vScale,n))}configure(){const t=this.chart.config,n=t.datasetScopeKeys(this._type),a=t.getOptionScopes(this.getDataset(),n,!0);this.options=t.createResolver(a,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,n){const{_cachedMeta:a,_data:i}=this,{iScale:r,_stacked:s}=a,l=r.axis;let o=t===0&&n===i.length?!0:a._sorted,c=t>0&&a._parsed[t-1],d,u,f;if(this._parsing===!1)a._parsed=i,a._sorted=!0,f=i;else{ut(i[t])?f=this.parseArrayData(a,i,t,n):X(i[t])?f=this.parseObjectData(a,i,t,n):f=this.parsePrimitiveData(a,i,t,n);const h=()=>u[l]===null||c&&u[l]<c[l];for(d=0;d<n;++d)a._parsed[d+t]=u=f[d],o&&(h()&&(o=!1),c=u);a._sorted=o}s&&Hh(this,f)}parsePrimitiveData(t,n,a,i){const{iScale:r,vScale:s}=t,l=r.axis,o=s.axis,c=r.getLabels(),d=r===s,u=new Array(i);let f,h,m;for(f=0,h=i;f<h;++f)m=f+a,u[f]={[l]:d||r.parse(c[m],m),[o]:s.parse(n[m],m)};return u}parseArrayData(t,n,a,i){const{xScale:r,yScale:s}=t,l=new Array(i);let o,c,d,u;for(o=0,c=i;o<c;++o)d=o+a,u=n[d],l[o]={x:r.parse(u[0],d),y:s.parse(u[1],d)};return l}parseObjectData(t,n,a,i){const{xScale:r,yScale:s}=t,{xAxisKey:l="x",yAxisKey:o="y"}=this._parsing,c=new Array(i);let d,u,f,h;for(d=0,u=i;d<u;++d)f=d+a,h=n[f],c[d]={x:r.parse(Zn(h,l),f),y:s.parse(Zn(h,o),f)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,n,a){const i=this.chart,r=this._cachedMeta,s=n[t.axis],l={keys:hb(i,!0),values:n._stacks[t.axis]._visualValues};return Nh(l,s,r.index,{mode:a})}updateRangeFromParsed(t,n,a,i){const r=a[n.axis];let s=r===null?NaN:r;const l=i&&a._stacks[n.axis];i&&l&&(i.values=l,s=Nh(i,r,this._cachedMeta.index)),t.min=Math.min(t.min,s),t.max=Math.max(t.max,s)}getMinMax(t,n){const a=this._cachedMeta,i=a._parsed,r=a._sorted&&t===a.iScale,s=i.length,l=this._getOtherScale(t),o=B2(n,a,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:d,max:u}=E2(l);let f,h;function m(){h=i[f];const b=h[l.axis];return!gt(h[t.axis])||d>b||u<b}for(f=0;f<s&&!(!m()&&(this.updateRangeFromParsed(c,t,h,o),r));++f);if(r){for(f=s-1;f>=0;--f)if(!m()){this.updateRangeFromParsed(c,t,h,o);break}}return c}getAllParsedValues(t){const n=this._cachedMeta._parsed,a=[];let i,r,s;for(i=0,r=n.length;i<r;++i)s=n[i][t.axis],gt(s)&&a.push(s);return a}getMaxOverflow(){return!1}getLabelAndValue(t){const n=this._cachedMeta,a=n.iScale,i=n.vScale,r=this.getParsed(t);return{label:a?""+a.getLabelForValue(r[a.axis]):"",value:i?""+i.getLabelForValue(r[i.axis]):""}}_update(t){const n=this._cachedMeta;this.update(t||"default"),n._clip=D2(B(this.options.clip,T2(n.xScale,n.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,n=this.chart,a=this._cachedMeta,i=a.data||[],r=n.chartArea,s=[],l=this._drawStart||0,o=this._drawCount||i.length-l,c=this.options.drawActiveElementsOnTop;let d;for(a.dataset&&a.dataset.draw(t,r,l,o),d=l;d<l+o;++d){const u=i[d];u.hidden||(u.active&&c?s.push(u):u.draw(t,r))}for(d=0;d<s.length;++d)s[d].draw(t,r)}getStyle(t,n){const a=n?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(a):this.resolveDataElementOptions(t||0,a)}getContext(t,n,a){const i=this.getDataset();let r;if(t>=0&&t<this._cachedMeta.data.length){const s=this._cachedMeta.data[t];r=s.$context||(s.$context=L2(this.getContext(),t,s)),r.parsed=this.getParsed(t),r.raw=i.data[t],r.index=r.dataIndex=t}else r=this.$context||(this.$context=R2(this.chart.getContext(),this.index)),r.dataset=i,r.index=r.datasetIndex=this.index;return r.active=!!n,r.mode=a,r}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,n){return this._resolveElementOptions(this.dataElementType.id,n,t)}_resolveElementOptions(t,n="default",a){const i=n==="active",r=this._cachedDataOpts,s=t+"-"+n,l=r[s],o=this.enableOptionSharing&&zr(a);if(l)return Uh(l,o);const c=this.chart.config,d=c.datasetElementScopeKeys(this._type,t),u=i?[`${t}Hover`,"hover",t,""]:[t,""],f=c.getOptionScopes(this.getDataset(),d),h=Object.keys(ft.elements[t]),m=()=>this.getContext(a,i,n),b=c.resolveNamedOptions(f,h,m,u);return b.$shared&&(b.$shared=o,r[s]=Object.freeze(Uh(b,o))),b}_resolveAnimations(t,n,a){const i=this.chart,r=this._cachedDataOpts,s=`animation-${n}`,l=r[s];if(l)return l;let o;if(i.options.animation!==!1){const d=this.chart.config,u=d.datasetAnimationScopeKeys(this._type,n),f=d.getOptionScopes(this.getDataset(),u);o=d.createResolver(f,this.getContext(t,a,n))}const c=new fb(i,o&&o.animations);return o&&o._cacheable&&(r[s]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,n){return!n||Po(t)||this.chart._animationsDisabled}_getSharedOptions(t,n){const a=this.resolveDataElementOptions(t,n),i=this._sharedOptions,r=this.getSharedOptions(a),s=this.includeOptions(n,r)||r!==i;return this.updateSharedOptions(r,n,a),{sharedOptions:r,includeOptions:s}}updateElement(t,n,a,i){Po(i)?Object.assign(t,a):this._resolveAnimations(n,i).update(t,a)}updateSharedOptions(t,n,a){t&&!Po(n)&&this._resolveAnimations(void 0,n).update(t,a)}_setStyle(t,n,a,i){t.active=i;const r=this.getStyle(n,i);this._resolveAnimations(n,a,i).update(t,{options:!i&&this.getSharedOptions(r)||r})}removeHoverStyle(t,n,a){this._setStyle(t,a,"active",!1)}setHoverStyle(t,n,a){this._setStyle(t,a,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const n=this._data,a=this._cachedMeta.data;for(const[l,o,c]of this._syncList)this[l](o,c);this._syncList=[];const i=a.length,r=n.length,s=Math.min(r,i);s&&this.parse(0,s),r>i?this._insertElements(i,r-i,t):r<i&&this._removeElements(r,i-r)}_insertElements(t,n,a=!0){const i=this._cachedMeta,r=i.data,s=t+n;let l;const o=c=>{for(c.length+=n,l=c.length-1;l>=s;l--)c[l]=c[l-n]};for(o(r),l=t;l<s;++l)r[l]=new this.dataElementType;this._parsing&&o(i._parsed),this.parse(t,n),a&&this.updateElements(r,t,n,"reset")}updateElements(t,n,a,i){}_removeElements(t,n){const a=this._cachedMeta;if(this._parsing){const i=a._parsed.splice(t,n);a._stacked&&Bi(a,i)}a.data.splice(t,n)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[n,a,i]=t;this[n](a,i)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,n){n&&this._sync(["_removeElements",t,n]);const a=arguments.length-2;a&&this._sync(["_insertElements",t,a])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}D(Te,"defaults",{}),D(Te,"datasetElementType",null),D(Te,"dataElementType",null);function N2(e,t){if(!e._cache.$bar){const n=e.getMatchingVisibleMetas(t);let a=[];for(let i=0,r=n.length;i<r;i++)a=a.concat(n[i].controller.getAllParsedValues(e));e._cache.$bar=Qm(a.sort((i,r)=>i-r))}return e._cache.$bar}function j2(e){const t=e.iScale,n=N2(t,e.type);let a=t._length,i,r,s,l;const o=()=>{s===32767||s===-32768||(zr(l)&&(a=Math.min(a,Math.abs(s-l)||a)),l=s)};for(i=0,r=n.length;i<r;++i)s=t.getPixelForValue(n[i]),o();for(l=void 0,i=0,r=t.ticks.length;i<r;++i)s=t.getPixelForTick(i),o();return a}function H2(e,t,n,a){const i=n.barThickness;let r,s;return G(i)?(r=t.min*n.categoryPercentage,s=n.barPercentage):(r=i*a,s=1),{chunk:r/a,ratio:s,start:t.pixels[e]-r/2}}function U2(e,t,n,a){const i=t.pixels,r=i[e];let s=e>0?i[e-1]:null,l=e<i.length-1?i[e+1]:null;const o=n.categoryPercentage;s===null&&(s=r-(l===null?t.end-t.start:l-r)),l===null&&(l=r+r-s);const c=r-(r-Math.min(s,l))/2*o;return{chunk:Math.abs(l-s)/2*o/a,ratio:n.barPercentage,start:c}}function V2(e,t,n,a){const i=n.parse(e[0],a),r=n.parse(e[1],a),s=Math.min(i,r),l=Math.max(i,r);let o=s,c=l;Math.abs(s)>Math.abs(l)&&(o=l,c=s),t[n.axis]=c,t._custom={barStart:o,barEnd:c,start:i,end:r,min:s,max:l}}function pb(e,t,n,a){return ut(e)?V2(e,t,n,a):t[n.axis]=n.parse(e,a),t}function Vh(e,t,n,a){const i=e.iScale,r=e.vScale,s=i.getLabels(),l=i===r,o=[];let c,d,u,f;for(c=n,d=n+a;c<d;++c)f=t[c],u={},u[i.axis]=l||i.parse(s[c],c),o.push(pb(f,u,r,c));return o}function Wo(e){return e&&e.barStart!==void 0&&e.barEnd!==void 0}function Y2(e,t,n){return e!==0?je(e):(t.isHorizontal()?1:-1)*(t.min>=n?1:-1)}function G2(e){let t,n,a,i,r;return e.horizontal?(t=e.base>e.x,n="left",a="right"):(t=e.base<e.y,n="bottom",a="top"),t?(i="end",r="start"):(i="start",r="end"),{start:n,end:a,reverse:t,top:i,bottom:r}}function q2(e,t,n,a){let i=t.borderSkipped;const r={};if(!i){e.borderSkipped=r;return}if(i===!0){e.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:s,end:l,reverse:o,top:c,bottom:d}=G2(e);i==="middle"&&n&&(e.enableBorderRadius=!0,(n._top||0)===a?i=c:(n._bottom||0)===a?i=d:(r[Yh(d,s,l,o)]=!0,i=c)),r[Yh(i,s,l,o)]=!0,e.borderSkipped=r}function Yh(e,t,n,a){return a?(e=X2(e,t,n),e=Gh(e,n,t)):e=Gh(e,t,n),e}function X2(e,t,n){return e===t?n:e===n?t:e}function Gh(e,t,n){return e==="start"?t:e==="end"?n:e}function F2(e,{inflateAmount:t},n){e.inflateAmount=t==="auto"?n===1?.33:0:t}class Gs extends Te{parsePrimitiveData(t,n,a,i){return Vh(t,n,a,i)}parseArrayData(t,n,a,i){return Vh(t,n,a,i)}parseObjectData(t,n,a,i){const{iScale:r,vScale:s}=t,{xAxisKey:l="x",yAxisKey:o="y"}=this._parsing,c=r.axis==="x"?l:o,d=s.axis==="x"?l:o,u=[];let f,h,m,b;for(f=a,h=a+i;f<h;++f)b=n[f],m={},m[r.axis]=r.parse(Zn(b,c),f),u.push(pb(Zn(b,d),m,s,f));return u}updateRangeFromParsed(t,n,a,i){super.updateRangeFromParsed(t,n,a,i);const r=a._custom;r&&n===this._cachedMeta.vScale&&(t.min=Math.min(t.min,r.min),t.max=Math.max(t.max,r.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const n=this._cachedMeta,{iScale:a,vScale:i}=n,r=this.getParsed(t),s=r._custom,l=Wo(s)?"["+s.start+", "+s.end+"]":""+i.getLabelForValue(r[i.axis]);return{label:""+a.getLabelForValue(r[a.axis]),value:l}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const n=this._cachedMeta;this.updateElements(n.data,0,n.data.length,t)}updateElements(t,n,a,i){const r=i==="reset",{index:s,_cachedMeta:{vScale:l}}=this,o=l.getBasePixel(),c=l.isHorizontal(),d=this._getRuler(),{sharedOptions:u,includeOptions:f}=this._getSharedOptions(n,i);for(let h=n;h<n+a;h++){const m=this.getParsed(h),b=r||G(m[l.axis])?{base:o,head:o}:this._calculateBarValuePixels(h),v=this._calculateBarIndexPixels(h,d),p=(m._stacks||{})[l.axis],g={horizontal:c,base:b.base,enableBorderRadius:!p||Wo(m._custom)||s===p._top||s===p._bottom,x:c?b.head:v.center,y:c?v.center:b.head,height:c?v.size:Math.abs(b.size),width:c?Math.abs(b.size):v.size};f&&(g.options=u||this.resolveDataElementOptions(h,t[h].active?"active":i));const y=g.options||t[h].options;q2(g,y,p,s),F2(g,y,d.ratio),this.updateElement(t[h],h,g,i)}}_getStacks(t,n){const{iScale:a}=this._cachedMeta,i=a.getMatchingVisibleMetas(this._type).filter(d=>d.controller.options.grouped),r=a.options.stacked,s=[],l=this._cachedMeta.controller.getParsed(n),o=l&&l[a.axis],c=d=>{const u=d._parsed.find(h=>h[a.axis]===o),f=u&&u[d.vScale.axis];if(G(f)||isNaN(f))return!0};for(const d of i)if(!(n!==void 0&&c(d))&&((r===!1||s.indexOf(d.stack)===-1||r===void 0&&d.stack===void 0)&&s.push(d.stack),d.index===t))break;return s.length||s.push(void 0),s}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,n=this.chart.options.indexAxis;return Object.keys(t).filter(a=>t[a].axis===n).shift()}_getAxis(){const t={},n=this.getFirstScaleIdForIndexAxis();for(const a of this.chart.data.datasets)t[B(this.chart.options.indexAxis==="x"?a.xAxisID:a.yAxisID,n)]=!0;return Object.keys(t)}_getStackIndex(t,n,a){const i=this._getStacks(t,a),r=n!==void 0?i.indexOf(n):-1;return r===-1?i.length-1:r}_getRuler(){const t=this.options,n=this._cachedMeta,a=n.iScale,i=[];let r,s;for(r=0,s=n.data.length;r<s;++r)i.push(a.getPixelForValue(this.getParsed(r)[a.axis],r));const l=t.barThickness;return{min:l||j2(n),pixels:i,start:a._startPixel,end:a._endPixel,stackCount:this._getStackCount(),scale:a,grouped:t.grouped,ratio:l?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:n,_stacked:a,index:i},options:{base:r,minBarLength:s}}=this,l=r||0,o=this.getParsed(t),c=o._custom,d=Wo(c);let u=o[n.axis],f=0,h=a?this.applyStack(n,o,a):u,m,b;h!==u&&(f=h-u,h=u),d&&(u=c.barStart,h=c.barEnd-c.barStart,u!==0&&je(u)!==je(c.barEnd)&&(f=0),f+=u);const v=!G(r)&&!d?r:f;let p=n.getPixelForValue(v);if(this.chart.getDataVisibility(t)?m=n.getPixelForValue(f+h):m=p,b=m-p,Math.abs(b)<s){b=Y2(b,n,l)*s,u===l&&(p-=b/2);const g=n.getPixelForDecimal(0),y=n.getPixelForDecimal(1),x=Math.min(g,y),_=Math.max(g,y);p=Math.max(Math.min(p,_),x),m=p+b,a&&!d&&(o._stacks[n.axis]._visualValues[i]=n.getValueForPixel(m)-n.getValueForPixel(p))}if(p===n.getPixelForValue(l)){const g=je(b)*n.getLineWidthForValue(l)/2;p+=g,b-=g}return{size:b,base:p,head:m,center:m+b/2}}_calculateBarIndexPixels(t,n){const a=n.scale,i=this.options,r=i.skipNull,s=B(i.maxBarThickness,1/0);let l,o;const c=this._getAxisCount();if(n.grouped){const d=r?this._getStackCount(t):n.stackCount,u=i.barThickness==="flex"?U2(t,n,i,d*c):H2(t,n,i,d*c),f=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,h=this._getAxis().indexOf(B(f,this.getFirstScaleIdForIndexAxis())),m=this._getStackIndex(this.index,this._cachedMeta.stack,r?t:void 0)+h;l=u.start+u.chunk*m+u.chunk/2,o=Math.min(s,u.chunk*u.ratio)}else l=a.getPixelForValue(this.getParsed(t)[a.axis],t),o=Math.min(s,n.min*n.ratio);return{base:l-o/2,head:l+o/2,center:l,size:o}}draw(){const t=this._cachedMeta,n=t.vScale,a=t.data,i=a.length;let r=0;for(;r<i;++r)this.getParsed(r)[n.axis]!==null&&!a[r].hidden&&a[r].draw(this._ctx)}}D(Gs,"id","bar"),D(Gs,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),D(Gs,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});class qs extends Te{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,n,a,i){const r=super.parsePrimitiveData(t,n,a,i);for(let s=0;s<r.length;s++)r[s]._custom=this.resolveDataElementOptions(s+a).radius;return r}parseArrayData(t,n,a,i){const r=super.parseArrayData(t,n,a,i);for(let s=0;s<r.length;s++){const l=n[a+s];r[s]._custom=B(l[2],this.resolveDataElementOptions(s+a).radius)}return r}parseObjectData(t,n,a,i){const r=super.parseObjectData(t,n,a,i);for(let s=0;s<r.length;s++){const l=n[a+s];r[s]._custom=B(l&&l.r&&+l.r,this.resolveDataElementOptions(s+a).radius)}return r}getMaxOverflow(){const t=this._cachedMeta.data;let n=0;for(let a=t.length-1;a>=0;--a)n=Math.max(n,t[a].size(this.resolveDataElementOptions(a))/2);return n>0&&n}getLabelAndValue(t){const n=this._cachedMeta,a=this.chart.data.labels||[],{xScale:i,yScale:r}=n,s=this.getParsed(t),l=i.getLabelForValue(s.x),o=r.getLabelForValue(s.y),c=s._custom;return{label:a[t]||"",value:"("+l+", "+o+(c?", "+c:"")+")"}}update(t){const n=this._cachedMeta.data;this.updateElements(n,0,n.length,t)}updateElements(t,n,a,i){const r=i==="reset",{iScale:s,vScale:l}=this._cachedMeta,{sharedOptions:o,includeOptions:c}=this._getSharedOptions(n,i),d=s.axis,u=l.axis;for(let f=n;f<n+a;f++){const h=t[f],m=!r&&this.getParsed(f),b={},v=b[d]=r?s.getPixelForDecimal(.5):s.getPixelForValue(m[d]),p=b[u]=r?l.getBasePixel():l.getPixelForValue(m[u]);b.skip=isNaN(v)||isNaN(p),c&&(b.options=o||this.resolveDataElementOptions(f,h.active?"active":i),r&&(b.options.radius=0)),this.updateElement(h,f,b,i)}}resolveDataElementOptions(t,n){const a=this.getParsed(t);let i=super.resolveDataElementOptions(t,n);i.$shared&&(i=Object.assign({},i,{$shared:!1}));const r=i.radius;return n!=="active"&&(i.radius=0),i.radius+=B(a&&a._custom,r),i}}D(qs,"id","bubble"),D(qs,"defaults",{datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}}),D(qs,"overrides",{scales:{x:{type:"linear"},y:{type:"linear"}}});function Q2(e,t,n){let a=1,i=1,r=0,s=0;if(t<ot){const l=e,o=l+t,c=Math.cos(l),d=Math.sin(l),u=Math.cos(o),f=Math.sin(o),h=(y,x,_)=>Rr(y,l,o,!0)?1:Math.max(x,x*n,_,_*n),m=(y,x,_)=>Rr(y,l,o,!0)?-1:Math.min(x,x*n,_,_*n),b=h(0,c,u),v=h(bt,d,f),p=m(Z,c,u),g=m(Z+bt,d,f);a=(b-p)/2,i=(v-g)/2,r=-(b+p)/2,s=-(v+g)/2}return{ratioX:a,ratioY:i,offsetX:r,offsetY:s}}class da extends Te{constructor(t,n){super(t,n),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,n){const a=this.getDataset().data,i=this._cachedMeta;if(this._parsing===!1)i._parsed=a;else{let r=o=>+a[o];if(X(a[t])){const{key:o="value"}=this._parsing;r=c=>+Zn(a[c],o)}let s,l;for(s=t,l=t+n;s<l;++s)i._parsed[s]=r(s)}}_getRotation(){return Ae(this.options.rotation-90)}_getCircumference(){return Ae(this.options.circumference)}_getRotationExtents(){let t=ot,n=-ot;for(let a=0;a<this.chart.data.datasets.length;++a)if(this.chart.isDatasetVisible(a)&&this.chart.getDatasetMeta(a).type===this._type){const i=this.chart.getDatasetMeta(a).controller,r=i._getRotation(),s=i._getCircumference();t=Math.min(t,r),n=Math.max(n,r+s)}return{rotation:t,circumference:n-t}}update(t){const n=this.chart,{chartArea:a}=n,i=this._cachedMeta,r=i.data,s=this.getMaxBorderWidth()+this.getMaxOffset(r)+this.options.spacing,l=Math.max((Math.min(a.width,a.height)-s)/2,0),o=Math.min(i_(this.options.cutout,l),1),c=this._getRingWeight(this.index),{circumference:d,rotation:u}=this._getRotationExtents(),{ratioX:f,ratioY:h,offsetX:m,offsetY:b}=Q2(u,d,o),v=(a.width-s)/f,p=(a.height-s)/h,g=Math.max(Math.min(v,p)/2,0),y=Ym(this.options.radius,g),x=Math.max(y*o,0),_=(y-x)/this._getVisibleDatasetWeightTotal();this.offsetX=m*y,this.offsetY=b*y,i.total=this.calculateTotal(),this.outerRadius=y-_*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-_*c,0),this.updateElements(r,0,r.length,t)}_circumference(t,n){const a=this.options,i=this._cachedMeta,r=this._getCircumference();return n&&a.animation.animateRotate||!this.chart.getDataVisibility(t)||i._parsed[t]===null||i.data[t].hidden?0:this.calculateCircumference(i._parsed[t]*r/ot)}updateElements(t,n,a,i){const r=i==="reset",s=this.chart,l=s.chartArea,c=s.options.animation,d=(l.left+l.right)/2,u=(l.top+l.bottom)/2,f=r&&c.animateScale,h=f?0:this.innerRadius,m=f?0:this.outerRadius,{sharedOptions:b,includeOptions:v}=this._getSharedOptions(n,i);let p=this._getRotation(),g;for(g=0;g<n;++g)p+=this._circumference(g,r);for(g=n;g<n+a;++g){const y=this._circumference(g,r),x=t[g],_={x:d+this.offsetX,y:u+this.offsetY,startAngle:p,endAngle:p+y,circumference:y,outerRadius:m,innerRadius:h};v&&(_.options=b||this.resolveDataElementOptions(g,x.active?"active":i)),p+=y,this.updateElement(x,g,_,i)}}calculateTotal(){const t=this._cachedMeta,n=t.data;let a=0,i;for(i=0;i<n.length;i++){const r=t._parsed[i];r!==null&&!isNaN(r)&&this.chart.getDataVisibility(i)&&!n[i].hidden&&(a+=Math.abs(r))}return a}calculateCircumference(t){const n=this._cachedMeta.total;return n>0&&!isNaN(t)?ot*(Math.abs(t)/n):0}getLabelAndValue(t){const n=this._cachedMeta,a=this.chart,i=a.data.labels||[],r=Jr(n._parsed[t],a.options.locale);return{label:i[t]||"",value:r}}getMaxBorderWidth(t){let n=0;const a=this.chart;let i,r,s,l,o;if(!t){for(i=0,r=a.data.datasets.length;i<r;++i)if(a.isDatasetVisible(i)){s=a.getDatasetMeta(i),t=s.data,l=s.controller;break}}if(!t)return 0;for(i=0,r=t.length;i<r;++i)o=l.resolveDataElementOptions(i),o.borderAlign!=="inner"&&(n=Math.max(n,o.borderWidth||0,o.hoverBorderWidth||0));return n}getMaxOffset(t){let n=0;for(let a=0,i=t.length;a<i;++a){const r=this.resolveDataElementOptions(a);n=Math.max(n,r.offset||0,r.hoverOffset||0)}return n}_getRingWeightOffset(t){let n=0;for(let a=0;a<t;++a)this.chart.isDatasetVisible(a)&&(n+=this._getRingWeight(a));return n}_getRingWeight(t){return Math.max(B(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}D(da,"id","doughnut"),D(da,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),D(da,"descriptors",{_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")}),D(da,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const n=t.data,{labels:{pointStyle:a,textAlign:i,color:r,useBorderRadius:s,borderRadius:l}}=t.legend.options;return n.labels.length&&n.datasets.length?n.labels.map((o,c)=>{const u=t.getDatasetMeta(0).controller.getStyle(c);return{text:o,fillStyle:u.backgroundColor,fontColor:r,hidden:!t.getDataVisibility(c),lineDash:u.borderDash,lineDashOffset:u.borderDashOffset,lineJoin:u.borderJoinStyle,lineWidth:u.borderWidth,strokeStyle:u.borderColor,textAlign:i,pointStyle:a,borderRadius:s&&(l||u.borderRadius),index:c}}):[]}},onClick(t,n,a){a.chart.toggleDataVisibility(n.index),a.chart.update()}}}});class Xs extends Te{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const n=this._cachedMeta,{dataset:a,data:i=[],_dataset:r}=n,s=this.chart._animationsDisabled;let{start:l,count:o}=Pm(n,i,s);this._drawStart=l,this._drawCount=o,Wm(n)&&(l=0,o=i.length),a._chart=this.chart,a._datasetIndex=this.index,a._decimated=!!r._decimated,a.points=i;const c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(a,void 0,{animated:!s,options:c},t),this.updateElements(i,l,o,t)}updateElements(t,n,a,i){const r=i==="reset",{iScale:s,vScale:l,_stacked:o,_dataset:c}=this._cachedMeta,{sharedOptions:d,includeOptions:u}=this._getSharedOptions(n,i),f=s.axis,h=l.axis,{spanGaps:m,segment:b}=this.options,v=mi(m)?m:Number.POSITIVE_INFINITY,p=this.chart._animationsDisabled||r||i==="none",g=n+a,y=t.length;let x=n>0&&this.getParsed(n-1);for(let _=0;_<y;++_){const w=t[_],k=p?w:{};if(_<n||_>=g){k.skip=!0;continue}const S=this.getParsed(_),A=G(S[h]),C=k[f]=s.getPixelForValue(S[f],_),z=k[h]=r||A?l.getBasePixel():l.getPixelForValue(o?this.applyStack(l,S,o):S[h],_);k.skip=isNaN(C)||isNaN(z)||A,k.stop=_>0&&Math.abs(S[f]-x[f])>v,b&&(k.parsed=S,k.raw=c.data[_]),u&&(k.options=d||this.resolveDataElementOptions(_,w.active?"active":i)),p||this.updateElement(w,_,k,i),x=S}}getMaxOverflow(){const t=this._cachedMeta,n=t.dataset,a=n.options&&n.options.borderWidth||0,i=t.data||[];if(!i.length)return a;const r=i[0].size(this.resolveDataElementOptions(0)),s=i[i.length-1].size(this.resolveDataElementOptions(i.length-1));return Math.max(a,r,s)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}D(Xs,"id","line"),D(Xs,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),D(Xs,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});class gr extends Te{constructor(t,n){super(t,n),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const n=this._cachedMeta,a=this.chart,i=a.data.labels||[],r=Jr(n._parsed[t].r,a.options.locale);return{label:i[t]||"",value:r}}parseObjectData(t,n,a,i){return ib.bind(this)(t,n,a,i)}update(t){const n=this._cachedMeta.data;this._updateRadius(),this.updateElements(n,0,n.length,t)}getMinMax(){const t=this._cachedMeta,n={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((a,i)=>{const r=this.getParsed(i).r;!isNaN(r)&&this.chart.getDataVisibility(i)&&(r<n.min&&(n.min=r),r>n.max&&(n.max=r))}),n}_updateRadius(){const t=this.chart,n=t.chartArea,a=t.options,i=Math.min(n.right-n.left,n.bottom-n.top),r=Math.max(i/2,0),s=Math.max(a.cutoutPercentage?r/100*a.cutoutPercentage:1,0),l=(r-s)/t.getVisibleDatasetCount();this.outerRadius=r-l*this.index,this.innerRadius=this.outerRadius-l}updateElements(t,n,a,i){const r=i==="reset",s=this.chart,o=s.options.animation,c=this._cachedMeta.rScale,d=c.xCenter,u=c.yCenter,f=c.getIndexAngle(0)-.5*Z;let h=f,m;const b=360/this.countVisibleElements();for(m=0;m<n;++m)h+=this._computeAngle(m,i,b);for(m=n;m<n+a;m++){const v=t[m];let p=h,g=h+this._computeAngle(m,i,b),y=s.getDataVisibility(m)?c.getDistanceFromCenterForValue(this.getParsed(m).r):0;h=g,r&&(o.animateScale&&(y=0),o.animateRotate&&(p=g=f));const x={x:d,y:u,innerRadius:0,outerRadius:y,startAngle:p,endAngle:g,options:this.resolveDataElementOptions(m,v.active?"active":i)};this.updateElement(v,m,x,i)}}countVisibleElements(){const t=this._cachedMeta;let n=0;return t.data.forEach((a,i)=>{!isNaN(this.getParsed(i).r)&&this.chart.getDataVisibility(i)&&n++}),n}_computeAngle(t,n,a){return this.chart.getDataVisibility(t)?Ae(this.resolveDataElementOptions(t,n).angle||a):0}}D(gr,"id","polarArea"),D(gr,"defaults",{dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0}),D(gr,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const n=t.data;if(n.labels.length&&n.datasets.length){const{labels:{pointStyle:a,color:i}}=t.legend.options;return n.labels.map((r,s)=>{const o=t.getDatasetMeta(0).controller.getStyle(s);return{text:r,fillStyle:o.backgroundColor,strokeStyle:o.borderColor,fontColor:i,lineWidth:o.borderWidth,pointStyle:a,hidden:!t.getDataVisibility(s),index:s}})}return[]}},onClick(t,n,a){a.chart.toggleDataVisibility(n.index),a.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}});class sd extends da{}D(sd,"id","pie"),D(sd,"defaults",{cutout:0,rotation:0,circumference:360,radius:"100%"});class Fs extends Te{getLabelAndValue(t){const n=this._cachedMeta.vScale,a=this.getParsed(t);return{label:n.getLabels()[t],value:""+n.getLabelForValue(a[n.axis])}}parseObjectData(t,n,a,i){return ib.bind(this)(t,n,a,i)}update(t){const n=this._cachedMeta,a=n.dataset,i=n.data||[],r=n.iScale.getLabels();if(a.points=i,t!=="resize"){const s=this.resolveDatasetElementOptions(t);this.options.showLine||(s.borderWidth=0);const l={_loop:!0,_fullLoop:r.length===i.length,options:s};this.updateElement(a,void 0,l,t)}this.updateElements(i,0,i.length,t)}updateElements(t,n,a,i){const r=this._cachedMeta.rScale,s=i==="reset";for(let l=n;l<n+a;l++){const o=t[l],c=this.resolveDataElementOptions(l,o.active?"active":i),d=r.getPointPositionForValue(l,this.getParsed(l).r),u=s?r.xCenter:d.x,f=s?r.yCenter:d.y,h={x:u,y:f,angle:d.angle,skip:isNaN(u)||isNaN(f),options:c};this.updateElement(o,l,h,i)}}}D(Fs,"id","radar"),D(Fs,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),D(Fs,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});class Qs extends Te{getLabelAndValue(t){const n=this._cachedMeta,a=this.chart.data.labels||[],{xScale:i,yScale:r}=n,s=this.getParsed(t),l=i.getLabelForValue(s.x),o=r.getLabelForValue(s.y);return{label:a[t]||"",value:"("+l+", "+o+")"}}update(t){const n=this._cachedMeta,{data:a=[]}=n,i=this.chart._animationsDisabled;let{start:r,count:s}=Pm(n,a,i);if(this._drawStart=r,this._drawCount=s,Wm(n)&&(r=0,s=a.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:l,_dataset:o}=n;l._chart=this.chart,l._datasetIndex=this.index,l._decimated=!!o._decimated,l.points=a;const c=this.resolveDatasetElementOptions(t);c.segment=this.options.segment,this.updateElement(l,void 0,{animated:!i,options:c},t)}else this.datasetElementType&&(delete n.dataset,this.datasetElementType=!1);this.updateElements(a,r,s,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,n,a,i){const r=i==="reset",{iScale:s,vScale:l,_stacked:o,_dataset:c}=this._cachedMeta,d=this.resolveDataElementOptions(n,i),u=this.getSharedOptions(d),f=this.includeOptions(i,u),h=s.axis,m=l.axis,{spanGaps:b,segment:v}=this.options,p=mi(b)?b:Number.POSITIVE_INFINITY,g=this.chart._animationsDisabled||r||i==="none";let y=n>0&&this.getParsed(n-1);for(let x=n;x<n+a;++x){const _=t[x],w=this.getParsed(x),k=g?_:{},S=G(w[m]),A=k[h]=s.getPixelForValue(w[h],x),C=k[m]=r||S?l.getBasePixel():l.getPixelForValue(o?this.applyStack(l,w,o):w[m],x);k.skip=isNaN(A)||isNaN(C)||S,k.stop=x>0&&Math.abs(w[h]-y[h])>p,v&&(k.parsed=w,k.raw=c.data[x]),f&&(k.options=u||this.resolveDataElementOptions(x,_.active?"active":i)),g||this.updateElement(_,x,k,i),y=w}this.updateSharedOptions(u,i,d)}getMaxOverflow(){const t=this._cachedMeta,n=t.data||[];if(!this.options.showLine){let l=0;for(let o=n.length-1;o>=0;--o)l=Math.max(l,n[o].size(this.resolveDataElementOptions(o))/2);return l>0&&l}const a=t.dataset,i=a.options&&a.options.borderWidth||0;if(!n.length)return i;const r=n[0].size(this.resolveDataElementOptions(0)),s=n[n.length-1].size(this.resolveDataElementOptions(n.length-1));return Math.max(i,r,s)/2}}D(Qs,"id","scatter"),D(Qs,"defaults",{datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1}),D(Qs,"overrides",{interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}});var Z2=Object.freeze({__proto__:null,BarController:Gs,BubbleController:qs,DoughnutController:da,LineController:Xs,PieController:sd,PolarAreaController:gr,RadarController:Fs,ScatterController:Qs});function na(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class Lu{constructor(t){D(this,"options");this.options=t||{}}static override(t){Object.assign(Lu.prototype,t)}init(){}formats(){return na()}parse(){return na()}format(){return na()}add(){return na()}diff(){return na()}startOf(){return na()}endOf(){return na()}}var K2={_date:Lu};function P2(e,t,n,a){const{controller:i,data:r,_sorted:s}=e,l=i._cachedMeta.iScale,o=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null;if(l&&t===l.axis&&t!=="r"&&s&&r.length){const c=l._reversePixels?b_:rn;if(a){if(i._sharedOptions){const d=r[0],u=typeof d.getRange=="function"&&d.getRange(t);if(u){const f=c(r,t,n-u),h=c(r,t,n+u);return{lo:f.lo,hi:h.hi}}}}else{const d=c(r,t,n);if(o){const{vScale:u}=i._cachedMeta,{_parsed:f}=e,h=f.slice(0,d.lo+1).reverse().findIndex(b=>!G(b[u.axis]));d.lo-=Math.max(0,h);const m=f.slice(d.hi).findIndex(b=>!G(b[u.axis]));d.hi+=Math.max(0,m)}return d}}return{lo:0,hi:r.length-1}}function ao(e,t,n,a,i){const r=e.getSortedVisibleDatasetMetas(),s=n[t];for(let l=0,o=r.length;l<o;++l){const{index:c,data:d}=r[l],{lo:u,hi:f}=P2(r[l],t,s,i);for(let h=u;h<=f;++h){const m=d[h];m.skip||a(m,c,h)}}}function W2(e){const t=e.indexOf("x")!==-1,n=e.indexOf("y")!==-1;return function(a,i){const r=t?Math.abs(a.x-i.x):0,s=n?Math.abs(a.y-i.y):0;return Math.sqrt(Math.pow(r,2)+Math.pow(s,2))}}function Jo(e,t,n,a,i){const r=[];return!i&&!e.isPointInArea(t)||ao(e,n,t,function(l,o,c){!i&&!sn(l,e.chartArea,0)||l.inRange(t.x,t.y,a)&&r.push({element:l,datasetIndex:o,index:c})},!0),r}function J2(e,t,n,a){let i=[];function r(s,l,o){const{startAngle:c,endAngle:d}=s.getProps(["startAngle","endAngle"],a),{angle:u}=Xm(s,{x:t.x,y:t.y});Rr(u,c,d)&&i.push({element:s,datasetIndex:l,index:o})}return ao(e,n,t,r),i}function I2(e,t,n,a,i,r){let s=[];const l=W2(n);let o=Number.POSITIVE_INFINITY;function c(d,u,f){const h=d.inRange(t.x,t.y,i);if(a&&!h)return;const m=d.getCenterPoint(i);if(!(!!r||e.isPointInArea(m))&&!h)return;const v=l(t,m);v<o?(s=[{element:d,datasetIndex:u,index:f}],o=v):v===o&&s.push({element:d,datasetIndex:u,index:f})}return ao(e,n,t,c),s}function Io(e,t,n,a,i,r){return!r&&!e.isPointInArea(t)?[]:n==="r"&&!a?J2(e,t,n,i):I2(e,t,n,a,i,r)}function qh(e,t,n,a,i){const r=[],s=n==="x"?"inXRange":"inYRange";let l=!1;return ao(e,n,t,(o,c,d)=>{o[s]&&o[s](t[n],i)&&(r.push({element:o,datasetIndex:c,index:d}),l=l||o.inRange(t.x,t.y,i))}),a&&!l?[]:r}var $2={modes:{index(e,t,n,a){const i=oa(t,e),r=n.axis||"x",s=n.includeInvisible||!1,l=n.intersect?Jo(e,i,r,a,s):Io(e,i,r,!1,a,s),o=[];return l.length?(e.getSortedVisibleDatasetMetas().forEach(c=>{const d=l[0].index,u=c.data[d];u&&!u.skip&&o.push({element:u,datasetIndex:c.index,index:d})}),o):[]},dataset(e,t,n,a){const i=oa(t,e),r=n.axis||"xy",s=n.includeInvisible||!1;let l=n.intersect?Jo(e,i,r,a,s):Io(e,i,r,!1,a,s);if(l.length>0){const o=l[0].datasetIndex,c=e.getDatasetMeta(o).data;l=[];for(let d=0;d<c.length;++d)l.push({element:c[d],datasetIndex:o,index:d})}return l},point(e,t,n,a){const i=oa(t,e),r=n.axis||"xy",s=n.includeInvisible||!1;return Jo(e,i,r,a,s)},nearest(e,t,n,a){const i=oa(t,e),r=n.axis||"xy",s=n.includeInvisible||!1;return Io(e,i,r,n.intersect,a,s)},x(e,t,n,a){const i=oa(t,e);return qh(e,i,"x",n.intersect,a)},y(e,t,n,a){const i=oa(t,e);return qh(e,i,"y",n.intersect,a)}}};const gb=["left","top","right","bottom"];function Ni(e,t){return e.filter(n=>n.pos===t)}function Xh(e,t){return e.filter(n=>gb.indexOf(n.pos)===-1&&n.box.axis===t)}function ji(e,t){return e.sort((n,a)=>{const i=t?a:n,r=t?n:a;return i.weight===r.weight?i.index-r.index:i.weight-r.weight})}function t1(e){const t=[];let n,a,i,r,s,l;for(n=0,a=(e||[]).length;n<a;++n)i=e[n],{position:r,options:{stack:s,stackWeight:l=1}}=i,t.push({index:n,box:i,pos:r,horizontal:i.isHorizontal(),weight:i.weight,stack:s&&r+s,stackWeight:l});return t}function e1(e){const t={};for(const n of e){const{stack:a,pos:i,stackWeight:r}=n;if(!a||!gb.includes(i))continue;const s=t[a]||(t[a]={count:0,placed:0,weight:0,size:0});s.count++,s.weight+=r}return t}function n1(e,t){const n=e1(e),{vBoxMaxWidth:a,hBoxMaxHeight:i}=t;let r,s,l;for(r=0,s=e.length;r<s;++r){l=e[r];const{fullSize:o}=l.box,c=n[l.stack],d=c&&l.stackWeight/c.weight;l.horizontal?(l.width=d?d*a:o&&t.availableWidth,l.height=i):(l.width=a,l.height=d?d*i:o&&t.availableHeight)}return n}function a1(e){const t=t1(e),n=ji(t.filter(c=>c.box.fullSize),!0),a=ji(Ni(t,"left"),!0),i=ji(Ni(t,"right")),r=ji(Ni(t,"top"),!0),s=ji(Ni(t,"bottom")),l=Xh(t,"x"),o=Xh(t,"y");return{fullSize:n,leftAndTop:a.concat(r),rightAndBottom:i.concat(o).concat(s).concat(l),chartArea:Ni(t,"chartArea"),vertical:a.concat(i).concat(o),horizontal:r.concat(s).concat(l)}}function Fh(e,t,n,a){return Math.max(e[n],t[n])+Math.max(e[a],t[a])}function mb(e,t){e.top=Math.max(e.top,t.top),e.left=Math.max(e.left,t.left),e.bottom=Math.max(e.bottom,t.bottom),e.right=Math.max(e.right,t.right)}function i1(e,t,n,a){const{pos:i,box:r}=n,s=e.maxPadding;if(!X(i)){n.size&&(e[i]-=n.size);const u=a[n.stack]||{size:0,count:1};u.size=Math.max(u.size,n.horizontal?r.height:r.width),n.size=u.size/u.count,e[i]+=n.size}r.getPadding&&mb(s,r.getPadding());const l=Math.max(0,t.outerWidth-Fh(s,e,"left","right")),o=Math.max(0,t.outerHeight-Fh(s,e,"top","bottom")),c=l!==e.w,d=o!==e.h;return e.w=l,e.h=o,n.horizontal?{same:c,other:d}:{same:d,other:c}}function r1(e){const t=e.maxPadding;function n(a){const i=Math.max(t[a]-e[a],0);return e[a]+=i,i}e.y+=n("top"),e.x+=n("left"),n("right"),n("bottom")}function s1(e,t){const n=t.maxPadding;function a(i){const r={left:0,top:0,right:0,bottom:0};return i.forEach(s=>{r[s]=Math.max(t[s],n[s])}),r}return a(e?["left","right"]:["top","bottom"])}function Zi(e,t,n,a){const i=[];let r,s,l,o,c,d;for(r=0,s=e.length,c=0;r<s;++r){l=e[r],o=l.box,o.update(l.width||t.w,l.height||t.h,s1(l.horizontal,t));const{same:u,other:f}=i1(t,n,l,a);c|=u&&i.length,d=d||f,o.fullSize||i.push(l)}return c&&Zi(i,t,n,a)||d}function xs(e,t,n,a,i){e.top=n,e.left=t,e.right=t+a,e.bottom=n+i,e.width=a,e.height=i}function Qh(e,t,n,a){const i=n.padding;let{x:r,y:s}=t;for(const l of e){const o=l.box,c=a[l.stack]||{placed:0,weight:1},d=l.stackWeight/c.weight||1;if(l.horizontal){const u=t.w*d,f=c.size||o.height;zr(c.start)&&(s=c.start),o.fullSize?xs(o,i.left,s,n.outerWidth-i.right-i.left,f):xs(o,t.left+c.placed,s,u,f),c.start=s,c.placed+=u,s=o.bottom}else{const u=t.h*d,f=c.size||o.width;zr(c.start)&&(r=c.start),o.fullSize?xs(o,r,i.top,f,n.outerHeight-i.bottom-i.top):xs(o,r,t.top+c.placed,f,u),c.start=r,c.placed+=u,r=o.right}}t.x=r,t.y=s}var Ut={addBox(e,t){e.boxes||(e.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(n){t.draw(n)}}]},e.boxes.push(t)},removeBox(e,t){const n=e.boxes?e.boxes.indexOf(t):-1;n!==-1&&e.boxes.splice(n,1)},configure(e,t,n){t.fullSize=n.fullSize,t.position=n.position,t.weight=n.weight},update(e,t,n,a){if(!e)return;const i=Vt(e.options.layout.padding),r=Math.max(t-i.width,0),s=Math.max(n-i.height,0),l=a1(e.boxes),o=l.vertical,c=l.horizontal;J(e.boxes,b=>{typeof b.beforeLayout=="function"&&b.beforeLayout()});const d=o.reduce((b,v)=>v.box.options&&v.box.options.display===!1?b:b+1,0)||1,u=Object.freeze({outerWidth:t,outerHeight:n,padding:i,availableWidth:r,availableHeight:s,vBoxMaxWidth:r/2/d,hBoxMaxHeight:s/2}),f=Object.assign({},i);mb(f,Vt(a));const h=Object.assign({maxPadding:f,w:r,h:s,x:i.left,y:i.top},i),m=n1(o.concat(c),u);Zi(l.fullSize,h,u,m),Zi(o,h,u,m),Zi(c,h,u,m)&&Zi(o,h,u,m),r1(h),Qh(l.leftAndTop,h,u,m),h.x+=h.w,h.y+=h.h,Qh(l.rightAndBottom,h,u,m),e.chartArea={left:h.left,top:h.top,right:h.left+h.w,bottom:h.top+h.h,height:h.h,width:h.w},J(l.chartArea,b=>{const v=b.box;Object.assign(v,e.chartArea),v.update(h.w,h.h,{left:0,top:0,right:0,bottom:0})})}};class bb{acquireContext(t,n){}releaseContext(t){return!1}addEventListener(t,n,a){}removeEventListener(t,n,a){}getDevicePixelRatio(){return 1}getMaximumSize(t,n,a,i){return n=Math.max(0,n||t.width),a=a||t.height,{width:n,height:Math.max(0,i?Math.floor(n/i):a)}}isAttached(t){return!0}updateConfig(t){}}class l1 extends bb{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const Zs="$chartjs",o1={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Zh=e=>e===null||e==="";function c1(e,t){const n=e.style,a=e.getAttribute("height"),i=e.getAttribute("width");if(e[Zs]={initial:{height:a,width:i,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||"block",n.boxSizing=n.boxSizing||"border-box",Zh(i)){const r=Oh(e,"width");r!==void 0&&(e.width=r)}if(Zh(a))if(e.style.height==="")e.height=e.width/(t||2);else{const r=Oh(e,"height");r!==void 0&&(e.height=r)}return e}const yb=d2?{passive:!0}:!1;function d1(e,t,n){e&&e.addEventListener(t,n,yb)}function u1(e,t,n){e&&e.canvas&&e.canvas.removeEventListener(t,n,yb)}function f1(e,t){const n=o1[e.type]||e.type,{x:a,y:i}=oa(e,t);return{type:n,chart:t,native:e,x:a!==void 0?a:null,y:i!==void 0?i:null}}function El(e,t){for(const n of e)if(n===t||n.contains(t))return!0}function h1(e,t,n){const a=e.canvas,i=new MutationObserver(r=>{let s=!1;for(const l of r)s=s||El(l.addedNodes,a),s=s&&!El(l.removedNodes,a);s&&n()});return i.observe(document,{childList:!0,subtree:!0}),i}function p1(e,t,n){const a=e.canvas,i=new MutationObserver(r=>{let s=!1;for(const l of r)s=s||El(l.removedNodes,a),s=s&&!El(l.addedNodes,a);s&&n()});return i.observe(document,{childList:!0,subtree:!0}),i}const Br=new Map;let Kh=0;function vb(){const e=window.devicePixelRatio;e!==Kh&&(Kh=e,Br.forEach((t,n)=>{n.currentDevicePixelRatio!==e&&t()}))}function g1(e,t){Br.size||window.addEventListener("resize",vb),Br.set(e,t)}function m1(e){Br.delete(e),Br.size||window.removeEventListener("resize",vb)}function b1(e,t,n){const a=e.canvas,i=a&&Ru(a);if(!i)return;const r=Km((l,o)=>{const c=i.clientWidth;n(l,o),c<i.clientWidth&&n()},window),s=new ResizeObserver(l=>{const o=l[0],c=o.contentRect.width,d=o.contentRect.height;c===0&&d===0||r(c,d)});return s.observe(i),g1(e,r),s}function $o(e,t,n){n&&n.disconnect(),t==="resize"&&m1(e)}function y1(e,t,n){const a=e.canvas,i=Km(r=>{e.ctx!==null&&n(f1(r,e))},e);return d1(a,t,i),i}class v1 extends bb{acquireContext(t,n){const a=t&&t.getContext&&t.getContext("2d");return a&&a.canvas===t?(c1(t,n),a):null}releaseContext(t){const n=t.canvas;if(!n[Zs])return!1;const a=n[Zs].initial;["height","width"].forEach(r=>{const s=a[r];G(s)?n.removeAttribute(r):n.setAttribute(r,s)});const i=a.style||{};return Object.keys(i).forEach(r=>{n.style[r]=i[r]}),n.width=n.width,delete n[Zs],!0}addEventListener(t,n,a){this.removeEventListener(t,n);const i=t.$proxies||(t.$proxies={}),s={attach:h1,detach:p1,resize:b1}[n]||y1;i[n]=s(t,n,a)}removeEventListener(t,n){const a=t.$proxies||(t.$proxies={}),i=a[n];if(!i)return;({attach:$o,detach:$o,resize:$o}[n]||u1)(t,n,i),a[n]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,n,a,i){return c2(t,n,a,i)}isAttached(t){const n=t&&Ru(t);return!!(n&&n.isConnected)}}function x1(e){return!zu()||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas?l1:v1}class De{constructor(){D(this,"x");D(this,"y");D(this,"active",!1);D(this,"options");D(this,"$animations")}tooltipPosition(t){const{x:n,y:a}=this.getProps(["x","y"],t);return{x:n,y:a}}hasValue(){return mi(this.x)&&mi(this.y)}getProps(t,n){const a=this.$animations;if(!n||!a)return this;const i={};return t.forEach(r=>{i[r]=a[r]&&a[r].active()?a[r]._to:this[r]}),i}}D(De,"defaults",{}),D(De,"defaultRoutes");function _1(e,t){const n=e.options.ticks,a=k1(e),i=Math.min(n.maxTicksLimit||a,a),r=n.major.enabled?w1(t):[],s=r.length,l=r[0],o=r[s-1],c=[];if(s>i)return M1(t,c,r,s/i),c;const d=S1(r,t,i);if(s>0){let u,f;const h=s>1?Math.round((o-l)/(s-1)):null;for(_s(t,c,d,G(h)?0:l-h,l),u=0,f=s-1;u<f;u++)_s(t,c,d,r[u],r[u+1]);return _s(t,c,d,o,G(h)?t.length:o+h),c}return _s(t,c,d),c}function k1(e){const t=e.options.offset,n=e._tickSize(),a=e._length/n+(t?0:1),i=e._maxLength/n;return Math.floor(Math.min(a,i))}function S1(e,t,n){const a=A1(e),i=t.length/n;if(!a)return Math.max(i,1);const r=f_(a);for(let s=0,l=r.length-1;s<l;s++){const o=r[s];if(o>i)return o}return Math.max(i,1)}function w1(e){const t=[];let n,a;for(n=0,a=e.length;n<a;n++)e[n].major&&t.push(n);return t}function M1(e,t,n,a){let i=0,r=n[0],s;for(a=Math.ceil(a),s=0;s<e.length;s++)s===r&&(t.push(e[s]),i++,r=n[i*a])}function _s(e,t,n,a,i){const r=B(a,0),s=Math.min(B(i,e.length),e.length);let l=0,o,c,d;for(n=Math.ceil(n),i&&(o=i-a,n=o/Math.floor(o/n)),d=r;d<0;)l++,d=Math.round(r+l*n);for(c=Math.max(r,0);c<s;c++)c===d&&(t.push(e[c]),l++,d=Math.round(r+l*n))}function A1(e){const t=e.length;let n,a;if(t<2)return!1;for(a=e[0],n=1;n<t;++n)if(e[n]-e[n-1]!==a)return!1;return a}const T1=e=>e==="left"?"right":e==="right"?"left":e,Ph=(e,t,n)=>t==="top"||t==="left"?e[t]+n:e[t]-n,Wh=(e,t)=>Math.min(t||e,e);function Jh(e,t){const n=[],a=e.length/t,i=e.length;let r=0;for(;r<i;r+=a)n.push(e[Math.floor(r)]);return n}function D1(e,t,n){const a=e.ticks.length,i=Math.min(t,a-1),r=e._startPixel,s=e._endPixel,l=1e-6;let o=e.getPixelForTick(i),c;if(!(n&&(a===1?c=Math.max(o-r,s-o):t===0?c=(e.getPixelForTick(1)-o)/2:c=(o-e.getPixelForTick(i-1))/2,o+=i<t?c:-c,o<r-l||o>s+l)))return o}function C1(e,t){J(e,n=>{const a=n.gc,i=a.length/2;let r;if(i>t){for(r=0;r<i;++r)delete n.data[a[r]];a.splice(0,i)}})}function Hi(e){return e.drawTicks?e.tickLength:0}function Ih(e,t){if(!e.display)return 0;const n=Mt(e.font,t),a=Vt(e.padding);return(ut(e.text)?e.text.length:1)*n.lineHeight+a.height}function O1(e,t){return Jn(e,{scale:t,type:"scale"})}function E1(e,t,n){return Jn(e,{tick:n,index:t,type:"tick"})}function z1(e,t,n){let a=Au(e);return(n&&t!=="right"||!n&&t==="right")&&(a=T1(a)),a}function R1(e,t,n,a){const{top:i,left:r,bottom:s,right:l,chart:o}=e,{chartArea:c,scales:d}=o;let u=0,f,h,m;const b=s-i,v=l-r;if(e.isHorizontal()){if(h=Nt(a,r,l),X(n)){const p=Object.keys(n)[0],g=n[p];m=d[p].getPixelForValue(g)+b-t}else n==="center"?m=(c.bottom+c.top)/2+b-t:m=Ph(e,n,t);f=l-r}else{if(X(n)){const p=Object.keys(n)[0],g=n[p];h=d[p].getPixelForValue(g)-v+t}else n==="center"?h=(c.left+c.right)/2-v+t:h=Ph(e,n,t);m=Nt(a,s,i),u=n==="left"?-bt:bt}return{titleX:h,titleY:m,maxWidth:f,rotation:u}}class Oa extends De{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,n){return t}getUserBounds(){let{_userMin:t,_userMax:n,_suggestedMin:a,_suggestedMax:i}=this;return t=ee(t,Number.POSITIVE_INFINITY),n=ee(n,Number.NEGATIVE_INFINITY),a=ee(a,Number.POSITIVE_INFINITY),i=ee(i,Number.NEGATIVE_INFINITY),{min:ee(t,a),max:ee(n,i),minDefined:gt(t),maxDefined:gt(n)}}getMinMax(t){let{min:n,max:a,minDefined:i,maxDefined:r}=this.getUserBounds(),s;if(i&&r)return{min:n,max:a};const l=this.getMatchingVisibleMetas();for(let o=0,c=l.length;o<c;++o)s=l[o].controller.getMinMax(this,t),i||(n=Math.min(n,s.min)),r||(a=Math.max(a,s.max));return n=r&&n>a?a:n,a=i&&n>a?n:a,{min:ee(n,ee(a,n)),max:ee(a,ee(n,a))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){nt(this.options.beforeUpdate,[this])}update(t,n,a){const{beginAtZero:i,grace:r,ticks:s}=this.options,l=s.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=n,this._margins=a=Object.assign({left:0,right:0,top:0,bottom:0},a),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+a.left+a.right:this.height+a.top+a.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=Y_(this,r,i),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const o=l<this.ticks.length;this._convertTicksToLabels(o?Jh(this.ticks,l):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),s.display&&(s.autoSkip||s.source==="auto")&&(this.ticks=_1(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),o&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,n,a;this.isHorizontal()?(n=this.left,a=this.right):(n=this.top,a=this.bottom,t=!t),this._startPixel=n,this._endPixel=a,this._reversePixels=t,this._length=a-n,this._alignToPixels=this.options.alignToPixels}afterUpdate(){nt(this.options.afterUpdate,[this])}beforeSetDimensions(){nt(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){nt(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),nt(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){nt(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const n=this.options.ticks;let a,i,r;for(a=0,i=t.length;a<i;a++)r=t[a],r.label=nt(n.callback,[r.value,a,t],this)}afterTickToLabelConversion(){nt(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){nt(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,n=t.ticks,a=Wh(this.ticks.length,t.ticks.maxTicksLimit),i=n.minRotation||0,r=n.maxRotation;let s=i,l,o,c;if(!this._isVisible()||!n.display||i>=r||a<=1||!this.isHorizontal()){this.labelRotation=i;return}const d=this._getLabelSizes(),u=d.widest.width,f=d.highest.height,h=Ct(this.chart.width-u,0,this.maxWidth);l=t.offset?this.maxWidth/a:h/(a-1),u+6>l&&(l=h/(a-(t.offset?.5:1)),o=this.maxHeight-Hi(t.grid)-n.padding-Ih(t.title,this.chart.options.font),c=Math.sqrt(u*u+f*f),s=wu(Math.min(Math.asin(Ct((d.highest.height+6)/l,-1,1)),Math.asin(Ct(o/c,-1,1))-Math.asin(Ct(f/c,-1,1)))),s=Math.max(i,Math.min(r,s))),this.labelRotation=s}afterCalculateLabelRotation(){nt(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){nt(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:n,options:{ticks:a,title:i,grid:r}}=this,s=this._isVisible(),l=this.isHorizontal();if(s){const o=Ih(i,n.options.font);if(l?(t.width=this.maxWidth,t.height=Hi(r)+o):(t.height=this.maxHeight,t.width=Hi(r)+o),a.display&&this.ticks.length){const{first:c,last:d,widest:u,highest:f}=this._getLabelSizes(),h=a.padding*2,m=Ae(this.labelRotation),b=Math.cos(m),v=Math.sin(m);if(l){const p=a.mirror?0:v*u.width+b*f.height;t.height=Math.min(this.maxHeight,t.height+p+h)}else{const p=a.mirror?0:b*u.width+v*f.height;t.width=Math.min(this.maxWidth,t.width+p+h)}this._calculatePadding(c,d,v,b)}}this._handleMargins(),l?(this.width=this._length=n.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=n.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,n,a,i){const{ticks:{align:r,padding:s},position:l}=this.options,o=this.labelRotation!==0,c=l!=="top"&&this.axis==="x";if(this.isHorizontal()){const d=this.getPixelForTick(0)-this.left,u=this.right-this.getPixelForTick(this.ticks.length-1);let f=0,h=0;o?c?(f=i*t.width,h=a*n.height):(f=a*t.height,h=i*n.width):r==="start"?h=n.width:r==="end"?f=t.width:r!=="inner"&&(f=t.width/2,h=n.width/2),this.paddingLeft=Math.max((f-d+s)*this.width/(this.width-d),0),this.paddingRight=Math.max((h-u+s)*this.width/(this.width-u),0)}else{let d=n.height/2,u=t.height/2;r==="start"?(d=0,u=t.height):r==="end"&&(d=n.height,u=0),this.paddingTop=d+s,this.paddingBottom=u+s}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){nt(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:n}=this.options;return n==="top"||n==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let n,a;for(n=0,a=t.length;n<a;n++)G(t[n].label)&&(t.splice(n,1),a--,n--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const n=this.options.ticks.sampleSize;let a=this.ticks;n<a.length&&(a=Jh(a,n)),this._labelSizes=t=this._computeLabelSizes(a,a.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,n,a){const{ctx:i,_longestTextCache:r}=this,s=[],l=[],o=Math.floor(n/Wh(n,a));let c=0,d=0,u,f,h,m,b,v,p,g,y,x,_;for(u=0;u<n;u+=o){if(m=t[u].label,b=this._resolveTickFontOptions(u),i.font=v=b.string,p=r[v]=r[v]||{data:{},gc:[]},g=b.lineHeight,y=x=0,!G(m)&&!ut(m))y=Cl(i,p.data,p.gc,y,m),x=g;else if(ut(m))for(f=0,h=m.length;f<h;++f)_=m[f],!G(_)&&!ut(_)&&(y=Cl(i,p.data,p.gc,y,_),x+=g);s.push(y),l.push(x),c=Math.max(y,c),d=Math.max(x,d)}C1(r,n);const w=s.indexOf(c),k=l.indexOf(d),S=A=>({width:s[A]||0,height:l[A]||0});return{first:S(0),last:S(n-1),widest:S(w),highest:S(k),widths:s,heights:l}}getLabelForValue(t){return t}getPixelForValue(t,n){return NaN}getValueForPixel(t){}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const n=this._startPixel+t*this._length;return m_(this._alignToPixels?ea(this.chart,n,0):n)}getDecimalForPixel(t){const n=(t-this._startPixel)/this._length;return this._reversePixels?1-n:n}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:n}=this;return t<0&&n<0?n:t>0&&n>0?t:0}getContext(t){const n=this.ticks||[];if(t>=0&&t<n.length){const a=n[t];return a.$context||(a.$context=E1(this.getContext(),t,a))}return this.$context||(this.$context=O1(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,n=Ae(this.labelRotation),a=Math.abs(Math.cos(n)),i=Math.abs(Math.sin(n)),r=this._getLabelSizes(),s=t.autoSkipPadding||0,l=r?r.widest.width+s:0,o=r?r.highest.height+s:0;return this.isHorizontal()?o*a>l*i?l/a:o/i:o*i<l*a?o/a:l/i}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const n=this.axis,a=this.chart,i=this.options,{grid:r,position:s,border:l}=i,o=r.offset,c=this.isHorizontal(),u=this.ticks.length+(o?1:0),f=Hi(r),h=[],m=l.setContext(this.getContext()),b=m.display?m.width:0,v=b/2,p=function(T){return ea(a,T,b)};let g,y,x,_,w,k,S,A,C,z,N,vt;if(s==="top")g=p(this.bottom),k=this.bottom-f,A=g-v,z=p(t.top)+v,vt=t.bottom;else if(s==="bottom")g=p(this.top),z=t.top,vt=p(t.bottom)-v,k=g+v,A=this.top+f;else if(s==="left")g=p(this.right),w=this.right-f,S=g-v,C=p(t.left)+v,N=t.right;else if(s==="right")g=p(this.left),C=t.left,N=p(t.right)-v,w=g+v,S=this.left+f;else if(n==="x"){if(s==="center")g=p((t.top+t.bottom)/2+.5);else if(X(s)){const T=Object.keys(s)[0],E=s[T];g=p(this.chart.scales[T].getPixelForValue(E))}z=t.top,vt=t.bottom,k=g+v,A=k+f}else if(n==="y"){if(s==="center")g=p((t.left+t.right)/2);else if(X(s)){const T=Object.keys(s)[0],E=s[T];g=p(this.chart.scales[T].getPixelForValue(E))}w=g-v,S=w-f,C=t.left,N=t.right}const Yt=B(i.ticks.maxTicksLimit,u),Q=Math.max(1,Math.ceil(u/Yt));for(y=0;y<u;y+=Q){const T=this.getContext(y),E=r.setContext(T),R=l.setContext(T),U=E.lineWidth,it=E.color,Ve=R.dash||[],Se=R.dashOffset,Ye=E.tickWidth,Gt=E.tickColor,Oe=E.tickBorderDash||[],In=E.tickBorderDashOffset;x=D1(this,y,o),x!==void 0&&(_=ea(a,x,U),c?w=S=C=N=_:k=A=z=vt=_,h.push({tx1:w,ty1:k,tx2:S,ty2:A,x1:C,y1:z,x2:N,y2:vt,width:U,color:it,borderDash:Ve,borderDashOffset:Se,tickWidth:Ye,tickColor:Gt,tickBorderDash:Oe,tickBorderDashOffset:In}))}return this._ticksLength=u,this._borderValue=g,h}_computeLabelItems(t){const n=this.axis,a=this.options,{position:i,ticks:r}=a,s=this.isHorizontal(),l=this.ticks,{align:o,crossAlign:c,padding:d,mirror:u}=r,f=Hi(a.grid),h=f+d,m=u?-d:h,b=-Ae(this.labelRotation),v=[];let p,g,y,x,_,w,k,S,A,C,z,N,vt="middle";if(i==="top")w=this.bottom-m,k=this._getXAxisLabelAlignment();else if(i==="bottom")w=this.top+m,k=this._getXAxisLabelAlignment();else if(i==="left"){const Q=this._getYAxisLabelAlignment(f);k=Q.textAlign,_=Q.x}else if(i==="right"){const Q=this._getYAxisLabelAlignment(f);k=Q.textAlign,_=Q.x}else if(n==="x"){if(i==="center")w=(t.top+t.bottom)/2+h;else if(X(i)){const Q=Object.keys(i)[0],T=i[Q];w=this.chart.scales[Q].getPixelForValue(T)+h}k=this._getXAxisLabelAlignment()}else if(n==="y"){if(i==="center")_=(t.left+t.right)/2-h;else if(X(i)){const Q=Object.keys(i)[0],T=i[Q];_=this.chart.scales[Q].getPixelForValue(T)}k=this._getYAxisLabelAlignment(f).textAlign}n==="y"&&(o==="start"?vt="top":o==="end"&&(vt="bottom"));const Yt=this._getLabelSizes();for(p=0,g=l.length;p<g;++p){y=l[p],x=y.label;const Q=r.setContext(this.getContext(p));S=this.getPixelForTick(p)+r.labelOffset,A=this._resolveTickFontOptions(p),C=A.lineHeight,z=ut(x)?x.length:1;const T=z/2,E=Q.color,R=Q.textStrokeColor,U=Q.textStrokeWidth;let it=k;s?(_=S,k==="inner"&&(p===g-1?it=this.options.reverse?"left":"right":p===0?it=this.options.reverse?"right":"left":it="center"),i==="top"?c==="near"||b!==0?N=-z*C+C/2:c==="center"?N=-Yt.highest.height/2-T*C+C:N=-Yt.highest.height+C/2:c==="near"||b!==0?N=C/2:c==="center"?N=Yt.highest.height/2-T*C:N=Yt.highest.height-z*C,u&&(N*=-1),b!==0&&!Q.showLabelBackdrop&&(_+=C/2*Math.sin(b))):(w=S,N=(1-z)*C/2);let Ve;if(Q.showLabelBackdrop){const Se=Vt(Q.backdropPadding),Ye=Yt.heights[p],Gt=Yt.widths[p];let Oe=N-Se.top,In=0-Se.left;switch(vt){case"middle":Oe-=Ye/2;break;case"bottom":Oe-=Ye;break}switch(k){case"center":In-=Gt/2;break;case"right":In-=Gt;break;case"inner":p===g-1?In-=Gt:p>0&&(In-=Gt/2);break}Ve={left:In,top:Oe,width:Gt+Se.width,height:Ye+Se.height,color:Q.backdropColor}}v.push({label:x,font:A,textOffset:N,options:{rotation:b,color:E,strokeColor:R,strokeWidth:U,textAlign:it,textBaseline:vt,translation:[_,w],backdrop:Ve}})}return v}_getXAxisLabelAlignment(){const{position:t,ticks:n}=this.options;if(-Ae(this.labelRotation))return t==="top"?"left":"right";let i="center";return n.align==="start"?i="left":n.align==="end"?i="right":n.align==="inner"&&(i="inner"),i}_getYAxisLabelAlignment(t){const{position:n,ticks:{crossAlign:a,mirror:i,padding:r}}=this.options,s=this._getLabelSizes(),l=t+r,o=s.widest.width;let c,d;return n==="left"?i?(d=this.right+r,a==="near"?c="left":a==="center"?(c="center",d+=o/2):(c="right",d+=o)):(d=this.right-l,a==="near"?c="right":a==="center"?(c="center",d-=o/2):(c="left",d=this.left)):n==="right"?i?(d=this.left+r,a==="near"?c="right":a==="center"?(c="center",d-=o/2):(c="left",d-=o)):(d=this.left+l,a==="near"?c="left":a==="center"?(c="center",d+=o/2):(c="right",d=this.right)):c="right",{textAlign:c,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,n=this.options.position;if(n==="left"||n==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(n==="top"||n==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:n},left:a,top:i,width:r,height:s}=this;n&&(t.save(),t.fillStyle=n,t.fillRect(a,i,r,s),t.restore())}getLineWidthForValue(t){const n=this.options.grid;if(!this._isVisible()||!n.display)return 0;const i=this.ticks.findIndex(r=>r.value===t);return i>=0?n.setContext(this.getContext(i)).lineWidth:0}drawGrid(t){const n=this.options.grid,a=this.ctx,i=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let r,s;const l=(o,c,d)=>{!d.width||!d.color||(a.save(),a.lineWidth=d.width,a.strokeStyle=d.color,a.setLineDash(d.borderDash||[]),a.lineDashOffset=d.borderDashOffset,a.beginPath(),a.moveTo(o.x,o.y),a.lineTo(c.x,c.y),a.stroke(),a.restore())};if(n.display)for(r=0,s=i.length;r<s;++r){const o=i[r];n.drawOnChartArea&&l({x:o.x1,y:o.y1},{x:o.x2,y:o.y2},o),n.drawTicks&&l({x:o.tx1,y:o.ty1},{x:o.tx2,y:o.ty2},{color:o.tickColor,width:o.tickWidth,borderDash:o.tickBorderDash,borderDashOffset:o.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:n,options:{border:a,grid:i}}=this,r=a.setContext(this.getContext()),s=a.display?r.width:0;if(!s)return;const l=i.setContext(this.getContext(0)).lineWidth,o=this._borderValue;let c,d,u,f;this.isHorizontal()?(c=ea(t,this.left,s)-s/2,d=ea(t,this.right,l)+l/2,u=f=o):(u=ea(t,this.top,s)-s/2,f=ea(t,this.bottom,l)+l/2,c=d=o),n.save(),n.lineWidth=r.width,n.strokeStyle=r.color,n.beginPath(),n.moveTo(c,u),n.lineTo(d,f),n.stroke(),n.restore()}drawLabels(t){if(!this.options.ticks.display)return;const a=this.ctx,i=this._computeLabelArea();i&&to(a,i);const r=this.getLabelItems(t);for(const s of r){const l=s.options,o=s.font,c=s.label,d=s.textOffset;wa(a,c,0,d,o,l)}i&&eo(a)}drawTitle(){const{ctx:t,options:{position:n,title:a,reverse:i}}=this;if(!a.display)return;const r=Mt(a.font),s=Vt(a.padding),l=a.align;let o=r.lineHeight/2;n==="bottom"||n==="center"||X(n)?(o+=s.bottom,ut(a.text)&&(o+=r.lineHeight*(a.text.length-1))):o+=s.top;const{titleX:c,titleY:d,maxWidth:u,rotation:f}=R1(this,o,n,l);wa(t,a.text,0,0,r,{color:a.color,maxWidth:u,rotation:f,textAlign:z1(l,n,i),textBaseline:"middle",translation:[c,d]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,n=t.ticks&&t.ticks.z||0,a=B(t.grid&&t.grid.z,-1),i=B(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==Oa.prototype.draw?[{z:n,draw:r=>{this.draw(r)}}]:[{z:a,draw:r=>{this.drawBackground(),this.drawGrid(r),this.drawTitle()}},{z:i,draw:()=>{this.drawBorder()}},{z:n,draw:r=>{this.drawLabels(r)}}]}getMatchingVisibleMetas(t){const n=this.chart.getSortedVisibleDatasetMetas(),a=this.axis+"AxisID",i=[];let r,s;for(r=0,s=n.length;r<s;++r){const l=n[r];l[a]===this.id&&(!t||l.type===t)&&i.push(l)}return i}_resolveTickFontOptions(t){const n=this.options.ticks.setContext(this.getContext(t));return Mt(n.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class ks{constructor(t,n,a){this.type=t,this.scope=n,this.override=a,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const n=Object.getPrototypeOf(t);let a;N1(n)&&(a=this.register(n));const i=this.items,r=t.id,s=this.scope+"."+r;if(!r)throw new Error("class does not have id: "+t);return r in i||(i[r]=t,L1(t,s,a),this.override&&ft.override(t.id,t.overrides)),s}get(t){return this.items[t]}unregister(t){const n=this.items,a=t.id,i=this.scope;a in n&&delete n[a],i&&a in ft[i]&&(delete ft[i][a],this.override&&delete Sa[a])}}function L1(e,t,n){const a=Er(Object.create(null),[n?ft.get(n):{},ft.get(t),e.defaults]);ft.set(t,a),e.defaultRoutes&&B1(t,e.defaultRoutes),e.descriptors&&ft.describe(t,e.descriptors)}function B1(e,t){Object.keys(t).forEach(n=>{const a=n.split("."),i=a.pop(),r=[e].concat(a).join("."),s=t[n].split("."),l=s.pop(),o=s.join(".");ft.route(r,i,o,l)})}function N1(e){return"id"in e&&"defaults"in e}class j1{constructor(){this.controllers=new ks(Te,"datasets",!0),this.elements=new ks(De,"elements"),this.plugins=new ks(Object,"plugins"),this.scales=new ks(Oa,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,n,a){[...n].forEach(i=>{const r=a||this._getRegistryForType(i);a||r.isForType(i)||r===this.plugins&&i.id?this._exec(t,r,i):J(i,s=>{const l=a||this._getRegistryForType(s);this._exec(t,l,s)})})}_exec(t,n,a){const i=Su(t);nt(a["before"+i],[],a),n[t](a),nt(a["after"+i],[],a)}_getRegistryForType(t){for(let n=0;n<this._typedRegistries.length;n++){const a=this._typedRegistries[n];if(a.isForType(t))return a}return this.plugins}_get(t,n,a){const i=n.get(t);if(i===void 0)throw new Error('"'+t+'" is not a registered '+a+".");return i}}var ze=new j1;class H1{constructor(){this._init=void 0}notify(t,n,a,i){if(n==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const r=i?this._descriptors(t).filter(i):this._descriptors(t),s=this._notify(r,t,n,a);return n==="afterDestroy"&&(this._notify(r,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),s}_notify(t,n,a,i){i=i||{};for(const r of t){const s=r.plugin,l=s[a],o=[n,i,r.options];if(nt(l,o,s)===!1&&i.cancelable)return!1}return!0}invalidate(){G(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const n=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),n}_createDescriptors(t,n){const a=t&&t.config,i=B(a.options&&a.options.plugins,{}),r=U1(a);return i===!1&&!n?[]:Y1(t,r,i,n)}_notifyStateChanges(t){const n=this._oldCache||[],a=this._cache,i=(r,s)=>r.filter(l=>!s.some(o=>l.plugin.id===o.plugin.id));this._notify(i(n,a),t,"stop"),this._notify(i(a,n),t,"start")}}function U1(e){const t={},n=[],a=Object.keys(ze.plugins.items);for(let r=0;r<a.length;r++)n.push(ze.getPlugin(a[r]));const i=e.plugins||[];for(let r=0;r<i.length;r++){const s=i[r];n.indexOf(s)===-1&&(n.push(s),t[s.id]=!0)}return{plugins:n,localIds:t}}function V1(e,t){return!t&&e===!1?null:e===!0?{}:e}function Y1(e,{plugins:t,localIds:n},a,i){const r=[],s=e.getContext();for(const l of t){const o=l.id,c=V1(a[o],i);c!==null&&r.push({plugin:l,options:G1(e.config,{plugin:l,local:n[o]},c,s)})}return r}function G1(e,{plugin:t,local:n},a,i){const r=e.pluginScopeKeys(t),s=e.getOptionScopes(a,r);return n&&t.defaults&&s.push(t.defaults),e.createResolver(s,i,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function ld(e,t){const n=ft.datasets[e]||{};return((t.datasets||{})[e]||{}).indexAxis||t.indexAxis||n.indexAxis||"x"}function q1(e,t){let n=e;return e==="_index_"?n=t:e==="_value_"&&(n=t==="x"?"y":"x"),n}function X1(e,t){return e===t?"_index_":"_value_"}function $h(e){if(e==="x"||e==="y"||e==="r")return e}function F1(e){if(e==="top"||e==="bottom")return"x";if(e==="left"||e==="right")return"y"}function od(e,...t){if($h(e))return e;for(const n of t){const a=n.axis||F1(n.position)||e.length>1&&$h(e[0].toLowerCase());if(a)return a}throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`)}function t0(e,t,n){if(n[t+"AxisID"]===e)return{axis:t}}function Q1(e,t){if(t.data&&t.data.datasets){const n=t.data.datasets.filter(a=>a.xAxisID===e||a.yAxisID===e);if(n.length)return t0(e,"x",n[0])||t0(e,"y",n[0])}return{}}function Z1(e,t){const n=Sa[e.type]||{scales:{}},a=t.scales||{},i=ld(e.type,t),r=Object.create(null);return Object.keys(a).forEach(s=>{const l=a[s];if(!X(l))return console.error(`Invalid scale configuration for scale: ${s}`);if(l._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${s}`);const o=od(s,l,Q1(s,e),ft.scales[l.type]),c=X1(o,i),d=n.scales||{};r[s]=ur(Object.create(null),[{axis:o},l,d[o],d[c]])}),e.data.datasets.forEach(s=>{const l=s.type||e.type,o=s.indexAxis||ld(l,t),d=(Sa[l]||{}).scales||{};Object.keys(d).forEach(u=>{const f=q1(u,o),h=s[f+"AxisID"]||f;r[h]=r[h]||Object.create(null),ur(r[h],[{axis:f},a[h],d[u]])})}),Object.keys(r).forEach(s=>{const l=r[s];ur(l,[ft.scales[l.type],ft.scale])}),r}function xb(e){const t=e.options||(e.options={});t.plugins=B(t.plugins,{}),t.scales=Z1(e,t)}function _b(e){return e=e||{},e.datasets=e.datasets||[],e.labels=e.labels||[],e}function K1(e){return e=e||{},e.data=_b(e.data),xb(e),e}const e0=new Map,kb=new Set;function Ss(e,t){let n=e0.get(e);return n||(n=t(),e0.set(e,n),kb.add(n)),n}const Ui=(e,t,n)=>{const a=Zn(t,n);a!==void 0&&e.add(a)};class P1{constructor(t){this._config=K1(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=_b(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),xb(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return Ss(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,n){return Ss(`${t}.transition.${n}`,()=>[[`datasets.${t}.transitions.${n}`,`transitions.${n}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,n){return Ss(`${t}-${n}`,()=>[[`datasets.${t}.elements.${n}`,`datasets.${t}`,`elements.${n}`,""]])}pluginScopeKeys(t){const n=t.id,a=this.type;return Ss(`${a}-plugin-${n}`,()=>[[`plugins.${n}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,n){const a=this._scopeCache;let i=a.get(t);return(!i||n)&&(i=new Map,a.set(t,i)),i}getOptionScopes(t,n,a){const{options:i,type:r}=this,s=this._cachedScopes(t,a),l=s.get(n);if(l)return l;const o=new Set;n.forEach(d=>{t&&(o.add(t),d.forEach(u=>Ui(o,t,u))),d.forEach(u=>Ui(o,i,u)),d.forEach(u=>Ui(o,Sa[r]||{},u)),d.forEach(u=>Ui(o,ft,u)),d.forEach(u=>Ui(o,id,u))});const c=Array.from(o);return c.length===0&&c.push(Object.create(null)),kb.has(n)&&s.set(n,c),c}chartOptionScopes(){const{options:t,type:n}=this;return[t,Sa[n]||{},ft.datasets[n]||{},{type:n},ft,id]}resolveNamedOptions(t,n,a,i=[""]){const r={$shared:!0},{resolver:s,subPrefixes:l}=n0(this._resolverCache,t,i);let o=s;if(J1(s,n)){r.$shared=!1,a=Kn(a)?a():a;const c=this.createResolver(t,a,l);o=bi(s,a,c)}for(const c of n)r[c]=o[c];return r}createResolver(t,n,a=[""],i){const{resolver:r}=n0(this._resolverCache,t,a);return X(n)?bi(r,n,void 0,i):r}}function n0(e,t,n){let a=e.get(t);a||(a=new Map,e.set(t,a));const i=n.join();let r=a.get(i);return r||(r={resolver:Cu(t,n),subPrefixes:n.filter(l=>!l.toLowerCase().includes("hover"))},a.set(i,r)),r}const W1=e=>X(e)&&Object.getOwnPropertyNames(e).some(t=>Kn(e[t]));function J1(e,t){const{isScriptable:n,isIndexable:a}=tb(e);for(const i of t){const r=n(i),s=a(i),l=(s||r)&&e[i];if(r&&(Kn(l)||W1(l))||s&&ut(l))return!0}return!1}var I1="4.5.1";const $1=["top","bottom","left","right","chartArea"];function a0(e,t){return e==="top"||e==="bottom"||$1.indexOf(e)===-1&&t==="x"}function i0(e,t){return function(n,a){return n[e]===a[e]?n[t]-a[t]:n[e]-a[e]}}function r0(e){const t=e.chart,n=t.options.animation;t.notifyPlugins("afterRender"),nt(n&&n.onComplete,[e],t)}function tk(e){const t=e.chart,n=t.options.animation;nt(n&&n.onProgress,[e],t)}function Sb(e){return zu()&&typeof e=="string"?e=document.getElementById(e):e&&e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e}const Ks={},s0=e=>{const t=Sb(e);return Object.values(Ks).filter(n=>n.canvas===t).pop()};function ek(e,t,n){const a=Object.keys(e);for(const i of a){const r=+i;if(r>=t){const s=e[i];delete e[i],(n>0||r>t)&&(e[r+n]=s)}}}function nk(e,t,n,a){return!n||e.type==="mouseout"?null:a?t:e}class Ie{static register(...t){ze.add(...t),l0()}static unregister(...t){ze.remove(...t),l0()}constructor(t,n){const a=this.config=new P1(n),i=Sb(t),r=s0(i);if(r)throw new Error("Canvas is already in use. Chart with ID '"+r.id+"' must be destroyed before the canvas with ID '"+r.canvas.id+"' can be reused.");const s=a.createResolver(a.chartOptionScopes(),this.getContext());this.platform=new(a.platform||x1(i)),this.platform.updateConfig(a);const l=this.platform.acquireContext(i,s.aspectRatio),o=l&&l.canvas,c=o&&o.height,d=o&&o.width;if(this.id=a_(),this.ctx=l,this.canvas=o,this.width=d,this.height=c,this._options=s,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new H1,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=x_(u=>this.update(u),s.resizeDelay||0),this._dataChanges=[],Ks[this.id]=this,!l||!o){console.error("Failed to create chart: can't acquire context from the given item");return}Ke.listen(this,"complete",r0),Ke.listen(this,"progress",tk),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:n},width:a,height:i,_aspectRatio:r}=this;return G(t)?n&&r?r:i?a/i:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return ze}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():Ch(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Ah(this.canvas,this.ctx),this}stop(){return Ke.stop(this),this}resize(t,n){Ke.running(this)?this._resizeBeforeDraw={width:t,height:n}:this._resize(t,n)}_resize(t,n){const a=this.options,i=this.canvas,r=a.maintainAspectRatio&&this.aspectRatio,s=this.platform.getMaximumSize(i,t,n,r),l=a.devicePixelRatio||this.platform.getDevicePixelRatio(),o=this.width?"resize":"attach";this.width=s.width,this.height=s.height,this._aspectRatio=this.aspectRatio,Ch(this,l,!0)&&(this.notifyPlugins("resize",{size:s}),nt(a.onResize,[this,s],this),this.attached&&this._doResize(o)&&this.render())}ensureScalesHaveIDs(){const n=this.options.scales||{};J(n,(a,i)=>{a.id=i})}buildOrUpdateScales(){const t=this.options,n=t.scales,a=this.scales,i=Object.keys(a).reduce((s,l)=>(s[l]=!1,s),{});let r=[];n&&(r=r.concat(Object.keys(n).map(s=>{const l=n[s],o=od(s,l),c=o==="r",d=o==="x";return{options:l,dposition:c?"chartArea":d?"bottom":"left",dtype:c?"radialLinear":d?"category":"linear"}}))),J(r,s=>{const l=s.options,o=l.id,c=od(o,l),d=B(l.type,s.dtype);(l.position===void 0||a0(l.position,c)!==a0(s.dposition))&&(l.position=s.dposition),i[o]=!0;let u=null;if(o in a&&a[o].type===d)u=a[o];else{const f=ze.getScale(d);u=new f({id:o,type:d,ctx:this.ctx,chart:this}),a[u.id]=u}u.init(l,t)}),J(i,(s,l)=>{s||delete a[l]}),J(a,s=>{Ut.configure(this,s,s.options),Ut.addBox(this,s)})}_updateMetasets(){const t=this._metasets,n=this.data.datasets.length,a=t.length;if(t.sort((i,r)=>i.index-r.index),a>n){for(let i=n;i<a;++i)this._destroyDatasetMeta(i);t.splice(n,a-n)}this._sortedMetasets=t.slice(0).sort(i0("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:n}}=this;t.length>n.length&&delete this._stacks,t.forEach((a,i)=>{n.filter(r=>r===a._dataset).length===0&&this._destroyDatasetMeta(i)})}buildOrUpdateControllers(){const t=[],n=this.data.datasets;let a,i;for(this._removeUnreferencedMetasets(),a=0,i=n.length;a<i;a++){const r=n[a];let s=this.getDatasetMeta(a);const l=r.type||this.config.type;if(s.type&&s.type!==l&&(this._destroyDatasetMeta(a),s=this.getDatasetMeta(a)),s.type=l,s.indexAxis=r.indexAxis||ld(l,this.options),s.order=r.order||0,s.index=a,s.label=""+r.label,s.visible=this.isDatasetVisible(a),s.controller)s.controller.updateIndex(a),s.controller.linkScales();else{const o=ze.getController(l),{datasetElementType:c,dataElementType:d}=ft.datasets[l];Object.assign(o,{dataElementType:ze.getElement(d),datasetElementType:c&&ze.getElement(c)}),s.controller=new o(this,a),t.push(s.controller)}}return this._updateMetasets(),t}_resetElements(){J(this.data.datasets,(t,n)=>{this.getDatasetMeta(n).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const n=this.config;n.update();const a=this._options=n.createResolver(n.chartOptionScopes(),this.getContext()),i=this._animationsDisabled=!a.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const r=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let s=0;for(let c=0,d=this.data.datasets.length;c<d;c++){const{controller:u}=this.getDatasetMeta(c),f=!i&&r.indexOf(u)===-1;u.buildOrUpdateElements(f),s=Math.max(+u.getMaxOverflow(),s)}s=this._minPadding=a.layout.autoPadding?s:0,this._updateLayout(s),i||J(r,c=>{c.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(i0("z","_idx"));const{_active:l,_lastEvent:o}=this;o?this._eventHandler(o,!0):l.length&&this._updateHoverStyles(l,l,!0),this.render()}_updateScales(){J(this.scales,t=>{Ut.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,n=new Set(Object.keys(this._listeners)),a=new Set(t.events);(!bh(n,a)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,n=this._getUniformDataChanges()||[];for(const{method:a,start:i,count:r}of n){const s=a==="_removeElements"?-r:r;ek(t,i,s)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const n=this.data.datasets.length,a=r=>new Set(t.filter(s=>s[0]===r).map((s,l)=>l+","+s.splice(1).join(","))),i=a(0);for(let r=1;r<n;r++)if(!bh(i,a(r)))return;return Array.from(i).map(r=>r.split(",")).map(r=>({method:r[1],start:+r[2],count:+r[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;Ut.update(this,this.width,this.height,t);const n=this.chartArea,a=n.width<=0||n.height<=0;this._layers=[],J(this.boxes,i=>{a&&i.position==="chartArea"||(i.configure&&i.configure(),this._layers.push(...i._layers()))},this),this._layers.forEach((i,r)=>{i._idx=r}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let n=0,a=this.data.datasets.length;n<a;++n)this.getDatasetMeta(n).controller.configure();for(let n=0,a=this.data.datasets.length;n<a;++n)this._updateDataset(n,Kn(t)?t({datasetIndex:n}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,n){const a=this.getDatasetMeta(t),i={meta:a,index:t,mode:n,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",i)!==!1&&(a.controller._update(n),i.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",i))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(Ke.has(this)?this.attached&&!Ke.running(this)&&Ke.start(this):(this.draw(),r0({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:a,height:i}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(a,i)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const n=this._layers;for(t=0;t<n.length&&n[t].z<=0;++t)n[t].draw(this.chartArea);for(this._drawDatasets();t<n.length;++t)n[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const n=this._sortedMetasets,a=[];let i,r;for(i=0,r=n.length;i<r;++i){const s=n[i];(!t||s.visible)&&a.push(s)}return a}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let n=t.length-1;n>=0;--n)this._drawDataset(t[n]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const n=this.ctx,a={meta:t,index:t.index,cancelable:!0},i=ub(this,t);this.notifyPlugins("beforeDatasetDraw",a)!==!1&&(i&&to(n,i),t.controller.draw(),i&&eo(n),a.cancelable=!1,this.notifyPlugins("afterDatasetDraw",a))}isPointInArea(t){return sn(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,n,a,i){const r=$2.modes[n];return typeof r=="function"?r(this,t,a,i):[]}getDatasetMeta(t){const n=this.data.datasets[t],a=this._metasets;let i=a.filter(r=>r&&r._dataset===n).pop();return i||(i={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:n&&n.order||0,index:t,_dataset:n,_parsed:[],_sorted:!1},a.push(i)),i}getContext(){return this.$context||(this.$context=Jn(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const n=this.data.datasets[t];if(!n)return!1;const a=this.getDatasetMeta(t);return typeof a.hidden=="boolean"?!a.hidden:!n.hidden}setDatasetVisibility(t,n){const a=this.getDatasetMeta(t);a.hidden=!n}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,n,a){const i=a?"show":"hide",r=this.getDatasetMeta(t),s=r.controller._resolveAnimations(void 0,i);zr(n)?(r.data[n].hidden=!a,this.update()):(this.setDatasetVisibility(t,a),s.update(r,{visible:a}),this.update(l=>l.datasetIndex===t?i:void 0))}hide(t,n){this._updateVisibility(t,n,!1)}show(t,n){this._updateVisibility(t,n,!0)}_destroyDatasetMeta(t){const n=this._metasets[t];n&&n.controller&&n.controller._destroy(),delete this._metasets[t]}_stop(){let t,n;for(this.stop(),Ke.remove(this),t=0,n=this.data.datasets.length;t<n;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:n}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),Ah(t,n),this.platform.releaseContext(n),this.canvas=null,this.ctx=null),delete Ks[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,n=this.platform,a=(r,s)=>{n.addEventListener(this,r,s),t[r]=s},i=(r,s,l)=>{r.offsetX=s,r.offsetY=l,this._eventHandler(r)};J(this.options.events,r=>a(r,i))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,n=this.platform,a=(o,c)=>{n.addEventListener(this,o,c),t[o]=c},i=(o,c)=>{t[o]&&(n.removeEventListener(this,o,c),delete t[o])},r=(o,c)=>{this.canvas&&this.resize(o,c)};let s;const l=()=>{i("attach",l),this.attached=!0,this.resize(),a("resize",r),a("detach",s)};s=()=>{this.attached=!1,i("resize",r),this._stop(),this._resize(0,0),a("attach",l)},n.isAttached(this.canvas)?l():s()}unbindEvents(){J(this._listeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._listeners={},J(this._responsiveListeners,(t,n)=>{this.platform.removeEventListener(this,n,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,n,a){const i=a?"set":"remove";let r,s,l,o;for(n==="dataset"&&(r=this.getDatasetMeta(t[0].datasetIndex),r.controller["_"+i+"DatasetHoverStyle"]()),l=0,o=t.length;l<o;++l){s=t[l];const c=s&&this.getDatasetMeta(s.datasetIndex).controller;c&&c[i+"HoverStyle"](s.element,s.datasetIndex,s.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const n=this._active||[],a=t.map(({datasetIndex:r,index:s})=>{const l=this.getDatasetMeta(r);if(!l)throw new Error("No dataset found at index "+r);return{datasetIndex:r,element:l.data[s],index:s}});!Al(a,n)&&(this._active=a,this._lastEvent=null,this._updateHoverStyles(a,n))}notifyPlugins(t,n,a){return this._plugins.notify(this,t,n,a)}isPluginEnabled(t){return this._plugins._cache.filter(n=>n.plugin.id===t).length===1}_updateHoverStyles(t,n,a){const i=this.options.hover,r=(o,c)=>o.filter(d=>!c.some(u=>d.datasetIndex===u.datasetIndex&&d.index===u.index)),s=r(n,t),l=a?t:r(t,n);s.length&&this.updateHoverStyle(s,i.mode,!1),l.length&&i.mode&&this.updateHoverStyle(l,i.mode,!0)}_eventHandler(t,n){const a={event:t,replay:n,cancelable:!0,inChartArea:this.isPointInArea(t)},i=s=>(s.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",a,i)===!1)return;const r=this._handleEvent(t,n,a.inChartArea);return a.cancelable=!1,this.notifyPlugins("afterEvent",a,i),(r||a.changed)&&this.render(),this}_handleEvent(t,n,a){const{_active:i=[],options:r}=this,s=n,l=this._getActiveElements(t,i,a,s),o=c_(t),c=nk(t,this._lastEvent,a,o);a&&(this._lastEvent=null,nt(r.onHover,[t,l,this],this),o&&nt(r.onClick,[t,l,this],this));const d=!Al(l,i);return(d||n)&&(this._active=l,this._updateHoverStyles(l,i,n)),this._lastEvent=c,d}_getActiveElements(t,n,a,i){if(t.type==="mouseout")return[];if(!a)return n;const r=this.options.hover;return this.getElementsAtEventForMode(t,r.mode,r,i)}}D(Ie,"defaults",ft),D(Ie,"instances",Ks),D(Ie,"overrides",Sa),D(Ie,"registry",ze),D(Ie,"version",I1),D(Ie,"getChart",s0);function l0(){return J(Ie.instances,e=>e._plugins.invalidate())}function ak(e,t,n){const{startAngle:a,x:i,y:r,outerRadius:s,innerRadius:l,options:o}=t,{borderWidth:c,borderJoinStyle:d}=o,u=Math.min(c/s,Ht(a-n));if(e.beginPath(),e.arc(i,r,s-c/2,a+u/2,n-u/2),l>0){const f=Math.min(c/l,Ht(a-n));e.arc(i,r,l+c/2,n-f/2,a+f/2,!0)}else{const f=Math.min(c/2,s*Ht(a-n));if(d==="round")e.arc(i,r,f,n-Z/2,a+Z/2,!0);else if(d==="bevel"){const h=2*f*f,m=-h*Math.cos(n+Z/2)+i,b=-h*Math.sin(n+Z/2)+r,v=h*Math.cos(a+Z/2)+i,p=h*Math.sin(a+Z/2)+r;e.lineTo(m,b),e.lineTo(v,p)}}e.closePath(),e.moveTo(0,0),e.rect(0,0,e.canvas.width,e.canvas.height),e.clip("evenodd")}function ik(e,t,n){const{startAngle:a,pixelMargin:i,x:r,y:s,outerRadius:l,innerRadius:o}=t;let c=i/l;e.beginPath(),e.arc(r,s,l,a-c,n+c),o>i?(c=i/o,e.arc(r,s,o,n+c,a-c,!0)):e.arc(r,s,i,n+bt,a-bt),e.closePath(),e.clip()}function rk(e){return Du(e,["outerStart","outerEnd","innerStart","innerEnd"])}function sk(e,t,n,a){const i=rk(e.options.borderRadius),r=(n-t)/2,s=Math.min(r,a*t/2),l=o=>{const c=(n-Math.min(r,o))*a/2;return Ct(o,0,Math.min(r,c))};return{outerStart:l(i.outerStart),outerEnd:l(i.outerEnd),innerStart:Ct(i.innerStart,0,s),innerEnd:Ct(i.innerEnd,0,s)}}function La(e,t,n,a){return{x:n+e*Math.cos(t),y:a+e*Math.sin(t)}}function zl(e,t,n,a,i,r){const{x:s,y:l,startAngle:o,pixelMargin:c,innerRadius:d}=t,u=Math.max(t.outerRadius+a+n-c,0),f=d>0?d+a+n+c:0;let h=0;const m=i-o;if(a){const Q=d>0?d-a:0,T=u>0?u-a:0,E=(Q+T)/2,R=E!==0?m*E/(E+a):m;h=(m-R)/2}const b=Math.max(.001,m*u-n/Z)/u,v=(m-b)/2,p=o+v+h,g=i-v-h,{outerStart:y,outerEnd:x,innerStart:_,innerEnd:w}=sk(t,f,u,g-p),k=u-y,S=u-x,A=p+y/k,C=g-x/S,z=f+_,N=f+w,vt=p+_/z,Yt=g-w/N;if(e.beginPath(),r){const Q=(A+C)/2;if(e.arc(s,l,u,A,Q),e.arc(s,l,u,Q,C),x>0){const U=La(S,C,s,l);e.arc(U.x,U.y,x,C,g+bt)}const T=La(N,g,s,l);if(e.lineTo(T.x,T.y),w>0){const U=La(N,Yt,s,l);e.arc(U.x,U.y,w,g+bt,Yt+Math.PI)}const E=(g-w/f+(p+_/f))/2;if(e.arc(s,l,f,g-w/f,E,!0),e.arc(s,l,f,E,p+_/f,!0),_>0){const U=La(z,vt,s,l);e.arc(U.x,U.y,_,vt+Math.PI,p-bt)}const R=La(k,p,s,l);if(e.lineTo(R.x,R.y),y>0){const U=La(k,A,s,l);e.arc(U.x,U.y,y,p-bt,A)}}else{e.moveTo(s,l);const Q=Math.cos(A)*u+s,T=Math.sin(A)*u+l;e.lineTo(Q,T);const E=Math.cos(C)*u+s,R=Math.sin(C)*u+l;e.lineTo(E,R)}e.closePath()}function lk(e,t,n,a,i){const{fullCircles:r,startAngle:s,circumference:l}=t;let o=t.endAngle;if(r){zl(e,t,n,a,o,i);for(let c=0;c<r;++c)e.fill();isNaN(l)||(o=s+(l%ot||ot))}return zl(e,t,n,a,o,i),e.fill(),o}function ok(e,t,n,a,i){const{fullCircles:r,startAngle:s,circumference:l,options:o}=t,{borderWidth:c,borderJoinStyle:d,borderDash:u,borderDashOffset:f,borderRadius:h}=o,m=o.borderAlign==="inner";if(!c)return;e.setLineDash(u||[]),e.lineDashOffset=f,m?(e.lineWidth=c*2,e.lineJoin=d||"round"):(e.lineWidth=c,e.lineJoin=d||"bevel");let b=t.endAngle;if(r){zl(e,t,n,a,b,i);for(let v=0;v<r;++v)e.stroke();isNaN(l)||(b=s+(l%ot||ot))}m&&ik(e,t,b),o.selfJoin&&b-s>=Z&&h===0&&d!=="miter"&&ak(e,t,b),r||(zl(e,t,n,a,b,i),e.stroke())}class Ki extends De{constructor(n){super();D(this,"circumference");D(this,"endAngle");D(this,"fullCircles");D(this,"innerRadius");D(this,"outerRadius");D(this,"pixelMargin");D(this,"startAngle");this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,n&&Object.assign(this,n)}inRange(n,a,i){const r=this.getProps(["x","y"],i),{angle:s,distance:l}=Xm(r,{x:n,y:a}),{startAngle:o,endAngle:c,innerRadius:d,outerRadius:u,circumference:f}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],i),h=(this.options.spacing+this.options.borderWidth)/2,m=B(f,c-o),b=Rr(s,o,c)&&o!==c,v=m>=ot||b,p=an(l,d+h,u+h);return v&&p}getCenterPoint(n){const{x:a,y:i,startAngle:r,endAngle:s,innerRadius:l,outerRadius:o}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],n),{offset:c,spacing:d}=this.options,u=(r+s)/2,f=(l+o+d+c)/2;return{x:a+Math.cos(u)*f,y:i+Math.sin(u)*f}}tooltipPosition(n){return this.getCenterPoint(n)}draw(n){const{options:a,circumference:i}=this,r=(a.offset||0)/4,s=(a.spacing||0)/2,l=a.circular;if(this.pixelMargin=a.borderAlign==="inner"?.33:0,this.fullCircles=i>ot?Math.floor(i/ot):0,i===0||this.innerRadius<0||this.outerRadius<0)return;n.save();const o=(this.startAngle+this.endAngle)/2;n.translate(Math.cos(o)*r,Math.sin(o)*r);const c=1-Math.sin(Math.min(Z,i||0)),d=r*c;n.fillStyle=a.backgroundColor,n.strokeStyle=a.borderColor,lk(n,this,d,s,l),ok(n,this,d,s,l),n.restore()}}D(Ki,"id","arc"),D(Ki,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1}),D(Ki,"defaultRoutes",{backgroundColor:"backgroundColor"}),D(Ki,"descriptors",{_scriptable:!0,_indexable:n=>n!=="borderDash"});function wb(e,t,n=t){e.lineCap=B(n.borderCapStyle,t.borderCapStyle),e.setLineDash(B(n.borderDash,t.borderDash)),e.lineDashOffset=B(n.borderDashOffset,t.borderDashOffset),e.lineJoin=B(n.borderJoinStyle,t.borderJoinStyle),e.lineWidth=B(n.borderWidth,t.borderWidth),e.strokeStyle=B(n.borderColor,t.borderColor)}function ck(e,t,n){e.lineTo(n.x,n.y)}function dk(e){return e.stepped?z_:e.tension||e.cubicInterpolationMode==="monotone"?R_:ck}function Mb(e,t,n={}){const a=e.length,{start:i=0,end:r=a-1}=n,{start:s,end:l}=t,o=Math.max(i,s),c=Math.min(r,l),d=i<s&&r<s||i>l&&r>l;return{count:a,start:o,loop:t.loop,ilen:c<o&&!d?a+c-o:c-o}}function uk(e,t,n,a){const{points:i,options:r}=t,{count:s,start:l,loop:o,ilen:c}=Mb(i,n,a),d=dk(r);let{move:u=!0,reverse:f}=a||{},h,m,b;for(h=0;h<=c;++h)m=i[(l+(f?c-h:h))%s],!m.skip&&(u?(e.moveTo(m.x,m.y),u=!1):d(e,b,m,f,r.stepped),b=m);return o&&(m=i[(l+(f?c:0))%s],d(e,b,m,f,r.stepped)),!!o}function fk(e,t,n,a){const i=t.points,{count:r,start:s,ilen:l}=Mb(i,n,a),{move:o=!0,reverse:c}=a||{};let d=0,u=0,f,h,m,b,v,p;const g=x=>(s+(c?l-x:x))%r,y=()=>{b!==v&&(e.lineTo(d,v),e.lineTo(d,b),e.lineTo(d,p))};for(o&&(h=i[g(0)],e.moveTo(h.x,h.y)),f=0;f<=l;++f){if(h=i[g(f)],h.skip)continue;const x=h.x,_=h.y,w=x|0;w===m?(_<b?b=_:_>v&&(v=_),d=(u*d+x)/++u):(y(),e.lineTo(x,_),m=w,u=0,b=v=_),p=_}y()}function cd(e){const t=e.options,n=t.borderDash&&t.borderDash.length;return!e._decimated&&!e._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!n?fk:uk}function hk(e){return e.stepped?u2:e.tension||e.cubicInterpolationMode==="monotone"?f2:ca}function pk(e,t,n,a){let i=t._path;i||(i=t._path=new Path2D,t.path(i,n,a)&&i.closePath()),wb(e,t.options),e.stroke(i)}function gk(e,t,n,a){const{segments:i,options:r}=t,s=cd(t);for(const l of i)wb(e,r,l.style),e.beginPath(),s(e,t,l,{start:n,end:n+a-1})&&e.closePath(),e.stroke()}const mk=typeof Path2D=="function";function bk(e,t,n,a){mk&&!t.options.segment?pk(e,t,n,a):gk(e,t,n,a)}class En extends De{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,n){const a=this.options;if((a.tension||a.cubicInterpolationMode==="monotone")&&!a.stepped&&!this._pointsUpdated){const i=a.spanGaps?this._loop:this._fullLoop;a2(this._points,a,t,i,n),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=y2(this,this.options.segment))}first(){const t=this.segments,n=this.points;return t.length&&n[t[0].start]}last(){const t=this.segments,n=this.points,a=t.length;return a&&n[t[a-1].end]}interpolate(t,n){const a=this.options,i=t[n],r=this.points,s=db(this,{property:n,start:i,end:i});if(!s.length)return;const l=[],o=hk(a);let c,d;for(c=0,d=s.length;c<d;++c){const{start:u,end:f}=s[c],h=r[u],m=r[f];if(h===m){l.push(h);continue}const b=Math.abs((i-h[n])/(m[n]-h[n])),v=o(h,m,b,a.stepped);v[n]=t[n],l.push(v)}return l.length===1?l[0]:l}pathSegment(t,n,a){return cd(this)(t,this,n,a)}path(t,n,a){const i=this.segments,r=cd(this);let s=this._loop;n=n||0,a=a||this.points.length-n;for(const l of i)s&=r(t,this,l,{start:n,end:n+a-1});return!!s}draw(t,n,a,i){const r=this.options||{};(this.points||[]).length&&r.borderWidth&&(t.save(),bk(t,this,a,i),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}D(En,"id","line"),D(En,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),D(En,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),D(En,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function o0(e,t,n,a){const i=e.options,{[n]:r}=e.getProps([n],a);return Math.abs(t-r)<i.radius+i.hitRadius}class Ps extends De{constructor(n){super();D(this,"parsed");D(this,"skip");D(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,n&&Object.assign(this,n)}inRange(n,a,i){const r=this.options,{x:s,y:l}=this.getProps(["x","y"],i);return Math.pow(n-s,2)+Math.pow(a-l,2)<Math.pow(r.hitRadius+r.radius,2)}inXRange(n,a){return o0(this,n,"x",a)}inYRange(n,a){return o0(this,n,"y",a)}getCenterPoint(n){const{x:a,y:i}=this.getProps(["x","y"],n);return{x:a,y:i}}size(n){n=n||this.options||{};let a=n.radius||0;a=Math.max(a,a&&n.hoverRadius||0);const i=a&&n.borderWidth||0;return(a+i)*2}draw(n,a){const i=this.options;this.skip||i.radius<.1||!sn(this,a,this.size(i)/2)||(n.strokeStyle=i.borderColor,n.lineWidth=i.borderWidth,n.fillStyle=i.backgroundColor,rd(n,i,this.x,this.y))}getRange(){const n=this.options||{};return n.radius+n.hitRadius}}D(Ps,"id","point"),D(Ps,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),D(Ps,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function Ab(e,t){const{x:n,y:a,base:i,width:r,height:s}=e.getProps(["x","y","base","width","height"],t);let l,o,c,d,u;return e.horizontal?(u=s/2,l=Math.min(n,i),o=Math.max(n,i),c=a-u,d=a+u):(u=r/2,l=n-u,o=n+u,c=Math.min(a,i),d=Math.max(a,i)),{left:l,top:c,right:o,bottom:d}}function zn(e,t,n,a){return e?0:Ct(t,n,a)}function yk(e,t,n){const a=e.options.borderWidth,i=e.borderSkipped,r=$m(a);return{t:zn(i.top,r.top,0,n),r:zn(i.right,r.right,0,t),b:zn(i.bottom,r.bottom,0,n),l:zn(i.left,r.left,0,t)}}function vk(e,t,n){const{enableBorderRadius:a}=e.getProps(["enableBorderRadius"]),i=e.options.borderRadius,r=ma(i),s=Math.min(t,n),l=e.borderSkipped,o=a||X(i);return{topLeft:zn(!o||l.top||l.left,r.topLeft,0,s),topRight:zn(!o||l.top||l.right,r.topRight,0,s),bottomLeft:zn(!o||l.bottom||l.left,r.bottomLeft,0,s),bottomRight:zn(!o||l.bottom||l.right,r.bottomRight,0,s)}}function xk(e){const t=Ab(e),n=t.right-t.left,a=t.bottom-t.top,i=yk(e,n/2,a/2),r=vk(e,n/2,a/2);return{outer:{x:t.left,y:t.top,w:n,h:a,radius:r},inner:{x:t.left+i.l,y:t.top+i.t,w:n-i.l-i.r,h:a-i.t-i.b,radius:{topLeft:Math.max(0,r.topLeft-Math.max(i.t,i.l)),topRight:Math.max(0,r.topRight-Math.max(i.t,i.r)),bottomLeft:Math.max(0,r.bottomLeft-Math.max(i.b,i.l)),bottomRight:Math.max(0,r.bottomRight-Math.max(i.b,i.r))}}}}function tc(e,t,n,a){const i=t===null,r=n===null,l=e&&!(i&&r)&&Ab(e,a);return l&&(i||an(t,l.left,l.right))&&(r||an(n,l.top,l.bottom))}function _k(e){return e.topLeft||e.topRight||e.bottomLeft||e.bottomRight}function kk(e,t){e.rect(t.x,t.y,t.w,t.h)}function ec(e,t,n={}){const a=e.x!==n.x?-t:0,i=e.y!==n.y?-t:0,r=(e.x+e.w!==n.x+n.w?t:0)-a,s=(e.y+e.h!==n.y+n.h?t:0)-i;return{x:e.x+a,y:e.y+i,w:e.w+r,h:e.h+s,radius:e.radius}}class Ws extends De{constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:n,options:{borderColor:a,backgroundColor:i}}=this,{inner:r,outer:s}=xk(this),l=_k(s.radius)?Lr:kk;t.save(),(s.w!==r.w||s.h!==r.h)&&(t.beginPath(),l(t,ec(s,n,r)),t.clip(),l(t,ec(r,-n,s)),t.fillStyle=a,t.fill("evenodd")),t.beginPath(),l(t,ec(r,n)),t.fillStyle=i,t.fill(),t.restore()}inRange(t,n,a){return tc(this,t,n,a)}inXRange(t,n){return tc(this,t,null,n)}inYRange(t,n){return tc(this,null,t,n)}getCenterPoint(t){const{x:n,y:a,base:i,horizontal:r}=this.getProps(["x","y","base","horizontal"],t);return{x:r?(n+i)/2:n,y:r?a:(a+i)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}D(Ws,"id","bar"),D(Ws,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),D(Ws,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});var Sk=Object.freeze({__proto__:null,ArcElement:Ki,BarElement:Ws,LineElement:En,PointElement:Ps});const dd=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],c0=dd.map(e=>e.replace("rgb(","rgba(").replace(")",", 0.5)"));function Tb(e){return dd[e%dd.length]}function Db(e){return c0[e%c0.length]}function wk(e,t){return e.borderColor=Tb(t),e.backgroundColor=Db(t),++t}function Mk(e,t){return e.backgroundColor=e.data.map(()=>Tb(t++)),t}function Ak(e,t){return e.backgroundColor=e.data.map(()=>Db(t++)),t}function Tk(e){let t=0;return(n,a)=>{const i=e.getDatasetMeta(a).controller;i instanceof da?t=Mk(n,t):i instanceof gr?t=Ak(n,t):i&&(t=wk(n,t))}}function d0(e){let t;for(t in e)if(e[t].borderColor||e[t].backgroundColor)return!0;return!1}function Dk(e){return e&&(e.borderColor||e.backgroundColor)}function Ck(){return ft.borderColor!=="rgba(0,0,0,0.1)"||ft.backgroundColor!=="rgba(0,0,0,0.1)"}var Ok={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(e,t,n){if(!n.enabled)return;const{data:{datasets:a},options:i}=e.config,{elements:r}=i,s=d0(a)||Dk(i)||r&&d0(r)||Ck();if(!n.forceOverride&&s)return;const l=Tk(e);a.forEach(l)}};function Ek(e,t,n,a,i){const r=i.samples||a;if(r>=n)return e.slice(t,t+n);const s=[],l=(n-2)/(r-2);let o=0;const c=t+n-1;let d=t,u,f,h,m,b;for(s[o++]=e[d],u=0;u<r-2;u++){let v=0,p=0,g;const y=Math.floor((u+1)*l)+1+t,x=Math.min(Math.floor((u+2)*l)+1,n)+t,_=x-y;for(g=y;g<x;g++)v+=e[g].x,p+=e[g].y;v/=_,p/=_;const w=Math.floor(u*l)+1+t,k=Math.min(Math.floor((u+1)*l)+1,n)+t,{x:S,y:A}=e[d];for(h=m=-1,g=w;g<k;g++)m=.5*Math.abs((S-v)*(e[g].y-A)-(S-e[g].x)*(p-A)),m>h&&(h=m,f=e[g],b=g);s[o++]=f,d=b}return s[o++]=e[c],s}function zk(e,t,n,a){let i=0,r=0,s,l,o,c,d,u,f,h,m,b;const v=[],p=t+n-1,g=e[t].x,x=e[p].x-g;for(s=t;s<t+n;++s){l=e[s],o=(l.x-g)/x*a,c=l.y;const _=o|0;if(_===d)c<m?(m=c,u=s):c>b&&(b=c,f=s),i=(r*i+l.x)/++r;else{const w=s-1;if(!G(u)&&!G(f)){const k=Math.min(u,f),S=Math.max(u,f);k!==h&&k!==w&&v.push({...e[k],x:i}),S!==h&&S!==w&&v.push({...e[S],x:i})}s>0&&w!==h&&v.push(e[w]),v.push(l),d=_,r=0,m=b=c,u=f=h=s}}return v}function Cb(e){if(e._decimated){const t=e._data;delete e._decimated,delete e._data,Object.defineProperty(e,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function u0(e){e.data.datasets.forEach(t=>{Cb(t)})}function Rk(e,t){const n=t.length;let a=0,i;const{iScale:r}=e,{min:s,max:l,minDefined:o,maxDefined:c}=r.getUserBounds();return o&&(a=Ct(rn(t,r.axis,s).lo,0,n-1)),c?i=Ct(rn(t,r.axis,l).hi+1,a,n)-a:i=n-a,{start:a,count:i}}var Lk={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(e,t,n)=>{if(!n.enabled){u0(e);return}const a=e.width;e.data.datasets.forEach((i,r)=>{const{_data:s,indexAxis:l}=i,o=e.getDatasetMeta(r),c=s||i.data;if(Qi([l,e.options.indexAxis])==="y"||!o.controller.supportsDecimation)return;const d=e.scales[o.xAxisID];if(d.type!=="linear"&&d.type!=="time"||e.options.parsing)return;let{start:u,count:f}=Rk(o,c);const h=n.threshold||4*a;if(f<=h){Cb(i);return}G(s)&&(i._data=c,delete i.data,Object.defineProperty(i,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(b){this._data=b}}));let m;switch(n.algorithm){case"lttb":m=Ek(c,u,f,a,n);break;case"min-max":m=zk(c,u,f,a);break;default:throw new Error(`Unsupported decimation algorithm '${n.algorithm}'`)}i._decimated=m})},destroy(e){u0(e)}};function Bk(e,t,n){const a=e.segments,i=e.points,r=t.points,s=[];for(const l of a){let{start:o,end:c}=l;c=io(o,c,i);const d=ud(n,i[o],i[c],l.loop);if(!t.segments){s.push({source:l,target:d,start:i[o],end:i[c]});continue}const u=db(t,d);for(const f of u){const h=ud(n,r[f.start],r[f.end],f.loop),m=cb(l,i,h);for(const b of m)s.push({source:b,target:f,start:{[n]:f0(d,h,"start",Math.max)},end:{[n]:f0(d,h,"end",Math.min)}})}}return s}function ud(e,t,n,a){if(a)return;let i=t[e],r=n[e];return e==="angle"&&(i=Ht(i),r=Ht(r)),{property:e,start:i,end:r}}function Nk(e,t){const{x:n=null,y:a=null}=e||{},i=t.points,r=[];return t.segments.forEach(({start:s,end:l})=>{l=io(s,l,i);const o=i[s],c=i[l];a!==null?(r.push({x:o.x,y:a}),r.push({x:c.x,y:a})):n!==null&&(r.push({x:n,y:o.y}),r.push({x:n,y:c.y}))}),r}function io(e,t,n){for(;t>e;t--){const a=n[t];if(!isNaN(a.x)&&!isNaN(a.y))break}return t}function f0(e,t,n,a){return e&&t?a(e[n],t[n]):e?e[n]:t?t[n]:0}function Ob(e,t){let n=[],a=!1;return ut(e)?(a=!0,n=e):n=Nk(e,t),n.length?new En({points:n,options:{tension:0},_loop:a,_fullLoop:a}):null}function h0(e){return e&&e.fill!==!1}function jk(e,t,n){let i=e[t].fill;const r=[t];let s;if(!n)return i;for(;i!==!1&&r.indexOf(i)===-1;){if(!gt(i))return i;if(s=e[i],!s)return!1;if(s.visible)return i;r.push(i),i=s.fill}return!1}function Hk(e,t,n){const a=Gk(e);if(X(a))return isNaN(a.value)?!1:a;let i=parseFloat(a);return gt(i)&&Math.floor(i)===i?Uk(a[0],t,i,n):["origin","start","end","stack","shape"].indexOf(a)>=0&&a}function Uk(e,t,n,a){return(e==="-"||e==="+")&&(n=t+n),n===t||n<0||n>=a?!1:n}function Vk(e,t){let n=null;return e==="start"?n=t.bottom:e==="end"?n=t.top:X(e)?n=t.getPixelForValue(e.value):t.getBasePixel&&(n=t.getBasePixel()),n}function Yk(e,t,n){let a;return e==="start"?a=n:e==="end"?a=t.options.reverse?t.min:t.max:X(e)?a=e.value:a=t.getBaseValue(),a}function Gk(e){const t=e.options,n=t.fill;let a=B(n&&n.target,n);return a===void 0&&(a=!!t.backgroundColor),a===!1||a===null?!1:a===!0?"origin":a}function qk(e){const{scale:t,index:n,line:a}=e,i=[],r=a.segments,s=a.points,l=Xk(t,n);l.push(Ob({x:null,y:t.bottom},a));for(let o=0;o<r.length;o++){const c=r[o];for(let d=c.start;d<=c.end;d++)Fk(i,s[d],l)}return new En({points:i,options:{}})}function Xk(e,t){const n=[],a=e.getMatchingVisibleMetas("line");for(let i=0;i<a.length;i++){const r=a[i];if(r.index===t)break;r.hidden||n.unshift(r.dataset)}return n}function Fk(e,t,n){const a=[];for(let i=0;i<n.length;i++){const r=n[i],{first:s,last:l,point:o}=Qk(r,t,"x");if(!(!o||s&&l)){if(s)a.unshift(o);else if(e.push(o),!l)break}}e.push(...a)}function Qk(e,t,n){const a=e.interpolate(t,n);if(!a)return{};const i=a[n],r=e.segments,s=e.points;let l=!1,o=!1;for(let c=0;c<r.length;c++){const d=r[c],u=s[d.start][n],f=s[d.end][n];if(an(i,u,f)){l=i===u,o=i===f;break}}return{first:l,last:o,point:a}}class Eb{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,n,a){const{x:i,y:r,radius:s}=this;return n=n||{start:0,end:ot},t.arc(i,r,s,n.end,n.start,!0),!a.bounds}interpolate(t){const{x:n,y:a,radius:i}=this,r=t.angle;return{x:n+Math.cos(r)*i,y:a+Math.sin(r)*i,angle:r}}}function Zk(e){const{chart:t,fill:n,line:a}=e;if(gt(n))return Kk(t,n);if(n==="stack")return qk(e);if(n==="shape")return!0;const i=Pk(e);return i instanceof Eb?i:Ob(i,a)}function Kk(e,t){const n=e.getDatasetMeta(t);return n&&e.isDatasetVisible(t)?n.dataset:null}function Pk(e){return(e.scale||{}).getPointPositionForValue?Jk(e):Wk(e)}function Wk(e){const{scale:t={},fill:n}=e,a=Vk(n,t);if(gt(a)){const i=t.isHorizontal();return{x:i?a:null,y:i?null:a}}return null}function Jk(e){const{scale:t,fill:n}=e,a=t.options,i=t.getLabels().length,r=a.reverse?t.max:t.min,s=Yk(n,t,r),l=[];if(a.grid.circular){const o=t.getPointPositionForValue(0,r);return new Eb({x:o.x,y:o.y,radius:t.getDistanceFromCenterForValue(s)})}for(let o=0;o<i;++o)l.push(t.getPointPositionForValue(o,s));return l}function nc(e,t,n){const a=Zk(t),{chart:i,index:r,line:s,scale:l,axis:o}=t,c=s.options,d=c.fill,u=c.backgroundColor,{above:f=u,below:h=u}=d||{},m=i.getDatasetMeta(r),b=ub(i,m);a&&s.points.length&&(to(e,n),Ik(e,{line:s,target:a,above:f,below:h,area:n,scale:l,axis:o,clip:b}),eo(e))}function Ik(e,t){const{line:n,target:a,above:i,below:r,area:s,scale:l,clip:o}=t,c=n._loop?"angle":t.axis;e.save();let d=r;r!==i&&(c==="x"?(p0(e,a,s.top),ac(e,{line:n,target:a,color:i,scale:l,property:c,clip:o}),e.restore(),e.save(),p0(e,a,s.bottom)):c==="y"&&(g0(e,a,s.left),ac(e,{line:n,target:a,color:r,scale:l,property:c,clip:o}),e.restore(),e.save(),g0(e,a,s.right),d=i)),ac(e,{line:n,target:a,color:d,scale:l,property:c,clip:o}),e.restore()}function p0(e,t,n){const{segments:a,points:i}=t;let r=!0,s=!1;e.beginPath();for(const l of a){const{start:o,end:c}=l,d=i[o],u=i[io(o,c,i)];r?(e.moveTo(d.x,d.y),r=!1):(e.lineTo(d.x,n),e.lineTo(d.x,d.y)),s=!!t.pathSegment(e,l,{move:s}),s?e.closePath():e.lineTo(u.x,n)}e.lineTo(t.first().x,n),e.closePath(),e.clip()}function g0(e,t,n){const{segments:a,points:i}=t;let r=!0,s=!1;e.beginPath();for(const l of a){const{start:o,end:c}=l,d=i[o],u=i[io(o,c,i)];r?(e.moveTo(d.x,d.y),r=!1):(e.lineTo(n,d.y),e.lineTo(d.x,d.y)),s=!!t.pathSegment(e,l,{move:s}),s?e.closePath():e.lineTo(n,u.y)}e.lineTo(n,t.first().y),e.closePath(),e.clip()}function ac(e,t){const{line:n,target:a,property:i,color:r,scale:s,clip:l}=t,o=Bk(n,a,i);for(const{source:c,target:d,start:u,end:f}of o){const{style:{backgroundColor:h=r}={}}=c,m=a!==!0;e.save(),e.fillStyle=h,$k(e,s,l,m&&ud(i,u,f)),e.beginPath();const b=!!n.pathSegment(e,c);let v;if(m){b?e.closePath():m0(e,a,f,i);const p=!!a.pathSegment(e,d,{move:b,reverse:!0});v=b&&p,v||m0(e,a,u,i)}e.closePath(),e.fill(v?"evenodd":"nonzero"),e.restore()}}function $k(e,t,n,a){const i=t.chart.chartArea,{property:r,start:s,end:l}=a||{};if(r==="x"||r==="y"){let o,c,d,u;r==="x"?(o=s,c=i.top,d=l,u=i.bottom):(o=i.left,c=s,d=i.right,u=l),e.beginPath(),n&&(o=Math.max(o,n.left),d=Math.min(d,n.right),c=Math.max(c,n.top),u=Math.min(u,n.bottom)),e.rect(o,c,d-o,u-c),e.clip()}}function m0(e,t,n,a){const i=t.interpolate(n,a);i&&e.lineTo(i.x,i.y)}var tS={id:"filler",afterDatasetsUpdate(e,t,n){const a=(e.data.datasets||[]).length,i=[];let r,s,l,o;for(s=0;s<a;++s)r=e.getDatasetMeta(s),l=r.dataset,o=null,l&&l.options&&l instanceof En&&(o={visible:e.isDatasetVisible(s),index:s,fill:Hk(l,s,a),chart:e,axis:r.controller.options.indexAxis,scale:r.vScale,line:l}),r.$filler=o,i.push(o);for(s=0;s<a;++s)o=i[s],!(!o||o.fill===!1)&&(o.fill=jk(i,s,n.propagate))},beforeDraw(e,t,n){const a=n.drawTime==="beforeDraw",i=e.getSortedVisibleDatasetMetas(),r=e.chartArea;for(let s=i.length-1;s>=0;--s){const l=i[s].$filler;l&&(l.line.updateControlPoints(r,l.axis),a&&l.fill&&nc(e.ctx,l,r))}},beforeDatasetsDraw(e,t,n){if(n.drawTime!=="beforeDatasetsDraw")return;const a=e.getSortedVisibleDatasetMetas();for(let i=a.length-1;i>=0;--i){const r=a[i].$filler;h0(r)&&nc(e.ctx,r,e.chartArea)}},beforeDatasetDraw(e,t,n){const a=t.meta.$filler;!h0(a)||n.drawTime!=="beforeDatasetDraw"||nc(e.ctx,a,e.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const b0=(e,t)=>{let{boxHeight:n=t,boxWidth:a=t}=e;return e.usePointStyle&&(n=Math.min(n,t),a=e.pointStyleWidth||Math.min(a,t)),{boxWidth:a,boxHeight:n,itemHeight:Math.max(t,n)}},eS=(e,t)=>e!==null&&t!==null&&e.datasetIndex===t.datasetIndex&&e.index===t.index;class y0 extends De{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n,a){this.maxWidth=t,this.maxHeight=n,this._margins=a,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let n=nt(t.generateLabels,[this.chart],this)||[];t.filter&&(n=n.filter(a=>t.filter(a,this.chart.data))),t.sort&&(n=n.sort((a,i)=>t.sort(a,i,this.chart.data))),this.options.reverse&&n.reverse(),this.legendItems=n}fit(){const{options:t,ctx:n}=this;if(!t.display){this.width=this.height=0;return}const a=t.labels,i=Mt(a.font),r=i.size,s=this._computeTitleHeight(),{boxWidth:l,itemHeight:o}=b0(a,r);let c,d;n.font=i.string,this.isHorizontal()?(c=this.maxWidth,d=this._fitRows(s,r,l,o)+10):(d=this.maxHeight,c=this._fitCols(s,i,l,o)+10),this.width=Math.min(c,t.maxWidth||this.maxWidth),this.height=Math.min(d,t.maxHeight||this.maxHeight)}_fitRows(t,n,a,i){const{ctx:r,maxWidth:s,options:{labels:{padding:l}}}=this,o=this.legendHitBoxes=[],c=this.lineWidths=[0],d=i+l;let u=t;r.textAlign="left",r.textBaseline="middle";let f=-1,h=-d;return this.legendItems.forEach((m,b)=>{const v=a+n/2+r.measureText(m.text).width;(b===0||c[c.length-1]+v+2*l>s)&&(u+=d,c[c.length-(b>0?0:1)]=0,h+=d,f++),o[b]={left:0,top:h,row:f,width:v,height:i},c[c.length-1]+=v+l}),u}_fitCols(t,n,a,i){const{ctx:r,maxHeight:s,options:{labels:{padding:l}}}=this,o=this.legendHitBoxes=[],c=this.columnSizes=[],d=s-t;let u=l,f=0,h=0,m=0,b=0;return this.legendItems.forEach((v,p)=>{const{itemWidth:g,itemHeight:y}=nS(a,n,r,v,i);p>0&&h+y+2*l>d&&(u+=f+l,c.push({width:f,height:h}),m+=f+l,b++,f=h=0),o[p]={left:m,top:h,col:b,width:g,height:y},f=Math.max(f,g),h+=y+l}),u+=f,c.push({width:f,height:h}),u}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:n,options:{align:a,labels:{padding:i},rtl:r}}=this,s=ii(r,this.left,this.width);if(this.isHorizontal()){let l=0,o=Nt(a,this.left+i,this.right-this.lineWidths[l]);for(const c of n)l!==c.row&&(l=c.row,o=Nt(a,this.left+i,this.right-this.lineWidths[l])),c.top+=this.top+t+i,c.left=s.leftForLtr(s.x(o),c.width),o+=c.width+i}else{let l=0,o=Nt(a,this.top+t+i,this.bottom-this.columnSizes[l].height);for(const c of n)c.col!==l&&(l=c.col,o=Nt(a,this.top+t+i,this.bottom-this.columnSizes[l].height)),c.top=o,c.left+=this.left+i,c.left=s.leftForLtr(s.x(c.left),c.width),o+=c.height+i}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;to(t,this),this._draw(),eo(t)}}_draw(){const{options:t,columnSizes:n,lineWidths:a,ctx:i}=this,{align:r,labels:s}=t,l=ft.color,o=ii(t.rtl,this.left,this.width),c=Mt(s.font),{padding:d}=s,u=c.size,f=u/2;let h;this.drawTitle(),i.textAlign=o.textAlign("left"),i.textBaseline="middle",i.lineWidth=.5,i.font=c.string;const{boxWidth:m,boxHeight:b,itemHeight:v}=b0(s,u),p=function(w,k,S){if(isNaN(m)||m<=0||isNaN(b)||b<0)return;i.save();const A=B(S.lineWidth,1);if(i.fillStyle=B(S.fillStyle,l),i.lineCap=B(S.lineCap,"butt"),i.lineDashOffset=B(S.lineDashOffset,0),i.lineJoin=B(S.lineJoin,"miter"),i.lineWidth=A,i.strokeStyle=B(S.strokeStyle,l),i.setLineDash(B(S.lineDash,[])),s.usePointStyle){const C={radius:b*Math.SQRT2/2,pointStyle:S.pointStyle,rotation:S.rotation,borderWidth:A},z=o.xPlus(w,m/2),N=k+f;Im(i,C,z,N,s.pointStyleWidth&&m)}else{const C=k+Math.max((u-b)/2,0),z=o.leftForLtr(w,m),N=ma(S.borderRadius);i.beginPath(),Object.values(N).some(vt=>vt!==0)?Lr(i,{x:z,y:C,w:m,h:b,radius:N}):i.rect(z,C,m,b),i.fill(),A!==0&&i.stroke()}i.restore()},g=function(w,k,S){wa(i,S.text,w,k+v/2,c,{strikethrough:S.hidden,textAlign:o.textAlign(S.textAlign)})},y=this.isHorizontal(),x=this._computeTitleHeight();y?h={x:Nt(r,this.left+d,this.right-a[0]),y:this.top+d+x,line:0}:h={x:this.left+d,y:Nt(r,this.top+x+d,this.bottom-n[0].height),line:0},sb(this.ctx,t.textDirection);const _=v+d;this.legendItems.forEach((w,k)=>{i.strokeStyle=w.fontColor,i.fillStyle=w.fontColor;const S=i.measureText(w.text).width,A=o.textAlign(w.textAlign||(w.textAlign=s.textAlign)),C=m+f+S;let z=h.x,N=h.y;o.setWidth(this.width),y?k>0&&z+C+d>this.right&&(N=h.y+=_,h.line++,z=h.x=Nt(r,this.left+d,this.right-a[h.line])):k>0&&N+_>this.bottom&&(z=h.x=z+n[h.line].width+d,h.line++,N=h.y=Nt(r,this.top+x+d,this.bottom-n[h.line].height));const vt=o.x(z);if(p(vt,N,w),z=__(A,z+m+f,y?z+C:this.right,t.rtl),g(o.x(z),N,w),y)h.x+=C+d;else if(typeof w.text!="string"){const Yt=c.lineHeight;h.y+=zb(w,Yt)+d}else h.y+=_}),lb(this.ctx,t.textDirection)}drawTitle(){const t=this.options,n=t.title,a=Mt(n.font),i=Vt(n.padding);if(!n.display)return;const r=ii(t.rtl,this.left,this.width),s=this.ctx,l=n.position,o=a.size/2,c=i.top+o;let d,u=this.left,f=this.width;if(this.isHorizontal())f=Math.max(...this.lineWidths),d=this.top+c,u=Nt(t.align,u,this.right-f);else{const m=this.columnSizes.reduce((b,v)=>Math.max(b,v.height),0);d=c+Nt(t.align,this.top,this.bottom-m-t.labels.padding-this._computeTitleHeight())}const h=Nt(l,u,u+f);s.textAlign=r.textAlign(Au(l)),s.textBaseline="middle",s.strokeStyle=n.color,s.fillStyle=n.color,s.font=a.string,wa(s,n.text,h,d,a)}_computeTitleHeight(){const t=this.options.title,n=Mt(t.font),a=Vt(t.padding);return t.display?n.lineHeight+a.height:0}_getLegendItemAt(t,n){let a,i,r;if(an(t,this.left,this.right)&&an(n,this.top,this.bottom)){for(r=this.legendHitBoxes,a=0;a<r.length;++a)if(i=r[a],an(t,i.left,i.left+i.width)&&an(n,i.top,i.top+i.height))return this.legendItems[a]}return null}handleEvent(t){const n=this.options;if(!rS(t.type,n))return;const a=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const i=this._hoveredItem,r=eS(i,a);i&&!r&&nt(n.onLeave,[t,i,this],this),this._hoveredItem=a,a&&!r&&nt(n.onHover,[t,a,this],this)}else a&&nt(n.onClick,[t,a,this],this)}}function nS(e,t,n,a,i){const r=aS(a,e,t,n),s=iS(i,a,t.lineHeight);return{itemWidth:r,itemHeight:s}}function aS(e,t,n,a){let i=e.text;return i&&typeof i!="string"&&(i=i.reduce((r,s)=>r.length>s.length?r:s)),t+n.size/2+a.measureText(i).width}function iS(e,t,n){let a=e;return typeof t.text!="string"&&(a=zb(t,n)),a}function zb(e,t){const n=e.text?e.text.length:0;return t*n}function rS(e,t){return!!((e==="mousemove"||e==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(e==="click"||e==="mouseup"))}var sS={id:"legend",_element:y0,start(e,t,n){const a=e.legend=new y0({ctx:e.ctx,options:n,chart:e});Ut.configure(e,a,n),Ut.addBox(e,a)},stop(e){Ut.removeBox(e,e.legend),delete e.legend},beforeUpdate(e,t,n){const a=e.legend;Ut.configure(e,a,n),a.options=n},afterUpdate(e){const t=e.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(e,t){t.replay||e.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(e,t,n){const a=t.datasetIndex,i=n.chart;i.isDatasetVisible(a)?(i.hide(a),t.hidden=!0):(i.show(a),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:e=>e.chart.options.color,boxWidth:40,padding:10,generateLabels(e){const t=e.data.datasets,{labels:{usePointStyle:n,pointStyle:a,textAlign:i,color:r,useBorderRadius:s,borderRadius:l}}=e.legend.options;return e._getSortedDatasetMetas().map(o=>{const c=o.controller.getStyle(n?0:void 0),d=Vt(c.borderWidth);return{text:t[o.index].label,fillStyle:c.backgroundColor,fontColor:r,hidden:!o.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(d.width+d.height)/4,strokeStyle:c.borderColor,pointStyle:a||c.pointStyle,rotation:c.rotation,textAlign:i||c.textAlign,borderRadius:s&&(l||c.borderRadius),datasetIndex:o.index}},this)}},title:{color:e=>e.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:e=>!e.startsWith("on"),labels:{_scriptable:e=>!["generateLabels","filter","sort"].includes(e)}}};class Bu extends De{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,n){const a=this.options;if(this.left=0,this.top=0,!a.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=n;const i=ut(a.text)?a.text.length:1;this._padding=Vt(a.padding);const r=i*Mt(a.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=r:this.width=r}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:n,left:a,bottom:i,right:r,options:s}=this,l=s.align;let o=0,c,d,u;return this.isHorizontal()?(d=Nt(l,a,r),u=n+t,c=r-a):(s.position==="left"?(d=a+t,u=Nt(l,i,n),o=Z*-.5):(d=r-t,u=Nt(l,n,i),o=Z*.5),c=i-n),{titleX:d,titleY:u,maxWidth:c,rotation:o}}draw(){const t=this.ctx,n=this.options;if(!n.display)return;const a=Mt(n.font),r=a.lineHeight/2+this._padding.top,{titleX:s,titleY:l,maxWidth:o,rotation:c}=this._drawArgs(r);wa(t,n.text,0,0,a,{color:n.color,maxWidth:o,rotation:c,textAlign:Au(n.align),textBaseline:"middle",translation:[s,l]})}}function lS(e,t){const n=new Bu({ctx:e.ctx,options:t,chart:e});Ut.configure(e,n,t),Ut.addBox(e,n),e.titleBlock=n}var oS={id:"title",_element:Bu,start(e,t,n){lS(e,n)},stop(e){const t=e.titleBlock;Ut.removeBox(e,t),delete e.titleBlock},beforeUpdate(e,t,n){const a=e.titleBlock;Ut.configure(e,a,n),a.options=n},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const ws=new WeakMap;var cS={id:"subtitle",start(e,t,n){const a=new Bu({ctx:e.ctx,options:n,chart:e});Ut.configure(e,a,n),Ut.addBox(e,a),ws.set(e,a)},stop(e){Ut.removeBox(e,ws.get(e)),ws.delete(e)},beforeUpdate(e,t,n){const a=ws.get(e);Ut.configure(e,a,n),a.options=n},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Pi={average(e){if(!e.length)return!1;let t,n,a=new Set,i=0,r=0;for(t=0,n=e.length;t<n;++t){const l=e[t].element;if(l&&l.hasValue()){const o=l.tooltipPosition();a.add(o.x),i+=o.y,++r}}return r===0||a.size===0?!1:{x:[...a].reduce((l,o)=>l+o)/a.size,y:i/r}},nearest(e,t){if(!e.length)return!1;let n=t.x,a=t.y,i=Number.POSITIVE_INFINITY,r,s,l;for(r=0,s=e.length;r<s;++r){const o=e[r].element;if(o&&o.hasValue()){const c=o.getCenterPoint(),d=ad(t,c);d<i&&(i=d,l=o)}}if(l){const o=l.tooltipPosition();n=o.x,a=o.y}return{x:n,y:a}}};function Ee(e,t){return t&&(ut(t)?Array.prototype.push.apply(e,t):e.push(t)),e}function Pe(e){return(typeof e=="string"||e instanceof String)&&e.indexOf(`
`)>-1?e.split(`
`):e}function dS(e,t){const{element:n,datasetIndex:a,index:i}=t,r=e.getDatasetMeta(a).controller,{label:s,value:l}=r.getLabelAndValue(i);return{chart:e,label:s,parsed:r.getParsed(i),raw:e.data.datasets[a].data[i],formattedValue:l,dataset:r.getDataset(),dataIndex:i,datasetIndex:a,element:n}}function v0(e,t){const n=e.chart.ctx,{body:a,footer:i,title:r}=e,{boxWidth:s,boxHeight:l}=t,o=Mt(t.bodyFont),c=Mt(t.titleFont),d=Mt(t.footerFont),u=r.length,f=i.length,h=a.length,m=Vt(t.padding);let b=m.height,v=0,p=a.reduce((x,_)=>x+_.before.length+_.lines.length+_.after.length,0);if(p+=e.beforeBody.length+e.afterBody.length,u&&(b+=u*c.lineHeight+(u-1)*t.titleSpacing+t.titleMarginBottom),p){const x=t.displayColors?Math.max(l,o.lineHeight):o.lineHeight;b+=h*x+(p-h)*o.lineHeight+(p-1)*t.bodySpacing}f&&(b+=t.footerMarginTop+f*d.lineHeight+(f-1)*t.footerSpacing);let g=0;const y=function(x){v=Math.max(v,n.measureText(x).width+g)};return n.save(),n.font=c.string,J(e.title,y),n.font=o.string,J(e.beforeBody.concat(e.afterBody),y),g=t.displayColors?s+2+t.boxPadding:0,J(a,x=>{J(x.before,y),J(x.lines,y),J(x.after,y)}),g=0,n.font=d.string,J(e.footer,y),n.restore(),v+=m.width,{width:v,height:b}}function uS(e,t){const{y:n,height:a}=t;return n<a/2?"top":n>e.height-a/2?"bottom":"center"}function fS(e,t,n,a){const{x:i,width:r}=a,s=n.caretSize+n.caretPadding;if(e==="left"&&i+r+s>t.width||e==="right"&&i-r-s<0)return!0}function hS(e,t,n,a){const{x:i,width:r}=n,{width:s,chartArea:{left:l,right:o}}=e;let c="center";return a==="center"?c=i<=(l+o)/2?"left":"right":i<=r/2?c="left":i>=s-r/2&&(c="right"),fS(c,e,t,n)&&(c="center"),c}function x0(e,t,n){const a=n.yAlign||t.yAlign||uS(e,n);return{xAlign:n.xAlign||t.xAlign||hS(e,t,n,a),yAlign:a}}function pS(e,t){let{x:n,width:a}=e;return t==="right"?n-=a:t==="center"&&(n-=a/2),n}function gS(e,t,n){let{y:a,height:i}=e;return t==="top"?a+=n:t==="bottom"?a-=i+n:a-=i/2,a}function _0(e,t,n,a){const{caretSize:i,caretPadding:r,cornerRadius:s}=e,{xAlign:l,yAlign:o}=n,c=i+r,{topLeft:d,topRight:u,bottomLeft:f,bottomRight:h}=ma(s);let m=pS(t,l);const b=gS(t,o,c);return o==="center"?l==="left"?m+=c:l==="right"&&(m-=c):l==="left"?m-=Math.max(d,f)+i:l==="right"&&(m+=Math.max(u,h)+i),{x:Ct(m,0,a.width-t.width),y:Ct(b,0,a.height-t.height)}}function Ms(e,t,n){const a=Vt(n.padding);return t==="center"?e.x+e.width/2:t==="right"?e.x+e.width-a.right:e.x+a.left}function k0(e){return Ee([],Pe(e))}function mS(e,t,n){return Jn(e,{tooltip:t,tooltipItems:n,type:"tooltip"})}function S0(e,t){const n=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return n?e.override(n):e}const Rb={beforeTitle:Qe,title(e){if(e.length>0){const t=e[0],n=t.chart.data.labels,a=n?n.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(a>0&&t.dataIndex<a)return n[t.dataIndex]}return""},afterTitle:Qe,beforeBody:Qe,beforeLabel:Qe,label(e){if(this&&this.options&&this.options.mode==="dataset")return e.label+": "+e.formattedValue||e.formattedValue;let t=e.dataset.label||"";t&&(t+=": ");const n=e.formattedValue;return G(n)||(t+=n),t},labelColor(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{borderColor:n.borderColor,backgroundColor:n.backgroundColor,borderWidth:n.borderWidth,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(e){const n=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{pointStyle:n.pointStyle,rotation:n.rotation}},afterLabel:Qe,afterBody:Qe,beforeFooter:Qe,footer:Qe,afterFooter:Qe};function Kt(e,t,n,a){const i=e[t].call(n,a);return typeof i>"u"?Rb[t].call(n,a):i}class fd extends De{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const n=this.chart,a=this.options.setContext(this.getContext()),i=a.enabled&&n.options.animation&&a.animations,r=new fb(this.chart,i);return i._cacheable&&(this._cachedAnimations=Object.freeze(r)),r}getContext(){return this.$context||(this.$context=mS(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,n){const{callbacks:a}=n,i=Kt(a,"beforeTitle",this,t),r=Kt(a,"title",this,t),s=Kt(a,"afterTitle",this,t);let l=[];return l=Ee(l,Pe(i)),l=Ee(l,Pe(r)),l=Ee(l,Pe(s)),l}getBeforeBody(t,n){return k0(Kt(n.callbacks,"beforeBody",this,t))}getBody(t,n){const{callbacks:a}=n,i=[];return J(t,r=>{const s={before:[],lines:[],after:[]},l=S0(a,r);Ee(s.before,Pe(Kt(l,"beforeLabel",this,r))),Ee(s.lines,Kt(l,"label",this,r)),Ee(s.after,Pe(Kt(l,"afterLabel",this,r))),i.push(s)}),i}getAfterBody(t,n){return k0(Kt(n.callbacks,"afterBody",this,t))}getFooter(t,n){const{callbacks:a}=n,i=Kt(a,"beforeFooter",this,t),r=Kt(a,"footer",this,t),s=Kt(a,"afterFooter",this,t);let l=[];return l=Ee(l,Pe(i)),l=Ee(l,Pe(r)),l=Ee(l,Pe(s)),l}_createItems(t){const n=this._active,a=this.chart.data,i=[],r=[],s=[];let l=[],o,c;for(o=0,c=n.length;o<c;++o)l.push(dS(this.chart,n[o]));return t.filter&&(l=l.filter((d,u,f)=>t.filter(d,u,f,a))),t.itemSort&&(l=l.sort((d,u)=>t.itemSort(d,u,a))),J(l,d=>{const u=S0(t.callbacks,d);i.push(Kt(u,"labelColor",this,d)),r.push(Kt(u,"labelPointStyle",this,d)),s.push(Kt(u,"labelTextColor",this,d))}),this.labelColors=i,this.labelPointStyles=r,this.labelTextColors=s,this.dataPoints=l,l}update(t,n){const a=this.options.setContext(this.getContext()),i=this._active;let r,s=[];if(!i.length)this.opacity!==0&&(r={opacity:0});else{const l=Pi[a.position].call(this,i,this._eventPosition);s=this._createItems(a),this.title=this.getTitle(s,a),this.beforeBody=this.getBeforeBody(s,a),this.body=this.getBody(s,a),this.afterBody=this.getAfterBody(s,a),this.footer=this.getFooter(s,a);const o=this._size=v0(this,a),c=Object.assign({},l,o),d=x0(this.chart,a,c),u=_0(a,c,d,this.chart);this.xAlign=d.xAlign,this.yAlign=d.yAlign,r={opacity:1,x:u.x,y:u.y,width:o.width,height:o.height,caretX:l.x,caretY:l.y}}this._tooltipItems=s,this.$context=void 0,r&&this._resolveAnimations().update(this,r),t&&a.external&&a.external.call(this,{chart:this.chart,tooltip:this,replay:n})}drawCaret(t,n,a,i){const r=this.getCaretPosition(t,a,i);n.lineTo(r.x1,r.y1),n.lineTo(r.x2,r.y2),n.lineTo(r.x3,r.y3)}getCaretPosition(t,n,a){const{xAlign:i,yAlign:r}=this,{caretSize:s,cornerRadius:l}=a,{topLeft:o,topRight:c,bottomLeft:d,bottomRight:u}=ma(l),{x:f,y:h}=t,{width:m,height:b}=n;let v,p,g,y,x,_;return r==="center"?(x=h+b/2,i==="left"?(v=f,p=v-s,y=x+s,_=x-s):(v=f+m,p=v+s,y=x-s,_=x+s),g=v):(i==="left"?p=f+Math.max(o,d)+s:i==="right"?p=f+m-Math.max(c,u)-s:p=this.caretX,r==="top"?(y=h,x=y-s,v=p-s,g=p+s):(y=h+b,x=y+s,v=p+s,g=p-s),_=y),{x1:v,x2:p,x3:g,y1:y,y2:x,y3:_}}drawTitle(t,n,a){const i=this.title,r=i.length;let s,l,o;if(r){const c=ii(a.rtl,this.x,this.width);for(t.x=Ms(this,a.titleAlign,a),n.textAlign=c.textAlign(a.titleAlign),n.textBaseline="middle",s=Mt(a.titleFont),l=a.titleSpacing,n.fillStyle=a.titleColor,n.font=s.string,o=0;o<r;++o)n.fillText(i[o],c.x(t.x),t.y+s.lineHeight/2),t.y+=s.lineHeight+l,o+1===r&&(t.y+=a.titleMarginBottom-l)}}_drawColorBox(t,n,a,i,r){const s=this.labelColors[a],l=this.labelPointStyles[a],{boxHeight:o,boxWidth:c}=r,d=Mt(r.bodyFont),u=Ms(this,"left",r),f=i.x(u),h=o<d.lineHeight?(d.lineHeight-o)/2:0,m=n.y+h;if(r.usePointStyle){const b={radius:Math.min(c,o)/2,pointStyle:l.pointStyle,rotation:l.rotation,borderWidth:1},v=i.leftForLtr(f,c)+c/2,p=m+o/2;t.strokeStyle=r.multiKeyBackground,t.fillStyle=r.multiKeyBackground,rd(t,b,v,p),t.strokeStyle=s.borderColor,t.fillStyle=s.backgroundColor,rd(t,b,v,p)}else{t.lineWidth=X(s.borderWidth)?Math.max(...Object.values(s.borderWidth)):s.borderWidth||1,t.strokeStyle=s.borderColor,t.setLineDash(s.borderDash||[]),t.lineDashOffset=s.borderDashOffset||0;const b=i.leftForLtr(f,c),v=i.leftForLtr(i.xPlus(f,1),c-2),p=ma(s.borderRadius);Object.values(p).some(g=>g!==0)?(t.beginPath(),t.fillStyle=r.multiKeyBackground,Lr(t,{x:b,y:m,w:c,h:o,radius:p}),t.fill(),t.stroke(),t.fillStyle=s.backgroundColor,t.beginPath(),Lr(t,{x:v,y:m+1,w:c-2,h:o-2,radius:p}),t.fill()):(t.fillStyle=r.multiKeyBackground,t.fillRect(b,m,c,o),t.strokeRect(b,m,c,o),t.fillStyle=s.backgroundColor,t.fillRect(v,m+1,c-2,o-2))}t.fillStyle=this.labelTextColors[a]}drawBody(t,n,a){const{body:i}=this,{bodySpacing:r,bodyAlign:s,displayColors:l,boxHeight:o,boxWidth:c,boxPadding:d}=a,u=Mt(a.bodyFont);let f=u.lineHeight,h=0;const m=ii(a.rtl,this.x,this.width),b=function(S){n.fillText(S,m.x(t.x+h),t.y+f/2),t.y+=f+r},v=m.textAlign(s);let p,g,y,x,_,w,k;for(n.textAlign=s,n.textBaseline="middle",n.font=u.string,t.x=Ms(this,v,a),n.fillStyle=a.bodyColor,J(this.beforeBody,b),h=l&&v!=="right"?s==="center"?c/2+d:c+2+d:0,x=0,w=i.length;x<w;++x){for(p=i[x],g=this.labelTextColors[x],n.fillStyle=g,J(p.before,b),y=p.lines,l&&y.length&&(this._drawColorBox(n,t,x,m,a),f=Math.max(u.lineHeight,o)),_=0,k=y.length;_<k;++_)b(y[_]),f=u.lineHeight;J(p.after,b)}h=0,f=u.lineHeight,J(this.afterBody,b),t.y-=r}drawFooter(t,n,a){const i=this.footer,r=i.length;let s,l;if(r){const o=ii(a.rtl,this.x,this.width);for(t.x=Ms(this,a.footerAlign,a),t.y+=a.footerMarginTop,n.textAlign=o.textAlign(a.footerAlign),n.textBaseline="middle",s=Mt(a.footerFont),n.fillStyle=a.footerColor,n.font=s.string,l=0;l<r;++l)n.fillText(i[l],o.x(t.x),t.y+s.lineHeight/2),t.y+=s.lineHeight+a.footerSpacing}}drawBackground(t,n,a,i){const{xAlign:r,yAlign:s}=this,{x:l,y:o}=t,{width:c,height:d}=a,{topLeft:u,topRight:f,bottomLeft:h,bottomRight:m}=ma(i.cornerRadius);n.fillStyle=i.backgroundColor,n.strokeStyle=i.borderColor,n.lineWidth=i.borderWidth,n.beginPath(),n.moveTo(l+u,o),s==="top"&&this.drawCaret(t,n,a,i),n.lineTo(l+c-f,o),n.quadraticCurveTo(l+c,o,l+c,o+f),s==="center"&&r==="right"&&this.drawCaret(t,n,a,i),n.lineTo(l+c,o+d-m),n.quadraticCurveTo(l+c,o+d,l+c-m,o+d),s==="bottom"&&this.drawCaret(t,n,a,i),n.lineTo(l+h,o+d),n.quadraticCurveTo(l,o+d,l,o+d-h),s==="center"&&r==="left"&&this.drawCaret(t,n,a,i),n.lineTo(l,o+u),n.quadraticCurveTo(l,o,l+u,o),n.closePath(),n.fill(),i.borderWidth>0&&n.stroke()}_updateAnimationTarget(t){const n=this.chart,a=this.$animations,i=a&&a.x,r=a&&a.y;if(i||r){const s=Pi[t.position].call(this,this._active,this._eventPosition);if(!s)return;const l=this._size=v0(this,t),o=Object.assign({},s,this._size),c=x0(n,t,o),d=_0(t,o,c,n);(i._to!==d.x||r._to!==d.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=l.width,this.height=l.height,this.caretX=s.x,this.caretY=s.y,this._resolveAnimations().update(this,d))}}_willRender(){return!!this.opacity}draw(t){const n=this.options.setContext(this.getContext());let a=this.opacity;if(!a)return;this._updateAnimationTarget(n);const i={width:this.width,height:this.height},r={x:this.x,y:this.y};a=Math.abs(a)<.001?0:a;const s=Vt(n.padding),l=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;n.enabled&&l&&(t.save(),t.globalAlpha=a,this.drawBackground(r,t,i,n),sb(t,n.textDirection),r.y+=s.top,this.drawTitle(r,t,n),this.drawBody(r,t,n),this.drawFooter(r,t,n),lb(t,n.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,n){const a=this._active,i=t.map(({datasetIndex:l,index:o})=>{const c=this.chart.getDatasetMeta(l);if(!c)throw new Error("Cannot find a dataset at index "+l);return{datasetIndex:l,element:c.data[o],index:o}}),r=!Al(a,i),s=this._positionChanged(i,n);(r||s)&&(this._active=i,this._eventPosition=n,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,n,a=!0){if(n&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const i=this.options,r=this._active||[],s=this._getActiveElements(t,r,n,a),l=this._positionChanged(s,t),o=n||!Al(s,r)||l;return o&&(this._active=s,(i.enabled||i.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,n))),o}_getActiveElements(t,n,a,i){const r=this.options;if(t.type==="mouseout")return[];if(!i)return n.filter(l=>this.chart.data.datasets[l.datasetIndex]&&this.chart.getDatasetMeta(l.datasetIndex).controller.getParsed(l.index)!==void 0);const s=this.chart.getElementsAtEventForMode(t,r.mode,r,a);return r.reverse&&s.reverse(),s}_positionChanged(t,n){const{caretX:a,caretY:i,options:r}=this,s=Pi[r.position].call(this,t,n);return s!==!1&&(a!==s.x||i!==s.y)}}D(fd,"positioners",Pi);var bS={id:"tooltip",_element:fd,positioners:Pi,afterInit(e,t,n){n&&(e.tooltip=new fd({chart:e,options:n}))},beforeUpdate(e,t,n){e.tooltip&&e.tooltip.initialize(n)},reset(e,t,n){e.tooltip&&e.tooltip.initialize(n)},afterDraw(e){const t=e.tooltip;if(t&&t._willRender()){const n={tooltip:t};if(e.notifyPlugins("beforeTooltipDraw",{...n,cancelable:!0})===!1)return;t.draw(e.ctx),e.notifyPlugins("afterTooltipDraw",n)}},afterEvent(e,t){if(e.tooltip){const n=t.replay;e.tooltip.handleEvent(t.event,n,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(e,t)=>t.bodyFont.size,boxWidth:(e,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:Rb},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:e=>e!=="filter"&&e!=="itemSort"&&e!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},yS=Object.freeze({__proto__:null,Colors:Ok,Decimation:Lk,Filler:tS,Legend:sS,SubTitle:cS,Title:oS,Tooltip:bS});const vS=(e,t,n,a)=>(typeof t=="string"?(n=e.push(t)-1,a.unshift({index:n,label:t})):isNaN(t)&&(n=null),n);function xS(e,t,n,a){const i=e.indexOf(t);if(i===-1)return vS(e,t,n,a);const r=e.lastIndexOf(t);return i!==r?n:i}const _S=(e,t)=>e===null?null:Ct(Math.round(e),0,t);function w0(e){const t=this.getLabels();return e>=0&&e<t.length?t[e]:e}class hd extends Oa{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const n=this._addedLabels;if(n.length){const a=this.getLabels();for(const{index:i,label:r}of n)a[i]===r&&a.splice(i,1);this._addedLabels=[]}super.init(t)}parse(t,n){if(G(t))return null;const a=this.getLabels();return n=isFinite(n)&&a[n]===t?n:xS(a,t,B(n,t),this._addedLabels),_S(n,a.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let{min:a,max:i}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(a=0),n||(i=this.getLabels().length-1)),this.min=a,this.max=i}buildTicks(){const t=this.min,n=this.max,a=this.options.offset,i=[];let r=this.getLabels();r=t===0&&n===r.length-1?r:r.slice(t,n+1),this._valueRange=Math.max(r.length-(a?0:1),1),this._startValue=this.min-(a?.5:0);for(let s=t;s<=n;s++)i.push({value:s});return i}getLabelForValue(t){return w0.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const n=this.ticks;return t<0||t>n.length-1?null:this.getPixelForValue(n[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}D(hd,"id","category"),D(hd,"defaults",{ticks:{callback:w0}});function kS(e,t){const n=[],{bounds:i,step:r,min:s,max:l,precision:o,count:c,maxTicks:d,maxDigits:u,includeBounds:f}=e,h=r||1,m=d-1,{min:b,max:v}=t,p=!G(s),g=!G(l),y=!G(c),x=(v-b)/(u+1);let _=vh((v-b)/m/h)*h,w,k,S,A;if(_<1e-14&&!p&&!g)return[{value:b},{value:v}];A=Math.ceil(v/_)-Math.floor(b/_),A>m&&(_=vh(A*_/m/h)*h),G(o)||(w=Math.pow(10,o),_=Math.ceil(_*w)/w),i==="ticks"?(k=Math.floor(b/_)*_,S=Math.ceil(v/_)*_):(k=b,S=v),p&&g&&r&&p_((l-s)/r,_/1e3)?(A=Math.round(Math.min((l-s)/_,d)),_=(l-s)/A,k=s,S=l):y?(k=p?s:k,S=g?l:S,A=c-1,_=(S-k)/A):(A=(S-k)/_,fr(A,Math.round(A),_/1e3)?A=Math.round(A):A=Math.ceil(A));const C=Math.max(xh(_),xh(k));w=Math.pow(10,G(o)?C:o),k=Math.round(k*w)/w,S=Math.round(S*w)/w;let z=0;for(p&&(f&&k!==s?(n.push({value:s}),k<s&&z++,fr(Math.round((k+z*_)*w)/w,s,M0(s,x,e))&&z++):k<s&&z++);z<A;++z){const N=Math.round((k+z*_)*w)/w;if(g&&N>l)break;n.push({value:N})}return g&&f&&S!==l?n.length&&fr(n[n.length-1].value,l,M0(l,x,e))?n[n.length-1].value=l:n.push({value:l}):(!g||S===l)&&n.push({value:S}),n}function M0(e,t,{horizontal:n,minRotation:a}){const i=Ae(a),r=(n?Math.sin(i):Math.cos(i))||.001,s=.75*t*(""+e).length;return Math.min(t/r,s)}class Rl extends Oa{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,n){return G(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:n,maxDefined:a}=this.getUserBounds();let{min:i,max:r}=this;const s=o=>i=n?i:o,l=o=>r=a?r:o;if(t){const o=je(i),c=je(r);o<0&&c<0?l(0):o>0&&c>0&&s(0)}if(i===r){let o=r===0?1:Math.abs(r*.05);l(r+o),t||s(i-o)}this.min=i,this.max=r}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:n,stepSize:a}=t,i;return a?(i=Math.ceil(this.max/a)-Math.floor(this.min/a)+1,i>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${a} would result generating up to ${i} ticks. Limiting to 1000.`),i=1e3)):(i=this.computeTickLimit(),n=n||11),n&&(i=Math.min(n,i)),i}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,n=t.ticks;let a=this.getTickLimit();a=Math.max(2,a);const i={maxTicks:a,bounds:t.bounds,min:t.min,max:t.max,precision:n.precision,step:n.stepSize,count:n.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:n.minRotation||0,includeBounds:n.includeBounds!==!1},r=this._range||this,s=kS(i,r);return t.bounds==="ticks"&&qm(s,this,"value"),t.reverse?(s.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),s}configure(){const t=this.ticks;let n=this.min,a=this.max;if(super.configure(),this.options.offset&&t.length){const i=(a-n)/Math.max(t.length-1,1)/2;n-=i,a+=i}this._startValue=n,this._endValue=a,this._valueRange=a-n}getLabelForValue(t){return Jr(t,this.chart.options.locale,this.options.ticks.format)}}class pd extends Rl{determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=gt(t)?t:0,this.max=gt(n)?n:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),n=t?this.width:this.height,a=Ae(this.options.ticks.minRotation),i=(t?Math.sin(a):Math.cos(a))||.001,r=this._resolveTickFontOptions(0);return Math.ceil(n/Math.min(40,r.lineHeight/i))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}D(pd,"id","linear"),D(pd,"defaults",{ticks:{callback:$l.formatters.numeric}});const Nr=e=>Math.floor(Cn(e)),aa=(e,t)=>Math.pow(10,Nr(e)+t);function A0(e){return e/Math.pow(10,Nr(e))===1}function T0(e,t,n){const a=Math.pow(10,n),i=Math.floor(e/a);return Math.ceil(t/a)-i}function SS(e,t){const n=t-e;let a=Nr(n);for(;T0(e,t,a)>10;)a++;for(;T0(e,t,a)<10;)a--;return Math.min(a,Nr(e))}function wS(e,{min:t,max:n}){t=ee(e.min,t);const a=[],i=Nr(t);let r=SS(t,n),s=r<0?Math.pow(10,Math.abs(r)):1;const l=Math.pow(10,r),o=i>r?Math.pow(10,i):0,c=Math.round((t-o)*s)/s,d=Math.floor((t-o)/l/10)*l*10;let u=Math.floor((c-d)/Math.pow(10,r)),f=ee(e.min,Math.round((o+d+u*Math.pow(10,r))*s)/s);for(;f<n;)a.push({value:f,major:A0(f),significand:u}),u>=10?u=u<15?15:20:u++,u>=20&&(r++,u=2,s=r>=0?1:s),f=Math.round((o+d+u*Math.pow(10,r))*s)/s;const h=ee(e.max,f);return a.push({value:h,major:A0(h),significand:u}),a}class gd extends Oa{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,n){const a=Rl.prototype.parse.apply(this,[t,n]);if(a===0){this._zero=!0;return}return gt(a)&&a>0?a:null}determineDataLimits(){const{min:t,max:n}=this.getMinMax(!0);this.min=gt(t)?Math.max(0,t):null,this.max=gt(n)?Math.max(0,n):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!gt(this._userMin)&&(this.min=t===aa(this.min,0)?aa(this.min,-1):aa(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:n}=this.getUserBounds();let a=this.min,i=this.max;const r=l=>a=t?a:l,s=l=>i=n?i:l;a===i&&(a<=0?(r(1),s(10)):(r(aa(a,-1)),s(aa(i,1)))),a<=0&&r(aa(i,-1)),i<=0&&s(aa(a,1)),this.min=a,this.max=i}buildTicks(){const t=this.options,n={min:this._userMin,max:this._userMax},a=wS(n,this);return t.bounds==="ticks"&&qm(a,this,"value"),t.reverse?(a.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),a}getLabelForValue(t){return t===void 0?"0":Jr(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=Cn(t),this._valueRange=Cn(this.max)-Cn(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(Cn(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const n=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+n*this._valueRange)}}D(gd,"id","logarithmic"),D(gd,"defaults",{ticks:{callback:$l.formatters.logarithmic,major:{enabled:!0}}});function md(e){const t=e.ticks;if(t.display&&e.display){const n=Vt(t.backdropPadding);return B(t.font&&t.font.size,ft.font.size)+n.height}return 0}function MS(e,t,n){return n=ut(n)?n:[n],{w:E_(e,t.string,n),h:n.length*t.lineHeight}}function D0(e,t,n,a,i){return e===a||e===i?{start:t-n/2,end:t+n/2}:e<a||e>i?{start:t-n,end:t}:{start:t,end:t+n}}function AS(e){const t={l:e.left+e._padding.left,r:e.right-e._padding.right,t:e.top+e._padding.top,b:e.bottom-e._padding.bottom},n=Object.assign({},t),a=[],i=[],r=e._pointLabels.length,s=e.options.pointLabels,l=s.centerPointLabels?Z/r:0;for(let o=0;o<r;o++){const c=s.setContext(e.getPointLabelContext(o));i[o]=c.padding;const d=e.getPointPosition(o,e.drawingArea+i[o],l),u=Mt(c.font),f=MS(e.ctx,u,e._pointLabels[o]);a[o]=f;const h=Ht(e.getIndexAngle(o)+l),m=Math.round(wu(h)),b=D0(m,d.x,f.w,0,180),v=D0(m,d.y,f.h,90,270);TS(n,t,h,b,v)}e.setCenterPoint(t.l-n.l,n.r-t.r,t.t-n.t,n.b-t.b),e._pointLabelItems=OS(e,a,i)}function TS(e,t,n,a,i){const r=Math.abs(Math.sin(n)),s=Math.abs(Math.cos(n));let l=0,o=0;a.start<t.l?(l=(t.l-a.start)/r,e.l=Math.min(e.l,t.l-l)):a.end>t.r&&(l=(a.end-t.r)/r,e.r=Math.max(e.r,t.r+l)),i.start<t.t?(o=(t.t-i.start)/s,e.t=Math.min(e.t,t.t-o)):i.end>t.b&&(o=(i.end-t.b)/s,e.b=Math.max(e.b,t.b+o))}function DS(e,t,n){const a=e.drawingArea,{extra:i,additionalAngle:r,padding:s,size:l}=n,o=e.getPointPosition(t,a+i+s,r),c=Math.round(wu(Ht(o.angle+bt))),d=RS(o.y,l.h,c),u=ES(c),f=zS(o.x,l.w,u);return{visible:!0,x:o.x,y:d,textAlign:u,left:f,top:d,right:f+l.w,bottom:d+l.h}}function CS(e,t){if(!t)return!0;const{left:n,top:a,right:i,bottom:r}=e;return!(sn({x:n,y:a},t)||sn({x:n,y:r},t)||sn({x:i,y:a},t)||sn({x:i,y:r},t))}function OS(e,t,n){const a=[],i=e._pointLabels.length,r=e.options,{centerPointLabels:s,display:l}=r.pointLabels,o={extra:md(r)/2,additionalAngle:s?Z/i:0};let c;for(let d=0;d<i;d++){o.padding=n[d],o.size=t[d];const u=DS(e,d,o);a.push(u),l==="auto"&&(u.visible=CS(u,c),u.visible&&(c=u))}return a}function ES(e){return e===0||e===180?"center":e<180?"left":"right"}function zS(e,t,n){return n==="right"?e-=t:n==="center"&&(e-=t/2),e}function RS(e,t,n){return n===90||n===270?e-=t/2:(n>270||n<90)&&(e-=t),e}function LS(e,t,n){const{left:a,top:i,right:r,bottom:s}=n,{backdropColor:l}=t;if(!G(l)){const o=ma(t.borderRadius),c=Vt(t.backdropPadding);e.fillStyle=l;const d=a-c.left,u=i-c.top,f=r-a+c.width,h=s-i+c.height;Object.values(o).some(m=>m!==0)?(e.beginPath(),Lr(e,{x:d,y:u,w:f,h,radius:o}),e.fill()):e.fillRect(d,u,f,h)}}function BS(e,t){const{ctx:n,options:{pointLabels:a}}=e;for(let i=t-1;i>=0;i--){const r=e._pointLabelItems[i];if(!r.visible)continue;const s=a.setContext(e.getPointLabelContext(i));LS(n,s,r);const l=Mt(s.font),{x:o,y:c,textAlign:d}=r;wa(n,e._pointLabels[i],o,c+l.lineHeight/2,l,{color:s.color,textAlign:d,textBaseline:"middle"})}}function Lb(e,t,n,a){const{ctx:i}=e;if(n)i.arc(e.xCenter,e.yCenter,t,0,ot);else{let r=e.getPointPosition(0,t);i.moveTo(r.x,r.y);for(let s=1;s<a;s++)r=e.getPointPosition(s,t),i.lineTo(r.x,r.y)}}function NS(e,t,n,a,i){const r=e.ctx,s=t.circular,{color:l,lineWidth:o}=t;!s&&!a||!l||!o||n<0||(r.save(),r.strokeStyle=l,r.lineWidth=o,r.setLineDash(i.dash||[]),r.lineDashOffset=i.dashOffset,r.beginPath(),Lb(e,n,s,a),r.closePath(),r.stroke(),r.restore())}function jS(e,t,n){return Jn(e,{label:n,index:t,type:"pointLabel"})}class Wi extends Rl{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=Vt(md(this.options)/2),n=this.width=this.maxWidth-t.width,a=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+n/2+t.left),this.yCenter=Math.floor(this.top+a/2+t.top),this.drawingArea=Math.floor(Math.min(n,a)/2)}determineDataLimits(){const{min:t,max:n}=this.getMinMax(!1);this.min=gt(t)&&!isNaN(t)?t:0,this.max=gt(n)&&!isNaN(n)?n:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/md(this.options))}generateTickLabels(t){Rl.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((n,a)=>{const i=nt(this.options.pointLabels.callback,[n,a],this);return i||i===0?i:""}).filter((n,a)=>this.chart.getDataVisibility(a))}fit(){const t=this.options;t.display&&t.pointLabels.display?AS(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,n,a,i){this.xCenter+=Math.floor((t-n)/2),this.yCenter+=Math.floor((a-i)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,n,a,i))}getIndexAngle(t){const n=ot/(this._pointLabels.length||1),a=this.options.startAngle||0;return Ht(t*n+Ae(a))}getDistanceFromCenterForValue(t){if(G(t))return NaN;const n=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*n:(t-this.min)*n}getValueForDistanceFromCenter(t){if(G(t))return NaN;const n=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-n:this.min+n}getPointLabelContext(t){const n=this._pointLabels||[];if(t>=0&&t<n.length){const a=n[t];return jS(this.getContext(),t,a)}}getPointPosition(t,n,a=0){const i=this.getIndexAngle(t)-bt+a;return{x:Math.cos(i)*n+this.xCenter,y:Math.sin(i)*n+this.yCenter,angle:i}}getPointPositionForValue(t,n){return this.getPointPosition(t,this.getDistanceFromCenterForValue(n))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:n,top:a,right:i,bottom:r}=this._pointLabelItems[t];return{left:n,top:a,right:i,bottom:r}}drawBackground(){const{backgroundColor:t,grid:{circular:n}}=this.options;if(t){const a=this.ctx;a.save(),a.beginPath(),Lb(this,this.getDistanceFromCenterForValue(this._endValue),n,this._pointLabels.length),a.closePath(),a.fillStyle=t,a.fill(),a.restore()}}drawGrid(){const t=this.ctx,n=this.options,{angleLines:a,grid:i,border:r}=n,s=this._pointLabels.length;let l,o,c;if(n.pointLabels.display&&BS(this,s),i.display&&this.ticks.forEach((d,u)=>{if(u!==0||u===0&&this.min<0){o=this.getDistanceFromCenterForValue(d.value);const f=this.getContext(u),h=i.setContext(f),m=r.setContext(f);NS(this,h,o,s,m)}}),a.display){for(t.save(),l=s-1;l>=0;l--){const d=a.setContext(this.getPointLabelContext(l)),{color:u,lineWidth:f}=d;!f||!u||(t.lineWidth=f,t.strokeStyle=u,t.setLineDash(d.borderDash),t.lineDashOffset=d.borderDashOffset,o=this.getDistanceFromCenterForValue(n.reverse?this.min:this.max),c=this.getPointPosition(l,o),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(c.x,c.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,n=this.options,a=n.ticks;if(!a.display)return;const i=this.getIndexAngle(0);let r,s;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(i),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((l,o)=>{if(o===0&&this.min>=0&&!n.reverse)return;const c=a.setContext(this.getContext(o)),d=Mt(c.font);if(r=this.getDistanceFromCenterForValue(this.ticks[o].value),c.showLabelBackdrop){t.font=d.string,s=t.measureText(l.label).width,t.fillStyle=c.backdropColor;const u=Vt(c.backdropPadding);t.fillRect(-s/2-u.left,-r-d.size/2-u.top,s+u.width,d.size+u.height)}wa(t,l.label,0,-r,d,{color:c.color,strokeColor:c.textStrokeColor,strokeWidth:c.textStrokeWidth})}),t.restore()}drawTitle(){}}D(Wi,"id","radialLinear"),D(Wi,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:$l.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}}),D(Wi,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),D(Wi,"descriptors",{angleLines:{_fallback:"grid"}});const ro={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},Jt=Object.keys(ro);function C0(e,t){return e-t}function O0(e,t){if(G(t))return null;const n=e._adapter,{parser:a,round:i,isoWeekday:r}=e._parseOpts;let s=t;return typeof a=="function"&&(s=a(s)),gt(s)||(s=typeof a=="string"?n.parse(s,a):n.parse(s)),s===null?null:(i&&(s=i==="week"&&(mi(r)||r===!0)?n.startOf(s,"isoWeek",r):n.startOf(s,i)),+s)}function E0(e,t,n,a){const i=Jt.length;for(let r=Jt.indexOf(e);r<i-1;++r){const s=ro[Jt[r]],l=s.steps?s.steps:Number.MAX_SAFE_INTEGER;if(s.common&&Math.ceil((n-t)/(l*s.size))<=a)return Jt[r]}return Jt[i-1]}function HS(e,t,n,a,i){for(let r=Jt.length-1;r>=Jt.indexOf(n);r--){const s=Jt[r];if(ro[s].common&&e._adapter.diff(i,a,s)>=t-1)return s}return Jt[n?Jt.indexOf(n):0]}function US(e){for(let t=Jt.indexOf(e)+1,n=Jt.length;t<n;++t)if(ro[Jt[t]].common)return Jt[t]}function z0(e,t,n){if(!n)e[t]=!0;else if(n.length){const{lo:a,hi:i}=Mu(n,t),r=n[a]>=t?n[a]:n[i];e[r]=!0}}function VS(e,t,n,a){const i=e._adapter,r=+i.startOf(t[0].value,a),s=t[t.length-1].value;let l,o;for(l=r;l<=s;l=+i.add(l,1,a))o=n[l],o>=0&&(t[o].major=!0);return t}function R0(e,t,n){const a=[],i={},r=t.length;let s,l;for(s=0;s<r;++s)l=t[s],i[l]=s,a.push({value:l,major:!1});return r===0||!n?a:VS(e,a,i,n)}class jr extends Oa{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,n={}){const a=t.time||(t.time={}),i=this._adapter=new K2._date(t.adapters.date);i.init(n),ur(a.displayFormats,i.formats()),this._parseOpts={parser:a.parser,round:a.round,isoWeekday:a.isoWeekday},super.init(t),this._normalized=n.normalized}parse(t,n){return t===void 0?null:O0(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,n=this._adapter,a=t.time.unit||"day";let{min:i,max:r,minDefined:s,maxDefined:l}=this.getUserBounds();function o(c){!s&&!isNaN(c.min)&&(i=Math.min(i,c.min)),!l&&!isNaN(c.max)&&(r=Math.max(r,c.max))}(!s||!l)&&(o(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&o(this.getMinMax(!1))),i=gt(i)&&!isNaN(i)?i:+n.startOf(Date.now(),a),r=gt(r)&&!isNaN(r)?r:+n.endOf(Date.now(),a)+1,this.min=Math.min(i,r-1),this.max=Math.max(i+1,r)}_getLabelBounds(){const t=this.getLabelTimestamps();let n=Number.POSITIVE_INFINITY,a=Number.NEGATIVE_INFINITY;return t.length&&(n=t[0],a=t[t.length-1]),{min:n,max:a}}buildTicks(){const t=this.options,n=t.time,a=t.ticks,i=a.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&i.length&&(this.min=this._userMin||i[0],this.max=this._userMax||i[i.length-1]);const r=this.min,s=this.max,l=y_(i,r,s);return this._unit=n.unit||(a.autoSkip?E0(n.minUnit,this.min,this.max,this._getLabelCapacity(r)):HS(this,l.length,n.minUnit,this.min,this.max)),this._majorUnit=!a.major.enabled||this._unit==="year"?void 0:US(this._unit),this.initOffsets(i),t.reverse&&l.reverse(),R0(this,l,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let n=0,a=0,i,r;this.options.offset&&t.length&&(i=this.getDecimalForValue(t[0]),t.length===1?n=1-i:n=(this.getDecimalForValue(t[1])-i)/2,r=this.getDecimalForValue(t[t.length-1]),t.length===1?a=r:a=(r-this.getDecimalForValue(t[t.length-2]))/2);const s=t.length<3?.5:.25;n=Ct(n,0,s),a=Ct(a,0,s),this._offsets={start:n,end:a,factor:1/(n+1+a)}}_generate(){const t=this._adapter,n=this.min,a=this.max,i=this.options,r=i.time,s=r.unit||E0(r.minUnit,n,a,this._getLabelCapacity(n)),l=B(i.ticks.stepSize,1),o=s==="week"?r.isoWeekday:!1,c=mi(o)||o===!0,d={};let u=n,f,h;if(c&&(u=+t.startOf(u,"isoWeek",o)),u=+t.startOf(u,c?"day":s),t.diff(a,n,s)>1e5*l)throw new Error(n+" and "+a+" are too far apart with stepSize of "+l+" "+s);const m=i.ticks.source==="data"&&this.getDataTimestamps();for(f=u,h=0;f<a;f=+t.add(f,l,s),h++)z0(d,f,m);return(f===a||i.bounds==="ticks"||h===1)&&z0(d,f,m),Object.keys(d).sort(C0).map(b=>+b)}getLabelForValue(t){const n=this._adapter,a=this.options.time;return a.tooltipFormat?n.format(t,a.tooltipFormat):n.format(t,a.displayFormats.datetime)}format(t,n){const i=this.options.time.displayFormats,r=this._unit,s=n||i[r];return this._adapter.format(t,s)}_tickFormatFunction(t,n,a,i){const r=this.options,s=r.ticks.callback;if(s)return nt(s,[t,n,a],this);const l=r.time.displayFormats,o=this._unit,c=this._majorUnit,d=o&&l[o],u=c&&l[c],f=a[n],h=c&&u&&f&&f.major;return this._adapter.format(t,i||(h?u:d))}generateTickLabels(t){let n,a,i;for(n=0,a=t.length;n<a;++n)i=t[n],i.label=this._tickFormatFunction(i.value,n,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const n=this._offsets,a=this.getDecimalForValue(t);return this.getPixelForDecimal((n.start+a)*n.factor)}getValueForPixel(t){const n=this._offsets,a=this.getDecimalForPixel(t)/n.factor-n.end;return this.min+a*(this.max-this.min)}_getLabelSize(t){const n=this.options.ticks,a=this.ctx.measureText(t).width,i=Ae(this.isHorizontal()?n.maxRotation:n.minRotation),r=Math.cos(i),s=Math.sin(i),l=this._resolveTickFontOptions(0).size;return{w:a*r+l*s,h:a*s+l*r}}_getLabelCapacity(t){const n=this.options.time,a=n.displayFormats,i=a[n.unit]||a.millisecond,r=this._tickFormatFunction(t,0,R0(this,[t],this._majorUnit),i),s=this._getLabelSize(r),l=Math.floor(this.isHorizontal()?this.width/s.w:this.height/s.h)-1;return l>0?l:1}getDataTimestamps(){let t=this._cache.data||[],n,a;if(t.length)return t;const i=this.getMatchingVisibleMetas();if(this._normalized&&i.length)return this._cache.data=i[0].controller.getAllParsedValues(this);for(n=0,a=i.length;n<a;++n)t=t.concat(i[n].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let n,a;if(t.length)return t;const i=this.getLabels();for(n=0,a=i.length;n<a;++n)t.push(O0(this,i[n]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return Qm(t.sort(C0))}}D(jr,"id","time"),D(jr,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function As(e,t,n){let a=0,i=e.length-1,r,s,l,o;n?(t>=e[a].pos&&t<=e[i].pos&&({lo:a,hi:i}=rn(e,"pos",t)),{pos:r,time:l}=e[a],{pos:s,time:o}=e[i]):(t>=e[a].time&&t<=e[i].time&&({lo:a,hi:i}=rn(e,"time",t)),{time:r,pos:l}=e[a],{time:s,pos:o}=e[i]);const c=s-r;return c?l+(o-l)*(t-r)/c:l}class bd extends jr{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),n=this._table=this.buildLookupTable(t);this._minPos=As(n,this.min),this._tableRange=As(n,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:n,max:a}=this,i=[],r=[];let s,l,o,c,d;for(s=0,l=t.length;s<l;++s)c=t[s],c>=n&&c<=a&&i.push(c);if(i.length<2)return[{time:n,pos:0},{time:a,pos:1}];for(s=0,l=i.length;s<l;++s)d=i[s+1],o=i[s-1],c=i[s],Math.round((d+o)/2)!==c&&r.push({time:c,pos:s/(l-1)});return r}_generate(){const t=this.min,n=this.max;let a=super.getDataTimestamps();return(!a.includes(t)||!a.length)&&a.splice(0,0,t),(!a.includes(n)||a.length===1)&&a.push(n),a.sort((i,r)=>i-r)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const n=this.getDataTimestamps(),a=this.getLabelTimestamps();return n.length&&a.length?t=this.normalize(n.concat(a)):t=n.length?n:a,t=this._cache.all=t,t}getDecimalForValue(t){return(As(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const n=this._offsets,a=this.getDecimalForPixel(t)/n.factor-n.end;return As(this._table,a*this._tableRange+this._minPos,!0)}}D(bd,"id","timeseries"),D(bd,"defaults",jr.defaults);var YS=Object.freeze({__proto__:null,CategoryScale:hd,LinearScale:pd,LogarithmicScale:gd,RadialLinearScale:Wi,TimeScale:jr,TimeSeriesScale:bd});const GS=[Z2,Sk,yS,YS];Ie.register(...GS);const yd="hangar.finnhubKey",qS=["finnhubKey","finnhubToken","token"],Ba=4,Nu=24;function vi(e){return typeof e=="string"?e.trim():""}function XS(e={}){return vi((e==null?void 0:e.VITE_FINNHUB_KEY)||"")}function FS(e=globalThis==null?void 0:globalThis.localStorage){if(!e||typeof e.getItem!="function")return"";try{return vi(e.getItem(yd)||"")}catch{return""}}function QS(e,t=globalThis==null?void 0:globalThis.localStorage){if(!t||typeof t.setItem!="function")return;const n=vi(e);try{n?t.setItem(yd,n):typeof t.removeItem=="function"&&t.removeItem(yd)}catch{}}function ZS({viteEnv:e={},search:t="",appConfig:n={},storage:a=globalThis==null?void 0:globalThis.localStorage}={}){var l;let i="",r="missing";const s=XS(e);if(s)return{key:s,source:"env"};try{const o=new URLSearchParams(t||"");for(const c of qS){const d=vi(o.get(c));if(d){i=d,r="query",QS(d,a);break}}}catch{}if(!i){const o=FS(a);o&&(i=o,r="storage")}if(!i){const o=vi(((l=n==null?void 0:n.marketData)==null?void 0:l.finnhubKey)||"");o&&(i=o,r="config")}return{key:i,source:r}}function KS(e,t=Nu){return Array.isArray(e)?e.map((n,a)=>({id:(n==null?void 0:n.id)||(n==null?void 0:n.headline)||`news-${a}`,headline:String((n==null?void 0:n.headline)||"").trim(),summary:String((n==null?void 0:n.summary)||"").trim(),source:String((n==null?void 0:n.source)||"Finnhub").trim(),url:String((n==null?void 0:n.url)||"").trim(),image:String((n==null?void 0:n.image)||"").trim(),category:String((n==null?void 0:n.category)||"").trim(),datetime:Number(n==null?void 0:n.datetime)||0})).filter(n=>n.headline&&n.url).sort((n,a)=>a.datetime-n.datetime).slice(0,t):[]}async function PS({apiKey:e,fetchImpl:t=globalThis.fetch,category:n="general",limit:a=Nu}={}){const i=vi(e);if(!i)throw new Error("FINNHUB_KEY_MISSING");if(typeof t!="function")throw new Error("FETCH_UNAVAILABLE");const r=new URL("https://finnhub.io/api/v1/news");r.searchParams.set("category",n),r.searchParams.set("token",i);const s=await t(r.toString(),{headers:{Accept:"application/json"},cache:"no-cache"});if(!s.ok)throw new Error(`FINNHUB_NEWS_${s.status}`);const l=await s.json();return KS(l,a)}const WS={VITE_FINNHUB_KEY:"d7g4oihr01qqb8ribc8gd7g4oihr01qqb8ribc90"};function ic(e,t,n){typeof window>"u"||(window.latestFinnhubMarketNews=Array.isArray(e)?e:[],document.dispatchEvent(new CustomEvent("finnhubMarketNewsUpdated",{detail:{items:window.latestFinnhubMarketNews,status:t,keyDetails:n}})))}function JS(){const e=jt.useMemo(()=>typeof window>"u"?{key:"",source:"missing"}:ZS({viteEnv:WS,search:window.location.search,appConfig:window.APP_CONFIG||{},storage:window.localStorage}),[]),[t,n]=jt.useState([]),[a,i]=jt.useState(e.key?"loading":"missing-key"),[r,s]=jt.useState(""),[l,o]=jt.useState(0),c=jt.useCallback(async()=>{if(!e.key){i("missing-key"),n([]),s(""),ic([],"missing-key",e);return}i("loading"),s("");try{const d=await PS({apiKey:e.key,limit:Nu});n(d),i(d.length?"ready":"empty"),o(Date.now()),ic(d,d.length?"ready":"empty",e)}catch(d){n([]),i("error"),s(d instanceof Error?d.message:"Unable to load market news."),ic([],"error",e)}},[e.key]);return jt.useEffect(()=>{c()},[c]),{items:t,status:a,error:r,lastUpdated:l,refresh:c,keyDetails:e}}function IS(e){if(!e)return"--";const t=new Date(e*1e3);return Number.isNaN(t.getTime())?"--":t.toLocaleString("en-US",{month:"short",day:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"})}function $S(e){return e?e.length<=180?e:`${e.slice(0,177).trim()}...`:"Open the article for the full market brief."}function tw(){const{items:e,status:t,error:n,lastUpdated:a,refresh:i,keyDetails:r}=JS(),[s,l]=jt.useState(1),o=jt.useMemo(()=>a?new Date(a).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",second:"2-digit"}):"Awaiting first sync",[a]);jt.useEffect(()=>{l(1)},[e]);const c=Math.max(1,Math.ceil(e.length/Ba)),d=jt.useMemo(()=>{const h=(s-1)*Ba;return e.slice(h,h+Ba)},[s,e]),u=jt.useMemo(()=>{if(!e.length)return"No stories loaded yet";const h=(s-1)*Ba+1,m=Math.min(e.length,s*Ba);return`Showing ${h}-${m} of ${e.length} headlines`},[s,e]),f=t==="loading";return O.jsxs("article",{className:"bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-5 space-y-5",children:[O.jsxs("div",{className:"flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",children:[O.jsxs("div",{className:"space-y-1",children:[O.jsx("p",{className:"text-xs font-semibold tracking-widest uppercase text-sky-500 dark:text-sky-300",children:"Global Market Brief"}),O.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white",children:"World Stock News"}),O.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-400 max-w-3xl",children:"Live headlines from Finnhub's general market news feed so the supply deck surfaces what is moving global equities right now."})]}),O.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-xs",children:[O.jsxs("span",{className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60",children:[O.jsx("span",{className:"font-semibold",children:"Key source"}),O.jsx("span",{children:r.source==="missing"?"Not configured":r.source})]}),O.jsxs("span",{className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 dark:bg-sky-900/30 text-sky-600 dark:text-sky-200 border border-sky-500/20 dark:border-sky-500/30",children:[O.jsx("span",{className:"font-semibold",children:"Last sync"}),O.jsx("span",{children:o})]}),O.jsxs("button",{type:"button",onClick:i,disabled:f||t==="missing-key",className:"inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-sky-500/40 text-sky-600 dark:text-sky-200 bg-white/70 dark:bg-slate-900/50 text-xs font-semibold hover:bg-sky-500/10 hover:border-sky-500/70 transition disabled:opacity-50 disabled:cursor-not-allowed",children:[O.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:O.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})}),f?"Refreshing...":"Refresh feed"]})]})]}),t==="missing-key"?O.jsxs("div",{className:"rounded-xl border border-amber-300/70 dark:border-amber-500/40 bg-amber-50/80 dark:bg-amber-900/20 p-4 space-y-2 text-sm text-amber-800 dark:text-amber-100",children:[O.jsx("p",{className:"font-semibold",children:"Finnhub key not configured."}),O.jsxs("p",{children:["Add ",O.jsx("code",{children:"VITE_FINNHUB_KEY"})," to ",O.jsx("code",{children:".env.local"}),", then restart the Vite dev server. Query-string, local storage, and ",O.jsx("code",{children:"window.APP_CONFIG.marketData.finnhubKey"})," still work as fallbacks."]})]}):null,t==="error"?O.jsxs("div",{className:"rounded-xl border border-rose-300/70 dark:border-rose-500/40 bg-rose-50/80 dark:bg-rose-900/20 p-4 text-sm text-rose-700 dark:text-rose-100",children:["Unable to load world stock news. ",n||"Unknown error."]}):null,t==="loading"?O.jsx("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-4","aria-live":"polite",children:Array.from({length:Ba}).map((h,m)=>O.jsxs("div",{className:"rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50/70 dark:bg-slate-900/30 p-4 space-y-3 animate-pulse",children:[O.jsx("div",{className:"h-3 w-24 rounded bg-slate-200 dark:bg-slate-700"}),O.jsx("div",{className:"h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-700"}),O.jsx("div",{className:"h-20 rounded bg-slate-200 dark:bg-slate-700"}),O.jsx("div",{className:"h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-700"})]},m))}):null,t==="empty"?O.jsx("div",{className:"rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/30 p-4 text-sm text-slate-600 dark:text-slate-300",children:"Finnhub returned no market headlines for the current query."}):null,t==="ready"?O.jsxs("div",{className:"space-y-4",children:[O.jsx("div",{className:"grid grid-cols-1 xl:grid-cols-2 gap-4","aria-live":"polite",children:d.map(h=>O.jsxs("article",{"data-news-card":!0,className:"rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50/70 dark:bg-slate-900/30 overflow-hidden",children:[h.image?O.jsx("div",{className:"aspect-[16/7] overflow-hidden bg-slate-200 dark:bg-slate-800",children:O.jsx("img",{src:h.image,alt:"",className:"h-full w-full object-cover",loading:"lazy"})}):null,O.jsxs("div",{className:"p-4 space-y-3",children:[O.jsxs("div",{className:"flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400",children:[O.jsx("span",{children:h.source}),O.jsx("span",{className:"h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500"}),O.jsx("span",{children:IS(h.datetime)}),h.category?O.jsxs(O.Fragment,{children:[O.jsx("span",{className:"h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500"}),O.jsx("span",{children:h.category})]}):null]}),O.jsx("h4",{className:"text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug",children:O.jsx("a",{href:h.url,target:"_blank",rel:"noopener noreferrer",className:"hover:text-sky-600 dark:hover:text-sky-300 transition",children:h.headline})}),O.jsx("p",{className:"text-sm text-slate-600 dark:text-slate-300",children:$S(h.summary)}),O.jsxs("a",{href:h.url,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-300 hover:underline",children:["Read article",O.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:O.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M14 5l7 7m0 0l-7 7m7-7H3"})})]})]})]},h.id))}),c>1?O.jsxs("div",{className:"flex flex-col gap-3 border-t border-slate-200/80 dark:border-slate-700/70 pt-4 sm:flex-row sm:items-center sm:justify-between",children:[O.jsxs("div",{className:"space-y-1",children:[O.jsxs("p",{"data-news-page-indicator":!0,className:"text-sm font-semibold text-slate-900 dark:text-slate-100",children:["Page ",s," of ",c]}),O.jsx("p",{className:"text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400",children:u})]}),O.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[O.jsx("button",{type:"button","data-news-pagination-prev":!0,"aria-label":"Previous news page",onClick:()=>l(h=>Math.max(1,h-1)),disabled:s===1,className:"inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300/80 dark:border-slate-600/80 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-45 disabled:cursor-not-allowed",children:"Prev"}),O.jsx("button",{type:"button","data-news-pagination-next":!0,"aria-label":"Next news page",onClick:()=>l(h=>Math.min(c,h+1)),disabled:s===c,className:"inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300/80 dark:border-slate-600/80 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-45 disabled:cursor-not-allowed",children:"Next"})]})]}):null]}):null]})}const Bb=`<!DOCTYPE html>\r
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
`,ew="transition-colors duration-300",nw=`
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <div id="worldStockNewsMount" class="xl:col-span-2"></div>
        </div>
`,aw='<section id="advanced-tracker"',iw='<div class="grid grid-cols-1 gap-6 mb-6">',rw=`<div
          class="mb-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"`;function sw(e){return e.replace(/\r\n/g,`
`)}function lw(e){const t=e.match(/<body([^>]*)>/i);return t?t[1]:""}function ow(e){const t=e.match(/<body[^>]*>([\s\S]*?)<\/body>/i);return t?sw(t[1]):""}function cw(e){return e.replace(/\s*<script\b[^>]*><\/script>/gi,"")}function dw(e){const t=e.indexOf(aw);if(t===-1)return e;const n=e.indexOf(iw,t),a=e.indexOf(rw,n);return n===-1||a===-1?e:`${e.slice(0,n)}${nw}${e.slice(a)}`}const uw=lw(Bb),rc=uw.match(/class="([^"]+)"/i),fw=(rc==null?void 0:rc[1])||ew,hw=ow(Bb),pw=dw(cw(hw)).trim();function gw(){return jt.useLayoutEffect(()=>{document.body.className=fw;const e=document.getElementById("worldStockNewsMount"),t=e?jm.createRoot(e):null;return t==null||t.render(O.jsx(tw,{})),()=>{t==null||t.unmount()}},[]),O.jsx("div",{style:{display:"contents"},dangerouslySetInnerHTML:{__html:pw}})}window.React=ay;window.Chart=Ie;const mw=document.getElementById("root"),bw=jm.createRoot(mw);P0.flushSync(()=>{bw.render(O.jsx(gw,{}))});
