PennController.ResetPrefix(null);

// Placeholder file to test instructions

newTrial("welcome",
	newHtml("welcome-message","welcome-message.html")
    	.print()
    ,
    newButton("begin","Click to go to next page.")
        .center()
        .print()
        .wait()
)

Template("instruction-seq.csv", row =>
    newTrial("instruction",
        newHtml("this-instruction",row.item)
            .print()
        ,
        newButton("continue","Click to go to next page")
            .center()
            .print()
            .wait()
        )
    )