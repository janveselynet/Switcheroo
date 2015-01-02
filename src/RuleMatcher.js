var RuleMatcher = function(rules){
    var lastRequestId;

    this.rules = rules;

    this.redirectOnMatch = function(request){
        var rule = _.find(rules, function(rule){ 
            var regExp = new RegExp(rule.from);
            return rule.isActive 
            && regExp.test(request.url) 
            && request.requestId !== lastRequestId; 
        });

        if(rule){
            lastRequestId = request.requestId;
            return {
                redirectUrl : request.url.replace(new RegExp(rule.from), rule.to)
            };
        }
    };
};