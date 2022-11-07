from fastapi import FastAPI, File, BackgroundTasks
from starlette.requests import Request
from starlette.middleware.cors import CORSMiddleware
from PIL import Image 
import io
import sys
sys.path.insert(0,"..")

from Model.model_text_recognition import text_recog
from Model.text_evaluation import eval_text

recog_instance = text_recog()

eval_text_instance = eval_text()

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
    rs = recog_instance.detect(image)
    #print(rs)
    return rs

@app.post("/send2")
async def create_item(file: bytes = File(...), background_tasks: BackgroundTasks = None):
    #print(file)
    # background_tasks.add_task(coa, file)
    response = coa(file)
    return {"message": response} 

@app.post('/similarity')
async def check_similarity(request: Request, background_tasks: BackgroundTasks = None):
    data = await request.json()
    user_data = list(data['data']['user_data'].values())
    print('user_data', user_data)
    results = eval_text_instance.eval_similarity(data['data']['model_response'], user_data)
    print(results)

    return {'failed_detections':list(results.values())}
