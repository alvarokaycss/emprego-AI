from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Optional


@dataclass
class Job:
    title: str
    company: str
    location: str
    link: str
    site_source: str
    description: Optional[str] = None
    id: Optional[int] = None
    discovered_at: datetime = field(default_factory=datetime.now)


@dataclass
class UserProfile:
    keywords: List[str]
    email_notification: str
    min_salary: Optional[float] = None
