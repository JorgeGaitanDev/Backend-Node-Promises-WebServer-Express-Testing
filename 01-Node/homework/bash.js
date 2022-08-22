 const commands = require('./commands/index');
 // commands es un objeto
const done = function(data) {
  process.stdout.write(data);
  process.stdout.write('\nprompt > ');
};
 // Output un prompt
    process.stdout.write('prompt > ');
    // El evento stdin 'data' se dispara cuando el user escribe una línea
    process.stdin.on('data', function (data) {
    // console.log('1'); para mirar si esta funcionando
    let args = data.toString().trim().split(' ');
    let cmd = args.shift(); // remueve la nueva línea
  
    if (commands[cmd]) {
      commands [cmd](args, done);
    }else {
      done('No existe tal comando');
    }


      // //console.log(process); trae todo lo del archivo bash y lo que esta instalado
      // process.stdout.write('You typed: ' + cmd);
      // if(cmd == 'pwd') {
      //   //ejecutar alguna funcion en particular
      //   //process.stdout.write(process.cwd());
      //   commands.pwd(done);
      // }else if ( cmd === 'date') {
      //   commands.date(done);
      //   //process.stdout.write(Date());
      // } else if (cmd === 'ls') {

      // }
     // process.stdout.write('\nprompt > ');
    });
