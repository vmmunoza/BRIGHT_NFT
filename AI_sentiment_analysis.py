# Run this script to explore RNN models that performs a binary classification using the film reviews contained in the imdb dataset
# This can be expended for community KPIs and wordclouds.



# Notebook should be run with tensorflow 2.0.0
import tensorflow as tf
# Check tf version
print(tf.__version__)

# Load the the imdb data set
import tensorflow_datasets as tfds
imdb, info = tfds.load("imdb_reviews", with_info=True, as_supervised=True)

# you may find troubles at first, if so uncomment the line below and run again
!pip install -q tensorflow-datasets

# Data is already split for training/test
train_data, test_data = imdb['train'], imdb['test']

# let's see some of the content of this data by printing one batch with 3 examples
train_example= imdb['train'].batch(1).take(3)
for data in train_example:
    print(data)
    print('')
    
    # We need to keep the sentences and labels in a list/array
import numpy as np

training_sentences = []
training_labels = []

testing_sentences = []
testing_labels = []

for s,l in train_data:
    training_sentences.append(str(s.numpy()))
    training_labels.append(l.numpy())

for s,l in test_data:
    testing_sentences.append(str(s.numpy()))
    testing_labels.append(l.numpy())

testing_labels_final = np.array(testing_labels)
training_labels_final = np.array(training_labels)


# For convenience, we define the hyperparameters of the model here
vocab_size = 10000
embedding_dim = 16
max_length = 100
trunc_type='post'
oov_tok = "<OOV>"

#----- Data preprocessing
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
# tokenize the data.
tokenizer = Tokenizer(num_words = vocab_size, oov_token=oov_tok)
tokenizer.fit_on_texts(training_sentences)
word_index = tokenizer.word_index
# convert into sequence of indices.
sequences = tokenizer.texts_to_sequences(training_sentences)
testing_sequences = tokenizer.texts_to_sequences(testing_sentences)
# pad the sequences such that all the sentences are of equal length when feeding into the model.
testing_padded = pad_sequences(testing_sequences,maxlen=max_length)
padded = pad_sequences(sequences,maxlen=max_length, truncating=trunc_type)




# Define a model with LSTM 
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size, embedding_dim, input_length=max_length),
    tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32)),
    tf.keras.layers.Dense(6, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
model.compile(loss='binary_crossentropy',optimizer='adam',metrics=['accuracy'])
model.summary()

#Train the model
num_epochs = 15
history = model.fit(padded, training_labels_final, epochs=num_epochs, validation_data=(testing_padded, testing_labels_final))




# Model above shows overfitting, yet how good is at predicting?

new_reviews = [
    'This movie is the best. Really liked it.',
    'Bad movie, I even fell asleep!',
    'I think this is the worst movie of all time.',
    'This movie is so hilarious. I want to watch it again!'
              ]

new_seq = tokenizer.texts_to_sequences(new_reviews)
padded=pad_sequences(new_seq, maxlen=max_length,truncating=trunc_type)
output=model.predict(padded)

for i in range(0,len(new_reviews)):
    print('Review: '+new_reviews[i]+' '+', Sentiment:'+str(output[i][0])+'\n' )
    if output[i]> 0.5:
        print(' :) '+'\n')
    else:
        print(' :( '+'\n')




"""
# Model With Gated Recurrent Unit Network:
model1 = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size, embedding_dim, input_length=max_length),
    tf.keras.layers.Bidirectional(tf.keras.layers.GRU(32)),
    tf.keras.layers.Dense(6, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
model1.compile(loss='binary_crossentropy',optimizer='adam',metrics=['accuracy'])
print(model1.summary())

# Model With Convolutional Neural Network
model2 = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size, embedding_dim, input_length=max_length),
    tf.keras.layers.Conv1D(128, 5, activation='relu'),
    tf.keras.layers.GlobalAveragePooling1D(),
    tf.keras.layers.Dense(6, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
model2.compile(loss='binary_crossentropy',optimizer='adam',metrics=['accuracy'])
print(model2.summary())

# After training some of the models above you can write a review to test it
new_reviews = [
    'WRITE YOUR OWN REVIEW HERE'
              ]

"""

        

