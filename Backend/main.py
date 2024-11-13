import uvicorn
from API.API import app
from starlette.middleware.cors import CORSMiddleware


app.add_middleware(CORSMiddleware,
                   allow_origins=["*"],
                   allow_methods=["*"],
                   allow_headers=["*"])

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True, host="0.0.0.0") 