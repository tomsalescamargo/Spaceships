const spaceships : {name: string, pilot: string, crewLimit: number, crew: string[], inMission: boolean}[] = []

function createSpaceShip(name: string, pilot: string, crewLimit: number) {

    if (crewLimit <= 0) {
        return false
    }
    const crew: string[] = []

    const spaceship = {
        name,
        pilot,
        crewLimit,
        crew,
        inMission: false
    }
    spaceships.push(spaceship)
    return true
}

function addMember(name: string, spaceship: {name: string, pilot: string, crewLimit: number, crew: string[], inMission: boolean}) {
    const crew = spaceship.crew
    if (crew.length >= spaceship.crewLimit) {
        alert("A spaceship já ultrapassou a capacidade tripulantes")
        return false
    }

    crew.push(name)
    return true
}

function sendSpaceShip(spaceship: {name: string, pilot: string, crewLimit: number, crew: string[], inMission: boolean}) {
    const spaceshipMin = Math.round(spaceship.crewLimit / 3)
    if (spaceship.inMission || spaceship.crew.length < spaceshipMin) {
        alert("Condições para enviar para missão não foram atendidas")
        return false
    }

    spaceship.inMission = true
    return true
}

function showSpaceShips() {
    const ul = document.getElementById("spaceships-list") as HTMLUListElement
    ul.innerHTML = ''

    spaceships.forEach(function(spaceship) {
        const li = document.createElement("li")

        const inMission = spaceship.inMission ? "Em missão" : "Em treinamento"

        li.innerText = `Nome: ${spaceship.name} ; Piloto: ${spaceship.pilot} ; Capacidade: ${spaceship.crewLimit} ; Estado: ${inMission} ; Tripulação: ${spaceship.crew}`
        ul.appendChild(li)
    })
}


const createSpaceshipForm = document.getElementById("addSpaceShip")
createSpaceshipForm.addEventListener("click", function(ev) {
    ev.preventDefault()
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const pilotInput = document.getElementById("pilot") as HTMLInputElement;
    const crewLimitInput = document.getElementById("crewLimit") as HTMLInputElement;

    if (nameInput && pilotInput && crewLimitInput) {
        const name: string = nameInput.value;
        const pilot: string = pilotInput.value;
        const crewLimit: number = Number(crewLimitInput.value)

        createSpaceShip(name, pilot, crewLimit)
        showSpaceShips()
        createSelect()

        nameInput.value = ""
        pilotInput.value = ""
        crewLimitInput.value = ""
    } else {
        console.error("Um ou mais elementos não foram encontrados.");
    }
})


const addMemberForm = document.getElementById("addMember")
addMemberForm.addEventListener("click", function(ev) {
    ev.preventDefault()
    const select = document.getElementById("spaceship-add-select") as HTMLInputElement
    const memberNameInput = document.getElementById("member-name") as HTMLInputElement

    if (select && memberNameInput)  {
        const spaceshipName: string = select.value
        const memberName: string = memberNameInput.value
    
        const spaceship = spaceships.find(spaceship => spaceship.name === spaceshipName)
        addMember(memberName, spaceship)
        createSelect()
        showSpaceShips()

        select.value = ""
        memberNameInput.value = ""
    }
})

const sendSpaceShipForm = document.getElementById("sendSpaceShip")
sendSpaceShipForm.addEventListener("click", function(ev) {
    ev.preventDefault()
    const select = document.getElementById("spaceship-mission-select") as HTMLInputElement

    if (select) {
        const spaceshipName: string = select.value
        const spaceship = spaceships.find(spaceship => spaceship.name === spaceshipName)
        sendSpaceShip(spaceship)
        createSelect()
        showSpaceShips()

        select.value = ""
    }
})

function createSelect() {
    const selects = document.querySelectorAll(".select") as NodeListOf<HTMLSelectElement>

    selects.forEach(select => {
        select.innerHTML = ''  // para limpar a lista e não haver sobreposição

        // opção default
        const defaultOption = document.createElement("option")
        defaultOption.innerText = "Escolha um spaceship..."
        defaultOption.value = ""
        defaultOption.disabled = true
        defaultOption.selected = true
        select.appendChild(defaultOption)

        spaceships.forEach(function(spaceship) {
            const option = document.createElement("option")
            option.value = spaceship.name
            option.textContent = spaceship.name
            select.appendChild(option)
        })
    })
}




