$(document).ready(function(){
    var isBrowser = true;
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        isBrowser = true;
    } else if (navigator.userAgent.indexOf("Edg") != -1) {
        isBrowser = true;
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        isBrowser = true;
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        isBrowser = true;
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        isBrowser = true;
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { //IF IE > 10
        isBrowser = true;
    }

    //var api_url = 'http://localhost:8001/api/';
    var api_url = 'https://api.cody-ko.com/api/';

    var user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    var team = localStorage.getItem('team') ? JSON.parse(localStorage.getItem('team')) : null;
    var round;
    if(user) {
        $('#register').html('<p>Registered as: '+ user.name+'</p>');
    }

    setInterval(function() {
        if(!$('body').hasClass('has-team')) {
            $.ajax({
                method: 'GET',
                url: api_url + 'user/team?user_id='+user?.id,
                success: function(data){
                    if(data.success == 1) {
                        localStorage.setItem('team', JSON.stringify(data.data));
                        if(data.data.team_id == 1) {
                            $('body').addClass('bg-red has-team');
                        } else if(data.data.team_id == 2) {
                            $('body').addClass('bg-blue has-team');
                        }
                    }
                }
            });
        }
        $.ajax({
            method: 'GET',
            url: api_url + 'round',
            success: function(data){
                if(data.success == 1) {
                    localStorage.setItem('round', JSON.stringify(data.data));
                }
            }
        });
        round = localStorage.getItem('round') ? JSON.parse(localStorage.getItem('round')) : null;
        team = localStorage.getItem('team') ? JSON.parse(localStorage.getItem('team')) : null;
        user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    }, 1000);


    $('#register').submit(function(e) {
        e.preventDefault();
        const name = $('#name').val();
        $.ajax({
            method: 'POST',
            url: api_url + 'user/save',
            data: {name},
            success: function(data){
                if(data.success == 1) {
                    $('#register').html('<p>Registered as: '+ data.data.name+'</p>');
                    localStorage.setItem('user', JSON.stringify(data.data));
                }
            }
        });
    });

    $('main').click(function() {
        if(!isBrowser) {
            alert('hindi counted yan');
        } else {

            $.ajax({
                method: 'POST',
                url: api_url + 'user/tap',
                data: { user_id : user.id, team_id: team.team_id, round_id: round?round.id:0 },
                success: function(data){
                    if(data.success == 1) {
                        $('#register').html('<p>Registered as: '+ data.data.name+'</p>');
                        localStorage.setItem('user', JSON.stringify(data.data));
                    }
                }
            }); 
        }
    })
    
});