import $ from "jquery";
import {API_TOKEN, API_URL} from "../config";
import { setSeasons } from "./seasons";

export const setCompetitions = () => {
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
