from PIL import Image 
import numpy as np
import cv2

def gcd (a,b):
    if b == 0:
        return a
    return gcd(b, a % b)

def detect():
    import easyocr
    reader = easyocr.Reader(['es','en']) # this needs to run only once to load the model into memory
    image =  Image.open(r"D:\CETYS\7\INE2.jpg").convert('RGB')
    image = np.array(image)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    h, w = image.shape[:2]
    r = gcd(w,h)
    if r != 1:
        image = cv2.resize(image, (640, int(640*(int(h/r)/int(w/r)))))
    #image = cv2.resize(image, (640, 320))
    #temp = cv2.fastNlMeansDenoisingColored(temp,None,10,10,7,21)
    cv2.imwrite(r'F:\CETYS\p\registro-alumnos\src\Model\{0}.jpg'.format(0), image)
    result = reader.readtext(r'F:\CETYS\p\registro-alumnos\src\Model\0.jpg', decoder='wordbeamsearch', beamWidth=10)
    vigencia = None
    for i in result[:-2]:
        print(i)
    for i in result[-2:]:
        if i[1].isnumeric():
            if int(i[1]) > 2022:
                vigencia = int(i[1])
            print('YESS')   
        if i[1][-4:].isnumeric():
            if int(i[1][-4:]) > 2022:
                vigencia = int(i[1][-4:])
            print('YESS')
    print(vigencia, result[:][:][1])

def cosa():
    image =  Image.open(r"D:\CETYS\7\MbFOuxJ1nna1V.jpg" ).convert('RGB')
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
#cosa()
detect()