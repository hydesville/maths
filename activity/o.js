// (C) RUHAAN KADRI 2019

String.prototype.toTitleCase = function () {
    let queryTemp = "";
    this.split(' ').forEach((i) => {
        let w = i.charAt(0)
        i = i.replace(i.charAt(0), "");
        i = w.toUpperCase() + i;
        queryTemp += " " + i;
    })
    return queryTemp.trim();
}

$(document).ready(function () {
    var path = new URL(window.location.href).search.replace(/&/g, "/").replace("?", "");
    window.history.pushState("", "", "/");
    if (path.includes("schemes_of_work")) {
        if (path.includes("schemes_of_work/lower_fourths/all")) window.location.replace("/maths/lessons/schemes_of_work/lower_fourths/all/Scheme lower4ths.pdf");
        else {
            path = path.split("/")[1] + "/" + path.split("/")[2];
            fetch("/maths/lessons/schemes_of_work/" + path + "/index.html").then(w => w.text().then(html => {
                document.write(html + "<style>@import url('https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap');*{font-family:'Poppins'}td{padding:10px;border:solid 2px black;background:white}table{border:none}embed{display:none}</style>");
            }))
        }
    } else {
        fetch("/maths/lessons/" + path + "/list.json").then(i => i.json().then(data => {
            var element = {
                "whiteboard": [],
                "computer": [],
                "questions": [],
                "tutorials": [],
            }

            data.forEach((file) => {
                if (file.startsWith("iwb_")) {
                    element.whiteboard.push(file);
                } else if (file.startsWith("cpr_")) {
                    element.computer.push(file);
                } else if (file.startsWith("qtn_")) {
                    element.questions.push(file);
                } else if (file.startsWith("ttt_")) {
                    element.tutorials.push(file);
                }
            })
            data = element;

            data.whiteboard.forEach((i) => {
                document.getElementById("whiteboard").innerHTML += `<div class="download">
                    <img src="../../../ico/${parseIcon(i)}.png" alt="An error occured." class="download-icon">
                    <a href="/maths/lessons/${path}/${i}" class="download-link">${i}</a>
                </div>`
            })

            data.computer.forEach((i) => {
                document.getElementById("computer").innerHTML += `<div class="download">
                    <img src="../../../ico/${parseIcon(i)}.png" alt="An error occured." class="download-icon">
                    <a href="/maths/lessons/${path}/${i}" class="download-link">${i}</a>
                </div>`
            })

            data.questions.forEach((i) => {
                document.getElementById("questions").innerHTML += `<div class="download">
                    <img src="../../../ico/${parseIcon(i)}.png" alt="An error occured." class="download-icon">
                    <a href="/maths/lessons/${path}/${i}" onclick="alert('/maths/lessons/${path}/${i}')"class="download-link">${i}</a>
                </div>`
            })

            data.tutorials.forEach((i) => {
                document.getElementById("tutorials").innerHTML += `<div class="download">
                    <img src="../../../ico/${parseIcon(i)}.png" alt="An error occured." class="download-icon">
                    <a href="/maths/lessons/${path}/${i}" class="download-link">${i}</a>
                </div>`
            })
        }))
    }
})

function parseIcon(data) {
    data = data.toLowerCase();
    if (data.endsWith(".ppt")) return "powerpoint";
    if (data.endsWith(".xls")) return "excel";
    if (data.endsWith(".doc")) return "word";
    if (data.endsWith(".pdf")) return "pdf";
}