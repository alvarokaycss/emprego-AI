from app.infrastructure.scrapers.trabalha_brasil import TrabalhaBrasilScraper

scraper = TrabalhaBrasilScraper()
vagas = scraper.fetch_jobs("estágio")

print(f"Encontradas {len(vagas)} vagas:")
for v in vagas[:5]:
    print(f"- {v.title} na empresa {v.company} ({v.location})")
