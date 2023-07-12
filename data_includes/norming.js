PennController.ResetPrefix(null);

Sequence("init-recorder","welcome-message",randomize("reaction-time-exp"),"upload")

InitiateRecorder("TODO: SERVER-URL-HERE").label("init-recorder");

newTrial("welcome-message",
	newHtml("welcome-message","welcome-message.html")
	.print()
    ,
    newButton("begin","Click here to go over the instructions.")
    .center()
    .print()
    .wait()
)

// Instructions should go here. Will use template to show html files with the instructions. 
// use buttons to continue to the next page.

// TODO: figure out a way to have a recording trial run in the instructions.
// maybe use conditional statements ?



Template("items.csv", row =>
    newTrial("reaction-time-exp"
        ,
        newImage("verb-image",row.image)
            .center()
            .size(120,120)
            .print()
        ,
		newVar("RT").global().set(v=>Date.now())
		,
		// add media recorder
		// how to determine onset of speech ??
		newMediaRecorder("recorder","audio")
			.record()
		,
		// record for 1.5 seconds immediately after image is printed on screen.
		newTimer("recording",1500)
			.start()
			.wait()
		,
		getMediaRecorder("recorder")
			.stop()
		,
		// Calculate reaction time with variable
		getVar("RT").set( v => Date.now() - v )
     
	).log("ReactionTime",getVar("RT"))
)

// Maybe try to upload recording after each image ? 
UploadRecordings("upload")

