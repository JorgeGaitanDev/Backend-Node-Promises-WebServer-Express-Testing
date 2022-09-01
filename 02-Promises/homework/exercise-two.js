"use strict";

var Promise = require("bluebird"),
  async = require("async"),
  exerciseUtils = require("./utils");

var readFile = exerciseUtils.readFile,
  promisifiedReadFile = exerciseUtils.promisifiedReadFile,
  blue = exerciseUtils.blue,
  magenta = exerciseUtils.magenta;

var args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE,
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  var problem = module.exports["problem" + arg];
  if (problem) problem();
});

function problemA() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. loggea el poema dos stanza uno y stanza dos en cualquier orden
   *    pero loggea 'done' cuando ambos hayan terminado
   *    (ignora errores)
   *    nota: lecturas ocurriendo paralelamente (en simultaneo)
   *
   */

  // callback version
  // async.each(['poem-two/stanza-01.txt', 'poem-two/stanza-02.txt'],
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- A. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- A. callback version done --');
  //   }
  // );

  // var p1 = promisifiedReadFile("poem-two/stanza-01.txt") para pasarle p1 al promise all

  // promise version
  Promise.all([
    promisifiedReadFile("poem-two/stanza-01.txt"),
    promisifiedReadFile("poem-two/stanza-02.txt"),
  ]).then((stanzasArr) => {
    // stanzasArr.forEach(el => blue(el)) --> tambien funciona
    blue(stanzasArr[0]);
    blue(stanzasArr[1]);
    console.log("done");
  });
}

function problemB() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. loggea todas las stanzas en poema dos, en cualquier orden y loggea
   *    'done' cuando todas hayan terminado
   *    (ignora errores)
   *    nota: las lecturas ocurren en paralelo (en simultaneo)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  // ["poem-two/stanza-01.txt", "poem-two/stanza-02.txt", ...]

  // callback version
  // async.each(
  //   filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log("-- B. callback version --");
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log("-- B. callback version done --");
  //   }
  // );

  // ["poem-two/stanza-01.txt", "poem-two/stanza-02.txt", ...]

  var promesas = filenames.map((file) => promisifiedReadFile(file));

  // promesas --> [promisifiedReadFile("poem-two/stanza-01.txt"), promisifiedReadFile("poem-two/stanza-02.txt")]

  // promise version
  Promise.all(promesas).then((stanzas) => {
    // stanzas --> ["fui un dia al campo", "me recibieron mis familiares", "...."]
    stanzas.forEach((stanza) => blue(stanza));
    console.log("done");
  });
}

function problemC() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. Lee y loggea todas las stanzas en el poema dos, *en orden* y
   *    loggea 'done cuando hayan terminado todas
   *    (ignorá errores)
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  // ["poem-two/stanza-1.txt", "poem-two/stanza-02.txt", "poem-two/stanza-03.txt"]
  //                                                                i
  //                                     caja

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });

  for (
    let i = 1, caja = promisifiedReadFile(filenames[0]);
    i <= filenames.length;
    i++
  ) {
    caja = caja.then((stanza) => {
      blue(stanza);

      // validar si llegamos al final
      // ...
      if (i === filenames.length) console.log("done");
      else return promisifiedReadFile(filenames[i]);
    });
  }

  // callback version
  // async.eachSeries(
  //   filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log("-- C. callback version --");
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log("-- C. callback version done --");
  //   }
  // );

  // promise version
  // ???
}

function problemD() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. loggea todas las stanzas en el poema dos *en orden* asegurandote
   *    de fallar para cualquier error y logueando un 'done cuando todas
   *    hayan terminado
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });
  var randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

  // callback version
  // async.eachSeries(
  //   filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log("-- D. callback version --");
  //       if (err) return eachDone(err);
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     if (err) magenta(new Error(err));
  //     console.log("-- D. callback version done --");
  //   }
  // );

  // promise version
  for (
    let i = 1, caja = promisifiedReadFile(filenames[0]);i <= filenames.length;i++) {
    caja = caja.then((stanza) => {
      blue(stanza);

      // validar si llegamos al final
      if (i === filenames.length) console.log("done");

      else return promisifiedReadFile(filenames[i]);
    });

    if(i === filenames.length){
      caja.catch(err => {
        magenta(new Error(err))
        console.log('done')
      })
    }

  }
}

function problemE() {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. Haz una versión promisificada de fs.writeFile
   *
   */

  var fs = require("fs");

  function promisifiedWriteFile(filename, str) {

    return new Promise(function (resolve, reject) {


      fs.writeFile(filename, str, function (err, str) {




        if (err) reject(err);
        else resolve(str);
      });
    });
  }

  

}














