var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: ["http://docs.oracle.com/javase/*","https://docs.oracle.com/javase/*"],
  //contentScript: contentScriptString,
  contentStyleFile: [
  	data.url("popover.css"), 
  	data.url("main.css")
  	],
  contentScriptFile: [
  	data.url("jquery-1.7.2.min.js"), 
  	data.url("jquery.popover-1.1.0.js"),
  	data.url("Mustache.js"),
    data.url("content.js")
  	]
});
