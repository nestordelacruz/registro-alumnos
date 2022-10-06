from fastapi import FastAPI
from pydantic import BaseModel,constr


app = FastAPI()

class File(BaseModel):
    name: str
    #file: constr(max_length=63)


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/send")
async def create_item(name: str, file):
    return{"message": "Hello World"}