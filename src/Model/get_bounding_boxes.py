from imutils.object_detection import non_max_suppression
import numpy as np
import time
import cv2
import os

PATH = r"D:\CETYS\7\IFE frente.jpg"

class get_bb:
    def __init__(self):
        self.EAST_PATH= r"F:\CETYS\7\OCR_model\tess\frozen_east_text_detection.pb"
        self.layerNames = [
            "feature_fusion/Conv_7/Sigmoid",
            "feature_fusion/concat_3"]
        """path = os.path.join(os.getcwd(), 'imgs')
        if os.path.exists(dir):
            os.mkdir(path)"""

    def read_and_resize(self, PATH):
        image = cv2.imread(PATH)

        (H,W) = image.shape[:2]

        (newW, newH) = (512, 480)
        # scaling factors
        rW = W / float(newW)
        rH = H / float(newH)
        image = cv2.resize(image, (newW, newH))
        (H, W) = image.shape[:2]
        return (H,W, image)
        
    def compute_bb(self, scores, geometry):
        (numRows, numCols) = scores.shape[2:4]
        rects = []
        confidences = []

        for y in range(0, numRows):

            scoresData = scores[0, 0, y]
            xData0 = geometry[0, 0, y]
            xData1 = geometry[0, 1, y]
            xData2 = geometry[0, 2, y]
            xData3 = geometry[0, 3, y]
            anglesData = geometry[0, 4, y]
            for x in range(0, numCols):
                if scoresData[x] < 0.4:
                    continue
                (offsetX, offsetY) = (x * 4.0, y * 4.0)
                angle = anglesData[x]
                cos = np.cos(angle)
                sin = np.sin(angle)
                h = xData0[x] + xData2[x]
                w = xData1[x] + xData3[x]
                endX = int(offsetX + (cos * xData1[x]) + (sin * xData2[x]))
                endY = int(offsetY - (sin * xData1[x]) + (cos * xData2[x]))
                startX = int(endX - w)
                startY = int(endY - h)
                rects.append((startX, startY, endX, endY))
                confidences.append(scoresData[x])
        return rects, confidences

    def predict(self, image_reference=None):
        (H, W, image) = self.read_and_resize(image_reference)
        # AQUI EMPIEZA EL MODELO
        net = cv2.dnn.readNet(self.EAST_PATH)
        blob = cv2.dnn.blobFromImage(image, 1.0, (W, H),
            (123.68, 116.78, 103.94), swapRB=True, crop=False)
        net.setInput(blob)
        (scores, geometry) = net.forward(self.layerNames)
        rects, confidences = self.compute_bb(scores, geometry)
        boxes = non_max_suppression(np.array(rects), probs=confidences)
        # AQUI TERMINA EL MODELO
        cropped = []
        boxes = sorted(boxes, key=lambda x:x[1])
        cosa = [ i for i in boxes if i[2]<W/2 ]
        pad = 5
        index = 0
        for (startX, startY, endX, endY) in cosa:
            temp = image[startY:, startX-2:][:endY-startY+5, :endX-startX+5]
            #print((endX-startX) / (endY-startY) )
            """ar = (endX-startX) / (endY-startY)
            temp = cv2.resize(temp, (int(320*ar/5),60))
            temp = cv2.cvtColor(temp, cv2.COLOR_BGR2GRAY)
            kernel = np.array([[-1,-1,-1,-1,-1],
                             [-1,2,2,2,-1],
                             [-1,2,8,2,-1],
                             [-1,2,2,2,-1],
                             [-1,-1,-1,-1,-1]]) / 8.0
            mage_sharp = cv2.filter2D(src=temp, ddepth=-1, kernel=kernel)
            _, th2 = cv2.threshold(mage_sharp,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)
            th2 = cv2.filter2D(src=th2, ddepth=-1, kernel=kernel)
            th2 = cv2.filter2D(src=th2, ddepth=-1, kernel=kernel)"""
            #temp = cv2.resize(th2, (128,60))
            cv2.imwrite(r'D:\ocr_registro_alumnos\imgs\{0}.jpg'.format(index), temp)
            index += 1
            cropped.append(temp)
           
        return cropped  
        

BB = get_bb()
cropped  = BB.predict(PATH)