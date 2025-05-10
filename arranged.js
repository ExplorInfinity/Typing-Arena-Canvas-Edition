class InputHandler {
    constructor(handler){
        this.handler = handler;
        this.validKeys = [...'abcdefghijklmnopqrstuvwxyz.,<>/?:;][{}+=-_1234567890`~!@#$%^&*()'.split(""), 'Space', "'", '"'];
        this.lastKey;
        this.addedKeys = [];
        this.keyPressed = false;
        this.inputViewer = document.getElementById('inputViewer');
        this.refresher = document.getElementById('refresh');
        this.inputViewer.textContent = 'Start';
        this.refresher.textContent = 'Refresh';
        this.refresher.addEventListener('click', () => {
            if(!this.handler.start || this.handler.finished) this.handler.newParagraph();
        })

        window.addEventListener('keydown', e => {
            const key = e.key === ' ' ? 'Space' : e.key.toLowerCase();

            if (this.lastKey !== key) this.keyPressed = false;
            
            if (
                !this.keyPressed &&
                this.validKeys.includes(key) &&
                !e.ctrlKey && !e.altKey &&
                !this.handler.finished
            ){
                if (!this.handler.start) {
                    this.handler.start = true;
                    this.refresherStyle(true);
                }
                this.lastKey = e.key;
                this.addedKeys.push(e.key);
                this.inputViewer.textContent = e.key === ' ' ? 'Space': e.key;
                this.handler.validateInput(e.key);
                this.keyPressed = true;
            }

        })

        window.addEventListener('keyup', e => {
            if (e.key === this.lastKey) {
                this.keyPressed = false;
            }
        })

    }

    refresherStyle(disable) {
        if (disable) {
            this.refresher.style.cursor = 'default';
            this.refresher.style.opacity = '0.3';
            this.refresher.style.boxShadow = '0 0 0 black';
        }
        else {
            this.refresher.style.cursor = 'pointer';
            this.refresher.style.opacity = '1';
            this.refresher.style.boxShadow = '0 0 2px black';
        }

    }
}

