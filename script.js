async function runAI() {

    const res = await fetch("data.json");
    const data = await res.json();

    const table = document.getElementById("roomTable");
    const result = document.getElementById("result");

    table.innerHTML = `
        <tr>
            <th>Room</th>
            <th>Capacity</th>
            <th>Occupied</th>
            <th>Energy (kWh)</th>
        </tr>
    `;

    let suggestions = "";
    let savedEnergy = 0;

    data.rooms.forEach(room => {

        // show table
        table.innerHTML += `
            <tr>
                <td>${room.id}</td>
                <td>${room.capacity}</td>
                <td>${room.occupied}</td>
                <td>${room.energy}</td>
                <td>${room.occupied === 0 ? "Free" : "Occupied"}</td>
                <td>${room.occupied === 0 ? `<button onclick="bookRoom(${room.id})">Book</button>` : "-"}</td>

            </tr>
        `;

        let usage = (room.occupied / room.capacity) * 100;

        // AI rules
        if(room.occupied === 0){
            suggestions += `❌ Room ${room.id} empty → Turn OFF power<br>`;
            savedEnergy += room.energy;
        }
        else if(usage < 30){
            suggestions += `⚠️ Room ${room.id} underutilized → Merge classes<br>`;
        }
        else{
            suggestions += `✅ Room ${room.id} efficiently used<br>`;
        }
    });

    suggestions += `<br>💡 Estimated Energy Saved = ${savedEnergy} kWh`;

    result.innerHTML = suggestions;
}


function bookRoom(id){
    alert("Room " + id + " booked successfully ✅");
}

