from flask import Flask,render_template

app = Flask(__name__)

@app.route("/")
def hello_work():
    return render_template('index.html')


@app.route('/craft')
def craft():
    return render_template('craft.html')

@app.route('/catalig')
def catalig():
    return render_template('catalig.html')

@app.route('/vegetables')
def vegetables():
    return render_template('vegetables.html')

@app.route('/fruits')
def fruits():
    return render_template('fruits.html')

@app.route('/meat')
def meat():
    return render_template('meat.html') 



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)




