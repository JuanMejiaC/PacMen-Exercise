
    var pos = 0;
    var cicles = 0;
    var timer = null;
    const pacArray = [
        ['./assets/pacMan1.png', './assets/pacMan2.png'],
        ['./assets/PacMan3.png', './assets/pacMan4.png']
    ];
    var direction = 0;
    const pacMen = []; // This array holds all the pacmen
    function setToRandom(scale) {
        return {
            x: Math.random() * scale,
            y: Math.random() * scale
        }
    }
    // Factory to make a PacMan at a random position with random velocity
    function makePac() {
        // returns an object with random values scaled {x: 33, y: 21}
        let velocity = setToRandom(10); // {x:?, y:?}
        let position = setToRandom(200);
        let game = document.getElementById('game');
        let newimg = document.createElement('img');
        newimg.addEventListener("mousedown",stopAnimation);
        newimg.addEventListener("mouseup",update);
        newimg.style.position = 'absolute';
        newimg.src = './assets/PacMan1.png';
        newimg.width = "100";
        //
        // set position here 
        newimg.style.left = position.x + "px";
        newimg.style.top = position.y + "px";
        //

        // add new Child image to game
        game.appendChild(newimg);
        // return details in an object
        return {
            position,
            velocity,
            newimg,
            mouth: 1
        }
    }

    function update() {
        //loop over pacmen array and move each one and move image in DOM
        pacMen.forEach((item) => {
            checkCollisions(item);
            //opens and closes pacman's mouth every 25 calls
            if(cicles == 25){
                checkMouth(item);
                if(Math.floor(Math.random()*20) + 1 == 10)//change the image to pac-thumb-up randomly
                    item.newimg.src = "./assets/pac-thumb-up.png"
                cicles = 0;
            }
            else cicles += 1;
            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;
            item.newimg.style.left = item.position.x + "px";
            item.newimg.style.top = item.position.y + "px";
        })
        timer = setTimeout(update, 20);
    }

    function stopAnimation(image){
        let properSrc = image.target.src;
        if(properSrc.includes("thumb-up"))
        {
            clearTimeout(timer);
        }
    }
    
    function checkMouth(item){
        //const date = new Date();
        if(item.velocity.x<0){
            if(item.mouth == 1){
                item.newimg.src="./assets/pacMan4.png";
                item.mouth = 0;
            }else{
                item.newimg.src="./assets/pacMan3.png";
                item.mouth = 1;
            }
        }else{
            if(item.mouth == 1){
                item.newimg.src="./assets/pacMan2.png";
                item.mouth = 0;
            }else{
                item.newimg.src="./assets/pacMan1.png";
                item.mouth = 1;
            }
        }
    }

    function checkDirection(item){
        if(item.velocity.x<0)item.newimg.src="./assets/pacMan3.png"
        else item.newimg.src="./assets/pacMan1.png"
    }

    function checkCollisions(item) {
        //
        // detect collision with all walls and make pacman bounce
        //
        if(item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
            item.position.x + item.velocity.x < 0){
                item.velocity.x = -item.velocity.x;
                checkDirection(item);
            }
        if(item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
            item.position.y + item.velocity.y < 0){
                item.velocity.y = -item.velocity.y;
                checkDirection(item);
            }
    }

    function makeOne() {
        pacMen.push(makePac()); // add a new PacMan
    }