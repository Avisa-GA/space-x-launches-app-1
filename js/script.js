// Pseudocode

// 1) Page Loads - Fetch data from SpaceX API
// 2) Store resulting data in a list (Array) so we can loop over and create the UI
// 3) Using the data to create UI and append to the DOM


/*----- constants -----*/
const BASE_URL = 'https://api.spacexdata.com/v3/launches';
/*----- app's state (variables) -----*/
let launches;
/*----- cached element references -----*/
const $main = $('main');
const $modal = $('.modal');

/*----- event listeners -----*/
$main.on('click', 'article', handleClick);
/*----- functions -----*/

getAppData();

function getAppData() {
    $.ajax(`${BASE_URL}?limit=9&order=desc`)
    .then(function(data) { 
        launches = data;
        render();
    });
}

function handleClick() {
    const missionName = this.dataset.missionName;
    const defaultPatch = 'https://www.socialbakers.com/www/storage/www/reports/2019-03-01/twitter/34743251.jpg';


    const launch = launches.find(function(l) { 
        return l.mission_name === missionName
    });

    console.log(launch);

    launch.links.mission_patch_small = launch.links.mission_patch_small 
    ? launch.links.mission_patch_small : defaultPatch;

    const html = `
    <div class="content-wrapper">
        <div>
            <h2>${launch.mission_name}</h2>
            <p>${launch.details ? launch.details.slice(0, 251) + '...' : 'Details Unavailable'}</p>
            <p><a href="${launch.links.reddit_campaign}" target="_blank">Click Here</a> for Reddit Campaign</p>
        </div>
        ${launch.links.mission_patch_small ? `<img src="${launch.links.mission_patch_small}" alt="${launch.mission_name}" />` : ''}
    </div>
    `;
    $modal.html(html).modal();
}


 function render() {
     const html = launches.map(function(launch) {
         return `
            <article data-mission-name="${launch.mission_name}">
                <h2>${launch.mission_name}</h2>
                <p>${launch.launch_year}</p>
            </article>
         `;
     });

     $main.html(html);
 }

