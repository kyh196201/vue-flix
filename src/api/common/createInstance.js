import axios from 'axios';

export default function createInstance(configs = {}) {
	return axios.create(configs);
}
