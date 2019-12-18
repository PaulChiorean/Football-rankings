import $ from "jquery";
import {API_TOKEN, API_URL} from "../config";

export const getRanking = (seasonId) => {
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
        <tr data-id="${r.team.id}">
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
