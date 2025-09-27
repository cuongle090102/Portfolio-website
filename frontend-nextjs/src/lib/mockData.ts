// Real data from database
export const mockProjects = [
  {
    id: 20,
    title: "PORTFOLIO-WEB: CUONG LE",
    description: "",
    blocks: [
      {
        id: "1",
        type: "text",
        content: ""
      }
    ],
    technologies: "Next.js,Python,Typescript,Cloudinary,Flask",
    demo_url: "",
    github_url: "",
    image_url: "https://res.cloudinary.com/dt65gnluq/image/upload/v1755760007/pw_begijr.png",
    status: "completed",
    created_at: "2025-08-21T07:08:12.477172",
    media: [
      {
        caption: "Thumbnail",
        type: "image",
        url: "https://res.cloudinary.com/dt65gnluq/image/upload/v1755760007/pw_begijr.png"
      }
    ]
  },
  {
    id: 18,
    title: "THESIS: SPODEL",
    description: "Developing a descriptive analytic system for sales promotion data in B2C",
    blocks: [
      {
        content: "We built a web-based system (codename Spodel) that ingests scanner promotion data and runs three probabilistic models — Category Incidence, Brand Choice, and Purchase Quantity — to help marketers understand which promotions actually move product in fast-moving consumer goods (groceries, drugstore items). The app bundles model estimation, visualization, and an easy UI so non-technical users can upload data and get actionable summaries",
        id: "1",
        type: "text"
      },
      {
        content: "https://res.cloudinary.com/dt65gnluq/video/upload/v1753255409/spodel-demo_1_rgh5xv.mp4",
        id: "1755760453180",
        type: "video"
      },
      {
        content: "Motivation — the problem we solved",
        id: "1755754823932",
        type: "subheading"
      },
      {
        content: "Promotions are everywhere, but their effectiveness is noisy and context-dependent. Marketing teams want to answer questions like:\n- Which promotion types work best for which categories?\n- How do price, featuring, and display affect brand share?\n- How many units do consumers buy when they respond to a promo?\nManual analysis is slow and fragmentary — we set out to automate descriptive analytics for these questions and make the results accessible through a web app.",
        id: "1755755174282",
        type: "text"
      },
      {
        content: "You can read more about three models Category Incidence, Brand Choice, Purchase Quantity to see how these answer above questions. I will give a link here: https://www.amazon.com/Handbook-Marketing-International-Operations-Management/dp/0387782125. ",
        id: "1758705254524",
        type: "text"
      },
      {
        content: "Data",
        id: "1758704952207",
        type: "subheading"
      },
      {
        content: "We use two datasets from Dumnhumby company: The Complete Journey and  Carbo-loading.",
        id: "1758704959371",
        type: "text"
      },
      {
        content: "  https://res.cloudinary.com/dt65gnluq/image/upload/v1755755788/carbo_loading_i0vtpt.png\n  https://res.cloudinary.com/dt65gnluq/image/upload/v1755755789/the_complete_journey_ftynvm.png",
        id: "1755759111481",
        images: [
          "  https://res.cloudinary.com/dt65gnluq/image/upload/v1755755788/carbo_loading_i0vtpt.png",
          "  https://res.cloudinary.com/dt65gnluq/image/upload/v1755755789/the_complete_journey_ftynvm.png"
        ],
        type: "gallery"
      },
      {
        content: "Architecture",
        id: "1758704320298",
        type: "subheading"
      },
      {
        content: "We used a modern stack to build:\n- Frontend: Angular + Plotly for visualization\n- Backend: Flask for APIs and model execution\n- Database: Supabase (PostgreSQL + MinIO object storage) \n- Deployment: Vercel (frontend), Heroku (Flask backend service)\nThis architecture ensured modularity, easy deployment, and the ability to handle real datasets while keeping the user interface accessible for non-technical users.",
        id: "1758704747472",
        type: "text"
      },
      {
        content: "https://res.cloudinary.com/dt65gnluq/image/upload/v1755755790/spodel-architecture_3_vn9edb.png",
        id: "1755755294336",
        type: "image"
      },
      {
        content: "https://res.cloudinary.com/dt65gnluq/image/upload/v1755755789/system-workflow_cl6m66.png",
        id: "1755755875752",
        type: "image"
      },
      {
        content: "My contribution",
        id: "1758704406095",
        type: "subheading"
      },
      {
        content: "As one of the two main developers, I focused primarily on:\n- Backend development: Designing Flask APIs, implementing data pipelines, and integrating statistical models\n- Data modeling: Adapting Dunnhumby-like datasets to fit the Category Incidence, Brand Choice, and Purchase Quantity frameworks\n- Visualization layer: Building interactive charts using Python to make model outputs understandable, contributing to Plotly.js building by my partner.\n- System integration: Coordinating the connection between Supabase and Flask to ensure smooth workflows\nThis allowed me to apply both my technical skills and domain knowledge in marketing analytics to create a usable, research-driven product",
        id: "1758704443656",
        type: "text"
      }
    ],
    technologies: "Python,TypeScript,Javascript,Supabase,Flask,Angular,Plotly,Statistic Models",
    demo_url: "",
    github_url: "",
    image_url: "https://res.cloudinary.com/dt65gnluq/image/upload/v1755756282/Thesis_tmzhcl.png",
    status: "completed",
    created_at: "2025-08-21T05:37:22.874087",
    media: [
      {
        caption: "",
        type: "image",
        url: "https://res.cloudinary.com/dt65gnluq/image/upload/v1755756282/Thesis_tmzhcl.png"
      }
    ]
  }
];

