"use strict";(self.webpackChunkmusicgame=self.webpackChunkmusicgame||[]).push([[30],{8420:function(n,e,t){var o=t(408);t(3473);e.Z=function(n,e){return new Promise((function(t){var r=(0,o.N8)();(0,o.t8)((0,o.iH)(r,n),e).then((function(){return t("completed")}))}))}},3030:function(n,e,t){t.r(e),t.d(e,{default:function(){return x}});var o=t(885),r=t(2791),i=t(1979),c=t(7012),u=t(8696),a=t(6151),s=t(6871),l=t(3473),m=t(8420),d=(0,l.v0)(),f=function(n,e,t){return new Promise((function(o,r){"signIn"===n?(0,l.e5)(d,e,t).then((function(n){var e=n.user;o(e)})).catch((function(n){var e=n.message;console.log(e),r(e)})):(0,l.Xb)(d,e,t).then((function(n){var e=n.user,t=window.prompt("Enter a display name:");(0,l.ck)(e,{displayName:t||"User"}).then((function(){return o(e)})),(0,m.Z)("/user/".concat(e.uid,"/numGames"),0)})).catch((function(n){var e=n.message;console.log(e),r(e)}))}))},h=(0,l.v0)(),g=function(){return new Promise((function(n){(0,l.w7)(h).then((function(){return n()}))}))},p=t(408),v=function(){return new Promise((function(n){var e=window.prompt("Please confirm your email"),t=window.prompt("Please confirm your password"),o=l.w9.credential(e,t),r=(0,l.v0)().currentUser.uid,i=(0,p.N8)();(0,p.Od)((0,p.iU)((0,p.iH)(i),"/user/".concat(r))).then((function(){(0,p.Od)((0,p.iU)((0,p.iH)(i),"/leaderboard/".concat(r))).then((function(){(0,l.aF)((0,l.v0)().currentUser,o).then((function(){(0,l.h8)((0,l.v0)().currentUser).then((function(){n()}))}))}))}))}))},w="Account_email__NBXRW",y=t(184);function x(n){var e=n.onStatusChange,t=n.setProgress,l=n.Status,m=(0,r.useState)(""),d=(0,o.Z)(m,2),h=d[0],p=d[1],x=(0,r.useState)(""),j=(0,o.Z)(x,2),k=j[0],b=j[1],C=(0,s.s0)(),Z=function(){t(20),g().then((function(){t(100),e("signedOut"),C("/")}))},S="dark"===localStorage.colorTheme?"255":"0",P=(0,i.Z)({palette:{mode:localStorage.colorTheme,primary:{light:"#757ce8",main:"#3f50b5",dark:"#002884"}},typography:{fontFamily:'"Inter", "Roboto", "Helvetica", "Arial", sans-serif'},components:{MuiButton:{styleOverrides:{root:{fontWeight:600,marginBottom:"0.5rem",justifyContent:"left",padding:"0.5rem 1.5rem",textTransform:"none",backgroundColor:"rgba(".concat(S,", ").concat(S,", ").concat(S,", 0.05)"),color:getComputedStyle(document.body).getPropertyValue("--text"),marginRight:"0.5rem"}}},MuiTextField:{styleOverrides:{root:{marginRight:"0.5rem"}}}}});return(0,y.jsxs)(c.Z,{theme:P,children:[(0,y.jsx)("h3",{children:"Account"}),"signedOut"===l?(0,y.jsxs)("div",{children:[(0,y.jsxs)("form",{style:{marginBottom:"1.5rem"},children:[(0,y.jsx)(u.Z,{type:"text",label:"Email",value:h,onInput:function(n){return p(n.target.value)},autoComplete:"username",variant:"outlined"}),(0,y.jsx)(u.Z,{type:"password",label:"Password",value:k,onInput:function(n){return b(n.target.value)},autoComplete:"current-password",variant:"outlined"})]}),(0,y.jsx)(a.Z,{onClick:function(){t(20),f("signIn",h,k).then((function(n){t(100),e(n),C("/")}))},children:"Sign In"}),(0,y.jsx)(a.Z,{onClick:function(){t(20),f("signUp",h,k).then((function(n){t(100),e(n),C("/")}))},children:"Sign Up"})]}):(0,y.jsxs)("div",{children:[(0,y.jsxs)("h2",{children:["Welcome back, ",l.displayName]}),(0,y.jsx)("span",{className:w,children:l.email}),(0,y.jsx)(a.Z,{onClick:Z,children:"Sign Out"}),(0,y.jsx)(a.Z,{onClick:function(){window.confirm("Are you sure you want to delete your account?")&&v().then((function(){return Z()}))},children:"Delete Account"})]})]})}}}]);
//# sourceMappingURL=30.02e2047a.chunk.js.map