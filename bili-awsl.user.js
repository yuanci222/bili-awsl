// ==UserScript==
// @name         bili-awsl
// @namespace    vite-plugin-monkey
// @version      1.0.2
// @author       yuanci222
// @description  Auto AWSLing for Bilibili
// @match        https://www.bilibili.com/*
// ==/UserScript==

(function () {
	'use strict';

	const o={player:"#bilibili-player",toolbar:".arc_toolbar_report",sharePanel:".share_dropdown",wideModeButton:".bpx-player-ctrl-wide",wideModeButtonActivated:"bpx-state-entered",barrageInput:".bpx-player-dm-input",barrageSendButton:".bpx-player-dm-btn-send",barrageSendingArea:".bpx-player-sending-area",adBlockTip:".adblock-tips",avatar:".header-entry-mini",leftEntry:".left-entry"},s=(t,e)=>t.querySelector(e),w=(t,e)=>{const n={};for(const r in e){const a=s(t,e[r]);if(a==null)return null;n[r]=a;}return n},b=(t,e,n)=>(t.addEventListener(e,n,!1),t),h=(t,e)=>{for(const n in e)t.style.setProperty(n,e[n]);return t},i=(t,e=[],n)=>{const r=document.createElement(t);return e&&c(r,{class:v(e)}),n!=null&&n.attrs&&c(r,n.attrs),n!=null&&n.style&&h(r,n.style),n!=null&&n.html&&x(r,n.html),r},d=(t,e)=>{const n=new MutationObserver(e);return n.observe(t,{childList:!0,subtree:!0}),n},v=t=>t.join(" "),c=(t,e)=>{for(const n in e){const r=e[n];r==null?t.removeAttribute(n):t.setAttribute(n,r);}return t},x=(t,e)=>(t.innerHTML=e,t),l=(t,e)=>{const n=e();return t.append(n),n};d(document.body,()=>{const t=s(document,o.player);if(!t)return;const e=s(t,o.wideModeButton);e&&!e.className.includes(o.wideModeButtonActivated)&&e.click();});var m=(()=>typeof GM<"u"?GM:void 0)();const k="awsl;草",y={height:"28px","line-height":"28px","border-radius":"9999px",border:"none","font-size":"13px",padding:"0 12px","box-sizing":"border-box",transition:"all .3s",display:"inline-flex","-ms-flex-align":"center","align-items":"center",cursor:"pointer",color:"#ffffff"};d(document.body,async()=>{if(!s(document,o.player))return;const e=s(document,`${o.barrageSendingArea}:not([awsl="yes"])`);if(!e)return;const n=(await m.getValue("words",k)).split(";").filter(a=>!!a);B(e,n)&&c(e,{awsl:"yes"});});const B=(t,e)=>{const n=w(t,{textarea:o.barrageInput,submit:o.barrageSendButton});if(!n)return !1;const r=l(t,()=>i("div",[],{style:{display:"flex","flex-wrap":"wrap","align-items":"center",gap:"12px",padding:"12px",background:"#ffffff"}}));l(r,()=>E());for(const a of e){const u=l(r,()=>g(a));b(u,"click",()=>{n.textarea.value=a+n.textarea.value,n.textarea.dispatchEvent(new Event("input")),setTimeout(()=>{n.submit.click();},200);});}return !0},g=t=>{const e=i("button",["bui-button-blue"],{style:{...y,background:"var(--bpx-fn-color,#00a1d6)"}});return l(e,()=>i("span",["woo-button-content"],{html:t})),e},E=()=>{const t=i("button",[],{style:{...y,background:"var(--brand_pink, #FF6699)"}});return l(t,()=>i("span",["woo-button-content"],{html:"自定义/Customize"})),b(t,"click",async()=>{const e=window.prompt(`输入多个短语，以「;」分隔
Enter multiple phrases, separated by ";"`);e&&e.trim()!==""&&(await m.setValue("words",e),window.location.reload());}),t};d(document.body,()=>{const t=s(document,o.adBlockTip);t&&t.remove();});d(document.body,()=>{const t=s(document,`${o.leftEntry}:not([awsl="yes"])`);if(!t)return;t.lastChild&&t.removeChild(t.lastChild);const e=s(document,o.avatar);if(!e||e.tagName.toUpperCase()!=="A")return;const r=e.href.split("/").pop();if(!r)return;const a=`https://space.bilibili.com/${r}/cinema`,u=i("li",["v-popover-wrap"]);l(u,()=>{const p=i("a",["default-entry",""]);c(p,{href:a,target:"_blank"});const f=document.documentElement.lang;return p.innerText=f==="zh-CN"?"追剧":"Cinema",p}),t.appendChild(u),c(t,{awsl:"yes"});});

})();