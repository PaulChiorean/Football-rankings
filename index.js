import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import $ from 'jquery';

import { API_URL, API_TOKEN } from "./config";

const setCompetitions = () => {
    let competitions;
    let competitionsHtml;

    const request = $.ajax({
        url: `${API_URL}/competitions`,
        method: "GET",
        data: { api_token : API_TOKEN },
    });

    request.done(function(response) {
        competitions = response.data;

        competitionsHtml = competitions.map(comp => (`
            <li>
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${comp.id}">
                        ${comp.name}
                    </button>
                    
                    <div id="collapse${comp.id}" class="collapse" data-parent="#accordion">
						<ul>
						</ul>
					</div>
            </li>
        `));

        $('.competition-list').html(competitionsHtml.join(''));

        setSeasons();
    });
};

const setSeasons = () => {
    let seasons;

    const request = $.ajax({
        url: `${API_URL}/seasons`,
        method: "GET",
        data: { api_token : API_TOKEN },
    });

    request.done(function(response) {
        seasons = response.data;

        seasons.forEach((season) => {
            $(`#collapse${season.competition_id} ul`).append(`
                    <li>
                        <button class="btn season" data-season-id="${season.id}">
                            ${season.name}
                        </button>
                    </li>
            `);
        })
    });
};

const getRanking = (seasonId) => {
    const request = $.ajax({
        url: `${API_URL}/standings/season/${seasonId}`,
        method: "GET",
        data: { api_token : API_TOKEN },
    });

    request.done(function (response) {
        const ranking = response.data[0].standings.data;

        setRanking(ranking);
    });
};

const setRanking = (ranking) => {
    const rankingHtml = ranking.map(r => (`
          <tr>
            <th scope="row">${r.position}</th>
            <td>${r.team.name}</td>
            <td>${r.overall_played}</td>
            <td>${r.overall_win}</td>
            <td>${r.overall_draw}</td>
            <td>${r.overall_loose}</td>
            <td>${r.goal_difference}</td>
            <td>${r.points}</td>
        </tr>
    `));

    $('.ranking tbody').html(rankingHtml.join(''));
    $('.ranking').show();

};

const getTeam = (teamId) => {
    const request = $.ajax({
        url: `${API_URL}/teams/${teamId}`,
        method: "GET",
        data: { api_token : API_TOKEN },
    });
    request.done(function (response) {
        console.log('aggfng');
        teams = response.data;
        setTeam(teams);
    });
};

$(document).ready(() => {
    setCompetitions();

    $('.competition-list').on('click', '.season', function () {
        const seasonId = $(this).attr('data-season-id');
        getRanking(seasonId);
    });
});

$(document).ready(() => {
    setCompetitions();
    setRanking();

    $('.ranking').on('click', 'r.team.name', function () {
        const teamId = $(this).attr('xxxxx');
        getTeam(teamId);
    });
});

