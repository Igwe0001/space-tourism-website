// Navigation control
const nav = document.querySelector("nav");
const hamburger = document.querySelector(".hamburger");

// Destination control
const destinationImageContainer = document.querySelector(
  ".destination-image-container"
);
const destinationDataData = document.querySelector(".destination-data-data");

// Crew control
const crewContainer = document.querySelector(".crews-image-container");
const crewButtons = document.querySelectorAll(".crew-button");
const crewDataData = document.querySelector(".crew-data-data");

//Technology control
const technologyContainer = document.querySelector(
  ".technology-image-container"
);
const technologyButtons = document.querySelectorAll(".technology-button");
const technologyDataData = document.querySelector(".technology-data-data");

// Navigation control
hamburger.addEventListener("click", () => {
  if (hamburger.attributes.src.value === "/assets/shared/icon-hamburger.svg") {
    hamburger.attributes.src.value = "/assets/shared/icon-close.svg";
  } else {
    hamburger.attributes.src.value = "/assets/shared/icon-hamburger.svg";
  }
  nav.classList.toggle("active");
});

async function fetchData() {
  try {
    const response = await fetch("/data.json");
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching JSON file:", error);
  }
}

async function init() {
  const data = await fetchData();
  if (data) {
    if (window.location.pathname === "/pages/destination.html") {
      handleDestinations(data.destinations);
    } else if (window.location.pathname === "/pages/crew.html") {
      handleCrew(data.crew);
    } else if (window.location.pathname === "/pages/technology.html") {
      handleTechnology(data.technology);
    }
  }
}

function handleDestinations(destinations) {
  destinationImageContainer.innerHTML = `
    ${destinations
      .map((data, i) => {
        return `
        <div class="destination-image-slide active" data-roll=${i}>
          <img src=".${data.images.png}" alt="img">
        </div>
      `;
      })
      .join("")}
  `;

  destinationDataData.innerHTML = `
    ${destinations
      .map((data, i) => {
        return `
        <div class="destination-data active" data-roll=${i}>
          <div class="destination-data-header">
            <h2>${data.name}</h2>
            <p>${data.description}</p>
          </div>
          <div class="destination-data-body">
            <div class="destination-data-body-1">
              <span>AVG. DISTANCE</span>
              <p>${data.distance}</p>
            </div>
            <div class="destination-data-body-2">
              <span>Est. travel time</span>
              <p>${data.travel}</p>
            </div>
          </div>
        </div>
      `;
      })
      .join("")}
  `;

  const destinationSlides = document.querySelectorAll(
    ".destination-image-slide"
  );
  const destinationData = document.querySelectorAll(".destination-data");
  const destinationButton = document.querySelectorAll(".destination-button");

  for (let i = 0; i < destinationButton.length; i++) {
    destinationButton[i].addEventListener("click", () => {
      if (
        destinationButton[i].attributes["data-roll"].value ===
          destinationSlides[i].attributes["data-roll"].value &&
        destinationButton[i].attributes["data-roll"].value ===
          destinationData[i].attributes["data-roll"].value
      ) {
        destinationSlides.forEach((e) => e.classList.remove("active"));
        destinationData.forEach((e) => e.classList.remove("active"));
        destinationSlides[i].classList.add("active");
        destinationData[i].classList.add("active");
      }
      destinationButton.forEach((e) => e.classList.remove("active"));
      destinationButton[i].classList.add("active");
    });
  }
}

function handleCrew(crew) {
  crewContainer.innerHTML = `
    ${crew
      .map((data, i) => {
        return `
        <div class='crew-image-slide ${i == 0 ? "first" : ""}' data-roll="${i}">
          <img src=".${data.images.png}" alt="${data.name}">
        </div>
      `;
      })
      .join("")}
  `;

  crewDataData.innerHTML = `
      ${crew
        .map((data, i) => {
          return `
        <div class="crew-data ${i == 0 ? "first" : ""}" data-roll="${i}">
          <h2>${data.role}</h2>
          <h1>${data.name}</h1>
          <p>${data.bio}</p>
        </div>
        `;
        })
        .join("")}
  `;

  const crewImageSlide = document.querySelectorAll(".crew-image-slide");
  const crewImageSlideFirst = document.querySelector(".crew-image-slide.first");
  const crewData = document.querySelectorAll(".crew-data");
  const crewDataFirst = document.querySelector(".crew-data.first");

  for (let i = 0; i < crewButtons.length; i++) {
    crewButtons[i].addEventListener("click", () => {
      if (
        crewButtons[i].attributes["data-roll"].value ===
          crewImageSlide[i].attributes["data-roll"].value &&
        crewButtons[i].attributes["data-roll"].value ===
          crewData[i].attributes["data-roll"].value
      ) {
        crewImageSlideFirst.style.marginLeft = `-${i}00%`;
        crewDataFirst.style.marginLeft = `-${i}00%`;
        crewButtons.forEach((e) => e.classList.remove("active"));
        crewButtons[i].classList.add("active");
      }
    });
  }
}

function handleTechnology(technology) {
  technologyContainer.innerHTML = `
  ${technology
    .map((data, i) => {
      return `
    <div class="technology-image-slide ${i == 0 ? "first" : ""}" data-roll=${i}>
      <picture>
        <source srcset=".${data.images.portrait}" media="(min-width: 1000px)">
        <img src=".${data.images.landscape}" alt="Responsive Image">
      </picture>
    </div>
    `;
    })
    .join("")}
  `;

  technologyDataData.innerHTML = `
    ${technology
      .map((data, i) => {
        return `
      <div class="technology-data ${i == 0 ? "first" : ""}" data-roll=${i}>
        <h2>The terminology...</h2>
        <h1>${data.name}</h1>
        <p>${data.description}</p>
      </div>
      `;
      })
      .join("")}
  `;

  const technologyImageSlide = document.querySelectorAll(
    ".technology-image-slide"
  );

  const technologyImageSlideFirst = document.querySelector(
    ".technology-image-slide.first"
  );
  const technologyData = document.querySelectorAll(".technology-data");
  const technologyDataFirst = document.querySelector(".technology-data.first");

  for (let i = 0; i < technologyButtons.length; i++) {
    technologyButtons[i].addEventListener("click", () => {
      if (
        technologyButtons[i].attributes["data-roll"].value ===
        technologyImageSlide[i].attributes["data-roll"].value
      ) {
        technologyImageSlideFirst.style.marginLeft = `-${i}00%`;
        technologyDataFirst.style.marginLeft = `-${i}00%`;
        technologyButtons.forEach((e) => e.classList.remove("active"));
        technologyButtons[i].classList.add("active");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
