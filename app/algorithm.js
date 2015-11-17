[
    {"firstName": "Babraham",
    "lastName": "Lincoln",
    "importance": 5,
    "dateContacted": "2015.09.31",
    "id": "lincolnbabraham"},
    {"firstName": "Mugatu",
    "lastName": "",
    "importance": 3,
    "dateContacted": "2015.07.11",
    "id": "mugatu"},
    {"firstName": "Al",
    "lastName": "Poochino",
    "importance": 8,
    "dateContacted": "2015.09.32",
    "id": "poochinoal"},
    {"firstName": "Paul",
    "lastName": "Cernak",
    "importance": 10,
    "dateContacted": "2015.05.17",
    "id": "cernakpaul"},
    {"firstName": "Paul",
    "lastName": "Terwilliger",
    "importance": 8,
    "dateContacted": "2015.09.13",
    "id": "terwilligerpaul"}
]


function scheduleSequence(json) {
	var friends = json;
  	var importanceTotal = importanceCounter();
  	var sequence = arrayMaker();


    function importanceCounter(){
        var sum = 0;
        for (friend in friends)
            sum += friends[friend].importance;
        return sum;
    };

    function arrayMaker(){
      var sequence = Array.apply(null, Array(importanceTotal)).map(Boolean.prototype.valueOf,false);
      return sequence;
    };

    function sequenceScheduler() {
      	for (friend in friends) {
            var placed = false;
            var frequency = Math.floor(importanceTotal / friends[friend].importance);
            for (var i = 0; i < importanceTotal; i += frequency) {
                placed = false;
                if (sequence[i] == false) {
                    sequence[i] = friends[friend].id;
                }
                else if (sequence[i - 1] == false) {
                    sequence[i - 1] = friends[friend].id;
                }
                else
                    while (placed == false && i <= importanceTotal) {
                        i++;
                        if (sequence[i] == false) {
                            sequence[i] = friends[friend].id;
                            placed = true;
                        };
                    };
             };
        };
		return sequence;
    };
  	return sequenceScheduler();
};
console.log(scheduleSequence(friends));



scheduleCalendar(scheduleSequence, calendarObject, perWeek)
//sets calendarObject as keys and scheduleSequence arrays of length perWeek as values
