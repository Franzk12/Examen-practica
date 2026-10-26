// Banco de preguntas de práctica — 3er Parcial Sistemas Operativos.
// Para agregar una pregunta: copiá un bloque {...} y cambiá el texto.
// "correcta" es el índice (empezando en 0) de la opción correcta en "opciones".
const PREGUNTAS = [
  {
    texto: "¿Cuál de las condiciones necesarias para que haya abrazo mortal no se puede eliminar de un sistema?",
    opciones: ["Exclusión mutua", "Inanición", "Retención y espera", "Espera circular"],
    correcta: 0
  },
  {
    texto: "¿Por qué algunos desarrolladores de SOs de propósito general prefieren ignorar el problema de abrazo mortal?",
    opciones: [
      "Es muy costoso implementar algoritmos de detección, o demás soluciones.",
      "Porque hay miles de procesos y no podemos saber de antemano la cantidad de recursos que necesitarán",
      "Impedir alguna de las cuatro condiciones puede llevarnos a problemas en términos de concurrencia",
      "Porque sostienen que los abrazos mortales no son frecuentes y dejan que se resuelva a nivel de aplicación en coordinación con el usuario"
    ],
    correcta: 3
  },
  {
    texto: "¿Qué indica un ciclo en un grafo de asignación de recursos?",
    opciones: ["Que puede haber un abrazo mortal", "Que se produjo un abrazo mortal", "Que no hay abrazo mortal", "Que el sistema está en un estado seguro"],
    correcta: 0
  },
  {
    texto: "¿Qué indica un ciclo en un grafo de asignación de recursos con sólo una instancia de cada tipo de recurso?",
    opciones: ["Que se produjo un abrazo mortal", "Que puede haber abrazo mortal", "Que no hay abrazo mortal", "Que el sistema está en un estado seguro"],
    correcta: 0
  },
  {
    texto: "¿Cuál de las siguientes NO ES condición necesaria para que haya abrazo mortal?",
    opciones: ["Inanición", "Exclusión mutua", "Retención y espera", "Espera circular"],
    correcta: 0
  },
  {
    texto: "¿Qué método se sugiere en el tp de semáforos para determinar el tamaño de un semáforo en memoria?",
    opciones: ["Examinar el código fuente de la librería", "Comparar las direcciones de memoria asignadas a los semáforos", "Usando sizeof(mutex);", "Mostrando con printf"],
    correcta: 2
  },
  {
    texto: "¿Qué representan los vértices del grafo de asignación de recursos?",
    opciones: ["Asignaciones", "Procesos o recursos", "Procesos", "Recursos"],
    correcta: 1
  },
  {
    texto: "¿Puede un programa que tenga condiciones de carrera andar bien?",
    opciones: ["Si, mientras no haya exclusión mutua andará bien", "No, porque las condiciones de carrera son errores o incoherencias", "Si, puede que jamás falle", "No, porque tendrá incoherencias"],
    correcta: 2
  },
  {
    texto: "¿Qué característica tiene la función sem_try_wait?",
    opciones: ["Tiene mucho overhead", "La función no existe", "Es sincrónica", "No es bloqueante"],
    correcta: 3
  },
  {
    texto: "¿Cuál es el problema de usar espera activa u ocupada?",
    opciones: ["Que hace uso intensivo de la CPU", "Que demora más que un bloqueo", "No hay desventaja con este tipo de espera", "Que el proceso va a la cola de listos"],
    correcta: 0
  },
  {
    texto: "¿Por qué es importante gestionar la RAM?",
    opciones: ["Para evitar fallos de página.", "Para acelerar el procesamiento de la CPU.", "Todas las mencionadas.", "Para aumentar el grado de multiprogramación."],
    correcta: 2
  },
  {
    texto: "¿Qué significa exclusión mutua?",
    opciones: ["Que los recursos son usados de a un proceso por vez.", "Que los procesos usan de a un recurso por vez,", "Que los programas usan los recursos de a uno por vez.", "Que los recursos son usados de a un programa por vez."],
    correcta: 0
  },
  {
    texto: "¿Qué diferencia hay entre una página y un marco?",
    opciones: ["Todas las mencionadas.", "La página es del proceso, el marco de la RAM.", "La página puede cambiar de tamaño, el marco no.", "El marco se reubica en las distintas páginas de la RAM."],
    correcta: 1
  },
  {
    texto: "¿De qué tema trata el TP de concurrencia?",
    opciones: ["Problema de sección crítica.", "Condiciones de carrera.", "Todos los anteriores.", "Creación de hijos con fork()."],
    correcta: 2
  },
  {
    texto: "¿Para qué sirve el comando \"time\", usado, por ejemplo, así: time ./a.out?",
    opciones: [
      "Muestra el tiempo de reloj, el de usuario y de sistema que tarda en ejecutar.",
      "Permite ejecutar un comando a una hora determinada por el usuario.",
      "Permite conocer la hora actual, y cambiarla según los parámetros especificados.",
      "Muestra el tiempo de reloj que toma en ejecutar el programa especificado."
    ],
    correcta: 0
  },
  {
    texto: "¿Cuál de estas características presenta un proceso limitado por CPU?",
    opciones: ["Alto tiempo de ejecución.", "Alta utilización de recursos de disco rígido.", "Baja utilización de CPU.", "Alta utilización de CPU."],
    correcta: 3
  },
  {
    texto: "¿Para qué el padre espera que finalicen los hijos en el TP de concurrencia?",
    opciones: [
      "Para poder desprender el segmento de memoria compartida.",
      "Para poder presentar por pantalla el valor final del contador.",
      "Para revisar que todos hayan hecho su trabajo.",
      "Para relanzar el hijo que haya finalizado."
    ],
    correcta: 0
  },
  {
    texto: "¿Cuál es la función principal del planificador de corto plazo?",
    opciones: ["Determinar qué proceso utilizará cada CPU.", "Administrar los procesos en su ciclo de vida.", "Controlar el tiempo que cada proceso usa la CPU.", "Esperar que los usuarios abusen del sistema."],
    correcta: 0
  },
  {
    texto: "¿En qué estructura de datos deben estar los procesos para que el planificador los utilice?",
    opciones: ["La cola de planificación del grupo adecuado.", "La cola de listos.", "La cola de bloqueados.", "El PCB."],
    correcta: 1
  },
  {
    texto: "¿Qué producen las condiciones de carrera?",
    opciones: [
      "Incoherencias en los datos.",
      "Que los resultados dependan del orden de ejecución de las instrucciones.",
      "Que los procesos ejecuten las instrucciones erróneamente.",
      "Que los recursos sean mal utilizados al haber concurrencia."
    ],
    correcta: 1
  },
  {
    texto: "¿Cuál de las siguientes No conforma una condición de carrera?",
    opciones: ["Exclusión mutua.", "Concurrencia.", "Multiprocesamiento.", "Recursos compartidos."],
    correcta: 0
  },
  {
    texto: "¿Para qué se usa la memoria compartida?",
    opciones: [
      "Para agilizar el procesamiento.",
      "Es una manera de que los procesos se comuniquen entre sí.",
      "Para asegurar la aparición de las incoherencias.",
      "Para no tener que trabajar con archivos."
    ],
    correcta: 1
  },
  {
    texto: "¿Por qué en el TP de concurrencia usamos un puntero a la memoria compartida?",
    opciones: [
      "Porque no sabemos de antemano qué ubicación tendrá.",
      "Porque al usar el puntero se cataliza la conversión forzada de tipo.",
      "Porque los tipos de variables comunes no pueden albergar el tamaño de la memoria.",
      "Todas las anteriores."
    ],
    correcta: 0
  }
];
