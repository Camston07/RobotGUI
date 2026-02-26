const brokerUrl = "ws://test.mosquitto.org:8080/mqtt";
const topic = "m5stickcplus/robot/control";

let client = null;

function main() {
    setupConnectionButtons();
    setupControlButtons();
}

main();

function setupConnectionButtons() {
    document.getElementById("connectBtn").addEventListener("click", connectToMqttBroker());
    document.getElementById("disconnectBtn").addEventListener("click", disconnectFromMqttBroker());
}

function setupControlButtons() {
    document.querySelectorAll(".btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const command = btn.getAttribute("name");
            sendCommand(command);
        })
    })
}

function sendCommand(cmd) {

}
