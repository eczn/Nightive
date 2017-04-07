// Ex05-EverySome.js

function checkUsersValid(goodUsers){
	return function(testUsers){ // as testAllVaild 
		return testUsers.every(function(itemInTest){
			// itemInTest
			return goodUsers.some(function(itemInGood){
				return itemInTest === itemInGood; 
				// 答案这里用的是 return itemInTest.id === itemInGood.id 
			}); 
		}); 
	}
}

module.exports = checkUsersValid; 
