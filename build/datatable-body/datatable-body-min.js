YUI.add("datatable-body",function(a){var e=a.Lang,f=e.isArray,j=e.sub,i=a.Escape.html,c=a.Array,g=a.bind,h=a.Object,b=a.ClassNameManager,d=b.getClassName;a.namespace("DataTable").BodyView=a.Base.create("tableBody",a.View,[],{CELL_TEMPLATE:'<td {headers} class="{className}">{content}</td>',ROW_TEMPLATE:'<tr id="{rowId}" class="{rowClass}">{content}</tr>',getCell:function(n,l){var k=this.get("container"),m;if(k){m=k.getDOMNode().rows[+n];m&&(m=m.cells[+l]);}return a.one(m);},getClassName:function(){var k=c(arguments);k.unshift(this._cssPrefix);k.push(true);return d.apply(b,k);},getRow:function(l){var k=this.get("container");return a.one(k&&k.getDOMNode().rows[+l]);},render:function(){var k=this.get("container"),m=this.get("modelList"),l=this.columns;this._createRowTemplate(l);if(k&&m){k.setContent(this._createDataHTML(l));this._applyNodeFormatters(k,l);}this.bindUI();return this;},_afterColumnsChange:function(k){this.columns=this._parseColumns(k.newVal);this.render();},_afterDataChange:function(k){this.render();},_afterModelListChange:function(m){var k=m.prevVal,l=m.newVal;if(k&&k.removeTarget){k.removeTarget(this);}if(l&&l.addTarget(this)){l.addTarget(this);}},_applyNodeFormatters:function(q,l){var k=this.source,o=this.get("modelList"),n=[],m="."+this.getClassName("liner"),s,p,r;for(p=0,r=l.length;p<r;++p){if(l[p].nodeFormatter){n.push(p);}}if(o&&n.length){s=q.get("childNodes");o.each(function(x,y){var v={data:x.toJSON(),record:x,rowIndex:y},D=s.item(y),w,z,u,B,C,A,t;if(D){C=D.get("childNodes");for(w=0,z=n.length;w<z;++w){A=C.item(n[w]);if(A){u=v.column=l[n[w]];B=u.key||u.id;v.value=x.get(B);v.td=A;v.cell=A.one(m)||A;t=u.nodeFormatter.call(k,v);if(t===false){A.destroy(true);}}}}});}},bindUI:function(){var k=this._eventHandles,l=this.get("modelList");if(this.source&&!k.columnsChange){k.columnsChange=this.source.after("columnsChange",g("_afterColumnsChange",this));}if(!k.dataChange){k.dataChange=this.after(["modelListChange","*:change","*:add","*:remove","*:reset"],g("_afterDataChange",this));}},_cssPrefix:b.getClassName("table"),_createDataHTML:function(l){var m=this.get("modelList"),k="";if(m){m.each(function(o,n){k+=this._createRowHTML(o,n);},this);}return k;},_createRowHTML:function(r,s){var p=r.toJSON(),v={rowId:r.get("clientId"),rowClass:(s%2)?this.CLASS_ODD:this.CLASS_EVEN},k=this.source||this,n=this.columns,q,t,l,m,u,o;for(q=0,t=n.length;q<t;++q){l=n[q];u=p[l.key];m=l._id;v[m+"-className"]="";if(l.formatter){o={value:u,data:p,column:l,record:r,className:"",rowClass:"",rowIndex:s};if(typeof l.formatter==="string"){if(u!==undefined){u=j(l.formatter,o);}}else{u=l.formatter.call(k,o);if(u===undefined){u=o.value;}v[m+"-className"]=o.className;v.rowClass+=" "+o.rowClass;}}if(u===undefined||u===null||u===""){u=l.emptyCellValue||"";}v[m]=l.allowHTML?u:i(u);v.rowClass=v.rowClass.replace(/\s+/g," ");}return j(this._rowTemplate,v);},_createRowTemplate:function(n){var q="",t=this.CELL_TEMPLATE,p,r,m,s,o,l,k;for(p=0,r=n.length;p<r;++p){m=n[p];s=m.key;o=m._id;l=(m._headers||[]).length>1?'headers="'+m._headers.join(" ")+'"':"";k={content:"{"+o+"}",headers:l,className:this.getClassName("col",o)+" "+(m.className||"")+" "+this.getClassName("cell")+" {"+o+"-className}"};if(m.nodeFormatter){k.content="";}q+=j(m.cellTemplate||t,k);}this._rowTemplate=j(this.ROW_TEMPLATE,{content:q});},destructor:function(){this.set("modelList",null);(new a.EventHandle(h.values(this._eventHandles))).detach();},initializer:function(k){var m=k.cssPrefix||(k.source||{}).cssPrefix,l=this.get("modelList");this.source=k.source;this.columns=this._parseColumns(k.columns);this._eventHandles={};if(m){this._cssPrefix=m;}this.CLASS_ODD=this.getClassName("odd");this.CLASS_EVEN=this.getClassName("even");this.after("modelListChange",g("_afterModelListChange",this));if(l&&l.addTarget){l.addTarget(this);}},_parseColumns:function(o,n){var l,m,k;n||(n=[]);if(f(o)&&o.length){for(m=0,k=o.length;m<k;++m){l=o[m];if(typeof l==="string"){l={key:l};}if(l.key||l.formatter||l.nodeFormatter){l.index=n.length;n.push(l);}else{if(l.children){this._parseColumns(l.children,n);}}}}return n;}},{ATTRS:{modelList:{setter:"_setModelList"}}});},"@VERSION@",{requires:["datatable-core","view","classnamemanager"]});