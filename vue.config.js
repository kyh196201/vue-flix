module.exports = {
	devServer: {
		overlay: false,
	},

	css: {
		loaderOptions: {
			scss: {
				additionalData: `
					@import "@/assets/scss/common.scss";
					@import "@/assets/scss/variables.scss";
				`,
			},
		},
	},
};
