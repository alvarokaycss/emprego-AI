import { useEffect, useState } from 'react'
import { getJobs } from './api/jobs'
import JobCard from './components/JobCard'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e) => {
    e.preventDefault(); // Evita que a página recarregue ao dar Enter
    if (!keyword) return;

    setIsSearching(true);
    try {
      await fetch("http://localhost:8000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword })
      });
      // Sucesso! Limpamos o input. O WebSocket vai cuidar do resto.
      setKeyword(''); 
    } catch (error) {
      console.error("Erro na busca", error);
    } finally {
      setIsSearching(false);
    }
  };

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
    <>
      <Header />

      {toastMessage && (
        <div className="fixed top-36 lg:top-24 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-max">
          <div className="bg-botao text-primaria border border-texto font-bold px-4 md:px-6 py-3 md:py-4 rounded-xl shadow-2xl animate-bounce text-center text-sm md:text-base w-full">
            {toastMessage}
          </div>
        </div>
      )}

      <Routes>

        <Route path='/' element={
          <div className="max-w-4xl mx-auto pt-36 pb-12 px-4">

              <div className="w-full max-w-lg mx-auto mb-10">
                <form onSubmit={handleSearch} className="flex items-center bg-fundo border border-primaria rounded-full shadow-lg p-1">
                  <input 
                    type="text" 
                    placeholder="Busque por um cargo específico..." 
                    className="flex-1 bg-transparent text-texto px-4 outline-none placeholder-slate-400"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    disabled={isSearching}
                    className="bg-blue-300 bg-opacity-25 hover:bg-blue-300 text-primaria px-6 py-2 rounded-full font-semibold transition-all disabled:opacity-50"
                  >
                    {isSearching ? "Buscando..." : "Buscar"}
                  </button>
                </form>
              </div>

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
        }>
        </Route>

        <Route path="/filtros" element={
          <div className="pt-40 text-center text-primaria">Tela de Filtros (Em Construção)</div>
        } />

        <Route path="/monitoramento" element={
          <div className="pt-40 text-center text-primaria">Tela de Monitoramento (Em Construção)</div>
        } />

      </Routes>
    </>
  )
}

export default App