class TextHandler {
    constructor(handler){
        this.handler = handler;
        this.paragraphs = [
            "The quick brown fox jumps over the lazy dog. This sentence is often used as a typing exercise because it contains every letter of the English alphabet.",
            "In the heart of the city, the clock tower stood tall, its hands frozen in time. People passed by, unaware of the history that lingered within its walls.",
            "Technology has revolutionized the way we live and work, making the world more connected than ever before. However, it has also raised new challenges, particularly in terms of privacy and security.",
            "On a rainy afternoon, Sarah found herself lost in a book, the world around her fading into the background. The words on the page transported her to distant lands and times long past.",
            "The art of conversation is slowly fading in the digital age, as more and more people turn to texting and social media to communicate. Despite the convenience, something is lost in translation.",
            "In the garden, flowers bloomed in a riot of colors, each petal a masterpiece of nature. The fragrance filled the air, creating a tranquil escape from the hustle and bustle of daily life.",
            "Education is the cornerstone of a successful society, providing individuals with the knowledge and skills they need to thrive. Yet, access to quality education remains a challenge in many parts of the world.",
            "The stars above twinkled like diamonds in the night sky, a reminder of the vastness of the universe and our place within it. Gazing up, one couldn't help but feel a sense of wonder and awe.",
            "The ocean waves crashed against the shore, their rhythmic sound a soothing lullaby to those who listened. The endless horizon seemed to promise adventure and discovery beyond the edge of the known world.",
            "In the quiet of the early morning, the world seemed to hold its breath, as if waiting for the day to unfold. The first rays of sunlight painted the sky in shades of pink and gold, a new beginning.",
            "Friendship is a bond that transcends time and distance, offering support and companionship through the ups and downs of life. True friends are like anchors, keeping us grounded when the seas of life get rough.",
            "The sound of laughter filled the room, as stories were shared and memories were made. In moments like these, one is reminded of the simple joys of life and the importance of connection.",
            "In a small village nestled between the mountains, life moved at a slower pace. The villagers knew each other by name, and their days were marked by the changing seasons and the cycles of the land.",
            "The innovation of the 21st century has brought forth incredible advancements, yet it has also sparked debates about the ethical implications of technology. As we move forward, it's crucial to consider the impact on future generations.",
            "Art and culture are the lifeblood of any society, reflecting its values, history, and aspirations. Through art, we can explore the depths of human emotion and experience in ways that words alone cannot capture.",
            "In the hustle and bustle of modern life, it's easy to forget the importance of taking a moment to pause and reflect. Mindfulness practices encourage us to be present in the moment, fostering a sense of peace and well-being.",
            "The journey of self-discovery is one that many embark on, seeking to understand their purpose and place in the world. Along the way, they encounter challenges that test their resolve and shape their character.",
            "Climate change is one of the most pressing issues of our time, with far-reaching consequences for both the environment and human society. It calls for urgent action to mitigate its effects and build a sustainable future.",
            "In the world of literature, a well-crafted story can transport readers to distant lands, introduce them to unforgettable characters, and leave a lasting impact. The power of storytelling lies in its ability to connect with people on a deep, emotional level.",
            "In a fast-paced world, the value of patience is often overlooked. Yet, it's through patience that we can achieve lasting success, build strong relationships, and navigate the complexities of life with grace.",
            "The forest was alive with the sound of chirping birds and rustling leaves. Sunlight filtered through the canopy, creating patterns of light and shadow on the forest floor.",
            "In the stillness of the night, the sound of a distant train could be heard. It was a lonely sound, yet comforting in its familiarity.",
            "The smell of freshly baked bread wafted through the air, drawing people to the small bakery on the corner. Inside, the warmth of the oven and the sight of golden loaves created a sense of homeliness.",
            "A good book is a friend that never lets you down. It offers comfort, wisdom, and an escape from the realities of life.",
            "The mountains stood tall and majestic, their peaks covered in snow. They were a testament to the power and beauty of nature.",
            "In a world full of noise, sometimes the best thing you can do is be silent. Silence has a way of speaking volumes.",
            "The first snowfall of the year brought with it a sense of wonder. Children ran outside to catch snowflakes on their tongues, while adults marveled at the beauty of the snow-covered landscape.",
            "Music has the power to transport us to different times and places. A single note can evoke memories and emotions long forgotten.",
            "The old house at the end of the street was rumored to be haunted. Though no one had ever seen a ghost, the stories persisted, passed down through generations.",
            "Cooking is an art form that brings people together. Whether it's a family meal or a festive feast, food has a way of creating bonds and making memories.",
            "The desert stretched out before them, an endless sea of sand. The heat was intense, but there was a certain beauty in the starkness of the landscape.",
            "In the midst of chaos, there is often a hidden order. It's up to us to find it and make sense of the world around us.",
            "The city skyline was a mix of old and new, with historic buildings standing side by side with modern skyscrapers. It was a place where the past and the present coexisted in harmony.",
            "Traveling opens our eyes to the diversity of the world. It allows us to experience different cultures, meet new people, and gain a deeper understanding of ourselves and others.",
            "The library was a sanctuary of knowledge. Rows upon rows of books offered endless possibilities for learning and exploration.",
            "The wind howled through the trees, a reminder of the power of nature. Yet, there was something soothing about its sound, like a lullaby for the earth.",
            "Every sunset is unique, painting the sky in shades of orange, pink, and purple. It's a daily reminder that beauty can be found in the simplest of moments.",
            "A smile is a universal language that transcends cultural barriers. It has the power to brighten someone's day and make the world a little bit better.",
            "In the vastness of the ocean, one feels both insignificant and connected to something greater. The waves, ever-moving, are a metaphor for the ebb and flow of life.",
            "The beauty of a garden lies in its imperfections. No two flowers are exactly alike, and it's the variety that makes it special.",
            "The city never slept. Lights flickered in the windows of high-rise buildings, and the streets buzzed with activity, even in the early hours of the morning.",
            "In the digital age, information is at our fingertips. But with so much data available, it's important to discern what's true and what's not.",
            "The sound of raindrops on the roof was a comforting melody, a reminder that even in the storm, there is peace.",
            "A good conversation can change your perspective on life. It opens your mind to new ideas and challenges your way of thinking.",
            "In the solitude of the mountains, one finds clarity. The air is crisp, the silence profound, and the mind is free to wander.",
            "The thrill of adventure lies in the unknown. It's about stepping out of your comfort zone and embracing the unexpected.",
            "The bond between siblings is a special one. They are the people who know you best, who share your history, and who will always be there for you.",
            "In the heart of the forest, there is a place where time stands still. The trees, ancient and wise, have witnessed the passage of centuries.",
            "The simple act of kindness can have a ripple effect, spreading positivity and goodwill far beyond the initial gesture.",
            "The night sky was a canvas of stars, each one a distant sun in a galaxy far away. It was a reminder of the vastness of the universe and the endless possibilities that lie beyond our world.",
            "In the midst of a bustling city, there are pockets of tranquility. A quiet park, a hidden garden, a peaceful bench-these are the places where one can find solace.",
            "The first step towards change is often the hardest. But with courage and determination, anything is possible.",
            "The joy of creation lies in the process. Whether it's writing a story, painting a picture, or building something with your hands, the act of creating is its own reward.",
            "In the stillness of the morning, there is a sense of possibility. The day is new, and with it comes the chance to start fresh.",
            "The bond between a pet and its owner is one of unconditional love. It's a relationship built on trust, companionship, and mutual affection.",
            "The beauty of the natural world is a reminder that there is something greater than ourselves. It's a source of inspiration, wonder, and peace.",
            "In the chaos of life, it's important to find moments of stillness. These are the times when we can reflect, recharge, and find our inner balance.",
            "The power of words is immense. They can inspire, comfort, and heal. But they can also hurt, deceive, and destroy. It's up to us to use them wisely.",
            "In the simplicity of a child’s laughter, there is pure joy. It's a reminder that happiness can be found in the smallest of things.",
            "The changing seasons are a metaphor for life. Each one brings its own challenges and beauty, reminding us of the cyclical nature of existence.",
            "The smell of fresh coffee in the morning is a small pleasure that many look forward to. It's a moment of comfort and routine that starts the day off right.",
            "A well-told story has the power to captivate an audience. It can transport them to another time and place, making them feel a part of something larger.",
            "The quiet of a snow-covered landscape is a unique kind of peace. The world is hushed, as if holding its breath, and the beauty of the moment is breathtaking.",
            "In the company of friends, even the most ordinary moments become extraordinary. It's the shared experiences that create memories that last a lifetime.",
            "The joy of learning is a lifelong pursuit. It's about staying curious, asking questions, and seeking to understand the world around us.",
            "The beauty of art lies in its ability to evoke emotion. Whether it's a painting, a piece of music, or a sculpture, art has the power to move us in ways that words cannot.",
            "The smell of rain on dry earth is a scent that many find comforting. It's a reminder of the cycles of nature and the renewal that comes with each downpour.",
            "In the stillness of the night, when the world is asleep, there is a sense of peace that is hard to find at any other time. It's a time for reflection, for dreaming, and for finding oneself.",
            "The bond between parent and child is one of the strongest in the world. It's a relationship built on love, trust, and a deep connection that lasts a lifetime.",
            "In the heart of every city, there is a story waiting to be told. It's a story of the people who live there, of the history that has shaped it, and of the dreams that are yet to be realized.",
            "The beauty of nature is a constant source of inspiration. From the majesty of the mountains to the tranquility of the ocean, there is always something to marvel at.",
            "In the quiet moments of life, we often find the answers we seek. It's in these moments that we can hear our inner voice and find the clarity we need to move forward.",
            "The power of music lies in its ability to connect us with our emotions. It can lift our spirits, soothe our souls, and bring us together in ways that few other things can.",
            "The joy of discovery is one of the greatest pleasures in life. Whether it's finding a new place, learning something new, or meeting someone new, discovery is what keeps life exciting.",
            "The warmth of the sun on your face, the sound of the waves crashing on the shore, the smell of salt in the air-these are the simple pleasures that make life worth living.",
            "In the chaos of the world, it's important to find moments of calm. Whether it's through meditation, a walk in nature, or simply taking a deep breath, these moments help us stay grounded.",
            "The bond between humans and animals is a special one. It's a relationship built on mutual respect, trust, and a deep connection that transcends words.",
            "In the beauty of a sunset, there is a reminder that all things must come to an end. But with every ending comes the promise of a new beginning.",
            "The thrill of adventure is what keeps life exciting. Whether it's exploring a new place, trying something new, or pushing yourself to the limit, adventure is what makes life worth living.",
            "The quiet of a winter's night is a time for reflection. The world is still, and in that stillness, we can find the answers we seek.",
            "In the midst of a storm, there is often a calm that follows. It's a reminder that no matter how chaotic life may get, peace is always just around the corner.",
            "The joy of giving is one of the greatest pleasures in life. Whether it's giving your time, your love, or a gift, the act of giving brings happiness to both the giver and the receiver.",
            "The beauty of life lies in its unpredictability. It's the unexpected moments, the surprises, and the twists and turns that make life truly exciting.",
            "In the company of loved ones, even the most ordinary moments become extraordinary. It's the shared experiences that create memories that last a lifetime.",
            "The power of hope is immense. It gives us the strength to keep going, even when times are tough. It's the light at the end of the tunnel, the promise of better days ahead.",
            "The beauty of the natural world is a reminder that we are all connected. It's a source of inspiration, wonder, and peace that we should cherish and protect."
          ];
          this.loadSentence();
    }

