(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(l){if(l.ep)return;l.ep=!0;const i=n(l);fetch(l.href,i)}})();function ic(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Qs={exports:{}},ol={},Ys={exports:{}},R={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var er=Symbol.for("react.element"),oc=Symbol.for("react.portal"),sc=Symbol.for("react.fragment"),ac=Symbol.for("react.strict_mode"),uc=Symbol.for("react.profiler"),cc=Symbol.for("react.provider"),dc=Symbol.for("react.context"),fc=Symbol.for("react.forward_ref"),pc=Symbol.for("react.suspense"),mc=Symbol.for("react.memo"),hc=Symbol.for("react.lazy"),Io=Symbol.iterator;function gc(e){return e===null||typeof e!="object"?null:(e=Io&&e[Io]||e["@@iterator"],typeof e=="function"?e:null)}var Xs={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ks=Object.assign,Gs={};function pn(e,t,n){this.props=e,this.context=t,this.refs=Gs,this.updater=n||Xs}pn.prototype.isReactComponent={};pn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};pn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Zs(){}Zs.prototype=pn.prototype;function $i(e,t,n){this.props=e,this.context=t,this.refs=Gs,this.updater=n||Xs}var Vi=$i.prototype=new Zs;Vi.constructor=$i;Ks(Vi,pn.prototype);Vi.isPureReactComponent=!0;var Ao=Array.isArray,Js=Object.prototype.hasOwnProperty,Wi={current:null},qs={key:!0,ref:!0,__self:!0,__source:!0};function ea(e,t,n){var r,l={},i=null,s=null;if(t!=null)for(r in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(i=""+t.key),t)Js.call(t,r)&&!qs.hasOwnProperty(r)&&(l[r]=t[r]);var a=arguments.length-2;if(a===1)l.children=n;else if(1<a){for(var u=Array(a),d=0;d<a;d++)u[d]=arguments[d+2];l.children=u}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)l[r]===void 0&&(l[r]=a[r]);return{$$typeof:er,type:e,key:i,ref:s,props:l,_owner:Wi.current}}function vc(e,t){return{$$typeof:er,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Hi(e){return typeof e=="object"&&e!==null&&e.$$typeof===er}function yc(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var bo=/\/+/g;function Nl(e,t){return typeof e=="object"&&e!==null&&e.key!=null?yc(""+e.key):t.toString(36)}function Sr(e,t,n,r,l){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(i){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case er:case oc:s=!0}}if(s)return s=e,l=l(s),e=r===""?"."+Nl(s,0):r,Ao(l)?(n="",e!=null&&(n=e.replace(bo,"$&/")+"/"),Sr(l,t,n,"",function(d){return d})):l!=null&&(Hi(l)&&(l=vc(l,n+(!l.key||s&&s.key===l.key?"":(""+l.key).replace(bo,"$&/")+"/")+e)),t.push(l)),1;if(s=0,r=r===""?".":r+":",Ao(e))for(var a=0;a<e.length;a++){i=e[a];var u=r+Nl(i,a);s+=Sr(i,t,n,u,l)}else if(u=gc(e),typeof u=="function")for(e=u.call(e),a=0;!(i=e.next()).done;)i=i.value,u=r+Nl(i,a++),s+=Sr(i,t,n,u,l);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function sr(e,t,n){if(e==null)return e;var r=[],l=0;return Sr(e,r,"","",function(i){return t.call(n,i,l++)}),r}function xc(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ce={current:null},Cr={transition:null},wc={ReactCurrentDispatcher:ce,ReactCurrentBatchConfig:Cr,ReactCurrentOwner:Wi};function ta(){throw Error("act(...) is not supported in production builds of React.")}R.Children={map:sr,forEach:function(e,t,n){sr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return sr(e,function(){t++}),t},toArray:function(e){return sr(e,function(t){return t})||[]},only:function(e){if(!Hi(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};R.Component=pn;R.Fragment=sc;R.Profiler=uc;R.PureComponent=$i;R.StrictMode=ac;R.Suspense=pc;R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=wc;R.act=ta;R.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Ks({},e.props),l=e.key,i=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,s=Wi.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(u in t)Js.call(t,u)&&!qs.hasOwnProperty(u)&&(r[u]=t[u]===void 0&&a!==void 0?a[u]:t[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){a=Array(u);for(var d=0;d<u;d++)a[d]=arguments[d+2];r.children=a}return{$$typeof:er,type:e.type,key:l,ref:i,props:r,_owner:s}};R.createContext=function(e){return e={$$typeof:dc,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:cc,_context:e},e.Consumer=e};R.createElement=ea;R.createFactory=function(e){var t=ea.bind(null,e);return t.type=e,t};R.createRef=function(){return{current:null}};R.forwardRef=function(e){return{$$typeof:fc,render:e}};R.isValidElement=Hi;R.lazy=function(e){return{$$typeof:hc,_payload:{_status:-1,_result:e},_init:xc}};R.memo=function(e,t){return{$$typeof:mc,type:e,compare:t===void 0?null:t}};R.startTransition=function(e){var t=Cr.transition;Cr.transition={};try{e()}finally{Cr.transition=t}};R.unstable_act=ta;R.useCallback=function(e,t){return ce.current.useCallback(e,t)};R.useContext=function(e){return ce.current.useContext(e)};R.useDebugValue=function(){};R.useDeferredValue=function(e){return ce.current.useDeferredValue(e)};R.useEffect=function(e,t){return ce.current.useEffect(e,t)};R.useId=function(){return ce.current.useId()};R.useImperativeHandle=function(e,t,n){return ce.current.useImperativeHandle(e,t,n)};R.useInsertionEffect=function(e,t){return ce.current.useInsertionEffect(e,t)};R.useLayoutEffect=function(e,t){return ce.current.useLayoutEffect(e,t)};R.useMemo=function(e,t){return ce.current.useMemo(e,t)};R.useReducer=function(e,t,n){return ce.current.useReducer(e,t,n)};R.useRef=function(e){return ce.current.useRef(e)};R.useState=function(e){return ce.current.useState(e)};R.useSyncExternalStore=function(e,t,n){return ce.current.useSyncExternalStore(e,t,n)};R.useTransition=function(){return ce.current.useTransition()};R.version="18.3.1";Ys.exports=R;var F=Ys.exports;const na=ic(F);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kc=F,Nc=Symbol.for("react.element"),jc=Symbol.for("react.fragment"),Sc=Object.prototype.hasOwnProperty,Cc=kc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ec={key:!0,ref:!0,__self:!0,__source:!0};function ra(e,t,n){var r,l={},i=null,s=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(s=t.ref);for(r in t)Sc.call(t,r)&&!Ec.hasOwnProperty(r)&&(l[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)l[r]===void 0&&(l[r]=t[r]);return{$$typeof:Nc,type:e,key:i,ref:s,props:l,_owner:Cc.current}}ol.Fragment=jc;ol.jsx=ra;ol.jsxs=ra;Qs.exports=ol;var o=Qs.exports,Xl={},la={exports:{}},Ne={},ia={exports:{}},oa={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(h,E){var m=h.length;h.push(E);e:for(;0<m;){var C=m-1>>>1,D=h[C];if(0<l(D,E))h[C]=E,h[m]=D,m=C;else break e}}function n(h){return h.length===0?null:h[0]}function r(h){if(h.length===0)return null;var E=h[0],m=h.pop();if(m!==E){h[0]=m;e:for(var C=0,D=h.length,De=D>>>1;C<De;){var se=2*(C+1)-1,Se=h[se],Qe=se+1,or=h[Qe];if(0>l(Se,m))Qe<D&&0>l(or,Se)?(h[C]=or,h[Qe]=m,C=Qe):(h[C]=Se,h[se]=m,C=se);else if(Qe<D&&0>l(or,m))h[C]=or,h[Qe]=m,C=Qe;else break e}}return E}function l(h,E){var m=h.sortIndex-E.sortIndex;return m!==0?m:h.id-E.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var s=Date,a=s.now();e.unstable_now=function(){return s.now()-a}}var u=[],d=[],v=1,y=null,g=3,N=!1,w=!1,j=!1,T=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,c=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function f(h){for(var E=n(d);E!==null;){if(E.callback===null)r(d);else if(E.startTime<=h)r(d),E.sortIndex=E.expirationTime,t(u,E);else break;E=n(d)}}function x(h){if(j=!1,f(h),!w)if(n(u)!==null)w=!0,jt(S);else{var E=n(d);E!==null&&St(x,E.startTime-h)}}function S(h,E){w=!1,j&&(j=!1,p(L),L=-1),N=!0;var m=g;try{for(f(E),y=n(u);y!==null&&(!(y.expirationTime>E)||h&&!ne());){var C=y.callback;if(typeof C=="function"){y.callback=null,g=y.priorityLevel;var D=C(y.expirationTime<=E);E=e.unstable_now(),typeof D=="function"?y.callback=D:y===n(u)&&r(u),f(E)}else r(u);y=n(u)}if(y!==null)var De=!0;else{var se=n(d);se!==null&&St(x,se.startTime-E),De=!1}return De}finally{y=null,g=m,N=!1}}var P=!1,_=null,L=-1,I=5,M=-1;function ne(){return!(e.unstable_now()-M<I)}function He(){if(_!==null){var h=e.unstable_now();M=h;var E=!0;try{E=_(!0,h)}finally{E?ve():(P=!1,_=null)}}else P=!1}var ve;if(typeof c=="function")ve=function(){c(He)};else if(typeof MessageChannel<"u"){var be=new MessageChannel,bt=be.port2;be.port1.onmessage=He,ve=function(){bt.postMessage(null)}}else ve=function(){T(He,0)};function jt(h){_=h,P||(P=!0,ve())}function St(h,E){L=T(function(){h(e.unstable_now())},E)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(h){h.callback=null},e.unstable_continueExecution=function(){w||N||(w=!0,jt(S))},e.unstable_forceFrameRate=function(h){0>h||125<h?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):I=0<h?Math.floor(1e3/h):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return n(u)},e.unstable_next=function(h){switch(g){case 1:case 2:case 3:var E=3;break;default:E=g}var m=g;g=E;try{return h()}finally{g=m}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(h,E){switch(h){case 1:case 2:case 3:case 4:case 5:break;default:h=3}var m=g;g=h;try{return E()}finally{g=m}},e.unstable_scheduleCallback=function(h,E,m){var C=e.unstable_now();switch(typeof m=="object"&&m!==null?(m=m.delay,m=typeof m=="number"&&0<m?C+m:C):m=C,h){case 1:var D=-1;break;case 2:D=250;break;case 5:D=1073741823;break;case 4:D=1e4;break;default:D=5e3}return D=m+D,h={id:v++,callback:E,priorityLevel:h,startTime:m,expirationTime:D,sortIndex:-1},m>C?(h.sortIndex=m,t(d,h),n(u)===null&&h===n(d)&&(j?(p(L),L=-1):j=!0,St(x,m-C))):(h.sortIndex=D,t(u,h),w||N||(w=!0,jt(S))),h},e.unstable_shouldYield=ne,e.unstable_wrapCallback=function(h){var E=g;return function(){var m=g;g=E;try{return h.apply(this,arguments)}finally{g=m}}}})(oa);ia.exports=oa;var zc=ia.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _c=F,ke=zc;function k(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var sa=new Set,In={};function It(e,t){on(e,t),on(e+"Capture",t)}function on(e,t){for(In[e]=t,e=0;e<t.length;e++)sa.add(t[e])}var Je=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Kl=Object.prototype.hasOwnProperty,Pc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Uo={},Bo={};function Lc(e){return Kl.call(Bo,e)?!0:Kl.call(Uo,e)?!1:Pc.test(e)?Bo[e]=!0:(Uo[e]=!0,!1)}function Dc(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Tc(e,t,n,r){if(t===null||typeof t>"u"||Dc(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function de(e,t,n,r,l,i,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=l,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=s}var te={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){te[e]=new de(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];te[t]=new de(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){te[e]=new de(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){te[e]=new de(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){te[e]=new de(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){te[e]=new de(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){te[e]=new de(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){te[e]=new de(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){te[e]=new de(e,5,!1,e.toLowerCase(),null,!1,!1)});var Qi=/[\-:]([a-z])/g;function Yi(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Qi,Yi);te[t]=new de(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Qi,Yi);te[t]=new de(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Qi,Yi);te[t]=new de(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){te[e]=new de(e,1,!1,e.toLowerCase(),null,!1,!1)});te.xlinkHref=new de("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){te[e]=new de(e,1,!1,e.toLowerCase(),null,!0,!0)});function Xi(e,t,n,r){var l=te.hasOwnProperty(t)?te[t]:null;(l!==null?l.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Tc(t,n,l,r)&&(n=null),r||l===null?Lc(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):l.mustUseProperty?e[l.propertyName]=n===null?l.type===3?!1:"":n:(t=l.attributeName,r=l.attributeNamespace,n===null?e.removeAttribute(t):(l=l.type,n=l===3||l===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var nt=_c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ar=Symbol.for("react.element"),Bt=Symbol.for("react.portal"),$t=Symbol.for("react.fragment"),Ki=Symbol.for("react.strict_mode"),Gl=Symbol.for("react.profiler"),aa=Symbol.for("react.provider"),ua=Symbol.for("react.context"),Gi=Symbol.for("react.forward_ref"),Zl=Symbol.for("react.suspense"),Jl=Symbol.for("react.suspense_list"),Zi=Symbol.for("react.memo"),lt=Symbol.for("react.lazy"),ca=Symbol.for("react.offscreen"),$o=Symbol.iterator;function gn(e){return e===null||typeof e!="object"?null:(e=$o&&e[$o]||e["@@iterator"],typeof e=="function"?e:null)}var H=Object.assign,jl;function Sn(e){if(jl===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);jl=t&&t[1]||""}return`
`+jl+e}var Sl=!1;function Cl(e,t){if(!e||Sl)return"";Sl=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(d){var r=d}Reflect.construct(e,[],t)}else{try{t.call()}catch(d){r=d}e.call(t.prototype)}else{try{throw Error()}catch(d){r=d}e()}}catch(d){if(d&&r&&typeof d.stack=="string"){for(var l=d.stack.split(`
`),i=r.stack.split(`
`),s=l.length-1,a=i.length-1;1<=s&&0<=a&&l[s]!==i[a];)a--;for(;1<=s&&0<=a;s--,a--)if(l[s]!==i[a]){if(s!==1||a!==1)do if(s--,a--,0>a||l[s]!==i[a]){var u=`
`+l[s].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=s&&0<=a);break}}}finally{Sl=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Sn(e):""}function Mc(e){switch(e.tag){case 5:return Sn(e.type);case 16:return Sn("Lazy");case 13:return Sn("Suspense");case 19:return Sn("SuspenseList");case 0:case 2:case 15:return e=Cl(e.type,!1),e;case 11:return e=Cl(e.type.render,!1),e;case 1:return e=Cl(e.type,!0),e;default:return""}}function ql(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case $t:return"Fragment";case Bt:return"Portal";case Gl:return"Profiler";case Ki:return"StrictMode";case Zl:return"Suspense";case Jl:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ua:return(e.displayName||"Context")+".Consumer";case aa:return(e._context.displayName||"Context")+".Provider";case Gi:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Zi:return t=e.displayName||null,t!==null?t:ql(e.type)||"Memo";case lt:t=e._payload,e=e._init;try{return ql(e(t))}catch{}}return null}function Fc(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ql(t);case 8:return t===Ki?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function yt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function da(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Rc(e){var t=da(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var l=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(s){r=""+s,i.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(s){r=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ur(e){e._valueTracker||(e._valueTracker=Rc(e))}function fa(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=da(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Or(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ei(e,t){var n=t.checked;return H({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Vo(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=yt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function pa(e,t){t=t.checked,t!=null&&Xi(e,"checked",t,!1)}function ti(e,t){pa(e,t);var n=yt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ni(e,t.type,n):t.hasOwnProperty("defaultValue")&&ni(e,t.type,yt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Wo(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function ni(e,t,n){(t!=="number"||Or(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Cn=Array.isArray;function qt(e,t,n,r){if(e=e.options,t){t={};for(var l=0;l<n.length;l++)t["$"+n[l]]=!0;for(n=0;n<e.length;n++)l=t.hasOwnProperty("$"+e[n].value),e[n].selected!==l&&(e[n].selected=l),l&&r&&(e[n].defaultSelected=!0)}else{for(n=""+yt(n),t=null,l=0;l<e.length;l++){if(e[l].value===n){e[l].selected=!0,r&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function ri(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(k(91));return H({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ho(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(k(92));if(Cn(n)){if(1<n.length)throw Error(k(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:yt(n)}}function ma(e,t){var n=yt(t.value),r=yt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Qo(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function ha(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function li(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?ha(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var cr,ga=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,l){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,l)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(cr=cr||document.createElement("div"),cr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=cr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function An(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var _n={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Oc=["Webkit","ms","Moz","O"];Object.keys(_n).forEach(function(e){Oc.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),_n[t]=_n[e]})});function va(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||_n.hasOwnProperty(e)&&_n[e]?(""+t).trim():t+"px"}function ya(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,l=va(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,l):e[n]=l}}var Ic=H({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ii(e,t){if(t){if(Ic[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(k(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(k(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(k(61))}if(t.style!=null&&typeof t.style!="object")throw Error(k(62))}}function oi(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var si=null;function Ji(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ai=null,en=null,tn=null;function Yo(e){if(e=rr(e)){if(typeof ai!="function")throw Error(k(280));var t=e.stateNode;t&&(t=dl(t),ai(e.stateNode,e.type,t))}}function xa(e){en?tn?tn.push(e):tn=[e]:en=e}function wa(){if(en){var e=en,t=tn;if(tn=en=null,Yo(e),t)for(e=0;e<t.length;e++)Yo(t[e])}}function ka(e,t){return e(t)}function Na(){}var El=!1;function ja(e,t,n){if(El)return e(t,n);El=!0;try{return ka(e,t,n)}finally{El=!1,(en!==null||tn!==null)&&(Na(),wa())}}function bn(e,t){var n=e.stateNode;if(n===null)return null;var r=dl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(k(231,t,typeof n));return n}var ui=!1;if(Je)try{var vn={};Object.defineProperty(vn,"passive",{get:function(){ui=!0}}),window.addEventListener("test",vn,vn),window.removeEventListener("test",vn,vn)}catch{ui=!1}function Ac(e,t,n,r,l,i,s,a,u){var d=Array.prototype.slice.call(arguments,3);try{t.apply(n,d)}catch(v){this.onError(v)}}var Pn=!1,Ir=null,Ar=!1,ci=null,bc={onError:function(e){Pn=!0,Ir=e}};function Uc(e,t,n,r,l,i,s,a,u){Pn=!1,Ir=null,Ac.apply(bc,arguments)}function Bc(e,t,n,r,l,i,s,a,u){if(Uc.apply(this,arguments),Pn){if(Pn){var d=Ir;Pn=!1,Ir=null}else throw Error(k(198));Ar||(Ar=!0,ci=d)}}function At(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Sa(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Xo(e){if(At(e)!==e)throw Error(k(188))}function $c(e){var t=e.alternate;if(!t){if(t=At(e),t===null)throw Error(k(188));return t!==e?null:e}for(var n=e,r=t;;){var l=n.return;if(l===null)break;var i=l.alternate;if(i===null){if(r=l.return,r!==null){n=r;continue}break}if(l.child===i.child){for(i=l.child;i;){if(i===n)return Xo(l),e;if(i===r)return Xo(l),t;i=i.sibling}throw Error(k(188))}if(n.return!==r.return)n=l,r=i;else{for(var s=!1,a=l.child;a;){if(a===n){s=!0,n=l,r=i;break}if(a===r){s=!0,r=l,n=i;break}a=a.sibling}if(!s){for(a=i.child;a;){if(a===n){s=!0,n=i,r=l;break}if(a===r){s=!0,r=i,n=l;break}a=a.sibling}if(!s)throw Error(k(189))}}if(n.alternate!==r)throw Error(k(190))}if(n.tag!==3)throw Error(k(188));return n.stateNode.current===n?e:t}function Ca(e){return e=$c(e),e!==null?Ea(e):null}function Ea(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Ea(e);if(t!==null)return t;e=e.sibling}return null}var za=ke.unstable_scheduleCallback,Ko=ke.unstable_cancelCallback,Vc=ke.unstable_shouldYield,Wc=ke.unstable_requestPaint,Y=ke.unstable_now,Hc=ke.unstable_getCurrentPriorityLevel,qi=ke.unstable_ImmediatePriority,_a=ke.unstable_UserBlockingPriority,br=ke.unstable_NormalPriority,Qc=ke.unstable_LowPriority,Pa=ke.unstable_IdlePriority,sl=null,Ve=null;function Yc(e){if(Ve&&typeof Ve.onCommitFiberRoot=="function")try{Ve.onCommitFiberRoot(sl,e,void 0,(e.current.flags&128)===128)}catch{}}var Oe=Math.clz32?Math.clz32:Gc,Xc=Math.log,Kc=Math.LN2;function Gc(e){return e>>>=0,e===0?32:31-(Xc(e)/Kc|0)|0}var dr=64,fr=4194304;function En(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ur(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,l=e.suspendedLanes,i=e.pingedLanes,s=n&268435455;if(s!==0){var a=s&~l;a!==0?r=En(a):(i&=s,i!==0&&(r=En(i)))}else s=n&~l,s!==0?r=En(s):i!==0&&(r=En(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&l)&&(l=r&-r,i=t&-t,l>=i||l===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Oe(t),l=1<<n,r|=e[n],t&=~l;return r}function Zc(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Jc(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,l=e.expirationTimes,i=e.pendingLanes;0<i;){var s=31-Oe(i),a=1<<s,u=l[s];u===-1?(!(a&n)||a&r)&&(l[s]=Zc(a,t)):u<=t&&(e.expiredLanes|=a),i&=~a}}function di(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function La(){var e=dr;return dr<<=1,!(dr&4194240)&&(dr=64),e}function zl(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function tr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Oe(t),e[t]=n}function qc(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var l=31-Oe(n),i=1<<l;t[l]=0,r[l]=-1,e[l]=-1,n&=~i}}function eo(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Oe(n),l=1<<r;l&t|e[r]&t&&(e[r]|=t),n&=~l}}var A=0;function Da(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Ta,to,Ma,Fa,Ra,fi=!1,pr=[],ct=null,dt=null,ft=null,Un=new Map,Bn=new Map,ot=[],ed="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Go(e,t){switch(e){case"focusin":case"focusout":ct=null;break;case"dragenter":case"dragleave":dt=null;break;case"mouseover":case"mouseout":ft=null;break;case"pointerover":case"pointerout":Un.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Bn.delete(t.pointerId)}}function yn(e,t,n,r,l,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[l]},t!==null&&(t=rr(t),t!==null&&to(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function td(e,t,n,r,l){switch(t){case"focusin":return ct=yn(ct,e,t,n,r,l),!0;case"dragenter":return dt=yn(dt,e,t,n,r,l),!0;case"mouseover":return ft=yn(ft,e,t,n,r,l),!0;case"pointerover":var i=l.pointerId;return Un.set(i,yn(Un.get(i)||null,e,t,n,r,l)),!0;case"gotpointercapture":return i=l.pointerId,Bn.set(i,yn(Bn.get(i)||null,e,t,n,r,l)),!0}return!1}function Oa(e){var t=zt(e.target);if(t!==null){var n=At(t);if(n!==null){if(t=n.tag,t===13){if(t=Sa(n),t!==null){e.blockedOn=t,Ra(e.priority,function(){Ma(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Er(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=pi(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);si=r,n.target.dispatchEvent(r),si=null}else return t=rr(n),t!==null&&to(t),e.blockedOn=n,!1;t.shift()}return!0}function Zo(e,t,n){Er(e)&&n.delete(t)}function nd(){fi=!1,ct!==null&&Er(ct)&&(ct=null),dt!==null&&Er(dt)&&(dt=null),ft!==null&&Er(ft)&&(ft=null),Un.forEach(Zo),Bn.forEach(Zo)}function xn(e,t){e.blockedOn===t&&(e.blockedOn=null,fi||(fi=!0,ke.unstable_scheduleCallback(ke.unstable_NormalPriority,nd)))}function $n(e){function t(l){return xn(l,e)}if(0<pr.length){xn(pr[0],e);for(var n=1;n<pr.length;n++){var r=pr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(ct!==null&&xn(ct,e),dt!==null&&xn(dt,e),ft!==null&&xn(ft,e),Un.forEach(t),Bn.forEach(t),n=0;n<ot.length;n++)r=ot[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<ot.length&&(n=ot[0],n.blockedOn===null);)Oa(n),n.blockedOn===null&&ot.shift()}var nn=nt.ReactCurrentBatchConfig,Br=!0;function rd(e,t,n,r){var l=A,i=nn.transition;nn.transition=null;try{A=1,no(e,t,n,r)}finally{A=l,nn.transition=i}}function ld(e,t,n,r){var l=A,i=nn.transition;nn.transition=null;try{A=4,no(e,t,n,r)}finally{A=l,nn.transition=i}}function no(e,t,n,r){if(Br){var l=pi(e,t,n,r);if(l===null)Il(e,t,r,$r,n),Go(e,r);else if(td(l,e,t,n,r))r.stopPropagation();else if(Go(e,r),t&4&&-1<ed.indexOf(e)){for(;l!==null;){var i=rr(l);if(i!==null&&Ta(i),i=pi(e,t,n,r),i===null&&Il(e,t,r,$r,n),i===l)break;l=i}l!==null&&r.stopPropagation()}else Il(e,t,r,null,n)}}var $r=null;function pi(e,t,n,r){if($r=null,e=Ji(r),e=zt(e),e!==null)if(t=At(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Sa(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return $r=e,null}function Ia(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Hc()){case qi:return 1;case _a:return 4;case br:case Qc:return 16;case Pa:return 536870912;default:return 16}default:return 16}}var at=null,ro=null,zr=null;function Aa(){if(zr)return zr;var e,t=ro,n=t.length,r,l="value"in at?at.value:at.textContent,i=l.length;for(e=0;e<n&&t[e]===l[e];e++);var s=n-e;for(r=1;r<=s&&t[n-r]===l[i-r];r++);return zr=l.slice(e,1<r?1-r:void 0)}function _r(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function mr(){return!0}function Jo(){return!1}function je(e){function t(n,r,l,i,s){this._reactName=n,this._targetInst=l,this.type=r,this.nativeEvent=i,this.target=s,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(i):i[a]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?mr:Jo,this.isPropagationStopped=Jo,this}return H(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=mr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=mr)},persist:function(){},isPersistent:mr}),t}var mn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},lo=je(mn),nr=H({},mn,{view:0,detail:0}),id=je(nr),_l,Pl,wn,al=H({},nr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:io,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==wn&&(wn&&e.type==="mousemove"?(_l=e.screenX-wn.screenX,Pl=e.screenY-wn.screenY):Pl=_l=0,wn=e),_l)},movementY:function(e){return"movementY"in e?e.movementY:Pl}}),qo=je(al),od=H({},al,{dataTransfer:0}),sd=je(od),ad=H({},nr,{relatedTarget:0}),Ll=je(ad),ud=H({},mn,{animationName:0,elapsedTime:0,pseudoElement:0}),cd=je(ud),dd=H({},mn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),fd=je(dd),pd=H({},mn,{data:0}),es=je(pd),md={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},hd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},gd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function vd(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=gd[e])?!!t[e]:!1}function io(){return vd}var yd=H({},nr,{key:function(e){if(e.key){var t=md[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=_r(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?hd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:io,charCode:function(e){return e.type==="keypress"?_r(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?_r(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),xd=je(yd),wd=H({},al,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ts=je(wd),kd=H({},nr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:io}),Nd=je(kd),jd=H({},mn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Sd=je(jd),Cd=H({},al,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Ed=je(Cd),zd=[9,13,27,32],oo=Je&&"CompositionEvent"in window,Ln=null;Je&&"documentMode"in document&&(Ln=document.documentMode);var _d=Je&&"TextEvent"in window&&!Ln,ba=Je&&(!oo||Ln&&8<Ln&&11>=Ln),ns=" ",rs=!1;function Ua(e,t){switch(e){case"keyup":return zd.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ba(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Vt=!1;function Pd(e,t){switch(e){case"compositionend":return Ba(t);case"keypress":return t.which!==32?null:(rs=!0,ns);case"textInput":return e=t.data,e===ns&&rs?null:e;default:return null}}function Ld(e,t){if(Vt)return e==="compositionend"||!oo&&Ua(e,t)?(e=Aa(),zr=ro=at=null,Vt=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ba&&t.locale!=="ko"?null:t.data;default:return null}}var Dd={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ls(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Dd[e.type]:t==="textarea"}function $a(e,t,n,r){xa(r),t=Vr(t,"onChange"),0<t.length&&(n=new lo("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Dn=null,Vn=null;function Td(e){qa(e,0)}function ul(e){var t=Qt(e);if(fa(t))return e}function Md(e,t){if(e==="change")return t}var Va=!1;if(Je){var Dl;if(Je){var Tl="oninput"in document;if(!Tl){var is=document.createElement("div");is.setAttribute("oninput","return;"),Tl=typeof is.oninput=="function"}Dl=Tl}else Dl=!1;Va=Dl&&(!document.documentMode||9<document.documentMode)}function os(){Dn&&(Dn.detachEvent("onpropertychange",Wa),Vn=Dn=null)}function Wa(e){if(e.propertyName==="value"&&ul(Vn)){var t=[];$a(t,Vn,e,Ji(e)),ja(Td,t)}}function Fd(e,t,n){e==="focusin"?(os(),Dn=t,Vn=n,Dn.attachEvent("onpropertychange",Wa)):e==="focusout"&&os()}function Rd(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ul(Vn)}function Od(e,t){if(e==="click")return ul(t)}function Id(e,t){if(e==="input"||e==="change")return ul(t)}function Ad(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ae=typeof Object.is=="function"?Object.is:Ad;function Wn(e,t){if(Ae(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var l=n[r];if(!Kl.call(t,l)||!Ae(e[l],t[l]))return!1}return!0}function ss(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function as(e,t){var n=ss(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ss(n)}}function Ha(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ha(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Qa(){for(var e=window,t=Or();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Or(e.document)}return t}function so(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function bd(e){var t=Qa(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Ha(n.ownerDocument.documentElement,n)){if(r!==null&&so(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=n.textContent.length,i=Math.min(r.start,l);r=r.end===void 0?i:Math.min(r.end,l),!e.extend&&i>r&&(l=r,r=i,i=l),l=as(n,i);var s=as(n,r);l&&s&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Ud=Je&&"documentMode"in document&&11>=document.documentMode,Wt=null,mi=null,Tn=null,hi=!1;function us(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;hi||Wt==null||Wt!==Or(r)||(r=Wt,"selectionStart"in r&&so(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Tn&&Wn(Tn,r)||(Tn=r,r=Vr(mi,"onSelect"),0<r.length&&(t=new lo("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Wt)))}function hr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Ht={animationend:hr("Animation","AnimationEnd"),animationiteration:hr("Animation","AnimationIteration"),animationstart:hr("Animation","AnimationStart"),transitionend:hr("Transition","TransitionEnd")},Ml={},Ya={};Je&&(Ya=document.createElement("div").style,"AnimationEvent"in window||(delete Ht.animationend.animation,delete Ht.animationiteration.animation,delete Ht.animationstart.animation),"TransitionEvent"in window||delete Ht.transitionend.transition);function cl(e){if(Ml[e])return Ml[e];if(!Ht[e])return e;var t=Ht[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Ya)return Ml[e]=t[n];return e}var Xa=cl("animationend"),Ka=cl("animationiteration"),Ga=cl("animationstart"),Za=cl("transitionend"),Ja=new Map,cs="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function wt(e,t){Ja.set(e,t),It(t,[e])}for(var Fl=0;Fl<cs.length;Fl++){var Rl=cs[Fl],Bd=Rl.toLowerCase(),$d=Rl[0].toUpperCase()+Rl.slice(1);wt(Bd,"on"+$d)}wt(Xa,"onAnimationEnd");wt(Ka,"onAnimationIteration");wt(Ga,"onAnimationStart");wt("dblclick","onDoubleClick");wt("focusin","onFocus");wt("focusout","onBlur");wt(Za,"onTransitionEnd");on("onMouseEnter",["mouseout","mouseover"]);on("onMouseLeave",["mouseout","mouseover"]);on("onPointerEnter",["pointerout","pointerover"]);on("onPointerLeave",["pointerout","pointerover"]);It("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));It("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));It("onBeforeInput",["compositionend","keypress","textInput","paste"]);It("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));It("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));It("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var zn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Vd=new Set("cancel close invalid load scroll toggle".split(" ").concat(zn));function ds(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Bc(r,t,void 0,e),e.currentTarget=null}function qa(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],l=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var s=r.length-1;0<=s;s--){var a=r[s],u=a.instance,d=a.currentTarget;if(a=a.listener,u!==i&&l.isPropagationStopped())break e;ds(l,a,d),i=u}else for(s=0;s<r.length;s++){if(a=r[s],u=a.instance,d=a.currentTarget,a=a.listener,u!==i&&l.isPropagationStopped())break e;ds(l,a,d),i=u}}}if(Ar)throw e=ci,Ar=!1,ci=null,e}function U(e,t){var n=t[wi];n===void 0&&(n=t[wi]=new Set);var r=e+"__bubble";n.has(r)||(eu(t,e,2,!1),n.add(r))}function Ol(e,t,n){var r=0;t&&(r|=4),eu(n,e,r,t)}var gr="_reactListening"+Math.random().toString(36).slice(2);function Hn(e){if(!e[gr]){e[gr]=!0,sa.forEach(function(n){n!=="selectionchange"&&(Vd.has(n)||Ol(n,!1,e),Ol(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[gr]||(t[gr]=!0,Ol("selectionchange",!1,t))}}function eu(e,t,n,r){switch(Ia(t)){case 1:var l=rd;break;case 4:l=ld;break;default:l=no}n=l.bind(null,t,n,e),l=void 0,!ui||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),r?l!==void 0?e.addEventListener(t,n,{capture:!0,passive:l}):e.addEventListener(t,n,!0):l!==void 0?e.addEventListener(t,n,{passive:l}):e.addEventListener(t,n,!1)}function Il(e,t,n,r,l){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var a=r.stateNode.containerInfo;if(a===l||a.nodeType===8&&a.parentNode===l)break;if(s===4)for(s=r.return;s!==null;){var u=s.tag;if((u===3||u===4)&&(u=s.stateNode.containerInfo,u===l||u.nodeType===8&&u.parentNode===l))return;s=s.return}for(;a!==null;){if(s=zt(a),s===null)return;if(u=s.tag,u===5||u===6){r=i=s;continue e}a=a.parentNode}}r=r.return}ja(function(){var d=i,v=Ji(n),y=[];e:{var g=Ja.get(e);if(g!==void 0){var N=lo,w=e;switch(e){case"keypress":if(_r(n)===0)break e;case"keydown":case"keyup":N=xd;break;case"focusin":w="focus",N=Ll;break;case"focusout":w="blur",N=Ll;break;case"beforeblur":case"afterblur":N=Ll;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":N=qo;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":N=sd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":N=Nd;break;case Xa:case Ka:case Ga:N=cd;break;case Za:N=Sd;break;case"scroll":N=id;break;case"wheel":N=Ed;break;case"copy":case"cut":case"paste":N=fd;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":N=ts}var j=(t&4)!==0,T=!j&&e==="scroll",p=j?g!==null?g+"Capture":null:g;j=[];for(var c=d,f;c!==null;){f=c;var x=f.stateNode;if(f.tag===5&&x!==null&&(f=x,p!==null&&(x=bn(c,p),x!=null&&j.push(Qn(c,x,f)))),T)break;c=c.return}0<j.length&&(g=new N(g,w,null,n,v),y.push({event:g,listeners:j}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",N=e==="mouseout"||e==="pointerout",g&&n!==si&&(w=n.relatedTarget||n.fromElement)&&(zt(w)||w[qe]))break e;if((N||g)&&(g=v.window===v?v:(g=v.ownerDocument)?g.defaultView||g.parentWindow:window,N?(w=n.relatedTarget||n.toElement,N=d,w=w?zt(w):null,w!==null&&(T=At(w),w!==T||w.tag!==5&&w.tag!==6)&&(w=null)):(N=null,w=d),N!==w)){if(j=qo,x="onMouseLeave",p="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(j=ts,x="onPointerLeave",p="onPointerEnter",c="pointer"),T=N==null?g:Qt(N),f=w==null?g:Qt(w),g=new j(x,c+"leave",N,n,v),g.target=T,g.relatedTarget=f,x=null,zt(v)===d&&(j=new j(p,c+"enter",w,n,v),j.target=f,j.relatedTarget=T,x=j),T=x,N&&w)t:{for(j=N,p=w,c=0,f=j;f;f=Ut(f))c++;for(f=0,x=p;x;x=Ut(x))f++;for(;0<c-f;)j=Ut(j),c--;for(;0<f-c;)p=Ut(p),f--;for(;c--;){if(j===p||p!==null&&j===p.alternate)break t;j=Ut(j),p=Ut(p)}j=null}else j=null;N!==null&&fs(y,g,N,j,!1),w!==null&&T!==null&&fs(y,T,w,j,!0)}}e:{if(g=d?Qt(d):window,N=g.nodeName&&g.nodeName.toLowerCase(),N==="select"||N==="input"&&g.type==="file")var S=Md;else if(ls(g))if(Va)S=Id;else{S=Rd;var P=Fd}else(N=g.nodeName)&&N.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(S=Od);if(S&&(S=S(e,d))){$a(y,S,n,v);break e}P&&P(e,g,d),e==="focusout"&&(P=g._wrapperState)&&P.controlled&&g.type==="number"&&ni(g,"number",g.value)}switch(P=d?Qt(d):window,e){case"focusin":(ls(P)||P.contentEditable==="true")&&(Wt=P,mi=d,Tn=null);break;case"focusout":Tn=mi=Wt=null;break;case"mousedown":hi=!0;break;case"contextmenu":case"mouseup":case"dragend":hi=!1,us(y,n,v);break;case"selectionchange":if(Ud)break;case"keydown":case"keyup":us(y,n,v)}var _;if(oo)e:{switch(e){case"compositionstart":var L="onCompositionStart";break e;case"compositionend":L="onCompositionEnd";break e;case"compositionupdate":L="onCompositionUpdate";break e}L=void 0}else Vt?Ua(e,n)&&(L="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(L="onCompositionStart");L&&(ba&&n.locale!=="ko"&&(Vt||L!=="onCompositionStart"?L==="onCompositionEnd"&&Vt&&(_=Aa()):(at=v,ro="value"in at?at.value:at.textContent,Vt=!0)),P=Vr(d,L),0<P.length&&(L=new es(L,e,null,n,v),y.push({event:L,listeners:P}),_?L.data=_:(_=Ba(n),_!==null&&(L.data=_)))),(_=_d?Pd(e,n):Ld(e,n))&&(d=Vr(d,"onBeforeInput"),0<d.length&&(v=new es("onBeforeInput","beforeinput",null,n,v),y.push({event:v,listeners:d}),v.data=_))}qa(y,t)})}function Qn(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Vr(e,t){for(var n=t+"Capture",r=[];e!==null;){var l=e,i=l.stateNode;l.tag===5&&i!==null&&(l=i,i=bn(e,n),i!=null&&r.unshift(Qn(e,i,l)),i=bn(e,t),i!=null&&r.push(Qn(e,i,l))),e=e.return}return r}function Ut(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function fs(e,t,n,r,l){for(var i=t._reactName,s=[];n!==null&&n!==r;){var a=n,u=a.alternate,d=a.stateNode;if(u!==null&&u===r)break;a.tag===5&&d!==null&&(a=d,l?(u=bn(n,i),u!=null&&s.unshift(Qn(n,u,a))):l||(u=bn(n,i),u!=null&&s.push(Qn(n,u,a)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var Wd=/\r\n?/g,Hd=/\u0000|\uFFFD/g;function ps(e){return(typeof e=="string"?e:""+e).replace(Wd,`
`).replace(Hd,"")}function vr(e,t,n){if(t=ps(t),ps(e)!==t&&n)throw Error(k(425))}function Wr(){}var gi=null,vi=null;function yi(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var xi=typeof setTimeout=="function"?setTimeout:void 0,Qd=typeof clearTimeout=="function"?clearTimeout:void 0,ms=typeof Promise=="function"?Promise:void 0,Yd=typeof queueMicrotask=="function"?queueMicrotask:typeof ms<"u"?function(e){return ms.resolve(null).then(e).catch(Xd)}:xi;function Xd(e){setTimeout(function(){throw e})}function Al(e,t){var n=t,r=0;do{var l=n.nextSibling;if(e.removeChild(n),l&&l.nodeType===8)if(n=l.data,n==="/$"){if(r===0){e.removeChild(l),$n(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=l}while(n);$n(t)}function pt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function hs(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var hn=Math.random().toString(36).slice(2),$e="__reactFiber$"+hn,Yn="__reactProps$"+hn,qe="__reactContainer$"+hn,wi="__reactEvents$"+hn,Kd="__reactListeners$"+hn,Gd="__reactHandles$"+hn;function zt(e){var t=e[$e];if(t)return t;for(var n=e.parentNode;n;){if(t=n[qe]||n[$e]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=hs(e);e!==null;){if(n=e[$e])return n;e=hs(e)}return t}e=n,n=e.parentNode}return null}function rr(e){return e=e[$e]||e[qe],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Qt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(k(33))}function dl(e){return e[Yn]||null}var ki=[],Yt=-1;function kt(e){return{current:e}}function B(e){0>Yt||(e.current=ki[Yt],ki[Yt]=null,Yt--)}function b(e,t){Yt++,ki[Yt]=e.current,e.current=t}var xt={},oe=kt(xt),me=kt(!1),Tt=xt;function sn(e,t){var n=e.type.contextTypes;if(!n)return xt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var l={},i;for(i in n)l[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function he(e){return e=e.childContextTypes,e!=null}function Hr(){B(me),B(oe)}function gs(e,t,n){if(oe.current!==xt)throw Error(k(168));b(oe,t),b(me,n)}function tu(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var l in r)if(!(l in t))throw Error(k(108,Fc(e)||"Unknown",l));return H({},n,r)}function Qr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||xt,Tt=oe.current,b(oe,e),b(me,me.current),!0}function vs(e,t,n){var r=e.stateNode;if(!r)throw Error(k(169));n?(e=tu(e,t,Tt),r.__reactInternalMemoizedMergedChildContext=e,B(me),B(oe),b(oe,e)):B(me),b(me,n)}var Xe=null,fl=!1,bl=!1;function nu(e){Xe===null?Xe=[e]:Xe.push(e)}function Zd(e){fl=!0,nu(e)}function Nt(){if(!bl&&Xe!==null){bl=!0;var e=0,t=A;try{var n=Xe;for(A=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Xe=null,fl=!1}catch(l){throw Xe!==null&&(Xe=Xe.slice(e+1)),za(qi,Nt),l}finally{A=t,bl=!1}}return null}var Xt=[],Kt=0,Yr=null,Xr=0,Ce=[],Ee=0,Mt=null,Ke=1,Ge="";function Ct(e,t){Xt[Kt++]=Xr,Xt[Kt++]=Yr,Yr=e,Xr=t}function ru(e,t,n){Ce[Ee++]=Ke,Ce[Ee++]=Ge,Ce[Ee++]=Mt,Mt=e;var r=Ke;e=Ge;var l=32-Oe(r)-1;r&=~(1<<l),n+=1;var i=32-Oe(t)+l;if(30<i){var s=l-l%5;i=(r&(1<<s)-1).toString(32),r>>=s,l-=s,Ke=1<<32-Oe(t)+l|n<<l|r,Ge=i+e}else Ke=1<<i|n<<l|r,Ge=e}function ao(e){e.return!==null&&(Ct(e,1),ru(e,1,0))}function uo(e){for(;e===Yr;)Yr=Xt[--Kt],Xt[Kt]=null,Xr=Xt[--Kt],Xt[Kt]=null;for(;e===Mt;)Mt=Ce[--Ee],Ce[Ee]=null,Ge=Ce[--Ee],Ce[Ee]=null,Ke=Ce[--Ee],Ce[Ee]=null}var we=null,xe=null,$=!1,Re=null;function lu(e,t){var n=ze(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function ys(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,we=e,xe=pt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,we=e,xe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Mt!==null?{id:Ke,overflow:Ge}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=ze(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,we=e,xe=null,!0):!1;default:return!1}}function Ni(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ji(e){if($){var t=xe;if(t){var n=t;if(!ys(e,t)){if(Ni(e))throw Error(k(418));t=pt(n.nextSibling);var r=we;t&&ys(e,t)?lu(r,n):(e.flags=e.flags&-4097|2,$=!1,we=e)}}else{if(Ni(e))throw Error(k(418));e.flags=e.flags&-4097|2,$=!1,we=e}}}function xs(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;we=e}function yr(e){if(e!==we)return!1;if(!$)return xs(e),$=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!yi(e.type,e.memoizedProps)),t&&(t=xe)){if(Ni(e))throw iu(),Error(k(418));for(;t;)lu(e,t),t=pt(t.nextSibling)}if(xs(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(k(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){xe=pt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}xe=null}}else xe=we?pt(e.stateNode.nextSibling):null;return!0}function iu(){for(var e=xe;e;)e=pt(e.nextSibling)}function an(){xe=we=null,$=!1}function co(e){Re===null?Re=[e]:Re.push(e)}var Jd=nt.ReactCurrentBatchConfig;function kn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(k(309));var r=n.stateNode}if(!r)throw Error(k(147,e));var l=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(s){var a=l.refs;s===null?delete a[i]:a[i]=s},t._stringRef=i,t)}if(typeof e!="string")throw Error(k(284));if(!n._owner)throw Error(k(290,e))}return e}function xr(e,t){throw e=Object.prototype.toString.call(t),Error(k(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function ws(e){var t=e._init;return t(e._payload)}function ou(e){function t(p,c){if(e){var f=p.deletions;f===null?(p.deletions=[c],p.flags|=16):f.push(c)}}function n(p,c){if(!e)return null;for(;c!==null;)t(p,c),c=c.sibling;return null}function r(p,c){for(p=new Map;c!==null;)c.key!==null?p.set(c.key,c):p.set(c.index,c),c=c.sibling;return p}function l(p,c){return p=vt(p,c),p.index=0,p.sibling=null,p}function i(p,c,f){return p.index=f,e?(f=p.alternate,f!==null?(f=f.index,f<c?(p.flags|=2,c):f):(p.flags|=2,c)):(p.flags|=1048576,c)}function s(p){return e&&p.alternate===null&&(p.flags|=2),p}function a(p,c,f,x){return c===null||c.tag!==6?(c=Ql(f,p.mode,x),c.return=p,c):(c=l(c,f),c.return=p,c)}function u(p,c,f,x){var S=f.type;return S===$t?v(p,c,f.props.children,x,f.key):c!==null&&(c.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===lt&&ws(S)===c.type)?(x=l(c,f.props),x.ref=kn(p,c,f),x.return=p,x):(x=Rr(f.type,f.key,f.props,null,p.mode,x),x.ref=kn(p,c,f),x.return=p,x)}function d(p,c,f,x){return c===null||c.tag!==4||c.stateNode.containerInfo!==f.containerInfo||c.stateNode.implementation!==f.implementation?(c=Yl(f,p.mode,x),c.return=p,c):(c=l(c,f.children||[]),c.return=p,c)}function v(p,c,f,x,S){return c===null||c.tag!==7?(c=Dt(f,p.mode,x,S),c.return=p,c):(c=l(c,f),c.return=p,c)}function y(p,c,f){if(typeof c=="string"&&c!==""||typeof c=="number")return c=Ql(""+c,p.mode,f),c.return=p,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case ar:return f=Rr(c.type,c.key,c.props,null,p.mode,f),f.ref=kn(p,null,c),f.return=p,f;case Bt:return c=Yl(c,p.mode,f),c.return=p,c;case lt:var x=c._init;return y(p,x(c._payload),f)}if(Cn(c)||gn(c))return c=Dt(c,p.mode,f,null),c.return=p,c;xr(p,c)}return null}function g(p,c,f,x){var S=c!==null?c.key:null;if(typeof f=="string"&&f!==""||typeof f=="number")return S!==null?null:a(p,c,""+f,x);if(typeof f=="object"&&f!==null){switch(f.$$typeof){case ar:return f.key===S?u(p,c,f,x):null;case Bt:return f.key===S?d(p,c,f,x):null;case lt:return S=f._init,g(p,c,S(f._payload),x)}if(Cn(f)||gn(f))return S!==null?null:v(p,c,f,x,null);xr(p,f)}return null}function N(p,c,f,x,S){if(typeof x=="string"&&x!==""||typeof x=="number")return p=p.get(f)||null,a(c,p,""+x,S);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case ar:return p=p.get(x.key===null?f:x.key)||null,u(c,p,x,S);case Bt:return p=p.get(x.key===null?f:x.key)||null,d(c,p,x,S);case lt:var P=x._init;return N(p,c,f,P(x._payload),S)}if(Cn(x)||gn(x))return p=p.get(f)||null,v(c,p,x,S,null);xr(c,x)}return null}function w(p,c,f,x){for(var S=null,P=null,_=c,L=c=0,I=null;_!==null&&L<f.length;L++){_.index>L?(I=_,_=null):I=_.sibling;var M=g(p,_,f[L],x);if(M===null){_===null&&(_=I);break}e&&_&&M.alternate===null&&t(p,_),c=i(M,c,L),P===null?S=M:P.sibling=M,P=M,_=I}if(L===f.length)return n(p,_),$&&Ct(p,L),S;if(_===null){for(;L<f.length;L++)_=y(p,f[L],x),_!==null&&(c=i(_,c,L),P===null?S=_:P.sibling=_,P=_);return $&&Ct(p,L),S}for(_=r(p,_);L<f.length;L++)I=N(_,p,L,f[L],x),I!==null&&(e&&I.alternate!==null&&_.delete(I.key===null?L:I.key),c=i(I,c,L),P===null?S=I:P.sibling=I,P=I);return e&&_.forEach(function(ne){return t(p,ne)}),$&&Ct(p,L),S}function j(p,c,f,x){var S=gn(f);if(typeof S!="function")throw Error(k(150));if(f=S.call(f),f==null)throw Error(k(151));for(var P=S=null,_=c,L=c=0,I=null,M=f.next();_!==null&&!M.done;L++,M=f.next()){_.index>L?(I=_,_=null):I=_.sibling;var ne=g(p,_,M.value,x);if(ne===null){_===null&&(_=I);break}e&&_&&ne.alternate===null&&t(p,_),c=i(ne,c,L),P===null?S=ne:P.sibling=ne,P=ne,_=I}if(M.done)return n(p,_),$&&Ct(p,L),S;if(_===null){for(;!M.done;L++,M=f.next())M=y(p,M.value,x),M!==null&&(c=i(M,c,L),P===null?S=M:P.sibling=M,P=M);return $&&Ct(p,L),S}for(_=r(p,_);!M.done;L++,M=f.next())M=N(_,p,L,M.value,x),M!==null&&(e&&M.alternate!==null&&_.delete(M.key===null?L:M.key),c=i(M,c,L),P===null?S=M:P.sibling=M,P=M);return e&&_.forEach(function(He){return t(p,He)}),$&&Ct(p,L),S}function T(p,c,f,x){if(typeof f=="object"&&f!==null&&f.type===$t&&f.key===null&&(f=f.props.children),typeof f=="object"&&f!==null){switch(f.$$typeof){case ar:e:{for(var S=f.key,P=c;P!==null;){if(P.key===S){if(S=f.type,S===$t){if(P.tag===7){n(p,P.sibling),c=l(P,f.props.children),c.return=p,p=c;break e}}else if(P.elementType===S||typeof S=="object"&&S!==null&&S.$$typeof===lt&&ws(S)===P.type){n(p,P.sibling),c=l(P,f.props),c.ref=kn(p,P,f),c.return=p,p=c;break e}n(p,P);break}else t(p,P);P=P.sibling}f.type===$t?(c=Dt(f.props.children,p.mode,x,f.key),c.return=p,p=c):(x=Rr(f.type,f.key,f.props,null,p.mode,x),x.ref=kn(p,c,f),x.return=p,p=x)}return s(p);case Bt:e:{for(P=f.key;c!==null;){if(c.key===P)if(c.tag===4&&c.stateNode.containerInfo===f.containerInfo&&c.stateNode.implementation===f.implementation){n(p,c.sibling),c=l(c,f.children||[]),c.return=p,p=c;break e}else{n(p,c);break}else t(p,c);c=c.sibling}c=Yl(f,p.mode,x),c.return=p,p=c}return s(p);case lt:return P=f._init,T(p,c,P(f._payload),x)}if(Cn(f))return w(p,c,f,x);if(gn(f))return j(p,c,f,x);xr(p,f)}return typeof f=="string"&&f!==""||typeof f=="number"?(f=""+f,c!==null&&c.tag===6?(n(p,c.sibling),c=l(c,f),c.return=p,p=c):(n(p,c),c=Ql(f,p.mode,x),c.return=p,p=c),s(p)):n(p,c)}return T}var un=ou(!0),su=ou(!1),Kr=kt(null),Gr=null,Gt=null,fo=null;function po(){fo=Gt=Gr=null}function mo(e){var t=Kr.current;B(Kr),e._currentValue=t}function Si(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function rn(e,t){Gr=e,fo=Gt=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(pe=!0),e.firstContext=null)}function Pe(e){var t=e._currentValue;if(fo!==e)if(e={context:e,memoizedValue:t,next:null},Gt===null){if(Gr===null)throw Error(k(308));Gt=e,Gr.dependencies={lanes:0,firstContext:e}}else Gt=Gt.next=e;return t}var _t=null;function ho(e){_t===null?_t=[e]:_t.push(e)}function au(e,t,n,r){var l=t.interleaved;return l===null?(n.next=n,ho(t)):(n.next=l.next,l.next=n),t.interleaved=n,et(e,r)}function et(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var it=!1;function go(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function uu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ze(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function mt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,O&2){var l=r.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),r.pending=t,et(e,n)}return l=r.interleaved,l===null?(t.next=t,ho(r)):(t.next=l.next,l.next=t),r.interleaved=t,et(e,n)}function Pr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,eo(e,n)}}function ks(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var l=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?l=i=s:i=i.next=s,n=n.next}while(n!==null);i===null?l=i=t:i=i.next=t}else l=i=t;n={baseState:r.baseState,firstBaseUpdate:l,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Zr(e,t,n,r){var l=e.updateQueue;it=!1;var i=l.firstBaseUpdate,s=l.lastBaseUpdate,a=l.shared.pending;if(a!==null){l.shared.pending=null;var u=a,d=u.next;u.next=null,s===null?i=d:s.next=d,s=u;var v=e.alternate;v!==null&&(v=v.updateQueue,a=v.lastBaseUpdate,a!==s&&(a===null?v.firstBaseUpdate=d:a.next=d,v.lastBaseUpdate=u))}if(i!==null){var y=l.baseState;s=0,v=d=u=null,a=i;do{var g=a.lane,N=a.eventTime;if((r&g)===g){v!==null&&(v=v.next={eventTime:N,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var w=e,j=a;switch(g=t,N=n,j.tag){case 1:if(w=j.payload,typeof w=="function"){y=w.call(N,y,g);break e}y=w;break e;case 3:w.flags=w.flags&-65537|128;case 0:if(w=j.payload,g=typeof w=="function"?w.call(N,y,g):w,g==null)break e;y=H({},y,g);break e;case 2:it=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,g=l.effects,g===null?l.effects=[a]:g.push(a))}else N={eventTime:N,lane:g,tag:a.tag,payload:a.payload,callback:a.callback,next:null},v===null?(d=v=N,u=y):v=v.next=N,s|=g;if(a=a.next,a===null){if(a=l.shared.pending,a===null)break;g=a,a=g.next,g.next=null,l.lastBaseUpdate=g,l.shared.pending=null}}while(!0);if(v===null&&(u=y),l.baseState=u,l.firstBaseUpdate=d,l.lastBaseUpdate=v,t=l.shared.interleaved,t!==null){l=t;do s|=l.lane,l=l.next;while(l!==t)}else i===null&&(l.shared.lanes=0);Rt|=s,e.lanes=s,e.memoizedState=y}}function Ns(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],l=r.callback;if(l!==null){if(r.callback=null,r=n,typeof l!="function")throw Error(k(191,l));l.call(r)}}}var lr={},We=kt(lr),Xn=kt(lr),Kn=kt(lr);function Pt(e){if(e===lr)throw Error(k(174));return e}function vo(e,t){switch(b(Kn,t),b(Xn,e),b(We,lr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:li(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=li(t,e)}B(We),b(We,t)}function cn(){B(We),B(Xn),B(Kn)}function cu(e){Pt(Kn.current);var t=Pt(We.current),n=li(t,e.type);t!==n&&(b(Xn,e),b(We,n))}function yo(e){Xn.current===e&&(B(We),B(Xn))}var V=kt(0);function Jr(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ul=[];function xo(){for(var e=0;e<Ul.length;e++)Ul[e]._workInProgressVersionPrimary=null;Ul.length=0}var Lr=nt.ReactCurrentDispatcher,Bl=nt.ReactCurrentBatchConfig,Ft=0,W=null,K=null,Z=null,qr=!1,Mn=!1,Gn=0,qd=0;function re(){throw Error(k(321))}function wo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ae(e[n],t[n]))return!1;return!0}function ko(e,t,n,r,l,i){if(Ft=i,W=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Lr.current=e===null||e.memoizedState===null?rf:lf,e=n(r,l),Mn){i=0;do{if(Mn=!1,Gn=0,25<=i)throw Error(k(301));i+=1,Z=K=null,t.updateQueue=null,Lr.current=of,e=n(r,l)}while(Mn)}if(Lr.current=el,t=K!==null&&K.next!==null,Ft=0,Z=K=W=null,qr=!1,t)throw Error(k(300));return e}function No(){var e=Gn!==0;return Gn=0,e}function Be(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Z===null?W.memoizedState=Z=e:Z=Z.next=e,Z}function Le(){if(K===null){var e=W.alternate;e=e!==null?e.memoizedState:null}else e=K.next;var t=Z===null?W.memoizedState:Z.next;if(t!==null)Z=t,K=e;else{if(e===null)throw Error(k(310));K=e,e={memoizedState:K.memoizedState,baseState:K.baseState,baseQueue:K.baseQueue,queue:K.queue,next:null},Z===null?W.memoizedState=Z=e:Z=Z.next=e}return Z}function Zn(e,t){return typeof t=="function"?t(e):t}function $l(e){var t=Le(),n=t.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var r=K,l=r.baseQueue,i=n.pending;if(i!==null){if(l!==null){var s=l.next;l.next=i.next,i.next=s}r.baseQueue=l=i,n.pending=null}if(l!==null){i=l.next,r=r.baseState;var a=s=null,u=null,d=i;do{var v=d.lane;if((Ft&v)===v)u!==null&&(u=u.next={lane:0,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null}),r=d.hasEagerState?d.eagerState:e(r,d.action);else{var y={lane:v,action:d.action,hasEagerState:d.hasEagerState,eagerState:d.eagerState,next:null};u===null?(a=u=y,s=r):u=u.next=y,W.lanes|=v,Rt|=v}d=d.next}while(d!==null&&d!==i);u===null?s=r:u.next=a,Ae(r,t.memoizedState)||(pe=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){l=e;do i=l.lane,W.lanes|=i,Rt|=i,l=l.next;while(l!==e)}else l===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Vl(e){var t=Le(),n=t.queue;if(n===null)throw Error(k(311));n.lastRenderedReducer=e;var r=n.dispatch,l=n.pending,i=t.memoizedState;if(l!==null){n.pending=null;var s=l=l.next;do i=e(i,s.action),s=s.next;while(s!==l);Ae(i,t.memoizedState)||(pe=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function du(){}function fu(e,t){var n=W,r=Le(),l=t(),i=!Ae(r.memoizedState,l);if(i&&(r.memoizedState=l,pe=!0),r=r.queue,jo(hu.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||Z!==null&&Z.memoizedState.tag&1){if(n.flags|=2048,Jn(9,mu.bind(null,n,r,l,t),void 0,null),J===null)throw Error(k(349));Ft&30||pu(n,t,l)}return l}function pu(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=W.updateQueue,t===null?(t={lastEffect:null,stores:null},W.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function mu(e,t,n,r){t.value=n,t.getSnapshot=r,gu(t)&&vu(e)}function hu(e,t,n){return n(function(){gu(t)&&vu(e)})}function gu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ae(e,n)}catch{return!0}}function vu(e){var t=et(e,1);t!==null&&Ie(t,e,1,-1)}function js(e){var t=Be();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Zn,lastRenderedState:e},t.queue=e,e=e.dispatch=nf.bind(null,W,e),[t.memoizedState,e]}function Jn(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=W.updateQueue,t===null?(t={lastEffect:null,stores:null},W.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function yu(){return Le().memoizedState}function Dr(e,t,n,r){var l=Be();W.flags|=e,l.memoizedState=Jn(1|t,n,void 0,r===void 0?null:r)}function pl(e,t,n,r){var l=Le();r=r===void 0?null:r;var i=void 0;if(K!==null){var s=K.memoizedState;if(i=s.destroy,r!==null&&wo(r,s.deps)){l.memoizedState=Jn(t,n,i,r);return}}W.flags|=e,l.memoizedState=Jn(1|t,n,i,r)}function Ss(e,t){return Dr(8390656,8,e,t)}function jo(e,t){return pl(2048,8,e,t)}function xu(e,t){return pl(4,2,e,t)}function wu(e,t){return pl(4,4,e,t)}function ku(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Nu(e,t,n){return n=n!=null?n.concat([e]):null,pl(4,4,ku.bind(null,t,e),n)}function So(){}function ju(e,t){var n=Le();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&wo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Su(e,t){var n=Le();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&wo(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Cu(e,t,n){return Ft&21?(Ae(n,t)||(n=La(),W.lanes|=n,Rt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,pe=!0),e.memoizedState=n)}function ef(e,t){var n=A;A=n!==0&&4>n?n:4,e(!0);var r=Bl.transition;Bl.transition={};try{e(!1),t()}finally{A=n,Bl.transition=r}}function Eu(){return Le().memoizedState}function tf(e,t,n){var r=gt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},zu(e))_u(t,n);else if(n=au(e,t,n,r),n!==null){var l=ue();Ie(n,e,r,l),Pu(n,t,r)}}function nf(e,t,n){var r=gt(e),l={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(zu(e))_u(t,l);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var s=t.lastRenderedState,a=i(s,n);if(l.hasEagerState=!0,l.eagerState=a,Ae(a,s)){var u=t.interleaved;u===null?(l.next=l,ho(t)):(l.next=u.next,u.next=l),t.interleaved=l;return}}catch{}finally{}n=au(e,t,l,r),n!==null&&(l=ue(),Ie(n,e,r,l),Pu(n,t,r))}}function zu(e){var t=e.alternate;return e===W||t!==null&&t===W}function _u(e,t){Mn=qr=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Pu(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,eo(e,n)}}var el={readContext:Pe,useCallback:re,useContext:re,useEffect:re,useImperativeHandle:re,useInsertionEffect:re,useLayoutEffect:re,useMemo:re,useReducer:re,useRef:re,useState:re,useDebugValue:re,useDeferredValue:re,useTransition:re,useMutableSource:re,useSyncExternalStore:re,useId:re,unstable_isNewReconciler:!1},rf={readContext:Pe,useCallback:function(e,t){return Be().memoizedState=[e,t===void 0?null:t],e},useContext:Pe,useEffect:Ss,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Dr(4194308,4,ku.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Dr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Dr(4,2,e,t)},useMemo:function(e,t){var n=Be();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Be();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=tf.bind(null,W,e),[r.memoizedState,e]},useRef:function(e){var t=Be();return e={current:e},t.memoizedState=e},useState:js,useDebugValue:So,useDeferredValue:function(e){return Be().memoizedState=e},useTransition:function(){var e=js(!1),t=e[0];return e=ef.bind(null,e[1]),Be().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=W,l=Be();if($){if(n===void 0)throw Error(k(407));n=n()}else{if(n=t(),J===null)throw Error(k(349));Ft&30||pu(r,t,n)}l.memoizedState=n;var i={value:n,getSnapshot:t};return l.queue=i,Ss(hu.bind(null,r,i,e),[e]),r.flags|=2048,Jn(9,mu.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Be(),t=J.identifierPrefix;if($){var n=Ge,r=Ke;n=(r&~(1<<32-Oe(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Gn++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=qd++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},lf={readContext:Pe,useCallback:ju,useContext:Pe,useEffect:jo,useImperativeHandle:Nu,useInsertionEffect:xu,useLayoutEffect:wu,useMemo:Su,useReducer:$l,useRef:yu,useState:function(){return $l(Zn)},useDebugValue:So,useDeferredValue:function(e){var t=Le();return Cu(t,K.memoizedState,e)},useTransition:function(){var e=$l(Zn)[0],t=Le().memoizedState;return[e,t]},useMutableSource:du,useSyncExternalStore:fu,useId:Eu,unstable_isNewReconciler:!1},of={readContext:Pe,useCallback:ju,useContext:Pe,useEffect:jo,useImperativeHandle:Nu,useInsertionEffect:xu,useLayoutEffect:wu,useMemo:Su,useReducer:Vl,useRef:yu,useState:function(){return Vl(Zn)},useDebugValue:So,useDeferredValue:function(e){var t=Le();return K===null?t.memoizedState=e:Cu(t,K.memoizedState,e)},useTransition:function(){var e=Vl(Zn)[0],t=Le().memoizedState;return[e,t]},useMutableSource:du,useSyncExternalStore:fu,useId:Eu,unstable_isNewReconciler:!1};function Me(e,t){if(e&&e.defaultProps){t=H({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ci(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:H({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ml={isMounted:function(e){return(e=e._reactInternals)?At(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ue(),l=gt(e),i=Ze(r,l);i.payload=t,n!=null&&(i.callback=n),t=mt(e,i,l),t!==null&&(Ie(t,e,l,r),Pr(t,e,l))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ue(),l=gt(e),i=Ze(r,l);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=mt(e,i,l),t!==null&&(Ie(t,e,l,r),Pr(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ue(),r=gt(e),l=Ze(n,r);l.tag=2,t!=null&&(l.callback=t),t=mt(e,l,r),t!==null&&(Ie(t,e,r,n),Pr(t,e,r))}};function Cs(e,t,n,r,l,i,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,s):t.prototype&&t.prototype.isPureReactComponent?!Wn(n,r)||!Wn(l,i):!0}function Lu(e,t,n){var r=!1,l=xt,i=t.contextType;return typeof i=="object"&&i!==null?i=Pe(i):(l=he(t)?Tt:oe.current,r=t.contextTypes,i=(r=r!=null)?sn(e,l):xt),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ml,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=i),t}function Es(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ml.enqueueReplaceState(t,t.state,null)}function Ei(e,t,n,r){var l=e.stateNode;l.props=n,l.state=e.memoizedState,l.refs={},go(e);var i=t.contextType;typeof i=="object"&&i!==null?l.context=Pe(i):(i=he(t)?Tt:oe.current,l.context=sn(e,i)),l.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Ci(e,t,i,n),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&ml.enqueueReplaceState(l,l.state,null),Zr(e,n,l,r),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function dn(e,t){try{var n="",r=t;do n+=Mc(r),r=r.return;while(r);var l=n}catch(i){l=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:l,digest:null}}function Wl(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function zi(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var sf=typeof WeakMap=="function"?WeakMap:Map;function Du(e,t,n){n=Ze(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){nl||(nl=!0,Ii=r),zi(e,t)},n}function Tu(e,t,n){n=Ze(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var l=t.value;n.payload=function(){return r(l)},n.callback=function(){zi(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){zi(e,t),typeof r!="function"&&(ht===null?ht=new Set([this]):ht.add(this));var s=t.stack;this.componentDidCatch(t.value,{componentStack:s!==null?s:""})}),n}function zs(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new sf;var l=new Set;r.set(t,l)}else l=r.get(t),l===void 0&&(l=new Set,r.set(t,l));l.has(n)||(l.add(n),e=kf.bind(null,e,t,n),t.then(e,e))}function _s(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Ps(e,t,n,r,l){return e.mode&1?(e.flags|=65536,e.lanes=l,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Ze(-1,1),t.tag=2,mt(n,t,1))),n.lanes|=1),e)}var af=nt.ReactCurrentOwner,pe=!1;function ae(e,t,n,r){t.child=e===null?su(t,null,n,r):un(t,e.child,n,r)}function Ls(e,t,n,r,l){n=n.render;var i=t.ref;return rn(t,l),r=ko(e,t,n,r,i,l),n=No(),e!==null&&!pe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,tt(e,t,l)):($&&n&&ao(t),t.flags|=1,ae(e,t,r,l),t.child)}function Ds(e,t,n,r,l){if(e===null){var i=n.type;return typeof i=="function"&&!To(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Mu(e,t,i,r,l)):(e=Rr(n.type,null,r,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&l)){var s=i.memoizedProps;if(n=n.compare,n=n!==null?n:Wn,n(s,r)&&e.ref===t.ref)return tt(e,t,l)}return t.flags|=1,e=vt(i,r),e.ref=t.ref,e.return=t,t.child=e}function Mu(e,t,n,r,l){if(e!==null){var i=e.memoizedProps;if(Wn(i,r)&&e.ref===t.ref)if(pe=!1,t.pendingProps=r=i,(e.lanes&l)!==0)e.flags&131072&&(pe=!0);else return t.lanes=e.lanes,tt(e,t,l)}return _i(e,t,n,r,l)}function Fu(e,t,n){var r=t.pendingProps,l=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},b(Jt,ye),ye|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,b(Jt,ye),ye|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,b(Jt,ye),ye|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,b(Jt,ye),ye|=r;return ae(e,t,l,n),t.child}function Ru(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function _i(e,t,n,r,l){var i=he(n)?Tt:oe.current;return i=sn(t,i),rn(t,l),n=ko(e,t,n,r,i,l),r=No(),e!==null&&!pe?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,tt(e,t,l)):($&&r&&ao(t),t.flags|=1,ae(e,t,n,l),t.child)}function Ts(e,t,n,r,l){if(he(n)){var i=!0;Qr(t)}else i=!1;if(rn(t,l),t.stateNode===null)Tr(e,t),Lu(t,n,r),Ei(t,n,r,l),r=!0;else if(e===null){var s=t.stateNode,a=t.memoizedProps;s.props=a;var u=s.context,d=n.contextType;typeof d=="object"&&d!==null?d=Pe(d):(d=he(n)?Tt:oe.current,d=sn(t,d));var v=n.getDerivedStateFromProps,y=typeof v=="function"||typeof s.getSnapshotBeforeUpdate=="function";y||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==r||u!==d)&&Es(t,s,r,d),it=!1;var g=t.memoizedState;s.state=g,Zr(t,r,s,l),u=t.memoizedState,a!==r||g!==u||me.current||it?(typeof v=="function"&&(Ci(t,n,v,r),u=t.memoizedState),(a=it||Cs(t,n,a,r,g,u,d))?(y||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),s.props=r,s.state=u,s.context=d,r=a):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{s=t.stateNode,uu(e,t),a=t.memoizedProps,d=t.type===t.elementType?a:Me(t.type,a),s.props=d,y=t.pendingProps,g=s.context,u=n.contextType,typeof u=="object"&&u!==null?u=Pe(u):(u=he(n)?Tt:oe.current,u=sn(t,u));var N=n.getDerivedStateFromProps;(v=typeof N=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==y||g!==u)&&Es(t,s,r,u),it=!1,g=t.memoizedState,s.state=g,Zr(t,r,s,l);var w=t.memoizedState;a!==y||g!==w||me.current||it?(typeof N=="function"&&(Ci(t,n,N,r),w=t.memoizedState),(d=it||Cs(t,n,d,r,g,w,u)||!1)?(v||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,w,u),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,w,u)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=w),s.props=r,s.state=w,s.context=u,r=d):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return Pi(e,t,n,r,i,l)}function Pi(e,t,n,r,l,i){Ru(e,t);var s=(t.flags&128)!==0;if(!r&&!s)return l&&vs(t,n,!1),tt(e,t,i);r=t.stateNode,af.current=t;var a=s&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&s?(t.child=un(t,e.child,null,i),t.child=un(t,null,a,i)):ae(e,t,a,i),t.memoizedState=r.state,l&&vs(t,n,!0),t.child}function Ou(e){var t=e.stateNode;t.pendingContext?gs(e,t.pendingContext,t.pendingContext!==t.context):t.context&&gs(e,t.context,!1),vo(e,t.containerInfo)}function Ms(e,t,n,r,l){return an(),co(l),t.flags|=256,ae(e,t,n,r),t.child}var Li={dehydrated:null,treeContext:null,retryLane:0};function Di(e){return{baseLanes:e,cachePool:null,transitions:null}}function Iu(e,t,n){var r=t.pendingProps,l=V.current,i=!1,s=(t.flags&128)!==0,a;if((a=s)||(a=e!==null&&e.memoizedState===null?!1:(l&2)!==0),a?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),b(V,l&1),e===null)return ji(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(s=r.children,e=r.fallback,i?(r=t.mode,i=t.child,s={mode:"hidden",children:s},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=s):i=vl(s,r,0,null),e=Dt(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Di(n),t.memoizedState=Li,e):Co(t,s));if(l=e.memoizedState,l!==null&&(a=l.dehydrated,a!==null))return uf(e,t,s,r,a,l,n);if(i){i=r.fallback,s=t.mode,l=e.child,a=l.sibling;var u={mode:"hidden",children:r.children};return!(s&1)&&t.child!==l?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=vt(l,u),r.subtreeFlags=l.subtreeFlags&14680064),a!==null?i=vt(a,i):(i=Dt(i,s,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,s=e.child.memoizedState,s=s===null?Di(n):{baseLanes:s.baseLanes|n,cachePool:null,transitions:s.transitions},i.memoizedState=s,i.childLanes=e.childLanes&~n,t.memoizedState=Li,r}return i=e.child,e=i.sibling,r=vt(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Co(e,t){return t=vl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function wr(e,t,n,r){return r!==null&&co(r),un(t,e.child,null,n),e=Co(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function uf(e,t,n,r,l,i,s){if(n)return t.flags&256?(t.flags&=-257,r=Wl(Error(k(422))),wr(e,t,s,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,l=t.mode,r=vl({mode:"visible",children:r.children},l,0,null),i=Dt(i,l,s,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&un(t,e.child,null,s),t.child.memoizedState=Di(s),t.memoizedState=Li,i);if(!(t.mode&1))return wr(e,t,s,null);if(l.data==="$!"){if(r=l.nextSibling&&l.nextSibling.dataset,r)var a=r.dgst;return r=a,i=Error(k(419)),r=Wl(i,r,void 0),wr(e,t,s,r)}if(a=(s&e.childLanes)!==0,pe||a){if(r=J,r!==null){switch(s&-s){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=l&(r.suspendedLanes|s)?0:l,l!==0&&l!==i.retryLane&&(i.retryLane=l,et(e,l),Ie(r,e,l,-1))}return Do(),r=Wl(Error(k(421))),wr(e,t,s,r)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Nf.bind(null,e),l._reactRetry=t,null):(e=i.treeContext,xe=pt(l.nextSibling),we=t,$=!0,Re=null,e!==null&&(Ce[Ee++]=Ke,Ce[Ee++]=Ge,Ce[Ee++]=Mt,Ke=e.id,Ge=e.overflow,Mt=t),t=Co(t,r.children),t.flags|=4096,t)}function Fs(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Si(e.return,t,n)}function Hl(e,t,n,r,l){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:l}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=l)}function Au(e,t,n){var r=t.pendingProps,l=r.revealOrder,i=r.tail;if(ae(e,t,r.children,n),r=V.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Fs(e,n,t);else if(e.tag===19)Fs(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(b(V,r),!(t.mode&1))t.memoizedState=null;else switch(l){case"forwards":for(n=t.child,l=null;n!==null;)e=n.alternate,e!==null&&Jr(e)===null&&(l=n),n=n.sibling;n=l,n===null?(l=t.child,t.child=null):(l=n.sibling,n.sibling=null),Hl(t,!1,l,n,i);break;case"backwards":for(n=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&Jr(e)===null){t.child=l;break}e=l.sibling,l.sibling=n,n=l,l=e}Hl(t,!0,n,null,i);break;case"together":Hl(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Tr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function tt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Rt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(k(153));if(t.child!==null){for(e=t.child,n=vt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=vt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function cf(e,t,n){switch(t.tag){case 3:Ou(t),an();break;case 5:cu(t);break;case 1:he(t.type)&&Qr(t);break;case 4:vo(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,l=t.memoizedProps.value;b(Kr,r._currentValue),r._currentValue=l;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(b(V,V.current&1),t.flags|=128,null):n&t.child.childLanes?Iu(e,t,n):(b(V,V.current&1),e=tt(e,t,n),e!==null?e.sibling:null);b(V,V.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Au(e,t,n);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),b(V,V.current),r)break;return null;case 22:case 23:return t.lanes=0,Fu(e,t,n)}return tt(e,t,n)}var bu,Ti,Uu,Bu;bu=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ti=function(){};Uu=function(e,t,n,r){var l=e.memoizedProps;if(l!==r){e=t.stateNode,Pt(We.current);var i=null;switch(n){case"input":l=ei(e,l),r=ei(e,r),i=[];break;case"select":l=H({},l,{value:void 0}),r=H({},r,{value:void 0}),i=[];break;case"textarea":l=ri(e,l),r=ri(e,r),i=[];break;default:typeof l.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Wr)}ii(n,r);var s;n=null;for(d in l)if(!r.hasOwnProperty(d)&&l.hasOwnProperty(d)&&l[d]!=null)if(d==="style"){var a=l[d];for(s in a)a.hasOwnProperty(s)&&(n||(n={}),n[s]="")}else d!=="dangerouslySetInnerHTML"&&d!=="children"&&d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&d!=="autoFocus"&&(In.hasOwnProperty(d)?i||(i=[]):(i=i||[]).push(d,null));for(d in r){var u=r[d];if(a=l!=null?l[d]:void 0,r.hasOwnProperty(d)&&u!==a&&(u!=null||a!=null))if(d==="style")if(a){for(s in a)!a.hasOwnProperty(s)||u&&u.hasOwnProperty(s)||(n||(n={}),n[s]="");for(s in u)u.hasOwnProperty(s)&&a[s]!==u[s]&&(n||(n={}),n[s]=u[s])}else n||(i||(i=[]),i.push(d,n)),n=u;else d==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,a=a?a.__html:void 0,u!=null&&a!==u&&(i=i||[]).push(d,u)):d==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(d,""+u):d!=="suppressContentEditableWarning"&&d!=="suppressHydrationWarning"&&(In.hasOwnProperty(d)?(u!=null&&d==="onScroll"&&U("scroll",e),i||a===u||(i=[])):(i=i||[]).push(d,u))}n&&(i=i||[]).push("style",n);var d=i;(t.updateQueue=d)&&(t.flags|=4)}};Bu=function(e,t,n,r){n!==r&&(t.flags|=4)};function Nn(e,t){if(!$)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function le(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags&14680064,r|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function df(e,t,n){var r=t.pendingProps;switch(uo(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return le(t),null;case 1:return he(t.type)&&Hr(),le(t),null;case 3:return r=t.stateNode,cn(),B(me),B(oe),xo(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(yr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Re!==null&&(Ui(Re),Re=null))),Ti(e,t),le(t),null;case 5:yo(t);var l=Pt(Kn.current);if(n=t.type,e!==null&&t.stateNode!=null)Uu(e,t,n,r,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(k(166));return le(t),null}if(e=Pt(We.current),yr(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[$e]=t,r[Yn]=i,e=(t.mode&1)!==0,n){case"dialog":U("cancel",r),U("close",r);break;case"iframe":case"object":case"embed":U("load",r);break;case"video":case"audio":for(l=0;l<zn.length;l++)U(zn[l],r);break;case"source":U("error",r);break;case"img":case"image":case"link":U("error",r),U("load",r);break;case"details":U("toggle",r);break;case"input":Vo(r,i),U("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},U("invalid",r);break;case"textarea":Ho(r,i),U("invalid",r)}ii(n,i),l=null;for(var s in i)if(i.hasOwnProperty(s)){var a=i[s];s==="children"?typeof a=="string"?r.textContent!==a&&(i.suppressHydrationWarning!==!0&&vr(r.textContent,a,e),l=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(i.suppressHydrationWarning!==!0&&vr(r.textContent,a,e),l=["children",""+a]):In.hasOwnProperty(s)&&a!=null&&s==="onScroll"&&U("scroll",r)}switch(n){case"input":ur(r),Wo(r,i,!0);break;case"textarea":ur(r),Qo(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Wr)}r=l,t.updateQueue=r,r!==null&&(t.flags|=4)}else{s=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=ha(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=s.createElement(n,{is:r.is}):(e=s.createElement(n),n==="select"&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,n),e[$e]=t,e[Yn]=r,bu(e,t,!1,!1),t.stateNode=e;e:{switch(s=oi(n,r),n){case"dialog":U("cancel",e),U("close",e),l=r;break;case"iframe":case"object":case"embed":U("load",e),l=r;break;case"video":case"audio":for(l=0;l<zn.length;l++)U(zn[l],e);l=r;break;case"source":U("error",e),l=r;break;case"img":case"image":case"link":U("error",e),U("load",e),l=r;break;case"details":U("toggle",e),l=r;break;case"input":Vo(e,r),l=ei(e,r),U("invalid",e);break;case"option":l=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},l=H({},r,{value:void 0}),U("invalid",e);break;case"textarea":Ho(e,r),l=ri(e,r),U("invalid",e);break;default:l=r}ii(n,l),a=l;for(i in a)if(a.hasOwnProperty(i)){var u=a[i];i==="style"?ya(e,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&ga(e,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&An(e,u):typeof u=="number"&&An(e,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(In.hasOwnProperty(i)?u!=null&&i==="onScroll"&&U("scroll",e):u!=null&&Xi(e,i,u,s))}switch(n){case"input":ur(e),Wo(e,r,!1);break;case"textarea":ur(e),Qo(e);break;case"option":r.value!=null&&e.setAttribute("value",""+yt(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?qt(e,!!r.multiple,i,!1):r.defaultValue!=null&&qt(e,!!r.multiple,r.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=Wr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return le(t),null;case 6:if(e&&t.stateNode!=null)Bu(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(k(166));if(n=Pt(Kn.current),Pt(We.current),yr(t)){if(r=t.stateNode,n=t.memoizedProps,r[$e]=t,(i=r.nodeValue!==n)&&(e=we,e!==null))switch(e.tag){case 3:vr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&vr(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[$e]=t,t.stateNode=r}return le(t),null;case 13:if(B(V),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if($&&xe!==null&&t.mode&1&&!(t.flags&128))iu(),an(),t.flags|=98560,i=!1;else if(i=yr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(k(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(k(317));i[$e]=t}else an(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;le(t),i=!1}else Re!==null&&(Ui(Re),Re=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||V.current&1?G===0&&(G=3):Do())),t.updateQueue!==null&&(t.flags|=4),le(t),null);case 4:return cn(),Ti(e,t),e===null&&Hn(t.stateNode.containerInfo),le(t),null;case 10:return mo(t.type._context),le(t),null;case 17:return he(t.type)&&Hr(),le(t),null;case 19:if(B(V),i=t.memoizedState,i===null)return le(t),null;if(r=(t.flags&128)!==0,s=i.rendering,s===null)if(r)Nn(i,!1);else{if(G!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=Jr(e),s!==null){for(t.flags|=128,Nn(i,!1),r=s.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,s=i.alternate,s===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=s.childLanes,i.lanes=s.lanes,i.child=s.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=s.memoizedProps,i.memoizedState=s.memoizedState,i.updateQueue=s.updateQueue,i.type=s.type,e=s.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return b(V,V.current&1|2),t.child}e=e.sibling}i.tail!==null&&Y()>fn&&(t.flags|=128,r=!0,Nn(i,!1),t.lanes=4194304)}else{if(!r)if(e=Jr(s),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Nn(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!$)return le(t),null}else 2*Y()-i.renderingStartTime>fn&&n!==1073741824&&(t.flags|=128,r=!0,Nn(i,!1),t.lanes=4194304);i.isBackwards?(s.sibling=t.child,t.child=s):(n=i.last,n!==null?n.sibling=s:t.child=s,i.last=s)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=Y(),t.sibling=null,n=V.current,b(V,r?n&1|2:n&1),t):(le(t),null);case 22:case 23:return Lo(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?ye&1073741824&&(le(t),t.subtreeFlags&6&&(t.flags|=8192)):le(t),null;case 24:return null;case 25:return null}throw Error(k(156,t.tag))}function ff(e,t){switch(uo(t),t.tag){case 1:return he(t.type)&&Hr(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return cn(),B(me),B(oe),xo(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return yo(t),null;case 13:if(B(V),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(k(340));an()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return B(V),null;case 4:return cn(),null;case 10:return mo(t.type._context),null;case 22:case 23:return Lo(),null;case 24:return null;default:return null}}var kr=!1,ie=!1,pf=typeof WeakSet=="function"?WeakSet:Set,z=null;function Zt(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Q(e,t,r)}else n.current=null}function Mi(e,t,n){try{n()}catch(r){Q(e,t,r)}}var Rs=!1;function mf(e,t){if(gi=Br,e=Qa(),so(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var l=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var s=0,a=-1,u=-1,d=0,v=0,y=e,g=null;t:for(;;){for(var N;y!==n||l!==0&&y.nodeType!==3||(a=s+l),y!==i||r!==0&&y.nodeType!==3||(u=s+r),y.nodeType===3&&(s+=y.nodeValue.length),(N=y.firstChild)!==null;)g=y,y=N;for(;;){if(y===e)break t;if(g===n&&++d===l&&(a=s),g===i&&++v===r&&(u=s),(N=y.nextSibling)!==null)break;y=g,g=y.parentNode}y=N}n=a===-1||u===-1?null:{start:a,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(vi={focusedElem:e,selectionRange:n},Br=!1,z=t;z!==null;)if(t=z,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,z=e;else for(;z!==null;){t=z;try{var w=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(w!==null){var j=w.memoizedProps,T=w.memoizedState,p=t.stateNode,c=p.getSnapshotBeforeUpdate(t.elementType===t.type?j:Me(t.type,j),T);p.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var f=t.stateNode.containerInfo;f.nodeType===1?f.textContent="":f.nodeType===9&&f.documentElement&&f.removeChild(f.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(k(163))}}catch(x){Q(t,t.return,x)}if(e=t.sibling,e!==null){e.return=t.return,z=e;break}z=t.return}return w=Rs,Rs=!1,w}function Fn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var l=r=r.next;do{if((l.tag&e)===e){var i=l.destroy;l.destroy=void 0,i!==void 0&&Mi(t,n,i)}l=l.next}while(l!==r)}}function hl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Fi(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function $u(e){var t=e.alternate;t!==null&&(e.alternate=null,$u(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[$e],delete t[Yn],delete t[wi],delete t[Kd],delete t[Gd])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Vu(e){return e.tag===5||e.tag===3||e.tag===4}function Os(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Vu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ri(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Wr));else if(r!==4&&(e=e.child,e!==null))for(Ri(e,t,n),e=e.sibling;e!==null;)Ri(e,t,n),e=e.sibling}function Oi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Oi(e,t,n),e=e.sibling;e!==null;)Oi(e,t,n),e=e.sibling}var q=null,Fe=!1;function rt(e,t,n){for(n=n.child;n!==null;)Wu(e,t,n),n=n.sibling}function Wu(e,t,n){if(Ve&&typeof Ve.onCommitFiberUnmount=="function")try{Ve.onCommitFiberUnmount(sl,n)}catch{}switch(n.tag){case 5:ie||Zt(n,t);case 6:var r=q,l=Fe;q=null,rt(e,t,n),q=r,Fe=l,q!==null&&(Fe?(e=q,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):q.removeChild(n.stateNode));break;case 18:q!==null&&(Fe?(e=q,n=n.stateNode,e.nodeType===8?Al(e.parentNode,n):e.nodeType===1&&Al(e,n),$n(e)):Al(q,n.stateNode));break;case 4:r=q,l=Fe,q=n.stateNode.containerInfo,Fe=!0,rt(e,t,n),q=r,Fe=l;break;case 0:case 11:case 14:case 15:if(!ie&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){l=r=r.next;do{var i=l,s=i.destroy;i=i.tag,s!==void 0&&(i&2||i&4)&&Mi(n,t,s),l=l.next}while(l!==r)}rt(e,t,n);break;case 1:if(!ie&&(Zt(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){Q(n,t,a)}rt(e,t,n);break;case 21:rt(e,t,n);break;case 22:n.mode&1?(ie=(r=ie)||n.memoizedState!==null,rt(e,t,n),ie=r):rt(e,t,n);break;default:rt(e,t,n)}}function Is(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new pf),t.forEach(function(r){var l=jf.bind(null,e,r);n.has(r)||(n.add(r),r.then(l,l))})}}function Te(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var l=n[r];try{var i=e,s=t,a=s;e:for(;a!==null;){switch(a.tag){case 5:q=a.stateNode,Fe=!1;break e;case 3:q=a.stateNode.containerInfo,Fe=!0;break e;case 4:q=a.stateNode.containerInfo,Fe=!0;break e}a=a.return}if(q===null)throw Error(k(160));Wu(i,s,l),q=null,Fe=!1;var u=l.alternate;u!==null&&(u.return=null),l.return=null}catch(d){Q(l,t,d)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Hu(t,e),t=t.sibling}function Hu(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Te(t,e),Ue(e),r&4){try{Fn(3,e,e.return),hl(3,e)}catch(j){Q(e,e.return,j)}try{Fn(5,e,e.return)}catch(j){Q(e,e.return,j)}}break;case 1:Te(t,e),Ue(e),r&512&&n!==null&&Zt(n,n.return);break;case 5:if(Te(t,e),Ue(e),r&512&&n!==null&&Zt(n,n.return),e.flags&32){var l=e.stateNode;try{An(l,"")}catch(j){Q(e,e.return,j)}}if(r&4&&(l=e.stateNode,l!=null)){var i=e.memoizedProps,s=n!==null?n.memoizedProps:i,a=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{a==="input"&&i.type==="radio"&&i.name!=null&&pa(l,i),oi(a,s);var d=oi(a,i);for(s=0;s<u.length;s+=2){var v=u[s],y=u[s+1];v==="style"?ya(l,y):v==="dangerouslySetInnerHTML"?ga(l,y):v==="children"?An(l,y):Xi(l,v,y,d)}switch(a){case"input":ti(l,i);break;case"textarea":ma(l,i);break;case"select":var g=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!i.multiple;var N=i.value;N!=null?qt(l,!!i.multiple,N,!1):g!==!!i.multiple&&(i.defaultValue!=null?qt(l,!!i.multiple,i.defaultValue,!0):qt(l,!!i.multiple,i.multiple?[]:"",!1))}l[Yn]=i}catch(j){Q(e,e.return,j)}}break;case 6:if(Te(t,e),Ue(e),r&4){if(e.stateNode===null)throw Error(k(162));l=e.stateNode,i=e.memoizedProps;try{l.nodeValue=i}catch(j){Q(e,e.return,j)}}break;case 3:if(Te(t,e),Ue(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{$n(t.containerInfo)}catch(j){Q(e,e.return,j)}break;case 4:Te(t,e),Ue(e);break;case 13:Te(t,e),Ue(e),l=e.child,l.flags&8192&&(i=l.memoizedState!==null,l.stateNode.isHidden=i,!i||l.alternate!==null&&l.alternate.memoizedState!==null||(_o=Y())),r&4&&Is(e);break;case 22:if(v=n!==null&&n.memoizedState!==null,e.mode&1?(ie=(d=ie)||v,Te(t,e),ie=d):Te(t,e),Ue(e),r&8192){if(d=e.memoizedState!==null,(e.stateNode.isHidden=d)&&!v&&e.mode&1)for(z=e,v=e.child;v!==null;){for(y=z=v;z!==null;){switch(g=z,N=g.child,g.tag){case 0:case 11:case 14:case 15:Fn(4,g,g.return);break;case 1:Zt(g,g.return);var w=g.stateNode;if(typeof w.componentWillUnmount=="function"){r=g,n=g.return;try{t=r,w.props=t.memoizedProps,w.state=t.memoizedState,w.componentWillUnmount()}catch(j){Q(r,n,j)}}break;case 5:Zt(g,g.return);break;case 22:if(g.memoizedState!==null){bs(y);continue}}N!==null?(N.return=g,z=N):bs(y)}v=v.sibling}e:for(v=null,y=e;;){if(y.tag===5){if(v===null){v=y;try{l=y.stateNode,d?(i=l.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(a=y.stateNode,u=y.memoizedProps.style,s=u!=null&&u.hasOwnProperty("display")?u.display:null,a.style.display=va("display",s))}catch(j){Q(e,e.return,j)}}}else if(y.tag===6){if(v===null)try{y.stateNode.nodeValue=d?"":y.memoizedProps}catch(j){Q(e,e.return,j)}}else if((y.tag!==22&&y.tag!==23||y.memoizedState===null||y===e)&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===e)break e;for(;y.sibling===null;){if(y.return===null||y.return===e)break e;v===y&&(v=null),y=y.return}v===y&&(v=null),y.sibling.return=y.return,y=y.sibling}}break;case 19:Te(t,e),Ue(e),r&4&&Is(e);break;case 21:break;default:Te(t,e),Ue(e)}}function Ue(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Vu(n)){var r=n;break e}n=n.return}throw Error(k(160))}switch(r.tag){case 5:var l=r.stateNode;r.flags&32&&(An(l,""),r.flags&=-33);var i=Os(e);Oi(e,i,l);break;case 3:case 4:var s=r.stateNode.containerInfo,a=Os(e);Ri(e,a,s);break;default:throw Error(k(161))}}catch(u){Q(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function hf(e,t,n){z=e,Qu(e)}function Qu(e,t,n){for(var r=(e.mode&1)!==0;z!==null;){var l=z,i=l.child;if(l.tag===22&&r){var s=l.memoizedState!==null||kr;if(!s){var a=l.alternate,u=a!==null&&a.memoizedState!==null||ie;a=kr;var d=ie;if(kr=s,(ie=u)&&!d)for(z=l;z!==null;)s=z,u=s.child,s.tag===22&&s.memoizedState!==null?Us(l):u!==null?(u.return=s,z=u):Us(l);for(;i!==null;)z=i,Qu(i),i=i.sibling;z=l,kr=a,ie=d}As(e)}else l.subtreeFlags&8772&&i!==null?(i.return=l,z=i):As(e)}}function As(e){for(;z!==null;){var t=z;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ie||hl(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ie)if(n===null)r.componentDidMount();else{var l=t.elementType===t.type?n.memoizedProps:Me(t.type,n.memoizedProps);r.componentDidUpdate(l,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&Ns(t,i,r);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ns(t,s,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var d=t.alternate;if(d!==null){var v=d.memoizedState;if(v!==null){var y=v.dehydrated;y!==null&&$n(y)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(k(163))}ie||t.flags&512&&Fi(t)}catch(g){Q(t,t.return,g)}}if(t===e){z=null;break}if(n=t.sibling,n!==null){n.return=t.return,z=n;break}z=t.return}}function bs(e){for(;z!==null;){var t=z;if(t===e){z=null;break}var n=t.sibling;if(n!==null){n.return=t.return,z=n;break}z=t.return}}function Us(e){for(;z!==null;){var t=z;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{hl(4,t)}catch(u){Q(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var l=t.return;try{r.componentDidMount()}catch(u){Q(t,l,u)}}var i=t.return;try{Fi(t)}catch(u){Q(t,i,u)}break;case 5:var s=t.return;try{Fi(t)}catch(u){Q(t,s,u)}}}catch(u){Q(t,t.return,u)}if(t===e){z=null;break}var a=t.sibling;if(a!==null){a.return=t.return,z=a;break}z=t.return}}var gf=Math.ceil,tl=nt.ReactCurrentDispatcher,Eo=nt.ReactCurrentOwner,_e=nt.ReactCurrentBatchConfig,O=0,J=null,X=null,ee=0,ye=0,Jt=kt(0),G=0,qn=null,Rt=0,gl=0,zo=0,Rn=null,fe=null,_o=0,fn=1/0,Ye=null,nl=!1,Ii=null,ht=null,Nr=!1,ut=null,rl=0,On=0,Ai=null,Mr=-1,Fr=0;function ue(){return O&6?Y():Mr!==-1?Mr:Mr=Y()}function gt(e){return e.mode&1?O&2&&ee!==0?ee&-ee:Jd.transition!==null?(Fr===0&&(Fr=La()),Fr):(e=A,e!==0||(e=window.event,e=e===void 0?16:Ia(e.type)),e):1}function Ie(e,t,n,r){if(50<On)throw On=0,Ai=null,Error(k(185));tr(e,n,r),(!(O&2)||e!==J)&&(e===J&&(!(O&2)&&(gl|=n),G===4&&st(e,ee)),ge(e,r),n===1&&O===0&&!(t.mode&1)&&(fn=Y()+500,fl&&Nt()))}function ge(e,t){var n=e.callbackNode;Jc(e,t);var r=Ur(e,e===J?ee:0);if(r===0)n!==null&&Ko(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Ko(n),t===1)e.tag===0?Zd(Bs.bind(null,e)):nu(Bs.bind(null,e)),Yd(function(){!(O&6)&&Nt()}),n=null;else{switch(Da(r)){case 1:n=qi;break;case 4:n=_a;break;case 16:n=br;break;case 536870912:n=Pa;break;default:n=br}n=ec(n,Yu.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Yu(e,t){if(Mr=-1,Fr=0,O&6)throw Error(k(327));var n=e.callbackNode;if(ln()&&e.callbackNode!==n)return null;var r=Ur(e,e===J?ee:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=ll(e,r);else{t=r;var l=O;O|=2;var i=Ku();(J!==e||ee!==t)&&(Ye=null,fn=Y()+500,Lt(e,t));do try{xf();break}catch(a){Xu(e,a)}while(!0);po(),tl.current=i,O=l,X!==null?t=0:(J=null,ee=0,t=G)}if(t!==0){if(t===2&&(l=di(e),l!==0&&(r=l,t=bi(e,l))),t===1)throw n=qn,Lt(e,0),st(e,r),ge(e,Y()),n;if(t===6)st(e,r);else{if(l=e.current.alternate,!(r&30)&&!vf(l)&&(t=ll(e,r),t===2&&(i=di(e),i!==0&&(r=i,t=bi(e,i))),t===1))throw n=qn,Lt(e,0),st(e,r),ge(e,Y()),n;switch(e.finishedWork=l,e.finishedLanes=r,t){case 0:case 1:throw Error(k(345));case 2:Et(e,fe,Ye);break;case 3:if(st(e,r),(r&130023424)===r&&(t=_o+500-Y(),10<t)){if(Ur(e,0)!==0)break;if(l=e.suspendedLanes,(l&r)!==r){ue(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=xi(Et.bind(null,e,fe,Ye),t);break}Et(e,fe,Ye);break;case 4:if(st(e,r),(r&4194240)===r)break;for(t=e.eventTimes,l=-1;0<r;){var s=31-Oe(r);i=1<<s,s=t[s],s>l&&(l=s),r&=~i}if(r=l,r=Y()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*gf(r/1960))-r,10<r){e.timeoutHandle=xi(Et.bind(null,e,fe,Ye),r);break}Et(e,fe,Ye);break;case 5:Et(e,fe,Ye);break;default:throw Error(k(329))}}}return ge(e,Y()),e.callbackNode===n?Yu.bind(null,e):null}function bi(e,t){var n=Rn;return e.current.memoizedState.isDehydrated&&(Lt(e,t).flags|=256),e=ll(e,t),e!==2&&(t=fe,fe=n,t!==null&&Ui(t)),e}function Ui(e){fe===null?fe=e:fe.push.apply(fe,e)}function vf(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var l=n[r],i=l.getSnapshot;l=l.value;try{if(!Ae(i(),l))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function st(e,t){for(t&=~zo,t&=~gl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Oe(t),r=1<<n;e[n]=-1,t&=~r}}function Bs(e){if(O&6)throw Error(k(327));ln();var t=Ur(e,0);if(!(t&1))return ge(e,Y()),null;var n=ll(e,t);if(e.tag!==0&&n===2){var r=di(e);r!==0&&(t=r,n=bi(e,r))}if(n===1)throw n=qn,Lt(e,0),st(e,t),ge(e,Y()),n;if(n===6)throw Error(k(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Et(e,fe,Ye),ge(e,Y()),null}function Po(e,t){var n=O;O|=1;try{return e(t)}finally{O=n,O===0&&(fn=Y()+500,fl&&Nt())}}function Ot(e){ut!==null&&ut.tag===0&&!(O&6)&&ln();var t=O;O|=1;var n=_e.transition,r=A;try{if(_e.transition=null,A=1,e)return e()}finally{A=r,_e.transition=n,O=t,!(O&6)&&Nt()}}function Lo(){ye=Jt.current,B(Jt)}function Lt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Qd(n)),X!==null)for(n=X.return;n!==null;){var r=n;switch(uo(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Hr();break;case 3:cn(),B(me),B(oe),xo();break;case 5:yo(r);break;case 4:cn();break;case 13:B(V);break;case 19:B(V);break;case 10:mo(r.type._context);break;case 22:case 23:Lo()}n=n.return}if(J=e,X=e=vt(e.current,null),ee=ye=t,G=0,qn=null,zo=gl=Rt=0,fe=Rn=null,_t!==null){for(t=0;t<_t.length;t++)if(n=_t[t],r=n.interleaved,r!==null){n.interleaved=null;var l=r.next,i=n.pending;if(i!==null){var s=i.next;i.next=l,r.next=s}n.pending=r}_t=null}return e}function Xu(e,t){do{var n=X;try{if(po(),Lr.current=el,qr){for(var r=W.memoizedState;r!==null;){var l=r.queue;l!==null&&(l.pending=null),r=r.next}qr=!1}if(Ft=0,Z=K=W=null,Mn=!1,Gn=0,Eo.current=null,n===null||n.return===null){G=1,qn=t,X=null;break}e:{var i=e,s=n.return,a=n,u=t;if(t=ee,a.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var d=u,v=a,y=v.tag;if(!(v.mode&1)&&(y===0||y===11||y===15)){var g=v.alternate;g?(v.updateQueue=g.updateQueue,v.memoizedState=g.memoizedState,v.lanes=g.lanes):(v.updateQueue=null,v.memoizedState=null)}var N=_s(s);if(N!==null){N.flags&=-257,Ps(N,s,a,i,t),N.mode&1&&zs(i,d,t),t=N,u=d;var w=t.updateQueue;if(w===null){var j=new Set;j.add(u),t.updateQueue=j}else w.add(u);break e}else{if(!(t&1)){zs(i,d,t),Do();break e}u=Error(k(426))}}else if($&&a.mode&1){var T=_s(s);if(T!==null){!(T.flags&65536)&&(T.flags|=256),Ps(T,s,a,i,t),co(dn(u,a));break e}}i=u=dn(u,a),G!==4&&(G=2),Rn===null?Rn=[i]:Rn.push(i),i=s;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var p=Du(i,u,t);ks(i,p);break e;case 1:a=u;var c=i.type,f=i.stateNode;if(!(i.flags&128)&&(typeof c.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(ht===null||!ht.has(f)))){i.flags|=65536,t&=-t,i.lanes|=t;var x=Tu(i,a,t);ks(i,x);break e}}i=i.return}while(i!==null)}Zu(n)}catch(S){t=S,X===n&&n!==null&&(X=n=n.return);continue}break}while(!0)}function Ku(){var e=tl.current;return tl.current=el,e===null?el:e}function Do(){(G===0||G===3||G===2)&&(G=4),J===null||!(Rt&268435455)&&!(gl&268435455)||st(J,ee)}function ll(e,t){var n=O;O|=2;var r=Ku();(J!==e||ee!==t)&&(Ye=null,Lt(e,t));do try{yf();break}catch(l){Xu(e,l)}while(!0);if(po(),O=n,tl.current=r,X!==null)throw Error(k(261));return J=null,ee=0,G}function yf(){for(;X!==null;)Gu(X)}function xf(){for(;X!==null&&!Vc();)Gu(X)}function Gu(e){var t=qu(e.alternate,e,ye);e.memoizedProps=e.pendingProps,t===null?Zu(e):X=t,Eo.current=null}function Zu(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=ff(n,t),n!==null){n.flags&=32767,X=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{G=6,X=null;return}}else if(n=df(n,t,ye),n!==null){X=n;return}if(t=t.sibling,t!==null){X=t;return}X=t=e}while(t!==null);G===0&&(G=5)}function Et(e,t,n){var r=A,l=_e.transition;try{_e.transition=null,A=1,wf(e,t,n,r)}finally{_e.transition=l,A=r}return null}function wf(e,t,n,r){do ln();while(ut!==null);if(O&6)throw Error(k(327));n=e.finishedWork;var l=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(k(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(qc(e,i),e===J&&(X=J=null,ee=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Nr||(Nr=!0,ec(br,function(){return ln(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=_e.transition,_e.transition=null;var s=A;A=1;var a=O;O|=4,Eo.current=null,mf(e,n),Hu(n,e),bd(vi),Br=!!gi,vi=gi=null,e.current=n,hf(n),Wc(),O=a,A=s,_e.transition=i}else e.current=n;if(Nr&&(Nr=!1,ut=e,rl=l),i=e.pendingLanes,i===0&&(ht=null),Yc(n.stateNode),ge(e,Y()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)l=t[n],r(l.value,{componentStack:l.stack,digest:l.digest});if(nl)throw nl=!1,e=Ii,Ii=null,e;return rl&1&&e.tag!==0&&ln(),i=e.pendingLanes,i&1?e===Ai?On++:(On=0,Ai=e):On=0,Nt(),null}function ln(){if(ut!==null){var e=Da(rl),t=_e.transition,n=A;try{if(_e.transition=null,A=16>e?16:e,ut===null)var r=!1;else{if(e=ut,ut=null,rl=0,O&6)throw Error(k(331));var l=O;for(O|=4,z=e.current;z!==null;){var i=z,s=i.child;if(z.flags&16){var a=i.deletions;if(a!==null){for(var u=0;u<a.length;u++){var d=a[u];for(z=d;z!==null;){var v=z;switch(v.tag){case 0:case 11:case 15:Fn(8,v,i)}var y=v.child;if(y!==null)y.return=v,z=y;else for(;z!==null;){v=z;var g=v.sibling,N=v.return;if($u(v),v===d){z=null;break}if(g!==null){g.return=N,z=g;break}z=N}}}var w=i.alternate;if(w!==null){var j=w.child;if(j!==null){w.child=null;do{var T=j.sibling;j.sibling=null,j=T}while(j!==null)}}z=i}}if(i.subtreeFlags&2064&&s!==null)s.return=i,z=s;else e:for(;z!==null;){if(i=z,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Fn(9,i,i.return)}var p=i.sibling;if(p!==null){p.return=i.return,z=p;break e}z=i.return}}var c=e.current;for(z=c;z!==null;){s=z;var f=s.child;if(s.subtreeFlags&2064&&f!==null)f.return=s,z=f;else e:for(s=c;z!==null;){if(a=z,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:hl(9,a)}}catch(S){Q(a,a.return,S)}if(a===s){z=null;break e}var x=a.sibling;if(x!==null){x.return=a.return,z=x;break e}z=a.return}}if(O=l,Nt(),Ve&&typeof Ve.onPostCommitFiberRoot=="function")try{Ve.onPostCommitFiberRoot(sl,e)}catch{}r=!0}return r}finally{A=n,_e.transition=t}}return!1}function $s(e,t,n){t=dn(n,t),t=Du(e,t,1),e=mt(e,t,1),t=ue(),e!==null&&(tr(e,1,t),ge(e,t))}function Q(e,t,n){if(e.tag===3)$s(e,e,n);else for(;t!==null;){if(t.tag===3){$s(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(ht===null||!ht.has(r))){e=dn(n,e),e=Tu(t,e,1),t=mt(t,e,1),e=ue(),t!==null&&(tr(t,1,e),ge(t,e));break}}t=t.return}}function kf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ue(),e.pingedLanes|=e.suspendedLanes&n,J===e&&(ee&n)===n&&(G===4||G===3&&(ee&130023424)===ee&&500>Y()-_o?Lt(e,0):zo|=n),ge(e,t)}function Ju(e,t){t===0&&(e.mode&1?(t=fr,fr<<=1,!(fr&130023424)&&(fr=4194304)):t=1);var n=ue();e=et(e,t),e!==null&&(tr(e,t,n),ge(e,n))}function Nf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ju(e,n)}function jf(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,l=e.memoizedState;l!==null&&(n=l.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(k(314))}r!==null&&r.delete(t),Ju(e,n)}var qu;qu=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||me.current)pe=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return pe=!1,cf(e,t,n);pe=!!(e.flags&131072)}else pe=!1,$&&t.flags&1048576&&ru(t,Xr,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Tr(e,t),e=t.pendingProps;var l=sn(t,oe.current);rn(t,n),l=ko(null,t,r,e,l,n);var i=No();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,he(r)?(i=!0,Qr(t)):i=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,go(t),l.updater=ml,t.stateNode=l,l._reactInternals=t,Ei(t,r,e,n),t=Pi(null,t,r,!0,i,n)):(t.tag=0,$&&i&&ao(t),ae(null,t,l,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Tr(e,t),e=t.pendingProps,l=r._init,r=l(r._payload),t.type=r,l=t.tag=Cf(r),e=Me(r,e),l){case 0:t=_i(null,t,r,e,n);break e;case 1:t=Ts(null,t,r,e,n);break e;case 11:t=Ls(null,t,r,e,n);break e;case 14:t=Ds(null,t,r,Me(r.type,e),n);break e}throw Error(k(306,r,""))}return t;case 0:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Me(r,l),_i(e,t,r,l,n);case 1:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Me(r,l),Ts(e,t,r,l,n);case 3:e:{if(Ou(t),e===null)throw Error(k(387));r=t.pendingProps,i=t.memoizedState,l=i.element,uu(e,t),Zr(t,r,null,n);var s=t.memoizedState;if(r=s.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){l=dn(Error(k(423)),t),t=Ms(e,t,r,n,l);break e}else if(r!==l){l=dn(Error(k(424)),t),t=Ms(e,t,r,n,l);break e}else for(xe=pt(t.stateNode.containerInfo.firstChild),we=t,$=!0,Re=null,n=su(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(an(),r===l){t=tt(e,t,n);break e}ae(e,t,r,n)}t=t.child}return t;case 5:return cu(t),e===null&&ji(t),r=t.type,l=t.pendingProps,i=e!==null?e.memoizedProps:null,s=l.children,yi(r,l)?s=null:i!==null&&yi(r,i)&&(t.flags|=32),Ru(e,t),ae(e,t,s,n),t.child;case 6:return e===null&&ji(t),null;case 13:return Iu(e,t,n);case 4:return vo(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=un(t,null,r,n):ae(e,t,r,n),t.child;case 11:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Me(r,l),Ls(e,t,r,l,n);case 7:return ae(e,t,t.pendingProps,n),t.child;case 8:return ae(e,t,t.pendingProps.children,n),t.child;case 12:return ae(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,l=t.pendingProps,i=t.memoizedProps,s=l.value,b(Kr,r._currentValue),r._currentValue=s,i!==null)if(Ae(i.value,s)){if(i.children===l.children&&!me.current){t=tt(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var a=i.dependencies;if(a!==null){s=i.child;for(var u=a.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=Ze(-1,n&-n),u.tag=2;var d=i.updateQueue;if(d!==null){d=d.shared;var v=d.pending;v===null?u.next=u:(u.next=v.next,v.next=u),d.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Si(i.return,n,t),a.lanes|=n;break}u=u.next}}else if(i.tag===10)s=i.type===t.type?null:i.child;else if(i.tag===18){if(s=i.return,s===null)throw Error(k(341));s.lanes|=n,a=s.alternate,a!==null&&(a.lanes|=n),Si(s,n,t),s=i.sibling}else s=i.child;if(s!==null)s.return=i;else for(s=i;s!==null;){if(s===t){s=null;break}if(i=s.sibling,i!==null){i.return=s.return,s=i;break}s=s.return}i=s}ae(e,t,l.children,n),t=t.child}return t;case 9:return l=t.type,r=t.pendingProps.children,rn(t,n),l=Pe(l),r=r(l),t.flags|=1,ae(e,t,r,n),t.child;case 14:return r=t.type,l=Me(r,t.pendingProps),l=Me(r.type,l),Ds(e,t,r,l,n);case 15:return Mu(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,l=t.pendingProps,l=t.elementType===r?l:Me(r,l),Tr(e,t),t.tag=1,he(r)?(e=!0,Qr(t)):e=!1,rn(t,n),Lu(t,r,l),Ei(t,r,l,n),Pi(null,t,r,!0,e,n);case 19:return Au(e,t,n);case 22:return Fu(e,t,n)}throw Error(k(156,t.tag))};function ec(e,t){return za(e,t)}function Sf(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ze(e,t,n,r){return new Sf(e,t,n,r)}function To(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Cf(e){if(typeof e=="function")return To(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Gi)return 11;if(e===Zi)return 14}return 2}function vt(e,t){var n=e.alternate;return n===null?(n=ze(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Rr(e,t,n,r,l,i){var s=2;if(r=e,typeof e=="function")To(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case $t:return Dt(n.children,l,i,t);case Ki:s=8,l|=8;break;case Gl:return e=ze(12,n,t,l|2),e.elementType=Gl,e.lanes=i,e;case Zl:return e=ze(13,n,t,l),e.elementType=Zl,e.lanes=i,e;case Jl:return e=ze(19,n,t,l),e.elementType=Jl,e.lanes=i,e;case ca:return vl(n,l,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case aa:s=10;break e;case ua:s=9;break e;case Gi:s=11;break e;case Zi:s=14;break e;case lt:s=16,r=null;break e}throw Error(k(130,e==null?e:typeof e,""))}return t=ze(s,n,t,l),t.elementType=e,t.type=r,t.lanes=i,t}function Dt(e,t,n,r){return e=ze(7,e,r,t),e.lanes=n,e}function vl(e,t,n,r){return e=ze(22,e,r,t),e.elementType=ca,e.lanes=n,e.stateNode={isHidden:!1},e}function Ql(e,t,n){return e=ze(6,e,null,t),e.lanes=n,e}function Yl(e,t,n){return t=ze(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Ef(e,t,n,r,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=zl(0),this.expirationTimes=zl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=zl(0),this.identifierPrefix=r,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function Mo(e,t,n,r,l,i,s,a,u){return e=new Ef(e,t,n,a,u),t===1?(t=1,i===!0&&(t|=8)):t=0,i=ze(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},go(i),e}function zf(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Bt,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function tc(e){if(!e)return xt;e=e._reactInternals;e:{if(At(e)!==e||e.tag!==1)throw Error(k(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(he(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(k(171))}if(e.tag===1){var n=e.type;if(he(n))return tu(e,n,t)}return t}function nc(e,t,n,r,l,i,s,a,u){return e=Mo(n,r,!0,e,l,i,s,a,u),e.context=tc(null),n=e.current,r=ue(),l=gt(n),i=Ze(r,l),i.callback=t??null,mt(n,i,l),e.current.lanes=l,tr(e,l,r),ge(e,r),e}function yl(e,t,n,r){var l=t.current,i=ue(),s=gt(l);return n=tc(n),t.context===null?t.context=n:t.pendingContext=n,t=Ze(i,s),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=mt(l,t,s),e!==null&&(Ie(e,l,s,i),Pr(e,l,s)),s}function il(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Vs(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Fo(e,t){Vs(e,t),(e=e.alternate)&&Vs(e,t)}function _f(){return null}var rc=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ro(e){this._internalRoot=e}xl.prototype.render=Ro.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(k(409));yl(e,t,null,null)};xl.prototype.unmount=Ro.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ot(function(){yl(null,e,null,null)}),t[qe]=null}};function xl(e){this._internalRoot=e}xl.prototype.unstable_scheduleHydration=function(e){if(e){var t=Fa();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ot.length&&t!==0&&t<ot[n].priority;n++);ot.splice(n,0,e),n===0&&Oa(e)}};function Oo(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function wl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Ws(){}function Pf(e,t,n,r,l){if(l){if(typeof r=="function"){var i=r;r=function(){var d=il(s);i.call(d)}}var s=nc(t,r,e,0,null,!1,!1,"",Ws);return e._reactRootContainer=s,e[qe]=s.current,Hn(e.nodeType===8?e.parentNode:e),Ot(),s}for(;l=e.lastChild;)e.removeChild(l);if(typeof r=="function"){var a=r;r=function(){var d=il(u);a.call(d)}}var u=Mo(e,0,!1,null,null,!1,!1,"",Ws);return e._reactRootContainer=u,e[qe]=u.current,Hn(e.nodeType===8?e.parentNode:e),Ot(function(){yl(t,u,n,r)}),u}function kl(e,t,n,r,l){var i=n._reactRootContainer;if(i){var s=i;if(typeof l=="function"){var a=l;l=function(){var u=il(s);a.call(u)}}yl(t,s,e,l)}else s=Pf(n,t,e,l,r);return il(s)}Ta=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=En(t.pendingLanes);n!==0&&(eo(t,n|1),ge(t,Y()),!(O&6)&&(fn=Y()+500,Nt()))}break;case 13:Ot(function(){var r=et(e,1);if(r!==null){var l=ue();Ie(r,e,1,l)}}),Fo(e,1)}};to=function(e){if(e.tag===13){var t=et(e,134217728);if(t!==null){var n=ue();Ie(t,e,134217728,n)}Fo(e,134217728)}};Ma=function(e){if(e.tag===13){var t=gt(e),n=et(e,t);if(n!==null){var r=ue();Ie(n,e,t,r)}Fo(e,t)}};Fa=function(){return A};Ra=function(e,t){var n=A;try{return A=e,t()}finally{A=n}};ai=function(e,t,n){switch(t){case"input":if(ti(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var l=dl(r);if(!l)throw Error(k(90));fa(r),ti(r,l)}}}break;case"textarea":ma(e,n);break;case"select":t=n.value,t!=null&&qt(e,!!n.multiple,t,!1)}};ka=Po;Na=Ot;var Lf={usingClientEntryPoint:!1,Events:[rr,Qt,dl,xa,wa,Po]},jn={findFiberByHostInstance:zt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Df={bundleType:jn.bundleType,version:jn.version,rendererPackageName:jn.rendererPackageName,rendererConfig:jn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:nt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ca(e),e===null?null:e.stateNode},findFiberByHostInstance:jn.findFiberByHostInstance||_f,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var jr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!jr.isDisabled&&jr.supportsFiber)try{sl=jr.inject(Df),Ve=jr}catch{}}Ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Lf;Ne.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Oo(t))throw Error(k(200));return zf(e,t,null,n)};Ne.createRoot=function(e,t){if(!Oo(e))throw Error(k(299));var n=!1,r="",l=rc;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=Mo(e,1,!1,null,null,n,!1,r,l),e[qe]=t.current,Hn(e.nodeType===8?e.parentNode:e),new Ro(t)};Ne.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(k(188)):(e=Object.keys(e).join(","),Error(k(268,e)));return e=Ca(t),e=e===null?null:e.stateNode,e};Ne.flushSync=function(e){return Ot(e)};Ne.hydrate=function(e,t,n){if(!wl(t))throw Error(k(200));return kl(null,e,t,!0,n)};Ne.hydrateRoot=function(e,t,n){if(!Oo(e))throw Error(k(405));var r=n!=null&&n.hydratedSources||null,l=!1,i="",s=rc;if(n!=null&&(n.unstable_strictMode===!0&&(l=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=nc(t,null,e,1,n??null,l,!1,i,s),e[qe]=t.current,Hn(e),r)for(e=0;e<r.length;e++)n=r[e],l=n._getVersion,l=l(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,l]:t.mutableSourceEagerHydrationData.push(n,l);return new xl(t)};Ne.render=function(e,t,n){if(!wl(t))throw Error(k(200));return kl(null,e,t,!1,n)};Ne.unmountComponentAtNode=function(e){if(!wl(e))throw Error(k(40));return e._reactRootContainer?(Ot(function(){kl(null,null,e,!1,function(){e._reactRootContainer=null,e[qe]=null})}),!0):!1};Ne.unstable_batchedUpdates=Po;Ne.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!wl(n))throw Error(k(200));if(e==null||e._reactInternals===void 0)throw Error(k(38));return kl(e,t,n,!1,r)};Ne.version="18.3.1-next-f1338f8080-20240426";function lc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(lc)}catch(e){console.error(e)}}lc(),la.exports=Ne;var Tf=la.exports,Hs=Tf;Xl.createRoot=Hs.createRoot,Xl.hydrateRoot=Hs.hydrateRoot;const Bi="/assets/baguio-logo-CaRZa1lp.png",Mf="/assets/bg-park-DYsE1cDv.jpeg",ir=({title:e,showSidebarToggle:t=!1,onSidebarToggle:n=null,minimal:r=!1})=>r?o.jsx("header",{className:"fixed top-0 left-0 right-0 z-50 w-full h-16 bg-gradient-to-r from-green-700 to-green-600 text-white px-4 flex justify-between items-center shadow-lg border-2 border-green-400/40 border-b-4 border-green-400/60",children:o.jsx("div",{className:"flex justify-between items-center w-full max-w-6xl mx-auto px-4",children:o.jsxs("div",{className:"flex items-center gap-3",children:[o.jsx("div",{className:"text-xl bg-white/10 p-2 rounded-full flex items-center justify-center w-10 h-10 shadow-md flex-shrink-0",children:o.jsx("img",{src:Bi,alt:"Baguio City Logo",className:"w-8 h-8 rounded-full object-cover"})}),o.jsxs("div",{children:[o.jsx("h1",{className:"text-xl font-bold mb-0 text-white/95 shadow-sm",children:"LCCAP"}),o.jsx("p",{className:"text-xs mb-0 text-white/80 shadow-sm",children:"Climate Action Platform"})]})]})})}):o.jsx("header",{className:"fixed top-0 left-0 right-0 z-50 w-full h-16 bg-gradient-to-r from-green-700 to-green-600 text-white p-4 flex justify-between items-center shadow-lg border-2 border-green-400/40 border-b-4 border-green-400/60",children:o.jsxs("div",{className:"flex justify-between items-center w-full max-w-6xl mx-auto",children:[o.jsxs("div",{className:"flex items-center gap-4",children:[t&&o.jsx("button",{className:"bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all duration-300 flex items-center justify-center text-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95",onClick:n,children:o.jsx("span",{children:"☰"})}),o.jsxs("div",{className:"flex items-center gap-3",children:[o.jsx("div",{className:"text-xl bg-white/10 p-2 rounded-full flex items-center justify-center w-10 h-10 shadow-md flex-shrink-0",children:o.jsx("img",{src:Bi,alt:"Baguio City Logo",className:"w-8 h-8 rounded-full object-cover"})}),o.jsxs("div",{children:[o.jsx("h1",{className:"text-xl font-bold mb-0 text-white/95 shadow-sm",children:"LCCAP Management"}),o.jsx("p",{className:"text-xs mb-0 text-white/80 shadow-sm",children:"Local Climate Change Action Plan"})]})]})]}),o.jsx("div",{className:"flex items-center gap-8",children:o.jsx("div",{className:"flex items-center gap-3",children:o.jsxs("button",{className:"bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95",children:[o.jsx("span",{className:"text-base",children:"👤"}),o.jsx("span",{className:"hidden sm:inline whitespace-nowrap",children:"Profile"})]})})})]})}),Ff=({minimal:e=!1})=>{if(e)return o.jsx("footer",{className:"absolute bottom-0 left-0 right-0 text-center p-5 z-5 bg-transparent",children:o.jsxs("div",{className:"flex items-center justify-center gap-5 text-white/80 text-sm",children:[o.jsx("svg",{className:"w-5 h-5 opacity-60",viewBox:"0 0 24 24",fill:"#4a7c59",children:o.jsx("path",{d:"M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"})}),o.jsx("span",{children:"© 2026 City Environment and Parks Management Office"}),o.jsx("svg",{className:"w-5 h-5 opacity-60",viewBox:"0 0 24 24",fill:"#4a7c59",children:o.jsx("path",{d:"M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"})})]})})},Rf=({onLogin:e})=>{const[t,n]=F.useState({username:"",password:"",rememberMe:!1}),[r,l]=F.useState(!1),[i,s]=F.useState({});F.useEffect(()=>{const v=w=>{w.preventDefault(),w.stopPropagation()},y=w=>{w.ctrlKey&&(w.key==="+"||w.key==="-"||w.key==="0")&&(w.preventDefault(),w.stopPropagation())},g=w=>{w.touches.length>1&&w.preventDefault()};document.addEventListener("wheel",v,{passive:!1}),document.addEventListener("touchmove",v,{passive:!1}),document.addEventListener("keydown",y),document.addEventListener("touchstart",g,{passive:!1});const N=document.querySelector('meta[name="viewport"]');return N&&N.setAttribute("content","width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"),()=>{document.removeEventListener("wheel",v),document.removeEventListener("touchmove",v),document.removeEventListener("keydown",y),document.removeEventListener("touchstart",g)}},[]);const a=v=>{const{name:y,value:g,type:N,checked:w}=v.target;n(j=>({...j,[y]:N==="checkbox"?w:g})),i[y]&&s(j=>({...j,[y]:""}))},u=()=>{const v={};return t.username.trim()||(v.username="Username is required"),t.password||(v.password="Password is required"),v},d=async v=>{v.preventDefault();const y=u();if(Object.keys(y).length>0){s(y);return}l(!0),setTimeout(()=>{l(!1),console.log("Login attempt:",t),e(t)},2e3)};return o.jsxs(o.Fragment,{children:[o.jsx("style",{jsx:!0,children:`
        /* Login Page Styles */
        .login-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          padding: 80px 20px 60px 20px;
          box-sizing: border-box;
          background: #F5F7F6;
        }

        body {
          overflow: hidden;
          touch-action: none;
          zoom: 1;
          margin: 0;
          padding: 0;
        }

        /* Login Card - Perfect Centering */
        .login-card {
          position: relative;
          z-index: 10;
          background: white;
          border-radius: 16px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
          padding: 20px;
          width: 100%;
          max-width: 320px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        /* Logo Container - Centered */
        .logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 15px;
          width: 100%;
        }

        .logo {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2E7D32, #4CAF50);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 12px rgba(46, 125, 50, 0.25);
        }

        .logo-image {
          width: 35px;
          height: 35px;
          object-fit: cover;
          border-radius: 50%;
        }

        /* Login Header - Centered */
        .login-header {
          text-align: center;
          margin-bottom: 15px;
          width: 100%;
        }

        .office-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #2E7D32;
          margin-bottom: 4px;
          line-height: 1.2;
          text-align: center;
        }

        .system-title {
          font-size: 0.85rem;
          font-weight: 500;
          color: #424242;
          line-height: 1.3;
          text-align: center;
        }

        /* Form Styles - Centered */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: center;
          width: 100%;
          align-items: center;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: center;
          width: 100%;
          align-items: center;
        }

        .form-input {
          width: 100%;
          max-width: 280px;
          padding: 8px 12px;
          border: 2px solid #E0E0E0;
          border-radius: 8px;
          font-size: 0.85rem;
          background: #F5F5F5;
          transition: all 0.3s ease;
          outline: none;
          text-align: center;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: #4CAF50;
          background: white;
          box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
          text-align: center;
        }

        .form-input.error {
          border-color: #F44336;
          background: #FFEBEE;
          text-align: center;
        }

        .form-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          text-align: center;
        }

        .error-message {
          color: #F44336;
          font-size: 0.75rem;
          margin-top: 2px;
          text-align: center;
        }

        /* Form Options - Centered */
        .form-options {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 6px;
          text-align: center;
          width: 100%;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 0.75rem;
          color: #424242;
          text-align: center;
        }

        .checkbox-container input[type="checkbox"] {
          display: none;
        }

        .checkmark {
          width: 16px;
          height: 16px;
          border: 2px solid #E0E0E0;
          border-radius: 3px;
          margin-right: 6px;
          position: relative;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .checkbox-container input[type="checkbox"]:checked + .checkmark {
          background: #4CAF50;
          border-color: #4CAF50;
        }

        .checkbox-container input[type="checkbox"]:checked + .checkmark::after {
          content: '';
          position: absolute;
          left: 4px;
          top: 1px;
          width: 3px;
          height: 6px;
          border: solid white;
          border-width: 0 1.5px 1.5px 0;
          transform: rotate(45deg);
        }

        .forgot-password {
          color: #4CAF50;
          text-decoration: none;
          font-size: 0.75rem;
          transition: color 0.3s ease;
          text-align: center;
        }

        .forgot-password:hover {
          color: #2E7D32;
          text-decoration: underline;
        }

        /* Login Button - Centered */
        .login-button {
          width: 100%;
          max-width: 280px;
          padding: 10px;
          background: linear-gradient(135deg, #2E7D32, #4CAF50);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 3px 8px rgba(46, 125, 50, 0.25);
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(46, 125, 50, 0.35);
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-align: center;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Loading Overlay - Centered */
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
        }

        .loading-animation {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .pine-tree {
          position: relative;
          width: 60px;
          height: 80px;
        }

        .tree-trunk {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 30px;
          background: #8D6E63;
          border-radius: 2px;
        }

        .tree-leaves {
          position: absolute;
          border-radius: 50%;
          background: #4CAF50;
        }

        .tree-leaves.layer-1 {
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
        }

        .tree-leaves.layer-2 {
          bottom: 35px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
        }

        .tree-leaves.layer-3 {
          bottom: 45px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 20px;
        }

        .loading-text {
          color: #424242;
          font-size: 1rem;
          font-weight: 500;
          margin-top: 10px;
          text-align: center;
        }

        /* Background Elements - Hidden */
        .background-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          display: none;
        }

        .park-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: brightness(0.8);
          display: none;
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(46, 125, 50, 0.9), rgba(76, 175, 80, 0.8));
          z-index: 1;
          display: none;
        }

        body {
          overflow: hidden;
          touch-action: none;
          zoom: 1;
          margin: 0;
          padding: 0;
        }

        /* Login Card */
        .login-card {
          position: relative;
          z-index: 10;
          background: white;
          border-radius: 16px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
          padding: 20px;
          width: 100%;
          max-width: 320px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Logo Container */
        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 15px;
        }

        .logo {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2E7D32, #4CAF50);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 12px rgba(46, 125, 50, 0.25);
        }

        .logo-image {
          width: 35px;
          height: 35px;
          object-fit: cover;
          border-radius: 50%;
        }

        /* Login Header */
        .login-header {
          text-align: center;
          margin-bottom: 15px;
        }

        .office-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #2E7D32;
          margin-bottom: 4px;
          line-height: 1.2;
        }

        .system-title {
          font-size: 0.85rem;
          font-weight: 500;
          color: #424242;
          line-height: 1.3;
        }

        /* Form Styles */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
        }

        .form-input {
          width: 100%;
          padding: 8px 12px;
          border: 2px solid #E0E0E0;
          border-radius: 8px;
          font-size: 0.85rem;
          background: #F5F5F5;
          transition: all 0.3s ease;
          outline: none;
          text-align: left;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: #4CAF50;
          background: white;
          box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
          text-align: left;
        }

        .form-input.error {
          border-color: #F44336;
          background: #FFEBEE;
          text-align: left;
        }

        .form-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          text-align: left;
        }

        .error-message {
          color: #F44336;
          font-size: 0.75rem;
          margin-top: 2px;
          text-align: left;
        }

        /* Form Options */
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
          text-align: left;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 0.75rem;
          color: #424242;
          text-align: left;
        }

        .checkbox-container input[type="checkbox"] {
          display: none;
        }

        .checkmark {
          width: 16px;
          height: 16px;
          border: 2px solid #E0E0E0;
          border-radius: 3px;
          margin-right: 6px;
          position: relative;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .checkbox-container input[type="checkbox"]:checked + .checkmark {
          background: #4CAF50;
          border-color: #4CAF50;
        }

        .checkbox-container input[type="checkbox"]:checked + .checkmark::after {
          content: '';
          position: absolute;
          left: 4px;
          top: 1px;
          width: 3px;
          height: 6px;
          border: solid white;
          border-width: 0 1.5px 1.5px 0;
          transform: rotate(45deg);
        }

        .forgot-password {
          color: #4CAF50;
          text-decoration: none;
          font-size: 0.75rem;
          transition: color 0.3s ease;
          text-align: right;
        }

        .forgot-password:hover {
          color: #2E7D32;
          text-decoration: underline;
        }

        /* Login Button */
        .login-button {
          width: 100%;
          padding: 10px;
          background: linear-gradient(135deg, #2E7D32, #4CAF50);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 3px 8px rgba(46, 125, 50, 0.25);
          text-align: center;
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(46, 125, 50, 0.35);
          text-align: center;
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          text-align: center;
        }

        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-align: center;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Loading Overlay */
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
        }

        .loading-animation {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .pine-tree {
          position: relative;
          width: 60px;
          height: 80px;
        }

        .tree-trunk {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 30px;
          background: #8D6E63;
          border-radius: 2px;
        }

        .tree-leaves {
          position: absolute;
          border-radius: 50%;
          background: #4CAF50;
        }

        .tree-leaves.layer-1 {
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
        }

        .tree-leaves.layer-2 {
          bottom: 35px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
        }

        .tree-leaves.layer-3 {
          bottom: 45px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 20px;
        }

        .loading-text {
          color: #424242;
          font-size: 1rem;
          font-weight: 500;
          margin-top: 10px;
        }

        /* Footer Positioning */
        .footer-container {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 20;
          background: linear-gradient(135deg, #2E7D32, #4CAF50);
          color: white;
          padding: 1rem;
          text-align: center;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
          border: 2px solid rgba(76, 175, 80, 0.4);
          borderTop: 4px solid rgba(76, 175, 80, 0.6);
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .footer-icon {
          font-size: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .footer-text h3 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .footer-text p {
          font-size: 0.75rem;
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .footer-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .footer-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .footer-item:hover {
          color: rgba(255, 255, 255, 1);
          transform: translateY(-1px);
        }

        .footer-item .footer-icon {
          font-size: 1rem;
          opacity: 0.8;
        }

        .footer-item:hover .footer-icon {
          opacity: 1;
        }

        /* Responsive Footer */
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }

          .footer-info {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}),o.jsx(ir,{minimal:!0}),o.jsxs("div",{className:"login-container",children:[o.jsxs("div",{className:"background-elements",children:[o.jsx("div",{className:"park-background",style:{backgroundImage:`url(${Mf})`}}),o.jsx("div",{className:"background-overlay"})]}),o.jsxs("div",{className:"login-card",children:[o.jsx("div",{className:"logo-container",children:o.jsx("div",{className:"logo",children:o.jsx("img",{src:Bi,alt:"Baguio City Logo",className:"logo-image"})})}),o.jsxs("div",{className:"login-header",children:[o.jsx("h1",{className:"office-title",children:"City Environment and Parks Management Office"}),o.jsx("h2",{className:"system-title",children:"Local Climate Change Action Plan"})]}),o.jsxs("form",{onSubmit:d,className:"login-form",children:[o.jsxs("div",{className:"form-group",children:[o.jsx("input",{type:"text",name:"username",value:t.username,onChange:a,placeholder:"Username",className:`form-input ${i.username?"error":""}`,"aria-label":"Username",disabled:r}),i.username&&o.jsx("span",{className:"error-message",children:i.username})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("input",{type:"password",name:"password",value:t.password,onChange:a,placeholder:"Password",className:`form-input ${i.password?"error":""}`,"aria-label":"Password",disabled:r}),i.password&&o.jsx("span",{className:"error-message",children:i.password})]}),o.jsxs("div",{className:"form-options",children:[o.jsxs("label",{className:"checkbox-container",children:[o.jsx("input",{type:"checkbox",name:"rememberMe",checked:t.rememberMe,onChange:a,disabled:r}),o.jsx("span",{className:"checkmark"}),"Remember Me"]}),o.jsx("a",{href:"#",className:"forgot-password",onClick:v=>v.preventDefault(),children:"Forgot Password?"})]}),o.jsx("button",{type:"submit",className:"login-button",disabled:r,children:r?o.jsxs("div",{className:"button-content",children:[o.jsx("div",{className:"loading-spinner"}),"Signing In..."]}):"Sign In"})]}),r&&o.jsx("div",{className:"loading-overlay",children:o.jsxs("div",{className:"loading-animation",children:[o.jsxs("div",{className:"pine-tree",children:[o.jsx("div",{className:"tree-trunk"}),o.jsx("div",{className:"tree-leaves layer-1"}),o.jsx("div",{className:"tree-leaves layer-2"}),o.jsx("div",{className:"tree-leaves layer-3"})]}),o.jsx("p",{className:"loading-text",children:"Nurturing a Sustainable Future..."})]})})]}),o.jsx("div",{className:"footer-container",children:o.jsxs("div",{className:"footer-content",children:[o.jsxs("div",{className:"footer-logo",children:[o.jsx("div",{className:"footer-icon",children:"🌿"}),o.jsxs("div",{className:"footer-text",children:[o.jsx("h3",{children:"LCCAP Dashboard"}),o.jsx("p",{children:"Low Carbon Climate Action Platform"})]})]}),o.jsxs("div",{className:"footer-info",children:[o.jsxs("div",{className:"footer-item",children:[o.jsx("span",{className:"footer-icon",children:"🌱"}),o.jsx("span",{children:"Carbon Neutral 2030"})]}),o.jsxs("div",{className:"footer-item",children:[o.jsx("span",{className:"footer-icon",children:"📊"}),o.jsx("span",{children:"Real-time Monitoring"})]}),o.jsxs("div",{className:"footer-item",children:[o.jsx("span",{className:"footer-icon",children:"🌍"}),o.jsx("span",{children:"Climate Action"})]})]})]})})]})]})};function Of({isOpen:e,onNavigate:t,currentPage:n,isMobile:r,onClose:l}){const i=[{id:"dashboard",label:"Dashboard",icon:"📊"},{id:"accomplishment",label:"Accomplishment",icon:"🏆"},{id:"calendar",label:"Calendar",icon:"📅"},{id:"report-management",label:"Reports",icon:"📋"},{id:"user-management",label:"Users",icon:"👥"}],s=j=>{t(j),r&&l()},a={width:"220px",height:"calc(100vh - 64px)",background:"#2E7D32",color:"white",display:"flex",flexDirection:"column",transition:"all 0.3s ease",position:"fixed",top:"64px",left:"0",zIndex:"40",boxShadow:"2px 0 10px rgba(0, 0, 0, 0.1)",transform:e?"translateX(0)":"translateX(-100%)"},u={height:"100%",display:"flex",flexDirection:"column"},d={flex:"1",padding:"3rem 0 1.5rem 0",overflowY:"auto"},v={display:"flex",alignItems:"center",gap:"0.75rem",padding:"0.75rem 1.5rem",cursor:"pointer",transition:"all 0.3s ease",color:"rgba(255, 255, 255, 0.8)",borderRadius:"12px",position:"relative",fontSize:"15px",fontWeight:"500",margin:"0 0.75rem"},y={background:"rgba(255, 255, 255, 0.1)",transform:"translateX(4px)"},g={background:"rgba(255, 255, 255, 0.15)",color:"white"},N={marginRight:"12px",fontSize:"18px",width:"20px",textAlign:"center"},w={fontSize:"0.95rem",fontWeight:"400"};return o.jsx("div",{style:a,children:o.jsx("div",{style:u,children:o.jsx("nav",{style:d,children:i.map(j=>o.jsxs("div",{style:{...v,...n===j.id?g:{}},onClick:()=>s(j.id),onMouseOver:T=>{n!==j.id&&(T.target.style.background=y.background,T.target.style.transform=y.transform)},onMouseOut:T=>{n!==j.id&&(T.target.style.background="transparent",T.target.style.transform="translateX(0)")},children:[o.jsx("span",{style:N,children:j.icon}),o.jsx("span",{style:w,children:j.label})]},j.id))})})})}function If({onLogout:e,navigateToPage:t,sidebarOpen:n,toggleSidebar:r}){const[l,i]=F.useState(!1),[s,a]=F.useState(new Date().getDate()),[u,d]=F.useState(new Date().getMonth()),[v,y]=F.useState(new Date().getFullYear());return na.useEffect(()=>{const g=()=>{i(window.innerWidth<=768),window.innerWidth<=768&&n&&r()};return g(),window.addEventListener("resize",g),()=>window.removeEventListener("resize",g)},[n,r]),o.jsxs("div",{className:"dashboard-container",children:[o.jsx(ir,{showSidebarToggle:!0,onSidebarToggle:r}),o.jsxs("div",{className:"flex",children:[o.jsx(Of,{isOpen:n,onNavigate:t,currentPage:"dashboard",isMobile:l,onClose:r}),o.jsx("div",{className:`main-content ${n?"with-sidebar":"full-width"}`,children:o.jsxs("div",{className:"empty-state",children:[o.jsx("div",{className:"empty-icon",children:"📊"}),o.jsx("h2",{className:"empty-title",children:"Dashboard Cleared"}),o.jsx("p",{className:"empty-description",children:"The dashboard has been temporarily cleared. Content will be restored soon."})]})})]}),o.jsx(Ff,{})]})}const Af=({onLogout:e,navigateToPage:t})=>{const[n,r]=F.useState(!0),[l,i]=F.useState({title:"",category:"",description:"",date:"",impact:"",metrics:"",status:"completed",documents:null}),[s,a]=F.useState(!1),[u,d]=F.useState(""),v=()=>{r(!n)},y=c=>{t&&t(c)},g=["Environmental Protection","Climate Adaptation","Mitigation Projects","Community Engagement","Policy Implementation","Research & Development","Infrastructure","Education & Awareness"],N=[{value:"completed",label:"Completed"},{value:"in-progress",label:"In Progress"},{value:"planned",label:"Planned"}],w=c=>{const{name:f,value:x}=c.target;i(S=>({...S,[f]:x}))},j=c=>{i(f=>({...f,documents:c.target.files[0]}))},T=async c=>{c.preventDefault(),a(!0),d(""),setTimeout(()=>{a(!1),d("Accomplishment submitted successfully!"),i({title:"",category:"",description:"",date:"",impact:"",metrics:"",status:"completed",documents:null})},2e3)},p=()=>{i({title:"",category:"",description:"",date:"",impact:"",metrics:"",status:"completed",documents:null}),d("")};return o.jsxs(o.Fragment,{children:[o.jsx(ir,{showSidebarToggle:!0,onSidebarToggle:v}),o.jsxs("div",{className:"dashboard-container",children:[o.jsxs("div",{className:`sidebar ${n?"open":"closed"}`,children:[o.jsx("div",{className:"sidebar-header",children:o.jsxs("div",{className:"logo",children:[o.jsx("div",{className:"logo-icon",children:"🌿"}),o.jsx("span",{className:"logo-text",children:"LCCAP"})]})}),o.jsxs("nav",{className:"sidebar-nav",children:[o.jsxs("div",{className:"nav-item",onClick:()=>y("dashboard"),children:[o.jsx("span",{className:"nav-icon",children:"📊"}),o.jsx("span",{className:"nav-text",children:"Dashboard"})]}),o.jsxs("div",{className:"nav-item active",children:[o.jsx("span",{className:"nav-icon",children:"🏆"}),o.jsx("span",{className:"nav-text",children:"Accomplishment"})]}),o.jsxs("div",{className:"nav-item",onClick:()=>y("calendar"),children:[o.jsx("span",{className:"nav-icon",children:"📅"}),o.jsx("span",{className:"nav-text",children:"Calendar"})]}),o.jsxs("div",{className:"nav-item",onClick:()=>y("report-management"),children:[o.jsx("span",{className:"nav-icon",children:"📋"}),o.jsx("span",{className:"nav-text",children:"Report Management"})]}),o.jsxs("div",{className:"nav-item",children:[o.jsx("span",{className:"nav-icon",children:"👥"}),o.jsx("span",{className:"nav-text",children:"User Management"})]})]}),o.jsxs("div",{className:"sidebar-footer",children:[o.jsxs("div",{className:"user-profile",children:[o.jsx("div",{className:"user-avatar",children:"👤"}),o.jsxs("div",{className:"user-info",children:[o.jsx("div",{className:"user-name",children:"Admin User"}),o.jsx("div",{className:"user-role",children:"Administrator"})]})]}),o.jsxs("button",{className:"logout-btn",onClick:e,children:[o.jsx("span",{className:"logout-icon",children:"🚪"}),o.jsx("span",{children:"Logout"})]})]})]}),o.jsxs("div",{className:`main-content ${n?"with-sidebar":"full-width"}`,children:[o.jsxs("div",{className:"accomplishment-header",children:[o.jsx("h1",{className:"page-title",children:"Accomplishment Report"}),o.jsx("p",{className:"page-subtitle",children:"Document and track climate action achievements"})]}),o.jsxs("div",{className:"accomplishment-content",children:[o.jsxs("div",{className:"form-card",children:[o.jsxs("div",{className:"form-header",children:[o.jsx("h2",{className:"form-title",children:"Submit Accomplishment"}),o.jsx("p",{className:"form-description",children:"Fill in the details below to document your climate action accomplishment"})]}),o.jsxs("form",{onSubmit:T,className:"accomplishment-form",children:[o.jsxs("div",{className:"form-grid",children:[o.jsxs("div",{className:"form-column",children:[o.jsxs("div",{className:"form-group",children:[o.jsx("label",{htmlFor:"title",className:"form-label",children:"Accomplishment Title *"}),o.jsx("input",{type:"text",id:"title",name:"title",value:l.title,onChange:w,className:"form-input",placeholder:"Enter accomplishment title",required:!0})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{htmlFor:"category",className:"form-label",children:"Category *"}),o.jsxs("select",{id:"category",name:"category",value:l.category,onChange:w,className:"form-select",required:!0,children:[o.jsx("option",{value:"",children:"Select a category"}),g.map(c=>o.jsx("option",{value:c,children:c},c))]})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{htmlFor:"date",className:"form-label",children:"Completion Date *"}),o.jsx("input",{type:"date",id:"date",name:"date",value:l.date,onChange:w,className:"form-input",required:!0})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{htmlFor:"status",className:"form-label",children:"Status *"}),o.jsx("div",{className:"radio-group",children:N.map(c=>o.jsxs("label",{className:"radio-label",children:[o.jsx("input",{type:"radio",name:"status",value:c.value,checked:l.status===c.value,onChange:w,className:"radio-input"}),o.jsx("span",{className:"radio-text",children:c.label})]},c.value))})]})]}),o.jsxs("div",{className:"form-column",children:[o.jsxs("div",{className:"form-group",children:[o.jsx("label",{htmlFor:"description",className:"form-label",children:"Description *"}),o.jsx("textarea",{id:"description",name:"description",value:l.description,onChange:w,className:"form-textarea",placeholder:"Provide a detailed description of the accomplishment",rows:4,required:!0})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{htmlFor:"impact",className:"form-label",children:"Environmental Impact"}),o.jsx("textarea",{id:"impact",name:"impact",value:l.impact,onChange:w,className:"form-textarea",placeholder:"Describe the environmental impact and benefits",rows:3})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{htmlFor:"metrics",className:"form-label",children:"Key Metrics & Results"}),o.jsx("textarea",{id:"metrics",name:"metrics",value:l.metrics,onChange:w,className:"form-textarea",placeholder:"Quantifiable results, measurements, or achievements",rows:3})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{htmlFor:"documents",className:"form-label",children:"Supporting Documents"}),o.jsx("input",{type:"file",id:"documents",name:"documents",onChange:j,className:"form-file",accept:".pdf,.doc,.docx,.jpg,.jpeg,.png"}),o.jsx("small",{className:"form-help",children:"Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB)"})]})]})]}),o.jsxs("div",{className:"form-actions",children:[o.jsx("button",{type:"button",onClick:p,className:"btn btn-secondary",disabled:s,children:"Reset Form"}),o.jsx("button",{type:"submit",className:"btn btn-primary",disabled:s,children:s?o.jsxs(o.Fragment,{children:[o.jsx("span",{className:"spinner"}),"Submitting..."]}):"Submit Accomplishment"})]}),u&&o.jsx("div",{className:"success-message",children:u})]})]}),o.jsxs("div",{className:"recent-accomplishments",children:[o.jsx("h3",{className:"section-title",children:"Recent Accomplishments"}),o.jsxs("div",{className:"accomplishment-list",children:[o.jsxs("div",{className:"accomplishment-item",children:[o.jsxs("div",{className:"item-header",children:[o.jsx("h4",{className:"item-title",children:"Urban Tree Planting Initiative"}),o.jsx("span",{className:"item-status completed",children:"Completed"})]}),o.jsx("p",{className:"item-description",children:"Successfully planted 500 trees in urban areas, improving air quality and green coverage."}),o.jsxs("div",{className:"item-meta",children:[o.jsx("span",{className:"item-category",children:"Environmental Protection"}),o.jsx("span",{className:"item-date",children:"March 15, 2024"})]})]}),o.jsxs("div",{className:"accomplishment-item",children:[o.jsxs("div",{className:"item-header",children:[o.jsx("h4",{className:"item-title",children:"Renewable Energy Workshop"}),o.jsx("span",{className:"item-status completed",children:"Completed"})]}),o.jsx("p",{className:"item-description",children:"Conducted community workshop on renewable energy options with 200+ participants."}),o.jsxs("div",{className:"item-meta",children:[o.jsx("span",{className:"item-category",children:"Education & Awareness"}),o.jsx("span",{className:"item-date",children:"March 10, 2024"})]})]}),o.jsxs("div",{className:"accomplishment-item",children:[o.jsxs("div",{className:"item-header",children:[o.jsx("h4",{className:"item-title",children:"Waste Management System Upgrade"}),o.jsx("span",{className:"item-status in-progress",children:"In Progress"})]}),o.jsx("p",{className:"item-description",children:"Implementing advanced waste segregation and recycling system across the city."}),o.jsxs("div",{className:"item-meta",children:[o.jsx("span",{className:"item-category",children:"Infrastructure"}),o.jsx("span",{className:"item-date",children:"March 1, 2024"})]})]})]})]})]})]})]})]})},bf=({onLogout:e,navigateToPage:t})=>{const[n,r]=F.useState(new Date),[l,i]=F.useState(null),[s,a]=F.useState([]),[u,d]=F.useState(!1),[v,y]=F.useState(null),[g,N]=F.useState("month"),[w,j]=F.useState(!0),T=()=>{j(!w)},p=m=>{t&&t(m)},[c,f]=F.useState({title:"",description:"",date:"",time:"",category:"meeting",location:"",priority:"medium",reminder:!1,reminderTime:"15"}),x=[{value:"meeting",label:"Meeting",color:"#4a7c59"},{value:"deadline",label:"Deadline",color:"#dc3545"},{value:"workshop",label:"Workshop",color:"#ffc107"},{value:"inspection",label:"Inspection",color:"#17a2b8"},{value:"report",label:"Report",color:"#6f42c1"},{value:"other",label:"Other",color:"#6c757d"}],S=[{value:"low",label:"Low",color:"#28a745"},{value:"medium",label:"Medium",color:"#ffc107"},{value:"high",label:"High",color:"#dc3545"}];F.useEffect(()=>{const m=localStorage.getItem("calendarEvents");m&&a(JSON.parse(m))},[]),F.useEffect(()=>{localStorage.setItem("calendarEvents",JSON.stringify(s))},[s]);const P=m=>new Date(m.getFullYear(),m.getMonth()+1,0).getDate(),_=m=>new Date(m.getFullYear(),m.getMonth(),1).getDay(),L=()=>{const m=n.getFullYear(),C=n.getMonth(),D=P(n),De=_(n),se=[];for(let Se=0;Se<De;Se++)se.push(null);for(let Se=1;Se<=D;Se++)se.push(new Date(m,C,Se));return se},I=m=>{r(C=>{const D=new Date(C);return m==="prev"?D.setMonth(D.getMonth()-1):D.setMonth(D.getMonth()+1),D})},M=m=>{i(m),f(C=>({...C,date:m.toISOString().split("T")[0]})),d(!0),y(null)},ne=(m,C)=>{C.stopPropagation(),y(m),f({title:m.title,description:m.description,date:m.date,time:m.time,category:m.category,location:m.location,priority:m.priority,reminder:m.reminder,reminderTime:m.reminderTime||"15"}),d(!0)},He=m=>{m.preventDefault();const C={id:v?v.id:Date.now().toString(),...c,createdAt:v?v.createdAt:new Date().toISOString()};a(v?D=>D.map(De=>De.id===v.id?C:De):D=>[...D,C]),be()},ve=m=>{window.confirm("Are you sure you want to delete this event?")&&(a(C=>C.filter(D=>D.id!==m)),be())},be=()=>{d(!1),y(null),f({title:"",description:"",date:"",time:"",category:"meeting",location:"",priority:"medium",reminder:!1,reminderTime:"15"})},bt=m=>{if(!m)return[];const C=m.toISOString().split("T")[0];return s.filter(D=>D.date===C)},jt=m=>{const C=x.find(D=>D.value===m);return C?C.color:"#6c757d"},St=m=>{const C=S.find(D=>D.value===m);return C?C.color:"#6c757d"},h=["January","February","March","April","May","June","July","August","September","October","November","December"],E=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];return o.jsxs(o.Fragment,{children:[o.jsx(ir,{showSidebarToggle:!0,onSidebarToggle:T}),o.jsxs("div",{className:"dashboard-container",children:[o.jsxs("div",{className:`sidebar ${w?"open":"closed"}`,children:[o.jsx("div",{className:"sidebar-header",children:o.jsxs("div",{className:"logo",children:[o.jsx("div",{className:"logo-icon",children:"🌿"}),o.jsx("span",{className:"logo-text",children:"LCCAP"})]})}),o.jsxs("nav",{className:"sidebar-nav",children:[o.jsxs("div",{className:"nav-item",onClick:()=>p("dashboard"),children:[o.jsx("span",{className:"nav-icon",children:"📊"}),o.jsx("span",{className:"nav-text",children:"Dashboard"})]}),o.jsxs("div",{className:"nav-item",onClick:()=>p("accomplishment"),children:[o.jsx("span",{className:"nav-icon",children:"🏆"}),o.jsx("span",{className:"nav-text",children:"Accomplishment"})]}),o.jsxs("div",{className:"nav-item active",children:[o.jsx("span",{className:"nav-icon",children:"📅"}),o.jsx("span",{className:"nav-text",children:"Calendar"})]}),o.jsxs("div",{className:"nav-item",onClick:()=>p("report-management"),children:[o.jsx("span",{className:"nav-icon",children:"📋"}),o.jsx("span",{className:"nav-text",children:"Report Management"})]}),o.jsxs("div",{className:"nav-item",children:[o.jsx("span",{className:"nav-icon",children:"👥"}),o.jsx("span",{className:"nav-text",children:"User Management"})]})]}),o.jsxs("div",{className:"sidebar-footer",children:[o.jsxs("div",{className:"user-profile",children:[o.jsx("div",{className:"user-avatar",children:"👤"}),o.jsxs("div",{className:"user-info",children:[o.jsx("div",{className:"user-name",children:"Admin User"}),o.jsx("div",{className:"user-role",children:"Administrator"})]})]}),o.jsxs("button",{className:"logout-btn",onClick:e,children:[o.jsx("span",{className:"logout-icon",children:"🚪"}),o.jsx("span",{children:"Logout"})]})]})]}),o.jsxs("div",{className:`main-content ${w?"with-sidebar":"full-width"}`,children:[o.jsxs("div",{className:"calendar-header",children:[o.jsxs("div",{className:"header-left",children:[o.jsx("h1",{className:"calendar-title",children:"Calendar"}),o.jsx("p",{className:"calendar-subtitle",children:"Manage your climate action events and deadlines"})]}),o.jsxs("div",{className:"header-right",children:[o.jsxs("div",{className:"view-controls",children:[o.jsx("button",{className:`view-btn ${g==="month"?"active":""}`,onClick:()=>N("month"),children:"Month"}),o.jsx("button",{className:`view-btn ${g==="week"?"active":""}`,onClick:()=>N("week"),children:"Week"}),o.jsx("button",{className:`view-btn ${g==="day"?"active":""}`,onClick:()=>N("day"),children:"Day"})]}),o.jsx("button",{className:"add-event-btn",onClick:()=>{f(m=>({...m,date:new Date().toISOString().split("T")[0]})),d(!0),y(null)},children:"+ Add Event"})]})]}),o.jsxs("div",{className:"calendar-content",children:[g==="month"&&o.jsxs("div",{className:"month-view",children:[o.jsxs("div",{className:"month-navigation",children:[o.jsx("button",{className:"nav-btn",onClick:()=>I("prev"),children:"‹"}),o.jsxs("h2",{className:"month-year",children:[h[n.getMonth()]," ",n.getFullYear()]}),o.jsx("button",{className:"nav-btn",onClick:()=>I("next"),children:"›"})]}),o.jsxs("div",{className:"calendar-grid",children:[E.map(m=>o.jsx("div",{className:"day-header",children:m},m)),L().map((m,C)=>{const D=m?bt(m):[],De=m&&m.toDateString()===new Date().toDateString();return o.jsx("div",{className:`calendar-day ${m?"has-date":"empty"} ${De?"today":""}`,onClick:()=>m&&M(m),children:m&&o.jsxs(o.Fragment,{children:[o.jsx("div",{className:"day-number",children:m.getDate()}),o.jsxs("div",{className:"day-events",children:[D.slice(0,3).map((se,Se)=>o.jsx("div",{className:"event-dot",style:{backgroundColor:jt(se.category)},onClick:Qe=>ne(se,Qe),title:se.title},Se)),D.length>3&&o.jsxs("div",{className:"more-events",children:["+",D.length-3]})]})]})},C)})]})]}),g==="week"&&o.jsxs("div",{className:"week-view",children:[o.jsxs("div",{className:"week-navigation",children:[o.jsx("button",{className:"nav-btn",onClick:()=>I("prev"),children:"‹"}),o.jsx("h2",{className:"week-title",children:"This Week"}),o.jsx("button",{className:"nav-btn",onClick:()=>I("next"),children:"›"})]}),o.jsx("div",{className:"week-grid",children:o.jsx("div",{className:"week-placeholder",children:"Week view coming soon..."})})]}),g==="day"&&o.jsxs("div",{className:"day-view",children:[o.jsxs("div",{className:"day-navigation",children:[o.jsx("button",{className:"nav-btn",onClick:()=>I("prev"),children:"‹"}),o.jsx("h2",{className:"day-title",children:"Today"}),o.jsx("button",{className:"nav-btn",onClick:()=>I("next"),children:"›"})]}),o.jsx("div",{className:"day-grid",children:o.jsx("div",{className:"day-placeholder",children:"Day view coming soon..."})})]}),o.jsxs("div",{className:"events-list",children:[o.jsx("h3",{className:"events-list-title",children:"Upcoming Events"}),o.jsxs("div",{className:"events-container",children:[s.filter(m=>new Date(m.date)>=new Date).sort((m,C)=>new Date(m.date)-new Date(C.date)).slice(0,10).map(m=>o.jsxs("div",{className:"event-item",children:[o.jsxs("div",{className:"event-item-header",children:[o.jsx("h4",{className:"event-item-title",children:m.title}),o.jsx("span",{className:"event-priority",style:{backgroundColor:St(m.priority)},children:m.priority})]}),o.jsxs("div",{className:"event-item-details",children:[o.jsxs("div",{className:"event-datetime",children:["📅 ",new Date(m.date).toLocaleDateString()," at ",m.time]}),m.location&&o.jsxs("div",{className:"event-location",children:["📍 ",m.location]}),m.description&&o.jsx("div",{className:"event-description",children:m.description})]}),o.jsxs("div",{className:"event-item-actions",children:[o.jsx("button",{className:"edit-btn",onClick:()=>ne(m,{stopPropagation:()=>{}}),children:"Edit"}),o.jsx("button",{className:"delete-btn",onClick:()=>ve(m.id),children:"Delete"})]})]},m.id)),s.filter(m=>new Date(m.date)>=new Date).length===0&&o.jsx("div",{className:"no-events",children:"No upcoming events"})]})]})]}),u&&o.jsx("div",{className:"modal-overlay",onClick:be,children:o.jsxs("div",{className:"event-modal",onClick:m=>m.stopPropagation(),children:[o.jsxs("div",{className:"modal-header",children:[o.jsx("h3",{children:v?"Edit Event":"Add New Event"}),o.jsx("button",{className:"close-btn",onClick:be,children:"×"})]}),o.jsxs("form",{onSubmit:He,className:"event-form",children:[o.jsxs("div",{className:"form-grid",children:[o.jsxs("div",{className:"form-group",children:[o.jsx("label",{children:"Event Title *"}),o.jsx("input",{type:"text",value:c.title,onChange:m=>f(C=>({...C,title:m.target.value})),required:!0})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{children:"Category"}),o.jsx("select",{value:c.category,onChange:m=>f(C=>({...C,category:m.target.value})),children:x.map(m=>o.jsx("option",{value:m.value,children:m.label},m.value))})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{children:"Date *"}),o.jsx("input",{type:"date",value:c.date,onChange:m=>f(C=>({...C,date:m.target.value})),required:!0})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{children:"Time"}),o.jsx("input",{type:"time",value:c.time,onChange:m=>f(C=>({...C,time:m.target.value}))})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{children:"Location"}),o.jsx("input",{type:"text",value:c.location,onChange:m=>f(C=>({...C,location:m.target.value})),placeholder:"Event location"})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{children:"Priority"}),o.jsx("select",{value:c.priority,onChange:m=>f(C=>({...C,priority:m.target.value})),children:S.map(m=>o.jsx("option",{value:m.value,children:m.label},m.value))})]})]}),o.jsxs("div",{className:"form-group full-width",children:[o.jsx("label",{children:"Description"}),o.jsx("textarea",{value:c.description,onChange:m=>f(C=>({...C,description:m.target.value})),rows:4,placeholder:"Event description..."})]}),o.jsxs("div",{className:"form-group full-width",children:[o.jsxs("label",{className:"checkbox-label",children:[o.jsx("input",{type:"checkbox",checked:c.reminder,onChange:m=>f(C=>({...C,reminder:m.target.checked}))}),"Set reminder"]}),c.reminder&&o.jsxs("select",{value:c.reminderTime,onChange:m=>f(C=>({...C,reminderTime:m.target.value})),className:"reminder-select",children:[o.jsx("option",{value:"5",children:"5 minutes before"}),o.jsx("option",{value:"15",children:"15 minutes before"}),o.jsx("option",{value:"30",children:"30 minutes before"}),o.jsx("option",{value:"60",children:"1 hour before"}),o.jsx("option",{value:"1440",children:"1 day before"})]})]}),o.jsxs("div",{className:"modal-actions",children:[v&&o.jsx("button",{type:"button",className:"delete-modal-btn",onClick:()=>ve(v.id),children:"Delete"}),o.jsx("button",{type:"button",className:"cancel-btn",onClick:be,children:"Cancel"}),o.jsxs("button",{type:"submit",className:"submit-btn",children:[v?"Update":"Create"," Event"]})]})]})]})})]})]})]})},Uf=({onLogout:e,navigateToPage:t})=>{const[n,r]=F.useState(!0),[l,i]=F.useState([]),[s,a]=F.useState(!1),[u,d]=F.useState(null),[v,y]=F.useState(""),[g,N]=F.useState("all"),[w,j]=F.useState("all"),[T,p]=F.useState("date"),c=()=>{r(!n)},f=h=>{t&&t(h)},[x,S]=F.useState({title:"",category:"",description:"",date:"",author:"",status:"draft",file:null}),P=["Environmental Assessment","Climate Impact","Policy Analysis","Community Report","Technical Study","Annual Report","Research Paper","Other"],_=[{value:"draft",label:"Draft",color:"#6c757d"},{value:"review",label:"Under Review",color:"#ffc107"},{value:"approved",label:"Approved",color:"#28a745"},{value:"published",label:"Published",color:"#17a2b8"},{value:"archived",label:"Archived",color:"#6f42c1"}];F.useEffect(()=>{i([{id:1,title:"Q1 2024 Environmental Impact Assessment",category:"Environmental Assessment",description:"Comprehensive analysis of environmental impact for Q1 2024",date:"2024-03-15",author:"Dr. Sarah Chen",status:"published",downloads:145,size:"2.4 MB"},{id:2,title:"Climate Change Adaptation Strategies",category:"Climate Impact",description:"Strategic recommendations for climate adaptation",date:"2024-03-10",author:"Prof. Michael Torres",status:"approved",downloads:89,size:"1.8 MB"},{id:3,title:"Community Engagement Report",category:"Community Report",description:"Summary of community outreach activities and feedback",date:"2024-03-05",author:"Lisa Anderson",status:"review",downloads:23,size:"3.1 MB"},{id:4,title:"Renewable Energy Implementation Study",category:"Technical Study",description:"Technical analysis of renewable energy implementation",date:"2024-02-28",author:"Dr. James Wilson",status:"draft",downloads:0,size:"4.2 MB"},{id:5,title:"2023 Annual Climate Action Report",category:"Annual Report",description:"Complete annual report on climate action initiatives",date:"2024-01-15",author:"Maria Rodriguez",status:"published",downloads:312,size:"5.7 MB"}])},[]);const L=h=>{const{name:E,value:m}=h.target;S(C=>({...C,[E]:m}))},I=h=>{S(E=>({...E,file:h.target.files[0]}))},M=h=>{h.preventDefault();const E={id:u?u.id:Date.now(),...x,downloads:u?u.downloads:0,size:x.file?`${(x.file.size/(1024*1024)).toFixed(1)} MB`:"0 MB"};i(u?m=>m.map(C=>C.id===u.id?E:C):m=>[E,...m]),ve()},ne=h=>{window.confirm("Are you sure you want to delete this report?")&&i(E=>E.filter(m=>m.id!==h))},He=h=>{i(E=>E.map(m=>m.id===h.id?{...m,downloads:m.downloads+1}:m)),alert(`Downloading: ${h.title}`)},ve=()=>{a(!1),d(null),S({title:"",category:"",description:"",date:"",author:"",status:"draft",file:null})},be=h=>{d(h),S({title:h.title,category:h.category,description:h.description,date:h.date,author:h.author,status:h.status,file:null}),a(!0)},bt=l.filter(h=>{const E=h.title.toLowerCase().includes(v.toLowerCase())||h.description.toLowerCase().includes(v.toLowerCase())||h.author.toLowerCase().includes(v.toLowerCase()),m=g==="all"||h.status===g,C=w==="all"||h.category===w;return E&&m&&C}).sort((h,E)=>T==="date"?new Date(E.date)-new Date(h.date):T==="title"?h.title.localeCompare(E.title):T==="downloads"?E.downloads-h.downloads:T==="author"?h.author.localeCompare(E.author):0),jt=h=>{const E=_.find(m=>m.value===h);return E?E.color:"#6c757d"},St=h=>{const E=_.find(m=>m.value===h);return E?E.label:h};return o.jsxs(o.Fragment,{children:[o.jsx("style",{jsx:!0,children:`
        /* Report Management Styles */
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8faf8 0%, #e8f5e8 50%, #d4edd4 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Sidebar Styles */
        .sidebar {
          width: 260px;
          background: linear-gradient(135deg, #2d5016, #4a7c59);
          color: white;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          position: fixed;
          height: 100vh;
          z-index: 999;
        }

        .sidebar.open {
          transform: translateX(0);
        }

        .sidebar.closed {
          transform: translateX(-260px);
        }

        .sidebar-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          font-size: 1.5rem;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          color: rgba(255, 255, 255, 0.8);
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .nav-item.active {
          background: #4a7c59;
          color: white;
        }

        .nav-icon {
          font-size: 1.1rem;
          width: 20px;
        }

        .nav-text {
          font-size: 0.9rem;
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .user-info {
          flex: 1;
        }

        .user-name {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .user-role {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.85rem;
        }

        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .logout-icon {
          font-size: 1rem;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          transition: all 0.3s ease;
          min-height: 100vh;
        }

        .main-content.with-sidebar {
          margin-left: 260px;
        }

        .main-content.full-width {
          margin-left: 0;
        }

        /* Header */
        .report-header {
          background: white;
          padding: 2rem;
          border-bottom: 1px solid #e8f5e8;
          box-shadow: 0 2px 4px rgba(45, 80, 22, 0.05);
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          color: #2d5016;
          margin: 0;
        }

        .add-report-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #4a7c59, #2d5016);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .add-report-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(45, 80, 22, 0.3);
        }

        /* Filters */
        .filters-section {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr auto;
          gap: 1rem;
          align-items: end;
        }

        .search-box {
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #4a7c59;
          box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
        }

        .filter-select {
          padding: 0.75rem 1rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 0.9rem;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-select:focus {
          outline: none;
          border-color: #4a7c59;
          box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
        }

        .stats-container {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d5016;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #4a7c59;
          text-transform: uppercase;
        }

        /* Reports Grid */
        .reports-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .reports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .report-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(45, 80, 22, 0.08);
          border: 1px solid #e8f5e8;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .report-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(45, 80, 22, 0.15);
        }

        .report-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e8f5e8;
        }

        .report-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2d5016;
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
        }

        .report-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .report-category {
          font-size: 0.8rem;
          color: #4a7c59;
          background: #e8f5e8;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .report-status {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: 12px;
          text-transform: uppercase;
        }

        .report-description {
          font-size: 0.9rem;
          color: #6c757d;
          line-height: 1.5;
          margin: 0;
        }

        .report-footer {
          padding: 1rem 1.5rem;
          background: #f8faf8;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .report-info {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: #6c757d;
        }

        .report-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          padding: 0.4rem 0.8rem;
          border: none;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .download-btn {
          background: #4a7c59;
          color: white;
        }

        .download-btn:hover {
          background: #2d5016;
        }

        .edit-btn {
          background: #ffc107;
          color: #000;
        }

        .edit-btn:hover {
          background: #e0a800;
        }

        .delete-btn {
          background: #dc3545;
          color: white;
        }

        .delete-btn:hover {
          background: #c82333;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          padding: 1rem;
        }

        .modal {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          padding: 1.5rem;
          background: linear-gradient(135deg, #4a7c59, #2d5016);
          color: white;
          border-radius: 16px 16px 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.25rem;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }

        .close-btn:hover {
          opacity: 1;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          font-weight: 600;
          color: #2d5016;
          font-size: 0.9rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
          padding: 0.75rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 0.9rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #4a7c59;
          box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-file {
          padding: 0.75rem;
          border: 2px dashed #e9ecef;
          border-radius: 8px;
          background: #f8f9fa;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .form-file:hover {
          border-color: #4a7c59;
          background: #f0f8f0;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid #e9ecef;
          margin-top: 1rem;
        }

        .cancel-btn {
          padding: 0.75rem 1.5rem;
          background: #6c757d;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover {
          background: #5a6268;
        }

        .submit-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #4a7c59, #2d5016);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(45, 80, 22, 0.3);
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: #6c757d;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .empty-description {
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .reports-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .header-top {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .filters-section {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .stats-container {
            justify-content: space-around;
          }

          .reports-grid {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .modal-actions {
            flex-direction: column;
          }

          .cancel-btn,
          .submit-btn {
            width: 100%;
          }

          .sidebar {
            transform: translateX(-260px);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .main-content.with-sidebar {
            margin-left: 0;
          }
        }

        @media (max-width: 480px) {
          .report-header {
            padding: 1rem;
          }

          .reports-container {
            padding: 1rem;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .report-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .report-actions {
            justify-content: center;
          }
        }
      `}),o.jsx(ir,{showSidebarToggle:!0,onSidebarToggle:c}),o.jsxs("div",{className:"dashboard-container",children:[o.jsxs("div",{className:`sidebar ${n?"open":"closed"}`,children:[o.jsx("div",{className:"sidebar-header",children:o.jsxs("div",{className:"logo",children:[o.jsx("div",{className:"logo-icon",children:"🌿"}),o.jsx("span",{className:"logo-text",children:"LCCAP"})]})}),o.jsxs("nav",{className:"sidebar-nav",children:[o.jsxs("div",{className:"nav-item",onClick:()=>f("dashboard"),children:[o.jsx("span",{className:"nav-icon",children:"📊"}),o.jsx("span",{className:"nav-text",children:"Dashboard"})]}),o.jsxs("div",{className:"nav-item",onClick:()=>f("accomplishment"),children:[o.jsx("span",{className:"nav-icon",children:"🏆"}),o.jsx("span",{className:"nav-text",children:"Accomplishment"})]}),o.jsxs("div",{className:"nav-item",onClick:()=>f("calendar"),children:[o.jsx("span",{className:"nav-icon",children:"📅"}),o.jsx("span",{className:"nav-text",children:"Calendar"})]}),o.jsxs("div",{className:"nav-item active",children:[o.jsx("span",{className:"nav-icon",children:"📋"}),o.jsx("span",{className:"nav-text",children:"Report Management"})]}),o.jsxs("div",{className:"nav-item",onClick:()=>f("user-management"),children:[o.jsx("span",{className:"nav-icon",children:"👥"}),o.jsx("span",{className:"nav-text",children:"User Management"})]})]}),o.jsxs("div",{className:"sidebar-footer",children:[o.jsxs("div",{className:"user-profile",children:[o.jsx("div",{className:"user-avatar",children:"👤"}),o.jsxs("div",{className:"user-info",children:[o.jsx("div",{className:"user-name",children:"Admin User"}),o.jsx("div",{className:"user-role",children:"Administrator"})]})]}),o.jsxs("button",{className:"logout-btn",onClick:e,children:[o.jsx("span",{className:"logout-icon",children:"🚪"}),o.jsx("span",{children:"Logout"})]})]})]}),o.jsxs("div",{className:`main-content ${n?"with-sidebar":"full-width"}`,children:[o.jsx("div",{className:"report-header",children:o.jsxs("div",{className:"header-content",children:[o.jsxs("div",{className:"header-top",children:[o.jsx("h1",{className:"page-title",children:"Report Management"}),o.jsxs("button",{className:"add-report-btn",onClick:()=>a(!0),children:[o.jsx("span",{children:"+"}),"Add New Report"]})]}),o.jsxs("div",{className:"filters-section",children:[o.jsxs("div",{className:"search-box",children:[o.jsx("span",{className:"search-icon",children:"🔍"}),o.jsx("input",{type:"text",className:"search-input",placeholder:"Search reports...",value:v,onChange:h=>y(h.target.value)})]}),o.jsxs("select",{className:"filter-select",value:g,onChange:h=>N(h.target.value),children:[o.jsx("option",{value:"all",children:"All Status"}),_.map(h=>o.jsx("option",{value:h.value,children:h.label},h.value))]}),o.jsxs("select",{className:"filter-select",value:w,onChange:h=>j(h.target.value),children:[o.jsx("option",{value:"all",children:"All Categories"}),P.map(h=>o.jsx("option",{value:h,children:h},h))]}),o.jsxs("select",{className:"filter-select",value:T,onChange:h=>p(h.target.value),children:[o.jsx("option",{value:"date",children:"Sort by Date"}),o.jsx("option",{value:"title",children:"Sort by Title"}),o.jsx("option",{value:"author",children:"Sort by Author"}),o.jsx("option",{value:"downloads",children:"Sort by Downloads"})]}),o.jsxs("div",{className:"stats-container",children:[o.jsxs("div",{className:"stat-item",children:[o.jsx("span",{className:"stat-value",children:l.length}),o.jsx("span",{className:"stat-label",children:"Total"})]}),o.jsxs("div",{className:"stat-item",children:[o.jsx("span",{className:"stat-value",children:l.filter(h=>h.status==="published").length}),o.jsx("span",{className:"stat-label",children:"Published"})]})]})]})]})}),o.jsx("div",{className:"reports-container",children:bt.length>0?o.jsx("div",{className:"reports-grid",children:bt.map(h=>o.jsxs("div",{className:"report-card",children:[o.jsxs("div",{className:"report-header",children:[o.jsx("h3",{className:"report-title",children:h.title}),o.jsxs("div",{className:"report-meta",children:[o.jsx("span",{className:"report-category",children:h.category}),o.jsx("span",{className:"report-status",style:{backgroundColor:jt(h.status),color:"white"},children:St(h.status)})]}),o.jsx("p",{className:"report-description",children:h.description})]}),o.jsxs("div",{className:"report-footer",children:[o.jsxs("div",{className:"report-info",children:[o.jsxs("span",{children:["📅 ",new Date(h.date).toLocaleDateString()]}),o.jsxs("span",{children:["👤 ",h.author]}),o.jsxs("span",{children:["📊 ",h.downloads," downloads"]}),o.jsxs("span",{children:["💾 ",h.size]})]}),o.jsxs("div",{className:"report-actions",children:[o.jsx("button",{className:"action-btn download-btn",onClick:()=>He(h),children:"⬇"}),o.jsx("button",{className:"action-btn edit-btn",onClick:()=>be(h),children:"✏️"}),o.jsx("button",{className:"action-btn delete-btn",onClick:()=>ne(h.id),children:"🗑️"})]})]})]},h.id))}):o.jsxs("div",{className:"empty-state",children:[o.jsx("div",{className:"empty-icon",children:"📄"}),o.jsx("h2",{className:"empty-title",children:"No Reports Found"}),o.jsx("p",{className:"empty-description",children:v||g!=="all"||w!=="all"?"Try adjusting your filters or search terms":"Get started by adding your first report"}),o.jsxs("button",{className:"add-report-btn",onClick:()=>a(!0),children:[o.jsx("span",{children:"+"}),"Add Your First Report"]})]})})]})]}),s&&o.jsx("div",{className:"modal-overlay",onClick:ve,children:o.jsxs("div",{className:"modal",onClick:h=>h.stopPropagation(),children:[o.jsxs("div",{className:"modal-header",children:[o.jsx("h3",{className:"modal-title",children:u?"Edit Report":"Add New Report"}),o.jsx("button",{className:"close-btn",onClick:ve,children:"×"})]}),o.jsxs("form",{onSubmit:M,className:"modal-body",children:[o.jsxs("div",{className:"form-grid",children:[o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Report Title *"}),o.jsx("input",{type:"text",name:"title",value:x.title,onChange:L,className:"form-input",placeholder:"Enter report title",required:!0})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Category *"}),o.jsxs("select",{name:"category",value:x.category,onChange:L,className:"form-select",required:!0,children:[o.jsx("option",{value:"",children:"Select category"}),P.map(h=>o.jsx("option",{value:h,children:h},h))]})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Date *"}),o.jsx("input",{type:"date",name:"date",value:x.date,onChange:L,className:"form-input",required:!0})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Author *"}),o.jsx("input",{type:"text",name:"author",value:x.author,onChange:L,className:"form-input",placeholder:"Author name",required:!0})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Status *"}),o.jsx("select",{name:"status",value:x.status,onChange:L,className:"form-select",required:!0,children:_.map(h=>o.jsx("option",{value:h.value,children:h.label},h.value))})]}),o.jsxs("div",{className:"form-group",children:[o.jsx("label",{className:"form-label",children:"Upload File"}),o.jsx("input",{type:"file",onChange:I,className:"form-file",accept:".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"})]})]}),o.jsxs("div",{className:"form-group full-width",children:[o.jsx("label",{className:"form-label",children:"Description *"}),o.jsx("textarea",{name:"description",value:x.description,onChange:L,className:"form-textarea",placeholder:"Provide a detailed description of the report",rows:4,required:!0})]}),o.jsxs("div",{className:"modal-actions",children:[o.jsx("button",{type:"button",className:"cancel-btn",onClick:ve,children:"Cancel"}),o.jsxs("button",{type:"submit",className:"submit-btn",children:[u?"Update":"Create"," Report"]})]})]})]})})]})};function Bf(){const[e,t]=F.useState(!1),[n,r]=F.useState("login"),[l,i]=F.useState(!0),s=v=>{console.log("Login successful:",v),t(!0),r("dashboard")},a=()=>{t(!1),r("login")},u=v=>{r(v)},d=()=>{i(!l)};return o.jsxs("div",{className:"App",children:[n==="login"&&!e&&o.jsx(Rf,{onLogin:s}),n==="dashboard"&&e&&o.jsx(If,{onLogout:a,navigateToPage:u,sidebarOpen:l,toggleSidebar:d}),n==="accomplishment"&&e&&o.jsx(Af,{onLogout:a,navigateToPage:u,sidebarOpen:l,toggleSidebar:d}),n==="calendar"&&e&&o.jsx(bf,{onLogout:a,navigateToPage:u,sidebarOpen:l,toggleSidebar:d}),n==="report-management"&&e&&o.jsx(Uf,{onLogout:a,navigateToPage:u,sidebarOpen:l,toggleSidebar:d})]})}Xl.createRoot(document.getElementById("root")).render(o.jsx(na.StrictMode,{children:o.jsx(Bf,{})}));
