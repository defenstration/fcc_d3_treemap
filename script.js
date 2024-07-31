const datasetInfo = {
    kickstarterPledges: {
        URL: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json',
        title: 'Treemap of Kickstarter pledges',
        description: 'Treemap of Kickstarter pledges'
    },
    movieSales: {
        URL: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json',
        title: 'Treemap of Movie Sales',
        description: 'Treemap of Movie Sales'
    },
    videoGameSales: {
        URL: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json',
        title: 'Treemap of Video Game Sales',
        description: 'Treemap of Video Game Sales'
    }
}

const navKickstarter = document.getElementById('kickstarter-btn')
const navMovies = document.getElementById('movie-btn')
const navVideoGames = document.getElementById('video-game-btn')

const navBtns = document.querySelectorAll('.nav-btn')


let activeData = datasetInfo.kickstarterPledges


d3.select('body')
    .append('h1')
    .attr('id', 'title')
    .text(`fCC D3 Treemap - ${activeData.title}`)

d3.select('body')
    .append('h3')
    .attr('id', 'description')
    .text(`${activeData.description}`)


d3.select('body')
    .append('g')
    .attr('id', 'tooltip')
    .attr('opacity', 0)
    .attr('height', 50)
    .attr('width', 150)
    .attr('fill', 'white')


const tooltip = d3.select('#tooltip')

d3.json(activeData.URL)
    .then(data => {
        console.log(data.children)

        const h = 800
        const w = 1600

        const svg = d3.select('body')
                        .append('svg')
                        .attr('height', h)
                        .attr('width', w)

        const treemap = d3.treemap()
                            .size(w, h)
    
        const root = d3.hierarchy(activeData)
                            .sum(d => d.value)
                            .sort((a, b) => b.value - a.value)


    })








navBtns.forEach( (navBtn) => navBtn.addEventListener('click', (btn) => {

    switch (btn.target.id) {
        case 'kickstarter-btn':
            activeData = datasetInfo.kickstarterPledges
            break;

        case 'movie-btn':
            activeData = datasetInfo.movieSales
            break;

        case 'video-game-btn':
            activeData = datasetInfo.videoGameSales
            break;

    } 

    d3.select('#description').text(`${activeData.description}`)
    d3.select('#title').text(`${activeData.title}`)

}))