    loadSentence() {
        const randomIndex = Math.floor(Math.random() * this.paragraphs.length);
        this.handler.paragraph = this.paragraphs[randomIndex];
    }
}

class Handler {
    constructor(canvas, context, canvas2, context2) {
        // Load Canvas
        this.canvas = canvas;
        this.context = context;
        this.canvas2 = canvas2;
        this.context2 = context2;
        this.fontSize = 25;
        this.textHeight = 35;
        this.minCanvasHeight = 250;
        this.maxCanvasHeight = 275;
        this.aspectRatio = 1 / 3;
        this.loadCanvasSettings();

        // Input Handler
        this.inputHandler = new InputHandler(this);
        this.inputViewer = this.inputHandler.inputViewer;
        this.refresher = this.inputHandler.refresher;

        // Paragraph Importer
        this.textHandler = new TextHandler(this);
        this.paragraph = '';
        this.textHandler.loadSentence();
        this.wordArray = this.paragraph.split(' ');
        this.letterArray = this.paragraph.split('');

        // Start and Finish
        this.start = false;
        this.finished = false;

        // Track Active Lines
        this.trackLetterArray = []
        this.trackLine = 0;

        // Paragrapgh to different lines
        this.maxParaWidth = this.canvas.width*0.9;
        this.paraLines = 0;
        this.paraHeight = 0;
        this.paraLinesArray = [];
        this.convertToArray();

        // Typing Cursor
        this.cursorArray = [];
        this.cursorLine = 0;
        this.cursorOffset = 4;
        this.createCursorArray();

        // Input Types
        this.typedIndex = 0;
        this.correctInputs = this.letterArray.length;
        this.incorrectInputs = 0;
        this.numberOfSpaces = 0;

        // Paragraph Settings
        this.paraOffset = this.textHeight*0.5;

        // Timer Settings
        this.timer = 0;
        this.speedTimer = 0;
        this.fps = 1;
        this.speedInterval = 1000 / this.fps;

        // Progress Settings
        this.grossSpeed = 0;

        this.loadCanvas();
        this.loadCanvas2();

        // Responsiveness
        window.addEventListener('resize', e => {
            this.loadCanvasSettings();
            if (!this.finished) this.resize();
            this.loadCanvas();
            this.loadCanvas2();
        })
    }

