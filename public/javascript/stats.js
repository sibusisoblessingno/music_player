
const showData = (id, songName, artistName, playsName, likesName) => {
    let table = document.getElementById("data_section")
    let tableData = document.createElement("tr")

    tableData.innerHTML = `<tr>
    <td id="song_${id}">${songName}</td>
    <td id="artist_${id}">${artistName}</td>
    <td id="plays_${id}">${playsName}</td>
    <td id="likes_${id}">${likesName}</td>
</tr>`
    table.appendChild(tableData)
}

const mapData = (data) => {
    let likes = document.getElementById("totalLikes")
    let visits = document.getElementById("totalVisits")
    let plays = document.getElementById("totalPlays")

    visits.textContent = "Total page visits : " + data.stats.totalVisits
    plays.textContent = "Total number of plays : "+ data.stats.totalPlays
    likes.textContent = "Total number of likes : "+ data.stats.totalLikes

    data.playlists.forEach(item => {
        showData(item.id, item.name, item.artist, item.plays, item.likes)
    });
}




const search = async () => {
    try {
        const params = new URLSearchParams(window. location. search)
        let value= params.get('sort')?? 'none'
        let response = await axios.get('http://localhost:5000/api/stats?sort=' + value)

        mapData(response.data)
    } catch (error) {
        console.log(error)
    }
}

search()