from flask import Flask, render_template, request
import sys

sys.path.append('process')
from transposition_cipher import tp_encrypt, tp_decrypt
from rail_fence_cipher import rf_encrypt, rf_decrypt

app = Flask(__name__, template_folder='html')

@app.route('/')
def index():
     return render_template("index.html")

@app.route('/transpo')
def transpo_cipher_render_page():
     return render_template("transposition_cipher.html")

@app.route('/transpo', methods=["POST"])
def transpo_cipher_action():
     normal_text = request.form.get('normal_text')
     key = request.form.get('key')
     action = request.form.get('action')
     if action == 'decrypt':
          decrypt_text = tp_decrypt(normal_text, key) 
          return render_template('transposition_cipher.html', result=decrypt_text)
     if action == 'encrypt':
          encrypt_text = tp_encrypt(normal_text, key) 
          return render_template('transposition_cipher.html', result=encrypt_text)
     
@app.route('/rail_fence')
def railfence_cipher_render_page():
     return render_template("rail_fence_cipher.html")

@app.route('/rail_fence', methods=["POST"])
def railfence_cipher_action():
     normal_text = request.form.get('normal_text')
     key = request.form.get('key')
     action = request.form.get('action')
     if action == 'decrypt':
          decrypt_text = rf_decrypt(normal_text, key) 
          return render_template('rail_fence_cipher.html', result=decrypt_text)
     if action == 'encrypt':
          encrypt_text = rf_encrypt(normal_text, key) 
          return render_template('rail_fence_cipher.html', result=encrypt_text)

if __name__ == "__main__":
     app.run(debug=True)

