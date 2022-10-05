"use strict";(self.webpackChunkpoc_app=self.webpackChunkpoc_app||[]).push([[692],{150:function(t,e,n){n.d(e,{Lp:function(){return C}});var r,i=n(2791),o=n(9970),a=(n(1020),n(1413)),u=n(5362),c=(n(5824),n(7859)),s=n(5671),l=n(3144),f=function(){function t(){(0,s.Z)(this,t),this.stack=void 0,this.stack=[]}return(0,l.Z)(t,[{key:"push",value:function(t){this.stack.push(t)}},{key:"pop",value:function(){this.stack.pop()}},{key:"peek",value:function(){return this.isEmpty()?void 0:this.stack[this.size-1]}},{key:"isEmpty",value:function(){return 0===this.size}},{key:"size",get:function(){return this.stack.length}},{key:"stackItems",get:function(){return this.stack}}]),t}(),d=n(8111),p=n.n(d),m=(new f,new f),g=function t(e){var n;try{var i=e.hierachy,o=e.container,s=e.renderTooltip,l=e.width,f=e.height,d=u.Ys(o);if(!i)return void r.dispose();var g=i.geometry,v=i.children,y=void 0===v?[]:v,h=i.name,N=i.nameProperty,x=void 0===N?"name":N,_=i.id;r&&r.dispose(),n=d.append("div").attr("id",_).node(),(r=c.S1(n,void 0,{width:l,height:f})).showLoading(),function(t){var e=t.hierachy,n=t.mapName,r=t.mapEcharts,i=t.nameProperty,o=t.renderTooltip,a=e.geometry,s=e.regions,l=void 0===s?[]:s,f=u.PKp(l,u.Cn1);c.je(n,a);var d="#333D3F",m=u.$_Y(d);m.opacity=.5;var g=String(m),v={geo:{map:n,zoom:1,roam:!0,animation:!1,nameProperty:i,label:{show:!1},itemStyle:{areaColor:d,shadowColor:g,shadowOffsetX:0,shadowOffsetY:10}},series:[{name:"map",type:"map",map:n,selectedMode:!1,roam:!0,label:{show:!1,color:"#ffffff"},itemStyle:{areaColor:d,shadowColor:g,shadowOffsetX:-2,shadowOffsetY:2,shadowBlur:10},emphasis:{label:{color:"#ffffff"},itemStyle:{areaColor:"#6289AB",shadowColor:g,shadowOffsetX:0,shadowOffsetY:10}},data:l.map((function(t){var e=f(t),n=u.$_Y(e),r=n;r.opacity=1;var i=n;return i.opacity=.5,{name:t,label:{show:!1,color:"#FFF"},itemStyle:{areaColor:e,shadowColor:String(r),shadowOffsetX:0,shadowOffsetY:10},emphasis:{focus:"self",label:{color:"#FFFFFF",show:!0},itemStyle:{areaColor:e,shadowColor:String(i),shadowOffsetX:0,shadowOffsetY:10}}}}))}],tooltip:{show:!0,trigger:"item",formatter:function(t){var e=t.name,n=null===a||void 0===a?void 0:a.features.find((function(t){var n;return p()(null===t||void 0===t||null===(n=t.properties)||void 0===n?void 0:n.name,e)}));return n?o({feature:n,name:e}):""},padding:0,borderWidth:0}};r.setOption(v),r.hideLoading()}({hierachy:i,mapName:h,mapEcharts:r,nameProperty:x,renderTooltip:s});var E=m.isEmpty(),k=function(t){var e,n=t.dataIndex,r=g.features[n];return r&&(e=y.find((function(t){var e;return p()(t.name,null===r||void 0===r||null===(e=r.properties)||void 0===e?void 0:e.name)}))),e};r.on("click",(function(n){var r=k(n);r&&(m.push(i),t((0,a.Z)((0,a.Z)({},e),{},{hierachy:r})))})),r.on("dblclick",(function(n){var r=k(n);if(!E&&!r){var i=m.peek();m.pop(),t((0,a.Z)((0,a.Z)({},e),{},{hierachy:i}))}})),r.on("georoam",(function(t){var e=r.getOption();t.zoom?(e.geo[0].zoom=e.series[0].zoom,e.geo[0].center=e.series[0].center):e.geo[0].center=e.series[0].center,r.setOption(e)}))}catch(b){}return n},v=n(184),y=n(9439),h=n(4925),N=n(1694),x=n.n(N),_=n(8340),E="D3Hierachy_styles_tooltip__IO1VA",k=["data","renderTooltip","isLoading"],b=function(t){var e=t.data,n=t.renderTooltip,r=t.isLoading,c=(0,h.Z)(t,k),s=i.useRef(null),l=function(t){var e,r=t.feature;return e="function"===typeof n?n(t):(0,v.jsx)("div",{children:Object.entries(null===r||void 0===r?void 0:r.properties).map((function(t){var e=(0,y.Z)(t,2),n=e[0],r=e[1];return(0,v.jsxs)("div",{className:"grid gap-3 ".concat(x()(E)),children:[(0,v.jsx)("div",{className:"font-medium text-base text-black",children:n}),r&&(0,v.jsx)("div",{children:r})]},n)}))}),_.renderToString(e)};return i.useEffect((function(){if(!r&&s.current){var t=g((0,a.Z)((0,a.Z)({container:s.current},e),{},{renderTooltip:l}));return function(){t&&u.Ys(t).remove()}}}),[s,e,n]),(0,v.jsx)(o.Z,(0,a.Z)((0,a.Z)({},(0,a.Z)((0,a.Z)({},c),{},{isLoading:r,ref:{ref:s}})),{},{children:!r&&!e.hierachy&&(0,v.jsx)("div",{children:"Geojson is not valid"})}))};b.defaultProps={renderTooltip:void 0};var C=i.memo(b)},5824:function(t,e,n){n.d(e,{V:function(){return r}});var r={PUBLIC_URL:"",ASSETS_PATH:"".concat("","/sampleData"),API_DOMAIN_URL:"".concat({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.API_DOMAIN_URL||"https://app-portal-ppe1.envisioniot.com","/demo_service/v1.0")}},7852:function(t,e,n){var r=n(9439),i=n(2791),o=function(){var t=window;return{width:t.innerWidth,height:t.innerHeight}};e.Z=function(){var t=(0,i.useState)(o()),e=(0,r.Z)(t,2),n=e[0],a=e[1];return(0,i.useEffect)((function(){function t(){a(o())}return window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}}),[]),n}},6695:function(t,e,n){n.d(e,{$e:function(){return b},BQ:function(){return C},BY:function(){return T},Cr:function(){return k},FD:function(){return x},_r:function(){return E},bB:function(){return h},bM:function(){return N},dc:function(){return Z},kZ:function(){return j},r7:function(){return _}});var r=n(1413),i=n(2064),o=n.n(i),a=n(8111),u=n.n(a),c=n(209),s=n.n(c),l=n(7291),f=n.n(l),d=n(2066),p=n.n(d),m=n(9627),g=n.n(m),v=n(6452),y=n.n(v),h="Wh",N="Wh",x="m\xb2",_="CO2e",E="CO2e/m\xb2",k={baseWatt:"Wh",kgWatt:"kWh",megaWatt:"MWh",gigaWatt:"GWh"},b=function(t){var e=t.value,n=t.unit,r=0;try{if(!p()(e))switch(n){case"kgWatt":r=1e3*e;break;case"megaWatt":r=1e6*e;break;case"gigaWatt":r=1e9*e;break;default:r=e}}catch(i){}return r},C=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=1,r=k.baseWatt,i=g()(t)||0;i>=1e9?(n=1e9,r=k.gigaWatt):i>=1e6?(n=1e6,r=k.megaWatt):i>=1e3&&(n=1e3,r=k.kgWatt);var o=2,a=(y()(t)||0)/n;return a>0&&a<1&&(o=-Math.floor(Math.log10(a))),{divide:n,unit:e?"".concat(r,"/").concat(x):r,minFractionDigits:o}},Z=function(t){var e=t.value,n=t.divide,r=void 0===n?1:n,i=t.fractionDigits,o=void 0===i?2:i,a=t.unit;try{var u=(e/r).toLocaleString(void 0,{minimumFractionDigits:o});return"".concat(u," ").concat(a||"")}catch(c){}return"".concat(e)},T=function(t,e){var n=[],i=[];try{if(e){var a=e.geometry;t.forEach((function(t,e){var o=function(t,e,n){try{var r=t.id,i=t.name,o=t.mapProperties,a=e.features.map((function(t){var e=t.properties,n=t.geometry;return{coordinates:n.coordinates,properties:e,type:n.type}})),c=[];return o.forEach((function(t){t.split(",").forEach((function(t){n.push(t);var e=a.find((function(e){return u()(s()(e.properties.name),s()(t))}));if(e)switch(e.type){case"LineString":c.push([e.coordinates]);break;case"Polygon":c.push(e.coordinates);break;case"MultiPolygon":e.coordinates.forEach((function(t){c.push(t)}))}}))})),{type:"Feature",id:r,geometry:{type:"MultiPolygon",coordinates:c},properties:{name:i}}}catch(l){}}(t,a,i);if(o){var c=n[e];n[e]=(0,r.Z)((0,r.Z)({},c),o)}})),i=o()(i)}}catch(c){}return{listProperties:i,features:n}},j=function(t){return(null===t||void 0===t?void 0:t.split(",").map((function(t){return f()(t)})))||[]}},3968:function(t,e,n){n.r(e),n.d(e,{ALERTS:function(){return ht},ALERTS_DISPLAY_NAME:function(){return xt},ALERT_AND_TICKETS_RECORD_COLUMN:function(){return kt},CARBON_BASE_UNIT:function(){return $.r7},CARBON_DENSITY_BASE_UNIT:function(){return $._r},DISPLAY_NAME:function(){return Et},EC_UNITS:function(){return $.Cr},ENERGY_BASE_UNIT:function(){return $.bM},ENERGY_DENSITY_AREA_BASE_UNIT:function(){return $.FD},ENERGY_RANKING_BUILDING_NAME:function(){return ft},ENERGY_RANKING_ENERGY:function(){return dt},ENERGY_RANKING_ENERGY_DENSITY:function(){return pt},ENERGY_RANKING_RECORD_COLUMN:function(){return mt},GEOJSON_INFO_COUNTRY:function(){return gt},GEOJSON_INFO_DATA:function(){return vt},GEOJSON_INFO_RECORD_COLUMN:function(){return yt},REGION_ALERT_TICKETS:function(){return at},REGION_BUILDINGS:function(){return ut},REGION_COORDINATES:function(){return nt},REGION_ENERGY_CONSUMPTION:function(){return rt},REGION_ENERGY_DENSITY_CONSUMPTION:function(){return it},REGION_FLOOR_AREA:function(){return ct},REGION_NAME:function(){return et},REGION_OPEN_TICKETS:function(){return ot},REGION_RECORD_COLUMN:function(){return lt},REGION_TIME:function(){return st},STANDARD_ENERGY_CONSUMPTION_UNIT:function(){return $.bB},TICKETS:function(){return Nt},TICKETS_DISPLAY_NAME:function(){return _t},activeGeojsonMap:function(){return q},convertECByUnit:function(){return $.$e},convertFromStringToArrayPropertyList:function(){return $.kZ},convertMapPropertiesToCoordinates:function(){return $.BY},createRegion:function(){return P},default:function(){return ge},deleteEnergyRanking:function(){return X},deleteGeojsonMap:function(){return z},deleteRegion:function(){return F},findDivideBaseOnValuesEC:function(){return $.BQ},formatterValueToLocaleString:function(){return $.dc},getAlertsTickets:function(){return Y},getCountryStatusList:function(){return J},getEnergyConsumption:function(){return U},getEnergyRanking:function(){return W},getGeojsonMapOfACountry:function(){return A},getListCountry:function(){return V},getMapGeneral:function(){return D},getPropertyList:function(){return M},getRegion:function(){return G},getRegionList:function(){return K},getState:function(){return me},operationAlertsTickets:function(){return B},operationEnergyRanking:function(){return H},operationGeojsonMapOfACountry:function(){return I},updateRegion:function(){return Q},useActivedCountry:function(){return Zt},useCountryStatusList:function(){return bt},useEnergyConsumptionData:function(){return Qt},useEnergyRankingData:function(){return Yt},useGeojsonCountry:function(){return Lt},useGeojsonRegions:function(){return Rt},useHierachyCountryData:function(){return wt},useMapStore:function(){return pe},useMutationAlertsAndTickets:function(){return Kt},useMutationAutoGenerateRegion:function(){return At},useMutationDeleteCountry:function(){return Ot},useMutationDeleteEnergyRanking:function(){return Ut},useMutationDeleteRegion:function(){return It},useMutationOperationEnergyRanking:function(){return Bt},useMutationOperationGeojsonMapOfACountry:function(){return Gt},useMutationOperationRegion:function(){return Mt},useMutationUpdateActiveCountry:function(){return Dt},usePropertyList:function(){return jt},useQueryAlertsAndTickets:function(){return Wt},useQueryAlertsAndTicketsData:function(){return Vt},useQueryEnergyConsumption:function(){return Pt},useQueryEnergyRanking:function(){return Ft},useRegionList:function(){return Tt},useRegionListData:function(){return St},useSelectedCountry:function(){return Ct}});var r=n(2791),i=n.p+"static/media/background-map.5970f7141606477a2923.png",o=n(7852),a=n(150),u=n(1413),c=n(4925),s=n(1017),l=n(184),f=["title","children","sub","className","isLoading","classNameBlockTitle","childrenCenter","panelTitleClassName"],d=function(t){var e=t.title,n=t.children,r=t.sub,i=t.className,o=void 0===i?"":i,a=t.isLoading,d=t.classNameBlockTitle,p=t.childrenCenter,m=t.panelTitleClassName,g=void 0===m?"":m,v=(0,c.Z)(t,f);return(0,l.jsxs)("div",(0,u.Z)((0,u.Z)({className:"relative bg-[#212029] p-5 h-auto ".concat(o||"")},v),{},{children:[(0,l.jsxs)("div",{className:"grid items-center justify-between gap-3 ".concat(d),children:[(0,l.jsx)("div",{className:"panel-title font-medium text-white truncate max-w-100px ".concat(g||""),children:e}),r&&r]}),a?(0,l.jsx)(s.Z,{}):n&&(0,l.jsx)("div",{className:"".concat(p?"flex justify-center items-center":""," "),children:n})]}))};d.defaultProps={sub:null,className:"",isLoading:!1,classNameBlockTitle:"",childrenCenter:!1,panelTitleClassName:""};var p,m,g,v,y=r.memo(d),h=n(8111),N=n.n(h),x=n(7291),_=n.n(x),E=n(8032),k=n(3433),b=n(4165),C=n(5861),Z=n(7408),T=n(7151),j=n.n(T),L=n(7187),S=n(5824),w=n(5671),R=n(3144),O=new(function(){function t(e){var n=e.baseURL;(0,w.Z)(this,t),this.baseURL=void 0,this.controller=void 0,this.requestInit=void 0,this.baseURL=n,this.controller=new AbortController,this.requestInit={cache:"no-cache",mode:"cors",headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"*","Access-Control-Allow-Headers":"*"},credentials:"same-origin",redirect:"follow",referrerPolicy:"no-referrer"}}return(0,R.Z)(t,[{key:"get",value:function(t){var e=this.controller.signal;return fetch("".concat(this.baseURL,"/").concat(t),(0,u.Z)((0,u.Z)({},this.requestInit),{},{method:"GET",signal:e})).then((function(t){return t.json()})).catch((function(t){throw new Error(t)}))}},{key:"post",value:function(t,e){var n=this.controller.signal;return fetch("".concat(this.baseURL,"/").concat(t),(0,u.Z)((0,u.Z)({},this.requestInit),{},{method:"POST",body:JSON.stringify(e),signal:n})).then((function(t){return t.json()})).catch((function(t){throw new Error(t)}))}},{key:"put",value:function(t,e){var n=this.controller.signal;return fetch("".concat(this.baseURL,"/").concat(t),(0,u.Z)((0,u.Z)({},this.requestInit),{},{method:"PUT",body:JSON.stringify(e),signal:n})).then((function(t){return t.json()})).catch((function(t){throw new Error(t)}))}},{key:"delete",value:function(t,e){var n=this.controller.signal;return fetch("".concat(this.baseURL,"/").concat(t),(0,u.Z)((0,u.Z)({},this.requestInit),{},{method:"DELETE",body:JSON.stringify(e),signal:n})).then((function(t){return t.json()})).catch((function(t){throw new Error(t)}))}},{key:"abort",value:function(){this.controller.abort()}}]),t}())({baseURL:"".concat(S.V.API_DOMAIN_URL,"/map")}),D=function(){return O.get("general")},A=function(t){return O.get("geojsonmap?Country=".concat(t))},I=function(t,e){return O.post("geojsonmap?Country=".concat(t),e)},M=function(t){return O.get("geojsonmappropertylist?Country=".concat(t))},G=function(t,e){return O.get("region?Country=".concat(t,"&Region=").concat(e))},P=function(t,e,n){return O.post("region",(0,u.Z)({country:t,regionname:e},n))},Q=function(t,e,n){return O.put("region",(0,u.Z)({country:t,regionname:e},n))},F=function(t){return O.post("".concat(t,"/region"),{})},Y=function(t){return O.get("alertstickets?Country=".concat(t))},B=function(t){return O.post("alertstickets",t)},U=function(t){return O.get("energyconsumption?Country=".concat(t))},W=function(t){return O.get("energyranking?Country=".concat(t))},V=function(){return O.get("countrylist")},K=function(t){return O.get("regionlist?Country=".concat(t))},z=function(t){return O.delete("".concat(t,"/geojsonmap"))},q=function(t){return O.post("".concat(t,"/geojsonmap"))},J=function(){return O.get("countrystatuslist")},H=function(t,e,n){return O.post("energyranking?Country=".concat(t),(0,u.Z)({country:t,buildingname:e},n))},X=function(t){return O.post("".concat(t,"/energyranking"),{})},$=n(6695),tt=n(4942),et="regionname",nt="map_properties",rt="energy_consumption",it="energy_densisty_YTD",ot="open_tickets",at="active_alerts",ut="buildings",ct="floor_area",st="time",lt=(p={},(0,tt.Z)(p,et,"Region"),(0,tt.Z)(p,nt,"Coordinates"),(0,tt.Z)(p,rt,"Energy Consumption"),(0,tt.Z)(p,it,"Energy Density Consumption"),(0,tt.Z)(p,ot,"Open tickets"),(0,tt.Z)(p,at,"Alert Tickets"),(0,tt.Z)(p,ut,"Buildings"),(0,tt.Z)(p,ct,"Floor Area"),(0,tt.Z)(p,st,"Time"),p),ft="buildingname",dt="energy",pt="energy_density",mt=(m={},(0,tt.Z)(m,ft,"Building Name"),(0,tt.Z)(m,dt,"Energy"),(0,tt.Z)(m,pt,"Energy Density"),m),gt="country",vt="geojson",yt=(g={},(0,tt.Z)(g,gt,"Country"),(0,tt.Z)(g,vt,"Geojson"),g),ht="alerts",Nt="tickets",xt="alerts_display_name",_t="tickets_display_name",Et="display_name",kt=(v={},(0,tt.Z)(v,ht,"Alerts"),(0,tt.Z)(v,Nt,"Tickets"),(0,tt.Z)(v,xt,""),(0,tt.Z)(v,_t,""),(0,tt.Z)(v,Et,"Display name"),v),bt=function(){var t=pe().actionSetSelectedCountry;return(0,Z.useQuery)(["country-status-list"],(0,C.Z)((0,b.Z)().mark((function t(){var e;return(0,b.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,J();case 2:return e=t.sent,t.abrupt("return",(null===e||void 0===e?void 0:e.data)||[]);case 4:case"end":return t.stop()}}),t)}))),{onSuccess:function(e){var n,r=-1;e.length>0&&(r=(null===(n=e.find((function(t){return t.actived})))||void 0===n?void 0:n.id)||-1);t(r)},placeholderData:[]})},Ct=function(){var t,e=pe(),n=e.country,r=e.geojsonPropertyList,i=bt().data;return{country:(void 0===i?[]:i).find((function(t){return t.id===n}))||{id:-1,country:"",actived:!1},propertyList:(null===(t=r.find((function(t){return t.countryId===n})))||void 0===t?void 0:t.propertyList)||[]}},Zt=function(){var t=bt().data,e=(void 0===t?[]:t).find((function(t){return t.actived}));return{country:e,countryName:(null===e||void 0===e?void 0:e.country)||""}},Tt=function(){var t=Ct().country.country;return(0,Z.useQuery)(["regionlist",t],(0,C.Z)((0,b.Z)().mark((function e(){var n;return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K(t);case 2:return n=e.sent,e.abrupt("return",(null===n||void 0===n?void 0:n.data)||[]);case 4:case"end":return e.stop()}}),e)}))),{enabled:!!t})},jt=function(){var t=Ct().country,e=t.country,n=t.id,r=pe().actionSetGeojsonPropertyList;return(0,Z.useQuery)(["property-list",e],(0,C.Z)((0,b.Z)().mark((function t(){var n,r;return(0,b.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,M(e);case 2:return n=t.sent,r=(null===n||void 0===n?void 0:n.data.split(","))||[],t.abrupt("return",r);case 5:case"end":return t.stop()}}),t)}))),{enabled:!!e,onSuccess:function(t){r({countryId:n,propertyList:t})}})},Lt=function(){var t=Ct().country.country;return(0,Z.useQuery)(["geojsonmap",t],(0,C.Z)((0,b.Z)().mark((function e(){var n;return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A(t);case 2:return n=e.sent,e.abrupt("return",n.data||"");case 4:case"end":return e.stop()}}),e)}))),{enabled:!!t})},St=function(){var t=Ct().country.country,e=Tt().data,n=void 0===e?[]:e,i=(0,Z.useQueries)({queries:n.map((function(e){return{queryKey:["region-details",e,t],queryFn:function(){return G(t,e)},enabled:(null===n||void 0===n?void 0:n.length)>0}}))});return r.useMemo((function(){var t=i.some((function(t){return t.isLoading})),e=i.map((function(t){var e;return null===(e=t.data)||void 0===e?void 0:e.data})).filter((function(t){return!!t})).map((function(t){var e=t.energy_densisty_YTD,n=(0,$.BQ)([e],!0),r=n.divide,i=n.unit,o=n.minFractionDigits;return(0,u.Z)((0,u.Z)({},t),{},{energy_densisty_YTD_formatted:e?(0,$.dc)({value:e,unit:i,divide:r,fractionDigits:o}):"-",buildings_formatted:null!==t&&void 0!==t&&t.buildings?(0,$.dc)({value:null===t||void 0===t?void 0:t.buildings}):"-",floor_area_formatted:null!==t&&void 0!==t&&t.floor_area?(0,$.dc)({value:null===t||void 0===t?void 0:t.floor_area,unit:$.FD}):"-",active_alerts_formatted:(null===t||void 0===t?void 0:t.active_alerts)||"-",open_tickets_formatted:(null===t||void 0===t?void 0:t.open_tickets)||"-"})})),r=e.map((function(t){return t.id})),o=e.map((function(t){return t.regionname})),a=e.map((function(t){var e=t.id,n=t.regionname,r=t.map_properties,i=r&&(0,L.V)(r)?JSON.parse(r):void 0;return{id:e,name:n,mapProperties:"undefined"!==typeof i?i:[n]}}));return{isLoading:t,regionList:e,regions:n,regionMapProperties:a,regionListIds:r,regionListName:o}}),[i])},wt=function(){var t=Ct().country.country,e=Lt().data,n=void 0===e?"":e;return{id:t,name:t,geometry:(0,L.V)(n)?JSON.parse(n):{},children:[]}},Rt=function(){var t=Ct().country.country,e=Lt().isLoading,n=wt(),i=St(),o=i.regionMapProperties,a=i.regionListName,c=i.isLoading,s=jt(),l=s.data,f=s.isLoading;return r.useMemo((function(){var r=(0,$.BY)(o,n).features,i={type:"FeatureCollection",features:[]};if(n){var s=n.geometry,l=s.features;try{l=[].concat((0,k.Z)(l),(0,k.Z)(r)),i=(0,u.Z)((0,u.Z)({},s),{},{features:l})}catch(d){}}return{geojsonRegions:{id:t,name:t,geometry:i,children:[],regions:a},isLoading:e||f||c}}),[n,o,l,a,e,f,c,t])},Ot=function(){var t=(0,Z.useQueryClient)();return(0,Z.useMutation)((function(t){return z(t)}),{onSuccess:function(){t.invalidateQueries(["country-status-list"])}})},Dt=function(){var t=(0,Z.useQueryClient)();return(0,Z.useMutation)((function(t){return q(t)}),{onSuccess:function(){t.invalidateQueries(["country-status-list"])}})},At=function(){var t=(0,Z.useQueryClient)(),e=Ct().country.country;return(0,Z.useMutation)((0,C.Z)((0,b.Z)().mark((function t(){var n,r;return(0,b.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,M(e);case 2:return n=t.sent,r=(0,$.kZ)(n.data),t.next=6,Promise.all(r.map((function(t){return P(e,t,{})})));case 6:return t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)}))),{onSuccess:function(n){t.refetchQueries(["regionlist",e]),n.forEach((function(n){var r=["region-details",n,e];t.refetchQueries(r,{type:"all",exact:!0})}))}})},It=function(){var t=Ct().country.country,e=(0,Z.useQueryClient)();return(0,Z.useMutation)((function(t){return F(t)}),{onSuccess:function(){e.refetchQueries(["regionlist",t])}})},Mt=function(t){var e=t.isCreate,n=Ct().country.country,r=(0,Z.useQueryClient)(),i=(0,Z.useMutation)(function(){var t=(0,C.Z)((0,b.Z)().mark((function t(r){var i,o;return(0,b.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i=r.region,o=r.info,!e){t.next=6;break}return t.next=4,P(n,i,o);case 4:t.next=8;break;case 6:return t.next=8,Q(n,i,o);case 8:return t.abrupt("return",i);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),{onSuccess:function(t){if(e)r.refetchQueries(["regionlist",n]);else{var i=["region-details",t,n];r.refetchQueries(i,{type:"all",exact:!0})}}});return i},Gt=function(t){var e=t.isCreate,n=(0,Z.useQueryClient)(),r=(0,Z.useMutation)(function(){var t=(0,C.Z)((0,b.Z)().mark((function t(e){var n,r;return(0,b.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.country,r=e.geojson,t.next=3,I(n,r);case 3:return t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),{onSuccess:function(t){e?n.refetchQueries(["country-status-list"]):n.refetchQueries(["geojsonmap",t])}});return r},Pt=function(){var t=Zt().countryName;return(0,Z.useQuery)(["energy-consumption-".concat(t)],(0,C.Z)((0,b.Z)().mark((function e(){var n,r;return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=[],e.prev=1,e.next=4,U(t);case 4:r=e.sent,n=(null===r||void 0===r?void 0:r.data)||[],e.next=10;break;case 8:e.prev=8,e.t0=e.catch(1);case 10:return e.abrupt("return",n);case 11:case"end":return e.stop()}}),e,null,[[1,8]])}))),{enabled:!!t,placeholderData:[]})},Qt=function(){var t=Pt(),e=t.data,n=void 0===e?[]:e,i=t.isLoading;return r.useMemo((function(){var t=n.map((function(t){return t.energyconsumption})),e=(0,$.BQ)(t),r=e.divide,o=e.unit,a=n.map((function(t){var e=t.regionname;return{id:e,label:e,value:t.energyconsumption/r}}))||[],u=j()(a.map((function(t){return t.value})));return{donutText:i?"-":"".concat((0,$.dc)({value:u,divide:1,unit:o})),subDonutText:"YTD Energy",pieData:a,isLoading:i,formatterValue:function(t){return"".concat((0,$.dc)({value:t.value,divide:1,unit:o})," | ").concat(t.percent,"%")},renderTooltipValue:function(t){return"".concat(t.label," - ").concat((0,$.dc)({value:t.value,divide:1,unit:o})," | ").concat(t.percent,"%")}}}),[t])},Ft=function(t){return(0,Z.useQuery)(["energy-ranking-".concat(t)],(0,C.Z)((0,b.Z)().mark((function e(){var n;return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,W(t);case 3:return n=e.sent,e.abrupt("return",n.data||[]);case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])}))),{enabled:!!t,placeholderData:[]})},Yt=function(t,e){var n=Ft(e),i=n.data,o=void 0===i?[]:i,a=n.isLoading;return r.useMemo((function(){var e=o.map((function(e){return t?e.energy_density:e.energy})),n=(0,$.BQ)(e,t),r=n.divide,i=n.unit,u=n.minFractionDigits;return{isLoading:a,data:o.map((function(e){var n=e.energy,i=e.energy_density,o=e.id,a=e.buildingname,u=(t?i:n)/r;return{id:String(o),label:a,value:u}})),unit:i,minFractionDigits:u,dataResource:[]}}),[n,t])},Bt=function(t){var e=(0,Z.useQueryClient)(),n=(0,Z.useMutation)(function(){var e=(0,C.Z)((0,b.Z)().mark((function e(n){var r,i;return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.buildingname,i=n.info,e.next=3,H(t,r,i);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),{onSuccess:function(){e.refetchQueries(["energy-ranking-".concat(t)])}});return n},Ut=function(t){var e=(0,Z.useQueryClient)();return(0,Z.useMutation)((function(t){return X(t)}),{onSuccess:function(){e.refetchQueries(["energy-ranking-".concat(t)])}})},Wt=function(t){return(0,Z.useQuery)(["alerts-and-tickets-".concat(t)],(0,C.Z)((0,b.Z)().mark((function e(){var n;return(0,b.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y(t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)}))))},Vt=function(t){var e=Wt(t);return r.useMemo((function(){var t=e.data,n=e.isLoading;return t?{isLoading:n,alertsFormatted:"".concat(t[ht]),ticketsFormatted:"".concat(t[Nt]),resource:t,alertsDisplayName:t[xt],ticketsDisplayName:t[_t]}:{isLoading:n,resource:void 0,alertsFormatted:"-",ticketsFormatted:"-",alertsDisplayName:"-",ticketsDisplayName:"-"}}),[e])},Kt=function(t){var e=(0,Z.useQueryClient)();return(0,Z.useMutation)((function(e){return B((0,u.Z)({country:t},e))}),{onSuccess:function(){e.refetchQueries(["alerts-and-tickets-".concat(t)])}})},zt=function(){var t=(0,o.Z)().height,e=Rt(),n=e.geojsonRegions,r=e.isLoading,i=St().regionList;return(0,l.jsx)(a.Lp,{data:{hierachy:n,width:"auto",height:t-240},renderTooltip:function(t){var e=t.name,n=null,r=_()(e),o=i.find((function(t){return N()(r,t.regionname)}));if(o){var a=o,u=a.energy_densisty_YTD_formatted,c=a.buildings_formatted,s=a.floor_area_formatted,f=a.active_alerts_formatted,d=a.open_tickets_formatted;n=(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{className:"grid items-center gap-2 justify-between",style:{gridTemplateColumns:"repeat(2, minmax(100px, 50%))"},children:[(0,l.jsx)("div",{className:"text-xs truncate text-gray-400",children:"".concat(c," Buildings")}),(0,l.jsx)("div",{className:"text-right text-xs truncate text-gray-400",children:s})]}),(0,l.jsx)(E.Z,{className:"my-2"}),(0,l.jsx)("div",{className:"flex flex-row justify-around gap-3 p-3",children:[{title:"Energy Density YTD",value:u},{title:"Active Alerts",value:f},{title:"Open Tickets",value:d}].map((function(t){var e=t.title,n=t.value;return(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"text-sm font-medium text-white text-center truncate mb-1 sub-font",children:n}),(0,l.jsx)("div",{className:"text-xs text-gray-500 truncate",children:e})]},e)}))})]})}else n=(0,l.jsx)("div",{className:"abs-center",children:"Not data yet!"});return(0,l.jsx)(y,{className:"w-fit min-w-[380px] max-w-[400px] h-auto min-h-[150px]",title:r,panelTitleClassName:"text-sm",classNameBlockTitle:"mb-2",children:!!n&&n})},isLoading:r,classNameContainer:"z-1"})},qt=r.memo(zt),Jt=function(){var t=Zt().countryName,e=Vt(t),n=e.alertsFormatted,r=e.ticketsFormatted,i=e.alertsDisplayName,o=e.ticketsDisplayName,a=e.isLoading;return(0,l.jsx)(y,{title:"".concat(i," & ").concat(o),isLoading:a,classNameBlockTitle:"mb-3",panelTitleClassName:"text-base",children:(0,l.jsx)("div",{className:"grid items-center gap-8 justify-center abs-center block-alerts-tickets w-[100%]",children:[{label:"Total ".concat(i),value:n,sub:"",icon:(0,l.jsx)("i",{className:"fa-solid fa-triangle-exclamation text-red-500 fa-2x"})},{label:"Total ".concat(o),value:r,sub:"",icon:(0,l.jsx)("i",{className:"fa-solid fa-list text-yellow-500 fa-2x"})}].map((function(t,e){var n=t.label,r=t.value,i=t.sub,o=t.icon;return(0,l.jsxs)("div",{className:"flex flex-col justify-center items-center ".concat(0===e?"justify-self-end":"justify-self-start"),children:[(0,l.jsx)("div",{className:"text-sm text-gray-500 font-medium mb-2",children:n}),(0,l.jsxs)("div",{className:"grid items-center gap-3 alert-tickets-extra",children:[(0,l.jsx)("div",{children:o}),(0,l.jsx)("div",{className:"text-2xl sub-font font-medium truncate text-center",children:r}),(0,l.jsx)("div",{className:"text-xs text-gray-500",children:i})]})]},n)}))})})},Ht=r.memo(Jt),Xt=n(9439),$t=n(2341),te=n(7309),ee=[{key:"energy",tab:"Energy"},{key:"energy-density",tab:"Energy Density"}],ne=function(){var t=r.useState(ee[0].key),e=(0,Xt.Z)(t,2),n=e[0],i=e[1],o=Zt().countryName,a=Yt("energy-density"===n,o),u=a.data,c=a.isLoading,s=a.unit,f=a.minFractionDigits;return(0,l.jsx)(y,{title:"Ranking",sub:(0,l.jsx)("div",{className:"flex justify-end",children:ee.map((function(t){var e=t.key,r=t.tab,o=e===n;return(0,l.jsx)(te.Z,{onClick:function(){return i(e)},type:o?"primary":"default",children:r},e)}))}),isLoading:c,classNameBlockTitle:"block-ranking-title mb-3",panelTitleClassName:"text-base",children:(0,l.jsx)($t.Z,{data:{rankingData:u,formatterValue:function(t){var e=t.value;return(0,$.dc)({value:e,divide:1,unit:s,fractionDigits:f})}}})})},re=r.memo(ne),ie=n(3286),oe=function(){var t=Qt(),e=t.pieData,n=t.donutText,r=t.subDonutText,i=t.isLoading,o=t.formatterValue,a=t.renderTooltipValue;return(0,l.jsx)(y,{title:"Energy Consumption",isLoading:i,classNameBlockTitle:"mb-3",panelTitleClassName:"text-base",children:(0,l.jsx)(ie.Z,{data:{size:125,pieData:e,formatterValue:o,quantitiesItemOnChart:5,donutText:n,subDonutText:r,renderTooltipValue:a}})})},ae=r.memo(oe),ue=function(){return(0,l.jsxs)("div",{className:"relative map-page",children:[(0,l.jsx)("div",{className:"bg-no-repeat bg-center bg-auto opacity-50 absolute left-0 top-0 w-[100%] h-[100%]",style:{backgroundImage:"url(".concat(i,")")}}),(0,l.jsx)("div",{className:"bg-flash"}),(0,l.jsx)(qt,{}),(0,l.jsxs)("div",{className:"extra grid gap-8 mt-5 absolute bottom-0 left-0 z-50 px-5 pb-3 extra",children:[(0,l.jsx)(ae,{}),(0,l.jsx)(re,{}),(0,l.jsx)(Ht,{})]})]})},ce=r.memo(ue),se=n(1113),le={country:-1,geojsonPropertyList:[]},fe=(0,se.M)((function(t,e){return(0,u.Z)((0,u.Z)({},le),{},{actionSetSelectedCountry:function(e){return t({country:e})},actionSetGeojsonPropertyList:function(n){return t({geojsonPropertyList:[].concat((0,k.Z)(e().geojsonPropertyList),[n])})}})}),"MapStore"),de=(0,Xt.Z)(fe,2),pe=de[0],me=de[1].getState,ge=ce},7187:function(t,e,n){n.d(e,{V:function(){return r}});var r=function(t){var e=!0;try{JSON.parse(t)}catch(n){e=!1}return e}}}]);
//# sourceMappingURL=692.6ec7093e.chunk.js.map