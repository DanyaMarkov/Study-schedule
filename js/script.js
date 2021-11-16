
window.onload = function () {
    let input = localStorage.getItem("group")
    document.querySelector('.header__inputtext').value = input;
    console.log("Загрузил значение в инпут:" + input)

    fillListOfGroups();
    showSchedule();
};

function Storage() {
    var currentValue = document.querySelector('.header__inputtext').value;
    //console.log(currentValue)
    if (currentValue == "") {
    }
    else {
        localStorage.setItem("group", currentValue)
        document.querySelector('.header__inputtext').value = window.localStorage.getItem('group');

    }
}

document.querySelector('.groups__title').onclick = function () {
    showAllGroups();
}
function showAllGroups() {

    if (document.querySelector('.groups__list').className == 'groups__list disableList') {
        document.querySelector('.groups__list').className = 'groups__list'
        //document.querySelector('.groups__list').innerHTML = "";
    }
    else {
        document.querySelector('.groups__list').className = 'groups__list disableList';
    }

}

function fillListOfGroups() {
    fetch("base.json")
        .then((response) => response.json())
        .then((data) => {
            for (let i in data) {
                document.querySelector('.groups__list').innerHTML += "<div class='list_el'>" + data[i].groupNumber + "</div>";
                //document.querySelector('.list_el').addEventListener('click', inputGroup);
                console.log("В списке групп " + data[i].groupNumber)
            }

            var items = document.getElementsByClassName("list_el");
            for (var i = 0; i < items.length; i++) {
                console.log("Добавил")
                items[i].addEventListener("click", inputGroup);
            }


        })
        .catch((error) => {
            console.log(error);
        });
}


//document.querySelector('.list_el').onclick = addEventListener('click', inputGroup);

function inputGroup() {
    //let group = document.querySelector('.list_el').innerHTML;

    let inputGroup = this.innerHTML;
    document.querySelector('.header__inputtext').value = inputGroup;
    //console.log(this);
    showSchedule();
    //console.log(group);
}

document.querySelector('.header__inputtext').addEventListener('click', showSchedule);
document.querySelector('.header__inputtext').addEventListener('click', Storage);
// document.querySelector('.header__inputtext').onchange = function () {
//     showSchedule();
//     Storage();
// }

function showSchedule() {
    Storage();
    fetch("base.json")
        .then((response) => response.json())
        .then((data) => {

            clearDays();

            //console.log(data);
            let val = document.querySelector('.header__inputtext').value;

            let findgroup = false;
            for (let i in data) {
                if (data[i].groupNumber == val) {

                    let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

                    for (let j in days) {
                        let currentDay = days[j];
                        if (currentDay == "sunday") {
                            continue;
                        }
                        for (let k in data[i][currentDay].lessons) {
                            //console.log(typeof (data[i][currentDay]))
                            let block = "<div id='time'>" + data[i][currentDay].lessons[k].time + "</div>"
                                + "<div id='cabinet'>" + data[i][currentDay].lessons[k].cabinet + "</div>"
                                + "<div id='lesson'>" + data[i][currentDay].lessons[k].lesson + "</div>"
                                + "<div id='teacher'>" + data[i][currentDay].lessons[k].teacher + "</div>"
                                + "<div id='dates'>" + data[i][currentDay].lessons[k].dates + "</div>"
                            document.getElementById(currentDay).innerHTML += "<div class='scheduleBlock'>" + block + "</div>";

                            let d = new Date();
                            let n = d.getDay();

                            if (days[n] == currentDay) {
                                document.getElementById(currentDay).style.backgroundColor = "#d2fcd7";
                            }
                            //console.log(days[n]);

                        }
                        findgroup = true;
                    }
                }

            }
            if (findgroup == false) {
                //alert("Нет такой группы!");
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

