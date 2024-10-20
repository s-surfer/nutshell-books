
async function fetchSitemap() {
    fetch("./sitemap.xml")
        .then(response => response.text())
        .then(data => {
            displayStyledXML(data);
        })
        .catch(error => {
            document.getElementById('xmlOutput').textContent = 'Error loading XML';
            console.error('Error:', error);
        });

}

 // Function to parse XML and convert to styled HTML
 function displayStyledXML(xmlString) {
    
    // Parse XML string into DOM structure
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    
    // Convert XML elements to styled HTML
    const xmlNode = xmlDoc.documentElement;

    let innerHTML = "";
    innerHTML = `<table id="sitemap" cellpadding="3">
    <thead>
    <th wide="75%">Sitemap</th>
    <th wide="25%">Last Modified</th>
    </thead><tbody>`;

    // console.log(xmlNode)
    // console.log(innerHTML);
    xmlNode.childNodes.forEach(childNode => {
        if (childNode.tagName === "url") {
            // console.log(childNode.childNodes);
            childNode.childNodes.forEach( grandChildNode => {
                if (grandChildNode.nodeType === 1) {
                    if (grandChildNode.tagName === "loc") {
                        innerHTML += `<tr><td><a href="${grandChildNode.textContent}" target="_blank">${grandChildNode.textContent}</a></td>`
                    } else if (grandChildNode.tagName === "lastmod") {
                        innerHTML += `<td>${grandChildNode.textContent}</td></tr>`
                    }
                };

            });
        } else {
            if (childNode.textContent.trim() !== "") {
                innerHTML += `<p>${childNode.textContent.trim()}</p><br />`;
            };
        };
    });

    innerHTML += `</tbody></table>`

    document.getElementById('xmlOutput').innerHTML = innerHTML;
    return;
}

fetchSitemap();
