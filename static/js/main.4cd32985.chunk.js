(this.webpackJsonptodo=this.webpackJsonptodo||[]).push([[0],{23:function(t,e,o){},29:function(t,e,o){"use strict";o.r(e);var n,i,a,l,r,c=o(0),s=o.n(c),d=o(10),u=o.n(d),p=(o(23),o(4)),g=o(16),h=o(11),m=o(12),f=o(18),x=o(17),b=o(2),S=o(3),v=o(6),C=o(1),j=S.a.div(n||(n=Object(b.a)(["\n  min-height: 100vh;\n  max-width: 100vw;\n  background-color: ",";\n"])),(function(t){return t.color})),O=S.a.h1(i||(i=Object(b.a)(["\n  color: ",";\n"])),(function(t){return t.color})),T=S.a.div(a||(a=Object(b.a)(["\n  font-size: 30px;\n  text-align: center;\n  padding: 60px;\n  max-width: 100%;\n  color: ",";\n  input {\n    height: 50px;\n    width: 99%;\n    margin-top: 30px;\n    font-size: 30px;\n  }\n\n  ul {\n    list-style: none;\n    width: 100%;\n    margin-block-end: 0em;\n    margin-inline-start: 0px;\n    margin-inline-end: 0px;\n    padding-inline-start: 0px;\n  }\n\n  @media all and (max-width: 480px) {\n    padding: 20px;\n    ul {\n      margin: 10px;\n      padding: 10px;\n      margin-block-start: 0em;\n      margin-block-end: 0em;\n      margin-inline-start: 0px;\n      margin-inline-end: 0px;\n      padding-inline-start: 0px;\n    }\n    input {\n      width: 90%;\n      padding: 10px;\n    }\n  }\n"])),(function(t){return t.color})),k=Object(S.a)(v.b.li)(l||(l=Object(b.a)(["\n  position: relative;\n  text-align: center;\n  display: flex;\n  background-color: ",";\n  border: 1px solid #351e29;\n  min-height: 80px;\n  width: 100%;\n  justify-content: center;\n  align-items: center;\n  overflow-x: hidden;\n  padding: 5px 0 5px 0;\n  display: flex;\n  margin-top: 5px;\n\n  @media all and (max-width: 480px) {\n    width: 100%;\n    padding: 0px;\n    font-size: 25px;\n  }\n"])),(function(t){return t.color})),y=Object(S.a)(v.b.button)(r||(r=Object(b.a)(["\n  background-color: ",";\n  position: absolute;\n  right: 0px;\n  width: 50px;\n  height: 100%;\n  color: white;\n  border: none;\n  margin-left: 2px;\n"])),(function(t){return t.color})),w=function(t){Object(f.a)(o,t);var e=Object(x.a)(o);function o(){var t;Object(h.a)(this,o);for(var n=arguments.length,i=new Array(n),a=0;a<n;a++)i[a]=arguments[a];return(t=e.call.apply(e,[this].concat(i))).state={value:"",todoList:[],idCount:0,backgroundColor:"#283d3b",appTitle:"Todo List",appTitleColor:"white",itemColor:"#edddd4",itemFontColor:"black",itemCloseColor:"#c44536"},t.saveStateToStorage=function(){document.title=t.state.appTitle,t.faviconChanger(),localStorage.setItem("todoAppState",JSON.stringify(t.state)),t.showMeState()},t.handleSubmit=function(e){var o=function(){t.setState({value:"",todoList:[].concat(Object(g.a)(t.state.todoList),[{id:t.state.idCount+1,text:t.state.value,done:!1}]),idCount:t.state.idCount+1},(function(){t.saveStateToStorage()}))};e.preventDefault(),console.log(t.state);var n=t.state.value;if("x "===n.substring(0,2)||"X "===n.substring(0,2)){var i=n.substring(2,7);if(console.log('"'.concat(i,'"')),"clear"===i)t.clearAll(!1);else if("color"===i||"colou"===i)console.log("color is",n.split(" ")[2]),t.setState({value:"",backgroundColor:n.split(" ")[2]},(function(){document.getElementById("status-bar")&&(document.getElementById("status-bar").content=t.state.backgroundColor);t.saveStateToStorage()}));else if("title"===i)if(n.search(/colou?r/)>=0){var a=n.split(" ");t.setState({value:"",appTitleColor:a[a.length-1]},(function(){t.saveStateToStorage()}))}else t.setState({value:"",appTitle:n.split("title ")[1]},(function(){t.saveStateToStorage()}));else if("reset"===i)t.clearAll(!0);else if("item "===i){if(n.search(/colou?rs?/)>=0){var l=n.split(" ");console.log(l),4===l.length?t.setState({value:"",itemColor:l[3]},(function(){t.saveStateToStorage()})):5===l.length?t.setState({value:"",itemColor:l[3],itemFontColor:l[4]},(function(){t.saveStateToStorage()})):6===l.length&&t.setState({value:"",itemColor:l[3],itemFontColor:l[4],itemCloseColor:l[5]},(function(){t.saveStateToStorage()}))}}else o()}else o()},t.clearAll=function(e){e?(localStorage.clear(),t.setState({value:"",todoList:[],idCount:0,appTitle:"Todo App",backgroundColor:"#283d3b",appTitleColor:"white",itemColor:"#edddd4",itemFontColor:"black",itemCloseColor:"#c44536"},(function(){t.saveStateToStorage()}))):t.setState({value:"",todoList:[],idCount:0},(function(){t.saveStateToStorage()}))},t.handleChange=function(e){t.setState({value:e.target.value})},t.deleteItem=function(e){console.log("deletingitem"),e.preventDefault(),e.stopPropagation();var o=e.target.id.split("-")[1],n=t.state.todoList.filter((function(t){return t.id!==parseInt(o)}));console.log(n),t.setState({todoList:n},(function(){t.saveStateToStorage()}))},t.listClick=function(e){console.log("running listclick"),e.preventDefault(),console.log(e.target,t.state);var o=e.target.id,n=t.state.todoList.map((function(t){if(t.id.toString()===o){console.log(t.id,o);var e=Object(p.a)(Object(p.a)({},t),{},{done:!t.done});return console.log(e),e}return console.log(t),t}));t.setState(Object(p.a)(Object(p.a)({},t.state),{},{todoList:n}),(function(){t.saveStateToStorage()}))},t.componentDidMount=function(){t.showMeState();var e=localStorage.getItem("todoAppState");e?t.setState(JSON.parse(e)):t.setState({todoList:[{id:0,text:"Touch this item to disable it",done:!1},{id:1,text:"type 'x color gold' to change background color",done:!1},{id:2,text:"type 'x title \ud83d\udcb0\ud83d\udcb0` to set cutom title",done:!1},{id:3,text:"type 'x clear` to clear the list",done:!1},{id:4,text:"type 'x reset' to reset app to default state",done:!1}],idCount:4})},t.showMeState=function(){console.log(localStorage.getItem("todoAppState"))},t.faviconChanger=function(){console.log(t.state.appTitle,t.state.appTitleColor);var e=document.getElementById("favicon"),o=192,n=document.createElement("canvas");n.width=o,n.height=o;var i=n.getContext("2d"),a=document.createElement("img");e&&(a.src=e.href,a.onload=function(){if(i){i.drawImage(a,0,0,o,o);var l=t.state.appTitle[0]||"\u270d";console.log(t.state.appTitle[0],"is txt"),i.fillStyle=t.state.backgroundColor,i.fillRect(0,0,192,192),i.font="148px serif",i.fillStyle=t.state.appTitleColor,i.textBaseline="middle",i.textAlign="center",i.fillText(l,96,96),e.href=n.toDataURL("image/png"),document.getElementById("home-screen").href=n.toDataURL("image/png")}})},t}return Object(m.a)(o,[{key:"render",value:function(){var t,e=this;return t=this.state.todoList?this.state.todoList.map((function(t,o){return t.done?Object(C.jsxs)(k,{color:e.state.itemColor,initial:{opacity:1},animate:{opacity:.1},exit:{opacity:0},onClick:e.listClick,id:t.id.toString(),children:[t.text,Object(C.jsxs)(y,{color:e.state.itemCloseColor,onClick:e.deleteItem,id:"button-"+t.id.toString(),children:[" ","\xd7"," "]},o+"-button")]},o):Object(C.jsxs)(k,{color:e.state.itemColor,initial:{opacity:.1},animate:{opacity:1},exit:{opacity:0},onClick:e.listClick,id:t.id.toString(),children:[t.text,Object(C.jsxs)(y,{color:e.state.itemCloseColor,id:"button-"+t.id.toString(),onClick:e.deleteItem,children:[" ","\xd7"," "]},o+"button")]},o)})):null,Object(C.jsx)(j,{color:this.state.backgroundColor,children:Object(C.jsx)(T,{color:this.state.itemFontColor,children:Object(C.jsxs)("div",{className:"container",children:[Object(C.jsx)(O,{color:this.state.appTitleColor,children:this.state.appTitle}),Object(C.jsx)("form",{onSubmit:this.handleSubmit,children:Object(C.jsx)("input",{onSubmit:this.handleSubmit,type:"text",name:"text-box",id:"text-box",value:this.state.value,onChange:this.handleChange,placeholder:"\u270f"})}),Object(C.jsxs)("ul",{children:[" ",Object(C.jsx)(v.a,{children:t})]})]})})})}}]),o}(c.Component),L=function(t){t&&t instanceof Function&&o.e(3).then(o.bind(null,30)).then((function(e){var o=e.getCLS,n=e.getFID,i=e.getFCP,a=e.getLCP,l=e.getTTFB;o(t),n(t),i(t),a(t),l(t)}))};u.a.render(Object(C.jsx)(s.a.StrictMode,{children:Object(C.jsx)(w,{})}),document.getElementById("root")),L()}},[[29,1,2]]]);
//# sourceMappingURL=main.4cd32985.chunk.js.map