import $ from "jquery";
import {API_TOKEN, API_URL} from "../config";

export const setSeasons = () => {
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
