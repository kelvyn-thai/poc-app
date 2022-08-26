"use strict";(self.webpackChunkpoc_app=self.webpackChunkpoc_app||[]).push([[825],{6170:function(t,e,n){n.d(e,{Z:function(){return s}});var r=n(7144),a=n.n(r),o=n(552),i=n(7861),c=n(7770),u=i.forwardRef((function(t,e){var n=e.ref,r=e.refSVG,i=t.chartName,u=t.isLoading,s=t.classNameContainer,l=t.classNameSVGChart,d=t.children;return(0,c.jsxs)("div",{ref:n,className:"relative ".concat(a()(s)),children:[i&&(0,c.jsx)("div",{className:"text-center mb-5 text-xl font-medium",children:i}),u&&(0,c.jsx)(o.Z,{}),r&&(0,c.jsx)("svg",{ref:r,className:"m-auto ".concat(l)}),d&&d]})}));u.defaultProps={chartName:"",isLoading:!1,classNameContainer:"",classNameSVGChart:"",children:null};var s=u},552:function(t,e,n){var r=n(1413),a=n(4925),o=n(7144),i=n.n(o),c=n(7861),u=n(5335),s=n(7770),l=["className","isCenterAbsolute"],d=function(t){var e=t.className,n=t.isCenterAbsolute,o=(0,a.Z)(t,l);return(0,s.jsx)("div",(0,r.Z)((0,r.Z)({className:"".concat(n&&u.Z.absCenter," ").concat(i()(e))},o),{},{children:(0,s.jsx)("i",{className:"fa-solid fa-spinner fa-spin-pulse fa-2xl"})}))};d.defaultProps={className:"",isCenterAbsolute:!0},e.Z=c.memo(d)},8294:function(t,e,n){n.d(e,{N:function(){return i}});var r=n(7861),a=n(3549),o=n(5638),i=function(){var t=r.useCallback((function(t,e){return!!t.type.match(e)}),[]);return{readData:r.useCallback((function(t){var e=t.files,n=t.callbackSetData,r=t.callbackHandleError;try{var i=e[0];if(i){var c=i.type,u=new FileReader;u.addEventListener("load",(function(){var t=u.result,e="";c.match("application/json")?(0,a.V)(t)&&(e=t):e=c.match("text/tab-separated-values")||c.match("text/tsv")?JSON.stringify(o.tJ3(t)):c.match("text/comma-separated-values")||c.match("text/csv")?JSON.stringify(o.ueB(t)):t,n(e,i)})),u.removeEventListener("load",(function(){return null})),u.readAsText(i)}}catch(s){"function"===typeof r&&r(s)}}),[]),handleValidateAcceptType:t}}},825:function(t,e,n){n.r(e),n.d(e,{DataResourceChart:function(){return Rt},default:function(){return Dt},getDataResourceState:function(){return W},useDataResourceStore:function(){return H}});var r=n(2685),a=n(7861),o=n(3083),i=n(9439),c=function(t,e){var n=function(n){var r,a;"function"!==typeof(null===t||void 0===t||null===(r=t.current)||void 0===r?void 0:r.contains)||null!==t&&void 0!==t&&null!==(a=t.current)&&void 0!==a&&a.contains(n.target)||"function"===typeof e&&e()};a.useEffect((function(){return document.addEventListener("mousedown",n),function(){document.removeEventListener("mousedown",n)}}),[t,e])},u={toggleVisible:"style_toggleVisible__a7FjK",toggleDisabled:"style_toggleDisabled__+SL-0"},s=n(7770),l=function(t){var e=t.options,n=t.onSelectOption,r=t.defaultSelected,o=t.dropdownContainerClassName,l=a.useState(!1),d=(0,i.Z)(l,2),f=d[0],p=d[1],v=a.useRef(null);return c(v,(function(){f&&p(!1)})),(0,s.jsx)("div",{ref:v,className:"dropdown-container w-fit mb-4 ".concat(o),children:(0,s.jsxs)("div",{className:"flex border-none relative cursor-pointer items-center pl-2 h-10 min-w-[150px] text-white bg-blue-500 font-normal capitalize w-fit ".concat(u.dropdown),onClick:function(){return p(!f)},children:[r,f&&(0,s.jsx)("div",{className:"dropdown-menu absolute top-[100%] left-0 w-[100%] z-10",children:e.map((function(t){var e=t.id,r=t.value,a=t.label;return(0,s.jsx)("div",{className:"flex pl-2 border-t-orange-100 items-center h-10 min-w-[150px] text-white bg-blue-500 font-medium capitalize w-fit hover:bg-blue-600 hover:font-medium border-solid border-t-[0.5px]",onClick:function(){n(r)},children:a},e)}))}),(0,s.jsx)("div",{className:"".concat(u.toggle," ").concat(f?u.toggleVisible:u.toggleDisabled)})]})})};l.defaultProps={dropdownContainerClassName:""};var d=a.memo(l),f=n(3433),p=function(t){var e=t.options,n=t.title,r=t.dropdownBoxContainerClassName,o=t.selected,l=t.setSelected,d=a.useState(!1),p=(0,i.Z)(d,2),v=p[0],h=p[1],m=a.useRef(null);return c(m,(function(){v&&h(!1)})),(0,s.jsx)("div",{ref:m,className:"dropdownBox-container w-fit ".concat(r),children:(0,s.jsxs)("div",{className:"flex border-none relative cursor-pointer items-center h-10 min-w-[150px] text-white bg-blue-500 font-normal capitalize w-fit ".concat(u.dropdownBox),children:[(0,s.jsx)("div",{className:"absolute left-1 right-4 top-0 h-[100%] flex items-center",onClick:function(){return h(!v)},children:(0,s.jsx)("div",{className:"text-sm",children:n})}),v&&(0,s.jsx)("div",{className:"dropdownBox-menu absolute top-[100%] left-0 w-[100%] z-10 max-h-[200px] overflow-y-scroll bg-blue-500",children:e.map((function(t){var e=t.id,n=t.label,r=o.findIndex((function(t){return t.id===e}))>-1,a=r?o.filter((function(t){return t.id!==e})):[].concat((0,f.Z)(o),[t]);return(0,s.jsxs)("div",{className:"grid gap-1 items-center min-h-[40px] min-w-[150px] border-t-orange-100 p-1 hover:bg-blue-600 border-solid border-t-[0.5px] w-fit",style:{gridTemplateColumns:"20px fit-content(100%)"},onClick:function(){return l(a)},children:[(0,s.jsx)("i",{className:"fa-regular ".concat(r?"fa-square-check":"fa-square"," ")}),(0,s.jsx)("div",{className:"text-sm text-white hove'r:font-medium capitalize",children:n})]},e)}))}),(0,s.jsx)("div",{className:"".concat(u.toggle," ").concat(v?u.toggleVisible:u.toggleDisabled)})]})})};p.defaultProps={dropdownBoxContainerClassName:""};var v=a.memo(p),h=d,m=n(4165),x=n(5861),b=n(1413),g=n(4925),y=n(7144),k=n.n(y),Z={inputContainer:"Input_styles_inputContainer__6sxZr"},w=["onChangeInput"],j="w-fit border-solid border-gray-500 border-[0.5px] focus:border-blue-500 block outline-none h-10 rounded text-black font-normal text-sm w-[100%] py-2 px-3",N=function(t){var e=t.label,n=t.isRequired,o=t.type,i=t.optionProps,c=t.renderInputComponent,u=a.useCallback((function(){switch(o){case"input":return(0,s.jsx)("input",(0,b.Z)({className:"w".concat(j," ").concat(k()(Z.input||"")),maxLength:32},i));case"input-number":var t=i,e=t.onChangeInput,n=(0,g.Z)(t,w),a=/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;return(0,s.jsx)("input",(0,b.Z)({className:"".concat(j," ").concat(k()(Z.input||"")),maxLength:32,onChange:function(t){t.preventDefault();var n=t.target.value;(""===n||a.test(n))&&e(t,n)}},n));case"file":return(0,s.jsx)(r.Z,(0,b.Z)({},i));case"read-only":var u=i.value;return(0,s.jsx)("div",{className:"opacity-50 cursor-not-allowed",children:u});case"input-dropdown":var l=i,d=l.dropdownBoxProps,f=l.selected,p=l.handleSaveSelected,h=l.dropdownValue,m=f.length>0;return(0,s.jsxs)("div",{className:"grid items-center gap-4",style:{gridTemplateColumns:"1fr min-content ".concat(m?"min-content":""," ")},children:[(0,s.jsx)("div",{className:"flex items-center overflow-scroll ".concat(j),children:h}),m&&(0,s.jsx)(r.Z,{title:"Save",onClick:p}),(0,s.jsx)(v,(0,b.Z)({},d))]});default:if("function"===typeof c)return c()}}),[t]);return(0,s.jsxs)("div",{className:"grid ".concat(Z.inputContainer," mb-4"),children:[(0,s.jsxs)("div",{className:"flex items-center black font-medium text-sm ".concat(Z.inputLabel),children:[(0,s.jsx)("span",{className:"".concat(n?"opacity-100":"opacity-0"," text-red-500"),children:"*"}),e]}),u()]})};N.defaultProps={isRequired:!1,type:"input",optionProps:null,renderInputComponent:void 0};var S=a.memo(N),C=n(5671),R=n(3144),D=n(633),I=function(){function t(e){(0,C.Z)(this,t),this.database=void 0,this.db=void 0,this.database=e}return(0,R.Z)(t,[{key:"createObjectStore",value:function(){var t=(0,x.Z)((0,m.Z)().mark((function t(e){return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,D.X3(this.database,1,{upgrade:function(t){e.forEach((function(e){t.objectStoreNames.contains(e)||t.createObjectStore(e,{autoIncrement:!0,keyPath:"id"})}))}});case 2:return this.db=t.sent,t.abrupt("return",this);case 4:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"getRecord",value:function(){var t=(0,x.Z)((0,m.Z)().mark((function t(e,n){var r,a,o,i;return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=this.db,a=r.transaction(e,"readonly"),o=a.objectStore(e),t.next=5,o.get(n);case 5:return i=t.sent,t.abrupt("return",i);case 7:case"end":return t.stop()}}),t,this)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"getAllRecord",value:function(){var t=(0,x.Z)((0,m.Z)().mark((function t(e){var n,r,a,o;return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=this.db,r=n.transaction(e,"readonly"),a=r.objectStore(e),t.next=5,a.getAll();case 5:if(t.t0=t.sent,t.t0){t.next=8;break}t.t0=[];case 8:return o=t.t0,t.abrupt("return",o.sort((function(t,e){return e.id-t.id})));case 10:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"addRecord",value:function(){var t=(0,x.Z)((0,m.Z)().mark((function t(e,n){var r,a,o,i;return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=this.db,a=r.transaction(e,"readwrite"),o=a.objectStore(e),t.next=5,o.add(n);case 5:return i=t.sent,t.abrupt("return",i);case 7:case"end":return t.stop()}}),t,this)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"addRecordByKey",value:function(){var t=(0,x.Z)((0,m.Z)().mark((function t(e,n,r){var a,o,i,c;return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=this.db,o=a.transaction(e,"readwrite"),i=o.objectStore(e),t.next=5,i.add(n,r);case 5:return c=t.sent,t.abrupt("return",c);case 7:case"end":return t.stop()}}),t,this)})));return function(e,n,r){return t.apply(this,arguments)}}()},{key:"putBulkRecord",value:function(){var t=(0,x.Z)((0,m.Z)().mark((function t(e,n){var r,a,o,i;return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=this.db,a=r.transaction(e,"readwrite"),o=a.objectStore(e),i=n.map((function(t){return o.add(t)})),t.next=6,Promise.all(i);case 6:return t.abrupt("return",this.getAllRecord(e));case 7:case"end":return t.stop()}}),t,this)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"updateByKey",value:function(){var t=(0,x.Z)((0,m.Z)().mark((function t(e,n){var r,a,o,i;return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=this.db,a=r.transaction(e,"readwrite"),o=a.objectStore(e),t.next=5,o.put(n);case 5:return i=t.sent,t.abrupt("return",i);case 7:case"end":return t.stop()}}),t,this)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"deleteRecord",value:function(){var t=(0,x.Z)((0,m.Z)().mark((function t(e,n){var r,a,o,i;return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=this.db,a=r.transaction(e,"readwrite"),o=a.objectStore(e),t.next=5,o.get(n);case 5:if(i=t.sent){t.next=8;break}return t.abrupt("return",i);case 8:return t.next=10,o.delete(n);case 10:return t.abrupt("return",n);case 11:case"end":return t.stop()}}),t,this)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"clearTable",value:function(){var t=(0,x.Z)((0,m.Z)().mark((function t(e){var n,r,a,o;return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=this.db,r=n.transaction(e,"readwrite"),a=r.objectStore(e),t.next=5,a.clear();case 5:return o=t.sent,t.abrupt("return",o);case 7:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()}]),t}(),F=I,L="chart",P="presale-poc-database-".concat(L),E=function(){var t=(0,x.Z)((0,m.Z)().mark((function t(){var e,n;return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new F(P),n=[L],t.next=4,e.createObjectStore(n);case 4:return e=t.sent,t.abrupt("return",e);case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),U=function(){var t=(0,x.Z)((0,m.Z)().mark((function t(e){var n,r;return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E();case 2:return n=t.sent,t.next=5,n.addRecord(L,e);case 5:return r=t.sent,t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),O=function(){var t=(0,x.Z)((0,m.Z)().mark((function t(e){var n,r;return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E();case 2:return n=t.sent,t.next=5,n.getRecord(L,e);case 5:return r=t.sent,t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),V=function(){var t=(0,x.Z)((0,m.Z)().mark((function t(){var e,n;return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E();case 2:return e=t.sent,t.next=5,e.getAllRecord(L);case 5:return n=t.sent,t.abrupt("return",n||[]);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),A=function(){var t=(0,x.Z)((0,m.Z)().mark((function t(){var e;return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E();case 2:return e=t.sent,t.abrupt("return",e.clearTable(L));case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),M=n(8294),z=n(815),G=n.n(z),T=n(8835),_=n.n(T),B=n(4942),J=n(2958),Y={option:"sankey",sankey:void 0,bubble:void 0,hexbin:void 0,tiles:void 0,hierachy:void 0,toggleExample:!1,chartName:"",resources:[]},K=(0,J.D)((function(t,e){return(0,b.Z)((0,b.Z)({},Y),{},{actionSetOption:function(e){return t({option:e})},actionSetChartId:function(n){var r=e().option;t((0,B.Z)({},r,n))},actionToggleExample:function(){return t({toggleExample:!e().toggleExample})},actionSetChartName:function(e){return t({chartName:e})},actionSetResource:function(e){return t({resources:e})},actionChartData:function(e,n){return t((0,B.Z)({},n,e))}})}),"StoreDataResource"),q=(0,i.Z)(K,2),H=q[0],W=q[1].getState,X=n(3549),$=function(){var t=H(),e=t.resources,n=t.actionSetResource,r=W().option,a=function(){var t=(0,x.Z)((0,m.Z)().mark((function t(e){var a,o,i,c;return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.type,o=void 0===a?r:a,t.prev=1,t.next=4,V();case 4:i=t.sent,c=i.filter((function(t){return t.type===o})),n(c),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(1),A();case 12:case"end":return t.stop()}}),t,null,[[1,9]])})));return function(e){return t.apply(this,arguments)}}();return{resources:e,actionSetResource:n,handleGetCharts:a}},Q=function(t){var e=t.type,n=a.useState(null),r=(0,i.Z)(n,2),o=r[0],c=r[1],u=a.useState(!0),s=(0,i.Z)(u,2),l=s[0],d=s[1],f=W(),p=H().actionChartData,v=f[e||f.option],h=a.useCallback((0,x.Z)((0,m.Z)().mark((function t(){var n;return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,!G()(v)){t.next=6;break}return t.next=4,O(v);case 4:(n=t.sent)&&n.id&&(0,X.V)(n.data)&&c(n);case 6:t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),p(void 0,e||f.option);case 11:d(!1);case 12:case"end":return t.stop()}}),t,null,[[0,8]])}))),[v]);return a.useEffect((function(){h()}),[]),{data:o,isLoading:l,chartId:v}},tt=function(){var t=H(),e=t.option,n=t.actionSetChartId,c=a.useState([]),u=(0,i.Z)(c,2),l=u[0],d=u[1],p=a.useState(!1),v=(0,i.Z)(p,2),h=v[0],g=v[1],y=a.useMemo((function(){switch(e){case"sankey":case"bubble":return _()(l)}}),[l,e]),k=a.useMemo((function(){var t;return(null===(t=l.find((function(t){return"name"===t.key})))||void 0===t?void 0:t.value)||""}),[l]),Z=(0,M.N)().readData,w=(0,o.aE)().setVisibleModal,j=$().handleGetCharts,N=a.useCallback((function(t){var e=(0,f.Z)(l);t.forEach((function(t){var n=t.key,r=t.value,a=e.findIndex((function(t){return t.key===n}));e=a>-1?(0,f.Z)(e).map((function(t){return t.key===n?(0,b.Z)((0,b.Z)({},t),{},{value:r}):t})):[].concat((0,f.Z)(e),[{key:n,value:r}])})),d(e)}),[l]),C=a.useCallback((function(){switch(e){case"sankey":case"bubble":var t=l.find((function(t){return"name"===t.key})),n=(null===t||void 0===t?void 0:t.value)||"Upload file";return(0,s.jsx)(S,{label:"Data",type:"file",isRequired:!0,optionProps:{title:n,useToUploadFile:!0,onHandleUploadFile:function(t){t.preventDefault();var n=t.target.files;n&&Z({files:n,callbackSetData:function(){var t=(0,x.Z)((0,m.Z)().mark((function t(n,r){return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:N([{key:"name",value:r.name},{key:e,value:n}]);case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()})}}});case"hexbin":var r=l.find((function(t){return"geometryFileName"===t.key})),a=(null===r||void 0===r?void 0:r.value)||"Upload *.json, *.geojson",o=l.find((function(t){return"name"===t.key})),i=(null===o||void 0===o?void 0:o.value)||"Upload *.csv";return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(S,{label:"Geometry",type:"file",isRequired:!0,optionProps:{title:a,useToUploadFile:!0,onHandleUploadFile:function(t){t.preventDefault();var e=t.target.files;e&&Z({files:e,callbackSetData:function(){var t=(0,x.Z)((0,m.Z)().mark((function t(e,n){return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:N([{key:"geometry",value:e},{key:"geometryFileName",value:n.name}]);case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()})}}}),(0,s.jsx)(S,{label:"Points",type:"file",isRequired:!0,optionProps:{title:i,useToUploadFile:!0,onHandleUploadFile:function(t){t.preventDefault();var n=t.target.files;n&&Z({files:n,callbackSetData:function(){var t=(0,x.Z)((0,m.Z)().mark((function t(n,r){return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:N([{key:e,value:n},{key:"name",value:r.name}]);case 1:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()})}}})]})}}),[e,l]),R=a.useCallback((0,x.Z)((0,m.Z)().mark((function t(){var r;return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!h){t.next=2;break}return t.abrupt("return");case 2:return g(!0),t.next=5,U({data:JSON.stringify(l),type:e,name:k});case 5:r=t.sent,G()(r)&&(n(r),w({isVisible:!1}),j({})),g(!1);case 8:case"end":return t.stop()}}),t)}))),[l,e,h,j]);return(0,s.jsx)(o.hz,{children:(0,s.jsxs)("div",{className:"form",children:[(0,s.jsx)(S,{label:"Name",isRequired:!0,type:"input",optionProps:{value:k,onChange:function(t){return N([{key:"name",value:t.target.value}])}}}),C(),(0,s.jsx)(r.Z,{title:h?"Saving...":"Save",onClick:R,isDisabled:y,className:"ml-auto"})]})})},et=a.memo(tt),nt=function(){var t=$(),e=t.resources,n=t.actionSetResource,r=t.handleGetCharts,o=H().actionSetChartId,i=Q({}).chartId;return a.useEffect((function(){return r({}),function(){n([])}}),[]),(0,s.jsx)("div",{children:e.length>0&&(0,s.jsxs)("div",{children:[(0,s.jsxs)("div",{className:"grid grid-cols-3 text-white font-medium text-lg bg-gray-500 h-10 items-center",children:[(0,s.jsx)("div",{children:"ID"}),(0,s.jsx)("div",{children:"Name"}),(0,s.jsx)("div",{children:"Status"})]}),e.map((function(t){return(0,s.jsxs)("div",{className:"grid grid-cols-3 cursor-pointer font-medium h-10 items-center text-base hover:bg-gray-50 hover:font-medium hover:text-black hover:border-t-[0.5px] hover:border-t-transparent border-solid border-t-[0.5px] border-t-gray-300",onClick:function(){return o(t.id)},children:[(0,s.jsx)("div",{children:t.id}),(0,s.jsx)("div",{children:t.name}),(0,s.jsx)("div",{children:i===t.id&&"Actived"})]},t.id)}))]})})},rt=a.memo(nt),at=["sankey","bubble","hexbin","tiles","hierachy"],ot=function(){var t=(0,o.aE)().setVisibleModal,e=H(),n=e.option,i=e.actionSetChartName,c=e.actionSetOption,u=$().handleGetCharts,l=a.useMemo((function(){return at.map((function(t){return{id:t,value:t,label:t}}))}),[]);return(0,s.jsxs)("div",{className:"bg-transparent text-white",children:[(0,s.jsx)(h,{defaultSelected:n,onSelectOption:function(t){var e=t;c(e),i(""),u({type:e})},options:l}),(0,s.jsx)(r.Z,{title:"+ New data resource",onClick:function(){return t({isVisible:!0,content:(0,s.jsx)(et,{})})},className:"mb-4"}),(0,s.jsx)(rt,{})]})},it=a.memo(ot),ct=n(552),ut=n(6170),st=n(1002),lt=n(5638),dt=n(5618),ft=n.n(dt),pt=n(1838),vt=n(5918),ht=n(7192),mt=function(t){return null!==t&&"object"===(0,st.Z)(t)?t.valueOf():t},xt=["data"],bt=function(t){var e=t.data,n=(0,g.Z)(t,xt),r=a.useRef(null),o=a.useRef(null);return a.useLayoutEffect((function(){var t;(null===e||void 0===e||null===(t=e.links)||void 0===t?void 0:t.length)>0&&r.current&&o.current&&function(t){var e,n=t.data,r=t.options,a=t.svg,o=t.container,i=n.nodes,c=n.links,u=[],s=[],l=[];try{var d=r.format,p=void 0===d?lt.WUZ:d,v=r.nodeId,h=r.nodeLabel,m=r.nodeAlign,x=void 0===m?ht.PT:m,b=r.nodeWidth,g=void 0===b?24:b,y=r.nodePadding,k=void 0===y?20:y,Z=r.nodeLabelPadding,w=void 0===Z?6:Z,j=r.linkSource,N=void 0===j?function(t){return t.source}:j,S=r.linkTarget,C=void 0===S?function(t){return t.target}:S,R=r.linkValue,D=void 0===R?function(t){return t.value}:R,I=r.linkTitle,F=r.linkMixBlendMode,L=void 0===F?"normal":F,P=r.colors,E=void 0===P?lt.K2I:P,U=r.width,O=void 0===U?640:U,V=r.height,A=void 0===V?400:V,M=r.nodeGroup,z=r.standardizeNode,G=r.standardizeLink,T=r.onMouseEnterLink,_=r.onMouseEnterNode,B=r.onMouseLeaveLink,J=r.onMouseLeaveNode,Y=r.linkColor,K=void 0===Y?"source-target":Y;c=c.map((function(t){return G(t)}));var q=lt.UID(c,N).map(mt),H=lt.UID(c,C).map(mt),W=lt.UID(c,D);i=Array.from(lt.G0j(q,H),(function(t){return{id:t,name:t}})).map((function(t){return z(t)}));var X=lt.UID(i,v).map(mt);l=lt.UID(i,(function(t){return M(t)})).map(mt),i=lt.UID(i,(function(t,e){return{id:X[e]}})),c=lt.UID(c,(function(t,e){return{source:q[e],target:H[e],value:W[e]}})),!l&&["source","target","source-target"].includes(K)&&(K="currentColor");var $=l;e=lt.PKp($,E),u=lt.UID(i,(function(t){return h?h(t):t.id}));var Q=pt.Z().nodeId((function(t){var e=t.index;return X[e]})).nodeAlign(x).nodeWidth(g).nodePadding(k).extent([[20,20],[O-10,A-10]]),tt=Q({nodes:(0,f.Z)(i),links:(0,f.Z)(c)});i=tt.nodes,c=tt.links,s=lt.UID(c,(function(t){return I?I(t):"".concat(t.source.id," \u2192 ").concat(t.target.id,"\n").concat(p(t.value))}));var et=lt.Ys(a).attr("width",O).attr("height",A).attr("viewbox","0, 0, ".concat(O,",").concat(A));et.html("");var nt="O-".concat(Math.random().toString(16).slice(2)),rt=et.append("g").attr("fill","none").attr("class","g-links").selectAll("g").data(c).join("g").style("mix-blend-mode",L).attr("class","g-link").attr("stroke",(function(t){return"url(#".concat(nt,"-link-").concat(t.index,")")}));rt.append("linearGradient").attr("id",(function(t){return"".concat(nt,"-link-").concat(t.index)})).attr("gradientUnits","userSpaceOnUse").attr("x1",(function(t){return t.source.x1})).attr("x2",(function(t){return t.target.x0})).call((function(t){return t.append("stop").attr("offset","0%").attr("stop-color",(function(t){var n=t.source.index;return e(l[n])}))})).call((function(t){return t.append("stop").attr("offset","100%").attr("stop-color",(function(t){var n=t.target.index;return e(l[n])}))}));var at=rt.append("path").attr("class","path-link").attr("stroke-width",(function(t){return Math.max(t.width,1)})).attr("cursor","pointer").attr("opacity",.5).on("mouseenter",(function(t,e){lt.Ys(t.target).attr("opacity","1");var n=e.index,r=s[n],a=t.pageX,i=t.pageY;lt.Ys(o).selectChild(".tooltip").html(r).style("opacity","1").style("visibility","visible").style("left","".concat(a+20,"px")).style("top","".concat(i-20,"px")),"function"===typeof T&&T(t,e)})).on("mouseleave",(function(t,e){lt.Ys(t.target).attr("opacity","0.5"),lt.Ys(o).selectChild(".tooltip").style("opacity","0").style("visibility","hidden"),"function"===typeof B&&B(t,e)})).attr("d",(function(t){return vt.Z()(t)})),ot=et.append("g").attr("class","g-nodes").selectAll("g").data(tt.nodes).enter().append("g").attr("class","g-node").call((function(t){return lt.ohM().on("start",(function(){this.parentNode&&this.parentNode.appendChild(this)})).on("drag",(function(t){var e=Number(lt.Ys(this).select("rect").attr("y")),n=t.subject;n.y0+=t.dy;var r=n.y0-e;lt.Ys(this).attr("transform","translate(0,".concat(r,")")),at.attr("d",(function(t){return vt.Z()(t)})),Q.update(tt)}))(t)}));ot.append("rect").attr("cursor","pointer").attr("x",(function(t){return t.x0})).attr("y",(function(t){return t.y0})).attr("height",(function(t){return Math.max(t.y1-t.y0,1)})).attr("width",(function(t){return t.x1-t.x0})).attr("fill",(function(t){return E[t.depth]})).on("mouseenter",(function(t,e){var n=e.sourceLinks,r=e.targetLinks,a=ft()([].concat((0,f.Z)(n.map((function(t){return t.index}))),(0,f.Z)(r.map((function(t){return t.index})))));at.attr("opacity",(function(t){return a.includes(t.index)?"1":"0.5"})),"function"===typeof _&&_(t,e)})).on("mouseleave",(function(t,e){at.attr("opacity","0.5"),"function"===typeof J&&J(t,e)})),ot.append("text").join("text").attr("x",(function(t){return t.x0<O/2?t.x1+w:t.x0-w})).attr("y",(function(t){return(t.y1+t.y0)/2})).attr("dy","0.35em").attr("text-anchor",(function(t){return t.x0<O/2?"start":"end"})).attr("fill","#FFFFFF").attr("stroke","#FFFFFF").attr("font-size","16").text((function(t){var e=t.index;return u[e]}))}catch(it){}}({data:e,options:{nodeWidth:24,nodeGroup:function(t){return t.id.split(/\W/)[0]},nodeId:function(t){return t.id},standardizeNode:function(t){return{id:t.name}},standardizeLink:function(t){return{source:t.source,target:t.target,value:t.value}}},svg:o.current,container:r.current})}),[r,o,e]),(0,s.jsx)(ut.Z,(0,b.Z)((0,b.Z)({},(0,b.Z)((0,b.Z)({},n),{},{ref:{ref:r,refSVG:o}})),{},{children:(0,s.jsx)("div",{className:"tooltip fixed -[1000] invisible opacity-0 flex justify-center items-center p-[10px] h-[40px] bg-white rounded-[4px] shadow-xl text-black"})}))},gt=a.memo(bt),yt=["data"],kt=function(t){var e=t.data,n=(0,g.Z)(t,yt),r=a.useRef(null),o=a.useRef(null);return a.useLayoutEffect((function(){r.current&&o.current&&(null===e||void 0===e?void 0:e.length)>0&&function(t){var e=t.data,n=t.svg,r=t.width,a=void 0===r?1152:r,o=t.height,i=void 0===o?1152:o,c=t.groupColors||lt.K2I,u=e.map((function(t){return t.value})),s=lt.w6H(u.length).filter((function(t){return u[t]>0})),l=function(t){return t.data},d=e.map((function(t){return t.group})),f=ft()(s.map((function(t){return d[t]}))),p=d&&lt.PKp(f,c),v=lt.P2p().size([a,i]).padding(10)(lt.bT9({children:e}).sum((function(t){return t.value}))),h=lt.Ys(n);h.html(""),h.attr("width",a).attr("height",i).attr("viewBox",[0,0,a,i]).attr("style","max-width: 100%; height: auto; height: intrinsic;").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor","middle").attr("fill","#FFF");var m=h.selectAll("a").data(v.leaves()).join("a").attr("xlink:href",(function(t){return l(t).link})).attr("target","_blank").attr("transform",(function(t){return"translate(".concat(t.x,",").concat(t.y,")")}));m.append("circle").attr("stroke","#FFF").attr("stroke-width",1).attr("stroke-opacity",1).attr("fill",(function(t){return p(l(t).group)})).attr("fill-opacity",1).attr("r",(function(t){return t.r})),m.append("title").text((function(t){return l(t).title}));var x="O-".concat(Math.random().toString(16).slice(2));m.append("clipPath").attr("id",(function(t){return"".concat(x,"-clip-").concat(l(t).id)})).append("circle").attr("r",(function(t){return t.r})),m.append("text").attr("clip-path",(function(t){return"url(".concat(new URL("#".concat(x,"-clip-").concat(l(t).id),window.location),")")})).selectAll("tspan").data((function(t){return"".concat(l(t).label).split(/\n/g)})).join("tspan").attr("x",0).attr("y",(function(t,e,n){return"".concat(e-n.length/2+.85,"em")})).attr("fill-opacity",(function(t,e,n){return e===n.length-1?.7:null})).text((function(t){return t})),Object.assign(h.node(),{scales:{color:p}})}({data:e.map((function(t){var e=t.id,n=t.value,r=e.split("."),a=(0,f.Z)(r.pop().split(/(?=[A-Z][a-z])/g)),o=[].concat((0,f.Z)(a),[n.toLocaleString("en")]).join("\n"),i=r[1],c="https://google.com/".concat(o),u="".concat(o,"\n").concat(n.toLocaleString("en"));return(0,b.Z)((0,b.Z)({},t),{},{label:o,group:i,link:c,title:u})})),svg:o.current,container:r.current})}),[e,r,o]),(0,s.jsx)(ut.Z,(0,b.Z)((0,b.Z)({},n),{},{ref:{ref:r,refSVG:o}}))},Zt=a.memo(kt),wt=n(5515),jt=function(){var t=(0,x.Z)((0,m.Z)().mark((function t(e){var n,r,a,o,i,c,u,s,l,d,f,p,v,h;return(0,m.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=e.points,r=e.geojson,a=e.width,o=void 0===a?800:a,i=e.height,c=void 0===i?640:i,u=e.svg;try{(s=lt.Ys(u).attr("width",o).attr("height",c).attr("viewbox","0,0,".concat(o,",").concat(c))).html(""),l=lt.l49().centroid(r),d=lt.mw4().scale(1/(2*Math.PI)).translate(l).fitSize([o,c],r),f=lt.l49(d),r.features.forEach((function(t){return s.append("path").datum(t).attr("class","geometry-map").attr("pointer-events","visible").attr("stroke","#777").attr("stroke-width",.5).attr("stroke-linejoin","round").attr("cursor","pointer").attr("fill","none").attr("d",(function(t){return f(t)}))})),p=lt.PKp(n,lt.K2I),v=wt.g().extent([[0,0],[o,c]]).radius(9),h=n.map((function(t){return d(t)})),s.append("g").attr("class","hexagon-data").selectAll("path").data(v(h)).enter().append("path").attr("transform",(function(t){return"translate(".concat(t.x,",").concat(t.y,")")})).attr("d",v.hexagon()).attr("fill",(function(t){return p(t)})).attr("stroke","currentColor").attr("stroke-width","0.5")}catch(m){}case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),Nt=["data"],St=function(t){var e=t.data,n=(0,g.Z)(t,Nt),r=a.useRef(null),o=a.useRef(null);return a.useLayoutEffect((function(){r.current&&o.current&&e&&jt((0,b.Z)({svg:o.current,container:r.current},e))}),[r,o,e]),(0,s.jsx)(ut.Z,(0,b.Z)({},(0,b.Z)((0,b.Z)({},n),{},{ref:{ref:r,refSVG:o}})))},Ct=function(t){var e=t.type,n=Q({type:e}),r=n.data;if(n.isLoading)return(0,s.jsx)(ct.Z,{});if(!r)return null;var a,o,c=r.data,u=r.name,l=JSON.parse(c);switch(e){case"sankey":var d;a=gt,o=JSON.parse((null===(d=l.find((function(t){return t.key===e})))||void 0===d?void 0:d.value)||"");break;case"bubble":var f;a=Zt,o=JSON.parse((null===(f=l.find((function(t){return t.key===e})))||void 0===f?void 0:f.value)||"");break;case"hexbin":var p,v,h=JSON.parse(null===(p=l.find((function(t){return t.key===e})))||void 0===p?void 0:p.value)||[],m=JSON.parse(null===(v=l.find((function(t){return"geometry"===t.key})))||void 0===v?void 0:v.value)||{};o={points:h.map((function(t){return[Number(t.longitude),Number(t.latitude)]})).filter((function(t){var e=(0,i.Z)(t,2),n=e[0],r=e[1];return G()(n)&&G()(r)})),geojson:m},a=St}return o?(0,s.jsx)(a,{data:o,chartName:u}):null},Rt=a.memo(Ct),Dt=it},3549:function(t,e,n){n.d(e,{V:function(){return r}});var r=function(t){var e=!0;try{JSON.parse(t)}catch(n){e=!1}return e}}}]);
//# sourceMappingURL=825.8fb9a335.chunk.js.map