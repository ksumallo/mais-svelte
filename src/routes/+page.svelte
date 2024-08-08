<script>
	import Dropdown from "./Dropdown.svelte";
	import Timetable from "./Timetable.svelte";
	import Cart from "./Cart.svelte";
	import { Section } from "./Section.js"
	import TextInput from "./TextInput.svelte";
	import ClassList from "./ClassList.svelte";
	
    // let codes = ["cmsc_124", "cmsc_125"]
	let classes = []
	let sections = []
	$: {
		sections = []
		console.log("Array changed!")
	}

	async function requestData(event) {
		let f = event.detail.query.trim().replace(" ", "+")
		let data = await fetch(`https://api-amis.uplb.edu.ph/api/students/classes?page=1&items=10&status=Active&course_code_like=${f}&section_like=--&class_status=All`, {
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
			
		parseSections(data)
	}

	function parseSections(data) {
		console.log("MyData", data)
		sections = []

		for (const sectionData of data.classes.data) {
			const newSection = new Section(sectionData)
			sections.push(newSection)
		}
		console.log("NewClass[0]", sections[0])
		// classes.push(sections)
	}
</script>

<nav>
	<span> Hey </span>
</nav>
<div id="main-div">
	<div id="aside">
		<TextInput on:submit={requestData}/>
		<Dropdown />
		<ClassList items={sections} />
		<Cart items={[]}/>
	</div>
	<div id="timetable-wrapper">
		<Timetable />
	</div>
</div>

<style>
	#main-div > div {
		padding: 16px;
	}
	
	#main-div {
		display: flex;
		gap: 8px;
	}

	#aside {
		display: flex;
		height: 100vh;
		width: 25vw;
		background-color: #404040;
		flex-direction: column;
		gap: 8px;
		resize: horizontal;
		overflow: hidden;
	}

	#timetable-wrapper {
		width: 75vw;
		padding: 16px;
	}

	nav {
		padding: 16px;
		color: white;
		background-color: maroon;
	}
</style>