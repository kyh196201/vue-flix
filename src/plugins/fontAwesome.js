import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// solid icons
import { faPlay, faInfo } from '@fortawesome/free-solid-svg-icons';

export default {
	install: (app, options = {}) => {
		let icons = [faPlay, faInfo];

		if (Array.isArray(options.icons)) {
			icons.push(...options.icons);
		}

		library.add(...icons);

		app.component('font-awesome-icon', FontAwesomeIcon);
	},
};
