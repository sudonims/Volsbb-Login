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
        chrome.runtime.sendMessage({login:"Do it"});
    },false);

    logout.addEventListener('click',function(){
        chrome.runtime.sendMessage({logout:"Do it"});
    },false);

    chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
        if(request.login=="Successful"){
            alert('Logged in successfully');
        }
        else if(request.login=="Already logged in"){
            alert('Already logged in');
        }
        else if(request.login=="Wrong credentials"){
            alert('Username or Password is wrong');
        }
        else if(request.logout=="success"){
            alert('Successfully logged out');
        }
        else if(request.logout=="No Session Active"){
            alert("No session active");
        }
    });

},false);