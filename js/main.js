'use strict';

var btn = $('.btn'), text = $('.text'), spedBtn = $('.awesome-btn'), collection = $('.collection');
var init = true;
var index = -1;
var count = 0;

$('.control-btn').hide();

var content = [];

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ——————————————————————————————————————————————————
// Title Animation & Client Initialization
// ——————————————————————————————————————————————————

var phrases = ['Mr.McCaffrey\'s Dance Roulette', 'Created by Yonglin Wang & Angel Pan', 'let\'s get started'];

var el = document.querySelector('.text');
var fx = new TextScramble(el);

var counter = 0;
var next = function next() {
    var text = $('.text');
    if(counter <= 2){
        fx.setText(phrases[counter]).then(function () {
            setTimeout(next, 1500);
        });
    }
    counter++;
    if(text.text() === "let's get started"){
        text.fadeOut('fast', function () {
            $('.awesome-btn').fadeIn('slow');
        })
    }
};
next();

$(document).ready(function () {
    console.log('Hello There! This App is Designed and Built by Yonglin Wang, visit him at yonglinwang.ca!');
    $.get('getContent.php', function (data) {
        content = data;
    },'json');
});

// ——————————————————————————————————————————————————
// Events
// ——————————————————————————————————————————————————

spedBtn.click(function (evt) {
    var videoPlayer = $('#videoBody');
    count++;
    var indexBuffer = 0;
    if(init){
        text.fadeIn('slow');
        spedBtn.attr('data-title', 'Play Something Else!');
        spedBtn.animate({
            'margin-top': '70vh'
        }, 2000);
        setTimeout(function () {
            $('.control-btn').fadeIn('fast')
        }, 2000);
        $(document).idle({
            onIdle: function(){
                btn.animate({
                    'opacity': '0'
                }, 800)
            },
            onActive: function () {
                btn.animate({
                    'opacity': '1'
                }, 800)
            },
            idle: 2000
        });
    }
    do{
        indexBuffer = getRandomInt(0, content.length - 1);
    }while(indexBuffer === index);
    index = indexBuffer;
    console.log(content);
    var item = content[index];
    fx.setText(item.title);
    videoPlayer.attr('src', 'https://www.youtube.com/embed/'+ item.path +'?controls=0&showinfo=0&rel=0&autoplay=1&loop=0');
    if(count === 69){
        fx.setText('You Found the Easter Egg!');
        videoPlayer.attr('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&showinfo=0&rel=0&autoplay=1&loop=0')
    }
});
$('#fullscreen').click(function () {
    toggleFullScreen();
    $(this).fadeOut('fast');
});

$('#toggle').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
    $.get('getContent.php', function (data) {
        content = data;
    },'json')
});

$('#submitBtn').click(function (evt) {
    const title = $('#videoTitle').val(), link = $('#videoLink').val();
    if(title && link){
        const id = link.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        var idReady = "";
        if(id !== null) {
            idReady = id[1].trim();
        } else {
            alert("The youtube url provided is not valid.");
        }
        $.post('addVideo.php',{
            title: title,
            id: idReady
        }, function (res) {
            alert('Success! We have added the video!');
            $('#videoTitle').val('');
            $('#videoLink').val('');
        })
    }else{
        alert("Information is missing.")
    }
});

$('.add-track').click(function () {
    $('.overlay-menu').fadeOut('fast',function () {
        $('#addTrack').fadeIn('slow');
    })
});

$('.manage').click(function () {
    $('.overlay-menu').fadeOut('fast',function () {
        populateManager();
        $('#manage').fadeIn('slow');
    })
});

$('.credit').click(function () {
    $('.overlay-menu').fadeOut('fast',function () {
        $('#credit').fadeIn('slow');
    })
});

$('.go-back').click(function () {
    $('#addTrack').fadeOut('fast');
    $('#manage').fadeOut('fast');
    $('#credit').fadeOut('fast');
    setTimeout(function () {
        $('.overlay-menu').fadeIn('slow')
    }, 200)
});

function populateManager(){
    $.get('getContent.php', function (data) {
        content = data;
        var html = "";
        var newArr = [];
        const buffer = content;
        while(buffer.length) newArr.push(buffer.splice(0,4));
        for(var i = 0; i<newArr.length; i++){
            html += "<div class='row'>";
            for(var j = 0; j<newArr[i].length; j++){
                html += "<div class='col-lg-3 col-md-6 col-sm-12 col-xs-12 item' id='"+ newArr[i][j].path +"'> <div class='img-container'> <h2 class='delete-command closeBtn' hidden>Delete? </h2> <img src='http://img.youtube.com/vi/"+ newArr[i][j].path +"/0.jpg' class='thumb'> </div> <h2>"+ newArr[i][j].title +"</h2> </div>"
            }
            html += "</div>"
        }
        collection.empty();
        $.when(collection.append(html)).then(function () {
            console.log(content);
            var thumbnail = $('.thumb');
            thumbnail.hover(function () {
                $(this).siblings('.closeBtn').fadeIn('fast');
            },function () {
                $(this).siblings('.closeBtn').fadeOut('fast');
            });
            thumbnail.click(function (evt) {
                const id = $(evt.target).closest('.item').attr('id');
                $.post('removeRecord.php',{
                    id: id
                }, function (res) {
                    console.log(res);
                    populateManager();
                })
            })
        });
    },'json');
}
function toggleFullScreen() {
    var docelem = document.documentElement;
    if (docelem.requestFullscreen) {
        docelem.requestFullscreen();
    } else if (docelem.mozRequestFullScreen) {
        docelem.mozRequestFullScreen();
    } else if (docelem.webkitRequestFullScreen) {
        docelem.webkitRequestFullScreen();
    } else if (docelem.msRequestFullscreen) {
        docelem.msRequestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
