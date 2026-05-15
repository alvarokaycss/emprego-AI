import ReactPaginate from 'react-paginate';

// Props necessárias:
// - pageCount: Total de páginas (vem do backend, ex: Math.ceil(total_vagas / limit))
// - currentPage: A página atual (0-indexada no react-paginate)
// - onPageChange: Função chamada ao clicar em uma nova página
export function Pagination({ pageCount, currentPage, onPageChange }) {
  // Se só tiver 1 página, não precisa renderizar a paginação
  if (pageCount <= 1) return null;

  // Interop para garantir que seja a função e não um objeto {default: fn}
  const PaginateComponent = ReactPaginate.default || ReactPaginate;

  return (
    <PaginateComponent
      breakLabel="..."
      nextLabel="Próximo >"
      previousLabel="< Anterior"
      onPageChange={onPageChange}
      pageRangeDisplayed={3} // Quantas páginas mostrar ao redor da atual
      marginPagesDisplayed={1} // Quantas páginas mostrar nas pontas (início/fim)
      pageCount={pageCount}
      forcePage={currentPage} // Força a página atual (útil ao ler da URL)
      
      // === Classes do Tailwind CSS ===
      // Container principal (a tag <ul>)
      containerClassName="flex items-center justify-center space-x-2 mt-8"
      
      // Estilo de cada botão de página normal
      pageClassName="block"
      pageLinkClassName="px-4 py-2 text-sm font-semibold text-fundo bg-primaria border border-3 border-superficie rounded-full hover:bg-superficie transition-colors hover:border-primaria shadow-lg hover:text-primaria"
      
      // Estilo da página ATUAL (ativa)
      activeClassName="block"
      activeLinkClassName="px-4 py-2 text-xl font-bold text-white bg-primaria border border-3 border-superficie rounded-full hover:bg-superficie shadow-lg"
      
      // Botões "Anterior" e "Próximo"
      previousClassName="block"
      previousLinkClassName="px-4 py-2 text-sm font-semibold text-fundo bg-primaria border border-4 border-superficie rounded-full hover:bg-superficie hover:text-primaria shadow-2xl hover:border-primaria shadow-lg"
      nextClassName="block"
      nextLinkClassName="px-4 py-2 text-sm font-semibold text-fundo bg-primaria border border-4 border-superficie rounded-full hover:bg-superficie hover:text-primaria shadow-2xl hover:border-primaria shadow-lg"
      
      // Quando os botões Anterior/Próximo estiverem desabilitados (na primeira ou última página)
      disabledClassName="opacity-50 cursor-not-allowed"
      disabledLinkClassName="hover:bg-superficie cursor-not-allowed hover:border-primaria border-4 border-superficie"
      
      // Estilo dos "..."
      breakClassName="block"
      breakLinkClassName="px-4 py-2 text-sm font-semibold text-fundo bg-primaria border border-3 border-superficie rounded-full hover:bg-superficie hover:border-primaria hover:text-primaria"
    />
  );
}
