import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const rutina = {
  "Día 1": {
    titulo: "Pecho y Tríceps",
    ejercicios: [
      { nombre: "Press banca plano", imagen: "https://via.placeholder.com/80?text=Press+Banca" },
      { nombre: "Press inclinado mancuernas", imagen: "https://via.placeholder.com/80?text=Press+Inclinado" },
      { nombre: "Fondos en paralelas", imagen: "https://via.placeholder.com/80?text=Fondos" }
    ],
    core: ["Plancha 3x1min", "Ab wheel 3x12"],
    hiit: ["Sprints 30s x 10"],
    dieta: "Desayuno: Avena + claras; Almuerzo: Pollo + quinoa; Cena: Ensalada + pescado."
  }
};

export default function App() {
  const [diaSeleccionado, setDiaSeleccionado] = useState("Día 1");
  const [timer, setTimer] = useState(0);
  const [activo, setActivo] = useState(false);
  const [progreso, setProgreso] = useState({});
  const [pesoCorporal, setPesoCorporal] = useState([]);
  const [nuevoPeso, setNuevoPeso] = useState("");

  useEffect(() => {
    let interval;
    if (activo) interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [activo]);

  const iniciarTimer = () => { setActivo(true); setTimer(0); };
  const pausarTimer = () => setActivo(false);
  const reiniciarTimer = () => { setActivo(false); setTimer(0); };

  const guardarProgreso = (ejercicio, peso) => {
    setProgreso((prev) => ({
      ...prev,
      [diaSeleccionado]: {
        ...prev[diaSeleccionado],
        [ejercicio]: peso
      }
    }));
  };

  const registrarPesoCorporal = () => {
    if (parseFloat(nuevoPeso) > 0) {
      const fecha = new Date().toLocaleDateString();
      setPesoCorporal([...pesoCorporal, { fecha, peso: parseFloat(nuevoPeso) }]);
      setNuevoPeso("");
    }
  };

  const datos = rutina[diaSeleccionado];

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">Rutina Definición</h1>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {Object.keys(rutina).map((dia) => (
          <Button key={dia} variant={dia === diaSeleccionado ? "default" : "outline"} onClick={() => setDiaSeleccionado(dia)}>
            {dia.split(" ")[1]}
          </Button>
        ))}
      </div>
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">{datos.titulo}</h2>
          {datos.ejercicios && (
            <div>
              <p className="font-medium">Ejercicios (registra peso):</p>
              <ul className="list-none pl-0 mb-2">
                {datos.ejercicios.map((e, i) => (
                  <li key={i} className="mb-4 border p-2 rounded-lg">
                    <div className="flex items-center gap-3">
                      <img src={e.imagen} alt={e.nombre} width={80} height={80} className="rounded" />
                      <div className="flex-1">
                        <p className="font-semibold">{e.nombre}</p>
                        <Input type="number" placeholder="Peso (kg)" className="mt-1" onChange={(ev) => guardarProgreso(e.nombre, ev.target.value)} />
                        <p className="text-sm text-gray-600">Previo: {progreso[diaSeleccionado]?.[e.nombre] || "-"} kg</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {datos.core && (
            <div>
              <p className="font-medium">Core:</p>
              <ul className="list-disc pl-6 mb-2">
                {datos.core.map((c, i) => (<li key={i}>{c}</li>))}
              </ul>
            </div>
          )}
          {datos.hiit && (
            <div>
              <p className="font-medium">HIIT:</p>
              <ul className="list-disc pl-6 mb-2">
                {datos.hiit.map((h, i) => (<li key={i}>{h}</li>))}
              </ul>
            </div>
          )}
          <div className="mt-4">
            <p className="font-medium">Dieta sugerida para hoy:</p>
            <p className="text-sm text-gray-700">{datos.dieta}</p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 text-center">
        <p className="text-lg font-bold">Timer: {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}</p>
        <div className="flex justify-center gap-2 mt-2">
          <Button onClick={iniciarTimer}>Iniciar</Button>
          <Button onClick={pausarTimer} variant="outline">Pausar</Button>
          <Button onClick={reiniciarTimer} variant="destructive">Reiniciar</Button>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Registro de peso corporal</h3>
        <div className="flex gap-2 mb-2">
          <Input type="number" value={nuevoPeso} placeholder="Peso (kg)" onChange={(e) => setNuevoPeso(e.target.value)} />
          <Button onClick={registrarPesoCorporal}>Agregar</Button>
        </div>
        {pesoCorporal.length > 0 && (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={pesoCorporal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Line type="monotone" dataKey="peso" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
