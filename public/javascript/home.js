
const baseUrl = "http://localhost:5000"

var selection = document.getElementById('content')

const element = (id, songTitle, artistName, url) => {
    const div = document.createElement('div')

    div.innerHTML = `<div id="song_${id}" class="row">
    <div id="song_cover_${id}" class="rounded shadow hero col-2 m-4 d-flex justify-content-center play_button"
        style="background-image: url(${url});">
    </div>
    <div class="options my-4">
        <div  id="song_name__${id}">${songTitle}</div>
        <div id="artist_${id}">Curator: ${artistName}</div>
        <div id="length_${id}">Length: 01:02:10</div>
        <div id="release_date_${id}">Created: 13 May 2021</div>
        <div id="like_button_${id}" class ="btn btn-sm  rounded like_button" ><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
<path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
 </svg>  Like</div>   
    </div>
</div>
<hr style="background-color: gray;">`
    selection.appendChild(div)

}

const showItems = (items) => {
    selection.replaceChildren()
    items.forEach(item => {
        element(item.id, item.name, item.artist, item.img)
    });
    add()
}

const search = async () => {
    var dropDown = document.getElementById("selection")
    var selected = dropDown.options[dropDown.selectedIndex].value

    var url = baseUrl + '/api/songs?sort=' + selected

    try {
        var response = await axios.get(url)
        data = await response.data
        showItems(data)
    } catch (e) {
        console.log(e)
    }

}

const likeButtonPress = async (e) => {
    let element = e.target
    let id = element.getAttribute('id').split("_")[2];

    if (element.style.backgroundColor == "rgb(255, 11, 59)") {
        element.style.color = ""
        element.style.backgroundColor = "rgb(108, 117, 125)"
        like("dislike", id)
        return
    }

    element.style.backgroundColor = "rgb(255, 11, 59)"
    element.style.color = "rgb(255,250,250)"
    like("like", id)
}


const like = async (action, id) => {
    try {
        let r = await axios.post( baseUrl + "/api/" + action, { id })
    } catch (e) {
        console.log(e)
    }
}

const play = async (e) => {
    let id = e.target.getAttribute('id').split("_")[2];

    try {
        let resposne = await axios.get( baseUrl + "/api/play/" + id, { id })
    } catch (e) {
        console.log(e)
        return
    }
}

const add = () => {
    for (let button of likeButtons) {
        button.style.backgroundColor = "rgb(108, 117, 125)"
        button.addEventListener('click', likeButtonPress)
    }

    for (let button of playButtons)
        button.addEventListener('click', play)

}



var searchButton = document.getElementById("sort_search")
searchButton.addEventListener('click', search)


var likeButtons = document.getElementsByClassName("like_button")
var playButtons = document.getElementsByClassName("play_button")

search()



