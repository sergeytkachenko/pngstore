Ext.define("Terrasoft.AtfBaseDashboardsViewModel", {
	override: "Terrasoft.BaseDashboardsViewModel",
	openDesigner: function(moduleId) {
		if (Terrasoft.Features.getIsEnabled("ATF_DashboardDesigner")) {
			var historyState = this.sandbox.publish("GetHistoryState");
			this.sandbox.publish("PushHistoryState", {hash: historyState.hash.historyState});
			this.sandbox.loadModule("BaseSchemaModuleV2", {
				id: (moduleId || this.getDesignerModuleId()),
				renderTo: "centerPanel",
				keepAlive: true,
				instanceConfig: {
					schemaName: "ATF_DashboardDesignerSchema",
					useHistoryState: true,
					isSchemaConfigInitialized: true
				}
			});
		} else {
			this.callParent(arguments);
		}
	}
});
Ext.define("Terrasoft.AtfDashbordDesignerUrlConfig", {
	override: "Terrasoft.RequireUrlConfig",
	getUrlArgs: function (e, n) {
		return n.indexOf("atf_") > -1
			? (-1 !== n.indexOf("?") ? "&" : "?") + "v=" + Ext.Date.getWeekOfYear(new Date)
			: this.callParent(arguments);
	}
});
Ext.define("Terrasoft.AtfPreviewableGridLayoutEditItem", {
	override: "Terrasoft.PreviewableGridLayoutEditItem",
	show: function() {
		var renderTo = this.renderTo;
		if (renderTo && renderTo.isVisible()) {
			this.visible = true;
			if (!this.rendered) {
				this.render(this.renderTo);
			} else {
				if (this._debouncedReRender) {
					this._debouncedReRender();
				} else {
					this._debouncedReRender = _.debounce(function() {
						this.reRender(null, this.renderTo);
					}, 300);
					this._debouncedReRender();
				}
			}
		}
	}
});