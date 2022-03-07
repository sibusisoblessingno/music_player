const express = require("express");
const app = express()
const cors = require('cors')



app.use(express.json())
app.use(express.static('public'))
app.use(cors({origin: '*'}))



var songs = [
    { id: 1, name: "playlist-1", by: "curator-1", img: "https://media.pitchfork.com/photos/5ac239aaed597f1cdf3dcda4/1:1/w_600/Saba:%20Care%20For%20Me.jpg", likes: 0, plays: 0 },
    { id: 2, name: "playlist-2", artist: "curator-2", img: "https://media.pitchfork.com/photos/6160501d501981e7a04affa0/1:1/w_600/Mick-Jennkins.jpeg", likes: 0, plays: 0 },
    { id: 3, name: "playlist-3", artist: "curator-3", img: "https://media.pitchfork.com/photos/5929a9b39d034d5c69bf3ccf/1:1/w_600/ba4e0cd3.jpg", likes: 0, plays: 0 },
    { id: 4, name: "playlist-4", artist: "curator-4", img: "https://media.pitchfork.com/photos/5929bc37abf31b7dc7155c84/1:1/w_320/1c0dfe78.jpg", likes: 0, plays: 0 },
    { id: 5, name: "playlist-5", artist: "curator-5", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLHrL1c_UO6ArHVu1lsvdkTGTU2ZR1SiWIgG7b6lsUfkrPVpRTcTJv-wYukBomSdPBsAc&usqp=CAU", likes: 0, plays: 0 },
    { id: 6, name: "playlist-6", artist: "curator-6", img: "https://direct.rhapsody.com/imageserver/images/alb.200733523/500x500.jpg",likes: 0, plays: 0 },
    { id: 7, name: "playlist-7", artist: "curator-7", img: "https://miro.medium.com/max/1000/1*ZHytsEv0xXodLzXNN4tRDw.jpeg", likes: 0, plays: 0 },
    { id: 8, name: "playlist-8", artist: "curator-8", img: "https://images-na.ssl-images-amazon.com/images/I/71iQcMbTpWL._SL1500_.jpg", likes: 0, plays: 0 },
    { id: 9, name: "playlist-9", artist: "curator-9", img: "https://www.rollingstone.com/wp-content/uploads/2018/06/rs-134733-hiphop-1800-1386786862.jpg", likes: 0, plays: 0 },
    { id: 10, name: "playlist-10", artist: "curator-10", img: "https://miro.medium.com/max/1000/1*28A8Y3r-dCyv6pZ5_XEMPg.jpeg", likes: 0, plays: 0 },
    { id: 11, name: "playlist-11", artist: "curator-11", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiMoWQxg11hnTQrqZCJrqluTVugBvIdTGSsQ&usqp=CAU", likes: 0, plays: 0 },
    { id: 12, name: "playlist-12", artist: "curator-12", img: "https://static.highsnobiety.com/thumbor/XuD8bFfXgQafKKt_Ga2VGkMdH64=/fit-in/640x640/smart/static.highsnobiety.com/wp-content/uploads/2018/01/25130936/best-rap-album-grammy-ranking-14.jpg", likes: 0, plays: 0 },
    { id: 13, name: "playlist-13", artist: "curator-13", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ66LlWKbnHVoSEiXk_5lJsMb8oMIu2s48I8VI1-MRDAXpZsV_CxdTYDurBGcnnoe5nl00&usqp=CAU", likes: 0, plays: 0 },
    { id: 14, name: "playlist-14", artist: "curator-14", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmnJ8XpMZGjZDVPY11Rlv5WnVnTIZj9AgGsQ&usqp=CAU", likes: 0, plays: 0 },
    { id: 15, name: "playlist-15", artist: "curator-15", img: "https://media.npr.org/assets/img/2017/12/27/kendrick-lamar_sq-d29d54d4946286c6bcc2f05bc19c440cdd11d7d5.jpg", likes: 0, plays: 0 },
    { id: 16, name: "playlist-16", artist: "curator-16", img: "https://miro.medium.com/max/1000/1*28A8Y3r-dCyv6pZ5_XEMPg.jpeg", likes: 0, plays: 0 },
    { id: 17, name: "playlist-17", artist: "curator-17", img: "https://assets.capitalxtra.com/2013/48/best-hip-hop-album-covers-4-1386002950-view-0.jpg", likes: 0, plays: 0 },
    { id: 18, name: "playlist-18", artist: "curator-18", img: "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg", likes: 0, plays: 0 },
    { id: 19, name: "playlist-19", artist: "curator-19", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnHkxDFLWIYBqB_pTXw6SPZsDtHcyOoKcyag&usqp=CAU", likes: 0, plays: 0 },
    { id: 20, name: "playlist-20", artist: "curator-20", img: "https://m.media-amazon.com/images/I/713Te97Ga2L._SL1061_.jpg", likes: 0, plays: 0 },
    { id: 21, name: "playlist-21", artist: "curator-21", img: "https://respect-mag.com/wp-content/uploads/2019/11/unnamed-16.png", likes: 0, plays: 0 },
]

var stats = {
    totalPlays: 0,
    totalLikes: 0,
    totalVisits: 0,
}

var userDevice = [

]

app.get('/', (req, res) => {
    stats.totalVisits++
    
    var user = {
        device: req.get('User-Agent'),
        ip: req.headers['x-forwarded-for']?? req.socket.remoteAddress
    }

    userDevice.push(user)
    res.sendFile('home.html', { root: __dirname + '/public/html' })
})

app.get('/stats', (req, res) => {
    res.sendFile('stats.html', { root: __dirname + '/public/html' })
})

app.get('/stats/device', (req, res) => {
    res.sendFile('device.html', { root: __dirname + '/public/html' })
})

app.get('/api/songs', (req, res) => {
    const { sort } = req.query

    if (sort) {
        let music = songs.sort((a, b) => b[sort] - a[sort])
        res.json(music)
        return
    }
    res.status(400)
    return
})

app.get('/api/play/:id', (req, res) => {
    const { id } = req.params

    if (!id) {
        res.status(400).send()
        return
    }

    for (var item of songs) {
        if (item.id == id) {
            item.plays++
            stats.totalPlays++
            res.status(200).json(item)
        }
    }
    res.status(400).send()
    return
})


app.post('/api/like', (req, res) => {
    const { id } = req.body

    if (!id) {
        res.status(400).send()
        return;
    }

    for (var item of songs) {

        if (item.id == id) {
            item.likes++
            stats.totalLikes++
            found = true
            res.status(200).send()
            return;
        }
    }

    res.status(400).send()
})

app.post('/api/dislike', (req, res) => {
    const { id } = req.body


    if (!id) {
        res.status(400).send()
        return;
    }
    for (var item of songs) {

        if (item.id == id) {
            item.likes--
            stats.totalLikes--
            res.status(200).send()
            return;
        }
    }

    res.status(400).send()
})

app.get('/api/stats', (req, res) => {
    const { sort } = req.query

    var playlists = songs.sort((a, b) => b[sort] - a[sort])

    res.json({ playlists, stats })
})

app.get('/api/stats/device', (req, res) => {
    res.json(userDevice)
})

app.listen(5000, () => console.log('Server Listening on port 5000'))