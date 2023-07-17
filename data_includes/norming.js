PennController.ResetPrefix(null);

// Not final sequence
Sequence("init-recorder","welcome-message","instructions","start-experiment")

// This should now work. Thanks, Bruce.
// DO NOT commit URL of our server for security reasons. Only add it to the following line
InitiateRecorder("TODO: SERVER-URL-HERE").label("init-recorder");

new_row.className = "welcome";
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
		
		// Conditional logic to test if there is practice for the user
		row.practice == "Y" ? 
			// True
			[
				clear()
				,
				newText("practice-trial","<p>You will now practice. Please consider the following image. What would you say?</p>")
					.center()
					.print()
				,
				newImage("practice-image",row.practice_item)
					.center()
					.size(120,120)
					.print()
				,
				newTimer("cooldown",1500)
					.start()
					.wait()
				,
				newText("explanation",`<p>In this case, you should say <b>"${row.sentence}"</b> as we explained before.</p>`)
				    .center()
				    .print()
			] 
			:
			// False (do nothing)
			[
				
			]
		,
		
		newButton("continue","Click here to continue.")
			.center()
			.print()
			.wait()
		)
	)


// Start actual experiment
newTrial("start-experiment",
	newText("start","You are now ready to begin.")
		.center()
		.print()
	,
	newButton("start-button","Click here to start experiment.")
		.center()
		.print()
	
	)
		

new_row.className = "main";
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
		// record for 1.55 seconds immediately after image is printed on screen.
		newTimer("recording",1550)
			.start()
			.wait()
		,
		getMediaRecorder("recorder")
			.stop()
		,
		// Calculate reaction time with variable
		getVar("RT").set( v => Date.now() - v )
		,
		// 1 second cooldown after trial.
		newTimer("cooldown",1000)
			.start()
			.wait()
     
	).log("ReactionTime",getVar("RT"))
)

// Maybe try to upload recording after each image ? 
UploadRecordings("upload")

