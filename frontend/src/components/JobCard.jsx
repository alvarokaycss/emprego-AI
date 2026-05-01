export default function JobCard({ job }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-blue-500 transition-colors shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-bold text-blue-400">{job.title}</h2>
        <span className="text-xs text-slate-500 italic">
          {new Date(job.discovered_at).toLocaleDateString()}
        </span>
      </div>
      <p className="text-slate-300 font-medium">{job.company}</p>
      <p className="text-slate-400 text-sm mb-4">{job.location}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">
          {job.site_source}
        </span>
        <a 
          href={job.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
        >
          Visualizar Vaga
        </a>
      </div>
    </div>
  );
}