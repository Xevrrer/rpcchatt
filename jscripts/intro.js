

document.addEventListener(`DOMContentLoaded`, function() {
	
    const socket = io();
	
	
	const site = {
				isUsable: true,
				scrollFX: new smoothScroll(window),
				playerData: new getPlayerData()
				}
	
	

	
	
	 

	
	
	let startButton = document.getElementById(`join`);
	let sendinfo = function () {
		
	
		
		if(site.isUsable === true) {
		site.isUsable = false;
		socket.emit(`getInfo`,site.playerData);
		startButton.removeEventListener(`click`, sendinfo);
		
		}

		
	}
	
	
	startButton.addEventListener(`click`, sendinfo);
	
	
	
  });
  
function getPlayerData(){
	
	// here value for this from input
	
}
  
function smoothScroll(e){
	
	
	this.headerDOM = document.getElementById(`video`);
	this.isMove = false;
	this.element = e;

	this.detect =  () =>{
		
			
			if(this.element.pageYOffset > 0 && this.isMove === false){
				
				this.element.scroll({ 
									top: this.headerDOM.offsetWidth, 
									behavior: 'smooth' 
									})
									
				this.isMove = true;
				this.element.removeEventListener(`scroll`,this.detect);
			}
		
	}
	
	this.element.addEventListener(`scroll`,this.detect);
		
}