    loadCanvasSettings(){
        const width = window.innerWidth - 60;
        let height = width * this.aspectRatio;
        if (height < this.minCanvasHeight) height = this.minCanvasHeight;
        else if (height > this.maxCanvasHeight) height = this.maxCanvasHeight;
        this.canvas.width = width;
        this.canvas.height = height;
        this.context.font = `${this.fontSize}px monospace`;
        this.context.textAlign = 'left';
        this.context.textBaseline = 'middle';
        this.canvas2.width = width;
        this.canvas2.height = height;
        this.context2.font = '20px monospace';
    }

    convertToArray(){
        this.paraLinesArray = [];
        let line = '';
        let lineCounter = 0;

        for (let i = 0; i < this.wordArray.length; i++) {
            let testline;
            if (i < this.wordArray.length-1) testline = line + this.wordArray[i] + ' ';
            else testline = line + this.wordArray[i];

            if (this.context.measureText(testline).width <= this.maxParaWidth) {
                line = testline;
            }
            else {
                line = this.wordArray[i] + ' ';
                lineCounter++;
            }

            this.paraLinesArray[lineCounter] = line;
        }

        
        if (!this.start) this.trackLetterArray = [[], [], [...this.paraLinesArray[0]]];
        this.paraLines = this.paraLinesArray.length;
        this.paraHeight = this.paraLines * this.textHeight;
        this.paraLinesArray[this.paraLines-1] = this.paraLinesArray[this.paraLines-1].trim();
    }

