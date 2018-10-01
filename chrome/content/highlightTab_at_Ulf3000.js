var highlightTab_at_Ulf3000 = {
	init: function () {
		Services.obs.addObserver(highlightTab_at_Ulf3000.SMObserver, "sessionmanager:restoring-window", false);
		window.addEventListener("SSWindowRestored", highlightTab_at_Ulf3000.windowRestore, false); // hack around browser.sessionstore.restore_tabs_lazily
		window.document.addEventListener("SSTabRestoring", highlightTab_at_Ulf3000.reHL, false);
		let tabbrowser = window.document.getElementById("tabbrowser-tabs");
		tabbrowser.onmousedown = highlightTab_at_Ulf3000.clickTab;
	},
	SMObserver: { //for sesion manager addon
		observe: function (aSubject, aTopic, aData) {
			if (aSubject)
				highlightTab_at_Ulf3000.windowRestore(aSubject);
		}
	},
	windowRestore: function (e) {
		for (let tab of gBrowser.tabs) {
			highlightTab_at_Ulf3000.reHL2(tab);
		}
	},
	reHL: function (e) { // for SSTabRestoring (session-restore, tab restore, other addons)
		let xxx = SessionStore.getTabValue(e.target, "highlighted_HT");
		if (xxx) {
			e.target.style.setProperty('background', xxx, "important");
		};
	},
	reHL2: function (tab) { // for SSTabRestoring (session-restore, tab restore, other addons)
		let xxx = SessionStore.getTabValue(tab, "highlighted_HT");
		if (xxx) {
			tab.style.setProperty('background', xxx, "important");
		};
	},
	clickTab: function (e) {
		//e.preventDefault();  // ToDO ??? still selects the tab
		if (e.button == 0 && e.ctrlKey) {
			highlightTab_at_Ulf3000.highlightTab(e.target, '#C5DE92');
		} else if (e.button == 0 && e.shiftKey) {
			highlightTab_at_Ulf3000.highlightTab(e.target, '#FAAD5F');
		}
	},
	highlightTab: function (node, c) {
		if (c == '' || c == SessionStore.getTabValue(node, "highlighted_HT")) {
			node.style.removeProperty('background');
			SessionStore.deleteTabValue(node, "highlighted_HT");
		} else {
			node.style.setProperty('background', c, "important");
			SessionStore.setTabValue(node, "highlighted_HT", c);
		}
	}
};
highlightTab_at_Ulf3000.init();
