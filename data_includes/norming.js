PennController.ResetPrefix(null);

newTrial("welcome-message");

newTrial("welcome",
	newHtml("welcome-message","welcome-message.html")
	.print()
    ,
    newButton("begin","Click to start the experiment.")
    .center()
    .print()
    .wait()
)



