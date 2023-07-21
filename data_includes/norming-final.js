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

    return res
}

/** This function returns a table in a comma separated value string format,
 * so that it can be used by the PCIbex addTable function. 'list' is an
 * array of strings. The columns of this list will be 'verb,image,type'.
 * Verb is the actual verb, image is the file name of the corresponding, and 
 * type can be either 'unacc' or 'unerg', depending on the verb.
 */
function tableToCsv(masterTable,corresp){
    let res = 'verb,image,type\n'

    for (let i = 0; i < masterTable.length -1;i++){
        res += `${masterTable[i]},${corresp[masterTable[i]][0]},${corresp[masterTable[i]][1]}\n`
    }
    let lastIndex = masterTable.length - 1;
    res += `${masterTable[lastIndex]},${corresp[masterTable[lastIndex]][0]},${corresp[masterTable[lastIndex]][1]}`
    return res;
}

// Constants
const UNACC = ['fell','sank','burned','snored','shook','sneezed','floated'];
const UNERG = ['ran','played','ate','slept','jumped','crawled','played'];
const POOL = {
    'fell': ['verb_fell.png','unacc'],
    'sank': ['verb_sank.png','unacc'],
    'burned': ['verb_burned.png','unacc'],
    'snored': ['verb_snored.png','unacc'],
    'sneezed': ['verb_sneezed.png','unacc'],
    'ran': ['verb_ran.png','unerg'],
    'played': ['verb_played.png','unerg'],
    'ate': ['verb_ate.png','unerg'],
    'slept': ['verb_slept.png','unerg'],
    'jumped': ['verb_jumped.png','unerg'],
    'crawled': ['verb_crawled.png','unerg'],
    'shook' : ['verb_shook.png','unacc'],
    'floated' : ['verb_floated.png','unacc'],
}

const CURRENT_POOL = generateRandomCombination(UNACC,UNERG,2);
const MASTER = generateTable(CURRENT_POOL,5);
const TABLE = tableToCsv(MASTER,POOL);



Sequence('wait','init-recorder','verb-table','welcome-message','instructions','images',randomize('reaction-time-exp'));

InitiateRecorder("TODO: SERVER-URL-HERE").label('init-recorder');

// Wait for functions to run.
newTrial('wait',
    newTimer('counter',310)
        .start()
        .wait()
)



AddTable('verb-table',TABLE);

newTrial('welcome-message',
	newHtml('welcome-message','welcome-message.html')
		.print()
    ,
    newButton('begin','Click here to go over the instructions.')
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
)

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
    ,
    clear()
    ,
    newImage('practice-image1',POOL[CURRENT_POOL[0][0]][0])
        .center()
        .size(120,120)
        .print()
    ,
    newTimer('cooldown1',1500)
        .start()
        .wait()
    ,
    newText('explanation1',`<p>In this case, you should say <b>"${CURRENT_POOL[0][0]}"</b>.</p> <p>Please keep in mind that you will not see the correct answer during the actual experiment.</p>`)
        .center()
        .print()
    ,getButton('button')
        .print()
        .wait()
    ,
    clear()
    ,
    newText('instr1','<p> You will practice one more time.</p>')
        .print()
    ,
    getButton('button')
        .print()
        .wait()
    ,
    clear()
    ,
    newImage('practice-image2',POOL[CURRENT_POOL[1][0]][0])
        .center()
        .size(120,120)
        .print()
    ,
    newTimer('cooldown',1500)
        .start()
        .wait()
    ,
    newText('explanation2',`<p>In this case, you should say <b>"${CURRENT_POOL[1][0]}"</b>.</p> <p>Please keep in mind that you will not see the correct answer during the actual experiment.</p>`)
        .center()
        .print()
    ,
    getButton('button')
        .print()
        .wait()
    ,
    clear()
    ,
    newText('final-instr','<p> You are almost ready to begin. Please take a final look at the images we will use: </p>')
        .print()
    ,
    getCanvas('trial-images-practice')
        .center()
        .print()
    ,
    getButton('button')
        .center()
        .print()
        .wait()
);

Template('verb-table', row =>
    newTrial('reaction-time-exp',
        newMediaRecorder('recorder','audio')
        ,
        newImage('verb-image',row.Image)
            .center()
            .size(120,120)
        ,
        newTimer('recording-timer',2000)
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
        newTimer("cooldown",1000)
			.start()
			.wait()
    )
    .log('type',row.Type)
    .log('verb',row.Verb)
);

UploadRecordings('upload');