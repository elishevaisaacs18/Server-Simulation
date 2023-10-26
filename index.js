const SERVER_CABLES = []; const USERS = [];
class User {
    constructor(IP) {
        this.IP = SERVER_CABLES.length;
        this.messages = [];
        SERVER_CABLES.push(new Cable([], this.IP));
    }
}
class Cable {
    constructor(packages, originIP) {
        this.originIP = originIP;
        this.isInDelivery = false;
        this.packages = [];
    }

    deliverPackagesManagement() {
        this.isInDelivery = true;
        while (this.packages.length !== 0) {
            let pack = this.packages.shift();
            setTimeout(() => transferPackage(pack), 1000);
        }
        this.isInDelivery = false;
    }

}
class Package {
    constructor(message, originIP, destinationIP) {
        this.message = message;
        this.originIP = originIP;
        this.destinationIP = destinationIP;
    }
}

addUsers(3);

function addUsers(num) {
    for (let i = 0; i <= num; i++) {
        USERS.push(new User(i));
    }
}

function transferPackage(package) {
    document.getElementById("n" + package.originIP + "-bird").classList.add("bird-to-server");
    SERVER_CABLES[parseInt(package.destinationIP)].packages.push(package);
    setTimeout(() => transferMessageToDest(package), 1000)
    console.log("USERE", USERS);
    document.getElementById("n" + package.originIP + "-bird").classList.remove("bird-to-comp");
}

function transferMessageToDest(package) {
    document.getElementById("n" + package.originIP + "-bird").classList.remove("bird-to-server");
    document.getElementById("n" + package.destinationIP + "-bird").classList.add("bird-to-comp");
    USERS[parseInt(package.destinationIP)].messages.push(package.message);
    showMessage(package.destinationIP);
}

function showMessage(IP) {
    document.getElementById("n" + IP + "-caption").textContent = 
    USERS[IP].messages[USERS[IP].messages.length - 1] + " ";  
}

document.getElementsByTagName("button")[0].addEventListener("click", sendPackage);
document.getElementsByTagName("button")[1].addEventListener("click", sendPackage);
document.getElementsByTagName("button")[2].addEventListener("click", sendPackage);



function sendPackage(event) {
    const ORIGIN_IP = parseInt(event.target.id.slice(1));
    console.log('ORIGIN_IP: ', ORIGIN_IP + 1);
    const ORIGIN_CABLE = SERVER_CABLES[ORIGIN_IP];
    addPackToOriginCable(getPackFromInput(ORIGIN_IP));

    if (!ORIGIN_CABLE.isInDelivery) {
        ORIGIN_CABLE.deliverPackagesManagement();
        console.log("users", USERS);
        console.log("server cabels", SERVER_CABLES);
    }

}

function addPackToOriginCable(package) {
    SERVER_CABLES[package.originIP].packages.push(package);
    console.log('package.originIP: ', package.originIP + 1);
}

function getPackFromInput(originIP) {
    let message = document.getElementById("n" + originIP + "-message-input");
    let destinationIP = document.getElementById("n" + originIP + "-message-dest");
    let package = new Package(message.value, originIP, destinationIP.value);
    message.value = '';
    destinationIP.value = '';
    return package;
}
