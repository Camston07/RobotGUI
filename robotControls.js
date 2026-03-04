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

    let brokerUrl = "wss://test.mosquitto.org:8081/mqtt";
    let userName = "Cam-n-Nev";
    let pwd = "6Z4hn/4X!PLj";

    client = mqtt.connect(brokerUrl, {
        username: userName,
        password: pwd,
        protocol: "wss"
    });

    client.on("connect", () => {
        console.log("Connected to MQTT broker");
        alert("Connected");
    });

    client.on("error", (err) => {
        console.error("Connection error: ", err);
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
        alert("Not Connected, can't disconnect");
    }
}

function sendCommand(cmd) {
    let topic = "m5stickcplus/robot/control";

    if (client && client.connected) {
        client.publish(topic, cmd);
        console.log(`Send Command ${cmd}`);
    } else {
        console.log("Not connected, can't send message");
    }
}
