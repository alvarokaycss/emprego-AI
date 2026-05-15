# flake8: noqa

import requests
import re
from bs4 import BeautifulSoup
from typing import List
from app.domain.models import Job
from app.infrastructure.scrapers.base import JobScraperStrategy

class TrabalhaBrasilScraper(JobScraperStrategy):
    def __init__(self):
        self.base_url = "https://www.trabalhabrasil.com.br/vagas-de-emprego"

    def fetch_jobs(self, keyword: str) -> List[Job]:
        # Adiciona "home office" para forçar que a busca retorne apenas vagas remotas
        search_term = f"{keyword} home office"
        formatted_keyword = search_term.replace(" ", "-").lower()
        url = f"{self.base_url}/{formatted_keyword}"
        
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        }

        try:
            response = requests.get(url, headers=headers, timeout=10)
            if response.status_code != 200:
                return []
            
            soup = BeautifulSoup(response.content, "html.parser")
            jobs = []

            # O 'pai' de tudo é o article com a classe job-card
            job_cards = soup.find_all("article", class_="job-card")

            for card in job_cards:
                try:
                    # 1. Título (está dentro do h2 com classe job-title)
                    title_tag = card.find("h2", class_="job-title")
                    title = title_tag.get_text(strip=True).replace("Vaga de ", "")
                    
                    # 2. Link (é o <a> que envolve o conteúdo, classe job-link)
                    link_tag = card.find("a", class_="job-link")
                    link = "https://www.trabalhabrasil.com.br" + link_tag["href"]

                    # Verifica se a vaga é realmente remota limpando espaços e caracteres especiais
                    card_text_clean = re.sub(r'[^a-z0-9]', '', card.get_text().lower())
                    is_remote = any(word in card_text_clean for word in ["remoto", "homeoffice", "teletrabalho", "anywhere"])
                    
                    if not is_remote:
                        continue

                    # 3. Empresa (está no span dentro do p.job-company)
                    company_tag = card.find("p", class_="job-company")
                    company = company_tag.find("span").get_text(strip=True) if company_tag else "Não informada"

                    # 4. Localização (está no span dentro do p.job-location)
                    location_tag = card.find("p", class_="job-location")
                    location = location_tag.find("span").get_text(strip=True) if location_tag else "Brasil"

                    jobs.append(Job(
                        title=title,
                        company=company,
                        location=location,
                        link=link,
                        site_source="Trabalha Brasil"
                    ))
                except Exception as e:
                    print(f"[DEBUG] Erro ao processar card: {e}")
                    continue

            return jobs
        except Exception as e:
            print(f"[ERRO] Falha na requisição: {e}")
            return []
    