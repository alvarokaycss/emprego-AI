import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

load_dotenv()


class NotifierService:
    def __init__(self):
        self.smtp_server: str = "smtp.gmail.com"
        self.smtp_port: int = 587
        self.sender_email: str = os.getenv("EMAIL_SENDER", "")
        self.password: str = os.getenv("EMAIL_PASSWORD", "")
        self.recipient_email: str = os.getenv("EMAIL_RECEIVER", "")

    def send_new_jobs_alert(self, jobs):
        if not jobs:
            return

        message = MIMEMultipart()
        message['From'] = self.sender_email
        message['To'] = self.recipient_email
        message['Subject'] = f"Novas vagas encontradas: {len(jobs)}"

        body = "Novas vagas encontradas:\n\n"
        for job in jobs:
            body += (f"- {job.title} | {job.company} | "
                     f"{job.location}\n Link: {job.link}\n\n")

        message.attach(MIMEText(body, 'plain'))

        try:
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.sender_email, self.password)
            server.sendmail(
                self.sender_email,
                self.recipient_email,
                message.as_string()
            )
            server.quit()
            print("Email enviado com sucesso!")
        except Exception as e:
            print(f"Erro ao enviar email: {str(e)}")
