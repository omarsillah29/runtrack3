
const keyInput = document.getElementById("key");
const submit = document.getElementById("myform");


submit.addEventListener("submit", (event) => {
    event.preventDefault();
    const key = keyInput.value;
    fetch("data.json")
        .then((response) => response.json())
        .then((data) => alert(jsonValueKey(data[1], key)));
})

function jsonValueKey($json, $key) {
    if ($json.hasOwnProperty($key)) {
        return $json[$key];
    } else {
        alert("La clé n'existe pas");
    }
}
