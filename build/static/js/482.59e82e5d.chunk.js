"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[482],{23482:function(e,t,a){a.r(t);var s=a(74165),o=a(15861),r=a(29439),l=a(72791),n=a(59221),i=a(57689),c=a(11087),m=a(31243),d=a(75985),u=(a(5462),a(80184));t.default=function(){var e=(0,l.useState)(""),t=(0,r.Z)(e,2),a=t[0],x=t[1],h=(0,l.useState)(""),f=(0,r.Z)(h,2),g=f[0],p=f[1],b=(0,i.s0)(),v=function(){var e=(0,o.Z)((0,s.Z)().mark((function e(t){var o,r;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),""!==a&&""!==g){e.next=4;break}return alert("Please fill all details."),e.abrupt("return");case 4:return o={email:a,password:g},e.next=7,m.Z.post("".concat("http://3.111.23.56:5059","/api/sign-in"),o);case 7:(r=e.sent).data.success?(x(""),p(""),localStorage.removeItem("token"),localStorage.removeItem("adminToken"),localStorage.removeItem("user"),localStorage.removeItem("type"),localStorage.setItem("token",r.data.data.user.jwtToken),localStorage.setItem("type","user"),localStorage.setItem("user",JSON.stringify(r.data.data.user)),b("/user/dashboard"),setTimeout((function(){d.Am.success(r.data.message,{position:d.Am.POSITION.TOP_RIGHT,className:"toast-success"})}),500)):("Your Account is not verified."===r.data.message&&(b("/verify-otp",{state:{email:a}}),d.Am.error(r.data.message,{position:d.Am.POSITION.TOP_RIGHT,className:"toast-error"})),d.Am.error(r.data.message,{position:d.Am.POSITION.TOP_RIGHT,className:"toast-error"}));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,l.useEffect)((function(){localStorage.getItem("token")&&b("/user/dashboard")}),[]),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("div",{className:"mt-24 container max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden",children:[(0,u.jsx)("div",{className:"relative hidden xl:block xl:w-1/2 h-full",children:(0,u.jsx)("img",{className:"absolute h-auto w-full object-cover",src:n,alt:"my zomato",style:{height:"24rem"}})}),(0,u.jsx)("div",{className:"w-full xl:w-1/2 p-8",children:(0,u.jsxs)("form",{onSubmit:v,children:[(0,u.jsx)("h1",{className:"text-2xl font-bold text-[#452a72]",children:"Sign in to your account"}),(0,u.jsxs)("div",{children:[(0,u.jsx)("span",{className:"text-gray-600 text-sm",children:"Don't have an account? \xa0 "}),(0,u.jsx)(c.rU,{to:"/register",className:"text-gray-700 text-sm font-semibold",children:"Sign up"})]}),(0,u.jsxs)("div",{className:"mb-6 mt-6",children:[(0,u.jsx)("label",{className:"block text-gray-700 text-sm font-semibold mb-2",htmlFor:"email",children:"Email"}),(0,u.jsx)("input",{className:"text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10",id:"email",type:"text",placeholder:"Your email address",value:a,onChange:function(e){x(e.target.value)}})]}),(0,u.jsxs)("div",{className:"mb-3 mt-6",children:[(0,u.jsx)("label",{className:"block text-gray-700 text-sm font-semibold mb-2",htmlFor:"password",children:"Password"}),(0,u.jsx)("input",{className:"mb-2 text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline h-10",id:"password",type:"password",placeholder:"Your password",value:g,onChange:function(e){p(e.target.value)}}),(0,u.jsxs)("div",{className:"flex justify-between",children:[(0,u.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,u.jsx)("input",{type:"checkbox",id:"remember",className:"w-4 h-4 transition duration-300 rounded   focus:outline-none "}),(0,u.jsx)("label",{htmlFor:"remember",className:"text-sm font-semibold text-gray-500",children:"Remember me"})]}),(0,u.jsx)(c.rU,{className:"inline-block align-baseline text-sm text-gray-600 hover:text-gray-800",to:"/forgot-password",children:"Forgot Password?"})]})]}),(0,u.jsx)("div",{className:"flex w-full mt-8",children:(0,u.jsx)("button",{className:"w-full bg-[#452a72]   hover:border hover:border-[#452a72] text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10",type:"submit",children:"Sign in"})})]})})]}),(0,u.jsx)(d.Ix,{})]})}},59221:function(e,t,a){e.exports=a.p+"static/media/signIn.4f92a1aa81dce2dba5c8.jpg"}}]);
//# sourceMappingURL=482.59e82e5d.chunk.js.map