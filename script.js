
const body = document.querySelector("#body")

const titleContainer = document.querySelector(".title-container-fadein-fadeout")
const titleText = document.querySelector(".title-text")

const btnContainer = document.querySelector(".btn-container")
const gridContainer = document.querySelector(".grid-container")

const heading = document.querySelector(".heading")

const colorBtn = document.querySelector("#color-btn")
const randomBtn = document.querySelector("#random-btn")
const clearBtn = document.querySelector("#clear-btn")

const buttons = document.querySelectorAll(".button")
const slider = document.querySelector("#volume")
const sliderValue = document.querySelector(".slider-value")

let mouseDown = false
window.addEventListener("mousedown", () => mouseDown = true)
window.addEventListener("mouseup", () => mouseDown = false)

//OPENING TITLE TRANSITION


titleContainer.addEventListener("animationend", (e) => {
    body.removeChild(e.target)
    btnContainer.style.display = "flex"
    gridContainer.style.display = "grid"
})


const randomColorTitle = () => {
    titleText.innerHTML = span_it(titleText.innerText)

    const spans = titleText.querySelectorAll("span")
    spans.forEach(span => span.style.color = getRandomRGB())
}


const span_it = (str) => {
  return str.split("").map(letter => "<span>" + letter + "<span>").join("")
}


////


const getRandomRGB = () => {
    const randomRed = Math.ceil(Math.random() * 255)
    const randomGreen = Math.ceil(Math.random() * 255)
    const randomBlue = Math.ceil(Math.random() * 255)

    return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`
}

const randomColorHeading = () => {
    heading.innerHTML = span_it(heading.innerText)

    const spans = heading.querySelectorAll("span")
    spans.forEach(span => span.style.color = getRandomRGB())
}


const createGrid = (size) => {
    for (let i = 0; i < size ** 2; i++) {
        let div = document.createElement("div")
        gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        div.classList.add("pixel")
        gridContainer.appendChild(div);
    }
}

const setColor = (setting) => {
    const gridPixels = document.querySelectorAll(".pixel")
    gridPixels.forEach(gridPixel => 
        gridPixel.addEventListener("mousemove", (e) => {
            if (setting === "color-btn" && mouseDown) {
                e.target.style.backgroundColor = colorBtn.value
            } else if (setting === "random-btn" && mouseDown) {
                e.target.style.backgroundColor = getRandomRGB()
            }
        }))
}


const changeGridSize = (val) => {
    const gridPixels = document.querySelectorAll(".pixel")
    gridPixels.forEach(gridPixel => gridPixel.remove())
    createGrid(val)
    sliderValue.innerHTML = `${val} x ${val}`
}

const clearAll = () => {
    const gridPixels = document.querySelectorAll(".pixel")
    gridPixels.forEach(gridPixel => gridPixel.style.backgroundColor = "gainsboro")
}

//EVENT LISTENERS
heading.addEventListener("click", () => randomColorHeading())
clearBtn.addEventListener("click", () => clearAll())

colorBtn.addEventListener("click" , () => {
    const setting = "color-btn"
    setColor(setting)
})

randomBtn.addEventListener("click", () => {
    const setting = "random-btn"
    setColor(setting)
})

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        buttons.forEach(btn => btn !== e.currentTarget && btn.classList.remove("is-active"))
        e.currentTarget.classList.toggle("is-active")
    })
})

//DECLARATIONS
randomColorTitle()
randomColorHeading()

createGrid(16)
changeGridSize
