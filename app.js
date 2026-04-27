let preguntas = [
    {
        texto: "¿Cómo te has sentido esta semana?",
        opciones: [
            { texto: "😄 Tranquila/o", valor: 1 },
            { texto: "😐 Normal", valor: 2 },
            { texto: "😥 Estresada/o", valor: 3 },
            { texto: "😣 Muy ansiosa/o", valor: 4 }
        ]
    },
    {
        texto: "¿Cuánto te ha costado concentrarte?",
        opciones: [
            { texto: "Nada", valor: 1 },
            { texto: "Poco", valor: 2 },
            { texto: "Mucho", valor: 3 },
            { texto: "Demasiado", valor: 4 }
        ]
    },
    {
        texto: "¿Cómo has dormido?",
        opciones: [
            { texto: "Muy bien", valor: 1 },
            { texto: "Regular", valor: 2 },
            { texto: "Mal", valor: 3 },
            { texto: "Muy mal", valor: 4 }
        ]
    },
    {
        texto: "¿Te has sentido sobrecargada/o?",
        opciones: [
            { texto: "No", valor: 1 },
            { texto: "Un poco", valor: 2 },
            { texto: "Sí", valor: 3 },
            { texto: "Mucho", valor: 4 }
        ]
    },
    {
        texto: "¿Qué tan motivada/o estás?",
        opciones: [
            { texto: "Muy motivada/o", valor: 1 },
            { texto: "Normal", valor: 2 },
            { texto: "Poco", valor: 3 },
            { texto: "Nada", valor: 4 }
        ]
    }
];

let preguntaActual = 0;
let respuestas = [];
let seleccion = null;

function irATest() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("test").classList.remove("hidden");
    cargarPregunta();
}

function cargarPregunta() {
    let p = preguntas[preguntaActual];
    document.getElementById("pregunta").innerText = p.texto;

    let contenedor = document.getElementById("opciones");
    contenedor.innerHTML = "";

    p.opciones.forEach((op, index) => {
        let div = document.createElement("div");
        div.classList.add("option");
        div.innerText = op.texto;

        div.onclick = () => {
            seleccion = op.valor;

            document.querySelectorAll(".option").forEach(o => o.style.background = "#334155");
            div.style.background = "#a78bfa";
        };

        contenedor.appendChild(div);
    });
}

function siguientePregunta() {
    if (seleccion === null) {
        alert("Selecciona una opción");
        return;
    }

    respuestas.push(seleccion);
    seleccion = null;
    preguntaActual++;

    if (preguntaActual < preguntas.length) {
        cargarPregunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    document.getElementById("test").classList.add("hidden");
    document.getElementById("resultado").classList.remove("hidden");

    let total = respuestas.reduce((a, b) => a + b, 0);
    let promedio = total / respuestas.length;

    let nivel = "";
    let mensaje = "";
    let caja = "";

    if (promedio <= 1.5) {
        nivel = "😊 Estrés bajo";
        mensaje = "Te encuentras en buen estado emocional.";
        caja = "🌿 Caja Relax: infusiones, aromaterapia y journaling.";
    } 
    else if (promedio <= 2.5) {
        nivel = "😌 Estrés moderado";
        mensaje = "Podrías beneficiarte de pausas activas.";
        caja = "🌸 Caja Balance: snacks saludables, ejercicios guiados y anti estrés.";
    } 
    else {
        nivel = "😣 Estrés alto";
        mensaje = "Se recomienda tomar descansos y usar microterapia.";
        caja = "🧘 Caja Calma: elementos sensoriales, respiración guiada y relajación profunda.";
    }

    document.getElementById("nivel").innerText = nivel;
    document.getElementById("mensaje").innerText = mensaje;

    // 👇 NUEVO
    document.getElementById("caja").innerText = caja;
}

function volverInicio() {
    preguntaActual = 0;
    respuestas = [];

    document.getElementById("resultado").classList.add("hidden");
    document.getElementById("test").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");
}