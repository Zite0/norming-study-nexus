PennController.ResetPrefix();

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    let my_min = Math.ceil(min);
    let my_max = Math.floor(max);
    return Math.floor(Math.random() * (my_max - my_min + 1)) + my_min;
}

/** 
 * Returns a 2 dimensional array of 2 random elements from each array in each subarrau. 
 * Requires that num be less than or equal to the length of any of the input arrays. 
 * This function does not modify the constant of the original array.
 */
function generateRandomCombination(array1,array2,num){

    let newArray1 = [...array1];
    let newArray2 = [...array2];

    let res = [[],[]];

    for (let i = 0; i < num; i++){
        let randomInt = getRandomInt(0,newArray1.length-1);
        res[0].push(newArray1[randomInt]);
        newArray1.splice(randomInt,1);

        randomInt = getRandomInt(0,newArray2.length-1);
        res[1].push(newArray2[randomInt]);
        newArray2.splice(randomInt,1);
    
    }
  return res;
}

/**
 * This function shuffles a given array 'array' in place using 
 * the Fisher-Yates shuffling algorithm.
 */
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

/**
 * Function that generates a block of verbs that contains 40 equally distributed verbs
 * from 2 dimensional array 'wordArray', where each row contains unaccusative or
 * unergative verbs. 
 */
function generateBlock(wordArray){
    let array = new Array(40);

    array.fill(wordArray[0][0],0,10);
    array.fill(wordArray[0][1],10,20);
    array.fill(wordArray[1][0],20,30);
    array.fill(wordArray[1][1],30,40);

    shuffle(array);

    return array;
}

/**
 * Creates an array of Strings from a given pool of verbs. The length of this 
 * list will be 40*n, where 'n' is the number of desired repetitions.
 */
function generateTable(wordArray,n){
    let res = []
    
    for (let i = 0; i < n; i++){
        res = res.concat(generateBlock(wordArray));
    }

    shuffle(array);

    return res;
}

/** This function returns a table in a comma separated value string format,
 * so that it can be used by the PCIbex addTable function. 'list' is an
 * array of strings. The columns of this list will be 'number,verb,image,type'.
 * Verb is the actual verb, image is the file name of the corresponding, and 
 * type can be either 'unacc' or 'unerg', depending on the verb. number is simply 
 * the number of rows. keep in mind that the first header row will not count,
 * so the second row starts as 1.
 */
function tableToCsv(masterTable,corresp){
    let res = 'number,verb,image,type\n';
    let counter = 1;

    for (let i = 0; i < masterTable.length -1;i++){
        res += `${counter},${masterTable[i]},${corresp[masterTable[i]][0]},${corresp[masterTable[i]][1]}\n`;
        counter++;
    }
    let lastIndex = masterTable.length - 1;
    res += `${counter},${masterTable[lastIndex]},${corresp[masterTable[lastIndex]][0]},${corresp[masterTable[lastIndex]][1]}`;
    return res;
}
/**
 * Return a string in csv format that is to be used for the practice trials. 
 * It will have 8 rows. wordArray is 2 dimensional matrix of 2 rows and 2 columns.
 */
function makePracticeTable(wordArray){
    res = 'verb\n'
    + `${wordArray[0][1]}\n`
    + `${wordArray[1][0]}\n`
    + `${wordArray[0][0]}\n`
    + `${wordArray[1][0]}\n`
    + `${wordArray[0][0]}\n`
    + `${wordArray[1][1]}\n`
    + `${wordArray[0][1]}\n`
    + `${wordArray[1][1]}`;

    return res;
}

// Constants
const UNACC = ['fall','sink','burn','snore','shake','sneeze','float'];
const UNERG = ['run','play','eat','sleep','jump','crawl','play'];
const POOL = {
    'fall': ['verb_fell.png','unacc'],
    'sink': ['verb_sank.png','unacc'],
    'burn': ['verb_burned.png','unacc'],
    'snore': ['verb_snored.png','unacc'],
    'sneeze': ['verb_sneezed.png','unacc'],
    'run': ['verb_ran.png','unerg'],
    'play': ['verb_played.png','unerg'],
    'eat': ['verb_ate.png','unerg'],
    'sleep': ['verb_slept.png','unerg'],
    'jump': ['verb_jumped.png','unerg'],
    'crawl': ['verb_crawled.png','unerg'],
    'shake' : ['verb_shook.png','unacc'],
    'float' : ['verb_floated.png','unacc'],
}

const CURRENT_POOL = generateRandomCombination(UNACC,UNERG,2);
const MASTER = generateTable(CURRENT_POOL,5);
const TABLE = tableToCsv(MASTER,POOL);
const PRACTICE = makePracticeTable(CURRENT_POOL);



Sequence('wait','welcome-message','mic-setup','init-recorder','instructions','images','practice','start','reaction-time-exp','upload');
InitiateRecorder('TODO: SERVER-URL-HERE','').label('init-recorder');

// Wait for functions to run.
newTrial('wait',
    newTimer('counter',350)
        .start()
        .wait()
)

AddTable('verb-table',TABLE);
AddTable('practice-table',PRACTICE);

newTrial('welcome-message',
	newHtml('welcome-message','welcome-message.html')
		.print()
    ,
    newButton('begin','Click here to go over the instructions.')
		.center()
		.print()
		.wait()
);

newTrial('mic-setup',
    newHtml('setup','mic-instr.html')
        .print()
    ,
    newButton('continue','Click here to continue')
        .center()
        .print()
        .wait()
)

