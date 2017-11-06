// In mock mode, the mock server intercepts HTTP calls and provides fake output to the
// client without involving a backend system. But special backend logic, such as that
// performed by function imports, is not automatically known to the mock server. To handle
// such cases, the app needs to define specific mock requests that simulate the backend
// logic using standard HTTP requests (that are again interpreted by the mock server) as
// shown below.

sap.ui.define(["sap/ui/base/Object"], function(Object) {
	"use strict";

	return Object.extend("nw.epm.refapps.st.prod.manage.localService.MockRequests", {
		constructor: function(oMockServer) {
			this._oMockServer = oMockServer;
			this._oMockServer.attachBefore("POST", this.onBeforeGetBestseller.bind(this), "SEPMRA_C_PD_Product");
		},

		getRequests: function() {
			// handler for equests that are not treated by the mock server
			return [this.mockCopy(), this.mockMeta()];
			
		},

		onBeforeGetBestseller: function(oEvent) {
			/* eslint-disable */
			alert("Draft related operations are not supported in mock mode");
			/* eslint-enable */
		},

		mockCopy: function() {
			return {
				method: "POST",
				path: new RegExp("SEPMRA_C_PD_ProductCopy\\?(.*)"),
				response: function(oXhr) {
					/* eslint-disable */
					alert("Draft related operations are not supported in mock mode");
					/* eslint-enable */
					oXhr.respondJSON(200, {}, JSON.stringify({
						d: {
						}
					}));
					return true;
				}
			};
		},
		mockMeta: function() {
			return {
				method: "GET",
				path: new RegExp("\$metadata\\?(.*)"),
				response: function(oXhr) {
					jQuery.sap.require("jquery.sap.xml");
	 				oXhr.respondXML(200, {}, jQuery.sap.serializeXML( jQuery.sap.sjax({
	 									url: jQuery.sap.getModulePath("nw/epm/refapps/st/prod/manage/localservice/mockdata/metadata", ".xml"),
	 									dataType: "xml"
	 								}).data ));
	 				return true;
				}
			};
		}
	});
});