import difflib as dl

class eval_text:
    def __init__(self):
        self.similarities = {}

    def eval_similarity(self, model_output, words):
        end = 12
        
        text = ' '.join(model_output[:end]).lower()
        text = text.split()
           
        for word in words[1:]:
            print('word',word)
            self.similarities[word] = dl.get_close_matches(word, text, cutoff=0.01)[0]
            print(self.similarities[word])
        return self.similarities