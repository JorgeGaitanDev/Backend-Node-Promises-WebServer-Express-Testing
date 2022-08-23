// pwd, date, echo, ls, cat, head, tail, curl
var fs = require('fs');
var request = require('request');
//print

module.exports = {
	date: function (args, print){
		print(Date());
	console.log('hola');
	},
	pwd: function (args, done){
		done(process.cwd());
	},
	echo: function(args, done){
	 	done(args.join(" "));
	},
	ls: function(args, done){
		fs.readdir('.', function(err,data){
			if (err) throw err;
			done(data.join('\n'));
			// let output = ''; FORMA DE forEach
			// data.forEach(f => {
			// 	output += f + '\n'
			// })
		})
	},
	cat: function(args, done){
		fs.readFile(args[0], 'utf8', function(err, data){
			if (err) throw err;
			done(data);
		})
	},
	head: function(args, done){
		fs.readFile(args[0], 'utf8', function(err,data){
			if (err) throw err;
			let line = data.split('\n').splice(0, parseInt(args[1])).join('\n');
			done(line);
		})
	},
	//trae las ultimas lineas se pone tail bash.js 4
	tail: function(args, done){
		fs.readFile(args[0], 'utf8', function(err, data){
			if (err) throw err;
			let line = data.split('\n').splice(-parseInt(args[1])).join('\n');
			//TAMBIEN SE PUEDE ASI Y TRAE EN ESPACIFICO LAS QUE UNO QUIERA
			//let line = data.split('\n').splice(-10).join('\n');
			done(line);
		})
	},
	curl: function(args, done){
		request(args[0], function(err, data){
			if (err) throw err;
			console.log(data.body);
		})
	}
};