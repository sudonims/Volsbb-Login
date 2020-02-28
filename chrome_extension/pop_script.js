document.addEventListener('DOMContentLoaded',function(){
    var save=document.getElementById('save');
    var login=document.getElementById('login');
    var logout=document.getElementById('logout');
    // var edit=document.getElementById('edit');

    // edit.addEventListener('click',function(){
    //     document.getElementById('username').className="hide1";
    //     document.getElementById('password').className="hide1";
    // },false);

    // chrome.storage.sync.get(null,function(data){
    //     if(data.username && data.password){
    //         document.getElementById('username').className="hide";
    //         document.getElementById('password').className="hide";
    //     }
    // });

    save.addEventListener('click',function(){
        var user=document.getElementById('username').value;  
        var pass=document.getElementById('password').value;

        chrome.storage.sync.set({"username":user,"password":pass},function(){
            alert("Saved successfully");
        });
   

        // chrome.storage.sync.get(null,function(data){
        //     document.getElementById('check').innerHTML=data.username;
        // });

    });

    login.addEventListener('click',function(){
        chrome.runtime.sendMessage({login:"login_do_it"});
    },false);

    logout.addEventListener('click',function(){
        chrome.runtime.sendMessage({login:"logout_do_it"});
    },false);


    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        var loginn = request.login;
        if (loginn == "Successful") {
            chrome.notifications.create("login_success", {
                "type": "basic",
                "iconUrl": "LogoMakr_1TxqbI1.png",
                "title": "Logged In",
                "message": "Successfully Logged In"
            });
            // alert('Succesfully Logged in');
        }
        else if (loginn == "Already logged in") {
            chrome.notifications.create("login_already", {
                "type": "basic",
                "title": "Session Present",
                "iconUrl": "LogoMakr_1TxqbI1.png",
                "message": "Already Logged In"
            });
            // alert('Already Logged in');
        }
        else if (loginn == "Wrong credentials") {
            chrome.notifications.create("login_wrng", {
                "type": "basic",
                "title": "Wrong",
                "iconUrl": "LogoMakr_1TxqbI1.png",
                "message": "Wrong Credentials"
                });
                // alert('Check Username or Password');
        }
        else if (loginn == "logout_success") {
            chrome.notifications.create("logout_success", {
                "type": "basic",
                "title": "logged out",
                "iconUrl": "LogoMakr_1TxqbI1.png",
                "message": "Logged Out Successfully"
            });
            // alert('Succesfully Logged out');
        }
        else if (loginn == "logout_No_Session") {
            chrome.notifications.create("no_session", {
                "type": "basic",
                "title": "No Session",
                "iconUrl": "LogoMakr_1TxqbI1.png",
                "message": "No Session Active to Logout"
            });
            // alert('No session to logout');
        }
    });
    // chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    //     if(request.login=="Successful"){
    //         alert('Logged in successfully');
    //     }
    //     else if(request.login=="Already logged in"){
    //         alert('Already logged in');
    //     }
    //     else if(request.login=="Wrong credentials"){
    //         alert('Username or Password is wrong');
    //     }
    //     else if(request.logout=="success"){
    //         alert('Successfully logged out');
    //     }
    //     else if(request.logout=="No Session Active"){
    //         alert("No session active");
    //     }
    // });

},false);