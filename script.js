const svgInfoBoxContainer = document.querySelector(".svgInfoBoxContainer");
const svgTimelineContainer = document.querySelector(".svgTimelineContainer");
const svgContainer = document.querySelector("#svgContainer");

window.addEventListener("DOMContentLoaded", init);

function init() {
  getTheSVG();

}

async function getTheSVG() {
  // Append timeline  to a div
  const responseTimeline = await fetch("./timeline.svg");
  const svgTimeline = await responseTimeline.text();
  svgTimelineContainer.innerHTML = svgTimeline;




  // Append info box to a div
  const responseInfobox = await fetch("./final_infobox.svg");
  const svgInfobox = await responseInfobox.text();
  svgInfoBoxContainer.innerHTML = svgInfobox;
  showModalBox();

  const bullet = document.querySelector("[data-part=two")
  setNewCoordinates(bullet)

}

function appendSVG(timeleline) {
  const infobox = document.createElementNS("http://www.w3.org/2000/svg", "use");
  infobox.setAttribute("width", "518");
  infobox.setAttribute("height", "251");
  infobox.href.baseVal = "#infobox";
  timeleline.appendChild(infobox);
}




function showModalBox() {
  document.querySelectorAll(".bullet").forEach(element => {
    element.onclick = function () {
      setNewCoordinates(element)
    };
  });

  const timeline = document.querySelector("#timeline");
  appendSVG(timeline);
}



function setNewCoordinates(element) {
  const values = {}
  values.newX = Math.floor(element.getAttribute("cx"));
  values.newY = Math.floor(element.getAttribute("cy"));
  values.newX2 = values.newX + 54;
  values.newY2 = values.newY - 205;
  showModal(element.dataset.part);
  setLineCoordinates(values);
}


function setLineCoordinates(values) {
  document.querySelector(".line").setAttribute("x1", values.newX)
  document.querySelector(".line").setAttribute("y1", values.newY)
  document.querySelector(".line").setAttribute("x2", values.newX2)
  document.querySelector(".line").setAttribute("y2", values.newY2)
  setModalCoordinates(values)
}

function setModalCoordinates(values) {
  document.querySelector("use").style.display = "block";
  document.querySelector("use").setAttribute("x", values.newX2)
  document.querySelector("use").setAttribute("y", values.newY2 - 220)

}


let moviePart = [];

function showModal(datasetValue) {
  const modalBox = document.querySelectorAll("use")
  getFilmInformation(datasetValue, modalBox)
}


function showCorrectModalInfo(movie) {
  document.querySelector(".movieName").textContent = movie.title.original;
  document.querySelector(".danishMoviename").textContent = movie.title.danish;
  document.querySelector(".releaseYear").textContent = movie.year;
  document.querySelector(".duration").textContent = movie.length;
  document.querySelector(".director").textContent = movie.director;
  document.querySelector(".screenPlay").textContent = movie.writers.screenplay;
  document.querySelector(".poster").setAttribute("href", `./images/${movie.poster}`);
}

async function getFilmInformation(datasetValue, box) {
  const data = await fetch("./potterfilms.json");
  const response = await data.json();
  prepareData(response, datasetValue, box);
}


function prepareData(response, datasetValue, box) {
  const rightMoviePart = response.filter(movie => movie.part === datasetValue);
  showCorrectModalInfo(rightMoviePart[0]);

}