module.exports = {
	devServer: {
		overlay: false,
	},

	css: {
		loaderOptions: {
			scss: {
				additionalData: `
					@import '/node_modules/open-color/open-color.scss';
					@import "@/assets/scss/_variables.scss";
					@import "@/assets/scss/_mixins.scss";
				`,
			},
		},
	},
};
