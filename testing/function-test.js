PennController.ResetPrefix();

let unacc = ['fell','sank','burned','snored','shook','sneezed','floated'];
let unerg = ['ran','played','ate','slept','jumped','crawled','played'];
let trans = ['threw','pushed','pulled','baked','taught','watched','wrote','bought'];

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
    'threw' : ['verb_threw.png','trans'],
    'pushed': ['verb_pushed.png','trans'],
    'pulled': ['verb_pulled.png','trans'],
    'shook' : ['verb_shook.png','unacc'],
    'floated' : ['verb_floated.png','unacc'],
    'baked' : ['verb_baked.png','trans'],
    'taught' : ['verb_taught.png','trans'],
    'watched' : ['verb_watched.png', 'trans'],
    'wrote' : ['verb_wrote.png','trans'],
    'bought' : ['verb_bought.png','trans'],
}


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
 * Returns an array of 3*num random elements from each array. Requires that
 * num be less than or equal to the length of any of the input arrays. 
 * This function modifies the original arrays. 
 */
function generateRandomCombination(array1,array2,array3,num){
  let res = [[],[],[]];

  for (let i = 0; i < num; i++){
    let randomInt = getRandomInt(0,array1.length-1);
    res[0].push(array1[randomInt]);
    array1.splice(randomInt,1);

    randomInt = getRandomInt(0,array2.length-1);
    res[1].push(array2[randomInt]);
    array2.splice(randomInt,1)
    
    randomInt = getRandomInt(0,array3.length-1);
    res[2].push(array3[randomInt]);
    array3.splice(randomInt,1)
    
  }

  return res;
}


//[[unacc,unacc,unacc],[unerg,unerg,unerg],[trans,trans,trans]]
const currentPool = generateRandomCombination(unacc,unerg,trans,3);

newTrial('wait',
    newTimer('counter',125)
        .start()
        .wait()
)

// Sorry lol
AddTable('verbTable',
    'Verb,Image,Type\n'+
    `${currentPool[0][0]},${POOL[currentPool[0][0]][0]},${POOL[currentPool[0][0]][1]}\n`
    + `${currentPool[0][1]},${POOL[currentPool[0][1]][0]},${POOL[currentPool[0][1]][1]}\n`
    + `${currentPool[0][2]},${POOL[currentPool[0][2]][0]},${POOL[currentPool[0][2]][1]}\n`

    + `${currentPool[1][0]},${POOL[currentPool[1][0]][0]},${POOL[currentPool[1][0]][1]}\n`
    + `${currentPool[1][1]},${POOL[currentPool[1][1]][0]},${POOL[currentPool[1][1]][1]}\n`
    + `${currentPool[1][2]},${POOL[currentPool[1][2]][0]},${POOL[currentPool[1][2]][1]}\n`

    + `${currentPool[2][0]},${POOL[currentPool[2][0]][0]},${POOL[currentPool[2][0]][1]}\n`
    + `${currentPool[2][1]},${POOL[currentPool[2][1]][0]},${POOL[currentPool[2][1]][1]}\n`
    + `${currentPool[2][2]},${POOL[currentPool[2][2]][0]},${POOL[currentPool[2][2]][1]}`
)

newTrial('button',
    newButton('click','click me!')
        .print()
        .wait()
)

newTrial('test',
    newImage('verb1',POOL[currentPool[0][0]][0])
        .size(120,120)
    ,
    newImage('verb2',POOL[currentPool[0][1]][0])
        .size(120,120)
    ,
    newImage('verb3',POOL[currentPool[0][2]][0])
        .size(120,120)
    ,
    newImage('verb4',POOL[currentPool[1][0]][0])
        .size(120,120)
    ,
    newImage('verb5',POOL[currentPool[1][1]][0])
        .size(120,120)
    ,
    newImage('verb6',POOL[currentPool[1][2]][0])
        .size(120,120)
    ,
    newImage('verb7',POOL[currentPool[2][0]][0])
        .size(120,120)
    ,
    newImage('verb8',POOL[currentPool[2][1]][0])
        .size(120,120)
    ,
    newImage('verb9',POOL[currentPool[2][2]][0])
        .size(120,120)
    ,
    newCanvas('instruction-test',600,600)
        .center()
        .add(0,0,getImage('verb1'))
        .add(150,0,getImage('verb2'))
        .add(300,0,getImage('verb3'))
        .add(0,150,getImage('verb4'))
        .add(150,150,getImage('verb5'))
        .add(300,150,getImage('verb6'))
        .add(0,300,getImage('verb7'))
        .add(150,300,getImage('verb8'))
        .add(300,300,getImage('verb9'))
        .print()

    ,
    newButton("button",'click button to end')
        .print()
        .wait()
);