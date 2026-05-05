import { useEffect, useState } from 'react'
import { getJobs } from './api/jobs'
import JobCard from './components/JobCard'

function App() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [toastMessage, setToastMessage] = useState(null)

useEffect(() => {
  // 1. Permissão de notificação
  if ("Notification" in window &&
      Notification.permission !== "granted" &&
      Notification.permission !== "denied") {
    Notification.requestPermission();
  }

  // 2. Fetch inicial
  getJobs()
    .then(data => setJobs(data))
    .finally(() => setLoading(false));

  // 3. WebSocket
  const ws = new WebSocket("ws://localhost:8000/ws");

  ws.onmessage = (event) => {
    const newJobs = JSON.parse(event.data);

    setJobs(oldJobs => [...newJobs, ...oldJobs]);
    
    setToastMessage(`Nova(s) vaga(s) encontrada(s)!`)
    setTimeout(() => setToastMessage(null), 4000)

    // 4. Notificação (no lugar correto)
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("EmpregoAÍ - Novas Vagas!", {
        body: `Acabamos de encontrar ${newJobs.length} novas oportunidades.`,
        icon: "/favpsy.svg"
      });
    }
  };

  return () => ws.close();
}, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">EmpregoAÍ</h1>
        <p className="text-slate-600">Monitorando oportunidades em tempo real.</p>
      </header>

{toastMessage && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-botao text-primaria border border-texto font-bold px-6 py-4 rounded-xl shadow-2xl animate-bounce">
            {toastMessage}
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 animate-pulse text-slate-500">
          Sincronizando com o banco de dados...
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.length > 0 ? (
            jobs.map(job => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="text-center text-slate-500">Nenhuma vaga encontrada ainda.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default App