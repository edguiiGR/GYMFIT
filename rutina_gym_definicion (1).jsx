import React, { useState, useEffect } from "react";

const rutina = {
  "Día 1": {
    titulo: "Pecho y Tríceps",
    ejercicios: [
      { nombre: "Press banca plano", series: 4, repeticiones: "8-12" },
      { nombre: "Press inclinado mancuernas", series: 4, repeticiones: "8-12" },
      { nombre: "Fondos en paralelas", series: 3, repeticiones: "12-15" },
      { nombre: "Extensiones de tríceps polea", series: 3, repeticiones: "12-15" }
    ],
    core: ["Plancha 3x1min", "Ab wheel 3x12"],
    hiit: ["Sprints 30s x 10"],
    dieta: "Desayuno: Avena + claras; Almuerzo: Pollo + quinoa; Cena: Ensalada + pescado."
  },
  "Día 2": {
    titulo: "Espalda y Bíceps",
    ejercicios: [
      { nombre: "Dominadas", series: 4, repeticiones: "6-10" },
      { nombre: "Remo con barra", series: 4, repeticiones: "8-12" },
      { nombre: "Curl bíceps con mancuernas", series: 3, repeticiones: "12-15" },
      { nombre: "Curl martillo", series: 3, repeticiones: "12-15" }
    ],
    core: ["Crunches 3x20", "Russian twists 3x30"],
    hiit: ["Burpees 40s x 8"],
    dieta: "Desayuno: Yogur griego + frutos rojos; Almuerzo: Salmón + arroz integral; Cena: Verduras + tortilla."
  },
  "Día 3": {
    titulo: "Piernas",
    ejercicios: [
      { nombre: "Sentadillas", series: 4, repeticiones: "8-12" },
      { nombre: "Prensa", series: 4, repeticiones: "10-15" },
      { nombre: "Peso muerto rumano", series: 4, repeticiones: "8-12" },
      { nombre: "Elevaciones de gemelos", series: 3, repeticiones: "15-20" }
    ],
    core: ["Elevaciones de piernas 3x15", "Plancha lateral 3x45s"],
    hiit: ["Saltos pliométricos 30s x 10"],
    dieta: "Desayuno: Tortilla de claras + pan integral; Almuerzo: Pavo + batata; Cena: Ensalada + atún."
  },
  "Día 4": {
    titulo: "Hombros y Core",
    ejercicios: [
      { nombre: "Press militar", series: 4, repeticiones: "8-12" },
      { nombre: "Elevaciones laterales", series: 3, repeticiones: "12-15" },
      { nombre: "Face pulls", series: 3, repeticiones: "12-15" },
      { nombre: "Encogimientos de trapecio", series: 3, repeticiones: "15-20" }
    ],
    core: ["Plancha 3x1min", "Ab wheel 3x15"],
    hiit: ["Sprints 20s x 12"],
    dieta: "Desayuno: Smoothie proteína + banana; Almuerzo: Ternera + quinoa; Cena: Verduras + huevo."
  },
  "Día 5": {
    titulo: "Full Body + HIIT",
    ejercicios: [
      { nombre: "Kettlebell swings", series: 4, repeticiones: "15-20" },
      { nombre: "Burpees", series: 4, repeticiones: "15-20" },
      { nombre: "Jump squats", series: 4, repeticiones: "15-20" },
      { nombre: "Mountain climbers", series: 4, repeticiones: "30 seg" }
    ],
    core: ["Crunches 3x20", "Russian twists 3x30"],
    hiit: ["Circuito 40s ON / 20s OFF x 5 rondas"],
    dieta: "Desayuno: Avena + fruta; Almuerzo: Pollo + verduras; Cena: Pescado + ensalada."
  }
};

