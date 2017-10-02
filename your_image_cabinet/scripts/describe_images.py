import os
import sys
import numpy as np
import json
import requests
from io import BytesIO

import django
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "your_image_cabinet.settings")
django.setup()

from image_cabinet import models


CLASS_INDEX_FILE_P = os.path.join(BASE_DIR, 'assets/imagenet_class_index.json')
model = None


CLASS_INDEX = json.load(open(CLASS_INDEX_FILE_P))


def decode_predictions(preds, top=5):
    """Decodes the prediction of an ImageNet model.
    # Arguments
        preds: Numpy tensor encoding a batch of predictions.
        top: integer, how many top-guesses to return.
    # Returns
        A list of lists of top class prediction tuples
        `(class_name, class_description, score)`.
        One list of tuples per sample in batch input.
    # Raises
        ValueError: in case of invalid shape of the `pred` array
            (must be 2D).
    """
    if len(preds.shape) != 2 or preds.shape[1] != 1000:
        raise ValueError('`decode_predictions` expects '
                         'a batch of predictions '
                         '(i.e. a 2D array of shape (samples, 1000)). '
                         'Found array with shape: ' + str(preds.shape))

    results = []
    for pred in preds:
        top_indices = pred.argsort()[-top:][::-1]
        global CLASS_INDEX
        result = [tuple(CLASS_INDEX[str(i)]) + (pred[i],) for i in top_indices]
        result.sort(key=lambda x: x[2], reverse=True)
        results.append(result)
    return results


def describe(img_path):
    from keras.applications.resnet50 import ResNet50, preprocess_input
    from keras.preprocessing import image
    global model
    if not model:
        model = ResNet50()
    if img_path[:4] == 'http':
        response = requests.get(img_path)
        img_path = BytesIO(response.content)
    img = image.load_img(img_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    preds = model.predict(x)
    predicted_description = "This is {}.".format(decode_predictions(
        preds, top=1)[0][0][1])
    return predicted_description


def describe_images():
    cabinet_images = models.CabinetImage.objects.all()
    for cabinet_image in cabinet_images:
        img_path = os.path.join(BASE_DIR, 'media/' + str(cabinet_image.image))
        cabinet_image.description = describe(img_path)
        cabinet_image.save()

if __name__ == '__main__':
    describe_images()
