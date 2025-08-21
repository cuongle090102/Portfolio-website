"""
Script to populate the favorites database with sample data from the existing favorites page
"""
import requests
import json

# Sample favorites data extracted from the favorites page
favorites_data = [
    # S-Tier Films
    {
        'title': 'Oldboy',
        'category': 'film',
        'tier': 'S-Tier (Masterpieces)',
        'year': 2003,
        'genre_or_sport': 'Thriller/Drama',
        'poster_or_photo': 'https://m.media-amazon.com/images/M/MV5BMTI3NTQyMzU5M15BMl5BanBnXkFtZTcwMTM2MjgyMQ@@._V1_SX300.jpg',
        'order': 1
    },
    {
        'title': 'Eternal Sunshine of the Spotless Mind',
        'category': 'film',
        'tier': 'S-Tier (Masterpieces)',
        'year': 2004,
        'genre_or_sport': 'Romance/Drama',
        'poster_or_photo': 'https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_SX300.jpg',
        'order': 2
    },
    {
        'title': 'Inception',
        'category': 'film',
        'tier': 'S-Tier (Masterpieces)',
        'year': 2010,
        'genre_or_sport': 'Sci-Fi/Thriller',
        'poster_or_photo': 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
        'order': 3
    },
    # A-Tier Films
    {
        'title': 'Parasite',
        'category': 'film',
        'tier': 'A-Tier (Excellent)',
        'year': 2019,
        'genre_or_sport': 'Thriller/Drama',
        'poster_or_photo': 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
        'order': 1
    },
    {
        'title': 'Memento',
        'category': 'film',
        'tier': 'A-Tier (Excellent)',
        'year': 2000,
        'genre_or_sport': 'Thriller/Mystery',
        'poster_or_photo': 'https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        'order': 2
    },
    # S-Tier Athletes
    {
        'title': 'Cristiano Ronaldo',
        'category': 'athlete',
        'tier': 'S-Tier (Legends)',
        'year': None,
        'genre_or_sport': 'Football',
        'achievement': '5x Ballon d\'Or, Champions League all-time top scorer',
        'poster_or_photo': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3Jpc3RpYW5vJTIwcm9uYWxkb3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
        'order': 1
    },
    {
        'title': 'Michael Jordan',
        'category': 'athlete',
        'tier': 'S-Tier (Legends)',
        'year': None,
        'genre_or_sport': 'Basketball',
        'achievement': '6x NBA Champion, 5x MVP, Cultural Icon',
        'poster_or_photo': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWljaGFlbCUyMGpvcmRhbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
        'order': 2
    }
]

# Function to populate database
def populate_favorites():
    base_url = 'http://127.0.0.1:5000/api/favorites/'
    
    for favorite in favorites_data:
        try:
            response = requests.post(base_url, json=favorite)
            if response.status_code == 201:
                print(f"Added: {favorite['title']}")
            else:
                print(f"Failed to add {favorite['title']}: {response.text}")
        except Exception as e:
            print(f"Error adding {favorite['title']}: {str(e)}")

if __name__ == '__main__':
    populate_favorites()