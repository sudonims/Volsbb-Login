var xhr = new XMLHttpRequest();

browser.runtime.onStartup.addListener(function () {
    login();
});

const login = () => {
    browser.storage.local.get(null, (data) => {
        var user = data.username;
        var pass = data.password;
        xhr.open("POST", "http://phc.prontonetworks.com/cgi-bin/authlogin", true);
        xhr.setRequestHeader('content-Type', 'application/x-www-form-urlencoded')
        var post_params = "userId=" + user + "&password=" + pass + "&serviceName=ProntoAuthentication&Submit22=Login"
        xhr.send(post_params);
        // console.log(xhr.responseText);
        xhr.onreadystatechange = function () {
            var response = xhr.responseText;
            var login_success = new RegExp("Congratulations !!!");
            var login_already = new RegExp("You are already logged in");
            var login_wrong = new RegExp("Sorry, please check your username and password and try again.");

            if (login_success.test(response)) {
                console.log("Successfully logged in");
                browser.runtime.sendMessage({ login: "Successful" });
                // message();
            }
            else if (login_already.test(response)) {
                console.log("Already logged in");
                browser.runtime.sendMessage({ login: "Already logged in" });
                // message();
            }
            else if (login_wrong.test(response)) {
                console.log("Wrong Password");
                browser.runtime.sendMessage({ login: "Wrong credentials" });
                // message();
            }
        }

    //     fetch("http://phc.prontonetworks.com/cgi-bin/authlogin",{
    //         "headers":{
    //             "content-Type" : "application/x-www-form-urlencoded"
    //         },
    //         "body" : {
    //             "userId" : user,
    //             "password" : pass,
    //             "serviceName" : "ProntoAuthentication",
    //             "Submit22" : "Login"
    //         },
    //         "method" : "POST"
    //     }).then((response)=>{
    //         return response;
    //     }).then((data)=>{
    //         console.log(data);
    //     }).catch((err)=>{
    //         console.log('err',err);
    //     });
    });
}

const logout = () => {
    xhr.open('GET', 'http://phc.prontonetworks.com/cgi-bin/authlogout', true);
    xhr.send();
    xhr.onreadystatechange = () => {
        var logout_success = new RegExp("You have successfully logged out");
        var no_session = new RegExp("There is no active session to logout.");
        var response = xhr.responseText;
        if (logout_success.test(response)) {
            browser.runtime.sendMessage({ login: "logout_success" });
            console.log('success');
            // message();
            // alert("Logged out");
        }
        else if (no_session.test(response)) {
            browser.runtime.sendMessage({ login: "logout_No_Session" })
            console.log('No session active');
            // message();
        }
    }
}


browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    var loginn = request.login;
    console.log(loginn);
    if (loginn == "login_do_it") {
        login();
    }
    else if (loginn == "Successful") {
        browser.notifications.create("login_success", {
            "type": "basic",
            // "iconUrl": browser.runtime.getURL("icons/cake-96.png"),
            "title": "Logged In",
            "message": "Successfully Logged In"
        });
    }
    else if (loginn == "Already logged in") {
        browser.notifications.create("login_already", {
            "type": "basic",
            "title": "Session Present",
            "message": "Already Logged In"
        });
    }
    else if (loginn == "Wrong credentials") {
        browser.notifications.create("login_wrng", {
            "type": "basic",
            "title": "Wrong",
            "message": "Wrong Credentials",

        });
    }
    else if (loginn == "logout_do_it") {
        logout();
    }
    else if (loginn == "logout_success") {
        browser.notifications.create("logout_success", {
            "type": "basic",
            "title": "logged out",
            "message": "Logged Out Successfully"
        });
    }
    else if (loginn == "logout_No_Session") {
        browser.notifications.create("no_session", {
            "type": "basic",
            "title": "No Session",
            "message": "No Session Active to Logout"
        });
    }
});

