from fastapi import FastAPI
from pydantic import BaseModel,constr
from starlette.middleware.cors import CORSMiddleware



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all origins
    allow_credentials=False,
    allow_methods=["*"], # Allows all methods
    allow_headers=["*"], # Allows all headers
)
class File(BaseModel):
    name: str
    file: str


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/send")
async def create_item(thing:File):
    return {"message": "Hello World"}

@app.post("/send2")
async def create_item(name:str, file:str):
    return {"message": "Hello World"}