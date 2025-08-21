from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, JSON
from datetime import datetime
from database import db

class Project(db.Model):
    __tablename__ = 'projects'
    
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, nullable=False)
    short_description = Column(Text)
    full_description = Column(Text)
    media = Column(JSON)  # [{type, url, caption}]
    tags = Column(JSON)  # ["React", "Node.js", etc.]
    technologies = Column(JSON)
    links = Column(JSON)  # {demo, github, etc.}
    featured = Column(Boolean, default=False)
    status = Column(String(50), default='completed')
    order = Column(Integer)
    views = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Skill(db.Model):
    __tablename__ = 'skills'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    category = Column(String(50))
    proficiency = Column(Integer)
    icon = Column(String(200))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Contact(db.Model):
    __tablename__ = 'contacts'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    email = Column(String(100))
    subject = Column(String(200))
    message = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String(50), default='unread')

class Favorite(db.Model):
    __tablename__ = 'favorites'
    
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    category = Column(String(50), nullable=False)  # 'film' or 'athlete'
    tier = Column(String(50), nullable=False)  # 'S-Tier', 'A-Tier', etc.
    year = Column(Integer)
    genre_or_sport = Column(String(100))  # genre for films, sport for athletes
    achievement = Column(String(200))  # for athletes
    poster_or_photo = Column(String(500))  # image URL
    created_at = Column(DateTime, default=datetime.utcnow)
    order = Column(Integer, default=0)