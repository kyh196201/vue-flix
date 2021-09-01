// 이벤트를 감쌀 디바운싱 함수
function debounce(fn, delay) {
	// 타이머 선언
	let timer = null;
	// 타이머 변수에 접근 가능한 클로져 함수
	return function () {
		// 클로져 함수 안에서 this 와 arguments 변수로 디바운싱 함수의 스코프와 변수를 접근한다.
		let context = this;
		let args = arguments;

		console.log('fn', fn);
		console.log('context', context);
		console.log('args', args);

		// 만약 이벤트가 호출되면 타이머를 초기화 하고 다시 시작한다.
		clearTimeout(timer);

		timer = setTimeout(function () {
			fn.apply(context, args);
		}, delay);
	};
}

export default debounce;
