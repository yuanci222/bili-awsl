// ==UserScript==
// @name       bili-awsl
// @namespace  vite-plugin-monkey
// @version    0.0.1
// @author     yuanci222
// @match      https://www.bilibili.com/*
// @grant      GM.getValue
// @grant      GM.setValue
// ==/UserScript==

(function () {
	'use strict';

	const o={player:"#bilibili-player",toolbar:".arc_toolbar_report",sharePanel:".share_dropdown",wideModeButton:".bpx-player-ctrl-wide",wideModeButtonActivated:"bpx-state-entered",barrageInput:".bpx-player-dm-input",barrageSendButton:".bpx-player-dm-btn-send",barrageSendingArea:".bpx-player-sending-area",adBlockTip:".adblock-tips"},a=(t,e)=>t.querySelector(e),m=(t,e)=>{const n={};for(const r in e){const s=a(t,e[r]);if(s==null)return null;n[r]=s;}return n},d=(t,e,n)=>(t.addEventListener(e,n,!1),t),w=(t,e)=>{for(const n in e)t.style.setProperty(n,e[n]);return t},l=(t,e=[],n)=>{const r=document.createElement(t);return e&&i(r,{class:f(e)}),n!=null&&n.attrs&&i(r,n.attrs),n!=null&&n.style&&w(r,n.style),n!=null&&n.html&&x(r,n.html),r},c=(t,e)=>{const n=new MutationObserver(e);return n.observe(t,{childList:!0,subtree:!0}),n},f=t=>t.join(" "),i=(t,e)=>{for(const n in e){const r=e[n];r==null?t.removeAttribute(n):t.setAttribute(n,r);}return t},x=(t,e)=>(t.innerHTML=e,t),u=(t,e)=>{const n=e();return t.append(n),n};c(document.body,()=>{const t=a(document,o.player);if(!t)return;const e=a(t,o.wideModeButton);e&&!e.className.includes(o.wideModeButtonActivated)&&e.click();});var p=(()=>typeof GM<"u"?GM:void 0)();const v="awsl;草",b={height:"28px","line-height":"28px","border-radius":"9999px",border:"none","font-size":"13px",padding:"0 12px","box-sizing":"border-box",transition:"all .3s",display:"inline-flex","-ms-flex-align":"center","align-items":"center",cursor:"pointer",color:"#ffffff"};c(document.body,async()=>{if(!a(document,o.player))return;const e=a(document,`${o.barrageSendingArea}:not([awsl="yes"])`);if(!e)return;const n=(await p.getValue("words",v)).split(";").filter(s=>!!s);B(e,n)&&i(e,{awsl:"yes"});});const B=(t,e)=>{const n=m(t,{textarea:o.barrageInput,submit:o.barrageSendButton});if(!n)return !1;const r=u(t,()=>l("div",[],{style:{display:"flex","flex-wrap":"wrap","align-items":"center",gap:"12px",padding:"12px",background:"#ffffff"}}));u(r,()=>h());for(const s of e){const y=u(r,()=>k(s));d(y,"click",()=>{n.textarea.value=s+n.textarea.value,n.textarea.dispatchEvent(new Event("input")),setTimeout(()=>{n.submit.click();},200);});}return !0},k=t=>{const e=l("button",["bui-button-blue"],{style:{...b,background:"var(--bpx-fn-color,#00a1d6)"}});return u(e,()=>l("span",["woo-button-content"],{html:t})),e},h=()=>{const t=l("button",[],{style:{...b,background:"var(--brand_pink, #FF6699)"}});return u(t,()=>l("span",["woo-button-content"],{html:"自定义/Customize"})),d(t,"click",async()=>{const e=window.prompt(`输入多个短语，以「;」分隔
Enter multiple phrases, separated by ";"`);e&&e.trim()!==""&&(await p.setValue("words",e),window.location.reload());}),t};c(document.body,()=>{const t=a(document,o.adBlockTip);t&&t.remove();});

})();