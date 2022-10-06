from PIL import Image
import pytesseract
import cv2
from get_bounding_boxes import get_bb

class text_recog:
    def __init__(self):
        self.tesseract_path = r'F:\tess\tesseract.exe'
        pytesseract.pytesseract.tesseract_cmd = r'F:\tess\tesseract.exe'
        self.espa = r"F:\CETYS\7\OCR_model\tess\spa.traineddata"

    def recognize_text(self, images):
        text = []
        for image in images:
            predicted = pytesseract.image_to_string(image, lang='spa')
            text.append(predicted)
        print(text)



# PATH = r"C:\Users\Yo\Desktop\Capture.PNG"
PATH = r"C:\Users\Yo\Downloads\bw_image.png"
#cosa = cv2.imread(PATH,0)
#cosa = cv2.resize(cosa, (512, 512))
#cosa = cv2.adaptiveThreshold(cosa, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,\
#            cv2.THRESH_BINARY,13,5)
#cosa = cv2.cvtColor(cosa, cv2.COLOR_GRAY2BGR)
#cv2.imshow('de', cosa)
#cv2.waitKey(0) 
#cv2.destroyAllWindows()
recog = text_recog()
bb = get_bb()
images = bb.predict(PATH)
recog.recognize_text(images)