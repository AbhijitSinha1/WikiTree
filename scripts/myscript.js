$(document).ready(function(){
	var this_url=window.location;
	var this_count=addToStorage(this_url);
	var histPanel="<div id='bodyContent'>History</div><ul  style='list-style-type: none;list-style-image: none;' id='bodyContent'>"+listStorage("")+"</ul><div class='deleteHistory' id='bodyContent' style='cursor:pointer'>Delete History</div>";
	$("#mw-panel").append(histPanel);
	$("a").click(function(){
		insertToStorage(this_count,this);
	});
	$(".deleteHistory").click(function(){
		localStorage.clear();
		location.reload();
	});
});
function isCorrectURL(url){
	if((""+url).split("=").length>1){
		return(0);
	}
	return(1);
}
function insertToStorage(this_count,url){
	if(isCorrectURL(url)){
		if(localStorage.getItem(""+url)==null){
			var next_count=1;
			while(localStorage.getItem(""+this_count+""+next_count)!=null){
				next_count++;
			}
			localStorage.setItem(""+this_count+""+next_count,""+url);
			localStorage.setItem(""+url,""+this_count+""+next_count);
		}
	}
}
function addToStorage(this_url){
	var this_count=1;
	if(isCorrectURL(this_url)){
		if(localStorage.getItem(""+this_url)==null){
			while(localStorage.getItem(""+this_count)!=null){
				this_count++;
			}
			localStorage.setItem(""+this_count,""+this_url);
			localStorage.setItem(""+this_url,""+this_count);
		}
		else{
			this_count=localStorage.getItem(""+this_url);
		}
	}
	return(this_count);
}
function listStorage(prefix){
	var this_count=1;
	var retStr="";
	while(localStorage.getItem(prefix+this_count)!=null){
		var this_url=localStorage.getItem(prefix+this_count);
		retStr+="<li><span class='toctext'><a href='"+this_url+"' style='font-size:0.8em'>"+format(this_url)+"</a></span>";
		retStr+="<ul style='list-style-type: none;list-style-image: none;'>";
		retStr+=listStorage(prefix+this_count);
		retStr+="</ul>";
		retStr+="</li>";
		this_count++;
	}
	return(retStr);
}
function format(name){
	return(name.split("/")[4]);
}