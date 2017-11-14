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
            value = -1;
            $(".progress-bar").css("width", "0%").attr("aria-valuenow", 0);
        }

        function barAnim() {
            value += 1;
            $(".progress-bar").css("width", value + "%").attr("aria-valuenow", value);
            if (value > 100 || value == 0) {
                return 0;
            }
            return setTimeout(barAnim, 115);
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
            if (bingo.selectedNumbers.length == 75) {
                setTimeout(function(){
                count = 1;
            clearTimeout(window.click_start);
            clearTimeout(window.delay);
            clearTimeout(window.click_random);
            clearInterval(window.loto);
            clearInterval(window.txt);
            removeBarAnim();
            $('#btnStart').show();
            $('#btnStop').hide();
                alert('COMPLETE');
                return 0;
                },2000);

                
            } else {
            if (count ==2){


            window.click_start = setTimeout(function() {
                removeBarAnim();
                clearTimeout(barAnim);
                  clearInterval(window.txt);
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
            clearInterval(window.txt);
            removeBarAnim();
            if (bingo.selectedNumbers.length == 7) {
                setTimeout(function(){
                count = 1;
            clearTimeout(window.click_start);
            clearTimeout(window.delay);
            clearTimeout(window.click_random);
            clearInterval(window.loto);
            clearInterval(window.txt);
            removeBarAnim();
            $('#btnStart').show();
            $('#btnStop').hide();
                alert('COMPLETE');
                return 0;
                },2000);

                
            }
             $('#btnStart').trigger('click');
                }, 12000);
            
        } else {


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

clearInterval(window.txt);
theTrack.volume = 0.2;
            var msg = new SpeechSynthesisUtterance();
            msg.text = random;
            msg.lang = 'sw-KE';
            window.speechSynthesis.speak(msg);
            removeBarAnim();
            if (bingo.selectedNumbers.length == 75) {
                setTimeout(function(){
               count = 1;
            clearTimeout(window.click_start);
            clearTimeout(window.delay);
            clearTimeout(window.click_random);
            clearInterval(window.loto);
            clearInterval(window.txt);
            removeBarAnim();
            $('#btnStart').show();
            $('#btnStop').hide();
                alert('COMPLETE');
                },2000);
                
            } else {
            $('#btnStart').trigger('click');
        }
        }
    }
        });
        var count = 1;
        var time = 14000;
        $('#btnStart').click(function() {
            if (bingo.selectedNumbers.length == 75) {
                count = 1;
            clearTimeout(window.click_start);
            clearTimeout(window.delay);
            clearTimeout(window.click_random);
            clearInterval(window.loto);
            clearInterval(window.txt);
            removeBarAnim();
            $('#btnStart').show();
            $('#btnStop').hide();
                alert('COMPLETE');
            } else {
            if (count == 1){
                 value = 0;
                theTrack.play()
                theTrack.volume = 1;
                barAnim();
                window.txt = setInterval(function() {
                    var random = Math.floor(Math.random() * (75 - 1 + 1)) + 1;
                    $('.bigNumberDisplay p').text(random);
                }, 100);
                count++;
                $('#btnGenerate').trigger('click');
            }
            else {
                count++;

               window.delay = setTimeout(function(){
                value = 0;
                 barAnim();
                window.txt = setInterval(function() {
                    var random = Math.floor(Math.random() * (75 - 1 + 1)) + 1;
                    $('.bigNumberDisplay p').text(random);
                }, 100);
                theTrack.volume = 1;
                window.click_random = setTimeout(function() {
                    $('#btnGenerate').trigger('click');
                }, 12000);
            }, 5500);
               

                }
            
            
           
            $('#btnStart').hide();
            $('#btnStop').show();
        }
        });
        $('#btnStop').click(function() {
            count = 1;
        	clearTimeout(window.click_start);
            clearTimeout(window.delay);
            clearTimeout(window.click_random);
            clearInterval(window.loto);
            clearInterval(window.txt);
             removeBarAnim();
            $('.bigNumberDisplay p').text('00');
            // theTrack.pause()
            // temp = value;
            // value = 101;
            // $(".progress-bar").css("width", temp + "%").attr("aria-valuenow", temp);
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