from PIL import Image
import pytesseract
import cv2
import numpy as np
import sys
sys.path.insert(0,"..")

#from get_bounding_boxes import get_bb

class text_recog:
    def __init__(self):
        self.tesseract_path = r'F:\tess\tesseract.exe'
        pytesseract.pytesseract.tesseract_cmd = r'F:\tess\tesseract.exe'
        self.espa = r"F:\CETYS\7\OCR_model\tess\spa.traineddata"

    def do_all(self, image, get_bb):
        image = np.array(image)
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        #image = image[:, :, ::-1].copy() 
        #print("before call", image.shape)
        images = get_bb.predict(image)
        return self.recognize_text(images)
        
    def recognize_text(self, images:list):
        text = []
        for image in images:
            predicted = pytesseract.image_to_string(image, lang='spa')
            text.append(predicted)
        return text
