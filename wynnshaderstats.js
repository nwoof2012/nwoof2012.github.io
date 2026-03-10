const USER_AGENT = "nwoof2012/Nwoofs-Wynn-Shader/1.56.0 (nwoof2012.github.io)";
const MOD_ID = "K8XDv70D";

const downloadsCon = document.getElementById("downloads");

fetch(`https://api.modrinth.com/v2/project/${MOD_ID}`, {
   method: "GET",
   headers: {
       "User-Agent": USER_AGENT,
       "Content-Type": "application/json"
   } 
})
.then(response => response.json())
.then(data => {
    downloadsCon.innerHTML = data.downloads.toLocaleString();
})
.catch(error => console.error("Error fetching Modrinth data:", error));