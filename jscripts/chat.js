

document.addEventListener(`DOMContentLoaded`, function() {
	
    const socket = io();
	
	
	function genlog(info,color){
		
	let el = document.getElementById(`log`);
	let span = document.createElement('span')
		span.innerHTML = ` |${info}| `;
		span.style.color = color || `white`;
		el.appendChild(span);
	}
	/*
	socket.on(`message`,function(text){
		
		
		
		
		
	})
		
		
	function createMessage(){
		
		
		
	}
	
	*/
	
	socket.on(`MessageToClient`,function(x){
		let chat = document.getElementById(`chat`);
		chat.innerHTML += `${x.id}: ${x.msg}<br>`;
		
	});
	
	
	
	
	socket.on(`isJoin`,function(x){
		
		if(x.connected===true){
		site.connected = true;
		genlog(`Connected uwu`,`lightgreen`);
		console.log(x);
		
		let users = document.getElementById(`users`);
		users.innerHTML = ``;
		
		
		x.users.forEach((e,i)=>{
			
			users.innerHTML += `(${i+1})${e.name} `;
			
		});
		
		}
		
		else {
		site.connected = false;
		genlog(`Kicked by Server`,`red`);
		}
		
		
		
	})
	
	function getData(){
		
		let newObject = {};
		
		newObject.name = document.getElementById(`name`).value;
		newObject.desc = document.getElementById(`desc`).value;
		
		
		return newObject;
		
	}
	
	
	
	const site = {
				isUsable: true,
				connected:false
				}
	

	
	let startButton = document.getElementById(`join`);
	let sendinfo = function () {
		
		
		
		if(site.isUsable === true) {
		site.isUsable = false;
		genlog(`Send info to server`);
		socket.emit(`getInfo`,getData());
		startButton.removeEventListener(`click`, sendinfo);
		document.getElementById(`tempdiv`).remove();
		
		
		}

		
	}
	
	
	startButton.addEventListener(`click`, sendinfo);
	
	
	let sendButton = document.getElementById(`send`);
	let Sendingmsg = function () {
		
		
		let msg = document.getElementById(`type`);
		
		socket.emit(`MessageToSever`,msg.value);
		msg.innerHTML=``;
		genlog(
		`msg was sent`,`yellow`);
		
		};

		
	
	
	
	sendButton.addEventListener(`click`, Sendingmsg);
	
	
	
  });
  
  
