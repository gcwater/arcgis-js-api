/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.20/esri/copyright.txt for details.
*/
define(["exports","./vec3f64","./common"],(function(t,a,n){"use strict";function r(t,a){return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[8]=a[8],t[9]=a[9],t[10]=a[10],t[11]=a[11],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15],t}function o(t,a,n,r,o,s,e,u,i,h,c,M,f,l,b,m,S){return t[0]=a,t[1]=n,t[2]=r,t[3]=o,t[4]=s,t[5]=e,t[6]=u,t[7]=i,t[8]=h,t[9]=c,t[10]=M,t[11]=f,t[12]=l,t[13]=b,t[14]=m,t[15]=S,t}function s(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function e(t,a){if(t===a){const n=a[1],r=a[2],o=a[3],s=a[6],e=a[7],u=a[11];t[1]=a[4],t[2]=a[8],t[3]=a[12],t[4]=n,t[6]=a[9],t[7]=a[13],t[8]=r,t[9]=s,t[11]=a[14],t[12]=o,t[13]=e,t[14]=u}else t[0]=a[0],t[1]=a[4],t[2]=a[8],t[3]=a[12],t[4]=a[1],t[5]=a[5],t[6]=a[9],t[7]=a[13],t[8]=a[2],t[9]=a[6],t[10]=a[10],t[11]=a[14],t[12]=a[3],t[13]=a[7],t[14]=a[11],t[15]=a[15];return t}function u(t,a){const n=a[0],r=a[1],o=a[2],s=a[3],e=a[4],u=a[5],i=a[6],h=a[7],c=a[8],M=a[9],f=a[10],l=a[11],b=a[12],m=a[13],S=a[14],O=a[15],I=n*u-r*e,P=n*i-o*e,E=n*h-s*e,N=r*i-o*u,L=r*h-s*u,p=o*h-s*i,d=c*m-M*b,g=c*S-f*b,q=c*O-l*b,x=M*S-f*m,R=M*O-l*m,T=f*O-l*S;let y=I*T-P*R+E*x+N*q-L*g+p*d;return y?(y=1/y,t[0]=(u*T-i*R+h*x)*y,t[1]=(o*R-r*T-s*x)*y,t[2]=(m*p-S*L+O*N)*y,t[3]=(f*L-M*p-l*N)*y,t[4]=(i*q-e*T-h*g)*y,t[5]=(n*T-o*q+s*g)*y,t[6]=(S*E-b*p-O*P)*y,t[7]=(c*p-f*E+l*P)*y,t[8]=(e*R-u*q+h*d)*y,t[9]=(r*q-n*R-s*d)*y,t[10]=(b*L-m*E+O*I)*y,t[11]=(M*E-c*L-l*I)*y,t[12]=(u*g-e*x-i*d)*y,t[13]=(n*x-r*g+o*d)*y,t[14]=(m*P-b*N-S*I)*y,t[15]=(c*N-M*P+f*I)*y,t):null}function i(t,a){const n=a[0],r=a[1],o=a[2],s=a[3],e=a[4],u=a[5],i=a[6],h=a[7],c=a[8],M=a[9],f=a[10],l=a[11],b=a[12],m=a[13],S=a[14],O=a[15];return t[0]=u*(f*O-l*S)-M*(i*O-h*S)+m*(i*l-h*f),t[1]=-(r*(f*O-l*S)-M*(o*O-s*S)+m*(o*l-s*f)),t[2]=r*(i*O-h*S)-u*(o*O-s*S)+m*(o*h-s*i),t[3]=-(r*(i*l-h*f)-u*(o*l-s*f)+M*(o*h-s*i)),t[4]=-(e*(f*O-l*S)-c*(i*O-h*S)+b*(i*l-h*f)),t[5]=n*(f*O-l*S)-c*(o*O-s*S)+b*(o*l-s*f),t[6]=-(n*(i*O-h*S)-e*(o*O-s*S)+b*(o*h-s*i)),t[7]=n*(i*l-h*f)-e*(o*l-s*f)+c*(o*h-s*i),t[8]=e*(M*O-l*m)-c*(u*O-h*m)+b*(u*l-h*M),t[9]=-(n*(M*O-l*m)-c*(r*O-s*m)+b*(r*l-s*M)),t[10]=n*(u*O-h*m)-e*(r*O-s*m)+b*(r*h-s*u),t[11]=-(n*(u*l-h*M)-e*(r*l-s*M)+c*(r*h-s*u)),t[12]=-(e*(M*S-f*m)-c*(u*S-i*m)+b*(u*f-i*M)),t[13]=n*(M*S-f*m)-c*(r*S-o*m)+b*(r*f-o*M),t[14]=-(n*(u*S-i*m)-e*(r*S-o*m)+b*(r*i-o*u)),t[15]=n*(u*f-i*M)-e*(r*f-o*M)+c*(r*i-o*u),t}function h(t){const a=t[0],n=t[1],r=t[2],o=t[3],s=t[4],e=t[5],u=t[6],i=t[7],h=t[8],c=t[9],M=t[10],f=t[11],l=t[12],b=t[13],m=t[14],S=t[15];return(a*e-n*s)*(M*S-f*m)-(a*u-r*s)*(c*S-f*b)+(a*i-o*s)*(c*m-M*b)+(n*u-r*e)*(h*S-f*l)-(n*i-o*e)*(h*m-M*l)+(r*i-o*u)*(h*b-c*l)}function c(t,a,n){const r=a[0],o=a[1],s=a[2],e=a[3],u=a[4],i=a[5],h=a[6],c=a[7],M=a[8],f=a[9],l=a[10],b=a[11],m=a[12],S=a[13],O=a[14],I=a[15];let P=n[0],E=n[1],N=n[2],L=n[3];return t[0]=P*r+E*u+N*M+L*m,t[1]=P*o+E*i+N*f+L*S,t[2]=P*s+E*h+N*l+L*O,t[3]=P*e+E*c+N*b+L*I,P=n[4],E=n[5],N=n[6],L=n[7],t[4]=P*r+E*u+N*M+L*m,t[5]=P*o+E*i+N*f+L*S,t[6]=P*s+E*h+N*l+L*O,t[7]=P*e+E*c+N*b+L*I,P=n[8],E=n[9],N=n[10],L=n[11],t[8]=P*r+E*u+N*M+L*m,t[9]=P*o+E*i+N*f+L*S,t[10]=P*s+E*h+N*l+L*O,t[11]=P*e+E*c+N*b+L*I,P=n[12],E=n[13],N=n[14],L=n[15],t[12]=P*r+E*u+N*M+L*m,t[13]=P*o+E*i+N*f+L*S,t[14]=P*s+E*h+N*l+L*O,t[15]=P*e+E*c+N*b+L*I,t}function M(t,a,n){const r=n[0],o=n[1],s=n[2];let e,u,i,h,c,M,f,l,b,m,S,O;return a===t?(t[12]=a[0]*r+a[4]*o+a[8]*s+a[12],t[13]=a[1]*r+a[5]*o+a[9]*s+a[13],t[14]=a[2]*r+a[6]*o+a[10]*s+a[14],t[15]=a[3]*r+a[7]*o+a[11]*s+a[15]):(e=a[0],u=a[1],i=a[2],h=a[3],c=a[4],M=a[5],f=a[6],l=a[7],b=a[8],m=a[9],S=a[10],O=a[11],t[0]=e,t[1]=u,t[2]=i,t[3]=h,t[4]=c,t[5]=M,t[6]=f,t[7]=l,t[8]=b,t[9]=m,t[10]=S,t[11]=O,t[12]=e*r+c*o+b*s+a[12],t[13]=u*r+M*o+m*s+a[13],t[14]=i*r+f*o+S*s+a[14],t[15]=h*r+l*o+O*s+a[15]),t}function f(t,a,n){const r=n[0],o=n[1],s=n[2];return t[0]=a[0]*r,t[1]=a[1]*r,t[2]=a[2]*r,t[3]=a[3]*r,t[4]=a[4]*o,t[5]=a[5]*o,t[6]=a[6]*o,t[7]=a[7]*o,t[8]=a[8]*s,t[9]=a[9]*s,t[10]=a[10]*s,t[11]=a[11]*s,t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15],t}function l(t,a,r,o){let s,e,u,i,h,c,M,f,l,b,m,S,O,I,P,E,N,L,p,d,g,q,x,R,T=o[0],y=o[1],v=o[2],A=Math.sqrt(T*T+y*y+v*v);return A<n.EPSILON?null:(A=1/A,T*=A,y*=A,v*=A,s=Math.sin(r),e=Math.cos(r),u=1-e,i=a[0],h=a[1],c=a[2],M=a[3],f=a[4],l=a[5],b=a[6],m=a[7],S=a[8],O=a[9],I=a[10],P=a[11],E=T*T*u+e,N=y*T*u+v*s,L=v*T*u-y*s,p=T*y*u-v*s,d=y*y*u+e,g=v*y*u+T*s,q=T*v*u+y*s,x=y*v*u-T*s,R=v*v*u+e,t[0]=i*E+f*N+S*L,t[1]=h*E+l*N+O*L,t[2]=c*E+b*N+I*L,t[3]=M*E+m*N+P*L,t[4]=i*p+f*d+S*g,t[5]=h*p+l*d+O*g,t[6]=c*p+b*d+I*g,t[7]=M*p+m*d+P*g,t[8]=i*q+f*x+S*R,t[9]=h*q+l*x+O*R,t[10]=c*q+b*x+I*R,t[11]=M*q+m*x+P*R,a!==t&&(t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),t)}function b(t,a,n){const r=Math.sin(n),o=Math.cos(n),s=a[4],e=a[5],u=a[6],i=a[7],h=a[8],c=a[9],M=a[10],f=a[11];return a!==t&&(t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),t[4]=s*o+h*r,t[5]=e*o+c*r,t[6]=u*o+M*r,t[7]=i*o+f*r,t[8]=h*o-s*r,t[9]=c*o-e*r,t[10]=M*o-u*r,t[11]=f*o-i*r,t}function m(t,a,n){const r=Math.sin(n),o=Math.cos(n),s=a[0],e=a[1],u=a[2],i=a[3],h=a[8],c=a[9],M=a[10],f=a[11];return a!==t&&(t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),t[0]=s*o-h*r,t[1]=e*o-c*r,t[2]=u*o-M*r,t[3]=i*o-f*r,t[8]=s*r+h*o,t[9]=e*r+c*o,t[10]=u*r+M*o,t[11]=i*r+f*o,t}function S(t,a,n){const r=Math.sin(n),o=Math.cos(n),s=a[0],e=a[1],u=a[2],i=a[3],h=a[4],c=a[5],M=a[6],f=a[7];return a!==t&&(t[8]=a[8],t[9]=a[9],t[10]=a[10],t[11]=a[11],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),t[0]=s*o+h*r,t[1]=e*o+c*r,t[2]=u*o+M*r,t[3]=i*o+f*r,t[4]=h*o-s*r,t[5]=c*o-e*r,t[6]=M*o-u*r,t[7]=f*o-i*r,t}function O(t,a){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=a[0],t[13]=a[1],t[14]=a[2],t[15]=1,t}function I(t,a){return t[0]=a[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=a[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function P(t,a,r){let o,s,e,u=r[0],i=r[1],h=r[2],c=Math.sqrt(u*u+i*i+h*h);return c<n.EPSILON?null:(c=1/c,u*=c,i*=c,h*=c,o=Math.sin(a),s=Math.cos(a),e=1-s,t[0]=u*u*e+s,t[1]=i*u*e+h*o,t[2]=h*u*e-i*o,t[3]=0,t[4]=u*i*e-h*o,t[5]=i*i*e+s,t[6]=h*i*e+u*o,t[7]=0,t[8]=u*h*e+i*o,t[9]=i*h*e-u*o,t[10]=h*h*e+s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t)}function E(t,a){const n=Math.sin(a),r=Math.cos(a);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=r,t[6]=n,t[7]=0,t[8]=0,t[9]=-n,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function N(t,a){const n=Math.sin(a),r=Math.cos(a);return t[0]=r,t[1]=0,t[2]=-n,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=n,t[9]=0,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function L(t,a){const n=Math.sin(a),r=Math.cos(a);return t[0]=r,t[1]=n,t[2]=0,t[3]=0,t[4]=-n,t[5]=r,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function p(t,a,n){const r=a[0],o=a[1],s=a[2],e=a[3],u=r+r,i=o+o,h=s+s,c=r*u,M=r*i,f=r*h,l=o*i,b=o*h,m=s*h,S=e*u,O=e*i,I=e*h;return t[0]=1-(l+m),t[1]=M+I,t[2]=f-O,t[3]=0,t[4]=M-I,t[5]=1-(c+m),t[6]=b+S,t[7]=0,t[8]=f+O,t[9]=b-S,t[10]=1-(c+l),t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t}function d(t,a){const n=g,r=-a[0],o=-a[1],s=-a[2],e=a[3],u=a[4],i=a[5],h=a[6],c=a[7],M=r*r+o*o+s*s+e*e;return M>0?(n[0]=2*(u*e+c*r+i*s-h*o)/M,n[1]=2*(i*e+c*o+h*r-u*s)/M,n[2]=2*(h*e+c*s+u*o-i*r)/M):(n[0]=2*(u*e+c*r+i*s-h*o),n[1]=2*(i*e+c*o+h*r-u*s),n[2]=2*(h*e+c*s+u*o-i*r)),p(t,a,n),t}const g=a.create();function q(t,a){return t[0]=a[12],t[1]=a[13],t[2]=a[14],t}function x(t,a){const n=a[0],r=a[1],o=a[2],s=a[4],e=a[5],u=a[6],i=a[8],h=a[9],c=a[10];return t[0]=Math.sqrt(n*n+r*r+o*o),t[1]=Math.sqrt(s*s+e*e+u*u),t[2]=Math.sqrt(i*i+h*h+c*c),t}function R(t,a){const n=a[0]+a[5]+a[10];let r=0;return n>0?(r=2*Math.sqrt(n+1),t[3]=.25*r,t[0]=(a[6]-a[9])/r,t[1]=(a[8]-a[2])/r,t[2]=(a[1]-a[4])/r):a[0]>a[5]&&a[0]>a[10]?(r=2*Math.sqrt(1+a[0]-a[5]-a[10]),t[3]=(a[6]-a[9])/r,t[0]=.25*r,t[1]=(a[1]+a[4])/r,t[2]=(a[8]+a[2])/r):a[5]>a[10]?(r=2*Math.sqrt(1+a[5]-a[0]-a[10]),t[3]=(a[8]-a[2])/r,t[0]=(a[1]+a[4])/r,t[1]=.25*r,t[2]=(a[6]+a[9])/r):(r=2*Math.sqrt(1+a[10]-a[0]-a[5]),t[3]=(a[1]-a[4])/r,t[0]=(a[8]+a[2])/r,t[1]=(a[6]+a[9])/r,t[2]=.25*r),t}function T(t,a,n,r){const o=a[0],s=a[1],e=a[2],u=a[3],i=o+o,h=s+s,c=e+e,M=o*i,f=o*h,l=o*c,b=s*h,m=s*c,S=e*c,O=u*i,I=u*h,P=u*c,E=r[0],N=r[1],L=r[2];return t[0]=(1-(b+S))*E,t[1]=(f+P)*E,t[2]=(l-I)*E,t[3]=0,t[4]=(f-P)*N,t[5]=(1-(M+S))*N,t[6]=(m+O)*N,t[7]=0,t[8]=(l+I)*L,t[9]=(m-O)*L,t[10]=(1-(M+b))*L,t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t}function y(t,a,n,r,o){const s=a[0],e=a[1],u=a[2],i=a[3],h=s+s,c=e+e,M=u+u,f=s*h,l=s*c,b=s*M,m=e*c,S=e*M,O=u*M,I=i*h,P=i*c,E=i*M,N=r[0],L=r[1],p=r[2],d=o[0],g=o[1],q=o[2],x=(1-(m+O))*N,R=(l+E)*N,T=(b-P)*N,y=(l-E)*L,v=(1-(f+O))*L,A=(S+I)*L,D=(b+P)*p,F=(S-I)*p,Q=(1-(f+m))*p;return t[0]=x,t[1]=R,t[2]=T,t[3]=0,t[4]=y,t[5]=v,t[6]=A,t[7]=0,t[8]=D,t[9]=F,t[10]=Q,t[11]=0,t[12]=n[0]+d-(x*d+y*g+D*q),t[13]=n[1]+g-(R*d+v*g+F*q),t[14]=n[2]+q-(T*d+A*g+Q*q),t[15]=1,t}function v(t,a){const n=a[0],r=a[1],o=a[2],s=a[3],e=n+n,u=r+r,i=o+o,h=n*e,c=r*e,M=r*u,f=o*e,l=o*u,b=o*i,m=s*e,S=s*u,O=s*i;return t[0]=1-M-b,t[1]=c+O,t[2]=f-S,t[3]=0,t[4]=c-O,t[5]=1-h-b,t[6]=l+m,t[7]=0,t[8]=f+S,t[9]=l-m,t[10]=1-h-M,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function A(t,a,n,r,o,s,e){const u=1/(n-a),i=1/(o-r),h=1/(s-e);return t[0]=2*s*u,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*s*i,t[6]=0,t[7]=0,t[8]=(n+a)*u,t[9]=(o+r)*i,t[10]=(e+s)*h,t[11]=-1,t[12]=0,t[13]=0,t[14]=e*s*2*h,t[15]=0,t}function D(t,a,n,r,o){const s=1/Math.tan(a/2);let e;return t[0]=s/n,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=s,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=o&&o!==1/0?(e=1/(r-o),t[10]=(o+r)*e,t[14]=2*o*r*e):(t[10]=-1,t[14]=-2*r),t}function F(t,a,n,r){const o=Math.tan(a.upDegrees*Math.PI/180),s=Math.tan(a.downDegrees*Math.PI/180),e=Math.tan(a.leftDegrees*Math.PI/180),u=Math.tan(a.rightDegrees*Math.PI/180),i=2/(e+u),h=2/(o+s);return t[0]=i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=h,t[6]=0,t[7]=0,t[8]=-(e-u)*i*.5,t[9]=(o-s)*h*.5,t[10]=r/(n-r),t[11]=-1,t[12]=0,t[13]=0,t[14]=r*n/(n-r),t[15]=0,t}function Q(t,a,n,r,o,s,e){const u=1/(a-n),i=1/(r-o),h=1/(s-e);return t[0]=-2*u,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*i,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*h,t[11]=0,t[12]=(a+n)*u,t[13]=(o+r)*i,t[14]=(e+s)*h,t[15]=1,t}function X(t,a,r,o){let e,u,i,h,c,M,f,l,b,m;const S=a[0],O=a[1],I=a[2],P=o[0],E=o[1],N=o[2],L=r[0],p=r[1],d=r[2];return Math.abs(S-L)<n.EPSILON&&Math.abs(O-p)<n.EPSILON&&Math.abs(I-d)<n.EPSILON?s(t):(f=S-L,l=O-p,b=I-d,m=1/Math.sqrt(f*f+l*l+b*b),f*=m,l*=m,b*=m,e=E*b-N*l,u=N*f-P*b,i=P*l-E*f,m=Math.sqrt(e*e+u*u+i*i),m?(m=1/m,e*=m,u*=m,i*=m):(e=0,u=0,i=0),h=l*i-b*u,c=b*e-f*i,M=f*u-l*e,m=Math.sqrt(h*h+c*c+M*M),m?(m=1/m,h*=m,c*=m,M*=m):(h=0,c=0,M=0),t[0]=e,t[1]=h,t[2]=f,t[3]=0,t[4]=u,t[5]=c,t[6]=l,t[7]=0,t[8]=i,t[9]=M,t[10]=b,t[11]=0,t[12]=-(e*S+u*O+i*I),t[13]=-(h*S+c*O+M*I),t[14]=-(f*S+l*O+b*I),t[15]=1,t)}function Y(t,a,n,r){const o=a[0],s=a[1],e=a[2],u=r[0],i=r[1],h=r[2];let c=o-n[0],M=s-n[1],f=e-n[2],l=c*c+M*M+f*f;l>0&&(l=1/Math.sqrt(l),c*=l,M*=l,f*=l);let b=i*f-h*M,m=h*c-u*f,S=u*M-i*c;return l=b*b+m*m+S*S,l>0&&(l=1/Math.sqrt(l),b*=l,m*=l,S*=l),t[0]=b,t[1]=m,t[2]=S,t[3]=0,t[4]=M*S-f*m,t[5]=f*b-c*S,t[6]=c*m-M*b,t[7]=0,t[8]=c,t[9]=M,t[10]=f,t[11]=0,t[12]=o,t[13]=s,t[14]=e,t[15]=1,t}function Z(t){return"mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")"}function _(t){return Math.sqrt(t[0]**2+t[1]**2+t[2]**2+t[3]**2+t[4]**2+t[5]**2+t[6]**2+t[7]**2+t[8]**2+t[9]**2+t[10]**2+t[11]**2+t[12]**2+t[13]**2+t[14]**2+t[15]**2)}function j(t,a,n){return t[0]=a[0]+n[0],t[1]=a[1]+n[1],t[2]=a[2]+n[2],t[3]=a[3]+n[3],t[4]=a[4]+n[4],t[5]=a[5]+n[5],t[6]=a[6]+n[6],t[7]=a[7]+n[7],t[8]=a[8]+n[8],t[9]=a[9]+n[9],t[10]=a[10]+n[10],t[11]=a[11]+n[11],t[12]=a[12]+n[12],t[13]=a[13]+n[13],t[14]=a[14]+n[14],t[15]=a[15]+n[15],t}function w(t,a,n){return t[0]=a[0]-n[0],t[1]=a[1]-n[1],t[2]=a[2]-n[2],t[3]=a[3]-n[3],t[4]=a[4]-n[4],t[5]=a[5]-n[5],t[6]=a[6]-n[6],t[7]=a[7]-n[7],t[8]=a[8]-n[8],t[9]=a[9]-n[9],t[10]=a[10]-n[10],t[11]=a[11]-n[11],t[12]=a[12]-n[12],t[13]=a[13]-n[13],t[14]=a[14]-n[14],t[15]=a[15]-n[15],t}function k(t,a,n){return t[0]=a[0]*n,t[1]=a[1]*n,t[2]=a[2]*n,t[3]=a[3]*n,t[4]=a[4]*n,t[5]=a[5]*n,t[6]=a[6]*n,t[7]=a[7]*n,t[8]=a[8]*n,t[9]=a[9]*n,t[10]=a[10]*n,t[11]=a[11]*n,t[12]=a[12]*n,t[13]=a[13]*n,t[14]=a[14]*n,t[15]=a[15]*n,t}function V(t,a,n,r){return t[0]=a[0]+n[0]*r,t[1]=a[1]+n[1]*r,t[2]=a[2]+n[2]*r,t[3]=a[3]+n[3]*r,t[4]=a[4]+n[4]*r,t[5]=a[5]+n[5]*r,t[6]=a[6]+n[6]*r,t[7]=a[7]+n[7]*r,t[8]=a[8]+n[8]*r,t[9]=a[9]+n[9]*r,t[10]=a[10]+n[10]*r,t[11]=a[11]+n[11]*r,t[12]=a[12]+n[12]*r,t[13]=a[13]+n[13]*r,t[14]=a[14]+n[14]*r,t[15]=a[15]+n[15]*r,t}function z(t,a){return t[0]===a[0]&&t[1]===a[1]&&t[2]===a[2]&&t[3]===a[3]&&t[4]===a[4]&&t[5]===a[5]&&t[6]===a[6]&&t[7]===a[7]&&t[8]===a[8]&&t[9]===a[9]&&t[10]===a[10]&&t[11]===a[11]&&t[12]===a[12]&&t[13]===a[13]&&t[14]===a[14]&&t[15]===a[15]}function B(t,a){const r=t[0],o=t[1],s=t[2],e=t[3],u=t[4],i=t[5],h=t[6],c=t[7],M=t[8],f=t[9],l=t[10],b=t[11],m=t[12],S=t[13],O=t[14],I=t[15],P=a[0],E=a[1],N=a[2],L=a[3],p=a[4],d=a[5],g=a[6],q=a[7],x=a[8],R=a[9],T=a[10],y=a[11],v=a[12],A=a[13],D=a[14],F=a[15];return Math.abs(r-P)<=n.EPSILON*Math.max(1,Math.abs(r),Math.abs(P))&&Math.abs(o-E)<=n.EPSILON*Math.max(1,Math.abs(o),Math.abs(E))&&Math.abs(s-N)<=n.EPSILON*Math.max(1,Math.abs(s),Math.abs(N))&&Math.abs(e-L)<=n.EPSILON*Math.max(1,Math.abs(e),Math.abs(L))&&Math.abs(u-p)<=n.EPSILON*Math.max(1,Math.abs(u),Math.abs(p))&&Math.abs(i-d)<=n.EPSILON*Math.max(1,Math.abs(i),Math.abs(d))&&Math.abs(h-g)<=n.EPSILON*Math.max(1,Math.abs(h),Math.abs(g))&&Math.abs(c-q)<=n.EPSILON*Math.max(1,Math.abs(c),Math.abs(q))&&Math.abs(M-x)<=n.EPSILON*Math.max(1,Math.abs(M),Math.abs(x))&&Math.abs(f-R)<=n.EPSILON*Math.max(1,Math.abs(f),Math.abs(R))&&Math.abs(l-T)<=n.EPSILON*Math.max(1,Math.abs(l),Math.abs(T))&&Math.abs(b-y)<=n.EPSILON*Math.max(1,Math.abs(b),Math.abs(y))&&Math.abs(m-v)<=n.EPSILON*Math.max(1,Math.abs(m),Math.abs(v))&&Math.abs(S-A)<=n.EPSILON*Math.max(1,Math.abs(S),Math.abs(A))&&Math.abs(O-D)<=n.EPSILON*Math.max(1,Math.abs(O),Math.abs(D))&&Math.abs(I-F)<=n.EPSILON*Math.max(1,Math.abs(I),Math.abs(F))}function C(t){const a=n.EPSILON,r=t[0],o=t[1],s=t[2],e=t[4],u=t[5],i=t[6],h=t[8],c=t[9],M=t[10];return Math.abs(1-(r*r+e*e+h*h))<=a&&Math.abs(1-(o*o+u*u+c*c))<=a&&Math.abs(1-(s*s+i*i+M*M))<=a}const G=c,H=w;var J=Object.freeze({__proto__:null,copy:r,set:o,identity:s,transpose:e,invert:u,adjoint:i,determinant:h,multiply:c,translate:M,scale:f,rotate:l,rotateX:b,rotateY:m,rotateZ:S,fromTranslation:O,fromScaling:I,fromRotation:P,fromXRotation:E,fromYRotation:N,fromZRotation:L,fromRotationTranslation:p,fromQuat2:d,getTranslation:q,getScaling:x,getRotation:R,fromRotationTranslationScale:T,fromRotationTranslationScaleOrigin:y,fromQuat:v,frustum:A,perspective:D,perspectiveFromFieldOfView:F,ortho:Q,lookAt:X,targetTo:Y,str:Z,frob:_,add:j,subtract:w,multiplyScalar:k,multiplyScalarAndAdd:V,exactEquals:z,equals:B,isOrthoNormal:C,mul:G,sub:H});t.add=j,t.adjoint=i,t.copy=r,t.determinant=h,t.equals=B,t.exactEquals=z,t.frob=_,t.fromQuat=v,t.fromQuat2=d,t.fromRotation=P,t.fromRotationTranslation=p,t.fromRotationTranslationScale=T,t.fromRotationTranslationScaleOrigin=y,t.fromScaling=I,t.fromTranslation=O,t.fromXRotation=E,t.fromYRotation=N,t.fromZRotation=L,t.frustum=A,t.getRotation=R,t.getScaling=x,t.getTranslation=q,t.identity=s,t.invert=u,t.isOrthoNormal=C,t.lookAt=X,t.mat4=J,t.mul=G,t.multiply=c,t.multiplyScalar=k,t.multiplyScalarAndAdd=V,t.ortho=Q,t.perspective=D,t.perspectiveFromFieldOfView=F,t.rotate=l,t.rotateX=b,t.rotateY=m,t.rotateZ=S,t.scale=f,t.set=o,t.str=Z,t.sub=H,t.subtract=w,t.targetTo=Y,t.translate=M,t.transpose=e}));