
blank = `
	<div class="people">
		<h2>Do</h2>
		<div class="people" id="People">
			<div class="card add-card" onclick="add('People')">
				<div class="name">
					<h3>+ New Card</h3>
				</div>
			</div>
		</div>
	</div>
	<br>
	<div class="tool">
		<h2>Doing</h2>
		<div class="tool" id="Tool">
			<div class="card add-card" onclick="add('Tool')">
				<div class="name">
					<h3>+ New Card</h3>
				</div>
			</div>
		</div>
	</div>
	<br>
	<div class="service">
		<h2>Done</h2>
		<div class="service" id="Service">
			<div class="card add-card" onclick="add('Service')">
				<div class="name">
					<h3>+ New Card</h3>
				</div>
			</div>
		</div>
	</div>
	<div class="copy">
		<h2>Copy As Text</h2>
		<textarea id="copy" rows="10"></textarea>
	</div>
`

current_project = location.href.split("#")[1].toLowerCase()

people = [];
tool = [];
service = [];

function load() {
	if (localStorage.getItem(current_project + "/people") == null) {
		people = [];
	} else {
		people = localStorage.getItem(current_project + "/people").split("&&");
	}

	if (localStorage.getItem(current_project + "/tool") == null) {
		tool = [];
	} else {
		tool = localStorage.getItem(current_project + "/tool").split("&&");
	}

	if (localStorage.getItem(current_project + "/service") == null) {
		service = [];
	} else {
		service = localStorage.getItem(current_project + "/service").split("&&");
	}
}

load();

function delete_card(id) {
	perform = confirm("Delete Card?");
	new_list = [];
	found_item = false;
	for (item of localStorage.getItem(current_project + "/" + id.split("/")[0]).split("&&")) {
		if (item !== id.split("/")[1]) {
			new_list.push(item);
		} else {
			if (found_item) {
				new_list.push(item);
			} else {
				found_item = true;
			}
		}
	}
	if (perform) {
		localStorage.setItem(current_project + "/" + id.split("/")[0], new_list.join("&&"));
		alert("Card Deleted");
	}
	load();
	draw();
}

function add(sectionID) {
	let name = prompt("Name");
	if (name !== null && name.replaceAll(" ", "") !== "") {
		if (sectionID.toLowerCase() == "people") {
			people.push(name);
			localStorage.setItem(current_project + "/people", people.join('&&'));
			alert("Added " + name + " to " + sectionID + " category.");
		} else if (sectionID.toLowerCase() == "tool") {
			tool.push(name);
			localStorage.setItem(current_project + "/tool", tool.join('&&'));
			alert("Added " + name + " to " + sectionID + " category.");
		} else if (sectionID.toLowerCase() == "service") {
			service.push(name);
			localStorage.setItem(current_project + "/service", service.join('&&'));
			alert("Added " + name + " to " + sectionID + " category.");
		}
	}
	draw();
}

function empty(project) {
	localStorage.clear(project + "/people");
	localStorage.clear(project + "/tool");
	localStorage.clear(project + "/service");
	draw();
}

function draw() {
	document.getElementById(current_project).parentElement.innerHTML = `<h1>${current_project.toUpperCase()}</h1><div class="card-collection" id="${current_project}"></div>`;
	document.getElementById(current_project).innerHTML = blank;
	let copy = document.getElementById("copy");
	copy.value = "Do:\n";
	for (let name of people) {
		if (name !== "") {
			document.getElementById("People").innerHTML = `
				<div class="card" oncontextmenu="delete_card('people/${name}');" id="people/${name}">
					<div class="name">
						<h3>${name}</h3>
					</div>
				</div>
			` + document.getElementById("People").innerHTML;
			copy.value = copy.value + '> ' + name + '\n';
		}
	}
	copy.value = copy.value + "Doing:\n";
	for (let name of tool) {
		if (name !== "") {
			document.getElementById("Tool").innerHTML = `
				<div class="card" oncontextmenu="delete_card(id='tool/${name}');" id="tool/${name}">
					<div class="name">
						<h3>${name}</h3>
					</div>
				</div>
			` + document.getElementById("Tool").innerHTML;
			copy.value = copy.value + '> ' + name + '\n';
		}
	}
	copy.value = copy.value + "Done:\n";
	for (let name of service) {
		if (name !== "") {
			document.getElementById("Service").innerHTML = `
				<div class="card" oncontextmenu="delete_card('service/${name}');" id="service/${name}">
					<div class="name">
						<h3>${name}</h3>
					</div>
				</div>
			` + document.getElementById("Service").innerHTML;
			copy.value = copy.value + '> ' + name + '\n';
		}
	}
}
