async function CriaGrafico1() {

    var ctx = document.getElementsByClassName('line-chart');
    const json = await ListaGeneros()
    let labelX = [];
    for (let i = 0; i < json.results.length; i++) {
        labelX.push(json.results[i].name)
    }
   
    let dadosGraph = [];
    let backgroundColors = []
    let borderColors = []
    for (let i = 0; i < json.results.length; i++) {
        const color = generateRandomColor()
        dadosGraph.push(json.results[i].games_count)
        backgroundColors.push(color.transparent)
        borderColors.push(color.opaque)
    }

    var chartGraph = new Chart(ctx[0], {
        type: 'pie',
        data: {
            labels: labelX,
            datasets: [{
                label: "Quantidade de Jogos Por Genero",
                labelColor:"#ffb323",
                data: dadosGraph,
                dataColor:"#ffb323",
                borderColor: borderColors,
                borderWidth: 1,
                backgroundColor: backgroundColors
            }]
        }
    })
}

CriaGrafico1()

async function CriaGrafico2() {

    var ctx = document.getElementsByClassName('line-chart4');
    const json = await ListaStores()
    let labelX = [];
    for (let i = 0; i < json.results.length; i++) {
        labelX.push(json.results[i].name)

    }
   
    let dadosGraph = [];
    let backgroundColors = []
    let borderColors = []
    for (let i = 0; i < json.results.length; i++) {
        const color = generateRandomColor()
        dadosGraph.push(json.results[i].games_count)
        backgroundColors.push(color.transparent)
        borderColors.push(color.opaque)
    }

    var chartGraph = new Chart(ctx[0], {
        type: 'pie',
        data: {
            labels: labelX,
            datasets: [{
                label: "Quantidade de Jogos Por Loja",
                labelColor:"#ffb323",
                data: dadosGraph,
                dataColor:"#ffb323",
                borderColor: borderColors,
                borderWidth: 1,
                backgroundColor: backgroundColors
            }]
        }
    })
}

CriaGrafico2()


function generateRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min)) + min
}

function generateRandomColor(){
    const red = generateRandomNumber(0, 255)
    const green = generateRandomNumber(0, 255)
    const blue = generateRandomNumber(0, 255)
    return {
        opaque: `rgba(${red}, ${green}, ${blue}, 1)`,
        transparent: `rgba(${red}, ${green}, ${blue}, 0.2)`
    }
}