newTrial('instructions',
    newHtml('text','instr1.html')
        .print()
    ,
    newButton('begin','Click here to continue')
        .center()
        .print()
        .wait()
    ,
    clear()
    ,
    newHtml('text2','instr2.html')
        .print()
    ,
    getButton('begin')
        .center()
        .print()
        .wait()
    ,
    clear()
);

newTrial('images',
    newImage('verb1',POOL[CURRENT_POOL[0][0]][0])
        .size(120,120)
    ,
    newText('verb1-text',CURRENT_POOL[0][0])
    ,
    newImage('verb2',POOL[CURRENT_POOL[0][1]][0])
        .size(120,120)
    ,
    newText('verb2-text',CURRENT_POOL[0][1])
    ,
    newImage('verb3',POOL[CURRENT_POOL[1][0]][0])
        .size(120,120)
    ,
    newText('verb3-text',CURRENT_POOL[1][0])
    ,
    newImage('verb4',POOL[CURRENT_POOL[1][1]][0])
        .size(120,120)
    ,
    newText('verb4-text',CURRENT_POOL[1][1])
    ,
    newHtml('img-instr','verb-instr.html')
        .print()
    ,
    newCanvas('trial-images-practice',340,360)
        .center()
        
        // First Row
        .add(0,0,getImage('verb1'))
        .add(37,130,getText('verb1-text'))

        .add(150,0,getImage('verb2'))
        .add(190,130,getText('verb2-text'))

        // Second Row
        .add(0,150,getImage('verb3'))
        .add(37,280,getText('verb3-text'))

        .add(150,150,getImage('verb4'))
        .add(190,280,getText('verb4-text'))

        .print()

    ,
    newButton('button','Click here to continue')
        .center()
        .print()
        .wait()
    ,
    clear()
    ,
    newText('instr','<p> You will now have the chance to practice. Remember that you must say the verb as soon as the image appears on screen.</p>')
        .print()
    ,
    getButton('button')
        .center()
        .print()
        .wait()
);

Template('practice-table',row =>
    newTrial('practice',
        newImage('verb',POOL[row.verb][[0]])
            .size(150,150)
            .center()
            .print()
        ,
        newTimer('timer',2100)
            .start()
            .wait()
        ,
        newText('explanation', `<p style="text-align:center">The correct answer is <b>${row.verb}</b>.</p>`)
            .print("center at 50vw", "middle at 50vh")
        ,
        getTimer('timer')
            .start()
            .wait()
    )
)

newTrial('start',
    newText('practice',"<p>Every 20 trials, you will have a short break of 10 seconds, after which you'll see a button to continue with the experiment.</p>")
        .print()
    ,
    newText('guide','<p>For reference, take a look at the verbs before you start: </p>')
        .print()
    ,
    newImage('verb1',POOL[CURRENT_POOL[0][0]][0])
        .size(120,120)
    ,
    newText('verb1-text',CURRENT_POOL[0][0])
    ,
    newImage('verb2',POOL[CURRENT_POOL[0][1]][0])
        .size(120,120)
    ,
    newText('verb2-text',CURRENT_POOL[0][1])
    ,
    newImage('verb3',POOL[CURRENT_POOL[1][0]][0])
        .size(120,120)
    ,
    newText('verb3-text',CURRENT_POOL[1][0])
    ,
    newImage('verb4',POOL[CURRENT_POOL[1][1]][0])
        .size(120,120)
    ,
    newText('verb4-text',CURRENT_POOL[1][1])
    ,
    newCanvas('trial-images-practice',340,360)
        .center()
        
        // First Row
        .add(0,0,getImage('verb1'))
        .add(37,130,getText('verb1-text'))

        .add(150,0,getImage('verb2'))
        .add(190,130,getText('verb2-text'))

        // Second Row
        .add(0,150,getImage('verb3'))
        .add(37,280,getText('verb3-text'))

        .add(150,150,getImage('verb4'))
        .add(190,280,getText('verb4-text'))

        .print()
    ,
    newText('warning', '<p> While you should always try to say the correct verb, <b>it is OK if you make a mistake</b>.</p>')
        .print()
    ,
    newButton('start','Click here to start to the experiment')
        .center()
        .print()
        .wait()    
)


Template('verb-table', row =>
    newTrial('reaction-time-exp',
        newMediaRecorder('recorder','audio')
        ,
        newImage('verb-image',row.image)
            .center()
            .size(120,120)
        ,
        newTimer('recording-timer',1800)
        ,
        newTimer('timer',160)
            .start()
            .wait()
        ,
        getImage("verb-image")
            .print()
        ,
        getMediaRecorder("recorder")
            .record()
        ,
        getTimer('recording-timer')
            .start()
            .wait()
        ,
        getMediaRecorder('recorder')
            .stop()
        ,
        newText('explanation', `<p>The correct answer is <b>${row.verb}</b>.</p>`)
            .print("center at 50vw", "middle at 50vh")
        ,
        newTimer("cooldown",1400)
			.start()
			.wait()
        
        ,
        (row.number % 40 == 0) && (row.number != MASTER.length) ? [
            clear()
            ,
            newText('curr-trials',`<p>You have completed ${row.number}/${MASTER.length} trials. The experiment will resume in 10 seconds.</p>`)
                .center()
                .print()
            ,
            newTimer('break',10000)
                .start()
                .wait()
            ,
            newButton('trial-break-button','Click here to continue')
                .center()
                .print()
                .wait()
                .log()
        ]: []
    )
    .log('type',row.type)
    .log('verb',row.verb)
);

UploadRecordings('upload');