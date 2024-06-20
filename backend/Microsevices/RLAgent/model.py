import pickle

def load_model():
    with open('./model/pickle.pk', 'rb') as f:
        model = pickle.load(f)
    return model

if __name__ == "__main__":
    model = load_model()
    print(model)
    
