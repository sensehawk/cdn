/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[5],{563:function(xa,ta,n){n.r(ta);var qa=n(0);xa=n(54);var na=n(205),oa=n(477),ha=n(260),la=window;n=function(){function ia(z,aa){this.v5=function(r){r=r.split(".");return r[r.length-1].match(/(jpg|jpeg|png|gif)$/i)};aa=aa||{};this.url=z;this.filename=aa.filename||z;this.Ag=aa.customHeaders;this.GGa=!!aa.useDownloader;this.withCredentials=!!aa.withCredentials}ia.prototype.XK=function(z){this.Ag=z};ia.prototype.getCustomHeaders=function(){return this.Ag};
ia.prototype.getFileData=function(z){var aa=this,r=this,h=new XMLHttpRequest,f=0===this.url.indexOf("blob:")?"blob":"arraybuffer";h.open("GET",this.url,!0);h.withCredentials=this.withCredentials;h.responseType=f;this.Ag&&Object.keys(this.Ag).forEach(function(b){h.setRequestHeader(b,aa.Ag[b])});var a=/^https?:/i.test(this.url);h.addEventListener("load",function(b){return Object(qa.b)(this,void 0,void 0,function(){var e,w,ea,y,ba,x;return Object(qa.d)(this,function(fa){switch(fa.label){case 0:if(200!==
this.status&&(a||0!==this.status))return[3,10];r.trigger(ia.Events.DOCUMENT_LOADING_PROGRESS,[b.loaded,b.loaded]);if("blob"!==this.responseType)return[3,4];e=this.response;return r.v5(r.filename)?[4,Object(ha.b)(e)]:[3,2];case 1:return w=fa.ba(),r.fileSize=w.byteLength,z(new Uint8Array(w)),[3,3];case 2:ea=new FileReader,ea.onload=function(ca){ca=new Uint8Array(ca.target.result);r.fileSize=ca.length;z(ca)},ea.readAsArrayBuffer(e),fa.label=3;case 3:return[3,9];case 4:fa.Wd.push([4,8,,9]);y=new Uint8Array(this.response);
if(!r.v5(r.filename))return[3,6];e=new Blob([y.buffer]);return[4,Object(ha.b)(e)];case 5:return w=fa.ba(),r.fileSize=w.byteLength,z(new Uint8Array(w)),[3,7];case 6:r.fileSize=y.length,z(y),fa.label=7;case 7:return[3,9];case 8:return fa.ba(),r.trigger(ia.Events.ERROR,["pdfLoad","Out of memory"]),[3,9];case 9:return[3,11];case 10:ba=b.currentTarget,x=Object(na.b)(ba),r.trigger(ia.Events.ERROR,["pdfLoad",this.status+" "+ba.statusText,x]),fa.label=11;case 11:return r.xE=null,[2]}})})},!1);h.onprogress=
function(b){r.trigger(ia.Events.DOCUMENT_LOADING_PROGRESS,[b.loaded,0<b.total?b.total:0])};h.addEventListener("error",function(){r.trigger(ia.Events.ERROR,["pdfLoad","Network failure"]);r.xE=null},!1);h.send();this.xE=h};ia.prototype.getFile=function(){var z=this;return new Promise(function(aa){la.da.isJSWorker&&aa(z.url);if(z.GGa){var r=Object(qa.a)({url:z.url},z.Ag?{customHeaders:z.Ag}:{});aa(r)}aa(null)})};ia.prototype.abort=function(){this.xE&&(this.xE.abort(),this.xE=null)};ia.Events={DOCUMENT_LOADING_PROGRESS:"documentLoadingProgress",
ERROR:"error"};return ia}();Object(xa.a)(n);Object(oa.a)(n);Object(oa.b)(n);ta["default"]=n}}]);}).call(this || window)
