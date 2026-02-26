const brokerUrl = "wss://IoT.ScheduleCare.ca:8081/mqtt";
const topic = "Cam&Nev/m5stickcplus/robot/control";

let client = null;

function main() {
    setupConnectionButtons();
    setupControlButtons();
}

main();

function setupConnectionButtons() {
    document.getElementById("connectBtn").addEventListener("click", connectToMqttBroker);
    document.getElementById("disconnectBtn").addEventListener("click", disconnectFromMqttBroker);
}

function setupControlButtons() {
    document.querySelectorAll(".btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const command = btn.getAttribute("name");
            sendCommand(command);
        })
    })
}

function connectToMqttBroker() {
    if (client && client.connected) {
        console.log("Already Connected");
        alert("Already Connected");
        return;
    }

    client = mqtt.connect(brokerUrl);

    client.on("connect", () => {
        console.log("Connected to MQTT broker");
        alert("Connected");
    });

    client.on("close", () => {
        console.log("Disconnected from MQTT broker");
    });

}

function disconnectFromMqttBroker() {
    if (client && client.connected) {
        client.end();
        alert("Disconnected from MQTT broker");
    } else {
        alert("Not Connected, can't disconnecte");
    }
}

function sendCommand(cmd) {
    if (client && client.connected) {
        client.publish(topic, cmd);
        console.log(`Send Command ${cmd}`);
    } else {
        console.log("Not connected, can;t send message");
    }
}
