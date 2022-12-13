const fs = require("fs")
const data = []
let toggle = true

for (let i = 0; i <= 600; i++) {
    if (i.toString().length === 3) {
        toggle = parseInt([...i.toString()].shift()) % 2 === 0
    }


    data.push({
        data: {
            creativeId: "5340",
            eventType: toggle ? "pause" : "play",
            timeStamp: new Date(i * 1000).toISOString().slice(14, 19)
        }
    })
}

fs.writeFile("./testData.json", JSON.stringify(data, null, 2), err => {
    if(err) console.error(err)
})
