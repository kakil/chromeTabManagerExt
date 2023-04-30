window.addEventListener("DOMContentLoaded", function() {
    let allTabs = [];

    chrome.runtime.sendMessage({type: "getTabs"}, function (response) {
        allTabs = response;

            response.forEach((tab, index) => {
                
                const tabs = document.querySelector("#ext_tabs");
                console.log(tabs);
                const tabElement = document.createElement("li");
                const p = document.createElement("p"); 
                p.innerText = index + 1 + ") " + tab.title;
                const button = document.createElement("button");

                if(tab.active) {
                    tabElement.classList.add("active");
                }
                button.addEventListener("click", function() {
                    chrome.tabs.remove(tab.id);
                    tabElement.remove();
                })
                tabElement.addEventListener("click", function() {
                    chrome.tabs.update(tab.id, { active: true });
                    window.close();
                });
                button.innerText = "Close Tab";
                tabElement.appendChild(p);
                tabElement.appendChild(button);
                tabs.appendChild(tabElement);
            });
            
        }

    );

});