    createCursorArray(cursorIndex = 0){
        this.cursorArray = [];
        for (let i = 0; i < this.paraLinesArray[this.trackLine].length; i++) {
            if (i === cursorIndex) {
                this.cursorArray.push('_');
            }
            else {
                this.cursorArray.push(' ');
            }
        }
    }

    loadCanvas(){
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        if (!this.finished) {

            const typedWidth = this.context.measureText(this.trackLetterArray[0].join('')).width;
            const errorWidth = this.context.measureText(this.trackLetterArray[1].join('')).width;
            const pendingWidth = this.context.measureText(this.trackLetterArray[2].join('')).width;
            const totalWidth = typedWidth + errorWidth + pendingWidth;

            const x1 = (this.canvas.width - totalWidth) * 0.5;
            const x2 = x1 + typedWidth;
            const x3 = x2 + errorWidth;

            const y = (this.canvas.height - this.paraHeight)*0.5 + this.textHeight*this.trackLine + this.paraOffset;

            this.context.fillStyle = 'red';
            this.context.fillText(this.trackLetterArray[1].join(''), x2, y);
            this.context.fillStyle = 'grey';
            this.context.fillText(this.trackLetterArray[2].join(''), x3, y);
            for (let i = 0; i < this.paraLinesArray.length; i++) {
                if (i <= this.trackLine) continue;
                const measurement = this.context.measureText(this.paraLinesArray[i]).width;
                const x = (this.canvas.width - measurement) * 0.5;
                const y = (this.canvas.height - this.paraHeight)*0.5 + this.textHeight*i + this.paraOffset;
                this.context.fillText(this.paraLinesArray[i], x, y);
            }
            this.context.fillStyle = 'black';
            this.context.fillText(this.trackLetterArray[0].join(''), x1, y);
            this.context.fillText(this.cursorArray.join(''), x1, y + this.cursorOffset);
            for (let i = 0; i < this.paraLinesArray.length; i++) {
                if (i+1 > this.trackLine) continue;
                const measurement = this.context.measureText(this.paraLinesArray[i]).width;
                const x = (this.canvas.width - measurement) * 0.5;
                const y = (this.canvas.height - this.paraHeight)*0.5 + this.textHeight*i + this.paraOffset;
                this.context.fillText(this.paraLinesArray[i], x, y);
            }
        }
        else {
            this.context.fillStyle = 'black';
            this.context.textAlign = 'center';
            this.context.fillText('Finished: ' + (this.timer*0.001).toFixed(3) + ' secs', canvas.width*0.5, canvas.height*0.5)
        }
    }

    loadSpeed(){
        this.context2.clearRect(0, 0, this.canvas2.width, this.canvas2.height*0.5);
        this.context2.clearRect(0, this.canvas2.height*0.5, this.canvas2.width*0.5, this.canvas2.height);
        
        if (this.start) {
            const totalWords = (this.correctInputs + this.incorrectInputs) * 0.2;
            this.grossSpeed = (totalWords / (Math.floor(this.timer) * 0.001 / 60)).toFixed(2);
        }
        
        const speedText = `${this.grossSpeed} WPM`;
        const measurementSpeed = this.context2.measureText(speedText);
        this.context2.fillText(speedText, this.canvas2.width - measurementSpeed.width - 5, measurementSpeed.actualBoundingBoxAscent*2);

        this.loadTime();
    }

