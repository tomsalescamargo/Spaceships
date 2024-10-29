const spaceships = [];
function createSpaceShip(name, pilot, crewLimit) {
    if (crewLimit <= 0) {
        return false;
    }
    const crew = [];
    const spaceship = {
        name,
        pilot,
        crewLimit,
        crew,
        inMission: false
    };
    spaceships.push(spaceship);
    return true;
}
function addMember(name, spaceship) {
    const crew = spaceship.crew;
    if (crew.length >= spaceship.crewLimit) {
        alert("A spaceship já ultrapassou a capacidade tripulantes");
        return false;
    }
    crew.push(name);
    return true;
}
function sendSpaceShip(spaceship) {
    const spaceshipMin = Math.round(spaceship.crewLimit / 3);
    if (spaceship.inMission || spaceship.crew.length < spaceshipMin) {
        alert("Condições para enviar para missão não foram atendidas");
        return false;
    }
    spaceship.inMission = true;
    return true;
}
function showSpaceShips() {
    const ul = document.getElementById("spaceships-list");
    ul.innerHTML = '';
    spaceships.forEach(function (spaceship) {
        const li = document.createElement("li");
        const inMission = spaceship.inMission ? "Em missão" : "Em treinamento";
        li.innerText = `Nome: ${spaceship.name} ; Piloto: ${spaceship.pilot} ; Capacidade: ${spaceship.crewLimit} ; Estado: ${inMission} ; Tripulação: ${spaceship.crew}`;
        ul.appendChild(li);
    });
}
const createSpaceshipForm = document.getElementById("addSpaceShip");
createSpaceshipForm.addEventListener("click", function (ev) {
    ev.preventDefault();
    const nameInput = document.getElementById("name");
    const pilotInput = document.getElementById("pilot");
    const crewLimitInput = document.getElementById("crewLimit");
    if (nameInput && pilotInput && crewLimitInput) {
        const name = nameInput.value;
        const pilot = pilotInput.value;
        const crewLimit = Number(crewLimitInput.value);
        createSpaceShip(name, pilot, crewLimit);
        showSpaceShips();
        createSelect();
        nameInput.value = "";
        pilotInput.value = "";
        crewLimitInput.value = "";
    }
    else {
        console.error("Um ou mais elementos não foram encontrados.");
    }
});
const addMemberForm = document.getElementById("addMember");
addMemberForm.addEventListener("click", function (ev) {
    ev.preventDefault();
    const select = document.getElementById("spaceship-add-select");
    const memberNameInput = document.getElementById("member-name");
    if (select && memberNameInput) {
        const spaceshipName = select.value;
        const memberName = memberNameInput.value;
        const spaceship = spaceships.find(spaceship => spaceship.name === spaceshipName);
        addMember(memberName, spaceship);
        createSelect();
        showSpaceShips();
        select.value = "";
        memberNameInput.value = "";
    }
});
const sendSpaceShipForm = document.getElementById("sendSpaceShip");
sendSpaceShipForm.addEventListener("click", function (ev) {
    ev.preventDefault();
    const select = document.getElementById("spaceship-mission-select");
    if (select) {
        const spaceshipName = select.value;
        const spaceship = spaceships.find(spaceship => spaceship.name === spaceshipName);
        sendSpaceShip(spaceship);
        createSelect();
        showSpaceShips();
        select.value = "";
    }
});
function createSelect() {
    const selects = document.querySelectorAll(".select");
    selects.forEach(select => {
        select.innerHTML = ''; // para limpar a lista e não haver sobreposição
        // opção default
        const defaultOption = document.createElement("option");
        defaultOption.innerText = "Escolha um spaceship...";
        defaultOption.value = "";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        select.appendChild(defaultOption);
        spaceships.forEach(function (spaceship) {
            const option = document.createElement("option");
            option.value = spaceship.name;
            option.textContent = spaceship.name;
            select.appendChild(option);
        });
    });
}

createSelect()