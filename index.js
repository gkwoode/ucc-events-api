// const PORT = process.env.PORT || 8000
const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const https = require('https')

const ucc = express()

axios.defaults.httpsAgent = new https.Agent({
    rejectUnauthorized: false,
})

const event = []

const uccevents = [
    {
        name: 'page1',
        address: 'https://www.ucc.edu.gh/events',
        base: 'https://www.ucc.edu.gh'
    },
    {
        name: 'page2',
        address: 'https://www.ucc.edu.gh/events?page=1',
        base: 'https://www.ucc.edu.gh'
    },
    {
        name: 'page3',
        address: 'https://www.ucc.edu.gh/events?page=2',
        base: 'https://www.ucc.edu.gh',
    },
    {
        name: 'page4',
        address: 'https://www.ucc.edu.gh/events?page=3',
        base: 'https://www.ucc.edu.gh',
    },
    {
        name: 'page5',
        address: 'https://www.ucc.edu.gh/events?page=4',
        base: 'https://www.ucc.edu.gh',
    },
    {
        name: 'page6',
        address: 'https://www.ucc.edu.gh/events?page=5',
        base: 'https://www.ucc.edu.gh',
    },
    {
        name: 'page7',
        address: 'https://www.ucc.edu.gh/events?page=6',
        base: 'https://www.ucc.edu.gh',
    },
    {
        name: 'page8',
        address: 'https://www.ucc.edu.gh/events?page=7',
        base: 'https://www.ucc.edu.gh',
    },
    {
        name: 'page9',
        address: 'https://www.ucc.edu.gh/events?page=8',
        base: 'https://www.ucc.edu.gh',
    },
    {
        name: 'page10',
        address: 'https://www.ucc.edu.gh/events?page=9',
        base: 'https://www.ucc.edu.gh'
    },
    {
        name: 'page11',
        address: 'https://www.ucc.edu.gh/events?page=10',
        base: 'https://www.ucc.edu.gh'
    },
    {
        name: 'page12',
        address: 'https://www.ucc.edu.gh/events?page=11',
        base: 'https://www.ucc.edu.gh'
    }
]


// ucc.get('/events', (req, res) => {

// ucc.get('/', (req, res) => {
//     res.json('WELCOME')
// })

uccevents.forEach(uevent => {
    axios.get(uevent.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('.title,.image', html).each(function (){
            const title = $(this).text().replace(/\s\s+/g, '')
            // const link = $(this).find('a').attr('href')
            const url = $(this).find('a').attr('href')
            // const base = 'https://www.ucc.edu.gh'
            const img = $(this).find('img').attr('src')
            // const url = base + link
    
                event.push({
                    title,
                    url: uevent.base + url,
                    img,
                    source: uevent.address
                })
        })
    })
})

ucc.get('/events', (req, res) => {
    res.json(event)
})

ucc.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))

