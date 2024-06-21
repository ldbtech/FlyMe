import pickle

# Load the model from a pickle file
def load_model(filename):
    with open(filename, 'rb') as file:
        model = pickle.load(file)
    return model

# Example usage
model = load_model('path_to_your_model_file.pkl')
print("Model loaded successfully!")