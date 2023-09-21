$(document).ready(function() {
    
    $.getJSON("https://api.ipify.org?format=json", function(data) {
        if(data.ip === '124.107.201.5') { } else {
            window.location.href = 'client.html';
        }
    })

    var group_team = localStorage.getItem('group_team') ? JSON.parse(localStorage.getItem('group_team')) : null;
    if(page == 'server') {
        $('#team-a').append(generateTeam(group_team.filter(item => item.team_id === 1 )));
        $('#team-b').append(generateTeam(group_team.filter(item => item.team_id === 2 )));
    }

    //var api_url = 'http://localhost:8001/api/';
    var api_url = 'https://api.cody-ko.com/api/';

    var start = 492;
    $('#game-slider').css('left', start+'px')
    var team_a_score = 0;
    var team_b_score = 0;

    var team_a_win_score = 0;
    var team_b_win_score = 0;

    var has_winner = false;
    setInterval(function() {
        if(page == 'index') {
            $.ajax({
                method: 'GET',
                url: api_url + 'users',
                success: function(data){
                    if(data.success == 1) {
                        $('.all-users').html(generateTeam(data.data));
                    }
                }
            });
        }
        if(page == 'server') {

            var position = start + (team_a_score * -1) + team_b_score;
            if(position <= 0) {
                team_a_score = 0;
                team_b_score = 0;
                position = start;
                alert('Winner Team A');
                team_a_win_score = team_a_win_score + 1;
                $('#round-banner span').text($('#start-round').attr('data-round_id'));
                $('#team-a h2 span').text(team_a_win_score);
            }
            if(position >= 960) {
                team_a_score = 0;
                team_b_score = 0;
                position = start;
                alert('Winner Team B');
                team_b_win_score = team_b_win_score + 1;
                $('#round-banner span').text($('#start-round').attr('data-round_id'));
                $('#team-b h2 span').text(team_b_win_score);
            }
            $.ajax({
                method: 'GET',
                url: api_url + 'round/stat?round_id='+$('#round-banner span').text(),
                success: function(data){
                    team_a_score = data.data.length > 0 ? data.data[0]?.score : 0;
                    team_b_score = data.data.length > 0 ? data.data[1]?.score : 0;
                }
            });
            $('#game-slider').css('left', position+'px')
            
        }
    }, 300);

    $('#generate-team').click(function(e) {
        e.preventDefault();
        var users = [];
        $('#registration1 ul li').each(function(){
            var name = $(this).text();
            var id = $(this).data('user_id');
            var user_arr = { name, id };
            users.push(user_arr);
        })
        const teams = shuffle(users);

        $('.team-a').html(generateTeam(teams[0], '1'))
        $('.team-b').html(generateTeam(teams[1], '2'))
        $('#registration1').hide();
        $('#registration2').show();
    })

    $('#reset-team').click(function(e) {
        e.preventDefault();
        $('#registration1').show();
        $('#registration2').hide();
    })

    $('#start-game').click(function(e) {
        e.preventDefault();
        var users = [];
        var users_local = [];
        $('.team-group > ul li').each(function(elem, item){
           const user_id = $(this).data('user_id');
           const team_id = $(this).data('team_id');
           const name = $(this).text();
           var user_arr = { user_id, team_id };
           users.push(user_arr);
           users_local.push({ user_id, team_id, name })
        })
        localStorage.setItem('group_team', JSON.stringify(users_local));
        $(this).attr('disabled', 'disabled');
        $.ajax({
            method: 'POST',
            url: api_url + 'users/save',
            data: { users },
            success: function(data){
                if(data.success == 1) {
                    window.location.href = "server.html";
                } else {
                    $('#start-game').attr('disabled', 'disabled');
                }
            }
        });
    })
    var counter = 5;
    $('#start-round').click(function(e) {
        e.preventDefault();
        var round_id = $(this).attr('data-round_id');
        $('#timer-banner').show();
     
        setTimeout(function() {
                $.ajax({
                    method: 'POST',
                    url: api_url + 'start-round',
                    data: { round_id },
                    success: function(data){
                        var counter = data.data.id+1;
                        $('#start-round').attr('data-round_id', counter);
                        $('#round-banner span').text(counter-1);
                    }
                });
        }, 6000)
        var myTimer = setInterval(function() {
            if(counter === 0) {
                $('#timer-banner').text('Go');
            }
            else if(counter < 0) {
                $('#timer-banner').hide().text('5');
                counter = 5;
                clearInterval(myTimer);
            } else {
                $('#timer-banner').text(counter);
            }
            counter--;
        }, 1000)

    });



    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;  

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        const half_length = Math.ceil(array.length / 2);    
        const leftSide = array.splice(0,half_length);
        const rightSide = array;
        return [leftSide, rightSide];
    }

    function generateTeam(arr, team = null) {
        var html = '<ul class="users">';
        for(var x = 0; x < arr.length; x++) {
            html += '<li data-user_id="'+arr[x].id+'" data-team_id="'+team+'">'+ arr[x].name +'</li>'
        }
        html += '</ul>';
        return html;
    }

    // left 960 blue win
    // left 0 red win


});