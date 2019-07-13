var express =require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");
var sanitizeHtml = require('sanitize-html');

app.use('/js',express.static(path.join(__dirname, 'jscripts')));
app.use('/assets',express.static(path.join(__dirname, 'assets')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

let rooms = [];

function User(id,user){
	
	
	this.name = user.name;
	this.id = id;

}


function Room(){
	
	
	this.full = false;
	this.id = `${Date.now()}&${Math.random()}|ID`;
	this.users = []; // add put user method
	this.online = true;
	
	
}

Room.prototype.pushUser = function (user) {
	
	// here testing input data
	
	this.users.push(user)
	
	console.log(`Pomyslnie dodano uzytkownika do tablicy`)
	
}


function fitUser(user){
	
	
	
	
	let searchRoom = rooms.find((e)=>{return e.full == false;});
	
	if( searchRoom == undefined){
		
		let newRoom = new Room()
		
		console.log(`nie bylo pokoju wiec go stworzylem`);
		
		newRoom.pushUser(user);
		
		rooms.push(newRoom);
		
		return newRoom;
		
	}
	
	else {
		
		console.log(`byl pokoj wiec dodalem wowa`);
		searchRoom.pushUser(user);
		searchRoom.full = true;
		
		return searchRoom;
	}
	
}


io.on('connection', function(socket){

 const user = {
				data:null,
				room:null,
				connected:false
				
				};
				
				
 socket.on(`MessageToSever`,function(msg){
	 
	
 if (user.connected===true && typeof msg == `string`){
	 
	 
	 
	 console.log(msg)
	 
	 msg = sanitizeHtml(msg);
	 
	 user.room.users.forEach((e)=>{
		 
		 io.to(e.id).emit('MessageToClient', {id:user.data.name,msg:msg});
		 
	 })
	 
	 
	 
	 
 }
 
 else{
	 socket.emit(`isJoin`,{connected:false,users:null});	
 }	
 });

				
 socket.on(`getInfo`,function(client){
	 
	 
	 if(user.room === null){
	 user.data = new User(socket.id,client);
	 
	 user.room = fitUser(user.data);
	 
	 socket.emit(`isJoin`,{connected:true,users:user.room.users});
	 user.connected= true;
	 
	 }
	 
	 else {
	socket.emit(`isJoin`,{connected:false,users:null});
	console.log(`twoje dane juz dotarly ^^`);
		 
	 }
	 
	 
	 
	 console.log(user.room);
	 console.log(rooms);
	 
 });

	
	

	
	
});



http.listen(3000, function(){
  console.log('listening on *:3000 uwu');
});