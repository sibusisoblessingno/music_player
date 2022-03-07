const showData = (device, ip) => {
    let table = document.getElementById("data_section")
    let tableData = document.createElement("tr")
    id=Math.floor(Math.random() * 1000)

    tableData.innerHTML = `<tr>
    <td id="ip_${id}">${ip}</td>
    <td id="device_${id}">${device}</td>
</tr>`
    table.appendChild(tableData)
}

const mapData = (data) => {

    data.forEach(item => {
        showData(item.device, item.ip)
    });
}




const search = async () => {
    try {
        let response = await axios.get('http://localhost:5000/api/stats/device')

        mapData(response.data)
    } catch (error) {
        console.log(error)
    }
}

search()