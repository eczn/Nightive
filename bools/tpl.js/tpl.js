// tpl.js
var fs = require('fs'); 
var EXP = /{{(.*?)}}/g; 
var tpl = {}; 
var tokenParser = require('./tokenParser'); 
var syntaxParser = require('./syntaxParser'); 
var syntaxer = require('./syntaxer'); 

tpl.fromFile = (tplWhere, config) => {
	var template = fs.readFileSync(tplWhere).toString(); 

	return tpl.fromStr(template, config); 
}

tpl.fromStr = (template, config) => {
	if (config.compress){
		template = template.replace(/(\n|\r|\t)/g, ''); 
	}

	return dataRaw => tpl.render(template, dataRaw); 
}


tpl.render = (template, dataRaw) => {
	var statements = []; 

	var res = template.replace(EXP, (match, p1, offset) => {
		statements.push({
			token: match, 
			offset: offset
		}); 
		
		return dataRaw[p1.trim()]; 
	}); 
	

	var codeTokens = statements.reduce((acc, stat, idx, its) => {
		if (idx === 0){
			acc.push({
				isCode: false, 
				token: template.slice(0, stat.offset)
			})
		} else {
			acc.push({
				isCode: false, 
				token: template.slice(
					its[idx - 1].offset + its[idx - 1].token.length,
					stat.offset
				)
			})
		}

		acc.push({
			isCode: true, 
			token: stat.token
		}); 

		return acc; 
	}, []).concat([
		// 上面那个 reduce 会漏掉最后一个 在这里补上 
		{
			isCode: false, 
			token: template.slice(
				
				statements[statements.length - 1].offset + statements[statements.length - 1].token.length
			)
		}
	])

	// 解析 
	codeTokens.forEach(e => {
		if (e.isCode) {
			var temp = e.token.slice(2, -2).trim();
			e.token = tokenParser(temp); 
		}
	}); 

	// codeTokens.forEach(e => console.log(e))
	 

	// Eval Sytax Array 
	return syntaxer(
		syntaxParser(codeTokens),
		[ dataRaw ]
	); 
}


module.exports = tpl; 

