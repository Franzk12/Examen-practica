// Banco de preguntas de práctica.
// Para agregar una pregunta: copiá un bloque {...} y cambiá el texto.
// "correcta" es el índice (empezando en 0) de la opción correcta en "opciones".
const PREGUNTAS = [
  {
    texto: "En el ejemplo de descomprimir un archivo, mientras se cargan o guardan datos en disco la CPU...",
    opciones: [
      "Duplica automáticamente la RAM disponible",
      "Siempre trabaja al máximo sin esperas",
      "Puede quedar inactiva y baja utilización del recurso",
      "Se apaga hasta terminar la operación"
    ],
    correcta: 2
  },
  {
    texto: "Cuando un programa espera una operación de E/S",
    opciones: [
      "El programa continúa descomprimiendo aunque falten datos en RAM",
      "El disco debe ejecutar todas las instrucciones del programa",
      "La CPU queda obligada a esperar del mismo modo que el programa",
      "La CPU podría aprovecharse para ejecutar el SO u otros programas"
    ],
    correcta: 3
  }
];
