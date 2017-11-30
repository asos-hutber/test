/**
 * Created by Hutber on 12/02/2015.
 */
'use strict';
module.exports = function(){

	var connection = {};

	/*==================================================
	 Networking functions
	 ================================================== */
	connection.checkConnection = function (){
	    // return 'none';
		if(DB.isMobile) {
			connection.connection = navigator.connection.type;
			
			var states = {};
			states[connection.UNKNOWN] = 'Unknown connection';
			states[connection.ETHERNET] = 'Ethernet connection';
			states[connection.WIFI] = 'WiFi connection';
			states[connection.CELL_2G] = 'Cell 2G connection';
			states[connection.CELL_3G] = 'Cell 3G connection';
			states[connection.CELL_4G] = 'Cell 4G connection';
			states[connection.CELL] = 'Cell generic connection';
			states[connection.NONE] = 'No network connection';
            
			//alert('Connection type: ' + states[networkState]);
			return connection.connection;
			// if (
			// 	connection.connection === "none" && localStorage.getItem('uid') !== null
			// 	&& RN.glb.hash!=="notactive"
			// 	&& RN.glb.hash!=="pin"
			// ) {
			// 	RN.router.navigate('notactive', true);
			// };
		}
	};

	return connection;
};
