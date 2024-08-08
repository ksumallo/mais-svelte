const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat"]
const DAYS_DICT = {"mon": 0, "tue": 1, "wed": 2, "thu": 3, "fri": 4,"sat": 5}
// const DAYS_INIT = ["M", "T", "W", "Th", "F", "S"]

const filenames = ["nstp_2", "cmsc_124", "cmsc_125", "cmsc_132", "cmsc_141", "cmsc_170"]
const blacklist = {
    "CMSC 132": ["10:00AM"]
} // Insert unfavorable start times here

class Timeslot {
    constructor(start, end, day) {
        this.start = norm(start)
        this.end = norm(end)
        this.day = DAYS_DICT[day]
    }
} 
Timeslot.prototype.toString = () => `[(${this.day})${this.start}-${this.end}]`

class Section {
    constructor(data) {
        this.code = data.course_code
        this.section = data.section
        this.hasLab = data.type == "LAB"
        this.timeslots = []

        for (const day of DAYS) {
            let hasClassOnDay = data.class_dates[0][day]
            if (hasClassOnDay) {    // Has class on that day
                this.timeslots.push(new Timeslot(data.class_dates[0].start_time, data.class_dates[0].end_time, day))
            }
        }

        if (data.parent != null) {
            let parent = data.parent
            for (const day of DAYS) {
                let hasClassOnDay = parent.class_dates[0][day]
                if (hasClassOnDay) {    // Has class on that day
                    this.timeslots.push(new Timeslot(parent.class_dates[0].start_time, parent.class_dates[0].end_time, day))
                }
            }
        }
    }

    print_all_sched() {
        console.log(this)
    }

    print() {
        return `
        ${this.code} - ${this.code}
        ${"[LEC]".padStart(20, " ")}${"[LEC]".padStart(20, " ")}
        ${this.timeslots}
        `
    }
}
Section.prototype.toString = function() { return `${this.code} - ${this.section}` }

function collides(sec1, sec2) {
    let s1 = sec1.start,
        s2 = sec2.start,
        e1 = sec1.end,
        e2 = sec2.end

    const result = Math.max(s1, s2) <= Math.min(e1, e2) && (sec1.day == sec2.day)
    // console.log(`Collides[${s1}, ${e1}, ${sec1.day}],[${s2}, ${e2}, ${sec2.day}]: ${result}`)
    return result
}

function hasConflict(cart, sec) {
    for (const c of cart) {
        // console.log("ItemInCart", c)
        for (const t1 of c.timeslots) {
            for (const t2 of sec.timeslots) {
                // console.log("Comparing", c.toString(), sec.toString() )
                if (collides(t1, t2)) return true
            }
        }
    }

    return false
}

function norm(time) {
    const PM = time.substring(0, 5) == "PM" ? 12 : 0 
    const hour = parseInt(time.substring(0, 2))
    const half = parseInt(time.substring(3, 5)) / 30
    return parseInt(hour - 7 + half + PM)
}

// Start

var classes = []
var p = []

function generateSchedule(n, combi) {
    if (n == classes.length) {
        // console.log("Success")
        p.push(combi)
        return [combi]
    }

    const cart = []
    for (let sec of classes[n]) {
        if (hasConflict(combi, sec)) {
            // console.log("Failed!")
            return []
        } else {
            cart.push(...generateSchedule(n+1, [...combi, sec]))
        }
    }
    return cart
}

// Load data from each file in filenames[]
// for (let i = 0; i < filenames.length; ++i) {
//     const f = filenames[i] + ".json"
//     const file = readFileSync(f)
//     const data = JSON.parse(file)

//     let sections = []
//     for (const sectionData of data.classes.data) {
//         const newSection = new Section(sectionData)
//         sections.push(newSection)
//     }
//     classes.push(sections)
// }

async function requestData() {
    for (let f of filenames) {
        f = f.toUpperCase().replace("_", "+")
        let data = await fetch(`https://api-amis.uplb.edu.ph/api/students/classes?page=1&items=10&status=Active&course_code_like=${f}&section_like=--&class_status=Open`, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9",
                "authorization": "Bearer 2555419|Z2GhgW5967kxXq3XjpEY9fHJiincLX3EeVbqE1El",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Chromium\";v=\"127\", \"Not)A;Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site"
            },
            "referrer": "https://amis.uplb.edu.ph/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
            }).then(res => res.json());
            
        let sections = []
        // console.log("MyData", data)
        for (const sectionData of data.classes.data) {
            if (blacklist[sectionData.course_code] != null){
                if (!blacklist[sectionData.course_code].includes(sectionData.start_time)) {
                    const newSection = new Section(sectionData)
                    sections.push(newSection)
                } 
            } else {
                const newSection = new Section(sectionData)
                sections.push(newSection)
            }
        }
        console.log("NewClass", sections)
        classes.push(sections)
    }
}

function printSched(arr) {
    console.log(arr.map((section) => section.toString()).join("\n"))
}

function setTimer(func) {
    const start = performance.now()
    func()
    const end = performance.now()
    const timeTaken = end - start
    console.log("Time elapsed:", timeTaken, "ms")

    console.log("Generated:", p.length)
    printSched(p[0])
}

requestData().then(() => {
    setTimer(() => {
        generateSchedule(0, [])
    })
})

// setTimer(() => {
//     let result = generateSchedule(0, [])
// })