export default function App() {
  const [diaSeleccionado, setDiaSeleccionado] = useState("Día 1");
  const [progreso, setProgreso] = useState({});
  const [pesoCorporal, setPesoCorporal] = useState([]);
  const [nuevoPeso, setNuevoPeso] = useState("");
  const [timer, setTimer] = useState(0);
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    let interval;
    if (activo) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [activo]);

  const iniciarTimer = () => {
    setActivo(true);
    setTimer(0);
  };
  const pausarTimer = () => setActivo(false);
  const reiniciarTimer = () => {
    setActivo(false);
    setTimer(0);
  };

  const guardarProgreso = (ejercicio, valor) => {
    setProgreso((prev) => ({
      ...prev,
      [diaSeleccionado]: {
        ...prev[diaSeleccionado],
        [ejercicio]: valor
      }
    }));
  };

  const registrarPesoCorporal = () => {
    const pesoNum = parseFloat(nuevoPeso);
    if (pesoNum > 0) {
      const fecha = new Date().toLocaleDateString();
      setPesoCorporal([...pesoCorporal, { fecha, peso: pesoNum }]);
      setNuevoPeso("");
    }
  };

  const datos = rutina[diaSeleccionado];

  return (
    <div style={{ maxWidth: 500, margin: "auto", fontFamily: "Arial, sans-serif", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Rutina Definición</h1>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        {Object.keys(rutina).map((dia) => (
          <button
            key={dia}
            onClick={() => setDiaSeleccionado(dia)}
            style={{
              padding: "8px 10px",
              borderRadius: 5,
              border: dia === diaSeleccionado ? "2px solid #6200ee" : "1px solid #ccc",
              backgroundColor: dia === diaSeleccionado ? "#dcd6f7" : "white",
              cursor: "pointer",
              flex: 1,
              margin: "0 2px"
            }}
          >
            {dia}
          </button>
        ))}
      </div>

      <h2>{datos.titulo}</h2>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #ccc", padding: 8, textAlign: "left" }}>Ejercicio</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: 8, textAlign: "center" }}>Series</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: 8, textAlign: "center" }}>Repeticiones</th>
            <th style={{ borderBottom: "2px solid #ccc", padding: 8, textAlign: "center" }}>Peso (kg)</th>
          </tr>
        </thead>
        <tbody>
          {datos.ejercicios.map(({ nombre, series, repeticiones }) => (
            <tr key={nombre}>
              <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{nombre}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8, textAlign: "center" }}>{series}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8, textAlign: "center" }}>{repeticiones}</td>
              <td style={{ borderBottom: "1px solid #eee", padding: 8, textAlign: "center" }}>
                <input
                  type="number"
                  min="0"
                  value={progreso[diaSeleccionado]?.[nombre] || ""}
                  onChange={(e) => guardarProgreso(nombre, e.target.value)}
                  style={{ width: 70, padding: 4, textAlign: "center" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Ejercicios Core</h3>
      <ul>
        {datos.core.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>

      <h3>Entrenamiento HIIT</h3>
      <ul>
        {datos.hiit.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>

      <h3>Dieta sugerida</h3>
      <p>{datos.dieta}</p>

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <p style={{ fontWeight: "bold" }}>
          Timer: {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
        </p>
        <div>
          <button onClick={iniciarTimer} style={{ marginRight: 10 }}>
            Iniciar
          </button>
          <button onClick={pausarTimer} style={{ marginRight: 10 }}>
            Pausar
          </button>
          <button onClick={reiniciarTimer}>Reiniciar</button>
        </div>
      </div>

      <div style={{ marginTop: 30 }}>
        <h3>Registro de peso corporal</h3>
        <input
          type="number"
          placeholder="Peso (kg)"
          value={nuevoPeso}
          onChange={(e) => setNuevoPeso(e.target.value)}
          style={{ padding: 6, width: 100, marginRight: 10 }}
        />
        <button onClick={registrarPesoCorporal}>Agregar</button>

        {pesoCorporal.length > 0 && (
          <table style={{ width: "100%", marginTop: 15, borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "2px solid #ccc", padding: 8 }}>Fecha</th>
                <th style={{ borderBottom: "2px solid #ccc", padding: 8, textAlign: "center" }}>Peso (kg)</th>
              </tr>
            </thead>
            <tbody>
              {pesoCorporal.map(({ fecha, peso }, i) => (
                <tr key={i}>
                  <td style={{ borderBottom: "1px solid #eee", padding: 8 }}>{fecha}</td>
                  <td style={{ borderBottom: "1px solid #eee", padding: 8, textAlign: "center" }}>{peso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
