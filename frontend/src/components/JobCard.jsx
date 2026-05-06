export default function JobCard({ job }) {
  return (
    <div className="bg-superficie border border-primaria p-5 rounded-xl hover:bg-fundo transition-colors shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-primaria">{job.title}</h2>
        <span className="text-xs text-slate-500 italic">
          {new Date(job.discovered_at).toLocaleDateString()}
        </span>
      </div>
      <p className="text-texto font-medium">{job.company}</p>
      <p className="text-amber-950 text-sm mb-4">{job.location}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-xs font-mono text-texto uppercase tracking-widest">
          {job.site_source}
        </span>
        <a 
          href={job.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-botao bg-opacity-70 border border-primaria hover:bg-blue-400 hover:bg-opacity-25 text-primaria  px-4 py-2 rounded-lg text-sm font-semibold transition-all"
        >
          Visualizar Vaga
        </a>
      </div>
    </div>
  );
}