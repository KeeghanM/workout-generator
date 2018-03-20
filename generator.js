let time = 30
let workout = []

function pickBlock (x) {
  let block = null
  counter = 0
  while (block == null && counter < blocks.length * 2) {
    counter++
    let random = Math.floor(Math.random() * blocks.length)
    block = blocks[random]
    if (block.time <= x && workout.includes(block) == false) {
      return block
    }
    block = null
  }
  return block
}

function setTime (x) {
  time = x
}

function genWorkout (x) {
  workout = []
  setTime(x)

  setWarmup()

  while (time > 0) {
    let block = pickBlock(time)
    if (block) {
      workout.push(block)
      setTime(time - block.time)
    } else {
      return workout
    }
  }
  return workout
}

function setWarmup () {
  let warmup = {'time': 3,
    'type': 'Warmup 30s on / 5s off',
    'rounds': 1,
    'rest': null,
    'exercises': [
      {
        'name': 'Squats',
        'reps': null
      },
      {
        'name': 'Walkout w/ Taps',
        'reps': null
      },
      {
        'name': 'Drop Squats',
        'reps': null
      },
      {
        'name': 'Walkout w/ PushUp',
        'reps': null
      }
    ]}

  workout.push(warmup)
  setTime(time - warmup.time)
}

function drawWorkout () {
	window.console.log(workout)

	let div = document.getElementById("workout")
	let x = ""
	for(let b of workout){
		x = x + '<div class="block">'
		x = x + '<h2 class="type">' + b.type + ' <span class="time"> (' + b.time + ' Min)</span></h2>'
		if(b.rounds > 1){
			x = x + '<span class="rounds">x' + b.rounds + ' rounds </span>'
		}
		if(b.rest){
			x = x + '<span class="rest"> with ' + b.rest + ' seconds rest between</span>'
		}
		x = x + '<ul class="exercises list-group list-group-flush">'
		for(let e of b.exercises){
			x = x + '<li class="exercise list-group-item">' + e.name
			if(e.reps){
				x = x + '<span class="reps"> x' + e.reps + '</span>'
			}
			x = x + '</li>'
		}
		x = x + '</div>'
	}
	div.innerHTML = x
}

function generateClick () {
	let len = document.getElementById("length").value
	genWorkout(len)
	drawWorkout()
}