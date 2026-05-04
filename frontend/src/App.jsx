import { useEffect, useState } from 'react'
import { getJobs } from './api/jobs'
import JobCard from './components/JobCard'

function App() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getJobs()
      .then(data => setJobs(data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">EmpregoAÍ</h1>
        <p className="text-slate-600">Monitorando oportunidades em tempo real.</p>
      </header>

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