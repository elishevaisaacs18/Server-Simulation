const SERVER_CABLES = [];
const USERS = [];
class User {
    constructor(IP) {
        this.IP = SERVER_CABLES.length;
        this.messages = [];
        SERVER_CABLES.push(new Cable([], this.IP));
    }
}
class Cable {
    constructor(packages, IPOrigin) {
        this.IPOrigin = IPOrigin;
        this.isInDelivery = false;
        this.packages = [];
    }

    deliverPackagesManagement() {
        this.isInDelivery = true;
        while (this.packages.length !== 0) {
            let pack = this.packages.shift();
            setTimeout(transferPackageToNextHand(this, pack), Math.floor(Math.random() * pack.message.length / 5))
        }
        this.isInDelivery = false
    }

}
class Package {
    constructor(message, originIP, destinationIP) {
        this.message = message;
        this.originIP = originIP;
        this.destinationIP = destinationIP;
    }
}

window.onload = () =>{
    addUsers(3);
}

function addUsers(num){
    for(let i = 0; i<=num; i++) {
        USERS.push(new User(i));
    }
}

function transferPackageToNextHand(cable, package) {
    if (package.ORIGIN_IP === cable.IPOrigin) {
        SERVER_CABLES[package.destinationIP].packages.push(package);
    }
    else {
        USERS[package.destinationIP].messages.push(package.message);
    }
}

document.getElementsByTagName("button").array.forEach(button => {
    button.addEventListener("click", sendPackage)
});


// anyway - addPackToCable;
//if is not delivering now - sendPackToDest()


function sendPackage(event) {
    const ORIGIN_IP = event.target.id;
    const ORIGIN_CABLE = SERVER_CABLES[ORIGIN_IP]
    addPackToOriginCable(getPackFromInput(ORIGIN_IP));
    if (!ORIGIN_CABLE.isInDelivery) {
        ORIGIN_CABLE.deliverPackagesManagement();
    }

}

function addPackToOriginCable(package) {
    SERVER_CABLES[originIP].messages.push(package);
}
function getPackFromInput(originIP) {
    let message = document.getElementById(originIP + "-message-input").value;
    let originIP = originIP;
    let destinationIP = document.getElementById(originIP + "-message-dest").value;
    return new Package(message, originIP, destinationIP);
}


// function getMessages() {
//     return 
// }