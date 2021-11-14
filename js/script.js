function showSchedule() {
    fetch("base.json")
        .then((response) => response.json())
        .then((data) => {

            clearDays();

            console.log(data);
            let val = document.querySelector('.header__inputtext').value;

            let findgroup = false;
            for (let i in data) {
                if (data[i].groupNumber == val) {

                    let days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

                    for (let j in days) {
                        let currentDay = days[j];
                        for (let k in data[i][currentDay].lessons) {
                            console.log(typeof (data[i][currentDay]))
                            let block = "<div id='time'>" + data[i][currentDay].lessons[k].time + "</div>"
                                + "<div id='cabinet'>" + data[i][currentDay].lessons[k].cabinet + "</div>"
                                + "<div id='lesson'>" + data[i][currentDay].lessons[k].lesson + "</div>"
                                + "<div id='teacher'>" + data[i][currentDay].lessons[k].teacher + "</div>"
                                + "<div id='dates'>" + data[i][currentDay].lessons[k].dates + "</div>"
                            document.getElementById(currentDay).innerHTML += "<div class='scheduleBlock'>" + block + "</div>";
                        }
                        findgroup = true;
                    }
                }

            }
            if (findgroup == false) {
                alert("Нет такой группы!");
            }
        })
        .catch((error) => {
            console.log(error);
        });

}

function clearDays() {

    let days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    for (let j in days) {
        let currentDay = days[j];
        document.getElementById(currentDay).innerHTML = "";
    }
}

