PennController.ResetPrefix(null)

Sequence("welcome",randomize("trial1"))

newTrial("welcome",
    defaultText
        .center()
        .print()
    ,
    newText("welcome-text","<p> Hello! In this experiment you will see several images that represent a verb. You will simply decide whether the verb represents something that happens to you or that you choose to do.</p>")
    ,
    newText("person","<p> The name of the person you on screen is Alex. Suppose you see an image of them falling, then you would say that the action is involuntary because falling is something that happens to you.</p>")
    ,
    newText("instructions","<p> Once you see the image, press <b>F</b> on your keyboard for voluntary or <b>J</b> for involuntary.</p>")
    ,
    newButton("begin","Click to start the experiment.")
    .center()
    .print()
    .wait()
)

Template("items.csv", row =>
    newTrial("trial1"
        ,
        defaultText
            .center()
            .print()
        ,
        newImage("verb-image",row.image)
            .center()
            .size(120,120)
            .print()
        ,
        newText("instructions","Press <b>F</b> for voluntary or <b>J</b> for involuntary.")
        ,
        newKey("selection","FJ")
            .log()
            .wait()
)
)