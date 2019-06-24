$(document).ready(function () {

	$(function () {
		var time_runing = 9000;
		var waiting = 4000;
		var timeoutObj;
		var count = 1;
		var bingo = {
			selectedNumbers: [],
			generateRandom: function () {
				var min = 1;
				var max = 75;
				var random = Math.floor(Math.random() * (max - min + 1)) + min;
				return random;
			},
			generateNextRandom: function () {
				var random = bingo.generateRandom();
				while ($.inArray(random, bingo.selectedNumbers) > -1) {
					random = bingo.generateRandom();
				}
				$('div.cell' + bingo.selectedNumbers[bingo.selectedNumbers.length - 1]).removeClass('last_number');
				bingo.selectedNumbers.push(random);
				return random;
			},
			barAnim: function () {
				clearInterval(window.id);
				clearInterval(window.random_number);
				window.value = 0;

				$(".progress-bar").css("width", window.value + "%").attr("aria-valuenow", window.value);
				window.random_number = setInterval(function () {
						var random = Math.floor(Math.random() * (75 - 1 + 1)) + 1;
						$('.bigNumberDisplay p').text(random);
					}, 100);
				window.id = setInterval(frame, time_runing / 100);

				function frame() {
					theTrack.volume = 1;
					if (window.value >= 100) {
						clearInterval(window.id);
						clearInterval(window.random_number);
						var random = bingo.generateNextRandom().toString();
						localStorage.setItem("lastresult", JSON.stringify(bingo.selectedNumbers));
						$('.bigNumberDisplay p').text(random);
						$('div.cell' + random).addClass('last_number');
						if (random <= 15) {
							$('div.cell' + random).addClass('selected1');
						} else if (random <= 30) {
							$('div.cell' + random).addClass('selected2');
						} else if (random <= 45) {
							$('div.cell' + random).addClass('selected3');
						} else if (random <= 60) {
							$('div.cell' + random).addClass('selected4');
						} else {
							$('div.cell' + random).addClass('selected5');

						}

						theTrack.volume = 0.2;

						var msg = new SpeechSynthesisUtterance();
						msg.text = random;
						msg.lang = 'sw-KE';
						window.speechSynthesis.speak(msg);
						window.value = 0;

						timeoutObj = sleep(waiting);

						timeoutObj.promise.then(function () {
							$(".progress-bar").css("width", window.value + "%").attr("aria-valuenow", window.value);
							if (!check_finish()) {
								var test = sleep(550);
								test.promise.then(function () {
									window.random_number = setInterval(function () {
											var random = Math.floor(Math.random() * (75 - 1 + 1)) + 1;
											$('.bigNumberDisplay p').text(random);
										}, 100);
									window.id = setInterval(frame, time_runing / 100);
								})
							}
						});

					} else {
						window.value = window.value + 1;
						$(".progress-bar").css("width", window.value + "%").attr("aria-valuenow", window.value);
					}
				}
			}
		};
		if (localStorage.getItem("lastresult")) {
			$('#btnReset').show();
			bingo.selectedNumbers = JSON.parse(localStorage.getItem("lastresult"));
			bingo.selectedNumbers.forEach(function (element) {
				if (element <= 15) {
					$('div.cell' + element).addClass('selected1');
				} else if (element <= 30) {
					$('div.cell' + element).addClass('selected2');
				} else if (element <= 45) {
					$('div.cell' + element).addClass('selected3');
				} else if (element <= 60) {
					$('div.cell' + element).addClass('selected4');
				} else {
					$('div.cell' + element).addClass('selected5');

				}

			});

		}
		$('td').each(function () {
			var className = $(this).attr('class');
			if (className) {
				var numberString = className.slice(4);
				$(this).text(numberString);
			}
		});
		function check_finish() {
			if (bingo.selectedNumbers.length >= 75) {

				count = 1;
				clearInterval(window.random_number);
				clearInterval(window.id);
				if (typeof timeoutObj !== "undefined") {
					timeoutObj.cancel();
				}
				removeBarAnim();
				$('#btnStart').show();
				$('#btnStop').hide();
				alert('COMPLETE');
				return 1;
			} else
				return 0;
		}
		function sleep(time) {
			var timeout,
			promise;
			promise = new Promise(function (resolve, reject) {
					timeout = setTimeout(function () {
							resolve();
						}, time);
				});
			return {
				promise: promise,
				cancel: function () {
					clearTimeout(timeout);
				} //return a canceller as well
			};
		}
		function removeBarAnim() {
			window.value = 0;
			$(".progress-bar").css("width", "0%").attr("aria-valuenow", 0);
		}

		function getAudio(play) {
			var audio = new Audio("public/sound/beat.mp3");

			if (play) {
				audio.play();
			}
			return audio;
		}

		var theTrack = getAudio(false);
		theTrack.addEventListener('ended', function () {
			this.currentTime = 0;
			this.play();
		}, false);
		var count = 1;
		$('#btnStart').click(async function () {
			if (!check_finish()) {
				if (count == 1) {
					theTrack.play()
					theTrack.volume = 1;
				} else {
					count++;
					theTrack.volume = 1;
				}
				$('#btnStart').hide();
				$('#btnStop').show();
				bingo.barAnim();
			}
		});

		$('#btnStop').click(function () {
			clearInterval(window.random_number);
			clearInterval(window.id);
			if (typeof timeoutObj !== "undefined") {
				timeoutObj.cancel();
			}
			removeBarAnim();
			if (bingo.selectedNumbers.length == 0) {
				$('.bigNumberDisplay p').text('0');
			} else {
				$('.bigNumberDisplay p').text(bingo.selectedNumbers[bingo.selectedNumbers.length - 1]);
			}
			theTrack.pause()
			$('#btnStart').show();
			$('#btnStop').hide();
		});
		$('#reset').click(function () {
			localStorage.clear();
			window.location.reload();
		});

		$(document).keypress(function (event) {
			var keycode = (event.keyCode ? event.keyCode : event.which);
			if (keycode == '32') {
				event.preventDefault();
				if ($('#btnStart').is(':visible')) {
					$('#btnStart').trigger('click');
				} else if ($('#btnStop').is(':visible')) {
					$('#btnStop').trigger('click');
				}
			}
		});
	});
});