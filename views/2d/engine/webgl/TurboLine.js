/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","./definitions"],(function(t,e){"use strict";function i(t,e){return t.x===e.x&&t.y===e.y}function x(t){if(!t)return;const e=t.length;if(e<=1)return;let x=0;for(let r=1;r<e;r++)i(t[r],t[x])||++x===r||(t[x]=t[r]);t.length=x+1}function r(t,e){return t.x=e.y,t.y=-e.x,t}function n(t,e){return t.x=-e.y,t.y=e.x,t}function s(t,e){return t.x=e.x,t.y=e.y,t}function y(t,e){return t.x=-e.x,t.y=-e.y,t}function o(t){return Math.sqrt(t.x*t.x+t.y*t.y)}function h(t,e){return t.x*e.y-t.y*e.x}function l(t,e){return t.x*e.x+t.y*e.y}function a(t,e,i,x){return t.x=e.x*i+e.y*x,t.y=e.x*x-e.y*i,t}let c=function(){function t(t,e,i){this.writeVertex=t,this.writeTriangle=e,this.canUseThinTessellation=i,this.prevNormal={x:void 0,y:void 0},this.nextNormal={x:void 0,y:void 0},this.textureNormalLeft={x:0,y:1},this.textureNormalRight={x:0,y:-1},this.textureNormal={x:void 0,y:void 0},this.joinNormal={x:void 0,y:void 0},this.inner={x:void 0,y:void 0},this.outer={x:void 0,y:void 0},this.roundStart={x:void 0,y:void 0},this.roundEnd={x:void 0,y:void 0},this.startBreak={x:void 0,y:void 0},this.endBreak={x:void 0,y:void 0},this.innerPrev={x:void 0,y:void 0},this.innerNext={x:void 0,y:void 0},this.bevelStart={x:void 0,y:void 0},this.bevelEnd={x:void 0,y:void 0},this.bevelMiddle={x:void 0,y:void 0}}var c=t.prototype;return c.tessellate=function(t,i){x(t),this.canUseThinTessellation&&i.halfWidth<e.THIN_LINE_HALF_WIDTH_THRESHOLD&&!i.offset?this.tessellateThin_(t,i):this.tessellate_(t,i)},c.tessellateThin_=function(t,e){if(t.length<2)return;const i=e.wrapDistance||65535;let x=e.initialDistance||0,r=!1,n=t[0].x,s=t[0].y;const y=t.length;for(let o=1;o<y;++o){r&&(r=!1,x=0);let e=t[o].x,y=t[o].y,h=e-n,l=y-s,a=Math.sqrt(h*h+l*l);if(h/=a,l/=a,x+a>i){r=!0;const t=(i-x)/a;a=i-x,e=(1-t)*n+t*e,y=(1-t)*s+t*y,--o}const c=this.writeVertex(n,s,0,0,h,l,l,-h,0,-1,x),u=this.writeVertex(n,s,0,0,h,l,-l,h,0,1,x);x+=a;const d=this.writeVertex(e,y,0,0,h,l,l,-h,0,-1,x),f=this.writeVertex(e,y,0,0,h,l,-l,h,0,1,x);this.writeTriangle(c,u,d),this.writeTriangle(u,d,f),n=e,s=y}},c.tessellate_=function(t,e){const x=t[0],c=t[t.length-1],u=i(x,c),d=u?3:2;if(t.length<d)return;const f=e.pixelCoordRatio,v=null!=e.capType?e.capType:0,w=null!=e.joinType?e.joinType:2,T=null!=e.miterLimit?Math.min(e.miterLimit,4):2,g=null!=e.roundLimit?Math.min(e.roundLimit,1.05):1.05,V=null!=e.halfWidth?e.halfWidth:2,m=!!e.textured;let N,b,p=null,k=null;const L=this.prevNormal,_=this.nextNormal;let E=-1,M=-1;const S=this.joinNormal;let B,D;const P=this.textureNormalLeft,j=this.textureNormalRight,A=this.textureNormal;let H=-1,R=-1;const U=e.wrapDistance||65535;let W=e.initialDistance||0;const I=this.writeVertex,q=this.writeTriangle,O=function(t,e,i,x,r,n){const s=I(N,b,B,D,i,x,t,e,r,n,W);return H>=0&&R>=0&&s>=0&&q(H,R,s),H=R,R=s,s};u&&(p=t[t.length-2],_.x=c.x-p.x,_.y=c.y-p.y,M=o(_),_.x/=M,_.y/=M);let X=!1;for(let i=0;i<t.length;++i){if(X&&(X=!1,W=0),p&&(L.x=-_.x,L.y=-_.y,E=M,W+E>U&&(X=!0)),X){const e=(U-W)/E;E=U-W,p={x:(1-e)*p.x+e*t[i].x,y:(1-e)*p.y+e*t[i].y},--i}else p=t[i];N=p.x,b=p.y;const e=i<=0&&!X,x=i===t.length-1;if(e||(W+=E),k=x?u?t[1]:null:t[i+1],k?(_.x=k.x-N,_.y=k.y-b,M=o(_),_.x/=M,_.y/=M):(_.x=void 0,_.y=void 0),!u){if(e){n(S,_),B=S.x,D=S.y,2===v&&(O(-_.y-_.x,_.x-_.y,_.x,_.y,0,-1),O(_.y-_.x,-_.x-_.y,_.x,_.y,0,1)),1===v&&(O(-_.y-_.x,_.x-_.y,_.x,_.y,-1,-1),O(_.y-_.x,-_.x-_.y,_.x,_.y,-1,1)),1!==v&&0!==v||(O(-_.y,_.x,_.x,_.y,0,-1),O(_.y,-_.x,_.x,_.y,0,1));continue}if(x){r(S,L),B=S.x,D=S.y,1!==v&&0!==v||(O(L.y,-L.x,-L.x,-L.y,0,-1),O(-L.y,L.x,-L.x,-L.y,0,1)),2===v&&(O(L.y-L.x,-L.x-L.y,-L.x,-L.y,0,-1),O(-L.y-L.x,L.x-L.y,-L.x,-L.y,0,1)),1===v&&(O(L.y-L.x,-L.x-L.y,-L.x,-L.y,1,-1),O(-L.y-L.x,L.x-L.y,-L.x,-L.y,1,1));continue}}let c,d,I=-h(L,_);if(Math.abs(I)<.01)l(L,_)>0?(S.x=L.x,S.y=L.y,I=1,c=Number.MAX_VALUE,d=!0):(n(S,_),I=1,c=1,d=!1);else{S.x=(L.x+_.x)/I,S.y=(L.y+_.y)/I,c=o(S);const t=(c-1)*V*f;d=c>4||t>E&&t>M}B=S.x,D=S.y;let q=w;switch(w){case 0:c<1.05&&(q=2);break;case 1:c<g&&(q=2);break;case 2:c>T&&(q=0)}switch(q){case 2:if(O(S.x,S.y,-L.x,-L.y,0,-1),O(-S.x,-S.y,-L.x,-L.y,0,1),x)break;if(m){const t=X?0:W;H=this.writeVertex(N,b,B,D,_.x,_.y,S.x,S.y,0,-1,t),R=this.writeVertex(N,b,B,D,_.x,_.y,-S.x,-S.y,0,1,t)}break;case 0:{const t=I<0;let e,i,o,h;if(t){const t=H;H=R,R=t,e=P,i=j}else e=j,i=P;if(d)o=t?n(this.innerPrev,L):r(this.innerPrev,L),h=t?r(this.innerNext,_):n(this.innerNext,_);else{const e=t?y(this.inner,S):s(this.inner,S);o=e,h=e}const l=t?r(this.bevelStart,L):n(this.bevelStart,L);O(o.x,o.y,-L.x,-L.y,e.x,e.y);const c=O(l.x,l.y,-L.x,-L.y,i.x,i.y);if(x)break;const u=t?n(this.bevelEnd,_):r(this.bevelEnd,_);if(d){const t=this.writeVertex(N,b,B,D,-L.x,-L.y,0,0,0,0,W);H=this.writeVertex(N,b,B,D,_.x,_.y,h.x,h.y,e.x,e.y,W),R=this.writeVertex(N,b,B,D,_.x,_.y,u.x,u.y,i.x,i.y,W),this.writeTriangle(c,t,R)}else{if(m){const t=this.bevelMiddle;t.x=(l.x+u.x)/2,t.y=(l.y+u.y)/2,a(A,t,-L.x,-L.y),O(t.x,t.y,-L.x,-L.y,A.x,A.y),a(A,t,_.x,_.y),H=this.writeVertex(N,b,B,D,_.x,_.y,t.x,t.y,A.x,A.y,W),R=this.writeVertex(N,b,B,D,_.x,_.y,h.x,h.y,e.x,e.y,W)}else{const t=H;H=R,R=t}O(u.x,u.y,_.x,_.y,i.x,i.y)}if(t){const t=H;H=R,R=t}break}case 1:{const t=I<0;let e,i;if(t){const t=H;H=R,R=t,e=P,i=j}else e=j,i=P;const o=t?y(this.inner,S):s(this.inner,S);let h,u;d?(h=t?n(this.innerPrev,L):r(this.innerPrev,L),u=t?r(this.innerNext,_):n(this.innerNext,_)):(h=o,u=o);const f=t?r(this.roundStart,L):n(this.roundStart,L),v=t?n(this.roundEnd,_):r(this.roundEnd,_),w=O(h.x,h.y,-L.x,-L.y,e.x,e.y),T=O(f.x,f.y,-L.x,-L.y,i.x,i.y);if(x)break;const g=this.writeVertex(N,b,B,D,-L.x,-L.y,0,0,0,0,W);d||this.writeTriangle(H,R,g);const V=y(this.outer,o),p=this.writeVertex(N,b,B,D,_.x,_.y,v.x,v.y,i.x,i.y,W);let k,E;const M=c>2;if(M){let e;c!==Number.MAX_VALUE?(V.x/=c,V.y/=c,e=l(L,V),e=(c*(e*e-1)+1)/e):e=-1,k=t?r(this.startBreak,L):n(this.startBreak,L),k.x+=L.x*e,k.y+=L.y*e,E=t?n(this.endBreak,_):r(this.endBreak,_),E.x+=_.x*e,E.y+=_.y*e}a(A,V,-L.x,-L.y);const U=this.writeVertex(N,b,B,D,-L.x,-L.y,V.x,V.y,A.x,A.y,W);a(A,V,_.x,_.y);const q=m?this.writeVertex(N,b,B,D,_.x,_.y,V.x,V.y,A.x,A.y,W):U,X=g,C=m?this.writeVertex(N,b,B,D,_.x,_.y,0,0,0,0,W):g;let F=-1,z=-1;if(M&&(a(A,k,-L.x,-L.y),F=this.writeVertex(N,b,B,D,-L.x,-L.y,k.x,k.y,A.x,A.y,W),a(A,E,_.x,_.y),z=this.writeVertex(N,b,B,D,_.x,_.y,E.x,E.y,A.x,A.y,W)),m?M?(this.writeTriangle(X,T,F),this.writeTriangle(X,F,U),this.writeTriangle(C,q,z),this.writeTriangle(C,z,p)):(this.writeTriangle(X,T,U),this.writeTriangle(C,q,p)):M?(this.writeTriangle(g,T,F),this.writeTriangle(g,F,z),this.writeTriangle(g,z,p)):(this.writeTriangle(g,T,U),this.writeTriangle(g,q,p)),d?(H=this.writeVertex(N,b,B,D,_.x,_.y,u.x,u.y,e.x,e.y,W),R=p):(H=m?this.writeVertex(N,b,B,D,_.x,_.y,u.x,u.y,e.x,e.y,W):w,this.writeTriangle(H,C,p),R=p),t){const t=H;H=R,R=t}break}}}},t}();t.LineTessellation=c,Object.defineProperty(t,"__esModule",{value:!0})}));