import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import $ from 'jquery';

import { setCompetitions } from "./scripts/competitions";
import { getRanking } from "./scripts/ranking";
import { getTeam } from "./scripts/teams";
import { getPlayers } from "./scripts/players";

$(document).ready(() => {
    setCompetitions();

    $('.competition-list').on('click', '.season', function () {
        const seasonId = $(this).attr('data-season-id');
        getRanking(seasonId);
    });

    $('.ranking').on('click', 'tbody tr', function () {
        const teamId = $(this).attr('data-id');
        getTeam(teamId);
        getPlayers(teamId);
    });
});

