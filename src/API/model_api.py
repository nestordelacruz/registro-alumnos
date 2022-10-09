from fastapi import FastAPI, File, BackgroundTasks
from pydantic import BaseModel,constr
from starlette.middleware.cors import CORSMiddleware
from PIL import Image
import io
import sys
sys.path.insert(0,"..")
from Model.text_recognition import text_recog
from Model.get_bounding_boxes import get_bb

import cv2
import numpy as np

recog_instance = text_recog()
bb_instance = get_bb()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows all origins
    allow_credentials=False,
    allow_methods=["*"], # Allows all methods
    allow_headers=["*"], # Allows all headers
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

def coa(file):
    #print(file)
    image =  Image.open(io.BytesIO(file) ).convert('RGB')
    image = np.array(image)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    rs = recog_instance.do_all(image, bb_instance)
    #print(rs)
    return rs

@app.post("/send2")
async def create_item(file: bytes = File(...), background_tasks: BackgroundTasks = None):
    #print(file)
    # background_tasks.add_task(coa, file)
    response = coa(file)
    return {"message": response}