from PIL import Image
import numpy as np
import cv2
def detect():
    import easyocr
    reader = easyocr.Reader(['es','en']) # this needs to run only once to load the model into memory
    result = reader.readtext(r'F:\CETYS\p\registro-alumnos\src\Model\0.jpg', decoder='wordbeamsearch')
    for i in result:
        print(i)

def cosa():
    image =  Image.open(r"C:\Users\Yo\Downloads\bw_image.png" ).convert('RGB')
    image = np.array(image)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    temp = cv2.resize(image, (640, 320))
    temp = cv2.fastNlMeansDenoisingColored(temp,None,10,10,7,21)
    temp = cv2.cvtColor(temp, cv2.COLOR_BGR2GRAY)
    kernel = np.array([[0,-1,0],[-1,5,-1],[0,-1,0]])
    th2 = cv2.filter2D(src=temp, ddepth=-1, kernel=kernel)
    kernel = np.array([[-1,-1,-1], [-1,9,-1], [-1,-1,-1]])
    #th2 = cv2.filter2D(src=temp, ddepth=-1, kernel=kernel)
    #th2 = cv2.filter2D(src=th2, ddepth=-1, kernel=kernel)
    th2 = cv2.filter2D(src=temp, ddepth=-1, kernel=kernel)
    _, th2 = cv2.threshold(th2,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)
    
    #temp = cv2.resize(th2, (128,60))
    cv2.imwrite(r'F:\CETYS\p\registro-alumnos\src\Model\{0}.jpg'.format(0), th2)
cosa()
detect()