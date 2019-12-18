import $ from "jquery";
import {API_TOKEN, API_URL} from "../config";

export const getPlayers = (teamId) => {
    const request = $.ajax({
        url: `${API_URL}/players/team/${teamId}`,
        method: "GET",
        data: { api_token : API_TOKEN },
    });

    request.done(function (response) {
        setPlayers(response.data);
    }).fail(function(xhr) {
        var errorMessage = xhr.status + ': ' + xhr.statusText
        alert('Error - ' + errorMessage);
    });
};

const setPlayers = (players) => {
    if(players.length === 0) {
        $('.team__players').html('No players found.');
    } else {
        const playersHtml = players.map(player => `
            <div class="player">
                   <img class="player__img" src="${player.photo}"/>
                   <div class="player__name">${player.shirt_number}. ${player.fullname}</div>
                   <div class="player__nationality">${player.nationality}</div>        
            </div>
        `);

        $('.team__players').html(playersHtml);
    }
};