    loadProgress(){
        this.context2.clearRect(this.canvas2.width*0.5, this.canvas2.height*0.5, this.canvas2.width, this.canvas2.height);
        const wordsText = `${this.numberOfSpaces}/${this.wordArray.length}`;
        const measurement2 = this.context2.measureText(wordsText);
        this.context2.fillText(wordsText, this.canvas2.width - measurement2.width - 5, this.canvas2.height - measurement2.actualBoundingBoxAscent*0.5);
    }

    loadTime(){
        const mins = Math.floor (Math.floor(this.timer * 0.001) / 60);
        const secs = Math.floor (Math.floor(this.timer * 0.001) - mins*60);

        const TimeText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        const measurement = this.context2.measureText(TimeText);
        this.context2.fillText(TimeText, 10, measurement.actualBoundingBoxAscent*2);
    }

    validateInput(key) {
        const cursorIndex = this.cursorArray.indexOf('_');

        if (this.letterArray[this.typedIndex] === key) {
            this.typedIndex++;
            // Word Calculation
            if (key === ' ') {
                this.numberOfSpaces++;
                this.loadProgress();
            }

            // Cursor Positioning
            if (cursorIndex < this.paraLinesArray[this.trackLine].length - 1 ||
                this.trackLine + 1 < this.paraLines
            ) {
                [this.cursorArray[cursorIndex], this.cursorArray[cursorIndex + 1]] = [
                    this.cursorArray[cursorIndex + 1],
                    this.cursorArray[cursorIndex]
                ]
            }
            else {
                this.finished = true;
                this.numberOfSpaces++;
                this.inputViewer.textContent = 'Finish';
                this.inputViewer.style.borderColor = 'black';
                this.inputHandler.refresherStyle(false);
                this.loadCanvas2();           
            }

            // Letter Tracking
            this.trackLetterArray = [[...this.paraLinesArray[this.trackLine].slice(0, cursorIndex + 1).split('')], [], this.paraLinesArray[this.trackLine].slice(cursorIndex + 1).split('')];

            if (!this.finished) this.inputViewer.style.borderColor = 'green';
            this.canvas.style.borderColor = 'black';
            this.canvas.style.boxShadow = '0 0 10px black';
        }
        else {
            this.incorrectInputs++;
            this.inputViewer.style.borderColor = 'red';
            this.canvas.style.borderColor = 'red';
            this.canvas.style.boxShadow = '0 0 10px crimson';

            // Letter Tracking
            this.trackLetterArray = [[...this.paraLinesArray[this.trackLine].slice(0, cursorIndex).split('')], [...this.paraLinesArray[this.trackLine].slice(cursorIndex, cursorIndex + 1)], this.paraLinesArray[this.trackLine].slice(cursorIndex + 1).split('')];
        }

        this.calibrateTracker();
        this.loadCanvas();
    }

    calibrateTracker() {
        if ( this.trackLetterArray[2].length === 0 &&
            this.trackLetterArray[1].length === 0 &&
             this.trackLine < this.paraLines-1
            ) {
            this.trackLine++;
            this.trackLetterArray = [[], [], [...this.paraLinesArray[this.trackLine]]];
            this.cursorArray = [];
            this.cursorLine++;
            this.createCursorArray();
        }
    }

