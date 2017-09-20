let app = new Vue({
  el: '#app',
  data: {
  	message: ""
  },
  watch: {
  	message: function(secretMessageRaw) {
  		let secretMessage = secretMessageRaw.split(' ');

			// create an array storing normal and special words
			let normal = ["age","ask","baby","base","beside","bright","business","buy","case","catch","caught","child","choose","circle","clear","color","copy","correct","couldn't","difference","direction","dried","easily","edge","egg","eight","energy","England","especially","Europe","exactly","except","explain","famous","farm","fell","figure","flat","fly","forest","free","French","fun","George","government","grass","grew","hair","happy", "as", "a", "it", "is", "to", "find", "rep", "lab", "marry", "tree", "love", "he's","heat","history","human","I've","inch","information","iron","Jim","Joe","King","larger","late","leg","length","listen","lost","lot","lower","machine","mark","maybe","measure","meet","middle","milk","minute","modern","moment","month","mouth","natural","nearly","necessary","New York","north","object","ocean","oil","pay","per","plan","plane","present","product","rather","reach","reason","record","running","seems","sent","seven","shape","sides","single","skin","sleep","smaller","soft","soil","south","speak","speed","spring","square","star","step","store","straight","strange","street","subject","suppose","teacher","thousand","thus","Tom","travel","trip","trouble","unit","village","wall","war","wasn't","week","whose","window","wish","women","won't","wood","wrote","yellow","you're","yourself"];
			let special = ["in", "on", "it", "now", "low", "top", "pit", "tar", "pin", "tain", "peel", "pool", "tool", "hard", "mile", "tile", "poke", "care", "pare", "wine", "lime", "pine", "cone", "wear", "hare", "weep", "leek", "teak", "peak", "tore", "pore", "cream", "trope", "hooke", "cribe", "toper", "litter" , "potter", "logger", "pitter", "pinner", "teamer", "topper"]; 

			// init canvas
			let c=document.getElementById("stereogram");
			let ctx=c.getContext("2d");
			ctx.clearRect(0 , 0, window.innerWidth, window.innerHeight);
			ctx.fillStyle = "white";
			ctx.fillRect(0, 0, 840, 840);
			ctx.fillStyle = "black";
			ctx.font="22px Monospace";

			function getRandomIntInclusive(min, max) {
			  min = Math.ceil(min);
			  max = Math.floor(max);
			  return Math.floor(Math.random() * (max - min + 1)) + min; 
			}

			// create a function to get a random word from an array
			let getWord = function(numCharacters, words=normal) {
				let word = words[getRandomIntInclusive(0, words.length - 1)]; 
				while ( word.length != numCharacters ) {
					word = words[getRandomIntInclusive(0, words.length - 1)];  
				}

				return word
			}

			// create a function that returns a line of normal text
			let createText = function(){
				let line = "";
				for (let i=0; i<3; i++) {
					if (i == 2 && line.length > 1) {
						let charactersRemaining = 15 - line.length;
						line = line + getWord(charactersRemaining) + " ";
					} else {
						line = line + getWord(getRandomIntInclusive(2, 6)) + " ";
					}
				}

				return line.repeat(6);
			}

			// create a function that returns a line with hidden message
			// words with different characters require a different word surrounding it
			// this must be hard coded 
			let createSecret = function(secret) {
				
				let word1;
				let word3;
				// depending on the length of each secret word, generate the other two words that will
				// satisfy the illusion
				switch (secret.length) {
					case (1): 
						word1 = getWord(6, special);
						word3 = getWord(5, special);
						break;
					case (2):
						word1 = getWord(5, special);
						word3 = getWord(5, special);
						break;
					case (3):
						word1 = getWord(4, special);
						word3 = getWord(5, special);
						break;
					case (4):
						word1 = getWord(4, special);
					  word3 = getWord(4, special);
					  break;
					case (5):
						word1 = getWord(4, special);
					  word3 = getWord(3, special);
					  break;
					case (6):
						word1 = getWord(3, special);
					  word3 = getWord(3, special);
					  break;
					case (7):
						word1 = getWord(3, special);
					  word3 = getWord(2, special);
					  break;
					case (8):
						word1 = getWord(2, special);
					  word3 = getWord(2, special);
					  break;
					case (9):
						word1 = getWord(2, special);
						word3 = "i";
						break;
					case (10):
						word1 = "i";
						word3 = "a";
						break;
					default:
						word1 = "";
						word2 = "";
						break;
				}

				// create 2 lines where the second line has an offset of 1 char
				let line1 = word1 + "s " + secret + " " + word3 + " ";
				let line2 = word1 + " " + secret + " s" + word3 + " ";

				line = line1.repeat(2) + line2.repeat(4);
				
				return line
			}

			// create a function to draw the stereogram
			let drawStereogram = function(message, startPos = 15) {
				let endPos = startPos + message.length;
				for (let i=1; i<40; i++) {
					if ( startPos < i && i <= endPos ) {
						let secretWord = message.shift();
						ctx.fillText(createSecret(secretWord), getRandomIntInclusive(-40, 0), 22*i);
					} else {
						ctx.fillText(createText(), getRandomIntInclusive(-40, 0), 22*i);
					}
				}
			}

			drawStereogram(secretMessage);
  	}
  }
  ,
  methods: {
  	downloadStereogram() {
  		var canvas = document.getElementById("stereogram");
  		var img    = canvas.toDataURL();
    	this.$refs.download.href = img;
    	this.$refs.download.download = "hidden-message-stereogram.png";
  	}
  }
})




