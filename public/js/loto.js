$(document).ready(function() {

    $(function() {
        var bingo = {
            selectedNumbers: [],
            generateRandom: function() {
                var min = 1;
                var max = 75;
                var random = Math.floor(Math.random() * (max - min + 1)) + min;
                return random;
            },
            generateNextRandom: function() {
                var random = bingo.generateRandom();
                while ($.inArray(random, bingo.selectedNumbers) > -1) {
                    random = bingo.generateRandom();
                }
                $('div.cell' + bingo.selectedNumbers[bingo.selectedNumbers.length - 1]).removeClass('last_number');
                bingo.selectedNumbers.push(random);
                return random;
            }
        };
        if (localStorage.getItem("lastresult")) {
            $('#btnReset').show();
            bingo.selectedNumbers = JSON.parse(localStorage.getItem("lastresult"));
            bingo.selectedNumbers.forEach(function(element) {
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
        $('td').each(function() {
            var className = $(this).attr('class');
            if (className) {
                var numberString = className.slice(4);
                $(this).text(numberString);
            }
        });

        function sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds) {
                    break;
                }
            }
        }
        var value = 0;

        function removeBarAnim() {
            value = 0;
            $(".progress-bar").css("width", "0%").attr("aria-valuenow", 0);
        }

        function barAnim() {
            value += 1;
            $(".progress-bar").css("width", value + "%").attr("aria-valuenow", value);
            if (value > 100) {
                return 0;
            }
            return setTimeout(barAnim, 200);
        }

        function barAnim2() {
            value += 1;
            if (value < 10) {
                temp = 0;
            } else {
                temp = value;
            }
            $(".progress-bar").css("width", temp + "%").attr("aria-valuenow", temp);
            if (value > 100) {
                return 0;
            }
            return setTimeout(barAnim2, 165);
        }

        function getAudio(play) {
            var audio = new Audio("public/sound/beat.mp3");
            if (play) {
                audio.play();
            }
            return audio;
        }

        var theTrack = getAudio(false);
        $('#btnGenerate').click(function() {
            clearInterval(window.txt);
            removeBarAnim();
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


            var msg = new SpeechSynthesisUtterance();
            msg.text = random;
            msg.lang = 'sw-KE';
            window.speechSynthesis.speak(msg);
            if (bingo.selectedNumbers.length == 75) {
                clearInterval(window.loto);
                alert('da het so');
            } else {
                setTimeout(function() {
                    window.txt = setInterval(function() {
                        var random = Math.floor(Math.random() * (75 - 1 + 1)) + 1;
                        $('.bigNumberDisplay p').text(random);
                    }, 100);
                    barAnim2();

                    theTrack.volume = 1;

                }, 3000);
            }
        });
        var time = 20000;
        $('#btnStart').click(function() {
            value = 0;
            theTrack.play()
            window.delay = setTimeout(function() {
                barAnim();
                window.txt = setInterval(function() {
                    var random = Math.floor(Math.random() * (75 - 1 + 1)) + 1;
                    $('.bigNumberDisplay p').text(random);
                }, 100);
            }, 300);

            window.loto = setInterval(function() {
                theTrack.volume = 0.2;
                // theTrack.currentTime = 0;
                setTimeout(function() {
                    $('#btnGenerate').trigger('click');
                }, 1000);
            }, time);
            $('#btnStart').hide();
            $('#btnStop').show();
        });
        $('#btnStop').click(function() {
        	clearTimeout(window.delay);
            clearInterval(window.loto);
            clearInterval(window.txt);
            $('.bigNumberDisplay p').text('00');
            // theTrack.pause()
            temp = value;
            value = 101;
            $(".progress-bar").css("width", temp + "%").attr("aria-valuenow", temp);
            $('#btnStart').show();
            $('#btnStop').hide();
        });
        $('#reset').click(function() {
        localStorage.clear();
         window.location.reload();       
        });

        $(document).keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '32') {
  	event.preventDefault();
    if($('#btnStart').is(':visible'))
	{
		$('#btnStart').trigger('click');
	}
	else if ($('#btnStop').is(':visible')){
		$('#btnStop').trigger('click');
	}
  }
});
    });
});