    resize(){
        this.maxParaWidth = this.canvas.width*0.9;
        this.convertToArray();

        let lineLength = [];

        for (let i = 1; i < this.paraLinesArray.length + 1; i++) {
            let totalLength = 0;
            for (let j = 0; j < i; j++) {
                totalLength += this.paraLinesArray[j].length
            }
            lineLength.push(totalLength);
        }

        for (let i = 0; i < lineLength.length; i++) {
            if (lineLength[i] >= this.typedIndex + 1) {
                this.trackLine = i;
                break;
            }
        }

        if (this.trackLetterArray[1].length > 0) {
            this.trackLetterArray = [[...this.paraLinesArray[this.trackLine].split('')], [...this.trackLetterArray[1]], [...this.paraLinesArray[this.trackLine].split('')].reverse()];
            this.trackLetterArray[0].length = this.typedIndex - (this.trackLine > 0 ? lineLength[this.trackLine-1] : 0);
            this.trackLetterArray[2].length = (lineLength[this.trackLine] - this.typedIndex - 1);
            this.trackLetterArray[2].reverse();
        }
        else {
            this.trackLetterArray = [[...this.paraLinesArray[this.trackLine].split('')], [], [...this.paraLinesArray[this.trackLine].split('')].reverse()];
            this.trackLetterArray[0].length = this.typedIndex - (this.trackLine > 0 ? lineLength[this.trackLine-1] : 0);
            this.trackLetterArray[2].length = (lineLength[this.trackLine] - this.typedIndex);
            this.trackLetterArray[2].reverse();
        }

        this.createCursorArray(this.typedIndex - (this.trackLine > 0 ? lineLength[this.trackLine-1] : 0));
    }

    newParagraph(){
        this.loadCanvasSettings();
        this.typedIndex = 0;
        this.start = false;
        this.finished = false;
        this.timer = 0;
        this.textHandler.loadSentence();
        this.trackLetterArray = [];
        this.wordArray = this.paragraph.split(' ');
        this.letterArray = this.paragraph.split('');
        this.convertToArray();
        this.trackLine = 0;
        this.cursorArray = [];
        this.cursorLine = 0;
        this.createCursorArray();
        this.correctInputs = this.letterArray.length;
        this.incorrectInputs = 0;
        this.numberOfSpaces = 0;
        this.grossSpeed = 0;
        this.speedTimer = 0;
        this.loadCanvas();
    }

    update(deltaTime){
        this.timer += deltaTime;
        this.speedTimer += deltaTime;

        if (this.speedTimer >= this.speedInterval) {
            this.speedTimer = 0;
            this.loadSpeed();
        }
    }

    loadCanvas2(){
        this.loadSpeed();
        this.loadProgress();
    }
}

window.addEventListener('load', e => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const canvas2 = document.getElementById('speedCanvas');
    const ctx2 = canvas2.getContext('2d');
    const netSpeed = document.getElementById('netSpeed');
    const timeElapsed = document.getElementById('timeElapsed');
    const accuracy = document.getElementById('accuracy');
    const grossSpeed = document.getElementById('grossSpeed');


    const handler = new Handler(canvas, ctx, canvas2, ctx2);

    function showStatistics() {
        // Time Elapsed
        const time = handler.timer;
        const mins = Math.floor (time / 60000).toString().padStart(2, '0');
        const secs = Math.floor ((time - mins*60000) * 0.001).toString().padStart(2, '0');
        if (!handler.finished){
            timeElapsed.textContent = `Time Elapsed: ${mins}:${secs}`;
        }
        else {
            const milliSecs = Math.floor(time).toString().slice(-3, -1);
            timeElapsed.textContent = `Time Elapsed: ${mins}:${secs}.${milliSecs}`;
        }

        // Gross Speed
        const incorrectWords = handler.incorrectInputs * 0.2;
        const correctWords = handler.correctInputs * 0.2;
        const totalWords = (handler.correctInputs + handler.incorrectInputs) * 0.2;
        const gross_speed = (totalWords / (Math.floor(time) * 0.001 / 60)).toFixed(2);

        grossSpeed.textContent = `Gross Speed: ${gross_speed} WPM`;
        
        // Net Speed
        const net_speed = (correctWords / (Math.floor(time) * 0.001 / 60)).toFixed(2);
        netSpeed.textContent = `Typing Speed: ${net_speed} WPM`

        // Accuracy
        accuracy.textContent = `Accuracy: ${((1 - (incorrectWords/totalWords))*100).toFixed(2)}%`
    }

    let lastTime = 0;
    function animation(timestamp) {
        // Delta Time
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;

        if (handler.finished) {
            showStatistics();
            handler.loadSpeed();
        }

        if (handler.start && !handler.finished) {
            handler.update(deltaTime);
        }
        
        requestAnimationFrame(animation);
    }
    animation(0);
})