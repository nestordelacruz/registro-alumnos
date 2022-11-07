from PIL import Image 
import numpy as np
import cv2
import easyocr

class text_recog:
    def __init__(self):
        self.reader = easyocr.Reader(['es','en'])

    def gcd (self,a,b):
        if b == 0:
            return a
        return self.gcd(b, a % b)

    def detect(self, image):
        image = np.array(image)
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        h, w = image.shape[:2]
        r = self.gcd(w,h)
        if r != 1:
            image = cv2.resize(image, (640, int(640*(int(h/r)/int(w/r)))))
        cv2.imwrite(r'F:\CETYS\p\registro-alumnos\src\Model\{0}.jpg'.format(0), image)
        result = self.reader.readtext(r'F:\CETYS\p\registro-alumnos\src\Model\0.jpg', decoder='wordbeamsearch', beamWidth=10)
        vigencia = None
        for i in result[-2:]:
            if i[1].isnumeric():
                if int(i[1]) > 2022:
                    vigencia = int(i[1])
                #print('YESS')   
            if i[1][-4:].isnumeric():
                if int(i[1][-4:]) > 2022:
                    vigencia = int(i[1][-4:])
                #print('YESS')
        res = []
        for i in result:
            res.append(i[1])
        return {'data':res, 'vigencia':vigencia}