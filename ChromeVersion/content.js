//if the link matches the format of the java api doc 
if(document.location.pathname.match(/\/docs\/api\/(\w+(?:\/\w+)*)\.html/)) {
	// get the API keyword
    var keyword = document.location.pathname;
    var keyword1 = keyword.split('/').pop();
	// get json data
	$.getJSON('https://cs.adelaide.edu.au/~christoph/insights.json', function(data){
		var insights;
		// get the insight sentences of the keyword
		$.each(data.data, function(){
			$.each(this, function(name, value){
				if(name.match(keyword1)) {
					insights = value.insights;
				}
			})
		});
		// display the sentences and paragraphs
		if(insights) {
			var link = "";
			if(insights[0].link.startsWith("http")) {
				link = '<a class="link" href="{{link}}" target="_blank">{{link}}</a>';
			} else {
				link = '<a class="link" href="http://{{link}}" target="_blank">http://{{link}}</a>';
			}
			var template = 
				'<div>'+
					'{{#insights}}'+
						'<div class="wrapTitle"><span class="symbol"></span><div class="sencence">{{sentence}}</div></div>'+
						'<div class="wrapContent">' +
							'<div class="paragraph">{{paragraph}}</div>'+
							link + 
						'</div>'+
					'{{/insights}}'+
				'</div>',
				content = Mustache.render(template, {insights: insights}),
				titleTemplate = '<div id="stackdoc-title"></div>',
				titleText = Mustache.render(titleTemplate),
				$sd = $(titleText);
			$sd.popover({
                content: content,
                classes: "large",
                position: 'bottom',
                verticalOffset: 0
            }).insertBefore($("body")).popover('show');

            $(".wrapContent").hide();

            $(".wrapTitle").click(function(e){
            	$(this).children(".symbol").toggleClass("bottom");
            	$(this).next().toggle();
            });
		}
	});
}
