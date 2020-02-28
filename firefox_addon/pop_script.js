document.addEventListener('DOMContentLoaded',function(){
    var save=document.getElementById('save');
    var login=document.getElementById('login');
    var logout=document.getElementById('logout');
    // var edit=document.getElementById('edit');

    // edit.addEventListener('click',function(){
    //     document.getElementById('username').className="hide1";
    //     document.getElementById('password').className="hide1";
    // },false);

    browser.storage.local.get(null,function(data){
        if(data.username && data.password){
            // document.getElementById('username').className="hide";
            // document.getElementById('password').className="hide";
            document.getElementById('username').value=data.username;
            document.getElementById('password').value=data.password;
        }
    });

    save.addEventListener('click',function(){
        // alert('hey');
        var user=document.getElementById('username').value;
        var pass=document.getElementById('password').value;

        browser.storage.local.set({"username":user,"password":pass}).then(function(){
            console.log('Successfully Saved.');
        });
   

        // browser.storage.local.get(null,function(data){
        //     document.getElementById('check').innerHTML=data.username;
        // });

    });

    login.addEventListener('click',function(){
        browser.runtime.sendMessage({login:"login_do_it"});
    },false);

    logout.addEventListener('click',function(){
        browser.runtime.sendMessage({login:"logout_do_it"});
    },false);

    // browser.runtime.onMessage.addListener(function(request,sender,sendResponse){
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

    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        var loginn = request.login;
        console.log(loginn);
        if (loginn == "Successful") {
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
    

},false);