export const mockUser = {
  id: 1,
  username: "admin",
  email: "admin@example.com"
};

// Real favorites data from database
export const mockFavorites = {
  "films": {
    "A-Tier (Excellent)": [
      {
        "id": 5,
        "title": "Parasite",
        "year": 2019,
        "genre": "Thriller/Drama",
        "poster": "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg"
      },
      {
        "id": 6,
        "title": "Memento",
        "year": 2000,
        "genre": "Thriller/Mystery",
        "poster": "https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
      }
    ],
    "S-Tier (Masterpieces)": [
      {
        "id": 1,
        "title": "Oldboy",
        "year": 2003,
        "genre": "Thriller/Drama",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTI3NTQyMzU5M15BMl5BanBnXkFtZTcwMTM2MjgyMQ@@._V1_SX300.jpg"
      },
      {
        "id": 2,
        "title": "Oldboy",
        "year": 2003,
        "genre": "Thriller/Drama",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTI3NTQyMzU5M15BMl5BanBnXkFtZTcwMTM2MjgyMQ@@._V1_SX300.jpg"
      },
      {
        "id": 3,
        "title": "Eternal Sunshine of the Spotless Mind",
        "year": 2004,
        "genre": "Romance/Drama",
        "poster": "https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_SX300.jpg"
      },
      {
        "id": 4,
        "title": "Inception",
        "year": 2010,
        "genre": "Sci-Fi/Thriller",
        "poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
      }
    ]
  },
  "athletes": {
    "S-Tier (Legends)": [
      {
        "id": 7,
        "year": null,
        "name": "Cristiano Ronaldo",
        "sport": "Football",
        "achievement": "5x Ballon d'Or, Champions League all-time top scorer",
        "photo": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3Jpc3RpYW5vJTIwcm9uYWxkb3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        "poster": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3Jpc3RpYW5vJTIwcm9uYWxkb3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
      },
      {
        "id": 8,
        "year": null,
        "name": "Michael Jordan",
        "sport": "Basketball",
        "achievement": "6x NBA Champion, 5x MVP, Cultural Icon",
        "photo": "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWljaGFlbCUyMGpvcmRhbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        "poster": "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWljaGFlbCUyMGpvcmRhbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
      }
    ]
  }
};