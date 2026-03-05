let topic = null;

let client = null;

function main() {
    setupConnectionButtons();
    setupControlButtons();
}

main();

function setupConnectionButtons() {
    document.getElementById("connectBtnPrivate").addEventListener("click", connectToPrivateMqttBroker);
    document.getElementById("connectBtnPublic").addEventListener("click", connectToPublicMqttBroker);
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

function connectToPrivateMqttBroker() {
    if (client && client.connected) {
        console.log("Already Connected");
        alert("Already Connected");
        return;
    }

    // Private EMBED channel
    let brokerUrl = "ws://IoT.ScheduleCare.ca:8083";
    let userName = "Cam-n-Nev";
    let pwd = "6Z4hn/4X!PLj";
    topic = "EMBED/CamNev/m5stickcplus/robot/control";

    client = mqtt.connect(brokerUrl, {
        username: userName,
        password: pwd,
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

function connectToPublicMqttBroker() {
    if (client && client.connected) {
        console.log("Already Connected");
        alert("Already Connected");
        return;
    }

    // Public Mosquitto
    let brokerUrl = "wss://test.mosquitto.org:8081/mqtt";
    topic = "m5stickcplus/robot/control";

    client = mqtt.connect(brokerUrl);

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
    if (client && client.connected) {
        client.publish(topic, cmd);
        console.log(`Send Command ${cmd}`);
    } else {
        console.log("Not connected, can't send message");
    }
}
