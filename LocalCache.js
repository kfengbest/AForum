'use strict';

var React = require('react-native');
var {
  AsyncStorage,
} = React;

var LocalCache = {

	async getAllKeys() {
		// try{
		// 	var res = await AsyncStorage.getAllKeys();
		// 	return res;
		// }catch(error){
		// 	console.log(error);			
		// }

		return await AsyncStorage.getAllKeys();
	},

	async saveItem(key, value) {
		try{
			var existedValue = await AsyncStorage.getItem(key);
			if (!existedValue) {
				await AsyncStorage.setItem(key, value);
				console.log("saved", key);
			}
		}catch(error){
			console.log(error);
		}
	},

	async getItem(key) {
		var res = await AsyncStorage.getItem(key);
		return res;
	}

};

module.exports = LocalCache;