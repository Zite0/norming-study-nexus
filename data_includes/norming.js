PennController.ResetPrefix(null);

Sequence("init-recorder","instruction-set","welcome-message",randomize("reaction-time-exp"),"upload")

InitiateRecorder("TODO: SERVER-URL-HERE"
	,
	"This experiment collects audio recordings. **Once you grant it access to your recording device, 
	you will be notified of whether you are being recorded by a label at the top of the page**"
	)
		.label("init-recorder");

newTrial("welcome-message",
	newHtml("welcome-message","welcome-message.html")
		.print()
    ,
    newButton("begin","Click here to go over the instructions.")
		.center()
		.print()
		.wait()
)

Template("instruction-seq.csv", row =>
	// TODO: figure out a way to have a recording trial run in the instructions.
	// maybe use conditional statements ?
	newTrial("instructions"
		,
		newHtml("text",row.item)
			.print()
		,
		// 7 seconds to read instructions. // should change this once practice logic is implemented.
		newTimer("inst-timer",7000)
			.start()
			.wait()
		,
		newButton("continue","Click here to go continue.")
			.center()
			.print()
			.wait()
		)
	)
		


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

