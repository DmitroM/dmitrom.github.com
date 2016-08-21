(function() {
	var Game = document.getElementById('game');

	// module aliases
	var Engine = Matter.Engine,
		// Render = Matter.Render,
		World = Matter.World,
		Body = Matter.Body,
		Bodies = Matter.Bodies,
		Common = Matter.Common,
		Constraint = Matter.Constraint,
		Composites = Matter.Composites,
		MouseConstraint = Matter.MouseConstraint;

	

	// create an engine
	// проверить при гравитации
	// var engine = Engine.create({
	// 	element: Game, 
	// 	options: {
	// 		showAngleIndicator: true,
	// 		wireframes: true
	// 	}
	// });
	var engine = Engine.create(Game, {
		render: {
			strokeStyle: '#052332',
			options: {
				wireframes: true,
				showAngleIndicator: true,
				width: 375,
				height: 617
			}
		}
	});

	// gravity init
	engine.world.gravity.x = 0;
	engine.world.gravity.y = 0;

	// add a mouse controlled constraint
	// проверить 
	var mouseConstraint = MouseConstraint.create(engine);
	World.add(engine.world, mouseConstraint);



	// create a renderer
	// var render = Render.create({
	// 	element: Game,
	// 	engine: engine,
	// 	options: {
	// 		width: 375,
	// 		height: 617
	// 	}
	// });

	// create two boxes and a grounds
	var boxA = Bodies.rectangle(110, 200, 80, 80, { isStatic: true });
	var boxB = Bodies.rectangle(200, 50, 80, 80, { isStatic: true });
	var groundButton = Bodies.rectangle(187, 617, 375, 1, { isStatic: true }),
		groundTop = Bodies.rectangle(187, 0, 375, 1, { isStatic: true }),
		groundLeft = Bodies.rectangle(0, 308, 1, 617, { isStatic: true }),
		groundRight = Bodies.rectangle(375, 308, 1, 617, { isStatic: true });

	// add of the bodies to the world
	World.add(engine.world, [boxA, boxB, groundButton, groundTop, groundLeft, groundRight]);


	// var stack = Composites.stack(10, 10, 1, 1, 0, 0, function(x, y) {
		// if (Common.random() > 0.35) {
		// 	return Bodies.rectangle(x, y, 64, 64, {
		// 		render: {
		// 			strokeStyle: '#ffffff',
		// 			sprite: {
		// 				texture: 'http://brm.io/matter-js-demo-master/img/box.png'
		// 			}
		// 		}
		// 	});
		// } else {
			// return Bodies.circle(x, y, 30, {
			var circle = Bodies.circle(187, 500, 30, {
				// плотность
				density: 0.0005,

				// трение о воздух
				frictionAir: 0.034,

				// отталкивание
				restitution: 1.3,

				// трение
				friction: 0.01,

				slop: 0.5,

				// отрисовка
				render: {
					strokeStyle: '#052332',
					sprite: {
						texture: 'http://brm.io/matter-js-demo-master/img/ball.png'
					}
				}
			});
		// }
	// });

	// add unit to the world
	World.add(engine.world, circle);

	// var stack = Composites.stack(100, 50, 10, 15, 10, 10, function(x, y) {
	// 	return Bodies.circle(x, y, Common.random(15, 30), { restitution: 0.6, friction: 0.1 });
	// });

	// Example.mixed = function(demo) {
	// 	var engine = demo.engine,
	// 		world = engine.world;

	// 	var stack = Composites.stack(100, 50, 10, 15, 10, 10, function(x, y) {
	// 		return Bodies.circle(x, y, Common.random(15, 30), { restitution: 0.6, friction: 0.1 });
	// 	});

	// 	World.add(world, [
	// 		stack,
	// 		Bodies.polygon(200, 560, 3, 60),
	// 		Bodies.polygon(400, 560, 5, 60),
	// 		Bodies.rectangle(600, 560, 80, 80)
	// 	]);
	// };



	// run the engine
	Engine.run(engine);

	// run the renderer
	// Render.run(render);

})();