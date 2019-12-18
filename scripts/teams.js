import $ from "jquery";
import {API_TOKEN, API_URL} from "../config";

export const getTeam = (teamId) => {
    const request = $.ajax({
        url: `${API_URL}/teams/${teamId}`,
        method: "GET",
        data: { api_token : API_TOKEN },
    });

    request.done(function (response) {
        setTeam(response);
    });
};

const setTeam = (team) => {
    let teamHtml = `
            <img src="${team.logo}" alt="${team.name}"/>
            <h5>${team.name}</h5>
    `;

    if(team.twitter) teamHtml += `<div>${team.twitter}</div>`;

    $('.team__info').html(teamHtml);
};
