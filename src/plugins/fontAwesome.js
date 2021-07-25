import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import sollidIcons from './solidIcons';
import regularIcons from './regularIcons';

export default {
	install: (app, options = {}) => {
		let icons = [...sollidIcons, ...regularIcons];

		if (Array.isArray(options.icons)) {
			icons.push(...options.icons);
		}

		library.add(...icons);

		app.component('font-awesome-icon', FontAwesomeIcon);
	},
};
