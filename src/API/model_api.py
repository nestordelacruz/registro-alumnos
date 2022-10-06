from fastapi import FastAPI
from pydantic import BaseModel,constr


app = FastAPI()

class File(BaseModel):
    name: str
    file: str


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/send")
async def create_item(thing:File):
    return {"message": "Hello World"}