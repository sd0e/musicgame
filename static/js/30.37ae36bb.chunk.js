"use strict";(self.webpackChunkmusicgame=self.webpackChunkmusicgame||[]).push([[30],{8420:function(n,e,t){var r=t(408);t(3473);e.Z=function(n,e){return new Promise((function(t){var o=(0,r.N8)();(0,r.t8)((0,r.iH)(o,n),e).then((function(){return t("completed")}))}))}},3030:function(n,e,t){t.r(e),t.d(e,{default:function(){return y}});var r=t(885),o=t(2791),i=t(1979),c=t(7012),u=t(8696),a=t(6151),s=t(3473),l=t(8420),m=(0,s.v0)(),d=function(n,e,t){return new Promise((function(r,o){"signIn"===n?(0,s.e5)(m,e,t).then((function(n){var e=n.user;r(e)})).catch((function(n){var e=n.message;console.log(e),o(e)})):(0,s.Xb)(m,e,t).then((function(n){var e=n.user,t=window.prompt("Enter a display name:");(0,s.ck)(e,{displayName:t||"User"}).then((function(){return r(e)})),(0,l.Z)("/user/".concat(e.uid,"/numGames"),0)})).catch((function(n){var e=n.message;console.log(e),o(e)}))}))},f=(0,s.v0)(),h=function(){return new Promise((function(n){(0,s.w7)(f).then((function(){return n()}))}))},g=t(408),p=function(){return new Promise((function(n){var e=window.prompt("Please confirm your email"),t=window.prompt("Please confirm your password"),r=s.w9.credential(e,t),o=(0,s.v0)().currentUser.uid,i=(0,g.N8)();(0,g.Od)((0,g.iU)((0,g.iH)(i),"/user/".concat(o))).then((function(){(0,s.aF)((0,s.v0)().currentUser,r).then((function(){(0,s.h8)((0,s.v0)().currentUser).then((function(){n()}))}))}))}))},v="Account_email__NBXRW",w=t(184);function y(n){var e=n.onStatusChange,t=n.setProgress,s=n.Status,l=(0,o.useState)(""),m=(0,r.Z)(l,2),f=m[0],g=m[1],y=(0,o.useState)(""),x=(0,r.Z)(y,2),j=x[0],k=x[1],C=function(){t(20),h().then((function(){t(100),e("signedOut")}))},Z="dark"===localStorage.colorTheme?"255":"0",b=(0,i.Z)({palette:{mode:localStorage.colorTheme,primary:{light:"#757ce8",main:"#3f50b5",dark:"#002884"}},typography:{fontFamily:'"Inter", "Roboto", "Helvetica", "Arial", sans-serif'},components:{MuiButton:{styleOverrides:{root:{fontWeight:600,marginBottom:"0.5rem",justifyContent:"left",padding:"0.5rem 1.5rem",textTransform:"none",backgroundColor:"rgba(".concat(Z,", ").concat(Z,", ").concat(Z,", 0.05)"),color:getComputedStyle(document.body).getPropertyValue("--text"),marginRight:"0.5rem"}}},MuiTextField:{styleOverrides:{root:{marginRight:"0.5rem"}}}}});return(0,w.jsxs)(c.Z,{theme:b,children:[(0,w.jsx)("h3",{children:"Account"}),"signedOut"===s?(0,w.jsxs)("div",{children:[(0,w.jsxs)("form",{style:{marginBottom:"1.5rem"},children:[(0,w.jsx)(u.Z,{type:"text",label:"Email",value:f,onInput:function(n){return g(n.target.value)},autoComplete:"username",variant:"outlined"}),(0,w.jsx)(u.Z,{type:"password",label:"Password",value:j,onInput:function(n){return k(n.target.value)},autoComplete:"current-password",variant:"outlined"})]}),(0,w.jsx)(a.Z,{onClick:function(){t(20),d("signIn",f,j).then((function(n){t(100),e(n)}))},children:"Sign In"}),(0,w.jsx)(a.Z,{onClick:function(){t(20),d("signUp",f,j).then((function(n){t(100),e(n)}))},children:"Sign Up"})]}):(0,w.jsxs)("div",{children:[(0,w.jsxs)("h2",{children:["Welcome back, ",s.displayName]}),(0,w.jsx)("span",{className:v,children:s.email}),(0,w.jsx)(a.Z,{onClick:C,children:"Sign Out"}),(0,w.jsx)(a.Z,{onClick:function(){window.confirm("Are you sure you want to delete your account?")&&p().then((function(){return C()}))},children:"Delete Account"})]})]})}}}]);
//# sourceMappingURL=30.37ae36bb.chunk.js.map