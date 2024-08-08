const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat"]
const DAYS_DICT = {"mon": 0, "tue": 1, "wed": 2, "thu": 3, "fri": 4,"sat": 5}
const DAYS_INIT = {"mon": "M", "tue": "T", "wed": "W", "thu": "TH", "fri": "F","sat": "S"}

class Timeslot {
    constructor(start, end, day) {
        this.start = norm(start)
        this.end = norm(end)
        this.day = DAYS_DICT[day]
    }
} 
Timeslot.prototype.toString = () => `[(${this.day})${this.start}-${this.end}]`

export class Section {
    constructor(data) {
        this.code = data.course_code
        this.section = data.section
        this.hasLab = data.type == "LAB"
        this.timeslots = []

        this.lecSched = data.start_time + " - " + data.end_time
        this.lecDays = DAYS.filter(day => data[day]).map(day => DAYS_INIT[day])
        this.labDay = this.hasLab ? DAYS_INIT[DAYS.find(day => data[day])] : ""
        this.labSched = this.hasLab ? data.start_time + " - " + data.end_time : ""

        this.lecProfs = data.faculties.map(faculty => {const user = faculty.faculty.user; return `${user.last_name}, ${user.first_name} ${user.middle_name}`})
        this.labProfs = this.hasLab ? data.faculties.map(faculty => {const user = faculty.faculty.user; return `${user.last_name}, ${user.first_name} ${user.middle_name}`}) : []

        for (const day of DAYS) {
            let hasClassOnDay = data.class_dates[0][day]
            if (hasClassOnDay) {    // Has class on that day
                this.timeslots.push(new Timeslot(data.class_dates[0].start_time, data.class_dates[0].end_time, day))
            }
        }

        if (data.parent != null) {
            let parentDates = data.parent.class_dates[0]
            this.lecSched = parentDates.start_time + " - " + parentDates.end_time
            this.lecDays = DAYS.filter(day => parentDates[day]).map(day => DAYS_INIT[day])
            for (const day of DAYS) {
                let hasClassOnDay = parentDates[day]
                if (hasClassOnDay) {    // Has class on that day
                    this.timeslots.push(new Timeslot(parentDates.start_time, parentDates.end_time, day))
                }
            }

            this.lecProfs = data.parent.faculties.map(faculty => {const user = faculty.faculty.user; return `${user.last_name}, ${user.first_name} ${user.middle_name}`})
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

function norm(time) {
    const PM = time.substring(0, 5) == "PM" ? 12 : 0 
    const hour = parseInt(time.substring(0, 2))
    const half = parseInt(time.substring(3, 5)) / 30
    return parseInt(hour - 7 + half + PM)
}

export default { Section }