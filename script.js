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

const h = 800
const w = 1600
const margin = {top: 10, right: 10, bottom: 10, left: 10}

let activeData = datasetInfo.kickstarterPledges

const colors = d3.scaleOrdinal().range([
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#FF8C33",
    "#33FFD4",
    "#8C33FF",
    "#33A1FF",
    "#D433FF",
    "#FF3333",
    "#33FF8C",
    "#FF5733",
    "#57FF33",
    "#FF33FF",
    "#33FFA1",
    "#5733FF",
    "#33FF33"
]);


d3.select('header')
    .append('h1')
    .attr('id', 'title')
    .text(`fCC D3 Treemap - ${activeData.title}`)

d3.select('header')
    .append('h3')
    .attr('id', 'description')
    .text(`${activeData.description}`)


d3.select('#treemap')
    .append('g')
    .attr('id', 'tooltip')
    .attr('opacity', 0)
    .attr('height', 50)
    .attr('width', 150)


const tooltip = d3.select('#tooltip')
const legend = d3.select('#legend')
                    .append('svg')


const svg = d3.select('#treemap')
                .append('svg')
                .attr('height', h + margin.bottom + margin.top)
                .attr('width', w + margin.left + margin.right)
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)

d3.json(activeData.URL)
    .then(data => {

        const root = d3.hierarchy(data)
                            .sum(d => {return d.value})
                            .sort((a, b) => b.value - a.value)

        console.log(root.leaves())                    

        d3.treemap()
            .size([w, h])
            .padding(1)
            (root)

        svg.selectAll('rect')
            .data(root.leaves())
            .enter()
            .append('rect')
            .attr('class', 'tile')
            .attr('data-name', d => d.data.name)
            .attr('data-value', d => d.data.value)
            .attr('data-category', d => d.data.category)
            .attr('x', d => {return d.x0})
            .attr('y', d => {return d.y0})
            .attr('height', d => {return d.y1 - d.y0})
            .attr('width', d => {return d.x1 - d.x0})
            .style('fill', d => colors(d.data.category))
            .on('mousemove', (event, d) => {
                tooltip.style('opacity', .9)
                tooltip.style('left', (event.pageX + 10) + 'px')
                        .style('top', (event.pageY + 10) + 'px')
                        .attr('data-value', d.data.value)
                        .html(`Name: ${d.data.name} Category: ${d.data.category}}`)
            })
            .on('mouseout', () => {
                tooltip.style('opacity', 0)
            })

        svg.selectAll('text')
            .data(root.leaves())
            .enter()
            .append('text')
            .attr('x', d => {return d.x0 + 5})
            .attr('y', d => {return d.y0 + 15})
            .text(d => d.data.name)

        legend.selectAll('rect')
                .data(root.leaves())
                .enter()
                .append('rect')
                .attr('class', 'legend-item')
                .attr('fill', d => colors(d))
                .attr('height', 25)
                .attr('width', 25)
                .attr('x', (d, i) => Math.floor((i) / 3) * 50)
                .attr('y', (d, i) => Math.floor((i) / 6) * 50)
        
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
