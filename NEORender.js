var block = document.getElementById('display');

var request = new XMLHttpRequest();

function returnData() { 
    request.open('GET', createURL(), true);

    console.log(createURL());
    request.onload = function() {
        var data = JSON.parse(request.response)

        if (request.status >= 200 && request.status < 400) {
            asteroidCount(data);
            iterate(data);
        } else {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `It's not working! Check if you have inputed dates that are in yyyy-MM-DD format.`;
            block.appendChild(errorMessage);
        }
    }

    request.send();
}

function createURL() {
    var start_date = document.getElementById('start').value;
    var end_date = document.getElementById('end').value;
    
    return 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + start_date + '&end_date=' + end_date + '&detailed=true&api_key=0CtLaNazapANbV4KCOb6YPDVDHnIsmF30MYmrQ5R';
}

function todayAsteroids() {
    request.open('GET', 'https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=0CtLaNazapANbV4KCOb6YPDVDHnIsmF30MYmrQ5R', true);

    console.log(createURL());
    request.onload = function() {
        var data = JSON.parse(request.response)

        if (request.status >= 200 && request.status < 400) {
            asteroidCount(data);
            iterate(data);
        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `It's not working! Check if you have inputed dates that are in yyyy-MM-DD format.`;
            block.appendChild(errorMessage);
        }
    }

    request.send();
}

var iterate = function(data) {
    for (var j in data.near_earth_objects) {
        var sub_block = document.createElement('div');
        sub_block.setAttribute('class', 'sub-block');

        var date_heading = document.createElement('div');
        const day = document.createElement('h2');
        day.textContent = j;
        date_heading.appendChild(day);
        date_heading.setAttribute('class', 'date-heading');

        
        const day_count = document.createElement('p');
        day_count.textContent = 'There are ' + data.near_earth_objects[j].length + ' NEO(s).';
        day_count.style = "text-align: center"
        date_heading.appendChild(day_count);

        var asteroid_list = document.createElement('div');
        asteroid_list.setAttribute('class', 'asteroid-list');

        for (var i = 0; i < data.near_earth_objects[j].length; i++) {
            const profile = document.createElement('div');
            profile.setAttribute('class', 'profile');
            asteroid_list.appendChild(profile);

            const h3 = document.createElement('h3');
            h3.textContent = data.near_earth_objects[j][i].name;
            h3.style = "text-align: center"
            profile.appendChild(h3);

            const magnitude = document.createElement('p');
            magnitude.textContent = "Absolute Magnitude: " + data.near_earth_objects[j][i].absolute_magnitude_h;
            profile.appendChild(magnitude);

            const max_diameter = document.createElement('p');
            max_diameter.textContent = "Maximum diameter: " + data.near_earth_objects[j][i].estimated_diameter.meters.estimated_diameter_max.toFixed(3) + " m";
            profile.appendChild(max_diameter);

            const min_diameter = document.createElement('p');
            min_diameter.textContent = "Minimum diameter: " + data.near_earth_objects[j][i].estimated_diameter.meters.estimated_diameter_min.toFixed(3) + ' m';
            profile.appendChild(min_diameter);

            const approach_date = document.createElement('p');
            approach_date.textContent = "Approach Date: " + data.near_earth_objects[j][i].close_approach_data[0].close_approach_date;
            profile.appendChild(approach_date);

            const velocity = document.createElement('p');
            velocity.textContent = "Relative Velocity: " + parseFloat(data.near_earth_objects[j][i].close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(3) + " km/s" ;
            profile.appendChild(velocity);

            const miss = document.createElement('p');
            miss.textContent = "Miss Distance: " + parseFloat(data.near_earth_objects[j][i].close_approach_data[0].miss_distance.astronomical).toFixed(3) + " AU";
            profile.appendChild(miss);

            const sma = document.createElement('p');
            sma.textContent = "Semimajor Axis: " + parseFloat(data.near_earth_objects[j][i].orbital_data.semi_major_axis).toFixed(3) + " AU";
            profile.appendChild(sma);

            const eccentricity = document.createElement('p');
            eccentricity.textContent = "Eccentricity: " + parseFloat(data.near_earth_objects[j][i].orbital_data.eccentricity).toFixed(3);
            profile.appendChild(eccentricity);

            const hazard = document.createElement('p');
            hazard.textContent = "Hazard: " + data.near_earth_objects[j][i].is_potentially_hazardous_asteroid;
            profile.appendChild(hazard);
        }

        sub_block.appendChild(date_heading);
        sub_block.appendChild(asteroid_list);
        block.appendChild(sub_block);
    }
  }

function asteroidCount(data) {
    var asteroidNum = document.createElement('p');
    asteroidNum.textContent = "There are a total of " + data.element_count + " asteroids found."
    block.appendChild(asteroidNum);
}
  /*
    var data = JSON.parse(request.response);
    var asteroidCount = document.createElement('p');
    asteroidCount.textContent = data.near_earth_objects[2019-01-11][0].name;
    block.appendChild(asteroidCount);
  */ 
