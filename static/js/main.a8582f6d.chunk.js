(this["webpackJsonp1755-resas"]=this["webpackJsonp1755-resas"]||[]).push([[0],{179:function(e,t,n){},185:function(e,t,n){},190:function(e,t,n){},213:function(e,t,n){},214:function(e,t,n){},215:function(e,t,n){},216:function(e,t,n){},217:function(e,t,n){},218:function(e,t,n){},219:function(e,t,n){},220:function(e,t,n){},222:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(65),s=n.n(a),c=(n(179),n(8)),o=n.n(c),i=n(11),l=n(23),u=n(13),b=n(138),d=n(21),j=n(22),p=n(240),h=n(235),m=(n(185),n(1)),f=function(){return Object(m.jsxs)("div",{className:"footer",children:[Object(m.jsx)("div",{children:Object(m.jsxs)(p.a,{as:"h3",children:["Retrouvez nous sur :"," "]})}),Object(m.jsxs)("div",{className:"footer__icons",children:[Object(m.jsx)("a",{target:"_blank",href:"fb://profile/196458368600",rel:"noreferrer",children:Object(m.jsx)(j.a,{style:{color:"#3B5998",background:"white",borderRadius:"100%"},size:"3x",icon:b.a,pull:"left"})}),Object(m.jsx)("a",{target:"_blank",href:"https://www.instagram.com/1755baravin/",rel:"noreferrer",children:Object(m.jsx)(j.a,{style:{color:"#3F729B",borderRadius:"100%"},size:"3x",icon:b.b,pull:"right"})})]}),Object(m.jsx)(h.a,{}),Object(m.jsx)("div",{children:Object(m.jsxs)(p.a,{as:"h3",children:["Contactez nous !"," "]})}),Object(m.jsxs)("div",{className:"footer__icons",children:[Object(m.jsx)("a",{href:"mailto:christophemartinetti@baravin1755.com",children:Object(m.jsx)(j.a,{style:{"--fa-primary-color":"black","--fa-secondary-color":"white","--fa-secondary-opacity":.8},size:"3x",icon:d.c,pull:"left"})}),Object(m.jsx)("a",{href:"tel:0609542757",children:Object(m.jsx)(j.a,{style:{"--fa-primary-color":"firebrick","--fa-secondary-color":"black","--fa-primary-opacity":1,"--fa-secondary-opacity":1},size:"3x",icon:d.e,pull:"right"})})]}),Object(m.jsx)(h.a,{}),Object(m.jsxs)("div",{className:"footer__copyright",style:{color:"white"},children:["Copyright \xa9 ",Object(m.jsx)("a",{style:{color:"white"},href:"https://baravin1755.com",children:Object(m.jsx)("span",{children:"Le 1755 \xa0"})}),Object(m.jsx)("span",{children:" ".concat((new Date).getFullYear(),". ")})]}),Object(m.jsx)("div",{className:"footer__alvp",children:Object(m.jsxs)("a",{style:{color:"white",fontSize:"1em"},href:"mailto:pef@alvp-developments.com",children:["Made with",Object(m.jsx)(j.a,{className:"alvp__icon",color:"darkred",icon:d.d,size:"2x"}),"by ALVP-Developments Ajaccio"]})})]})},g=n(67),x=n(223),O=n(45),k=n(122),v="https://le-1755.herokuapp.com",y="resas-1755",w=function(e,t,n){var r={};r[e.target.name]=e.target.value,t(Object(O.a)(Object(O.a)({},n),r))},N=function(e){var t=new Date(e).getDate()-(new Date).getDate();return 0===t?[0,"Aujourd'hui"]:1===t?[1,"Demain"]:t<0?[-1,"Il y \xe0 ".concat(Math.abs(t)," jours")]:t>1?[2,"Dans ".concat(t," jours")]:void 0},C=function(e,t,n){return e.filter((function(e){return t(e.bookingDate)[0]===n}))},z=(n(190),function(e){var t=e.user,n=e.loading,r=e.setUser,a=e.setMessage;return Object(m.jsxs)("div",{className:"topappbar",children:[Object(m.jsx)(g.b,{to:"/",children:Object(m.jsx)("div",{className:"topappbar-image",children:Object(m.jsx)("img",{src:"./images/1755small.png",alt:"logo 1755"})})}),Object(m.jsxs)("div",{className:"topappbar-icons",children:[t?Object(m.jsx)(x.a,{icon:!0,color:"red",circular:!0,basic:!0,disabled:n,loading:n,onClick:function(){return function(e,t){localStorage.removeItem("token-".concat(y)),e(""),t({success:!0,message:"D\xe9connexion r\xe9ussie"})}(r,a)},children:Object(m.jsx)(j.a,{size:"3x",icon:d.i})}):Object(m.jsx)(g.b,{to:"/login",children:Object(m.jsx)(x.a,{icon:!0,color:t?"green":"grey",circular:!0,basic:!0,disabled:n,loading:n,children:Object(m.jsx)(j.a,{size:"3x",icon:d.i})})}),"isAdmin"===t&&Object(m.jsx)(g.b,{to:"/bookings",children:Object(m.jsx)(x.a,{icon:!0,circular:!0,disabled:n,loading:n,children:Object(m.jsx)(j.a,{size:"3x",icon:d.a})})})]})]})}),D=n(238),B=n(239),S=function(e){var t=e.message;return Object(m.jsx)(D.a,{animation:"jiggle",duration:500,visible:Object.keys(t).length>0,children:Object(m.jsxs)(B.a,{style:{position:"fixed",bottom:25,left:0,right:0,margin:"0 12px",zIndex:"1000",display:Object.keys(t).length>0&&""!==t.message?"flex":"none",border:"3px solid white",borderRadius:"50px",background:t.success?"#56ea65":"#f46161"},children:[Object(m.jsx)(j.a,{icon:t.success?d.b:d.g,color:t.success?"green":"red",size:"2x"}),Object(m.jsx)("span",{style:{display:"inline-block",alignSelf:"center",fontSize:"1.3em",paddingLeft:"12px"},children:t.message})]})})},F=n(98),A=n(47),T=n.n(A),_=function e(){Object(F.a)(this,e)};_.postAdminRegistrationToken=function(){var e=Object(i.a)(o.a.mark((function e(t,n){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,T()({method:"post",url:"".concat(v,"/api/bookings/registrationToken"),data:{registrationKey:n},headers:{Authorization:"Bearer "+t}});case 3:if(!(r=e.sent)){e.next=8;break}return e.abrupt("return",r);case 8:return e.abrupt("return",!1);case 9:e.next=14;break;case 11:return e.prev=11,e.t0=e.catch(0),e.abrupt("return",!1);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t,n){return e.apply(this,arguments)}}(),_.getAllBookings=function(){var e=Object(i.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,T()({method:"get",url:"".concat(v,"/api/bookings/allBookings"),headers:{Authorization:"Bearer "+t}});case 3:if(!(n=e.sent)){e.next=8;break}return e.abrupt("return",n);case 8:return e.abrupt("return",!1);case 9:e.next=14;break;case 11:return e.prev=11,e.t0=e.catch(0),e.abrupt("return",!1);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}(),_.postBooking=function(){var e=Object(i.a)(o.a.mark((function e(t,n){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return",!1);case 2:return e.prev=2,e.next=5,T()({method:"post",url:"".concat(v,"/api/bookings/createBooking"),data:{booking:t,pushNotificationToken:n}});case 5:if(!(r=e.sent)){e.next=10;break}return e.abrupt("return",r);case 10:return e.abrupt("return",!1);case 11:e.next=16;break;case 13:return e.prev=13,e.t0=e.catch(2),e.abrupt("return",!1);case 16:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(t,n){return e.apply(this,arguments)}}(),_.updateBooking=function(){var e=Object(i.a)(o.a.mark((function e(t,n){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return",!1);case 2:return e.prev=2,e.next=5,T()({method:"post",url:"".concat(v,"/api/bookings/updateBooking"),data:{update:t},headers:{Authorization:"Bearer "+n}});case 5:if(!(r=e.sent)){e.next=10;break}return e.abrupt("return",r);case 10:return e.abrupt("return",!1);case 11:e.next=16;break;case 13:return e.prev=13,e.t0=e.catch(2),e.abrupt("return",!1);case 16:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(t,n){return e.apply(this,arguments)}}(),_.deleteBooking=function(){var e=Object(i.a)(o.a.mark((function e(t,n){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return",!1);case 2:return e.prev=2,e.next=5,T()({method:"delete",url:"".concat(v,"/api/bookings/deleteBooking"),data:{update:t},headers:{Authorization:"Bearer "+n}});case 5:if(!(r=e.sent)){e.next=10;break}return e.abrupt("return",r);case 10:return e.abrupt("return",!1);case 11:e.next=16;break;case 13:return e.prev=13,e.t0=e.catch(2),e.abrupt("return",!1);case 16:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(t,n){return e.apply(this,arguments)}}(),_.getConfig=Object(i.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,T()({method:"get",url:"".concat(v,"/api/config/getConfig")});case 3:if(!(t=e.sent)){e.next=8;break}return e.abrupt("return",t);case 8:return e.abrupt("return",!1);case 9:e.next=14;break;case 11:return e.prev=11,e.t0=e.catch(0),e.abrupt("return",!1);case 14:case"end":return e.stop()}}),e,null,[[0,11]])}))),_.updateConfig=function(){var e=Object(i.a)(o.a.mark((function e(t,n){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return",!1);case 2:return e.prev=2,e.next=5,T()({method:"post",url:"".concat(v,"/api/config/updateConfig"),data:{update:t},headers:{Authorization:"Bearer "+n}});case 5:if(!(r=e.sent)){e.next=10;break}return e.abrupt("return",r);case 10:return e.abrupt("return",!1);case 11:e.next=16;break;case 13:return e.prev=13,e.t0=e.catch(2),e.abrupt("return",!1);case 16:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(t,n){return e.apply(this,arguments)}}(),_.auth=function(){var e=Object(i.a)(o.a.mark((function e(t){var n,r,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return",!1);case 2:return n=t.email,r=t.password,e.prev=3,e.next=6,T()({method:"post",url:"".concat(v,"/auth/login"),data:{email:n,password:r}});case 6:if(!(a=e.sent)){e.next=9;break}return e.abrupt("return",a);case 9:e.next=14;break;case 11:return e.prev=11,e.t0=e.catch(3),e.abrupt("return",!1);case 14:case"end":return e.stop()}}),e,null,[[3,11]])})));return function(t){return e.apply(this,arguments)}}();var R=_,E=n(237),I=function(e){var t=e.handleSubmitForm,n=e.credentials,r=e.setCredentials,a=e.loading;return Object(m.jsxs)(E.a,{onSubmit:t,children:[Object(m.jsxs)(E.a.Field,{required:!0,error:!n.email,children:[Object(m.jsx)("label",{htmlFor:"",children:"Email"}),Object(m.jsx)("input",{type:"email",name:"email",value:n.email,onChange:function(e){return w(e,r,n)}})]}),Object(m.jsxs)(E.a.Field,{required:!0,error:!n.password,children:[Object(m.jsx)("label",{htmlFor:"",children:"Mot de passe"}),Object(m.jsx)("input",{type:"password",name:"password",value:n.password,onChange:function(e){return w(e,r,n)}})]}),Object(m.jsx)(E.a.Field,{children:Object(m.jsx)(x.a,{size:"massive",circular:!0,loading:a,disabled:a||!n.email||!n.password,color:"blue",type:"submit",content:"Connexion"})})]})},M=function(e){var t=e.setUser,n=e.setMessage,a=Object(r.useState)({email:"",password:""}),s=Object(l.a)(a,2),c=s[0],u=s[1],b=Object(r.useState)(!1),d=Object(l.a)(b,2),j=d[0],p=d[1],h=function(){var e=Object(i.a)(o.a.mark((function e(r){var a,s,i,l,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),p(!0),e.next=4,R.auth(c);case 4:(a=e.sent)&&200===a.data.status?(s=a.data,i=s.role,l=s.message,u=s.token,n({success:!0,message:l}),p(!1),localStorage.setItem("token-".concat(y),u),t(i)):(p(!1),n({success:!1,message:a.data.message||"Identifiants incorrects"}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(m.jsx)("div",{className:"home",children:Object(m.jsx)(I,{handleSubmitForm:h,credentials:c,setCredentials:u,loading:j})})},V=n(58),L=n(100),P=(n(213),function(e){var t=e.bookerName,n=e.bookerNumber,r=e.bookingDate,a=e.bookingTime,s=e.bookingValidatedByAdmin;return Object(m.jsxs)("div",{className:"booking",style:{border:s?"3px solid green":!1===s?"3px solid pink":""},children:[Object(m.jsx)(L.a,{color:s?"green":!1===s?"pink":"blue",ribbon:!0,children:Object(m.jsx)("span",{className:"booking-ribbon ".concat(null===s&&"animate"),children:s?"Accept\xe9e":!1===s?"Refus\xe9e":"New !"})}),Object(m.jsx)("h2",{className:"booking-title",children:t}),Object(m.jsxs)("p",{className:"booking-date",children:[Object(m.jsxs)("span",{children:[N(r)[1],", Le "]}),Object(m.jsx)("span",{children:new Date(r).toLocaleString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}),Object(m.jsxs)("p",{children:[" \xe0 ",a]})]}),Object(m.jsxs)("p",{className:"booking-number",children:["Pour : ",Object(m.jsx)("span",{children:n})," personnes"]})]})}),q=Object(r.memo)(P),J=(n(214),function(e){var t=e.booking,n=e.handleValidateBooking,r=e.handleDeleteBooking;return Object(m.jsxs)("div",{className:"bookingcontrols",children:[null===t.bookingValidatedByAdmin&&Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(x.a,{icon:!0,color:"green",size:"big",circular:!0,onClick:function(){return n(t,!0)},children:Object(m.jsx)(j.a,{fixedWidth:!0,size:"2x",color:"white",icon:d.b})}),Object(m.jsx)(x.a,{icon:!0,size:"big",color:"pink",circular:!0,onClick:function(){return n(t,!1)},children:Object(m.jsx)(j.a,{fixedWidth:!0,size:"2x",color:"white",icon:d.g})})]}),null!==t.bookingValidatedByAdmin&&Object(m.jsx)(x.a,{icon:!0,color:"red",size:"massive",circular:!0,onClick:function(){return r(t)},children:Object(m.jsx)(j.a,{icon:d.h})})]})}),U=Object(r.memo)(J),W=(n(215),function(e){var t=e.setFilter,n=e.bookings;return Object(m.jsxs)("div",{className:"filterbuttons",children:[Object(m.jsxs)("div",{style:{position:"relative"},children:[Object(m.jsx)(x.a,{className:"filterbuttons-button",size:"massive",circular:!0,color:"red",content:"Jours Pr\xe9c\xe9dents",onClick:function(){t(-1)}}),Object(m.jsx)(L.a,{style:{position:"absolute",top:"-11px",left:"3px"},color:"blue",circular:!0,children:C(n,N,-1).length})]}),Object(m.jsxs)("div",{style:{position:"relative"},children:[Object(m.jsx)(x.a,{className:"filterbuttons-button",size:"massive",circular:!0,color:"green",content:"Aujourd'hui",onClick:function(){t(0)}}),Object(m.jsx)(L.a,{style:{position:"absolute",top:"-11px",left:"3px"},color:"blue",circular:!0,children:C(n,N,0).length})]}),Object(m.jsxs)("div",{style:{position:"relative"},children:[Object(m.jsx)(x.a,{className:"filterbuttons-button",size:"massive",circular:!0,color:"purple",content:"Demain",onClick:function(){t(1)}}),Object(m.jsx)(L.a,{style:{position:"absolute",top:"-11px",left:"3px"},color:"blue",circular:!0,children:C(n,N,1).length})]}),Object(m.jsxs)("div",{style:{position:"relative"},children:[Object(m.jsx)(x.a,{className:"filterbuttons-button",circular:!0,size:"massive",color:"yellow",content:"Jours Suivants",onClick:function(){return t(2)}}),Object(m.jsx)(L.a,{style:{position:"absolute",top:"-11px",left:"3px"},color:"blue",circular:!0,children:C(n,N,2).length})]})]})}),H=n(39),K=n(64),G=(n(216),function(){return Object(m.jsx)("div",{className:"nobookings",children:Object(m.jsx)("p",{children:"D\xe9sol\xe9 , Il n'y a pas de reservations pour le moment :-("})})});function Y(){return(Y=Object(i.a)(o.a.mark((function e(t,n,r,a){var s,c,i,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(!0),e.next=3,R.getAllBookings(a);case 3:(s=e.sent)&&200===s.data.status?(c=s.data,i=c.bookings,l=c.message,i.sort((function(e,t){return new Date(e.bookingDate)-new Date(t.bookingDate)})).sort((function(e,t){return(null===t.bookingValidatedByAdmin)-(null===e.bookingValidatedByAdmin)})),n(Object(V.a)(i)),t(!1),r({success:!0,message:l})):(t(!1),r({success:!1,message:"Il y a eu un probl\xe9me"}));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Q(){return(Q=Object(i.a)(o.a.mark((function e(t,n){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R.postAdminRegistrationToken(t,n);case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var X=function(e){var t=e.setMessage,n=e.bookings,a=e.setBookings,s=e.pushNotificationToken,c=Object(r.useState)(!1),u=Object(l.a)(c,2),b=u[0],d=u[1],j=Object(r.useState)(0),p=Object(l.a)(j,2),f=p[0],g=p[1];Object(r.useEffect)((function(){var e=localStorage.getItem("token-".concat(y));if(K.a.isNativePlatform()){var n=Object(k.a)(e).user;s&&n.registrationKey!==s&&function(e,t){Q.apply(this,arguments)}(e,s),H.a.removeAllDeliveredNotifications()}!function(e,t,n,r){Y.apply(this,arguments)}(d,a,t,e)}),[]);var x=function(){var e=Object(i.a)(o.a.mark((function e(r,s){var c,i,l,u,b,j;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(!0),c=localStorage.getItem("token-".concat(y)),r.bookingValidatedByAdmin=s,e.next=5,R.updateBooking(r,c);case 5:(i=e.sent)&&200===i.data.status?(l=i.data,u=l.updatedBooking,b=l.message,j=n.findIndex((function(e){return e._id===r._id})),n.splice(j,1),a([].concat(Object(V.a)(n),[u])),d(!1),t({success:!0,message:b})):(d(!1),t({success:!1,message:"Il y \xe0 eu un probl\xe8me"}));case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),v=function(){var e=Object(i.a)(o.a.mark((function e(r){var s,c,i,l,u,b;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return d(!0),s=localStorage.getItem("token-".concat(y)),e.next=4,R.deleteBooking(r,s);case 4:(c=e.sent)&&200===c.data.status?(i=c.data,l=i.deletedBooking,u=i.message,b=n.findIndex((function(e){return e._id===l._id})),n.splice(b,1),a(Object(V.a)(n)),d(!1),t({success:!0,message:u})):(d(!1),t({success:!1,message:"Il y \xe0 eu un probl\xe8me"}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(m.jsxs)("div",{children:[Object(m.jsx)(W,{setFilter:g,bookings:n,filter:f}),n.length>0&&C(n,N,f).map((function(e){return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(U,{booking:e,loading:b,handleValidateBooking:x,handleDeleteBooking:v}),Object(m.jsx)(q,Object(O.a)(Object(O.a)({},e),{},{loading:b})),Object(m.jsx)(h.a,{})]})})),0===C(n,N,f).length&&Object(m.jsx)(G,{})]})},Z=Object(r.memo)(X),$=n(242),ee=function(e){var t=e.resaOpen,n=e.handleChangeResaOpen;return Object(m.jsx)($.a,{type:"checkbox",toggle:!0,checked:t,onChange:function(){return n()},label:t?"Reservations activ\xe9es":"R\xe9servations desactiv\xe9es"})},te=n(71),ne=function(e){var t=e.handleEmptyForm;return Object(m.jsxs)(x.a,{size:"massive",circular:!0,color:"blue",icon:!0,type:"button",labelPosition:"left",onClick:function(){return t()},children:[Object(m.jsx)(te.a,{children:Object(m.jsx)(j.a,{style:{marginTop:"5px"},size:"2x",icon:d.f})}),"Recharger"]})},re=n(236),ae=function(e){var t=e.handleSubmit,n=e.booking,r=e.setBooking,a=e.loading;return Object(m.jsxs)(E.a,{onSubmit:t,children:[Object(m.jsxs)(E.a.Field,{required:!0,error:!n.bookerName,children:[Object(m.jsx)("label",{htmlFor:"bookerName",children:"Votre nom"}),Object(m.jsx)("input",{id:"bookerName",name:"bookerName",value:n.bookerName,autoComplete:"name",placeholder:"Votre nom et pr\xe9nom",type:"text",onChange:function(e){return w(e,r,n)}})]}),Object(m.jsxs)(E.a.Field,{required:!0,error:!n.bookerEmail,children:[Object(m.jsx)("label",{htmlFor:"bookerEmail",children:"Votre Email"}),Object(m.jsx)("input",{id:"bookerEmail",name:"bookerEmail",value:n.bookerEmail,autoComplete:"email",type:"email",placeholder:"Votre email : toto@toto.fr ...",onChange:function(e){return w(e,r,n)}})]}),Object(m.jsxs)(E.a.Field,{required:!0,error:!n.bookerNumber,children:[Object(m.jsx)("label",{htmlFor:"bookerNumber",children:"Nombre de personnes"}),Object(m.jsx)("input",{id:"bookerNumber",name:"bookerNumber",value:n.bookerNumber,min:1,step:1,placeholder:"Votre nombre : 5...",type:"number",onChange:function(e){return w(e,r,n)}})]}),Object(m.jsxs)(E.a.Field,{required:!0,error:!n.bookingDate,children:[Object(m.jsx)("label",{htmlFor:"bookingDate",children:"Date de votre reservation"}),Object(m.jsx)(re.a,{id:"bookingDate",name:"bookingDate",value:n.bookingDate,placeholder:"La date de votre r\xe9servation",type:"date",onChange:function(e){return w(e,r,n)}})]}),Object(m.jsxs)(E.a.Field,{required:!0,error:!n.bookingTime,children:[Object(m.jsx)("label",{htmlFor:"bookingTime",children:"Heure de votre reservation"}),Object(m.jsx)("span",{style:{color:"white",textAlign:"center",fontSize:"1.3em",fontWeight:"bold"},children:"Minimum 18h00"}),Object(m.jsx)(re.a,{id:"bookingTime",name:"bookingTime",value:n.bookingTime,placeholder:"L'Heure de votre r\xe9servation",min:"0",type:"time",onChange:function(e){return w(e,r,n)}})]}),Object(m.jsx)(E.a.Field,{children:Object(m.jsx)(x.a,{circular:!0,size:"massive",loading:a,disabled:a||!n.bookerName||!n.bookerNumber||!n.bookerEmail||!n.bookingDate||!n.bookingTime,color:"blue",type:"submit",content:"Je Reserve !"})})]})},se=(n(217),function(e){var t=e.success,n=e.error;return Object(m.jsx)(p.a,{className:"homeheader",as:"h1",style:{background:t?"green":n?"red":"grey"},children:t||n?t?"Votre r\xe9servation \xe0 \xe9t\xe9 effectu\xe9e avec succ\xe9s , vous allez recevoir un mail de confirmation":n?"Votre r\xe9servation \xe0 \xe9chou\xe9e, veuillez recommencer":"Reservez Votre table Maintenant":"Reservez Votre table Maintenant"})}),ce=(n(218),function(e){var t=e.loading;return Object(m.jsx)("div",{className:"homemadeloader",children:t&&Object(m.jsx)("div",{className:"nobookings homemadeloader-loader",children:Object(m.jsxs)("p",{children:[Object(m.jsx)("span",{children:"C"}),Object(m.jsx)("span",{children:"H"}),Object(m.jsx)("span",{children:"A"}),Object(m.jsx)("span",{children:"R"}),Object(m.jsx)("span",{children:"G"}),Object(m.jsx)("span",{children:"E"}),Object(m.jsx)("span",{children:"M"}),Object(m.jsx)("span",{children:"E"}),Object(m.jsx)("span",{children:"N"}),Object(m.jsx)("span",{children:"T"}),Object(m.jsx)("span",{children:"."}),Object(m.jsx)("span",{children:" "}),Object(m.jsx)("span",{children:"."}),Object(m.jsx)("span",{children:" "}),Object(m.jsx)("span",{children:"."}),Object(m.jsx)("span",{children:" "})]})})})}),oe=(n(219),function(e){var t=e.user,n=e.setMessage,a=e.resaOpen,s=e.config,c=e.setConfig,u=e.pushNotificationToken,b=Object(r.useState)({bookerName:"",bookerNumber:"",bookingDate:"",bookingTime:"",bookerEmail:"",pushNotificationToken:""}),d=Object(l.a)(b,2),j=d[0],f=d[1],g=Object(r.useState)(!1),x=Object(l.a)(g,2),k=x[0],v=x[1],w=Object(r.useState)(!1),N=Object(l.a)(w,2),C=N[0],z=N[1],B=Object(r.useState)(!1),S=Object(l.a)(B,2),F=S[0],A=S[1];Object(r.useEffect)((function(){var e=new Date,t=e.getDate(),n=e.getMonth()+1,r=e.getFullYear();f(Object(O.a)(Object(O.a)({},j),{},{bookingDate:"".concat(r,"-0").concat(n,"-").concat(t),bookingTime:"18:00"}))}),[]);var T=function(){var e=Object(i.a)(o.a.mark((function e(){var t,r,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return v(!0),t={_id:s._id,resaOpen:!s.resaOpen},r=localStorage.getItem("token-".concat(y)),e.next=5,R.updateConfig(t,r);case 5:(a=e.sent)&&200===a.data.status?(c(a.data.updatedConfig),n({success:!0,message:a.data.message}),v(!1)):(n({success:!1,message:a.data.message||"il y a eu un probl\xe8me"}),v(!1));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(){var e=Object(i.a)(o.a.mark((function e(t){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),u&&(j.pushNotificationToken=u),v(!0),e.next=5,R.postBooking(j);case 5:(r=e.sent)&&200===r.data.status?(v(!1),n({success:!0,message:r.data.message}),A(!1),z(!0)):(v(!1),n({success:!1,message:"il y eu un probl\xe9me lors de votre r\xe9servation veuillez reessayer"}),A(!0),z(!1));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(m.jsxs)("div",{className:"home",children:[Object(m.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center"},children:[Object(m.jsx)("a",{href:"https://play.google.com/store/apps/details?id=com.baravin1755&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1",children:Object(m.jsx)("img",{style:{display:"inline-block",overflow:"hidden",borderRadius:"13px",width:"285px",height:"113px"},alt:"Disponible sur Google Play",src:"https://play.google.com/intl/en_us/badges/static/images/badges/fr_badge_web_generic.png"})}),Object(m.jsx)("a",{href:"https://apps.apple.com/fr/app/1755-r%C3%A9servation/id1581182779?itsct=apps_box_badge&itscg=30200",style:{display:"inline-block",overflow:"hidden",borderRadius:"13px",width:"250px",height:"83px"},children:Object(m.jsx)("img",{src:"https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/fr-fr?size=250x83&releaseDate=1628899200&h=e8c99d2716361f18893a828bf513b8ef",alt:"Download on the App Store",style:{borderRadius:"13px",width:"250px",height:"83px"}})})]}),Object(m.jsx)(h.a,{}),"isAdmin"===t&&Object(m.jsx)(ee,{resaOpen:a,handleChangeResaOpen:T}),Object(m.jsx)(ce,{loading:k}),!k&&a?Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(se,{success:C,error:F}),!C&&!F&&a&&Object(m.jsx)(D.a,{animation:"fade down",duration:300,visible:!C||!F,children:Object(m.jsx)(ae,{handleSubmit:_,setBooking:f,booking:j,loading:k})}),(F||C)&&Object(m.jsx)(ne,{handleEmptyForm:function(){f({bookerName:"",bookerNumber:"",bookingDate:"",bookingTime:"",bookerEmail:""}),z(!1),A(!1),v(!1)}})]}):!k&&Object(m.jsx)(p.a,{as:"h1",className:"homeheader",children:"Les r\xe9servations sont d\xe9sactiv\xe9es pour le moment , revenez demain !"})]})}),ie=(n(220),function(){var e=Object(r.useState)(""),t=Object(l.a)(e,2),n=t[0],a=t[1],s=Object(r.useState)({}),c=Object(l.a)(s,2),b=c[0],d=c[1],j=Object(r.useState)({}),p=Object(l.a)(j,2),g=p[0],x=p[1],O=Object(r.useState)(!1),v=Object(l.a)(O,2),w=v[0],N=v[1],C=Object(r.useState)([]),D=Object(l.a)(C,2),B=D[0],F=D[1],A=Object(r.useState)(""),T=Object(l.a)(A,2),_=T[0],E=T[1];return Object(r.useEffect)((function(){0!==Object.keys(b).length&&setTimeout((function(){d({})}),3e3)}),[b]),Object(r.useEffect)((function(){var e=localStorage.getItem("token-".concat(y));function t(){return(t=Object(i.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return N(!0),e.next=3,R.getConfig();case 3:(t=e.sent)&&200===t.data.status?(x(t.data.config),N(!1)):(N(!1),d({success:!1,message:t.data.message||"Impossible de r\xe9cup\xe9rer la configuration, contacter l'administrateur"}));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}e&&function(e,t){if(e){var n=Object(k.a)(e),r=n.user,a=n.exp,s=r.role;return!(Date.now()>1e3*a)&&(t(s),!0)}return!1}(e,a)?d({success:!0,message:"Re-Conn\xe9ct\xe9"}):localStorage.removeItem("token-".concat(y)),function(){t.apply(this,arguments)}()}),[]),Object(r.useEffect)((function(){K.a.isNativePlatform()&&(H.a.requestPermissions().then((function(e){"granted"===e.receive&&H.a.register()})),H.a.addListener("registration",(function(e){E(e.value)})),H.a.addListener("registrationError",(function(e){})),H.a.addListener("pushNotificationReceived",(function(e){})),H.a.addListener("pushNotificationActionPerformed",(function(e){})))}),[]),Object(m.jsxs)("div",{className:"app",children:[Object(m.jsx)(z,{user:n,loading:w,setUser:a,setMessage:d}),Object(m.jsx)(h.a,{}),Object(m.jsx)(S,{message:b}),Object(m.jsxs)(u.d,{children:[Object(m.jsx)(u.b,{exact:!0,path:"/",children:Object(m.jsx)(oe,{pushNotificationToken:_,setPushNotificationToken:E,user:n,message:b,setMessage:d,resaOpen:g.resaOpen,config:g,setConfig:x})}),Object(m.jsx)(u.b,{path:"/login",children:n?Object(m.jsx)(u.a,{to:"/bookings"}):Object(m.jsx)(M,{setUser:a,setMessage:d})}),Object(m.jsx)(u.b,{path:"/bookings",children:n?Object(m.jsx)(Z,{setUser:a,pushNotificationToken:_,setMessage:d,bookings:B,setBookings:F}):Object(m.jsx)(u.a,{to:"/login"})})]}),Object(m.jsx)(h.a,{}),Object(m.jsx)(f,{})]})}),le=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,243)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),r(e),a(e),s(e),c(e)}))};n(221);s.a.render(Object(m.jsx)(g.a,{basename:"/",children:Object(m.jsx)(ie,{})}),document.getElementById("root")),le()}},[[222,1,2]]]);
//# sourceMappingURL=main.a8582f6d.chunk.js.map